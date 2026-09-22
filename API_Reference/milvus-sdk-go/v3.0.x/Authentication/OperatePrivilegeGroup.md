# OperatePrivilegeGroup()

This operation adds or removes privileges from a privilege group using the low-level v2 API. Deprecated, use `AddPrivilegesToGroup()` or `RemovePrivilegesFromGroup()` instead.

```go
func (c *Client) OperatePrivilegeGroup(ctx context.Context, option OperatePrivilegeGroupOption, callOptions ...grpc.CallOption) error
```

## Request Syntax

```go
option := milvusclient.NewOperatePrivilegeGroupOption(groupName, privileges, operateType)

err := client.OperatePrivilegeGroup(ctx, option)
```

**PARAMETERS:**

- **groupName** (*string*)

    The name of the privilege group.

- **privileges** (*[]*milvuspb.PrivilegeEntity*)

    The privileges to add to or remove from the group.

- **operateType** (*milvuspb.OperatePrivilegeGroupType*)

    The operation to perform: add or remove the specified privileges.

**BUILDER METHODS:**

- `NewOperatePrivilegeGroupOption(groupName string, privileges []*milvuspb.PrivilegeEntity, operateType milvuspb.OperatePrivilegeGroupType)`

    Creates a new option to add or remove privileges from a privilege group. Deprecated, use `NewAddPrivilegesToGroupOption` or `NewRemovePrivilegesFromGroupOption` instead.

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

	"github.com/milvus-io/milvus-proto/go-api/v3/milvuspb"
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

privileges := []*milvuspb.PrivilegeEntity{
	{Name: "Search"},
}

err = cli.OperatePrivilegeGroup(ctx, milvusclient.NewOperatePrivilegeGroupOption("my_priv_group", privileges, milvuspb.OperatePrivilegeGroupType_AddPrivilegesToGroup))
if err != nil {
	// handle error
}
```
