import fs from "fs";
import path from "path";
import axios from "axios";
import { Milvus } from "@zilliz/toolkit";
import { JSDOM } from "jsdom";

export const CACHE_FILE = "./tools/cache.json";
const VERSION = "v2.4.x";
const PATH = "/docs/";
const DEEPL_API_KEY = process.env.DEEPL_API_KEY;
const DEEPL_ENDPOINT = "https://api.deepl.com";
const TRANSLATE_PATH = "/v2/translate";
const GLOSSARY_PATH = "/v2/glossaries";

const DEEPL_HEADERS = {
  "Content-Type": "application/json",
  Authorization: `DeepL-Auth-Key ${DEEPL_API_KEY}`,
};
const GLOSSARY_ID_MAP = JSON.parse(
  fs.readFileSync("./tools/glossary/glossary-id.json", "utf8")
);

export function traverseDirectory(dirPath, fileList = []) {
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      traverseDirectory(filePath, fileList);
    } else if (stats.isFile() && path.extname(file) === ".md") {
      fileList.push(filePath);
    }
  });

  return fileList;
}

const dirCache = {};
export function mkdir(filePath) {
  const pathArr = filePath.split("/");
  let dir = pathArr[0];
  for (let i = 1; i < pathArr.length; i++) {
    if (!dirCache[dir] && !fs.existsSync(dir)) {
      dirCache[dir] = true;
      fs.mkdirSync(dir);
    }
    dir = path.join(dir, pathArr[i]);
  }
}

/**
 * Renders the documentation HTML.
 *
 * @param {Object} options - The options for rendering the documentation.
 * @param {string} [options.lang="en"] - The language of the documentation.
 * @param {string} [options.version="v2.4.x"] - The version of the documentation.
 * @param {string} [options.content=""] - The content to be converted to HTML.
 * @returns {Object} The HTML tree generated from the markdown content.
 */
export const remarkableToHtml = async (
  options = { lang: "en", content: "", version: VERSION, betaTag: "", latestVersion: "" }
) => {
  const { lang, content, version, betaTag, latestVersion } = options;
  const versionSuffix = version === latestVersion ? '': `${version}/`
  const path = (lang === "en" ? PATH : PATH + lang + "/") + versionSuffix;
  const { tree, codeList, headingContent, anchorList } = Milvus.md2html(
    content,
    {
      showAnchor: true,
      version,
      path,
      betaTag,
      useLatex: true,
    }
  );

  return {
    html: tree,
    codeList,
    headingContent,
    anchorList,
  };
};

export async function translate(params) {
  try {
    const { text, sourceLang = "EN", targetLang, mock = false } = params;
    const isArray = Array.isArray(text);
    const texts = isArray ? text : [text];

    if (targetLang === "EN" || mock) {
      return text;
    }

    const glossaryKey = `${sourceLang.toLowerCase()}-${targetLang.toLowerCase()}`;
    const GLOSSARY_ID = GLOSSARY_ID_MAP[glossaryKey]?.id;
    const glossaryParams = GLOSSARY_ID ? { glossary_id: GLOSSARY_ID } : {};

    // Translation logic
    const res = await axios.post(
      DEEPL_ENDPOINT + TRANSLATE_PATH,
      {
        text: texts,
        source_lang: sourceLang,
        target_lang: targetLang,
        tag_handling: "html",
        ...glossaryParams,
      },
      {
        headers: DEEPL_HEADERS,
      }
    );
    const { translations } = res.data || {};
    return isArray
      ? translations.map((item) => item.text)
      : translations.map((item) => item.text).join("\n");
  } catch (error) {
    console.error(error);
    return params.text;
  }
}

export async function translateMenu(
  params = { data: [], targetLang: "EN", version: string }
) {
  const { data, targetLang, version } = params;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    if (item.label) {
      item.label = await translate({
        text: item.label,
        targetLang: targetLang.toUpperCase(),
      });
      console.log(`Translated menu item: ${item.label}`);
    }
    if (item.children && item.children.length > 0) {
      await translateMenu({
        data: item.children,
        targetLang,
        version,
      });
    }
  }
}

export const addTranslateNoToCodeBlocks = (htmlContent) => {
  return htmlContent.replace(/<code/g, '<code translate="no"');
};

export const addCopyButtonToCodeBlocks = (htmlContent) => {
  return htmlContent.replace(
    /<\/code><\/pre>/g,
    '<button class="copy-code-btn"></button></code></pre>'
  );
};

export const getHeadingIdFromToken = (content) => {
  // in order to ensure every heading href is unique even when content is same, we use heading content + lines as id
  const pattern =
    /[`~!@#_$%^&*()=|{}':;',\\\[\\\].<>/?~!@#￥……&*（）——|{}【】‘；：”“""'。，、？]/g;
  const formatText = `${content}`.replaceAll(pattern, "");
  return formatText.replaceAll(/\s/g, "-");
};

export const extractText = (id = "", htmlString = "") => {
  const dom = new JSDOM(htmlString);
  const document = dom.window.document;

  const targetElement = document.getElementById(id);

  if (!targetElement) {
    console.log(`No element found with id "${id}"`);
    return;
  }

  return targetElement.textContent.trim();
};

/**
 * Create a glossary for DeepL.
 * get glossary_id for translate function
 *
 * entries example:
 * Source1\tTarget1\nSource2\tTarget2\n...
 */
export const createDeepLGlossary = async (entries, targetLang) => {
  const body = {
    name: `milvus-docs-en-to-${targetLang}-glossary-${new Date().toISOString()}`,
    source_lang: "en",
    target_lang: targetLang,
    entries,
    entries_format: "tsv",
  };
  const res = await axios.post(DEEPL_ENDPOINT + GLOSSARY_PATH, body, {
    headers: DEEPL_HEADERS,
  });
  console.log(res.data);
  return res.data;
};

export const deleteDeepLGlossary = async (glossaryId) => {
  if (!glossaryId) {
    return;
  }

  return await axios.delete(DEEPL_ENDPOINT + GLOSSARY_PATH + "/" + glossaryId, {
    headers: DEEPL_HEADERS,
  });
};

export const generateMenuStructureLocales = async (params) => {
  const { versions = [], useCache = true, targetLangs = [] } = params;
  console.log("Translating menu structure...");
  for (let version of versions) {
    const sourceMenuPath = `${version}/site/en/menuStructure/en.json`;
    const modifiedTime = await getFileUpdatedTime(sourceMenuPath);

    const cache =
      useCache && fs.existsSync(CACHE_FILE)
        ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8") || "{}")
        : {};
    const cacheOutdated = useCache
      ? !cache[version] ||
        !cache[version][sourceMenuPath] ||
        new Date(cache[version][sourceMenuPath]) < new Date(modifiedTime)
      : true;

    if (!cacheOutdated) {
      console.info("-> Skip: menu structure is up-to-date.");
      continue;
    }

    for (let targetLang of targetLangs) {
      const targetMenuPath = `localization/${version}/site/${targetLang}/menuStructure/${targetLang}.json`;
      const menuData = JSON.parse(fs.readFileSync(sourceMenuPath, "utf8"));

      await translateMenu({
        data: menuData,
        targetLang,
        version,
      });

      mkdir(targetMenuPath);
      fs.writeFileSync(
        targetMenuPath,
        JSON.stringify(menuData, null, 2),
        "utf8"
      );
      console.info("--> Menu translated successfully:", targetLang);
    }

    if (useCache) {
      cache[version][sourceMenuPath] = new Date().toISOString();
      fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), "utf8");
    }
  }
};

export const getFileUpdatedTime = async (path) => {
  try {
    const apiUrl = `https://api.github.com/repos/milvus-io/web-content/commits?path=${path}`;
    const headers = {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    };
    const { data } = await axios.get(apiUrl, { headers });
    return data.length > 0
      ? data[0].commit.author.date
      : new Date().toISOString();
  } catch (error) {
    console.error(error);
    return new Date().toISOString();
  }
};

export const splitAndExtractPreTags = (htmlString) => {
  const placeholder = "<!-- translate-split -->";
  const regex = /<pre>[\s\S]*?<\/pre>/g;

  const matches = htmlString.match(regex) || [];
  const result = htmlString.replace(regex, placeholder);
  const htmlArray = result.split(placeholder);

  return { result, matches, htmlArray };
};

export const getTitleFromMarkdown = (markdown) => {
  const headingRegex = /^#\s+(.*)$/m;
  const match = headingRegex.exec(markdown);
  return match ? match[1] : null;
};
