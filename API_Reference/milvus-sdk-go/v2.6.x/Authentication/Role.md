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

    The list of granted privileges. Each `GrantItem` describes a single granted privilege:

    - **Object** (*string*)

        The object type the privilege applies to.

    - **ObjectName** (*string*)

        The name of the object.

    - **RoleName** (*string*)

        The name of the role that holds the grant.

    - **Grantor** (*string*)

        The user who granted the privilege.

    - **Privilege** (*string*)

        The granted privilege.

    - **DbName** (*string*)

        The database the privilege applies to.

## Example

Demonstrates Role usage.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v2/milvusclient"
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