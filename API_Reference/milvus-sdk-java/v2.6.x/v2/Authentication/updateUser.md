# updateUser()

Updates the description of an existing user.

```java
public void updateUser(UpdateUserReq request)
```

## Request Syntax

```java
UpdateUserReq.builder()
    .userName(userName)
    .description(description)
    .build();
```

**BUILDER METHODS:**

- `userName(String userName)`

    The name of the user account.

- `description(String description)`

    The human-readable description of the user account.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Updates the description of an existing user.

```java
client.updateUser(UpdateUserReq.builder()
    .userName("alice")
    .description("Senior analytics user")
    .build());
```
