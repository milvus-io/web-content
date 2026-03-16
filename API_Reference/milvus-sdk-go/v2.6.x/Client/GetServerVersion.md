# GetServerVersion()

This operation returns the version of the connected Milvus server.

```go
func (c *Client) GetServerVersion(ctx context.Context, option GetServerVersionOption, callOptions ...grpc.CallOption) (string, error)
```

**RETURN TYPE:**

*string, error*

**RETURNS:**

The requested string value. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"
	"log"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
if err != nil {
	log.Fatal("failed to create client:", err)
}
defer cli.Close(ctx)

version, err := cli.GetServerVersion(ctx, milvusclient.NewGetServerVersionOption())
if err != nil {
	log.Fatal("failed to get server version:", err)
}
fmt.Println(version)
```
