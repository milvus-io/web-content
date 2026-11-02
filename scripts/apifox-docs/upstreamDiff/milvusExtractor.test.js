const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {spawnSync} = require('node:child_process')
const {parseRestUpstreamSkeleton} = require('./sourceTree')

// The Go extractor (milvus/extractor.go) runs from the Go toolchain only
// (design §6.1: Go stays out of the regular build chain). When `go` is on
// PATH the hermetic fixture set pins its behavior byte-for-byte; without it
// the suite reports an explicit skip instead of pretending coverage.
const EXTRACTOR = path.join(__dirname, 'milvus', 'extractor.go')
const TESTDATA = path.join(__dirname, 'milvus', 'testdata')

function goAvailable() {
    const probe = spawnSync('go', ['version'], {encoding: 'utf8'})
    return probe.status === 0
}

function extract(fixtureDir) {
    const outDir = fs.mkdtempSync(path.join(os.tmpdir(), 'rest-upstream-extract-'))
    const skeletonPath = path.join(outDir, 'skeleton.json')
    const result = spawnSync('go', ['run', EXTRACTOR, '--dir', fixtureDir, '--out', skeletonPath], {encoding: 'utf8'})
    return {result, skeletonPath, outDir}
}

test('extractor reproduces the golden skeleton from the hermetic fixture', t => {
    if (!goAvailable()) return t.skip('go toolchain not on PATH; extractor behavior is covered wherever Go is installed')
    const {result, skeletonPath, outDir} = extract(path.join(TESTDATA, 'httpserver'))
    try {
        assert.equal(result.status, 0, result.stderr)
        const golden = fs.readFileSync(path.join(TESTDATA, 'expected-skeleton.json'), 'utf8')
        assert.equal(fs.readFileSync(skeletonPath, 'utf8'), golden)
        const skeleton = parseRestUpstreamSkeleton(golden)
        // Fixture coverage: constant-composed paths, middleware-wrapped multiline
        // routes, deprecated action comments, binding required, nested structs,
        // pointers, maps, untyped fields, and route-reachable components only.
        assert.deepEqual(skeleton.operations.map(op => [op.path, op.handler, Boolean(op.deprecated)]), [
            ['/v2/vectordb/collections/create', 'createCollection', false],
            ['/v2/vectordb/collections/get_progress', 'getProgress', true],
            ['/v2/vectordb/collections/list', 'listCollections', false],
            ['/v2/vectordb/entities/delete', 'deleteEntities', false],
        ])
        assert.ok(!('Unreachable' in skeleton.components.schemas))
    } finally {
        fs.rmSync(outDir, {recursive: true, force: true})
    }
})

// P2 review P1-1: same path, mixed methods — the emitted order is the
// (path, method) tuple, exactly what the Node-side gate compares.
test('extractor emits mixed-method routes in (path, method) tuple order', t => {
    if (!goAvailable()) return t.skip('go toolchain not on PATH; extractor behavior is covered wherever Go is installed')
    const {result, skeletonPath, outDir} = extract(path.join(TESTDATA, 'mixed-method'))
    try {
        assert.equal(result.status, 0, result.stderr)
        const skeleton = parseRestUpstreamSkeleton(fs.readFileSync(skeletonPath, 'utf8'))
        assert.deepEqual(skeleton.operations.map(op => `${op.method} ${op.path}`), [
            'post /v2/vectordb/collections/list',
            'get /v2/vectordb/entities/delete',
            'get /v2/vectordb/entities/get',
            'post /v2/vectordb/entities/get',
        ])
    } finally {
        fs.rmSync(outDir, {recursive: true, force: true})
    }
})

test('extractor fails closed on unknown path constants, external types, a missing route table, and a delegated router', t => {
    if (!goAvailable()) return t.skip('go toolchain not on PATH; extractor behavior is covered wherever Go is installed')
    for (const [fixture, code] of [
        ['bad-ident', 'REST_UPSTREAM_EXTRACT_PATH_UNKNOWN_IDENT'],
        ['external-type', 'REST_UPSTREAM_EXTRACT_EXTERNAL_TYPE'],
        ['no-table', 'REST_UPSTREAM_EXTRACT_ROUTE_TABLE_MISSING'],
        // A router handed to a helper hides registrations outside the parsed
        // body: the route set would silently under-report upstream additions.
        ['delegated-router', 'REST_UPSTREAM_EXTRACT_ROUTER_DELEGATED'],
        // Two wrapperPost calls in one registration are ambiguous; picking
        // one would extract an arbitrary request contract.
        ['ambiguous-wrapper', 'REST_UPSTREAM_EXTRACT_WRAPPER_AMBIGUOUS'],
        // router.Group splits the registration surface onto a sub-router the
        // extractor never reads: fail closed instead of diffing a subset.
        ['grouped-router', 'REST_UPSTREAM_EXTRACT_ROUTER_GROUP'],
    ]) {
        const {result, outDir} = extract(path.join(TESTDATA, fixture))
        fs.rmSync(outDir, {recursive: true, force: true})
        assert.notEqual(result.status, 0, `${fixture} must fail`)
        assert.match(result.stderr, new RegExp(code), `${fixture} must report ${code}`)
    }
})

// A router reference inside a handler closure is request-time use, not a
// registration delegation: the top-level walk must not flag it. (An inline
// FuncLit handler itself stays unsupported — HANDLER_MISSING — but the error
// names the shape instead of blaming a delegation.)
test('a router reference inside a handler closure is not a delegation', t => {
    if (!goAvailable()) return t.skip('go toolchain not on PATH; extractor behavior is covered wherever Go is installed')
    const {result, outDir} = extract(path.join(TESTDATA, 'closure-router'))
    fs.rmSync(outDir, {recursive: true, force: true})
    assert.notEqual(result.status, 0)
    assert.match(result.stderr, /REST_UPSTREAM_EXTRACT_HANDLER_MISSING/)
    assert.doesNotMatch(result.stderr, /REST_UPSTREAM_EXTRACT_ROUTER_DELEGATED/)
})
