# list_users()

This operation lists the names of all existing users.

## Request syntax

```python
list_users(
    timeout: Optional[float] = None
) -> List
```

**PARAMETERS:**

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of user names.

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

# 3. List all users
client.list_users()

# ['root', 'user_1']
```

## Related methods

- [create_user()](https://zilliverse.feishu.cn/docx/BDupd28JqoNY9HxVOTfcv86enRe)

- [describe_user()](https://zilliverse.feishu.cn/docx/Wz3HdtvPCoEquvxFY7PcDHxcnEe)

- [drop_user()](https://zilliverse.feishu.cn/docx/WtyZdeFKMoSv5exaYRxcPLCSndg)

- [update_password()](https://zilliverse.feishu.cn/docx/WGDod7Qehou4GWx4Co2cJ34VnKb)

