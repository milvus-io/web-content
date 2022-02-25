---
id: install-go.md
label: Install GO SDK
related_key: SDK
order: 2
group: install-pymilvus.md
summary: Learn how to install the GO SDK of Milvus.
---

# 安装 Milvus SDK




本主题介绍如何为 Milvus 安装 Milvus SDK。

当前版本的 Milvus 支持 Python、Node.js、GO 和 Java 的 SDK。

<div class="tab-wrapper"><a href="install-pymilvus.md" class=''>Install PyMilvus</a><a href="install-node.md" class=''>Install Node.js SDK</a><a href="install-go.md" class='active '>Install GO SDK</a><a href="install-java.md" class=''>Install Java SDK</a></div>

## 安装前提

要求 GO（1.15 或更高版本）。

## 安装 Milvus GO SDK

通过 `go get ` 安装 Milvus GO SDK 和相关依赖项。

```bash
$ go get -u github.com/milvus-io/milvus-sdk-go/v2
```

## 更多内容

安装 Milvus GO SDK 后，你可以：

- 了解更多 Milvus 的基本操作：
  - [连接 Milvus 服务器](manage_connection.md)
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)

