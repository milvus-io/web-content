# describe_role()

This operation describes a specific role.

## Request syntax

```python
describe_role(
    role_name: str,
    timeout: Optional[float] = None
) -> List[Dict]
```

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to describe.

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*list*

**RETURNS:**

A list of dictionaries containing the permissions assigned to the role. The structure of each dictionary reassembles the following:

```python
#  {
#      'object_type': str, 
#      'object_name': str, 
#      'db_name': str, 
#      'role_name': str, 
#      'privilege': str, 
#      'grantor_name': str
#  }
```

**PARAMETERS:**

- **object_type** (*str*) -

    The type of the resource object granted to the role. 

    Possible values are **Collection**, **Global**, and **User**.

- **object_name** (*str*) -

    The name of the resource object granted to the role. You are advised to use an asterisk (*).

- **db_name** (*str*) -

    The name of the database to which the role has access.

- **role_name** (*str*) -

    The name of the specified role.

- **privilege** (*str*) -

    The name of a privilege granted to the role. For details, refer to [Users & Roles](https://milvus.io/docs/users_and_roles.md) for more.

- **grantor_name** (*str*) - 

    The name of the user who has granted the above permission to the specified role.

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

# 3. Grant permissions
client.grant_privilege(
    role_name="read_only",
    object_type="Global",
    privilege="DescribeCollection",
    object_name="*"
)

# 3. Describe the role
client.describe_role(role_name="read_only")

# Output
#
# {
#     "role": "read_only",
#     "privileges": [
#         {
#             "object_type": "Global",
#             "object_name": "*",
#             "db_name": "default",
#             "role_name": "read_only",
#             "privilege": "DescribeCollection",
#             "grantor_name": "root"
#         }
#     ]
# }
```

## Related methods

- [create_role()](create_role.md)

- [drop_role()](drop_role.md)

- [grant_privilege()](grant_privilege.md)

- [grant_role()](grant_role.md)

- [list_roles()](list_roles.md)

- [revoke_privileges()](revoke_privileges.md)

- [revoke_role()](revoke_role.md)

