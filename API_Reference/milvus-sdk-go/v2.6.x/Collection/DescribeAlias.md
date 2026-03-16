# DescribeAlias()

This operation returns the details of a collection alias, including the collection it references.

```go
func (c *Client) DescribeAlias(ctx context.Context, option DescribeAliasOption, callOptions ...grpc.CallOption) (*entity.Alias, error)
```

## Request Syntax

```go
option := milvusclient.NewDescribeAliasOption(alias)

result, err := client.DescribeAlias(ctx, option)
```

**PARAMETERS:**

- **alias** (*string*)

    The alias name to assign.

**RETURN TYPE:**

**[entity.Alias](Alias.md), error*

**RETURNS:**

The alias details including the associated collection name. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

alias, err := cli.DescribeAlias(ctx, milvusclient.NewDescribeAliasOption("bob"))
if err != nil {
	// handle error
}
fmt.Println(alias)
```
