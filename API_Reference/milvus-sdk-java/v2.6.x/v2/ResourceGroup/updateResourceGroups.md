# updateResourceGroups()

This operation updates the configuration of the specified resource groups.

```java
public void updateResourceGroups(UpdateResourceGroupsReq request)
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

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.common.resourcegroup.ResourceGroupConfig;
import io.milvus.common.resourcegroup.ResourceGroupLimit;
import io.milvus.v2.service.resourcegroup.request.CreateResourceGroupReq;
import io.milvus.v2.service.resourcegroup.request.UpdateResourceGroupsReq;
import java.util.HashMap;
import java.util.Map;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);



// 2. Create a resource group
ResourceGroupLimit requests = new ResourceGroupLimit(1);
ResourceGroupLimit limits = new ResourceGroupLimit(1);
ResourceGroupConfig config = ResourceGroupConfig.newBuilder()
    .withRequests(requests)
    .withLimits(limits)
    .build();
client.createResourceGroup(CreateResourceGroupReq.builder()
    .groupName("rg1")
    .config(config)
    .build());

// 3. Prepare the updated resource group config
ResourceGroupLimit zeroRequests = new ResourceGroupLimit(0);
ResourceGroupLimit zeroLimits = new ResourceGroupLimit(0);
ResourceGroupConfig updatedConfig = ResourceGroupConfig.newBuilder()
    .withRequests(zeroRequests)
    .withLimits(zeroLimits)
    .build();

Map<String, ResourceGroupConfig> resourceGroups = new HashMap<>();
resourceGroups.put("rg1", updatedConfig);

// 4. Update resource groups
UpdateResourceGroupsReq updateResourceGroupsReq = UpdateResourceGroupsReq.builder()
    .resourceGroups(resourceGroups)
    .build();
client.updateResourceGroups(updateResourceGroupsReq);
```

