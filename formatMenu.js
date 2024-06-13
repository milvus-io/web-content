const fs = require('fs');
const {
  join
} = require('path');

// fill in th missing fields: parentId, parentIds, href,
const formatMenuStructure = (list, parentId= '',parentIds=[]) => {
  if(!list || !list.length) {
    return []
  }
  list.forEach(item => {
    const {
      children,
      id,
      isMenu
    } = item;
    item.parentId = parentId;
    item.parentIds = [...parentIds];
    if(!isMenu) {
      item.href = id
    }
    item.children = formatMenuStructure(children,id, [...parentIds, id])
  })

  return list
}

const legallyVersions = ['v2.4.x','v2.3.x', 'v2.2.x', 'v2.1.x','v2.0.x'];

const filePaths = legallyVersions.map(version => join(__dirname, `${version}/site/en/menuStructure/en.json`));

filePaths.forEach(filePath => {
  const menu = fs.readFileSync(filePath, 'utf8');
  const newMenu = formatMenuStructure(JSON.parse(menu));
  fs.writeFileSync(filePath, JSON.stringify(newMenu))
})
