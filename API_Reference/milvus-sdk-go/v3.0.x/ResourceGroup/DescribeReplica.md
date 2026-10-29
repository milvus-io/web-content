# DescribeReplica()

This operation returns information about collection replicas, including shard distribution across nodes.

```go
func (c *Client) DescribeReplica(ctx context.Context, opt DescribeReplicaOption, callOptions ...grpc.CallOption) ([]*entity.ReplicaInfo, error)
```

## Request Syntax

```go
option := milvusclient.NewDescribeReplicaOption(collectionName)

result, err := client.DescribeReplica(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

**RETURN TYPE:**

*[]*entity.ReplicaInfo, error*

**RETURNS:**

A list of replica details including shard distribution. Returns an error if the operation fails.

```go
type ReplicaInfo struct {
    ReplicaID         int64
    Shards            []*Shard
    Nodes             []int64
    ResourceGroupName string
    NumOutboundNode   map[string]int32
}
```

**PARAMETERS:**

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

**PARAMETERS:**

- **ChannelName** (*string*)

    The name of the shard channel.

- **ShardNodes** (*[]int64*)

    The list of node IDs serving the shard.

- **ShardLeader** (*int64*)

    The ID of the leader node of the shard.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

replica, err := cli.DescribeReplica(ctx, milvusclient.NewDescribeReplicaOption("quick_setup"))
if err != nil {
	// handle error
}
fmt.Println(replica)
```
