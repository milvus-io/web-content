# RevokeRole()

This operation removes a role from a user.

```go
func (c *Client) RevokeRole(ctx context.Context, opt RevokeRoleOption, callOpts ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewRevokeRoleOption(userName, roleName)

err := client.RevokeRole(ctx, option)
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

err = cli.RevokeRole(ctx, milvusclient.NewRevokeRoleOption("my_user", "my_role"))
if err != nil {
	// handle error
}
```
