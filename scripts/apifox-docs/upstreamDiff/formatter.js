const fs = require('node:fs')
const path = require('node:path')

const FRAGMENT_SUFFIX = /\.json$/

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

// Canonical REST fragment serialization: 2-space indent, UTF-8 (no \u escapes), trailing newline.
function serializeDocument(document) {
    return `${JSON.stringify(document, null, 2)}\n`
}

// Fail-closed round-trip guard: parsed -> re-serialized must reproduce the input bytes exactly.
function assertCanonicalBytes(rawText, label) {
    let document
    try {
        document = JSON.parse(rawText)
    } catch (error) {
        fail('REST_FRAGMENT_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    const canonical = serializeDocument(document)
    if (canonical !== rawText) {
        let offset = 0
        while (offset < rawText.length && rawText[offset] === canonical[offset]) offset++
        fail('REST_FRAGMENT_NONCANONICAL_FORMAT', `${label}: bytes diverge at offset ${offset}; run rest-upstream-format --write`)
    }
    return document
}

function listFragmentFiles(fragmentsDir) {
    if (!fs.existsSync(fragmentsDir) || !fs.statSync(fragmentsDir).isDirectory()) {
        fail('REST_FRAGMENT_DIR_INVALID', fragmentsDir)
    }
    return fs.readdirSync(fragmentsDir).filter(name => FRAGMENT_SUFFIX.test(name)).sort()
}

function loadCanonicalFragment(fragmentsDir, fileName) {
    const filePath = path.join(fragmentsDir, fileName)
    const rawText = fs.readFileSync(filePath, 'utf8')
    return assertCanonicalBytes(rawText, fileName)
}

function loadCanonicalFragments(fragmentsDir) {
    const documents = new Map()
    for (const fileName of listFragmentFiles(fragmentsDir)) {
        documents.set(fileName, loadCanonicalFragment(fragmentsDir, fileName))
    }
    if (documents.size === 0) fail('REST_FRAGMENT_DIR_EMPTY', fragmentsDir)
    return documents
}

module.exports = {
    serializeDocument,
    assertCanonicalBytes,
    listFragmentFiles,
    loadCanonicalFragment,
    loadCanonicalFragments,
}
