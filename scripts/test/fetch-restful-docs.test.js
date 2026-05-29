const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const {
  resolveRestfulOptions,
  loadConfig,
  DEFAULT_CONFIG_PATH,
  DEFAULT_SPAWN_CWD,
  applyMilvusLegacyCompatibility,
} = require('../fetch-restful-docs');

test('uses restful entry values by default', () => {
  const config = {
    apifox: {
      specifications: 'scripts/apifox-docs/meta/openapi',
      restful: {
        'milvus-v3.0.x': {
          specifications: 'scripts/apifox-docs/meta/openapi',
          lang: 'en-US',
          target: 'milvus',
          targets: { outputDir: 'API_Reference_MDX/milvus-restful/v3.0.x' },
        },
      },
    },
  };

  const resolved = resolveRestfulOptions({
    config,
    entryName: 'milvus-v3.0.x',
    cli: {},
  });

  assert.equal(resolved.specifications, 'scripts/apifox-docs/meta/openapi');
  assert.equal(resolved.lang, 'en-US');
  assert.equal(resolved.target, 'milvus');
  assert.equal(resolved.outputPath, 'API_Reference_MDX/milvus-restful/v3.0.x');
});

test('falls back to apifox.specifications when entry omits it', () => {
  const config = {
    apifox: {
      specifications: 'scripts/apifox-docs/meta/openapi',
      restful: {
        preview: {
          lang: 'en-US',
          target: 'milvus',
          targets: { outputDir: 'API_Reference_MDX/milvus-restful/v3.0.x' },
        },
      },
    },
  };

  const resolved = resolveRestfulOptions({
    config,
    entryName: 'preview',
    cli: {},
  });

  assert.equal(resolved.specifications, 'scripts/apifox-docs/meta/openapi');
});

test('cli values override config values', () => {
  const config = {
    apifox: {
      specifications: 'scripts/apifox-docs/meta/openapi',
      restful: {
        preview: {
          specifications: 'scripts/apifox-docs/meta/openapi',
          lang: 'en-US',
          target: 'milvus',
          targets: { outputDir: 'API_Reference_MDX/milvus-restful/v3.0.x' },
        },
      },
    },
  };

  const resolved = resolveRestfulOptions({
    config,
    entryName: 'preview',
    cli: {
      lang: 'zh-CN',
      target: 'zilliz',
      outputPath: 'tmp/out',
      specifications: 'tmp/specs',
      strings: 'tmp/strings.txt',
      uploadS3: true,
    },
  });

  assert.equal(resolved.specifications, 'tmp/specs');
  assert.equal(resolved.lang, 'zh-CN');
  assert.equal(resolved.target, 'zilliz');
  assert.equal(resolved.outputPath, 'tmp/out');
  assert.equal(resolved.strings, 'tmp/strings.txt');
  assert.equal(resolved.uploadS3, true);
});

test('throws when restful entry is missing', () => {
  const config = { apifox: { restful: {} } };

  assert.throws(
    () => resolveRestfulOptions({ config, entryName: 'missing', cli: {} }),
    /restful entry/i,
  );
});

test('loads default config path from sidecar location', () => {
  const config = loadConfig(DEFAULT_CONFIG_PATH);

  assert.ok(config.apifox);
});

test('uses repo root as default spawn cwd', () => {
  assert.ok(DEFAULT_SPAWN_CWD.endsWith('/web-content'));
});

test('applies milvus legacy compatibility transforms', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'milvus-restful-'));

  try {
    const createDir = path.join(tempRoot, 'v1', 'data-plane', 'Collection (v1)');
    const importV1Dir = path.join(tempRoot, 'v1', 'data-plane', 'import-operations');
    const importV2Dir = path.join(tempRoot, 'v2', 'data-plane', 'import-operations');

    fs.mkdirSync(createDir, { recursive: true });
    fs.mkdirSync(importV1Dir, { recursive: true });
    fs.mkdirSync(importV2Dir, { recursive: true });

    fs.writeFileSync(
      path.join(createDir, 'Create.mdx'),
      [
        '---',
        'sidebar_position: 3',
        'title: "Create Collection (V1) | RESTful"',
        'sidebar_label: "Create Collection (V1)"',
        'keywords:',
        '  - "Create Collection (V1)"',
        '---',
        '',
        '# Create Collection (V1)',
        '',
      ].join('\n'),
    );

    fs.writeFileSync(path.join(importV1Dir, 'import.mdx'), '# Import');
    fs.writeFileSync(path.join(importV1Dir, 'List.mdx'), '# List');
    fs.writeFileSync(path.join(importV2Dir, 'get-import-progress.mdx'), '# Get Progress');

    applyMilvusLegacyCompatibility(tempRoot);

    assert.equal(fs.existsSync(path.join(tempRoot, 'v1', 'data-plane')), false);
    assert.equal(fs.existsSync(path.join(tempRoot, 'v2', 'data-plane')), false);

    assert.equal(fs.existsSync(path.join(tempRoot, 'v1', 'Collection (v1)', 'Create.mdx')), true);
    assert.equal(fs.existsSync(path.join(tempRoot, 'v1', 'Import', 'Import.mdx')), true);
    assert.equal(fs.existsSync(path.join(tempRoot, 'v1', 'Import', 'List.mdx')), true);
    assert.equal(fs.existsSync(path.join(tempRoot, 'v2', 'Import', 'Get Progress.mdx')), true);

    const normalized = fs.readFileSync(path.join(tempRoot, 'v1', 'Collection (v1)', 'Create.mdx'), 'utf-8');
    assert.match(normalized, /sidebar_positition: 3/);
    assert.doesNotMatch(normalized, /sidebar_position:/);
    assert.match(normalized, /title: "Create Collection \| RESTful"/);
    assert.match(normalized, /sidebar_label: "Create Collection"/);
    assert.match(normalized, /- "Create Collection"/);
    assert.match(normalized, /^# Create Collection$/m);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
