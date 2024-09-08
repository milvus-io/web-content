import { visit } from "unist-util-visit";
import { convertImgSrc } from "@zilliz/toolkit";
import { getHeadingIdFromToken } from "./utils.js";

/**
 * Naming Convention:
 * Plugins generally include two types: remark and rehype
 * remark plugins are used to process markdown AST
 * rehype plugins are used to process html AST
 * The names of plugins are generally remarkXXXPlugin or rehypeXXXPlugin
 * If parameters need to be passed, they can be passed through a closure, as shown below with
 * getRemarkCodeBlocksPlugin, with the name prefixed with get on the original basis
 */

export const getRemarkCodeBlocksPlugin =
  (codeblocks = []) =>
  () => {
    return function (tree) {
      visit(tree, "code", (node) => {
        codeblocks.push(node.value);
      });
    };
  };

export const getRehypeImagePlugin = (version) => () => {
  return function (tree) {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "img") {
        const src = node.properties.src;
        const url = version ? convertImgSrc(version, src) : src;
        const alt = node.properties.alt || "";
        const id = alt.toLocaleLowerCase().replaceAll(/\s/g, "-");
        node.properties.id = id;
        node.properties.class = "doc-image";
        node.properties.src = url;

        // Create a new span element with class "img-wrapper"
        const spanNode = {
          type: "element",
          tagName: "span",
          properties: { className: ["img-wrapper"] },
          children: [node],
        };

        // Replace the img node with the new span node in the parent
        parent.children[index] = spanNode;
      }
    });
  };
};

/**
 * rehypeAnchorHeadingPlugin is a plugin function that insert anchor icon and id to headings.
 *
 * @returns {Function} A function that accepts a tree and modifies it by adding anchor headings.
 */
export const rehypeAnchorHeadingPlugin = () => {
  const commonHeadings = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const specialHeadings = ["h1", "h2"];

  const anchorIcon = {
    type: "element",
    tagName: "svg",
    properties: {
      ariaHidden: true,
      focusable: false,
      height: 20,
      version: 1.1,
      viewBox: "0 0 16 16",
      width: 16,
    },
    children: [
      {
        type: "element",
        tagName: "path",
        properties: {
          fill: "#0092E4",
          fillRule: "evenodd",
          d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
        },
      },
    ],
  };

  const getAnchorButton = (id) => ({
    type: "element",
    tagName: "button",
    children: [anchorIcon],
    properties: {
      dataHref: id,
      className: ["anchor-icon"],
      translate: "no",
    },
  });

  return function (tree) {
    visit(tree, "element", (node, index, parent) => {
      if (commonHeadings.includes(node.tagName)) {
        const content = node.children[0].value;
        const headingId = getHeadingIdFromToken(content);
        node.properties.id = headingId;
        node.properties.className = ["common-anchor-header"];
      }

      if (specialHeadings.includes(node.tagName)) {
        const headingId = node.properties.id;
        node.children.push(getAnchorButton(headingId));
      }
    });
  };
};

export const rehypeCodeNoTranslatePlugin = () => {
  return function (tree) {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "code") {
        node.properties.translate = "no";
      }
    });
  };
};

export const getRehypeTitlePlugin = (titles) => () => {
  return function (tree) {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "h1") {
        titles.push(node.children[0].value);
      }
    });
  };
};

export const rehypeCopyButtonPlugin = () => {
  return function (tree) {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "code" && parent.tagName === "pre") {
        const buttonNode = {
          type: "element",
          tagName: "button",
          properties: { className: ["copy-code-btn"] },
        };
        node.children.push(buttonNode);
      }
    });
  };
};

export const getRehypeHrefPlugin = (prefix) => () => {
  return function (tree) {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "a") {
        const href = node.properties.href;
        const newHref =
          href.charAt(0) === "#" ||
          href.charAt(0) === "/" ||
          href.includes("http") ||
          href.includes("mailto:")
            ? href
            : `${prefix}${href}`;
        node.properties.href = newHref;
      }
    });
  };
};
