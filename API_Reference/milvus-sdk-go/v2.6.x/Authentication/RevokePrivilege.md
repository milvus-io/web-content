# RevokePrivilege()

This method revokes a privilege or a privilege group of a role. In Milvus, you can allocate multiple privileges or privilege groups to a role and grant the role to a user so that the user gains the privileges allocated to the role.

```go
func (c *Client) RevokePrivilege(ctx context.Context, option RevokePrivilegeOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>RevokePrivilegeOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## RevokePrivilegeOption

This is an interface type. The `revokePrivilegeOption` struct type implements this interface type. 

You can use the `NewRevokePrivilegeOption()` function to get the concrete implementation.

### NewRevokePrivilegeOption

The signature of the `NewRevokePrivilegeOption()` is as follows:

```go
func NewRevokePrivilegeOption(roleName, objectType, privilegeName, objectName string) *revokePrivilegeOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>roleName</code></p></td>
     <td><p>Name of the target role for this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>objectType</code></p></td>
     <td><p>Type of the target object for this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>privilegeName</code></p></td>
     <td><p>Name of the target privilege or privilege group for this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>objectName</code></p></td>
     <td><p>Name of the target object for this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## Return

Null

## Example

```go
// go
```

