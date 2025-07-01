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
func NewHybridSearchOption(collectionName string, limit int, annRequests ...*AnnRequest) *hybridSearchOption
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
     <td><p><code>...*AnnRequest</code></p></td>
   </tr>
</table>

## AnnRequest

This is a struct type. The `index.CustomAnnParam` struct type implements this interface. You can use the `NewAnnRequest` method to create a search request.

### NewAnnRequest

This method prepares a search request. The signature is as follows:

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

You can chain the following methods to append extra parameter settings to the `annRequest` struct.

- [WithANNSField](HybridSearch.md#WithANNSField)

- [WithAnnParam](HybridSearch.md#WithAnnParam)

- [WithFilter](HybridSearch.md#WithFilter)

- [WithGroupByField](HybridSearch.md#WithGroupByField)

- [WithGroupSize](HybridSearch.md#WithGroupSize)

- [WithIgnoreGrowing](HybridSearch.md#WithIgnoreGrowing)

- [WIthOffset](HybridSearch.md#WIthOffset)

- [WithSearchParam](HybridSearch.md#WithSearchParam)

- [WithStrictGroupSize](HybridSearch.md#WithStrictGroupSize)

- [WithTemplateParam](HybridSearch.md#WithTemplateParam)

### WithANNSField

This method appends the settings regarding the vector field to use in the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithANNSField(annsField string) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>annsField</code></p></td>
     <td><p>The name of the vector field to use in the current field.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

### WithAnnParam

This method appends the settings regarding the search parameters to the current `AnnRequest` struct. The signature of this method is as follows:

```go
func (r *AnnRequest) WithAnnParam(ap index.AnnParam) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ap</code></p></td>
     <td><p>The index-specific search parameter settings.</p></td>
     <td><p><code>index.AnnParam</code></p></td>
   </tr>
</table>

### WithFilter

This method appends the settings regarding the filter to use in the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithFilter(expr string) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>expr</code></p></td>
     <td><p>The metadata-filtering expression. For details, refer to <a href="https://milvus.io/docs/boolean.md">Filtering Explained</a><a href="/docs/filtering">Filtering</a>.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithGroupByField

This method appends the settings regarding the group-by field to use in the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithGroupByField(groupByField string) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>groupByField</code></p></td>
     <td><p>The name of the scalar field that serves as the group-by field. Once set, the search results will be grouped by the specified field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithGroupSize

This method appends the settings regarding the group size to use in the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithGroupSize(groupSize int) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>groupSize</code></p></td>
     <td><p>The desired number of entities to return per group.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithIgnoreGrowing

This method appends the settings regarding whether to ignore growing segments to the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithIgnoreGrowing(ignoreGrowing bool) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ignoreGrowing</code></p></td>
     <td><p>Whether to ignore growing segments from the search results.</p></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

### WIthOffset

This method appends the settings regarding the offset to the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithOffset(offset int) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>offset</code></p></td>
     <td><p>The number of results to skip from the search results.</p><p>The value of this parameter and that of <code>limit</code> should be less than 16,384.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### WithSearchParam

This method appends the settings regarding the search parameters to the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithSearchParam(key, value string) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>key</code></p></td>
     <td><p>The name of a search parameter.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>value</code></p></td>
     <td><p>The value of the above search parameter.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithStrictGroupSize

This method appends the settings regarding whether to strictly abide by the specified group size to the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithStrictGroupSize(strictGroupSize bool) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>strictGroupSize</code></p></td>
     <td><p>controls whether the system should strictly enforce the count set by <code>group_size</code></p></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

### WithTemplateParam

This method appends the settings regarding the template parameters to the current `AnnRequest` struct. The signature of the method is as follows:

```go
func (r *AnnRequest) WithTemplateParam(key string, val any) *AnnRequest
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>key</code></p></td>
     <td><p>The name of a template parameter.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>value</code></p></td>
     <td><p>The value of the above template parameter.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

## index.AnnParam

This is an interface type. The following struct types implement this interface.

### autoAnnParam

This is a struct type that implements the `index.AnnParam` interface. You can use `NewAutoAnnParam()` to get its concrete implementation.

### diskANNParam

This method prepares the search parameters specific to DiskANN. The signature is as follows:

```go
func NewDiskAnnParam(searchList int) diskANNParam
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>searchList</code></p></td>
     <td><p>Determines the number of candidate neighbors considered for each data point during graph construction.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### hsnwAnnParam

This method prepares the search parameters specific to HNSW. The signature is as follows:

```go
func NewHNSWAnnParam(ef int) hsnwAnnParam
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>ef</code></p></td>
     <td><p>Controls the breadth of search during nearest neighbor retrieval. It determines how many nodes are visited and evaluated as potential nearest neighbors. This parameter affects only the search process and applies exclusively to the bottom layer of the graph.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### ivfAnnParam

This method prepares the search parameters specific to IVF. The signature is as follows:

```go
func NewIvfAnnParam(nprobe int) ivfAnnParam
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p>The number of clusters to search for candidates. Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### scannAnnParam

This method prepares the search parameters specific to SCANN. The signature is as follows:

```go
func NewSCANNAnnParam(nprobe int, reorderK int) scannAnnParam
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p>The number of clusters to search for candidates. Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency.</p></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

### sparseAnnParam

This method prepares the search parameters specific to SPARSE_INVERTED. The signature is as follows:

```go
func NewSparseAnnParam() sparseAnnParam
```

This method has no mandatory parameters.

## index.CustomAnnParam

This is a struct type that implements the `AnnRequest` interface. You can use `NewCustomAnnParam()` to get its concrete implementation.

### NewCustomAnnParam

This method prepares the custom ANN search parameters for the hybrid search request. The signature of this method is as follows:

```go
func NewCustomAnnParam() CustomAnnParam
```

This method has no parameters.

You can chain the following methods to append extra settings to the `CustomAnnParam` struct.

- [WithExtraParam](HybridSearch.md#WithExtraParam)

- [WithRadius](HybridSearch.md#WithRadius)

- [WithRangeFilter](HybridSearch.md#WithRangeFilter)

### WithExtraParam

This method appends extra search parameters to the current `AnnRequest` struct. The signature is as follows:

```go
func (b CustomAnnParam) WithExtraParam(key string, value any)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>key</code></p></td>
     <td><p>The name of an extra search parameter.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>value</code></p></td>
     <td><p>The value of the above extra search parameter.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
</table>

### WithRadius

This method appends the radius parameters to the current `AnnRequest` struct. The signature is as follows:

```go
func (b CustomAnnParam) WithRadius(radius float64)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>radius</code></p></td>
     <td><p>The radius for a range search.</p></td>
     <td><p><code>float64</code></p></td>
   </tr>
</table>

### WithRangeFilter

This method appends the range filter parameters to the current `AnnRequest` struct. The signature is as follows:

```go
func (b CustomAnnParam) WithRangeFilter(rangeFilter float64)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>radiusFilter</code></p></td>
     <td><p>The range filter for a range search.</p></td>
     <td><p><code>float64</code></p></td>
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

