module.exports = [
  {
    name: 'zdoc-lark-files',
    sourceType: 'local',
    source: '../zdoc/plugins/lark-docs',
    target: 'scripts/lib',
    include: [/^lark.*\.js$/],
  },
];
