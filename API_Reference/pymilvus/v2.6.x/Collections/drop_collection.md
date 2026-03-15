# drop_collection()

This operation drops a collection.

## Request syntax

```python
drop_collection(
    collection_name: str,
    timeout: Optional[float] = None,
    **kwargs,
) -> None
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of an existing collection.

- **timeout** (*Optional[float]*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Create a collection
client.create_collection(
    collection_name="test_collection",
    dimension=5
)

# List collections
res = client.list_collections()
# ['test_collection']

# Drop the collection
client.drop_collection(collection_name="test_collection")

# Verify
res = client.list_collections()
# []
```
