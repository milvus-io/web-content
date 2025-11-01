# list_privilege_groups()

This operation lists all existing privilege groups.

## Request Syntax

```python
list_privilege_groups(
    self,
    timeout: Optional[float] = None,
    **kwargs,
) -> List[Dict[str, str]]
```

**PARAMETERS:**

- **timeout** (*Optional&#91;float&#93;*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*List&#91;Dict&#91;str, str&#93;&#93;*

**RETURNS:**

A list of privilege group names.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation, especially when the specified alias does not exist.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

res = client.list_privilege_groups()

# ['my_privilege_group']
```

