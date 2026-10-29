# BackupRBAC()

This operation creates a full backup of RBAC metadata, including users, roles, grants, and privilege groups.

```go
func (c *Client) BackupRBAC(ctx context.Context, option BackupRBACOption, callOptions ...grpc.CallOption) (*entity.RBACMeta, error)
```

**RETURN TYPE:**

*entity.RBACMeta, error*

**RETURNS:**

The full RBAC metadata snapshot including users, roles, grants, and privilege groups. Returns an error if the operation fails.

```go
type RBACMeta struct {
    Users []*UserInfo
    Roles []*Role
    RoleGrants []*RoleGrants
    PrivilegeGroups []*PrivilegeGroup
}
```

**PARAMETERS:**

- **Users** (*[]*UserInfo*)

    The users.

- **Roles** (*[]*[Role](Role.md)*)

    The list of assigned roles.

- **RoleGrants** (*[]*RoleGrants*)

    The role grants.

- **PrivilegeGroups** (*[]*[PrivilegeGroup](PrivilegeGroup.md)*)

    The privilege groups.

**ERROR HANDLING:**

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

backup, err := cli.BackupRBAC(ctx, milvusclient.NewBackupRBACOption())
if err != nil {
	// handle error
}
fmt.Println(backup)
```
