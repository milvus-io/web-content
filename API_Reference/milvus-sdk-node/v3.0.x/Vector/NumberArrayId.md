# NumberArrayId

A primary-key ID list given as numbers.

```typescript
export interface NumberArrayId {
  int_id: NumberArray;
}
```

**FIELDS:**

- **int_id** (*NumberArray*) -

    The numeric primary key values.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.insert({
    collection_name: 'my_collection',
    data: [{ id: 1, vector: [0.1, 0.2, 0.3, 0.4] }],
});

console.log(res.IDs); // NumberArrayId, e.g. { int_id: [1] }
```

