# drop_user()

This operation drops a user.

## Request syntax

```python
drop_user(
    user_name: str,
    timeout: Optional[float] = None
)
```

**PARAMETERS:**

- **user_name** (*str*) -

    **[REQUIRED]**

    The name of the user to drop.

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

# 3. Drop the user
client.drop_user(user_name="user_1")
```

## Related methods

- [create_user()](https://zilliverse.feishu.cn/docx/BDupd28JqoNY9HxVOTfcv86enRe)

- [describe_user()](https://zilliverse.feishu.cn/docx/Wz3HdtvPCoEquvxFY7PcDHxcnEe)

- [list_users()](https://zilliverse.feishu.cn/docx/EZ2YdBHoDoRTlxx91tscffm1nSb)

- [update_password()](https://zilliverse.feishu.cn/docx/WGDod7Qehou4GWx4Co2cJ34VnKb)

