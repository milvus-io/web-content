# GrantPrivilege()

This operation grants a specific privilege to a role on a resource.

```go
func (c *Client) GrantPrivilege(ctx context.Context, option GrantPrivilegeOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewGrantPrivilegeOption(roleName, objectType, privilegeName, objectName).
    WithDbName(dbName)

err := client.GrantPrivilege(ctx, option)
```

**PARAMETERS:**

- **roleName** (*string*)

    The name of the role.

- **objectType** (*string*)

    The type of object the privilege applies to (e.g., Global, Collection).

- **privilegeName** (*string*)

    The name of the privilege.

- **objectName** (*string*)

    The name of the object the privilege applies to.

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

	"github.com/milvus-io/milvus/client/v2/entity"
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

readOnlyPrivileges := []*entity.RoleGrants{
	{Object: "Global", ObjectName: "*", PrivilegeName: "DescribeCollection"},
	{Object: "Global", ObjectName: "*", PrivilegeName: "ShowCollections"},
	{Object: "Collection", ObjectName: "quick_setup", PrivilegeName: "Search"},
}

for _, grantItem := range readOnlyPrivileges {
	err := cli.GrantPrivilege(ctx, milvusclient.NewGrantPrivilegeOption("my_role", grantItem.Object, grantItem.PrivilegeName, grantItem.ObjectName))
	if err != nil {
		// handle error
	}
}
```
