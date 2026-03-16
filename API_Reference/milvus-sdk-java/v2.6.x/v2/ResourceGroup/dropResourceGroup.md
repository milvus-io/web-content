# dropResourceGroup()

This operation drops a resource group.

```java
public Void dropResourceGroup(DropResourceGroupReq request)
```

## Request Syntax

```java
dropResourceGroup(DropResourceGroupReq.builder()
    .groupName(String groupName)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String collectionName)`

    **[REQUIRED]**

    The name of the target resource group to drop.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.resourcegroup.request.DropResourceGroupReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Drop a resource group  
DropResourceGroupReq dropResourceGroupReq = DropResourceGroupReq.builder()
    .groupName("rg1")
    .build();
client.dropResourceGroup(dropResourceGroupReq);
```

