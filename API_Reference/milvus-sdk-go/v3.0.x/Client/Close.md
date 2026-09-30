# Close()

This operation closes the client's gRPC connection and releases its resources. Call it when the client is no longer needed, typically via `defer`.

```go
func (c *Client) Close(ctx context.Context) error
```

**PARAMETERS:**

- **ctx** (*context.Context*)

    The context for the closing operation. The context is used for cancellation and deadlines.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error if the underlying connection failed to close.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

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
```
