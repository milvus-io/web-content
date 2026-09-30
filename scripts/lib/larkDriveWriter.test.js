const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const larkDriveWriter = require('./larkDriveWriter');

function writeJson(dir, file, source) {
  fs.writeFileSync(path.join(dir, file), JSON.stringify(source, null, 2));
}

function testDuplicateTokenSourceUsesParentSlugContext() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-drive-writer-'));
  const writer = new larkDriveWriter('', '', 'pythonSidebar', dir, '/tmp', 'zilliz', true, false, 'pymilvus30');

  writeJson(dir, 'EglSdm1jkozDSlxq6SEc4CRonVe.json', {
    token: 'EglSdm1jkozDSlxq6SEc4CRonVe',
    name: 'create_user()',
    type: 'docx',
    slug: 'utility-create_user',
    blocks: { items: [] },
  });
  writeJson(dir, 'S5rRdLq3moeQ7XxY89bcjJOAn1d.json', {
    token: 'EglSdm1jkozDSlxq6SEc4CRonVe',
    name: 'create_user()',
    type: 'docx',
    slug: 'Authentication-create_user',
    blocks: { items: [] },
  });

  const source = writer.__drive_source_for_child(
    { token: 'EglSdm1jkozDSlxq6SEc4CRonVe', name: 'create_user()', type: 'docx' },
    'MilvusClient-Authentication'
  );

  assert.equal(source.slug, 'Authentication-create_user');
}

function testDuplicateTokenSourceUsesUtilityParentContext() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-drive-writer-'));
  const writer = new larkDriveWriter('', '', 'pythonSidebar', dir, '/tmp', 'zilliz', true, false, 'pymilvus30');

  writeJson(dir, 'EglSdm1jkozDSlxq6SEc4CRonVe.json', {
    token: 'EglSdm1jkozDSlxq6SEc4CRonVe',
    name: 'create_user()',
    type: 'docx',
    slug: 'utility-create_user',
    blocks: { items: [] },
  });
  writeJson(dir, 'S5rRdLq3moeQ7XxY89bcjJOAn1d.json', {
    token: 'EglSdm1jkozDSlxq6SEc4CRonVe',
    name: 'create_user()',
    type: 'docx',
    slug: 'Authentication-create_user',
    blocks: { items: [] },
  });

  const source = writer.__drive_source_for_child(
    { token: 'EglSdm1jkozDSlxq6SEc4CRonVe', name: 'create_user()', type: 'docx' },
    'ORM-utility'
  );

  assert.equal(source.slug, 'utility-create_user');
}

async function testConvertLinkUsesCurrentParentSlugContext() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'lark-drive-writer-'));
  const writer = new larkDriveWriter('', '', 'pythonSidebar', dir, '/tmp', 'zilliz', true, false, 'pymilvus30');

  writeJson(dir, 'EglSdm1jkozDSlxq6SEc4CRonVe.json', {
    token: 'EglSdm1jkozDSlxq6SEc4CRonVe',
    name: 'create_user()',
    type: 'docx',
    slug: 'utility-create_user',
    blocks: { items: [] },
  });
  writeJson(dir, 'S5rRdLq3moeQ7XxY89bcjJOAn1d.json', {
    token: 'EglSdm1jkozDSlxq6SEc4CRonVe',
    name: 'create_user()',
    type: 'docx',
    slug: 'Authentication-create_user',
    blocks: { items: [] },
  });

  writer.currentParentSlug = 'MilvusClient-Authentication';

  assert.equal(
    await writer.__convert_link('https://zilliverse.feishu.cn/docx/EglSdm1jkozDSlxq6SEc4CRonVe'),
    './Authentication-create_user'
  );
}

async function run() {
  testDuplicateTokenSourceUsesParentSlugContext();
  testDuplicateTokenSourceUsesUtilityParentContext();
  await testConvertLinkUsesCurrentParentSlugContext();
  console.log('larkDriveWriter tests passed');
}

run();
