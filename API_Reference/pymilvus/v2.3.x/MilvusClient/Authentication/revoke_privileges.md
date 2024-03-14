
# revoke_privileges()

This operation revokes a privilege already assigned to a role.

## Request syntax

```python
revoke_privilege(
    role_name: str,
    object_type: str,
    privilege: str,
    object_name: str,
    db_name: Optional[str] = "",
    timeout: Optional[float] = None
) -> None
```

__PARAMETERS:__

- __role_name__ (_str_) -

    __[REQUIRED]__

    The name of the role to revoke privileges from.

- __object_type__ (_str_) -

    __[REQUIRED]__

    The type of the privilege object to assign. 

    Possible values are __Global__, __Collection__, and __User__.

- __privilege__ (_str_) -

    __[REQUIRED]__

    The name of the privilege to assign. 

    For details, refer to the __Privilege name__ column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- __object_name__ (_str_) - 

    __[REQUIRED]__

    The name of the API to assign. 

    You can either use the wildcard (*) to include all applicable APIs in the specified privilege or fill in a specific API. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- __db_name__ (_str_) -

    The name of a database. 

    This parameter is optional. Setting this parameter restricts the privilege revocation within the specified database.

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

read_only_privileges = [
  {"object_type": "Global", "object_name": "*", "privilege": "DescribeCollection"},
  {"object_type": "Global", "object_name": "*", "privilege": "ShowCollections"},
  {"object_type": "Collection", "object_name": "*", "privilege": "Search"},
  {"object_type": "Collection", "object_name": "*", "privilege": "Query"},
] 

# 2. Create a role
client.create_role(role_name="read_only")

# 3. Grant privileges
for item in read_only_privileges:
    client.grant_privilege(
        role_name="read_only",
        object_type=item["object_type"],
        privilege=item["privilege"],
        object_name=item["object_name"]
    )
    
# 4. Revoke privilege
client.revoke_privilege(
    role_name="read_only",
    object_type="Global",
    privilege="*",
    object_name="DescribeCollection"
)
```

