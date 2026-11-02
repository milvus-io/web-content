#!/usr/bin/env node
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const { spawnSync } = require('node:child_process')
const { program } = require('commander')
const { loadSpecifications } = require('./apifox-docs/specLoader')
const { applyLifecycleForTrack } = require('./apifox-docs/lifecycle')
const { normalizeReleaseTrack } = require('./apifox-docs/releaseTrack')
const { assertNoDanglingLocalRefs, pruneUnreachableComponents } = require('./apifox-docs/componentGraph')
const { filterSelection, selectionAllows } = require('./apifox-docs/integratedSpecBuilder')

const DEFAULT_CONFIG_PATH = path.resolve(__dirname, 'config.json')
const DEFAULT_SPAWN_CWD = path.resolve(__dirname, '..')
const PLANE_DIRS = ['data-plane', 'control-plane']
const VERSION_DIRS = ['v1', 'v2']
const HTTP_METHODS = new Set(['get', 'post', 'put', 'delete', 'patch', 'options', 'head', 'trace'])
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
    const rawReleaseTrack = cli.releaseTrack ?? restfulEntry.releaseTrack

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

    let releaseTrack
    if (rawReleaseTrack !== undefined && rawReleaseTrack !== null) {
        try {
            releaseTrack = normalizeReleaseTrack(rawReleaseTrack)
        } catch (err) {
            throw new Error(`Invalid releaseTrack ${JSON.stringify(rawReleaseTrack)} for restful entry "${entryName}": expected major.minor.x such as 2.6.x`, { cause: err })
        }
    }

    return {
        specifications,
        lang,
        target,
        outputPath,
        strings,
        uploadS3,
        releaseTrack,
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

function hasHttpMethod(pathItem) {
    return !!pathItem && typeof pathItem === 'object' && Object.keys(pathItem).some(method => HTTP_METHODS.has(method))
}

// Deep publication-target pruning, reusing the integrated-spec builder's
// selection machinery so the wrapper and zdoc's own pipeline drop the same
// nodes: any operation, parameter, schema property, x-admonition entry, or
// component whose x-include-target / x-include-langs markers exclude the
// target goes before the lifecycle projection (or, on the latest line,
// before generation) — refGen only skips whole operations and tags while
// rendering, and the generated pages embed the operation JSON verbatim, so
// node-level scoping must be resolved here rather than left to the site
// runtime. The primary-tag cascade runs against the not-yet-pruned tag list
// because filterSelection on spec.paths only drops what the operation node
// itself marks.
function pruneTargetSelection(spec, { target, lang }) {
    const options = { target, language: lang }
    const stats = { omittedElements: 0 }
    const tagByName = new Map((spec.tags || []).map(tag => [tag?.name, tag]))

    for (const [endpoint, pathItem] of Object.entries(spec.paths || {})) {
        if (!pathItem || typeof pathItem !== 'object') {
            continue
        }
        for (const [method, operation] of Object.entries(pathItem)) {
            if (!HTTP_METHODS.has(method)) {
                continue
            }
            const tagObj = tagByName.get(operation?.tags?.[0])
            if (!selectionAllows(operation, options) || (tagObj && !selectionAllows(tagObj, options))) {
                delete pathItem[method]
                stats.omittedElements++
            }
        }
        if (!hasHttpMethod(pathItem)) {
            delete spec.paths[endpoint]
        }
    }

    spec.tags = filterSelection(spec.tags || [], options, stats, '$.tags')
    spec.paths = filterSelection(spec.paths || {}, options, stats, '$.paths')
    if (spec.components) {
        spec.components = filterSelection(spec.components, options, stats, '$.components')
    }

    return stats
}

// Project the merged fragment set onto one Milvus release track. The
// fragments carry lifecycle attributes (x-added-at / x-deprecated-since) for
// every managed node; applyLifecycleForTrack drops nodes added after the
// track and marks nodes deprecated on or before it. Target selection is
// pruned first (see pruneTargetSelection) so nodes the target never
// publishes are not lifecycle-validated either, mirroring
// integratedSpecBuilder. Paths and tags that end up empty are dropped the
// same way integratedSpecBuilder does, so refGen neither warns on
// method-less paths nor creates group folders for them.
function projectSpecificationsForTrack(specifications, { releaseTrack, target, lang }) {
    const merged = loadSpecifications(specifications)
    const selection = pruneTargetSelection(merged, { target, lang })

    const { value: spec, stats } = applyLifecycleForTrack(merged, releaseTrack)

    for (const [endpoint, pathItem] of Object.entries(spec.paths || {})) {
        if (!hasHttpMethod(pathItem)) {
            delete spec.paths[endpoint]
        }
    }

    const usedTags = new Set()
    for (const pathItem of Object.values(spec.paths || {})) {
        for (const [method, operation] of Object.entries(pathItem)) {
            if (!HTTP_METHODS.has(method)) {
                continue
            }
            for (const tag of operation.tags || []) {
                usedTags.add(tag)
            }
        }
    }
    if (Array.isArray(spec.tags)) {
        spec.tags = spec.tags.filter(tag => usedTags.has(tag?.name))
    }

    // specLoader inlines local $refs per fragment, so most components are
    // unreachable leftovers; prune them before the dangling-ref check, as
    // integratedSpecBuilder does, so only references the pages actually
    // resolve are validated.
    const pruned = pruneUnreachableComponents(spec)
    assertNoDanglingLocalRefs(pruned.spec)

    return { spec: pruned.spec, stats, selectionOmitted: selection.omittedElements }
}

// Writes the projected spec to a temp file so apifox-docs/index.js can load
// it through its single-file specification path. Returns the file plus a
// cleanup callback for the temp directory. Relative specification paths are
// repo-root relative, matching the cwd the apifox-docs child runs with.
function stageTrackSpecifications({ specifications, releaseTrack, target, lang }) {
    const specificationsPath = path.isAbsolute(specifications)
        ? specifications
        : path.join(DEFAULT_SPAWN_CWD, specifications)
    const { spec, stats, selectionOmitted } = projectSpecificationsForTrack(specificationsPath, { releaseTrack, target, lang })
    const stageDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fetch-restful-docs-'))
    const file = path.join(stageDir, `openapi-${releaseTrack}.json`)
    fs.writeFileSync(file, JSON.stringify(spec))

    return {
        file,
        stats,
        selectionOmitted,
        cleanup() {
            fs.rmSync(stageDir, { recursive: true, force: true })
        },
    }
}

// Latest-line projection: no lifecycle projection (the latest release line
// documents the full fragment set), but the same target pruning as the
// track path — the milvus.io runtime resolves prose include-spans but does
// not filter every scoped node kind, so zilliz-scoped parameters,
// properties, and x-admonition entries must not reach the page specs.
function projectSpecificationsForTarget(specifications, { target, lang }) {
    const spec = loadSpecifications(specifications)
    const stats = pruneTargetSelection(spec, { target, lang })

    const pruned = pruneUnreachableComponents(spec)
    assertNoDanglingLocalRefs(pruned.spec)

    return { spec: pruned.spec, stats }
}

// Latest-line staging: writes the target-pruned spec to a temp file so
// apifox-docs/index.js can load it through its single-file specification
// path. Returns the file plus a cleanup callback for the temp directory.
function stageTargetSpecifications({ specifications, target, lang }) {
    const specificationsPath = path.isAbsolute(specifications)
        ? specifications
        : path.join(DEFAULT_SPAWN_CWD, specifications)
    const { spec, stats } = projectSpecificationsForTarget(specificationsPath, { target, lang })
    const stageDir = fs.mkdtempSync(path.join(os.tmpdir(), 'fetch-restful-docs-'))
    const file = path.join(stageDir, 'openapi-target.json')
    fs.writeFileSync(file, JSON.stringify(spec))

    return {
        file,
        stats,
        cleanup() {
            fs.rmSync(stageDir, { recursive: true, force: true })
        },
    }
}

function removeEmptyDirectories(basePath) {
    if (!fs.existsSync(basePath) || !fs.statSync(basePath).isDirectory()) {
        return false
    }

    for (const entry of fs.readdirSync(basePath, { withFileTypes: true })) {
        if (entry.isDirectory()) {
            removeEmptyDirectories(path.join(basePath, entry.name))
        }
    }

    if (fs.readdirSync(basePath).length === 0) {
        fs.rmdirSync(basePath)
        return true
    }
    return false
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

function generateRestfulDocs(resolved) {
    let staged = null
    let childOptions = resolved

    try {
        if (resolved.releaseTrack) {
            staged = stageTrackSpecifications(resolved)
            console.log(`Projected specifications onto release track ${resolved.releaseTrack}: omitted ${staged.selectionOmitted} element(s) by target selection, omitted ${staged.stats.omittedElements} by lifecycle, marked ${staged.stats.deprecatedElements} deprecated`)
            childOptions = { ...resolved, specifications: staged.file }
        } else {
            staged = stageTargetSpecifications(resolved)
            console.log(`Pruned specifications onto target ${resolved.target}: omitted ${staged.stats.omittedElements} element(s) by target selection`)
            childOptions = { ...resolved, specifications: staged.file }
        }

        const result = spawnSync(process.execPath, buildApifoxArgs(childOptions), {
            stdio: 'inherit',
            cwd: DEFAULT_SPAWN_CWD,
        })
        if (result.error) {
            throw result.error
        }
        if (result.status !== 0) {
            return result.status || 1
        }
    } finally {
        staged?.cleanup()
    }

    const absoluteOutputPath = path.isAbsolute(resolved.outputPath)
        ? resolved.outputPath
        : path.join(DEFAULT_SPAWN_CWD, resolved.outputPath)

    if (resolved.target === 'milvus') {
        applyMilvusLegacyCompatibility(absoluteOutputPath)
    }
    removeEmptyDirectories(absoluteOutputPath)

    return 0
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
        .option('-r, --release-track <releaseTrack>', 'Milvus release track to project the fragments onto, e.g. 2.6.x')
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
                    releaseTrack: opts.releaseTrack,
                },
            })

            const status = generateRestfulDocs(resolved)
            if (status !== 0) {
                process.exit(status)
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
    projectSpecificationsForTrack,
    projectSpecificationsForTarget,
    stageTrackSpecifications,
    stageTargetSpecifications,
    pruneTargetSelection,
    removeEmptyDirectories,
    applyMilvusLegacyCompatibility,
    generateRestfulDocs,
}

if (require.main === module) {
    runCli()
}
