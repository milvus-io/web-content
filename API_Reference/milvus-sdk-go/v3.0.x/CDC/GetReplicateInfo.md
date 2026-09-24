# GetReplicateInfo()

Gets replicate information from the Milvus cluster, such as the salvage checkpoint used after a force failover.

```go
func (c *Client) GetReplicateInfo(ctx context.Context, req *milvuspb.GetReplicateInfoRequest, opts ...grpc.CallOption) (*milvuspb.GetReplicateInfoResponse, error)
```

## Request Syntax

```go
resp, err := cli.GetReplicateInfo(ctx, &milvuspb.GetReplicateInfoRequest{
	SourceClusterId: "source-cluster",
	TargetPchannel:  "source-channel-dml_0",
})
```

**PARAMETERS:**

- **req** (*milvuspb.GetReplicateInfoRequest*)

    The replicate-info request, with the following fields:

    - `SourceClusterId` (*string*) - The ID of the source cluster.
    - `TargetPchannel` (*string*) - The physical channel to query.

- **opts** (*...grpc.CallOption*)

    Optional gRPC call options.

**RETURN TYPE:**

**milvuspb.GetReplicateInfoResponse, error*

**RETURNS:**

The replicate information of the requested source cluster and channel. Use `resp.GetSalvageCheckpoint()` to obtain the checkpoint from which to salvage unsynchronized messages after a force failover. Returns an error when the RPC fails.

**ERROR HANDLING:**

- **error**

    The RPC fails. Check the returned error for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus-proto/go-api/v3/milvuspb"
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

resp, err := cli.GetReplicateInfo(ctx, &milvuspb.GetReplicateInfoRequest{
	SourceClusterId: "source-cluster",
	TargetPchannel:  "source-channel-dml_0",
})
if err != nil {
	// handle error
}
```
