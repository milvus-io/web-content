# ListAliases()

This operation returns the aliases of a specified collection.

```go
func (c *Client) ListAliases(ctx context.Context, option ListAliasesOption, callOptions ...grpc.CallOption) ([]string, error)
```

## Request Syntax

```go
option := milvusclient.NewListAliasesOption(collectionName)

result, err := client.ListAliases(ctx, option)
```

**PARAMETERS:**

- **option** (*ListAliasesOption*)

    The options for listing the aliases. Use `NewListAliasesOption` to construct.

**BUILDER METHODS:**

- `NewListAliasesOption(collectionName string)`

    Creates options to list the aliases of a collection. `collectionName` specifies the collection.

**RETURN TYPE:**

*[]string, error*

**RETURNS:**

A list of alias names for the collection. Returns an error if the operation fails.

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

result, err := cli.ListAliases(ctx, milvusclient.NewListAliasesOption("books"))
if err != nil {
	// handle error
}
fmt.Println(result)
```
