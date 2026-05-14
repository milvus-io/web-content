module.exports = [
  {
    name: 'milvus-lib',
    repo: 'milvus-io/milvus-docs',
    ref: 'DEFAULT_BRANCH',
    source: 'scripts/lib',
    target: 'scripts/lib',
  },
  {
    name: 'apifox-docs',
    repo: 'zilliztech/zdoc',
    ref: 'master',
    source: 'plugins/apifox-docs',
    target: 'scripts/apifox-docs',
  },
];
