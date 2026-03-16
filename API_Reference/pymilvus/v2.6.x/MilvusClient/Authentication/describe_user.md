# describe_user()

This operation describes a specific user.

## Request syntax

```python
describe_user(
    user_name: str,
    timeout: Optional[float] = None
) -> Dict
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of the user to describe.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*dict*

**RETURNS:**

A dictionary containing detailed information about the specified users.

```python
# {
#       'user_name': str, 
#       'roles': tuple
# }
```

- **user_name** (*str*) -

    The name of the specified users.

- **roles** (*tuple*) - 

    The roles granted to the specified user.

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

# 2. Create a role
client.create_role(role_name="read_only")

# 3. Create a user
client.create_user(user_name="user_1", password="P@ssw0rd")

# 4. Grant the role to the user
client.grant_role(user_name="user_1", role_name="read_only")

# 5. Describe the user
client.describe_user(user_name="user_1")

# {'user_name': 'user_1', 'roles': ('read_only',)}
```

## Related methods

- [create_user()](https://zilliverse.feishu.cn/docx/BDupd28JqoNY9HxVOTfcv86enRe)

- [drop_user()](https://zilliverse.feishu.cn/docx/WtyZdeFKMoSv5exaYRxcPLCSndg)

- [list_users()](https://zilliverse.feishu.cn/docx/EZ2YdBHoDoRTlxx91tscffm1nSb)

- [update_password()](https://zilliverse.feishu.cn/docx/WGDod7Qehou4GWx4Co2cJ34VnKb)

