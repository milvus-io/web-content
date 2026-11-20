# InsertTransformers

Custom data transformers used to convert `BFloat16Vector` and `Float16Vector` values into the `Uint8Array` byte buffers the Milvus server accepts.

```typescript
export type InsertTransformers = {
  [DataType.BFloat16Vector]?: (bf16: BFloat16Vector) => Uint8Array;
  [DataType.Float16Vector]?: (f16: Float16Vector) => Uint8Array;
};
```

**FIELDS:**

- **DataType.BFloat16Vector** (*((bf16: BFloat16Vector) => Uint8Array)*) -

    Optional transformer for `BFloat16Vector` values.

- **DataType.Float16Vector** (*((f16: Float16Vector) => Uint8Array)*) -

    Optional transformer for `Float16Vector` values.

## Example

```javascript
import { MilvusClient, DataType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

await milvusClient.insert({
    collection_name: 'my_collection',
    data: [{ id: 1, vector: [0.1, 0.2, 0.3] }],
    transformers: {
        [DataType.Float16Vector]: f16 => f16, // convert to Uint8Array before insert
    },
});
```
