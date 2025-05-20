/**
 * This script is used to generate en html docs from en markdown docs.
 * Run `node tools/generate-en.js` to generate en html docs.
 * The generated en html docs will be placed in the localization folder.
 *
 * This script will auto run in the Github action.
 * Trigger condition: When a new en docs is submitted.
 */

import fs from "fs";
import matter from "gray-matter";
import "dotenv/config";
import {
  traverseDirectory,
  mkdir,
  remarkableToHtml,
  generateMenuStructureLocales,
  CACHE_FILE,
} from "./utils.js";
import { remarkToHtml } from "./remark.js";

const VERSIONS = ["v2.5.x", "v2.4.x"];
const LATEST_VERSION = VERSIONS[0];
const sourceFilePath = "site/en";
const sourceLang = "en";
const targetLang = "en";

async function bootstrap() {
  console.log("Starting generate en docs...");

  let newFilesFound = false;
  const cache = fs.existsSync(CACHE_FILE)
    ? JSON.parse(fs.readFileSync(CACHE_FILE, "utf8") || "{}")
    : {};

  for (let version of VERSIONS) {
    /**
     * step 1: get all md files by version
     */
    const sourceDirectory = `${version}/${sourceFilePath}`;
    const mdFiles = traverseDirectory(sourceDirectory);

    console.log(`--> Found ${mdFiles.length} files...`);

    /**
     * step 2: filter out not deprecated files
     */
    const updatedFiles = mdFiles.filter((path) => {
      const markdown = fs.readFileSync(path, "utf8");
      const { data = {} } = matter(markdown);
      const deprecated = data.deprecate;
      return !deprecated;
    });

    if (!newFilesFound) {
      newFilesFound = updatedFiles.some((path) => {
        const isUnExist = !cache[version] || !cache[version][path];
        if (isUnExist) {
          console.info(`-> New file found:`, path);
        }
        return isUnExist;
      });
    }

    for (let path of updatedFiles) {
      /**
       * step 3: read & handle file content
       */
      const markdown = fs.readFileSync(path, "utf8");
      const { data = {}, content } = matter(markdown);
      const isMdx = path.endsWith(".mdx");

      /**
       * step 4: convert md or mdx to html
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

      const wholeContent = matter.stringify(htmlContent, data);

      /**
       * step 5: write to md file and json file
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
      console.info(
        `-> ${targetLang.toUpperCase()}: file translated successfully:`,
        targetFilePath
      );
    }
    console.log("--> Total files:", updatedFiles.length);
  }

  /**
   * step 6: generate menu structure locales
   */
  await generateMenuStructureLocales({
    versions: VERSIONS,
    useCache: false,
    targetLangs: [targetLang],
  });

  /**
   * step 7: translate en docs to other languages if new files added
   */
  if (newFilesFound) {
    import("./translate.js");
  } else {
    console.log("No new files found, skip translation.");
  }
}

bootstrap();
