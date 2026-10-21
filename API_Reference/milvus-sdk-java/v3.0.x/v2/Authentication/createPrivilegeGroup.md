# createPrivilegeGroup()

This operation creates a privilege group.

```java
public Void createPrivilegeGroup(CreatePrivilegeGroupReq request)
```

## Request Syntax

```java
createPrivilegeGroup(CreatePrivilegeGroupReq.builder()
    .groupName(String groupName)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String groupName)`

    The name of the privilege group to create.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.CreatePrivilegeGroupReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a privilege group
CreatePrivilegeGroupReq createPrivilegeGroupReq = CreatePrivilegeGroupReq.builder()
        .groupName("read_only")
        .build();
        
client.createPrivilegeGroup(createPrivilegeGroupReq);
```

