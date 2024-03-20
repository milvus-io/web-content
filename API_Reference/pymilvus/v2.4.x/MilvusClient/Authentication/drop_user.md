# drop_user()

This operation drops a user.

## Request syntax

```python
drop_user(
    user_name: str,
    timeout: Optional[float] = None
)
```

__PARAMETERS:__

- __user_name__ (_str_) -

    __[REQUIRED]__

    The name of the user to drop.

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

# 2. Create a user
client.create_user(user_name="user_1", password="P@ssw0rd")

# 3. Drop the user
client.drop_user(user_name="user_1")
```

## Related methods

- [create_user()](./Authentication/create_user.md)

- [describe_user()](./Authentication/describe_user.md)

- [list_users()](./Authentication/list_users.md)

- [update_password()](./Authentication/update_password.md)

