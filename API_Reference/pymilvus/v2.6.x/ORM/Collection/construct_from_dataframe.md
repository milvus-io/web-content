# construct_from_dataframe()

This operation creates a collection with the specified dataframe. 

## Request Syntax

```python
construct_from_dataframe(
    name: str, 
    primary_field: str,
    dataframe: pandas.DataFrame
)
```

**PARAMETERS:**

- **name** (*string*) -

    **[REQUIRED]**

    The name of the collection to create.

- **primary_field** (*string*) -

    **[REQUIRED]**

    The name of the primary field. It should be one of the column labels in the following dataframe.

- **dataframe** (*pandas.DataFrame*) 

    **[REQUIRED]**

    The dataframe containing the data to be inserted into the collection.

    You can form a data frame in any way, as demonstrated in the **Example** section on [this page](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

    ```python
    dataframe = pd.DataFrame({
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

**RETURN TYPE:**

*tuple (Collection, MutationResults)*

**RETURNS:**

A tuple containing the collection and a **MutationResult** object returned by the **insert()** operation.

A **MutationResult** object contains the following fields:

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

- **SchemaNotReadyException**

    This exception will be raised when the specified primary field is not valid.

## Examples

```python
import pandas as pd
from pymilvus import Collection

collection, results = Collection.construct_from_dataframe(
    name="test_collection",
    primary_field="id",
    dataframe=pd.DataFrame({
        "id": [0,1,2,3,4],
        "vector": [
            [0.1,0.2,-0.3,-0.4,0.5],
            [0.3,-0.1,-0.2,-0.6,0.7],
            [-0.6,-0.3,0.2,0.8,0.7],
            [0.6,0.2,-0.3,-0.8,0.5],
            [0.3,0.1,-0.2,-0.6,-0.7],
        ]
    }),
)
```

## Related operations

The following operations are related to `construct_from_dataframe()`:

- [Collection](Collection.md)

- [CollectionSchema](../CollectionSchema/CollectionSchema.md)

- [FieldSchema](../FieldSchema/FieldSchema.md)

