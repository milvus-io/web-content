---
id: install-go.md
label: Install GO SDK
related_key: SDK
summary: Learn how to install the GO SDK of Milvus.
title: Install Milvus Go SDK
---

# Install Milvus Go SDK

This topic describes how to install Milvus Go SDK for Milvus.

Current version of Milvus supports SDKs in Python, Node.js, GO, and Java.

## Requirement

GO (1.17 or later) is required.

## Install Milvus GO SDK

Install the Milvus GO SDK and dependencies via `go get`.

```bash
$ go get -u github.com/milvus-io/milvus-sdk-go/v2
```

## What's next

Having installed Milvus GO SDK, you can:

- Learn the basic operations of Milvus:
  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)


