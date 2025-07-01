# UpdatePassword()

This method updates the password for an existing user.

```go
func (c *Client) UpdatePassword(ctx context.Context, opt UpdatePasswordOption, callOpts ...grpc.CallOption) error
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
     <td><p><code>UpdatePasswordOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## UpdatePasswordOption

This is an interface type. The `updatePasswordOption` struct type implements this interface type. 

You can use the `NewUpdatePasswordOption()` function to get the concrete implementation.

### NewUpdatePasswordOption

The signature of the `NewUpdatePasswordOption()` is as follows:

```go
func NewUpdatePasswordOption(userName, oldPassword, newPassword string) *updatePasswordOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>userName</code></p></td>
     <td><p>Name of the user whose password is to be updated.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>oldPassword</code></p></td>
     <td><p>The old password of the user.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>newPassword</code></p></td>
     <td><p>The new Password of the user to create.</p></td>
     <td><p><code>string</code></p></td>
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
   "github.com/milvus-io/milvus/v2/milvusclient"
)

userName := "my_user"
oldpass := "p@ssw0rd"
newpass := "p@ssw1rd"
opts := client.NewUpdatePasswordOption(userName, oldpass, newpass)

onFinish := func(ctx context.Context, err error) {
    if err != nil {
        fmt.Printf("gRPC call finished with error: %v\n", err)
    } else {
        fmt.Printf("gRPC call finished successfully")
    }
}

callOption := grpc.OnFinish(onFinish)

err := mclient.UpdatePassword(context.Background(), opts, callOpts)
```
