# queryIterator()

This operation conducts a scalar filtering query iteratively and returns results in batches. Use this instead of a single query() call when you need to process large result sets incrementally or when the total result count exceeds what a single query can return.

```javascript
await milvusClient.queryIterator(data: QueryIteratorReq)
```

## Request Syntax

```javascript
await milvusClient.queryIterator({
    collection_name: string,
    batchSize: number,
    filter?: string,
    expr?: string,
    exprValues?: keyValueObj,
    params?: keyValueObj,
    group_by_fields?: string[],
    order_by_fields?: OrderByFields,
    order_by?: OrderByFields,
    transformers?: OutputTransformers,
    limit?: number,
    output_fields?: string[],
    partition_names?: string[],
    consistency_level?: ConsistencyLevelEnum,
    db_name?: string,
    timeout?: number,
})
```

**PARAMETERS:**

- **collection_name** (*string*) -

    **[REQUIRED]**

    The name of an existing collection.

- **batchSize** (*number*) -

    **[REQUIRED]**

    The number of entities to return per iteration. Cannot exceed 16,384.

- **filter** (*string*) -

    A scalar filtering condition to filter matching entities. Set to an empty string to return all entities. To build a scalar filtering condition, refer to Boolean Expression Rules.

- **expr** (*string*) -

    An alias of **filter**. Provide either **filter** or **expr**, not both.

- **exprValues** (*keyValueObj*) -

    If you use placeholders in the filter expression, you can specify the actual values for these placeholders as key-value pairs.

- **params** (*keyValueObj*) -

    Additional query parameters in key-value pairs.

- **group_by_fields** (*string[]*) -

    The scalar fields used to group the aggregation results.

- **order_by_fields** (*[OrderByFields](OrderByFields.md)*) -

    The fields to order the query results by.

- **order_by** (*[OrderByFields](OrderByFields.md)*) -

    An alias of **order_by_fields**.

- **transformers** (*[OutputTransformers](OutputTransformers.md)*) -

    A custom function to convert data for specific data types.

- **limit** (*number*) -

    The maximum total number of entities to return across all iterations. Defaults to the total count of matching entities (no limit).

- **output_fields** (*string[]*) -

    A list of field names to include in each returned entity. All fields are returned by default.

- **partition_names** (*string[]*) -

    The names of the partitions to query.

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level for this operation. Options: Strong (0), Session (1), Bounded (2), Eventually (3). Defaults to the consistency level set when the collection was created.

- **db_name** (*string*) -

    The name of the database containing the collection.

- **timeout** (*number*) -

    The timeout duration for this operation in milliseconds.

**RETURNS:**

*Promise<AsyncIterable<object[]>>*

Returns an async iterable. Each iteration yields an array of entities for that batch. Iteration ends when the total result count reaches `limit` or all matching entities are exhausted.

**EXCEPTIONS:**

- **Error**

    This exception will be raised when any error occurs during this operation.

## Example

```javascript
import { MilvusClient } from '@zilliz/milvus2-sdk-node';

const milvusClient = new MilvusClient({
    address: 'localhost:19530',
    token: 'root:Milvus',
});

const iterator = await milvusClient.queryIterator({
    collection_name: 'my_collection',
    filter: 'age > 30',
    batchSize: 100,
    limit: 500,
    output_fields: ['id', 'age', 'text'],
});

for await (const batch of iterator) {
    console.log(`Batch of ${batch.length} entities:`, batch);
}
```
