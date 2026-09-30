# createUser()

Creates a user with credentials and an optional description.

```java
public void createUser(CreateUserReq request)
```

## Request Syntax

```java
CreateUserReq.builder()
    .userName(userName)
    .password(password)
    .description(description)
    .build();
```

**BUILDER METHODS:**

- `userName(String userName)`

    The name of the user account.

- `password(String password)`

    The initial password for the user account.

- `description(String description)`

    The human-readable description of the user account.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Creates a user with credentials and an optional description.

```java
client.createUser(CreateUserReq.builder()
    .userName("alice")
    .password("Milvus-Password-123")
    .description("Analytics user")
    .build());
```
