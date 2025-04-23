const larkTokenFetcher = require('./larkTokenFetcher.js')
const larkDocWriter = require('./larkDocWriter.js')
const fetch = require('node-fetch')
const fs = require('fs')
const path = require('path');
const inquirer = require('inquirer');
const Jimp = require("jimp");

class MilvusDocsGen extends larkDocWriter {
    constructor(base, sourceType, menuStructure, imageDir, alt_texts) {
        super(null, null, null, null, imageDir, "milvus");
        this.base = base;
        this.sourceType = sourceType;
        this.menuStructure = menuStructure;
        this.tokenFetcher = new larkTokenFetcher();
        this.alt_texts = alt_texts;
        this.inquirer = inquirer.createPromptModule();
        this.tokens = [];
    }

    async write_docs(parent_title, parent_id=null) {
        console.log("Fetching metadata for [", parent_title, "]...");
        const sources = this.records || await this.__list_sources();

        if (!parent_id) {
            const candidates =  sources.filter(source => source.title === parent_title);

            if (candidates.length > 1) {
                var { source } = await inquirer.prompt([
                    {
                        type: 'list',
                        name:'source',
                        message: `Multiple sources found for ${parent_title}. Which one do you want to start generating the documentation iteratively?`,
                        choices: candidates.map(source => `${source.title} (${source.page_id})`)
                    }
                ])
    
                parent_id = source.split('(')[1].replace(')', '');
            } else if (candidates.length === 1) {
                parent_id = candidates[0].page_id;
            } else {
                console.error(`No sources found for ${parent_title}`);
                return;
            }
        } 
            
        const metadata = sources.find(source => source.title === parent_title && source.page_id === parent_id)
        const children = this.__iterate_sources(metadata.record_id)
        const docs = []

        for (let child of children) {
            docs.push(await this.write_doc(child.title, child.page_id))
        }

        return docs;
    }
 
    async write_doc(doc_title, doc_id=null) {
        console.log(`Fetching metadata for [${doc_title}]...`)
        const sources = this.records || await this.__list_sources();

        if (!doc_id) {
            const candidates =  sources.filter(source => source.title === doc_title);

            if (candidates.length > 1) {
                var { source } = await inquirer.prompt([
                    {
                        type: 'list',
                        name:'source',
                        message: `Multiple sources found for ${doc_title}. Which one do you want to generate the documentation for?`,
                        choices: candidates.map(source => `${source.title} (${source.page_id})`)
                    }
                ])
    
                doc_id = source.split('(')[1].replace(')', '');
            } else if (candidates.length === 1) {
                doc_id = candidates[0].page_id;
            } else {
                console.error(`No sources found for ${doc_title}`);
                return;
            }
        } 
            
        const metadata = sources.find(source => source.title === doc_title && source.page_id === doc_id)

        const { 
            record_id, 
            page_id, 
            title, 
            source_link, 
            page_token, 
            label, 
            keywords, 
            beta, 
            progress, 
            parent 
        } = metadata;

        if (! page_id.endsWith(".md")) {
            console.log(`Skipping ${title} as it is not a markdown file`);
            return;
        }
        
        console.log(`Fetching the source ...`)
        this.page_blocks = await this.__fetch_doc_blocks(page_token);
        if (!this.page_blocks) console.log("Failed to fetch the source") && process.exit(1);
        
        console.log(`Generating the front matters ...`)
        let page = this.page_blocks.find(block => block.block_type === 1)
        if (page && page.children) {
            this.blocks = page.children.map(child => {
                return this.__retrieve_block_by_id(child)
            })
        }

        const summary = await this.__raw_content(this.page_blocks.find(block => block.block_type === 2).text.elements)
        const front_matters = this.__front_matters({id: page_id, title, summary: summary.trim(), keywords, beta});

        console.log(`Generating the content ...`)
        let content = await this.__markdown()
        content = this.__filter_content(content, this.targets)

        return {
            front_matters,
            content,
            page_id,
        }
    }

    async __raw_content(elements) {
        let paragraph = "";
        for (let element of elements) {
            if ('text_run' in element) {
                paragraph += await this.__text_run(element, elements, true);
            }
            if ('mention_doc' in element) {
                paragraph += await this.__mention_doc(element, true);
            }
        }

        if (this.docs) {
            paragraph = await this.__auto_link(paragraph, this.docs)
        }

        paragraph = this.__filter_content(paragraph, this.targets)

        return paragraph;        
    }

    async __heading (heading, level) {
        let content = await this.__text_elements(heading['elements'])
        content = this.__clean_headings(content)

        if (content.length > 0) {
            if (content.indexOf('{#') < 0) {
                return '#'.repeat(level) + ' ' + content;
            } else {
                return '#'.repeat(level) + ' ' + content.split('{#')[0].trim();
            }
        } else {
            return '';
        }        
    }

    async __code(block, indent, prev, next, blocks) {
        const code = block.code
        const code_block_groups = this.__locate_all_code_block_groups(blocks);
        const first_code_block_in_groups = code_block_groups.map(group => group[0]);
        
        let lang = code.style.language ? this.code_langs[code['style']['language']] : 'plaintext'
        let elements = (await Promise.all(code['elements'].map( async x => {
            return await this.__text_run(x, code['elements'], true)
        }))).join('').split('\n')

        elements.splice(0, 0, '```' + lang.replace(/\s+/g, '').toLowerCase())
        elements.push('```')
        
        if (first_code_block_in_groups.includes(block.block_id)) {
            let prefix = this.__get_code_block_group_container(block.block_id);
            prefix.splice(0, 0, '<div class="multipleCode">')
            prefix.push('</div>\n')
            elements = prefix.concat(elements)
        }

        return elements.map(element => ' '.repeat(indent) + element).join('\n')
    }

    __get_code_block_group_container(first_code_block_id) {
        const code_block_groups = this.__locate_all_code_block_groups();
        const group_index = code_block_groups.findIndex(group => group.includes(first_code_block_id));
        const current_group = code_block_groups[group_index];

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

        return current_group.map(id => this.__retrieve_block_by_id(id).code.style.language)
            .map(lang => {
                lang = this.code_langs[lang] || 'plaintext';
                return `    <a href="#${lang.replace(/\s+/g, '').toLowerCase()}">${get_label(lang)}</a>`
            })
    }

    __locate_all_code_block_groups() {
        const codeBlockGroups = [];
        let currentGroup = [];

        for (let i = 0; i < this.page_blocks.length; i++) {
            const block = this.page_blocks[i];

            if (block.block_type === 14) {
                currentGroup.push(block.block_id);
            } else {
                if (currentGroup.length === 1) {
                    currentGroup = [];
                }

                if (currentGroup.length > 1) {
                    codeBlockGroups.push([...currentGroup]);
                    currentGroup = [];
                }
            }
        }

        // Add any remaining group at the end
        if (currentGroup.length > 1) {
            codeBlockGroups.push(currentGroup);
        }

        return codeBlockGroups;
    }

    async __alt_text_prompt(type, token) {
        const alt_text = await inquirer.prompt([
            {
                type: 'input',
                name: 'alt_text',
                message: `Enter the alternative text for the ${type} type image ${token}:`,
            }
        ])

        this.alt_texts.push({
            token: token,
            type: type,
            alt_text: alt_text.alt_text
        })

        const would_be_file_path = path.join(this.imageDir, alt_text.alt_text + ".png")
        let confirm = true;
        if (fs.existsSync(would_be_file_path)) {
            confirm = await inquirer.prompt([
                {
                    type: 'confirm',
                    name: 'confirm',
                    message: `A file named ${alt_text.alt_text}.png already exists. Do you want to overwrite it?`,
                    default: true
                }
            ])

            confirm = confirm.confirm
        }

        return [ alt_text.alt_text, confirm ]
    }

    __locate_alt_text(token) {
        const alt_text = this.alt_texts.find(alt_text => alt_text.token === token)
        return alt_text?.alt_text || token
    }

    async __image (image) {
        const root = this.imageDir.replace(/^static\//g, '')

        let alt_text = this.__locate_alt_text(image.token)
        let confirm = true;

        if (alt_text === image.token) {
            [ alt_text, confirm ] = await this.__alt_text_prompt("image", image.token)
        }

        const caption = alt_text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

        if (this.skip_image_download) {
            return `![${caption}](/${root}/${alt_text}.png)`;
        }

        try {
            console.log(`Downloading image ${alt_text}.png ...`)
            const file_path = path.join(this.downloader.target_path, alt_text + ".png");

            if (confirm) {
                const result = await this.downloader.__downloadImage(image.token)
                result.body.pipe(fs.createWriteStream(file_path));
            }
        } catch (error) {
            console.log(error)
            console.log("-------------- A retry is needed -----------------");
            console.log("Sleeping for 5 seconds")
            await new Promise(resolve => setTimeout(resolve, 5000));
            this.__image(image)
        }

        return `![${caption}](/${root}/${alt_text}.png)`;
    }

    async __board(board, indent) {
        const root = this.imageDir.replace(/^static\//g, '')

        var alt_text = this.__locate_alt_text(board.token)
        var confirm = true;

        if (alt_text === board.token) {
            [ alt_text, confirm ] = await this.__alt_text_prompt("board", board.token)
        }

        const caption = alt_text.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')

        if (this.skip_image_download) {
            return `![${caption}](/${root}/${alt_text}.png)`;
        }

        console.log(`Downloading image ${alt_text}.png ...`)
        const file_path = path.join(this.downloader.target_path, alt_text + ".png");

        if (confirm) {
            const result = await this.downloader.__downloadBoardPreview(board.token)
            const writeStream = fs.createWriteStream(file_path);
            result.body.pipe(writeStream);

            writeStream.on('finish', async () => {
                try {
                    const image = await Jimp.read(file_path);
                    this.__crop_image_border(image)
                    image.write(file_path);
                } catch (error) {
                    console.log(error)
                    console.log("-------------- A retry is needed -----------------");
                    console.log("Sleeping for 5 seconds")
                    await new Promise(resolve => setTimeout(resolve, 5000));
                    this.__board(board, indent)                             
                }
            });  
        }              

        return `![${caption}](/${root}/${alt_text}.png)`;
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
            children = children.slice(1).map(line => line.replace(/^\s*/g, ''));
        }

        let emoji = block['callout']['emoji_id']
        let type;

        switch (emoji) {
            case 'construction':
                type = "alert warning"
                break;
            default:
                type = "alert note"
                break; 
        }

        const raw = ' '.repeat(indent) + `<div class="${type}">` + '\n\n' + ' '.repeat(indent) + 
            children.join('\n' + ' '.repeat(indent)) + '\n\n' + ' '.repeat(indent) + '</div>';
        return raw.replace(/(\s*\n){3,}/g, `\n${' '.repeat(indent)}\n`);
    }

    async __quote(block, indent) {
        let quotes = block['children'].map( (child) => {
            return this.__retrieve_block_by_id(child)
        });
        let res = (await this.__markdown(quotes, indent)).split('\n');
        res = res.slice(1).map(line => line.replace(/^\s*/g, ''));

        let type = "";
        let possible_titles = ['Notes', 'Note', '说明', 'ノート', 'Warning', 'Warn', '警告']
        let title = possible_titles.find((x, i) => res[0].includes(x));


        if (title && ['Warning', 'Warn', '警告'].indexOf(title) == -1) {
            type = `alert note`;
        } else {
            type = `alert warning`;
        }

        const raw = ' '.repeat(indent) + `<div class="${type}">` + '\n\n' + ' '.repeat(indent) + 
            res.join('\n' + ' '.repeat(indent)) + '\n\n' + ' '.repeat(indent) + '</div>';
        return raw.replace(/(\s*\n){3,}/g, '\n\n');
    } 

    __front_matters({id, title, summary, keywords, beta}) {
        if (keywords.length > 0) {
            keywords = `keywords: ${keywords.join(", ")}`
        }

        if (beta) {
            beta = `beta: ${beta}`
        }

        return '---\n' +
            `id: ${id}\n` +
            `title: "${title}"\n` +
            `summary: "${this.__filter_content(summary.replace(/"/g, '\\"'), this.targets)}"` +
            `${keywords ? '\n' + keywords : ""}` +
            `${beta ? '\n' + beta : ""}` +
            '\n---\n'.replace(/\n\s*/g, '')
    }

    async __list_sources() {
        if (!this.records) {
            await this.__getBase();
        }

        this.records = (await Promise.all(this.records.map(async record => {
            if (! record.fields.Doc) return null

            var page_token = record.fields.Doc.link.indexOf("zilliverse") ? record.fields.Doc.link.split("/").pop() : null;

            return {
                record_id: record.record_id,
                page_id: record.fields.ID,
                title: record.fields.Doc.text,
                source_link: record.fields.Doc.link,
                page_token: page_token,
                label: record.fields.Label ? record.fields.Label : record.fields.Doc.text,
                keywords: record.fields.Keywords ? record.fields.Keywords.split(",") : [],
                beta: record.fields.Beta ? record.fields.Beta : false,
                progress: record.fields.Progress,
                parent: record.fields['Parent items'][0].record_ids?.[0]
            }
        }))).filter(record => record);

        return this.records;
    }

    async __getBase() {
        const [base_token, table_id] = this.base.split(":")
        const base_id = await this.__convert_wiki_token(base_token)
        const token = await this.tokenFetcher.token()

        const url = `${process.env.FEISHU_HOST}/open-apis/bitable/v1/apps/${base_id}/tables/${table_id}/records?page_size=500`
        let response = await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        }) 

        let status = response.status;
        let headers = response.headers;
        response = await response.json();

        if (response.code === 0) {
            this.records = response.data.items;
        } else if (status === 429) {
            const timeout = headers['x-ogw-ratelimit-reset']
            await this.__wait(timeout * 1000)
            await this.__getBase()
        }
    }

    __get_parent_id(record_id) {
        return this.records.find(record => record.record_id === record_id)?.fields.Doc
    }

    async __get_section_titles(document_id) {
        const document_token = this.records.find(record => record.page_id === document_id)?.page_token;
        const blocks = await this.__fetch_doc_blocks(document_token);

        if (!blocks) return null;

        const title_blocks = blocks.filter(block => block.block_type > 2 && block.block_type < 12);
        return await Promise.all(title_blocks.map(async block => {
            return {
                block_id: block.block_id,
                block_type: block.block_type,
                title: await this.__text_elements(block[`heading${block.block_type - 2}`]['elements'])
            }
        }))
    }

    async __fetch_doc_blocks(document_id, page_token=null, blocks=[]) {
        const token = await this.tokenFetcher.token()
        let document_token = document_id

        if (this.sourceType === "wiki") {
            document_token = await this.__convert_wiki_token(document_token)
        }

        let url = `${process.env.FEISHU_HOST}/open-apis/docx/v1/documents/${document_token}/blocks` + (page_token? `?page_token=${page_token}` : "")
        let response = await fetch(url, {
            method: "get",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': `Bearer ${token}`
            }
        });

        let status = response.status;
        let headers = response.headers;
        response = await response.json();

        if (response.code === 0) {
            blocks.push(...response.data.items);
            if (response.data.has_more) {
                await this.__fetch_doc_blocks(document_id, response.data.page_token, blocks);
            }

            return blocks;
        } else if (status == 429) {
            const timeout = headers['x-ogw-ratelimit-reset']
            await this.__wait(timeout * 1000)
            await this.__fetch_doc_blocks(document_id, page_token, blocks)
        } else {
            return null;
        }
    }

    async __convert_wiki_token(page_token) {
        let obj_token = this.tokens.find(token => token.wiki === page_token)?.obj;

        if (!obj_token) {
            const token = await this.tokenFetcher.token()
            let url = `${process.env.FEISHU_HOST}/open-apis/wiki/v2/spaces/get_node?token=${page_token}`
            let response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json; charset=utf-8',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            let status = response.status;
            let headers = response.headers;
            response = await response.json();
    
            if (response.code === 0) {
                this.tokens.push({
                    wiki: page_token,
                    obj: response.data.node.obj_token
                });
    
                return response.data.node.obj_token;
            } else if (status === 429) {
                const timeout = headers['x-ogw-ratelimit-reset']
                await this.__wait(timeout * 1000)
                return await this.__convert_wiki_token(page_token)
            }
        } else {
            return obj_token;
        }
    }

    async __convert_link(url) {
        // Extract the token from the URL after '/wiki/'
        const wikiTokenMatch = url.match(/\/wiki\/([^#]+)/);
        if (!wikiTokenMatch) {
            console.log(`Invalid URL format: ${url}`);
            return url; // Return the original URL if no token is found
        }

        const token = wikiTokenMatch[1];
        const hashTagMatch = url.match(/#(.+)$/);
        const hashTag = hashTagMatch ? hashTagMatch[1] : null;

        // Find the document ID corresponding to the token
        const docId = await this.__find_doc_id_by_token(token);
        if (!docId) {
            console.log(`Document ID not found for token: ${token}`);
            return url; // Return the original URL if no document ID is found
        }

        // If there's a hash tag, resolve it to a slug
        if (hashTag) {
            const slug = await this.__resolve_hash_to_slug(docId, hashTag);
            return `${docId}#${slug}`;
        }

        // Return the document ID if no hash tag is present
        return docId;
    }

    async __find_doc_id_by_token(token) {
        const sources = this.records || await this.__list_sources();
        const match = sources.find(source => source.page_token === token);
        return match ? match.page_id : null;
    }

    async __resolve_hash_to_slug(docId, hashTag) {
        // Fetch the section titles for the document
        const sectionTitles = await this.__get_section_titles(docId);

        if (!sectionTitles) return null;

        // Find the title corresponding to the hash tag
        const matchingSection = sectionTitles.find(section => section.block_id === hashTag);
        if (!matchingSection) {
            console.log(`No matching section found for hash tag: ${hashTag}`);
            return hashTag; // Return the original hash tag if no match is found
        }

        // Convert the title to a slug format
        const slug = matchingSection.title.replace(/\s+/g, '-').replace(/[^A-Za-z0-9-]/g, '');
        return slug;
    }

    async __wait(duration) {
        return new Promise((resolve, _) => {
            setTimeout(() => {
                resolve()
            }, duration)
        })
    }

    __parse_menu_structure() {
        const file = path.join(__dirname, '..', '..', this.menuStructure);

        if (!fs.existsSync(file)) {
            console.log(`Menu not found in ${file}`);
            process.exit(1);
        }

        return JSON.parse(fs.readFileSync(file, 'utf8'));
    }

    __locate_doc_in_menu(id) {
        const menu_structure = this.__parse_menu_structure();
        const result = this.__iterate_menu(menu_structure, id);

        if (result?.ancestors.indexOf(id) > -1) {
            return result;
        } else {
            return null;
        }       
    }

    __is_new(doc_id) {
        // Check if the document exists in the menu structure
        const result = this.__locate_doc_in_menu(doc_id);
        return result === null;
    }

    async __append_doc_to_menu(doc_id, position=null) {
        if (! doc_id.endsWith('.md')) {
            console.log(`Invalid document ID: ${doc_id}`);
            return;
        } 

        const menu_structure = this.__parse_menu_structure();
        const sources = this.records || await this.__list_sources();
        const doc_meta = sources.find(source => source.page_id === doc_id);
        const parent_id = sources.find(source => source.record_id === doc_meta.parent)?.page_id;
        const is_new = this.__is_new(doc_id);

        if (parent_id && is_new) {
            const { ancestors } = this.__locate_doc_in_menu(parent_id);

            let current_menu_item = menu_structure.find(item => item.id === ancestors[0]);

            if (ancestors.length > 0) {
                for (var i = 1; i < ancestors.length; i++) {
                    current_menu_item = current_menu_item.children.find(item => item.id === ancestors[i]);
                }

                if (current_menu_item.children.length > 0) {
                    const order = position != null ? position : current_menu_item.children.length;

                    current_menu_item.children.splice(order, 0,{
                        label: doc_meta.label,
                        id: doc_id,
                        order: order,
                        children: []
                    });

                    current_menu_item.children.map((child, index) => child.order = index)
                } else {
                    current_menu_item.children = [{
                        label: doc_meta.label,
                        id: doc_id,
                        order: 0,
                        children: []
                    }];
                }
            } else {
                const order = position != null ? position : menu_structure.length;
                menu_structure.splice(order, 0, {
                    label: doc_meta.label,
                    id: doc_id,
                    order: order,
                    children: []
                });
            }

            fs.writeFileSync(path.join(__dirname, '..', '..', this.menuStructure), JSON.stringify(menu_structure, null, 2));
        } else {
            console.log(`Cannot append document ${doc_id} to menu: parent not found or document already exists`);
        }
    }

    __iterate_menu(menu, id, ancestors = []) {
        for (let item of menu) {
            const currentAncestors = [...ancestors, item.id];

            if (item.id === id) {
                const children = item.children ? item.children.map(child => child.id) : [];
                return {
                    ancestors: currentAncestors,
                    children
                };
            }

            if (item.children) {
                const result = this.__iterate_menu(item.children, id, currentAncestors);
                if (result) {
                    return result; 
                }
            }
        }

        return null;
    }

    __iterate_sources(record_id, children = []) {
        const sources = this.records || this.__list_sources();
        const current_children = sources.filter(source => source.parent === record_id);

        current_children.forEach(child => {
            this.__iterate_sources(child.record_id, children.concat(current_children))
        })

        return children.concat(current_children);
    }
}

module.exports = MilvusDocsGen