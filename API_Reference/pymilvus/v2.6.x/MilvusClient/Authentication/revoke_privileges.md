# revoke_privileges()

Revokes a privilege previously granted to a role on a specific object. Use this method to restrict a role's access to a particular resource.

<div class="admonition note">

<p><b>notes</b></p>

<p>This method is deprecated. For the latest equivalent, refer to <a href="./Authentication-revoke_privilege"><code>revoke_privilege()</code></a>.</p>

</div>

## Request Syntax

```python
client.revoke_privilege(
    role_name: str,
    object_type: str,
    privilege: str,
    object_name: str,
    db_name: str = "",
    timeout: float = None
)
```

**PARAMETERS:**

- **role_name** (str) –

[REQUIRED]

The name of the role from which to revoke the privilege.

    **[REQUIRED]**

    The name of the role to revoke privileges from.

- **object_type** (str) –

[REQUIRED]

The type of the object on which the privilege was granted. Valid values include `"Collection"`, `"Global"`, and `"User"`.

    **[REQUIRED]**

    The type of the object from which the privilege is being revoked. 

    Possible values:

    - **Global**: System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings. When **object_type** is set to **Global**, set **object_name** to the wildcard (**&ast;**), indicating all objects of the specified type.

    - **Collection**: Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.

    - **User**: Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

- **privilege** (str) –

[REQUIRED]

The name of the privilege to revoke. Refer to the Milvus documentation for a full list of supported privileges.

    **[REQUIRED]**

    The name of the privilege to revoke. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **object_name** (str) –

[REQUIRED]

The name of the object on which the privilege was granted. Use `"*"` to denote all objects of the specified type.

    **[REQUIRED]**

    The name of the object to control access for. For example, if the object type is **Collection**, the object name is the name of a collection. If the object type is **User**, the object name is the name of a database user.

    When **object_type** is set to **Global**, set **object_name** to the wildcard (**&ast;**), indicating all objects of the specified type. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- **db_name** (str) –

The name of the database. Defaults to the current database if not specified.

    The name of a database. 

    This parameter is optional. Setting this parameter restricts the privilege revocation within the specified database.

- **timeout** (float) –

An optional duration of time in seconds to allow for the RPC. When timeout is set to None, the client waits until the server responds or an error occurs.

    The timeout duration for this operation. 

    Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

None

**EXCEPTIONS:**

MilvusException

If the role does not exist, the privilege is invalid, or the server encounters an error.

Examples

- from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Revoke insert privilege on a collection from a role
client.revoke_privilege(
    role_name="readOnly",
    object_type="Collection",
    privilege="Insert",
    object_name="my_collection"
)

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

