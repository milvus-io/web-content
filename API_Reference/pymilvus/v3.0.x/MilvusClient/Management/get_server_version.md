# get_server_version()

This operation returns the version string of the connected Milvus server. Optionally returns detailed server information, including build time, git commit, and deployment mode.

## Request syntax

```python
client.get_server_version(
    timeout: float = None,
    detail: bool = False
) -> Union[str, dict]
```

**PARAMETERS:**

- **timeout** (*float* | *None*) -

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

- **detail** (*bool*) -

    If **True**, returns detailed server info as a dictionary. Defaults to **False**.

**RETURN TYPE:**

*str* | *dict*

**RETURNS:**

When `detail=False`, a version string (e.g., `"2.6.6"`). When `detail=True`, a dictionary containing `version`, `build_time`, `git_commit`, `go_version`, and `deploy_mode`.

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

# Get version string
version = client.get_server_version()
print(version)  # "2.6.6"

# Get detailed server info
info = client.get_server_version(detail=True)
print(info)
```
