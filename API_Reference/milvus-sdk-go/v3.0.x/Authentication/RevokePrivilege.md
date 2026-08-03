# RevokePrivilege()

This operation revokes a specific privilege from a role.

```go
func (c *Client) RevokePrivilege(ctx context.Context, option RevokePrivilegeOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewRevokePrivilegeOption(roleName, objectType, privilegeName, objectName).
    WithDbName(dbName)

err := client.RevokePrivilege(ctx, option)
```

**PARAMETERS:**

- **roleName** (*string*)

    The name of the role.

- **objectType** (*string*)

    The type of object the privilege applies to (e.g., Global, Collection).

- **privilegeName** (*string*)

    The name of the privilege.

- **objectName** (*string*)

    The name of the object the privilege applies to.

**OPTION METHODS:**

- `WithDbName(dbName string)`

    Specifies the database to use for the operation.

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

err = cli.RevokePrivilege(ctx, milvusclient.NewRevokePrivilegeOption("my_role", "Collection", "Search", "quick_setup"))
if err != nil {
	// handle error
}
```
