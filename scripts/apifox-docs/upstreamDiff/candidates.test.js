const test = require('node:test')
const assert = require('node:assert/strict')
const {buildCandidateLines, serializeCandidateLines} = require('./candidates')

// Hand-built diff documents shaped exactly like diff.js output (id layout:
// category|opKey|fragment|scope|branch|responseStatus|field|changeKind|changeKey).
function diffDocument() {
    return {
        source: 'zilliz-cloud-control-plane',
        entries: [
            {id: 'upstream-modified|post /v2/things|01-things-v2.json|response|success|200|code|description|',
                category: 'upstream-modified', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'response',
                branch: 'success', responseStatus: '200', field: 'code', change: {kind: 'description', key: '', before: 'old', after: 'Business code.'}, evidence: ''},
            {id: 'upstream-modified|post /v2/things|01-things-v2.json|requestBody|||dbName|schema|mirror',
                category: 'upstream-modified', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'dbName', change: {kind: 'schema', key: 'mirror', before: null, after: {type: 'string'}}, evidence: ''},
            {id: 'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|',
                category: 'upstream-modified', opKey: 'post /v2/gadgets', fragment: '01-things-v2.json', scope: 'operation',
                branch: '', responseStatus: '', field: '', change: {kind: 'deprecated', key: '', before: false, after: true}, evidence: ''},
            {id: 'upstream-modified|put /v2/things/{ID}|01-things-v2.json|parameter|||projectId:query|required|',
                category: 'upstream-modified', opKey: 'put /v2/things/{ID}', fragment: '01-things-v2.json', scope: 'parameter',
                branch: '', responseStatus: '', field: 'projectId:query', change: {kind: 'required', key: '', before: true, after: false}, evidence: '',
                requiresConfirmation: 'required-relaxation'},
            {id: 'upstream-added-field|post /v2/things|01-things-v2.json|response||200|data|field-uncovered|',
                category: 'upstream-added-field', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'response',
                branch: '', responseStatus: '200', field: 'data', change: {kind: 'field-uncovered', key: '', before: null, after: {type: 'object'}}, evidence: ''},
            {id: 'upstream-added-param|post /v2/things|01-things-v2.json|parameter|||pageSize:query|param-uncovered|',
                category: 'upstream-added-param', opKey: 'post /v2/things', fragment: '01-things-v2.json', scope: 'parameter',
                branch: '', responseStatus: '', field: 'pageSize:query', change: {kind: 'param-uncovered', key: '', before: null, after: null}, evidence: ''},
            {id: 'unattributed|post /v2/etl/merge|02-etl-v2.json|requestBody|||onError|field-uncovered|',
                category: 'unattributed', opKey: 'post /v2/etl/merge', fragment: '02-etl-v2.json', scope: 'requestBody',
                branch: '', responseStatus: '', field: 'onError', change: {kind: 'field-uncovered', key: '', before: null, after: null}, evidence: ''},
            {id: 'upstream-added|post /v2/snapshots|03-snapshots-v2.json|operation|||||',
                category: 'upstream-added', opKey: 'post /v2/snapshots', fragment: '03-snapshots-v2.json', scope: 'operation',
                branch: '', responseStatus: '', field: '', change: {kind: 'operation-absent-in-fragments', key: '', before: null, after: null}, evidence: ''},
            {id: 'fragment-only|post /v2/legacy|04-legacy-v2.json|operation|||||',
                category: 'fragment-only', opKey: 'post /v2/legacy', fragment: '04-legacy-v2.json', scope: 'operation',
                branch: '', responseStatus: '', field: '', change: {kind: 'operation-absent-upstream', key: '', before: null, after: null}, evidence: '',
                ledgerStatus: 'classified'},
            {id: 'zdoc-only|post /v2/designed|01-things-v2.json|operation|||||',
                category: 'zdoc-only', opKey: 'post /v2/designed', fragment: '01-things-v2.json', scope: 'operation',
                branch: '', responseStatus: '', field: '', change: {kind: '', key: '', before: null, after: null}, evidence: ''},
        ],
    }
}

test('candidates list every stanceable, unclassified diff entry as a compact stance line', () => {
    const lines = buildCandidateLines(diffDocument())
    // The 2026-10-30 merge model: prose, mirrors, and added fields/params are
    // auto or report lanes and never reach the stance stage; classified stock
    // and zdoc-only design stay out too.
    assert.deepEqual(lines.map(line => line.d), [
        'upstream-modified|post /v2/gadgets|01-things-v2.json|operation||||deprecated|',
        'upstream-modified|put /v2/things/{ID}|01-things-v2.json|parameter|||projectId:query|required|',
        'unattributed|post /v2/etl/merge|02-etl-v2.json|requestBody|||onError|field-uncovered|',
        'upstream-added|post /v2/snapshots|03-snapshots-v2.json|operation|||||',
    ])
    // requiresConfirmation rides the summary so a relaxation can never be
    // adopted by mistake.
    assert.match(lines[1].c, /change=required requiresConfirmation=required-relaxation before=true after=false/)
})

test('candidates honor the fragment batch filter', () => {
    const lines = buildCandidateLines(diffDocument(), {fragmentFilter: '01-things-v2.json'})
    assert.equal(lines.length, 2)
    assert.ok(lines.every(line => line.d.includes('|01-things-v2.json|')))
})

test('candidate serialization is one JSON object per line with a trailing newline', () => {
    const text = serializeCandidateLines([{d: 'a|b', c: 'summary'}])
    assert.equal(text, '{"d":"a|b","c":"summary"}\n')
})
