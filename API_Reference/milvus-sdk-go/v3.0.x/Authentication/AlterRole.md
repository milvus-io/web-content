# AlterRole()

This operation modifies the description of an existing role.

```go
func (c *Client) AlterRole(ctx context.Context, opt AlterRoleOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAlterRoleOption(roleName).
    WithDescription(description)

err := client.AlterRole(ctx, option)
```

**PARAMETERS:**

- **option** (*AlterRoleOption*)

    The options for altering the role. Use `NewAlterRoleOption` to construct.

**BUILDER METHODS:**

- `NewAlterRoleOption(roleName string)`

    Creates options to alter a role. `roleName` specifies the role to modify.

- `WithDescription(description string)`

    Sets the description of the role.

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

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

err = cli.AlterRole(ctx, milvusclient.NewAlterRoleOption("my_role").
	WithDescription("read only role"))
if err != nil {
	// handle error
}
```
