# DescribeRole()

This operation returns detailed information about a role, including its granted privileges.

```go
func (c *Client) DescribeRole(ctx context.Context, option DescribeRoleOption, callOptions ...grpc.CallOption) (*entity.Role, error)
```

## Request Syntax

```go
option := milvusclient.NewDescribeRoleOption(roleName).
    WithDbName(dbName)

result, err := client.DescribeRole(ctx, option)
```

**PARAMETERS:**

- **roleName** (*string*)

      The name of the role.

**OPTION METHODS:**

- `WithDbName(dbName string)`

      Specifies the database to use for the operation.

**RETURN TYPE:**

**[entity.Role](Role.md), error*

**RETURNS:**

The role details including granted privileges. Returns an error if the operation fails.

**EXCEPTIONS:**

- **error**

      Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"fmt"

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

role, err := cli.DescribeRole(ctx, milvusclient.NewDescribeRoleOption("my_role"))
if err != nil {
	// handle error
}
fmt.Println(role)
```
