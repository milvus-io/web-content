# Indexes

The struct types on this page implement the method signatures of the `entity.Index` interface.

## entity.GenericIndex

This struct type applies to general purposes without any constraint on the index type. You can use `entity.NewGenericIndex()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewGenericIndex(name string, it entity.IndexType, params map[string]string)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>name</code></p></td>
     <td><p>Name of the index.</p></td>
     <td><p><code>string</code></p></td>
   </tr>
   <tr>
     <td><p><code>it</code></p></td>
     <td><p>Type of the index.</p></td>
     <td><p><code>entity.IndexType</code></p></td>
   </tr>
   <tr>
     <td><p><code>params</code></p></td>
     <td><p>Index parameters corresponding to the specified index type.</p></td>
     <td><p><code>map[string]string</code></p></td>
   </tr>
</table>

## entity.IndexAUTOINDEX

This struct type creates an AUTOINDEX for the specified field. You can use `entity.NewIndexAUTOINDEX()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexAUTOINDEX(metricType MetricType)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
   </tr>
</table>

## entity.IndexBinFlat

This struct type creates a BIN_FLAT index for the specified field. You can use `entity.NewIndexBinFlat()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexBinFlat(metricType MetricType, nlist int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
</table>

## entity.IndexBinIvfFlat

This struct type creates a BIN_IVF_FLAT index for the specified field. You can use `entity.NewIndexBinIvfFlat()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexBinIvfFlat(metricType MetricType, nlist int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
</table>

## entity.IndexDISKANN

This struct type creates a DiskANN index for the specified field. You can use `entity.NewIndexDISKANN()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexDISKANN(metricType MetricType)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
   </tr>
</table>

## entity.IndexFlat

This struct type creates a FLAT index for the specified field. You can use `entity.NewIndexIvfFlat()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexFlat(metricType MetricType)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
   </tr>
</table>

## entity.IndexGPUBruteForce

This struct type creates a GPU_BRUTE_FORCE index for the specified field. You can use `entity.NewIndexGPUBruteForce()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexGPUBruteForce(metricType MetricType)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
   </tr>
</table>

## entity.IndexGPUCagra

This struct type creates a GPU_CAGRA index for the specified field. You can use `entity.NewIndexGPUCagra()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexBinIvfFlat(metricType MetricType, intermediateGraphDegree, graphDegree int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>intermediateGraphDegree</code></p></td>
     <td><p>Number of k-nearest neighbors (k) of this intermediate k-NN graph, trade off the quality of the final searchable CAGRA graph;</p><p>It affects recall and build time by determining the graph's degree before pruning. Recommended values are <code>32</code> or <code>64</code>.</p></td>
     <td><p><code>int</code></p></td>
     <td></td>
   </tr>
   <tr>
     <td><p><code>graphDegree</code></p></td>
     <td><p>CAGRA's optimized graph fixed-degree number.</p><p>It affects search performance and recall by setting the graph's degree after pruning. A larger difference between these two degrees results in a longer build time. Its value must be smaller than the value of <code>intermediateGraphDegree</code>.</p></td>
     <td><p><code>int</code></p></td>
     <td></td>
   </tr>
</table>

## entity.IndexGPUIvfFlat

This struct type creates a GPU_IVF_FLAT index for the specified field. You can use `entity.NewIndexGPUIvfFlat()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexGPUIvfFlat(metricType MetricType, nlist int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
</table>

## entity.IndexGPUIvfPQ

This struct type creates a GPU_IVF_PQ index for the specified field. You can use `entity.NewIndexGPUIvfPQ()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexGPUIvfPQ(metricType MetricType, nlist int, m int, nbits int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
   <tr>
     <td><p><code>m</code></p></td>
     <td><p>Number of factors of product quantization</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>dim mod m or = 0</code></p></td>
   </tr>
   <tr>
     <td><p><code>nbits</code></p></td>
     <td><p>Number of bits in which each low-dimensional vector is stored.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 16]</code></p></td>
   </tr>
</table>

## entity.IndexHNSW

This struct type creates an HNSW index for the specified field. You can use `entity.NewIndexHNSW()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexHNSW(metricType MetricType, M int, efConstruction int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>M</code></p></td>
     <td><p>Maximum number of outgoing connections in the graph. Higher M leads to higher accuracy/run_time at fixed ef/efConstruction.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[2, 2048]</code></p></td>
   </tr>
   <tr>
     <td><p><code>efConstruction</code></p></td>
     <td><p>Index search speed/build speed tradeoff. Increasing this parameter may enhance index quality, but it also tends to lengthen the indexing time.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, int_max]</code></p></td>
   </tr>
</table>

## entity.IndexIvfFlat

This struct type creates an IVF_FLAT index for the specified field. You can use `entity.NewIndexIvfFlat()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexIvfFlat(metricType MetricType, nlist int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
</table>

In addition to the methods defined in the `entity.Index` interface, this struct type also defines the following methods.

<table>
   <tr>
     <th><p>Method</p></th>
     <th><p>Return Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>SupportBinary()</code></p></td>
     <td><p><code>bool</code></p></td>
     <td><p>Returns whether</p></td>
   </tr>
</table>

## entity.IndexIvfPQ

This struct type creates an IVF_PQ index for the specified field. You can use `entity.NewIndexGPUIvfPQ()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexIvfPQ(metricType MetricType, nlist int, m int, nbits int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
   <tr>
     <td><p><code>m</code></p></td>
     <td><p>Number of factors of product quantization</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>dim mod m or = 0</code></p></td>
   </tr>
   <tr>
     <td><p><code>nbits</code></p></td>
     <td><p>Number of bits in which each low-dimensional vector is stored.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 16]</code></p></td>
   </tr>
</table>

## entity.IndexIvfSQ8

This struct type creates an IVF_SQ8 index for the specified field. You can use `entity.NewIndexIvfSQ8()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexIvfSQ8(metricType MetricType, nlist int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
</table>

## entity.IndexSCANN

This struct type creates a SCANN index for the specified field. You can use `entity.NewIndexSCANN()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexSCANN(metricType MetricType, nlist int, with_raw_data bool)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>nlist</code></p></td>
     <td><p>Number of cluster units.</p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65536]</code></p></td>
   </tr>
   <tr>
     <td><p><code>with_raw_data</code></p></td>
     <td><p>Whether to include raw data when creating the index.</p></td>
     <td><p><code>bool</code></p></td>
     <td><p>N/A</p></td>
   </tr>
</table>

## entity.IndexSparseInverted

This struct type creates a SPARSE_INVERTED_INDEX index for the specified field. You can use `entity.NewIndexSparseInverted()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexSparseInverted(metricType MetricType, dropRatio float64)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>dropRatio</code></p></td>
     <td><p>Proportion of small vector values that are excluded during the indexing process. This option allows fine-tuning of the indexing process, making a trade-off between efficiency and accuracy by disregarding small values when building the index.</p></td>
     <td><p><code>float64</code></p></td>
     <td><p><code>[0, 1]</code></p></td>
   </tr>
</table>

## entity.IndexSparseWAND

This struct type creates a SPARSE_WAND index for the specified field. You can use `entity.NewIndexSparseWAND()` to create one for the `client.CreateIndex()` request as follows:

```go
index := entity.NewIndexSparseWAND(metricType MetricType, dropRatio float64)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
   </tr>
   <tr>
     <td><p><code>metricType</code></p></td>
     <td><p>Metric type for Milvus to follow when it measures similarities between vector embeddings.</p></td>
     <td><p><code>entity.MetricType</code></p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>dropRatio</code></p></td>
     <td><p>Proportion of small vector values that are excluded during the indexing process. This option allows fine-tuning of the indexing process, making a trade-off between efficiency and accuracy by disregarding small values when building the index.</p></td>
     <td><p><code>float64</code></p></td>
     <td><p><code>[0, 1]</code></p></td>
   </tr>
</table>

## entity.IndexType

This string type defines all applicable index types.

```go
const (
    Flat       IndexType = "FLAT" //faiss
    BinFlat    IndexType = "BIN_FLAT"
    IvfFlat    IndexType = "IVF_FLAT" //faiss
    BinIvfFlat IndexType = "BIN_IVF_FLAT"
    IvfPQ      IndexType = "IVF_PQ" //faiss
    IvfSQ8     IndexType = "IVF_SQ8"
    HNSW       IndexType = "HNSW"
    AUTOINDEX  IndexType = "AUTOINDEX"
    DISKANN    IndexType = "DISKANN"
    SCANN      IndexType = "SCANN"

    GPUIvfFlat IndexType = "GPU_IVF_FLAT"
    GPUIvfPQ   IndexType = "GPU_IVF_PQ"

    GPUCagra      IndexType = "GPU_CAGRA"
    GPUBruteForce IndexType = "GPU_BRUTE_FORCE"

    // Sparse
    SparseInverted IndexType = "SPARSE_INVERTED_INDEX"
    SparseWAND     IndexType = "SPARSE_WAND"

    // DEPRECATED
    Scalar IndexType = ""

    Trie     IndexType = "Trie"
    Sorted   IndexType = "STL_SORT"
    Inverted IndexType = "INVERTED"
)
```

