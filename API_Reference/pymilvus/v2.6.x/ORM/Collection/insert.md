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

**PARAMETERS:**

- **data** (*list* | *dict* | *pandas.DataFrame*) -

    **[REQUIRED]**

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

    - A **pandas.DataFrame**

        You can form a data frame in any way, as demonstrated in the **Example** section on [this page](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

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

- **partition_name** (*string* | *None*) -

    The name of a partition in the current collection. 

    If specified, the data is to be inserted into the specified partition.

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

- [delete()](delete.md)

- [search()](search.md)

- [search_iterator()](search_iterator.md)

- [query()](query.md)

- [query_iterator()](query_iterator.md)

- [upsert()](upsert.md)

