# ResourceGroupConfig

Configuration for creating or updating a resource group, including node limits and transfer policies.

```go
type ResourceGroupConfig struct {
    Requests ResourceGroupLimit
    Limits ResourceGroupLimit
    TransferFrom []*ResourceGroupTransfer
    TransferTo []*ResourceGroupTransfer
    NodeFilter ResourceGroupNodeFilter
}
```

**FIELDS:**

- **Requests** (*ResourceGroupLimit*)

    The requests.

- **Limits** (*ResourceGroupLimit*)

    The limits.

- **TransferFrom** (*[]*ResourceGroupTransfer*)

    The transfer from.

- **TransferTo** (*[]*ResourceGroupTransfer*)

    The transfer to.

- **NodeFilter** (*ResourceGroupNodeFilter*)

    The node filter.

## Example

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
cfg := &entity.ResourceGroupConfig{
    Requests: &entity.ResourceGroupLimit{NodeNum: 2},
    Limits:   &entity.ResourceGroupLimit{NodeNum: 4},
}

err = cli.CreateResourceGroup(ctx, milvusclient.NewCreateResourceGroupOption("my_rg").
    WithConfig(cfg))
if err != nil {
    // handle error
}
```
