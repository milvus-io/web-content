
# delete()

This operation deletes entities with a boolean expression.

## Request Syntax

```python
delete(
    expr: str, 
    partition_name: str | None, 
    timeout: float | None
)
```

__PARAMETERS:__

- __expr__ (_string_) -

    __[REQUIRED] __

    A boolean expression to filter the entities to delete.

- __partition_name__ (_string_) -

    The name of partitions from which the matched entities are to be deleted.

    If a partition is specified, only its entities are involved in filtering. Otherwise, all entities in the collection are involved.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_MutationResult_

__RETURNS:__

A __MutationResult__ object that contains the following fields:

- __insert_count__ (_int_)

    The count of inserted entities.

- __delete_count__ (_int_)

    The count of deleted entities.

- __upsert_count__ (_int_)

    The count of upserted entities.

- __succ_count__ (_int_)

    The count of successful executions during this operation.

- __succ_index__ (_list_)

    A list of index numbers starting from 0, each indicating a successful operation.

- __err_count__ (_int_)

    The count of failed executions during this operation.

- __err_index__ (_list_)

    A list of index numbers starting from 0, each indicating a failed operation.

- __primary_keys__ (_list_)

    A list of primary keys for the inserted entities.

- __timestamp__ (_int_)

    The timestamp at which this operation is completed.

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
collection.insert(
    data=[
        [0,1,2,3,4],                         # id
        [                                    # vector
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ],
    ]
)

# Delete two entities
res = collection.delete("id in [ 0, 1 ]")

```

