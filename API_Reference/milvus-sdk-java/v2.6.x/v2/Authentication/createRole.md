# createRole()

Creates a role with an optional description.

```java
public void createRole(CreateRoleReq request)
```

## Request Syntax

```java
CreateRoleReq.builder()
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

Creates a role with an optional description.

```java
client.createRole(CreateRoleReq.builder()
    .roleName("analyst")
    .description("Read-only analytics role")
    .build());
```
