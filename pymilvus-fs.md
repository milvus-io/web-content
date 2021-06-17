const HTMLParser = require("node-html-parser");
const fs = require("fs");

const doc = HTMLParser.parse(fs.readFileSync("./index.html"));
const dirList = [];
const fileList = doc.querySelectorAll("#overview .simple dt a").map((ele) => {
  const href = ele.getAttribute("href");
  if (href.includes("/")) {
    const dirPath = href.split("/").slice(0, -1).join("/");
    dirList.push(dirPath);
    const childDoc = HTMLParser.parse(fs.readFileSync(href));
    const childBody = childDoc.querySelector("[itemprop=articleBody]");
    const childFiles = childBody
      ?.querySelectorAll("li.toctree-l1 a")
      ?.map((i) => `${dirPath}/${i.getAttribute("href")}`);
    return childFiles;
  }
  return href;
});

const createDirs = (list) => {
  fs.mkdirSync("./output", 0744);
  const uniq = [...new Set(list)];
  uniq.forEach((dirPath) => {
    fs.mkdirSync(`./output/${dirPath}`, 0744);
  });
};

const copyFile = (fileList) => {
  for (file of fileList) {
    if (typeof file === "object") {
      copyFile(file);
    } else {
      fs.copyFile(file, `./output/${file}`, (err) => {
        if (err) throw err;
      });
    }
  }
};

createDirs(dirList);
copyFile(fileList);
