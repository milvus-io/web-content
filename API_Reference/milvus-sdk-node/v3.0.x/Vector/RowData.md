# RowData

One data row for insert or upsert: a record keyed by field name.

```typescript
export interface RowData {
  [x: string]: FieldData;
}
```

**FIELDS:**

- **[field: string]** (*FieldData*) -

    The field value, keyed by the field name.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.insert({
    collection_name: 'my_collection',
    data: [
        { id: 1, vector: [0.1, 0.2, 0.3, 0.4], text: 'Hello' },
        { id: 2, vector: [0.5, 0.6, 0.7, 0.8], text: 'World' },
    ],
});
```

