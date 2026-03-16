# DropIndexProperties()

This operation removes specified properties from an index.

```go
func (c *Client) DropIndexProperties(ctx context.Context, opt DropIndexPropertiesOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewDropIndexPropertiesOption(collectionName, indexName, keys)

err := client.DropIndexProperties(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **indexName** (*string*)

    The name of the index.

- **keys** (*...string*)

    The keys.

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

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle err
}
defer cli.Close(ctx)

err = cli.DropIndexProperties(ctx, milvusclient.NewDropIndexPropertiesOption("my_collection", "my_index", "mmap.enabled"))
if err != nil {
	// handle err
}
```
