# revokePrivilegeV2()

This operation revokes privileges or privilege groups from a specific role.

```java
public Void revokePrivilegeV2(RevokePrivilegeReqV2 request)
```

## Request Syntax

```java
revokePrivilegeV2(RevokePrivilegeReqV2.builder()
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

    The privilege or privilege group to be revoked from the specified role. For details on possible privileges, refer to [Grant Privileges or Privilege Group to Roles](https://milvus.io/docs/grant_privileges.md).

- `dbName(String dbName)`

    The target resource database. After this operation, the specified role loses access to the specified privileges within the specified database.

- `collectionName(String collectionName)`

    The target resource collection in the specified database. After this operation, the specified role loses access to the specified privileges within the specified collection.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.RevokePrivilegeReqV2;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Revoke privilege or privilege group
RevokePrivilegeReqV2 revokePrivilegeReqV2 = RevokePrivilegeReqV2.builder()
    .roleName("my_role")
    .privilege("read_only")
    .dbName("my_db")
    .collectionName("my_collection")
    .build()
        
client.revokePrivilegeV2(revokePrivilegeReqV2);
```

