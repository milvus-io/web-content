# AddFunctionField()

This operation adds a function field to an existing collection after validating the field and function options on the client.

```go
func (c *Client) AddFunctionField(ctx context.Context, opt AddFunctionFieldOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAddFunctionFieldOption(collectionName, field, function, boundIndex).
    WithIndexName(indexName)

err := client.AddFunctionField(ctx, option)
```

**PARAMETERS:**

- **option** (*AddFunctionFieldOption*)

    The options for adding the function field. Use `NewAddFunctionFieldOption` to construct.

**BUILDER METHODS:**

- `NewAddFunctionFieldOption(collectionName string, field *entity.Field, function *entity.Function, boundIndex index.Index)`

    Creates options to add a function field. `field` defines the function output field, `function` describes the built-in function (BM25 or MinHash), and `boundIndex` is the index bound to the output field.

- `WithIndexName(indexName string)`

    Sets the name of the index bound to the function output field.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the function field is added. Returns an error when client-side validation or the RPC fails.

**EXCEPTIONS:**

- **error**

    Validation, request construction, or the RPC fails. Check `err != nil` for failure details.

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

outputField := entity.NewField().
	WithName("sparse_vector").
	WithDataType(entity.FieldTypeSparseVector)

fn := entity.NewFunction().
	WithName("bm25_fn").
	WithType(entity.FunctionTypeBM25).
	WithInputFields("text").
	WithOutputFields("sparse_vector")

boundIndex := index.NewSparseInvertedIndex(entity.IP, 0.2)

err = cli.AddFunctionField(ctx, milvusclient.NewAddFunctionFieldOption("books", outputField, fn, boundIndex).
	WithIndexName("bm25_index"))
if err != nil {
	// handle error
}
```
