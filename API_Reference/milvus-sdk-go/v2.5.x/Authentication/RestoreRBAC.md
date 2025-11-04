# RestoreRBAC()

This operation restores your RBAC settings from a backup.

```go
func (c *Client) RestoreRBAC(ctx context.Context, option RestoreRBACOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-Authentication-RestoreRBAC#restorerbacoption"><code>RestoreRBACOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## RestoreRBACOption

This is an interface type. You can use `NewRestoreRBACOption()` to get its concrete implementation

```go
func NewRestoreRBACOption(meta *entity.RBACMeta) RestoreRBACOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>meta</code></p></td>
     <td><p>The RBAC settings to restore.</p></td>
     <td><p><a href="./v2-Authentication-BackupRBAC#entityrbacmeta"><code>*entity.RBACMeta</code></a></p></td>
   </tr>
</table>

## Return

Null

## Example

```go

```
