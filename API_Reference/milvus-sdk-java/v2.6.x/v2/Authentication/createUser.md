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

**RETURNS:**

*void*

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

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
