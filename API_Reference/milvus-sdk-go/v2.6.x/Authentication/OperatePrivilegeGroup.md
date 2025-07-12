# OperatePrivilegeGroup()

This method operates a privilege group, such as adding or removing privileges.

```go
func (c *Client) OperatePrivilegeGroup(ctx context.Context, option OperatePrivilegeGroupOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>OperatePrivilegeGroupOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## CreatePrivilegeGroupOption

This is an interface type. The `operatePrivilegeGroupOption` struct type implements this interface type. 

You can use the `NewOperatePrivilegeGroupOption()` function to get the concrete implementation.

### NewOperatePrivilegeGroupOption()

The signature of the `NewCreatePrivilegeGroupOption()` is as follows:

```go
func NewOperatePrivilegeGroupOption(groupName string, privileges []*milvuspb.PrivilegeEntity, operateType milvuspb.OperatePrivilegeGroupType) *operatePrivilegeGroupOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>groupName</code></p></td>
     <td><p>Name of the privilege group to operate on.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>privileges</code></p></td>
     <td><p>Names of the target privileges.</p></td>
     <td><p><code>[]*milvuspb.PrivilegeEntity</code></p></td>
   </tr>
   <tr>
     <td><p><code>operateType</code></p></td>
     <td><p>Name of the operation type.</p></td>
     <td><p><code>milvuspb.OperatePrivilegeGroupType</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## Return

Null

## Example

```go
import (
   "context"
   "google.golang.org/grpc"
   "github.com/milvus-io/milvus/client/v2/milvusclient"
)

privilegeGroupName := "my_privilege_group"

opts := client.NewCreatePrivilegeGroupOption(privilegeGroupName)

onFinish := func(ctx context.Context, err error) {
    if err != nil {
        fmt.Printf("gRPC call finished with error: %v\n", err)
    } else {
        fmt.Printf("gRPC call finished successfully")
    }
}

callOption := grpc.OnFinish(onFinish)

err := mclient.CreatePrivilegeGroup(context.Background(), opts, callOpts)
```

