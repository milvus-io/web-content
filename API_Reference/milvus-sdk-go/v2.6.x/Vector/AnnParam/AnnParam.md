# AnnParam

Interface for approximate nearest neighbor search parameters. Use NewCustomAnnParam() to create a configurable instance.

```go
type AnnParam interface {
    Params() map[string]any
}
```

**METHODS:**

- `Params() map[string]any`

    Returns the search parameters as a key-value map.

## Example

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
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

queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

// Create AnnParam for HNSW search (ef controls recall vs speed)
annParam := index.NewHNSWAnnParam(64) // ef = 64

results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", 10, []entity.Vector{entity.FloatVector(queryVector)},
).WithAnnParam(annParam))
if err != nil {
    // handle error
}
fmt.Println(results)
```
