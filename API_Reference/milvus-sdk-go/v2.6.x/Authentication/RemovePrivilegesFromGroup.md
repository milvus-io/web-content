# RemovePrivilegesFromGroup()

This operation removes privileges from a privilege group.

```go
func (c *Client) RemovePrivilegesFromGroup(ctx context.Context, option RemovePrivilegeFromGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewRemovePrivilegeFromGroupOption(groupName, privileges)

err := client.RemovePrivilegesFromGroup(ctx, option)
```

**PARAMETERS:**

- **groupName** (*string*)

    The name of the privilege group.

- **privileges** (*...string*)

    The list of privileges to include.

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

err = cli.RemovePrivilegesFromGroup(ctx, milvusclient.NewRemovePrivilegesFromGroupOption("my_priv_group", "Search"))
if err != nil {
	// handle error
}
```
