const fs = require('node:fs')
const node_path = require('node:path')
const slugify = require('slugify')

class larkUtils {
    constructor() {
        this.file_path = ''
        this.key_paths = []
    }

    determine_file_path(token, outputDir) {
        const path = fs.readdirSync(outputDir, {recursive: true}).filter(file => file.endsWith('.md')).filter(file => {
            const regex = new RegExp(/token: (.*)/g)
            const content = fs.readFileSync(`${outputDir}/${file}`, {encoding: 'utf-8', flag: 'r'})
            const match = regex.exec(content)

            if (match) {
                return match[1].trim() === token
            } else {
                return false
            }
        })

        if (path.length > 0) {
            return path[0]
        } else {
            throw new Error(`Cannot find file for token ${token} in ${outputDir}`)
        }
    }

    pre_process_file_paths(outputDir) {
        // remove all files in the output directory
        const paths = fs.readdirSync(outputDir, {recursive: true})
        const folders = paths.filter(path => fs.statSync(`${outputDir}/${path}`).isDirectory())   

        for (const folder of folders) {
            fs.rmSync(`${outputDir}/${folder}`, {recursive: true, force: true})
        }
    }

    post_process_file_paths(outputDir) {
        // remove empty folders
        const paths = fs.readdirSync(outputDir, {recursive: true})
        const folders = paths.filter(path => fs.statSync(`${outputDir}/${path}`).isDirectory())

        for (const folder of folders) {
            const files = fs.readdirSync(`${outputDir}/${folder}`)

            if (files.length === 1 && files[0] === folder.split('/').slice(-1)[0] + '.md') {
                fs.rmSync(`${outputDir}/${folder}`, {recursive: true, force: true})
            }   
        }

        // check broken links and anchors
        const mds = fs.readdirSync(outputDir, {recursive: true}).filter(path => path.endsWith('.md'))
        const broken_links = []
        const broken_anchors = []

        for (const md of mds) {
            const content = fs.readFileSync(`${outputDir}/${md}`, {encoding: 'utf-8', flag: 'r'})
            
            var regex = new RegExp(/\[.*?\]\(null\)/g)
            var matches = [... content.matchAll(regex)]
            if (matches.length > 0) {
                broken_links.push({
                    file: `${outputDir}/${md}`,
                    links: matches.map(match => match[0])
                })
            }

            regex = new RegExp(/#\)/g)
            matches = [... content.matchAll(regex)]
            if (matches.length > 0) {
                broken_anchors.push({
                    file: `${outputDir}/${md}`,
                    anchors: matches.map(match => match[0])
                })
            }
        }

        if (broken_links.length > 0) {
            console.log('Broken links')
            console.log(JSON.stringify(broken_links, null, 2))            
        }

        if (broken_anchors.length > 0) {
            console.log('Broken anchors')
            console.log(JSON.stringify(broken_anchors, null, 2))
        }
    }

    list_valid_targets(targets, root='') {
        if (targets instanceof Object) {
            for (const key of Object.keys(targets)) {
                if (targets[key] instanceof Object && !targets[key].hasOwnProperty('outputDir')) {
                    this.list_valid_targets(targets[key], `${root}.${key}`)
                } else {
                    this.key_paths.push(`${root}.${key}`.slice(1))
                }
            }
        }

        return this.key_paths
    }

    locate_drive_source_pair(source_dir, token, slug) {
        var files = fs.readdirSync(source_dir)
        files = files.map(file => {
            return JSON.parse(fs.readFileSync(`${source_dir}/${file}`, {encoding: 'utf-8', flag: 'r'}))
        }).filter(source => source.slug === slug)

        if (files.length > 1 && files.map(file=> file.token).includes(token)) {
            return files.filter(files => files.token !== token)[0].token
        } else {
            return null
        }
    }

    postprocess_for_milvus(outputDir, docSourceDir) {
        const paths = fs.readdirSync(outputDir, {recursive: true})
        const files = paths.filter(path => path.endsWith('.md'))

        for (const file of files) {
            var content = fs.readFileSync(`${outputDir}/${file}`, {encoding: 'utf-8', flag: 'r'})

            // Change frontmatters
            if (outputDir.includes('reference')) {
                for (const path of paths) {
                    if (path.endsWith('.md')) {
                        var page = fs.readFileSync(`${outputDir}/${path}`, {encoding: 'utf-8', flag: 'r'})
                        page = page.replace(/^---(.*\n)*---$/gm, '').replace(/^\n{2,}/g, '')
                        fs.writeFileSync(`${outputDir}/${path}`, page, {encoding: 'utf-8', flag: 'w'})
                    }
                }
            }
            
            // remove docusaurus imports
            content = content.replace(/import .* from .*/g, '')

            // remove title slugs
            content = content.replace(/\{#.*\}$/g, '')

            // add multi-code block
            var matches = [... (content.matchAll(/([^\n\r]*)<Tabs .*values=(\{(\[.*\])\}).*>/g))]
            matches.forEach(match => {
                var codes = JSON.parse(match[3])
                var indent = match[1]
                var milvus_multi_code = `${indent}<div class="multipleCode">\n`
                for (const code of codes) {
                    milvus_multi_code += `${indent}    <a href="#${code.value}">${code.label}</a>\n`
                }
                milvus_multi_code += `${indent}</div>\n\n`
                content = content.replace(match[0].replace(/\n/g, ''), `${milvus_multi_code}`)
            })

            // remove tabs and tab items
            content = content.replace(/([^\n\r]*)<\/*(TabItem|Tabs).*>/g, '')

            // add admonitions
            matches = [... content.matchAll(/([^\n\r]*)<Admonition .* title="(.*)">/g)]
            matches.forEach(match => {
                var indent = match[1]
                var admonition_label = match[2].toLowerCase()
                var type = admonition_label === 'Notes' ? 'note' : admonition_label === 'Warning' ? 'warning' : 'note'
                var start = `${indent}<div class="admonition ${type}">`

                if (!['Notes', 'Warning'].includes(admonition_label)) {
                    start += `\n\n${indent}<p><b>${admonition_label}</b></p>\n\n`
                }

                content = content.replace(match[0], start)
            })

            content = content.replace(/([^\n\r]*)<\/Admonition>/g, (_, b) => {
                return `${b}</div>`
            })

            // remove section labels
            content = content.replace(/\{#.*\}/g, '')

            // replace links
            matches = [... content.matchAll(/\[(.*?)\]\((.*?)\)/g)]
            matches.forEach(match => {
                const label = match[1]
                const path = match[2]
                var link = path.startsWith('http') ? path : this.__convert_link(file, path, outputDir)
                content = content.replace(match[0], `[${label}](${link})`)
            })

            // remove abundant line breaks
            content = content.replace(/\n{3,}/g, '\n\n')

            fs.writeFileSync(`${outputDir}/${file}`, content, {encoding: 'utf-8', flag: 'w'})
        }

        // remove index files
        const folders = fs.readdirSync(outputDir, {recursive: true}).filter(path => fs.statSync(`${outputDir}/${path}`).isDirectory())

        for (const folder of folders) {
            var index_page_name = folder.split('/').slice(-1)[0] + '.md'
            if (fs.existsSync(`${outputDir}/${folder}/${index_page_name}`)) {
                const content = fs.readFileSync(`${outputDir}/${folder}/${index_page_name}`, {encoding: 'utf-8', flag: 'r'})
                if (content.split('\n').length < 15) {
                    fs.rmSync(`${outputDir}/${folder}/${index_page_name}`, {recursive: true, force: true})
                }
            }
        }

        // rename folders
        if (outputDir.includes('reference')) {
            this.__rename_file_path(outputDir)
        }
    }

    fetch_fallback_sources(docSourceDir, fallbackSourceDir, sourceType) {
        const TITLE = sourceType === 'drive' ? 'name' : 'title'
        const TOKEN = sourceType === 'drive' ? 'token' : 'node_token'
        const PARENT = sourceType === 'drive' ? 'parent_token' : 'parent_node_token'

        // list all files in the source directory
        var files = fs.readdirSync(docSourceDir)
        var sources = files.map(file => {
            return JSON.parse(fs.readFileSync(`${docSourceDir}/${file}`, {encoding: 'utf-8', flag: 'r'}))
        }).map(source => {
            var raw = JSON.stringify(source, null, 2)
            
            if (source?.blocks?.items) {
                const page_block = source.blocks.items.find(block => block.block_type === 1)
                const page_block_id = page_block?.block_id

                if (page_block_id) {
                    const regex = new RegExp(`docx%2F${page_block_id}`, 'g')
                    // const matchesBefore = [...raw.matchAll(regex)]
                    // console.log(matchesBefore.length)
                    raw = raw.replace(regex, sourceType === 'drive'? `docx%2F${source[TOKEN]}` : `wiki%2F${source[TOKEN]}`)
                    // const matchesAfter = [...raw.matchAll(regex)]
                    // console.log(matchesAfter.length)
                    // console.log('====')
                }
            }

            return JSON.parse(raw)
        })

        // list all files in the fallback source directory
        files = fs.readdirSync(fallbackSourceDir)
        var fallbackSources = files.map(file => {
            return JSON.parse(fs.readFileSync(`${fallbackSourceDir}/${file}`, {encoding: 'utf-8', flag: 'r'}))
        })

        var sourceRoot, fallbackRoot

        if (sourceType === 'drive') {
            sourceRoot = sources.find(source => !source?.type)
            // find the fallback root by name
            fallbackRoot = fallbackSources.find(fallback => !fallback.type && fallbackSourceDir.split('/').includes(fallback[TITLE]))
        } else if (sourceType === 'wiki') {
            sourceRoot = sources.find(source => !source?.slug)
            fallbackRoot = fallbackSources.find(fallback => !fallback.slug && fallbackSourceDir.split('/').includes(fallback[TITLE]))
        } else {
            throw new Error(`Unknown source type: ${sourceType}`)
        }

        if (sourceRoot?.children?.length > 0 && fallbackRoot?.children?.length > 0) {

            fallbackRoot.children.forEach(child => {
                var pair = sourceRoot.children.find(s => s[TITLE] === child[TITLE])

                if (!pair) {
                    child[PARENT] = sourceRoot[TOKEN]
                    sourceRoot.children.push(child)
                    // fallbackSources.find(fb => fb.token === child.token).parent_token = sourceRoot.token
                }
            })

            fs.writeFileSync(`${docSourceDir}/${sourceRoot[TOKEN]}.json`, JSON.stringify(sourceRoot, null, 2), {encoding: 'utf-8', flag: 'w'})
        }

        var replaces = []

        fallbackSources.forEach(fallback => {            
            // folder
            if (fallback?.type === 'folder' || fallback?.children) {
                var source = sources.find(source => source?.slug === fallback?.slug && (source?.type === 'folder' || source?.children))
                if (source) {
                    fallback[TOKEN] = source[TOKEN]
                    fallback[PARENT] = source[PARENT]
                    fallback.url = source.url
                    
                    fallback.children.forEach(child => {
                        var pair = source.children.find(s => s[TITLE] === child[TITLE])
                        if (pair) {
                            replaces.push({
                                from: child[TOKEN],
                                to: pair[TOKEN]
                            })
                            
                            child[PARENT] = pair[PARENT]
                            child.url = pair.url
                            child[TOKEN] = pair[TOKEN]
                        } else {
                            child[PARENT] = source[TOKEN]
                            // fallbackSources.find(fb => fb.token === child.token).parent_token = source.token
                        }
                    })

                    source.children.forEach(s => {
                        if (!(fallback.children.find(fb => fb[TITLE] === s[TITLE]))) {
                            fallback.children.push(s)
                        }
                    })
                }
            }

            // docx
            if (fallback?.type === 'docx' || !fallback?.children) {
                var source = sources.find(source => source?.slug === fallback?.slug && (source?.type === 'docx' || !source?.children))
                if (source) {
                    fallback[TOKEN] = source[TOKEN]
                    fallback[PARENT] = source[PARENT]
                    fallback.url = source.url
                    fallback.blocks = source.blocks
                }
            }
        })

        // write the fallback sources to the doc source directory
        fallbackSources.forEach(fallback => {
            const token = fallback[TOKEN]
            console.log(`0. Copied ${token}.json`)
            const file = `${docSourceDir}/${token}.json`
            var raw = JSON.stringify(fallback, null, 2)
            
            // replace residues
            replaces.forEach(replace => {
                raw = raw.replaceAll(replace.from, replace.to)
            })
            
            fs.writeFileSync(file, raw, {encoding: 'utf-8', flag: 'w'})
        })
    }

    __convert_link(file, path, outputDir) {
        const folders = fs.readdirSync(outputDir, {recursive: true}).filter(path => fs.statSync(`${outputDir}/${path}`).isDirectory())
        const files = fs.readdirSync(outputDir, {recursive: true}).filter(path => path.endsWith('.md'))

        var section = path.indexOf("#") > -1 ? path.slice(path.lastIndexOf("#") + 1) : ""
        var link_path = files.find(file => file.endsWith(path.slice(2).replace(`#${section}`, '') + '.md'))

        if (!link_path) {
            console.log(path, path.slice(2).replace(`#${section}`, '') + '.md', file)
            throw new Error(`Cannot find linked file for ${path} in ${outputDir}`)
        }

        var parent = link_path.split('/').slice(0, -1).join('/')
        
        var rel_path = ''

        var folder = folders.find(folder => folder.endsWith(parent))
          
        if (folder) {
            var current = `${outputDir}/${file}`
            var target = `${outputDir}/${folder}/${path.slice(2).replace(`#${section}`, '')}`

            if (fs.existsSync(target) && fs.statSync(target).isDirectory()) {
                target = `${target}/${path.slice(2).replace(`#${section}`, '')}.md`
            // } else if (fs.statSync(`${target}.md`).isFile()) {
            //     target = `${target}.md`
            } else if (fs.readdirSync(`${outputDir}/${folder}`).find(file => file.startsWith(path.slice(2).replace(`#${section}`, '')))) {
                target = fs.readdirSync(`${outputDir}/${folder}`).find(file => file.startsWith(path.slice(2).replace(`#${section}`, '')))
                target = `${outputDir}/${folder}/${target}`
            } else {
                throw new Error(`Cannot find ${path} in ${outputDir}`)
            }

            rel_path = node_path.relative(node_path.dirname(node_path.resolve(current)), node_path.dirname(node_path.resolve(target)))
            rel_path = rel_path ? rel_path + '/' + node_path.basename(target) : node_path.basename(target)

            rel_path = rel_path.split('/').map(part => part.includes('-') ? part.split('-').slice(-1) : part).join('/');
        }

        if (section) {
            target = fs.readFileSync(target, {encoding: 'utf-8', flag: 'r'})
            const headings = target.match(/#{1,6} (.*)/g)

            if (headings) {
                const index = headings.findIndex(heading => {
                    heading = heading.split(' ').slice(-1)[0].toLowerCase().split('{#')[0]
                    return slugify(heading, {strict: true, lower: true}) === section
                })

                if (index > -1) {
                    var slug = headings[index].split(' ').slice(-1)[0].split('{#')[0]
                    var slug = slugify(slug, {strict: true})
                    rel_path += '#' + slug
                } else {
                    throw new Error(`Cannot find ${section}`)
                }
            } else {
                throw new Error(`Cannot find headings in ${target}`)
            }
        }

        return rel_path
    }

    __rename_file_path(outputDir) {
        const paths = fs.readdirSync(outputDir, {recursive: true})
        const mods = paths.filter(path => path.includes('-'))

        if (mods.length > 0) {
            const o = mods[0]
            let n = o.split('/').map(part => part.includes('-') ? part.split('-').slice(-1) : part).join('/');
            n = n.match(/_\d+.md$/) ? n.replace(/_\d+.md$/, '.md') : n
            fs.renameSync(`${outputDir}/${o}`, `${outputDir}/${n}`, {recursive: true})
            this.__rename_file_path(outputDir)
        }
    }

    __fetch_doc_source (type, value, docSourceDir) {
        const file = fs.readdirSync(docSourceDir).filter(file => {
            const page = JSON.parse(fs.readFileSync(`${docSourceDir}/${file}`, {encoding: 'utf-8', flag: 'r'}))
            return page[type] === value
        })

        if (file.length > 0) {
            return JSON.parse(fs.readFileSync(`${docSourceDir}/${file[0]}`, {encoding: 'utf-8', flag: 'r'}))
        } else {
            throw new Error(`Cannot find ${title} in ${docSourceDir}`)
        }
    }

    __iterate_path(parentToken, rootToken, docSourceDir) {
        if (parentToken != rootToken) {
            const source = this.__fetch_doc_source('node_token', parentToken, docSourceDir)
            this.file_path = source.slug + '/' + this.file_path
            this.__iterate_path(source.parent_node_token)
        }
    }
}

module.exports = larkUtils;