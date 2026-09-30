# GrantV2()

This operation grants a privilege to a role using the v2 API. Deprecated, use `GrantPrivilegeV2()` instead.

```go
func (c *Client) GrantV2(ctx context.Context, option GrantV2Option, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewGrantV2Option(roleName, privilegeName, dbName, collectionName).
    WithDbName(dbName)

err := client.GrantV2(ctx, option)
```

**PARAMETERS:**

- **roleName** (*string*)

    The name of the role.

- **privilegeName** (*string*)

    The name of the privilege.

- **dbName** (*string*)

    The name of the database.

- **collectionName** (*string*)

    The name of the target collection.

**BUILDER METHODS:**

- `NewGrantV2Option(roleName, privilegeName, dbName, collectionName string)`

    Creates a new option to grant a privilege using the v2 API. Deprecated, use `NewGrantPrivilegeV2Option` instead.

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

err = cli.GrantV2(ctx, milvusclient.NewGrantV2Option("my_role", "Search", "default", "quick_setup"))
if err != nil {
	// handle error
}
```
