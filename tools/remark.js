import fs from "fs";
import React from "react";
import babel from "@babel/core";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote } from "next-mdx-remote";
import { renderToString } from "react-dom/server";
import { compile } from "@mdx-js/mdx";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;

import rehypeHighlight from "rehype-highlight";
import {
  getRemarkCodeBlocksPlugin,
  getRehypeImagePlugin,
  rehypeCodeNoTranslatePlugin,
  getRehypeTitlePlugin,
  rehypeCopyButtonPlugin,
  getRehypeHrefPlugin,
  rehypeAnchorHeadingPlugin,
} from "./plugins.js";
import { mkdir } from "./utils.js";

const COMPONENT_DIR = "components/";
const OUTPUT_DIR = ".output/";

function extractValue(node) {
  if (node.type === "StringLiteral") {
    return node.value;
  } else if (node.type === "NumericLiteral") {
    return node.value;
  } else if (node.type === "ObjectExpression") {
    const obj = {};
    node.properties.forEach((prop) => {
      const key = prop.key.name || prop.key.value;
      const value = extractValue(prop.value);
      obj[key] = value;
    });
    return obj;
  } else if (node.type === "ArrayExpression") {
    return node.elements.map((el) => extractValue(el));
  } else if (
    node.type === "ArrowFunctionExpression" ||
    node.type === "FunctionExpression"
  ) {
    return "Function";
  } else {
    return "Unknown type";
  }
}

async function getVariablesFromMDX(mdxContent) {
  // Compile the MDX content into JSX
  const jsxCode = await compile(mdxContent);

  // Use Babel to parse the JSX into an AST
  const ast = babel.parse(jsxCode.value, {
    sourceType: "module",
    presets: ["@babel/preset-react"],
  });

  const exports = {};

  // Traverse the AST and extract exports
  traverse(ast, {
    ExportNamedDeclaration(path) {
      if (path.node.declaration && path.node.declaration.declarations) {
        path.node.declaration.declarations.forEach((declaration) => {
          const key = declaration.id.name;
          const value = extractValue(declaration.init); // Use extractValue helper
          exports[key] = value;
        });
      }
    },
  });

  return {
    exports,
  };
}

const loadComponents = async () => {
  const componentFiles = fs.readdirSync(COMPONENT_DIR);

  for (let file of componentFiles) {
    const jsxCode = fs.readFileSync(COMPONENT_DIR + file);
    const transformedJSX = await babel.transformAsync(jsxCode, {
      presets: ["@babel/preset-react"],
    });
    mkdir(OUTPUT_DIR + file);
    fs.writeFileSync(OUTPUT_DIR + file, transformedJSX.code, "utf-8");
  }

  const { components } = await import("../" + OUTPUT_DIR + `index.js`);

  return components;
};

export const remarkToHtml = async (
  options = { lang: "en", content: "", version: VERSION, latestVersion }
) => {
  const { content, lang, version, latestVersion } = options;
  const versionSuffix = version === latestVersion? '': `${version}/`

  const prefix =( lang === "en" ? 'docs/' : `docs/${lang}/`) + versionSuffix;
  let codeList = []; 
  let titles = [];
  let anchorList = [];

  const { exports } = await getVariablesFromMDX(content);
  const components = await loadComponents();

  const mdxSource = await serialize(content, {
    scope: exports,
    mdxOptions: {
      remarkPlugins: [getRemarkCodeBlocksPlugin(codeList)],
      rehypePlugins: [
        rehypeAnchorHeadingPlugin,
        rehypeHighlight,
        getRehypeImagePlugin(version),
        rehypeCodeNoTranslatePlugin,
        rehypeCopyButtonPlugin,
        getRehypeHrefPlugin(prefix),
        getRehypeTitlePlugin(titles),
      ],
    },
  });
  const mdxHtml = renderToString(
    React.createElement(MDXRemote, { ...mdxSource, components })
  );

  return {
    html: mdxHtml,
    codeList,
    headingContent: titles[0] || "",
    anchorList,
  };
};
