# GrantV2()

This method grants a privilege or a privilege group to a role. In Milvus, you can allocate multiple privileges or privilege groups to a role and grant the role to a user so that the user gains the privileges allocated to the role.

```plaintext
func (c *Client) GrantV2(ctx context.Context, option GrantV2Option, callOptions ...grpc.CallOption) error
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
     <td><p><code>GrantV2Option</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## GrantV2Option

This is an interface type. The `grantV2Option` struct type implements this interface type. 

You can use the `NewGrantV2Option()` function to get the concrete implementation.

### NewGrantV2Option

The signature of the `NewGrantV2Option()` is as follows:

```go
func NewGrantV2Option(roleName, privilegeName, dbName, collectionName string) *grantPrivilegeV2Option
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>roleName</code></p></td>
     <td><p>Name of the target role of this operation.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>privilegeName</code></p></td>
     <td><p>Name of the privilege or privilege group to assign.</p><p>For details, refer to the <strong>Privilege name</strong> column in the table on page Users and Roles.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>dbName</code></p></td>
     <td><p>Name of the target database of this operation</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## Return

Null

## Example

```go

```

