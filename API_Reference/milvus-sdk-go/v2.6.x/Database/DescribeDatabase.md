# DescribeDatabase()

This method returns information about a specific database in detail.

```go
func (c *Client) DescribeDatabase(ctx context.Context, option DescribeDatabaseOption, callOptions ...grpc.CallOption) (*entity.Database, error)
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
     <td><p><code>DescribeDatabaseOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## DescribeDatabaseOption

This is an interface type. The `describeDatabaseOption` struct type implements this interface type. 

You can use the `NewDescribeDatabaseOption()` function to get the concrete implementation.

### NewDescribeDatabaseOption

The signature of this method is as follows:

```go
func NewDescribeDatabaseOption(dbName string) *describeDatabaseOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>dbName</code></p></td>
     <td><p>Name of the database to describe.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## entity.Database

The `entity.Database` struct type is as follows:

```go
type Database struct {
    Name       string
    Properties map[string]string
}
```

## Return

`*entity.Database`

## Example

```plaintext
db, err := cli.DescribeDatabase(ctx, milvusclient.NewDescribeDatabaseOption(dbName))
if err != nil {
    // handle err
}
log.Println(db)
```
