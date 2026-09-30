# AlterCollectionFieldProperty()

This operation modifies the properties of a field in an existing collection.

```go
func (c *Client) AlterCollectionFieldProperty(ctx context.Context, option AlterCollectionFieldPropertiesOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAlterCollectionFieldPropertiesOption(collectionName, fieldName).
    WithProperty(key, value)

err := client.AlterCollectionFieldProperty(ctx, option)
```

**PARAMETERS:**

- **option** (*AlterCollectionFieldPropertiesOption*)

    The options for altering the collection field properties. Use `NewAlterCollectionFieldPropertiesOption` to construct.

**BUILDER METHODS:**

- `NewAlterCollectionFieldPropertiesOption(collectionName string, fieldName string)`

    Creates options to alter field properties. `collectionName` specifies the collection, and `fieldName` specifies the field whose properties are altered.

- `WithProperty(key string, value any)`

    Sets a field property key-value pair after converting the value to its string representation.

**RETURN TYPE:**

*error*

**RETURNS:**

Returns nil after the field properties are altered. Returns an error if the operation fails.

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

err = cli.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption("books", "title").
	WithProperty("max_length", "512"))
if err != nil {
	// handle error
}
```
