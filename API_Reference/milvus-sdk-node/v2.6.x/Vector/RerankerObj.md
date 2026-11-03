# RerankerObj

Describes a reranker configuration for search.

```typescript
export type RerankerObj = {
  strategy: RANKER_TYPE | string; // rerank strategy
  params: keyValueObj; // rerank parameters
};

```

**FIELDS:**

- **strategy** (*RANKER_TYPE | string*) -

    The rerank strategy.

- **params** (*keyValueObj*) -

    The rerank parameters.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.hybridSearch({
    collection_name: 'my_collection',
    data: [
        {
            anns_field: 'dense_vector',
            data: [0.1, 0.2, 0.3, 0.4, 0.5],
        },
    ],
    limit: 10,
    rerank: { strategy: 'rrf', params: { k: 60 } }, // RerankerObj
    output_fields: ['id', 'text'],
});
```

