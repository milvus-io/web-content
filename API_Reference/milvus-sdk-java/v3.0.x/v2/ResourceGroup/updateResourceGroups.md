# updateResourceGroups()

This operation updates the configuration of the specified resource groups.

```java
public Void updateResourceGroups(UpdateResourceGroupsReq request)
```

## Request Syntax

```java
updateResourceGroups(UpdateResourceGroupsReq.builder()
    .resourceGroups(Map<String, ResourceGroupConfig> resourceGroups)
    .build()
)
```

**BUILDER METHODS:**

- `resourceGroups(Map<String, ResourceGroupConfig> resourceGroups)`

    **[REQUIRED]**

    The resource groups and their configurations after the operation.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.common.resourcegroup.*;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.resourcegroup.request.UpdateResourceGroupsReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Prepare resource group config
ResourceGroupLimit requests = new ResourceGroupLimit(1);
ResourceGroupLimit limits = new ResourceGroupLimit(1);

ResourceGroupConfig config = ResourceGroupConfig.builder()
    .withRequests(requests)
    .withLimits(limits)
    .build()

Map<String, ResourceGroupConfig> resourceGroups = new Map<>();
resourceGroups.put("rg1", config);

// 3. Update resource groups
UpdateResourceGroupsReq updateResourceGroupsReq = UpdateResourceGroupsReq.builder()
    .resourceGroups(resourceGroups)
    .build();
client.updateResourceGroups(updateResourceGroupsReq)
```

