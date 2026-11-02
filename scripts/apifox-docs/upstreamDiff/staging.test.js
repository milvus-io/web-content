const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {assertStagingIsolation, prepareRestUpstreamStaging} = require('./staging')
const {diffDigestOf} = require('./changeSet')

function tmpDir(prefix) {
    return fs.mkdtempSync(path.join(os.tmpdir(), prefix))
}

test('isolation sweep accepts a clean staging tree and rejects repository path leaks', () => {
    const staging = tmpDir('rest-upstream-isolation-clean-')
    const root = tmpDir('rest-upstream-isolation-root-')
    try {
        fs.mkdirSync(path.join(staging, 'diff'), {recursive: true})
        fs.writeFileSync(path.join(staging, 'diff', 'diff.json'), '{"clean": true}\n')
        assertStagingIsolation(staging, root)

        fs.writeFileSync(path.join(staging, 'leak.md'), `generated from ${root}\\n`)
        assert.throws(() => assertStagingIsolation(staging, root), /REST_UPSTREAM_STAGING_ISOLATION_LEAK.*leak\.md/)
        assert.throws(() => assertStagingIsolation(staging, 'relative/root'), /REST_UPSTREAM_STAGING_ISOLATION_ROOT_RELATIVE/)
    } finally {
        fs.rmSync(staging, {recursive: true, force: true})
        fs.rmSync(root, {recursive: true, force: true})
    }
})

function fixture() {
    const diff = {
        schemaVersion: '1.0',
        source: 'zilliz-cloud-control-plane',
        publicationTarget: 'zilliz',
        upstreamPin: 'a'.repeat(40),
        summary: {'upstream-modified': 1},
        entries: [{
            id: 'upstream-modified|post /v2/projects|21-project-operations-v2.json|requestBody|||projectName|constraint|maxLength',
            category: 'upstream-modified',
            opKey: 'post /v2/projects',
            fragment: '21-project-operations-v2.json',
            scope: 'requestBody',
            field: 'projectName',
            change: {kind: 'constraint', key: 'maxLength', before: 32, after: 50},
            evidence: '#/paths/~1v2~1projects/post',
        }],
    }
    return {diff, markdown: '# diff\n'}
}

test('staging layout is deterministic and carries a manifest with per-file digests', () => {
    const first = tmpDir('rest-upstream-staging-a-')
    const second = tmpDir('rest-upstream-staging-b-')
    const root = tmpDir('rest-upstream-staging-root-')
    try {
        const {diff, markdown} = fixture()
        const options = {
            repositoryRoot: root,
            diff,
            diffMarkdown: markdown,
            specSha256: 'f'.repeat(64),
            upstreamCommit: diff.upstreamPin,
            fragments: new Map([['21-project-operations-v2.json', {openapi: '3.0.1', paths: {}}]]),
            fragmentFiles: ['21-project-operations-v2.json'],
            rulesPath: path.join(__dirname, '..', 'meta', 'upstream', 'refresh-rules.json'),
            titlesPath: path.join(__dirname, '..', 'meta', 'titles.json'),
            ledgerPath: path.join(__dirname, '..', 'meta', 'upstream', 'ledger.json'),
            lockPath: path.join(__dirname, '..', 'meta', 'upstream', 'rest-upstream-lock.json'),
        }
        const firstManifest = prepareRestUpstreamStaging({stagingDir: first, ...options})
        const secondManifest = prepareRestUpstreamStaging({stagingDir: second, ...options})
        assert.deepEqual(firstManifest, secondManifest)
        assert.equal(firstManifest.diffDigest, diffDigestOf(diff))
        assert.deepEqual(firstManifest.files.map(file => file.path), [
            'diff/diff.json',
            'diff/diff.md',
            'fragments/21-project-operations-v2.json',
            'meta/ledger.json',
            'meta/lock.json',
            'meta/titles.json',
            'rules/refresh-rules.json',
        ])
        for (const file of firstManifest.files) {
            const raw = fs.readFileSync(path.join(first, file.path), 'utf8')
            assert.equal(raw.includes(root), false, `${file.path} leaked the repository root`)
        }
        assert.equal(fs.readFileSync(path.join(first, 'fragments', '21-project-operations-v2.json'), 'utf8'), '{\n  "openapi": "3.0.1",\n  "paths": {}\n}\n')
        assert.throws(() => prepareRestUpstreamStaging({stagingDir: first, ...options}), /REST_UPSTREAM_STAGING_EXISTS/)
    } finally {
        for (const dir of [first, second, root]) fs.rmSync(dir, {recursive: true, force: true})
    }
})
