# describeUser()

This operation describes a specific user.

```java
public DescribeUserResp describeUser(DescribeUserReq request)
```

## Request Syntax

```java
describeUser(DescribeUserReq.builder()
    .userName(String userName)
    .build()
)
```

**BUILDER METHODS:**

- `userName(String userName)`

    The name of the user to describe.

**RETURN TYPE:**

*DescribeUserResp*

**RETURNS:**

A **DescribeUserResp** object containing the details of the user.

**PARAMETERS:**

- **roles** (*List\<String\>*) -

    A list of role names associated with the user.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.DescribeUserReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Describe a user
DescribeUserReq describeUserReq = DescribeUserReq.builder()
        .userName("test")
        .build();
DescribeUserResp describeUserResp = client.describeUser(describeUserReq);
```

