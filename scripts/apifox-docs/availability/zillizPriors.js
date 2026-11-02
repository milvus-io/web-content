// Zilliz availability priors: derive a machine-readable candidate matrix from
// static sources — fragment marks (x-beta, x-include-target), zilliz-cloud
// spec presence, and the release-notes tier survey
// (.claude/specs/2026-11-01-zilliz-release-notes-survey.md).
// Priors are candidates only; the live suites confirm or refute them and
// confirmed marks land through reviewed PRs.
"use strict";

const fs = require('node:fs');
const path = require('node:path');

// Release-notes-derived constraints (survey §2). clusterTypes use the
// x-zilliz-cluster-types taxonomy (zilliz-cloud-config manifests).
const RELEASE_NOTE_TIERS = [
  {
    match: {pathPrefix: '/v2/vectordb/collections/', ops: ['add_function', 'drop_function', 'add_function_field', 'drop_function_field', 'fields/drop', 'struct_fields/add']},
    tier: 'PUBLIC_PREVIEW',
    evidence: 'release-notes-2610: Milvus v3.0.x Public Preview, Dedicated clusters; fragments carry x-beta PUBLIC',
    clusterTypes: ['memory', 'disk', 'tiered'], // "Dedicated clusters" — serverless excluded; BYOC unstated in notes
  },
  {
    match: {ops: ['post /v2/vectordb/entities/advanced_search']},
    tier: 'NOT_AVAILABLE',
    evidence: 'master-only upstream route; ledger deferred, no released track',
  },
  {
    match: {ops: ['post /v2/vectordb/snapshots/create', 'post /v2/vectordb/snapshots/describe', 'post /v2/vectordb/snapshots/drop', 'post /v2/vectordb/snapshots/list', 'post /v2/vectordb/snapshots/pin', 'post /v2/vectordb/snapshots/restore', 'post /v2/vectordb/snapshots/unpin', 'post /v2/vectordb/jobs/snapshot/export', 'post /v2/vectordb/jobs/snapshot/export/describe', 'post /v2/vectordb/jobs/snapshot/list', 'post /v2/vectordb/jobs/snapshot/restore_external']},
    tier: 'ON_REQUEST',
    evidence: 'fragment 38 tag x-beta ON REQUEST; release-notes-2605 External Backfill (Private Preview) builds on Snapshot',
  },
  {
    match: {slug: 'extract'},
    tier: 'PRIVATE_PREVIEW',
    evidence: 'refGen betaOverrides slug rule (PRIVATE); ETL private tier',
  },
  {
    match: {slug: 'merge'},
    tier: 'PRIVATE_PREVIEW',
    evidence: 'release-notes-2180 Merge Data Private Preview; betaOverrides slug rule',
  },
  {
    match: {ops: ['post /v2/clusters/createOnDemandCluster', 'get /v2/clusters/onDemandClusters', 'get /v2/clusters/onDemandClusters/{CLUSTER_ID}', 'delete /v2/clusters/onDemandClusters/{CLUSTER_ID}']},
    tier: 'PUBLIC_PREVIEW',
    evidence: 'spec + fragments carry x-beta PUBLIC on the on-demand op set',
  },
];

function loadSpecPaths(specPath) {
  const raw = fs.readFileSync(specPath, 'utf8');
  const spec = JSON.parse(raw);
  const paths = new Set();
  for (const [p, item] of Object.entries(spec.paths || {})) {
    for (const m of Object.keys(item || {})) paths.add(`${m.toLowerCase()} ${p}`);
  }
  return paths;
}

function derivePriors({fragmentsDir, zillizSpecPath}) {
  const specPaths = zillizSpecPath ? loadSpecPaths(zillizSpecPath) : new Set();
  const rows = [];
  for (const file of fs.readdirSync(fragmentsDir).filter((f) => f.endsWith('.json')).sort()) {
    const doc = JSON.parse(fs.readFileSync(path.join(fragmentsDir, file), 'utf8'));
    for (const [p, item] of Object.entries(doc.paths || {})) {
      for (const [m, op] of Object.entries(item || {})) {
        if (!op || typeof op !== 'object' || !op.summary) continue;
        const opKey = `${m.toLowerCase()} ${p}`;
        const includeTarget = op['x-include-target'];
        const milvusOnly = Array.isArray(includeTarget) && includeTarget.includes('milvus') && !includeTarget.includes('zilliz');
        const zillizOnly = Array.isArray(includeTarget) && includeTarget.includes('zilliz') && !includeTarget.includes('milvus');
        const beta = op['x-beta'];

        let priorTier = 'GA';
        const evidence = [];
        if (milvusOnly) {
          priorTier = 'NOT_AVAILABLE';
          evidence.push('fragment x-include-target milvus-only');
        } else {
          if (beta === 'PUBLIC') { priorTier = 'PUBLIC_PREVIEW'; evidence.push('fragment x-beta PUBLIC'); }
          else if (beta === 'PRIVATE') { priorTier = 'PRIVATE_PREVIEW'; evidence.push('fragment x-beta PRIVATE'); }
          else if (beta === 'ON REQUEST') { priorTier = 'ON_REQUEST'; evidence.push('fragment x-beta ON REQUEST'); }
          if (specPaths.size && !p.startsWith('/v2/vectordb/')) {
            // The cloud-control-api spec describes the control plane only;
            // /v2/vectordb/* is served per-cluster and never appears there.
            const inSpec = specPaths.has(opKey);
            evidence.push(inSpec ? 'present in zilliz-cloud spec' : 'absent from zilliz-cloud spec');
            if (!inSpec && priorTier === 'GA') { priorTier = 'CANDIDATE_NOT_IN_SPEC'; }
          }
        }
        let clusterTypes;
        for (const rule of RELEASE_NOTE_TIERS) {
          const slug = op.summary ? op.summary.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '';
          const hit = (rule.match.ops && rule.match.ops.includes(opKey))
            || (rule.match.slug && (slug === rule.match.slug || slug.includes(rule.match.slug)));
          if (hit) {
            priorTier = milvusOnly ? 'NOT_AVAILABLE' : rule.tier;
            evidence.push(rule.evidence);
            if (rule.clusterTypes) clusterTypes = rule.clusterTypes;
            break;
          }
        }
        rows.push({opKey, fragment: file, summary: op.summary, milvusOnly, zillizOnly, fragmentBeta: beta ?? null, priorTier, clusterTypes, evidence});
      }
    }
  }
  return rows;
}

module.exports = {derivePriors, RELEASE_NOTE_TIERS};
