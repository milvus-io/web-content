# AlterDatabaseProperties()

This method changes the specified properties of a database.

```go
func (c *Client) AlterDatabaseProperies(ctx context.Context, option AlterDatabasePropertiesOption, callOptions ...grpc.CallOption) error
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
     <td><p><a href="./v2-Database-AlterDatabaseProperties#alterdatabasepropertiesoption"><code>AlterDatabasePropertiesOption</code></a></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## AlterDatabasePropertiesOption

This is an interface type. The `alterDatabasePropertiesOption` struct type implements this interface type. 

You can use the `NewAlterDatabasePropertiesOption()` function to get the concrete implementation.

### NewAlterDatabasePropertiesOption

The signature of this method is as follows:

```go
func NewAlterDatabasePropertiesOption(dbName string) *alterDatabasePropertiesOption
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
</table>

## Return

Null

## Example

```go
dbName := `test_db`
err = cli.AlterDatabaseProperties(ctx, milvusclient.NewAlterDatabasePropertiesOption(dbName).WithProperty("database.replica.number", 2))
if err != nil {
    // handle err
}
```
