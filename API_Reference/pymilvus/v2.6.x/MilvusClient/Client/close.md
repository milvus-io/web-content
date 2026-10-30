# close()

This operation closes the current Milvus client.

## Request Syntax

```python
close() -> None
```

**PARAMETERS:**

None

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

None

## Example

```python
from pymilvus import MilvusClient

# 1. Set up a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Close the client
client.close()
```

