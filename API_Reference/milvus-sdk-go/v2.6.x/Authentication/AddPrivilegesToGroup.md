# AddPrivilegesToGroup()

This operation adds privileges to an existing privilege group.

```go
func (c *Client) AddPrivilegesToGroup(ctx context.Context, option AddPrivilegeToGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewAddPrivilegeToGroupOption(groupName, privileges)

err := client.AddPrivilegesToGroup(ctx, option)
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

err = cli.AddPrivilegesToGroup(ctx, milvusclient.NewAddPrivilegesToGroupOption("my_priv_group", "Search", "Query"))
if err != nil {
	// handle error
}
```
