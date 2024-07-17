# SearchParams

The types on this page implemented the method signatures of the [entity.SearchParam](Search.md#entitysearchparam) interface.

## IndexAUTOINDEXSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with AUTOINDEX. 

You can use the `entity.NewIndexAUTOINDEXSearchParam()` method to instantiate this type as follows.

```go
searchParams := entity.NewIndexAUTOINDEXSearchParam(level int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>level</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 5]</code></p></td>
     <td><p>The precision level of the search.</p><p>Increasing the <code>level</code> parameter will result in a higher recall rate, but may also lead to degraded search performance. The value defaults to <code>1</code> and ranges from <code>1</code> to <code>5</code>. The default value results in a recall rate of 90%, which is typically sufficient for most use cases. However, if you require a higher recall rate, increase this value.</p></td>
   </tr>
</table>

## IndexBinFlatSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with BIN_FLAT.

You can use the `entity.NewIndexBinFlatSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexBinFlatSearchParam(nprobe int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
     <th><p>Default</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, nlist]</code></p></td>
     <td><p>Number of units to query</p></td>
     <td><p><code>8</code></p></td>
   </tr>
</table>

## IndexDISKANNSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with DiskANN.

You can use the `entity.NewIndexDISKANNSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexDISKANNSearchParam(search_list int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>search_list</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[topk, int32_max]</code></p></td>
     <td><p>Size of the candidate list, a larger size offers a higher recall rate with degraded performance.</p></td>
   </tr>
</table>

## IndexFlatSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with FLAT.

You can use the `entity.NewIndexFlatSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexFlatSearchParam()
```

## IndexGPUBruteForceSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with GPU_BRUTE_FORCE.

You can use the `entity.NewIndexGPUBruteForceSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexGPUBruteForceSearchParam()
```

## IndexGPUCagraSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with GPU_CAGRA.

You can use the `entity.NewIndexGPUCagraSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexGPUCagraSearchParam(
    itopkSize int,
    searchWidth int,
    minIterations int,
    maxIterations int,
    teamSize int,
)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Description</p></th>
     <th><p>Default</p></th>
   </tr>
   <tr>
     <td><p><code>itopkSize</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Determines the size of intermediate results kept during the search. A larger value may improve recall at the expense of search performance. It should be at least equal to the final top-k (limit) value and is typically a power of 2 (e.g., 16, 32, 64, 128).</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>searchWidth</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Specifies the number of entry points into the CAGRA graph during the search. Increasing this value can enhance recall but may impact search performance（e.g. 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>N/A</p></td>
   </tr>
   <tr>
     <td><p><code>minIterations</code></p></td>
     <td><p><code>int</code></p></td>
     <td rowspan="2"><p>Controls the search iteration process. By default, they are set to <code>0</code>, and CAGRA automatically determines the number of iterations based on <code>itopkSize</code> and <code>searchWidth</code>. Adjusting these values manually can help balance performance and accuracy.</p></td>
     <td rowspan="2"><p><code>0</code></p></td>
   </tr>
   <tr>
     <td><p><code>maxIterations</code></p></td>
     <td><p><code>int</code></p></td>
   </tr>
   <tr>
     <td><p><code>teamSize</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p>Specifies the number of CUDA threads used for calculating metric distance on the GPU. Common values are a power of 2 up to 32 (e.g. 2, 4, 8, 16, 32). It has a minor impact on search performance. The default value is <code>0</code>, where Milvus automatically selects the <code>teamSize</code> based on the vector dimension.</p></td>
     <td><p><code>0</code></p></td>
   </tr>
</table>

## IndexGPUIvfFlatSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with GPU_IVF_FLAT.

You can use the `entity.NewIndexGPUIvfFlatSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexGPUIvfFlatSearchParam(nprobe int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
     <th><p>Default</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65535]</code></p></td>
     <td><p>Number of cluster units</p></td>
     <td><p><code>128</code></p></td>
   </tr>
</table>

## IndexGPUIvfPQSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with GPU_IVF_PQ.

You can use the `entity.NewIndexGPUIvfPQSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexGPUIvfPQSearchParam(nprobe int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
     <th><p>Default</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, 65535]</code></p></td>
     <td><p>Number of cluster units</p></td>
     <td><p><code>128</code></p></td>
   </tr>
</table>

## IndexHNSWSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with HNSW.

You can use the `entity.NewIndexHNSWSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexHNSWSearchParam(ef int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>ef</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[top_k, int_max]</code></p></td>
     <td><p>Parameter controlling query time/accuracy trade-off. Higher <code>ef</code> leads to more accurate but slower search.</p></td>
   </tr>
</table>

## IndexIvfFlatSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with IVF_FLAT.

You can use the `entity.NewIndexIvfFlatSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexIvfFlatSearchParam(nprobe int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
     <th><p>Default</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, nlist]</code></p></td>
     <td><p>Number of units to query</p></td>
     <td><p><code>8</code></p></td>
   </tr>
</table>

## IndexIvfPQSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with IVF_PQ.

You can use the `entity.NewIndexIvfPQSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexIvfPQSearchParam(nprobe int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
     <th><p>Default</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, nlist]</code></p></td>
     <td><p>Number of units to query</p></td>
     <td><p><code>8</code></p></td>
   </tr>
</table>

## IndexIvfSQ8SearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with IVF_SQ8.

You can use the `entity.NewIndexIvfSQ8SearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexIvfSQ8SearchParam(nprobe int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
     <th><p>Default</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, nlist]</code></p></td>
     <td><p>Number of units to query</p></td>
     <td><p><code>8</code></p></td>
   </tr>
</table>

## IndexSCANNSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with SCANN.

You can use the `entity.NewIndexSCANNSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexSCANNSearchParam(nprobe int, reorder_k int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>nprobe</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[1, nlist]</code></p></td>
     <td><p>Number of units to query</p></td>
   </tr>
   <tr>
     <td><p><code>reorder_k</code></p></td>
     <td><p><code>int</code></p></td>
     <td><p><code>[ topK, ∞]</code></p></td>
     <td><p>Number of candidate units to query</p></td>
   </tr>
</table>

## IndexSparseInvertedSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with SPARSE_INVERTED_INDEX.

You can use the `entity.NewIndexSparseInvertedSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexSparseInvertedSearchParam(dropRatio int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>dropRatio</code></p></td>
     <td><p><code>float64</code></p></td>
     <td><p><code>[0, 1]</code></p></td>
     <td><p>The proportion of small vector values that are excluded during the search process. This option allows fine-tuning of the search process by specifying the ratio of the smallest values in the query vector to ignore. It helps balance search precision and performance. The smaller the value set for <code>dropRaio</code>, the less these small values contribute to the final score. By ignoring some small values, search performance can be improved with minimal impact on accuracy.</p></td>
   </tr>
</table>

## IndexSparseWANDSearchParam

This struct type defines the search parameters of a similarity search within a collection indexed with SPARSE_WAND.

You can use the `entity.NewIndexSparseWANDSearchParam()` method to instantiate this type as follows:

```go
searchParams := entity.NewIndexSparseWANDSearchParam(dropRatio int)
```

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Type</p></th>
     <th><p>Value Range</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>dropRatio</code></p></td>
     <td><p><code>float64</code></p></td>
     <td><p><code>[0, 1]</code></p></td>
     <td><p>The proportion of small vector values that are excluded during the search process. This option allows fine-tuning of the search process by specifying the ratio of the smallest values in the query vector to ignore. It helps balance search precision and performance. The smaller the value set for <code>dropRaio</code>, the less these small values contribute to the final score. By ignoring some small values, search performance can be improved with minimal impact on accuracy.</p></td>
   </tr>
</table>

