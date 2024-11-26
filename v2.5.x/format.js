const fs = require('fs');
const {
  join
} = require('path');

const formatMenuStructure = list => {
  const newList = list.map(v => {
    const {
      id,
      title,
      isMenu = false,
      outLink = '',
      order = 0,
      label1,
      label2,
      label3,
    } = v;

    const parentId = label3 || label2 || label1 || '';
    const parentIds = [label1, label2, label3].filter(v => !!v);
    const level = [label1, label2, label3].filter(v => !!v).length + 1;

    const baseInfo = {
      id: id,
      label: title,
    }

    if (isMenu) {
      baseInfo.isMenu = true;
    }

    if (outLink) {
      baseInfo.externalLink = outLink;
    }

    return {
      ...baseInfo,
      parentId,
      parentIds,
      level,
      order,
      children: [],
    };
  });

  newList.sort((x, y) => y.level - x.level);

  const resultList = newList.slice();

  newList.forEach(v => {
    const {
      parentId
    } = v;
    const parentIndex = resultList.findIndex(v => v.id === parentId);
    if (parentIndex !== -1) {

      let childInfo = {
        label: v.label,
        id: v.id,

        // href: v.href,
        // parentId: parentId,
        // parentIds: v.parentIds,
        // level: v.level,
        order: v.order,
        
      }

      if(v.isMenu){
        childInfo.isMenu = true;
      }

      if(v.externalLink){
        childInfo.externalLink = v.externalLink
      }

      childInfo.children = v.children;

      resultList[parentIndex].children.push(childInfo);
    }
  });

  return resultList.filter(v => v.level === 1).map(v => ({
    label: v.label,
    id: v.id,
    isMenu: v.isMenu,
    externalLink: v.externalLink,
    // href: v.href,
    // parentId: parentId,
    // parentIds: v.parentIds,
    // level: v.level,
    order: v.order,
    children: v.children,
  }));
};

const formatMenu = () => {


  const menuPath = join(__dirname, 'site/en/menuStructure/en.json')

  const menu = fs.readFileSync(menuPath, 'utf-8');
  const newMenuStructure = formatMenuStructure(JSON.parse(menu).menuList);

  fs.writeFileSync(menuPath, JSON.stringify(newMenuStructure));
};
formatMenu();
