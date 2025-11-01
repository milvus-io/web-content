# upsert()

This operation inserts or updates data in a specific collection.

## Request syntax

```python
upsert(
    collection_name: str,
    data: Union[Dict, List[Dict]],
    timeout: Optional[float] = None,
    partial_update: Optional[bool] = False,
    partition_name: Optional[str] = "",
) -> List[Union[str, int]]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **&#91;REQUIRED&#93;**

    The name of an existing collection.

- **data** (*dict* | *list&#91;dict&#93;*) -

    **&#91;REQUIRED&#93;**

    The data to insert or update into the current collection.

    The data to insert or update should be a dictionary that matches the schema of the current collection or a list of such dictionaries. 

    To perform an update, you are advised first to retrieve the target entity from the collection, modify the values of any relevant fields, and then save it back to the collection. 

    The following code assumes that the schema of the current collection has three fields named **id**, **vector** ,and **color**. The `id` field is the primary field, the `vector` field is a field to hold 5-dimensional vector embeddings, and the `color` field is a scalar field holding strings.

    ```python
    # A dictionary, or
    data={
        'id': 0,
        'vector': [
            0.6186516144460161,
            0.5927442462488592,
            0.848608119657156,
            0.9287046808231654,
            -0.42215796530168403
        ],
        'color': 'green'
    }
    
    # A list of dictionaries
    data = [
        {
            'id': 1,
            'vector': [
                0.37417449965222693,
                -0.9401784221711342,
                0.9197526367693833,
                0.49519396415367245,
                -0.558567588166478
            ],
            'color': 'brown'
        },
        {
            'id': 2,
            'vector': [
                0.46949086179692356,
                -0.533609076732849,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ],
            'color': 'purple'
        }
    ]
    ```

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **partition_name** (*string* | *None*) -

    The name of a partition in the current collection. 

    If specified, the data is to be inserted or updated in the specified partition.

    This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md). 

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary contains information about the number of inserted or updated entities.

```python
{
    'upsert_count': int,
    'primary_Keys': List[id | str]
}
```

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a collection
client.create_collection(collection_name="test_collection", dimension=5)

# 3. Insert records
res = client.insert(
    collection_name="test_collection",
    data=[
        {
            'id': 0,
            'vector': [
                0.37417449965222693,
                -0.9401784221711342,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ],
            'color': 'green'
        },
        {
            'id': 1,
            'vector': [
                0.37417449965222693,
                -0.9401784221711342,
                0.9197526367693833,
                0.49519396415367245,
                -0.558567588166478
            ],
            'color': 'brown'
        },
        {
            'id': 2,
            'vector': [
                0.46949086179692356,
                -0.533609076732849,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ],
            'color': 'purple'
        }
    ]
)

# {'insert_count': 3, ids: [0, 1, 2]}

# 4. Upsert a record
res = client.upsert(
    collection_name="test_collection",
    data={
        'id': 0,
        'vector': [
            0.6186516144460161,
            0.5927442462488592,
            0.848608119657156,
            0.9287046808231654,
            -0.42215796530168403
        ],
        'color': 'grass-green'
    }
)

# {'upsert_count': 1, 'primary_keys': [0]}

# 4. Upsert multiple records
res = client.upsert(
    collection_name="test_collection",
    data=[
        {
            'id': 1,
             'vector': [
                 0.3457690490452393,
                 -0.9401784221711342,
                 0.9123948134344333,
                 0.49519396415367245,
                 -0.558567588166478
             ],
             'color': 'mud-brown'
       },
       {
           'id': 2,
           'vector': [
               0.42349086179692356,
               -0.533609076732849,
               -0.8344432775467099,
               0.675761846081416,
               0.57094256393761057
           ],
           'color': 'violet-purple'
       }
   ]
)

# {'upsert_count': 2, primary_keys: [1, 2]}

# 5. Upsert with partial update
res = client.upsert(
    collection_name="test_collection",
    data=[
        {
            'id': 1,
            'color': 'cesped-green'
        },
        {
            'id': 2,
            'color': 'manganese-purple'
        }
    ],
    partial_update=True
)

# {'upsert_count': 2: primary_keys: [1, 2]}
```

## Related methods

- [delete()](delete.md)

- [get()](get.md)

- [insert()](insert.md)

- [query()](query.md)

- search()

