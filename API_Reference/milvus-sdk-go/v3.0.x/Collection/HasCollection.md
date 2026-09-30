# HasCollection()

This operation checks whether a collection exists in the connected Milvus instance.

```go
func (c *Client) HasCollection(ctx context.Context, option HasCollectionOption, callOptions ...grpc.CallOption) (has bool, err error)
```

## Request Syntax

```go
option := milvusclient.NewHasCollectionOption(collectionName)

result, err := client.HasCollection(ctx, option)
```

**PARAMETERS:**

- **option** (*HasCollectionOption*)

    The options for checking the collection. Use `NewHasCollectionOption` to construct.

**BUILDER METHODS:**

- `NewHasCollectionOption(name string)`

    Creates options to check whether a collection exists. `name` specifies the collection to check.

**RETURN TYPE:**

*has bool, err error*

**RETURNS:**

A boolean indicating whether the collection exists. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

result, err := cli.HasCollection(ctx, milvusclient.NewHasCollectionOption("books"))
if err != nil {
	// handle error
}
fmt.Println(result)
```
