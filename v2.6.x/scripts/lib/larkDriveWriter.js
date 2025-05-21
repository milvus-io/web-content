const fs = require('node:fs');
const node_path = require('node:path');
const larkDocWriter = require('./larkDocWriter');
const Utils = require('./larkUtils');

class larkDriveWriter extends larkDocWriter {
    constructor(root_token, base_token, displayedSidebar, docSourceDir, imageDir, targets, skip_image_download=false, manual) {
        super(root_token, base_token, displayedSidebar, docSourceDir, imageDir, targets, skip_image_download);
        this.manual = manual
        this.utils = new Utils();
    }

    async write_docs(path, token) {
        const forEachAsync = async (array, callback) => {
            for (let index = 0; index < array.length; index++) {
                await callback(array[index], index, array);
            }
        }
        
        var current_path = path
        const node = this.__fetch_doc_source('token', token)

        if (node.children) {
            // const subfolders = []
            await forEachAsync(node.children, async (child, index) => {
                var source = fs.readdirSync(this.docSourceDir).filter(file => file === `${child.token}.json`)
                if (source.length > 0) {
                    source = JSON.parse(fs.readFileSync(node_path.join(this.docSourceDir, source[0]), 'utf8'))

                    if (source.blocks) {
                        const meta = await this.__is_to_publish(source.name, source.slug)
                        if (meta['publish']) {
                            const token = source.token
                            const source_type = source.type
                            const slug = source.slug instanceof Array? source.slug[0].text : source.slug
                            const tag = meta['tag'] ? meta['tag'] : 'false'

                            console.log(`${current_path}/${slug}.md`)

                            await this.write_doc({
                                path: current_path,
                                page_title: source.name,
                                page_type: source_type,
                                page_token: token,
                                page_slug: slug,
                                page_beta: tag,
                                notebook: 'false',
                                sidebar_position: index+1,
                                sidebar_label: meta['labels'],
                                keywords: this.keyword_picker().concat('zilliz', 'zilliz cloud', 'cloud', source.name, this.manual),
                                doc_card_list: false
                            })

                            // if (source.slug === "SentenceTransformerEmbeddingFunction-encode_documents") {
                            //     console.log(current_path)
    
                            //     throw new Error("SentenceTransformerEmbeddingFunction-encode_documents is not supported yet")
                            // }
                        }                           
                    }

                    if (source.children) {
                        console.log(source.token)
                        const meta = await this.__is_to_publish(source.name, source.slug)
                        if (meta['publish']) {
                            const token = source.token
                            const source_type = source.type
                            const slug = source.slug instanceof Array? source.slug[0].text : source.slug
                            const description = meta.description
                            const tag = meta['tag'] ? meta['tag'] : 'false'

                            if (!fs.existsSync(node_path.join(path, slug))) {
                                fs.mkdirSync(node_path.join(path, slug), { recursive: true });
                            }

                            await this.write_doc({
                                path: node_path.join(path, slug),
                                page_title: source.name,
                                page_slug: slug,
                                page_beta: tag,
                                notebook: 'false',
                                page_type: source_type,
                                page_token: token,
                                page_description: description,
                                sidebar_position: index+1,
                                sidebar_label: meta['labels'],
                                keywords: this.keyword_picker().concat('zilliz', 'zilliz cloud', 'cloud', source.name, this.manual).join(','),
                                doc_card_list: true
                            })

                            await this.write_docs(node_path.join(path, slug), token)
                        }                     
                    }
                }    
            })
        }
    }

    async write_doc(options) {
        const {
            path,
            page_title,
            page_slug,
            page_type,
            page_token,
            page_beta,
            notebook,
            page_description,
            sidebar_position,
            sidebar_label,
            doc_card_list
        } = options

        let obj;
        var current_path = path
        var keywords = this.keyword_picker().concat('zilliz', 'zilliz cloud', 'cloud', page_title, this.manual).join(',')

        if (page_token) {
            obj = this.__fetch_doc_source('token', page_token)
            var page;
            if (obj.children) {
                const pair = this.utils.locate_drive_source_pair(this.docSourceDir, page_token, page_slug)
                if (pair) {
                    this.page_blocks = JSON.parse(fs.readFileSync(node_path.join(this.docSourceDir, `${pair}.json`), 'utf8')).blocks.items
                    page = this.page_blocks.filter(block => block.block_type == 1)[0] 
                } else {
                    const slug = `${this.displayedSidebar.replace('Sidebar', '')}/${page_slug}`
                    const labels = sidebar_label ? sidebar_label : page_title

                    console.log(slug, page_description)

                    var markdown = '---\n' +
                        'title: ' + `"${page_title} | ${this.__title_suffix(current_path)}"` + '\n' +
                        'slug: /' + slug + '\n' +
                        'beta: ' + page_beta + '\n' +
                        'notebook: ' + notebook + '\n' +
                        'description: ' + `"${page_description.replace('\n', '|').replace(/\[(.*)\]\(.*\)/g, '$1').replace(':', '').replace('**', '')} | ${this.__title_suffix(current_path)}"`  + '\n' +
                        'type: ' + page_type + '\n' +
                        'token: ' + page_token + '\n' +
                        'sidebar_position: ' + sidebar_position + '\n' +
                        'sidebar_label: ' + `"${labels}"` + '\n' +
                        'keywords: \n  - ' + keywords.split(',').map(item => item.trim()).join('\n  - ') + '\n' +
                        'displayed_sidebar: ' + this.displayedSidebar + '\n' +
                        '---\n\n' +
                        '# ' + page_title + '\n\n' +
                        page_description + '\n\n' +
                        "import DocCardList from '@theme/DocCardList';\n\n<DocCardList />\n"
                    
                    fs.writeFileSync(node_path.join(current_path, current_path.split('/').pop() + '.md'), markdown)
                }
            } else if (obj.blocks) {
                this.page_blocks = obj.blocks.items
                page = this.page_blocks.filter(block => block.block_type == 1)[0]
            }

            if (page && page.children) {
                this.blocks = page.children.map(child => {
                    return this.__retrieve_block_by_id(child)
                })

                current_path = node_path.join(current_path, page_slug + '.md')
                const slug = `${this.displayedSidebar.replace('Sidebar', '')}/${page_slug}`

                console.log(keywords)
                var {front_matter, imports, markdown} = await this.__write_page({
                    title: page_title,
                    suffix: this.__title_suffix(current_path),
                    slug: slug,
                    beta: page_beta,
                    notebook: notebook,
                    type: page_type,
                    token: page_token,
                    sidebar_position: sidebar_position,
                    sidebar_label: sidebar_label,
                    keywords: keywords,
                    doc_card_list: doc_card_list,
                })

                front_matter = front_matter.split('\n')
                front_matter.splice(1, 0, `displayed_sidbar: ${this.displayedSidebar}`)
                front_matter = front_matter.join('\n')

                fs.writeFileSync(current_path, front_matter + '\n\n' + imports + '\n\n' + markdown)
            }
        }
    }
}

module.exports = larkDriveWriter;