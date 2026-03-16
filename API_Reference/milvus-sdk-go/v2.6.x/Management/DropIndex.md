# DropIndex()

This operation drops an index from a collection field.

```go
func (c *Client) DropIndex(ctx context.Context, opt DropIndexOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropIndexOption(collectionName, indexName)

err := client.DropIndex(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

      The name of the target collection.

- **indexName** (*string*)

      The name of the index.

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

err = cli.DropIndex(ctx, milvusclient.NewDropIndexOption("my_collection", "my_index"))
if err != nil {
	// handle err
}
```
