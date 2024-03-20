
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

__PARAMETERS:__

- __batch_size__ (_int_)

    The number of entities to return each time you call `next()` on the current iterator.

    The value defaults to __1000__. Set it to a proper value to control the number of entities to return per iteration.

- __limit__ (_int_)

    The total number of entities to return.

    The value defaults to __-1__, indicating all matching entities will be in return.

- __expr__ (_str_)

    A scalar filtering condition to filter matching entities.

    The value defaults to __None__, indicating that scalar filtering is ignored. To build a scalar filtering condition, refer to [Boolean Expression Rules](https://milvus.io/docs/boolean.md).

- __output_fields__ (_list_)

    A list of field names to include in each entity in return.

    The value defaults to __None__. If left unspecified, only the primary field is included.

- __partition_names__ (_list_)

    A list of partition names.

    The value defaults to __None__. If specified, only the specified partitions are involved in queries.

- __timeout__ (_float_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_QueryIterator_

__RETURNS:__

A __QueryIterator__ for you to iterate over the query result.

__EXCEPTIONS:__

- __MilvusException__

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

