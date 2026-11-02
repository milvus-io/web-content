const fs = require('node:fs')
const path = require('node:path')
const crypto = require('node:crypto')
const yaml = require('js-yaml')
const {serializeDocument, assertCanonicalBytes, listFragmentFiles, loadCanonicalFragments} = require('./formatter')
const {loadRestUpstreamLock, findLockSource} = require('./lock')
const {loadRestUpstreamLedger} = require('./ledger')
const {downgradeDocument} = require('./oasDowngrade')
const {diffSpecifications} = require('./diff')
const {loadChangeSet, diffDigestOf} = require('./changeSet')
const {applyChangeSet, reconcile, writeCanonicalOutputs} = require('./applier')
const {buildLedgerProposal, parseRestUpstreamLedgerProposal, mergeLedgerProposal} = require('./ledgerBootstrap')
const {prepareRestUpstreamStaging} = require('./staging')
const {loadRestUpstreamSkeleton, skeletonToUpstreamDocument, assertSkeletonMatchesSource} = require('./sourceTree')
const {accountUpstreamOperations, assertAccountingComplete} = require('./accounting')
const {loadRestFragmentMigration, assertMigrationConsistency, assertCanonicalReady} = require('./migration')
const {buildCandidateLines, serializeCandidateLines} = require('./candidates')
const {loadDecisions, assembleChangeSet} = require('./assembler')
const {parseBranchPlan} = require('./branchPlan')

function parseBranchPlanFile(filePath) {
    return parseBranchPlan(fs.readFileSync(filePath, 'utf8'), path.basename(filePath))
}

// Six levels up from upstreamDiff/: rest → reference → src → docs-tooling → packages → repo root.
const REPOSITORY_ROOT = path.resolve(__dirname, '..', '..', '..', '..', '..', '..')

const REST_ROOT = path.join(__dirname, '..')
const DEFAULTS = {
    lock: path.join(REST_ROOT, 'meta', 'upstream', 'rest-upstream-lock.json'),
    ledger: path.join(REST_ROOT, 'meta', 'upstream', 'ledger.json'),
    rules: path.join(REST_ROOT, 'meta', 'upstream', 'refresh-rules.json'),
    fragments: path.join(REST_ROOT, 'meta', 'openapi'),
    titles: path.join(REST_ROOT, 'meta', 'titles.json'),
    migration: path.join(REST_ROOT, 'meta', 'fragment-migration.json'),
}

function fail(code, message) {
    throw new Error(`${code}: ${message}`)
}

// fragment-migration.json classifies every fragment by api surface; the diff
// uses it to scope `fragment-only` reporting to the source's own surface.
function loadFragmentSurfaces(filePath) {
    const migration = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if (!Array.isArray(migration.fragments)) fail('REST_UPSTREAM_MIGRATION_INVALID', `${filePath}: fragments array missing`)
    return new Map(migration.fragments.map(fragment => [fragment.file, fragment.apiSurface]))
}

function loadRuleset(filePath) {
    const ruleset = JSON.parse(fs.readFileSync(filePath, 'utf8'))
    if (!Array.isArray(ruleset.internalFieldDenylist)) fail('REST_UPSTREAM_RULESET_INVALID', `${filePath}: internalFieldDenylist missing`)
    return ruleset
}

function loadSpecFile(filePath) {
    const raw = fs.readFileSync(filePath)
    const text = raw.toString('utf8')
    const document = /\.ya?ml$/i.test(filePath) ? yaml.load(text) : JSON.parse(text)
    if (!document || typeof document !== 'object') fail('REST_UPSTREAM_SPEC_INVALID', filePath)
    return {document, contentSha256: crypto.createHash('sha256').update(raw).digest('hex')}
}

// Shared loading + diff path for rest-upstream-diff and rest-upstream-prepare:
// one authority for lock/ledger/ruleset/fragment/spec validation ordering.
// spec-file sources load --spec; source-tree sources load --skeleton, the
// document produced by the Go extractor from the pinned checkout (design §6).
function computeUpstreamDiff(opts) {
    const lock = loadRestUpstreamLock(opts.lock)
    const source = findLockSource(lock, opts.source)
    const ledger = loadRestUpstreamLedger(opts.ledger)
    const ruleset = loadRuleset(opts.rules)
    const fragments = loadCanonicalFragments(opts.fragments)
    const fragmentSurfaces = loadFragmentSurfaces(opts.migration)
    let upstream
    let contentSha256 = null
    if (source.artifact.kind === 'spec-file') {
        if (!opts.spec) fail('REST_UPSTREAM_SPEC_REQUIRED', `${source.id}: spec-file sources need --spec`)
        const loaded = loadSpecFile(opts.spec)
        contentSha256 = loaded.contentSha256
        if (opts.expectPinned && source.pin.contentSha256 && source.pin.contentSha256 !== contentSha256) {
            fail('REST_UPSTREAM_SPEC_DIGEST_MISMATCH', `${opts.spec} sha256 ${contentSha256} != lock ${source.pin.contentSha256}`)
        }
        upstream = downgradeDocument(loaded.document)
    } else if (source.artifact.kind === 'source-tree') {
        if (!opts.skeleton) {
            fail('REST_UPSTREAM_SKELETON_REQUIRED', `${source.id}: extract the skeleton from the pinned checkout (go run upstreamDiff/milvus/extractor.go) and pass --skeleton`)
        }
        const skeleton = loadRestUpstreamSkeleton(opts.skeleton)
        assertSkeletonMatchesSource(skeleton, source)
        upstream = downgradeDocument(skeletonToUpstreamDocument(skeleton))
    } else {
        fail('REST_UPSTREAM_SOURCE_KIND_UNSUPPORTED', `${source.id}: unsupported artifact kind ${source.artifact.kind}`)
    }
    const upstreamCommit = opts.upstreamCommit || source.pin.commit
    if (!/^[a-f0-9]{40}$/.test(upstreamCommit)) fail('REST_UPSTREAM_COMMIT_INVALID', upstreamCommit)
    const diff = diffSpecifications({source, upstreamPin: upstreamCommit, upstream, fragments, ledger, ruleset, fragmentSurfaces, lifecycleTrack: opts.lifecycleTrack || null})
    return {diff, specSha256: contentSha256, source, ruleset, lock}
}

// Substantive drift = every refreshable delta the agent could address.
// zdoc-only entries are deliberate documentation design; ledger-classified
// fragment-only/upstream-added operations are already-decided stock. Everything
// else (including unclassified operations and field-level drift) needs a run.
function substantiveDriftEntries(diff) {
    return diff.entries.filter(entry => entry.category !== 'zdoc-only' && (entry.ledgerStatus ?? 'pending') !== 'classified')
}

function renderDiffMarkdown(diff) {
    // Subtree payloads (mirror/added-field entries carry resolved upstream
    // schemas) render as one-line structure summaries: diff.md is a review
    // surface with a PR-body budget, not the payload itself (diff.json is).
    const summarizeSubtree = subtree => {
        if (!subtree || typeof subtree !== 'object') return JSON.stringify(subtree)
        const names = subtree.properties ? Object.keys(subtree.properties) : []
        const parts = [`type=${JSON.stringify(subtree.type ?? null)}`]
        if (names.length) parts.push(`properties=[${names.join(', ')}]`)
        if (subtree.items) parts.push(`items=${summarizeSubtree(subtree.items)}`)
        return parts.join(' ')
    }
    const lines = [`# rest-upstream diff: ${diff.source} @ ${diff.upstreamPin}`, '']
    lines.push(`Publication target: ${diff.publicationTarget}`, '')
    lines.push('## Summary', '')
    for (const [category, count] of Object.entries(diff.summary).sort()) lines.push(`- ${category}: ${count}`)
    lines.push('')
    const byOperation = new Map()
    for (const entry of diff.entries) {
        if (!byOperation.has(entry.opKey)) byOperation.set(entry.opKey, [])
        byOperation.get(entry.opKey).push(entry)
    }
    for (const [opKey, entries] of [...byOperation.entries()].sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))) {
        const fragment = entries.find(entry => entry.fragment)?.fragment
        lines.push(`## \`${opKey}\`${fragment ? ` (${fragment})` : ''}`, '')
        for (const entry of entries) {
            const where = [entry.scope, entry.branch ? `branch "${entry.branch}"` : null, entry.field ? `\`${entry.field}\`` : null].filter(Boolean).join(' · ')
            const change = entry.change
            let detail
            if (change.kind === 'schema') {
                detail = `schema mirror: field subtree rebuilt to upstream structure (${summarizeSubtree(change.after)})`
                    + (entry.droppedLocalFields?.length ? `; local fields retired: ${entry.droppedLocalFields.join(', ')}` : '')
                    + `; requiredMembership=${JSON.stringify(entry.requiredMembership ?? null)}`
            } else if (change.kind === 'field-uncovered' && change.after && typeof change.after === 'object') {
                detail = `+ field from upstream (${summarizeSubtree(change.after)})`
            } else if (change.key) {
                detail = `${change.kind} ${change.key}: ${JSON.stringify(change.before)} → ${JSON.stringify(change.after)}`
            } else if (change.before !== null || change.after !== null) {
                detail = `${change.kind}: ${JSON.stringify(change.before)} → ${JSON.stringify(change.after)}`
            } else {
                detail = change.kind
            }
            const flags = [
                entry.ledgerStatus ? `ledger: ${entry.ledgerStatus}` : null,
                entry.requiresConfirmation ? `⚠️ confirm with R&D (${entry.requiresConfirmation})` : null,
                entry.unresolvableSubtree ? `recursive upstream subtree — reported for human follow-up, nothing auto-mirrored` : null,
                entry.templateProse ? `template copy (upstream repeats this text verbatim across many fields)` : null,
            ].filter(Boolean)
            lines.push(`- **${entry.category}** — ${where}: ${detail}${flags.length ? ` [${flags.join('; ')}]` : ''}`)
            lines.push(`  - id: \`${entry.id}\``)
            if (change.kind === 'required' && entry.scope !== 'parameter') {
                lines.push(`  - write: SCHEMA-level required — opPath = the fragment schema object containing \`${entry.field}\` plus \`/required\`; value = that schema's required ARRAY read from the fragment copy in fragments/, \`KEEPING its existing members\` (drop nothing) and ${change.after ? `appending \`${entry.field}\`` : `removing \`${entry.field}\``}. Order-insensitive; the applier derives and binds the expected array itself. Never write a boolean onto the field object.`)
            }
            if (entry.lifecycle) {
                const suggested = ['x-added-at', 'x-last-modified', 'x-deprecated-since']
                    .filter(key => key in entry.lifecycle)
                    .map(key => `${key}=${JSON.stringify(entry.lifecycle[key])}`)
                    .join(' ')
                lines.push(`  - lifecycle suggestion: ${suggested}`)
            }
        }
        lines.push('')
    }
    return `${lines.join('\n')}\n`
}

function registerLockCommand(command) {
    command
        .description('Validate the rest-upstream lock file and list pinned sources')
        .option('--lock <path>', 'Lock file path', DEFAULTS.lock)
        .action(opts => {
            const lock = loadRestUpstreamLock(opts.lock)
            for (const source of lock.sources) {
                const artifact = source.artifact.kind === 'spec-file' ? source.artifact.path : source.artifact.paths.join(',')
                console.log(`${source.id}\t${source.repository}@${source.pin.commit}\t${source.artifact.kind}:${artifact}\t${source.apiSurface}/${source.publicationTarget}`)
            }
        })
}

function registerFormatCommand(command) {
    command
        .description('Check (default) or rewrite REST fragments to the canonical JSON byte format')
        .option('--dir <path>', 'Fragment directory', DEFAULTS.fragments)
        .option('--write', 'Rewrite non-canonical fragments in place', false)
        .action(opts => {
            const offending = []
            for (const fileName of listFragmentFiles(opts.dir)) {
                const filePath = path.join(opts.dir, fileName)
                const raw = fs.readFileSync(filePath, 'utf8')
                try {
                    assertCanonicalBytes(raw, fileName)
                } catch (error) {
                    if (!/REST_FRAGMENT_NONCANONICAL_FORMAT/.test(error.message)) throw error
                    offending.push(fileName)
                    if (opts.write) fs.writeFileSync(filePath, serializeDocument(JSON.parse(raw)))
                }
            }
            if (offending.length === 0) {
                console.log('All fragments are canonical.')
                return
            }
            console.log(`${opts.write ? 'Rewrote' : 'Non-canonical'}: ${offending.join(', ')}`)
            if (!opts.write) process.exitCode = 1
        })
}

function registerDiffCommand(command) {
    command
        .description('Diff a fetched upstream spec (spec-file sources: --spec) or an extracted source-tree skeleton (--skeleton) against the REST fragments (branch-aware, deterministic)')
        .requiredOption('--source <id>', 'Source id from the lock file')
        .option('--spec <path>', 'Upstream spec file (.yaml/.yml/.json) fetched at the commit under review; required for spec-file sources')
        .option('--skeleton <path>', 'Source-tree skeleton JSON produced by the Go extractor; required for source-tree sources')
        .requiredOption('--out <dir>', 'Output directory for diff.json and diff.md')
        .option('--upstream-commit <sha>', 'Commit the spec was fetched from; defaults to the lock pin')
        .option('--expect-pinned', 'Fail unless the spec bytes match the lock contentSha256', false)
        .option('--lock <path>', 'Lock file path', DEFAULTS.lock)
        .option('--ledger <path>', 'Ledger file path', DEFAULTS.ledger)
        .option('--rules <path>', 'Refresh ruleset path', DEFAULTS.rules)
        .option('--fragments <dir>', 'Fragment directory', DEFAULTS.fragments)
        .option('--migration <path>', 'fragment-migration.json used to scope fragment-only reporting by api surface', DEFAULTS.migration)
        .option('--lifecycle-track <track>', 'Derive x-added-at/x-last-modified/x-deprecated-since suggestions on this managed track (data-plane sources only, design §6.3)')
        .action(opts => {
            const {diff} = computeUpstreamDiff(opts)
            fs.mkdirSync(opts.out, {recursive: true})
            fs.writeFileSync(path.join(opts.out, 'diff.json'), serializeDocument(diff))
            fs.writeFileSync(path.join(opts.out, 'diff.md'), renderDiffMarkdown(diff))
            console.log(`diff ${diffDigestOf(diff)} -> ${opts.out}`)
            for (const [category, count] of Object.entries(diff.summary).sort()) console.log(`  ${category}: ${count}`)
        })
}

function registerApplyCommand(command) {
    command
        .description('Apply an agent-authored change set to the fragments deterministically and reconcile it against the diff')
        .requiredOption('--diff <path>', 'diff.json the change set was authored against')
        .requiredOption('--change-set <path>', 'Change set JSON')
        .requiredOption('--out <dir>', 'Output directory for the applied fragments, titles.json, and applied.json')
        .option('--rules <path>', 'Refresh ruleset path', DEFAULTS.rules)
        .option('--fragments <dir>', 'Fragment directory', DEFAULTS.fragments)
        .option('--titles <path>', 'titles.json path', DEFAULTS.titles)
        .action(opts => {
            const diff = JSON.parse(fs.readFileSync(opts.diff, 'utf8'))
            const changeSet = loadChangeSet(opts.changeSet)
            const ruleset = loadRuleset(opts.rules)
            const documents = loadCanonicalFragments(opts.fragments)
            const titles = JSON.parse(fs.readFileSync(opts.titles, 'utf8'))
            const result = applyChangeSet({documents, titles, changeSet, diff, ruleset})
            const unaddressed = reconcile(result.appliedLog, changeSet, diff)
            writeCanonicalOutputs({outDir: opts.out, fragmentsDir: opts.fragments, documents: result.documents, changedFiles: result.changedFiles, titles: result.titles})
            fs.writeFileSync(path.join(opts.out, 'applied.json'), serializeDocument({
                schemaVersion: '1.0',
                source: changeSet.source,
                diffDigest: changeSet.diffDigest,
                changedFiles: [...result.changedFiles].sort(),
                appliedLog: result.appliedLog,
                overrides: result.overrides,
                normalizations: result.normalizations,
                titleLog: result.titleLog,
                ledgerDrafts: result.ledgerDrafts,
                unaddressedDiffEntries: unaddressed,
            }))
            console.log(`applied ${result.appliedLog.length} entries; changed ${result.changedFiles.size} fragment(s); ${unaddressed.length} diff entries left unaddressed -> ${opts.out}`)
        })
}

function registerLedgerBootstrapCommand(command) {
    command
        .description('Pre-register existing drift (generate a proposal from a full diff) or merge a reviewed proposal into the ledger')
        .option('--from-diff <path>', 'diff.json produced by rest-upstream-diff at the pinned commit')
        .option('--merge <path>', 'Human-reviewed proposal to merge into the append-only ledger')
        .option('--date <YYYY-MM-DD>', 'UTC date recorded on generated entries (default: today)')
        .option('--out <path>', 'Proposal output path (generate mode)')
        .option('--ledger <path>', 'Ledger file path', DEFAULTS.ledger)
        .action(opts => {
            if (opts.fromDiff) {
                if (opts.merge) fail('REST_UPSTREAM_BOOTSTRAP_MODE_CONFLICT', 'use either --from-diff or --merge, not both')
                if (!opts.out) fail('REST_UPSTREAM_BOOTSTRAP_OUT_REQUIRED', 'generate mode needs --out')
                const date = opts.date || new Date().toISOString().slice(0, 10)
                const diff = JSON.parse(fs.readFileSync(opts.fromDiff, 'utf8'))
                const proposal = buildLedgerProposal(diff, {date})
                fs.mkdirSync(path.dirname(path.resolve(opts.out)), {recursive: true})
                fs.writeFileSync(opts.out, serializeDocument(proposal))
                console.log(`bootstrap proposal ${proposal.entries.length} entr(ies) -> ${opts.out}`)
                for (const entry of proposal.entries) console.log(`  ${entry.classification}\t${entry.opKey}${entry.fragment ? `\t${entry.fragment}` : ''}`)
                return
            }
            if (!opts.merge) fail('REST_UPSTREAM_BOOTSTRAP_MODE_REQUIRED', 'pass --from-diff to generate a proposal or --merge to merge a reviewed one')
            const proposal = parseRestUpstreamLedgerProposal(fs.readFileSync(opts.merge, 'utf8'), path.basename(opts.merge))
            const merged = mergeLedgerProposal(proposal, fs.readFileSync(opts.ledger, 'utf8'), path.basename(opts.ledger))
            fs.writeFileSync(opts.ledger, merged)
            console.log(`merged ${proposal.entries.length} ledger entr(ies) -> ${opts.ledger}`)
        })
}

function registerPrepareCommand(command) {
    command
        .description('Build the isolated agent staging directory (diff + touched fragment copies + ruleset + instructions)')
        .requiredOption('--source <id>', 'Source id from the lock file')
        .option('--spec <path>', 'Upstream spec file (.yaml/.yml/.json) fetched at the commit under review; required for spec-file sources')
        .option('--skeleton <path>', 'Source-tree skeleton JSON produced by the Go extractor; required for source-tree sources')
        .requiredOption('--staging <dir>', 'Staging directory to create (must be absent or empty)')
        .option('--upstream-commit <sha>', 'Commit the spec was fetched from; defaults to the lock pin')
        .option('--expect-pinned', 'Fail unless the spec bytes match the lock contentSha256', false)
        .option('--allow-empty-drift', 'Stage even when no substantive drift exists (rehearsal escape hatch)', false)
        .option('--lock <path>', 'Lock file path', DEFAULTS.lock)
        .option('--ledger <path>', 'Ledger file path', DEFAULTS.ledger)
        .option('--rules <path>', 'Refresh ruleset path', DEFAULTS.rules)
        .option('--titles <path>', 'titles.json path', DEFAULTS.titles)
        .option('--fragments <dir>', 'Fragment directory', DEFAULTS.fragments)
        .option('--migration <path>', 'fragment-migration.json used to scope fragment-only reporting by api surface', DEFAULTS.migration)
        .option('--lifecycle-track <track>', 'Derive lifecycle suggestions into the staged diff (data-plane sources only, design §6.3)')
        .action(opts => {
            const {diff, specSha256, source} = computeUpstreamDiff(opts)
            const drift = substantiveDriftEntries(diff)
            if (drift.length === 0 && !opts.allowEmptyDrift) {
                fail('REST_UPSTREAM_PREPARE_NO_DRIFT', `${source.id}: no substantive drift at ${diff.upstreamPin}; pass --allow-empty-drift only for rehearsals`)
            }
            const touchedFiles = [...new Set(diff.entries.map(entry => entry.fragment).filter(Boolean))].sort()
            const fragments = loadCanonicalFragments(opts.fragments)
            for (const fileName of touchedFiles) {
                if (!fragments.has(fileName)) fail('REST_UPSTREAM_PREPARE_FRAGMENT_MISSING', fileName)
            }
            const manifest = prepareRestUpstreamStaging({
                stagingDir: opts.staging,
                repositoryRoot: REPOSITORY_ROOT,
                diff,
                diffMarkdown: renderDiffMarkdown(diff),
                specSha256,
                upstreamCommit: diff.upstreamPin,
                fragments,
                fragmentFiles: touchedFiles,
                rulesPath: opts.rules,
                titlesPath: opts.titles,
                ledgerPath: opts.ledger,
                lockPath: opts.lock,
            })
            console.log(`staged ${touchedFiles.length} fragment(s), ${drift.length} substantive drift entr(ies) -> ${opts.staging}`)
            console.log(`diff ${manifest.diffDigest}`)
            for (const file of manifest.files) console.log(`  ${file.path}`)
        })
}

// Decisions-first pipeline (2026-10-29): the decision stage takes stances on
// machine-generated candidates, and the assembler derives every structural
// byte of the change set from the diff and the fragment copies.
function registerCandidatesCommand(command) {
    command
        .description('Emit the machine-generated candidate list (one JSONL line per stanceable diff entry) for the decision stage')
        .requiredOption('--diff <path>', 'diff.json produced by rest-upstream-diff')
        .requiredOption('--out <file>', 'Candidates JSONL output path')
        .option('--fragment <name>', 'Restrict candidates to one fragment file (batch unit)', null)
        .action(opts => {
            const diff = JSON.parse(fs.readFileSync(opts.diff, 'utf8'))
            const lines = buildCandidateLines(diff, {fragmentFilter: opts.fragment})
            fs.mkdirSync(path.dirname(path.resolve(opts.out)), {recursive: true})
            fs.writeFileSync(opts.out, serializeCandidateLines(lines))
            console.log(`candidates ${lines.length} line(s)${opts.fragment ? ` for ${opts.fragment}` : ''} -> ${opts.out}`)
        })
}

function registerAssembleCommand(command) {
    command
        .description('Assemble the deterministic change set from decision stances (JSONL), the branch plan (optional), plus the diff and fragment copies')
        .requiredOption('--diff <path>', 'diff.json the decisions cite')
        .requiredOption('--decisions <file>', 'Decisions JSONL (one stance per line)')
        .requiredOption('--out <file>', 'Change set JSON output path')
        .option('--branch-plan <file>', 'Branch-placement plan JSON from the branch-plan stage', null)
        .option('--reports <file>', 'Human-review lists output path (prose drift, retirements, unplaced fields, pending confirmations)', null)
        .option('--fragments <dir>', 'Fragment copies the loci resolve against', DEFAULTS.fragments)
        .action(opts => {
            const diff = JSON.parse(fs.readFileSync(opts.diff, 'utf8'))
            const decisions = loadDecisions(opts.decisions)
            const branchPlan = opts.branchPlan ? parseBranchPlanFile(opts.branchPlan) : null
            const fragmentsDir = opts.fragments
            const fragmentCache = new Map()
            const fragmentLoader = fileName => {
                if (!fragmentCache.has(fileName)) {
                    const filePath = path.join(fragmentsDir, fileName)
                    if (!fs.existsSync(filePath)) fail('REST_UPSTREAM_ASSEMBLE_FRAGMENT_MISSING', filePath)
                    fragmentCache.set(fileName, JSON.parse(fs.readFileSync(filePath, 'utf8')))
                }
                return fragmentCache.get(fileName)
            }
            const {changeSet, reports} = assembleChangeSet({diffDocument: diff, decisions, fragmentLoader, branchPlan})
            fs.mkdirSync(path.dirname(path.resolve(opts.out)), {recursive: true})
            fs.writeFileSync(opts.out, serializeDocument(changeSet))
            if (opts.reports) fs.writeFileSync(opts.reports, serializeDocument(reports))
            const stances = decisions.reduce((counts, decision) => ({...counts, [decision.action]: (counts[decision.action] || 0) + 1}), {})
            const tally = Object.entries(stances).sort(([left], [right]) => left.localeCompare(right)).map(([action, count]) => `${action}=${count}`).join(', ')
            console.log(`assembled ${changeSet.entries.length} entr(ies) from ${decisions.length} decision(s) (${tally}); `
                + `auto lanes: ${reports.placementsApplied.length} placed, ${reports.unplaced.length} unplaced, ${reports.pendingConfirmation.length} pending confirmation; `
                + `reports: ${reports.descriptionDrift.length} prose, ${reports.deletions.length} retirement(s) -> ${opts.out}`)
        })
}

function registerAccountingCommand(command) {
    command
        .description('Ledger accounting for the upstream operation surface (T4): every upstream-added operation must carry a ledger decision')
        .requiredOption('--diff <path>', 'diff.json to account (digest-bound into the statement)')
        .option('--ledger <path>', 'Ledger file path', DEFAULTS.ledger)
        .option('--out <file>', 'Write the accounting statement JSON to this path')
        .option('--report-only', 'Exit 0 even when operations are unaccounted (inspection mode)', false)
        .action(opts => {
            const diff = JSON.parse(fs.readFileSync(opts.diff, 'utf8'))
            const ledger = loadRestUpstreamLedger(opts.ledger)
            const statement = accountUpstreamOperations({diff, ledger})
            if (opts.out) {
                fs.mkdirSync(path.dirname(path.resolve(opts.out)), {recursive: true})
                fs.writeFileSync(opts.out, serializeDocument(statement))
            }
            console.log(`accounting ${statement.source} @ ${statement.upstreamPin}: ${statement.summary.upstreamAdded} upstream-added, ${statement.summary.ledgered} ledgered, ${statement.summary.unaccounted} unaccounted`)
            for (const opKey of statement.unaccountedOpKeys) console.log(`  unaccounted: ${opKey}`)
            if (!opts.reportOnly) assertAccountingComplete(statement)
        })
}

function registerMigrationCommand(command) {
    command
        .description('Gate the fragment-migration bookkeeping and the canonical transition (always: consistency; with --canonical-ready: collection + T4 accounting)')
        .option('--migration <path>', 'fragment-migration.json path', DEFAULTS.migration)
        .option('--fragments <dir>', 'Fragment directory the migration classifies', DEFAULTS.fragments)
        .option('--canonical-ready', 'Also gate the canonical transition', false)
        .option('--collection <dir>', 'Candidate canonical collection directory (manifest + fragment copies)')
        .option('--diff <path>', 'diff.json proving the upstream accounting for the canonical surface')
        .option('--ledger <path>', 'Ledger file path', DEFAULTS.ledger)
        .option('--lock <path>', 'Lock file path (binds the accounting diff to the canonical surface source)', DEFAULTS.lock)
        .action(opts => {
            const migration = loadRestFragmentMigration(opts.migration)
            assertMigrationConsistency({migration, fragmentsDir: opts.fragments})
            const states = {}
            for (const fragment of migration.fragments) states[fragment.migrationState] = (states[fragment.migrationState] || 0) + 1
            console.log(`migration ${migration.fragments.length} fragment(s): ${Object.entries(states).sort().map(([state, count]) => `${state}=${count}`).join(', ')}`)
            if (!opts.canonicalReady) return
            if (!opts.collection || !opts.diff) {
                fail('REST_UPSTREAM_MIGRATION_INPUTS_REQUIRED', '--canonical-ready needs --collection and --diff')
            }
            const diff = JSON.parse(fs.readFileSync(opts.diff, 'utf8'))
            const ledger = loadRestUpstreamLedger(opts.ledger)
            // Bind the accounting diff to the lock's source for the canonical
            // surface: a completed diff from any other source proves nothing.
            const canonicalSurfaces = new Set(migration.fragments.filter(fragment => fragment.migrationState === 'canonical').map(fragment => fragment.apiSurface))
            const lock = loadRestUpstreamLock(opts.lock)
            const expectedSourceId = lock.sources.find(source => canonicalSurfaces.has(source.apiSurface))?.id
            if (!expectedSourceId) fail('REST_UPSTREAM_MIGRATION_SOURCE_UNKNOWN', `the lock has no source for canonical surface(s) ${[...canonicalSurfaces].sort().join(', ')}`)
            const collection = assertCanonicalReady({migration, fragmentsDir: opts.fragments, collectionDir: opts.collection, diff, ledger, expectedSourceId})
            console.log(`canonical-ready: collection ${collection.manifest.collectionId} (${collection.manifest.apiSurface}) loads, canonical fragments covered, accounting complete`)
        })
}

function registerUpstreamCommands(cli) {
    registerLockCommand(cli.command('rest-upstream-lock'))
    registerFormatCommand(cli.command('rest-upstream-format'))
    registerDiffCommand(cli.command('rest-upstream-diff'))
    registerApplyCommand(cli.command('rest-upstream-apply'))
    registerLedgerBootstrapCommand(cli.command('rest-upstream-ledger-bootstrap'))
    registerPrepareCommand(cli.command('rest-upstream-prepare'))
    registerAccountingCommand(cli.command('rest-upstream-accounting'))
    registerMigrationCommand(cli.command('rest-upstream-migration'))
    registerCandidatesCommand(cli.command('rest-upstream-candidates'))
    registerAssembleCommand(cli.command('rest-upstream-assemble'))
}

const UPSTREAM_COMMANDS = new Set(['rest-upstream-lock', 'rest-upstream-format', 'rest-upstream-diff', 'rest-upstream-apply', 'rest-upstream-ledger-bootstrap', 'rest-upstream-prepare', 'rest-upstream-accounting', 'rest-upstream-migration', 'rest-upstream-candidates', 'rest-upstream-assemble'])

module.exports = {registerUpstreamCommands, renderDiffMarkdown, loadSpecFile, loadRuleset, loadFragmentSurfaces, computeUpstreamDiff, substantiveDriftEntries, UPSTREAM_COMMANDS, DEFAULTS, REPOSITORY_ROOT}
