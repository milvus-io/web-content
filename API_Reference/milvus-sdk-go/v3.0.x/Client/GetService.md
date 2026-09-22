# GetService()

This operation returns the underlying gRPC `MilvusServiceClient` used by the client. Use it for advanced operations that are not exposed through the high-level `Client` API.

```go
func (c *Client) GetService() milvuspb.MilvusServiceClient
```

**RETURN TYPE:**

*milvuspb.MilvusServiceClient*

**RETURNS:**

The gRPC service client backed by the client's connection.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

service := cli.GetService()
```
