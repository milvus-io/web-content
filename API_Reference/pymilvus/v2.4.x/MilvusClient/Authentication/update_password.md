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

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of an existing user.

- **old_password** (*str*) -

    **[REQUIRED]**

    The original password of the user.

- **new_password** (*str*) -

    **[REQUIRED]**

    The new password of the user.

- **reset_connection** (*bool*) -

    Whether to reset the connection using the new credentials.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

- **BaseException**

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

## Related methods

- [create_user()](create_user.md)

- [describe_user()](describe_user.md)

- [drop_user()](drop_user.md)

- [list_users()](list_users.md)

