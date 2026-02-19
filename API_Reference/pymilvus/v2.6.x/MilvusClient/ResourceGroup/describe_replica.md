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

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Example

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

replicas = client.describe_replica(collection_name="my_collection")
for replica in replicas:
    print(replica)
```
