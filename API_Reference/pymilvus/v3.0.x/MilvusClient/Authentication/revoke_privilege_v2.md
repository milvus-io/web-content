# revoke_privilege_v2()

This operation revokes the specified privilege or privilege group from the specified role.

## Request Syntax

```python
revoke_privilege_v2(
    self,
    role_name: str,
    privilege: str,
    collection_name: str,
    db_name: Optional[str] = None,
    timeout: Optional[float] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to revoke privileges from.

- **privilege** (*str*) -

    **[REQUIRED]**

    The name of the privilege to revoke. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **collection_name** (*str*) - 

    **[REQUIRED]**

    The name of a collection. To revoke privileges regarding all collections in the current database, set this parameter to `*`. 

- **db_name** (*str*) -

    The name of a database. 

    This parameter is optional. Setting this parameter restricts the privilege assignment within the specified database.

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

# 1. Prepare a privilege group
client.create_privilege_group(
    group_name="my_privilege_group"
)

client.add_privileges_to_group(
    group_name="my_privilege_group",
    privileges=["ListDatabases", "DescribeDatabase"]
) 

# 2. Create a role
client.create_role(role_name="read_only")

# 3. Grant privileges
client.grant_privilege_v2(
    role_name="db_read_only",
    privilege="my_privilege_group",
    collection_name="*"
)

# 4. Revoke privileges
client.rovke_privilege_v2(
    role_name="db_read_only",
    privilege="my_privilege_group",
    collection_name="*"
)
```

