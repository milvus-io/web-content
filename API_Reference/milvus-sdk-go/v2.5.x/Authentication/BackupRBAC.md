# BackupRBAC()

This operation backs up your RBAC settings.

```go
func (c *Client) BackupRBAC(ctx context.Context, option BackupRBACOption, callOptions ...grpc.CallOption) (*entity.RBACMeta, error)
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
     <td><p><a href="./v2-Authentication-BackupRBAC#backuprbacoption"><code>BackupRBACOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## BackupRBACOption

This is an interface type. The `NewBackupRBACOption()` function implements this interface type.

### NewBackupRBACOption()

The signature of the `NewBackupRBACOption()` is as follows:

```go
func NewBackupRBACOption() BackupRBACOption
```

This method has no parameters.

## entity.RBACMeta

The `entity.RBACMeta` struct type is as follows:

```go
type RBACMeta struct {
    Users           []*entity.UserInfo
    Roles           []*entity.Role
    RoleGrants      []*entity.RoleGrants
    PrivilegeGroups []*entity.PrivilegeGroup
}
```

The struct types that appear in the `RBACMeta` struct are as follows:

- [entity.UserInfo](BackupRBAC.md#entityUserInfo)

- [entity.Role](DescribeRole.md#entityRole)

- [entity.RoleGrants](BackupRBAC.md#entityRoleGrants)

- [entity.PrivilegeGroup](BackupRBAC.md#entityPrivilegeGroup)

## entity.UserInfo

The `entity.UserInfo` struct type is as follows:

```go
type UserInfo struct {
    Name  string
    Roles []string
    Password string
}
```

## entity.RoleGrants

The `RoleGrants` struct type is as follows:

```go
type RoleGrants struct {
    Object        string
    ObjectName    string
    RoleName      string
    GrantorName   string
    PrivilegeName string
    DbName        string
}
```

## entity.PrivilegeGroup

The `PrivilegeGroup` struct type is as follows:

```go
type PrivilegeGroup struct {
    GroupName  string
    Privileges []string
}
```

## Return

`*[entity.RBACMeta`](BackupRBAC.md#entityRBACMeta)

## Example

```go

```
