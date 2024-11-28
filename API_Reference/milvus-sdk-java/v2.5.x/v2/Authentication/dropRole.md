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
DropRoleReq dropRoleReq = DropRoleReq.builder()
        .roleName("test")
        .build();
client.dropRole(dropRoleReq);
```
