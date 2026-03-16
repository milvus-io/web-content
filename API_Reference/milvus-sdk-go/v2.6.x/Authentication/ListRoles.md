# ListRoles()

This operation lists all roles in the Milvus instance.

```go
func (c *Client) ListRoles(ctx context.Context, opt ListRoleOption, callOpts ...grpc.CallOption) ([]string, error)
```

**RETURN TYPE:**

*[]string, error*

**RETURNS:**

A list of names. Returns an error if the operation fails.

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

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "localhost:19530",
})
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
