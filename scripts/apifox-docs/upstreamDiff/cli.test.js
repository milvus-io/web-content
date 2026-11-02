const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {spawnSync} = require('node:child_process')
const {loadRestUpstreamLock} = require('./lock')
const {loadRestUpstreamLedger} = require('./ledger')
const {loadRuleset, DEFAULTS, REPOSITORY_ROOT} = require('./cli')
const {diffDigestOf} = require('./changeSet')

const INDEX = path.join(__dirname, '..', 'index.js')

function runCli(args, cwd) {
    const result = spawnSync(process.execPath, [INDEX, ...args], {cwd, encoding: 'utf8'})
    return {status: result.status, stdout: result.stdout, stderr: result.stderr}
}

test('committed lock, ledger, and ruleset parse and pin real upstream sources', () => {
    const lock = loadRestUpstreamLock(DEFAULTS.lock)
    assert.deepEqual(lock.sources.map(source => [source.id, source.repository, source.artifact.kind, source.publicationTarget]), [
        ['zilliz-cloud-control-plane', 'zilliztech/zilliz-cloud', 'spec-file', 'zilliz'],
        ['milvus-data-plane', 'milvus-io/milvus', 'source-tree', 'milvus'],
    ])
    const ledger = loadRestUpstreamLedger(DEFAULTS.ledger)
    // Bootstrap (2026-10-28 replay): 51 external stock operations plus 3
    // deferred decisions (modifyProperties adoption, etl/merge and
    // import/create branch attribution candidates); the milvus bootstrap
    // (2026-10-29, doc-team reviewed) adds 13 external v1 operations,
    // 9 confirmed-public + 2 field-attribution deferred, and 2 rejected
    // internal endpoints. The ledger keeps growing: every refresh PR lands
    // model-proposed drafts as deferred entries and human review adopts or
    // reclassifies them, so the suite pins the bootstrap floor, not exact
    // counts (this suite also runs on refresh branches whose tree already
    // carries the landed drafts).
    assert.ok(ledger.entries.length >= 80, `ledger entries ${ledger.entries.length}`)
    assert.ok(ledger.entries.filter(entry => entry.classification === 'external').length >= 64)
    assert.ok(ledger.entries.filter(entry => entry.classification === 'rejected').length >= 2)
    assert.ok(ledger.entries.filter(entry => entry.source === 'milvus-data-plane').length >= 26)
    const ruleset = loadRuleset(DEFAULTS.rules)
    assert.deepEqual(ruleset.internalFieldDenylist, ['accessKey', 'secretKey', 'token', 'innerCall'])
    assert.ok(ruleset.policies.some(policy => policy.id === 'doc-design-zdoc'))
})

test('rest-upstream-lock lists sources and rest-upstream-format reports canonical fragments', () => {
    const lock = runCli(['rest-upstream-lock'])
    assert.equal(lock.status, 0, lock.stderr)
    // Pin identity moves with every merged refresh; the listing only has to
    // show the source rows with a commit-shaped pin.
    assert.match(lock.stdout, /zilliz-cloud-control-plane\tzilliztech\/zilliz-cloud@[0-9a-f]{40}/)

    const format = runCli(['rest-upstream-format'])
    assert.equal(format.status, 0, format.stderr)
    assert.match(format.stdout, /All fragments are canonical/)
})

test('rest-upstream-format --write normalizes a tight fragment; check mode exits non-zero', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-format-'))
    try {
        fs.writeFileSync(path.join(dir, '99-tight.json'), '{"openapi":"3.0.1","paths":{}}')
        const check = runCli(['rest-upstream-format', '--dir', dir])
        assert.equal(check.status, 1)
        assert.match(check.stdout, /Non-canonical: 99-tight.json/)
        const write = runCli(['rest-upstream-format', '--dir', dir, '--write'])
        assert.equal(write.status, 0, write.stderr)
        assert.equal(fs.readFileSync(path.join(dir, '99-tight.json'), 'utf8'), '{\n  "openapi": "3.0.1",\n  "paths": {}\n}\n')
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('diff then apply round trip through the CLI against a YAML upstream spec', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-cli-'))
    try {
        const fragmentsDir = path.join(dir, 'fragments')
        fs.mkdirSync(fragmentsDir)
        fs.writeFileSync(path.join(fragmentsDir, '21-project-operations-v2.json'), `${JSON.stringify({
            openapi: '3.0.1',
            paths: {'/v2/projects': {post: {
                summary: 'Create Project.',
                requestBody: {content: {'application/json': {schema: {type: 'object', required: ['projectName'], properties: {
                    projectName: {type: 'string', maxLength: 32},
                }}}}},
                responses: {'200': {description: 'ok'}},
            }}},
        }, null, 2)}\n`)
        fs.writeFileSync(path.join(dir, 'titles.json'), '{\n  "创建项目": "create-project"\n}\n')
        fs.writeFileSync(path.join(dir, 'upstream.yaml'), [
            'openapi: 3.1.0',
            'info: {title: Cloud-Controller-API, version: v1}',
            'paths:',
            '  /v2/projects:',
            '    post:',
            '      summary: Create Project',
            '      requestBody:',
            '        content:',
            '          application/json:',
            '            schema:',
            '              type: object',
            '              required: [projectName]',
            '              properties:',
            '                projectName: {type: string, maxLength: 50}',
            '      responses:',
            "        '200': {description: ok}",
            '',
        ].join('\n'))
        const outDir = path.join(dir, 'diff')
        // The pin must come from the flag, not the repo's live lock: this
        // suite also runs on refresh branches where the lock pin has moved.
        const diff = runCli(['rest-upstream-diff', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'upstream.yaml'),
            '--upstream-commit', 'f'.repeat(40), '--fragments', fragmentsDir, '--out', outDir])
        assert.equal(diff.status, 0, diff.stderr)
        assert.match(diff.stdout, /upstream-modified: 2/)
        const diffDocument = JSON.parse(fs.readFileSync(path.join(outDir, 'diff.json'), 'utf8'))
        assert.equal(diffDocument.upstreamPin, 'f'.repeat(40))
        assert.match(fs.readFileSync(path.join(outDir, 'diff.md'), 'utf8'), /## `post \/v2\/projects` \(21-project-operations-v2.json\)/)

        const summaryId = 'upstream-modified|post /v2/projects|21-project-operations-v2.json|operation||||summary|'
        const mirrorId = 'upstream-modified|post /v2/projects|21-project-operations-v2.json|requestBody|||projectName|schema|mirror'
        assert.deepEqual(diffDocument.entries.map(entry => entry.id), [summaryId, mirrorId])
        fs.writeFileSync(path.join(dir, 'change-set.json'), JSON.stringify({
            schemaVersion: '1.0',
            source: 'zilliz-cloud-control-plane',
            diffDigest: diffDigestOf(diffDocument),
            entries: [
                {diffEntryId: summaryId, kind: 'prose', evidence: '/paths/~1v2~1projects/post', targetFragment: '21-project-operations-v2.json',
                    opPath: '/paths/~1v2~1projects/post/summary', value: 'Create Project'},
                {diffEntryId: mirrorId, kind: 'mirror', evidence: '/paths/~1v2~1projects/post', targetFragment: '21-project-operations-v2.json',
                    opPath: '/paths/~1v2~1projects/post/requestBody/content/application~1json/schema/properties/projectName',
                    value: {type: 'string', maxLength: 50}, requiredMembership: null},
            ],
        }))
        const applyOut = path.join(dir, 'applied')
        const apply = runCli(['rest-upstream-apply', '--diff', path.join(outDir, 'diff.json'), '--change-set', path.join(dir, 'change-set.json'),
            '--fragments', fragmentsDir, '--titles', path.join(dir, 'titles.json'), '--out', applyOut])
        assert.equal(apply.status, 0, apply.stderr)
        assert.match(apply.stdout, /applied 2 entries; changed 1 fragment\(s\); 0 diff entries left unaddressed/)
        const applied = JSON.parse(fs.readFileSync(path.join(applyOut, '21-project-operations-v2.json'), 'utf8'))
        assert.equal(applied.paths['/v2/projects'].post.summary, 'Create Project')
        assert.equal(applied.paths['/v2/projects'].post.requestBody.content['application/json'].schema.properties.projectName.maxLength, 50)
        const log = JSON.parse(fs.readFileSync(path.join(applyOut, 'applied.json'), 'utf8'))
        assert.deepEqual(log.changedFiles, ['21-project-operations-v2.json'])
        assert.deepEqual(log.unaddressedDiffEntries, [])

        const tampered = runCli(['rest-upstream-apply', '--diff', path.join(outDir, 'diff.json'), '--change-set', path.join(dir, 'change-set.json'),
            '--fragments', applyOut, '--titles', path.join(dir, 'titles.json'), '--out', path.join(dir, 'again')])
        // Re-applying against already-applied fragments is still sourced and idempotent-safe: same values written again.
        assert.equal(tampered.status, 0, tampered.stderr)
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('diff then candidates then decisions then assemble then apply round trip through the CLI', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-decide-'))
    try {
        const fragmentsDir = path.join(dir, 'fragments')
        fs.mkdirSync(fragmentsDir)
        fs.writeFileSync(path.join(fragmentsDir, '21-project-operations-v2.json'), `${JSON.stringify({
            openapi: '3.0.1',
            paths: {'/v2/projects': {post: {
                summary: 'Create Project.',
                requestBody: {content: {'application/json': {schema: {type: 'object', required: ['projectName'], properties: {
                    projectName: {type: 'string', maxLength: 32},
                }}}}},
                responses: {'200': {description: 'ok'}},
            }}},
        }, null, 2)}\n`)
        fs.writeFileSync(path.join(dir, 'titles.json'), '{\n  "创建项目": "create-project"\n}\n')
        fs.writeFileSync(path.join(dir, 'upstream.yaml'), [
            'openapi: 3.1.0',
            'info: {title: Cloud-Controller-API, version: v1}',
            'paths:',
            '  /v2/projects:',
            '    post:',
            '      summary: Create Project',
            '      requestBody:',
            '        content:',
            '          application/json:',
            '            schema:',
            '              type: object',
            '              required: [projectName]',
            '              properties:',
            '                projectName: {type: string, maxLength: 50}',
            '      responses:',
            "        '200': {description: ok}",
            '',
        ].join('\n'))
        const outDir = path.join(dir, 'diff')
        const diff = runCli(['rest-upstream-diff', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'upstream.yaml'),
            '--fragments', fragmentsDir, '--out', outDir])
        assert.equal(diff.status, 0, diff.stderr)

        // The 2026-10-30 merge model: prose is a report lane and the maxLength
        // drift is an auto mirror — the stance stage has nothing to judge here.
        const candidatesFile = path.join(dir, 'candidates.jsonl')
        const candidates = runCli(['rest-upstream-candidates', '--diff', path.join(outDir, 'diff.json'), '--out', candidatesFile])
        assert.equal(candidates.status, 0, candidates.stderr)
        assert.match(candidates.stdout, /candidates 0 line\(s\)/)
        assert.equal(fs.readFileSync(candidatesFile, 'utf8'), '\n')

        fs.writeFileSync(path.join(dir, 'decisions.jsonl'), '')
        const changeSetFile = path.join(dir, 'change-set.json')
        const assemble = runCli(['rest-upstream-assemble', '--diff', path.join(outDir, 'diff.json'), '--decisions', path.join(dir, 'decisions.jsonl'),
            '--reports', path.join(dir, 'reports.json'),
            '--fragments', fragmentsDir, '--out', changeSetFile])
        assert.equal(assemble.status, 0, assemble.stderr)
        assert.match(assemble.stdout, /assembled 1 entr\(ies\) from 0 decision\(s\) \(\)/)
        const changeSet = JSON.parse(fs.readFileSync(changeSetFile, 'utf8'))
        assert.equal(changeSet.schemaVersion, '1.0')
        const reports = JSON.parse(fs.readFileSync(path.join(dir, 'reports.json'), 'utf8'))
        assert.deepEqual(reports.descriptionDrift.map(entry => entry.after), ['Create Project'])
        assert.deepEqual(changeSet.entries.map(entry => entry.kind), ['mirror'])
        assert.deepEqual(changeSet.entries[0].value, {type: 'string', maxLength: 50})

        const applyOut = path.join(dir, 'applied')
        const apply = runCli(['rest-upstream-apply', '--diff', path.join(outDir, 'diff.json'), '--change-set', changeSetFile,
            '--fragments', fragmentsDir, '--titles', path.join(dir, 'titles.json'), '--out', applyOut])
        assert.equal(apply.status, 0, apply.stderr)
        assert.match(apply.stdout, /applied 1 entries; changed 1 fragment\(s\); 1 diff entries left unaddressed/)
        const applied = JSON.parse(fs.readFileSync(path.join(applyOut, '21-project-operations-v2.json'), 'utf8'))
        // prose stays local: the summary keeps the fragment text
        assert.equal(applied.paths['/v2/projects'].post.summary, 'Create Project.')
        assert.deepEqual(applied.paths['/v2/projects'].post.requestBody.content['application/json'].schema.properties.projectName,
            {type: 'string', maxLength: 50})

        // The decision stage never mints structural coordinates: an invented
        // diff entry id is refused by the assembler, not smuggled into apply.
        fs.writeFileSync(path.join(dir, 'bad-decisions.jsonl'), `${JSON.stringify({diffEntryId: 'upstream-modified|invented|21-project-operations-v2.json|operation||||summary|', action: 'adopt'})}\n`)
        const bad = runCli(['rest-upstream-assemble', '--diff', path.join(outDir, 'diff.json'), '--decisions', path.join(dir, 'bad-decisions.jsonl'),
            '--fragments', fragmentsDir, '--out', path.join(dir, 'bad-change-set.json')])
        assert.equal(bad.status, 1)
        assert.match(bad.stderr, /REST_UPSTREAM_ASSEMBLE_DIFF_ENTRY_UNKNOWN/)
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('milvus lifecycle round trip: a required tightening lands its diff-suggested x-last-modified through decide-assemble-apply', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-cli-lifecycle-'))
    try {
        const fragmentsDir = path.join(dir, 'fragments')
        fs.mkdirSync(fragmentsDir)
        // The fragment declares the field but does not require it; the pinned
        // skeleton (binding:"required" in extractor terms) does — the exact
        // required-tightening drift the lifecycle track earns a bump for.
        fs.writeFileSync(path.join(fragmentsDir, '05-collection-operations-v2.json'), `${JSON.stringify({
            openapi: '3.0.1',
            paths: {'/v2/vectordb/collections/has': {post: {
                summary: 'Has Collection',
                requestBody: {content: {'application/json': {schema: {type: 'object', properties: {
                    dbName: {type: 'string', maxLength: 255},
                }}}}},
                responses: {'200': {description: 'ok'}},
            }}},
        }, null, 2)}\n`)
        fs.writeFileSync(path.join(dir, 'titles.json'), '{}\n')
        fs.writeFileSync(path.join(dir, 'skeleton.json'), JSON.stringify({
            schemaVersion: '1.0',
            extractedFrom: {repository: 'milvus-io/milvus', sourceDir: 'internal/distributed/proxy/httpserver', mountPrefix: '/v2/vectordb'},
            operations: [{path: '/v2/vectordb/collections/has', method: 'post', handler: 'hasCollection', requestStruct: 'HasReq',
                requestSchema: {$ref: '#/components/schemas/HasReq'}}],
            components: {schemas: {HasReq: {type: 'object', required: ['dbName'], properties: {dbName: {type: 'string'}}}}},
        }, null, 2) + '\n')

        const outDir = path.join(dir, 'diff')
        const diff = runCli(['rest-upstream-diff', '--source', 'milvus-data-plane', '--skeleton', path.join(dir, 'skeleton.json'),
            '--fragments', fragmentsDir, '--out', outDir, '--lifecycle-track', '3.0.x'])
        assert.equal(diff.status, 0, diff.stderr)
        const diffDocument = JSON.parse(fs.readFileSync(path.join(outDir, 'diff.json'), 'utf8'))
        const requiredEntry = diffDocument.entries.find(entry => entry.change.kind === 'required' && entry.field === 'dbName')
        assert.ok(requiredEntry, `expected a required drift, got: ${diffDocument.entries.map(entry => entry.id).join(', ')}`)
        assert.equal(requiredEntry.change.after, true)
        assert.deepEqual(requiredEntry.lifecycle, {'x-last-modified': '3.0.x'})

        const candidates = runCli(['rest-upstream-candidates', '--diff', path.join(outDir, 'diff.json'), '--out', path.join(dir, 'candidates.jsonl')])
        assert.equal(candidates.status, 0, candidates.stderr)
        fs.writeFileSync(path.join(dir, 'decisions.jsonl'), `${JSON.stringify({diffEntryId: requiredEntry.id, action: 'adopt'})}\n`)
        const changeSetFile = path.join(dir, 'change-set.json')
        const assemble = runCli(['rest-upstream-assemble', '--diff', path.join(outDir, 'diff.json'), '--decisions', path.join(dir, 'decisions.jsonl'),
            '--fragments', fragmentsDir, '--out', changeSetFile])
        assert.equal(assemble.status, 0, assemble.stderr)
        const changeSet = JSON.parse(fs.readFileSync(changeSetFile, 'utf8'))
        assert.deepEqual(changeSet.entries.map(entry => [entry.kind, entry.opPath.split('/').pop()]), [
            ['constraint', 'required'],
            ['lifecycle', 'x-last-modified'],
        ])
        // The lifecycle leaf sits on the schema object (the applier binds
        // required-cited entries to the schema declaring the field), and the
        // applier accepts the assembled pair end to end.
        const applyOut = path.join(dir, 'applied')
        const apply = runCli(['rest-upstream-apply', '--diff', path.join(outDir, 'diff.json'), '--change-set', changeSetFile,
            '--fragments', fragmentsDir, '--titles', path.join(dir, 'titles.json'), '--out', applyOut])
        assert.equal(apply.status, 0, apply.stderr)
        const applied = JSON.parse(fs.readFileSync(path.join(applyOut, '05-collection-operations-v2.json'), 'utf8'))
        const schema = applied.paths['/v2/vectordb/collections/has'].post.requestBody.content['application/json'].schema
        assert.deepEqual(schema.required, ['dbName'])
        assert.equal(schema['x-last-modified'], '3.0.x')
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('diff refuses source-tree sources until the extractor skeleton exists, and unclassified fragments', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-cli-tree-'))
    try {
        fs.writeFileSync(path.join(dir, 'spec.json'), '{"openapi":"3.0.3","paths":{}}')
        const result = runCli(['rest-upstream-diff', '--source', 'milvus-data-plane', '--spec', path.join(dir, 'spec.json'), '--out', path.join(dir, 'out')])
        assert.equal(result.status, 1)
        assert.match(result.stderr, /REST_UPSTREAM_SKELETON_REQUIRED/)

        const noSpec = runCli(['rest-upstream-diff', '--source', 'zilliz-cloud-control-plane', '--out', path.join(dir, 'out')])
        assert.equal(noSpec.status, 1)
        assert.match(noSpec.stderr, /REST_UPSTREAM_SPEC_REQUIRED/)

        fs.writeFileSync(path.join(dir, 'skeleton.json'), JSON.stringify({
            schemaVersion: '1.0',
            extractedFrom: {repository: 'other/repo', sourceDir: 'internal/distributed/proxy/httpserver', mountPrefix: '/v2/vectordb'},
            operations: [{path: '/v2/vectordb/collections/list', method: 'post', handler: 'listCollections', requestStruct: 'DatabaseReq',
                requestSchema: {$ref: '#/components/schemas/DatabaseReq'}}],
            components: {schemas: {DatabaseReq: {type: 'object', properties: {dbName: {type: 'string'}}}}},
        }, null, 2) + '\n')
        const mismatch = runCli(['rest-upstream-diff', '--source', 'milvus-data-plane', '--skeleton', path.join(dir, 'skeleton.json'), '--out', path.join(dir, 'out')])
        assert.equal(mismatch.status, 1)
        assert.match(mismatch.stderr, /REST_UPSTREAM_SKELETON_SOURCE_MISMATCH/)

        const fragmentsDir = path.join(dir, 'fragments')
        fs.mkdirSync(fragmentsDir)
        fs.writeFileSync(path.join(fragmentsDir, '98-unclassified.json'), '{\n  "openapi": "3.0.1",\n  "paths": {}\n}\n')
        const unclassified = runCli(['rest-upstream-diff', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'spec.json'),
            '--fragments', fragmentsDir, '--out', path.join(dir, 'out2')])
        assert.equal(unclassified.status, 1)
        assert.match(unclassified.stderr, /REST_UPSTREAM_FRAGMENT_SURFACE_UNKNOWN.*98-unclassified\.json/)
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

function writePrepareFixture(dir, {specMaxLength, specSummary}) {
    const fragmentsDir = path.join(dir, 'fragments')
    fs.mkdirSync(fragmentsDir)
    fs.writeFileSync(path.join(fragmentsDir, '21-project-operations-v2.json'), `${JSON.stringify({
        openapi: '3.0.1',
        paths: {'/v2/projects': {post: {
            summary: 'Create Project.',
            requestBody: {content: {'application/json': {schema: {type: 'object', required: ['projectName'], properties: {
                projectName: {type: 'string', maxLength: specMaxLength},
            }}}}},
            responses: {'200': {description: 'ok'}},
        }}},
    }, null, 2)}\n`)
    fs.writeFileSync(path.join(dir, 'titles.json'), '{\n  "创建项目": "create-project"\n}\n')
    fs.writeFileSync(path.join(dir, 'upstream.yaml'), [
        'openapi: 3.1.0',
        'info: {title: Cloud-Controller-API, version: v1}',
        'paths:',
        '  /v2/projects:',
        '    post:',
        `      summary: ${specSummary}`,
        '      requestBody:',
        '        content:',
        '          application/json:',
        '            schema:',
        '              type: object',
        '              required: [projectName]',
        '              properties:',
        `                projectName: {type: string, maxLength: ${specMaxLength}}`,
        '      responses:',
        "        '200': {description: ok}",
        '',
    ].join('\n'))
}


test('rest-upstream-assemble consumes --branch-plan placements end to end', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-cli-branchplan-'))
    try {
        const fragmentsDir = path.join(dir, 'fragments')
        fs.mkdirSync(fragmentsDir)
        fs.writeFileSync(path.join(fragmentsDir, '19-etl-v2.json'), `${JSON.stringify({
            openapi: '3.0.1',
            paths: {'/v2/etl/merge': {post: {requestBody: {content: {'application/json': {schema: {anyOf: [
                {'x-tab-label': 'use volume', properties: {clusterId: {type: 'string'}}},
                {'x-tab-label': 'use object storage', properties: {objectUrl: {type: 'string'}}},
            ]}}}}}},
        }}, null, 2)}\n`)
        fs.writeFileSync(path.join(dir, 'diff.json'), JSON.stringify({
            schemaVersion: '1.0',
            source: 'zilliz-cloud-control-plane',
            publicationTarget: 'zilliz',
            upstreamPin: 'a'.repeat(40),
            summary: {},
            entries: [{id: 'unattributed|post /v2/etl/merge|19-etl-v2.json|requestBody|||onError|field-uncovered|',
                category: 'unattributed', opKey: 'post /v2/etl/merge', fragment: '19-etl-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'onError',
                change: {kind: 'field-uncovered', before: null, after: {type: 'string', description: 'Error handling mode.'}},
                requiredMembership: null, evidence: '/paths/x/post'}],
        }, null, 2) + '\n')
        fs.writeFileSync(path.join(dir, 'decisions.jsonl'), `${JSON.stringify({diffEntryId: 'unattributed|post /v2/etl/merge|19-etl-v2.json|requestBody|||onError|field-uncovered|', action: 'ledger', classification: 'deferred', reason: 'placed instead'})}\n`)
        fs.writeFileSync(path.join(dir, 'branch-plan.json'), JSON.stringify({placements: [
            {diffEntryId: 'unattributed|post /v2/etl/merge|19-etl-v2.json|requestBody|||onError|field-uncovered|', targets: ['use volume', 'use object storage']},
        ], reorganizations: []}, null, 2) + '\n')
        const changeSetFile = path.join(dir, 'change-set.json')
        const assemble = runCli(['rest-upstream-assemble', '--diff', path.join(dir, 'diff.json'), '--decisions', path.join(dir, 'decisions.jsonl'),
            '--branch-plan', path.join(dir, 'branch-plan.json'), '--reports', path.join(dir, 'reports.json'),
            '--fragments', fragmentsDir, '--out', changeSetFile])
        assert.equal(assemble.status, 0, assemble.stderr)
        assert.match(assemble.stdout, /1 placed, 0 unplaced/)
        const reports = JSON.parse(fs.readFileSync(path.join(dir, 'reports.json'), 'utf8'))
        assert.deepEqual(reports.placementsApplied.map(entry => entry.targets), [['use volume', 'use object storage']])
        assert.deepEqual(reports.supersededStances.length, 1)
        const changeSet = JSON.parse(fs.readFileSync(changeSetFile, 'utf8'))
        assert.deepEqual(changeSet.entries.filter(entry => entry.kind === 'addition').map(entry => entry.opPath), [
            '/paths/~1v2~1etl~1merge/post/requestBody/content/application~1json/schema/anyOf/0/properties',
            '/paths/~1v2~1etl~1merge/post/requestBody/content/application~1json/schema/anyOf/1/properties',
        ])
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('rest-upstream-ledger-bootstrap --from-diff defaults --date to today', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-bootstrap-date-'))
    try {
        fs.writeFileSync(path.join(dir, 'diff.json'), JSON.stringify({
            schemaVersion: '1.0',
            source: 'zilliz-cloud-control-plane',
            publicationTarget: 'zilliz',
            upstreamPin: 'a'.repeat(40),
            summary: {'fragment-only': 1},
            entries: [{
                id: 'fragment-only|post /v2/vectordb/jobs/import/abort|11-import-operations-v2.json|operation||||operation-absent-upstream|',
                category: 'fragment-only', opKey: 'post /v2/vectordb/jobs/import/abort', fragment: '11-import-operations-v2.json',
                scope: 'operation', change: {kind: 'operation-absent-upstream', before: null, after: null},
                evidence: 'fragment 11-import-operations-v2.json', ledgerStatus: 'pending',
            }],
        }, null, 2) + '\n')
        const generated = runCli(['rest-upstream-ledger-bootstrap', '--from-diff', path.join(dir, 'diff.json'), '--out', path.join(dir, 'proposal.json')])
        assert.equal(generated.status, 0, generated.stderr)
        const proposal = JSON.parse(fs.readFileSync(path.join(dir, 'proposal.json'), 'utf8'))
        assert.match(proposal.generatedOn, /^\d{4}-\d{2}-\d{2}$/)
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('rest-upstream-prepare stages an isolated agent workspace and fails closed without drift', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-prepare-'))
    try {
        writePrepareFixture(dir, {specMaxLength: 50, specSummary: 'Create Project.'})
        const staging = path.join(dir, 'staging')
        const noDrift = runCli(['rest-upstream-prepare', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'upstream.yaml'),
            '--staging', staging, '--fragments', path.join(dir, 'fragments'), '--titles', path.join(dir, 'titles.json')])
        assert.equal(noDrift.status, 1)
        assert.match(noDrift.stderr, /REST_UPSTREAM_PREPARE_NO_DRIFT/)

        const rehearsed = runCli(['rest-upstream-prepare', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'upstream.yaml'),
            '--staging', staging, '--allow-empty-drift', '--fragments', path.join(dir, 'fragments'), '--titles', path.join(dir, 'titles.json')])
        assert.equal(rehearsed.status, 0, rehearsed.stderr)
        assert.deepEqual(fs.readdirSync(staging).sort(), ['diff', 'meta', 'rules', 'staging-manifest.json'])
        assert.deepEqual(fs.readdirSync(path.join(staging, 'diff')).sort(), ['diff.json', 'diff.md'])
        const manifest = JSON.parse(fs.readFileSync(path.join(staging, 'staging-manifest.json'), 'utf8'))
        assert.equal(manifest.source, 'zilliz-cloud-control-plane')
        assert.deepEqual(manifest.files.map(file => file.path), ['diff/diff.json', 'diff/diff.md', 'meta/ledger.json', 'meta/lock.json', 'meta/titles.json', 'rules/refresh-rules.json'])

        const occupied = runCli(['rest-upstream-prepare', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'upstream.yaml'),
            '--staging', staging, '--allow-empty-drift', '--fragments', path.join(dir, 'fragments'), '--titles', path.join(dir, 'titles.json')])
        assert.equal(occupied.status, 1)
        assert.match(occupied.stderr, /REST_UPSTREAM_STAGING_EXISTS/)
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('rest-upstream-prepare stages only diff-touched fragments and enforces staging isolation', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-prepare-drift-'))
    try {
        writePrepareFixture(dir, {specMaxLength: 50, specSummary: 'Create Project'})
        // The isolation sweep guards every staged file; the ruleset is the
        // easiest staged input to poison from the test.
        const leakyRules = {internalFieldDenylist: ['token'], note: `Repository root marker: ${REPOSITORY_ROOT}`}
        fs.writeFileSync(path.join(dir, 'rules-leak.json'), `${JSON.stringify(leakyRules, null, 2)}\n`)
        const staging = path.join(dir, 'staging')
        const leaked = runCli(['rest-upstream-prepare', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'upstream.yaml'),
            '--staging', staging, '--fragments', path.join(dir, 'fragments'), '--titles', path.join(dir, 'titles.json'),
            '--rules', path.join(dir, 'rules-leak.json')])
        assert.equal(leaked.status, 1)
        assert.match(leaked.stderr, /REST_UPSTREAM_STAGING_ISOLATION_LEAK/)

        const prepare = runCli(['rest-upstream-prepare', '--source', 'zilliz-cloud-control-plane', '--spec', path.join(dir, 'upstream.yaml'),
            '--staging', staging, '--fragments', path.join(dir, 'fragments'), '--titles', path.join(dir, 'titles.json')])
        assert.equal(prepare.status, 0, prepare.stderr)
        assert.match(prepare.stdout, /staged 1 fragment\(s\), 1 substantive drift entr\(ies\)/)
        assert.deepEqual(fs.readdirSync(path.join(staging, 'fragments')).sort(), ['21-project-operations-v2.json'])
        const manifest = JSON.parse(fs.readFileSync(path.join(staging, 'staging-manifest.json'), 'utf8'))
        assert.equal(manifest.files.some(file => file.path === 'fragments/21-project-operations-v2.json'), true)
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('diff and prepare accept a source-tree skeleton for milvus-data-plane', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-cli-skeleton-'))
    try {
        const fragmentsDir = path.join(dir, 'fragments')
        fs.mkdirSync(fragmentsDir)
        fs.writeFileSync(path.join(fragmentsDir, '05-collection-operations-v2.json'), `${JSON.stringify({
            openapi: '3.0.1',
            paths: {'/v2/vectordb/collections/list': {post: {
                summary: 'List Collections',
                parameters: [{name: 'Authorization', in: 'header', required: true}],
                requestBody: {content: {'application/json': {schema: {type: 'object', properties: {dbName: {type: 'string', maxLength: 255}}}}}},
                responses: {'200': {description: 'ok'}},
            }}},
        }, null, 2)}\n`)
        fs.writeFileSync(path.join(dir, 'skeleton.json'), JSON.stringify({
            schemaVersion: '1.0',
            extractedFrom: {repository: 'milvus-io/milvus', sourceDir: 'internal/distributed/proxy/httpserver', mountPrefix: '/v2/vectordb'},
            operations: [{path: '/v2/vectordb/collections/list', method: 'post', handler: 'listCollections', requestStruct: 'DatabaseReq',
                requestSchema: {$ref: '#/components/schemas/DatabaseReq'}}],
            components: {schemas: {DatabaseReq: {type: 'object', properties: {dbName: {type: 'string'}}}}},
        }, null, 2) + '\n')

        const outDir = path.join(dir, 'diff')
        const diff = runCli(['rest-upstream-diff', '--source', 'milvus-data-plane', '--skeleton', path.join(dir, 'skeleton.json'),
            '--upstream-commit', 'e'.repeat(40), '--fragments', fragmentsDir, '--out', outDir])
        assert.equal(diff.status, 0, diff.stderr)
        // Structure-only: the Authorization header and the maxLength stay doc
        // design (zdoc-only); no prose/response/parameter drift is reportable.
        assert.match(diff.stdout, /zdoc-only: 1/)
        const diffDocument = JSON.parse(fs.readFileSync(path.join(outDir, 'diff.json'), 'utf8'))
        assert.equal(diffDocument.upstreamPin, 'e'.repeat(40))

        fs.writeFileSync(path.join(dir, 'titles.json'), '{\n  "list-collections": "list-collections"\n}\n')
        const staging = path.join(dir, 'staging')
        const prepared = runCli(['rest-upstream-prepare', '--source', 'milvus-data-plane', '--skeleton', path.join(dir, 'skeleton.json'),
            '--staging', staging, '--allow-empty-drift', '--fragments', fragmentsDir, '--titles', path.join(dir, 'titles.json')])
        assert.equal(prepared.status, 0, prepared.stderr)
        const manifest = JSON.parse(fs.readFileSync(path.join(staging, 'staging-manifest.json'), 'utf8'))
        assert.equal(manifest.specSha256, null)
        assert.ok(manifest.files.some(file => file.path === 'fragments/05-collection-operations-v2.json'))
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})

test('lifecycle-track diffs, T4 accounting, and the migration gate wire through the CLI', () => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-cli-p3-'))
    try {
        const fragmentsDir = path.join(dir, 'fragments')
        fs.mkdirSync(fragmentsDir)
        fs.writeFileSync(path.join(fragmentsDir, '05-collection-operations-v2.json'), `${JSON.stringify({
            openapi: '3.0.1',
            paths: {'/v2/vectordb/collections/list': {post: {
                summary: 'List Collections',
                requestBody: {content: {'application/json': {schema: {type: 'object', properties: {dbName: {type: 'string'}}}}}},
                responses: {'200': {description: 'ok'}},
            }}},
        }, null, 2)}\n`)
        // required tightening is a contract change: it earns a lifecycle suggestion
        fs.writeFileSync(path.join(dir, 'skeleton.json'), JSON.stringify({
            schemaVersion: '1.0',
            extractedFrom: {repository: 'milvus-io/milvus', sourceDir: 'internal/distributed/proxy/httpserver', mountPrefix: '/v2/vectordb'},
            operations: [{path: '/v2/vectordb/collections/list', method: 'post', handler: 'listCollections', requestStruct: 'DatabaseReq',
                requestSchema: {$ref: '#/components/schemas/DatabaseReq'}}],
            components: {schemas: {DatabaseReq: {type: 'object', required: ['dbName'], properties: {dbName: {type: 'string'}}}}},
        }, null, 2) + '\n')

        const outDir = path.join(dir, 'diff')
        const tracked = runCli(['rest-upstream-diff', '--source', 'milvus-data-plane', '--skeleton', path.join(dir, 'skeleton.json'),
            '--fragments', fragmentsDir, '--out', outDir, '--lifecycle-track', '3.0.x'])
        assert.equal(tracked.status, 0, tracked.stderr)
        const diffDocument = JSON.parse(fs.readFileSync(path.join(outDir, 'diff.json'), 'utf8'))
        const constraint = diffDocument.entries.find(entry => entry.change?.kind === 'required')
        assert.ok(constraint, 'fixture drift: expected the required tightening entry')
        assert.deepEqual(constraint.lifecycle, {'x-last-modified': '3.0.x'})

        // T4 accounting: everything classified -> strict passes; an undecided
        // upstream-added op fails the run and is named in the output.
        const accounted = runCli(['rest-upstream-accounting', '--diff', path.join(outDir, 'diff.json')])
        assert.equal(accounted.status, 0, accounted.stderr)
        assert.match(accounted.stdout, /0 upstream-added, 0 ledgered, 0 unaccounted/)
        const undecidedPath = path.join(dir, 'undecided-diff.json')
        fs.writeFileSync(undecidedPath, JSON.stringify({
            ...diffDocument,
            entries: [...diffDocument.entries, {opKey: 'post /v2/vectordb/snapshots/fake_internal_op', category: 'upstream-added', scope: 'operation',
                change: {kind: 'operation-absent-in-fragments', before: null, after: null}, evidence: '/paths/x/post', id: 'x'}],
        }, null, 2) + '\n')
        const undecided = runCli(['rest-upstream-accounting', '--diff', undecidedPath])
        assert.equal(undecided.status, 1)
        assert.match(undecided.stderr, /REST_UPSTREAM_LEDGER_ACCOUNTING_INCOMPLETE/)
        assert.match(undecided.stderr, /post \/v2\/vectordb\/snapshots\/fake_internal_op/)
        const report = runCli(['rest-upstream-accounting', '--diff', undecidedPath, '--report-only', '--out', path.join(dir, 'accounting.json')])
        assert.equal(report.status, 0, report.stderr)
        const statement = JSON.parse(fs.readFileSync(path.join(dir, 'accounting.json'), 'utf8'))
        assert.deepEqual(statement.summary, {upstreamAdded: 1, ledgered: 0, unaccounted: 1})
        assert.match(statement.diffDigest, /^sha256:[0-9a-f]{64}$/)

        // The committed migration bookkeeping is consistent with the fragments.
        const migration = runCli(['rest-upstream-migration'])
        assert.equal(migration.status, 0, migration.stderr)
        assert.match(migration.stdout, /migration 38 fragment\(s\)/)
        // canonical readiness needs a candidate collection and a diff input
        const unready = runCli(['rest-upstream-migration', '--canonical-ready'])
        assert.equal(unready.status, 1)
        assert.match(unready.stderr, /REST_UPSTREAM_MIGRATION_INPUTS_REQUIRED/)
        const noManifest = runCli(['rest-upstream-migration', '--canonical-ready', '--collection', path.join(dir, 'collection'),
            '--diff', path.join(outDir, 'diff.json')])
        assert.equal(noManifest.status, 1)
        assert.match(noManifest.stderr, /ENOENT|REST_COLLECTION_/)
    } finally {
        fs.rmSync(dir, {recursive: true, force: true})
    }
})
