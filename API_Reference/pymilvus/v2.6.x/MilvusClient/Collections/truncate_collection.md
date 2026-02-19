# truncate_collection()

This operation removes all entities while preserving the collection's schema, constraints, and indexes. It is more efficient than deleting entities because it hides all entities flushed before the current timestamp from searches and queries and drops them in the background.

## Request Syntax

```python
truncate_collection(
    collection_name: str, 
    timeout: Optional[float] = None
)
```

**PARAMETERS:**

- **collection_name** *(string)* –

    **[REQUIRED]**

    The name of the target collection.

- **timeout** *(float)* –

    Timeout (in seconds) for the RPC request. If `None`, the call waits indefinitely.

**RETURN TYPE:**

*None*

**EXCEPTIONS:**

- **CollectionNotExists**

    This exception will be raised when the specified collection does not exist.

## Examples

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

client.truncate_collection(
    collection_name="my_collection"
)
```
