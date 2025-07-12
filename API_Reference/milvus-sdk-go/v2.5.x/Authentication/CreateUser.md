# CreateUser()

This method creates a user. In Milvus, you can allocate multiple privileges or privilege groups to a role and grant the role to a user so that the user gains the privileges allocated to the role.

```go
func (c *Client) CreateUser(ctx context.Context, opt CreateUserOption, callOpts ...grpc.CallOption) error
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
     <td><p><code>CreateUserOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## CreateUserOption

This is an interface type. The `createUserOption` struct type implements this interface type. 

You can use the `NewCreateUserOption()` function to get the concrete implementation.

### NewCreateUserOption

The signature of the `NewCreateUserOption()` is as follows:

```go
func NewCreateUserOption(userName string) *createUserOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>userName</code></p></td>
     <td><p>Name of the user to create.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>password</code></p></td>
     <td><p>Password of the user to create.</p></td>
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
   "github.com/milvus-io/milvus/client/v2/milvusclient"
)

userName := "my_user"
password := "p@ssw0rd"
opts := client.NewCreateUserOption(userName, password)

onFinish := func(ctx context.Context, err error) {
    if err != nil {
        fmt.Printf("gRPC call finished with error: %v\n", err)
    } else {
        fmt.Printf("gRPC call finished successfully")
    }
}

callOption := grpc.OnFinish(onFinish)

err := mclient.CreateUser(context.Background(), opts, callOpts)
```
