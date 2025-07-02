# grantPrivilege()

This operation assigns a privilege to a role.

```java
public void grantPrivilege(GrantPrivilegeReq request)
```

## Request Syntax

```java
grantPrivilege(GrantPrivilegeReq.builder()
    .roleName(String roleName)
    .objectType(String objectType)
    .privilege(String privilege)
    .objectName(String objectName)
    .build()
)
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the role to assign privileges to.

- `objectType(String objectType)`

    The type of the object for which the privilege is being assigned.

    Possible values:

    - **Global**: System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings. When **objectType** is set to **Global**, set **objectName** to the wildcard (*****), indicating all objects of the specified type.

    - **Collection**: Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.

    - **User**: Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.

- `privilege(String privilege)`

    The name of the privilege to assign. 

    For details, refer to the **Privilege name** column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

- `objectName(String objectName)`

    The name of the object to control access for. For example, if the object type is **Collection**, the object name is the name of a collection. If the object type is **User**, the object name is the name of a database user.

    When **object_type** is set to **Global**, set **object_name** to the wildcard (*****), indicating all objects of the specified type. For details, refer to the Relevant API column in the table on page [Users and Roles](https://milvus.io/docs/users_and_roles.md).

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.GrantPrivilegeReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Grant privileges
GrantPrivilegeReq grantPrivilegeReq = GrantPrivilegeReq.builder()
        .roleName("db_rw")
        .objectType("User")
        .objectName("user_1")
        .privilege("SelectUser")
        .build();
client.grantPrivilege(grantPrivilegeReq);
```
