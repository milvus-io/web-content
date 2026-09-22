# DropCollectionField()

This operation removes a field from an existing collection by field name or field ID.

```go
func (c *Client) DropCollectionField(ctx context.Context, opt DropCollectionFieldOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropCollectionFieldOption(collectionName, fieldName)

err := client.DropCollectionField(ctx, option)
```

**PARAMETERS:**

- **option** (*DropCollectionFieldOption*)

    The options for dropping the collection field. Use `NewDropCollectionFieldOption` or `NewDropCollectionFieldByIDOption` to construct.

**BUILDER METHODS:**

- `NewDropCollectionFieldOption(collectionName string, fieldName string)`

    Creates options to drop a field by its name.

- `NewDropCollectionFieldByIDOption(collectionName string, fieldID int64)`

    Creates options to drop a field by its field ID. The field ID must be greater than 0.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the field is dropped. Returns an error when client-side validation or the RPC fails.

**EXCEPTIONS:**

- **error**

    Validation, request construction, or the RPC fails. Check `err != nil` for failure details.

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

err = cli.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption("books", "old_field"))
if err != nil {
	// handle error
}
```
