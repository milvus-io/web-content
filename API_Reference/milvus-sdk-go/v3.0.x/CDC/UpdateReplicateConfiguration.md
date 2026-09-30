# UpdateReplicateConfiguration()

Updates the replicate configuration of the Milvus cluster. Use a `ReplicateConfigurationBuilder` to build the configuration.

```go
func (c *Client) UpdateReplicateConfiguration(ctx context.Context, req *milvuspb.UpdateReplicateConfigurationRequest, opts ...grpc.CallOption) error
```

## Request Syntax

```go
req := milvusclient.NewReplicateConfigurationBuilder().
	WithCluster(sourceCluster).
	WithCluster(targetCluster).
	WithTopology("source-cluster", "target-cluster").
	Build()

err := cli.UpdateReplicateConfiguration(ctx, req)
```

**PARAMETERS:**

- **req** (*milvuspb.UpdateReplicateConfigurationRequest*)

    The replicate configuration request. Build it with `milvusclient.NewReplicateConfigurationBuilder()`, which exposes the following methods:

    - `WithCluster(cluster *commonpb.MilvusCluster)` - Adds a cluster configuration. Use `milvusclient.NewMilvusClusterBuilder(clusterID)` to create a `MilvusCluster` with `WithURI`, `WithToken`, and `WithPchannels`.
    - `WithTopology(sourceClusterID, targetClusterID string)` - Adds a cross-cluster replication topology.
    - `WithForcePromote()` - Enables force promote for failover scenarios.

- **opts** (*...grpc.CallOption*)

    Optional gRPC call options.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the replicate configuration is updated. Returns an error when the RPC fails.

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

sourceCluster := milvusclient.NewMilvusClusterBuilder("source-cluster").
	WithURI("localhost:19530").
	WithPchannels("source-channel-1", "source-channel-2").
	Build()

targetCluster := milvusclient.NewMilvusClusterBuilder("target-cluster").
	WithURI("localhost:19531").
	WithPchannels("target-channel-1", "target-channel-2").
	Build()

req := milvusclient.NewReplicateConfigurationBuilder().
	WithCluster(sourceCluster).
	WithCluster(targetCluster).
	WithTopology("source-cluster", "target-cluster").
	Build()

err = cli.UpdateReplicateConfiguration(ctx, req)
if err != nil {
	// handle error
}
```
