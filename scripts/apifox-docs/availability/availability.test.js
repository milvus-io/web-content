// Hermetic tests for the availability runner: verdict mapping, effect retry,
// and matrix writing. The data-plane suite itself runs against live endpoints
// (operator-triggered); these tests pin the reusable machinery.
"use strict";

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const test = require('node:test');

const {makeCall, makeRecorder, summarize, writeMatrix, runSuite} = require('./runner');
const {runDataPlaneSuite} = require('./suite');

test('makeCall posts JSON to the v2 base and normalizes errors', async () => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push({url, init});
    return {status: 200, json: async () => ({code: 0, data: {ok: true}})};
  };
  const call = makeCall({base: 'http://unit.test:19530/', fetchImpl});
  const r = await call('/entities/get', {collectionName: 'x'});
  assert.equal(r.code, 0);
  assert.deepEqual(r.data, {ok: true});
  assert.equal(calls[0].url, 'http://unit.test:19530/v2/vectordb/entities/get');
  assert.equal(calls[0].init.method, 'POST');

  const failing = makeCall({base: 'http://unit.test', fetchImpl: async () => { throw new Error('boom'); }});
  const r2 = await failing('/x', {});
  assert.equal(r2.code, undefined);
  assert.match(r2.msg, /boom/);
});

test('rec maps expectations to the verdict taxonomy', async () => {
  const {rec, results} = makeRecorder({label: 't', log: () => {}});
  const ok = {code: 0, msg: '', data: {}};
  const err = {code: 1800, msg: 'nope'};

  assert.equal(await rec('op', 'p', 'accepted with effect', 'ok', ok, {ok: true, detail: 'd'}), 'PASS-EFFECT');
  assert.equal(await rec('op', 'p', 'accepted, broken effect', 'ok', ok, {ok: false, detail: 'd'}), 'NO-EFFECT');
  assert.equal(await rec('op', 'p', 'accepted, no assertion', 'ok', ok), 'PASS');
  assert.equal(await rec('op', 'p', 'expected rejection holds', 'err', err), 'REJECTED');
  assert.equal(await rec('op', 'p', 'http 404 without code is a rejection', 'err', {http: 404, code: undefined, msg: 'no route'}), 'REJECTED');
  assert.equal(await rec('op', 'p', 'transport failure proves nothing', 'err', {http: 0, code: undefined, msg: 'fetch failed'}), 'FAIL');
  assert.equal(await rec('op', 'p', 'expected rejection violated', 'err', ok), 'FAIL');
  assert.equal(await rec('op', 'p', 'observation accepted', 'record', ok), 'RECORDED');
  assert.equal(await rec('op', 'p', 'observation rejected', 'record', err), 'REJECTED(record)');
  assert.equal(results.length, 9);
  assert.deepEqual(summarize(results), {
    'PASS-EFFECT': 1, 'NO-EFFECT': 1, PASS: 1, REJECTED: 2, FAIL: 2, RECORDED: 1, 'REJECTED(record)': 1,
  });
});

test('rec retries failing effect functions before giving up', async () => {
  let attempts = 0;
  const {rec} = makeRecorder({label: 't', log: () => {}, retries: 2, retryDelayMs: 1});
  const verdict = await rec('op', 'p', 'eventually consistent effect', 'ok', {code: 0, msg: ''}, async () => {
    attempts += 1;
    return {ok: attempts >= 3, detail: `attempt ${attempts}`};
  });
  assert.equal(verdict, 'PASS-EFFECT');
  assert.equal(attempts, 3);
});

test('writeMatrix emits a deterministic matrix document', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'availability-'));
  const {results} = makeRecorder({label: 't', log: () => {}});
  const file = writeMatrix({outDir: dir, label: 'unit-1.0.x', base: 'http://unit.test', results, durationMs: 5, startedAt: '2026-11-01T00:00:00.000Z'});
  const doc = JSON.parse(fs.readFileSync(file, 'utf8'));
  assert.equal(doc.schemaVersion, '1.0');
  assert.equal(doc.label, 'unit-1.0.x');
  assert.equal(doc.counts.RECORDED || 0, results.length);
  assert.ok(Array.isArray(doc.results));
});

test('runSuite drives a suite through the injected call layer', async () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'availability-'));
  const suite = async (api) => {
    const r = await api.call('/ping', {});
    await api.rec('smoke', 'call+rec', 'wiring sanity', 'record', r);
  };
  const {file, counts} = await runSuite({
    suite, base: 'http://unit.test', label: 'smoke', outDir: dir,
    fetchImpl: async () => ({status: 200, json: async () => ({code: 0, data: []})}),
    log: () => {},
  });
  assert.equal(counts.RECORDED, 1);
  assert.ok(fs.existsSync(file));
});

test('data-plane suite module is runnable shape', () => {
  assert.equal(typeof runDataPlaneSuite, 'function');
});
