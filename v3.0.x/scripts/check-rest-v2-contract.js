#!/usr/bin/env node

/**
 * check-rest-v2-contract.js
 *
 * Contract linter for Milvus Guides REST v2 request and response examples.
 * Verifies that REST v2 examples conform to the canonical camelCase wire format
 * and flags invalid snake_case keys (such as auto_id, field_id, field_name, sub_groups),
 * while honoring the approved whitelist for index/vector/storage parameters and user data fields.
 *
 * Implements proposal in milvus-io/milvus-docs#3796.
 */

const fs = require('node:fs');
const path = require('node:path');

// Approved whitelist of valid snake_case keys in parameters or storage configs
// (as catalogued in #3796 by maintainers)
const WHITELIST_SNAKE_CASE_KEYS = new Set([
  // Index, analyzer & search parameters
  'max_length',
  'max_capacity',
  'dim',
  'index_type',
  'metric_type',
  'nlist',
  'efConstruction',
  'drop_ratio_search',
  'mmap.enabled',
  'chunk_size_mb',
  'mmap.chunk_size_mb',
  'radius',
  'range_filter',
  'nprobe',
  'ef',
  'round_decimal',
  'group_size',
  'strict_group_size',
  'level',
  'warmup',
  'index_name',
  'json_path',
  'json_cast_type',
  'min_gram',
  'max_gram',
  'allow_insert_auto_id',
  'ttl_field',
  'boost_mode',
  'function_mode',
  'analyzer_name',
  'element_scope',

  // External collection storage parameters
  'access_key_id',
  'access_key_value',
  'cloud_provider',
  'use_ssl',
  'use_iam',
  'use_virtual_host',
  'snapshot_id'
]);

// Canonical forbidden snake_case keys on REST wire format and their camelCase replacements
const FORBIDDEN_ENVELOPE_KEYS = {
  auto_id: 'autoId',
  field_id: 'fieldId',
  field_name: 'fieldName',
  sub_groups: 'subGroups',
  collection_name: 'collectionName',
  db_name: 'dbName',
  grantor_name: 'grantorName',
  role_name: 'roleName',
  is_primary: 'isPrimary',
  data_type: 'dataType',
  element_type: 'elementType',
  output_fields: 'outputFields',
  consistency_level: 'consistencyLevel',
  partition_name: 'partitionName',
  partition_names: 'partitionNames',
  segment_id: 'segmentId',
  segment_ids: 'segmentIds',
  channel_name: 'channelName',
  collection_id: 'collectionId',
  schema_name: 'schemaName'
};

const SNAKE_CASE_REGEX = /^[a-z]+(_[a-z0-9]+)+$/;

/**
 * Determine if the path represents user-defined record columns, aggregation buckets or hits
 * where column names/aliases can be arbitrary user-defined identifiers.
 */
function isUserDataPath(pathContext, isArrayAtRoot = false) {
  if (isArrayAtRoot) return true;
  if (!pathContext) return false;
  return (
    pathContext === 'data' ||
    pathContext.startsWith('data.') ||
    pathContext.startsWith('data[') ||
    pathContext.includes('.data[') ||
    pathContext.includes('.data.') ||
    pathContext.includes('entities') ||
    pathContext.includes('entity') ||
    pathContext.includes('metrics') ||
    pathContext.includes('buckets') ||
    pathContext.includes('hits')
  );
}

/**
 * Sanitize JSON string extracted from bash/markdown examples before parsing.
 * Removes shell variable expansions, template tokens ({{var.*}}), and elision comments.
 */
function sanitizeJsonString(str) {
  return str
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (full, inner) => {
      const cleaned = inner
        .replace(/\$\{[A-Za-z0-9_.]+\}/g, 'dummy_env_var')
        .replace(/\$[A-Za-z0-9_.]+/g, 'dummy_var')
        .replace(/\{\{var\.[^}]+\}\}/g, 'dummy_token');
      return `"${cleaned}"`;
    })
    .replace(/"(?:[^"\\]|\\.)*"|(\/\/.*)/g, (m, cmt) => (cmt ? '' : m))
    .replace(/\$\{[A-Za-z0-9_.]+\}/g, '"dummy_env_var"')
    .replace(/\$[A-Za-z0-9_.]+/g, '"dummy_var"')
    .replace(/\{\{var\.[^}]+\}\}/g, '"dummy_token"')
    .replace(/<[A-Za-z0-9_.\- ]+>/g, '"dummy_placeholder"')
    .replace(/,\s*\.\.\./g, '')
    .replace(/\.\.\.\s*,/g, '')
    .replace(/\.\.\./g, '')
    .replace(/,(\s*[}\]])/g, '$1')
    .trim();
}

/**
 * Extract REST v2 curl request payloads from markdown content.
 */
function extractCurlPayloads(content) {
  const payloads = [];

  // Match curl commands targeting /v2/vectordb
  const curlBlockRegex = /```(?:bash|sh|curl)?\s*([\s\S]*?)```/g;
  let match;

  while ((match = curlBlockRegex.exec(content)) !== null) {
    const block = match[1];
    if (!block.includes('/v2/vectordb/')) {
      continue;
    }

    const blockStartIndex = match.index;
    const lineNumber = content.substring(0, blockStartIndex).split('\n').length;
    const seen = new Set();

    const pushPayload = (rawStr) => {
      const trimmed = (rawStr || '').trim();
      if (!trimmed || seen.has(trimmed)) return;
      seen.add(trimmed);
      payloads.push({
        type: 'request',
        raw: trimmed,
        line: lineNumber
      });
    };

    // 1. Single quotes in -d, --data, --data-raw
    const singleQuoteRegex = /(?:-d|--data|--data-raw)\s+'([\s\S]*?)'/g;
    let sqMatch;
    while ((sqMatch = singleQuoteRegex.exec(block)) !== null) {
      pushPayload(sqMatch[1]);
    }

    // 2. Double quotes in -d, --data, --data-raw (handling escaped quotes \")
    const doubleQuoteRegex = /(?:-d|--data|--data-raw)\s+"((?:[^"\\]|\\.)*)"/g;
    let dqMatch;
    while ((dqMatch = doubleQuoteRegex.exec(block)) !== null) {
      pushPayload(dqMatch[1].replace(/\\"/g, '"'));
    }

    // 3. Heredoc payloads (e.g. curl -d @- <<'EOF' ... EOF)
    if (block.includes('-d @-') || block.includes('--data @-') || block.includes('--data-raw @-') || block.includes('<<')) {
      const heredocRegex = /<<-?\s*['"]?([A-Za-z0-9_]+)['"]?\s*\n([\s\S]*?)\n\s*\1/g;
      let hdMatch;
      while ((hdMatch = heredocRegex.exec(block)) !== null) {
        pushPayload(hdMatch[2]);
      }
    }

    // 4. Bash variable assignment with JSON payload (e.g. export idField='{ ... }' or data="{ ... }")
    const varAssignRegex = /(?:export\s+)?[A-Za-z0-9_]+\s*=\s*(?:'([\s\S]*?)'|"((?:[^"\\]|\\.)*)")/g;
    let varMatch;
    while ((varMatch = varAssignRegex.exec(block)) !== null) {
      const val = varMatch[1] !== undefined ? varMatch[1] : (varMatch[2] ? varMatch[2].replace(/\\"/g, '"') : '');
      if (val && /^\s*[\[{]/.test(val) && !val.trim().startsWith('{{')) {
        pushPayload(val);
      }
    }
  }

  return payloads;
}

/**
 * Extract REST v2 response JSON blocks (e.g. inside <details> in REST sections).
 */
function extractResponsePayloads(content) {
  if (!content.includes('/v2/vectordb/') && !content.includes('Aggregation response')) return [];
  const payloads = [];
  // Match <details> containing json blocks
  const detailsRegex = /<details[\s\S]*?```json\s*([\s\S]*?)```[\s\S]*?<\/details>/g;
  let match;

  while ((match = detailsRegex.exec(content)) !== null) {
    const jsonStr = match[1];
    const blockStartIndex = match.index;
    const lineNumber = content.substring(0, blockStartIndex).split('\n').length;

    payloads.push({
      type: 'response',
      raw: jsonStr,
      line: lineNumber
    });
  }

  return payloads;
}

/**
 * Recursively inspect parsed JSON structure for key contract violations.
 */
function checkObjectKeys(obj, pathContext = '', violations = [], options = {}) {
  if (obj === null || typeof obj !== 'object') {
    return violations;
  }

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      checkObjectKeys(obj[i], pathContext ? `${pathContext}[${i}]` : `data[${i}]`, violations, options);
    }
    return violations;
  }

  const inUserData = isUserDataPath(pathContext, !pathContext && Array.isArray(obj));
  const isParamBag =
    pathContext.includes('params') ||
    pathContext.includes('extraParams') ||
    pathContext.includes('elementTypeParams') ||
    pathContext.includes('searchParams');

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = pathContext ? `${pathContext}.${key}` : key;

    if (inUserData) {
      // In user data and aggregation buckets, check for forbidden wire envelope keys
      // (like field_id, field_name, sub_groups in buckets, or auto_id)
      if (FORBIDDEN_ENVELOPE_KEYS[key]) {
        // Exception: allow collection_name or db_name if user explicitly has columns named that,
        // but strictly flag field_id, field_name, sub_groups, auto_id
        if (['field_id', 'field_name', 'sub_groups', 'auto_id'].includes(key)) {
          violations.push({
            key,
            path: currentPath,
            expected: FORBIDDEN_ENVELOPE_KEYS[key],
            reason: `Forbidden snake_case REST wire key: "${key}" should be "${FORBIDDEN_ENVELOPE_KEYS[key]}"`
          });
        }
      }
    } else {
      // In wire envelope (request payload or top-level response envelope)
      if (FORBIDDEN_ENVELOPE_KEYS[key]) {
        violations.push({
          key,
          path: currentPath,
          expected: FORBIDDEN_ENVELOPE_KEYS[key],
          reason: `Forbidden snake_case REST wire key: "${key}" should be "${FORBIDDEN_ENVELOPE_KEYS[key]}"`
        });
      } else if (SNAKE_CASE_REGEX.test(key)) {
        if (!isParamBag && !WHITELIST_SNAKE_CASE_KEYS.has(key)) {
          violations.push({
            key,
            path: currentPath,
            reason: `Unrecognized snake_case key: "${key}" in REST v2 contract (expected camelCase wire property)`
          });
        }
      }
    }

    checkObjectKeys(value, currentPath, violations, options);
  }

  return violations;
}

/**
 * Inspect raw string for key patterns when JSON cannot be strictly parsed due to template tokens.
 */
function checkRawKeyMatches(rawText, violations = []) {
  const keyRegex = /["']([a-zA-Z0-9_.]+)["']\s*:/g;
  let match;

  while ((match = keyRegex.exec(rawText)) !== null) {
    const key = match[1];
    if (FORBIDDEN_ENVELOPE_KEYS[key]) {
      if (!violations.some((v) => v.key === key)) {
        violations.push({
          key,
          path: key,
          expected: FORBIDDEN_ENVELOPE_KEYS[key],
          reason: `Forbidden snake_case REST wire key found: "${key}" should be "${FORBIDDEN_ENVELOPE_KEYS[key]}"`
        });
      }
    }
  }

  return violations;
}

/**
 * Lint one markdown file content.
 */
function lintRestContract(filePath, content, options = {}) {
  const fileViolations = [];

  // 1. Requests
  const requests = extractCurlPayloads(content);
  for (const req of requests) {
    const sanitized = sanitizeJsonString(req.raw);
    let parsed = null;
    try {
      parsed = JSON.parse(sanitized);
    } catch {
      // Fallback regex
    }

    const payloadViolations = [];
    if (parsed) {
      checkObjectKeys(parsed, '', payloadViolations, options);
    } else {
      checkRawKeyMatches(req.raw, payloadViolations);
    }

    for (const v of payloadViolations) {
      fileViolations.push({
        file: filePath,
        line: req.line,
        type: req.type,
        ...v
      });
    }
  }

  // 2. Responses
  const responses = extractResponsePayloads(content);
  for (const resp of responses) {
    const sanitized = sanitizeJsonString(resp.raw);
    let parsed = null;
    try {
      parsed = JSON.parse(sanitized);
    } catch {
      // Fallback regex
    }

    const responseViolations = [];
    if (parsed) {
      checkObjectKeys(parsed, '', responseViolations, options);
    } else {
      checkRawKeyMatches(resp.raw, responseViolations);
    }

    for (const v of responseViolations) {
      fileViolations.push({
        file: filePath,
        line: resp.line,
        type: resp.type,
        ...v
      });
    }
  }

  return fileViolations;
}

/**
 * Scan a directory recursively for markdown files and lint them.
 */
function scanDirectory(dirPath, options = {}) {
  const allViolations = [];
  let filesScanned = 0;

  function walk(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        filesScanned++;
        const content = fs.readFileSync(fullPath, 'utf-8');
        const violations = lintRestContract(fullPath, content, options);
        if (violations.length > 0) {
          allViolations.push(...violations);
        }
      }
    }
  }

  if (fs.existsSync(dirPath)) {
    walk(dirPath);
  }

  return {
    filesScanned,
    violations: allViolations
  };
}

async function main() {
  const args = process.argv.slice(2);
  const checkMode = args.includes('--check');
  const verbose = args.includes('--verbose');

  let targetDir = path.resolve(__dirname, '../site/en');
  const dirIndex = args.indexOf('--dir');
  if (dirIndex !== -1 && args[dirIndex + 1]) {
    targetDir = path.resolve(process.cwd(), args[dirIndex + 1]);
  }

  console.log(`Scanning Milvus REST v2 contract in: ${targetDir}`);
  const result = scanDirectory(targetDir, { verbose });

  console.log(`Scanned ${result.filesScanned} markdown files.`);

  if (result.violations.length === 0) {
    console.log('[PASS] All REST v2 request and response examples conform to contract.');
    process.exit(0);
  } else {
    console.error(`[FAIL] Found ${result.violations.length} REST v2 contract violations:`);
    for (const v of result.violations) {
      const relFile = path.relative(process.cwd(), v.file);
      console.error(`  - ${relFile}:${v.line} [${v.type}] ${v.reason}`);
    }
    if (checkMode) {
      process.exit(1);
    }
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = {
  WHITELIST_SNAKE_CASE_KEYS,
  FORBIDDEN_ENVELOPE_KEYS,
  isUserDataPath,
  lintRestContract,
  scanDirectory,
  extractCurlPayloads,
  extractResponsePayloads,
  checkObjectKeys,
  checkRawKeyMatches,
  sanitizeJsonString
};
