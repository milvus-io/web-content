# AddCollectionField()

This operation adds a new field to an existing collection schema.

```go
func (c *Client) AddCollectionField(ctx context.Context, opt AddCollectionFieldOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAddCollectionFieldOption(collectionName, field)

err := client.AddCollectionField(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **field** (**[entity.Field](Field.md)*)

    The field.

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
	"log"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	log.Fatal("failed to connect to milvus server: ", err.Error())
}

defer cli.Close(ctx)

// the field to add
// must be nullable for now
newField := entity.NewField().WithName("new_field").WithDataType(entity.FieldTypeInt64).WithNullable(true)

err = cli.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption("customized_setup_2", newField))
if err != nil {
	// handle error
}
```
