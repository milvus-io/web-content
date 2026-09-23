# GrantPrivilege()

This operation grants a privilege to a role using the v1 API with explicit object type and object name. For the simplified v2 API, use `GrantPrivilegeV2()`.

```go
func (c *Client) GrantPrivilege(ctx context.Context, option GrantPrivilegeOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewGrantPrivilegeOption(roleName, objectType, privilegeName, objectName).
    WithDbName(dbName)

err := client.GrantPrivilege(ctx, option)
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

**BUILDER METHODS:**

- `NewGrantPrivilegeOption(roleName, objectType, privilegeName, objectName string)`

    Creates a new option to grant a privilege to a role.

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

err = cli.GrantPrivilege(ctx, milvusclient.NewGrantPrivilegeOption("my_role", "Collection", "Search", "quick_setup"))
if err != nil {
	// handle error
}
```
