# GetReplicateConfiguration()

Gets the current replicate configuration from the Milvus cluster.

```go
func (c *Client) GetReplicateConfiguration(ctx context.Context, opts ...grpc.CallOption) (*commonpb.ReplicateConfiguration, error)
```

## Request Syntax

```go
config, err := cli.GetReplicateConfiguration(ctx)
```

**PARAMETERS:**

- **opts** (*...grpc.CallOption*)

    Optional gRPC call options.

**RETURN TYPE:**

*\*commonpb.ReplicateConfiguration, error*

**RETURNS:**

The current replicate configuration of the cluster, including the configured clusters and replication topologies. Returns an error when the RPC fails.

**ERROR HANDLING:**

- **error**

    The RPC fails. Check the returned error for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

config, err := cli.GetReplicateConfiguration(ctx)
if err != nil {
	// handle error
}
```
