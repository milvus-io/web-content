# ResourceGroupConfig

Configuration for a Milvus resource group, including required and maximum node counts, node transfers, and an optional node-label filter.

```java
io.milvus.common.resourcegroup.ResourceGroupConfig
```

## Construction

```java
ResourceGroupConfig.newBuilder()
    .withRequests(ResourceGroupLimit requests)
    .withLimits(ResourceGroupLimit limits)
    .withFrom(List<ResourceGroupTransfer> from)
    .withTo(List<ResourceGroupTransfer> to)
    .withNodeFilter(ResourceGroupNodeFilter nodeFilter)
    .build()
```

**BUILDER METHODS:**

- `withRequests(ResourceGroupLimit requests)` — Sets the required node count. If a resource group has fewer nodes, Milvus transfers nodes from the groups in `from`.

- `withLimits(ResourceGroupLimit limits)` — Sets the maximum node count. If a resource group has more nodes, Milvus transfers the surplus nodes to the groups in `to`.

- `withFrom(List<ResourceGroupTransfer> from)` — Sets the source resource groups used to supply missing nodes, in priority order.

- `withTo(List<ResourceGroupTransfer> to)` — Sets the target resource groups that receive surplus nodes, in priority order.

- `withNodeFilter(ResourceGroupNodeFilter nodeFilter)` — Sets the labels used to select query nodes. Set server node labels with environment variables prefixed with `MILVUS_SERVER_LABEL_`, such as `MILVUS_SERVER_LABEL_QUERYNODE_LOCATION=dc1`.

**METHODS:**

- `getRequests()` (*ResourceGroupLimit*) — Returns the required node-count configuration.
- `getLimits()` (*ResourceGroupLimit*) — Returns the maximum node-count configuration.
- `getFrom()` (*List\<ResourceGroupTransfer\>*) — Returns the source resource groups for incoming transfers.
- `getTo()` (*List\<ResourceGroupTransfer\>*) — Returns the target resource groups for outgoing transfers.
- `getNodeFilter()` (*ResourceGroupNodeFilter*) — Returns the node-label filter.

## ResourceGroupLimit

Defines a required or maximum number of query nodes.

```java
new ResourceGroupLimit(Integer nodeNum)
```

**METHODS:**

- `getNodeNum()` (*Integer*) — Returns the configured node count.

## ResourceGroupTransfer

Names a source or target resource group for node transfer.

```java
new ResourceGroupTransfer(String resourceGroupName)
```

**METHODS:**

- `getResourceGroupName()` (*String*) — Returns the resource-group name.

## ResourceGroupNodeFilter

Defines node labels that a resource group prefers when accepting query nodes.

```java
ResourceGroupNodeFilter.newBuilder()
    .withNodeLabel(String key, String value)
    .build()
```

**METHODS:**

- `getNodeLabels()` (*Map\<String, String\>*) — Returns the label names and values.

## Example

```java
ResourceGroupConfig config = ResourceGroupConfig.newBuilder()
    .withRequests(new ResourceGroupLimit(1))
    .withLimits(new ResourceGroupLimit(1))
    .build();
```
