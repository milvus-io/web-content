# describeUser()

This operation returns the roles assigned to a user and the user description.

```java
public DescribeUserResp describeUser(DescribeUserReq request)
```

## Request Syntax

```java
DescribeUserResp resp = client.describeUser(DescribeUserReq.builder()
    .userName(String userName)
    .build()
);
```

**BUILDER METHODS:**

- `userName(String userName)`

    **[REQUIRED]**

    The name of the user to describe.

**RETURN TYPE:**

*DescribeUserResp*

**RETURNS:**

A **DescribeUserResp** object that contains `userName`, `roles`, and `description`.

- `getUserName()` (*String*) -

    The name of the user.

- `getRoles()` (*List\<String\>*) -

    The roles assigned to the user.

- `getDescription()` (*String*) -

    The description of the user.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.CreateUserReq;
import io.milvus.v2.service.rbac.request.DescribeUserReq;
import io.milvus.v2.service.rbac.response.DescribeUserResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a user
client.createUser(CreateUserReq.builder()
    .userName("analyst_user")
    .password("Milvus-Password-123")
    .description("Analytics user")
    .build());

// 3. Describe the user
DescribeUserResp resp = client.describeUser(DescribeUserReq.builder()
    .userName("analyst_user")
    .build());
System.out.println(resp.getDescription());
```
