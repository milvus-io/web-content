# PrivilegeGroup

Represents a named group of privileges that can be granted together.

```go
type PrivilegeGroup struct {
    GroupName string
    Privileges []string
}
```

**PARAMETERS:**

- **GroupName** (*string*)

    The name of the privilege group.

- **Privileges** (*[]string*)

    The list of granted privileges.

## Example

Demonstrates PrivilegeGroup usage.

```go
import (
	"context"
	"fmt"

	"github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
	Address: "127.0.0.1:19530",
})
if err != nil {
	// handle error
}
defer cli.Close(ctx)

groups, err := cli.ListPrivilegeGroups(ctx, milvusclient.NewListPrivilegeGroupsOption())
if err != nil {
	// handle error
}
for _, group := range groups {
	fmt.Println(group.GroupName, group.Privileges)
}
```