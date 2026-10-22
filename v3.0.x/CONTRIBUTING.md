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

## Editing docs with an AI agent

This repository ships an agent skill, **edit-docs**, that lets AI coding agents such as ZCode, Claude Code, Codex, and OpenCode edit the docs on your behalf while following the conventions on this page. The canonical files live in `.skills/edit-docs/` and are mirrored for tool discovery into the `.agents/`, `.claude/`, `.codex/`, and `.opencode/` skills directories.

- **Modify an existing page** — give the agent the page (URL, title, or filename) and the change you want; it asks back only when the request is genuinely ambiguous.
- **Add a new page** — supply the content and where it belongs in the navigation (e.g. "under User Guide, after the analyzer page"); the agent completes the front matter and inserts the sidebar entry in `menuStructure/en.json` via the bundled `nav.py` script (surgical insertion with automatic sibling-order bumping, plus a `verify.py` post-edit checker).
- **Import from bootcamp** — give a link into the [bootcamp repository](https://github.com/milvus-io/bootcamp) (a notebook or a directory); the agent converts it into an integration or tutorial page.

Every change the skill makes is delivered as a pull request — it never pushes to a version branch directly.

## Docs structure

![Folders](assets/folder-structure.png)

- [Languages](#language)
- [Pages](#pages)
- [Sidebar](#sidebar)

### Language

All documentation is written in English, which is the official language supported by the Milvus website. Nevertheless, you are more than welcome to make a huge contribution to the community by translating the documentation into other languages you know!

> We are grateful that efforts to maintain a Chinese version of the docs have been continued by a community [project](https://github.com/milvus-cn) ([#1449](https://github.com/milvus-io/milvus-docs/issues/1449)). Milvus has stopped official support for Chinese documentation since August 2021.

### Pages

Documentation is versioned by git branch: each Milvus release line lives on a branch named for it (`v3.0.x`, `v2.6.x`, ...), and on every branch the English documentation lives under `site/en/`. To work on a different release line, switch to the corresponding branch.

Within `site/en/`, every page must be an **.md** file written in Markdown. File names should be lowercase with hyphens or underscores between words and should be brief but descriptive.

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
| `summary` (optional)     | Used as the page's `meta description` for SEO. Aim for under ~143 characters (a guideline, not an enforced limit). Consider using the first sentence of the page, or something similar. |
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

*Images* are housed under the **/assets** folder at the repository root and are referenced from a page by their relative path, e.g. `![Name](../../../../../assets/name.png)` (the depth depends on the page's location). Many older pages reference images by their hosted URL under `https://milvus-docs.s3.us-west-2.amazonaws.com/assets/`; when reusing an existing image, keep the form used by the surrounding pages.

#### Fragments

*Fragments* let you split the markdown into independent, reusable pieces and are defined in the **site/en/fragments** folder. Use the **{{fragments/xxx.md}}** syntax to reference a specific fragment.

#### Variables

*Variables* are used to store version information that are referenced in code or paths. They are defined in **Variables.json** and can be used in Markdown (**.md**) files, fragments, and templates.

> The defined variables are implemented within the current folder and its subfolders.

### Sidebar

For each documented version of Milvus, the JSON file in the **menuStructure** directory defines what pages appear in the Docs sidebar.

If you're adding a page that you think should appear in the sidebar, please mention this in your pull request and follow the established practice when changing the **en.json** file.

The JSON file is a nested tree of entries. Each entry has the following fields:

| Field | Type | Description |
| ------|------|------------ |
| `label` | String | The sidebar text for the entry. May be shorter than the page's `title`. |
| `id` | String | Pages: the markdown filename including `.md`, identical to the page's front-matter `id`. Sections: a short slug without `.md` (e.g. `install_milvus`). Ids must be unique across the whole tree. |
| `order` | Integer | The sorting order of entries under the same parent, starting from 0. Keep sibling orders contiguous. |
| `isMenu` | Boolean | Set as `true` if the entry is a section/subsection of the sidenav. Pages have no `isMenu`. |
| `children` | Array | The nested entries of a section. `[]` for pages. |

CI validates this file on every pull request (`node check-link.js`): a page's front-matter `id` must equal its filename, every sidebar `.md` id must resolve to an existing markdown file, and internal links are checked.

#### JSON Example

This example shows part of the "Get Started" section of the sidenav:

```json
[
  ...,
  {
    "id": "getstarted",
    "label": "Get Started",
    "isMenu": true,
    "order": 1,
    "children": [
      {
        "id": "quickstart.md",
        "label": "Quickstart",
        "order": 0,
        "children": []
      },
      {
        "id": "install_milvus",
        "label": "Install Milvus",
        "order": 1,
        "isMenu": true,
        "children": [
          {
            "id": "install-overview.md",
            "label": "Overview",
            "order": 0,
            "children": []
          },
          {
            "id": "milvus_lite.md",
            "label": "Run Milvus Lite",
            "order": 1,
            "children": []
          },
          {
            "id": "run_milvus_docker",
            "label": "Run Milvus Standalone",
            "order": 2,
            "isMenu": true,
            "children": [
              {
                "id": "prerequisite-docker.md",
                "label": "Requirements",
                "order": 0,
                "children": []
              },
              {
                "id": "install_standalone-docker.md",
                "label": "Docker (Linux)",
                "order": 2,
                "children": []
              }
            ]
          }
        ]
      }
    ]
  }
]
```
