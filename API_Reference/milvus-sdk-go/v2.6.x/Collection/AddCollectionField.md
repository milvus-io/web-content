# AddCollectionField()

Adds a nullable field to an existing collection after validating the field option on the client.

```go
func (c *Client) AddCollectionField(ctx context.Context, opt AddCollectionFieldOption, callOpts ...grpc.CallOption) error
```

**PARAMETERS:**

- **collectionName** (*string*) -

    **[REQUIRED]**

    The name of the collection to which the field is added.

- **field** (**entity.Field*) -

    **[REQUIRED]**

    The field definition to add. Vector fields must be nullable.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the field is added. Returns an error when client-side validation or the RPC fails.

**ERROR HANDLING:**

- **error**

    Validation, request construction, or the RPC fails. Check the returned error for failure details.

## Example

Demonstrates AddCollectionField() usage.

```go
import (
	"context"

	"github.com/milvus-io/milvus/client/v2/entity"
	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

field := entity.NewField().
	WithName("new_field").
	WithDataType(entity.FieldTypeInt64).
	WithNullable(true)

err = cli.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption("books", field))
if err != nil {
	// handle error
}
```
