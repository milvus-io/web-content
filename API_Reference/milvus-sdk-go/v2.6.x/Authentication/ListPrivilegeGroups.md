# ListPrivilegeGroups()

This operation lists all privilege groups and their included privileges.

```go
func (c *Client) ListPrivilegeGroups(ctx context.Context, option ListPrivilegeGroupsOption, callOptions ...grpc.CallOption) ([]*entity.PrivilegeGroup, error)
```

**RETURN TYPE:**

*[]*entity.PrivilegeGroup, error*

**RETURNS:**

A list of privilege groups with their included privileges. Returns an error if the operation fails.

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

groups, err := cli.ListPrivilegeGroups(ctx, milvusclient.NewListPrivilegeGroupsOption())
if err != nil {
	// handle error
}
fmt.Println(groups)
```
