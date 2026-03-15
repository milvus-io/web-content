const MilvusDocsGen = require('./milvusDocsGen.js')
const larkDocWriter = require('./larkDocWriter.js')
const inquirer = require('inquirer')

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
     *     Slug[0].text → used to derive page_id:
     *       "Authentication"           → "Authentication"      (VirtualNode, skipped)
     *       "Authentication-createRole" → "Authentication/createRole.md"
     *     Type               → "VirtualNode" | "Function"
     *     父记录[0].record_ids[0] → parent record_id
     */
    async __list_sources() {
        if (!this.records) {
            await this.__getBase();
        }

        this.records = (await Promise.all(this.records.map(async record => {
            if (!record.fields.Docs) return null

            const docField = record.fields.Docs
            const slug = record.fields.Slug?.[0]?.text || ''
            const type = record.fields.Type
            const parent = record.fields['父记录']?.[0]?.record_ids?.[0]
            const page_token = docField.link.split('/').pop()

            // VirtualNode → folder placeholder, no .md → write_doc skips it
            // Function → Category/methodName.md
            let page_id
            const hyphenIdx = slug.indexOf('-')
            if (hyphenIdx === -1) {
                page_id = slug
            } else {
                const category = slug.slice(0, hyphenIdx)
                const method = slug.slice(hyphenIdx + 1)
                page_id = `${category}/${method}.md`
            }

            return {
                record_id: record.record_id,
                page_id,
                title: docField.text,
                source_link: docField.link,
                page_token,
                label: docField.text,
                keywords: [],
                beta: false,
                progress: record.fields.Progress,
                parent,
                type,
            }
        }))).filter(Boolean)

        return this.records
    }

    // larkDocWriter passes block['code'] as first arg, but MilvusDocsGen.__code
    // incorrectly treats it as the full block (does block.code which gives undefined).
    // Guard here and delegate directly to larkDocWriter.__code.
    // Then force the opening fence language tag to match the SDK language.
    async __code(code, indent, prev, next, blocks) {
        if (!code || !code.style) return ''
        const result = await larkDocWriter.prototype.__code.call(this, code, indent, prev, next, blocks)
        if (!result || !this.forcedLanguage) return result
        return result.replace(/(`{3})\w*/m, `$1${this.forcedLanguage}`)
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
        this.page_blocks = await this.__get_reference_syncd_blocks(this.page_blocks)
        if (!this.page_blocks) {
            console.log(`Failed to fetch blocks for ${doc_title}`)
            return
        }

        const page = this.page_blocks.find(block => block.block_type === 1)
        if (page?.children) {
            this.blocks = page.children.map(child => this.__retrieve_block_by_id(child))
        }

        console.log(`Generating content...`)
        let content = await this.__markdown()
        content = this.__filter_content(content, this.targets)

        return { front_matters: '', content, page_id }
    }
}

module.exports = MilvusSdkDocsGen
