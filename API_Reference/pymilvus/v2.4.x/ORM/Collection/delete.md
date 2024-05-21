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

**PARAMETERS:**

- **expr** (*string*) -

    **[REQUIRED]** 

    A boolean expression to filter the entities to delete.

- **partition_name** (*string*) -

    The name of partitions from which the matched entities are to be deleted.

    If a partition is specified, only its entities are involved in filtering. Otherwise, all entities in the collection are involved.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*MutationResult*

**RETURNS:**

A **MutationResult** object that contains the following fields:

- **insert_count** (*int*)

    The count of inserted entities.

- **delete_count** (*int*)

    The count of deleted entities.

- **upsert_count** (*int*)

    The count of upserted entities.

- **succ_count** (*int*)

    The count of successful executions during this operation.

- **succ_index** (*list*)

    A list of index numbers starting from 0, each indicating a successful operation.

- **err_count** (*int*)

    The count of failed executions during this operation.

- **err_index** (*list*)

    A list of index numbers starting from 0, each indicating a failed operation.

- **primary_keys** (*list*)

    A list of primary keys for the inserted entities.

- **timestamp** (*int*)

    The timestamp at which this operation is completed.

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

## Related operations

The following operations are related to `delete()`:

- [insert()](insert.md)

- [search()](search.md)

- [search_iterator()](search_iterator.md)

- [query()](query.md)

- [query_iterator()](query_iterator.md)

- [upsert()](upsert.md)

