# DescribeUser()

This method returns the detailed information about the specified user.

```go
func (c *Client) DescribeUser(ctx context.Context, opt DescribeUserOption, callOpts ...grpc.CallOption) (*entity.User, error)
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
     <td><p><code>opt</code></p></td>
     <td><p>Optional parameters of the methods.</p></td>
     <td><p><code>DescribeUserOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DescribeUserOption

This is an interface type. The `describeUserOption` struct type implements this interface type. 

You can use the `NewDescribeUserOption()` function to get the concrete implementation.

### NewDescribeUserOption

The signature of `NewDescribeUserOption()` is as follows:

```go
func NewDescribeUserOption(userName string) *describeUserOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>userName</code></p></td>
     <td><p>Name of the user to describe.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## entity.User

The `entity.User` struct type is as follows:

```go
type User struct {
    UserName   string
    Roles      []string
}
```

## Return

`*entity.User`

## Example

```go
import (
   "context"
   "google.golang.org/grpc"
   "github.com/milvus-io/milvus/client/v2/milvusclient"
)

userName := "my_user"
opts := client.NewDescribeUserOption(userName)

onFinish := func(ctx context.Context, err error) {
    if err != nil {
        fmt.Printf("gRPC call finished with error: %v\n", err)
    } else {
        fmt.Printf("gRPC call finished successfully")
    }
}

callOption := grpc.OnFinish(onFinish)

err := mclient.DescribeUser(context.Background(), opts, callOption)
```
