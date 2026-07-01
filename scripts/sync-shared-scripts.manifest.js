const LARK_DOCS_INCLUDE = [/^(?:lark.*|feishuFetch)\.js$/];

module.exports = [
  {
    name: 'milvus-lib',
    sourceType: 'local',
    source: '../milvus-docs/scripts/lib',
    target: 'scripts/lib',
    include: [/^milvus.*\.js$/],
  },
  {
    name: 'apifox-docs',
    repo: 'zilliztech/zdoc',
    ref: 'master',
    source: 'plugins/apifox-docs',
    target: 'scripts/apifox-docs',
  },
  {
    name: 'zdoc-lark-docs-lark-files',
    sourceType: 'local',
    source: '../zdoc/plugins/lark-docs',
    target: 'scripts/lark-docs',
    include: LARK_DOCS_INCLUDE,
  },
  {
    name: 'zdoc-lib-lark-files',
    sourceType: 'local',
    source: '../zdoc/plugins/lark-docs',
    target: 'scripts/lib',
    include: LARK_DOCS_INCLUDE,
  },
  {
    name: 'zdoc-mdx-parse',
    sourceType: 'local',
    source: '../zdoc/plugins/mdx-parse',
    target: 'scripts/mdx-parse',
    include: [/^mdxPatcher\.js$/],
  },
];
