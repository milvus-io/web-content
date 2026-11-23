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

    The ID of the replica.

- **Shards** (*[]*Shard*)

    The shards of the replica. Each shard has:

    - **ChannelName** (*string*)

        The channel name of the shard.

    - **ShardNodes** (*[]int64*)

        The query nodes hosting the shard.

    - **ShardLeader** (*int64*)

        The leader node of the shard.

- **Nodes** (*[]int64*)

    The query nodes that hold the replica.

- **ResourceGroupName** (*string*)

    The resource group that owns the replica.

- **NumOutboundNode** (*map[string]int32*)

    The number of query nodes transferred out to each resource group.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
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
