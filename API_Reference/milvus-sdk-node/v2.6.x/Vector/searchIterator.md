# searchIterator()

This operation conducts a vector similarity search iteratively and returns results in batches. Use this instead of a single `search()` call when you need to process large result sets incrementally or when the total result count exceeds what a single query can return.

```javascript
await milvusClient.searchIterator(data: SearchIteratorReq)
```

## Request Syntax

```javascript
await milvusClient.searchIterator({
    collection_name: string,
    data: SearchData | SearchData[],
    batchSize: number,
    limit?: number,
    filter?: string,
    anns_field?: string,
    output_fields?: string[],
    partition_names?: string[],
    params?: keyValueObj,
    metric_type?: string,
    consistency_level?: ConsistencyLevelEnum,
    ignore_growing?: boolean,
    group_by_field?: string,
    exprValues?: keyValueObj,
    rerank?: RerankerObj | FunctionObject | FunctionScore,
    transformers?: OutputTransformers,
    external_filter_fn?: (row: SearchResultData) => boolean,
    db_name?: string,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of the collection to search.

- **data** (*SearchData | SearchData[]*) -

    **[REQUIRED]**

    The query vector(s). Supported types include FloatVector (number[]), BFloat16Vector (Uint8Array), Float16Vector (Uint8Array), BinaryVector (number[]), and SparseFloatVector.

- **batchSize** (*number*) -

    **[REQUIRED]**

    The number of results to return per iteration. Cannot exceed 16,384.

- **limit** (*number*) -

    The maximum total number of results across all iterations. Defaults to the total count of matching entities (no limit).

- **filter** (*string*) -

    A scalar filtering condition to filter matching entities before the search. Defaults to an empty string (no filter).

- **anns_field** (*string*) -

    The name of the target vector field. Required when the collection has multiple vector fields.

- **output_fields** (*string[]*) -

    A list of field names to include in each returned entity. Only the primary field is included by default.

- **partition_names** (*string[]*) -

    The names of the partitions to search.

- **params** (*keyValueObj*) -

    Additional search parameters as key-value pairs, such as `radius` and `range_filter` for range searches.

- **metric_type** (*string*) -

    The metric type used to measure similarity between vectors. Defaults to the metric type of the indexed field.

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level for this operation. Options: Strong (0), Bounded (1), Session (2), Eventually (3). Defaults to Bounded.

- **ignore_growing** (*boolean*) -

    Whether to skip growing segments during the search.

- **group_by_field** (*string*) -

    Groups search results by the specified field to ensure diversity.

- **exprValues** (*keyValueObj*) -

    Placeholder values for a templated filter expression.

- **rerank** (*RerankerObj | FunctionObject | FunctionScore*) -

    A reranking strategy and its parameters. See `search()` for details on supported reranker types.

- **transformers** (*OutputTransformers*) -

    Custom transformers for special vector data types such as BFloat16Vector and Float16Vector.

- **external_filter_fn** (*(row: SearchResultData) => boolean*) -

    An optional client-side filter function applied to each batch of results. Entities for which this function returns `false` are excluded from the yielded batch.

- **db_name** (*string*) -

    The name of the database containing the collection.

**RETURNS:**

*Promise\<AsyncIterable\<SearchResultData[]\>\>*

Returns an async iterable. Each iteration yields an array of matching entities for that batch. Iteration ends when the total result count reaches `limit` or all matching entities are exhausted.

**EXCEPTIONS:**

- **MilvusError**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const iterator = await milvusClient.searchIterator({
    collection_name: 'my_collection',
    data: [0.1, 0.2, 0.3, 0.4, 0.5],
    batchSize: 100,
    limit: 500,
    output_fields: ['id', 'text'],
    filter: 'age > 18',
});

for await (const batch of iterator) {
    console.log(\`Batch of ${batch.length} results:\`, batch);
}
```
