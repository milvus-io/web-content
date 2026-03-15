# create_privilege_group()

This operation creates a privilege group.

## Request Syntax

```python
create_privilege_group(
    self,
    group_name: str,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **group_name** (*str*) -

    The name of the target privilege group.

- **timeout** (*Optional[float]*) - 

    The timeout duration for this operation.

    Setting this to None indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

*None*

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

client.create_privilege_group(
    group_name="my_privilege_group"
)
```

