# GrantPrivilege()

This method grants a privilege 

```go
func (c *Client) GrantPrivilege(ctx context.Context, option GrantPrivilegeOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>GrantPrivilegeOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## GrantPrivilegeOption

This is an interface type. The `grantPrivilegeOption` struct type implements this interface type. 

You can use the `NewGrantPrivilegeOption()` function to get the concrete implementation.

### NewGrantPrivilegeOption

The signature of the `NewGrantPrivilegeOption()` is as follows:

```go
func NewGrantPrivilegeOption(roleName, objectType, privilegeName, objectName string) *grantPrivilegeOption
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
     <td><p><code>objectType</code></p></td>
     <td><p>Type of the object on which the specified role can perform operations. Possible values are as follows:</p><ul><li><p><strong>Global</strong></p><p>System-wide objects, allowing the user to perform actions that affect all collections, users, or system-wide settings. When <code>object_type</code> is set to <code>Global</code>, set <code>object_name</code> to the wildcard (*), indicating all objects of the specified type.</p></li><li><p><strong>Collection</strong></p><p>Collection-specific objects, allowing the user to perform actions such as creating indexes, loading data, inserting or deleting data, and querying data within a specific collection.</p></li><li><p>User</p><p>Objects related to user management, allowing the user to manage credentials and roles for database users, such as updating user credentials or viewing user details.</p></li></ul></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>privilegeName</code></p></td>
     <td><p>Name of the privilege to assign. For details, refer to the <strong>Privilege name</strong> column in the table on page Users and Roles.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>objectName</code></p></td>
     <td><p>Name of the target object. For example, </p><ul><li><p>If the object type is <strong>Collection</strong>, the object name should be the name of an existing collection.</p></li><li><p>If the object type is <strong>User</strong>, the object name should be a database user.</p></li><li><p>If the object type is <strong>Global</strong>, set the object name to a wildcard (*), indicating all objects of the specified type.</p></li></ul></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## grpc.CallOption

This interface provided by the gRPC Go library allows you to specify additional options or configurations when making requests. For possible implementations of this interface, refer to [this file](https://github.com/grpc/grpc-go/blob/v1.69.4/rpc_util.go#L174).

## Return

Null

## Example

```go
// TODO 
// https://milvus.io/api-reference/pymilvus/v2.5.x/MilvusClient/Authentication/grant_privilege.md
```

