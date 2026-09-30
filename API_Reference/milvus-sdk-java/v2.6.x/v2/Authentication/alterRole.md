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

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Updates the description of an existing role.

```java
client.alterRole(AlterRoleReq.builder()
    .roleName("analyst")
    .description("Read-only analytics role")
    .build());
```
