# GrantPrivilegeV2()

This operation grants a privilege to a role using the v2 API with simplified parameters.

```go
func (c *Client) GrantPrivilegeV2(ctx context.Context, option GrantPrivilegeV2Option, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewGrantPrivilegeV2Option(roleName, privilegeName, collectionName).
    WithDbName(dbName)

err := client.GrantPrivilegeV2(ctx, option)
```

**PARAMETERS:**

- **roleName** (*string*)

      The name of the role.

- **privilegeName** (*string*)

      The name of the privilege.

- **collectionName** (*string*)

      The name of the target collection.

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
	Address: milvusAddr,
})
if err != nil {
	// handle error
}

defer cli.Close(ctx)

err = cli.GrantPrivilegeV2(ctx, milvusclient.NewGrantPrivilegeV2Option("my_role", "Search", "quick_setup"))
if err != nil {
	// handle error
}
```
