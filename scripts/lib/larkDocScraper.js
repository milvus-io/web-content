const tokenFetcher = require('./larkTokenFetcher.js')
const { fetchFeishuJsonWithRetry } = require('./feishuFetch.js')
const fs = require('fs')
const node_path = require('path')
const _ = require('lodash')
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
        this.base = base_app_id
        this.target_type = target_type
        this.doc_source_dir = doc_source_dir
        this.limiter = new Bottleneck({
            maxConcurrent: FEISHU_MAX_CONCURRENT,
            minTime: FEISHU_MIN_TIME_MS,
        })

        // fs.rmSync(this.doc_source_dir, { recursive: true, force: true })
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
            let jres = await this.__fetchFeishuJson(url, {}, `get wiki node ${page_token}`)

            if (jres.code == 0) {
                this.docs = jres.data.node
                await this.__fetch_wiki_children(this.docs, recursive)
            }
        }

        if (this.target_type == "onePager") {
            let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${page_token}`
            let jres = await this.__fetchFeishuJson(url, {}, `get onePager node ${page_token}`)

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
                        fs.writeFileSync(`${this.doc_source_dir}/${page}`, JSON.stringify(source, null, 2))
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
                let jres = await this.__fetchFeishuJson(url, {}, `get drive folder ${page_token}`)

                if (jres.code == 0) {
                    this.docs = jres.data
                    await this.__fetch_drive_children(this.docs.token, null, recursive)
                }
            }
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

    async __fetchFeishuJson(url, options={}, label=url) {
        return await this.limiter.schedule(() => fetchFeishuJsonWithRetry(url, {
            ...options,
            headers: {
                'Authorization': `Bearer ${this.token}`,
                ...options.headers,
            },
        }, label))
    }

    async __base() {
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        const token = await fetcher.token()

        let url = `${FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base}/tables`
        const table_id = (await this.__fetchFeishuJson(url, {
            method: "get",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, 'list bitable tables')).data.items[0].table_id

        url = `${FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base}/tables/${table_id}/records?page_size=500`
        const records = (await this.__fetchFeishuJson(url, {
            method: "get",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, 'list bitable records')).data.items

        this.records = records

        // fs.writeFileSync(`records.json`, JSON.stringify(this.records, null, 2))

        const slugEntries = []
        const recordsBySeqId = new Map(records.map(record => [record.fields['Seq. ID'], record]))
        const recordsByRecordId = new Map(records.map(record => [record.record_id, record]))
        if (records.length > 0) {
            for (let record of records) {
                if (record.fields.Slug) {
                    const parentSeqId = record.fields.Parent?.[0]?.text || null
                    const parentRecordId = record.fields['父记录']?.[0]?.record_ids?.[0] || record.fields.Parent?.[0]?.record_ids?.[0] || null
                    const parentRecord = parentRecordId
                        ? recordsByRecordId.get(parentRecordId)
                        : parentSeqId
                            ? recordsBySeqId.get(parentSeqId)
                            : null
                    slugEntries.push({
                        key: record.fields.Docs.link.split('/').pop(),
                        token: record.fields.Docs.link.split('/').pop(),
                        slug: record.fields.Slug,
                        title: record.fields.Docs.text,
                        parent_token: parentRecord?.fields?.Docs?.link?.split('/').pop() || null,
                        record_id: record.record_id,
                        seq_id: record.fields['Seq. ID'],
                    })
                } else {
                    throw new Error(`Slug field not found for record ${record.fields['Seq. ID']}`)
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

        // fs.writeFileSync(`slugs.json`, JSON.stringify(this.slugs, null, 2))
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
            await this.__base(this.base)
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
            let jres = await this.__fetchFeishuJson(url, {}, `get shortcut node ${node.origin_node_token}`)

            if (jres.code == 0) {
                this.docs = jres.data.node
                await this.__fetch_wiki_children(this.docs, recursive)
                await this.__fetch_blocks(this.docs)
            }            
        }

        if (node.has_child) {
            let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/${SPACE_ID}/nodes?page_size=50&parent_node_token=${node.origin_node_token}`
            let jres = await this.__fetchFeishuJson(url, {}, `list wiki children ${node.origin_node_token}`)

            if (jres.code == 0) {
                node.children = await Promise.all(jres.data.items.map(async item => {
                    if (item.node_type == 'shortcut') {
                        let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${item.origin_node_token}`
                        let jres = await this.__fetchFeishuJson(url, {}, `get child shortcut node ${item.origin_node_token}`)
                        
                        if (jres.code == 0) {
                            item = jres.data.node
                        }
                    }

                    item.slug = await this.__slugify(item.node_token, item.title)
                    return item
                }))
                
                const nodeFileToken = this.__resolve_wiki_file_token(node)
                this.__cleanup_legacy_empty_token_file(node, nodeFileToken)
                fs.writeFileSync(`${this.doc_source_dir}/${nodeFileToken}.json`, JSON.stringify(node, null, 2))
                console.log(`0. Fetched ${nodeFileToken}.json`)
                
                if (recursive) {
                    await Promise.all(node.children.map(async child => {
                        await this.__fetch_wiki_children(child, recursive)
                        await this.__fetch_blocks(child)
                        child.slug = await this.__slugify(child.node_token, child.title)
                        const childFileToken = this.__resolve_wiki_file_token(child)
                        this.__cleanup_legacy_empty_token_file(child, childFileToken)
                        fs.writeFileSync(`${this.doc_source_dir}/${childFileToken}.json`, JSON.stringify(child, null, 2))
                        console.log(`1. Fetched ${childFileToken}.json`)
                        delete child.children
                        delete child.blocks
                    }))
                }
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
                await this.__base(this.base)
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
                        fs.writeFileSync(`${this.doc_source_dir}/${child.token}.json`, JSON.stringify(child, null, 2))
                        console.log(`4. Fetched ${child.token}.json`)
                    }
                }
            }
        }
    }

    async __fetch_blocks(node, page_token=null) {
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
            let jres = await this.__fetchFeishuJson(url, {}, `list docx blocks ${token}`)

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
                            const token = item.sheet.token.split('_')[0]
                            const title = item.sheet.token.split('_')[1]

                            item.sheet.meta = await this.__fetch_sheet_meta(token, title)
                            item.sheet.values = await this.__fetch_sheet_values(token, title)
                            console.log(`Fetched sheet ${item.sheet.token}`)
                        }
                    }
                }
            }
        }
    }

    async __fetch_sheet_meta(sheetToken, sheetTitle) {
        const sheetMetaUrl = `${FEISHU_HOST}/open-apis/sheets/v3/spreadsheets/${sheetToken}/sheets/${sheetTitle}`
        return await this.__fetchFeishuJson(sheetMetaUrl, {
            headers: { 'Content-Type': 'application/json' }
        }, `get sheet meta ${sheetToken}/${sheetTitle}`)
    }

    async __fetch_sheet_values(sheetToken, sheetTitle) {
        const sheetDataUrl = `${FEISHU_HOST}/open-apis/sheets/v2/spreadsheets/${sheetToken}/values/${sheetTitle}?valueRenderOption=UnformattedValue`
        return await this.__fetchFeishuJson(sheetDataUrl, {
            headers: { 'Content-Type': 'application/json' }
        }, `get sheet values ${sheetToken}/${sheetTitle}`)
    }
}

module.exports = larkDocScraper
