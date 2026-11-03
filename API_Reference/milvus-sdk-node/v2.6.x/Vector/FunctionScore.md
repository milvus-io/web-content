# FunctionScore

Describes a function-score reranking configuration for search.

```typescript
export interface FunctionScore {
  functions: FunctionObject[];
  params: keyValueObj;
}

```

**FIELDS:**

- **functions** (*FunctionObject[]*) -

    The functions applied to the search results. See FunctionObject.

- **params** (*keyValueObj*) -

    Extra parameters for the function-score reranking.

## Example

```javascript
import { MilvusClient, FunctionType } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const res = await milvusClient.search({
    collection_name: 'my_collection',
    vector: [0.1, 0.2, 0.3, 0.4],
    limit: 5,
    rerank: {
        functions: [
            {
                name: 'bounded_linear',
                type: FunctionType.RERANK,
                input_field_names: ['vector'],
                output_field_names: ['vector'],
                params: { boost: 2.0, bound: 10.0 },
            },
        ],
        params: {},
    },
});
```

