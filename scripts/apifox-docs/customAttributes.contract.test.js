const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const docPath = path.join(__dirname, 'CUSTOM_ATTRIBUTES.md');

function readDoc() {
  return fs.readFileSync(docPath, 'utf8');
}

test('documents all three lifecycle attributes', () => {
  const doc = readDoc();
  for (const attribute of ['x-added-at', 'x-last-modified', 'x-deprecated-since']) {
    assert.match(doc, new RegExp(`\`${attribute}\``));
  }
});

test('documents the minor-track format and managed scopes', () => {
  const doc = readDoc();
  assert.match(doc, /major\.minor\.x|`[0-9]+\.[0-9]+\.x`/i);
  assert.match(doc, /operation/i);
  assert.match(doc, /contract-element|property|parameter/i);
});

test('documents audit-only x-last-modified and retained deprecation', () => {
  const doc = readDoc();
  assert.match(doc, /x-last-modified.*(?:never|does not).*(?:visibility|visible)|x-last-modified.*audit/i);
  assert.match(doc, /x-last-modified/i);
  assert.match(doc, /deprecated.*retain|retain.*deprecated|remains present/i);
  assert.match(doc, /x-removed-since.*out of scope|does not introduce `?x-removed-since`?|not.*x-removed-since/i);
});

test('documents latest and track publication policies', () => {
  const doc = readDoc();
  assert.match(doc, /latest/i);
  assert.match(doc, /track/i);
  assert.match(doc, /zilliz/i);
  assert.match(doc, /milvus/i);
  assert.match(doc, /api-version|api surface/i);
  assert.match(doc, /release-track|release track/i);
});

test('documents staged enforcement from audit to required', () => {
  const doc = readDoc();
  assert.match(doc, /audit-compatible|audit compatible/i);
  assert.match(doc, /bootstrap/i);
  assert.match(doc, /post-bootstrap|hard validation|required/i);
});
