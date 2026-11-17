const test = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const {
  lintRestContract,
  scanDirectory,
  WHITELIST_SNAKE_CASE_KEYS,
  FORBIDDEN_ENVELOPE_KEYS,
  sanitizeJsonString
} = require('../check-rest-v2-contract');

test('catches forbidden auto_id in REST request schema (mmap.md #3800 regression test)', () => {
  const markdown = `
\`\`\`bash
curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \\
--header "Authorization: Bearer \${TOKEN}" \\
-d '{
    "collectionName": "my_collection",
    "schema": {
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true,
                "auto_id": false
            }
        ]
    }
}'
\`\`\`
`;

  const violations = lintRestContract('test-mmap.md', markdown);
  assert.equal(violations.length, 1);
  assert.equal(violations[0].key, 'auto_id');
  assert.equal(violations[0].expected, 'autoId');
  assert.match(violations[0].reason, /Forbidden snake_case REST wire key/);
});

test('catches forbidden field_id, field_name, sub_groups in aggregation response (search-aggregation.md #3801 regression test)', () => {
  const markdown = `
<details>
<summary>Aggregation response</summary>

\`\`\`json
{
  "code": 0,
  "data": [
    {
      "buckets": [
        {
          "field_id": 100,
          "field_name": "category",
          "sub_groups": []
        }
      ]
    }
  ]
}
\`\`\`
</details>
`;

  const violations = lintRestContract('test-agg.md', markdown);
  assert.equal(violations.length, 3);
  const keys = violations.map((v) => v.key).sort();
  assert.deepEqual(keys, ['field_id', 'field_name', 'sub_groups']);
});

test('catches forbidden collection_name and db_name in top-level request envelope', () => {
  const markdown = `
\`\`\`bash
curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/collections/describe" \\
-d '{
    "collection_name": "test_coll",
    "db_name": "default"
}'
\`\`\`
`;

  const violations = lintRestContract('test-coll.md', markdown);
  assert.equal(violations.length, 2);
  const keys = violations.map((v) => v.key).sort();
  assert.deepEqual(keys, ['collection_name', 'db_name']);
});

test('allows valid whitelisted parameter keys in params bags', () => {
  const markdown = `
\`\`\`bash
curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \\
-d '{
    "collectionName": "custom_params_collection",
    "params": {
        "mmap.enabled": true,
        "index_type": "HNSW",
        "metric_type": "COSINE",
        "dim": 128,
        "max_length": 512,
        "drop_ratio_search": 0.2
    }
}'
\`\`\`
`;

  const violations = lintRestContract('test-params.md', markdown);
  assert.equal(violations.length, 0);
});

test('allows arbitrary user column names in insert data arrays and aggregation metrics', () => {
  const markdown = `
\`\`\`bash
export data='[
    {"id": 1, "my_vector": [0.1, 0.2], "user_score": 95, "binary_vector": "2So="}
]'

curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \\
-d '{
    "collectionName": "my_collection",
    "data": [
        {"id": 2, "dense_vector": [0.3, 0.4], "doc_id": 100}
    ]
}'
\`\`\`

<details>
\`\`\`json
{
  "code": 0,
  "data": [
    {
      "buckets": [
        {
          "groupKey": "shoes",
          "product_count": 42,
          "avg_price": 89.9
        }
      ]
    }
  ]
}
\`\`\`
</details>
`;

  const violations = lintRestContract('test-data.md', markdown);
  assert.equal(violations.length, 0);
});

test('sanitizes bash variables and template tokens without parsing errors', () => {
  const markdown = `
\`\`\`bash
curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \\
--header "Authorization: Bearer \${TOKEN}" \\
-d '{
    "collectionName": "{{var.collection_name}}",
    "schema": $schema,
    "params": {
        "dim": 768
    }
}'
\`\`\`
`;

  const violations = lintRestContract('test-sanitization.md', markdown);
  assert.equal(violations.length, 0);
});

test('handles escaped double quotes, heredocs, and variable assignments in curl requests', () => {
  const markdown = `
\`\`\`bash
# 1. Escaped double quotes
curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/collections/describe" \\
-d "{\\"collectionName\\": \\"test_coll\\"}"

# 2. Heredoc payload
curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \\
-d @- <<'EOF'
{
    "collectionName": "heredoc_coll"
}
EOF

# 3. Unexported variable assignment
requestPayload='{
    "collectionName": "var_coll"
}'
curl --request POST \\
--url "\${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \\
-d "$requestPayload"
\`\`\`
`;

  const violations = lintRestContract('test-advanced-payloads.md', markdown);
  assert.equal(violations.length, 0);
});

test('sanitizeJsonString successfully preserves embedded URLs and handles env vars in quotes without double-quoting', () => {
  const jsonWithEnvAndUrl = `{
    "collectionName": "\${COLLECTION_NAME}",
    "uri": "https://s3.amazonaws.com/bucket/path",
    "backupUrl": "http://127.0.0.1:9000/minio"
  }`;

  const sanitized = sanitizeJsonString(jsonWithEnvAndUrl);
  const parsed = JSON.parse(sanitized);

  assert.equal(parsed.collectionName, 'dummy_env_var');
  assert.equal(parsed.uri, 'https://s3.amazonaws.com/bucket/path');
  assert.equal(parsed.backupUrl, 'http://127.0.0.1:9000/minio');
});

test('live scan on site/en confirms zero REST contract violations across all documentation', () => {
  const docsDir = path.resolve(__dirname, '../../site/en');
  const result = scanDirectory(docsDir);

  assert.ok(result.filesScanned > 500, `Expected >500 files, got ${result.filesScanned}`);
  assert.equal(result.violations.length, 0, `Expected 0 violations, found ${result.violations.length}`);
});
