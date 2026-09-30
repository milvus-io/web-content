# flush_all()

This operation flushes all collections in the current database. This ensures all inserted data is written to persistent storage.

## Request syntax

```python
client.flush_all(
    timeout: float = None
)
```

**PARAMETERS:**

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

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

# Flush all collections
client.flush_all()
```
