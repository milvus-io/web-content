---
id: install-java.md
label: Install Java SDK
related_key: SDK
order: 3
group: install-pymilvus.md
summary: Learn how to install the Java SDK of Milvus.
---

# 安装 Milvus SDK




本主题介绍如何为 Milvus 安装 Milvus SDK。

当前版本的 Milvus 支持 Python、Node.js、GO 和 Java 的 SDK。

<div class="tab-wrapper"><a href="install-pymilvus.md" class=''>Install PyMilvus</a><a href="install-node.md" class=''>Install Node.js SDK</a><a href="install-go.md" class=''>Install GO SDK</a><a href="install-java.md" class='active '>Install Java SDK</a></div>

## 安装前提

- Java （8 或更高版本）
- Apache Maven 或者 Gradle/Grails

## 安装 Milvus Java SDK

运行以下命令安装 Milvus Java SDK。

- Apache Maven

```xml
<dependency>
    <groupId>io.milvus</groupId>
    <artifactId>milvus-sdk-java</artifactId>
    <version>2.0.0</version>
</dependency>
```

- Gradle/Grails

```
compile 'io.milvus:milvus-sdk-java:2.0.0'
```

## 更多内容

安装 Milvus Java SDK 后，你可以：

- 了解更多 Milvus 的基本操作：
  - [连接 Milvus 服务器](manage_connection.md)
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)

- 探索 [Milvus Java API 参考](/api-reference/java/v2.0.4/index.html)

