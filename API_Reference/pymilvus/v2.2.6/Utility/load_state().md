# load_state()

This method gets the loading status of a collection or a partition.

## Invocation

```python
load_state(collection_name, partition_names=None, using="default", timeout=None)
```

## Parameters

| Parameter | Description | Type | Required |
| --------- | ----------- | ---- | -------- |
| `collection_name` | Name of a collection | String | True |
| `partition_name` | Name of a partition | String | False |
| `using` | Alias of the Milvus connection to be attached to | String | False
| `timeout` | Timeout duration of this operation | float | False |

# Return

Returns a `LoadState` enumerate object.

| State      | Code | Description |
| ---------- | ---- | ----------- |
| NotExist   | 0    | Indicates that the specified collection or partition does not exist. |
| NotLoad    | 1    | Indicates that the specified collection or partition is not loaded. |
| Loading    | 2    | Indicates that Milvus is loading the specified collection or partition. |
| Loaded     | 3    | Indicates that Milvus finishes loading the specified collection or partition and it is ready for searches. |

## Example

```python
from pymilvus import Collection, connections, FieldSchema, CollectionSchema, DataType, utility

# Check the load status before the collecction exists. 
# It should return 0, indicating that the collection does not exist yet.
print(utility.load_state("films"))

connections.connect()

fields = [
    FieldSchema("film_id", DataType.INT64, is_primary=True),
    FieldSchema("films", DataType.FLOAT_VECTOR, dim=8)
]

schema = CollectionSchema(fields)
collection = Collection("films", schema)
data = pd.DataFrame({
    "film_id" : pd.Series(data=list(range(10, 20)), index=list(range(10))),
    "films": [[random.random() for _ in range(8)] for _ in range (10)],
}) 

collection.insert(data)
collection.create_index("films", {"index_type": "IVF_FLAT", "params": {"nlist": 8}, "metric_type": "L2"})

# Check the load status of the collection before Milvus loads the collection to the query nodes. 
# It should return 1, indicating that the collection is not loaded yet.
print(utility.load_state("films"))

collection.load(_async=True)

# Run immediately after calling the load method.
# It should return 2, indicating that Milvus is loading the collection to the query nodes. 
print(utility.load_state("films"))

# Wait until the loading progress ends
utility.wait_for_loading_complete("films")

# This should return 3, indicating that the collection is ready for searches.
print(utility.load_state("films"))
```