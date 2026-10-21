# dropPrivilegeGroup()

This operation creates a privilege group.

```java
public Void dropPrivilegeGroup(DropPrivilegeGroupReq request)
```

## Request Syntax

```java
dropPrivilegeGroup(DropPrivilegeGroupReq.builder()
    .groupName(String groupName)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String groupName)`

    The name of the privilege group to drop.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.rbac.request.DropPrivilegeGroupReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop a privilege group
DropPrivilegeGroupReq dropPrivilegeGroupReq = DropPrivilegeGroupReq.builder()
        .groupName("read_only")
        .build();
        
client.dropPrivilegeGroup(dropPrivilegeGroupReq);
```

