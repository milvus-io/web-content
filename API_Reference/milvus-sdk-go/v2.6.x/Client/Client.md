# Client

The Milvus gRPC client. Create one with `New()` and use it to call all Milvus operations, each of which is documented on its own page grouped by business-domain category.

```go
type Client struct {
    // unexported connection and configuration state
}
```

**CONSTRUCTOR:**

- `New(ctx context.Context, config *[ClientConfig](ClientConfig.md)) (*Client, error)`

    Creates a client connected to the Milvus server described by `config`. See [New](New.md).

**METHODS:**

All operations are methods on `Client` and are documented on their own pages, grouped by category (for example `Collection/`, `Vector/`, `ResourceGroup/`, and `Authentication/`).

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

// Connect to a local Milvus server
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
if err != nil {
	log.Fatal("failed to create client:", err)
}
defer cli.Close(ctx)

collections, err := cli.ListCollections(ctx, milvusclient.NewListCollectionOption())
if err != nil {
	log.Fatal("failed to list collections:", err)
}
fmt.Println(collections)
```
