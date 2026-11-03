# Index

Interface for index configuration. Use constructor functions like NewAutoIndex() or NewHNSWIndex() to create instances.

```go
type Index interface {
    Name() string
    IndexType() IndexType
    Params() map[string]string
}
```

**METHODS:**

- `Name() string`

    Returns the name of the index.

- `IndexType() [IndexType](../IndexType.md)`

    Returns the index algorithm type.

- `Params() map[string]string`

    Returns the index parameters as a key-value map.

## Example

Demonstrates Index usage.

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/index"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
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

idx := index.NewHNSWIndex(entity.COSINE, 32, 128)

task, err := cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("my_collection", "vector", idx))
if err != nil {
	// handle error
}
err = task.Await(ctx)
if err != nil {
	// handle error
}
```