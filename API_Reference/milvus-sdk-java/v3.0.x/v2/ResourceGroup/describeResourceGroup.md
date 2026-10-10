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

    **[REQUIRED]**

    The name of the target resource group to describe.

**RETURN TYPE:**

*DescribeResourceGroupResp*

**RETURN TYPE:**

*DescribeResourceGroupResp*

**RETURNS:**

A **DescribeResourceGroupResp** object contains the following getters:.

- `getGroupName()` (*String*) -

    The name of the current resource group.

- `getCapacity()` (*Integer*) -

    The number of query nodes allocated to the current resource group.

- `getNumberOfAvailableNode()` (*Integer*) -

    The number of available query nodes.

- `getNumberOfLoadedReplica()` (*Map<String, Integer>*) -

    The number of loaded replicas per query node.

- `getNumberOfOutgoingNode()` (*Map<String, Integer>*) -

    The number of outgoing nodes.

- `getNumberOfIncomingNode()` (*Map<String, Integer>*) -

    The number of incoming nodes.

- `getConfig()` (*ResourceGroupConfig*) -

    The configuration of the current resource group, which is a **ResourceGroupConfig** object as follows:

    - `getRequests()` (*ResourceGroupLimit*) -

        The number of nodes required by a resource group

    - `getLimits()` (*ResourceGroupLimit*) -

        The maximum number of nodes required by a resource group.

    - `getFrom()` (*List\<ResourceGroupTransfer>*) -

        The source resource groups for necessary transfers. 

    - `getTo()` (*List\<ResourceGroupTransfer>*) -

        The target resource groups for necessary transfers. 

    - `getNodeFilter()` (*ResourceGroupNodeFilter*) -

        A filter used to filter the query nodes with specified node labels.

- `getNodes()` (*List\<NodeInfo>*) -

    A list of nodes, each of which is a **NodeInfo** object.

    - `getNodeId()` (Long) -

        The ID of the current query node.

    - `getAddress()` (String) -

        The address of the current query node.

    - `getHostname()` (String) -

        The hostname of the current query node.

**EXCEPTIONS