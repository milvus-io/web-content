---
id: contributing_documentation.md
---

# Contributing to Milvus Documentation
Contributions to the Milvus documentation are welcome from everyone. The Milvus community strives to make the contribution process simple and straightforward. To do that, we create this page to walk you through the whole process step by step.

## Contribute to Technical Documentation

Technical documentation for Milvus is stored on [GitHub](https://github.com/milvus-io/milvus-docs). Each branch corresponds to a Milvus release by name. We've set the branch of the latest Milvus release as the default branch. For documentation of a different Milvus release, switch to the corresponding branch. 

### Before you start

Before you contribute please take a minute to familiarize yourself with basic [Markdown](https://www.markdownguide.org/basic-syntax/) syntax and have a look at our [Code of Conduct](code_of_conduct.md) and the [Google Developer Documentation Style Guide](https://developers.google.com/style/) for some guidance on how to write accessible, consistent and inclusive documentation.

Below list the web components used in Milvus documentation:
- *Images* are housed under the **/assets** folder and can be referenced with **{{images.Assets/image-name.jpg/png}}**.

- *Fragments* let you split the markdown into independent, reusable pieces and are defined in the **site/en/fragments** and **site/zh-CN/fragments** folders. Use the **{{fragments/xxx.md}}** syntax to reference a specific fragment.

- *Variables* are used to store version information to be referenced in code or paths. They are defined in **Variables.json** and can be used in Markdown (**.md**) files, fragments, and templates. 

> The defined variables implement within the current folder and its subfolders. The **en** and **Zh-CN** folders each contains a Variables.json file.

- *Link* within the Milvus technical documentation section can be cited using its file name, for instance, `[What is Milvus](overview.md)`. Otherwise, use the full link of the cited page.

### Contribution workflow

If you are just correcting a typo or grammatical error, feel free to go ahead and [create a pull request](https://github.com/milvus-io/milvus-docs/pulls). 

For more substantial changes, please follow the following steps:

1. [File an issue](https://github.com/milvus-io/milvus-docs/issues/new/choose) and assign it to yourself by commenting`/assign` or `/assign <your_github_id>`.
2. Fork the [milvus-docs repository](https://github.com/milvus-io/milvus-docs) to your own GitHub account.
3. Fetch to make sure your local branch is up-to-date.
4. Once you complete your changes, create a pull request. Your changes will be reviewed by a technical writer as soon as possible.

For detailed information on this workflow, see [Make Your First Contribution](making_your_first_contributions.md).



## Contribute a blog article

If you would like to write an article for our [blog](https://medium.com/unstructured-data-service), please [file an issue](https://github.com/milvus-io/community/issues/new) in the [Milvus community repository](https://github.com/milvus-io/community) or send it to community@zilliz.com. Feel free to submit either a completed draft or article ideas. All submissions will be reviewed as quickly as possible. If your article or idea seems like a good fit for the blog, we will reach out to you directly.

> In your title/subject line, please put in [blog submission] to make sure your email does not get buried.

## Contribute to API references

To make contributions to the Milvus SDK reference documentation, visit the programming language specific repositories listed below:

- [Python ORM](https://github.com/milvus-io/pymilvus-orm)

- [GoLang](https://github.com/milvus-io/milvus-sdk-go)

## Community documentation

To make contributions to the Milvus community documentation, visit the [community *documentation* repository](https://github.com/milvus-io/web-content).
