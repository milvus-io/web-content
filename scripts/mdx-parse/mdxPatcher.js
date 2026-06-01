/**
 * MDX Patching Module
 * Contains the MDX patching logic extracted from larkDocWriter.js __mdx_patches method
 */

// Known JSX block components that must never be backslash-escaped.
const KNOWN_JSX_TAGS = new Set([
    'Admonition', 'Tabs', 'TabItem', 'DocCard', 'DocCardList',
    'Details', 'CodeBlock', 'ThemedImage', 'TOCInline', 'Highlight',
    'Banner', 'Bars', 'Blocks', 'Cards', 'Grid', 'Hero', 'Procedures',
    'RestSpecs', 'Stories', 'Supademo',
]);

/**
 * Pre-processing: remove hallucinated prose inserted between </TabItem> and the
 * next <TabItem> or </Tabs>. LLMs sometimes fabricate content in those gaps,
 * which MDX compiles fine but Docusaurus's Tabs component rejects at SSG render
 * time with "Bad <Tabs> child <p>".
 */
function removeTabsHallucinations(content) {
    const lines = content.split('\n');
    const result = [];
    let tabsDepth = 0;
    let afterTabItemClose = false;
    let inCodeBlock = false;

    for (const line of lines) {
        const trimmed = line.trim();

        if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
        }

        if (!inCodeBlock) {
            if (/^<Tabs[\s>]/.test(trimmed)) tabsDepth++;
            if (/^<\/Tabs>/.test(trimmed)) tabsDepth = Math.max(0, tabsDepth - 1);

            if (tabsDepth > 0) {
                if (trimmed === '</TabItem>') {
                    afterTabItemClose = true;
                    result.push(line);
                    continue;
                }
                if (afterTabItemClose) {
                    if (/^<TabItem[\s>]/.test(trimmed) || /^<\/Tabs>/.test(trimmed)) {
                        afterTabItemClose = false;
                    } else if (trimmed !== '') {
                        // Non-empty, non-TabItem content — hallucinated prose, discard it
                        continue;
                    }
                    // Empty lines between TabItems are harmless, keep them
                }
            } else {
                afterTabItemClose = false;
            }
        }

        result.push(line);
    }

    return result.join('\n');
}

/**
 * Pre-processing: unescape known JSX block components that were incorrectly
 * backslash-escaped (e.g. \<Tabs> → <Tabs>, \<TabItem> → <TabItem>).
 * These artifacts may exist in files translated before the end-tag-mismatch
 * fallback was removed. \<Tabs> is valid MDX syntax but causes React to treat
 * the remaining values={[...]} expression as children, crashing SSG.
 */
function unescapeKnownJsxTags(content) {
    const names = [...KNOWN_JSX_TAGS].join('|');
    const pattern = new RegExp(`\\\\<(/?(?:${names})\\b)`, 'g');
    return content.replace(pattern, '<$1');
}

/**
 * Pre-processing: replace currency $<digit> with &#36;<digit> outside fenced code
 * blocks and inline code spans, to prevent remark-math/KaTeX from treating them as
 * math delimiters (which causes unicodeTextInMathMode warnings and broken rendering).
 */
function escapeCurrencyDollars(content) {
    const lines = content.split('\n');
    let inCodeBlock = false;
    const result = [];

    for (let line of lines) {
        const stripped = line.trim();
        if (stripped.startsWith('```') || stripped.startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
        }

        if (!inCodeBlock) {
            // Split by inline code spans; odd-indexed segments are inside backticks
            const parts = line.split(/(`+[^`]+`+)/);
            line = parts.map((part, i) => {
                if (i % 2 === 0) {
                    // Outside inline code — replace $<digit> with HTML entity
                    return part.replace(/\$(?=\d)/g, '&#36;');
                }
                return part; // Inside inline code — leave unchanged
            }).join('');
        }

        result.push(line);
    }

    return result.join('\n');
}

function transformOutsideFencedCodeBlocks(content, transform) {
    const lines = content.split('\n');
    const result = [];
    let pending = [];
    let inCodeBlock = false;

    const flushPending = () => {
        if (pending.length > 0) {
            result.push(transform(pending.join('\n')));
            pending = [];
        }
    };

    for (const line of lines) {
        const stripped = line.trim();
        if (stripped.startsWith('```') || stripped.startsWith('~~~')) {
            if (!inCodeBlock) {
                flushPending();
                inCodeBlock = true;
                result.push(line);
            } else {
                result.push(line);
                inCodeBlock = false;
            }
            continue;
        }

        if (inCodeBlock) {
            result.push(line);
        } else {
            pending.push(line);
        }
    }

    flushPending();
    return result.join('\n');
}

function stripTagsFromCodeContent(inner) {
    return inner.replace(/<\/?[A-Za-z][^>]*>/g, '');
}

function escapeCodeContentBraces(inner) {
    return inner.replace(/(?<!\\)([{}])/g, '\\$1');
}

function normalizeSingleCodeTag(match, attrs = '', inner) {
    const stripped = stripTagsFromCodeContent(inner);
    const escaped = escapeCodeContentBraces(stripped);
    return `<code${attrs}>${escaped}</code>`;
}

function normalizeCodeTagContent(content) {
    return transformOutsideFencedCodeBlocks(content, segment => {
        return segment.replace(/<code(\s[^>]*)?>([\s\S]*?)<\/code>/g, normalizeSingleCodeTag);
    });
}

function findUnnormalizedCodeTags(content) {
    const findings = [];

    transformOutsideFencedCodeBlocks(content, segment => {
        segment.replace(/<code(\s[^>]*)?>([\s\S]*?)<\/code>/g, (match, attrs = '', inner) => {
            const stripped = stripTagsFromCodeContent(inner);
            const hasNestedTags = stripped !== inner;
            const hasUnescapedBraces = /(?<!\\)[{}]/.test(stripped);

            if (hasNestedTags || hasUnescapedBraces) {
                findings.push({
                    snippet: match.replace(/\s+/g, ' ').slice(0, 120),
                    hasNestedTags,
                    hasUnescapedBraces,
                });
            }

            return match;
        });

        return segment;
    });

    return findings;
}

/**
 * Pre-processing: escape any lowercase tag whose name is not a known HTML element or
 * content-filter tag, outside fenced code blocks and inline code spans.
 * Such tags are URL/API placeholder patterns (e.g. <bucket_name>, <region-code>,
 * <container>, <blob>) that MDX would otherwise parse as JSX elements.
 * Both opening and closing forms are escaped.
 * PascalCase JSX components (Tabs, TabItem, Admonition…) are never matched because
 * the regex anchors on a leading lowercase letter.
 */
function escapeNonHtmlTags(content) {
    const KNOWN_TAGS = new Set([
        // Standard HTML elements
        'a', 'abbr', 'address', 'area', 'article', 'aside', 'audio',
        'b', 'base', 'bdi', 'bdo', 'blockquote', 'br', 'button',
        'canvas', 'caption', 'cite', 'code', 'col', 'colgroup',
        'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'div', 'dl', 'dt',
        'em', 'embed',
        'fieldset', 'figcaption', 'figure', 'footer', 'form',
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hr', 'html',
        'i', 'iframe', 'img', 'input', 'ins',
        'kbd',
        'label', 'legend', 'li', 'link',
        'main', 'map', 'mark', 'menu', 'meta', 'meter',
        'nav', 'noscript',
        'object', 'ol', 'optgroup', 'option', 'output',
        'p', 'picture', 'pre', 'progress',
        'q',
        'rp', 'rt', 'ruby',
        's', 'samp', 'script', 'section', 'select', 'slot', 'small', 'source', 'span',
        'strong', 'style', 'sub', 'summary', 'sup',
        'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead',
        'time', 'title', 'tr', 'track',
        'u', 'ul',
        'var', 'video',
        'wbr',
        // Content-filter tags used by larkDocWriter (processed before MDX patching)
        'include', 'exclude',
    ]);

    // Structural pre-scan: build set of safe uppercase/PascalCase tag names.
    // A tag is safe if it appears with a close tag, self-closing form, or attributes
    // anywhere in the document. Combined with a KNOWN_JSX fallback whitelist as a
    // safety net for legitimate components that may be orphaned in edge cases.
    const safeUppercaseTags = new Set([
        // Docusaurus built-in theme components
        'Admonition', 'Tabs', 'TabItem', 'DocCard', 'DocCardList',
        'Details', 'CodeBlock', 'ThemedImage', 'TOCInline', 'Highlight',
        // Custom site components
        'Banner', 'Bars', 'Blocks', 'Cards', 'Grid', 'Hero', 'Procedures', 'RestSpecs', 'Stories', 'Supademo',
    ]);
    const upperScanRegex = /[<]([A-Z][A-Za-z0-9]*)/g;
    let upperMatch;
    while ((upperMatch = upperScanRegex.exec(content)) !== null) {
        const tn = upperMatch[1];
        if (safeUppercaseTags.has(tn)) continue;
        if (new RegExp(`<\\/${tn}>`).test(content) ||
            new RegExp(`<${tn}\\s*\\/>`).test(content) ||
            new RegExp(`<${tn}\\s+`).test(content)) {
            safeUppercaseTags.add(tn);
        }
    }

    const lines = content.split('\n');
    let inCodeBlock = false;
    const result = [];

    for (let line of lines) {
        const stripped = line.trim();
        if (stripped.startsWith('```') || stripped.startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
        }

        if (!inCodeBlock) {
            // Split by inline code spans; odd-indexed segments are inside backticks
            const parts = line.split(/(`+[^`]+`+)/);
            line = parts.map((part, i) => {
                if (i % 2 === 0) {
                    // Escape non-HTML lowercase placeholder tags (e.g. <bucket_name>, <region-code>).
                    // Tags with attributes won't match because the regex only allows \s*\/?>
                    part = part.replace(/(?<!\\)<\/?([a-z][a-z0-9]*(?:[_-][a-z0-9]+)*)\s*\/?>/g, (match, tagName) => {
                        return KNOWN_TAGS.has(tagName) ? match : '\\' + match;
                    });
                    // Escape uppercase/PascalCase tags not identified as real JSX components.
                    // Uses HTML entities so the angle brackets render correctly in the output.
                    part = part.replace(/(?<!\\)<\/?([A-Z][A-Za-z0-9]*)\s*\/?>/g, (match, tagName) => {
                        if (safeUppercaseTags.has(tagName)) return match;
                        return match.replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    });
                    // Escape dotted-name PascalCase tags (e.g. <CreateCollectionReq.FieldSchema>),
                    // which are Java/C# type references that MDX misparses as JSX member expressions.
                    // Backslash escaping does not suppress MDX JSX parsing for dotted names, so
                    // always convert to HTML entities, stripping any preceding backslash first.
                    part = part.replace(/\\?<\/?([A-Z][A-Za-z0-9]*(?:\.[A-Za-z][A-Za-z0-9]*)+)\s*\/?>/g, (match) => {
                        return match.replace(/^\\/, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
                    });
                    return part;
                }
                return part; // Inside inline code — leave unchanged
            }).join('');
        }

        result.push(line);
    }

    return result.join('\n');
}

/**
 * Structural validator for translated MDX files.
 * Catches React render-time errors that @mdx-js/mdx compile() misses:
 *   1. Prose inserted between </TabItem> and <TabItem>/<\/Tabs> (LLM hallucination)
 *   2. Unbalanced <Tabs>/<\/Tabs> or <TabItem>/<\/TabItem> tags (LLM dropped closing tags)
 *   3. Backslash-escaped known JSX tags (e.g. \<Tabs> → compile succeeds but SSG crashes)
 *
 * @param {string} content
 * @returns {string[]} array of error descriptions; empty array = structurally valid
 */
function validateMdxStructure(content) {
    const errors = [];

    // Check 1: prose between TabItems
    if (removeTabsHallucinations(content) !== content) {
        errors.push('prose found between </TabItem> and next <TabItem>/<\\/Tabs> (LLM hallucination)');
    }

    // Check 2: escaped known JSX tags
    if (unescapeKnownJsxTags(content) !== content) {
        errors.push('backslash-escaped known JSX tags found (e.g. \\<Tabs>)');
    }

    // Check 3: unrestored translation placeholders (XTAG\d+X or LLM-mangled X\d+X)
    // If these appear in the output the placeholder/restore cycle broke, and the
    // rendered page will contain raw placeholder text like "XTAG39X" or "X39X".
    if (/\bXTAG\d+X\b/.test(content)) {
        errors.push('unrestored XTAG translation placeholders found (placeholder restore failed)');
    }

    // Check 4: JSX <code> spans must render literal code text.
    // MDX treats `{placeholder}` inside JSX children as JavaScript expressions,
    // and nested formatting tags like <i> split code text into JSX children.
    const unnormalizedCodeTags = findUnnormalizedCodeTags(content);
    if (unnormalizedCodeTags.length > 0) {
        errors.push(`unnormalized JSX <code> tag(s) found (${unnormalizedCodeTags.length} span(s) with nested tags or unescaped braces)`);
    }

    // Check 5: tag balance for <Tabs> and <TabItem> (outside code blocks)
    const lines = content.split('\n');
    let inCodeBlock = false;
    const delta = { Tabs: 0, TabItem: 0 };
    for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed.startsWith('```') || trimmed.startsWith('~~~')) {
            inCodeBlock = !inCodeBlock;
            continue;
        }
        if (inCodeBlock) continue;
        for (const tag of ['Tabs', 'TabItem']) {
            const opens = (trimmed.match(new RegExp(`<${tag}[\\s>/]`, 'g')) || []).length;
            const closes = (trimmed.match(new RegExp(`<\\/${tag}>`, 'g')) || []).length;
            delta[tag] += opens - closes;
        }
    }
    for (const [tag, d] of Object.entries(delta)) {
        if (d > 0) errors.push(`${d} unclosed <${tag}> tag(s)`);
        if (d < 0) errors.push(`${Math.abs(d)} extra </${tag}> closing tag(s)`);
    }

    return errors;
}

// Function to apply MDX patches as per the larkDocWriter.js implementation
async function applyMdxPatches(content) {
    try {
        // Dynamically import the MDX compile function due to ES module restrictions
        const { compile } = await import('@mdx-js/mdx');
        const remarkMath = (await import('remark-math')).default;

        // Pre-process: fix hallucination patterns, then escape problem characters
        let patchedContent = removeTabsHallucinations(content);
        patchedContent = unescapeKnownJsxTags(patchedContent);
        patchedContent = normalizeCodeTagContent(patchedContent);
        patchedContent = escapeCurrencyDollars(patchedContent);
        patchedContent = escapeNonHtmlTags(patchedContent);
        let maxIterations = 50; // Prevent infinite loops
        let iteration = 0;
        const seenHashes = new Set();

        while (iteration < maxIterations) {
            // Cycle detection: stop if we've visited this exact content state before
            let h = 5381;
            for (let i = 0; i < patchedContent.length; i++) {
                h = Math.imul(h, 33) ^ patchedContent.charCodeAt(i);
            }
            if (seenHashes.has(h)) {
                console.warn('Cycle detected in MDX patch loop, stopping to prevent infinite iteration');
                break;
            }
            seenHashes.add(h);

            try {
                // Try to compile the current content
                await compile(patchedContent, { development: false, remarkPlugins: [remarkMath] });
                console.log(`MDX compilation succeeded after ${iteration} fixes`);
                return patchedContent; // If compilation succeeds, return the fixed content
            } catch (error) {
                console.log(`MDX compilation error detected (iteration ${iteration + 1}): ${error.message}`);

                // Identify problematic characters based on the error
                let madeChanges = false;
                let offset;
                switch (error.ruleId) {
                    case 'acorn':
                        offset = error.place.offset;

                        if (offset !== undefined && offset > 0 && offset < patchedContent.length) {
                            for (let i = offset - 1; i >= 0; i--) {
                                if (patchedContent[i] === '{') {
                                    patchedContent = patchedContent.slice(0, i) + '\\' + patchedContent.slice(i);
                                    madeChanges = true;
                                    break;
                                }
                            }
                        }
                        break;

                    case 'end-tag-mismatch':
                        // Tag mismatches in translated content indicate a structural LLM error
                        // (dropped closing tags, wrong nesting) that cannot be safely auto-repaired.
                        // Leave madeChanges = false so the loop breaks, and validate-and-revert
                        // will revert the file for retranslation.
                        break;

                    case 'unexpected-closing-slash': {
                        // "Unexpected closing slash `/` in tag, expected an open tag first"
                        // The error offset points to the `/` inside the orphaned closing tag.
                        // Strategy: walk back to find `<`, forward to find `>`, then remove the entire tag.
                        const slashOffset = error.place?.offset;

                        if (slashOffset !== undefined) {
                            let tagStart = slashOffset - 1;
                            while (tagStart > 0 && patchedContent[tagStart] !== '<') tagStart--;
                            let tagEnd = slashOffset;
                            while (tagEnd < patchedContent.length && patchedContent[tagEnd] !== '>') tagEnd++;

                            if (patchedContent[tagStart] === '<' && tagEnd < patchedContent.length) {
                                // Remove the orphaned closing tag (and any immediately trailing newline)
                                const before = patchedContent.slice(0, tagStart);
                                let after = patchedContent.slice(tagEnd + 1);
                                if (after.startsWith('\n')) after = after.slice(1);
                                patchedContent = before + after;
                                madeChanges = true;
                            }
                        }

                        if (!madeChanges) {
                            // Fallback: remove erroneous closing tags via regex
                            const originalContent = patchedContent;
                            patchedContent = patchedContent.replace(/<\/(?:content|[\w\d]+)>\s*$/, '');
                            if (originalContent !== patchedContent) {
                                madeChanges = true;
                            } else {
                                patchedContent = patchedContent.replace(/<[/](\w+)>/g, (match, tagName) => {
                                    const openingTagCount = (patchedContent.match(new RegExp(`<${tagName}(?:\\s|>|/>)`, 'g')) || []).length;
                                    const closingTagCount = (patchedContent.match(new RegExp(`<\\/${tagName}>`, 'g')) || []).length;
                                    if (closingTagCount > openingTagCount) {
                                        return '';
                                    }
                                    return match;
                                });
                                if (originalContent !== patchedContent) {
                                    madeChanges = true;
                                }
                            }
                        }
                        break;
                    }

                    case 'unexpected-character':
                        offset = error.place?.offset;

                        if (
                            (error.message.includes('U+003D') || /U\+003[0-9]/.test(error.message)) &&
                            offset !== undefined && offset > 0
                        ) {
                            // `=` sign or a digit (0–9) unexpected — typically from `<=` or `<10` where
                            // `<` was parsed as a JSX tag opener but the following char is not a valid name start.
                            // Walk backward to find `<` (within a short window) and replace it with `&lt;`.
                            for (let i = offset - 1; i >= Math.max(0, offset - 10); i--) {
                                if (patchedContent[i] === '<') {
                                    patchedContent = patchedContent.slice(0, i) + '&lt;' + patchedContent.slice(i + 1);
                                    madeChanges = true;
                                    break;
                                }
                            }
                        } else if (
                            (error.message.includes('U+007C') || error.message.includes('U+0026')) &&
                            offset !== undefined && offset > 0
                        ) {
                            // `|` (union types like `<number | string>`) or `&` (HTML entities like `&lt;`
                            // inside angle brackets like `<SearchResults&lt;T&gt;>`) unexpected in JSX tag.
                            // Walk backward to find `<` and replace with `&lt;`.
                            for (let i = offset - 1; i >= Math.max(0, offset - 30); i--) {
                                if (patchedContent[i] === '<') {
                                    patchedContent = patchedContent.slice(0, i) + '&lt;' + patchedContent.slice(i + 1);
                                    madeChanges = true;
                                    break;
                                }
                            }
                        } else if (
                            (error.message.includes('U+002C') || error.message.includes('U+002A') || error.message.includes('U+3001')) &&
                            offset !== undefined && offset > 0 && offset < patchedContent.length
                        ) {
                            // Comma, asterisk, or ideographic comma — escape the nearest preceding `<`
                            for (let i = offset - 1; i >= 0; i--) {
                                if (patchedContent[i] === '<') {
                                    patchedContent = patchedContent.slice(0, i) + '\\' + patchedContent.slice(i);
                                    madeChanges = true;
                                    break;
                                }
                            }
                        }
                        break;

                    default:
                        madeChanges = false;
                        break;
                }

                if (!madeChanges) {
                    console.warn('No changes made to content, breaking loop to prevent infinite iteration');
                    break;
                }
            }

            iteration++;
        }

        if (iteration >= maxIterations) {
            console.warn(`Maximum MDX patch iterations (${maxIterations}) reached, returning last attempt`);
        }

        return patchedContent;
    } catch (error) {
        console.error('Failed to apply MDX patches:', error.message);
        return content; // Return original content if patching fails
    }
}

module.exports = {
    applyMdxPatches,
    validateMdxStructure,
    removeTabsHallucinations,
    unescapeKnownJsxTags,
    normalizeCodeTagContent,
    findUnnormalizedCodeTags,
};
