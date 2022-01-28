const path = require('path');
const fs = require('fs');
const wordCount = require("html-word-count");
const axios = require("axios");

const allowDocVersion = ["v1.1.1", "v2.0.0"];
const axiosInstance = process.env.MSERVICE_URL ?
  axios.create({
    baseURL: process.env.MSERVICE_URL,
    timeout: 10000,
  }) :
  null;

const countAPiWords = (filePath, filePathList) => {
  let count = 0;

  (function interateFolder(filePath, filePathList) {
    for (let k = 0; k < filePathList.length; k++) {
      const htmlOrFolderPath = path.join(filePath, filePathList[k]);
      const stats = fs.statSync(htmlOrFolderPath);

      if (stats.isDirectory()) {
        const folder = fs.readdirSync(htmlOrFolderPath);
        // console.log(folder)
        interateFolder(htmlOrFolderPath, folder);
      } else {
        const html = fs.readFileSync(htmlOrFolderPath);
        count += wordCount(html);
      }
    }
  })(filePath, filePathList);
  return count;
};

const walkApiReferenceFile = async dirpath => {
  if (!axiosInstance) {
    return;
  }
  const dirStructure = {};
  const languageList = fs.readdirSync(dirpath);

  for (let i = 0; i < languageList.length; i++) {
    const versionList = fs.readdirSync(path.join(dirpath, languageList[i]));

    dirStructure[languageList[i]] = {};

    for (let j = 0; j < versionList.length; j++) {
      const versionFolder = fs.readdirSync(
        path.join(dirpath, languageList[i], versionList[j])
      );

      const filePath = path.join(dirpath, languageList[i], versionList[j]);
      dirStructure[languageList[i]][versionList[j]] = countAPiWords(
        filePath,
        versionFolder,
        dirStructure
      );
    }
  }

  let requestBody = [];
  for (let l in dirStructure) {
    let languageObj = dirStructure[l];
    Object.entries(languageObj).forEach(([version, number]) => {
      requestBody.push({
        version,
        count_en: number,
        count_cn: 0,
        type: l,
      });
    });
  }
  console.log('apireference stats--')
  try {
    axiosInstance.post("/word-count", {
      count_data: requestBody
    });
  } catch (error) {
    console.log(error);
  }
};


const walkDocsFiles = (dirpath) => {
  if(!axiosInstance || !dirpath){
    return
  }
  const versions = fs.readdirSync(dirpath);
  let requestBody = [];
  versions.forEach(version => {
    if (allowDocVersion.includes(version)) {
      let [enPath, cnPath] = [path.join(version, '/site/en'), path.join(version, '/site/zh-CN')];
      requestBody.push({
        version,
        type: 'doc',
        count_en: countDocsWords(enPath),
        count_cn: countDocsWords(cnPath),
      });
    }
  });
  console.log('docs stats--')
  try {
    axiosInstance.post("/word-count", { count_data: requestBody });
  } catch (error) {
    console.log(error);
  }
};

const countDocsWords = (versionPath) => {
  let count = 0;

  (function interateFolder(versionPath) {
    const secondaryPaths = fs.readdirSync(versionPath);
    for (let i = 0; i < secondaryPaths.length; i++) {
      const currentPath = path.join(versionPath, secondaryPaths[i]);
      const state = fs.statSync(currentPath);
      if (state.isDirectory()) {
        interateFolder(currentPath);
      } else {
        const content = fs.readFileSync(currentPath);
        count += wordCount(content);
      }
    }
  })(versionPath);
  return count;

};
walkDocsFiles('./');
walkApiReferenceFile('APIReference');
