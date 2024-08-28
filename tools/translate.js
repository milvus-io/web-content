import fs from "fs";
import matter from "gray-matter";
import "dotenv/config";
import {
	traverseDirectory,
	translate,
	mkdir,
	remarkToHtml,
	remarkableToHtml,
	extractText,
	translateMenu,
} from "./utils.js";

const MOCK_TRANSLATE = false;
const VERSIONS = [
	"v2.4.x",
	// "v2.3.x",
	// "v2.2.x",
	// "v2.1.x",
	// "v2.0.x",
];
const sourceFilePath = "site/en";
const sourceLang = "en";
const targetLangs = ["zh", "ja", "ko", "fr", "de", "it", "pt", "es"];
// const targetLangs = ["en", "zh", "ja", "ko", "fr", "de", "it", "pt", "es"];
const cacheFile = "./tools/cache.json";
let total = 0;

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
		const updatedFiles = mdFiles.filter((path) => {
			const stats = fs.statSync(path);
			const modifiedTime = stats.mtime;
			const markdown = fs.readFileSync(path, "utf8");
			const { data = {} } = matter(markdown);
			const deprecated = data.deprecate;
			const cacheOutdated =
				!cache[version] ||
				!cache[version][path] ||
				new Date(cache[version][path]) < modifiedTime;
			return !deprecated && cacheOutdated;
		});
		console.log(`--> ${updatedFiles.length} updated files`);

		for (let path of updatedFiles) {
			/**
			 * step 4: read & handle file content
			 */
			const markdown = fs.readFileSync(path, "utf8");
			const { data = {}, content } = matter(markdown);
			const isMdx = path.endsWith(".mdx");

			for (let targetLang of targetLangs) {
				/**
				 * step 5: convert md or mdx to html
				 */
				const params = { content, lang: targetLang, version };
				const {
					html: htmlContent,
					codeList,
					headingContent,
					anchorList,
				} = isMdx ? await remarkToHtml(params) : await remarkableToHtml(params);

				/**
				 * step 6.1: translate html content
				 */
				const translateContent = await translate({
					text: htmlContent,
					targetLang: targetLang.toUpperCase(),
					mock: MOCK_TRANSLATE,
				});

				/**
				 * step 6.2:translate title and summary
				 */
				const cloneData = { ...data };
				if (data.title || data.summary) {
					const [title, summary] = await translate({
						text: [data.title || "", data.summary || ""],
						targetLang: targetLang.toUpperCase(),
						mock: MOCK_TRANSLATE,
					});
					if (title) {
						cloneData.title = title;
					}
					if (summary) {
						cloneData.summary = summary;
					}
				}

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
				console.info(
					`-> ${targetLang.toUpperCase()}: file translated successfully:`,
					targetFilePath
				);
				total++;
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
	console.log("Translating menu structure...");
	for (let version of VERSIONS) {
		const sourceMenuPath = `${version}/site/en/menuStructure/en.json`;
		const stats = fs.statSync(sourceMenuPath);

		const cacheOutdated =
			!cache[version] ||
			!cache[version][sourceMenuPath] ||
			new Date(cache[version][sourceMenuPath]) < stats.mtime;

		if (!cacheOutdated) {
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

		cache[version][sourceMenuPath] = new Date().toISOString();
		fs.writeFileSync(cacheFile, JSON.stringify(cache, null, 2), "utf8");
	}
}

bootstrap();
