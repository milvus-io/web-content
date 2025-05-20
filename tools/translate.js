/**
 * This script is used to translate markdown files from English to other languages.
 * Run `node tools/translate.js` to translate markdown files.
 *
 * This script will auto run every Monday.
 */

import fs from "fs";
import matter from "gray-matter";
import "dotenv/config";
import {
  traverseDirectory,
  translate,
  mkdir,
  remarkableToHtml,
  extractText,
  generateMenuStructureLocales,
  CACHE_FILE,
  getFileUpdatedTime,
  splitAndExtractPreTags,
  getTitleFromMarkdown,
} from "./utils.js";
import { remarkToHtml } from "./remark.js";

const MOCK_TRANSLATE = false;
const VERSIONS = ["v2.5.x", "v2.4.x"];
const LATEST_VERSION = VERSIONS[0];
const sourceFilePath = "site/en";
const sourceLang = "en";
const targetLangs = [
  "zh",
  "zh-hant",
  "ja",
  "ko",
  "fr",
  "de",
  "it",
  "pt",
  "es",
  "ru",
  "id",
  "ar",
];
const cacheFile = CACHE_FILE;
let total = 0;
const SPLIT_TRANSLATE_FILES = [
  "v2.5.x/site/en/userGuide/manage-collections.md",
  "v2.5.x/site/en/userGuide/search-query-get/single-vector-search.md",
  "v2.5.x/site/en/userGuide/use-json-fields.md",
  "v2.5.x/site/en/reference/array_data_type.md",
  "v2.4.x/site/en/userGuide/manage-collections.md",
  "v2.4.x/site/en/userGuide/search-query-get/single-vector-search.md",
  "v2.4.x/site/en/userGuide/use-json-fields.md",
  "v2.4.x/site/en/reference/array_data_type.md",
];

async function bootstrap() {
  console.log("Starting translation...", process.env.DEEPL_API_KEY);
  /**
   * step 1: read cache file
   */
  const cache = fs.existsSync(cacheFile)
    ? JSON.parse(fs.readFileSync(cacheFile, "utf8") || "{}")
    : {};

  for (let version of VERSIONS) {
    /**
     * step 2: get all md files by version
     */
    const sourceDirectory = `${version}/${sourceFilePath}`;
    const mdFiles = traverseDirectory(sourceDirectory);

    console.log(`--> Found ${mdFiles.length} files...`);

    /**
     * step 3: filter out updated files
     */
    let updatedFiles = [];
    for (let index = 0; index < mdFiles.length; index++) {
      const path = mdFiles[index];
      const modifiedTime = await getFileUpdatedTime(path);

      console.info(`--> cache check: ${index + 1}/${mdFiles.length}`);

      const markdown = fs.readFileSync(path, "utf8");
      const { data = {} } = matter(markdown);
      const deprecated = data.deprecate;
      const cacheOutdated =
        !cache[version] ||
        !cache[version][path] ||
        new Date(cache[version][path]) < new Date(modifiedTime);
      if (!deprecated && cacheOutdated) {
        updatedFiles.push(path);
      }
    }
    console.log(`--> ${updatedFiles.length} updated files`);

    for (let path of updatedFiles) {
      /**
       * step 4: read & handle file content
       */
      const markdown = fs.readFileSync(path, "utf8");
      const { data = {}, content } = matter(markdown);
      const isMdx = path.endsWith(".mdx");
      const h1Title = getTitleFromMarkdown(content);
      const isSameTitle = h1Title === data.title;

      for (let targetLang of targetLangs) {
        /**
         * step 5: convert md or mdx to html
         */
        const params = {
          content,
          lang: targetLang,
          version,
          betaTag: data.beta,
          latestVersion: LATEST_VERSION
        };
        const {
          html: htmlContent,
          codeList,
          headingContent,
          anchorList,
        } = isMdx ? await remarkToHtml(params) : await remarkableToHtml(params);

        /**
         * step 6.1: split and translate specific files
         */
        const neededSplit = SPLIT_TRANSLATE_FILES.includes(path);
        const { matches, htmlArray } = neededSplit
          ? splitAndExtractPreTags(htmlContent)
          : { matches: [], htmlArray: [] };

        /**
         * step 6.2: translate html content
         */
        const translateRes = await translate({
          text: neededSplit ? htmlArray : htmlContent,
          targetLang: targetLang.toUpperCase(),
          mock: MOCK_TRANSLATE,
        });

        let translateContent =
          typeof translateRes === "string"
            ? translateRes
            : translateRes.reduce((acc, cur, index) => {
                const match = matches[index - 1];
                if (match) {
                  return acc + match + cur;
                }
                return acc + cur;
              }, "");

        /**
         * step 6.3: replace anchor label
         */
        if (anchorList.length > 0) {
          const anchorIds = anchorList.map((anchor) => anchor.href);
          anchorIds.forEach((id, index) => {
            const text = extractText(id, translateContent);
            anchorList[index].label = text;
          });
        }

        /**
         * step 6.4:translate title and summary
         */
        const cloneData = { ...data };
        if (data.title || data.summary) {
          const [title, summary] = await translate({
            text: [data.title || "", data.summary || ""],
            targetLang: targetLang.toUpperCase(),
            mock: MOCK_TRANSLATE,
          });
          if (title) {
            const translatedMdTitle = anchorList?.[0]?.label || title;
            cloneData.title = !isSameTitle ? title : translatedMdTitle;
          }
          if (summary) {
            cloneData.summary = summary;
          }
        }

        /**
         * step 7: format content
         */
        const cleanedHtmlContent = translateContent.replace(/{" "}/g, ""); // Remove {" "}
        const wholeContent = matter.stringify(cleanedHtmlContent, cloneData);

        /**
         * step 8: write to md file and json file
         */
        const targetFilePath =
          "localization/" + path.replace(sourceLang, `${targetLang}`);
        mkdir(targetFilePath);
        fs.writeFileSync(targetFilePath, wholeContent, "utf8");
        fs.writeFileSync(
          targetFilePath.replace(".md", ".json"),
          JSON.stringify({ codeList, headingContent, anchorList }),
          "utf8"
        );

        total++;

        console.info(
          `-> ${targetLang.toUpperCase()}: file translated successfully:`,
          targetFilePath,
          ` (${total}/${updatedFiles.length})`
        );
      }

      if (!cache[version]) {
        cache[version] = {};
      }

      /**
       * step 9: update cache
       */
      cache[version][path] = new Date().toISOString();
    }
  }

  /**
   * step 10: write cache file
   */
  fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), "utf8");
  console.log("--> Cache updated successfully");
  console.log("--> Total files:", total);

  /**
   * step 11: translate menu structure
   */
  generateMenuStructureLocales({
    versions: VERSIONS,
    targetLangs,
  });
}

bootstrap();
