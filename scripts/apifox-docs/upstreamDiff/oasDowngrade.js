const {isDeepStrictEqual} = require('node:util')

// Deterministic OpenAPI 3.1 -> 3.0.3 downgrade for upstream specs consumed by the
// fragment diff. Known mappings are explicit; anything not representable in 3.0
// fails closed instead of being silently dropped (design §4 module 2).
function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

// 3.1 JSON Schema keywords with no deterministic 3.0 mapping.
const UNMAPPABLE_SCHEMA_KEYWORDS = new Set([
    'prefixItems', 'unevaluatedProperties', 'unevaluatedItems', 'contains', 'minContains', 'maxContains',
    'patternProperties', 'propertyNames', 'if', 'then', 'else', 'dependentSchemas', 'dependentRequired',
    '$anchor', '$dynamicAnchor', '$dynamicRef', '$defs', 'contentSchema', 'pathItems',
])

// 3.1-only document/keyword remnants removed deterministically (metadata-only loss).
const DROP_DOCUMENT_KEYS = new Set(['jsonSchemaDialect'])
const DROP_INFO_KEYS = new Set(['summary'])
const DROP_LICENSE_KEYS = new Set(['identifier'])

function isPlainObject(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function downgradeSchema(schema, path) {
    if (Array.isArray(schema)) {
        return schema.map(item => downgradeSchema(item, path))
    }
    if (!isPlainObject(schema)) return schema

    const result = {}
    for (const [key, value] of Object.entries(schema)) {
        if (UNMAPPABLE_SCHEMA_KEYWORDS.has(key)) {
            fail('REST_UPSTREAM_OAS_UNMAPPABLE', `${path}/${key}: 3.1 keyword has no deterministic 3.0 mapping`)
        }
        if (key === 'type' && Array.isArray(value)) {
            const nonNull = value.filter(entry => entry !== 'null')
            if (nonNull.length !== 1) {
                fail('REST_UPSTREAM_OAS_UNMAPPABLE', `${path}/type: only single-type-with-null arrays map to 3.0`)
            }
            result.type = nonNull[0]
            if (nonNull.length !== value.length) result.nullable = true
            continue
        }
        if (key === 'const') {
            result.enum = [value]
            continue
        }
        if ((key === 'exclusiveMinimum' || key === 'exclusiveMaximum') && typeof value === 'number') {
            result[key === 'exclusiveMinimum' ? 'minimum' : 'maximum'] = value
            result[key] = true
            continue
        }
        if (key === 'examples' && Array.isArray(value)) {
            // 3.1 schema form: array of arbitrary examples. 3.0 keeps the first as `example`.
            if (value.length > 0) result.example = downgradeSchema(value[0], `${path}/examples[0]`)
            continue
        }
        result[key] = downgradeSchema(value, `${path}/${key}`)
    }
    return result
}

function downgradeDocument(document) {
    if (!isPlainObject(document)) fail('REST_UPSTREAM_OAS_INVALID', 'document must be an object')
    const version = document.openapi
    if (typeof version !== 'string') fail('REST_UPSTREAM_OAS_VERSION_MISSING', 'missing openapi version')
    if (version.startsWith('3.0')) {
        // Already 3.0.x: pass through (semantically) unchanged.
        return document
    }
    if (!version.startsWith('3.1')) fail('REST_UPSTREAM_OAS_VERSION_UNSUPPORTED', version)

    const result = {}
    for (const [key, value] of Object.entries(document)) {
        if (DROP_DOCUMENT_KEYS.has(key)) continue
        if (key === 'webhooks') {
            fail('REST_UPSTREAM_OAS_UNMAPPABLE', '/webhooks: 3.0 has no webhook top level')
        }
        if (key === 'info' && isPlainObject(value)) {
            const info = {...value}
            for (const dropKey of DROP_INFO_KEYS) delete info[dropKey]
            if (isPlainObject(info.license)) {
                for (const dropKey of DROP_LICENSE_KEYS) delete info.license[dropKey]
            }
            result.info = info
            continue
        }
        result[key] = downgradeSchema(value, `/${key}`)
    }
    result.openapi = '3.0.3'
    return result
}

// Idempotence guard: downgrading a downgraded document must be a no-op.
function assertIdempotent(downgraded) {
    if (!isDeepStrictEqual(downgraded, downgradeDocument(downgraded))) {
        fail('REST_UPSTREAM_OAS_DOWNGRADE_NOT_IDEMPOTENT', 'downgrade output must be stable')
    }
}

module.exports = {downgradeOpenApi31To30: downgradeDocument, downgradeDocument, assertIdempotent}
