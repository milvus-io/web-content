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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.UpdatePasswordReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Reset password
UpdatePasswordReq updatePasswordReq = UpdatePasswordReq.builder()
        .userName("test")
        .password("Zilliz@2023")
        .newPassword("Zilliz@2024")
        .build();
client.updatePassword(updatePasswordReq);
```
