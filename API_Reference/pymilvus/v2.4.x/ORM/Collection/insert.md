# insert()

This operation inserts data into the current collection.

## Request Syntax

```python
insert(
    data: List | pandas.DataFrame | Dict, 
    partition_name: str | None, 
    timeout: float | None, 
)
```

__PARAMETERS:__

- __data__ (_list_ | _dict_ | _pandas.DataFrame_) -

    __[REQUIRED]__

    The data to insert into the current collection.

    The data to insert should match the schema of the current collection. You can organize your data into:

    - A list of columns

        Each column is a list of values of all entities in that column.

        ```python
        data = [
            [0,1,2,3,4],                         # id
            [                                    # vector
                [0.1,0.2,-0.3,-0.4,0.5],
                [0.3,-0.1,-0.2,-0.6,0.7],
                [-0.6,-0.3,0.2,0.8,0.7],
                [0.6,0.2,-0.3,-0.8,0.5],
                [0.3,0.1,-0.2,-0.6,-0.7],
            ],
        ]
        ```

    - A __pandas.DataFrame__

        You can form a data frame in any way, as demonstrated in the __Example__ section on [this page](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

        ```python
        data = pd.DataFrame({
            "id": [5,6,7,8,9],
            "vector": [
                [0.1,0.2,-0.3,-0.4,0.5],
                [0.3,-0.1,-0.2,-0.6,0.7],
                [-0.6,-0.3,0.2,0.8,0.7],
                [0.6,0.2,-0.3,-0.8,0.5],
                [0.3,0.1,-0.2,-0.6,-0.7],
            ]
        })
        ```

    - A list of rows or just a row

        Each row is a dictionary that represents an entity.

        ```python
        data = [
            {"id": 10, "vector": [0.1,0.2,-0.3,-0.4,0.5]},
            {"id": 11, "vector": [0.3,-0.1,-0.2,-0.6,0.7]},
            {"id": 12, "vector": [-0.6,-0.3,0.2,0.8,0.7]},
            {"id": 13, "vector": [0.6,0.2,-0.3,-0.8,0.5]},
            {"id": 14, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
        ]
        
        # or 
        
        data = {"id": 15, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
        ```

- __partition_name__ (_string _|_ None_) -

    The name of a partition in the current collection. 

    If specified, the data is to be inserted into the specified partition.

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
res = collection.insert(
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

# Insert a data frame
import pandas as pd

res = collection.insert(
    data=pd.DataFrame({
        "id": [5,6,7,8,9],
        "vector": [
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ]
    })
)

# Insert a list of dictionaries
res = collection.insert(
    data=[
        {"id": 10, "vector": [0.1,0.2,-0.3,-0.4,0.5]},
        {"id": 11, "vector": [0.3,-0.1,-0.2,-0.6,0.7]},
        {"id": 12, "vector": [-0.6,-0.3,0.2,0.8,0.7]},
        {"id": 13, "vector": [0.6,0.2,-0.3,-0.8,0.5]},
        {"id": 14, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
    ]
)

# Insert a dictionary
res = collection.insert(
    data={"id": 16, "vector": [0.3,0.1,-0.2,-0.6,-0.7]},
)
```

## Related operations

The following operations are related to `insert()`:

- [delete()](./delete.md)

- [search()](./search.md)

- [search_iterator()](./search_iterator.md)

- [query()](./query.md)

- [query_iterator()](./query_iterator.md)

- [upsert()](./upsert.md)

