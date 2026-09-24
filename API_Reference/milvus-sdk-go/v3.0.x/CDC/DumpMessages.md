# DumpMessages()

Streams messages from a WAL range for data salvage. It is typically used after a force failover: obtain the salvage checkpoint from `GetReplicateInfo` and pass its message ID as the request's `StartMessageId` to recover messages that were not yet synchronized.

```go
func (c *Client) DumpMessages(ctx context.Context, req *milvuspb.DumpMessagesRequest, opts ...grpc.CallOption) (milvuspb.MilvusService_DumpMessagesClient, error)
```

## Request Syntax

```go
stream, err := cli.DumpMessages(ctx, &milvuspb.DumpMessagesRequest{
	Pchannel:       ckpt.GetPchannel(),
	StartMessageId: ckpt.GetMessageId(),
	StartTimetick:  ckpt.GetTimeTick(),
})
```

**PARAMETERS:**

- **req** (*milvuspb.DumpMessagesRequest*)

    The dump-messages request, with the following fields:

    - `Pchannel` (*string*) - The physical channel whose messages to dump.
    - `StartMessageId` ([]byte) - The message ID from which the dump starts; typically the salvage checkpoint from `GetReplicateInfo`.
    - `StartTimetick` (*uint64*) - The starting time tick of the dump window.
    - `EndTimetick` (*uint64*) - The ending time tick of the dump window.

- **opts** (*...grpc.CallOption*)

    Optional gRPC call options.

**RETURN TYPE:**

**milvuspb.MilvusService_DumpMessagesClient, error*

**RETURNS:**

A server-streaming client. Each frame yielded by `stream.Recv()` is a `DumpMessagesResponse` carrying either an error status or a non-system message. Iterate with `stream.Recv()` until `io.EOF`. Returns an error when the stream cannot be created.

**ERROR HANDLING:**

- **error**

    The stream cannot be created. Check the returned error for failure details.

## Example

```go
import (
	"context"
	"io"

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

info, err := cli.GetReplicateInfo(ctx, &milvuspb.GetReplicateInfoRequest{
	SourceClusterId: "source-cluster",
	TargetPchannel:  "source-channel-dml_0",
})
if err != nil {
	// handle error
}
ckpt := info.GetSalvageCheckpoint()
if ckpt == nil {
	// no salvage checkpoint available
}

stream, err := cli.DumpMessages(ctx, &milvuspb.DumpMessagesRequest{
	Pchannel:       ckpt.GetPchannel(),
	StartMessageId: ckpt.GetMessageId(),
	StartTimetick:  ckpt.GetTimeTick(),
})
if err != nil {
	// handle error
}

for {
	resp, err := stream.Recv()
	if err == io.EOF {
		break
	}
	if err != nil {
		// handle error
	}
	if msg := resp.GetMessage(); msg != nil {
		// process dumped message
	} else if status := resp.GetStatus(); status != nil {
		// handle error status
		break
	}
}
```
