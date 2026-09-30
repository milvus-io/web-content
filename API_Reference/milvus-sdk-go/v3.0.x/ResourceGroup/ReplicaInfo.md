# ReplicaInfo

Represents the replica information of a collection, including shard distribution across nodes, returned by DescribeReplica.

```go
type ReplicaInfo struct {
    ReplicaID         int64
    Shards            []*Shard
    Nodes             []int64
    ResourceGroupName string
    NumOutboundNode   map[string]int32
}
```

**FIELDS:**

- **ReplicaID** (*int64*)

    The unique identifier of the replica.

- **Shards** (*[]*Shard*)

    The list of shards in the replica.

- **Nodes** (*[]int64*)

    The list of node IDs hosting the replica.

- **ResourceGroupName** (*string*)

    The name of the resource group the replica belongs to.

- **NumOutboundNode** (*map[string]int32*)

    The number of outbound nodes per collection.

## Shard

Represents a shard within a replica.

```go
type Shard struct {
    ChannelName string
    ShardNodes  []int64
    ShardLeader int64
}
```

**FIELDS:**

- **ChannelName** (*string*)

    The name of the shard channel.

- **ShardNodes** (*[]int64*)

    The list of node IDs serving the shard.

- **ShardLeader** (*int64*)

    The ID of the leader node of the shard.
