# AlterCollectionFieldProperty()

This operation modifies a property of a specific field in a collection.

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

- **collectionName** (*string*)

    The name of the target collection.

- **fieldName** (*string*)

    The name of the field.

**OPTION METHODS:**

- `WithProperty(key string, value any)`

    Sets a custom property key-value pair on the resource.

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

err = cli.AlterCollectionFieldProperty(ctx, milvusclient.NewAlterCollectionFieldPropertiesOption("my_collection", "my_vector").
	WithProperty("mmap.enabled", true))
if err != nil {
	// handle error
}
```
