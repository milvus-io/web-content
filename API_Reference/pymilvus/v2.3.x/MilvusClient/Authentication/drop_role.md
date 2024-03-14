
# drop_role()

This operation drops a custom role.

## Request syntax

```python
drop_role(
    role_name: str,
    timeout: Optional[float] = None
) -> None
```

__PARAMETERS:__

- __role_name__ (_str_) -

    __[REQUIRED]__

    The name of the role to drop.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_NoneType_

__RETURNS:__

None

__EXCEPTIONS:__

- __MilvusException__

    This exception will be raised when any error occurs during this operation.

- __BaseException__

    This exception will be raised when this operation fails.

## Example

```python
from pymilvus import MilvusClient

# 1. Create a milvus client
client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 2. Create a role
client.create_role(role_name="read_only")

# 3. Drop a role
client.drop_role(role_name="read_only")
```

