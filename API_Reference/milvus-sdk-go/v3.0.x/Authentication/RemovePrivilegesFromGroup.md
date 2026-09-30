# RemovePrivilegesFromGroup()

This operation removes one or more privileges from an existing privilege group.

```go
func (c *Client) RemovePrivilegesFromGroup(ctx context.Context, option RemovePrivilegeFromGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewRemovePrivilegesFromGroupOption(groupName, privilegeNames...)

err := client.RemovePrivilegesFromGroup(ctx, option)
```

**PARAMETERS:**

- **groupName** (*string*)

    The name of the privilege group.

- **privilegeNames** (*...string*)

    The names of the privileges to remove from the group.

**BUILDER METHODS:**

- `NewRemovePrivilegesFromGroupOption(groupName string, privileges ...string)`

    Creates a new option to remove privileges from a privilege group.

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

err = cli.RemovePrivilegesFromGroup(ctx, milvusclient.NewRemovePrivilegesFromGroupOption("my_priv_group", "Query"))
if err != nil {
	// handle error
}
```
