# alterRole()

Updates the description of an existing role.

```java
public void alterRole(AlterRoleReq request)
```

## Request Syntax

```java
AlterRoleReq.builder()
    .roleName(roleName)
    .description(description)
    .build();
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the role.

- `description(String description)`

    The human-readable description of the role.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Updates the description of an existing role.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.AlterRoleReq;
import io.milvus.v2.service.rbac.request.CreateRoleReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);


// 2. Create a role
client.createRole(CreateRoleReq.builder()
    .roleName("analyst")
    .description("Read-only analytics role")
    .build());

// 3. Alter the role description
client.alterRole(AlterRoleReq.builder()
    .roleName("analyst")
    .description("Read-only analytics role v2")
    .build());
```
