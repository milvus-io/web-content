# ListRoles()

This operation returns the names of all roles.

```go
func (c *Client) ListRoles(ctx context.Context, opt ListRoleOption, callOpts ...grpc.CallOption) ([]string, error)
```

## Request Syntax

```go
option := milvusclient.NewListRoleOption()

result, err := client.ListRoles(ctx, option)
```

**PARAMETERS:**

- **option** (*ListRoleOption*)

    The options for listing the roles. Use `NewListRoleOption` to construct.

**BUILDER METHODS:**

- `NewListRoleOption()`

    Creates options to list all roles.

**RETURN TYPE:**

*[]string, error*

**RETURNS:**

A list of role names. Returns an error if the operation fails.

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

roles, err := cli.ListRoles(ctx, milvusclient.NewListRoleOption())
if err != nil {
	// handle error
}
fmt.Println(roles)
```
