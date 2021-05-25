---
id: index.md
---

# Vector index

Vector index is a time- and space-efficient data structure built on vectors through a certain mathematical model. Through the vector index, we can efficiently query several vectors similar to the target vector.

Since accurate retrieval is usually very time-consuming, most of the vector index types of Milvus use ANNS (Approximate Nearest Neighbors Search). Compared with accurate retrieval, the core idea of ANNS is no longer limited to returning the most accurate result, but only searching for neighbors of the target. ANNS improves retrieval efficiency by sacrificing accuracy within an acceptable range.

According to the implementation methods, the ANNS vector index can be divided into four categories:

- Tree-based index
- Graph-based index
- Hash-based index
- Quantization-based index

The following table classifies the indexes that Milvus supports:

<table>
<thead>
  <tr>
    <th>Supported index</th>
    <th>Classification</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td><a href="#FLAT">FLAT</a></td>
    <td>N/A</td>
    <td><ul>
        <li>Has a relatively small dataset.</li>
        <li>Requires a 100% recall rate. </li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#IVF_FLAT">IVF_FLAT</a></td>
    <td>Quantization-based index</td>
    <td><ul>
        <li>High-speed query.</li>
        <li>Requires a recall rate as high as possible.</li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#IVF_SQ8H">IVF_SQ8H</a></td>
    <td>Quantization-based index</td>
    <td><ul>
        <li>High-speed query. </li>
        <li>Limited disk, memory, and graphics memory capacities. </li>
        </ul></td>
  </tr>
  <tr>
    <td><a href="#IVF_PQ">IVF_PQ</a></td>
    <td>Quantization-based index</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="#RNSG">RNSG</a></td>
    <td>Graph-based index</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="#HNSW">HNSW</a></td>
    <td>Graph-based index</td>
    <td></td>
  </tr>
  <tr>
    <td><a href="#ANNOY">ANNOY</a></td>
    <td>Tree-based index</td>
    <td></td>
  </tr>
</tbody>
</table>

## Vector field and index

To improve query performance, you can specify an index type for each vector field. Currently, a vector field only supports one index type, Milvus will automatically delete the old index when switching the index type.

## Create indexes

When the `create_index` method is called, Milvus synchronously indexes the existing data on this field. 

<div class="alert note">
When the inserted data segment is less than 4096 rows, Milvus does not index it.
</div>

## Index by segment

Milvus stores massive data in sections. When indexing, Milvus creates an index for each data segment separately.

## Build indexes during free time

It is known that indexing is a resource-consuming and time-consuming task. When the query task and indexing task are concurrent, Milvus preferentially allocates computing resources to the query task, that is, any query command will interrupt the indexing task being executed in the background. After that, only when the user does not send the query task for 5 seconds, Milvus resumes the indexing task in the background. Besides, if the data segment specified by the query command has not been built into the specified index, Milvus will do an exhaustive search directly within the segment.



## Supported vector indexes

### FLAT
<a name="FLAT"></a>

If FLAT index is used, the vectors are stored in an array of float/binary data without any compression. during searching vectors, all indexed vectors are decoded sequentially and compared to the query vectors.

FLAT index provides 100% query recall rate. Compared to other indexes, it is the most efficient indexing method when the number of queries is small.

- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `metric_type` | [Optional] The chosen distance metric.   | See [Supported Metrics](metric.md). |

### IVF_FLAT
<a name="IVF_FLAT"></a>

IVF (Inverted File) is an index type based on quantization. It divides the points in space into `nlist` units by clustering method. during searching vectors, it compares the distances between the target vector and the center of all the units, and then select the `nprobe` nearest unit. Then, it compares all the vectors in these selected cells to get the final result. 

IVF_FLAT is the most basic IVF index, and the encoded data stored in each unit is consistent with the original data.

 
 - Index building parameters

   | Parameter   | Description     | Range     |
   | ------- | -------- |----------- |
   | `nlist` | Number of cluster units |[1, 65536] |


- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `nprobe` | Number of units to query | CPU: [1, nlist] <br> GPU: [1, min(2048, nlist)] |

### IVF_SQ8
<a name="IVF_SQ8"></a>

IVF\_SQ8 does scalar quantization for each vector placed in the unit based on IVF. Scalar quantization converts each dimension of the original vector from a 4-byte floating-point number to a 1-byte unsigned integer, so the IVF\_SQ8 index file occupies much less space than the IVF\_FLAT index file. However, scalar quantization results in a loss of accuracy during searching vectors.

 
 - Index building parameters

   | Parameter   | Description     | Range     |
   | ------- | -------- |----------- |
   | `nlist` | Number of cluster units |[1, 65536] |


- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `nprobe` | Number of units to query | CPU: [1, nlist] <br> GPU: [1, min(2048, nlist)] |

### IVF_PQ
<a name="IVF_PQ"></a>

`PQ` (Product Quantization) uniformly decomposes the original high-dimensional vector space into Cartesian products of `m` low-dimensional vector spaces, and then quantizes the decomposed low-dimensional vector spaces. Instead of calculating the distances between the target vector and the center of all the units, product quantization enables the calculation of distances between the target vector and the clustering center of each low-dimensional space and greatly reduces the time complexity and space complexity of the algorithm.

IVF\_PQ performs IVF index clustering before quantizing the product of vectors. Its index file is even smaller than IVF\_SQ8, but it also causes a loss of accuracy during searching vectors.

<div class="alert note">
Index building parameters and search parameters vary with Milvus distribution. Select your Milvus distribution first.
</div>

<div class="filter">
<a href="#CPU">CPU-only Milvus</a> <a href="#GPU">GPU-enabled Milvus </a>
</div>

<div class="filter-CPU" markdown="block">

- Index building parameters

   | Parameter   | Description     | Range     |
   | --------| ------------- | ----------- |
   | `nlist` | Number of cluster units　    | [1, 65536] |
   | `m`     | Number of factors of product quantization | dim ≡ 0 (mod m) |

- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `nprobe` | Number of units to query | [1, nlist] |

</div>


<div class="filter-GPU" markdown="block">

- Index building parameters

   | Parameter   | Description     | Range     |
   | --------| ------------- | ----------- |
   | `nlist` | Number of cluster units　    | [1, 65536] |
   | `m`     | Number of factors of product quantization |  `m` ∈ {1, 2, 3, 4, 8, 12, 16, 20, 24, 28, 32, 40, 48, 56, 64, 96}, and (dim / m) ∈ {1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24, 28, 32}.<br>(`m` x 1024) &ge; `MaxSharedMemPerBlock` of your graphics card. |

<div class="alert note">
If the value of <code>m</code> does not fall into the specified range for GPU indexing but falls into the range of CPU indexing, Milvus switches to using CPU to build the index (click the button above to view the range supported by CPU-enabled Milvus).
</div>

- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `nprobe` | Number of units to query | [1, min(2048, nlist)] |

<div class="alert note">
If the value of <code>nprobe</code> does not fall into the specified range but falls into the range for CPU search, Milvus switches to CPU search (click the button above to view the range supported by CPU-enabled Milvus).
</div>

</div>

### RNSG
<a name="RNSG"></a>

RNSG (Refined Navigating Spreading-out Graph) is a graph-based indexing algorithm. It sets the center position of the whole image as a navigation point, and then uses a specific edge selection strategy to control the out-degree of each point (less than or equal to `out_degree`). Therefore, it can reduce memory usage and quickly locate the target position nearby during searching vectors.

The graph construction process of RNSG is as follows:

1. Find `knng` nearest neighbors for each point.
2. Iterate at least `search_length` times based on `knng` nearest neighbor nodes to select `candidate_pool_size` possible nearest neighbor nodes.
3. Construct the out-edge of each point in the selected `candidate_pool_size` nodes according to the edge selection strategy.

The query process is similar to the graph building process. It starts from the navigation point and iterate at least `search_length` times to get the final result. 

- Index building parameters

   | Parameter   | Description     | Range     |
   | ------- | -------- |----------- |
   | `out_degree`          | Maximum out-degree of the node        | [5, 300]  |
   | `candidate_pool_size` | Candidate pool size of the node 　     | [50, 1000] |
   | `search_length`       | Number of query iterations        　| [10, 300] |
   | `knng`                | Number of nearest neighbors   　| [5, 300] |
   

- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `search_length` | Number of query iterations  | [10, 300] |


### HNSW
<a name="HNSW"></a>

HNSW (Hierarchical Navigable Small World Graph) is a graph-based indexing algorithm. It builds a multi-layer navigation structure for an image according to certain rules. In this structure, the upper layers are more sparse and the distances between nodes are farther; the lower layers are denser and the distances between nodes are closer. The search starts from the uppermost layer, finds the node closest to the target in this layer, and then enters the next layer to begin another search. After multiple iterations, it can quickly approach the target position.

In order to improve performance, HNSW limits the maximum degree of nodes on each layer of the graph to `M`. In addition, you can use `efConstruction` (when building index) or `ef` (when searching targets) to specify a search range.

- Index building parameters

   | Parameter   | Description     | Range     |
   | ---------------- | ------------------ | --------- |
   | `M`              | Maximum degree of the node        | [4, 64]  |
   | `efConstruction` | Search scope      | [8, 512] |


- Search parameters

   | Parameter   | Description     | Range     |
   | --------|--------------- | ------------ |
   | `ef`    | Search scope  | [`top_k`, 32768] |


### ANNOY
<a name="ANNOY"></a>

ANNOY (Approximate Nearest Neighbors Oh Yeah) is an index that uses a hyperplane to divide a high-dimensional space into multiple subspaces, and then stores them in a tree structure.

When searching for vectors, ANNOY follows the tree structure to find subspaces closer to the target vector, and then compares all the vectors in these subspaces (The number of vectors being compared should not be less than `search_k`) to obtain the final result. Obviously, when the target vector is close to the edge of a certain subspace, sometimes it is necessary to greatly increase the number of searched subspaces to obtain a high recall rate. Therefore, ANNOY uses `n_trees` different methods to divide the whole space, and searches all the dividing methods simultaneously to reduce the probability that the target vector is always at the edge of the subspace.


- Index building parameters

   | Parameter   | Description     | Range     |
   | --------- |-------------- | -------- |
   | `n_trees` | The number of methods of space division. | [1, 1024] |

- Search parameters

   | Parameter   | Description     | Range     |
   | -----------|--------------------------------- | ---------------- |
   | `search_k` | The number of nodes to search. -1 means 5% of the whole data. | {-1} ∪ [`top_k`, n × `n_trees`] |

## How to choose an index

To learn how to choose an appropriate index for your application scenarios, please read [How to Select an Index in Milvus](https://medium.com/@milvusio/how-to-choose-an-index-in-milvus-4f3d15259212).

To learn how to choose an appropriate index for a metric, see [Distance Metrics](metric.md).


## FAQ

<details>
<summary><font color="#4fc4f9">Does IVF_SQ8 differ from IVF_SQ8H in terms of recall rate?
</font></summary>
No, they have the same recall rate for the same dataset.
</details>
<details>
<summary><font color="#4fc4f9">What is the difference between FLAT index and IVF_FLAT index?</font></summary>
<p>IVF_FLAT index divides a vector space into <code>nlist</code> clusters. If you keep the default value of <code>nlist</code> as 16384, Milvus compares the distances between the target vector and the centers of all 16384 clusters to get <code>nprobe</code> nearest clusters. Then Milvus compares the distances between the target vector and the vectors in the selected clusters to get the nearest vectors. Unlike IVF_FLAT, FLAT directly compares the distances between the target vector and each and every vector.
</p>
<p>
Therefore, when the total number of vectors approximately equals <code>nlist</code>, IVF_FLAT and FLAT has little difference in the way of calculation required and search performance. But as the number of vectors grows to two times, three times, or n times of <code>nlist</code>, IVF_FLAT index begins to show increasingly greater advantages.
</p>
<p>
See <a href="https://medium.com/unstructured-data-service/how-to-choose-an-index-in-milvus-4f3d15259212">How to Choose an Index in Milvus</a> for more information.
</p>
</details>

## Bibliography

- RNSG: <a href="http://www.vldb.org/pvldb/vol12/p461-fu.pdf">Fast Approximate Nearest Neighbor Search With The Navigating Spreading-out Graph</a>
- HNSW: <a href="https://arxiv.org/abs/1603.09320">Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs</a>
- ANNOY: <a href="https://erikbern.com/2015/10/01/nearest-neighbors-and-vector-models-part-2-how-to-search-in-high-dimensional-spaces.html">Nearest neighbors and vector models – part 2 – algorithms and data structures</a>
