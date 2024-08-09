# revokePrivilege()

This operation revokes a privilege already assigned to a role.

```java
public void revokePrivilege(RevokePrivilegeReq request)
```

## Request Syntax

```java
revokePrivilege(RevokePrivilegeReq.builder()
    .dbName(String databaseName)
    .roleName(String roleName)
    .objectType(String objectType)
    .privilege(String privilege)
    .objectName(String objectName)
    .build()
)
```

**BUILDER METHODS:**

- `dbName(String databaseName)`

    The name of a database. 

    This parameter is optional. Setting this parameter restricts the privilege revocation within the specified database.

- `objectName(String objectName)`

    The name of the object to control access for. For example, if the object type is __Collection__, the object name is the name of a collection. If the object type is __User__, the object name is the name of a database user.

    When __objectType__ is set to __Global__, set __objectName__ to the wildcard (__*__), indicating all objects of the specified type. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- `objectType(String objectType)`

    The type of the object from which the privilege is being revoked.

    Possible values:
      - __Global__: System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings. When __objectType__ is set to __Global__, set __objectName__ to the wildcard (__*__), indicating all objects of the specified type.
      - __Collection__: Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.
      - __User__: Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

- `privilege(String privilege)`

    The name of the privilege to revoke. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- `roleName(String roleName)`

    The name of the role to revoke privileges from.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
RevokePrivilegeReq revokePrivilegeReq = RevokePrivilegeReq.builder()
        .roleName("db_rw")
        .objectName("")
        .objectType("")
        .privilege("")
        .build();
client_v2.revokePrivilege(revokePrivilegeReq);
```
