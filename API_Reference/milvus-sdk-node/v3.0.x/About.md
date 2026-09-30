# About Milvus-sdk-node

Milvus-sdk-node is the Node.js SDK of Milvus, an open-source vector database. Its source code is available on [GitHub](https://github.com/milvus-io/milvus-sdk-node).

## Dependencies

- [Milvus](https://milvus.io/)
- [Zilliz Cloud](https://cloud.zilliz.com/signup)
- Node: v14+

## Installation

The recommended way to get started using the Milvus Node.js client is by using npm (Node package manager) to install the dependency in your project.

```javascript
npm install @zilliz/milvus2-sdk-node
# or ...
yarn add @zilliz/milvus2-sdk-node
```

This will download the Milvus Node.js client and add a dependency entry in your package.json file.

## Quick Start

The following example connects to Milvus, creates a collection, and runs a vector search using the MilvusClient API.

```javascript
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

// Create a collection
await client.createCollection({
    collection_name: 'hello_milvus',
    dimension: 3,
    primary_field_name: 'id',
    id_type: DataType.Int64,
    metric_type: 'COSINE',
    vector_field_name: 'vector',
});

// Insert an entity
await client.insert({
    collection_name: 'hello_milvus',
    data: [
        { id: 1, vector: [1, 2, 3] },
    ],
});

// Create an index on the vector field
await client.createIndex({
    collection_name: 'hello_milvus',
    field_name: 'vector',
    index_type: 'AUTOINDEX',
    metric_type: 'COSINE',
});

// Load the collection
await client.loadCollectionSync({
    collection_name: 'hello_milvus',
});

// Search
const res = await client.search({
    collection_name: 'hello_milvus',
    data: [1, 2, 3],
    limit: 1,
    consistency_level: 'Strong',
});

// Drop the collection
await client.dropCollection({
    collection_name: 'hello_milvus',
});

// Disconnect
client.closeConnection();
```

## Compatibility

The following table shows the recommended @zilliz/milvus2-sdk-node versions for each Milvus version. Milvus proto is backward compatible, so a later SDK version can work with an earlier Milvus server.

| Milvus version | Node sdk version | Installation                        |
| :------------: | :--------------: | :---------------------------------- |
|    v2.2.0+     |    **latest**    | `yarn add @zilliz/milvus2-sdk-node` |
|    v2.3.0+     |    **latest**    | `yarn add @zilliz/milvus2-sdk-node` |
|    v2.4.0+     |    **latest**    | `yarn add @zilliz/milvus2-sdk-node` |
|    v2.5.0+     |    **latest**    | `yarn add @zilliz/milvus2-sdk-node` |
|    v2.6.0+     |    **latest**    | `yarn add @zilliz/milvus2-sdk-node` |
|    v3.0.0+     |    **latest**    | `yarn add @zilliz/milvus2-sdk-node` |

## Contributing

We are committed to building a collaborative, exuberant open-source community for Milvus. Therefore, contributions to the Milvus Node.js SDK are welcome from everyone. Refer to the [Contributing Guideline](https://github.com/milvus-io/milvus-sdk-node/blob/master/CONTRIBUTING.md) before making contributions to this project. You can [file an issue](https://github.com/milvus-io/milvus-sdk-node/issues/new) if you need any assistance or want to propose your ideas.

## License

[Apache License 2.0](LICENSE)
