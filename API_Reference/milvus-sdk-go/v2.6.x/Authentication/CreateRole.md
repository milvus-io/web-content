# CreateRole()

This operation creates a new role for access control.

```go
func (c *Client) CreateRole(ctx context.Context, opt CreateRoleOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewCreateRoleOption(roleName)

err := client.CreateRole(ctx, option)
```

**PARAMETERS:**

- **roleName** (*string*)

    The name of the role.

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
	Address: "localhost:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.CreateRole(ctx, milvusclient.NewCreateRoleOption("my_role"))
if err != nil {
	// handle error
}
```
