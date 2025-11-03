# describeResourceGroup()

This operation describes a specific resource group.

```java
public DescribeResourceGroupResp describeResourceGroup(DescribeResourceGroupReq request)
```

## Request Syntax

```java
describeResourceGroup(DescribeResourceGroupReq.builder()
    .groupName(String groupName)
    .build()
)
```

**BUILDER METHODS:**

- `groupName(String collectionName)`

    **&#91;REQUIRED&#93;**

    The name of the target resource group to describe.

**RETURN TYPE:**

*DescribeResourceGroupResp*

**RETURNS:**

A **DescribeResourceGroupResp** object contains the following fields:

- **groupName** (*String*) -

    The name of the current resource group.

- **capacity** (*Integer*) -

    The number of query nodes allocated to the current resource group.

- **numberOfAvailableNode** (*Interger*) -

    The number of available query nodes.

- **numberOfLoadedReplica** (*Map&lt;String, Integer&gt;*) -

    The number of loaded replicas per query node.

- **numberOfOutgoingNode** (*Map&lt;String, Integer&gt;*) -

    The number of outgoing nodes.

- **numberOfInComingNode** (*Map&lt;String, Integer&gt;*) -

    The number of incoming nodes.

- **config** (*ResourceGroupConfig*) -

    The configuration of the current resource group, which is a **ResourceGroupConfig** object as follows:

    - **requests** (*ResourceGroupLimit*) -

        The number of nodes required by a resource group

    - **limits** (*ResourceGroupLimit*) -

        The maximum number of nodes required by a resource group.

    - **from** (*List\&lt;ResourceGroupTransfer&gt;*) -

        The source resource groups for necessary transfers. 

    - **to** (*List\&lt;ResourceGroupTransfer&gt;*) -

        The target resource groups for necessary transfers. 

    - **nodeFilter** (*ResourceGroupNodeFilter*) -

        A filter used to filter the query nodes with specified node labels.

- **nodes** (*List\&lt;NodeInfo&gt;*) -  

    A list of nodes, each of which is a **NodeInfo** object.

    - **nodeId** (Long) -

        The ID of the current query node.

    - **address** (String) -

        The address of the current query node.

    - **hostname** (String) -   

        The hostname of the current query node.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.resourcegroup.request.DescribeResourceGroupReq;
import io.milvus.v2.service.resourcegroup.response.DescribeResourceGroupResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Describe the resource group  
DescribeResourceGroupReq describeResourceGroupReq = DescribeResourceGroupReq.builder()
    .groupName("rg1")
    .build();
DescribeResourceGroupResp group = client.describeResourceGroup(describeResourceGroupReq);
```

