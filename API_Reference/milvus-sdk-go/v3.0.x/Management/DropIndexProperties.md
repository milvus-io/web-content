# DropIndexProperties()

This operation removes one or more properties from an existing index.

```go
func (c *Client) DropIndexProperties(ctx context.Context, opt DropIndexPropertiesOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropIndexPropertiesOption(collectionName, indexName, keys...)

err := client.DropIndexProperties(ctx, option)
```

**PARAMETERS:**

- **option** (*DropIndexPropertiesOption*)

    The options for dropping the index properties. Use `NewDropIndexPropertiesOption` to construct.

**BUILDER METHODS:**

- `NewDropIndexPropertiesOption(collectionName string, indexName string, keys ...string)`

    Creates options to drop index properties. `collectionName` specifies the collection, `indexName` specifies the index, and `keys` lists the property keys to remove.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the index properties are dropped. Returns an error if the operation fails.

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

err = cli.DropIndexProperties(ctx, milvusclient.NewDropIndexPropertiesOption("books", "vector_index", "mmap.enabled"))
if err != nil {
	// handle error
}
```
