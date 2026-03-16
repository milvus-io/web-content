# RestoreRBAC()

This operation restores RBAC metadata from a previously created backup.

```go
func (c *Client) RestoreRBAC(ctx context.Context, option RestoreRBACOption, callOptions ...grpc.CallOption) error
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

// First back up the RBAC metadata
backup, err := cli.BackupRBAC(ctx, milvusclient.NewBackupRBACOption())
if err != nil {
	// handle error
}

// Restore the RBAC metadata from backup
err = cli.RestoreRBAC(ctx, milvusclient.NewRestoreRBACOption(backup))
if err != nil {
	// handle error
}
```
