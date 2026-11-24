# ResourceGroupLimit

Specifies the number of query nodes requested or limited for a resource group.

```go
type ResourceGroupLimit struct {
    NodeNum int32
}
```

**PARAMETERS:**

- **NodeNum** (*int32*)

    The number of query nodes.

## Example

Demonstrates ResourceGroupLimit usage.

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

// Create a resource group with a fixed node allocation
cfg := entity.ResourceGroupConfig{
	Requests: entity.ResourceGroupLimit{NodeNum: 2},
	Limits:   entity.ResourceGroupLimit{NodeNum: 4},
}

err = cli.CreateResourceGroup(ctx, milvusclient.NewCreateResourceGroupOption("my_rg").
	WithNodeRequest(2).
	WithNodeLimit(4))
if err != nil {
	// handle error
}
```
