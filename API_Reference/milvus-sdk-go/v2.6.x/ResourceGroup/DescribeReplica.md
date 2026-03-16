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

**EXCEPTIONS:**

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
