const KNOWN_JSX_TAGS = new Set([
    'Admonition', 'Tabs', 'TabItem', 'DocCard', 'DocCardList',
    'Details', 'CodeBlock', 'ThemedImage', 'TOCInline', 'Highlight',
    'Banner', 'Bars', 'Blocks', 'Cards', 'Grid', 'Hero', 'Procedures',
    'RestSpecs', 'Stories', 'Supademo',
])

function createFenceTracker() {
    return {
        inCodeBlock: false,
        fenceChar: null,
        fenceLength: 0,
        update(line) {
            const match = String(line).match(/^(\s*)(`{3,}|~{3,})/)
            if (!match) return this

            const marker = match[2]
            const char = marker[0]
            const length = marker.length

            if (!this.inCodeBlock) {
                this.inCodeBlock = true
                this.fenceChar = char
                this.fenceLength = length
            } else if (char === this.fenceChar && length >= this.fenceLength) {
                this.inCodeBlock = false
                this.fenceChar = null
                this.fenceLength = 0
            }

            return this
        },
    }
}

function getFencedCodeRanges(content) {
    const ranges = []
    const fence = createFenceTracker()
    let offset = 0
    let start = null

    for (const line of String(content).split('\n')) {
        const wasInCodeBlock = fence.inCodeBlock
        fence.update(line)

        if (!wasInCodeBlock && fence.inCodeBlock) start = offset
        if (wasInCodeBlock && !fence.inCodeBlock && start !== null) {
            ranges.push({ start, end: offset + line.length })
            start = null
        }

        offset += line.length + 1
    }

    if (start !== null) ranges.push({ start, end: String(content).length })
    return ranges
}

function mapOutsideCode(content, transform) {
    const lines = String(content).split('\n')
    const fence = createFenceTracker()

    return lines.map(line => {
        fence.update(line)
        if (fence.inCodeBlock) return line

        return line.split(/(`+[^`\n]*`+)/).map((part, index) => {
            return index % 2 === 0 ? transform(part) : part
        }).join('')
    }).join('\n')
}

function createFencedCodeBlock(content, lang = '', indent = 0) {
    const text = String(content ?? '').replace(/\n+$/, '')
    const maxBackticks = Math.max(2, ...Array.from(text.matchAll(/`+/g), match => match[0].length))
    const fence = '`'.repeat(maxBackticks + 1)
    const pad = ' '.repeat(indent)
    const language = String(lang || '').trim()
    const lines = text.split('\n').map(line => pad + line).join('\n')

    return `${pad}${fence}${language}\n${lines}\n${pad}${fence}`
}

function normalizeNestedPlaintextFences(content) {
    return String(content).replace(/^(\s*)```plaintext\s*\n([\s\S]*?)\n\1```\s*$/gm, (match, indent, body) => {
        if (!body.includes('```')) return match
        return `${indent}~~~~plaintext\n${body}\n${indent}~~~~`
    })
}

function removeTabsHallucinations(content) {
    return String(content)
        .replace(/^\s*<Tabs>\s*$/gm, '')
        .replace(/^\s*<\/Tabs>\s*$/gm, '')
        .replace(/^\s*<TabItem[^>]*>\s*$/gm, '')
        .replace(/^\s*<\/TabItem>\s*$/gm, '')
}

function unescapeKnownJsxTags(content) {
    let result = String(content)
    for (const tag of KNOWN_JSX_TAGS) {
        result = result
            .replace(new RegExp(`&lt;(/?${tag})(\\s[^&]*)?&gt;`, 'g'), '<$1$2>')
            .replace(new RegExp(`\\\\(<\\/?${tag}(?:\\s[^>]*)?>)`, 'g'), '$1')
    }
    return result
}

function normalizeCodeTagContent(content) {
    return String(content).replace(/<code>([\s\S]*?)<\/code>/g, (match, code) => {
        if (code.includes('\n')) return match
        return `<code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`
    })
}

function convertHtmlCommentsToMdx(content) {
    return String(content).replace(/<!--([\s\S]*?)-->/g, '{/*$1*/}')
}

function escapeNonHtmlTags(content) {
    const htmlTags = new Set([
        'a', 'abbr', 'b', 'br', 'code', 'div', 'em', 'h1', 'h2', 'h3', 'h4',
        'h5', 'h6', 'i', 'img', 'kbd', 'li', 'ol', 'p', 'pre', 'span',
        'strong', 'sub', 'sup', 'table', 'tbody', 'td', 'th', 'thead', 'tr',
        'u', 'ul',
    ])

    return mapOutsideCode(content, part => {
        return part.replace(/(?<!\\)<\/?([a-z][a-z0-9]*(?:[_-][a-z0-9]+)*)\s*\/?>/g, (match, tag) => {
            if (htmlTags.has(tag)) return match
            return match.replace(/</g, '&lt;').replace(/>/g, '&gt;')
        })
    })
}

function escapeMathBraces(content) {
    return mapOutsideCode(content, part => {
        return part.replace(/\$([^$\n]*[{}][^$\n]*)\$/g, (match) => {
            return match.replace(/\{/g, '\\{').replace(/\}/g, '\\}')
        })
    })
}

function escapeHtmlElementBraces(content) {
    return mapOutsideCode(content, part => {
        return part.replace(/(<[a-z][^>]*>)([\s\S]*?)(<\/[a-z][^>]*>)/g, (match, open, body, close) => {
            return open + body.replace(/\{/g, '\\{').replace(/\}/g, '\\}') + close
        })
    })
}

module.exports = {
    removeTabsHallucinations,
    unescapeKnownJsxTags,
    escapeMathBraces,
    escapeHtmlElementBraces,
    normalizeNestedPlaintextFences,
    normalizeCodeTagContent,
    convertHtmlCommentsToMdx,
    escapeNonHtmlTags,
    createFenceTracker,
    getFencedCodeRanges,
    createFencedCodeBlock,
}
