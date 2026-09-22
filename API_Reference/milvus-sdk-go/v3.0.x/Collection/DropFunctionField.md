# DropFunctionField()

This operation removes a function from an existing collection by function name.

```go
func (c *Client) DropFunctionField(ctx context.Context, opt DropFunctionFieldOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropFunctionFieldOption(collectionName, functionName)

err := client.DropFunctionField(ctx, option)
```

**PARAMETERS:**

- **option** (*DropFunctionFieldOption*)

    The options for dropping the function. Use `NewDropFunctionFieldOption` to construct.

**BUILDER METHODS:**

- `NewDropFunctionFieldOption(collectionName string, functionName string)`

    Creates options to drop a function by its name. `collectionName` specifies the collection, and `functionName` specifies the function to remove.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the function is dropped. Returns an error when client-side validation or the RPC fails.

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

err = cli.DropFunctionField(ctx, milvusclient.NewDropFunctionFieldOption("books", "bm25_fn"))
if err != nil {
	// handle error
}
```
