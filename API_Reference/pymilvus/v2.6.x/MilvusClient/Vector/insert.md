# insert()

This operation inserts data into a specific collection.

## Request syntax

```python
insert(
    collection_name: str,
    data: Union[Dict, List[Dict]],
    timeout: Optional[float] = None,
    partition_name: Optional[str] = "",
) -> List[Union[str, int]]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **data** (*dict* | *list[dict]*) -

    **[REQUIRED]**

    The data to insert into the current collection.

    The data to insert should be a dictionary that matches the schema of the current collection or a list of such dictionaries. 

    The following code assumes that the schema of the current collection has two fields named **id** and **vector**. The former is the primary field and the latter is a field to hold 5-dimensional vector embeddings.

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
        ]
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
            ]
        },
        {
            'id': 2,
            'vector': [
                0.46949086179692356,
                -0.533609076732849,
                -0.8344432775467099,
                0.9797361846081416,
                0.6294256393761057
            ]
        }
    ]
    ```

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **partition_name** (*string* | *None*) -

    The name of a partition in the current collection. 

    If specified, the data is to be inserted into the specified partition.

    This parameter is not applicable to Milvus Lite. For more information on Milvus Lite limits, refer to [Run Milvus Lite](https://milvus.io/docs/milvus_lite.md).

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary contains information about the number of inserted entities.

```python
{'insert_count': 0}
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

# 3. Insert a record
res = client.insert(
    collection_name="test_collection",
    data={
        'id': 0,
        'vector': [
            0.6186516144460161,
            0.5927442462488592,
            0.848608119657156,
            0.9287046808231654,
            -0.42215796530168403
        ]
    }
)

# {'insert_count': 1}

# 4. Insert multiple records
res = client.insert(
    collection_name="test_collection",
    data=[
        {
            'id': 1,
             'vector': [
                 0.37417449965222693,
                 -0.9401784221711342,
                 0.9197526367693833,
                 0.49519396415367245,
                 -0.558567588166478
             ]
       },
       {
           'id': 2,
           'vector': [
               0.46949086179692356,
               -0.533609076732849,
               -0.8344432775467099,
               0.9797361846081416,
               0.6294256393761057
           ]
       }
   ]
)

# {'insert_count': 2}
```

## Related methods

- [delete()](delete.md)

- [get()](get.md)

- [query()](query.md)

- [search()](search.md)

- [upsert()](upsert.md)

