# TruncateCollection()

This operation removes all data from a collection while keeping its schema.

```go
func (c *Client) TruncateCollection(ctx context.Context, option TruncateCollectionOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewTruncateCollectionOption(collectionName)

err := client.TruncateCollection(ctx, option)
```

**PARAMETERS:**

- **option** (*TruncateCollectionOption*)

    The options for truncating the collection. Use `NewTruncateCollectionOption` to construct.

**BUILDER METHODS:**

- `NewTruncateCollectionOption(name string)`

    Creates options to truncate a collection. `name` specifies the collection to truncate.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the collection is truncated. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Request construction or the RPC fails. Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.TruncateCollection(ctx, milvusclient.NewTruncateCollectionOption("books"))
if err != nil {
	// handle error
}
```
