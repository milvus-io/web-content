---
id: install-java.md
label: Install Java SDK
related_key: SDK
summary: Learn how to install the Java SDK of Milvus.
title: Install Milvus Java SDK
---

# Install Milvus Java SDK

This topic describes how to install Milvus Java SDK for Milvus.

Current version of Milvus supports SDKs in Python, Node.js, GO, and Java.

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
    <version>2.5.7</version>
</dependency>
```

- Gradle/Grails

```
implementation 'io.milvus:milvus-sdk-java:2.5.7'
```

## What's next

Having installed Milvus Java SDK, you can:

- Learn the basic operations of Milvus:
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- Explore [Milvus Java API reference](/api-reference/java/v2.4.x/About.md)

