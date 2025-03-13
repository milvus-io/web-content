const fetch = require('node-fetch')
const tokenFetcher = require('./larkTokenFetcher.js')
const fs = require('fs')
const node_path = require('path')
const _ = require('lodash')
require('dotenv').config()

const FEISHU_HOST = process.env.FEISHU_HOST
const SPACE_ID = process.env.SPACE_ID

class larkDocScraper {
    constructor(root_node, base_app_id, target_type, doc_source_dir) {
        this.docs = undefined
        this.root = root_node
        this.base = base_app_id
        this.target_type = target_type
        this.doc_source_dir = doc_source_dir

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
    }    

    async __wait(duration) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve()
            }, duration)
        })
    }

    async __base() {
        const fetcher = new tokenFetcher()
        await fetcher.fetchToken()
        const token = await fetcher.token()

        let url = `${FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base}/tables`
        const table_id = (await (await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })).json()).data.items[0].table_id

        url = `${FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base}/tables/${table_id}/records?page_size=500`
        const records = (await (await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })).json()).data.items

        this.records = records

        // fs.writeFileSync(`records.json`, JSON.stringify(this.records, null, 2))

        const slugs = {}
        if (records.length > 0) {
            for (let record of records) {
                if (record.fields.Slug) {
                    slugs[record.fields.Docs.link.split('/').pop()] = { slug: record.fields.Slug, title: record.fields.Docs.text }
                } else {
                    throw new Error(`Slug field not found for record ${record.fields['Seq. ID']}`)
                }
            }
        }
        
        const slugs_arr = this.__uniquify(Object.values(slugs).map(s => s.slug instanceof Array ? s.slug[0][s.slug[0].type] : s.slug))
        const slug_keys = Object.keys(slugs)

        slug_keys.forEach((s, i) => {
            if (slugs[s].slug instanceof Array) {
                slugs[s].slug[0][slugs[s].slug[0].type] = slugs_arr[i]
            } else {
                slugs[s].slug = slugs_arr[i]
            }
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

    async __slugify(token, title=null) {
        if (!this.slugs) {
            await this.__base(this.base)
        }

        var slug = this.slugs[token]
         
        if (!slug) {
            const record = Object.keys(this.slugs).filter(key => this.slugs[key].title == title)
            if (record.length > 0) {
                slug = this.slugs[record[0]] 
            }
        }

        if (slug) {
            slug = slug.slug
        }

        if (slug instanceof Array) {
            if (slug[0] instanceof Object) {
                return slug[0][slug[0].type]
            }
        }

        return slug
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
        fs.writeFileSync(`${this.doc_source_dir}/${node.origin_node_token}.json`, JSON.stringify(node, null, 2))
        console.log(`3. Fetched ${node.origin_node_token}.json`)

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
                this.docs = jres.data.node
                await this.__fetch_wiki_children(this.docs, recursive)
                await this.__fetch_blocks(this.docs)
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
                node.children = await Promise.all(jres.data.items.map(async item => {
                    if (item.node_type == 'shortcut') {
                        let url = `${FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${item.origin_node_token}`
                        let res = await fetch(url, {
                            headers: {
                                'Content-Type': 'application/json; charset=utf-8',
                                'Authorization': `Bearer ${this.token}`
                            }
                        })
            
                        let jres = await res.json()
                        
                        if (jres.code == 0) {
                            item = jres.data.node
                        }
                    }

                    item.slug = await this.__slugify(item.node_token, item.title)
                    return item
                }))
                
                fs.writeFileSync(`${this.doc_source_dir}/${node.origin_node_token}.json`, JSON.stringify(node, null, 2))
                console.log(`0. Fetched ${node.origin_node_token}.json`)
                
                if (recursive) {
                    await Promise.all(node.children.map(async child => {
                        await this.__fetch_wiki_children(child, recursive)
                        await this.__fetch_blocks(child)
                        child.slug = await this.__slugify(child.node_token, child.title)
                        fs.writeFileSync(`${this.doc_source_dir}/${child.origin_node_token}.json`, JSON.stringify(child, null, 2))
                        console.log(`1. Fetched ${child.origin_node_token}.json`)
                        delete child.children
                        delete child.blocks
                    }))
                }
            } else if (jres.status == 429) {
                const timeout = res.headers['x-ogw-ratelimit-reset']
                await this.__wait(timeout * 1000)
                await this.__fetch_wiki_children(node, recursive)
            }
        } else {
            fs.writeFileSync(`${this.doc_source_dir}/${node.origin_node_token}.json`, JSON.stringify(node, null, 2))
            console.log(`2. Fetched ${node.origin_node_token}.json`)
        }
    }

    async __fetch_drive_children(folder_token, page_token=null, recursive=false) {
        var page_token_expr = page_token ? `&page_token=${page_token}` : ''

        let url = `${FEISHU_HOST}/open-apis/drive/v1/files?folder_token=${folder_token}${page_token_expr}`
        let res = await fetch(url, {
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${this.token}`
            }
        })

        let jres = await res.json()

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
            
            this.docs.slug = await this.__slugify(this.docs.token, this.docs.name)

            if (jres.has_more) {
                await this.__fetch_drive_children(folder_token, jres.data.next_page_token, recursive)
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
                for (let child of this.docs.children) {
                    if (child.type == 'folder') {
                        this.docs = child
                        this.docs.slug = await this.__slugify(this.docs.token, this.docs.name)
                        await this.__fetch_drive_children(child.token, null, recursive)
                    }
    
                    if (child.type == 'docx') {
                        await this.__fetch_blocks(child)
                        child.slug = await this.__slugify(child.token, child.name)
                        fs.writeFileSync(`${this.doc_source_dir}/${child.token}.json`, JSON.stringify(child, null, 2))
                        console.log(`4. Fetched ${child.token}.json`)
                    }
                }
            }
        }  else if (jres.status == 429) {
            const timeout = res.headers['x-ogw-ratelimit-reset']
            await this.__wait(timeout * 1000)
            await this.__fetch_drive_children(folder_token, page_token, recursive)
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
                            const token = item.sheet.token.split('_')[0]
                            const title = item.sheet.token.split('_')[1]

                            item.sheet.meta = await this.__fetch_sheet_meta(token, title)
                            item.sheet.values = await this.__fetch_sheet_values(token, title)
                            console.log(`Fetched sheet ${item.sheet.token}`)
                        }
                    }
                }
            } else if (jres.code == 99991400) {
                const timeout = res.headers['x-ogw-ratelimit-reset']
                await this.__wait(timeout * 1000)
                await this.__fetch_blocks(node, page_token)
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