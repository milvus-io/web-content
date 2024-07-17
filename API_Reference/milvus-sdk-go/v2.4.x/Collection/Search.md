# Search()

This method conducts a similarity search.

```go
func (c *GrpcClient) Search(ctx context.Context, collName string, partitions []string, expr string, outputFields []string, vectors []entity.Vector, vectorField string, metricType entity.MetricType, topK int, sp entity.SearchParam, opts ...SearchQueryOptionFunc) ([]SearchResult, error)
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
     <td><p><code>collName</code></p></td>
     <td><p>Name of a collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>partitions</code></p></td>
     <td><p>List of partition names. </p><p>If left empty, all partitions are involved in this operation. Otherwise, only the specified partitions are involved.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
   <tr>
     <td><p><code>expr</code></p></td>
     <td><p>Boolean expression for metadata filtering.</p><p>For details, refer to <a href="https://milvus.io/docs/boolean.md">Scalar Filtering Rules</a>.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>outputFields</code></p></td>
     <td><p>List of field names to include in the return.</p></td>
     <td><p><code>[]string</code></p></td>
   </tr>
   <tr>
     <td><p><code>vectors</code></p></td>
     <td><p>Query vectors.</p></td>
     <td><p><code>[]entity.Vector</code></p></td>
   </tr>
   <tr>
     <td><p><code>vectorField</code></p></td>
     <td><p>Name of the vector field in the target collection.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for this operation.</p><p>A metric type defines how Milvus measures similarity between the query vectors and vectors in the collection. For details, refer to <a href="https://milvus.io/docs/metric.md?tab=floating">Similarity Metrics</a>.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>topK</code></p></td>
     <td><p>Number of entities to return.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>sp</code></p></td>
     <td><p>Search parameters.</p></td>
     <td><p><code>entity.SearchParam</code></p></td>
   </tr>
   <tr>
     <td><p><code>opts</code></p></td>
     <td><p>Extra search options.</p></td>
     <td><p><code>...client.SearchQueryOptionFunc</code></p></td>
   </tr>
</table>

## entity.Vector

This interface type defines a set of method signatures as follows.

```go
type Vector interface {
    Dim() int
    Serialize() []byte
    FieldType() FieldType
}
```

<table>
   <tr>
     <th><p>Method Signature</p></th>
     <th><p>Return Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>Dim()</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Return the dimensionality of the vector.</p></td>
   </tr>
   <tr>
     <td><p><code>Serialize()</code></p></td>
     <td><p><code>[]byte</code></p></td>
     <td><p>Return the serialized representation of the vector.</p></td>
   </tr>
   <tr>
     <td><p><code>FieldType()</code></p></td>
     <td><p><code>entity.FieldType</code></p></td>
     <td><p>Return the field type of the vector.</p></td>
   </tr>
</table>

For details on the types that implement the above method signatures, refer to [Vectors](Vectors.md).

## entity.MetricType

```go
const (
    L2             MetricType = "L2"
    IP             MetricType = "IP"
    COSINE         MetricType = "COSINE"
    HAMMING        MetricType = "HAMMING"
    JACCARD        MetricType = "JACCARD"
    TANIMOTO       MetricType = "TANIMOTO"
    SUBSTRUCTURE   MetricType = "SUBSTRUCTURE"
    SUPERSTRUCTURE MetricType = "SUPERSTRUCTURE"
)
```

## entity.SearchParam

This interface type defines a set of method signatures as follows.

<table>
   <tr>
     <th><p>Method Signature</p></th>
     <th><p>Return Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>Params()</code></p></td>
     <td><p><code>map[string]interface{}</code></p></td>
     <td><p>Return the specified search settings.</p></td>
   </tr>
   <tr>
     <td><p><code>AddRadius(radius float64)</code></p></td>
     <td><p>null</p></td>
     <td><p>Set the radius for a range search.</p></td>
   </tr>
   <tr>
     <td><p><code>AddRangeFilter(rangeFilter float64)</code></p></td>
     <td><p>null</p></td>
     <td><p>Set the range filter for a range search.</p></td>
   </tr>
</table>

<div class="admonition note">

<p><b>notes</b></p>

<p>In a range search, <code>radius</code> defines the outer boundary of your search space, and <code>rangeFilter</code> optionally defines an inner boundary, creating a distance range within which vectors must fall to be considered matches.</p>
<p>The value ranges of these parameters vary with the metric type.</p>

</div>

For details on the types that implement the above method signatures, refer to [SearchParams](SearchParams.md).

## client.SearchQueryOptionFunc

Each of the following methods instantiates a `client.SearchQueryOptionFunc` type.

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>WithGroupByField(groupByField string)</code></p></td>
     <td><p>Specifies the name of the field that serves as the grouping criteria.</p></td>
   </tr>
   <tr>
     <td><p><code>WithGuaranteeTimestamp(gt uint64)</code></p></td>
     <td><p>Specifies the guarantee timestamp.</p></td>
   </tr>
   <tr>
     <td><p><code>WithIgnoreGrowing()</code></p></td>
     <td><p>Specifies whether to ignore the entities within growing segments during the search.</p></td>
   </tr>
   <tr>
     <td><p><code>WithLimit(limit int64)</code></p></td>
     <td><p>Specifies the number of returned entities.</p><p>The sum of <code>limit</code> and <code>offset</code> should be less than 16,384.</p></td>
   </tr>
   <tr>
     <td><p><code>WithOffset(offset int64)</code></p></td>
     <td><p>Specifies the number of entities to skip within the return.</p><p>The sum of <code>limit</code> and <code>offset</code> should be less than 16,384.</p></td>
   </tr>
   <tr>
     <td><p><code>WithSearchQueryConsistencyLevel(cl entity.ConsistencyLevel)</code></p></td>
     <td><p>Specifies the consistency level for the search.</p></td>
   </tr>
</table>

You can include one or multiple of the above methods in the search request if you see fit.

## Return

This method returns a `client.SearchResult` slice. 

### client.SearchResult

A `client.SearchResult` is a struct type defined as follows:

```go
type SearchResult struct {
    ResultCount  int // the returning entry count
    GroupByValue entity.Column
    IDs          entity.Column // auto generated id, can be mapped to the columns from `Insert` API
    Fields       ResultSet     // []entity.Column // output field data
    Scores       []float32     // distance to the target vector
    Err          error         // search error if any
}
```

## Errors

Any error in the execution of the request. Possible errors are as follows:

- `ErrClientNotReady`: The client is not connected to Milvus.

- `ErrCollectionNotExists`: The collection with the specified name does not exist.

- The call to this API fails.

## Example

- Default search

```go
// search
v1 := make([]float32, 0, 768)
v2 := make([]float32, 0, 768)
for j := 0; j < 768; j++ {
   v1 = append(v1, rand.Float32())
   v2 = append(v2, rand.Float32())
}
sp, errSp := entity.NewIndexHNSWSearchParam(74)
if errSp != nil {
   log.Fatal("failed to new hnsw search params:", errSp.Error())
}
searchRes, errSearch := mc.Search(
   context.Background(),
   collectionName,
   []string{},
   "",
   []string{},
   []entity.Vector{entity.FloatVector(v1), entity.FloatVector(v2)},
   "vector",
   entity.COSINE,
   10,
   sp,
   client.WithSearchQueryConsistencyLevel(entity.ClBounded),
   )
if errSearch != nil {
   log.Fatal("failed to search collection:", errSearch.Error())
}
for _, res := range searchRes {
   log.Println(res.ResultCount, res.IDs, res.Scores)
}
```

- Range search

```shell
// search
v1 := make([]float32, 0, 768)
v2 := make([]float32, 0, 768)
for j := 0; j < 768; j++ {
   v1 = append(v1, rand.Float32())
   v2 = append(v2, rand.Float32())
}
sp, errSp := entity.NewIndexHNSWSearchParam(74)
sp.AddRadius(0.6)
sp.AddRangeFilter(0.9)
if errSp != nil {
   log.Fatal("failed to new hnsw search params:", errSp.Error())
}
searchRes, errSearch := mc.Search(
   context.Background(),
   collectionName,
   []string{},
   "",
   []string{},
   []entity.Vector{entity.FloatVector(v1), entity.FloatVector(v2)},
   "vector",
   entity.COSINE,
   10,
   sp,
   )
if errSearch != nil {
   log.Fatal("failed to search collection:", errSearch.Error())
}
for _, res := range searchRes {
   log.Println(res.ResultCount, res.IDs, res.Scores)
}
```

- Pagination search

```shell
// search
v1 := make([]float32, 0, 768)
v2 := make([]float32, 0, 768)
for j := 0; j < 768; j++ {
   v1 = append(v1, rand.Float32())
   v2 = append(v2, rand.Float32())
}
sp, errSp := entity.NewIndexHNSWSearchParam(74)
if errSp != nil {
   log.Fatal("failed to new hnsw search params:", errSp.Error())
}
searchRes, errSearch := mc.Search(
   context.Background(),
   collectionName,
   []string{},
   "",
   []string{},
   []entity.Vector{entity.FloatVector(v1), entity.FloatVector(v2)},
   "vector",
   entity.COSINE,
   10,
   sp,
   client.WithOffset(5),
   )
if errSearch != nil {
   log.Fatal("failed to search collection:", errSearch.Error())
}
for _, res := range searchRes {
   log.Println(res.ResultCount, res.IDs, res.Scores)
}
```

- GroupBy search

```shell
// search
v1 := make([]float32, 0, 768)
v2 := make([]float32, 0, 768)
for j := 0; j < 768; j++ {
   v1 = append(v1, rand.Float32())
   v2 = append(v2, rand.Float32())
}
sp, errSp := entity.NewIndexHNSWSearchParam(74)
if errSp != nil {
   log.Fatal("failed to new hnsw search params:", errSp.Error())
}
searchRes, errSearch := mc.Search(
   context.Background(),
   collectionName,
   []string{},
   "",
   []string{},
   []entity.Vector{entity.FloatVector(v1), entity.FloatVector(v2)},
   "vector",
   entity.COSINE,
   10,
   sp,
   client.WithGroupByField("varchar"),
   )
if errSearch != nil {
   log.Fatal("failed to search collection:", errSearch.Error())
}
for _, res := range searchRes {
   log.Println(res.ResultCount, res.IDs, res.Scores, res.GroupByValue)
}
```

