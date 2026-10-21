# updateUser()

This operation updates the description of an existing user without changing the user password.

```java
public void updateUser(UpdateUserReq request)
```

## Request Syntax

```java
client.updateUser(UpdateUserReq.builder()
    .userName(String userName)
    .description(String description)
    .build()
);
```

**BUILDER METHODS:**

- `userName(String userName)`

    **[REQUIRED]**

    The name of the user to update.

- `description(String description)`

    The new description of the user. Use an empty string to clear the description.

**RETURNS:**

*void*

This operation returns no value.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

Updates the description of an existing user.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.CreateUserReq;
import io.milvus.v2.service.rbac.request.UpdateUserReq;

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

// 3. Update the user description
client.updateUser(UpdateUserReq.builder()
    .userName("alice")
    .description("Senior analytics user")
    .build());
```
