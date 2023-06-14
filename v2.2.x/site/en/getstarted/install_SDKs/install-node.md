---
id: install-node.md
label: Install Node.js SDK
related_key: SDK
summary: Learn how to install the Node.js SDK of Milvus.
---

# Install Milvu Nodejs SDK

This topic describes how to install Milvus Node.js SDK for Milvus.

## Compatibility

The following collection shows Milvus versions and recommended @zilliz/milvus2-sdk-node versions:

| Milvus version | Recommended @zilliz/milvus2-sdk-node version |
| :------------: | :------------------------------------------: |
|     2.2.x      |                    2.2.x                     |
|     2.1.x      |                    2.1.x                     |
|     2.0.1      |                 2.0.0, 2.0.1                 |
|     2.0.0      |                    2.0.0                     |

## Requirement

Node.js v12+

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
  - [Connect to Milvus server](manage_connection.md)
  - [Create a collection](create_collection.md)
  - [Create a partition](create_partition.md)
  - [Insert data](insert_data.md)
  - [Conduct a vector search](search.md)

- Explore [Milvus Node.js API reference](/api-reference/node/v2.2.x/About.md)

