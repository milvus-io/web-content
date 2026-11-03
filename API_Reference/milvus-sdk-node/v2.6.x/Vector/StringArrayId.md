# StringArrayId

A primary-key ID list given as strings.

```typescript
export interface StringArrayId {
  str_id: StringArray;
}
```

**FIELDS:**

- **str_id** (*StringArray*) -

    The string primary key values.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.insert({
    collection_name: 'my_collection',
    data: [{ id: 'a1', vector: [0.1, 0.2, 0.3, 0.4] }],
});

console.log(res.IDs); // StringArrayId, e.g. { str_id: ['a1'] }
```

