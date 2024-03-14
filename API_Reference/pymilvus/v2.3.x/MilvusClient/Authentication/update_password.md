
# update_password()

This operation updates the password of a specific user.

## Request syntax

```python
update_password(
    user_name: str,
    old_password: str,
    new_password: str,
    reset_connection: Optional[bool] = False,
    timeout: Optional[float] = None,
    **kwargs,
)
```

__PARAMETERS:__

- __user_name__ (_str_) -

    __[REQUIRED]__

    The name of an existing user.

- __old_password__ (_str_) -

    __[REQUIRED]__

    The original password of the user.

- __new_password__ (_str_) -

    __[REQUIRED]__

    The new password of the user.

- __reset_connection__ (_bool_) -

    Whether to reset the connection using the new credentials.

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

# 3. Change the password
client.update_password(
    user_name="user_1",
    old_password="P@ssw0rd",
    new_password="NewP@ssw0rd"
)
```

