const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const Ajv2020 = require('ajv/dist/2020')

const changeSetSchema = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'contracts', 'rest-upstream-change-set.schema.json'), 'utf8'))

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

const validateChangeSet = new Ajv2020({allErrors: true, strict: false}).compile(changeSetSchema)

const KIND_REQUIREMENTS = {
    prose: ['targetFragment', 'opPath', 'value'],
    constraint: ['targetFragment', 'opPath', 'value'],
    lifecycle: ['targetFragment', 'opPath', 'value'],
    mirror: ['targetFragment', 'opPath', 'value'],
    addition: ['targetFragment', 'opPath', 'value'],
    title: ['value'],
    ledgerDraft: ['ledgerDraft'],
}

function assertChangeSetShape(changeSet) {
    if (!changeSet || typeof changeSet !== 'object' || Array.isArray(changeSet)) fail('REST_UPSTREAM_CHANGESET_INVALID', 'change set must be an object')
    if (!validateChangeSet(changeSet)) {
        const details = validateChangeSet.errors.map(error => `${error.instancePath || '/'} ${error.message}`).join('; ')
        fail('REST_UPSTREAM_CHANGESET_SCHEMA_INVALID', details)
    }
    const seenEntryIds = new Set()
    for (const entry of changeSet.entries) {
        for (const field of KIND_REQUIREMENTS[entry.kind]) {
            if (entry[field] === undefined) fail('REST_UPSTREAM_CHANGESET_FIELD_MISSING', `${entry.kind} entry ${entry.diffEntryId} requires ${field}`)
        }
        // One write per (diff entry, kind, locus): a drift may need several
        // writes of different kinds (a constraint fix plus its lifecycle bump,
        // design §6.3), but never two writes of the same kind at the same leaf.
        const writeKey = `${entry.diffEntryId}|${entry.kind}|${entry.opPath || ''}`
        if (seenEntryIds.has(writeKey)) fail('REST_UPSTREAM_CHANGESET_DUPLICATE_DIFF_ENTRY', writeKey)
        seenEntryIds.add(writeKey)
        if (entry.override === true && !entry.overrideReason) {
            fail('REST_UPSTREAM_CHANGESET_OVERRIDE_REASON_REQUIRED', `${entry.diffEntryId}: override needs an overrideReason for the reviewer`)
        }
        if (entry.override !== true && entry.overrideReason !== undefined) {
            fail('REST_UPSTREAM_CHANGESET_OVERRIDE_REASON_UNEXPECTED', `${entry.diffEntryId}: overrideReason without override`)
        }
        if (entry.kind === 'prose' && typeof entry.value !== 'string') {
            fail('REST_UPSTREAM_CHANGESET_VALUE_INVALID', `${entry.diffEntryId}: prose values must be strings`)
        }
        if (entry.kind === 'lifecycle' && entry.value !== null && !/^[0-9]+\.[0-9]+\.x$/.test(entry.value)) {
            fail('REST_UPSTREAM_CHANGESET_VALUE_INVALID', `${entry.diffEntryId}: lifecycle values use the major.minor.x track format`)
        }
        if (entry.kind === 'title') {
            const value = entry.value || {}
            if (!['add', 'remove'].includes(value.action) || typeof value.zhTitle !== 'string' || typeof value.slug !== 'string') {
                fail('REST_UPSTREAM_CHANGESET_VALUE_INVALID', `${entry.diffEntryId}: title entries need {action: add|remove, zhTitle, slug}`)
            }
        }
    }
}

function parseChangeSet(text, label = 'change-set.json') {
    let changeSet
    try {
        changeSet = JSON.parse(text)
    } catch (error) {
        fail('REST_UPSTREAM_CHANGESET_MALFORMED_JSON', `${label}: ${error.message}`)
    }
    assertChangeSetShape(changeSet)
    return changeSet
}

function loadChangeSet(filePath) {
    return parseChangeSet(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

// The digest binds a change set to one specific diff output; the applier refuses
// to apply change sets against any other diff (design §8.2).
function diffDigestOf(diffDocument) {
    const canonical = `${JSON.stringify(diffDocument, null, 2)}\n`
    return `sha256:${crypto.createHash('sha256').update(canonical).digest('hex')}`
}

function verifyAgainstDiff(changeSet, diffDocument) {
    if (changeSet.diffDigest !== diffDigestOf(diffDocument)) {
        fail('REST_UPSTREAM_CHANGESET_DIFF_MISMATCH', 'change set was produced against a different diff output')
    }
    const knownIds = new Set(diffDocument.entries.map(entry => entry.id))
    for (const entry of changeSet.entries) {
        if (!knownIds.has(entry.diffEntryId)) {
            fail('REST_UPSTREAM_CHANGESET_UNSOURCED', `${entry.diffEntryId} does not exist in the diff output`)
        }
    }
}

module.exports = {parseChangeSet, loadChangeSet, diffDigestOf, verifyAgainstDiff, assertChangeSetShape}
