# DropDatabase()

This method drops a database.

```go
func (c *Client) DropDatabase(ctx context.Context, option DropDatabaseOption, callOptions ...grpc.CallOption) error
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
     <td><p><code>DropDatabaseOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DropDatabaseOption

This is an interface type. The `dropDatabaseOption` struct type implements this interface type. 

You can use the `NewDropDatabaseOption()` function to get the concrete implementation.

### NewDropDatabaseOption

The signature of this method is as follows:

```go
func NewDropDatabaseOption(dbName string) *dropDatabaseOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>dbName</code></p></td>
     <td><p>Name of the database to drop.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```go
err = cli.DropDatabase(ctx, milvusclient.NewDropDatabaseOption(dbName))
if err != nil {
    // handle err
}
```
