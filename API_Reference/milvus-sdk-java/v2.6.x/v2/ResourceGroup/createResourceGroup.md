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

        <div class="alert note">
        
        You can set an environment variable for Milvus to label the query node during its startup. For example, to add the `QUERYNODE_LOCATION` label, you need to create an environment variable named after the label, prefixed by `MILVUS_SERVER_LABEL_`, and set the value for the label, as in `MILVUS_SERVER_LABEL_QUERYNODE_LOCATION=dc1`.

        </div>

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

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

