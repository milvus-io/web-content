# query_iterator()

This operation returns a Python iterator for you to iterate over the query results. It is useful especially when the query result contains a large volume of data.

## Request Syntax

```python
query_iterator(
    batch_size: int, 
    limit: int, 
    expr: str | None, 
    output_fields: list[str] | None, 
    partition_names: list[str] | None, 
    timeout: float | None
)
```

**PARAMETERS:**

- **batch_size** (*int*)

    The number of entities to return each time you call `next()` on the current iterator.

    The value defaults to **1000**. Set it to a proper value to control the number of entities to return per iteration.

- **limit** (*int*)

    The total number of entities to return.

    The value defaults to **-1**, indicating all matching entities will be in return.

- **expr** (*str*)

    A scalar filtering condition to filter matching entities.

    The value defaults to **None**, indicating that scalar filtering is ignored. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md).

- **output_fields** (*list*)

    A list of field names to include in each entity in return.

    The value defaults to **None**. If left unspecified, only the primary field is included.

- **partition_names** (*list*)

    A list of partition names.

    The value defaults to **None**. If specified, only the specified partitions are involved in queries.

- **timeout** (*float*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*QueryIterator*

**RETURNS:**

A **QueryIterator** for you to iterate over the query result.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Insert a list of columns
res = collection.insert(
    data=[
        [0,1,2,3,4,5,6,7,8,9],               # id
        [                                    # vector
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ],
    ]
)

# Create a query iterator
iterator = collection.query_iterator(
    batch_size=2,
    limit=10,
    expr="id > 3",
    output_fields=["id", "vector"]
)

# Start iterating
while True:
    res = iterator.next()
    
    if not res:
        res.close()
        break
```

## Related operations

The following operations are related to `query_iterator()`:

- [delete()](delete.md)

- [insert()](insert.md)

- [search()](search.md)

- [search_iterator()](search_iterator.md)

- [query()](query.md)

- [upsert()](upsert.md)

