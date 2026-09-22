# AddPrivilegesToGroup()

This operation adds one or more privileges to an existing privilege group.

```go
func (c *Client) AddPrivilegesToGroup(ctx context.Context, option AddPrivilegeToGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAddPrivilegesToGroupOption(groupName, privilegeNames...)

err := client.AddPrivilegesToGroup(ctx, option)
```

**PARAMETERS:**

- **groupName** (*string*)

    The name of the privilege group.

- **privilegeNames** (*...string*)

    The names of the privileges to add to the group.

**BUILDER METHODS:**

- `NewAddPrivilegesToGroupOption(groupName string, privileges ...string)`

    Creates a new option to add privileges to a privilege group.

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

err = cli.AddPrivilegesToGroup(ctx, milvusclient.NewAddPrivilegesToGroupOption("my_priv_group", "Search", "Query"))
if err != nil {
	// handle error
}
```
