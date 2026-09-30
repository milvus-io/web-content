# remove_file_resource()

Removes a file resource previously registered via `add_file_resource()` from the Milvus cluster. The call is idempotent: removing a name that is not currently registered completes successfully without raising an exception.

## Request syntax

```python
remove_file_resource(
    name: str,
    timeout: float | None = None,
    **kwargs
)
```

**PARAMETERS**:

- **name** (*str*) -
 The name of the resource to remove, as originally passed to `add_file_resource()`.

- **timeout** (*float* | *None*) -
 The timeout duration (in seconds) for this operation. A value of `None` indicates that no timeout is applied.

**RETURNS**:

*None*

## Examples

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

client.remove_file_resource(name="zh_terms")

# Removing a name that is not currently registered is a no-op.
client.remove_file_resource(name="already_gone")
```

