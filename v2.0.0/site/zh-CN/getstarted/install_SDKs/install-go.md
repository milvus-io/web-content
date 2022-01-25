---
id: install-go.md
label: Install GO SDK
related_key: SDK
order: 2
group: install-pymilvus.md
summary: Learn how to install the GO SDK of Milvus.
---

# Install Milvus SDK

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>



This topic describes how to install Milvus SDK for Milvus.

Current version of Milvus supports SDKs in Python, Node.js, GO, and Java.

<div class="tab-wrapper"><a href="install-pymilvus.md" class=''>Install PyMilvus</a><a href="install-node.md" class=''>Install Node.js SDK</a><a href="install-go.md" class='active '>Install GO SDK</a><a href="install-java.md" class=''>Install Java SDK</a></div>

## Requirement

GO (1.15 or later) is required.

## Install Milvus GO SDK

Install the Milvus GO SDK and dependencies via `go get`.

```bash
$ go get -u github.com/milvus-io/milvus-sdk-go/v2
```

## What's next

Having installed Milvus GO SDK, you can:

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [Milvus GO API reference](/api-reference/node/v/tutorial.html)

