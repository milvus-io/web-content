# ResourceGroup

Represents a resource group and its node and replica distribution, returned by DescribeResourceGroup.

```go
type ResourceGroup struct {
    Name             string
    Capacity         int32
    NumAvailableNode int32
    NumLoadedReplica map[string]int32
    NumOutgoingNode  map[string]int32
    NumIncomingNode  map[string]int32
    Config           *ResourceGroupConfig
    Nodes            []NodeInfo
}
```

**FIELDS:**

- **Name** (*string*)

    The name of the resource group.

- **Capacity** (*int32*)

    The node capacity of the resource group.

- **NumAvailableNode** (*int32*)

    The number of available nodes in the resource group.

- **NumLoadedReplica** (*map[string]int32*)

    The number of loaded replicas per collection.

- **NumOutgoingNode** (*map[string]int32*)

    The number of outgoing nodes per collection.

- **NumIncomingNode** (*map[string]int32*)

    The number of incoming nodes per collection.

- **Config** (*[ResourceGroupConfig](ResourceGroupConfig.md)*)

    The configuration of the resource group.

- **Nodes** (*[]NodeInfo*)

    The list of nodes in the resource group.

## NodeInfo

Represents a node in a resource group.

```go
type NodeInfo struct {
    NodeID   int64
    Address  string
    HostName string
}
```

**FIELDS:**

- **NodeID** (*int64*)

    The unique identifier of the node.

- **Address** (*string*)

    The address of the node.

- **HostName** (*string*)

    The host name of the node.
