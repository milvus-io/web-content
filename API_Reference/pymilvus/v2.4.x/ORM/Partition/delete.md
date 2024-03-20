# delete()

This operation deletes entities from a partition with a boolean expression.

<div class="admonition note">

<p><b>notes</b></p>

<p>Using the <strong>partition_name</strong> parameter in the <strong>delete()</strong> method of a <strong>Collection</strong> object is equivalent to using the <strong>delete()</strong> method of a <strong>Partition</strong> object.</p>

</div>

## Request Syntax

```python
delete(
    expr: str, 
    timeout: float | None
)
```

__PARAMETERS:__

- __expr__ (_string_) -

    __[REQUIRED] __

    A boolean expression to filter the entities to delete.

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

    This arises when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection, Partition, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

partition = Partition(
    collection=collection,
    name="partition_a",
)

# Insert a list of columns
partition.insert(
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
res = partition.delete("id in [ 0, 1 ]")
```

## Related operations

The following operations are related to `delete()`:

- [flush()](./flush.md)

- [insert()](./insert.md)

- [query()](./query.md)

- [search()](./search.md)

- [upsert()](./upsert.md)

