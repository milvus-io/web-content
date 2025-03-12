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
// prepare resource group config
ResourceGroupLimit requests = new ResourceGroupLimit(1);
ResourceGroupLimit limits = new ResourceGroupLimit(1);
List<ResourceGroupTransfer> from = new ArrayList<>();
from.add(new ResourceGroupTransfer("DEFAULT_RESOURCE_GROUP"));
List<ResourceGroupTransfer> to = new ArrayList<>();
to.add(new ResourceGroupTransfer("DEFAULT_RESOURCE_GROUP"));

ResourceGroupConfig config = ResourceGroupConfig.builder()
    .withRequests(requests)
    .withLimits(limits)
    .withFrom(from)
    .withTo(to)
    .build()

// prepare requests  
Map<String, ResourceGroupConfig> resourceGroups = new Map<>();
resourceGroups.put("rg1", config);
  
UpdateResourceGroupsReq updateResourceGroupsReq = UpdateResourceGroupsReq.builder()
    .resourceGroups(resourceGroups)
    .build();

// update resource group
client.updateResourceGroups(updateResourceGroupsReq)
```

