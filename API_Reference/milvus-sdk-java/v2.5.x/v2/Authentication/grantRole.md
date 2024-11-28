# grantRole()

This operation grants a role to a user.

```java
public void grantRole(GrantRoleReq request)
```

## Request Syntax

```java
grantRole(GrantRoleReq.builder()
    .roleName(String roleName)
    .userName(String userName)
    .build()
)
```

**BUILDER METHODS:**

- `roleName(String roleName)`

    The name of the role to assign.

- `userName(String userName)`

    The name of an existing user.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
GrantRoleReq grantRoleReq = GrantRoleReq.builder()
        .roleName("db_ro")
        .userName("test")
        .build();
client.grantRole(grantRoleReq);
```

