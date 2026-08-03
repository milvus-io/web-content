const fetch = require('node-fetch')
const tokenFetcher = require('./larkTokenFetcher.js')
const { fetchFeishuJsonWithRetry } = require('./feishuFetch.js')
const fs = require('fs')
const node_path = require('path')
const _ = require('lodash')
const slugify = require('slugify')
const Bottleneck = require('bottleneck')
require('dotenv').config()

const FEISHU_HOST = process.env.FEISHU_HOST
const SPACE_ID = process.env.SPACE_ID
const FEISHU_MAX_CONCURRENT = parseInt(process.env.FEISHU_MAX_CONCURRENT || '1', 10)
const FEISHU_MIN_TIME_MS = parseInt(process.env.FEISHU_MIN_TIME_MS || '500', 10)

class larkDocScraper {
    constructor(root_node, base_app_id, target_type, doc_source_dir) {
        this.docs = undefined
        this.root = root_node
        const baseParts = base_app_id.split(':')
        this.base_app_token = baseParts[0]
        this.base_table_id = baseParts.length > 1 ? baseParts[1] : null
        this.use_all_base_tables = this.base_table_id === '*'
        this.target_type = target_type
        this.doc_source_dir = doc_source_dir
        this.base_tables = null
        this.limiter = new Bottleneck({
            maxConcurrent: FEISHU_MAX_CONCURRENT,
            minTime: FEISHU_MIN_TIME_MS,
        })

        // fs.rmSync(this.doc_source_dir, { recursive: true, force: true })
    }

    async __fetchFeishuJson(url, options={}, label=url) {
        return await this.limiter.schedule(() => fetchFeishuJsonWithRetry(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                ...options.headers,
            },
        }, label))
    }

    __write_source(node, filename) {
        const isDocx = (node.obj_type === 'docx') || (node.type === 'docx')
        if (isDocx && (!node.blocks || !node.blocks.items || node.blocks.items.length === 0)) {
            throw new Error(`[write_source] Refusing to write incomplete source for docx "${node.title || node.name}" (token: ${node.obj_token || node.token}) — blocks are missing or empty. File: ${filename}`)
        }
        fs.writeFileSync(filename, JSON.stringify(node, null, 2))
    }

    async fetch(recursive=false, page_token=null) {
        if (!page_token) {
            page_token = this.root
        }

        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        this.token = await fetcher.token()

        if (this.target_type == "wiki") {
            let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${page_token}`
            let res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            let jres = await res.json()

            if (jres.code == 0) {
                this.docs = jres.data.node
                await this.__fetch_wiki_children(this.docs, recursive)
            }
        }

        if (this.target_type == "onePager") {
            let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${page_token}`
            let res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            let jres = await res.json()

            if (jres.code == 0) {
                this.docs = jres.data.node
                await this.__fetch_blocks(this.docs)
                fs.writeFileSync(`${this.doc_source_dir}/${page_token}.json`, JSON.stringify(this.docs, null, 2))
                await this.__split_one_pager(this.docs)
            }
        }

        if (this.target_type == "drive") {
            if (page_token != null) {
                var page = fs.readdirSync(this.doc_source_dir).filter(file => {
                    var source = JSON.parse(fs.readFileSync(`${this.doc_source_dir}/${file}`, 'utf8'))
                    return source.token == page_token
                })

                if (page.length > 0) {
                    page = page[0]
                    var source = JSON.parse(fs.readFileSync(`${this.doc_source_dir}/${page}`, 'utf8'))

                    if (source.type === "docx") {
                        await this.__fetch_blocks(source)
                        this.__write_source(source, `${this.doc_source_dir}/${page}`)
                        console.log(`5. Fetched ${page}`)
                    }

                    if (source.type === "folder") {
                        this.docs = source
                        await this.__fetch_drive_children(this.docs.token, null, false)
                    }
                }
            }

            if (recursive) {
                let url = `${FEISHU_HOST}/open-apis/drive/explorer/v2/folder/${page_token}/meta`
                let res = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${this.token}`
                    }
                })

                let jres = await res.json()

                if (jres.code == 0) {
                    this.docs = jres.data
                    await this.__fetch_drive_children(this.docs.token, null, recursive)
                }
            }
        }

        if (recursive && this.target_type == "wiki") {
            await this.__apply_base_navigation()
        }

        // validate all docx source files have blocks before proceeding
        const incomplete = []
        for (const file of fs.readdirSync(this.doc_source_dir).filter(f => f.endsWith('.json'))) {
            const source = JSON.parse(fs.readFileSync(`${this.doc_source_dir}/${file}`, 'utf8'))
            const isDocx = source.obj_type === 'docx' || source.type === 'docx'
            if (isDocx && (!source.blocks || !source.blocks.items || source.blocks.items.length === 0)) {
                incomplete.push(`  - ${file} (${source.title || source.name || 'unknown'})`)
            }
        }
        if (incomplete.length > 0) {
            throw new Error(`[fetch] ${incomplete.length} docx source file(s) are missing blocks. Re-run the fetch to retry:\n${incomplete.join('\n')}`)
        }

        // fetch blocks of all referenced_synced blocks
        const jsons = fs.readdirSync(this.doc_source_dir).filter(file => file.endsWith('.json'))

        for (let json of jsons) {
            let source = JSON.parse(fs.readFileSync(`${this.doc_source_dir}/${json}`, 'utf8'))
            const replacements = [];
            let append_blocks = [];
            if (source.blocks && source.blocks.items) {
                for (let block of source.blocks.items) {
                    if (block.block_type === 50 && block.reference_synced) {
                        const { source_document_id, source_block_id } = block.reference_synced
                        const node = { "obj_type": "docx", obj_token: source_document_id }
                        await this.__fetch_blocks(node)
                        const source_block = node.blocks.items.find(b => b.block_id == source_block_id)
                        if (source_block) {
                            const block_id = block.block_id
                            const parent_id = block.parent_id
                            // replace reference_synced block with actual block
                            Object.keys(block).forEach(key => delete block[key])
                            Object.keys(source_block).forEach(key => block[key] = source_block[key])
                            block.parent_id = parent_id
                            // append child blocks from source document
                            append_blocks.push(...this.__fetch_block_children(source_block, node))

                            replacements.push({
                                parent_id,
                                reference_block_id: block_id,
                                source_block_id: source_block_id,
                            })
                            // save source document if not already saved
                            console.log(`6. Fetched referenced_synced block ${source_document_id} - ${source_block_id}`)
                            fs.writeFileSync(`${this.doc_source_dir}/${json}`, JSON.stringify(source, null, 2))
                        }
                    }
                }
            }

            if (append_blocks.length > 0) {
                console.log(`7. Appending ${append_blocks.length} blocks from source to ${json}`)
                source.blocks.items = source.blocks.items.concat(append_blocks)
                fs.writeFileSync(`${this.doc_source_dir}/${json}`, JSON.stringify(source, null, 2))
            }

            if (replacements.length > 0) {
                for (let replacement of replacements) {
                    const parent = source.blocks.items.find(b => b.block_id == replacement.parent_id)
                    if (parent) {
                        const index = parent.children.findIndex(child => child == replacement.reference_block_id)
                        if (index !== -1) {
                            parent.children[index] = replacement.source_block_id
                        }
                    }
                }
                console.log(`8. Replaced ${replacements.length} reference_synced blocks in ${json}`)
                fs.writeFileSync(`${this.doc_source_dir}/${json}`, JSON.stringify(source, null, 2))
            }   
        }
    } 
    
    __fetch_block_children(block, node) {
        let children = [];
        if (block.children) {
            for (let child_id of block.children) {
                const child = node.blocks.items.find(b => b.block_id == child_id)
                if (child) {
                    children.push(child)
                    children = children.concat(this.__fetch_block_children(child, node))
                }
            }
        }

        return children
    }

    async __wait(duration) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve()
            }, duration)
        })
    }

    __resolve_wiki_file_token(node) {
        return node.origin_node_token || node.node_token
    }

    __cleanup_legacy_empty_token_file(node, fileToken) {
        if (!fileToken) {
            return
        }

        const legacyPath = `${this.doc_source_dir}/.json`
        if (!fs.existsSync(legacyPath)) {
            return
        }

        try {
            const legacy = JSON.parse(fs.readFileSync(legacyPath, 'utf8'))
            if (legacy?.node_token === node?.node_token) {
                fs.rmSync(legacyPath, { force: true })
            }
        } catch (error) {
        }
    }

    __plain_value(value) {
        if (value === null || value === undefined) return null
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') return String(value)
        if (value instanceof Array) {
            return value.map(item => this.__plain_value(item)).filter(Boolean).join(', ')
        }
        if (typeof value === 'object') {
            if (value.text) return value.text
            if (value.name) return value.name
            if (value.link) return value.link
            if (value.id) return value.id
            const typedKey = value.type && value[value.type] ? value.type : null
            if (typedKey) return this.__plain_value(value[typedKey])
        }
        return null
    }

    __doc_field(fields) {
        return fields.Doc || fields.Docs
    }

    __doc_link(docField) {
        if (!docField) return null
        if (typeof docField === 'string') {
            const markdownMatch = docField.match(/\[[^\]]+\]\(([^)]+)\)/)
            return markdownMatch ? markdownMatch[1] : docField
        }
        if (docField.link) return docField.link
        if (docField.url) return docField.url
        if (docField instanceof Array) return this.__doc_link(docField[0])
        return null
    }

    __doc_title(docField) {
        if (!docField) return null
        if (typeof docField === 'string') {
            const markdownMatch = docField.match(/\[([^\]]+)\]\([^)]+\)/)
            return markdownMatch ? markdownMatch[1] : docField
        }
        return docField.text || docField.name || this.__plain_value(docField)
    }

    __doc_token(docField) {
        const link = this.__doc_link(docField)
        if (!link) return null
        if (link.includes('#')) return link.split('#').pop()
        try {
            const url = new URL(link)
            return url.pathname.split('/').filter(Boolean).pop()
        } catch (_) {
            return link.startsWith('http://') || link.startsWith('https://') ? null : link
        }
    }

    __field_link(value) {
        if (!value) return null
        if (typeof value === 'object' && !(value instanceof Array)) {
            if (value.link) return value.link
            if (value.url) return value.url
        }
        if (value instanceof Array) return this.__field_link(value[0])
        return null
    }

    __field_token(value) {
        const raw = this.__field_link(value) || this.__plain_value(value)
        if (!raw) return null
        const linkMatch = raw.match(/https?:\/\/\S+/)
        const link = linkMatch ? linkMatch[0] : raw.trim()
        if (link.includes('#')) return link.split('#').pop()
        try {
            const url = new URL(link)
            return url.pathname.split('/').filter(Boolean).pop()
        } catch (_) {
            return link.startsWith('http://') || link.startsWith('https://') ? null : link
        }
    }

    __field_href(value) {
        const raw = this.__field_link(value) || this.__plain_value(value)
        if (!raw) return null
        const linkMatch = raw.match(/https?:\/\/\S+/)
        return (linkMatch ? linkMatch[0] : raw).trim()
    }

    __table_filter_values(tableFilter) {
        if (!tableFilter) return null
        const values = tableFilter instanceof Array ? tableFilter : String(tableFilter).split(',')
        return values.map(value => value.trim().toLowerCase()).filter(Boolean)
    }

    async __base_tables(token, tableFilter=null) {
        const filterValues = this.__table_filter_values(tableFilter)
        if (this.base_tables && !filterValues) return this.base_tables

        if (this.base_table_id && !this.use_all_base_tables) {
            this.base_tables = [{ table_id: this.base_table_id, name: this.base_table_id, index: 0 }]
            return this.base_tables
        }

        const tables = []
        let pageToken = null
        do {
            const pageTokenExpr = pageToken ? `&page_token=${pageToken}` : ''
            const url = `${FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base_app_token}/tables?page_size=100${pageTokenExpr}`
            this.token = token
            const jres = await this.__fetchFeishuJson(url, { method: "get" }, `list bitable tables ${this.base_app_token}`)
            if (jres.code !== 0) {
                throw new Error(`[base] Failed to list tables for ${this.base_app_token}: ${JSON.stringify(jres)}`)
            }
            tables.push(...jres.data.items)
            pageToken = jres.data.has_more ? jres.data.page_token : null
        } while (pageToken)

        let selectedTables = this.use_all_base_tables ? tables : tables.slice(0, 1)
        selectedTables = selectedTables.map((table, index) => ({
            ...table,
            table_id: table.table_id || table.id,
            name: table.name || table.table_name || table.table_id || table.id,
            index,
        }))

        if (filterValues) {
            selectedTables = selectedTables.filter(table => {
                const candidates = [table.table_id, table.id, table.name, table.table_name]
                    .filter(Boolean)
                    .map(value => String(value).toLowerCase())
                return filterValues.some(filter => candidates.includes(filter))
            })
            if (selectedTables.length === 0) {
                throw new Error(`[base] Cannot find table(s): ${filterValues.join(', ')}`)
            }
            return selectedTables
        }

        this.base_tables = selectedTables
        return this.base_tables
    }

    async __base_view_id(token, table) {
        if (table.view_id) return table.view_id

        const views = []
        let pageToken = null
        do {
            const pageTokenExpr = pageToken ? `&page_token=${pageToken}` : ''
            const url = `${FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base_app_token}/tables/${table.table_id}/views?page_size=100${pageTokenExpr}`
            this.token = token
            const jres = await this.__fetchFeishuJson(url, { method: "get" }, `list bitable views ${table.name || table.table_id}`)
            if (jres.code !== 0) {
                console.warn(`[base] Failed to list views for ${table.name || table.table_id}; falling back to API default record order: ${JSON.stringify(jres)}`)
                return null
            }
            const items = jres.data?.items || []
            if (!Array.isArray(items)) {
                console.warn(`[base] Unexpected views payload for ${table.name || table.table_id}; falling back to API default record order: ${JSON.stringify(jres)}`)
                return null
            }
            views.push(...items)
            pageToken = jres.data?.has_more ? jres.data.page_token : null
        } while (pageToken)

        const gridView = views.find(view => {
            const type = String(view.view_type || view.type || '').toLowerCase()
            return type === 'grid' || type === '1'
        })
        const selectedView = gridView || views[0]
        return selectedView?.view_id || selectedView?.id || null
    }

    async __base_record_page(token, table, viewId=null) {
        const records = []
        let pageToken = null
        do {
            const pageTokenExpr = pageToken ? `&page_token=${pageToken}` : ''
            const viewExpr = viewId ? `&view_id=${encodeURIComponent(viewId)}` : ''
            const url = `${FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base_app_token}/tables/${table.table_id}/records?page_size=500${viewExpr}${pageTokenExpr}`
            this.token = token
            const jres = await this.__fetchFeishuJson(url, { method: "get" }, `list bitable records ${table.name || table.table_id}`)
            if (jres.code !== 0) {
                throw new Error(`[base] Failed to list records for ${table.name || table.table_id}: ${JSON.stringify(jres)}`)
            }
            const items = jres.data?.items || []
            if (!Array.isArray(items)) {
                throw new Error(`[base] Unexpected records payload for ${table.name || table.table_id}: ${JSON.stringify(jres)}`)
            }
            records.push(...items.map((record, index) => ({
                ...record,
                base_table_id: table.table_id,
                base_table_name: table.name || table.table_id,
                base_table_index: table.index,
                base_record_index: records.length + index,
            })))
            pageToken = jres.data?.has_more ? jres.data.page_token : null
        } while (pageToken)
        return records
    }

    async __base_records(token, table) {
        const viewId = await this.__base_view_id(token, table)
        const allRecords = await this.__base_record_page(token, table)
        if (!viewId) return allRecords

        const viewRecords = await this.__base_record_page(token, table, viewId)
        const allById = new Map(allRecords.map(record => [record.record_id, record]))
        const orderedRecords = []
        const seen = new Set()

        for (const viewRecord of viewRecords) {
            const fullRecord = allById.get(viewRecord.record_id) || viewRecord
            fullRecord.base_record_index = orderedRecords.length
            orderedRecords.push(fullRecord)
            seen.add(viewRecord.record_id)
        }

        for (const record of allRecords) {
            if (seen.has(record.record_id)) continue
            record.base_record_index = orderedRecords.length
            orderedRecords.push(record)
        }

        return orderedRecords
    }

    async __base({ tableFilter=null, force=false } = {}) {
        if (this.records && !tableFilter && !force) return
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        const token = await fetcher.token()
        const tables = await this.__base_tables(token, tableFilter)
        const recordsByTable = []

        for (const table of tables) {
            recordsByTable.push(...await this.__base_records(token, table))
        }

        this.records = recordsByTable
        this.base_tables = tables

        const slugEntries = []
        const recordsBySeqId = new Map(this.records.map(record => [record.fields['Seq. ID'], record]))
        const recordsByRecordId = new Map(this.records.map(record => [record.record_id, record]))
        if (this.records.length > 0) {
            for (let record of this.records) {
                const docField = this.__doc_field(record.fields)
                const docToken = this.__doc_token(docField)
                if (record.fields.Slug && docToken) {
                    const parentSeqId = record.fields.Parent?.[0]?.text || null
                    const parentRecordId = record.fields['父记录']?.[0]?.record_ids?.[0] || record.fields.Parent?.[0]?.record_ids?.[0] || null
                    const parentRecord = parentRecordId
                        ? recordsByRecordId.get(parentRecordId)
                        : parentSeqId
                            ? recordsBySeqId.get(parentSeqId)
                            : null
                    slugEntries.push({
                        key: docToken,
                        token: docToken,
                        slug: record.fields.Slug,
                        title: this.__doc_title(docField),
                        parent_token: this.__doc_token(this.__doc_field(parentRecord?.fields || {})) || null,
                        record_id: record.record_id,
                        seq_id: record.fields['Seq. ID'],
                    })
                }
            }
        }

        const tokenCounts = new Map()
        slugEntries.forEach(entry => {
            tokenCounts.set(entry.token, (tokenCounts.get(entry.token) || 0) + 1)
        })

        const slugs = {}
        slugEntries.forEach(entry => {
            const key = tokenCounts.get(entry.token) > 1
                ? `${entry.token}#${entry.record_id || entry.seq_id || Object.keys(slugs).length}`
                : entry.token
            slugs[key] = {
                token: entry.token,
                slug: entry.slug,
                title: entry.title,
                parent_token: entry.parent_token,
            }
        })
        
        const slugs_arr = this.__uniquify(Object.values(slugs).map(s => s.slug instanceof Array ? s.slug[0][s.slug[0].type] : s.slug))
        const slug_keys = Object.keys(slugs)

        slug_keys.forEach((s, i) => {
            if (slugs[s].slug instanceof Array) {
                slugs[s].slug[0][slugs[s].slug[0].type] = slugs_arr[i]
            } else {
                slugs[s].slug = slugs_arr[i]
            }
        })

        slug_keys.forEach(s => {
            slugs[s].parent_slug = slugs[s].parent_token ? this.__slug_value(slugs[slugs[s].parent_token]?.slug) : null
        })

        this.slugs = slugs
    }

    __uniquify(arr) {
        const seen = []
        arr.forEach(item => {
            const lastIndex = seen.findLastIndex(s => s.match(new RegExp(`^${item}(_\\d+)?$`)))
            if (lastIndex === -1) {
                seen.push(item)
            } else {
                const seq = seen[lastIndex].match(/_\d+$/) ? parseInt(seen[lastIndex].match(/_\d+$/)[0].slice(1)) : 0
                seen.push(`${item}_${parseInt(seq) + 1}`)
            }
        })

        return seen
    }

    __slug_value(slug) {
        if (slug instanceof Array && slug[0] instanceof Object) {
            return slug[0][slug[0].type]
        }

        return slug
    }

    __slug_contexts(preferredSlugPrefix) {
        const contexts = [preferredSlugPrefix].filter(Boolean)
        if (preferredSlugPrefix && preferredSlugPrefix.includes('-')) {
            contexts.push(preferredSlugPrefix.split('-').pop())
        }

        return contexts
    }

    async __slugify(token, title=null, preferredSlugPrefix=null) {
        if (!this.slugs) {
            await this.__base()
        }

        var slug = this.slugs[token]
         
        if (!slug && title != null) {
            const tokenRecords = Object.keys(this.slugs).filter(key => key === token || this.slugs[key].token === token)
            const records = (tokenRecords.length > 0 ? tokenRecords : Object.keys(this.slugs))
                .filter(key => this.slugs[key].title == title)
            if (records.length === 1) {
                slug = this.slugs[records[0]] 
            } else if (records.length > 1) {
                const exactSlugRecords = records.filter(key => this.__slug_value(this.slugs[key].slug) === title)
                if (exactSlugRecords.length === 1) {
                    slug = this.slugs[exactSlugRecords[0]]
                }
            }

            if (!slug && records.length > 1) {
                if (preferredSlugPrefix) {
                    const contexts = this.__slug_contexts(preferredSlugPrefix)
                    let contextualRecords = records.filter(key => {
                        const parentSlug = this.slugs[key].parent_slug
                        return parentSlug && contexts.some(context => parentSlug === context)
                    })

                    if (contextualRecords.length !== 1) {
                        contextualRecords = records.filter(key => {
                            const parentSlug = this.slugs[key].parent_slug
                            return parentSlug && contexts.some(context => parentSlug.endsWith(`-${context}`))
                        })
                    }

                    if (contextualRecords.length !== 1) {
                        contextualRecords = records.filter(key => {
                            const value = this.__slug_value(this.slugs[key].slug)
                            return contexts.some(context => value === context || value.startsWith(`${context}-`))
                        })
                    }

                    if (contextualRecords.length === 1) {
                        slug = this.slugs[contextualRecords[0]]
                    }
                }
            }

            if (!slug && records.length > 1) {
                const matches = records.map(key => {
                    const matchSlug = this.__slug_value(this.slugs[key].slug)
                    return `${key}=>${matchSlug}`
                }).join(', ')
                throw new Error(`Ambiguous slug metadata for title "${title}" and token "${token}". Matching records: ${matches}`)
            }
        }

        if (slug) {
            slug = slug.slug
        }

        return this.__slug_value(slug)
    }

    __record_order(record) {
        const explicit = this.__plain_value(record.fields['Sidebar Order'] || record.fields['Nav Order'] || record.fields.Order)
        if (explicit && !Number.isNaN(Number(explicit))) return Number(explicit)
        return record.base_record_index ?? 0
    }

    __sort_records(records) {
        return records.sort((a, b) => {
            const aOrder = this.__record_order(a)
            const bOrder = this.__record_order(b)
            if (aOrder !== bOrder) return aOrder - bOrder
            return String(a.record_id).localeCompare(String(b.record_id))
        })
    }

    __parent_record_ids(record) {
        const parent = record.fields.Parent
        if (!parent) return []
        const items = parent instanceof Array ? parent : [parent]
        return items.map(item => {
            if (typeof item === 'string') return item
            if (item?.record_id) return item.record_id
            if (item?.record_ids instanceof Array) return item.record_ids
            if (item?.id) return item.id
            return null
        }).flat().filter(Boolean)
    }

    __source_files() {
        const sources = new Map()
        const files = fs.existsSync(this.doc_source_dir) ? fs.readdirSync(this.doc_source_dir).filter(file => file.endsWith('.json')) : []
        for (const file of files) {
            const source = JSON.parse(fs.readFileSync(`${this.doc_source_dir}/${file}`, 'utf8'))
            source.__source_file = file
            ;[source.node_token, source.origin_node_token, source.obj_token, source.token].filter(Boolean).forEach(token => {
                sources.set(token, source)
            })
        }
        return sources
    }

    async __fetch_base_doc_sources() {
        const sources = this.__source_files()
        for (const record of this.records || []) {
            const docField = this.__doc_field(record.fields)
            const docToken = this.__doc_token(docField)
            if (!docToken || sources.has(docToken)) continue

            const url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${docToken}`
            const jres = await (await fetch(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${this.token}`
                }
            })).json()

            if (jres.code !== 0) {
                console.warn(`[base-nav] Failed to resolve linked wiki node ${docToken}: ${JSON.stringify(jres)}`)
                continue
            }

            let node = jres.data.node
            if (node.node_type === 'shortcut') {
                const shortcutUrl = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${node.origin_node_token}`
                const shortcutJres = await (await fetch(shortcutUrl, {
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8',
                        'Authorization': `Bearer ${this.token}`
                    }
                })).json()
                if (shortcutJres.code === 0) {
                    node = shortcutJres.data.node
                }
            }

            node.slug = await this.__slugify(node.node_token, node.title)
            await this.__fetch_blocks(node)
            const filenameToken = node.origin_node_token || node.node_token || node.obj_token || docToken
            if (!node.origin_node_token) node.origin_node_token = filenameToken
            this.__write_source(node, `${this.doc_source_dir}/${filenameToken}.json`)
            ;[node.node_token, node.origin_node_token, node.obj_token, node.token].filter(Boolean).forEach(token => {
                sources.set(token, node)
            })
            console.log(`[base-nav] Fetched linked Base doc ${filenameToken}.json`)
        }
    }

    __nav_token(record) {
        return `base:${record.base_table_id}:${record.record_id}`
    }

    __nav_file_name(nodeToken) {
        return `${nodeToken.replace(/[^a-zA-Z0-9_-]/g, '_')}.json`
    }

    __nav_ref(source) {
        const ref = _.cloneDeep(source)
        delete ref.blocks
        delete ref.children
        delete ref.__source_file
        return ref
    }

    __record_title(record) {
        return this.__doc_title(this.__doc_field(record.fields)) || this.__plain_value(record.fields.Labels) || record.record_id
    }

    __record_slug(record) {
        return this.__plain_value(record.fields.Slug) || slugify(this.__record_title(record), { lower: true, strict: true })
    }

    __placement_type(record) {
        const value = this.__plain_value(record.fields['Placement Type'])
        const normalized = value ? value.trim().toLowerCase() : ''
        if (['canonical', 'ref', 'section', 'link'].includes(normalized)) return normalized
        return this.__doc_token(this.__doc_field(record.fields)) && record.fields.Slug ? 'canonical' : 'section'
    }

    __is_structural_record(record) {
        const placementType = this.__placement_type(record)
        return placementType === 'section' || placementType === 'ref' || placementType === 'link' || !this.__doc_token(this.__doc_field(record.fields)) || !record.fields.Slug
    }

    __source_base_meta(source, record) {
        const placementType = this.__placement_type(record)
        source.base_record_id = record.record_id
        source.base_table_id = record.base_table_id
        source.base_table_name = record.base_table_name
        source.base_record_index = record.base_record_index
        source.base_placement_type = placementType
        if (placementType === 'section') return source
        source.base_targets = (record.fields.Targets || record.fields['Publish Targets'] || [])
        source.base_status = record.fields.Status || record.fields.Progress || null
        source.base_labels = record.fields.Labels || null
        source.base_beta = record.fields.Beta || record.fields.beta || null
        source.base_ref_target_doc = record.fields['Ref Target Doc'] || null
        return source
    }

    __safe_decode_url(value) {
        if (!value) return null
        let decoded = String(value)
        for (let i = 0; i < 2; i++) {
            try {
                const next = decodeURIComponent(decoded)
                if (next === decoded) break
                decoded = next
            } catch (_) {
                break
            }
        }
        return decoded
    }

    __content_link_target(url) {
        const decoded = this.__safe_decode_url(url)
        if (!decoded) return null
        const linkMatch = decoded.match(/https?:\/\/\S+/)
        const link = linkMatch ? linkMatch[0] : decoded.trim()
        let parsed
        try {
            parsed = new URL(link)
        } catch (_) {
            return null
        }

        const host = parsed.hostname.toLowerCase()
        if (!host.includes('feishu.cn') && !host.includes('larksuite.com')) {
            return null
        }

        const segments = parsed.pathname.split('/').filter(Boolean)
        const kind = segments[0]
        if (!['wiki', 'doc', 'docs', 'docx'].includes(kind)) {
            return null
        }

        const token = segments[segments.length - 1]
        if (!token) return null
        return {
            url: decoded,
            token,
            kind,
            anchor: parsed.hash ? parsed.hash.slice(1) : null,
        }
    }

    __source_token_aliases(source) {
        return [source.node_token, source.origin_node_token, source.obj_token, source.token]
            .filter(Boolean)
    }

    __record_graph() {
        const sources = this.__source_files()
        const canonicalByToken = new Map()
        const records = this.records || []

        for (const record of records) {
            const placementType = this.__placement_type(record)
            if (placementType !== 'canonical') continue

            const docField = this.__doc_field(record.fields)
            const docToken = this.__doc_token(docField)
            if (!docToken) continue

            const canonical = {
                record_id: record.record_id,
                table_id: record.base_table_id,
                table_name: record.base_table_name,
                title: this.__record_title(record),
                slug: this.__record_slug(record),
                doc_token: docToken,
            }
            canonicalByToken.set(docToken, canonical)

            const source = sources.get(docToken)
            if (source) {
                for (const alias of this.__source_token_aliases(source)) {
                    canonicalByToken.set(alias, canonical)
                }
            }
        }

        return { sources, canonicalByToken }
    }

    __walk_json(value, visit) {
        if (!value || typeof value !== 'object') return
        visit(value)
        if (value instanceof Array) {
            value.forEach(item => this.__walk_json(item, visit))
            return
        }
        Object.values(value).forEach(item => this.__walk_json(item, visit))
    }

    __content_links_for_source(source) {
        const links = []
        const blocks = source.blocks?.items || []
        for (const block of blocks) {
            this.__walk_json(block, value => {
                if (value.mention_doc?.url) {
                    const target = this.__content_link_target(value.mention_doc.url)
                    if (target) {
                        links.push({
                            source_type: 'mention_doc',
                            source_token: source.node_token || source.origin_node_token || source.obj_token || source.token,
                            source_title: source.title || source.name || null,
                            source_slug: source.slug || null,
                            block_id: block.block_id || null,
                            link_text: value.mention_doc.title || null,
                            raw_url: this.__safe_decode_url(value.mention_doc.url),
                            ...target,
                        })
                    }
                }

                const textRun = value.text_run
                const linkUrl = textRun?.text_element_style?.link?.url
                if (linkUrl) {
                    const target = this.__content_link_target(linkUrl)
                    if (target) {
                        links.push({
                            source_type: 'href_link',
                            source_token: source.node_token || source.origin_node_token || source.obj_token || source.token,
                            source_title: source.title || source.name || null,
                            source_slug: source.slug || null,
                            block_id: block.block_id || null,
                            link_text: textRun.content || null,
                            raw_url: this.__safe_decode_url(linkUrl),
                            ...target,
                        })
                    }
                }
            })
        }
        return links
    }

    __content_link_report_path() {
        const parent = node_path.dirname(this.doc_source_dir.replace(/\/$/, ''))
        return node_path.join(parent, 'reports', 'broken-content-links.json')
    }

    async validate_content_links({ reportPath=null, failOnBroken=false } = {}) {
        if (!this.records) {
            await this.__base()
        }

        const { canonicalByToken } = this.__record_graph()
        const files = fs.existsSync(this.doc_source_dir)
            ? fs.readdirSync(this.doc_source_dir).filter(file => file.endsWith('.json'))
            : []
        const contentLinks = []
        const brokenContentLinks = []
        let scannedSources = 0
        let skippedNonCanonicalSources = 0

        for (const file of files) {
            const source = JSON.parse(fs.readFileSync(`${this.doc_source_dir}/${file}`, 'utf8'))
            if (!source.blocks?.items) continue
            const isCanonicalSource = this.__source_token_aliases(source)
                .some(token => canonicalByToken.has(token))
            if (!isCanonicalSource) {
                skippedNonCanonicalSources++
                continue
            }
            scannedSources++

            const links = this.__content_links_for_source(source)
            for (const link of links) {
                contentLinks.push(link)
                if (!canonicalByToken.has(link.token)) {
                    brokenContentLinks.push({
                        reason: 'missing canonical',
                        source_file: file,
                        ...link,
                    })
                }
            }
        }

        const report = {
            generated_at: new Date().toISOString(),
            source_dir: this.doc_source_dir,
            base_app_token: this.base_app_token,
            base_table_id: this.base_table_id,
            summary: {
                canonical_tokens: canonicalByToken.size,
                scanned_sources: scannedSources,
                skipped_noncanonical_sources: skippedNonCanonicalSources,
                content_links: contentLinks.length,
                broken_content_links: brokenContentLinks.length,
            },
            broken_content_links: brokenContentLinks,
        }

        const output = reportPath || this.__content_link_report_path()
        fs.mkdirSync(node_path.dirname(output), { recursive: true })
        fs.writeFileSync(output, JSON.stringify(report, null, 2))

        if (brokenContentLinks.length > 0) {
            console.warn(`[content-links] Found ${brokenContentLinks.length} Feishu doc link(s) without canonical Base records. Report written to ${output}`)
            if (failOnBroken) {
                throw new Error(`[content-links] Broken content links found: ${brokenContentLinks.length}. See ${output}`)
            }
        } else {
            console.log(`[content-links] No broken Feishu doc links found. Report written to ${output}`)
        }

        return report
    }

    __virtual_source({ nodeToken, parentToken, title, slug, children=[] }) {
        return {
            obj_type: 'folder',
            node_type: 'folder',
            type: 'folder',
            title,
            name: title,
            slug,
            node_token: nodeToken,
            origin_node_token: nodeToken,
            parent_node_token: parentToken,
            base_nav_virtual: true,
            has_child: children.length > 0,
            children,
        }
    }

    async __apply_base_navigation({ partialTables=false } = {}) {
        if (!this.records) {
            await this.__base()
        }
        if (!this.records || this.records.length === 0 || !this.base_tables || !this.use_all_base_tables) {
            return
        }

        await this.__fetch_base_doc_sources()
        const sources = this.__source_files()
        const root = sources.get(this.root)
        if (!root) {
            console.warn(`[base-nav] Root source ${this.root} not found; skipping Base navigation rewrite.`)
            return
        }

        const recordsById = new Map(this.records.map(record => [record.record_id, record]))
        const sourcesByToken = () => this.__source_files()
        const childrenByParent = new Map()
        for (const record of this.records) {
            const parentIds = this.__parent_record_ids(record)
            const parentKey = parentIds.find(id => recordsById.has(id)) || `${record.base_table_id}:root`
            if (!childrenByParent.has(parentKey)) childrenByParent.set(parentKey, [])
            childrenByParent.get(parentKey).push(record)
        }

        const materializeRecord = (record, parentToken) => {
            const children = this.__sort_records([...(childrenByParent.get(record.record_id) || [])])
                .map(child => materializeRecord(child, this.__nav_token(record)))
            const docField = this.__doc_field(record.fields)
            const docToken = this.__doc_token(docField)
            const placementType = this.__placement_type(record)
            const isStructural = this.__is_structural_record(record)
            const title = this.__record_title(record)
            const slug = this.__record_slug(record)
            const titleMatches = Array.from(new Set(Array.from(sources.values())))
                .filter(source => !source.base_nav_virtual && (source.title === title || source.name === title))
            const existingSource = isStructural ? null : (docToken ? sources.get(docToken) : (titleMatches.length === 1 ? titleMatches[0] : null))
            let source

            if (placementType === 'ref') {
                const targetToken = this.__field_token(record.fields['Ref Target Doc'])
                const targetSource = targetToken ? sourcesByToken().get(targetToken) : null
                if (!targetSource) {
                    console.warn(`[base-nav] Ref target not found for "${title}" (${record.record_id}): ${targetToken || 'empty Ref Target Doc'}`)
                }
                source = this.__virtual_source({
                    nodeToken: this.__nav_token(record),
                    parentToken,
                    title,
                    slug: targetSource?.slug || slug,
                    children: [],
                })
                source.base_nav_ref = true
                source.base_nav_ref_target_token = targetToken
                source.base_nav_ref_target_title = targetSource?.title || targetSource?.name || null
            } else if (placementType === 'link') {
                source = this.__virtual_source({
                    nodeToken: this.__nav_token(record),
                    parentToken,
                    title,
                    slug,
                    children: [],
                })
                source.base_nav_link = true
                source.base_nav_link_href = this.__field_href(record.fields['Ref Target Doc']) || this.__doc_link(docField) || null
            } else if (existingSource && record.fields.Slug) {
                source = existingSource
                source.title = title
                source.name = title
                source.slug = slug
                source.parent_node_token = parentToken
                source.has_child = children.length > 0
                if (children.length > 0) {
                    source.children = children
                } else {
                    delete source.children
                }
            } else {
                source = this.__virtual_source({
                    nodeToken: this.__nav_token(record),
                    parentToken,
                    title,
                    slug,
                    children,
                })
            }

            this.__source_base_meta(source, record)
            const filename = source.__source_file || this.__nav_file_name(source.node_token || source.token)
            delete source.__source_file
            fs.writeFileSync(`${this.doc_source_dir}/${filename}`, JSON.stringify(source, null, 2))
            return this.__nav_ref(source)
        }

        const tableChildren = []
        for (const table of this.base_tables) {
            const tableToken = `base:${table.table_id}`
            const rows = this.__sort_records([...(childrenByParent.get(`${table.table_id}:root`) || [])])
            const children = rows.map(record => materializeRecord(record, tableToken))
            const tableSource = this.__virtual_source({
                nodeToken: tableToken,
                parentToken: this.root,
                title: table.name || table.table_id,
                slug: slugify(table.name || table.table_id, { lower: true, strict: true }),
                children,
            })
            tableSource.base_table_id = table.table_id
            fs.writeFileSync(`${this.doc_source_dir}/${this.__nav_file_name(tableToken)}`, JSON.stringify(tableSource, null, 2))
            tableChildren.push(this.__nav_ref(tableSource))
        }

        if (partialTables) {
            const selectedTokens = new Set(tableChildren.map(child => child.node_token))
            const tableByToken = new Map(tableChildren.map(child => [child.node_token, child]))
            const nextChildren = []

            for (const child of root.children || []) {
                if (selectedTokens.has(child.node_token)) {
                    nextChildren.push(tableByToken.get(child.node_token))
                    tableByToken.delete(child.node_token)
                } else {
                    nextChildren.push(child)
                }
            }

            nextChildren.push(...tableByToken.values())
            root.children = nextChildren
        } else {
            root.children = tableChildren
        }
        root.has_child = (root.children || []).length > 0
        const rootFile = root.__source_file || `${root.origin_node_token || root.node_token}.json`
        delete root.__source_file
        fs.writeFileSync(`${this.doc_source_dir}/${rootFile}`, JSON.stringify(root, null, 2))
        console.log(`[base-nav] Rewrote navigation from ${this.base_tables.length} Base table(s).`)
    }

    async fetch_base_table_sources(tableFilter) {
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        this.token = await fetcher.token()
        await this.__base({ tableFilter, force: true })
        await this.__apply_base_navigation({ partialTables: true })
    }

    async __split_one_pager(node) {
        if (!this.records) {
            await this.__base()
        }

        const directChildren = []

        const tokens = this.records.map(r => r.fields.Docs.link.split('#')[1]).sort((a, b) => node.blocks.items.findIndex(block => block.block_id == a) - node.blocks.items.findIndex(block => block.block_id == b))
        const indexes = tokens.map(t => node.blocks.items.findIndex(b => b.block_id == t))

        const pages = []
        
        for (let i = 1; i < indexes.length; i++) {
            if (i === indexes.length - 1) {
                pages.push(node.blocks.items.slice(indexes[i-1], indexes[i]))
                pages.push(node.blocks.items.slice(indexes[i]))
            } else {
                pages.push(node.blocks.items.slice(indexes[i-1], indexes[i]))
            }
        }

        if (pages.find(p => p.length === 0)) {
            // fs.writeFileSync('tokens.json', JSON.stringify(tokens, null, 2))
            // fs.writeFileSync('indexes.json', JSON.stringify(indexes, null, 2))
            // fs.writeFileSync('pages.json', JSON.stringify(pages, null, 2))
            throw new Error(`One pager has empty page ${tokens.filter((_, i) => i === pages.findIndex(p => p.length === 0))[0]}`)
        }

        for (let record of this.records) {
            const source = _.cloneDeep(node)
            source.obj_token = record.fields.Docs.link.split('#').pop()
            source.node_token = `${node.node_token}#${source.obj_token}`
            source.parent_node_token = record.fields.Parent[0].text ? this.records.find(r => r.fields['Seq. ID'] == record.fields.Parent[0].text).fields.Docs.link.split('#').pop() : node.node_token
            source.title = record.fields.Docs.text
            source.slug = await this.__slugify(`${node.node_token}#${source.obj_token}`, source.title)

            // blocks
            source.blocks = { items: [], counts: 0 }
            const blocks = pages.filter(p => record.fields.Docs.link.endsWith(p[0].block_id))
            if (blocks.length > 0) {
                source.blocks.counts = blocks[0].length
                source.blocks.items = blocks[0]
                source.blocks.items[0].block_type = 1
                source.blocks.items[0].children = blocks[0].slice(1).filter(b => b.parent_id === node.obj_token).map(b => b.block_id)
                source.blocks.items[0].parent_id = ""
                const heading = Object.keys(source.blocks.items[0]).find(key => key.startsWith('heading'))
                source.blocks.items[0].page = _.cloneDeep(source.blocks.items[0][heading])
                delete source.blocks.items[0][heading]

                source.blocks.items.slice(1).forEach(block => {
                    if (block.parent_id === node.obj_token) {
                        block.parent_id = source.blocks.items[0].block_id
                    }
                })
            }
            
            // children
            if (this.records.find(r => parseInt(r.fields.Parent[0].text) == record.fields['Seq. ID'])) {
                source.has_child = true
                source.children = []
                const children = this.records.filter(r => r.fields.Parent[0].text == record.fields['Seq. ID'])
                for (let child of children) {
                    const child_source = _.cloneDeep(node)
                    delete child_source.blocks
                    child_source.obj_token = child.fields.Docs.link.split('#').pop()
                    child_source.node_token = `${node.node_token}#${child_source.obj_token}`
                    child_source.parent_node_token = source.node_token
                    child_source.title = child.fields.Docs.text
                    child_source.slug = await this.__slugify(`${node.node_token}#${child_source.obj_token}`, child_source.title)
                    source.children.push(child_source)
                }
            }

            if (source.parent_node_token == node.node_token) {
                const cpSource = _.cloneDeep(source)
                delete cpSource.blocks
                delete cpSource.children
                directChildren.push(cpSource)
            }            

            fs.writeFileSync(`${this.doc_source_dir}/${source.obj_token}.json`, JSON.stringify(source, null, 2))
            console.log(`7. Fetched ${source.obj_token}.json`)
        }

        node.children = directChildren
        node.has_child = true
        const onePagerToken = this.__resolve_wiki_file_token(node)
        this.__cleanup_legacy_empty_token_file(node, onePagerToken)
        fs.writeFileSync(`${this.doc_source_dir}/${onePagerToken}.json`, JSON.stringify(node, null, 2))
        console.log(`3. Fetched ${onePagerToken}.json`)

    }

    async __fetch_wiki_children(node, recursive=false) {
        node.slug = await this.__slugify(node.node_token, node.title)
        await this.__fetch_blocks(node)

        if (node.node_type == 'shortcut') {
            let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${node.origin_node_token}`
            let res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            let jres = await res.json()

            if (jres.code == 0) {
                const resolvedNode = jres.data.node
                await this.__fetch_wiki_children(resolvedNode, recursive)
                await this.__fetch_blocks(resolvedNode)
            }
        }

        if (node.has_child) {
            let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/${SPACE_ID}/nodes?page_size=50&parent_node_token=${node.origin_node_token}`
            let res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            let jres = await res.json()

            if (jres.code == 0) {
                const children = []
                for (let item of jres.data.items) {
                    if (item.node_type == 'shortcut') {
                        let shortcutUrl = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${item.origin_node_token}`
                        let shortcutRes = await fetch(shortcutUrl, {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Authorization': `Bearer ${this.token}`
                            }
                        })
                        let shortcutJres = await shortcutRes.json()
                        if (shortcutJres.code == 0) {
                            item = shortcutJres.data.node
                        }
                    }
                    item.slug = await this.__slugify(item.node_token, item.title)
                    children.push(item)
                }
                node.children = children

                const nodeFileToken = this.__resolve_wiki_file_token(node)
                this.__cleanup_legacy_empty_token_file(node, nodeFileToken)
                fs.writeFileSync(`${this.doc_source_dir}/${nodeFileToken}.json`, JSON.stringify(node, null, 2))
                console.log(`0. Fetched ${nodeFileToken}.json`)

                if (recursive) {
                    for (const child of node.children) {
                        await this.__fetch_wiki_children(child, recursive)
                    }
                }
            } else if (jres.status == 429) {
                const timeout = res.headers['x-ogw-ratelimit-reset']
                await this.__wait(timeout * 1000)
                await this.__fetch_wiki_children(node, recursive)
            }
        } else {
            const nodeFileToken = this.__resolve_wiki_file_token(node)
            this.__cleanup_legacy_empty_token_file(node, nodeFileToken)
            fs.writeFileSync(`${this.doc_source_dir}/${nodeFileToken}.json`, JSON.stringify(node, null, 2))
            console.log(`2. Fetched ${nodeFileToken}.json`)
        }
    }

    async __fetch_drive_children(folder_token, page_token=null, recursive=false, preferredSlugPrefix=null) {
        var page_token_expr = page_token ? `&page_token=${page_token}` : ''

        let url = `${FEISHU_HOST}/open-apis/drive/v1/files?folder_token=${folder_token}${page_token_expr}`
        let jres = await this.__fetchFeishuJson(url, {}, `list drive children ${folder_token}`)

        if (jres.code == 0) {
            this.docs.children = jres.data.files.sort((a, b) => {
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
                if (nameA < nameB) {
                    return -1;
                }
                if (nameA > nameB) {
                    return 1;
                }
                return 0;
            })
            
            const resolvedDocSlug = await this.__slugify(this.docs.token, this.docs.name, preferredSlugPrefix)
            this.docs.slug = resolvedDocSlug || this.docs.slug

            if (jres.has_more) {
                await this.__fetch_drive_children(folder_token, jres.data.next_page_token, recursive, preferredSlugPrefix)
            }

            if (!this.slugs) {
                await this.__base()
            }

            if (this.docs.children.filter(c => c.name == this.docs.name && c.type == 'docx').length > 0) {
                const slug = this.slugs[this.docs.children.filter(c => c.name == this.docs.name && c.type == 'docx')[0].token]
                if (slug) {
                    this.docs.slug = slug.slug instanceof Array ? slug.slug[0][slug.slug[0].type] : slug.slug
                }
            }

            fs.writeFileSync(`${this.doc_source_dir}/${folder_token}.json`, JSON.stringify(this.docs, null, 2))
            console.log(`3. Fetched ${folder_token}.json`)

            if (recursive) {
                const currentDoc = this.docs
                for (let child of currentDoc.children) {
                    if (child.type == 'folder') {
                        const parentSlug = currentDoc.slug
                        this.docs = child
                        const childSlug = await this.__slugify(this.docs.token, this.docs.name, parentSlug)
                        this.docs.slug = childSlug
                        await this.__fetch_drive_children(child.token, null, recursive, childSlug)
                        this.docs = currentDoc
                    }

                    if (child.type == 'docx') {
                        await this.__fetch_blocks(child)
                        child.slug = await this.__slugify(child.token, child.name, currentDoc.slug)
                        this.__write_source(child, `${this.doc_source_dir}/${child.token}.json`)
                        console.log(`4. Fetched ${child.token}.json`)
                    }
                }
            }
        }
    }

    async __fetch_blocks(node, page_token=null, attempt=1) {
        var token;
        const keys = Object.keys(node)
        if (keys.includes('obj_type') && node.obj_type == 'docx') {
            token = node.obj_token
        } else if (keys.includes('type') && node.type == 'docx') {
            token = node.token
        }

        if (token) {
            const page_token_expr = page_token ? `?page_token=${page_token}` : ''
            let url = `${FEISHU_HOST}/open-apis/docx/v1/documents/${token}/blocks${page_token_expr}`
            let res = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${this.token}`
                }
            })

            let jres = await res.json()

            if (jres.code == 0) {
                if (page_token === null) {
                    node.blocks = {}
                    node.blocks.items = jres.data.items
                    node.blocks.counts = jres.data.items.length
                } else {
                    jres.data.items.forEach(item => node.blocks.items.push(item))
                    node.blocks.counts = node.blocks.items.length
                }

                if (jres.data.has_more && jres.data.page_token) {
                    await this.__fetch_blocks(node, jres.data.page_token)
                }

                if (node.blocks.counts > 0) {
                    for (let item of node.blocks.items) {
                        if (Object.keys(item).includes('sheet')) {
                            const sheetToken = item.sheet.token.split('_')[0]
                            const sheetTitle = item.sheet.token.split('_')[1]

                            item.sheet.meta = await this.__fetch_sheet_meta(sheetToken, sheetTitle)
                            item.sheet.values = await this.__fetch_sheet_values(sheetToken, sheetTitle)
                            console.log(`Fetched sheet ${item.sheet.token}`)
                        }
                    }
                }
            } else if (jres.code == 99991400) {
                const timeout = res.headers['x-ogw-ratelimit-reset']
                await this.__wait(timeout * 1000)
                await this.__fetch_blocks(node, page_token, attempt)
            } else {
                const MAX_ATTEMPTS = 3
                if (attempt < MAX_ATTEMPTS) {
                    const backoff = attempt * 2000
                    console.warn(`[fetch_blocks] Unexpected error code ${jres.code} for token ${token} (attempt ${attempt}/${MAX_ATTEMPTS}). Retrying in ${backoff}ms...`)
                    await this.__wait(backoff)
                    await this.__fetch_blocks(node, page_token, attempt + 1)
                } else {
                    throw new Error(`[fetch_blocks] Failed to fetch blocks for token ${token} after ${MAX_ATTEMPTS} attempts. Last error code: ${jres.code} — ${JSON.stringify(jres)}`)
                }
            }
        }
    }

    async __fetch_sheet_meta(sheetToken, sheetTitle) {
        const sheetMetaUrl = `${FEISHU_HOST}/open-apis/sheets/v3/spreadsheets/${sheetToken}/sheets/${sheetTitle}`

        var res = await fetch(sheetMetaUrl, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })

        if (res.status == 200) {
            var sheetMetas = await res.json()
            return sheetMetas
        } else if (res.status == 429) {
            const timeout = res.headers['x-ogw-ratelimit-reset']
            await this.__wait(timeout * 1000)
            await this.__fetch_sheet_meta(sheetToken, sheetTitle)
        }
    }

    async __fetch_sheet_values(sheetToken, sheetTitle) {
        const sheetDataUrl = `${FEISHU_HOST}/open-apis/sheets/v2/spreadsheets/${sheetToken}/values/${sheetTitle}?valueRenderOption=UnformattedValue`

        var res = await fetch(sheetDataUrl, {
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })

        if (res.status == 200) {
            var sheetData = await res.json()
            return sheetData
        } else if (res.status == 429) {
            const timeout = res.headers['x-ogw-ratelimit-reset']
            await this.__wait(timeout * 1000)
            await this.__fetch_sheet_values(sheetToken, sheetTitle)
        }
    }
}

module.exports = larkDocScraper
