# CreateIndex()

This operation creates an index on a specified field to accelerate vector similarity search or scalar filtering.

```go
func (c *Client) CreateIndex(ctx context.Context, option CreateIndexOption, callOptions ...grpc.CallOption) (*CreateIndexTask, error)
```

## Request Syntax

```go
option := milvusclient.NewCreateIndexOption(collectionName, fieldName, index).
    WithIndexName(indexName)

result, err := client.CreateIndex(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **fieldName** (*string*)

    The name of the field.

- **[index](Index/Index.md)** (*[index.Index](Index/Index.md)*)

    The index.

**BUILDER METHODS:**

- `WithIndexName(indexName string)`

    Sets the name of the index.

- `WithExtraParam(key string, value any)`

    Adds an extra index build parameter key-value pair. This method mutates the option in place and does not return the option, so it cannot be chained.

**RETURN TYPE:**

*CreateIndexTask, error*

**RETURNS:**

An async task returned by CreateIndex. Call Await() to block until the index build completes.

```go
type CreateIndexTask struct {
}
```

**METHODS:**

- `Await(ctx context.Context) error`

    Blocks until the async operation completes or the context is cancelled. Returns an error if the operation fails.

**ERROR HANDLING:**

- **error**

    Check `err != nil` for failure details.

## Example

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
	Address: milvusAddr,
})
if err != nil {
	// handle err
}

index := index.NewHNSWIndex(entity.COSINE, 32, 128)
indexTask, err := cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("my_collection", "vector", index))
if err != nil {
	// handler err
}

err = indexTask.Await(ctx)
if err != nil {
	// handler err
}
```
