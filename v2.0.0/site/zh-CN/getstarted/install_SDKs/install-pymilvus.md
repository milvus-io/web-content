---
id: install-pymilvus.md
label: Install PyMilvus
related_key: SDK
order: 0
group: install-pymilvus.md
summary: Learn how to install the Python SDK of Milvus.
---

# 安装 Milvus SDK



本主题介绍如何为 Milvus 安装 Milvus SDK。

当前版本的 Milvus 支持 Python、Node.js、GO 和 Java 的 SDK。

<div class="tab-wrapper"><a href="install-pymilvus.md" class='active '>Install PyMilvus</a><a href="install-node.md" class=''>Install Node.js SDK</a><a href="install-go.md" class=''>Install GO SDK</a><a href="install-java.md" class=''>Install Java SDK</a></div>

## 安装前提

要求 Python 3（3.71 或更高版本）。


## 通过 pip 安装 PyMilvus

PyMilvus 在 [Python Package Index](https://pypi.org/project/pymilvus/) 中提供。

<div class="alert note">
建议安装与你安装的 Milvus 服务器版本相匹配的 PyMilvus 版本。有关详细信息，请参阅<a href="release_notes.md">发版说明</a>。
</div>

```
$ python3 -m pip install pymilvus==2.0.1
```

## 验证安装

如果 PyMilvus 安装正确，运行以下命令不会引发异常。

```
$ python3 -c "from pymilvus import Collection"
```



## 更多内容

安装 PyMilvus 后，你可以：

- 了解更多 Milvus 的基本操作：
  - [连接 Milvus 服务器](manage_connection.md)
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)

- 探索 [PyMilvus API 参考](/api-reference/pymilvus/v2.0.1/tutorial.html)
