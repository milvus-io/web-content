const larkTokenFetcher = require('./larkTokenFetcher.js')
const Downloader = require('./larkImageDownloader.js')
const slugify = require('slugify')
const fs = require('node:fs')
const { URL } = require('node:url')
const fetch = require('node-fetch')
const node_path = require('node:path')
const cheerio = require('cheerio')
const showdown = require('showdown')
const Jimp = require("jimp");
const _ = require('lodash')

class larkDocWriter {
    constructor(root_token, base_token, displayedSidebar, docSourceDir='plugins/lark-docs/meta/sources', imageDir='static/img', targets='zilliz.saas', skip_image_download=false) {
        this.root_token = root_token
        this.base_token = base_token
        this.displayedSidebar = displayedSidebar
        this.docSourceDir = docSourceDir
        this.page_blocks = []
        this.blocks = []
        this.targets = targets
        this.skip_image_download = skip_image_download
        this.imageDir = imageDir
        this.block_types = [
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
            "board"
        ]
        this.code_langs = [
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
        this.tokenFetcher = new larkTokenFetcher()
        this.downloader = new Downloader({}, imageDir)
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
                            page_type: type,
                            page_token: child.node_token,
                            sidebar_position: index+1,
                            sidebar_label: labels,
                            keywords: keywords,
                            doc_card_list: true,
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
                                const labels = meta['labels']
                                const keywords = meta['keywords']
                                console.log(`${current_path}/${slug}.md`)
                                await this.write_doc({
                                    path: current_path,
                                    page_title: child.title,
                                    page_slug: child.slug,
                                    page_beta: beta,
                                    notebook: notebook,
                                    page_type: type,
                                    page_token: token,
                                    sidebar_position: index+1,
                                    sidebar_label: labels,
                                    keywords: keywords,
                                    doc_card_list: false,
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
        page_type,
        page_token,
        sidebar_position,
        sidebar_label,
        keywords,
        doc_card_list
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
            await this.__write_page({
                title: page_title,
                suffix: this.__title_suffix(path),
                slug: page_slug,
                beta: page_beta,
                notebook: notebook,
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
        const table_id = (await (await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })).json()).data.items[0].table_id

        url = `${process.env.FEISHU_HOST}/open-apis/bitable/v1/apps/${this.base_token}/tables/${table_id}/records?page_size=500`
        this.records = (await (await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        })).json()).data.items
    }

    async __is_to_publish (title, slug) {
        if (!this.records) {
            await this.__listed_docs()
        }

        const result = this.records.filter(record => {
            const record_slug = record["fields"]["Slug"] instanceof Array ? record["fields"]["Slug"][0].text : record["fields"]["Slug"]

            if (record["fields"]["Docs"] && record["fields"]["Docs"]["text"] === title && record_slug == slug && record["fields"]["Targets"] &&
                record["fields"]["Progress"] && (record["fields"]["Progress"] === "Draft" || record["fields"]["Progress"] === "Publish")) {

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

    async __write_page({title, suffix, slug, beta, notebook, path, type, token, sidebar_position, sidebar_label, keywords, doc_card_list}) {
        let markdown = await this.__markdown()
        markdown = this.__filter_content(markdown, this.targets)
        markdown = markdown.replace(/(\s*\n){3,}/g, '\n\n').replace(/(<br\/>){2,}/, "<br/>").replace(/<br>/g, '<br/>');
        markdown = markdown.replace(/^[\||\s][\s|\||<br\/>]*\|\n/gm, '')
        markdown = markdown.replace(/\s*<tr>\n(\s*<td>(<br\/>)*<\/td>\n)*\s*<\/tr>/g, '')
        markdown = this.__mdx_patches(markdown)

        const description = this.__extract_description(markdown)

        let front_matter = this.__front_matters(title, suffix, slug, beta, notebook, type, token, sidebar_position, sidebar_label, keywords, this.displayedSidebar, description)

        let tabs = markdown.split('\n').filter(line => {
            return line.trim().startsWith("<Tab")
        }).length

        let imports = this.__imports(tabs > 0)

        if (doc_card_list) {
            markdown += "\n\nimport DocCardList from '@theme/DocCardList';\n\n<DocCardList />"
        }

        var file_path = `${path}/${slug}.md`

        if (this.targets.split('.').includes('zilliz')) {
            markdown = markdown.replace(/http:\/\/localhost:19530/g, 'YOUR_CLUSTER_ENDPOINT')
            markdown = markdown.replace(/127.0.0.1:19530/g, 'YOUR_CLUSTER_ENDPOINT')
            markdown = markdown.replace(/root:Milvus/g, 'YOUR_CLUSTER_TOKEN')
        }

        if (this.targets.split('.').includes('milvus')) {
            markdown = markdown.replace(/YOUR_CLUSTER_ENDPOINT/g, 'http://localhost:19530')
            markdown = markdown.replace(/YOUR_CLUSTER_TOKEN/g, 'root:Milvus')
        }

        if (path) {
            fs.writeFileSync(file_path, front_matter + '\n\n' + imports + '\n\n' + markdown)
        } else {
            return {
                front_matter,
                imports,
                markdown
            }
        }
    }

    __front_matters (title, suffix, slug, beta, notebook, type, token, sidebar_position=undefined, sidebar_label="", keywords="", displayed_sidebar=this.displayedSidebar, description="") {
        if (keywords !== "") {
            keywords = keywords + ',' + this.keyword_picker().join(',')
            keywords = "keywords: \n  - " + keywords.split(',').map(item => item.trim()).join('\n  - ') + '\n'
        }

        if (displayed_sidebar === 'default') {
            displayed_sidebar = ''
        } else {
            slug = `${displayed_sidebar.replace('Sidebar', '').trim()}/${slug}`
            displayed_sidebar = `displayed_sidebar: ${displayed_sidebar}\n`
        }

        if (description) {
            description = description.trim().replace('\n', '|').replace(/\[(.*)\]\(.*\)/g, '$1').replace(':', '').replace(/\*+|_+/g, '').replace(/\"/g, "\\\"")
        }

        let front_matter = '---\n' + 
        `title: "${title} | ${suffix}"` + '\n' +
        `slug: /${slug}` + '\n' +
        `sidebar_label: "${sidebar_label !== "" ? sidebar_label : title}"` + '\n' +
        `beta: ${beta ? beta : 'FALSE'}` + '\n' +
        `notebook: ${notebook ? notebook : 'FALSE'}` + '\n' +
        `description: "${description} | ${suffix}"` + '\n' +
        `type: ${type}` + '\n' +
        `token: ${token}` + '\n' +
        `sidebar_position: ${sidebar_position}` + '\n' +
        keywords +
        displayed_sidebar + '\n' +
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
        } else {
            return "import Admonition from '@theme/Admonition';" + "\n"
        }
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
                markdown.push(await this.__code(block, indent, prev_block, next_block, blocks));
            } else if (this.block_types[block['block_type']-1] === 'quote_container') {
                markdown.push(await this.__quote(block, indent));
            } else if (this.block_types[block['block_type']-1] === 'image') {
                markdown.push(idt + (await this.__image(block['image'])));
            } else if (this.block_types[block['block_type']-1] === 'iframe') {
                markdown.push(idt + (await this.__iframe(block['iframe'])));
            } else if (this.block_types[block['block_type']-1] === 'table') {
                markdown.push(await this.__table(block['table'], indent));
            } else if (this.block_types[block['block_type']-1] === 'sheet') {
                markdown.push(await this.__sheet(block['sheet'], indent));
            } else if (this.block_types[block['block_type']-1] === 'callout') {
                markdown.push(await this.__callout(block, indent));
            } else if (this.block_types[block['block_type']-1] === 'board') {
                markdown.push(await this.__board(block['board'], indent));
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

    __mdx_patches(content) {
        var code_marks = [...content.matchAll(/`+/g)].map(match => { return { idx: match.index, match: match[0] } })

        if (code_marks.length % 2 === 0) {
            const code_pairs = code_marks.map((mark, i) => {
                if (i % 2 === 0) {
                    return { start: mark.idx + mark.match.length, end: code_marks[i+1].idx }
                } else {
                    return null
                }
            }).filter(mark => mark)
        
            const tags = [...content.matchAll(/<([^\n]*?)>+?/g)]

            // console.log(tags.map(tag => tag[0]))
        
            tags.forEach((tag, i) => {
                if (tag && tag[1].endsWith('/')) {
                    tags[i] = null
                }
        
                if (tag && !tag[1].trim().split(' ')[0].startsWith('/')) {
                    const end_tag_idx = tags.findIndex(t => t && t[1].endsWith(`/${tag[1].trim().split(' ')[0]}`))
                    if (end_tag_idx > i) {
                        tags[i] = null
                        tags[end_tag_idx] = null
                    }
                }
            })
        
            const acorns = tags.filter(tag => tag).filter(acorn => !code_pairs.some(pair => pair.start < acorn.index && pair.end > acorn.index))

            // console.log(acorns.map(acorn => acorn[0]))
        
            acorns.forEach((acorn, i) => {
                const c = acorn[0].match(/</g).length - 1
                const a = acorn[0].replace(/</g, '\\<').replace('"{', '"\\{');
                content = content.slice(0, acorn.index + i) + a + content.slice(acorn.index + i + acorn[0].length + c)
            })
        }
        
        return content.replace(/\\\\/g, '\\');
    }

    async __page(page) {
        return '# ' + await this.__text_elements(page['elements']);
    }

    async __text(text) {
        return await this.__text_elements(text['elements'])
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

        return ' '.repeat(indent) + '1. ' + await this.__text_elements(block['ordered']['elements']) + '\n\n' + children;
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
        
        const converter = new showdown.Converter()
        const html = converter.makeHtml(children.slice(1).map(line => line.replace(/^\s*/g, '')).join('\n'))

        const raw = ' '.repeat(indent) + type + '\n\n' + ' '.repeat(indent) + html.split('\n').join('\n' + ' '.repeat(indent)) + '\n\n' + ' '.repeat(indent) + '</Admonition>';
        return raw.replace(/(\s*\n){3,}/g, `\n${' '.repeat(indent)}\n`);
    }

    async __code(block, indent, prev, next, blocks) {
        const code = block.code
        const valid_langs = ['Python', 'JavaScript', 'Java', 'Go', 'Bash']
        let lang = code.style.language ? this.code_langs[code['style']['language']] : 'plaintext'
        let elements = (await Promise.all(code['elements'].map( async x => {
            return await this.__text_run(x, code['elements'], true)
        }))).join('') 

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
                const values = this.__code_tabs(code, prev, next, blocks);
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
        elements = elements.split('\n');
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
        res.splice(1, 0, "");

        const converter = new showdown.Converter()
        const html = converter.makeHtml(res.slice(1).map(line => line.replace(/^\s*/g, '')).join('\n'))

        const raw = ' '.repeat(indent) + type + '\n\n' + ' '.repeat(indent) + html.split('\n').join('\n' + ' '.repeat(indent)) + '\n\n' + ' '.repeat(indent) + '</Admonition>';
        return raw.replace(/(\s*\n){3,}/g, '\n\n');
    }  
    
    async __image(image) {
        const root = this.imageDir.replace(/^static\//g, '')

        if (this.skip_image_download) {
            return `![${image.token}](/${root}/${image["token"]}.png)`;
        }

        try {
            const result = await this.downloader.__downloadImage(image.token)
            result.body.pipe(fs.createWriteStream(`${this.downloader.target_path}/${image["token"]}.png`));
        } catch (error) {
            console.log(error)
            console.log("-------------- A retry is needed -----------------");
            console.log("Sleeping for 5 seconds")
            await new Promise(resolve => setTimeout(resolve, 5000));
            this.__image(image)
        }

        return `![${image.token}](/${root}/${image["token"]}.png)`;
    }

    async __board(board, indent) {
        const root = this.imageDir.replace(/^static\//g, '')

        if (this.skip_image_download) {
            return `![${board.token}](/${root}/${board["token"]}.png)`;
        }

        const result = await this.downloader.__downloadBoardPreview(board.token)
        const writeStream = fs.createWriteStream(`${this.downloader.target_path}/${board["token"]}.png`);
        result.body.pipe(writeStream);

        writeStream.on('finish', async () => {
            try {
                const image = await Jimp.read(`${this.downloader.target_path}/${board["token"]}.png`);
                this.__crop_image_border(image)
                image.write(`${this.downloader.target_path}/${board["token"]}.png`);
            } catch (error) {
                console.log(error)
                console.log("-------------- A retry is needed -----------------");
                console.log("Sleeping for 5 seconds")
                await new Promise(resolve => setTimeout(resolve, 5000));
                this.__board(board, indent)                             
            }
        });                

        return `![${board.token}](/${root}/${board["token"]}.png)`;
    }

    __crop_image_border(image) {
        const width = image.bitmap.width;
        const height = image.bitmap.height;

        const full_white_cols = [];

        for (let i = 0; i < width; i++) {
            const col = []
            for (let j = 0; j < height; j++) {
                const pixel = image.getPixelColor(i, j);
                col.push(pixel)
            }

            if ([... new Set(col)].length === 1 && col[0] === 4294967295) {
                full_white_cols.push(i)
            }
        }

        const full_white_rows = [];

        for (let j = 0; j < height; j++) {
            const row = []
            for (let i = 0; i < width; i++) {
                const pixel = image.getPixelColor(i, j);
                row.push(pixel)
            }

            if ([... new Set(row)].length === 1 && row[0] === 4294967295) {
                full_white_rows.push(j)
            }
        }

        
        const reverse = full_white_rows.reverse()

        for (let i=0; i<height; i++) {
            if (reverse[i] !== height - 1 - i) {
                image.crop(0, 0, width, reverse[i-1])
                break;
            }
        }
    }

    async __iframe(iframe) {
        const root = this.imageDir.replace(/^static\//g, '')

        if (iframe['component']['iframe_type'] !== 8) {
            return '';
        } else if (this.skip_image_download) {
            const url = new URL(decodeURIComponent(iframe.component.url))
            const key = url.pathname.split('/')[2]
            const node = url.searchParams.get('node-id').split('-').join(":") 
            const caption = (await this.downloader.__fetchCaption(key, node)).nodes[node].document.name;
            return `![${caption}](/${root}/${caption}.png)`;
        } else {
            try {
                const url = new URL(decodeURIComponent(iframe.component.url))
                const key = url.pathname.split('/')[2]
                const node = url.searchParams.get('node-id').split('-').join(":") 
    
                const caption = (await this.downloader.__fetchCaption(key, node)).nodes[node].document.name;
                const result = await this.downloader.__downloadIframe(key, node);
                result.body.pipe(fs.createWriteStream(`${this.downloader.target_path}/${caption}.png`));
                return `![${caption}](/${root}/${caption}.png)`;
            } catch (error) {
                console.log(error)
                console.log("-------------- A retry is needed -----------------");
                console.log("Sleeping for 5 seconds")
                await new Promise(resolve => setTimeout(resolve, 5000));
                this.__iframe(iframe)
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

        var html = ' '.repeat(indent) + '<table>\n';
        for (var i = 0; i < row_size; i++) {
            html += ' '.repeat(indent) +'   <tr>\n';
            for (var j = 0; j < column_size; j++) {
                const cell_idx = i * column_size + j;
                const merge = merge_info[cell_idx];

                if (merge) {
                    const colspan = merge.col_span > 1 ? ` colspan="${merge.col_span}"` : "";
                    const rowspan = merge.row_span > 1 ? ` rowspan="${merge.row_span}"` : "";
                    let cell_text = this.__filter_content(cell_texts[cell_idx], this.targets).trim()
                        .replace(/^\n/, '')
                        .replace(/<br\/>/g, '\n')

                    cell_text = converter.makeHtml(cell_text)
                        
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

        values.forEach((row, ridx) => {
            result += ' '.repeat(indent) + '    ' + "<tr>" + "\n";
            row.forEach((cell, cidx) => {
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
                    cell = this.__sheet_cell(cell)
                } 

                if (typeof cell === 'number') {
                    cell = cell.toString()
                }

                cell = cell.trim().replace(/<br>/g, '\n');

                if (ridx === 0) {
                    result += `${' '.repeat(indent) + '    '.repeat(2)}<th${colspan ? " " + colspan : ""}${rowspan ? " " + rowspan : ""}>${converter.makeHtml(cell).replace(/\n/g, '')}</th>\n`
                } else {
                    result += `${' '.repeat(indent) + '    '.repeat(2)}<td${colspan ? " " + colspan : ""}${rowspan ? " " + rowspan : ""}>${converter.makeHtml(cell).replace(/\n/g, '')}</td>\n`
                }
            })
            result += ' '.repeat(indent) + '    ' + "</tr>" + "\n"
        });

        result += ' '.repeat(indent) + "</table>" + "\n";

        return result.replace('"{', '"\\{');
    }    

    __sheet_cell(cell) {
        if (cell instanceof Array) {
            return cell.map(block => {
                if (block['type'] === 'text') {
                    return block['text']
                }
    
                if (block['type'] === 'url') {
                    return `<a href="${block['link']}">${block['text']}</a>`
                }
            }).join('')
        } else {
            console.log(cell)
            return ''
        }

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

        let prev = elements[elements.indexOf(element) - 1] || null;
        let prev_element_type = prev? prev['equation'] ? 'equation' : 'text_run' : null;
        let next = elements[elements.indexOf(element) + 1] || null;
        let next_element_type = next? next['equation'] ? 'equation' : 'text_run' : null;

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
            if (style['inline_code']) {
                content = this.__style_markdown(element, elements, 'inline_code', '`');
            } else {                
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
                    const url = await this.__convert_link(decodeURIComponent(style['link']['url']))

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

                    content = `${prefix}[${content.replace(prefix, '').replace(suffix, '')}](${url})${suffix}`;
                }
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

    async __mention_doc(element, asis=false) {
        let title = element['mention_doc']['title'];
        let url = await this.__convert_link(decodeURIComponent(element['mention_doc']['url']));
        if (url && !asis) {
            return `[${title}](${url})`;
        } else {
            if (!asis) {
                console.log(`Cannot find ${title}`)
            }
            return title;
        }
        
    }

    async __convert_link(url) {
        if (url.includes('zilliverse')) {
            url = new URL(url);
            const token = url.pathname.split('/').pop();
            const header = url.hash.slice(1);
            const key = url.pathname.split('/')[1] === 'wiki' ? 'origin_node_token' : ['token', 'obj_token']; // TODO
            var page;

            try {
                page = this.__fetch_doc_source(key, token);
            } catch (error) {
                page = null;
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

    keyword_picker() {
        const keywords = fs.readFileSync(node_path.join('plugins', 'lark-docs', 'meta', 'keywords.txt'), 'utf8').trim().split('\n')
        const seed = Math.floor(Math.random() * keywords.length)
        return [keywords[seed], keywords[(seed+1)%keywords.length], keywords[(seed+2)%keywords.length], keywords[(seed+3)%keywords.length]]
    }
}

module.exports = larkDocWriter
