---
id: install-node.md
label: Install Node.js SDK
related_key: SDK
summary: Learn how to install the Node.js SDK of Milvus.
title: Install Milvus Nodejs SDK
---

# Install Milvus Nodejs SDK

This topic describes how to install Milvus Node.js SDK for Milvus.

## Compatibility

The following collection shows Milvus versions and recommended @zilliz/milvus2-sdk-node versions:

| Milvus version | Recommended @zilliz/milvus2-sdk-node version |
| :------------: | :------------------------------------------: |
|     2.5.x      |                    latest                    |
|     2.4.x      |                    2.4.10                    |
|     2.3.x      |                    2.3.5                     |
|     2.2.x      |                    2.2.x                     |
|     2.1.x      |                    2.1.x                     |
|     2.0.1      |                 2.0.0, 2.0.1                 |
|     2.0.0      |                    2.0.0                     |

## Requirement

Node.js v18+

## Installation

The recommended way to get started using the Milvus node.js client is by using npm (Node package manager) to install the dependency in your project.

```javascript
npm install @zilliz/milvus2-sdk-node
# or ...
yarn add @zilliz/milvus2-sdk-node
```

This will download the Milvus node.js sdk and add a dependency entry in your package.json file.

## What's next

Having installed Milvus Node.js SDK, you can:

- View [quick start of milvus node.js sdk](https://github.com/milvus-io/milvus-sdk-node)
- Learn the basic operations of Milvus:

  - [Manage Collections](manage-collections.md)
  - [Manage Partitions](manage-partitions.md)
  - [Insert, Upsert & Delete](insert-update-delete.md)
  - [Single-Vector Search](single-vector-search.md)
  - [Hybrid Search](multi-vector-search.md)

- Explore [Milvus Node.js API reference](/api-reference/node/v2.4.x/About.md)
