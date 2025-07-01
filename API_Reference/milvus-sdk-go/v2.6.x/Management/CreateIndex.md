# CreateIndex()

This method creates an index on a specific field.

```go
func (c *Client) CreateIndex(ctx context.Context, option CreateIndexOption, callOptions ...grpc.CallOption) (*CreateIndexTask, error)
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
     <td><p><code>CreateIndexOption</code></p></td>
   </tr>
   <tr>
     <td><p><code>callOpts</code></p></td>
     <td><p>Optional parameters for calling the methods.</p></td>
     <td><p><code>grpc.CallOption</code></p></td>
   </tr>
</table>

## CreateIndexOption

This is an interface type. The `createIndexOption` struct type implements this interface type. 

You can use the `NewCreateIndexOption()` function to get the concrete implementation.

### NewCreateIndexOption

The signature of this method is as follows:

```go
func NewCreateIndexOption(collectionName string, fieldName string, index index.Index) *createIndexOption
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
     <td><p><code>fieldName</code></p></td>
     <td><p>Name of the target field.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>index</code></p></td>
     <td><p>Type of the index.</p></td>
     <td><p><code>index.Index</code></p></td>
   </tr>
</table>

## index.Index

This is an interface type. The following methods implement this interface type.

### Auto-indexing

<table>
   <tr>
     <th><p>Index Type</p></th>
     <th><p>Applicable Field Data Types</p></th>
   </tr>
   <tr>
     <td><p>AUTOINDEX (<a href="./v2-Management-CreateIndex#indexnewautoindex">index.NewAutoIndex</a>)</p></td>
     <td><p>All field types</p></td>
   </tr>
</table>

### Indexing floating vectors

<table>
   <tr>
     <th><p>Index Type</p></th>
     <th><p>Applicable Field Data Types</p></th>
   </tr>
   <tr>
     <td><p>FLAT (<a href="./v2-Management-CreateIndex#indexnewflatindex">index.NewFlatIndex</a>)</p></td>
     <td rowspan="11"><p><code>entity.FieldTypeFloat</code></p></td>
   </tr>
   <tr>
     <td><p>IVF_FLAT (<a href="./v2-Management-CreateIndex#indexnewivfflatindex">index.NewIvfFlatIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>IVF_SQ8 (<a href="./v2-Management-CreateIndex#indexnewivfsq8index">index.NewIvfSQ8Index</a>)</p></td>
   </tr>
   <tr>
     <td><p>IVF_PQ (<a href="./v2-Management-CreateIndex#indexnewivfpqindex">index.NewIvfPQIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>GPU_CAGRA (<a href="./v2-Management-CreateIndex#indexnewgpucagraindex">index.NewGRPCagraIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>GPU_IVF_FLAT (<a href="./v2-Management-CreateIndex#indexnewgpuivpflatindex">index.NewGPUIVPFlatIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>GPU_IVF_PQ (<a href="./v2-Management-CreateIndex#indexnewgpuivppqindex">index.NewGPUIVPPQIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>GPU_BRUTE_FORCE (<a href="./v2-Management-CreateIndex#indexnewgpubruteforceindex">index.NewGPUBruteForceIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>HNSW (<a href="./v2-Management-CreateIndex#indexnewhnswindex">index.NewHNSWIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>SCANN (<a href="./v2-Management-CreateIndex#indexnewscannindex">index.NewSCANNIndex</a>)</p></td>
   </tr>
   <tr>
     <td><p>DISKANN (<a href="./v2-Management-CreateIndex#indexnewdiskannindex">index.NewDiskANNIndex</a>)</p></td>
   </tr>
</table>

### Indexing binary vectors

<table>
   <tr>
     <th><p>Index Type</p></th>
     <th><p>Applicable Field Data Types</p></th>
   </tr>
   <tr>
     <td><p>BIN_FLAT (<a href="./v2-Management-CreateIndex#indexnewbinflatindex">index.NewBinFlatIndex</a>)</p></td>
     <td rowspan="2"><p><code>entity.FieldTypeDouble</code></p></td>
   </tr>
   <tr>
     <td><p>BIN_IVF_FLAT (<a href="./v2-Management-CreateIndex#indexnewbinivfflatindex">index.NewBinlvfFlatIndex</a>)</p></td>
   </tr>
</table>

### Indexing sparse vectors

<table>
   <tr>
     <th><p>Index Type</p></th>
     <th><p>Applicable Field Data Types</p></th>
   </tr>
   <tr>
     <td><p>SPARSE_INVERTED_INDEX (<a href="./v2-Management-CreateIndex#indexnewsparseinvertedindex">index.NewSparseInvertedIndex</a>)</p></td>
     <td rowspan="2"><p><code>entity.FieldTypeSparseVector</code></p></td>
   </tr>
   <tr>
     <td><p>SPARSE_WAND (<a href="./v2-Management-CreateIndex#indexnewsparsewandindex">index.NewSparseWANDIndex</a>)</p></td>
   </tr>
</table>

### Indexing scalar fields

<table>
   <tr>
     <th><p>Index Type</p></th>
     <th><p>Applicable Field Data Types</p></th>
   </tr>
   <tr>
     <td><p>BITMAP (<a href="./v2-Management-CreateIndex#indexnewbitmapindex">index.NewBitmapIndex</a>)</p></td>
     <td><ul><li><p><code>entity.FieldTypeBool</code></p></li><li><p><code>entity.FieldTypeInt8</code></p></li><li><p><code>entity.FieldTypeInt16</code></p></li><li><p><code>entity.FieldTypeInt32</code></p></li><li><p><code>entity.FieldTypeInt64</code></p></li><li><p><code>entity.FieldTypeVarChar</code></p></li><li><p><code>entity.FieldTypeArray</code> (with element type set to one of the above)</p></li></ul></td>
   </tr>
   <tr>
     <td><p>INVERTED (<a href="./v2-Management-CreateIndex#indexnewinvertedindex">index.NewInvertedIndex</a>)</p></td>
     <td><p>All scalar field types</p></td>
   </tr>
   <tr>
     <td><p>STL_SORTED (<a href="./v2-Management-CreateIndex#indexnewsortedindex">index.NewSortedIndex</a>)</p></td>
     <td><ul><li><p><code>entity.FieldTypeInt8</code></p></li><li><p><code>entity.FieldTypeInt16</code></p></li><li><p><code>entity.FieldTypeInt32</code></p></li><li><p><code>entity.FieldTypeInt64</code></p></li><li><p><code>entity.FieldTypeFloat</code></p></li><li><p><code>entity.FieldTypeDouble</code></p></li></ul></td>
   </tr>
   <tr>
     <td><p>TRIE (<a href="./v2-Management-CreateIndex#indexnewtrieindex">index.NewTrieIndex</a>)</p></td>
     <td><p><code>entity.FieldTypeVarChar</code></p></td>
   </tr>
</table>

### Generic index

<table>
   <tr>
     <th><p>Index Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><a href="./v2-Management-CreateIndex#indexnewgenericindex">index.NewGenericIndex</a></p></td>
     <td><p>This is a general method for you to create parameters for any applicable index type. </p><p>If the index type you need to create is not listed above, use this method to create the index.</p></td>
   </tr>
</table>

## index.NewAutoIndex

This method prepares the index parameters with the index type set to **AUTOINDEX**. The signature of this method is as follows:

```go
func NewAutoIndex(metricType MetricType) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
</table>

## index.NewBinFlatIndex

This method prepares the index parameters with the index type set to **BIN_FLAT**. The signature of this method is as follows:

```go
func NewBinFlatIndex(metricType MetricType) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
</table>

## index.NewBinIvfFlatIndex

This method prepares the index parameters with the index type set to **BIN_IVF_FLAT**. The signature of this method is as follows:

```go
func NewBinIvfFlatIndex(metricType MetricType, nlist int) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td></td>
     <td></td>
   </tr>
</table>

## index.NewBitmapIndex

This method prepares the index parameters with the index type set to **BITMAP**. The signature of this method is as follows:

```go
func NewBitmapIndex() Index
```

## index.NewDiskANNIndex

This method prepares the index parameters with the index type set to **DiskANN**. The signature of this method is as follows:

```go
func NewDiskANNIndex(metricType MetricType) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
</table>

## index.NewFlatIndex

This method prepares the index parameters with the index type set to **FLAT**. The signature of this method is as follows:

```go
func NewFlatIndex(metricType MetricType) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
</table>

## index.NewGPUBruteForceIndex

This method prepares the index parameters with the index type set to **GPU_BRUTE_FORCE**. The signature of this method is as follows:

```go
func NewGPUBruteForceIndex(metricType MetricType) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
</table>

## index.NewGPUCagraIndex

This method prepares the index parameters with the index type set to **GPU_CAGRA**. The signature of this method is as follows:

```go
func NewGPUCagraIndex(metricType MetricType, intermediateGraphDegree, graphDegree int, ) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>intermediateGraphDegree</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>graphDegree</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

## index.NewGPUIVPFlatIndex

This method prepares the index parameters with the index type set to **GPU_IVF_FLAT**. The signature of this method is as follows:

```go
func NewGPUIVPFlatIndex(metricType MetricType) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
</table>

## index.NewGPUIVPPQIndex

This method prepares the index parameters with the index type set to **GPU_IVF_PQ**. The signature of this method is as follows:

```go
func NewGPUIVPPQIndex(metricType MetricType) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
</table>

## index.NewGenericIndex

This method prepares the index parameters with the index type set to generic. The signature of this method is as follows:

```go
func NewGenericIndex(name string, params map[string]string) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the index type.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>params</code></p></td>
     <td><p>Parameters specific to the index type.</p></td>
     <td><p><code>map[string]string</code></p></td>
   </tr>
</table>

## index.NewHNSWIndex

This method prepares the index parameters with the index type set to **HNSW**. The signature of this method is as follows:

```go
func NewHNSWIndex(metricType MetricType, m int, efConstruction int) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>m</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>efConstruction</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

## index.NewInvertedIndex

This method prepares the index parameters with the index type set to **Inverted**. The signature of this method is as follows:

```go
func NewInvertedIndex() Index
```

## index.NewIvfFlatIndex

This method prepares the index parameters with the index type set to **IVF_FLAT**. The signature of this method is as follows:

```go
func NewIvfFlatIndex(metricType MetricType, nlist int) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

## index.NewIvfPQIndex

This method prepares the index parameters with the index type set to **IVF_PQ**. The signature of this method is as follows:

```go
func NewIvfPQIndex(metricType MetricType, nlist int, m int, nbits int) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>m</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>nbits</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

## index.NewIvfSQ8Index

This method prepares the index parameters with the index type set to **IVF_SQ8**. The signature of this method is as follows:

```go
func NewIvfSQ8Index(metricType MetricType, nlist int) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
</table>

## index.NewSCANNIndex

This method prepares the index parameters with the index type set to **SCANN**. The signature of this method is as follows:

```go
func NewSCANNIndex(metricType MetricType, nlist int, withRawData bool) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>withRawData</code></p></td>
     <td></td>
     <td><p><code>bool</code></p></td>
   </tr>
</table>

## index.NewSortedIndex

This method prepares the index parameters with the index type set to **Sorted**. The signature of this method is as follows:

```go
func NewSortedIndex() Index
```

## index.NewSparseInvertedIndex

This method prepares the index parameters with the index type set to **SPARSE_INVERTED_INDEX**. The signature of this method is as follows:

```go
func NewSparseInvertedIndex(metricType MetricType, dropRatio float64) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>dropRatio</code></p></td>
     <td></td>
     <td><p><code>float64</code></p></td>
   </tr>
</table>

## index.NewSparseWANDIndex

This method prepares the index parameters with the index type set to **SPARSE_WAND**. The signature of this method is as follows:

```go
func NewSparseWANDIndex(metricType MetricType, dropRatio float64) Index
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Name of the metric type that is used to measure the distance between two vectors.</p></td>
     <td><p><code>index.MetricType</code></p></td>
   </tr>
   <tr>
     <td><p><code>dropRatio</code></p></td>
     <td></td>
     <td><p><code>float64</code></p></td>
   </tr>
</table>

## index.NewTrieIndex

This method prepares the index parameters with the index type set to **Trie**. The signature of this method is as follows:

```go
func NewTrieIndex() Index
```

## index.MetricType

This is an alias type that maps to `entity.MetricType`.

## Return

Null

## Example

```plaintext
index := index.NewHNSWIndex(entity.COSINE, 32, 128)
indexTask, err := cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption("my_collection", "vector", index))
if err != nil {
    // handler err
}

err = indexTask.Await(ctx)
if err != nil {
    // handler err
}
```
