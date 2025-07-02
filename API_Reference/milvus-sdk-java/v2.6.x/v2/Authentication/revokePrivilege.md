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

    The name of the object to control access for. For example, if the object type is **Collection**, the object name is the name of a collection. If the object type is **User**, the object name is the name of a database user.

    When **object_type** is set to **Global**, set **object_name** to the wildcard (*****), indicating all objects of the specified type. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- `objectType(String objectType)`

    The type of the object from which the privilege is being revoked. 

    Possible values:

    - **Global**: System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings. When **object_type** is set to **Global**, set **object_name** to the wildcard (*****), indicating all objects of the specified type.

    - **Collection**: Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.

    - **User**: Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.RevokePrivilegeReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Revoke a privilege
RevokePrivilegeReq revokePrivilegeReq = RevokePrivilegeReq.builder()
        .roleName("db_rw")
        .privilege("DescribeCollection")
        .objectName("*")
        .objectType("Global")
        .build();
client.revokePrivilege(revokePrivilegeReq);
```

