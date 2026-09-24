# CreateReplicateStream()

Creates a replicate stream to transmit replication messages.

```go
func (c *Client) CreateReplicateStream(ctx context.Context, opts ...grpc.CallOption) (milvuspb.MilvusService_CreateReplicateStreamClient, error)
```

## Request Syntax

```go
stream, err := cli.CreateReplicateStream(ctx)
```

**PARAMETERS:**

- **opts** (*...grpc.CallOption*)

    Optional gRPC call options.

**RETURN TYPE:**

**milvuspb.MilvusService_CreateReplicateStreamClient, error*

**RETURNS:**

A bidirectional replicate stream. Use `stream.Send(...)` to transmit `milvuspb.ReplicateMessage` frames and `stream.Recv()` to receive responses. Close the send side with `stream.CloseSend()` when done. Returns an error when the stream cannot be created.

**ERROR HANDLING:**

- **error**

    The stream cannot be created. Check the returned error for failure details.

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

stream, err := cli.CreateReplicateStream(ctx)
if err != nil {
	// handle error
}
defer stream.CloseSend()
```
