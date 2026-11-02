const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const {serializeDocument} = require('./formatter')
const {diffDigestOf} = require('./changeSet')

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

function sha256File(filePath) {
    return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

// Design §8.6: staging isolation must be testable, not asserted. After prepare
// writes the staging tree, no file inside it may contain the absolute
// repository path — the agent's world is the staging directory alone, and any
// leak (a fragment comment, a generated report, the instructions pack) fails
// prepare closed before a paid agent turn is spent.
function assertStagingIsolation(stagingDir, repositoryRoot) {
    if (!path.isAbsolute(repositoryRoot)) fail('REST_UPSTREAM_STAGING_ISOLATION_ROOT_RELATIVE', repositoryRoot)
    const leaked = []
    const walk = current => {
        for (const name of fs.readdirSync(current).sort()) {
            const entryPath = path.join(current, name)
            if (fs.statSync(entryPath).isDirectory()) {
                walk(entryPath)
                continue
            }
            const raw = fs.readFileSync(entryPath)
            if (raw.includes(repositoryRoot)) leaked.push(path.relative(stagingDir, entryPath))
        }
    }
    walk(stagingDir)
    if (leaked.length > 0) {
        fail('REST_UPSTREAM_STAGING_ISOLATION_LEAK', `repository path ${repositoryRoot} leaked into staging file(s): ${leaked.join(', ')}`)
    }
}

// Deterministic staging layout (design §8.1). Everything the agent sees is
// staging-relative; the authoritative fragment tree never enters the agent
// context, and only diff-touched fragment copies are staged. The isolation
// sweep runs over the finished tree; the manifest is written after it, so the
// manifest itself is exempt from the sweep.
function prepareRestUpstreamStaging({stagingDir, repositoryRoot, diff, diffMarkdown, specSha256, upstreamCommit, fragments, fragmentFiles, rulesPath, titlesPath, ledgerPath, lockPath}) {
    if (fs.existsSync(stagingDir) && fs.readdirSync(stagingDir).length > 0) fail('REST_UPSTREAM_STAGING_EXISTS', stagingDir)
    const layout = {
        'diff/diff.json': serializeDocument(diff),
        'diff/diff.md': diffMarkdown,
        'rules/refresh-rules.json': fs.readFileSync(rulesPath, 'utf8'),
        'meta/titles.json': fs.readFileSync(titlesPath, 'utf8'),
        'meta/ledger.json': fs.readFileSync(ledgerPath, 'utf8'),
        'meta/lock.json': fs.readFileSync(lockPath, 'utf8'),
    }
    for (const fileName of fragmentFiles) {
        layout[path.join('fragments', fileName)] = serializeDocument(fragments.get(fileName))
    }
    fs.mkdirSync(stagingDir, {recursive: true})
    for (const [relativePath, content] of Object.entries(layout)) {
        const targetPath = path.join(stagingDir, relativePath)
        fs.mkdirSync(path.dirname(targetPath), {recursive: true})
        fs.writeFileSync(targetPath, content)
    }
    try {
        assertStagingIsolation(stagingDir, repositoryRoot)
    } catch (error) {
        // The staging tree was created by this run and holds no evidence the
        // error message does not carry: remove it so a corrected prepare can
        // reuse the path.
        fs.rmSync(stagingDir, {recursive: true, force: true})
        throw error
    }
    const files = Object.keys(layout).sort().map(relativePath => ({path: relativePath, sha256: sha256File(path.join(stagingDir, relativePath))}))
    const manifest = {
        schemaVersion: '1.0',
        source: diff.source,
        upstreamCommit,
        specSha256,
        diffDigest: diffDigestOf(diff),
        files,
    }
    fs.writeFileSync(path.join(stagingDir, 'staging-manifest.json'), serializeDocument(manifest))
    return manifest
}

module.exports = {prepareRestUpstreamStaging, assertStagingIsolation}
