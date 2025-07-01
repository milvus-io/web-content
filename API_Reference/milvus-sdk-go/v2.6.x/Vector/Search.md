# Search()

This method performs a vector search.

```go
func (c *Client) Search(ctx context.Context, option SearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
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
     <td><p><code>SearchOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## SearchOption

This is an interface type. The `searchOption` struct types implement this interface type. 

You can use the `NewSearchOption` function to get the concrete implementation.

### NewSearchOption

The signature of this method is as follows:

```go
func NewSearchOption(collectionName string, limit int, vectors []entity.Vector) *searchOption
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>collectionName</code></p></td>
     <td><p>Name of the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>limit</code></p></td>
     <td><p>Number of entities included in the result set.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>vectors</code></p></td>
     <td><p>Query vectors</p></td>
     <td><p><code>[]entity.Vector</code></p></td>
   </tr>
</table>

## entity.Vector

This is an interface. The following types implement this interface.

- [entity.FloatVector](Search.md#entityFloatVector)

- [entity.Float16Vector](Search.md#entityFloat16Vector)

- [entity.BFloat16Vector](Search.md#entityBFloat16Vector)

- [entity.BinaryVector](Search.md#entityBinaryVector)

- [entity.Text](Search.md#entityText)

## entity.FloatVector

This is a list containing numbers of the `float32` type. The signature is as follows:

```go
type FloatVector []float32
```

## entity.Float16Vector

This is a list containing numbers of the `byte` type. The signature is as follows:

```go
type Float16Vector []byte
```

## entity.BFloat16Vector

This is a list containing numbers of the `byte` type. The signature is as follows:

```go
type BFloat16Vector []byte
```

## entity.BinaryVector

This is a list containing numbers of the `byte` type. The signature is as follows:

```go
type BinaryVector []byte
```

## entity.Text

This is a string type. The signature is as follows:

```plaintext
type Text string
```

## ResultSet

This is a struct type. You can use the `GetColumn` method to get the result values in a specific field.

### GetColumn

This method returns the query result in a specific column. The signature is as follows:

```go
func (rs *ResultSet) GetColumn(fieldName string) column.Column
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the target field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## Return

`ResultSet`

## Example

```plaintext
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "quick_setup", // collectionName
    3,             // limit
    []entity.Vector{entity.FloatVector(queryVector)},
))
if err != nil {
    log.Fatal("failed to perform basic ANN search collection: ", err.Error())
}

for _, resultSet := range resultSets {
    log.Println("IDs: ", resultSet.IDs)
    log.Println("Scores: ", resultSet.Scores)
}
```

