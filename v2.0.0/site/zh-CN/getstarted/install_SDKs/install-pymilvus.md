---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
order: 0
group: sdk
summary: Learn how to install the Python SDK of Milvus.
---

# Install Milvus SDK

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>Edit this page</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">发起 GitHub Issue</a>。
</div>

This topic describes how to install Milvus SDK for Milvus.

Current version of Milvus supports SDKs in Python and Node.js.

<div class="tab-wrapper"><a href="install-pymilvus.md" class='active '>Install PyMilvus</a><a href="install-node.md" class=''>Install Node.js SDK</a></div>

## Requirement

Python 3 (3.71 or later) is required.

## Install PyMilvus via pip

PyMilvus is available in [Python Package Index](https://pypi.org/project/pymilvus/).

<div class="alert note">
It is recommended to install a PyMilvus version that matches the version of the Milvus server you installed. For example, install PyMilvus v2.0.0rc7 for Milvus 2.0.0-RC7.
</div>

```
$ python3 -m pip install pymilvus==2.0.0rc9
```

## Verify Installation

If PyMilvus is correctly installed, no exception will be raised when you run the following command.

```
$ python3 -c "from pymilvus import Collection"
```



## What's next

Having installed PyMilvus, You can:

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc9/tutorial.html)

