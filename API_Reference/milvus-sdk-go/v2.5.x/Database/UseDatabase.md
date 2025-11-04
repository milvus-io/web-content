# UseDatabase()

This method disconnects the currently connected database and connects to the specified one.

```go
func (c *Client) UseDatabase(ctx context.Context, option UseDatabaseOption) error
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
     <td><p><a href="./v2-Database-UseDatabase#usedatabaseoption"><code>UseDatabaseOption</code></a></p></td>
   </tr>
</table>

## UseDatabaseOption

This is an interface type. The `useDatabaseNameOpt` struct type implements this interface type. 

You can use the `NewUseDatabaseOption()` function to get the concrete implementation.

### NewUseDatabaseOption

The signature of this method is as follows:

```go
func NewUseDatabaseOption(dbName string) *useDatabaseNameOpt
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>dbName</code></p></td>
     <td><p>Name of the database to use.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

Null

## Example

```plaintext
dbName := `test_db`
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    // handle err
}

err = cli.UseDatabase(ctx, milvusclient.NewUseDatabaseOption(dbName))
if err != nil {
    // handle err
}
```

