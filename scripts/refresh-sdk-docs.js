#!/usr/bin/env node
// Local Feishu refresh for one SDK reference manual: pulls the manual into
// the working tree, then lands the result as a single signed commit on a
// dedicated branch. There is no CI trigger for this — the PR is opened
// manually (or with --pr, via gh), and nothing publishes until it merges.
//
//   node refresh-sdk-docs.js --sdk pymilvus --version v3.0.x
//   node refresh-sdk-docs.js --sdk go --version v2.6.x --doc "Database" --recursive
//   node refresh-sdk-docs.js --manual pymilvus-v2.6.x
//
// Feishu credentials come from the repository-root .env (FEISHU_HOST,
// APP_ID, APP_SECRET, IMAGE_BED_URL), which lark-docs/index.js loads.
const path = require('node:path')
const os = require('node:os')
const fs = require('node:fs')
const { spawnSync } = require('node:child_process')
const { program } = require('commander')

const SCRIPTS_DIR = __dirname
const REPO_ROOT = path.resolve(SCRIPTS_DIR, '..')

program
    .name('refresh-sdk-docs')
    .description('Fetch one SDK reference manual from Feishu and commit it on a feishu/* branch')
    .option('--sdk <sdk>', 'SDK manual prefix: pymilvus, java, node, go, cpp')
    .option('--version <version>', 'Version line, e.g. v3.0.x', 'v3.0.x')
    .option('--manual <manual>', 'Full manual name from config.json (overrides --sdk/--version)')
    .option('-d, --doc <doc>', 'Publish a single document by title instead of the whole manual')
    .option('-o, --output <output>', 'Output path relative to the manual outputDir (with --doc)')
    .option('-r, --recursive', 'With --doc: publish all child documents under it')
    .option('--download-images', 'Download images instead of keeping existing links (--skipImageDown is the default)')
    .option('--pr', 'After committing, push the branch and open a PR via gh')
    .action((opts) => {
        const config = JSON.parse(fs.readFileSync(path.join(SCRIPTS_DIR, 'config.json'), 'utf-8'))
        const manual = opts.manual || `${opts.sdk}-${opts.version}`
        if (!config.milvus?.manuals?.[manual]) {
            console.error(`Manual "${manual}" not found. Available: ${Object.keys(config.milvus.manuals).join(', ')}`)
            process.exit(1)
        }
        if (opts.output && !opts.doc) {
            console.error('--output requires --doc')
            process.exit(1)
        }

        if (!/-v\d/.test(manual)) {
            console.error(`"${manual}" does not look like an SDK manual (expected <sdk>-v<major>.<minor>.x)`)
            process.exit(1)
        }

        const startBranch = run('git', ['branch', '--show-current'], { capture: true }).stdout.trim()
        if (startBranch !== 'master') {
            console.error(`Must run from master (currently on "${startBranch}") — the PR base is master.`)
            process.exit(1)
        }
        const status = run('git', ['status', '--porcelain'], { capture: true })
        if (status.stdout.trim()) {
            console.error('Working tree is not clean — commit or stash first:\n' + status.stdout)
            process.exit(1)
        }

        console.log(`Fetching ${manual} from Feishu...`)
        const fetchArgs = ['lark-docs/index.js', '-c', 'config.json', '-m', manual]
        if (opts.doc) {
            fetchArgs.push('-d', opts.doc)
            if (opts.recursive) fetchArgs.push('--recursive')
            if (opts.output) fetchArgs.push('-o', opts.output)
        } else {
            fetchArgs.push('--all')
        }
        if (!opts.downloadImages) fetchArgs.push('--skipImageDown')
        run('node', fetchArgs, { cwd: SCRIPTS_DIR })

        const [sdk, version] = manual.replace(/-v(\d)/, ' v$1').split(' ')
        const branch = `feishu/${sdk}-${version}-${new Date().toISOString().slice(0, 10)}`
        run('git', ['checkout', '-b', branch])

        run('git', ['add', 'API_Reference/', 'scripts/config.json'])
        const staged = run('git', ['diff', '--cached', '--name-only'], { capture: true })
        if (!staged.stdout.trim()) {
            console.log('No changes against master — nothing to publish.')
            run('git', ['checkout', startBranch])
            run('git', ['branch', '-D', branch])
            return
        }

        const changedFiles = staged.stdout.trim().split('\n')
        run('git', [
            'commit', '-sm',
            `Update ${sdk} reference docs (${version})\n\n` +
            `Refreshed from Feishu manual ${manual}.\n\n` +
            changedFiles.map((file) => `  ${file}`).join('\n'),
        ])

        console.log(`\nCommitted ${changedFiles.length} file(s) on ${branch}.`)
        if (opts.pr) {
            const bodyFile = path.join(os.tmpdir(), `refresh-sdk-docs-pr-body-${Date.now()}.md`)
            fs.writeFileSync(bodyFile, prBody(manual, opts, changedFiles))
            run('git', ['push', '-u', 'origin', branch])
            run('gh', ['pr', 'create', '--title', `Update ${sdk} reference docs (${version})`, '--body-file', bodyFile, '--base', 'master', '--head', branch])
            fs.rmSync(bodyFile, { force: true })
        } else {
            console.log('Review the commit, then open the PR manually:\n')
            console.log(`  git push -u origin ${branch}`)
            console.log(`  gh pr create --title "Update ${sdk} reference docs (${version})" --base master --head ${branch}`)
        }
    })

function prBody(manual, opts, changedFiles) {
    const lines = [
        `On-demand Feishu refresh of manual \`${manual}\`, pulled locally via \`scripts/refresh-sdk-docs.js\`.`,
        '',
    ]
    if (opts.doc) lines.push(`Scope: \`${opts.doc}\`${opts.recursive ? ' (recursive)' : ''}`, '')
    lines.push('<details><summary>Changed files</summary>', '', '```', ...changedFiles, '```', '</details>')
    return lines.join('\n')
}

function run(cmd, args, opts = {}) {
    const res = spawnSync(cmd, args, {
        cwd: opts.cwd || REPO_ROOT,
        encoding: 'utf8',
        stdio: opts.capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
    })
    if (res.status !== 0) {
        const detail = (res.stderr || res.stdout || '').trim() || `exit code ${res.status}`
        console.error(`\n${cmd} ${args.join(' ')} failed:\n${detail}`)
        process.exit(1)
    }
    return res
}

program.parse()
