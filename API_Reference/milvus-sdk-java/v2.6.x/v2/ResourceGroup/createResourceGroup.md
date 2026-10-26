# createResourceGroup()

This operation creates a resource group.

```java
public void createResourceGroup(CreateResourceGroupReq request)
```

## Request Syntax

```java
createResourceGroup(CreateResourceGroupReq.builder()
    .groupName(String groupName)
    .config(ResourceGroupConfig config)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String groupName)`

    **[REQUIRED]**

    The name of the target resource group to create.

- `config(ResourceGroupConfig config)`

    **[REQUIRED]**

    The configuration of the target resource group. See [ResourceGroupConfig](ResourceGroupConfig.md).

**RETURN TYPE:**

*void*

**RETURNS:**


Returns `void`; the absence of an exception indicates that the resource group was created.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.common.resourcegroup.ResourceGroupConfig;
import io.milvus.common.resourcegroup.ResourceGroupLimit;
import io.milvus.v2.service.resourcegroup.request.CreateResourceGroupReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);


// 2. Prepare resource group config
ResourceGroupLimit requests = new ResourceGroupLimit(1);
ResourceGroupLimit limits = new ResourceGroupLimit(1);

ResourceGroupConfig config = ResourceGroupConfig.newBuilder()
    .withRequests(requests)
    .withLimits(limits)
    .build();

// 3. Create a resource group
client.createResourceGroup(CreateResourceGroupReq.builder()
    .groupName("rg1")
    .config(config)
    .build());
```

