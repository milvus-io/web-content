# describe_replica()

This method returns the current loaded replica information for a collection, including details about the replica nodes and segments.

## Request syntax

```python
client.describe_replica(
    collection_name: str,
    timeout: float = None
) -> List[ReplicaInfo]
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection.

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*List[ReplicaInfo]*

**RETURNS:**

All the replica information.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Create a collection, insert data, and load it
schema = client.create_schema(auto_id=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=3)
client.create_collection(collection_name="my_collection", schema=schema)
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="COSINE")
client.create_index(collection_name="my_collection", index_params=index_params)
client.insert(collection_name="my_collection", data=[{"id": 1, "vector": [0.1, 0.2, 0.3]}])
client.load_collection(collection_name="my_collection")

replicas = client.describe_replica(collection_name="my_collection")
for replica in replicas:
    print(replica)
```
