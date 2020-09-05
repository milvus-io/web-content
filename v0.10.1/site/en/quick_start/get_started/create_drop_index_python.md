---
id: create_drop_index_python.md
---

# Create and Drop an Index

This article provides Python sample codes for creating or droping indexes.

## Create an index

Currently, a collection only supports one index type. When you change the index type of a collection, Milvus automatically deletes the old index file. Before creating other indexes, a collection uses FLAT as the default index type.

<div class="alert note">
<code>create_index()</code> specifies the index type of a collection and synchronously creates indexes for the previously inserted data. When the size of the subsequently inserted data reaches the <code>index_file_size</code>, Milvus automatically creates indexes in the background. For streaming data, it is recommended to create indexes before inserting the vector so that the system can automatically build indexes for the next data. For static data, it is recommended to import all the data at first and then create indexes. See the <a href="https://github.com/milvus-io/pymilvus/tree/master/examples/indexes">index sample program</a> for details about using index.
</div>

1. Prepare the parameters needed to create indexes (take IVF_FLAT as an example). The index parameters are stored in a JSON string, which is represented by a dictionary in the Python SDK.

   ```python
   # Prepare index param
   >>> ivf_param = {'nlist': 16384}
   ```

   <div class="alert note">
   Different index types requires different parameters to create indexes. You must <b>assign values</b> to all index parameters.
   </div>

   | Index Type | Index Parameter | Exmaple Parameter | Range |
   | ---------- | --------------- | ----------------- | ----- |
   | IVF\_FLAT / IVF\_SQ8/ IVF\_SQ8H | `nlist`: The number of clusters to perform clustering operations on vector data files during index building. To facilitate later search, the index file records the results of the clustering operation, including the type of index, the center vector of each cluster, and the vectors in cluster.  | `{nlist: 16384}` | `nlist`: [1, 65536] |
   | IVF\_PQ                           | `nlist`: The number of clusters to perform clustering operations on vector data files during index building. To facilitate later search, the index file records the results of the clustering operation, including the type of index, the center vector of each cluster, and the vectors in cluster. </br></br> `m`: The compression rate during index building. The smaller the `m`, the higher the compression rate.  | `{nlist: 16384, m: 12}` | `nlist`: [1, 65536] </br></br> `m`: a value in {96, 64, 56, 48, 40, 32, 28, 24, 20, 16, 12, 8, 4, 3, 2, 1}, and the dimensions of the low-dimensional vector space must be in {1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32}. Besides, when computing with GPU, ensure that the result of m x 1024 does not exceed MaxSharedMemPerBlock of your graphics card.                                |
   | RNSG                             | `search_length`: The larger the value, the more nodes searched in the graph, the higher the recall rate, but the slower the speed. `search_length` should be less than `candidate_pool` and within [40, 80].</br></br> `out_degree`: The larger the value, the greater the memory usage and the better the search performance.</br></br> `candidate_pool`: The value affects the index quality and should be within [200,500].</br></br> `knng`: The value affects the index quality and should equal to `out_degree` + 20. | `{search_length: 45, out_degree:50, candidate_pool_size:300, knng:100}` | `search_length`: [10, 300]</br></br>`out_degree`: [5, 300]</br></br>`candidate_pool_size`: [50, 1000]</br></br>`knng`: [5, 300] |
   | HNSW                            | `M`: The value affects the build time and index quality. The larger the `M`, the longer it takes to build indexes, the higher the index quality, and the greater the memory footprint.</br></br> `efConstruction`: The value affects the build time and index quality. The larger the `efConstruction`, the longer it takes to build indexes, the higher the index quality, and the larger the memory footprint.                                                | `{M: 16, efConstruction: 500}`                                           | `M`: [4, 64]</br></br>`efConstruction`: [8, 512]                                                                                         |
   | ANNOY                           | `n_trees`: The value affects the index building time and index size. The larger the value, the more accurate the search results, but the larger the index file.                | `{n_trees: 8}`                                                      | [1, 1024]                       |

   See [Milvus Index Type](index.md) for details.

2. Create index for the collection:

   ```python
   # Create index
   >>> milvus.create_index('test01', IndexType.IVF_FLAT, ivf_param)
   ```

## Drop an index

After deleting the index, the collection uses the default index type FLAT again.

```python
>>> milvus.drop_index('test01')
```