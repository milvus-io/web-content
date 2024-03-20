# describe_role()

This operation describes a specific role.

## Request syntax

```python
describe_role(
    role_name: str,
    timeout: Optional[float] = None
) -> List[Dict]
```

__PARAMETERS:__

- __role_name__ (_str_) -

    __[REQUIRED]__

    The name of the role to describe.

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. 

    Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_list_

__RETURNS:__

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

__PARAMETERS:__

- __object_type__ (_str_) -

    The type of the resource object granted to the role. 

    Possible values are __Collection__, __Global__, and __User__.

- __object_name__ (_str_) -

    The name of the resource object granted to the role. You are advised to use an asterisk (*).

- __db_name__ (_str_) -

    The name of the database to which the role has access.

- __role_name__ (_str_) -

    The name of the specified role.

- __privilege__ (_str_) -

    The name of a privilege granted to the role. For details, refer to [Users & Roles](https://milvus.io/docs/users_and_roles.md) for more.

- __grantor_name__ (_str_) - 

    The name of the user who has granted the above permission to the specified role.

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

- [create_role()](./Authentication/create_role.md)

- [drop_role()](./Authentication/drop_role.md)

- [grant_privilege()](./Authentication/grant_privilege.md)

- [grant_role()](./Authentication/grant_role.md)

- [list_roles()](./Authentication/list_roles.md)

- [revoke_privileges()](./Authentication/revoke_privileges.md)

- [revoke_role()](./Authentication/revoke_role.md)

