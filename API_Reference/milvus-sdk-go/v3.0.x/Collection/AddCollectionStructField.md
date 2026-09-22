# AddCollectionStructField()

This operation adds a struct-array field to an existing collection after validating the field option on the client.

```go
func (c *Client) AddCollectionStructField(ctx context.Context, opt AddCollectionStructFieldOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAddCollectionStructFieldOption(collectionName, field)

err := client.AddCollectionStructField(ctx, option)
```

**PARAMETERS:**

- **option** (*AddCollectionStructFieldOption*)

    The options for adding the struct-array field. Use `NewAddCollectionStructFieldOption` to construct.

**BUILDER METHODS:**

- `NewAddCollectionStructFieldOption(collectionName string, field *entity.Field)`

    Creates options to add a struct-array field. The field must use the Array data type with the Struct element type and include a struct schema. `collectionName` specifies the collection, and `field` defines the field to add.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the field is added. Returns an error when client-side validation or the RPC fails.

**EXCEPTIONS:**

- **error**

    Validation, request construction, or the RPC fails. Check `err != nil` for failure details.

## Example

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

structSchema := entity.NewStructSchema().
	WithField(entity.NewField().WithName("title").WithDataType(entity.FieldTypeVarChar).WithMaxLength(256))

field := entity.NewField().
	WithName("chunks").
	WithDataType(entity.FieldTypeArray).
	WithElementType(entity.FieldTypeStruct).
	WithStructSchema(structSchema)

err = cli.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption("books", field))
if err != nil {
	// handle error
}
```
