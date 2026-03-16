# DropRole()

This operation drops a role from the system.

```go
func (c *Client) DropRole(ctx context.Context, opt DropRoleOption, callOpts ...grpc.CallOption) error
```

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

err = cli.DropRole(ctx, milvusclient.NewDropRoleOption("my_role"))
if err != nil {
	// handle error
}
```
