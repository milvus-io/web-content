---
id: install-go.md
label: Install GO SDK
related_key: SDK
order: 2
group: install-pymilvus.md
summary: Learn how to install the GO SDK of Milvus.
---

# Install Milvus SDK

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
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)


