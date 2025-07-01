# createUser()

This operation creates a user.

```java
public void createUser(CreateUserReq request)
```

## Request Syntax

```java
createUser(CreateUserReq.builder()
    .userName(String userName)
    .password(String password)
    .build()
)
```

**BUILDER METHODS:**

- `userName(String roleName)`

    The name of the user to create.

- `password(String password)`

    The password of the user to create.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

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
CreateUserReq createUserReq = CreateUserReq.builder()
        .userName("test")
        .password("Zilliz@2023")
        .build();
        
client.createUser(createUserReq);
```

