// CLI registration for the REST availability runner. Live targets only:
// point --base at a Milvus REST v2 endpoint (default http://127.0.0.1:19530,
// the port-forward used by the milvus-cell vCluster flow). The suite creates
// and drops its own fixtures; the target environment must be disposable.
"use strict";

const fs = require('node:fs');
const path = require('node:path');
const {runSuite} = require('./runner');
const {runDataPlaneSuite} = require('./suite');
const {buildZillizControlPlaneSuite} = require('./zillizControlPlaneSuite');
const {derivePriors} = require('./zillizPriors');

const AVAILABILITY_COMMANDS = ['rest-availability', 'rest-availability-zilliz', 'rest-zilliz-priors'];

// The zilliz gateway authenticates clients by TLS fingerprint and rejects
// Node's TLS stack with 401 while curl passes, so zilliz probes ride a
// curl-backed fetch implementation. Credentials travel through a 0600 curl
// config file, never argv.
function buildCurlFetch({spawnImpl} = {}) {
  return async function curlFetch(url, init = {}) {
    const os = require('node:os');
    const fsMod = require('node:fs');
    const cfg = fsMod.mkdtempSync(require('node:path').join(os.tmpdir(), 'zcurl-')) + '/cfg';
    const lines = [`url = "${url.replace(/"/g, '\\"')}"`, `request = "${init.method || 'GET'}"`];
    for (const [k, v] of Object.entries(init.headers || {})) lines.push(`header = "${k}: ${v.replace(/"/g, '\\"')}"`);
    if (init.body !== undefined) lines.push(`data-binary = @-`);
    lines.push('silent', 'show-error', 'write-out = \\n%{http_code}');
    fsMod.writeFileSync(cfg, lines.join('\n') + '\n', {mode: 0o600});
    try {
      const {spawnSync: run} = require('node:child_process');
      const r = run('curl', ['-K', cfg], {input: init.body === undefined ? undefined : String(init.body), encoding: 'utf8', maxBuffer: 16 * 1024 * 1024});
      if (r.status !== 0 && !r.stdout.length) throw new Error(`curl exited ${r.status}: ${r.stderr.toString().slice(0, 200)}`);
      const out = r.stdout.toString();
      const idx = out.lastIndexOf('\n');
      const status = parseInt(out.slice(idx + 1).trim(), 10) || 0;
      const bodyText = out.slice(0, idx);
      return {
        status,
        json: async () => { try { return JSON.parse(bodyText); } catch { return null; } },
      };
    } finally {
      fsMod.rmSync(require('node:path').dirname(cfg), {recursive: true, force: true});
    }
  };
}

function loadZillizEnv(repoRoot) {
  const wanted = /^ZILLIZ_(UAT3|PROD)_(API_KEY|CONTROL_PLANE|PROJECT)$/;
  const out = {};
  let envPath = null;
  for (let dir = repoRoot; dir !== path.dirname(dir); dir = path.dirname(dir)) {
    const candidate = path.join(dir, '.env');
    if (fs.existsSync(candidate)) { envPath = candidate; break; }
  }
  if (!envPath) return out;
  for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && wanted.test(m[1])) out[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return out;
}

function registerAvailabilityCommand(command) {
  command
    .description('Run the data-plane REST v2 parameter availability suite against a live endpoint')
    .requiredOption('--base <url>', 'REST v2 base URL, e.g. http://127.0.0.1:19530')
    .requiredOption('--label <label>', 'Matrix label, e.g. milvus-3.0.5')
    .option('--out <dir>', 'Output directory for the availability matrix', 'tmp/rest-availability')
    .option('--zilliz <env>', 'Authenticate against a zilliz cluster endpoint: uat3 | prod (Bearer from .env, curl transport)')
    .action(async (opts) => {
      const {runDataPlaneSuite: suite} = require('./suite');
      let fetchImpl;
      let headers = {};
      if (opts.zilliz) {
        const root = path.resolve(__dirname, '..', '..', '..', '..', '..');
        const env = loadZillizEnv(root);
        const prefix = opts.zilliz === 'prod' ? 'ZILLIZ_PROD' : 'ZILLIZ_UAT3';
        const key = env[`${prefix}_API_KEY`];
        if (!key) throw new Error(`missing ${prefix}_API_KEY in .env`);
        headers = {Authorization: `Bearer ${process.env.ZILLIZ_DP_TOKEN || key}`};
        fetchImpl = buildCurlFetch();
      }
      const r = await runSuite({suite, base: opts.base, label: opts.label, outDir: opts.out, fetchImpl, headers});
      const bad = (r.counts.FAIL || 0) + (r.counts['NO-EFFECT'] || 0);
      if (bad > 0) {
        console.error(`${bad} case(s) failed or had no effect; inspect ${r.file}`);
        process.exitCode = 1;
      }
    });
}

function registerZillizCommand(command) {
  command
    .description('Read-only zilliz control-plane availability probes (UAT3/prod) and prior derivation')
    .requiredOption('--env <name>', 'Environment key from .env: uat3 | prod')
    .option('--project <projectId>', 'Project id for project-scoped probes')
    .option('--out <dir>', 'Output directory for the availability matrix', 'tmp/rest-availability')
    .action(async (opts) => {
      const root = path.resolve(__dirname, '..', '..', '..', '..', '..');
      const env = loadZillizEnv(root);
      const prefix = opts.env === 'prod' ? 'ZILLIZ_PROD' : 'ZILLIZ_UAT3';
      const base = env[`${prefix}_CONTROL_PLANE`];
      const key = env[`${prefix}_API_KEY`];
      if (!base || !key) throw new Error(`missing ${prefix}_CONTROL_PLANE / ${prefix}_API_KEY in .env`);
      const suite = buildZillizControlPlaneSuite({projectId: opts.project || env[`${prefix}_PROJECT`]});
      const r = await runSuite({
        suite, base, label: `zilliz-${opts.env}-control-plane-ro`, outDir: opts.out,
        fetchImpl: buildCurlFetch(),
        headers: {Authorization: `Bearer ${key}`}, v2Prefix: '',
        log: console.log,
      });
      const bad = (r.counts.FAIL || 0) + (r.counts['NO-EFFECT'] || 0);
      if (bad > 0) process.exitCode = 1;
    });
}

function registerPriorsCommand(command) {
  command
    .description('Derive the static zilliz availability prior matrix from fragments, the zilliz-cloud spec, and the release-notes survey')
    .option('--fragments <dir>', 'Fragments directory', path.resolve(__dirname, '..', 'meta', 'openapi'))
    .option('--zilliz-spec <file>', 'zilliz-cloud openapi.yaml (JSON) path')
    .option('--out <file>', 'Output JSON path', 'tmp/rest-availability/zilliz-priors.json')
    .action(async (opts) => {
      const rows = derivePriors({fragmentsDir: opts.fragments, zillizSpecPath: opts.zillizSpec});
      fs.mkdirSync(path.dirname(opts.out), {recursive: true});
      const counts = {};
      rows.forEach((r) => { counts[r.priorTier] = (counts[r.priorTier] || 0) + 1; });
      fs.writeFileSync(opts.out, JSON.stringify({schemaVersion: '1.0', generatedAt: new Date().toISOString(), counts, rows}, null, 2) + '\n');
      console.log(`priors written: ${opts.out}`);
      console.log(JSON.stringify(counts, null, 1));
    });
}

module.exports = {registerAvailabilityCommand, registerZillizCommand, registerPriorsCommand, AVAILABILITY_COMMANDS, runDataPlaneSuite, buildCurlFetch, loadZillizEnv};

if (require.main === module) {
  const {Command} = require('commander');
  const program = new Command();
  registerAvailabilityCommand(program.command('rest-availability'));
  registerZillizCommand(program.command('rest-availability-zilliz'));
  registerPriorsCommand(program.command('rest-zilliz-priors'));
  program.parseAsync(process.argv).catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
