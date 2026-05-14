const test = require('node:test');
const assert = require('node:assert/strict');

const { resolveRestfulOptions, loadConfig, DEFAULT_CONFIG_PATH, DEFAULT_SPAWN_CWD } = require('../fetch-restful-docs');

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
