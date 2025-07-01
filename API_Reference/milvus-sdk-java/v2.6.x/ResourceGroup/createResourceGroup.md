# createResourceGroup()

This operation creates a resource group.

```java
public Void createResourceGroup(CreateResourceGroupReq request)
```

## Request Syntax

```java
createResourceGroup(CreateResourceGroupReq.builder()
    .groupName(String collectionName)
    .config(ResourceGroupConfig config)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String collectionName)`

    **[REQUIRED]**

    The name of the target resource group to create.

- `config(ResourceGroupConfig config)`

    **[REQUIRED]**

    The configuration of the target resource group, which is a **ResourceGroupConfig** object that provides the following builder methods:

    - `withRequests(ResourceGroupLimit requests)`

        A **ResourceGroupLimit** instance that defines the number of nodes required by a resource group.

    - `withLimits(ResourceGroupLimit limits)`

        A **ResourceGroupLimit** instance that defines the maximum number of nodes required by a resource group.

    - `withFrom(List<ResourceGroupTransfer> from)`

        A list of **ResourceGroupTransfer** instances that defines the source resource groups for necessary transfers. 

    - `withTo(List<ResourceGroupTransfer> to)`

        A list of **ResourceGroupTransfer** instances that defines the target resource groups for necessary transfers. 

    - `withNodeFilter(ResourceGroupNodeFilter nodeFilter)`

        A **ResourceGroupNodeFilter** is used to filter the query nodes with specified node labels.

        <div class="admonition note">

        <p><b>how can i label a query node?</b></p>

        <p>You can set an environment variable for Milvus to label the query node during its startup. For example, to add the <code>QUERYNODE_LOCATION</code> label, you need to create an environment variable named after the label, prefixed by <code>MILVUS_SERVER_LABEL_</code>, and set the value for the label, as in <code>MILVUS_SERVER_LABEL_QUERYNODE_LOCATION=dc1</code>.</p>

        </div>

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
List<ResourceGroupTransfer> from = new ArrayList<>();
from.add(new ResourceGroupTransfer("DEFAULT_RESOURCE_GROUP"));
List<ResourceGroupTransfer> to = new ArrayList<>();
to.add(new ResourceGroupTransfer("DEFAULT_RESOURCE_GROUP"));

ResourceGroupConfig config = ResourceGroupConfig.builder()
    .withRequests(requests)
    .withLimits(limits)
    .withFrom(from)
    .withTo(to)
    .build();

// 3. Create a resource group
CreateResourceGroupReq createResourceGroupReq = CreateResourceGroupReq.builder()
    .groupName("rg1")
    .config(config)
    .build();
client.createResourceGroup(createResourceGroupReq);
```

