# createUser()

This operation creates a user and optionally stores a description for that user.

```java
public void createUser(CreateUserReq request)
```

## Request Syntax

```java
client.createUser(CreateUserReq.builder()
    .userName(String userName)
    .password(String password)
    .description(String description)
    .build()
);
```

**BUILDER METHODS:**

- `userName(String userName)`

    **[REQUIRED]**

    The name of the user to create.

- `password(String password)`

    **[REQUIRED]**

    The password for the user.

- `description(String description)`

    An optional description of the user. Defaults to an empty string.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.rbac.request.CreateUserReq;

client.createUser(CreateUserReq.builder()
    .userName("analyst_user")
    .password("P@ssw0rd!")
    .description("Read-only analyst account")
    .build());
```
