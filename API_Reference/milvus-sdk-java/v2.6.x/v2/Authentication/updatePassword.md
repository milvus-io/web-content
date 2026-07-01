# updatePassword()

This operation updates a user password and can also update the user description.

```java
public void updatePassword(UpdatePasswordReq request)
```

## Request Syntax

```java
client.updatePassword(UpdatePasswordReq.builder()
    .userName(String userName)
    .password(String password)
    .newPassword(String newPassword)
    .resetConnection(Boolean resetConnection)
    .description(String description)
    .build()
);
```

**BUILDER METHODS:**

- `userName(String userName)`

    **[REQUIRED]**

    The name of the user to update.

- `password(String password)`

    The current password of the user. Provide this together with `newPassword` when changing the password.

- `newPassword(String newPassword)`

    The new password for the user. Provide this together with `password` when changing the password.

- `resetConnection(Boolean resetConnection)`

    Whether to reset the current client connection after the password is updated. Defaults to `false`.

- `description(String description)`

    An optional new description of the user. Defaults to an empty string.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.rbac.request.UpdatePasswordReq;

client.updatePassword(UpdatePasswordReq.builder()
    .userName("analyst_user")
    .password("P@ssw0rd!")
    .newPassword("N3wP@ssw0rd!")
    .resetConnection(true)
    .description("Read-only analyst account")
    .build());
```
