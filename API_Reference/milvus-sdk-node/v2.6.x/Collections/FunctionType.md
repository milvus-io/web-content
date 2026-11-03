# FunctionType

Defines the type of a schema function that transforms raw data into vectors.

```typescript
export enum FunctionType {
  Unknown = 0,
  BM25 = 1,
  TEXTEMBEDDING = 2,
  RERANK = 3,
}
```

**Constants:**

- **Unknown** (0)

    Sets the function type to **Unknown**.

- **BM25** (1)

    Sets the function type to **BM25**, a sparse-vector function based on the BM25 algorithm.

- **TEXTEMBEDDING** (2)

    Sets the function type to **TEXTEMBEDDING**, a text-embedding function that produces dense vectors.

- **RERANK** (3)

    Sets the function type to **RERANK**, a reranking function.

## Example

```javascript
import { MilvusClient, FunctionType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

await milvusClient.createCollection({
    collection_name: 'my_collection',
    functions: [
        {
            name: 'bm25_fn',
            type: FunctionType.BM25,
            input_field_names: ['text'],
            output_field_names: ['sparse_vector'],
            params: {},
        },
    ],
});
```

