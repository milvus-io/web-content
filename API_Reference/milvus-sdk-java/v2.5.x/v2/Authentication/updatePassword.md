# updatePassword()

This operation updates the password of a specific user.

```java
public void updatePassword(UpdatePasswordReq request)
```

## Request Syntax

```java
updatePassword(UpdatePasswordReq.builder()
    .userName(String userName)
    .password(String password)
    .newPassword(String newPassword)
    .build()
)
```

**BUILDER METHODS:**

- `userName(String userName)`

    The name of an existing user.

- `password(String password)`

    The original password of the user.

- `newPassword(String newPassword)`

    The new password of the user.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
UpdatePasswordReq updatePasswordReq = UpdatePasswordReq.builder()
        .userName("test")
        .password("Zilliz@2023")
        .newPassword("Zilliz@2024")
        .build();
client.updatePassword(updatePasswordReq);
```
