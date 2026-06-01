# dropRole()

This operation drops a custom role.

```java
public void dropRole(DropRoleReq request)
```

## Request Syntax

```java
dropRole(DropRoleReq.builder()
    .roleName(String roleName)
    .build()
)
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the role to drop.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.DropRoleReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop a role
DropRoleReq dropRoleReq = DropRoleReq.builder()
        .roleName("test")
        .build();
client.dropRole(dropRoleReq);
```
