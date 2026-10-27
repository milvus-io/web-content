# alterRole()

This operation updates the description of an existing role.

```java
public void alterRole(AlterRoleReq request)
```

## Request Syntax

```java
client.alterRole(AlterRoleReq.builder()
    .roleName(String roleName)
    .description(String description)
    .build()
);
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    **[REQUIRED]**

    The name of the role to update.

- `description(String description)`

    The new description of the role. Use an empty string to clear the description.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

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
