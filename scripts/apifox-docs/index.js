const RefGen = require('./refGen');
const S3Uploader = require('./s3Uploader');
const fs = require('node:fs')
const { loadSpecifications } = require('./specLoader')

module.exports = function (context, options) {
    return {
        name: "fetch-apifox-docs",
        extendCli(cli) {
            cli
                .command('fetch-apifox-docs')
                .option('-s, --specifications <specifications>', 'Specifications of the API')
                .option('-l, --lang <lang>', 'Language of the API Reference', 'en-US')
                .option('-o, --output_path <target_path>', 'Target path of the API Reference', 'reference/api/restful/restful')
                .option('-i, --strings <strings>', 'Localization strings for Chinese docs')
                .option('-t, --target <string>', 'Publication target of the API Reference', 'zilliz')
                .option('--upload-s3', 'Upload merged OpenAPI specs to S3 and update about page', false)
                .action(async (opts) => {
                    let lang = opts.lang
                    let target = opts.target
                    let target_path = opts.output_path
                    let specifications;
                    let strings;

                    console.log('Fetching docs from Apifox...')

                    if (opts.specifications === undefined) {
                        console.log('Please provide specifications')
                        return
                    } else {
                        try {
                            specifications = loadSpecifications(opts.specifications)
                        } catch (err) {
                            console.error(`Failed to read OpenAPI spec from "${opts.specifications}": ${err.message}`)
                            return
                        }
                    }

                    if (opts.lang === 'zh-CN' && opts.strings === undefined) {
                        console.log('Please provide the localization strings for Chinese docs')
                        return
                    }

                    if (opts.lang === 'zh-CN') {
                        try {
                            strings = fs.readFileSync(opts.strings, 'utf-8').split('\n')
                        } catch (err) {
                            console.error(`Failed to read localization strings from "${opts.strings}": ${err.message}`)
                            return
                        }
                    }

                    const refGen = new RefGen({
                        specifications,
                        lang,
                        target,
                        target_path,
                        strings,
                    })

                    const folders = fs.readdirSync(target_path, { recursive: true }).filter(f => fs.statSync(target_path + '/' + f).isDirectory())
                    for (let folder of folders.filter(f => !f.endsWith('v1') && !f.endsWith('v2'))) {
                        fs.rmSync(target_path + '/' + folder, { recursive: true, force: true })
                    }

                    refGen.make_groups()
                    refGen.write_refs()

                    if (opts.upload_s3) {
                        try {
                            const uploader = new S3Uploader({ target, lang })
                            await uploader.upload(specifications, lang)
                        } catch (err) {
                            console.error(`S3 upload failed: ${err.message}`)
                            process.exitCode = 1
                        }
                    }
                })
            }
        }
    }
