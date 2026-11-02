// Availability runner: HTTP call layer, verdict recorder, and matrix writer.
// Verdict taxonomy (stable across environments; consumed by the
// availability-matrix comparisons in the REST availability program):
//   PASS-EFFECT      accepted and the observable effect was verified
//   PASS             accepted (no effect assertion)
//   RECORDED         observation-only case, request accepted
//   REJECTED(record) observation-only case, request rejected
//   REJECTED         expected rejection (contract holds)
//   NO-EFFECT        accepted but the asserted effect did not materialize
//   FAIL             expected acceptance, request rejected
"use strict";

const fs = require('node:fs');
const path = require('node:path');

const MARKS = {
  'PASS-EFFECT': '✓', PASS: '✓', RECORDED: '·', 'REJECTED(record)': '·',
  REJECTED: '·', FAIL: '✗', 'NO-EFFECT': '⚠',
};

function makeCall({base, fetchImpl = fetch, now = () => Date.now(), headers = {}, v2Prefix = '/v2/vectordb'}) {
  const v2 = base.replace(/\/+$/, '') + v2Prefix;
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  return async function call(opPath, body, opts = {}) {
    const rateLimitRetries = opts.rateLimitRetries ?? 5;
    let http = 0, json = null, err = null;
    for (let attempt = 0; ; attempt++) {
      err = null; json = null;
      try {
        const r = await fetchImpl(v2 + opPath, {
          method: opts.method || 'POST',
          headers: {'Content-Type': 'application/json', ...headers, ...(opts.headers || {})},
          body: opts.method === 'GET' && body === undefined ? undefined : JSON.stringify(body ?? {}),
        });
        http = r.status;
        json = await r.json().catch(() => null);
      } catch (e) {
        err = String((e && e.message) || e);
      }
      const msg = json ? String(json.message ?? json.msg ?? '') : '';
      const throttled = /rate limit exceeded|RateLimiter/i.test(msg);
      if (!throttled || attempt >= rateLimitRetries) break;
      await sleep(Math.min(1000 * 2 ** attempt, 15000));
    }
    const code = json ? json.code : undefined;
    const msg = json ? (json.message ?? json.msg ?? '') : (err || `http ${http}`);
    return {http, code, msg, data: json ? json.data : undefined, json};
  };
}

function makeRecorder({label, retries = 3, retryDelayMs = 500, sleep = (ms) => new Promise((r) => setTimeout(r, ms)), log = console.log}) {
  const results = [];
  let seq = 0;

  async function rec(op, param, intent, expect, res, effect) {
    if (typeof effect === 'function') {
      const fn = effect;
      try {
        effect = await fn();
        for (let t = 0; t < retries && !effect.ok; t++) {
          await sleep(retryDelayMs);
          effect = await fn();
        }
      } catch (e) {
        effect = {ok: false, detail: 'effect-error: ' + ((e && e.message) || e)};
      }
    }
    const id = `C${String(++seq).padStart(3, '0')}`;
    let verdict;
    if (expect === 'err') {
      // A numeric non-zero code or an HTTP >= 400 status is a server
      // rejection (contract holds); http 0 with no code is a transport
      // failure, which proves nothing about the contract.
      const rejected = (typeof res.code === 'number' && res.code !== 0) || res.http >= 400;
      verdict = rejected ? 'REJECTED' : 'FAIL';
    } else if (expect === 'ok' || expect === 'record') {
      if (res.code === 0) {
        verdict = effect ? (effect.ok ? 'PASS-EFFECT' : 'NO-EFFECT') : (expect === 'record' ? 'RECORDED' : 'PASS');
      } else {
        verdict = expect === 'record' ? 'REJECTED(record)' : 'FAIL';
      }
    } else {
      verdict = '??';
    }
    results.push({
      id, op, param, intent, expect, verdict,
      code: res.code, msg: String(res.msg || '').slice(0, 220),
      effect: effect ? effect.detail : undefined,
    });
    const mark = MARKS[verdict] || '?';
    const showMsg = verdict !== 'PASS' && verdict !== 'PASS-EFFECT';
    log(`${mark} ${id} ${op} :: ${param} — ${verdict}${effect && effect.detail ? ' | ' + effect.detail : ''}${showMsg ? ' | ' + String(res.msg || '').slice(0, 170) : ''}`);
    return verdict;
  }

  return {rec, results};
}

function summarize(results) {
  const counts = {};
  for (const r of results) counts[r.verdict] = (counts[r.verdict] || 0) + 1;
  return counts;
}

function writeMatrix({outDir, label, base, results, durationMs, startedAt}) {
  fs.mkdirSync(outDir, {recursive: true});
  const file = path.join(outDir, `availability-${label}.json`);
  const matrix = {
    schemaVersion: '1.0',
    label, base, startedAt, durationMs,
    counts: summarize(results),
    results,
  };
  fs.writeFileSync(file, JSON.stringify(matrix, null, 2) + '\n');
  return file;
}

async function runSuite({suite, base, label, outDir, fetchImpl, headers = {}, v2Prefix = '/v2/vectordb', now = () => new Date().toISOString(), log = console.log}) {
  const startedAt = now();
  const t0 = Date.now();
  const call = makeCall({base, fetchImpl, headers, v2Prefix});
  const {rec, results} = makeRecorder({label, log});
  const api = {call, rec, sleep: (ms) => new Promise((r) => setTimeout(r, ms))};
  await suite(api);
  const file = writeMatrix({outDir, label, base, results, durationMs: Date.now() - t0, startedAt});
  log(`\n===== ${label} SUMMARY =====`);
  log(JSON.stringify(summarize(results), null, 1));
  log(`matrix written: ${file}`);
  return {file, results, counts: summarize(results)};
}

module.exports = {makeCall, makeRecorder, summarize, writeMatrix, runSuite, MARKS};
