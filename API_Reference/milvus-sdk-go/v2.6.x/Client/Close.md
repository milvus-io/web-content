# Close()

This operation closes the client connection and releases associated resources.

```go
func (c *Client) Close(ctx context.Context) error
```

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil on success, or an error describing what went wrong.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"
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

err = cli.Close(ctx)
if err != nil {
	log.Fatal("failed to close client:", err)
}
```
