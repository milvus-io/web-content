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

__PARAMETERS:__

- __name__ (_string_) -

    __[REQUIRED]__

    The name of the collection to create.

- __primary_field__ (_string_) -

    __[REQUIRED]__

    The name of the primary field. It should be one of the column labels in the following dataframe.

- __dataframe__ (_pandas.DataFrame_) 

    __[REQUIRED]__

    The dataframe containing the data to be inserted into the collection.

    You can form a data frame in any way, as demonstrated in the __Example__ section on [this page](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.html).

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

__RETURN TYPE:__

_tuple (Collection, MutationResults)_

__RETURNS:__

A tuple containing the collection and a __MutationResult__ object returned by the __insert()__ operation.

A __MutationResult__ object contains the following fields:

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

- __SchemaNotReadyException__

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

- [Collection](./ORM/Collection.md)

- [CollectionSchema](./ORM/CollectionSchema.md)

- [FieldSchema](./ORM/FieldSchema.md)

