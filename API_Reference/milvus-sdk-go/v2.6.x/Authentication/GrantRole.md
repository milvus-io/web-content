# GrantRole()

This operation assigns a role to a user.

```go
func (c *Client) GrantRole(ctx context.Context, opt GrantRoleOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewGrantRoleOption(userName, roleName)

err := client.GrantRole(ctx, option)
```

**PARAMETERS:**

- **userName** (*string*)

    The name of the user.

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

err = cli.GrantRole(ctx, milvusclient.NewGrantRoleOption("my_user", "my_role"))
if err != nil {
	// handle error
}
```
