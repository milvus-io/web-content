# RestoreRBAC()

This operation restores a full backup of RBAC metadata, including users, roles, grants, and privilege groups, previously captured with `BackupRBAC()`.

```go
func (c *Client) RestoreRBAC(ctx context.Context, option RestoreRBACOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewRestoreRBACOption(meta)

err := client.RestoreRBAC(ctx, option)
```

**PARAMETERS:**

- **meta** (*[entity.RBACMeta](RBACMeta.md)*)

    The RBAC metadata to restore, typically the snapshot returned by `BackupRBAC()`.

**BUILDER METHODS:**

- `NewRestoreRBACOption(meta *entity.RBACMeta)`

    Creates a new option with the RBAC metadata to restore.

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

	"github.com/milvus-io/milvus/client/v3/entity"
	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

backup, err := cli.BackupRBAC(ctx, milvusclient.NewBackupRBACOption())
if err != nil {
	// handle error
}

meta := &entity.RBACMeta{
	Users:           backup.Users,
	Roles:           backup.Roles,
	RoleGrants:      backup.RoleGrants,
	PrivilegeGroups: backup.PrivilegeGroups,
}

err = cli.RestoreRBAC(ctx, milvusclient.NewRestoreRBACOption(meta))
if err != nil {
	// handle error
}
```
