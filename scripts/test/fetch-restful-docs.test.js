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
  projectSpecificationsForTrack,
  stageTrackSpecifications,
  removeEmptyDirectories,
} = require('../fetch-restful-docs');

const lifecycle = (addedAt) => ({
  'x-added-at': addedAt,
  'x-last-modified': addedAt,
  'x-deprecated-since': null,
});

// Minimal fragment set exercising the three things the projection must do:
// drop operations the target never publishes, drop operations added after
// the track (and the tag they leave empty), and keep everything else.
function writeTrackFixture(root) {
  const fragmentDir = path.join(root, 'openapi');
  fs.mkdirSync(fragmentDir, { recursive: true });

  const fragment = {
    openapi: '3.0.1',
    info: { title: 'fixture', version: '1.0.0' },
    tags: [
      { name: 'Collection Operations (V2)' },
      { name: 'Snapshot Operations (V2)' },
      { name: 'Cloud Job (V2)', 'x-include-target': ['zilliz'] },
    ],
    paths: {
      '/v2/vectordb/collections/list': {
        post: {
          summary: 'List Collections',
          tags: ['Collection Operations (V2)'],
          ...lifecycle('2.6.x'),
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  ...lifecycle('2.6.x'),
                  properties: {
                    dbName: { type: 'string', ...lifecycle('2.6.x') },
                    onlyIn30: { type: 'string', ...lifecycle('3.0.x') },
                  },
                },
              },
            },
          },
          responses: {},
        },
      },
      '/v2/vectordb/snapshots/create': {
        post: {
          summary: 'Create Snapshot',
          tags: ['Snapshot Operations (V2)'],
          ...lifecycle('3.0.x'),
          responses: {},
        },
      },
      '/v2/jobs/{JOB_ID}': {
        get: {
          summary: 'Describe Job',
          tags: ['Cloud Job (V2)'],
          responses: {},
        },
      },
    },
    components: { schemas: { Unused: { type: 'object', ...lifecycle('3.0.x') } } },
  };

  fs.writeFileSync(path.join(fragmentDir, '01-fixture.json'), JSON.stringify(fragment));
  return fragmentDir;
}

test('resolves releaseTrack from the restful entry and normalizes it', () => {
  const config = {
    apifox: {
      restful: {
        'milvus-v2.6.x': {
          specifications: 'scripts/apifox-docs/meta/openapi',
          lang: 'en-US',
          target: 'milvus',
          releaseTrack: 'v2.6.x',
          targets: { outputDir: 'API_Reference_MDX/milvus-restful/v2.6.x' },
        },
      },
    },
  };

  const resolved = resolveRestfulOptions({ config, entryName: 'milvus-v2.6.x', cli: {} });
  assert.equal(resolved.releaseTrack, '2.6.x');

  const overridden = resolveRestfulOptions({ config, entryName: 'milvus-v2.6.x', cli: { releaseTrack: '3.0.x' } });
  assert.equal(overridden.releaseTrack, '3.0.x');
});

test('leaves releaseTrack undefined when the entry does not pin one', () => {
  const config = loadConfig(DEFAULT_CONFIG_PATH);
  const resolved = resolveRestfulOptions({ config, entryName: 'milvus-v3.0.x', cli: {} });

  assert.equal(resolved.releaseTrack, undefined);
});

test('rejects a releaseTrack that is not major.minor.x', () => {
  const config = {
    apifox: {
      restful: {
        bad: {
          specifications: 'scripts/apifox-docs/meta/openapi',
          lang: 'en-US',
          target: 'milvus',
          releaseTrack: '2.6.1',
          targets: { outputDir: 'tmp/out' },
        },
      },
    },
  };

  assert.throws(() => resolveRestfulOptions({ config, entryName: 'bad', cli: {} }), /Invalid releaseTrack "2.6.1"/);
});

test('projects fragments onto a release track', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'restful-track-'));

  try {
    const fragmentDir = writeTrackFixture(tempRoot);
    const selection = { target: 'milvus', lang: 'en-US' };

    const older = projectSpecificationsForTrack(fragmentDir, { ...selection, releaseTrack: '2.6.x' });
    assert.deepEqual(Object.keys(older.spec.paths), ['/v2/vectordb/collections/list']);
    assert.deepEqual(older.spec.tags.map(tag => tag.name), ['Collection Operations (V2)']);
    const listSchema = older.spec.paths['/v2/vectordb/collections/list'].post.requestBody.content['application/json'].schema;
    assert.deepEqual(Object.keys(listSchema.properties), ['dbName']);
    assert.equal(older.stats.omittedElements, 3);
    assert.deepEqual(older.spec.components, {});

    const latest = projectSpecificationsForTrack(fragmentDir, { ...selection, releaseTrack: '3.0.x' });
    assert.deepEqual(Object.keys(latest.spec.paths).sort(), ['/v2/vectordb/collections/list', '/v2/vectordb/snapshots/create']);
    assert.deepEqual(latest.spec.tags.map(tag => tag.name), ['Collection Operations (V2)', 'Snapshot Operations (V2)']);
    assert.equal(latest.stats.omittedElements, 0);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('stages the projected spec as a temp file and cleans it up', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'restful-stage-'));

  try {
    const fragmentDir = writeTrackFixture(tempRoot);
    const staged = stageTrackSpecifications({
      specifications: fragmentDir,
      releaseTrack: '2.6.x',
      target: 'milvus',
      lang: 'en-US',
    });

    assert.ok(path.isAbsolute(staged.file));
    assert.equal(path.basename(staged.file), 'openapi-2.6.x.json');
    const written = JSON.parse(fs.readFileSync(staged.file, 'utf-8'));
    assert.deepEqual(Object.keys(written.paths), ['/v2/vectordb/collections/list']);
    assert.equal(staged.stats.omittedElements, 3);

    staged.cleanup();
    assert.equal(fs.existsSync(path.dirname(staged.file)), false);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test('the real fragment set projects onto 2.6.x without 3.0.x additions', () => {
  const fragmentDir = path.join(DEFAULT_SPAWN_CWD, 'scripts', 'apifox-docs', 'meta', 'openapi');
  const { spec, stats } = projectSpecificationsForTrack(fragmentDir, {
    releaseTrack: '2.6.x',
    target: 'milvus',
    lang: 'en-US',
  });

  assert.ok(stats.omittedElements > 0);
  let serialized = JSON.stringify(spec);
  assert.doesNotMatch(serialized, /"x-added-at":"3\.0\.x"/);
  assert.ok(Object.keys(spec.paths).length > 0);
  for (const tag of spec.tags) {
    assert.ok(serialized.includes(`"tags":["${tag.name}"`), `tag ${tag.name} has no operation left`);
  }
});

test('removes nested empty directories but keeps populated ones', () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'restful-empty-'));

  try {
    fs.mkdirSync(path.join(tempRoot, 'v2', 'Snapshot (v2)'), { recursive: true });
    fs.mkdirSync(path.join(tempRoot, 'v2', 'Collection (v2)'), { recursive: true });
    fs.writeFileSync(path.join(tempRoot, 'v2', 'Collection (v2)', 'List.mdx'), '# List');
    fs.writeFileSync(path.join(tempRoot, 'About.mdx'), '# About');

    removeEmptyDirectories(tempRoot);

    assert.equal(fs.existsSync(path.join(tempRoot, 'v2', 'Snapshot (v2)')), false);
    assert.equal(fs.existsSync(path.join(tempRoot, 'v2', 'Collection (v2)', 'List.mdx')), true);
    assert.equal(fs.existsSync(path.join(tempRoot, 'About.mdx')), true);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

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
