# RBACMeta

A full snapshot of RBAC metadata including users, roles, grants, and privilege groups. Used with BackupRBAC/RestoreRBAC.

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

## Example

Demonstrates RBACMeta usage.

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

meta, err := cli.BackupRBAC(ctx, milvusclient.NewBackupRBACOption())
if err != nil {
	// handle error
}
fmt.Println(meta.Users, meta.RoleGrants)
```