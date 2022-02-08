const fs = require("fs");
const HTMLParser = require("node-html-parser");
const path = require("path");

/**
 * Find and get the path of all files under the dirPath.
 * @param {string} dirPath Target directory.
 * @param {array} pathList A list of initial results if necessary.
 * @returns A list of initial results and calculated path of all files under the dirPath.
 */
const getAllFilesAbsolutePath = (dirPath, pathList = []) => {
  let filesList = fs.readdirSync(dirPath);
  for (let i = 0; i < filesList.length; i++) {
    // concat current file path: ${parent_path}/${current_file_name}
    let filePath = path.join(dirPath, filesList[i]);
    // get file info by filePath, return a fs.Stats object
    let stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      // recursion call
      getAllFilesAbsolutePath(filePath, pathList);
    } else {
      pathList.push(filePath);
    }
  }
  return pathList;
};

const getFileRelativePath = (from, to) => {
  return path.relative(from, to);
};

const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

const handleApiFiles = (doc2html, { from, version, category }) => {
  const filesList = getAllFilesAbsolutePath(from);
  const htmlFiles = filesList.filter((i) => i.endsWith(".html"));
  console.log("htmlFiles", htmlFiles);
  const extraData = {};
  for (let i = 0; i < htmlFiles.length; i++) {
    let filePath = htmlFiles[i];
    let doc = HTMLParser.parse(fs.readFileSync(filePath));
    const {
      docHTML,
      title: docTitle,
      order: docOrder,
      parentMenu = {},
    } = doc2html(doc);
    const relativePath = getFileRelativePath(from, filePath);
    const newPath = `API_Reference/${category}/${version}/${relativePath}`;
    ensureDirectoryExistence(newPath);
    if (
      typeof docTitle !== "undefined" ||
      typeof docOrder !== "undefined" ||
      Object.keys(parentMenu).length
    ) {
      extraData[relativePath] = {
        title: docTitle,
        order: docOrder,
        parentMenu,
      };
    }
    console.log("newPath", newPath);
    console.log("docHTML", docHTML);
    fs.writeFileSync(newPath, docHTML);
  }
  if (Object.keys(extraData).length) {
    fs.writeFileSync(
      `API_Reference/${category}/${version}/api_reference_meta.json`,
      JSON.stringify(extraData)
    );
  }
};

/**
 * Handle html pages under `${parentPath}/${version}` and fromat them.
 * Different from handlePyFiles, pymilvus only has one page but orm has a few.
 * Data: pymilvus:      articleBody > div
 * Data: pymilvus-orm:  articleBody > section
 * @param {string} parentPath api category dir path, such as "src/pages/APIReference/pymilvus"
 * @param {string} version api version, such as "v1.0.1"
 * @param {array} apiFiles pages under `${parentPath}/${version}` will be formatted and pushed to apiFiles
 */
const handlePyFilesWithOrm = (from, version) => {
  /**
   * Get current item index as order in TOC tree/subtree.
   * Will update parentMenu if it has a parent menu.
   * @param {document} element DOM element.
   * @param {string} className Class name to be found.
   * @param {object} parentMenu Get current item's parent name and order.
   * @returns {number} Order. The index in TOC sub tree or root tree.
   */
  const calculateOrder = (element, className, parentMenu = {}) => {
    let order = -1;
    const toctree = element?.querySelectorAll(className);
    for (let i = 0; i < toctree.length; i++) {
      const isCurrent = toctree[i]?.getAttribute("class")?.includes("current");
      if (!isCurrent) continue;
      if (className === ".toctree-l2") return i;
      const result = calculateOrder(toctree[i], ".toctree-l2");
      if (result !== -1) {
        const eleName = toctree[i]?.querySelector("a")?.textContent;
        parentMenu.name = eleName;
        parentMenu.order = i;
        return result;
      }
      return i;
    }
    return order;
  };
  const doc2html = (doc) => {
    // const leftNav = doc.querySelectorAll('.toctree-l1');
    const title = doc?.querySelector("h1")?.textContent?.slice(0, -1);
    const parentMenu = {};
    const order = calculateOrder(
      doc.querySelector(".wy-menu ul"),
      ".toctree-l1",
      parentMenu
    );
    // remove useless link
    [...doc.querySelectorAll(".reference.internal .viewcode-link")].forEach(
      (node) => {
        node.parentNode.parentNode.removeChild(node.parentNode);
      }
    );
    // Add <code> for <pre> content.
    [...doc.querySelectorAll("pre")].forEach((node) => {
      const preNode = HTMLParser.parse(node.innerHTML);
      // Remove all unescaped HTML, here's <span>, which cause highlight warning.
      // https://github.com/highlightjs/highlight.js/issues/2886
      [...preNode.querySelectorAll("span")].forEach((span) => {
        const spanText = span.textContent;
        span.replaceWith(spanText);
      });
      node.innerHTML = `<code>${preNode.outerHTML}</code>`;
    });
    // only need article body html
    // <=rc7 use "section", >=rc8 use ".section"
    const docContent =
      doc.querySelector("[itemprop=articleBody] > section") ||
      doc.querySelector("[itemprop=articleBody] > .section");
    doc = docContent?.innerHTML;
    return { docHTML: doc, title, order, parentMenu };
  };
  handleApiFiles(doc2html, {
    from,
    version,
    category: "pymilvus",
  });
};

/**
 * Handle html pages under `${parentPath}/${version}` and fromat them.
 * Go docs are generated by godoc.
 * @param {string} parentPath api category dir path, such as "src/pages/APIReference/milvus-sdk-go"
 * @param {string} version api version, such as "v1.0.1"
 * @param {array} apiFiles pages under `${parentPath}/${version}` will be formatted and pushed to apiFiles
 */
const handleGoFiles = (from, version) => {
  const doc2html = (doc) => {
    // get content
    doc = doc.querySelector("#page");
    // remove useless content
    doc.querySelector("#nav")?.remove();
    [...doc.querySelectorAll("script")].forEach((node) =>
      node.parentNode.removeChild(node)
    );
    doc.querySelector("#short-nav")?.remove();
    [...doc.querySelectorAll(".collapsed")].forEach((node) =>
      node.parentNode.removeChild(node)
    );
    doc.querySelector("#pkg-subdirectories")?.remove();
    doc.querySelector(".pkg-dir")?.remove();
    doc.querySelector("#footer")?.remove();
    // Add <code> for <pre> content.
    [...doc.querySelectorAll("pre")].forEach((node) => {
      const preNode = HTMLParser.parse(node.innerHTML);
      // replace <a> tag with text
      [...preNode.querySelectorAll("a")].forEach((e) => {
        const textContent = e.textContent;
        textContent && e.replaceWith(textContent);
      });
      [...preNode.querySelectorAll("span")].forEach((span) => {
        const spanText = span.textContent;
        span.replaceWith(spanText);
      });
      node.innerHTML = `<code>${preNode.outerHTML}</code>`;
    });
    const removableAhrefs = [
      ...doc.querySelectorAll("h2"),
      ...doc.querySelectorAll("h3"),
    ];
    removableAhrefs.forEach((node) => {
      const ele = node.querySelector("a");
      const textContent = ele?.textContent;
      textContent && ele.replaceWith(textContent);
    });
    doc.querySelector("#pkg-index h3")?.remove();
    doc.querySelector("#pkg-index p")?.remove();
    [...doc.querySelectorAll("h2[title]")].forEach((node) => {
      const textContent = node.textContent?.slice(0, -2);
      textContent && node.replaceWith(`<h2>${textContent}</h2>`);
    });
    doc = doc.querySelector("div.container").innerHTML;
    return { docHTML: doc };
  };
  handleApiFiles(doc2html, {
    from,
    version,
    category: "milvus-sdk-go",
  });
};

/**
 * Handle html pages under `${parentPath}/${version}` and fromat them.
 * Java docs are generated by javadoc(IntelliJ IDEA).
 * @param {string} parentPath api category dir path, such as "src/pages/APIReference/milvus-sdk-java"
 * @param {string} version api version, such as "v1.0.1"
 * @param {array} apiFiles pages under `${parentPath}/${version}` will be formatted and pushed to apiFiles
 */
const handleJavaFiles = (from, version) => {
  const doc2html = (doc) => {
    // remove see also
    doc.querySelector(".contentContainer .description dl:last-child")?.remove();
    [...doc.querySelectorAll("table")].forEach((element) => {
      element.querySelector("caption")?.remove();
    });
    // Add <code> for <pre> content.
    [...doc.querySelectorAll("pre")].forEach((node) => {
      const preNode = HTMLParser.parse(node.innerHTML);
      // replace <a> tag with text
      [...preNode.querySelectorAll("a")].forEach((e) => {
        const textContent = e.textContent;
        textContent && e.replaceWith(textContent);
      });
      [...preNode.querySelectorAll("span")].forEach((span) => {
        const spanText = span.textContent;
        span.replaceWith(spanText);
      });
      node.innerHTML = `<code>${preNode.outerHTML}</code>`;
    });
    [...doc.querySelectorAll("a")].forEach((node) => {
      !node.textContent.split("\n").join("") && node?.remove();
    });
    const title = doc.querySelector(".header .title");
    title &&
      doc
        .querySelector(".header")
        ?.replaceWith(`<h1 class="title">${title.textContent}</h1>`);
    const packageHierarchyLabel = doc.querySelector(
      ".header .packageHierarchyLabel"
    );
    // remove packageHierarchyLabel and it's description if exists
    if (packageHierarchyLabel) {
      doc.querySelector(".header span")?.remove();
      doc.querySelector(".header ul")?.remove();
      packageHierarchyLabel.remove();
    }
    // only need article body html
    doc = doc.querySelector("body > main").innerHTML;
    return { docHTML: doc };
  };
  handleApiFiles(doc2html, {
    from,
    version,
    category: "milvus-sdk-java",
  });
};

/**
 * Handle html pages under `${parentPath}/${version}` and fromat them.
 * Node docs are generated by typedoc.
 * @param {string} parentPath api category dir path, such as "src/pages/APIReference/milvus-sdk-node"
 * @param {string} version api version, such as "v1.0.1"
 * @param {array} apiFiles pages under `${parentPath}/${version}` will be formatted and pushed to apiFiles
 */
const handleNodeFiles = (from, version) => {
  const doc2html = (doc) => {
    // Format <pre> content for highlight.js
    [...doc.querySelectorAll("pre")].forEach((node) => {
      const preNode = HTMLParser.parse(node.innerHTML);
      [...preNode.querySelectorAll("a")].forEach((e) => {
        const textContent = e.textContent;
        textContent && e.replaceWith(textContent);
      });
      [...preNode.querySelectorAll("span")].forEach((span) => {
        const spanText = span.textContent;
        span.replaceWith(spanText);
      });
      node.innerHTML = preNode.outerHTML;
    });
    // Remove hierarchy
    doc.querySelector(".tsd-hierarchy")?.remove();
    // Remove useless sections
    const sections = doc.querySelectorAll(".col-content > section");
    [...sections].forEach((node, index) => {
      const isIndex = node?.getAttribute("class")?.includes("tsd-index");
      const isLastChild = sections?.length === index + 1;
      const isValid = isIndex || isLastChild;
      if (!isValid) node?.remove();
      if (isIndex) {
        // Remove toc title "index"
        node.querySelector("h2")?.remove();
      }
      if (isLastChild) {
        // Remove source code link and desc elements
        const lastChild = HTMLParser.parse(node.innerHTML);
        [...lastChild.querySelectorAll("ul.tsd-signatures")].forEach((i) =>
          i.remove()
        );
        [...lastChild.querySelectorAll("aside.tsd-sources")].forEach((i) =>
          i.remove()
        );
        node.innerHTML = lastChild.outerHTML;
      }
    });
    [...doc.querySelectorAll(".tsd-index-section")].forEach((node) => {
      const sectionNode = HTMLParser.parse(node.innerHTML);
      const title = sectionNode.querySelector("h3");
      if (title?.textContent === "Methods") {
        title?.remove();
        [...sectionNode.querySelectorAll("a")].forEach((aNode) => {
          const ahref = aNode?.getAttribute("href")?.split("#")?.pop();
          const newHref = `#${ahref}`;
          aNode.setAttribute("href", newHref);
        });
      } else {
        node.remove();
      }
      node.innerHTML = sectionNode.outerHTML;
    });
    // only need article title & body html
    doc.querySelector(".tsd-panel.tsd-typography p")?.remove();
    const isDupTitle = doc.querySelectorAll("h1")?.length > 1;
    const docTitleHTML = isDupTitle ? "" : doc.querySelector("h1").outerHTML;
    doc =
      docTitleHTML +
      doc.querySelector(".container-main .col-content").innerHTML;
    return { docHTML: doc };
  };
  handleApiFiles(doc2html, {
    from,
    version,
    category: "milvus-sdk-node",
  });
};

// handlePyFiles only support docs v1.x
// /**
//  * handle html pages under `${parentPath}/${version}` and fromat them
//  * @param {string} parentPath api category dir path, such as "src/pages/APIReference/pymilvus"
//  * @param {string} version api version, such as "v1.0.1"
//  * @param {array} apiFiles pages under `${parentPath}/${version}` will be formatted and pushed to apiFiles
//  */
//  const handlePyFiles = (parentPath, version, apiFiles) => {
//   /**
//    * Get the TOC item index as menu item order.
//    * @param {array} toctree TOC tree.
//    * @returns {number} Current TOC item index, default is the length.
//    */
//   const calculateOrder = toctree => {
//     for (let i = 0; i < toctree.length; i++) {
//       const isCurrent = toctree[i]?.getAttribute("class")?.includes("current");
//       if (isCurrent) return i;
//     }
//     return toctree.length;
//   };
//   const doc2html = doc => {
//     // remove useless link
//     [...doc.querySelectorAll(".reference.internal .viewcode-link")].forEach(
//       node => {
//         node.parentNode.parentNode.removeChild(node.parentNode);
//       }
//     );
//     const leftNav = doc.querySelectorAll(".toctree-l1");
//     const title = doc?.querySelector("h1")?.textContent?.slice(0, -1);
//     const order = calculateOrder([...leftNav]);
//     // Add <code> for <pre> content.
//     [...doc.querySelectorAll("pre")].forEach(node => {
//       const preNode = HTMLParser.parse(node.innerHTML);
//       // Remove all unescaped HTML, here's <span>, which cause highlight warning.
//       // https://github.com/highlightjs/highlight.js/issues/2886
//       [...preNode.querySelectorAll("span")].forEach(span => {
//         const spanText = span.textContent;
//         span.replaceWith(spanText);
//       });
//       node.innerHTML = `<code>${preNode.outerHTML}</code>`;
//     });
//     // only need article body html
//     doc = doc.querySelector("[itemprop=articleBody] > div").innerHTML;
//     return { docHTML: doc, title, order };
//   };
//   handleApiFiles(doc2html, apiFiles, {
//     parentPath,
//     version,
//     category: "pymilvus",
//   });
// };

const args = process.argv.slice(2);

const main = (args) => {
  // console.log(args);
  if (args.length !== 3)
    throw new Error("args should be category, version, srcPath");
  const [category, version, from] = args;
  const dirs = [
    "pymilvus",
    "milvus-sdk-go",
    "milvus-sdk-java",
    "milvus-sdk-node",
  ];

  switch (category) {
    case "pymilvus":
      handlePyFilesWithOrm(from, version);
      break;
    case "milvus-sdk-go":
      handleGoFiles(from, version);
      break;
    case "milvus-sdk-java":
      handleJavaFiles(from, version);
      break;
    case "milvus-sdk-node":
      handleNodeFiles(from, version);
      break;
    default:
      throw new Error(`Category should only be one of ${dirs}`);
  }
};

main(args);
