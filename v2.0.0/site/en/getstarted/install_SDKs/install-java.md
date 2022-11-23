---
id: install-java.md
label: Install Java SDK
related_key: SDK
order: 3
group: install-pymilvus.md
summary: Learn how to install the Java SDK of Milvus.
---

# Install Milvus SDK

This topic describes how to install Milvus SDK for Milvus.

Current version of Milvus supports SDKs in Python, Node.js, GO, and Java.

<div class="tab-wrapper"><a href="install-pymilvus.md" class=''>Install PyMilvus</a><a href="install-node.md" class=''>Install Node.js SDK</a><a href="install-go.md" class=''>Install GO SDK</a><a href="install-java.md" class='active '>Install Java SDK</a></div>

## Requirement

- Java (8 or later)
- Apache Maven or Gradle/Grails

## Install Milvus Java SDK

Run the following command to install Milvus Java SDK.

- Apache Maven

```xml
<dependency>
    <groupId>io.milvus</groupId>
    <artifactId>milvus-sdk-java</artifactId>
    <version>2.0.4</version>
</dependency>
```

- Gradle/Grails

```
compile 'io.milvus:milvus-sdk-java:2.0.4'
```

## What's next

Having installed Milvus Java SDK, you can:

- Learn the basic operations of Milvus:
  - [Connect to Milvus server](manage_connection.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore [Milvus Java API reference](https://github.com/milvus-io/milvus-sdk-java/tree/v2.0.4/doc)

