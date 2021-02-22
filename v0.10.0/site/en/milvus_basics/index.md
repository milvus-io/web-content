---
id: index.md
---

# Index Types

<div class="alert note">
Please read <a href="index_overview.md">Index Overview</a> before reading this article.
</div>

## Index Overview

### Index types in CPU-only Milvus

<div class="table-wrapper" markdown="block">

| Name       | Index building with CPU | Search with CPU | Float vector support | Binary vector support |
| -------- | ----------------- | -------------- | -------------- | ---------------- |
| FLAT     | -                 | ✔️             | ✔️             | ✔️         　   |
| IVF_FLAT | ✔️                | ✔️            | ✔️             | ✔️          　  |
| IVF_SQ8  | ✔️                | ✔️            | ✔️             | ❌             |
| IVF_PQ   | ✔️                | ✔️            | ✔️             | ❌             |
| RNSG     | ✔️                | ✔️            | ✔️             | ❌             |
| HNSW     | ✔️                | ✔️            | ✔️             | ❌             |
| ANNOY    | ✔️                | ✔️            | ✔️             | ❌             |

</div>

### Index types in Milvus with GPU support

<div class="table-wrapper" markdown="block">

| Name       | Index building with CPU | Search with CPU | Search with GPU                                                  | Search with GPU                                          | Float vector support | Binary vector support |
| ---------- | ----------------------- | --------------- | ---------------------------------------------------------------- | -------------------------------------------------------- | -------------------- | --------------------- |
| FLAT     | -                | ✔️            | -                  | ✔️<br>(Only Supports floating point vectors) | ✔️             | ✔️            |
| IVF_FLAT | ✔️                | ✔️            | ✔️<br>(Only Supports floating point vectors)  | ✔️<br>(Only Supports floating point vectors) | ✔️             | ✔️            |
| IVF_SQ8  | ✔️                | ✔️            | ✔️                  | ✔️                 | ✔️             | ❌           |
| IVF_SQ8H | ✔️                | ✔️            | ✔️                  | ✔️                 | ✔️             | ❌           |
| IVF_PQ   | ✔️                | ✔️            | ✔️<br>(Only Supports GPU index for Euclidean distance)                  | ✔️<br>(Only Supports GPU search for Euclidean distance)                 | ✔️             | ❌           |
| RNSG     | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |
| HNSW     | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |
| ANNOY    | ✔️                | ✔️            | ❌                 | ❌                | ✔️             | ❌           |

</div>

<div class="alert note">
<ul>
<li>FLAT index does not need index building.</li>
<li>For indexes supporting both CPU search and GPU search, you can create or search them using different devices, either CPU or GPU. For example, you can create an index using CPU and conduct a vector search using GPU.</li>
<li>Index building parameters and search parameters vary with index type. See <a href="milvus_operation.md">Milvus Operations</a> for more information.</li>
</ul>
</div>

## Milvus Indexes

### FLAT

If FLAT index is used, the vectors are stored in an array of float/binary data without any compression. during searching vectors, all indexed vectors are decoded sequentially and compared to the query vectors.

FLAT index provides 100% query recall rate. Compared to other indexes, it is the most efficient indexing method when the number of queries is small.

### IVF_FLAT

IVF (Inverted File) is an index type based on quantization. It divides the points in space into `nlist` units by clustering method. during searching vectors, it compares the distances between the target vector and the center of all the units, and then select the `nprobe` nearest unit. Then, it compares all the vectors in these selected cells to get the final result. 

IVF_FLAT is the most basic IVF index, and the encoded data stored in each unit is consistent with the original data.

- Index building parameters

   | Parameter   | Description     | Range     |
   | ------- | -------- |----------- |
   | `nlist` | Number of cluster units |[1, 65536] |
   
   **Example:** `{"nlist": 2048}`

- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `nprobe` | Number of units to query | CPU: [1, nlist] <br> GPU: [1, min(2048, nlist)] |
   
   **Example:** `{"nprobe": 8}`

### IVF_SQ8

IVF_SQ8 does scalar quantization for each vector placed in the unit based on IVF. Scalar quantization converts each dimension of the original vector from a 4-byte floating-point number to a 1-byte unsigned integer, so the IVF_SQ8 index file occupies much less space than the IVF_FLAT index file. However, scalar quantization results in a loss of accuracy during searching vectors.

- IVF_SQ8 has the same index building parameters as IVF_FLAT.
- IVF_SQ8 has the same search parameters as IVF_FLAT.

### IVF_SQ8H

Optimized version of `IVF_SQ8` that requires both CPU and GPU to work. Unlike `IVF_SQ8`, `IVF_SQ8H` uses a GPU-based coarse quantizer, which greatly reduces time to quantize.

IVF_SQ8H is an IVF_SQ8 index that optimizes query execution.

The query method is as follows:

- If `NQ` &ge; `gpu_search_threshold`, GPU handles the entire query task.
- If `NQ` < `gpu_search_threshold`, GPU handles the task of retrieving the `nprobe` nearest unit in the IVF index file, and CPU handles the rest.

- IVF_SQ8H has the same index building parameters as IVF_FLAT.
- IVF_SQ8H has the same search parameters as IVF_FLAT.

### IVF_PQ

`PQ` (Product Quantization) uniformly decomposes the original high-dimensional vector space into Cartesian products of `m` low-dimensional vector spaces, and then quantizes the decomposed low-dimensional vector spaces. Instead of calculating the distances between the target vector and the center of all the units, product quantization enables the calculation of distances between the target vector and the clustering center of each low-dimensional space and greatly reduces the time complexity and space complexity of the algorithm.

IVF\_PQ quantizes the products of vectors before IVF index clustering. Its index file is even smaller than IVF\_SQ8, but it also causes a loss of accuracy during searching vectors.

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
If the value of <code>m</code> does not fall into the specified range for GPU indexing but into the range of CPU indexing, Milvus switches to using CPU to build the index (click the button above to view the range supported by CPU-enabled Milvus).
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

RNSG (Refined Navigating Spreading-out Graph) is a graph-based indexing algorithm. It sets the center position of the whole image as a navigation point, and then uses a specific edge selection strategy to control the out-degree of each point (less than or equal to `out_degree`). Therefore, it can reduce memory usage and quickly locate the target position nearby during searching vectors.

The graph construction process of RNSG is as follows:

1. Find `knng` nearest neighbors for each point.
2. Iterate at least `search_length` times based on `knng` nearest neighbor nodes to select `candidate_pool_size` possible nearest neighbor nodes.
3. Construct the out-edge of each point in the selected `candidate_pool_size` nodes according to the edge selection strategy.

<div class="alert note">
Reference: <a href="http://www.vldb.org/pvldb/vol12/p461-fu.pdf"> Fast Approximate Nearest Neighbor Search With The Navigating Spreading-out Graph</a>
</div>

- Index building parameters

   | Parameter   | Description     | Range     |
   | ------- | -------- |----------- |
   | `out_degree`          | Maximum out-degree of the node        | [5, 300]  |
   | `candidate_pool_size` | Candidate pool size of the node 　     | [50, 1000] |
   | `search_length`       | Number of query iterations        　| [10, 300] |
   | `knng`                | Number of nearest neighbors   　| [5, 300] |
   
   **Example:** `{"out_degree": 30, "candidate_pool_size": 300, "search_length": 60, "knng": 50}`

- Search parameters

   | Parameter   | Description     | Range     |
   | -------- | ----------- | ---------- |
   | `search_length` | Number of query iterations  | [10, 300] |
   
   **Example:** `{"search_length": 100}`

### HNSW

HNSW (Hierarchical Small World Graph) is a graph-based indexing algorithm. It builds a multi-layer navigation structure for an image according to certain rules. In this structure, the upper layers are more sparse and the distances between nodes are farther; the lower layers are denser and the distances between nodes are closer. The search starts from the uppermost layer, finds the node closest to the target in this layer, and then enters the next layer to begin another search. After multiple iterations, it can quickly approach the target position.

In order to improve performance, HNSW limits the maximum degree of nodes on each layer of the graph to `M`. In addition, you can use `efConstruction` (when building index) or `ef` (when searching targets) to specify a search range.

<div class="alert note">
Reference: <a href="https://arxiv.org/abs/1603.09320">Efficient and robust approximate nearest neighbor search using Hierarchical Navigable Small World graphs</a>
</div>

- Index building parameters

   | Parameter   | Description     | Range     |
   | ---------------- | ------------------ | --------- |
   | `M`              | Maximum degree of the node        | [5, 48]  |
   | `efConstruction` | Search scope      | [100, 500] |

   **Example:** `{"M": 16, "efConstruction": 40}`

- Search parameters

   | Parameter   | Description     | Range     |
   | --------|--------------- | ------------ |
   | `ef`    | Search scope  | [topK, 4096] |

   **Example:** `{"ef": 64}`

### ANNOY

ANNOY (Approximate Nearest Neighbors Oh Yeah) is an index that uses a hyperplane to divide a high-dimensional space into multiple subspaces, and then stores them in a tree structure.

during searching vectors, ANNOY follows the tree structure to find subspaces closer to the target vector, and then compares all the vectors in these subspaces (The number of vectors being compared should not be less than `search_k`) to obtain the final result. Obviously, when the target vector is close to the edge of a certain subspace, sometimes it is necessary to greatly increase the number of searched subspaces to obtain a high recall rate. Therefore, ANNOY uses `n_trees` different methods to divide the whole space, and searches all the dividing methods simultaneously to reduce the probability that the target vector is always at the edge of the subspace.

<div class="alert note">
Reference: <a href="https://erikbern.com/2015/10/01/nearest-neighbors-and-vector-models-part-2-how-to-search-in-high-dimensional-spaces.html">Nearest neighbors and vector models – part 2 – algorithms and data structures</a>
</div>

- Index building parameters

   | Parameter   | Description     | Range     |
   | --------- |-------------- | -------- |
   | `n_trees` | The number of methods of space division | [1, 1024] |

   **Example:**`{"n_trees": 8}`

- Search parameters

   | Parameter   | Description     | Range     |
   | -----------|--------------------------------- | ---------------- |
   | `search_k` | The number of nodes to be searched. `-1` means 5% of the whole data. | {-1} ∪ [topk, n × `n_trees`] |

   **Example:**`{"search_k": -1}`

## How to choose an index

To learn how to choose an appropriate index for your application scenarios, please read [How to Select an Index in Milvus](https://medium.com/@milvusio/how-to-choose-an-index-in-milvus-4f3d15259212).

To learn how to choose an appropriate index for a metric, see [Distance Metrics](metric.md).
