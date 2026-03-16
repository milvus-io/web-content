#!/usr/bin/env node
const { program } = require('commander')
const MilvusDocsGen = require('./milvusDocsGen.js')
const MilvusSdkDocsGen = require('./milvusSdkDocsGen.js')
const fs = require('node:fs')
const path = require('node:path')
require('dotenv/config')

program
    .name('fetch-milvus-docs')
    .description('Fetch and generate Milvus guide docs from Feishu bitable')
    .requiredOption('-c, --config <config>', 'Path to config JSON')
    .requiredOption('-m, --manual <manual>', 'Name of the manual to publish')
    .option('-d, --doc <doc>', 'Title of the document or parent node')
    .option('-o, --output <output>', 'Output path relative to outputDir')
    .option('-p, --position <position>', 'Position among siblings in menu', parseInt)
    .option('-r, --recursive', 'Recursively publish all child documents')
    .option('-a, --all', 'Fetch all documents from all top-level categories')
    .option('--skipImageDown', 'Skip image download')
    .option('--dry-run', 'Scan for stale links without writing files (SDK manuals only)')
    .action(async (opts) => {
        if (!opts.doc && !opts.all && !opts.dryRun) {
            console.error('error: --doc, --all, or --dry-run is required')
            process.exit(1)
        }

        const config = JSON.parse(fs.readFileSync(opts.config, 'utf-8'))
        const manualConfig = config.milvus?.manuals?.[opts.manual]
        if (!manualConfig) {
            console.error(`Manual "${opts.manual}" not found. Available: ${Object.keys(config.milvus.manuals).join(', ')}`)
            process.exit(1)
        }

        const { base, sourceType, language, targets, images } = manualConfig
        const { menuStructure, outputDir, imageDir } = targets
        const GenClass = sourceType === 'wiki' ? MilvusDocsGen : MilvusSdkDocsGen
        const gen = new GenClass(base, sourceType, menuStructure, imageDir, images.alt_texts, language)
        gen.skip_image_download = !!opts.skipImageDown

        // Dry-run: scan for stale links without writing files
        if (opts.dryRun) {
            if (!(gen instanceof MilvusSdkDocsGen)) {
                console.error('--dry-run is only supported for SDK manuals (sourceType: drive)')
                process.exit(1)
            }
            console.log(`Scanning ${opts.manual} for stale links...`)
            const issues = await gen.scan_stale_links()
            if (issues.length === 0) {
                console.log('No stale links found.')
            } else {
                console.log(`\nFound ${issues.length} stale link(s):\n`)
                for (const { page_id, token, url } of issues) {
                    console.log(`  ${page_id}`)
                    console.log(`    token: ${token}`)
                    console.log(`    url:   ${url}`)
                }
                process.exit(1)
            }
            return
        }

        // Collect all docs to write
        let docs = []

        if (opts.all) {
            const sources = await gen.__list_sources()
            const roots = sources.filter(s => !s.parent)
            for (const root of roots) {
                const results = await gen.write_docs(root.title, root.page_id)
                if (results) docs.push(...results)
            }
        } else if (opts.recursive) {
            const results = await gen.write_docs(opts.doc)
            if (!results) process.exit(1)
            docs = results
        } else {
            const result = await gen.write_doc(opts.doc)
            if (!result) process.exit(1)
            docs = [result]
        }

        // Write files
        for (const doc of docs) {
            if (!doc) continue
            const { front_matters, content, page_id } = doc
            const file_path = opts.output
                ? path.join(outputDir, opts.output)
                : path.join(outputDir, page_id)
            const dir = path.dirname(file_path)
            if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
            fs.writeFileSync(file_path, front_matters ? front_matters + '\n' + content : content)
            console.log(`Written: ${file_path}`)

            if (menuStructure && gen.__is_new(page_id)) {
                await gen.__append_doc_to_menu(page_id, opts.position ?? null)
            }
        }

        // Write back alt_texts to config.json
        config.milvus.manuals[opts.manual].images.alt_texts = gen.alt_texts
        fs.writeFileSync(opts.config, JSON.stringify(config, null, 2))
    })

program.parse()
