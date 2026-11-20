# CreateIndexParam

The index parameters accepted when creating an index or defining the index parameters of a collection.

```typescript
export interface CreateIndexParam {
  index_type?: string;
  metric_type: string;
  params?: string;
}
```

**FIELDS:**

- **index_type** (*string*) -

    The type of the index to create, for example `IndexType.HNSW`. Optional when the index type is inferred elsewhere.

- **metric_type** (*string*) -

    **[REQUIRED]**

    The metric type used to measure similarity, for example `MetricType.L2`.

- **params** (*string*) -

    Optional index parameters, for example `{ M: 5, efConstruction: 8 }`.

## Example

```javascript
import { MilvusClient, IndexType, MetricType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

await milvusClient.createIndex({
    collection_name: 'my_collection',
    field_name: 'vector',
    extra_params: {
        index_type: IndexType.HNSW,
        metric_type: MetricType.L2,
        params: '{"M": 8, "efConstruction": 64}',
    },
});
```
