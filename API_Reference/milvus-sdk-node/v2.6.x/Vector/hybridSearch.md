# hybridSearch()

This operation conducts a hybrid search across multiple vector fields with an optional scalar filtering expression and returns the merged, reranked results.

```javascript
await milvusClient.hybridSearch(data: HybridSearchReq)
```

## Request Syntax

```javascript
await milvusClient.hybridSearch({
    collection_name: string,
    data: HybridSearchSingleReq[],
    limit?: number,
    offset?: number,
    output_fields?: string[],
    filter?: string,
    rerank?: RerankerObj | FunctionObject | FunctionScore,
    partition_names?: string[],
    metric_type?: string,
    consistency_level?: ConsistencyLevelEnum,
    ignore_growing?: boolean,
    group_by_field?: string,
    group_size?: number,
    strict_group_size?: boolean,
    hints?: string,
    round_decimal?: number,
    transformers?: OutputTransformers,
    db_name?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to search.

- **data** (*HybridSearchSingleReq[]*) -

    **[REQUIRED]**

    A list of sub-search requests, one per vector field. Each element defines the query vector and target field for a single-vector sub-search. For the full field reference, see the HybridSearchSingleReq section below.

- **limit** (*number*) -

    The total number of entities to return. The sum of this value and `offset` must be less than 16,384.

- **offset** (*number*) -

    The number of records to skip in the search result. The sum of this value and `limit` must be less than 16,384.

- **output_fields** (*string[]*) -

    A list of field names to include in each returned entity. Only the primary field is included by default.

- **filter** (*string*) -

    A top-level scalar filtering condition applied after the hybrid search results are merged. Defaults to an empty string.

- **rerank** (*RerankerObj \| FunctionObject \| FunctionScore*) -

    A reranking strategy for combining results from multiple sub-searches. See `search()` for the full rerank parameter schema.

- **partition_names** (*string[]*) -

    The names of the partitions to search.

- **metric_type** (*string*) -

    The metric type used to measure similarity between vectors.

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level of the target collection. Options: `Strong` (0), `Bounded` (1), `Session` (2), `Eventually` (3). Defaults to `Bounded`.

- **ignore_growing** (*boolean*) -

    Whether to skip growing segments during the search.

- **group_by_field** (*string*) -

    Groups search results by the specified field to ensure diversity and avoid returning multiple results from the same group.

- **group_size** (*number*) -

    The target number of entities to return within each group in a grouping search.

- **strict_group_size** (*boolean*) -

    Whether to strictly enforce `group_size`. When `true`, the system attempts to fill each group with exactly `group_size` results.

- **hints** (*string*) -

    A hints string to improve search performance.

- **round_decimal** (*number*) -

    The number of decimal places to keep in the final scores.

- **transformers** (*OutputTransformers*) -

    Custom transformers for special vector data types such as BFloat16Vector and Float16Vector.

- **db_name** (*string*) -

    The name of the database containing the collection.

- **timeout** (*number*) -

    The timeout duration for this operation in milliseconds.

**RETURNS:**

*Promise\<SearchResults\>*

This method returns a promise that resolves to a `SearchResults` object.

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## HybridSearchSingleReq

Each element in the `data` array is a **HybridSearchSingleReq** object that defines a single-vector sub-search request.

**PARAMETERS:**

- **data** (*SearchData*) -

    **[REQUIRED]**

    The query vector for this sub-search. Can be a dense vector (`number[]`), a sparse vector (`SparseVectorDic`), or a text string for text-based search.

- **anns_field** (*string*) -

    **[REQUIRED]**

    The name of the vector field to search within this sub-request.

- **filter** (*string*) -

    A scalar filtering condition applied only to this sub-search.

- **exprValues** (*keyValueObj*) -

    Template values for the filter expression in key-value pairs.

- **params** (*keyValueObj*) -

    Index-specific search parameters in key-value pairs.

- **ignore_growing** (*boolean*) -

    Whether to skip growing segments during this sub-search.

- **group_by_field** (*string*) -

    Groups results by the specified field to ensure diversity within this sub-search.

- **transformers** (*OutputTransformers*) -

    Custom transformers for special vector types such as BFloat16Vector and Float16Vector.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const results = await milvusClient.hybridSearch({
    collection_name: 'my_collection',
    data: [
        {
            anns_field: 'dense_vector',
            data: [0.1, 0.2, 0.3, 0.4, 0.5],
        },
        {
            anns_field: 'sparse_vector',
            data: { 1: 0.5, 42: 0.8, 100: 0.3 },
        },
    ],
    limit: 10,
    rerank: { strategy: 'rrf', params: { k: 60 } },
    output_fields: ['id', 'text'],
});

console.log(results.results);
```

