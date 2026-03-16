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

- **index** (*[index.Index](Index/Index.md)*)

    The index.

**OPTION METHODS:**

- `WithIndexName(indexName string)`

    Sets the name of the index.

**RETURN TYPE:**

**[CreateIndexTask](CreateIndexTask.md), error*

**RETURNS:**

A CreateIndexTask that can be used to wait for the index build to complete. Returns an error if the operation fails.

**EXCEPTIONS:**

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
