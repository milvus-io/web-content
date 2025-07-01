# revokeRole()

This operation revokes the role assigned to a user.

```java
public void revokeRole(RevokeRoleReq request)
```

## Request Syntax

```java
revokeRole(RevokeRoleReq.builder()
    .roleName(String roleName)
    .userName(String userName)
    .build()
)
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the role to revoke.

- `userName(String userName)`

    The name of an existing user.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.RevokeRoleReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Revoke a role from a user
RevokeRoleReq revokeRoleReq = RevokeRoleReq.builder()
        .roleName("db_ro")
        .userName("test")
        .build();
client.revokeRole(revokeRoleReq);
```

