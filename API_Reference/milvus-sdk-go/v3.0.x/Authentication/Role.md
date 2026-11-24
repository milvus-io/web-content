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

    The list of granted privileges. Each **GrantItem** has the following members:

    - **Object** (*string*) -

        The object type of the grant, such as `Collection`.

    - **ObjectName** (*string*) -

        The name of the object the grant applies to.

    - **RoleName** (*string*) -

        The role that holds this grant.

    - **Grantor** (*string*) -

        The name of the grantor.

    - **Privilege** (*string*) -

        The granted privilege, such as `Search` or `Insert`.

    - **DbName** (*string*) -

        The database of the granted object.

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