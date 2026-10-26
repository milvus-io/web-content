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

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

Updates a user password and optionally resets connections or changes the user description.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.CreateUserReq;
import io.milvus.v2.service.rbac.request.UpdatePasswordReq;

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

// 3. Update the password
client.updatePassword(UpdatePasswordReq.builder()
    .userName("alice")
    .password("Milvus-Password-123")
    .newPassword("Milvus-Password-456")
    .resetConnection(true)
    .build());
```
