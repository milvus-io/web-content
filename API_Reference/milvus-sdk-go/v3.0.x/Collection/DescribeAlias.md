# DescribeAlias()

This operation returns detailed information about an alias, including the collection it points to.

```go
func (c *Client) DescribeAlias(ctx context.Context, option DescribeAliasOption, callOptions ...grpc.CallOption) (*entity.Alias, error)
```

## Request Syntax

```go
option := milvusclient.NewDescribeAliasOption(alias)

result, err := client.DescribeAlias(ctx, option)
```

**PARAMETERS:**

- **option** (*DescribeAliasOption*)

    The options for describing the alias. Use `NewDescribeAliasOption` to construct.

**BUILDER METHODS:**

- `NewDescribeAliasOption(alias string)`

    Creates options to describe an alias. `alias` specifies the alias name.

**RETURN TYPE:**

**entity.Alias, error*

**RETURNS:**

The alias description including the alias name, the target collection, and the database name. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

alias, err := cli.DescribeAlias(ctx, milvusclient.NewDescribeAliasOption("books_alias"))
if err != nil {
	// handle error
}
log.Println(alias)
```
