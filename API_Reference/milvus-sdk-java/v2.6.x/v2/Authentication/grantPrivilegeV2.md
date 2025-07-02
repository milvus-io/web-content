# grantPrivilegeV2()

This operation grants privileges or privilege groups to a specific role.

```java
public Void grantPrivilegeV2(GrantPrivilegeReqV2 request)
```

## Request Syntax

```java
grantPrivilegeV2(GrantPrivilegeReqV2.builder()
    .roleName(String roleName)
    .privilege(String privilege)
    .dbName(String dbName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the target role.

- `privilege(String privilege)`

    The privilege or privilege group to be granted to the specified role. For details on possible privileges, refer to [Grant Privileges or Privilege Group to Roles](https://milvus.io/docs/grant_privileges.md).

- `dbName(String dbName)`

    The target resource database. The specified role has access to the specified privileges within the specified database.

- `collectionName(String collectionName)`

    The target resource collection in the specified database. The specified role has access to the specified privileges within the specified collection.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.GrantPrivilegeReqV2;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Grant privilege or privilege group
GrantPrivilegeReqV2 grantPrivilegeReqV2 = GrantPrivilegeReqV2.builder()
    .roleName("my_role")
    .privilege("Search")
    .dbName("my_db")
    .collectionName("my_collection")
    .build()
        
client.grantPrivilegeV2(grantPrivilegeReqV2);
```

