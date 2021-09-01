---
id: contributing_documentation.md
---

# 贡献文档

欢迎大家对 Milvus 文档做出贡献。 Milvus 社区努力使贡献过程简单明了。为此，我们创建了此页面，以逐步引导你完成整个过程。

## 贡献技术文档

Milvus 的技术文档存储在 [GitHub](https://github.com/milvus-io/milvus-docs)，每个分支按名称对应一个 Milvus 版本，主页默认分支是最新发布的 Milvus 版本分支。如需获取 Milvus 早期版本的相关文档，请切换到相应的分支。

### 开始之前

在贡献之前，你需要熟悉一些基本的 [Markdown](https://www.markdownguide.org/basic-syntax/) 语法，并查看我们的 [行为准则](http://code_of_conduct.md) 和 [Google 开发者文档样式指南](https://developers.google.com/style/) 了解如何编写易于理解、一致且包容的文档。

以下是 Milvus 文档中使用的组件：

- *图片*位于 **/assets** 文件夹下，可以使用 `{{images.Assets/<image-file-name>}}` 引用。

- *Fragments* 允许你将 Markdown（**.md**）文档拆分为独立的、可重复使用的片段，并在 **site/en/fragments** 和 **site/zh-CN/fragments** 文件夹中定义。使用 `{{fragments/<fragment-file-name>}}` 来引用特定片段。

- *Variables* 用于存储要在代码或路径中引用的版本信息，通过 **Variables.json** 文件定义，可以在 Markdown 文件、片段和模板中使用。

> 变量的作用域仅限于当前文件夹及其子文件夹。 **en** 和 **Zh-CN** 文件夹都包含一个 **Variables.json** 文件。

- [Milvus Documentation](https://milvus.io/docs/home) 下页面可直接通过其文件名引用，例如，`[什么是 Milvus](overview.md)`。其他页面需要使用引用页面的完整链接。

### 贡献工作流

如果只需更正拼写错误或语法错误，欢迎直接 [创建 PR](https://github.com/milvus-io/milvus-docs/pulls) 或在错误页面右上方通过 *编辑* 按钮修改。

对于更大的文档改动，请按照以下步骤操作：

1. [提交问题](https://github.com/milvus-io/milvus-docs/issues/new/choose) 并通过在评论栏回复`/assign` 或`/assign <your_github_id>` 将其分配给自己。
2. Fork [milvus-docs 仓库](https://github.com/milvus-io/milvus-docs) 到你自己的 GitHub 账户。
3. Fetch 上游仓库以确保你的本地分支为最新版本。
4. 完成更改后，创建 PR。技术作家会尽快审核你提供的内容。

有关此流程的详细信息，参考 [成为 Milvus 贡献者](http://making_your_first_contributions.md)。

## 贡献一篇博客文章

如果你想为我们的 [博客](https://medium.com/unstructured-data-service) 撰写文章，无论是已经完稿或只是初步的想法，都欢迎你在 [Milvus 社区仓库](https://github.com/milvus-io/community) [提交 issue](https://github.com/milvus-io/community/issue/new)  或发送邮件至 community@zilliz.com。所有提交的内容将被尽快审核。如果你的文章或想法适合我们的博客，我们将直接与你联系。

> 请在标题或主题中添加 [博客文章] 以确保你的电子邮件被我们及时看到。

## 贡献 API 参考

如需为 Milvus SDK 参考文档做出贡献，请访问其特定编程语言的仓库。

- [Python ORM](https://github.com/milvus-io/pymilvus-orm)

- [GoLang](https://github.com/milvus-io/milvus-sdk-go)

## 社区文档

为 Milvus 社区文档做出贡献，请访问 [社区文档库](https://github.com/milvus-io/web-content)。

