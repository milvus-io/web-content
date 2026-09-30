# updatePassword()

Updates a user password and optionally resets connections or changes the user description.

```java
public void updatePassword(UpdatePasswordReq request)
```

## Request Syntax

```java
UpdatePasswordReq.builder()
    .userName(userName)
    .password(password)
    .newPassword(newPassword)
    .resetConnection(resetConnection)
    .description(description)
    .build();
```

**BUILDER METHODS:**

- `userName(String userName)`

    The name of the user account.

- `password(String password)`

    The current password of the user account.

- `newPassword(String newPassword)`

    The new password to assign to the user account.

- `resetConnection(Boolean resetConnection)`

    Whether to reset existing connections after the password is changed.

- `description(String description)`

    The human-readable description of the user account.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Updates a user password and optionally resets connections or changes the user description.

```java
client.updatePassword(UpdatePasswordReq.builder()
    .userName("alice")
    .password("Milvus-Password-123")
    .newPassword("Milvus-Password-456")
    .resetConnection(true)
    .description("Analytics user")
    .build());
```
