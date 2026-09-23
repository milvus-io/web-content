#!/usr/bin/env node
const { Command, program } = require('commander')
const RefGen = require('./refGen')
const S3Uploader = require('./s3Uploader')
const fs = require('node:fs')
const { loadSpecifications } = require('./specLoader')
const { loadFragmentCollection } = require('./fragmentCollection')
const { publishBilingualControlPlaneSpecs, publishIntegratedSpecs } = require('./integratedSpecPublisher')
const {writeRestDerivationManifest} = require('./restDerivationManifest')

function registerFetchCommand(command) {
    command
        .description('Fetch and generate API reference docs from Apifox')
        .option('-s, --specifications <specifications>', 'Specifications of the API')
        .option('-l, --lang <lang>', 'Language of the API Reference', 'en-US')
        .option('-o, --output_path <target_path>', 'Target path of the API Reference', 'content/en/reference/api/restful/restful')
        .option('-t, --target <string>', 'Publication target of the API Reference', 'zilliz')
        .option('--api-surface <apiSurface>', 'Explicit page surface: data-plane or control-plane')
        .option('--upload-s3', 'Upload merged OpenAPI specs to S3 and update about page', false)
        .option('--derivation-manifest <path>', 'Write the locale REST derivation manifest')
        .option('--tooling-sha <sha>', 'Tooling Git SHA for the derivation manifest')
        .option('--generated-at <utc>', 'UTC generation time for the derivation manifest')
        .action(async (opts) => {
            let lang = opts.lang
            let target = opts.target
            let target_path = opts.output_path
            let specifications

            console.log('Fetching docs from Apifox...')

            if (opts.specifications === undefined) {
                throw new Error('Please provide specifications')
            } else {
                try {
                    specifications = loadSpecifications(opts.specifications)
                } catch (err) {
                    throw new Error(`Failed to read OpenAPI spec from "${opts.specifications}": ${err.message}`, { cause: err })
                }
            }

            const refGen = new RefGen({
                specifications,
                lang,
                target,
                target_path,
                apiSurface: opts.apiSurface,
            })

            fs.mkdirSync(target_path, { recursive: true })
            const folders = fs.readdirSync(target_path, { recursive: true }).filter(f => fs.statSync(target_path + '/' + f).isDirectory())
            for (let folder of folders.filter(f => !f.endsWith('v1') && !f.endsWith('v2'))) {
                fs.rmSync(target_path + '/' + folder, { recursive: true, force: true })
            }

            refGen.make_groups()
            await refGen.write_refs()

            if (opts.derivationManifest) {
                writeRestDerivationManifest({
                    fragmentRoot: opts.specifications,
                    locale: lang === 'en-US' ? 'en' : lang,
                    toolingSha: opts.toolingSha,
                    generatedAt: opts.generatedAt,
                    outputPath: opts.derivationManifest,
                })
            }

            if (opts.upload_s3) {
                try {
                    const uploader = new S3Uploader({ target, lang })
                    await uploader.upload(specifications, lang)
                } catch (err) {
                    throw new Error(`S3 upload failed: ${err.message}`, { cause: err })
                }
            }
        })
}

function registerGenerateIntegratedSpecCommand(command) {
    command
        .description('Generate localized integrated OpenAPI specs for latest or track publication')
        .requiredOption('--fragment-collection <fragmentCollection>', 'Path to a canonical manifest-backed fragment collection')
        .requiredOption('--api-surface <apiSurface>', 'API surface: data-plane or control-plane')
        .option('-p, --publication-policy <publicationPolicy>', 'Publication policy: latest or track')
        .option('-t, --target <target>', 'Publication target', 'zilliz')
        .option('--protocol-version <protocolVersion>', 'Data-plane protocol path projection: v1 or v2')
        .option('--release-track <releaseTrack>', 'Minor track for track publication: 2.6.x or 3.0.x')
        .option('-l, --lang <lang>', 'Language of the generated spec', 'en-US')
        .option('--integrated-spec-output <integratedSpecOutput>', 'Output directory for local artifacts')
        .option('--upload-s3', 'Upload the prepared artifacts to S3', false)
        .option('--generator-git-sha <generatorGitSha>', 'Generator Git SHA recorded in the manifest')
        .action(async (opts) => {
            if (!opts.publicationPolicy) {
                throw new Error('Please provide --publication-policy (latest or track)')
            }
            if (!opts.integratedSpecOutput) {
                throw new Error('Please provide --integrated-spec-output')
            }

            const uploader = opts.uploadS3 ? new S3Uploader({}) : null
            const collection = loadFragmentCollection(opts.fragmentCollection, {
                apiSurface: opts.apiSurface,
                ...(opts.releaseTrack ? { releaseTrack: opts.releaseTrack } : {}),
            })

            const publicationOptions = {
                specifications: collection.spec,
                publicationPolicy: opts.publicationPolicy,
                target: opts.target,
                language: opts.lang,
                apiSurface: opts.apiSurface,
                protocolVersion: opts.protocolVersion,
                releaseTrack: opts.releaseTrack,
                outputDirectory: opts.integratedSpecOutput,
                uploader,
                generatorGitSha: opts.generatorGitSha || null,
                sourceIdentity: collection.provenance.collectionId,
                collection: collection.provenance,
                review: collection.provenance.review,
            }
            const result = opts.apiSurface === 'control-plane'
                ? await publishBilingualControlPlaneSpecs(publicationOptions)
                : await publishIntegratedSpecs(publicationOptions)

            const localArtifacts = result.localArtifacts || [result.releaseArtifact, ...result.results.flatMap(entry => entry.localArtifacts)]
            for (const artifact of localArtifacts) {
                console.log(`Wrote ${artifact.path}`)
            }
            for (const upload of result.uploads) {
                console.log(`Uploaded ${upload.filename} -> ${upload.url}`)
            }
        })
}

module.exports = function () {
    return {
        name: 'fetch-apifox-docs',
        extendCli(cli) {
            registerFetchCommand(cli.command('fetch-apifox-docs'))
            registerGenerateIntegratedSpecCommand(cli.command('generate-integrated-spec'))
        },
    }
}

if (require.main === module) {
    if (process.argv[2] === 'generate-integrated-spec') {
        const cli = new Command()
            .name('fetch-apifox-docs')
        registerGenerateIntegratedSpecCommand(cli.command('generate-integrated-spec'))
        cli.parseAsync(process.argv).catch(error => {
            console.error(error instanceof Error ? error.message : String(error))
            process.exitCode = 1
        })
    } else {
        program
            .name('fetch-apifox-docs')
        registerFetchCommand(program)
        program.parseAsync(process.argv).catch(error => {
            console.error(error instanceof Error ? error.message : String(error))
            process.exitCode = 1
        })
    }
}
