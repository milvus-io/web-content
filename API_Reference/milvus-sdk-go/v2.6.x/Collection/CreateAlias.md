# CreateAlias()

This operation creates an alias for a collection, allowing you to reference it by an alternative name.

```go
func (c *Client) CreateAlias(ctx context.Context, option CreateAliasOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewCreateAliasOption(collectionName, alias)

err := client.CreateAlias(ctx, option)
```

**PARAMETERS:**

- **collectionName** (*string*)

    The name of the target collection.

- **alias** (*string*)

    The alias name to assign.

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

milvusAddr := "127.0.0.1:19530"

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

err = cli.CreateAlias(ctx, milvusclient.NewCreateAliasOption("customized_setup_2", "bob"))
if err != nil {
	// handle error
}

err = cli.CreateAlias(ctx, milvusclient.NewCreateAliasOption("customized_setup_2", "alice"))
if err != nil {
	// handle error
}
```
