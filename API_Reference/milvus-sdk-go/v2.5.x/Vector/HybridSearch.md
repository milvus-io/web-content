# HybridSearch()

This method performs a vector search.

```go
func (c *Client) HybridSearch(ctx context.Context, option HybridSearchOption, callOptions ...grpc.CallOption) ([]ResultSet, error)
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
     <td><p><code>HybridSearchOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOptions</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## HybridSearchOption

This is an interface type. The `hybridSearchOption` struct types implement this interface type. 

You can use the `NewHybridSearchOption` function to get the concrete implementation.

### NewHybridSearchOption

The signature of this method is as follows:

```go
func NewHybridSearchOption(collectionName string, limit int, annRequests ...*annRequest) *hybridSearchOption
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
     <td><p><code>annRequests</code></p></td>
     <td><p>One or multiple search requests.</p></td>
     <td><p><code>...*annRequest</code></p></td>
   </tr>
</table>

## annRequest

This is a struct type. You can use the `NewAnnRequest` method to create a search request.

### NewAnnRequest

The signature is as follows:

```go
func NewAnnRequest(annField string, limit int, vectors ...entity.Vector) *annRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>annField</code></p></td>
     <td><p>Name of the target vector field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>limit</code></p></td>
     <td><p>Number of entities to be included in the result set.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>vectors</code></p></td>
     <td><p>Query vectors</p></td>
     <td><p><code>[]entity.Vector</code></p></td>
   </tr>
</table>

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

`[]ResultSet`

## Example

```plaintext
queryVector := []float32{0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592}
    sparseVector, _ := entity.NewSliceSparseEmbedding([]uint32{1, 21, 100}, []float32{0.1, 0.2, 0.3})

resultSets, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    "quick_setup",
    3,
    milvusclient.NewAnnRequest("dense_vector", 10, entity.FloatVector(queryVector)),
    milvusclient.NewAnnRequest("sparse_vector", 10, sparseVector),
).WithReranker(milvusclient.NewRRFReranker()))
if err != nil {
    log.Fatal("failed to perform basic ANN search collection: ", err.Error())
}

for _, resultSet := range resultSets {
    log.Println("IDs: ", resultSet.IDs)
    log.Println("Scores: ", resultSet.Scores)
}
```

