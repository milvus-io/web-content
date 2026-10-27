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

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

Creates a user with credentials and an optional description.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.CreateUserReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);


// 2. Create a user
client.createUser(CreateUserReq.builder()
    .userName("alice")
    .password("Milvus-Password-123")
    .description("Analytics user")
    .build());
```
