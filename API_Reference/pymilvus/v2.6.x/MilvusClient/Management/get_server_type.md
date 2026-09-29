# get_server_type()

This operation returns the type of the connected Milvus server.

## Request syntax

```python
client.get_server_type() -> str
```

**RETURN TYPE:**

*str*

**RETURNS:**

The server type, for example `"milvus"` or `"zilliz"`.

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

server_type = client.get_server_type()
print(server_type)
```

## Related methods

- [get_server_version()](get_server_version.md)
