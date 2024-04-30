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

    The name of the API to assign. 

    You can either use the wildcard (*) to include all applicable APIs in the specified privilege or fill in a specific API. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- `objectType(String objectType)`

    The type of the privilege object to assign. 

    Possible values are **Global**, **Collection**, and **User**.

- `privilege(String privilege)`

    The name of the privilege to assign. 

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

