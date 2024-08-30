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

**PARAMETERS:**

- **role_name** (*str*) -

    **[REQUIRED]**

    The name of the role to revoke privileges from.

- **object_type** (*str*) -

    **[REQUIRED]**

    The type of the object from which the privilege is being revoked. 

    Possible values:

    - **Global**: System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings. When **object_type** is set to **Global**, set **object_name** to the wildcard (*****), indicating all objects of the specified type.

    - **Collection**: Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.

    - **User**: Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

- **privilege** (*str*) -

    **[REQUIRED]**

    The name of the privilege to revoke. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **object_name** (*str*) - 

    **[REQUIRED]**

    The name of the object to control access for. For example, if the object type is **Collection**, the object name is the name of a collection. If the object type is **User**, the object name is the name of a database user.

    When **object_type** is set to **Global**, set **object_name** to the wildcard (*****), indicating all objects of the specified type. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **db_name** (*str*) -

    The name of a database. 

    This parameter is optional. Setting this parameter restricts the privilege revocation within the specified database.

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

read_only_privileges = [
  # DescribeCollection permission on all collections
  {"object_type": "Global", "object_name": "*", "privilege": "DescribeCollection"},
  # ShowCollections permission on all collections
  {"object_type": "Global", "object_name": "*", "privilege": "ShowCollections"},
  # Search permission on the specified `quick_setup` collection
  {"object_type": "Collection", "object_name": "quick_setup", "privilege": "Search"},
  # Query permission on all collections
  {"object_type": "Collection", "object_name": "*", "privilege": "Query"}
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
    privilege="DescribeCollection",
    object_name="*"
)
```

## Related methods

- [create_role()](create_role.md)

- [describe_role()](describe_role.md)

- [drop_role()](drop_role.md)

- [grant_privilege()](grant_privilege.md)

- [grant_role()](grant_role.md)

- [list_roles()](list_roles.md)

- [revoke_role()](revoke_role.md)

