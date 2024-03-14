

# upsert()

This operation inserts new records into the database or updates existing ones. 

<div class="admonition note">

<p><b>notes</b></p>

<p>An upsert is a data-level operation that will overwrite an existing entity if a specified field already exists in a collection, and insert a new entity if the specified value doesn’t already exist.</p>

</div>

## Request Syntax

```python
upsert(
    data: List | pandas.DataFrame | Dict,, 
    timeout=float | None
)
```

```python
from pymilvus import Collection, Partition

# Get an existing collection
collection = Collection(name="string")

# Get an existing partition
partition = Partition(name="string")

# Prepare your data
data = ...

# Upsert data into partition
partition.upsert(
    data=data,
    timeout=None
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
from pymilvus import Collection, Partition, FieldSchema, CollectionSchema, DataType

# Define collection schema    
schema = CollectionSchema([
    FieldSchema("film_id", DataType.INT64, is_primary=True),
    FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
])

# Get an existing collection
collection = Collection("test_partition_insert", schema)

# Get an existing partition in the current collection
partition = Partition(collection, "comedy", "comedy films")

# Prepare the data to insert
data = [
    [i for i in range(10)],
    [[float(i) for i in range(2)] for _ in range(10)]
]

# Upsert data
res = partition.upsert(data)

# Return the count of upserted entities
res.upsert_count
10
```

