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

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.rbac.request.AlterRoleReq;

client.alterRole(AlterRoleReq.builder()
    .roleName("analytics_reader")
    .description("Grants read-only access to analytics collections")
    .build());
```
