# CreateIndex()

This operation creates an index on a specified field of a collection and returns a task to track its progress.

```go
func (c *Client) CreateIndex(ctx context.Context, option CreateIndexOption, callOptions ...grpc.CallOption) (*CreateIndexTask, error)
```

## Request Syntax

```go
option := milvusclient.NewCreateIndexOption(collectionName, fieldName, idx).
    WithIndexName(indexName)

task, err := client.CreateIndex(ctx, option)
```

**PARAMETERS:**

- **option** (*CreateIndexOption*)

    The options for creating the index. Use `NewCreateIndexOption` to construct.

**BUILDER METHODS:**

- `NewCreateIndexOption(collectionName string, fieldName string, index index.Index)`

    Creates options to build an index. `collectionName` specifies the collection, `fieldName` specifies the field to index, and `index` defines the index type and parameters.

- `WithIndexName(indexName string)`

    Sets the name of the index to create.

- `WithExtraParam(key string, value any)`

    Adds an extra index build parameter key-value pair. This method mutates the option in place and does not return the option, so it cannot be chained.

**RETURN TYPE:**

*CreateIndexTask, error*

**RETURNS:**

A CreateIndexTask that can be used to wait for the index build to complete. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/index"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

idx := index.NewAutoIndex(entity.COSINE)

task, err := cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("books", "vector", idx).
	WithIndexName("vector_index"))
if err != nil {
	// handle error
}

// sync wait index to be created
err = task.Await(ctx)
if err != nil {
	// handle error
}
```
