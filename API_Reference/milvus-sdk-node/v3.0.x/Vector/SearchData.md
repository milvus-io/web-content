# SearchData

A search target entry: one of the supported search input forms.

```typescript
export type SearchData = SearchVector | SearchText | SearchEmbList;

```

**FIELDS:**

- **SearchVector**

    Vector inputs.

- **SearchText**

    Text inputs for full-text / embedding search.

- **SearchEmbList**

    Embedding-list inputs.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.search({
    collection_name: 'my_collection',
    vector: [0.1, 0.2, 0.3, 0.4], // SearchData (SearchVector)
    limit: 5,
});
```

