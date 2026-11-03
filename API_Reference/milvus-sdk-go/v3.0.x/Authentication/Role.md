# Role

Represents a role with its granted privileges, returned by DescribeRole.

```go
type Role struct {
    RoleName string
    Privileges []GrantItem
}
```

**PARAMETERS:**

- **RoleName** (*string*)

    The name of the role.

- **Privileges** (*[]GrantItem*)

    The list of granted privileges.

## Example

Demonstrates Role usage.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

role, err := cli.DescribeRole(ctx, milvusclient.NewDescribeRoleOption("my_role"))
if err != nil {
	// handle error
}
fmt.Println(role.RoleName, role.Privileges)
```