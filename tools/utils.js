import fs from "fs";
import path from "path";
import axios from "axios";
import { Milvus } from "@zilliz/toolkit";
import remarkMdx from "remark-mdx";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import { JSDOM } from "jsdom";
import {
	getRemarkCodeBlocksPlugin,
	getRehypeImagePlugin,
	rehypeCodeNoTranslatePlugin,
	getRehypeTitlePlugin,
	rehypeCopyButtonPlugin,
	getRehypeHrefPlugin,
	rehypeAnchorHeadingPlugin,
} from "./plugins.js";

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
const GLOSSARY_ID = "a0bbab3b-2b1e-413a-89f2-58dfee38261a";
const ENTRIES =
	"vector\t向量\nHugging Face\tHugging Face\nmilvus\tmilvus\nMilvus\tMilvus\narchitecture\t架构\n";

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
	options = { lang: "en", content: "", version: VERSION }
) => {
	const { lang, content, version } = options;
	const path = lang === "en" ? PATH : PATH + lang + "/";
	const { tree, codeList, headingContent, anchorList } = Milvus.md2html(
		content,
		{
			showAnchor: true,
			version,
			path,
		}
	);

	return {
		html: tree,
		codeList,
		headingContent,
		anchorList,
	};
};

export const remarkToHtml = async (
	options = { lang: "en", content: "", version: VERSION }
) => {
	const { lang, content, version } = options;
	const prefix = lang === "en" ? "docs/" : `docs/${targetLang}/`;
	let codeList = [];
	let title = "";
	let anchorList = [];

	const mdxHtml = await unified()
		.use(remarkParse)
		.use(remarkMdx)
		.use(getRemarkCodeBlocksPlugin(codeList))
		.use(remarkRehype)
		.use(rehypeAnchorHeadingPlugin)
		.use(rehypeHighlight)
		.use(getRehypeImagePlugin(version))
		.use(rehypeCodeNoTranslatePlugin)
		.use(rehypeCopyButtonPlugin)
		.use(getRehypeHrefPlugin(prefix))
		.use(getRehypeTitlePlugin(title))
		.use(rehypeStringify)
		.process(content)
		.then((file) => String(file));

	return {
		html: mdxHtml,
		codeList,
		headingContent: title,
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

		const glossaryParams =
			sourceLang === "EN" && targetLang === "ZH"
				? { glossary_id: GLOSSARY_ID }
				: {};

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
export const createDeepLGlossary = async () => {
	const body = {
		name: "milvus-docs-en-to-zh-glossary",
		source_lang: "en",
		target_lang: "zh",
		entries: ENTRIES,
		entries_format: "tsv",
	};
	const res = await axios.post(DEEPL_ENDPOINT + GLOSSARY_PATH, body, {
		headers: DEEPL_HEADERS,
	});
	console.log(res.data);
};
