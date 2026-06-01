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
    include: [/^lark.*\.js$/],
  },
  {
    name: 'zdoc-lib-lark-files',
    sourceType: 'local',
    source: '../zdoc/plugins/lark-docs',
    target: 'scripts/lib',
    include: [/^lark.*\.js$/],
  },
  {
    name: 'zdoc-mdx-parse',
    sourceType: 'local',
    source: '../zdoc/plugins/mdx-parse',
    target: 'scripts/mdx-parse',
    include: [/^mdxPatcher\.js$/],
  },
];
