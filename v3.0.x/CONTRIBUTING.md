# Contributing to Milvus Documentation

The Milvus docs are open-source just like the database itself and welcome contributions from everyone in the Milvus community.

> This repository is for Milvus technical documentation update and maintenance. Visit [Milvus.io](https://milvus.io/docs) or [Web content repo](https://github.com/milvus-io/web-content) for fully rendered documents.

## What contributions can I make?

Basically anything you can think of to improve our documentation and make it more user friendly! For example:

- Fix a typo or a grammatical error.

- Update or extend existing documentation.

- Add new pages to Milvus documentation.

## Before you start

Before you contribute please take a minute to familiarize yourself with basic [Markdown](https://www.markdownguide.org/basic-syntax/) syntax and have a look at our [Code of Conduct](https://github.com/milvus-io/milvus/blob/master/CODE_OF_CONDUCT.md).

We **strongly recommended** that you stand by the [Google Developer Documentation Style Guide](https://developers.google.com/style/) before you want to make any substantial contributions. This guide gives useful advice on how to write accessible, consistent and inclusive documentation.

## Get started

If you want to correct a typo or grammatical error, feel free to edit the page and [create a pull request](https://github.com/milvus-io/milvus-docs/pulls).

For more substantial changes, please follow the following steps:

1. [File an issue](https://github.com/milvus-io/milvus-docs/issues/new/choose) and assign it to yourself.
   
   Or if you want to fix an existing issue, go to [Issues](https://github.com/milvus-io/milvus-docs/issues), choose one issue and assign it to yourself.

2. Fork the [milvus-docs repository](https://github.com/milvus-io/milvus-docs) to your own GitHub account.

3. Fetch to make sure your local branch is up-to-date.
 
4. Once you complete your changes, create a pull request. Your changes will be reviewed by a technical writer as soon as possible.

For detailed information on this workflow, see [Make Your First Contribution](https://milvus.io/community/making_your_first_contributions.md).

## Docs structure

![Folders](assets/folder-structure.png)

- [Languages](#language)
- [Pages](#pages)
- [Sidebar](#sidebar)

### Language

All documentation is written in English, which is the official language supported by the Milvus website. Nevertheless, you are more than welcome to make a huge contribution to the community by translating the documentation into other languages you know!

> We are grateful that efforts to maintain a Chinese version of the docs have been continued by a community [project](https://github.com/milvus-cn) ([#1449](https://github.com/milvus-io/milvus-docs/issues/1449)). Milvus has stopped official support for Chinese documentation since August 2021.

### Pages

We provide documentation for each major version of Milvus. The pages for each version can be found in a directory named for the version. For example, docs for Milvus v2.0 are in the `v2.0.x` directory, whereas docs for Milvus v1.1.0 are in the `v1.1.0` directory.

Within each version's directory, every page must be an **.md** file written in Markdown. File names should be lowercase with an underscore between words and should be brief but descriptive.

Example:

- `install_offline.md`

Markdown pages start with the following front-matter with `id` as the mandatory field:

```
---

id: page_id.md

title: Title of Page

summary: Short description of the page for SEO purposes

related_key: keyword

group: major_page.md

---
```

| Field                | Description                                              |
| ------------------------ | ------------------------------------------------------------ |
| `id`                     | The unique ID assigned to each page.                         |
| `title` (optional)       | Used as the h1 header and written in title-case.             |
| `summary` (optional)     | Used as the page's `meta description` for SEO. Keep this under 143 characters. Consider using the first sentence of the page, or something similar. |
| `related_key` (optional) | Used as the keyword to pull related questions from the FAQ database to show at the bottom of the page. |
| `group` (optional) | Add the leading page appeared on the sidenav if this page is a part of a page group. |

#### Templates

In general, there are four types of documentation:

- [How-to docs](site/template/how-to-doc-template.md)
- [Conceptual docs](site/template/conceptual-doc-template.md)
- [Reference docs](site/template/reference-doc-template.md)
- [Tutorials](site/template/tutorial-doc-template.md)

Follow any of these templates when you draft a document, but remember to be flexible as these types are not difinitively distinct from each other.

#### Images

*Images* are housed under the **/assets** folder and can be referenced with `![ImageName]({{images.assets/ImageName.jpg/png "This is a caption"}})`.

#### Fragments

*Fragments* let you split the markdown into independent, reusable pieces and are defined in the **site/en/fragments** folder. Use the **{{fragments/xxx.md}}** syntax to reference a specific fragment.

#### Variables

*Variables* are used to store version information that are referenced in code or paths. They are defined in **Variables.json** and can be used in Markdown (**.md**) files, fragments, and templates.

> The defined variables are implemented within the current folder and its subfolders.

### Sidebar

For each documented version of Milvus, the JSON file in the **menuStructure** directory defines what pages appear in the Docs sidebar.

If you're adding a page that you think should appear in the sidebar, please mention this in your pull request and follow the established practice when changing the **en.json** file.

In the JSON file for a version's sidebar, there are six possible fields:

| Field | Type | Description |
| ------|------|------------ |
| `id` | String | The unique ID (within the **en** folder) that is given to a section or a page (defined in the front-matter of the corresponding Markdown file). |
| `title` | String | The title for an entry in the sidenav, e.g., "Get Started" (section), "Install Milvus" (subsection), or "Milvus Standalone" (page). See the [JSON Example](#json-example) below for more clarity. |
| `label<n>` (e.g., label1, label2, label3) | String | The hierarchical structure of pages and sections.  |
| `order` | Integar | The sorting order of pages and sections under the current label, starting from 0. |
| `isMenu` | Boolean | Set as `true` if the entry is a section/subsection of the sidenav. |
| `outlink` | Array of strings | The URL of a page that is not rendered by any Markdown file in the **milvus-docs** repository. |

#### JSON Example

This example shows some of the "Get Started" section of the sidenav:

```json
{
     "menuList": [
     ...,
     {
      "id": "getstarted",
      "title": "Get Started",
      "label1": "",
      "label2": null,
      "label3": null,
      "order": 1,
      "isMenu": true
     },
     {
       "id": "prerequisite-docker.md",
       "title": "Before you Begin",
       "label1": "getstarted",
       "label2": null,
       "label3": null,
       "order": 0
     },  
     {
      "id": "installmilvus",
      "title": "Install Milvus",
      "label1": "getstarted",
      "label2": null,
      "label3": null,
      "order": 1,
      "isMenu": true
    },
    {
      "id": "install_standalone-docker.md",
      "title": "Milvus Standalone",
      "label1": "getstarted",
      "label2": "installmilvus",
      "label3": null,
      "order": 0
    },
    {
      "id": "install_cluster-docker.md",
      "title": "Milvus Cluster",
      "label1": "getstarted",
      "label2": "installmilvus",
      "label3": null,
      "order": 1
    }, 
    {
      "id": "install_offline-docker.md",
      "title": "Install Offline",
      "label1": "getstarted",
      "label2": "installmilvus",
      "label3": null,
      "order": 2
    }, 
    {
      "id": "example_code.md",
      "title": "Hello Milvus",
      "label1": "getstarted",
      "label2": "",
      "label3": "",
      "order": 2
    },
     ...
     ]
}
```
