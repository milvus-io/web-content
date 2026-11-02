// Shared build-side resolution of the <include target="..."> / <exclude
// target="..."> prose spans documented in CUSTOM_ATTRIBUTES.md. The browser
// runtime has a twin implementation in
// packages/docs-ui/src/shared/components/RestSpecs/utils.js (matchFilterTags /
// textFilter) — keep the two algorithms in lockstep.
//
// Semantics (the `targets` argument is the publication target, optionally a
// dot-joined composite like "milvus.en-US"; the span attribute is a single
// target):
//   <include target="t">…</include>   keep the inner text when `targets`
//                                     contains t, drop the whole span otherwise
//   <exclude target="t">…</exclude>   drop the inner text when `targets`
//                                     contains t, keep it otherwise
// Spans nest; the innermost balanced span is resolved first.

function matchFilterTags(markdown) {
    const startTagRegex = /<(include|exclude) target="(.+?)"/gm;
    const endTagRegex = /<\/(include|exclude)>/gm;
    const matches = [...markdown.matchAll(startTagRegex)];
    const spans = [];

    matches.forEach((match) => {
        const tag = match[1];
        const rest = markdown.slice(match.index);

        const closeTagRegex = new RegExp(`</${tag}>`, 'gm');
        const closeTagMatch = [...rest.matchAll(closeTagRegex)];

        const startIndex = match.index;
        let endIndex = 0;

        for (let i = 0; i < closeTagMatch.length; i++) {
            const candidate = markdown.slice(startIndex, startIndex + closeTagMatch[i].index + closeTagMatch[i][0].length);

            const startCount = candidate.match(startTagRegex) ? candidate.match(startTagRegex).length : 0;
            const endCount = candidate.match(endTagRegex) ? candidate.match(endTagRegex).length : 0;

            if (startCount === endCount) {
                endIndex = startIndex + closeTagMatch[i].index + closeTagMatch[i][0].length;
                break;
            }
        }

        spans.push({
            tag,
            target: match[2],
            startIndex,
            endIndex,
        });
    });

    return spans;
}

function resolveIncludeSpans(markdown, targets) {
    // Non-string input passes through unchanged (refGen coerces to '' before
    // calling); callers that need the old coercion must do it themselves.
    if (typeof markdown !== 'string') {
        return markdown;
    }

    const matches = matchFilterTags(markdown);

    if (matches.length > 0) {
        const match = matches[0];
        const preText = markdown.slice(0, match.startIndex);
        let matchText = markdown.slice(match.startIndex, match.endIndex);
        const postText = markdown.slice(match.endIndex);
        const isTargetValid = targets.split('.').includes(match.target.trim());
        const startTagLength = `<${match.tag} target="${match.target}">`.length;
        const endTagLength = `</${match.tag}>`.length;

        if ((match.tag === 'include' && isTargetValid) || (match.tag === 'exclude' && !isTargetValid)) {
            matchText = matchText.slice(startTagLength, -endTagLength);
        } else {
            matchText = '';
        }

        return resolveIncludeSpans(preText + matchText + postText, targets);
    }

    return markdown;
}

module.exports = {
    matchFilterTags,
    resolveIncludeSpans,
};
