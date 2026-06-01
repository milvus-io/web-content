const MilvusDocsGen = require('./milvusDocsGen.js')
const larkDocWriter = require('./larkDocWriter.js')
const inquirer = require('inquirer')
const path = require('node:path')

class MilvusSdkDocsGen extends MilvusDocsGen {
    constructor(base, sourceType, menuStructure, imageDir, alt_texts, language) {
        super(base, sourceType, menuStructure, imageDir, alt_texts)
        this.forcedLanguage = language || null
    }

    /**
     * SDK bitable schema differs from guide bitable schema:
     *   field mapping:
     *     Docs.text  → title
     *     Docs.link  → source_link; last path segment → page_token
     *     Slug[0].text → local name segment
     *     Type       → "VirtualNode" | "Module" | "Class" | "Function" | "Enum"
     *     父记录[0].record_ids[0] → parent record_id
     *
     *   page_id and dir_path are resolved by walking the parent chain:
     *     VirtualNode / Module  → dir only, no file  (e.g. "MilvusClient/Collections")
     *     Class                 → dir + own file     (e.g. "MilvusClient/CollectionSchema/CollectionSchema.md")
     *     Function / Enum       → leaf file          (e.g. "MilvusClient/Collections/create_collection.md")
     */
    async __list_sources() {
        if (!this.records) {
            await this.__getBase();
        }

        // First pass: collect raw data keyed by record_id
        if (!Array.isArray(this.records)) {
            console.error('Failed to fetch bitable records — check base token and permissions')
            return []
        }
        const rawMap = new Map()
        for (const record of this.records) {
            if (!record.fields.Docs) continue
            const docField = record.fields.Docs
            rawMap.set(record.record_id, {
                record_id: record.record_id,
                slug: record.fields.Slug?.[0]?.text || '',
                type: record.fields.Type,
                parent: record.fields['父记录']?.[0]?.record_ids?.[0] || null,
                page_token: docField.link.split('/').pop(),
                title: docField.text,
                source_link: docField.link,
                progress: record.fields.Progress,
            })
        }

        // Second pass: resolve page_id and dir_path by walking parent chain.
        // dir_path = the directory path this record contributes (used as parent for children).
        // page_id  = the file path to write (ends in .md) or folder path (no .md, skipped).
        const resolveCache = new Map()
        const allocatedPaths = new Set()
        const allocateCaseInsensitivePath = (parentDir, localName, ext='') => {
            const baseDir = parentDir || ''
            let suffix = 1

            while (true) {
                const name = suffix === 1 ? localName : `${localName}-${suffix}`
                const candidate = baseDir ? `${baseDir}/${name}${ext}` : `${name}${ext}`
                const key = candidate.toLowerCase()

                if (!allocatedPaths.has(key)) {
                    allocatedPaths.add(key)
                    return candidate
                }

                suffix += 1
            }
        }
        const fileStem = (filePath) => filePath.replace(/\.md$/i, '')
        const resolve = (record_id) => {
            if (resolveCache.has(record_id)) return resolveCache.get(record_id)
            const rec = rawMap.get(record_id)
            if (!rec) return { pageId: '', dirPath: '' }

            const slug = rec.slug
            // Use lastIndexOf so slugs with a version prefix (e.g. "v2-Category-method")
            // correctly extract just the trailing local name segment.
            const hyphenIdx = slug.lastIndexOf('-')
            const localName = hyphenIdx === -1 ? slug : slug.slice(hyphenIdx + 1)
            const type = rec.type

            let parentDir = ''
            if (rec.parent && rawMap.has(rec.parent)) {
                parentDir = resolve(rec.parent).dirPath
            }

            const hasChildren = [...rawMap.values()].some(r => r.parent === record_id)

            let result
            if (type === 'Class' && hasChildren) {
                // Has own overview file AND serves as a directory for its methods
                const dirPath = allocateCaseInsensitivePath(parentDir, localName)
                result = { pageId: allocateCaseInsensitivePath(dirPath, localName, '.md'), dirPath }
            } else if (type === 'Class' || type === 'Function' || type === 'Enum') {
                // Leaf file only
                const pageId = allocateCaseInsensitivePath(parentDir, localName, '.md')
                result = { pageId, dirPath: fileStem(pageId) }
            } else {
                // VirtualNode, Module — folder only, no file written
                const dirPath = allocateCaseInsensitivePath(parentDir, localName)
                result = { pageId: dirPath, dirPath }
            }

            resolveCache.set(record_id, result)
            return result
        }

        this.records = [...rawMap.values()].map(rec => ({
            record_id: rec.record_id,
            page_id: resolve(rec.record_id).pageId,
            title: rec.title,
            source_link: rec.source_link,
            page_token: rec.page_token,
            label: rec.title,
            keywords: [],
            beta: false,
            progress: rec.progress,
            parent: rec.parent,
            type: rec.type,
        }))

        return this.records
    }

    /**
     * Recursively write all docs under parent, descending into VirtualNode/Module/Class
     * subtrees to collect Function/Enum leaves and Class overview files.
     */
    async write_docs(parent_title, parent_id=null) {
        const sources = this.records || await this.__list_sources()

        if (!parent_id) {
            const candidates = sources.filter(s => s.title === parent_title)
            if (candidates.length === 1) {
                parent_id = candidates[0].page_id
            } else if (candidates.length > 1) {
                var { source } = await inquirer.prompt([{
                    type: 'list',
                    name: 'source',
                    message: `Multiple sources found for ${parent_title}. Select one:`,
                    choices: candidates.map(s => `${s.title} (${s.page_id})`)
                }])
                parent_id = source.split('(')[1].replace(')', '')
            } else {
                console.error(`No sources found for ${parent_title}`)
                return null
            }
        }

        const metadata = sources.find(s => s.title === parent_title && s.page_id === parent_id)
        if (!metadata) {
            console.error(`No metadata found for ${parent_title} (${parent_id})`)
            return null
        }

        const children = this.__iterate_sources(metadata.record_id)
        const docs = []

        for (const child of children) {
            // Write this child's own file if it has one (.md)
            if (child.page_id.endsWith('.md')) {
                const result = await this.write_doc(child.title, child.page_id)
                if (result) docs.push(result)
            }
            // Recurse into any children this node has
            const grandchildren = this.__iterate_sources(child.record_id)
            if (grandchildren.length > 0) {
                const sub = await this.write_docs(child.title, child.page_id)
                if (sub) docs.push(...sub)
            }
        }

        return docs
    }

    // larkDocWriter passes block['code'] as first arg, but MilvusDocsGen.__code
    // incorrectly treats it as the full block (does block.code which gives undefined).
    // Guard here and delegate directly to larkDocWriter.__code.
    // Then force the opening fence language tag to match the SDK language.
    async __code(code, indent, prev, next, blocks) {
        if (!code || !code.style) return ''
        const result = await larkDocWriter.prototype.__code.call(this, code, indent, prev, next, blocks)
        if (!result || !this.forcedLanguage) return result
        return result.replace(/(`{3})[^\n]*/m, `$1${this.forcedLanguage}`)
    }

    async write_doc(doc_title, doc_id=null) {
        console.log(`Fetching metadata for [${doc_title}]...`)
        const sources = this.records || await this.__list_sources()

        if (!doc_id) {
            const candidates = sources.filter(s => s.title === doc_title)

            if (candidates.length > 1) {
                var { source } = await inquirer.prompt([{
                    type: 'list',
                    name: 'source',
                    message: `Multiple sources found for ${doc_title}. Select one:`,
                    choices: candidates.map(s => `${s.title} (${s.page_id})`)
                }])
                doc_id = source.split('(')[1].replace(')', '')
            } else if (candidates.length === 1) {
                doc_id = candidates[0].page_id
            } else {
                console.error(`No sources found for ${doc_title}`)
                return
            }
        }

        const metadata = sources.find(s => s.title === doc_title && s.page_id === doc_id)
        if (!metadata) {
            console.error(`No metadata found for ${doc_title} (${doc_id})`)
            return
        }

        const { page_id, page_token } = metadata

        if (!page_id.endsWith('.md')) {
            console.log(`Skipping ${doc_title} (VirtualNode)`)
            return
        }

        console.log(`Fetching blocks...`)
        this.page_blocks = await this.__fetch_doc_blocks(page_token)
        if (!this.page_blocks) {
            console.log(`Failed to fetch blocks for ${doc_title}`)
            return
        }
        this.page_blocks = await this.__get_reference_syncd_blocks(this.page_blocks)

        const page = this.page_blocks.find(block => block.block_type === 1)
        if (page?.children) {
            this.blocks = page.children.map(child => this.__retrieve_block_by_id(child))
        }

        console.log(`Generating content...`)
        this.current_page_id = page_id
        let content = await this.__markdown()
        content = this.__filter_content(content, this.targets)

        return { front_matters: '', content, page_id }
    }

    /**
     * Dry-run: fetch blocks for every .md source and scan for feishu /docx/ links
     * that cannot be resolved to a known page_token in this bitable.
     * Returns an array of { page_id, token, url } for each unresolvable link.
     */
    async scan_stale_links() {
        const sources = this.records || await this.__list_sources()
        const tokenSet = new Set(sources.map(s => s.page_token))
        const issues = []
        const feishuRe = /https?:\/\/[^"'\s)]*feishu\.cn\/docx\/([^"'#?\s)/]+)/g

        for (const source of sources) {
            if (!source.page_id.endsWith('.md')) continue

            const blocks = await this.__fetch_doc_blocks(source.page_token)
            if (!blocks) continue

            const json = JSON.stringify(blocks)
            let m
            const seen = new Set()
            while ((m = feishuRe.exec(json)) !== null) {
                const token = m[1]
                if (!tokenSet.has(token) && !seen.has(token)) {
                    seen.add(token)
                    issues.push({ page_id: source.page_id, token, url: m[0] })
                }
            }
        }

        return issues
    }

    async __convert_link(url) {
        const tokenMatch = url.match(/\/docx\/([^#?/]+)/)
        if (!tokenMatch) return url

        const token = tokenMatch[1]
        const sources = this.records || await this.__list_sources()
        const target = sources.find(s => s.page_token === token)
        if (!target || !target.page_id.endsWith('.md')) return url

        const currentDir = path.dirname(this.current_page_id || '')
        return path.relative(currentDir, target.page_id)
    }
}

module.exports = MilvusSdkDocsGen
