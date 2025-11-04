# DropDatabaseProperties()

This method resets the specified property of a database to its default value.

```go
func (c *Client) DropDatabaseProperties(ctx context.Context, option DropDatabasePropertiesOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-Database-DropDatabaseProperties#dropdatabasepropertiesoption"><code>DropDatabasePropertiesOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DropDatabasePropertiesOption

This is an interface type. The `dropDatabasePropertiesOption` struct type implements this interface type. 

You can use the `NewDropDatabasePropertiesOption()` function to get the concrete implementation.

### NewDropDatabasePropertiesOption

The signature of this method is as follows:

```go
func NewDropDatabasePropertiesOption(dbName string, propertyKeys ...string) *dropDatabasePropertiesOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>dbName</code></p></td>
     <td><p>Name of the target database.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>propertyKeys</code></p></td>
     <td><p>List of the database properties to reset.</p></td>
     <td><p><code>...string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```go
dbName := `test_db`
err = cli.DropDatabaseProperties(ctx, milvusclient.NewDropDatabasePropertiesOption(dbName, "database.replica.number"))
if err != nil {
    // handle err
}
```
