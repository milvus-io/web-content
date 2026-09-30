const larkTokenFetcher = require('./larkTokenFetcher.js')
const { removeTabsHallucinations, unescapeKnownJsxTags, normalizeCodeTagContent, escapeNonHtmlTags } = require('../mdx-parse/mdxPatcher')
const Downloader = require('./larkImageDownloader.js')
const slugify = require('slugify')
const fs = require('node:fs')
const { URL } = require('node:url')
const fetch = require('node-fetch')
const { fetchFeishuJsonWithRetry } = require('./feishuFetch.js')
const node_path = require('node:path')
const cheerio = require('cheerio')
const showdown = require('showdown')
const _ = require('lodash')
// MDX compilation will be loaded dynamically as it's an ES module

const IMAGE_BED_URL = process.env.IMAGE_BED_URL || 'https://zdoc-images.s3.us-west-2.amazonaws.com'

// Known JSX block components that the MDX patcher must never escape.
// Shared by __escape_non_html_tags (safeUppercaseTags seed) and __mdx_patches
// (end-tag-mismatch guard). Keep in sync with mdxPatcher.js KNOWN_JSX_TAGS.
const KNOWN_JSX_TAGS = new Set([
    'Admonition', 'Tabs', 'TabItem', 'DocCard', 'DocCardList',
    'Details', 'CodeBlock', 'ThemedImage', 'TOCInline', 'Highlight',
    'Banner', 'Bars', 'Blocks', 'Cards', 'Grid', 'Hero', 'Procedures',
    'RestSpecs', 'Stories', 'Supademo',
]);

class larkDocWriter {
    constructor(
        root_token, 
        base_token, 
        displayedSidebar, 
        docSourceDir='plugins/lark-docs/meta/sources', 
        imageDir='static/img', 
        targets='zilliz.saas', 
        skip_image_download=false,
        upload_to_s3=false
    ) {
        this.root_token = root_token
        this.base_token = base_token
        this.displayedSidebar = displayedSidebar
        this.docSourceDir = docSourceDir
        this.page_blocks = []
        this.blocks = []
        this.targets = targets
        this.skip_image_download = skip_image_download
        this.imageDir = imageDir
        this.iframes = []
        this.block_types = this.__block_types()
        this.code_langs = this.__code_langs()
        this.tokenFetcher = new larkTokenFetcher()
        this.downloader = new Downloader({}, imageDir)
        this.upload_to_s3 = upload_to_s3
        this.api_compose_block_type_id = process.env.API_COMPOSE_BLOCK_TYPE_ID || 'blk_682093ba9580c002300d1ea7'
    }

    __fetch_doc_source (type, value, slug="") {
        const file = fs.readdirSync(this.docSourceDir).filter(file => {
            const page = JSON.parse(fs.readFileSync(`${this.docSourceDir}/${file}`, {encoding: 'utf-8', flag: 'r'}))
            
            try {
                type = type instanceof Array ? type.filter(t => Object.keys(page).includes(t))[0] : type
            } catch (error) {
                throw new Error(`1. Cannot find ${type} in ${this.docSourceDir}/${file}`)
            }
            
            return page[type] === value
        })

        if (file.length > 0) {
            if (slug) {
                return file.map(file => {
                    return JSON.parse(fs.readFileSync(`${this.docSourceDir}/${file}`, {encoding: 'utf-8', flag: 'r'}))
                }).filter(page => page.slug === slug)[0]
            } else {
                return JSON.parse(fs.readFileSync(`${this.docSourceDir}/${file[0]}`, {encoding: 'utf-8', flag: 'r'}))
            }
        } else {
            throw new Error(`2. Cannot find ${value} in ${this.docSourceDir}`)
        }
    }

    async write_docs(path, token) {
        const forEachAsync = async (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }

        var current_path = path
        const node = this.__fetch_doc_source('node_token', token)

        if (node.has_child) {
            const children = node.children.filter(child => child.obj_type != 'bitable' && child != undefined)
            await forEachAsync(children, async (child, index) => {
                if (child.has_child) {
                    const meta = await this.__is_to_publish(child.title, child.slug) 
                    if (meta['publish']) {
                        const token = child.node_token
                        const type = child.node_type
                        const slug = child.slug
                        const beta = meta['beta']
                        const notebook = meta['notebook']
                        const addedSince = meta['addSince']
                        const lastModified = meta['lastModified']
                        const deprecateSince = meta['deprecateSince']
                        const labels = meta['labels']
                        const keywords = meta['keywords']
                        console.log(`${current_path}/${slug}/${slug}.md`)

                        if (!fs.existsSync(`${current_path}/${slug}`)) {
                            fs.mkdirSync(`${current_path}/${slug}`)
                        }

                        await this.write_doc({
                            path: `${current_path}/${slug}`,
                            page_title: child.title,
                            page_slug: slug,
                            page_beta: beta,
                            notebook: notebook,
                            addedSince: addedSince,
                            lastModified: lastModified,
                            deprecateSince: deprecateSince,
                            page_type: type,
                            page_token: child.node_token,
                            sidebar_position: index+1,
                            sidebar_label: labels,
                            keywords: keywords,
                            doc_card_list: true,
                            page_tag: meta['tag'],
                        })

                        await this.write_docs(`${current_path}/${slug}`, token)
                    }
                } else {
                    const meta = await this.__is_to_publish(child.title, child.slug)
                    switch (child.slug) {
                        case 'faqs':
                            if (meta['publish']) {
                                if (!fs.existsSync(`${current_path}/faqs`)) {
                                    fs.mkdirSync(`${current_path}/faqs`)
                                }
                                // this.__category_meta(`${current_path}/faqs`, 'FAQs', index+1)
                                await this.write_faqs(`${current_path}/faqs`)
                            }
                            break;                           
                        default:
                            if (meta['publish']) {
                                const token = child.node_token
                                const type = child.node_type
                                const slug = child.slug
                                const beta = meta['beta']
                                const notebook = meta['notebook']
                                const addedSince = meta['addSince']
                                const lastModified = meta['lastModified']
                                const deprecateSince = meta['deprecateSince']
                                const labels = meta['labels']
                                const keywords = meta['keywords']
                                console.log(`${current_path}/${slug}.md`)
                                await this.write_doc({
                                    path: current_path,
                                    page_title: child.title,
                                    page_slug: child.slug,
                                    page_beta: beta,
                                    notebook: notebook,
                                    addedSince: addedSince,
                                    lastModified: lastModified,
                                    deprecateSince: deprecateSince,
                                    page_type: type,
                                    page_token: token,
                                    sidebar_position: index+1,
                                    sidebar_label: labels,
                                    keywords: keywords,
                                    doc_card_list: false,
                                    page_tag: meta['tag'],
                                })
                            }
                            break;
                    }
                }
            })
        }
    }

    async write_doc ({
        path,
        page_title,
        page_slug,
        page_beta,
        notebook,
        addedSince,
        lastModified,
        deprecateSince,
        page_type,
        page_token,
        sidebar_position,
        sidebar_label,
        keywords,
        doc_card_list,
        page_tag
    }) {
        let obj;
        let blocks;
        if (page_token) {
            obj = this.__fetch_doc_source('node_token', page_token, page_slug)
            if (obj) {
                blocks = obj.blocks.items
            }
        } else if (page_title) {
            obj = this.__fetch_doc_source('title', page_title, page_slug)
            if (obj) {
                blocks = obj.blocks.items
            }
        }

        if (blocks) {
            this.page_blocks = blocks
        }

        let page = this.page_blocks.filter(block => block.block_type == 1)[0]

        if (page && page.children) {
            this.blocks = page.children.map(child => {
                return this.__retrieve_block_by_id(child)
            })

            // Detect ApiCompose add-on block
            const apiComposeBlock = this.__find_api_compose_block(this.blocks)
            if (apiComposeBlock) {
                await this.__write_api_page({
                    title: page_title,
                    slug: page_slug,
                    beta: page_beta,
                    path: path,
                    type: page_type,
                    token: page_token,
                    sidebar_position: sidebar_position,
                    sidebar_label: sidebar_label,
                    keywords: keywords,
                    apiComposeBlock: apiComposeBlock,
                })
            } else {
                await this.__write_page({
                    title: page_title,
                    suffix: this.__title_suffix(path),
                    slug: page_slug,
                    beta: page_beta,
                    notebook: notebook,
                    addedSince: addedSince,
                    lastModified: lastModified,
                    deprecateSince: deprecateSince,
                    path: path,
                    type: page_type,
                    token: page_token,
                    sidebar_position: sidebar_position,
                    sidebar_label: sidebar_label,
                    keywords: keywords,
                    doc_card_list: doc_card_list,
                })
            }
        }
    }

    __title_suffix(path) {
        var suffix = 'Cloud'
        
        if (path.includes('byoc')) {
            suffix = 'BYOC'
        } else if (path.includes('go/v1')) {
            suffix = 'Go | v1'
        } else if (path.includes('go/v2')) {
            suffix = 'Go | v2'
        } else if (path.includes('go')) {
            suffix = 'Go'
        } else if (path.includes('python/MilvusClient')) {
            suffix = 'Python | MilvusClient'
        } else if (path.includes('python/ORM')) {
            suffix = 'Python | ORM'
        } else if (path.includes('python')) {
            suffix = 'Python'
        } else if (path.includes('java/v1')) {
            suffix = 'Java | v1'
        } else if (path.includes('java/v2')) {
            suffix = 'Java | v2'
        } else if (path.includes('java')) {
            suffix = 'Java'
        } else if (path.includes('nodejs')) {
            suffix = 'Node.js'
        } else if (path.includes('restful/control-plane/v1')) {
            suffix = 'RESTful | Control Plane | v1'
        } else if (path.includes('restful/control-plane/v2')) {
            suffix = 'RESTful | Control Plane | v2'
        } else if (path.includes('restful/control-plane')) {
            suffix = 'RESTful | Control Plane'
        } else if (path.includes('restful/data-plane/v1')) {
            suffix = 'RESTful | Data Plane | v1'
        } else if (path.includes('restful/data-plane/v2')) {
            suffix = 'RESTful | Data Plane | v2'
        } else if (path.includes('restful/data-plane')) {
            suffix = 'RESTful | Data Plane'
        } else if (path.includes('restful')) {
            suffix = 'RESTful'
        }

        return suffix
    }

    async write_faqs (path) {
        const source = this.__fetch_doc_source('slug', 'faqs')
        const title = source.title
        const blocks = source.blocks.items
        const suffix = path.includes('byoc') ? 'BYOC' : 'CLOUD'

        if (blocks) {
            this.page_blocks = blocks
        }

        let page = this.page_blocks.filter(block => block.block_type == 1)[0]

        if (page && page.children) {
            this.blocks = page.children.map(child => {
                return this.__retrieve_block_by_id(child)
            })

            let a = await this.__markdown()
            a = this.__filter_content(a, this.targets).split('\n')
            let header_pos = a.map((line, index) => {
                if (line.startsWith('##')) {
                    return index
                }
            }).filter(x => x !== undefined)

            let sub_pages = []

            for (let i = 0; i < header_pos.length; i++) {
                let start = header_pos[i]
                let end = header_pos[i+1]
                let sub_page = a.slice(start, end)
                sub_pages.push(sub_page)
            }

            // Write FAQs root page
            let slug = 'faqs'
            let front_matter = this.__front_matters(title, suffix, slug, null, null, source.node_type, source.node_token, 999, "", "", this.displayedSidebar, "Frequently asked questions")
            const markdown = `${front_matter}\n\n# ${title}` + "\n\nimport DocCardList from '@theme/DocCardList';\n\n<DocCardList />"
            fs.writeFileSync(`${path}/${slug}.md`, markdown)

            sub_pages.forEach((sub_page, index) => {
                let title = sub_page[0].indexOf('{/') > 0 ? sub_page[0].split('{/')[0].split('## ')[1] : sub_page[0].replace(/^## /g, '').replace(/{#[\w-]+}/g, '').trim()
                let short_description = sub_page.filter(line => line.length > 0)[1]
                let slug = sub_page[0].indexOf('{/') > 0 ? /{\/([\w-]+)}/.exec(sub_page[0])[1] : slugify(title, {lower: true, strict: true})
                let front_matter = this.__front_matters(title, suffix, slug, null, null, source.node_type, source.node_token, index+1, "", "", this.displayedSidebar, short_description)
                let links = []

                sub_page = sub_page.map(line => {
                    if (line.startsWith('**')) {
                        let qtext = line.indexOf('{#') > 0 ? line.split('{#')[0].split('**')[1] : line.replace(/\*/g, '').trim()
                        let qslug = line.indexOf('{#') > 0 ? line.split('{#')[1]?.split('}')[0] : slugify(qtext, {lower: true, strict: true})
                        line = `### ${qtext}{#${qslug}}`
                        links.push(`- [${qtext}](#${qslug})`)
                    }

                    if (line == short_description) {
                        line = ''
                    }

                    return line
                })

                const markdown = `${front_matter}\n\n# ${title}\n\n${short_description}\n\n## Contents\n\n${links.join('\n')}\n\n## FAQs\n\n${sub_page.slice(1).join('\n')}`    
                fs.writeFileSync(`${path}/${slug}.md`, markdown)
            })
        }
    }

    async __listed_docs() {
        const token = await this.tokenFetcher.token()
        let url = `${process.env.FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base_token}/tables`
        const table_id = (await fetchFeishuJsonWithRetry(url, {
            method: "get",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, 'writer list bitable tables')).data.items[0].table_id

        url = `${process.env.FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base_token}/tables/${table_id}/records?page_size=500`
        this.records = (await fetchFeishuJsonWithRetry(url, {
            method: "get",
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }, 'writer list bitable records')).data.items
    }

    async __is_to_publish (title, slug, token=null) {
        if (!this.records) {
            await this.__listed_docs()
        }

        const result = this.records.filter(record => {
            const record_slug = record["fields"]["Slug"] instanceof Array ? record["fields"]["Slug"][0].text : record["fields"]["Slug"]

            if (((record["fields"]["Docs"] && record["fields"]["Docs"]["text"] === title && record_slug == slug) || record["fields"]["Docs"]["link"].endsWith(token)) && record["fields"]["Targets"] && record["fields"]["Progress"] && (record["fields"]["Progress"] === "Draft" || record["fields"]["Progress"] === "Publish")) {

                const targets = record["fields"]["Targets"].map(item => item.trim().toLowerCase())

                if (targets.includes(this.targets.toLowerCase())) {
                    return record
                }
            }
        })

        if (result.length > 0) {
            return {
                publish: true,
                title: result[0]["fields"]["Docs"].text,
                slug: result[0]["fields"]["Slug"],
                beta: result[0]["fields"]["Beta"],
                notebook: result[0]["fields"]["Notebook"],
                labels: result[0]["fields"]["Labels"],
                keywords: result[0]["fields"]["Keywords"],
                description: result[0]["fields"]["Description"],
                tag: result[0]["fields"]["Tag"],
                addSince: result[0]["fields"]["Added Since"],
                lastModified: result[0]["fields"]["Last Modified At"],
                deprecateSince: result[0]["fields"]["Deprecate Since"],
            }
        } else {
            return {
                publish: false,
            }
        }
        
    }

    __filter_content (markdown, targets) {
        const matches = this.__match_filter_tags(markdown)

        if (matches.length > 0) {
            var preText = markdown.slice(0, matches[0].startIndex)
            var matchText = markdown.slice(matches[0].startIndex, matches[0].endIndex)
            var postText = markdown.slice(matches[0].endIndex)
            var isTargetValid = targets.split('.').includes(matches[0].target.trim())
            var startTagLength = `<${matches[0].tag} target="${matches[0].target}">`.length
            var endTagLength = `</${matches[0].tag}>`.length

            if (matches[0].tag == 'include' && isTargetValid || matches[0].tag == 'exclude' && !isTargetValid) {
                matchText = matchText.slice(startTagLength, -endTagLength)
            }

            if (matches[0].tag == 'include' && !isTargetValid || matches[0].tag == 'exclude' &&  isTargetValid) {
                matchText = ""
            }
 
            markdown = this.__filter_content(preText + matchText + postText, targets)
        }

        return markdown.replace(/(\s*\n){3,}/g, '\n\n')
            .replace(/<br>/g, '<br/>')
            .replace(/(<br\/>){2,}/, "<br/>")
            .replace("<br\/></p>", "</p>")
            .replace(/\n\s*<tr>\n(\s*<td.*><p><\/p><\/td>\n)*\s*<\/tr>/g, '');
    }

    __match_filter_tags(markdown) {
        const startTagRegex = /<(include|exclude) target="(.+?)"/gmi
        const endTagRegex = /<\/(include|exclude)>/gmi
        const matches = [... markdown.matchAll(startTagRegex)]
        var returns = []

        matches.forEach(match => {
            var tag = match[1].toLowerCase()
            var target = match[2].trim()
            var rest = markdown.slice(match.index)
            
            var closeTagRegex = new RegExp(`</${tag}>`, 'gmi')
            var closeTagMatch = [... rest.matchAll(closeTagRegex)]
            
            var startIndex = match.index
            var endIndex = -1
            
            for (let i = 0; i < closeTagMatch.length; i++) {
                var t = markdown.slice(startIndex, startIndex+closeTagMatch[i].index+closeTagMatch[i][0].length)
            
                var startCount = t.match(startTagRegex) ? t.match(startTagRegex).length : 0
                var endCount = t.match(endTagRegex) ? t.match(endTagRegex).length : 0
        
                if (startCount === endCount) {
                    endIndex = startIndex + closeTagMatch[i].index + closeTagMatch[i][0].length
                    break
                }
            }

            if (endIndex === -1) console.warn(`No matching end tag for ${tag} tag at index ${match.index}`)

            returns.push({
                tag: tag,
                target: target,
                startIndex: startIndex,
                endIndex: endIndex
            })           
        })

        return returns
    }

    __extract_description(markdown) {
        const content = markdown.split('\n')
        const title = content.filter(line => line.startsWith('# '))
        var description = "(placeholder)"

        if (title.length > 0) {
            description = content[content.indexOf(title[0])+2] ? content[content.indexOf(title[0])+2].trim() : "(placeholder)"
        }

        return description
    }

    async __write_page({title, suffix, slug, beta, notebook, addedSince, lastModified, deprecateSince, path, type, token, sidebar_position, sidebar_label, keywords, doc_card_list}) {
        let markdown = await this.__markdown()
        markdown = this.__filter_content(markdown, this.targets)
        markdown = markdown.replace(/(\s*\n){3,}/g, '\n\n').replace(/(<br\/>){2,}/, "<br/>").replace(/<br>/g, '<br/>');
        markdown = markdown.replace(/^[\||\s][\s|\||<br\/>]*\|\n/gm, '')
        markdown = markdown.replace(/\s*<tr>\n(\s*<td>(<br\/>)*<\/td>\n)*\s*<\/tr>/g, '')
        markdown = this.__example_http_urls(markdown)
        markdown = await this.__mdx_patches(markdown)  

        const description = this.__extract_description(markdown)

        let front_matter = this.__front_matters(title, suffix, slug, beta, notebook, type, token, sidebar_position, sidebar_label, keywords, this.displayedSidebar, description)

        let tabs = markdown.split('\n').filter(line => {
            return line.trim().startsWith("<Tab")
        }).length

        let imports = this.__imports(tabs > 0)

        // add sidebar_key attribute to doc frontmatter
        front_matter = front_matter.split('\n')
        front_matter.splice(3, 0, `sidebar_key: ${slug}`)
        front_matter = front_matter.join('\n')

        if (doc_card_list) {
            markdown += "\n\nimport DocCardList from '@theme/DocCardList';\n\n<DocCardList />"
        }

        var file_path = `${path}/${slug}.md`

        if (this.targets.split('.').includes('zilliz')) {
            markdown = markdown.replace(/http:\/\/localhost:19530/g, 'YOUR_CLUSTER_ENDPOINT')
            markdown = markdown.replace(/127.0.0.1:19530/g, 'YOUR_CLUSTER_ENDPOINT')
            markdown = markdown.replace(/localhost:19530/g, 'YOUR_CLUSTER_ENDPOINT')
            markdown = markdown.replace(/root:Milvus/g, 'YOUR_CLUSTER_TOKEN')
        }

        if (this.targets.split('.').includes('milvus')) {
            markdown = markdown.replace(/YOUR_CLUSTER_ENDPOINT/g, 'http://localhost:19530')
            markdown = markdown.replace(/YOUR_CLUSTER_TOKEN/g, 'root:Milvus')
        }

        if (slug === 'home') {
            let description = this.__extract_description(markdown)

            // remove title
            markdown = markdown.split('\n').filter(line => line !== `# ${title}`).join('\n');

            // remove description
            markdown = markdown.split('\n').filter(line => line !== description).join('\n');

            // add imports
            imports = [...imports.split('\n'), ...[
                "\n\nimport Hero from '@site/src/components/Hero';",
                "\n\nimport Bars from '@site/src/components/Bars';",
                "\n\nimport Blocks from '@site/src/components/Blocks';",
                "\n\nimport Cards from '@site/src/components/Cards';",
                "\n\nimport Stories from '@site/src/components/Stories';",
                "\n\nimport Banner from '@site/src/components/Banner';"
            ]].join('\n');
        }

        if (markdown.match(/\<Supademo/g)) {
            imports = imports + "\n\nimport Supademo from '@site/src/components/Supademo';"
        }

        if (markdown.match(/\<Grid/g)) {
            imports = imports + "\n\nimport Grid from '@site/src/components/Grid';"
        }

        if (markdown.match(/\<Procedures/g)) {
            imports = imports + "\n\nimport Procedures from '@site/src/components/Procedures';"
        }

        if (path) {
            front_matter = front_matter.split('\n')
            front_matter.splice(5, 0, `added_since: ${addedSince ? addedSince : 'FALSE'}`)
            front_matter.splice(6, 0, `last_modified: ${lastModified ? lastModified : 'FALSE'}`)
            front_matter.splice(7, 0, `deprecate_since: ${deprecateSince ? deprecateSince : 'FALSE'}`)
            front_matter = front_matter.join('\n')

            fs.writeFileSync(file_path, front_matter + '\n\n' + imports + '\n\n' + markdown)
        } else {
            return {
                front_matter,
                imports,
                markdown
            }
        }
    }

    __find_api_compose_block(blocks) {
        for (const block of blocks) {
            if (this.block_types[block['block_type']-1] === 'add_ons') {
                if (block['add_ons'] && block['add_ons']['component_type_id'] === this.api_compose_block_type_id) {
                    return block['add_ons']
                }
            }
            // Recursively check children if any
            if (block['children'] && block['children'].length > 0) {
                const children = block['children'].map(child => this.__retrieve_block_by_id(child))
                const found = this.__find_api_compose_block(children)
                if (found) return found
            }
        }
        return null
    }

    async __write_api_page({title, slug, beta, path, type, token, sidebar_position, sidebar_label, keywords, apiComposeBlock}) {
        let recordData
        try {
            recordData = JSON.parse(apiComposeBlock['record'] || '{}')
        } catch (e) {
            console.error(`Failed to parse ApiCompose record for ${slug}: ${e.message}`)
            return
        }

        const specs = recordData
        const method = (specs.method || 'get').toLowerCase()
        const endpoint = specs.endpoint || ''
        const description = specs.summary || title || ''

        const frontMatter = `---
displayed_sidebar: restfulSidebar
sidebar_position: ${sidebar_position || 1}
slug: /restful/${slug}
beta: ${beta ? 'TRUE' : 'FALSE'}
title: ${this.__yaml_string(`${title || specs.summary || 'API'} | RESTful`)}
description: ${this.__yaml_string(`${description} | RESTful`)}
hide_table_of_contents: true
sidebar_label: ${this.__yaml_string(sidebar_label || title || specs.summary || 'API')}
sidebar_custom_props: { badges: ['${method}'] }
${keywords ? 'keywords: \n  - ' + keywords.split(',').map(k => k.trim()).join('\n  - ') + '\n' : ''}---`

        const specsJson = JSON.stringify(specs, null, 2)
        const mdxBody = `# ${title || specs.summary || 'API'}

import RestSpecs from '@site/src/components/RestSpecs';

<RestSpecs specs={specs} endpoint={endpoint} method={method} target="${this.targets}" lang="en-US" />

export const specs = ${specsJson}
export const endpoint = "${endpoint}"
export const method = "${method}"`

        const file_path = `${path}/${slug}.mdx`
        fs.writeFileSync(file_path, frontMatter + '\n\n' + mdxBody)
        console.log(`Generated API doc: ${file_path}`)
    }

    __yaml_string(value) {
        return JSON.stringify(String(value ?? '').replace(/\r?\n/g, '|'))
    }

    __front_matters (title, suffix, slug, beta, notebook, type, token, sidebar_position=undefined, sidebar_label="", keywords="", displayed_sidebar=this.displayedSidebar, description="") {
        let hide_title = '';
        let hide_toc = '';
        
        if (keywords !== "") {
            // keywords = keywords + ',' + this.keyword_picker().join(',')
            keywords = "keywords: \n  - " + keywords.split(',').map(item => item.trim()).join('\n  - ') + '\n'
        }

        if (displayed_sidebar === 'default') {
            displayed_sidebar = ''
        } else if (displayed_sidebar === 'agentsSidebar' ) {
            displayed_sidebar = `displayed_sidebar: ${displayed_sidebar}\n`
        } else {
            slug = `${displayed_sidebar.replace('Sidebar', '').trim()}/${slug}`
            displayed_sidebar = `displayed_sidebar: ${displayed_sidebar}\n`
        }

        if (description) {
            description = description.trim().replace('\n', '|').replace(/\[(.*)\]\(.*\)/g, '$1').replace(':', '').replace(/\*+|_+/g, '')
            description = description.replace(/<\/?[^>]+>/g, '').trim()
            if (description.length === 0) {
                description = title
            }
        }

        if (slug === 'home') {
            hide_title = "hide_title: true";
            hide_toc = "hide_table_of_contents: true";
        }

        let front_matter = '---\n' + 
        `title: ${this.__yaml_string(`${title} | ${suffix}`)}` + '\n' +
        `slug: /${slug}` + '\n' +
        `sidebar_label: ${this.__yaml_string(sidebar_label !== "" ? sidebar_label : title)}` + '\n' +
        `beta: ${beta ? beta : 'FALSE'}` + '\n' +
        `notebook: ${notebook ? notebook : 'FALSE'}` + '\n' +
        `description: ${this.__yaml_string(`${description} | ${suffix}`)}` + '\n' +
        `type: ${type}` + '\n' +
        `token: ${token}` + '\n' +
        `sidebar_position: ${sidebar_position}` + '\n' +
        keywords +
        displayed_sidebar + '\n' +
        `${hide_title ? hide_title  + '\n' : ''}` +
        `${hide_toc ? hide_toc  + '\n' : ''}` +
        '---'

        return front_matter
    }

    __imports (cond=null) {
        let block_types = this.blocks.map(block => {
            return this.block_types[block.block_type - 1]
        }).join('')

        if (block_types.match(/(code){2,}/g) || cond) {
            return ["import Admonition from '@theme/Admonition';", "import Tabs from '@theme/Tabs';",
            "import TabItem from '@theme/TabItem';"].join('\n')
        }

        return "import Admonition from '@theme/Admonition';" + "\n"
    }

    async __markdown(blocks=null, indent=0) {
        const markdown = [];
        const idt = " ".repeat(indent);
        if (blocks === null) {
            blocks = this.blocks;
            markdown.push(await this.__page(this.page_blocks[0]['page']));
        }
    
        for (let idx = 0; idx < blocks.length; idx++) {
            const block = blocks[idx];
            if (!block) {
                continue;
            }
            console.log(block['block_id'], this.block_types[block['block_type']-1], block['block_type']);
            const prev_block = idx > 0 ? blocks[idx-1] : null;
            const next_block = idx < blocks.length-1 ? blocks[idx+1] : null;

            if (this.block_types[block['block_type']-1] === undefined) {
                markdown.push('[Unsupported block type]');
            } else if (this.block_types[block['block_type']-1] === 'text') {
                let content = await this.__text(block['text']);
                if (content.trim().indexOf('\n') > 0) {
                    content = content.split('\n').map(line => idt + line).join('\n');
                } else {
                    content = idt + content;
                }

                markdown.push(content);
            } else if (this.block_types[block['block_type']-1].includes('heading')) {
                const level = parseInt(this.block_types[block['block_type']-1].slice(-1));
                markdown.push(idt + await this.__heading(block[`heading${level}`], level));
            } else if (this.block_types[block['block_type']-1] === 'bullet') {
                markdown.push(await this.__bullet(block, indent));
            } else if (this.block_types[block['block_type']-1] === 'ordered') {
                markdown.push(await this.__ordered(block, indent));
            } else if (this.block_types[block['block_type']-1] === 'code') {
                markdown.push(await this.__code(block['code'], indent, prev_block, next_block, blocks));
            } else if (this.block_types[block['block_type']-1] === 'quote_container') {
                markdown.push(await this.__quote(block, indent));
            } else if (this.block_types[block['block_type']-1] === 'image') {
                markdown.push(idt + (await this.__image(block['image'])));
            } else if (this.block_types[block['block_type']-1] === 'iframe') {
                markdown.push(idt + (await this.__iframe(block)));
            } else if (this.block_types[block['block_type']-1] === 'table') {
                markdown.push(await this.__table(block['table'], indent));
            } else if (this.block_types[block['block_type']-1] === 'sheet') {
                markdown.push(await this.__sheet(block['sheet'], indent));
            } else if (this.block_types[block['block_type']-1] === 'callout') {
                markdown.push(await this.__callout(block, indent));
            } else if (this.block_types[block['block_type']-1] === 'board') {
                markdown.push(await this.__board(block['board'], indent));
            } else if (this.block_types[block['block_type']-1] === 'grid') {
                markdown.push(await this.__grid(block, indent));
            } else if (this.block_types[block['block_type']-1] === 'add_ons') {
                // supademo add-ons
                if (block['add_ons']['component_type_id'] === 'blk_682093ba9580c002363b9dc3') {
                    markdown.push(await this.__supademo(block['add_ons'], indent));
                }
            } else if (this.block_types[block['block_type']-1] === 'source_synced') {
                markdown.push(await this.__source_synced(block, indent));
            } else if (block['block_type'] === 999 && block['children']) {
                const children = block['children'].map(child => {
                    return this.__retrieve_block_by_id(child)
                })
                markdown.push(await this.__markdown(children, indent));
            } else {
                console.log(`Unprocessed: ${block['block_id']}`);
            }
        }
    
        return markdown.join('\n\n')
            .replace(/(\s*\n){3,}/g, '\n\n')
            .replace(/<br>/g, '<br/>')
            .replace(/(<br\/>){2,}/g, '<br>')
            .replace("<br\/></p>", "</p>")
            .replace(/\n\s*<tr>\n(\s*<td.*><p><\/p><\/td>\n)*\s*<\/tr>/g, '');
    }

    __example_http_urls(content) {
        // Find all fenced code blocks and mark their ranges
        const codeBlockRegex = /```[\s\S]*?```/g;
        let codeBlocks = [];
        let match;
        while ((match = codeBlockRegex.exec(content)) !== null) {
            codeBlocks.push({ start: match.index, end: match.index + match[0].length });
        }

        // Helper to check if a position is inside any code block
        function isInCodeBlock(pos) {
            return codeBlocks.some(block => pos >= block.start && pos < block.end);
        }

        const codeSpanRegex = /`[^`\n]+`/g;
        while ((match = codeSpanRegex.exec(content)) !== null) {
            if (!isInCodeBlock(match.index)) {
                codeBlocks.push({ start: match.index, end: match.index + match[0].length });
            }
        }

        // Match URLs, including those containing <, >, [, ], {, }
        const urlRegex = /https?:\/\/[^\s'")]+/g;
        let result = '';
        let lastIndex = 0;

        // Find all URLs and process those outside code blocks
        while ((match = urlRegex.exec(content)) !== null) {
            const urlStart = match.index;
            const urlEnd = urlStart + match[0].length;

            // Append content before the URL
            result += content.slice(lastIndex, urlStart);

            if (!isInCodeBlock(urlStart)) {
                // Keep example URLs intact and let MDX patching handle escaping/safety.
                result += match[0];
            } else {
                // Inside code block, leave as is
                result += match[0];
            }

            lastIndex = urlEnd;
        }

        // Append remaining content
        result += content.slice(lastIndex);

        return result;
    }

    __escape_currency_dollars(content) {
        // Replace currency $<digit> with &#36;<digit> outside fenced code blocks and
        // inline code spans, to prevent remark-math/KaTeX from treating them as math
        // delimiters (which causes unicodeTextInMathMode warnings and broken rendering).
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

    __escape_non_html_tags(content) {
        // Escape any lowercase tag whose name is not a known HTML element or a content-filter
        // tag used by this writer, outside fenced code blocks and inline code spans.
        // Such tags are URL/API placeholder patterns (e.g. <bucket_name>, <region-code>,
        // <container>, <blob>) that MDX would otherwise parse as JSX elements.
        // Both opening and closing forms are escaped (e.g. </blob> → \</blob>).
        // PascalCase JSX components (Tabs, TabItem, Admonition…) are never matched because
        // the regex anchors on a leading lowercase letter.
        // <include>/<exclude> filter tags are added so their orphaned closing forms are not
        // accidentally escaped (they are removed by __filter_content before this runs anyway).
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
            // Content-filter tags used by this writer (processed before MDX patching)
            'include', 'exclude',
        ]);

        // Structural pre-scan: build set of safe uppercase/PascalCase tag names.
        // A tag is safe if it appears with a close tag, self-closing form, or attributes
        // anywhere in the document. Combined with a KNOWN_JSX fallback whitelist as a
        // safety net for legitimate components that may be orphaned in edge cases.
        const safeUppercaseTags = new Set(KNOWN_JSX_TAGS);
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
                            if (KNOWN_TAGS.has(tagName)) return match;
                            return match.replace(/^\\/, '').replace(/</g, '&lt;').replace(/>/g, '&gt;');
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

    async __mdx_patches(content) {
        try {
            // Import MDX compiler dynamically as it's an ES module
            const { compile } = await import('@mdx-js/mdx');
            const remarkMath = (await import('remark-math')).default;

            // Pre-process: fix translation/editor artefacts, then escape problem characters
            let patchedContent = removeTabsHallucinations(content);
            patchedContent = unescapeKnownJsxTags(patchedContent);
            patchedContent = normalizeCodeTagContent(patchedContent);
            patchedContent = this.__escape_currency_dollars(patchedContent);
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
                    // console.log(error)

                    // Identify problematic characters based on the error
                    let madeChanges = false;
                    let line, column, offset;
                    switch (error.ruleId) {
                        case 'acorn':
                            line = error.place.line;
                            column = error.place.column;
                            offset = error.place.offset;
                            // console.log(patchedContent.split('\n')[line-1]);

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
                        case 'end-tag-mismatch': {
                            // Error: "Unexpected closing tag `</Y>`, expected corresponding closing tag for `<X>` (line:col-line:col)"
                            // The position refers to the OPENING tag <X>.
                            // Strategy: replace the wrong closing tag </Y> with the correct </X>.
                            // Exception: if <X> is a non-standard tag (contains _ or -) it is a URL/API
                            // placeholder, not a real element. Replacing the closing tag causes an
                            // oscillating loop; instead fall through to the fallback (escape opening tag).
                            const wrongClose = error.message.match(/Unexpected closing tag `<\/([^>]+)>`/)?.[1];
                            const expectedOpen = error.message.match(/closing tag for `<([A-Za-z][^>/ ]*)(?:\s[^>]*)?>?`/)?.[1];
                            const posMatch = error.message.match(/(\d+):(\d+)-(\d+):(\d+)/);
                            const isPlaceholder = expectedOpen && /[_-]/.test(expectedOpen);

                            if (!isPlaceholder && wrongClose && expectedOpen && wrongClose !== expectedOpen && posMatch) {
                                const openLine = parseInt(posMatch[1]) - 1; // 0-indexed
                                const wrongCloseTag = `</${wrongClose}>`;
                                const correctCloseTag = `</${expectedOpen}>`;
                                const lines = patchedContent.split('\n');

                                for (let i = openLine; i < lines.length; i++) {
                                    const idx = lines[i].indexOf(wrongCloseTag);
                                    if (idx !== -1) {
                                        lines[i] = lines[i].slice(0, idx) + correctCloseTag + lines[i].slice(idx + wrongCloseTag.length);
                                        madeChanges = true;
                                        break;
                                    }
                                }

                                if (madeChanges) {
                                    patchedContent = lines.join('\n');
                                }
                            } else if (!wrongClose && expectedOpen && posMatch) {
                                // Variant: "Expected a closing tag for `<X>` (line:col-line:col) before the end of `paragraph`"
                                // Skip known JSX components — escaping their opening tag causes a
                                // cascade: the orphaned </X> is then deleted by unexpected-closing-slash,
                                // destroying the component structure. The real fix is inside the component
                                // (e.g. unescaped braces) which the acorn handler will address.
                                if (KNOWN_JSX_TAGS.has(expectedOpen)) {
                                    break;
                                }
                                // The opening tag is not closed within its paragraph. Escape it with &lt; so it
                                // renders as literal text instead of being treated as a JSX element.
                                const openLine = parseInt(posMatch[1]) - 1; // 0-indexed
                                const openCol = parseInt(posMatch[2]) - 1;  // 0-indexed
                                const lines = patchedContent.split('\n');

                                if (openLine < lines.length && lines[openLine][openCol] === '<') {
                                    lines[openLine] = lines[openLine].slice(0, openCol) + '&lt;' + lines[openLine].slice(openCol + 1);
                                    patchedContent = lines.join('\n');
                                    madeChanges = true;
                                }
                            }

                            break;
                        }
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
                                // Replace `<` with `&lt;` (not `\`) so the entity renders correctly in HTML.
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
                                // Comma, asterisk, or ideographic comma — escape the nearest preceding `<` with backslash
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
            console.error('Failed to import MDX compiler:', error.message);
            return content; // Return original content if compiler import fails
        }
    }

    async __page(page) {
        return '# ' + await this.__text_elements(page['elements']);
    }

    async __text(text) {
        return await this.__text_elements(text['elements']);
    }

    async __heading(heading, level) {
        let content = await this.__text_elements(heading['elements'])
        content = this.__clean_headings(content)
        
        if (content.length > 0) {
            
            if (content.indexOf('{#') < 0) {
                let slug = slugify(content.split('|')[0].trim(), {lower: true, strict: true})
                return '#'.repeat(level) + ' ' + content + '{#'+slug+'}';
            } else {
                return '#'.repeat(level) + ' ' + content;
            }
        } else {
            return '';
        }
    }

    __clean_headings(content) {
        // filter content 
        content = this.__filter_content(content, this.targets)
        // remove html tags
        content = content.replace(/<\/?[^>]+(>|$)/g, "")
        // remove trailing and leading spaces
        content = content.trim()

        return content
    }

    async __bullet(block, indent) {
        let children = ''
        if (block.children) {
            children = block.children.map(child => {
                return this.__retrieve_block_by_id(child)
            })
            children = await this.__markdown(children, indent+4)
        }

        let content = await this.__text_elements(block['bullet']['elements'])

        return ' '.repeat(indent) + '- ' + content + '\n\n' + children;
    }

    async __ordered(block, indent) {
        let children = ''
        if (block.children) {
            children = block.children.map(child => {
                return this.__retrieve_block_by_id(child)
            })
            children = await this.__markdown(children, indent+4)
        }

        let content = await this.__text_elements(block['ordered']['elements'])

        return ' '.repeat(indent) + '1. ' + content + '\n\n' + children;
    }

    /**
     * Convert showdown HTML to MDX-safe content for use inside JSX components.
     * - Replaces <pre><code> blocks with markdown fenced code blocks
     * - Escapes { and } outside <code> inline spans
     */
    __showdownToMdxSafe(html) {
        // Escape { and } outside <code>...</code> and <pre>...</pre> spans first
        // (before converting <pre><code> to fences, so code content is still protected)
        const parts = html.split(/(<(?:code|pre)(?:\s[^>]*)?>[\s\S]*?<\/(?:code|pre)>)/g);
        html = parts.map((part, i) => {
            if (i % 2 === 0) {
                return part.replace(/\{/g, '\\{').replace(/\}/g, '\\}');
            }
            return part;
        }).join('');

        // Convert <pre><code class="lang language-lang">...</code></pre> to fenced code blocks
        html = html.replace(/<pre><code(?:\s+class="([^"]*)")?>([\s\S]*?)<\/code><\/pre>/g, (match, classAttr, code) => {
            let lang = '';
            if (classAttr) {
                const langMatch = classAttr.match(/(?:^|\s)language-(\S+)/);
                lang = langMatch ? langMatch[1] : (classAttr.split(/\s+/)[0] || '');
            }
            const decoded = code.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
            return '\n```' + lang + '\n' + decoded.replace(/^\n|\n$/g, '') + '\n```\n';
        });

        return html;
    }

    async __callout(block, indent) {
        let children = []
        if (block.children) {
            children = block.children.map(child => {
                return this.__retrieve_block_by_id(child)
            })

            children = await this.__markdown(children, indent)
            children = this.__filter_content(children, this.targets)
            children = children.split('\n')
        }

        let emoji = block['callout']['emoji_id']
        let type;

        switch (emoji) {
            case 'blue_book':
                type = `<Admonition type="info" icon="📘" title="${children[0].trim()}">`
                break;
            case 'construction':
                type = `<Admonition type="danger" icon="🚧" title="${children[0].trim()}">`
                break;
            default:
                type = `<Admonition type="info" icon="📘" title="${children[0].trim()}">`
                break; 
        }               
        
        let body = children.slice(1)
        while (body.length && body[0].trim() === '') body.shift()
        while (body.length && body[body.length - 1].trim() === '') body.pop()
        body = body.join('\n')

        const raw = ' '.repeat(indent) + type + '\n\n' + body + '\n\n' + ' '.repeat(indent) + '</Admonition>';
        return raw.replace(/(\s*\n){3,}/g, `\n${' '.repeat(indent)}\n`);
    }

    async __code(code, indent, prev, next, blocks) {
        const valid_langs = ['Python', 'JavaScript', 'Java', 'Go', 'C++', 'Bash', 'Shell']
        let lang = code.style.language ? this.code_langs[code['style']['language']] : 'plaintext'
        let elements = (await Promise.all(code['elements'].map( async x => {
            let content = await this.__text_run(x, code['elements'], true)
            content = content.replaceAll('&#36;', '$')
            return content
        }))).join('') 

        // if (lang === 'C++') return; // to be removed once c++ is supported

        if (valid_langs.includes(lang)) {
            const prev_type = prev ? this.block_types[prev['block_type']-1] : null;
            const next_type = next ? this.block_types[next['block_type']-1] : null;
            const prev_lang = prev && prev_type === 'code' && prev['code']['style']['language'] ? this.code_langs[prev['code']['style']['language']] : null;
            const next_lang = next && next_type === 'code' && next['code']['style']['language'] ? this.code_langs[next['code']['style']['language']] : null;

            // first block
            if ((!prev || (prev && prev_type !== 'code') || 
                (prev && prev_type === 'code' && (!valid_langs.includes(prev_lang) || prev_lang === lang))) &&
                (next && next_type === 'code' && valid_langs.includes(next_lang) && next_lang !== lang)
            ) {
                console.log('first block')
                const values = this.__code_tabs(code, prev, next, blocks)
                    .filter(tab => tab.value !== 'c++'); // to be removed once c++ is supported

                return this.__code_block_split(elements, indent, lang, 'first', values);
            }
            
            // last block
            if (prev && prev_type === 'code' && valid_langs.includes(prev_lang) && prev_lang !== lang &&
                (!next || (next && next_type !== 'code') || 
                (next && next_type === 'code' && (!valid_langs.includes(next_lang) || next_lang === lang)))) {
                console.log('last block')
                return this.__code_block_split(elements, indent, lang, 'last');
            }
            
            // middle block
            if (prev && prev_type === 'code' && valid_langs.includes(next_lang) && prev_lang !== lang && next && next_type === 'code' && valid_langs.includes(next_lang) && next_lang !== code['style']['language']) {
                console.log('middle block')
                return this.__code_block_split(elements, indent, lang, 'middle');
            } 

            // only block
            if (!prev || (prev && prev_type !== 'code') ||
                (prev && (prev_type === 'code' || !valid_langs.includes(prev_lang) || prev_lang === lang)) ||
                (next && (next_type === 'code' || !valid_langs.includes(next_lang) || next_lang === lang)) ||
                !next || (next && next_type !== 'code')
            ) {
                console.log('only block')           
                return this.__code_block_split(elements, indent, lang);
            }             
        } else {
            console.log('not valid lang')
            return this.__code_block_split(elements, indent, lang);
        }
    }

    __code_block_split(elements, indent, lang, position, values=null) {
        elements = elements.split('\n').map(line => line.replaceAll('`', '\\`'));
        var divider = elements.indexOf(elements.filter(x => x.match(/^[#\/]\/* ==*/))[0]);
        var tab_item_start = `${' '.repeat(indent)}<TabItem value='${lang.toLowerCase()}'>\n`;
        var tab_item_end = `${' '.repeat(indent)}</TabItem>`
        var tabs_end = `${' '.repeat(indent)}</Tabs>`
        if (divider === -1) {
            elements = `${' '.repeat(indent)}\`\`\`${lang.toLowerCase()}\n${' '.repeat(indent) + elements.join('\n' + ' '.repeat(indent))}\n${' '.repeat(indent)}\`\`\`\n`
            switch (position) {
                case 'first':
                    var tabs_start = `${' '.repeat(indent)}<Tabs groupId="code" defaultValue='${values[0].value}' values={${JSON.stringify(values)}}>`;
                    return [tabs_start, tab_item_start, elements, tab_item_end].join('\n');
                case 'last':
                    return [tab_item_start, elements, tab_item_end, tabs_end].join('\n');
                case 'middle':
                    return [tab_item_start, elements, tab_item_end].join('\n');
                default:
                    return elements;
            }
        } else {
            var comment_mark = lang === 'Python' || lang === 'Bash' ? '# ' : '// '
            var half_1 = elements.slice(0, divider)
            var half_1_label = half_1[0].replace(comment_mark, '') 
            var half_2 = elements.slice(divider)
            var half_2_label = half_2[1].replace(comment_mark, '')

            lang = lang.toLowerCase()

            var inner_values = []
            inner_values.push({label: half_1_label, value: lang})
            inner_values.push({label: half_2_label, value: `${lang}_1`})

            var inner_tabs_start = `${' '.repeat(indent)}<Tabs groupId="${lang}" defaultValue='${inner_values[0].value}' values={${JSON.stringify(inner_values)}}>`;
            var inner_tab_item_start_1 = `${' '.repeat(indent)}<TabItem value='${inner_values[0].value}'>\n`;
            var inner_tab_item_start_2 = `${' '.repeat(indent)}<TabItem value='${inner_values[1].value}'>\n`;
            var inner_tab_item_end = `${' '.repeat(indent)}</TabItem>`
            var inner_tabs_end = `${' '.repeat(indent)}</Tabs>`
            
            half_1 = `${' '.repeat(indent)}\`\`\`${lang.toLowerCase()}\n${' '.repeat(indent) + half_1.slice(1).join('\n' + ' '.repeat(indent))}\n${' '.repeat(indent)}\`\`\`\n`
            half_2 = `${' '.repeat(indent)}\`\`\`${lang.toLowerCase()}\n${' '.repeat(indent) + half_2.slice(3).join('\n' + ' '.repeat(indent))}\n${' '.repeat(indent)}\`\`\`\n`

            switch (position) {
                case 'first':
                    var tabs_start = `${' '.repeat(indent)}<Tabs groupId="code" defaultValue='${values[0].value}' values={${JSON.stringify(values)}}>`;
                    return [tabs_start, tab_item_start, inner_tabs_start, inner_tab_item_start_1, half_1, inner_tab_item_end, inner_tab_item_start_2, half_2, inner_tab_item_end, inner_tabs_end, tab_item_end ].join('\n');
                case 'last':
                    return [tab_item_start, inner_tabs_start, inner_tab_item_start_1, half_1, inner_tab_item_end, inner_tab_item_start_2, half_2, inner_tab_item_end, inner_tabs_end, tab_item_end, tabs_end].join('\n');
                case 'middle':
                    return [tab_item_start, inner_tabs_start, inner_tab_item_start_1, half_1, inner_tab_item_end, inner_tab_item_start_2, half_2, inner_tab_item_end, inner_tabs_end, tab_item_end].join('\n');
                default:
                    return [inner_tabs_start, inner_tab_item_start_1, half_1, inner_tab_item_end, inner_tab_item_start_2, half_2, inner_tab_item_end, inner_tabs_end].join('\n');
            }
        }
    }

    __code_tabs(code, prev, next, blocks) {
        let values = [];
        let lang = code.style.language ? this.code_langs[code.style.language] : 'plaintext'
        
        if ((!prev || (prev && this.block_types[prev['block_type']-1] !== 'code')) && next && this.block_types[next['block_type']-1] === 'code') {

            values.push({ label: get_label(lang), value: lang.toLowerCase() });

            has_next_code(next, this.block_types, this.code_langs);
            
            function has_next_code(next, block_types, code_langs) {
                const next_lang = code_langs[next['code']['style']['language']];

                values.push({ label: get_label(next_lang), value: next_lang.toLowerCase() });
                try {
                    next = blocks[blocks.indexOf(next) + 1];
                if (next && block_types[next['block_type']-1] === 'code') {
                    has_next_code(next, block_types, code_langs);
                }
                } catch {
                // do nothing
                }
            }

            function get_label(lang) {
                let label;
                switch (lang) {
                    case 'JavaScript':
                        label = 'NodeJS'
                        break;
                    case 'Bash':
                        label = 'cURL'
                        break;
                    case 'Shell':
                        label = 'Zilliz CLI'
                        break;
                    default:
                        label = lang
                        break;
                }

                return label;
            }    
        }
        
        return values;
    }

    async __quote(block, indent) {
        let quotes = block['children'].map( (child) => {
            return this.__retrieve_block_by_id(child)
        });
        let res = (await this.__markdown(quotes, indent)).split('\n');

        let type = 'info Notes';
        let possible_titles = ['Notes', 'Note', '说明', 'ノート', 'Warning', 'Warn', '警告']
        let title = possible_titles.find((x, i) => res[0].includes(x));


        if (title && ['Warning', 'Warn', '警告'].indexOf(title) == -1) {
            type = `info 📘 ${title}`;
        } else {
            type = `caution 🚧 ${title}`;
        }

        type = `<Admonition type="${type.split(' ')[0]}" icon="${type.split(' ')[1]}" title="${type.split(' ')[2]}">`;

        let body = res.slice(1)
        while (body.length && body[0].trim() === '') body.shift()
        while (body.length && body[body.length - 1].trim() === '') body.pop()
        body = body.join('\n')

        const raw = ' '.repeat(indent) + type + '\n\n' + body + '\n\n' + ' '.repeat(indent) + '</Admonition>';
        return raw.replace(/(\s*\n){3,}/g, '\n\n');
    }
    
    async __image(image) {
        const root = this.upload_to_s3 ? IMAGE_BED_URL : `/${this.imageDir.replace(/^static\//g, '')}`
        const caption = image.caption?.content ? image.caption.content.trim() : image.token;
        const slug = slugify(caption, {lower: true, strict: true})
        const imageUrl = this.__markdown_image_url(`${root}/${slug}.png`);

        if (this.skip_image_download) {
            return `![${caption}](${imageUrl} "${caption}")`;
        }

        try {
            const { buffer } = await this.downloader.__downloadImage(image.token)
            if (this.upload_to_s3) {
                await this.downloader.__uploadToS3(buffer, `${slug}.png`);
            } else {
                fs.writeFileSync(`${this.downloader.target_path}/${slug}.png`, buffer);
            }
        } catch (error) {
            console.error(`Image ${image.token} error [${error.constructor.name}]: ${error.message}`)
        }

        return `![${caption}](${imageUrl} "${caption}")`;
    }

    __markdown_image_url(url) {
        const encodePath = path => path.split('/').map(part => {
            if (part === '') {
                return part;
            }
            try {
                return encodeURIComponent(decodeURIComponent(part));
            } catch (_error) {
                return encodeURIComponent(part);
            }
        }).join('/');

        try {
            const parsed = new URL(url);
            parsed.pathname = encodePath(parsed.pathname);
            return parsed.toString();
        } catch (_error) {
            return encodePath(url);
        }
    }

    __is_empty_table_cell(cell_text) {
        return this.__filter_content(cell_text || '', this.targets)
            .replace(/<br\/?>/g, '')
            .replace(/&nbsp;/g, '')
            .replace(/<[^>]*>/g, '')
            .trim() === '';
    }

    async __board(board, indent) {
        const root = this.upload_to_s3 ? IMAGE_BED_URL : `/${ this.imageDir.replace(/^static\//g, '')}`
        const boardUrl = this.__markdown_image_url(`${root}/${board["token"]}.png`);

        if (this.skip_image_download) {
            return ' '.repeat(indent) + `![${board.token}](${boardUrl})`;
        }

        try {
            const result = await this.downloader.__downloadBoardPreview(board.token)
            if (!result.ok) {
                console.error(`Board ${board.token} download failed: HTTP ${result.status} ${result.statusText}`)
            } else {
                const buffer = await result.buffer()
                console.log(`Board ${board.token} buffer size: ${buffer.length} bytes`)
                const trimmedBuffer = await this.__trim_white_borders(buffer);
                if (this.upload_to_s3) {
                    await this.downloader.__uploadToS3(trimmedBuffer, `${board["token"]}.png`);
                } else {
                    fs.writeFileSync(`${this.downloader.target_path}/${board["token"]}.png`, trimmedBuffer);
                }
            }
        } catch (error) {
            console.error(`Board ${board.token} error [${error.constructor.name}]: ${error.message}`)
        }

        return ' '.repeat(indent) + `![${board.token}](${boardUrl})`;
    }

    async __trim_white_borders(image) {
        const sharp = require('sharp');

        const timeout = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('sharp toBuffer() timed out after 30s')), 30000)
        );

        try {
            console.log(`sharp trim: input ${image.length} bytes, magic ${image.slice(0,4).toString('hex')}`)
            const trimmedImage = await sharp(image)
                .trim({
                  background: { r: 255, g: 255, b: 255 },
                  threshold: 10
                }).png()

            console.log(`sharp trim: pipeline built, calling toBuffer()`)
            const borderedImage = trimmedImage.extend({
                top: 20,
                bottom: 20,
                left: 20,
                right: 20,
                background: { r: 255, g: 255, b: 255 }
            });

            const buffer = await Promise.race([borderedImage.toBuffer(), timeout]);
            console.log(`sharp trim: output ${buffer.length} bytes`)
            return buffer;

        } catch (error) {
            throw new Error(`Failed to trim image borders: ${error.message}`);
        }
    }

    async __iframe(block) {
        const root = this.upload_to_s3 ? IMAGE_BED_URL : `/${ this.imageDir.replace(/^static\//g, '')}`
        const block_id = block['block_id'];
        const iframe = block['iframe'];
        const existing_iframe = this.iframes.find(x => x.block_id === block_id)
        if (existing_iframe) {
            return `![${existing_iframe.caption}](${root}/${existing_iframe.caption}.png "${existing_iframe.caption}")`;
        }

        if (iframe['component']['iframe_type'] !== 8) {
            return '';
        } else if (this.skip_image_download) {
            const url = new URL(decodeURIComponent(iframe.component.url))
            const key = url.pathname.split('/')[2]
            const node = url.searchParams.get('node-id').split('-').join(":") 
            const caption = (await this.downloader.__fetchCaption(key, node)).nodes[node].document.name;
            this.iframes.push({
                block_id,
                caption
            })
            return `![${caption}](${this.__markdown_image_url(`${root}/${caption}.png`)} "${caption}")`;
        } else {
            try {
                const url = new URL(decodeURIComponent(iframe.component.url))
                const key = url.pathname.split('/')[2]
                const node = url.searchParams.get('node-id').split('-').join(":") 
                const caption = (await this.downloader.__fetchCaption(key, node)).nodes[node].document.name;
                const result = await this.downloader.__downloadIframe(key, node);
                const buffer = await result.buffer();
                if (this.upload_to_s3) {
                    await this.downloader.__uploadToS3(buffer, `${caption}.png`);
                } else if (!fs.existsSync(`${this.downloader.target_path}/${caption}.png`)) {
                    result.body.pipe(fs.createWriteStream(`${this.downloader.target_path}/${caption}.png`));

                    this.iframes.push({
                        block_id,
                        caption
                    })
                }

                return `![${caption}](${this.__markdown_image_url(`${root}/${caption}.png`)} "${caption}")`;
            } catch (error) {
                console.log(error)
                console.log("-------------- A retry is needed -----------------");
                console.log("Sleeping for a minute")
                await new Promise(resolve => setTimeout(resolve, 60000));
                this.__iframe(block)
            }
        }
    }

    async __table(table, indent) {
        const converter = new showdown.Converter({ underline: true })
        const cells = table['cells'];
        const cell_blocks = cells.map(cell => {
            return this.__retrieve_block_by_id(cell).children
        });
        const cell_texts = await Promise.all(cell_blocks.map(async (cell) => {
            let blocks = cell.map(block => this.__retrieve_block_by_id(block));
            return (await this.__markdown(blocks, 1)).replace(/\n/g, '<br/>');
        }));

        const row_size = table['property']['row_size'];
        const column_size = table['property']['column_size'];
        var merge_info = table['property']['merge_info'];
        
        merge_info = merge_info.map((merge, idx) => {
            if (merge) {
                for (var i = 1; i < merge.col_span; i++) {
                    merge_info[idx+i] = null;
                }
    
                for (var j = 1; j < merge.row_span; j++) {
                    merge_info[idx+j*column_size] = null;
                }
            }
            return merge
        })      

        const empty_columns = new Set();
        for (var col = 0; col < column_size; col++) {
            var is_empty_column = true;
            for (var row = 0; row < row_size; row++) {
                const cell_idx = row * column_size + col;
                const merge = merge_info[cell_idx];
                if (!merge || merge.col_span !== 1 || merge.row_span !== 1 || !this.__is_empty_table_cell(cell_texts[cell_idx])) {
                    is_empty_column = false;
                    break;
                }
            }
            if (is_empty_column) {
                empty_columns.add(col);
            }
        }

        var html = ' '.repeat(indent) + '<table>\n';
        for (var i = 0; i < row_size; i++) {
            html += ' '.repeat(indent) +'   <tr>\n';
            for (var j = 0; j < column_size; j++) {
                if (empty_columns.has(j)) {
                    continue;
                }
                const cell_idx = i * column_size + j;
                const merge = merge_info[cell_idx];

                if (merge) {
                    const colspan = merge.col_span > 1 ? ` colspan="${merge.col_span}"` : "";
                    const rowspan = merge.row_span > 1 ? ` rowspan="${merge.row_span}"` : "";
                    let cell_text = this.__filter_content(cell_texts[cell_idx], this.targets).trim()
                        .replace(/^\n/, '')
                        .replace(/<br\/>/g, '\n\n');

                    // Escape solitary tildes to prevent MDX strikethrough parsing
                    cell_text = cell_text.replace(/(?<!~)~(?!~)/g, '&#126;');

                    // Protect Admonition JSX from showdown's <p> wrapping
                    var admonitions = [];
                    cell_text = cell_text.replace(
                        /<Admonition[^>]*>[\s\S]*?<\/Admonition>/g,
                        (match) => {
                            admonitions.push(match);
                            return `%%ADMONITION_${admonitions.length - 1}%%`;
                        }
                    );

                    admonitions = admonitions.map(admonition => admonition.replace(/\n/g, ''));

                    cell_text = converter.makeHtml(cell_text)
                        .replace(/\n/g, '')
                        .replace(/&amp;/g, '&')
                        .replace(/\*/g, '&ast;');

                    admonitions = admonitions.map(admonition => admonition.replace(/\n/g, ''));

                    cell_text = converter.makeHtml(cell_text)
                        .replace(/\n/g, '')
                        .replace(/&amp;/g, '&')
                        .replace(/\*/g, '&ast;');

                    // Restore Admonition components (strip <p> wrapper showdown added)
                    cell_text = cell_text.replace(
                        /<p>%%ADMONITION_(\d+)%%<\/p>/g,
                        (_, idx) => admonitions[parseInt(idx)]
                    );

                    // escape { and } for MDX
                    cell_text = cell_text.replace(/\{/g, '\\{').replace(/\}/g, '\\}');

                    if (i === 0) {
                        html += ` ${' '.repeat(indent)}    <th${colspan}${rowspan}>${cell_text}</th>\n`;
                    } else {
                        html += ` ${' '.repeat(indent)}    <td${colspan}${rowspan}>${cell_text}</td>\n`;
                    }
                }
            }
            html += ' '.repeat(indent) +'   </tr>\n';
        }
        html += ' '.repeat(indent) + '</table>\n';

        return html;
    }

    async __sheet(sheet, indent) {
        const converter = new showdown.Converter({ underline: true })
        const merges = sheet.meta?.data.sheet.merges;
        const values = sheet.values.data.valueRange.values;
        var result = ' '.repeat(indent) + "<table>" + "\n";

        for (const [ridx, row] of values.entries()) {
            result += ' '.repeat(indent) + '    ' + "<tr>" + "\n";
            for (const [cidx, rawCell] of row.entries()) {
                let cell = rawCell
                var colspan = "";
                var rowspan = "";
                if (merges) {
                    const match = merges.filter(merge => merge.start_row_index === ridx && merge.start_column_index === cidx);
                    if (match.length > 0) {
                        colspan = `colspan="${match[0].end_column_index -match[0].start_column_index + 1}"`;
                        rowspan = `rowspan="${match[0].end_row_index -match[0].start_row_index + 1}"`;
                    }
                }
                
                if (typeof cell ==='string') {
                    cell = cell.replace(/\n/g, '<br/>')
                }

                if (typeof cell === 'object') {
                    cell = await this.__sheet_cell(cell)
                } 

                if (typeof cell === 'number') {
                    cell = cell.toString()
                }

                cell = cell.trim().replace(/<br>/g, '\n\n');

                if (ridx === 0) {
                    result += `${' '.repeat(indent) + '    '.repeat(2)}<th${colspan ? " " + colspan : ""}${rowspan ? " " + rowspan : ""}>${converter.makeHtml(cell).replace(/\n/g, '')}</th>\n`
                } else {
                    result += `${' '.repeat(indent) + '    '.repeat(2)}<td${colspan ? " " + colspan : ""}${rowspan ? " " + rowspan : ""}>${converter.makeHtml(cell).replace(/\n/g, '')}</td>\n`
                }
            }
            result += ' '.repeat(indent) + '    ' + "</tr>" + "\n"
        }

        result += ' '.repeat(indent) + "</table>" + "\n";

        return result.replace('"{', '"\\{');
    }    

    async __sheet_cell(cell) {
        if (cell instanceof Array) {
            const blocks = await Promise.all(cell.map(async block => {
                if (block['type'] === 'text') {
                    return block['text']
                }
    
                if (block['type'] === 'url') {
                    const link = await this.__convert_link(block['link'])
                    return `<a href="${link || block['link']}">${block['text']}</a>`
                }
            }))
            return blocks.join('')
        } else {
            console.log(cell)
            return ''
        }

    }

    async __supademo(addons, indent) {
        const record = JSON.parse(addons['record']);

        return ' '.repeat(indent) + `<Supademo id="${record['id']}" title="" ${record['isShowcase'] ? 'isShowcase' : ''} />`;
    }

    async __grid(block, indent) {
        const grid_columns = block.children.map(child => this.__retrieve_block_by_id(child));
        const column_size = block.grid.column_size;
        const width_ratios = grid_columns.map(column => column.grid_column.width_ratio);

        // Await all columns' children markdown
        const columnsContent = await Promise.all(
            grid_columns.map(async column => {
                const children = column.children.map(child => this.__retrieve_block_by_id(child));
                // Join all children's markdown for this column
                let childMarkdowns = await this.__markdown(children, indent + 8);
                childMarkdowns = childMarkdowns.replace(/({#[0-9a-z-]+})/g, "\\$1")
                return `${' '.repeat(indent + 4)}<div>\n\n${' '.repeat(indent + 8)}${childMarkdowns.trim()}\n\n${' '.repeat(indent + 4)}</div>`;
            })
        );

        return (
            `${' '.repeat(indent)}<Grid columnSize="${column_size}" widthRatios="${width_ratios.join(',')}">\n\n` +
                columnsContent.join('\n\n') +
            `\n\n${' '.repeat(indent)}</Grid>\n`
        );
    }

    async __source_synced(block, indent) {
        let children = block.children.map(child => this.__retrieve_block_by_id(child));
        let content = await this.__markdown(children, indent);
        return content;
    }

    __retrieve_block_by_id(block_id) {
        if (!this.page_blocks) {
            throw new Error('Page blocks not found');
        }
        // console.log(this.page_blocks)
        return this.page_blocks.find(x => x['block_id'] === block_id);
    }

    async __equation(element, elements, asis=false) {
        let content = element['equation']['content'];
        let style = element['equation']['text_element_style'];

        let prev = elements[elements.indexOf(element) - 1] || null;
        let prev_element_type = prev? prev['equation'] ? 'equation' : 'text_run' : null;
        let next = elements[elements.indexOf(element) + 1] || null;
        let next_element_type = next? next['equation'] ? 'equation' : 'text_run' : null;
        let rip_off_line_breaks = false;

        // separate single equation
        if (!prev && !next) {
            return `$$\n${content.trim()}\n$$\n`;
        }

        // inline single equation 
        if ((!prev || prev_element_type === 'text_run') && (!next ||next_element_type === 'text_run')) {
            return `$${content.trim()}$`;
        }

        return content;     
    }

    async __text_run(element, elements, asis=false) {
        let content = element['text_run']['content'];
        let style = element['text_run']['text_element_style'];

        if (!content.match(/^\s+$/) && !asis) {
            element['text_run']['content'] = content.replace(/\$/g, '&#36;') // escape $ for markdown
                                                .replace(/\*/g, '&ast;') // escape * for markdown
            
            if (style['inline_code']) {
                content = this.__style_markdown(element, elements, 'inline_code', '`');
                content = content.replaceAll('&#36;', '$')
                content = content.replaceAll('&ast;', '*')
            }
                         
            if (style['bold']) {
                content = this.__style_markdown(element, elements, 'bold', '**');
            }

            if (style['italic']) {
                content = this.__style_markdown(element, elements, 'italic', '*');
            }

            if (style['strikethrough']) {
                content = this.__style_markdown(element, elements, 'strikethrough', '~~');
            }

            if ('link' in style) {
                var prefix = [...content.matchAll(/(^\*\*|^\*|^~~)/g)]
                var suffix = [...content.matchAll(/(\*\*$|\*$|~~$)/g)]

                if (prefix.length > 0) {
                    prefix = prefix[0][0]
                } else {
                    prefix = ''
                }

                if (suffix.length > 0) {
                    suffix = suffix[0][0]
                } else {
                    suffix = ''
                }

                const linkText = content.replace(prefix, '').replace(suffix, '')
                const url = await this.__convert_link(decodeURIComponent(style['link']['url']), linkText)

                content = `${prefix}[${linkText}](${url})${suffix}`;
            }
        }

        return content;
    }

    __style_markdown(element, elements, style_name, decorator) {
        let element_type = element['equation'] ? 'equation' : 'text_run';
        let content = element[element_type]['content'];
        let style = element[element_type]['text_element_style'];

        let prev = elements[elements.indexOf(element) - 1] || null;
        let prev_element_type = prev? prev['equation'] ? 'equation' : 'text_run' : null;
        let next = elements[elements.indexOf(element) + 1] || null;
        let next_element_type = next? next['equation'] ? 'equation' : 'text_run' : null;

        if (!content.match(/^\s+$/)) {
            // single element
            if ((!prev || prev_element_type === 'equation' || (prev && !prev[prev_element_type]['text_element_style'][style_name])) && style[style_name] && (!next || next_element_type === 'equation' || (next && !next[next_element_type]['text_element_style'][style_name]))) {
                let prefix_spaces = content.match(/^\s*/)[0];
                let suffix_spaces = content.match(/\s*$/)[0];
                content = `${prefix_spaces}${decorator}${content.trim()}${decorator}${suffix_spaces}`;
            }

            // first element
            if ((!prev || prev_element_type === 'equation' || (prev && !prev[prev_element_type]['text_element_style'][style_name])) && style[style_name] && next && next_element_type === 'text_run' && next[next_element_type]['text_element_style'][style_name]) {
                let prefix_spaces = content.match(/^\s*/)[0];
                content = `${prefix_spaces}${decorator}${content.trimStart()}`;
            }

            // last element
            if (prev && prev_element_type === 'text_run' && prev[prev_element_type]['text_element_style'][style_name] && style[style_name] && (!next || next_element_type === 'equation' || (next && !next[next_element_type]['text_element_style'][style_name]))) {
                let suffix_spaces = content.match(/\s*$/)[0];
                content = `${content.trimEnd()}${decorator}${suffix_spaces}`;
            }

            // middle element
            if (prev && prev_element_type === 'text_run' && prev[prev_element_type]['text_element_style'][style_name] && style[style_name] && next && next_element_type === 'text_run' && next[next_element_type]['text_element_style'][style_name]) {
                content = `${content}`;
            }
        }

        return content;
    }

    async __mention_doc(element) {
        let title = element['mention_doc']['title'];
        let url = await this.__convert_link(decodeURIComponent(element['mention_doc']['url']), title);
        if (url) {
            return `[${title}](${url})`;
        } else {
            console.log(`Cannot find ${title}`)
            return title;
        }
        
    }

    async __convert_link(url) {
        if (url.includes('zilliverse')) {
            url = new URL(url);
            const token = url.pathname.split('/').pop();
            const header = url.hash.slice(1);
            const isWikiUrl = url.pathname.split('/')[1] === 'wiki';
            var page;

            if (isWikiUrl) {
                try {
                    page = this.__fetch_doc_source('node_token', token);
                } catch (error) {
                    page = null;
                }

                if (!page) {
                    try {
                        page = this.__fetch_doc_source('origin_node_token', token);
                    } catch (error) {
                        page = null;
                    }
                }
            } else {
                try {
                    page = typeof this.__fetch_link_doc_source === 'function'
                        ? this.__fetch_link_doc_source(token)
                        : this.__fetch_doc_source(['token', 'obj_token'], token);
                } catch (error) {
                    page = null;
                }
            }

            if (page) {
                const title = page['title'];
                // const meta = await this.__is_to_publish(title);
                const slug = page['slug'];

                // let newUrl = this.target === 'saas' ? `./${slug}` : `./byoc/${slug}`;
                let newUrl = `./${slug}`;

                if (header) {
                    const headerBlock = page['blocks']['items'].filter(x => x['block_id'] === header)[0];

                    if (headerBlock) {
                        const blockType = this.block_types[headerBlock['block_type'] - 1];
                        if (parseInt(blockType.slice(-1)) <= 9) {
                            var content = await this.__text_elements(headerBlock[blockType]['elements']);
                            content = this.__filter_content(content, this.targets)
                            content = this.__clean_headings(content)
                            const slug = content.includes('{#') ? content.split('{#')[1].replace(/}$/, '') : slugify(content, {strict: true, lower: true});
                            newUrl += `#${slug}`;
                        }
                    }
                }

                console.log(newUrl)

                url = newUrl.replace(/\/\//g, "/");
            } else {
                url = null;
            }
        }


        if (url?.startsWith('https://docs.zilliz.com/')) {
            url = url.replace('https://docs.zilliz.com/', '/');
        }

        return url;
    }

    async __text_elements(elements) {
        let paragraph = "";
        for (let element of elements) {
            if ('text_run' in element) {
                paragraph += await this.__text_run(element, elements);
            }
            if ('mention_doc' in element) {
                paragraph += await this.__mention_doc(element);
            }
            if ('equation' in element) {
                paragraph += await this.__equation(element, elements);
            }
        }

        if (this.docs) {
            paragraph = await this.__auto_link(paragraph, this.docs)
        }

        return paragraph;
    }

    async __auto_link(paragraph, docs) {
        console.log(docs)
        for (let doc of docs) {
            paragraph = paragraph.replace(doc, `[${doc.title}](${doc.slug})`)
        }

        return paragraph
    }

    async __fetch_sdk_versions (url) {
        const sdks = {
            python: 'https://github.com/milvus-io/pymilvus/releases',
            node: 'https://github.com/milvus-io/milvus-sdk-node/releases',
            java: 'https://github.com/milvus-io/milvus-sdk-java/releases',
            go: 'https://github.com/milvus-io/milvus-sdk-go/releases',
        }

        for (let key in sdks) {
            if (sdks[key]) {
                const res = await fetch(sdks[key])
                const $ = cheerio.load(await res.text())
                const version = $('section > h2').first().text().match(/\d+\.\d+\.\d+/)[0]
                const released = $('section').first().find('relative-time').attr('datetime')
                sdks[key] = {
                    version: version,
                    released: released
                }
            }
        }

        return sdks
    }

    __block_types() {
        return [
            "page",
            "text",
            "heading1",
            "heading2",
            "heading3",
            "heading4",
            "heading5",
            "heading6",
            "heading7",
            "heading8",
            "heading9",
            "bullet",
            "ordered",
            "code",
            "quote",
            null,
            "todo",
            "bitable",
            "callout",
            "chat_card",
            "diagram",
            "divider",
            "file",
            "grid",
            "grid_column",
            "iframe",
            "image",
            "isv",
            "mindnote",
            "sheet",
            "table",
            "table_cell",
            "view",
            "quote_container",
            "task",
            "okr",
            "okr_objective",
            "okr_key_result",
            "okr_progress",
            "add_ons",
            "jira_issue",
            "wiki_catelog",
            "board",
            "agenda",
            "agenda_item",
            "agenda_item_title",
            "agenda_item_content",
            "link_preview",
            "source_synced",
            "reference_synced",
            "sub_page_list",
            "ai_template"
        ]
    }

    __code_langs() {
        return [
            null,
            "PlainText",
            "ABAP",
            "Ada",
            "Apache",
            "Apex",
            "Assembly",
            "Bash",
            "CSharp",
            "C++",
            "C",
            "COBOL",
            "CSS",
            "CoffeeScript",
            "D",
            "Dart",
            "Delphi",
            "Django",
            "Dockerfile",
            "Erlang",
            "Fortran",
            "FoxPro",
            "Go",
            "Groovy",
            "HTML",
            "HTMLBars",
            "HTTP",
            "Haskell",
            "JSON",
            "Java",
            "JavaScript",
            "Julia",
            "Kotlin",
            "LateX",
            "Lisp",
            "Logo",
            "Lua",
            "MATLAB",
            "Makefile",
            "Markdown",
            "Nginx",
            "Objective",
            "OpenEdgeABL",
            "PHP",
            "Perl",
            "PostScript",
            "Power",
            "Prolog",
            "ProtoBuf",
            "Python",
            "R",
            "RPG",
            "Ruby",
            "Rust",
            "SAS",
            "SCSS",
            "SQL",
            "Scala",
            "Scheme",
            "Scratch",
            "Shell",
            "Swift",
            "Thrift",
            "TypeScript",
            "VBScript",
            "Visual",
            "XML",
            "YAML",
            "CMake",
            "Diff",
            "Gherkin",
            "GraphQL",
            "OpenGL Shading Language",
            "Properties",
            "Solidity",
            "TOML",        
        ]
    }

    keyword_picker(seedInput=null) {
        const keywords = fs.readFileSync(node_path.join('plugins', 'lark-docs', 'meta', 'keywords.txt'), 'utf8').trim().split('\n')
        let seed = Math.floor(Math.random() * keywords.length)
        if (seedInput != null) {
            seed = String(seedInput).split('').reduce((hash, char) => {
                return (hash * 31 + char.charCodeAt(0)) >>> 0
            }, 0) % keywords.length
        }
        return [keywords[seed], keywords[(seed+1)%keywords.length], keywords[(seed+2)%keywords.length], keywords[(seed+3)%keywords.length]]
    }
}

module.exports = larkDocWriter
