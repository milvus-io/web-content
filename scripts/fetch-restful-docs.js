#!/usr/bin/env node
const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { program } = require('commander')

const DEFAULT_CONFIG_PATH = path.resolve(__dirname, 'config.json')
const DEFAULT_SPAWN_CWD = path.resolve(__dirname, '..')
const PLANE_DIRS = ['data-plane', 'control-plane']
const VERSION_DIRS = ['v1', 'v2']
const LEGACY_MILVUS_RENAMES = {
    'import-operations': 'Import',
    'import.mdx': 'Import.mdx',
    'get-import-progress.mdx': 'Get Progress.mdx',
}

function resolveRestfulOptions({ config, entryName, cli }) {
    const apifoxConfig = config?.apifox
    const restfulEntries = apifoxConfig?.restful || {}
    const restfulEntry = restfulEntries[entryName]

    if (!restfulEntry) {
        throw new Error(`Missing restful entry "${entryName}" in apifox.restful`)
    }

    const specifications = cli.specifications ?? restfulEntry.specifications ?? apifoxConfig.specifications
    const lang = cli.lang ?? restfulEntry.lang
    const target = cli.target ?? restfulEntry.target
    const outputPath = cli.outputPath ?? restfulEntry.targets?.outputDir
    const strings = cli.strings ?? restfulEntry.strings
    const uploadS3 = cli.uploadS3 ?? restfulEntry.uploadS3 ?? false

    if (!specifications) {
        throw new Error(`Missing specifications for restful entry "${entryName}"`)
    }
    if (!lang) {
        throw new Error(`Missing lang for restful entry "${entryName}"`)
    }
    if (!target) {
        throw new Error(`Missing target for restful entry "${entryName}"`)
    }
    if (!outputPath) {
        throw new Error(`Missing output path for restful entry "${entryName}"`)
    }

    return {
        specifications,
        lang,
        target,
        outputPath,
        strings,
        uploadS3,
    }
}

function buildApifoxArgs(options) {
    const args = [
        path.resolve(__dirname, 'apifox-docs/index.js'),
        '--specifications', options.specifications,
        '--lang', options.lang,
        '--target', options.target,
        '--output_path', options.outputPath,
    ]

    if (options.strings) {
        args.push('--strings', options.strings)
    }
    if (options.uploadS3) {
        args.push('--upload-s3')
    }

    return args
}

function loadConfig(configPath) {
    const resolvedPath = path.resolve(configPath)
    return JSON.parse(fs.readFileSync(resolvedPath, 'utf-8'))
}

function defaultEntryName(config) {
    const keys = Object.keys(config?.apifox?.restful || {})
    return keys[0]
}

function movePath(sourcePath, targetPath) {
    if (sourcePath === targetPath) {
        return
    }

    const sourceStats = fs.statSync(sourcePath)

    if (sourceStats.isDirectory()) {
        if (!fs.existsSync(targetPath)) {
            fs.renameSync(sourcePath, targetPath)
            return
        }

        for (const name of fs.readdirSync(sourcePath)) {
            movePath(path.join(sourcePath, name), path.join(targetPath, name))
        }
        fs.rmSync(sourcePath, { recursive: true, force: true })
        return
    }

    if (sourcePath.toLowerCase() === targetPath.toLowerCase()) {
        const tempPath = `${sourcePath}.__rename_tmp__`
        fs.renameSync(sourcePath, tempPath)
        fs.renameSync(tempPath, targetPath)
        return
    }

    if (fs.existsSync(targetPath)) {
        fs.rmSync(targetPath, { force: true })
    }
    fs.renameSync(sourcePath, targetPath)
}

function flattenPlaneDirs(versionPath) {
    for (const planeName of PLANE_DIRS) {
        const planePath = path.join(versionPath, planeName)
        if (!fs.existsSync(planePath)) {
            continue
        }

        for (const name of fs.readdirSync(planePath)) {
            movePath(path.join(planePath, name), path.join(versionPath, name))
        }

        fs.rmSync(planePath, { recursive: true, force: true })
    }
}

function applyLegacyMilvusNames(basePath) {
    const entries = fs.readdirSync(basePath, { withFileTypes: true })

    for (const entry of entries) {
        let currentPath = path.join(basePath, entry.name)
        const renamed = LEGACY_MILVUS_RENAMES[entry.name]
        if (renamed) {
            const renamedPath = path.join(basePath, renamed)
            movePath(currentPath, renamedPath)
            currentPath = renamedPath
        }

        if (entry.isDirectory()) {
            applyLegacyMilvusNames(currentPath)
        }
    }
}

function normalizeLegacyMilvusMdxContent(basePath) {
    const entries = fs.readdirSync(basePath, { withFileTypes: true })

    for (const entry of entries) {
        const absolutePath = path.join(basePath, entry.name)
        if (entry.isDirectory()) {
            normalizeLegacyMilvusMdxContent(absolutePath)
            continue
        }

        if (!entry.name.endsWith('.mdx')) {
            continue
        }

        const original = fs.readFileSync(absolutePath, 'utf-8')
        const normalized = original
            .replace('sidebar_position:', 'sidebar_positition:')
            .replace(/title: "([^"]+) \(V[12]\) \| RESTful"/g, 'title: "$1 | RESTful"')
            .replace(/sidebar_label: "([^"]+) \(V[12]\)"/g, 'sidebar_label: "$1"')
            .replace(/- "([^"]+) \(V[12]\)"/g, '- "$1"')
            .replace(/^# (.+) \(V[12]\)$/gm, '# $1')

        if (normalized !== original) {
            fs.writeFileSync(absolutePath, normalized)
        }
    }
}

function applyMilvusLegacyCompatibility(outputPath) {
    const absoluteOutputPath = path.resolve(outputPath)
    if (!fs.existsSync(absoluteOutputPath)) {
        return
    }

    for (const version of VERSION_DIRS) {
        const versionPath = path.join(absoluteOutputPath, version)
        if (!fs.existsSync(versionPath)) {
            continue
        }

        flattenPlaneDirs(versionPath)
        applyLegacyMilvusNames(versionPath)
        normalizeLegacyMilvusMdxContent(versionPath)
    }
}

function runCli() {
    program
        .name('fetch-restful-docs')
        .description('Generate restful docs using scripts/config.json apifox.restful entries')
        .option('-c, --config <config>', 'Path to config JSON', DEFAULT_CONFIG_PATH)
        .option('-e, --entry <entry>', 'Entry name in apifox.restful')
        .option('-s, --specifications <specifications>', 'Specifications of the API')
        .option('-l, --lang <lang>', 'Language of the API Reference')
        .option('-o, --output-path <outputPath>', 'Target path of the API Reference')
        .option('-i, --strings <strings>', 'Localization strings for Chinese docs')
        .option('-t, --target <target>', 'Publication target of the API Reference')
        .option('--upload-s3', 'Upload merged OpenAPI specs to S3 and update about page', false)
        .action((opts) => {
            const config = loadConfig(opts.config)
            const entryName = opts.entry || defaultEntryName(config)
            if (!entryName) {
                throw new Error('No restful entries found in apifox.restful')
            }

            const resolved = resolveRestfulOptions({
                config,
                entryName,
                cli: {
                    specifications: opts.specifications,
                    lang: opts.lang,
                    target: opts.target,
                    outputPath: opts.outputPath,
                    strings: opts.strings,
                    uploadS3: opts.uploadS3,
                },
            })

            const result = spawnSync(process.execPath, buildApifoxArgs(resolved), {
                stdio: 'inherit',
                cwd: DEFAULT_SPAWN_CWD,
            })
            if (result.error) {
                throw result.error
            }
            if (result.status !== 0) {
                process.exit(result.status || 1)
            }

            if (resolved.target === 'milvus') {
                const compatibilityOutputPath = path.isAbsolute(resolved.outputPath)
                    ? resolved.outputPath
                    : path.join(DEFAULT_SPAWN_CWD, resolved.outputPath)
                applyMilvusLegacyCompatibility(compatibilityOutputPath)
            }
        })

    program.parse()
}

module.exports = {
    DEFAULT_CONFIG_PATH,
    DEFAULT_SPAWN_CWD,
    resolveRestfulOptions,
    buildApifoxArgs,
    loadConfig,
    applyMilvusLegacyCompatibility,
}

if (require.main === module) {
    runCli()
}
