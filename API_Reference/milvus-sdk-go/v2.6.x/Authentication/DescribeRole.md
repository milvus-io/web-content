# DescribeRole()

This method returns the detailed information about the specified role.

```go
func (c *Client) DescribeRole(ctx context.Context, option DescribeRoleOption, callOptions ...grpc.CallOption) (*entity.Role, error)
```

## Request Parameters

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ctx</code></p></td>
     <td><p>Context for the current call to work.</p></td>
     <td><p><code>context.Context</code></p></td>
   </tr>
   <tr>
     <td><p><code>option</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><a href="./v2-Authentication-DescribeRole#describeroleoption"><code>DescribeRoleOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DescribeRoleOption

This is an interface type. The `describeRoleOption` struct type implements this interface type. 

You can use the `NewDescribeRoleOption()` function to get the concrete implementation.

### NewDescribeRoleOption

The signature of `NewDescribeRoleOption()` is as follows:

```go
func NewDescribeRoleOption(roleName string) *describeRoleOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>roleName</code></p></td>
     <td><p>Name of the role to describe.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## entity.Role

The `entity.Role` struct type is as follows:

```go
type Role struct {
    RoleName   string
    Privileges []entity.GrantItem
}
```

## Return

`*[entity.Role`](DescribeRole.md#entityRole)

## Example

```go
import (
   "context"
   "google.golang.org/grpc"
   "github.com/milvus-io/milvus/client/v2/milvusclient"
)

roleName := "my_role"
opts := client.NewDescribeRoleOption(roleName)

err := mclient.DescribeRole(context.Background(), opts)
```
