# searchIterator()

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

- **limit** (*number*) -

    The maximum total number of entities to return across all iterations. Defaults to the total count of matching entities (no limit).

- **output_fields** (*string[]*) -

    A list of field names to include in each returned entity. All fields are returned by default.

- **partition_names** (*string[]*) -

    The names of the partitions to query.

- **consistency_level** (*ConsistencyLevelEnum*) -

    The consistency level for this operation. Options: Strong (0), Bounded (1), Session (2), Eventually (3). Defaults to the consistency level set when the collection was created.

- **db_name** (*string*) -

    The name of the database containing the collection.

- **timeout** (*number*) -

    The timeout duration for this operation in milliseconds.

- **order_by_fields** (*OrderByFields*) -

    The fields to order the search results by. Optional.

**RETURNS:**

*Promise\<AsyncIterable\<object[]\>\>*

Returns an async iterable. Each iteration yields an array of entities for that batch. Iteration ends when the total result count reaches `limit` or all matching entities are exhausted.

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
