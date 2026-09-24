# DescribeRole()

This operation returns detailed information about a role, including its description and privileges.

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

- **option** (*DescribeRoleOption*)

    The options for describing the role. Use `NewDescribeRoleOption` to construct.

**BUILDER METHODS:**

- `NewDescribeRoleOption(roleName string)`

    Creates options to describe a role. `roleName` specifies the role to describe.

- `WithDbName(dbName string)`

    Specifies the database to use for the operation.

**RETURN TYPE:**

*\*[entity.Role](Role.md), error*

**RETURNS:**

The role description including the role name, description, and privileges. Returns an error if the role is not found or the operation fails.

**EXCEPTIONS:**

- **error**

    Check `err != nil` for failure details.

## Example

```go
import (
	"context"
	"log"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{Address: "127.0.0.1:19530"})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

role, err := cli.DescribeRole(ctx, milvusclient.NewDescribeRoleOption("my_role"))
if err != nil {
	// handle error
}
log.Println(role)
```
