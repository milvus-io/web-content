---
id: index.md
related_key: index
summary: Index mechanism in Milvus.
title: In-memory Index
---

# In-memory Index

This topic lists various types of in-memory indexes Milvus supports, scenarios each of them best suits, and parameters users can configure to achieve better search performance. For on-disk indexes, see **[On-disk Index](disk_index.md)**.

Indexing is the process of efficiently organizing data, and it plays a major role in making similarity search useful by dramatically accelerating time-consuming queries on large datasets.

To improve query performance, you can [specify an index type](index-vector-fields.md) for each vector field.

<div class="alert note">
Currently, a vector field only supports one index type. Milvus automatically deletes the old index when switching the index type.
</div>

## ANNS vector indexes

Most of the vector index types supported by Milvus use approximate nearest neighbors search (ANNS) algorithms. Compared with accurate retrieval, which is usually very time-consuming, the core idea of ANNS is no longer limited to returning the most accurate result, but only searching for neighbors of the target. ANNS improves retrieval efficiency by sacrificing accuracy within an acceptable range.

According to the implementation methods, the ANNS vector index can be categorized into four types: Tree-based, Graph-based, Hash-based, and Quantization-based.

## Indexes supported in Milvus

Milvus supports various index types, which are categorized by the type of vector embeddings they handle: **floating-point embeddings** (also known as floating point vectors or dense vectors), **binary embeddings** (also known as binary vectors), and **sparse embeddings** (also known as sparse vectors).

<div class="filter">
  <a href="#floating">Floating-point embeddings</a>
  <a href="#binary">Binary embeddings</a>
  <a href="#sparse">Sparse embeddings</a>
</div>

<div class="filter-floating">

### Indexes for floating-point embeddings

For 128-dimensional floating-point embeddings (vectors), the storage they take up is 128 * the size of float = 512 bytes. And the [distance metrics](metric.md) used for float-point embeddings are Euclidean distance (`L2`) and Inner product (`IP`).

These types of indexes include `FLAT`, `IVF_FLAT`, `IVF_PQ`, `IVF_SQ8`, `HNSW`, `HNSW_SQ`, `HNSW_PQ`, `HNSW_PRQ`, and `SCANN` for CPU-based ANN searches.

</div>

<div class="filter-binary">

### Indexes for binary embeddings 

For 128-dimensional binary embeddings, the storage they take up is 128 / 8 = 16 bytes. And the distance metrics used for binary embeddings are `JACCARD` and `HAMMING`.

This type of indexes include `BIN_FLAT` and `BIN_IVF_FLAT`.

</div>

<div class="filter-sparse">

### Indexes for sparse embeddings

Indexes for sparse embeddings support the `IP` and `BM25` (for full-text search) metrics only.

Index type supported for sparse embeddings: `SPARSE_INVERTED_INDEX`.

<div class="alert note">

From Milvus 2.5.4 onward, `SPARSE_WAND` is being deprecated. Instead, it is recommended to use `"inverted_index_algo": "DAAT_WAND"` for equivalency while maintaining compatibility. For more information, refer to [Sparse Vector](sparse_vector.md#Set-index-params-for-vector-field).

</div>

</div>

<div class="filter-floating table-wrapper">

<table id="floating">
<thead>
  <tr>
    <th>Supported index</th>
    <th>Classification</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>Relatively small dataset</li>
        <li>Requires a 100% recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_FLAT</td>
    <td>N/A</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Requires a recall rate as high as possible</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>IVF_SQ8</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>Very high-speed query</li>
        <li>Limited memory resources</li>
        <li>Accepts minor compromise in recall rate</li>
      </ul>
    </td>
  </tr>  
  <tr>
    <td>IVF_PQ</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>High-speed query</li>
        <li>Limited memory resources</li>
        <li>Accepts minor compromise in recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW</td>
    <td>Graph-based index</td>
    <td>
      <ul>
        <li>Very high-speed query</li>
        <li>Requires a recall rate as high as possible</li>
        <li>Large memory resources</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>HNSW_SQ</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>Very high-speed query</li>
        <li>Limited memory resources</li>
        <li>Accepts minor compromise in recall rate</li>
      </ul>
    </td>
  </tr>
    <tr>
    <td>HNSW_PQ</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>Medium speed query</li>
        <li>Very limited memory resources</li>
        <li>Accepts minor compromise in recall rate</li>
      </ul>
    </td>
  </tr>
    </tr>
    <tr>
    <td>HNSW_PRQ</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>Medium speed query</li>
        <li>Very limited memory resources</li>
        <li>Accepts minor compromise in recall rate</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>SCANN</td>
    <td>Quantization-based index</td>
    <td>
      <ul>
        <li>Very high-speed query</li>
        <li>Requires a recall rate as high as possible</li>
        <li>Large memory resources</li>
      </ul>
    </td>
  </tr>
</tbody>
</table>

</div>

<div class="filter-binary table-wrapper">

<table id="binary">
<thead>
  <tr>
    <th>Supported index</th>
    <th>Classification</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>BIN_FLAT</td>
    <td>Quantization-based index</td>
    <td><ul>
      <li>Depends on relatively small datasets.</li>
      <li>Requires perfect accuracy.</li>
      <li>No compression applies.</li>
      <li>Guarantee exact search results.</li>
    </ul></td>
  </tr>
  <tr>
    <td>BIN_IVF_FLAT</td>
    <td>Quantization-based index</td>
    <td><ul>
      <li>High-speed query</li>
      <li>Requires a recall rate as high as possible</li>
    </ul></td>
  </tr>
</tbody>
</table>

</div>

<div class="filter-sparse table-wrapper">

<table id="sparse">
<thead>
  <tr>
    <th>Supported index</th>
    <th>Classification</th>
    <th>Scenario</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td>SPARSE_INVERTED_INDEX</td>
    <td>Inverted index</td>
    <td><ul>
      <li>Depends on relatively small datasets.</li>
      <li>Requires a 100% recall rate.</li>
    </ul></td>
  </tr>
</tbody>
</table>

</div>

<div class="filter-floating">

### FLAT

For vector similarity search applications that require perfect accuracy and depend on relatively small (million-scale) datasets, the FLAT index is a good choice. FLAT does not compress vectors, and is the only index that can guarantee exact search results. Results from FLAT can also be used as a point of comparison for results produced by other indexes that have less than 100% recall.

FLAT is accurate because it takes an exhaustive approach to search, which means for each query the target input is compared to every set of vectors in a dataset. This makes FLAT the slowest index on our list, and poorly suited for querying massive vector data. There are no parameters required for the FLAT index in Milvus, and using it does not need extra index buidling.

- Search parameters

  | Parameter     | Description                            | Range                               |
  | ------------- | -------------------------------------- | ----------------------------------- |
  | `metric_type` | [Optional] The chosen distance metric. | See [Supported Metrics](metric.md). |

### IVF_FLAT

IVF_FLAT divides vector data into `nlist` cluster units, and then compares distances between the target input vector and the center of each cluster. Depending on the number of clusters the system is set to query (`nprobe`), similarity search results are returned based on comparisons between the target input and the vectors in the most similar cluster(s) only — drastically reducing query time.

By adjusting `nprobe`, an ideal balance between accuracy and speed can be found for a given scenario. Results from the [IVF_FLAT performance test](https://zilliz.com/blog/Accelerating-Similarity-Search-on-Really-Big-Data-with-Vector-Indexing) demonstrate that query time increases sharply as both the number of target input vectors (`nq`), and the number of clusters to search (`nprobe`), increase.

IVF_FLAT is the most basic IVF index, and the encoded data stored in each unit is consistent with the original data.

- Index building parameters

   | Parameter | Description             | Range      | Default Value |
   | --------- | ----------------------- | ---------- | ------------- |
   | `nlist`   | Number of cluster units | [1, 65536] | 128 |

- Search parameters

  - Common search

    | Parameter                  | Description                                             | Range      | Default Value |
    |----------------------------|---------------------------------------------------------|------------|---------------|
    | `nprobe`                   | Number of units to query                                | [1, nlist] | 8             |

  - Range search

    | Parameter                  | Description                                             | Range      | Default Value |
    |----------------------------|---------------------------------------------------------|------------|---------------|
    | `max_empty_result_buckets` | Maximum number of buckets not returning any search results.<br/>This is a range-search parameter and terminates the search process whilst the number of consecutive empty buckets reaches the specified value.<br/>Increasing this value can improve recall rate at the cost of increased search time. | [1, 65535] | 2  |

### IVF_SQ8

IVF_FLAT does not perform any compression, so the index files it produces are roughly the same size as the original, raw non-indexed vector data. For example, if the original 1B SIFT dataset is 476 GB, its IVF_FLAT index files will be slightly smaller (~470 GB). Loading all the index files into memory will consume 470 GB of storage.

When disk, CPU, or GPU memory resources are limited, IVF_SQ8 is a better option than IVF_FLAT. This index type can convert each FLOAT (4 bytes) to UINT8 (1 byte) by performing Scalar Quantization (SQ). This reduces disk, CPU, and GPU memory consumption by 70–75%. For the 1B SIFT dataset, the IVF_SQ8 index files require just 140 GB of storage.

- Index building parameters

   | Parameter | Description             | Range      |
   | --------- | ----------------------- | ---------- |
   | `nlist`   | Number of cluster units | [1, 65536] |

- Search parameters

  - Common search

    | Parameter | Description              | Range           | Default Value |
    | --------- | ------------------------ | --------------- | ------------- |
    | `nprobe`  | Number of units to query | [1, nlist]      | 8 |

  - Range search

    | Parameter                  | Description                                             | Range      | Default Value |
    |----------------------------|---------------------------------------------------------|------------|---------------|
    | `max_empty_result_buckets` | Maximum number of buckets not returning any search results.<br/>This is a range-search parameter and terminates the search process whilst the number of consecutive empty buckets reaches the specified value.<br/>Increasing this value can improve recall rate at the cost of increased search time. | [1, 65535] | 2  |

### IVF_PQ

`PQ` (Product Quantization) uniformly decomposes the original high-dimensional vector space into Cartesian products of `m` low-dimensional vector spaces, and then quantizes the decomposed low-dimensional vector spaces. Instead of calculating the distances between the target vector and the center of all the units, product quantization enables the calculation of distances between the target vector and the clustering center of each low-dimensional space and greatly reduces the time complexity and space complexity of the algorithm.

IVF\_PQ performs IVF index clustering before quantizing the product of vectors. Its index file is even smaller than IVF\_SQ8, but it also causes a loss of accuracy during searching vectors.

<div class="alert note">

Index building parameters and search parameters vary with Milvus distribution. Select your Milvus distribution first.

</div>

- Index building parameters

  | Parameter | Description                               | Range               |
  | --------- | ----------------------------------------- | ------------------- |
  | `nlist`   | Number of cluster units                   | [1, 65536]          |
  | `m`       | Number of factors of product quantization | `dim mod m == 0` |
  | `nbits`   | [Optional] Number of bits in which each low-dimensional vector is stored. | [1, 64] (8 by default) |

- Search parameters

  - Common search

    | Parameter | Description              | Range           | Default Value |
    | --------- | ------------------------ | --------------- | ------------- |
    | `nprobe`  | Number of units to query | [1, nlist]      | 8 |

  - Range search

    | Parameter                  | Description                                             | Range      | Default Value |
    |----------------------------|---------------------------------------------------------|------------|---------------|
    | `max_empty_result_buckets` | Maximum number of buckets not returning any search results.<br/>This is a range-search parameter and terminates the search process whilst the number of consecutive empty buckets reaches the specified value.<br/>Increasing this value can improve recall rate at the cost of increased search time. | [1, 65535] | 2  |

### SCANN

ScaNN (Scalable Nearest Neighbors) is similar to IVF_PQ in terms of vector clustering and product quantization. What makes them different lies in the implementation details of product quantization and the use of SIMD (Single-Instruction / Multi-data) for efficient calculation.

- Index building parameters

  | Parameter       | Description                                  | Range                                  |
  |-----------------|----------------------------------------------|----------------------------------------|
  | `nlist`         | Number of cluster units                      | [1, 65536]                             |
  | `with_raw_data` | Whether to include the raw data in the index | `True` or `False`. Defaults to `True`. |

  <div class="alert note">

  Unlike IVF_PQ, default values apply to `m` and `nbits` for optimized performance.

  </div>

- Search parameters

  - Common search

    | Parameter | Description              | Range      | Default value |
    | --------- | ------------------------ | ---------- | ------------- |
    | `nprobe`  | Number of units to query | [1, nlist] |               |
    | `reorder_k` | Number of candidate units to query | [`top_k`, ∞] | `top_k` |

  - Range search

    | Parameter                  | Description                                             | Range      | Default Value |
    |----------------------------|---------------------------------------------------------|------------|---------------|
    | `max_empty_result_buckets` | Maximum number of buckets not returning any search results.<br/>This is a range-search parameter and terminates the search process whilst the number of consecutive empty buckets reaches the specified value.<br/>Increasing this value can improve recall rate at the cost of increased search time. | [1, 65535] | 2  |

### HNSW

HNSW (Hierarchical Navigable Small World Graph) is a graph-based indexing algorithm. It builds a multi-layer navigation structure for an image according to certain rules. In this structure, the upper layers are more sparse and the distances between nodes are farther; the lower layers are denser and the distances between nodes are closer. The search starts from the uppermost layer, finds the node closest to the target in this layer, and then enters the next layer to begin another search. After multiple iterations, it can quickly approach the target position.

In order to improve performance, HNSW limits the maximum degree of nodes on each layer of the graph to `M`. In addition, you can use `efConstruction` (when building index) or `ef` (when searching targets) to specify a search range.

- Index building parameters

  | Parameter        | Description                                                                                                                                                                           | Range        | Default Value |
  |------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|---------------|
  | `M`              | M defines tha maximum number of outgoing connections in the graph. Higher M leads to higher accuracy/run_time at fixed ef/efConstruction.                                             | [2, 2048]    | None          |
  | `efConstruction` | ef_construction controls index search speed/build speed tradeoff. Increasing the efConstruction parameter may enhance index quality, but it also tends to lengthen the indexing time. | [1, int_max] | None          |

- Search parameters

  | Parameter | Description                                                                                                | Range              | Default Value |
  |-----------|------------------------------------------------------------------------------------------------------------|--------------------|---------------|
  | `ef`      | Parameter controlling query time/accuracy trade-off. Higher `ef` leads to more accurate but slower search. | [`top_k`, int_max] | None          |

### HNSW_SQ

Scalar Quantization (SQ) is a technique used to discretize floating-point data into a finite set of values based on their magnitude. For example, **SQ6** represents quantization into \(2^6 = 64\) discrete values, where each floating-point number is encoded using 6 bits. Similarly, **SQ8** quantizes the data into \(2^8 = 256\) discrete values, with each floating-point number represented by 8 bits. This quantization reduces the memory footprint while preserving the essential structure of the data for efficient processing.

Combined with SQ, HNSW_SQ offers a controllable trade-off between index size and accuracy, while maintaining high query-per-second (QPS) performance. Compared to standard HNSW, it results in a modest increase in index construction time.

- Index building parameters

  | Parameter        | Description                                                                                                                                                                           | Range                       | Default Value |
  |------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------|---------------|
  | `M`              | M defines tha maximum number of outgoing connections in the graph. Higher M leads to higher accuracy/run_time at fixed ef/efConstruction.                                             | [2, 2048]                   | None          |
  | `efConstruction` | ef_construction controls index search speed/build speed tradeoff. Increasing the efConstruction parameter may enhance index quality, but it also tends to lengthen the indexing time. | [1, int_max]                | None          |
  | `sq_type`        | Scalar quantizer type.                                                                                                                                                                | `SQ6`,`SQ8`, `BF16`, `FP16` | `SQ8`         |
  | `refine`      | Whether refined data is reserved during index building.                                                               | `true`, `false`                      | `false`       | 
  | `refine_type` | The data type of the refine index.                                                                         | `SQ6`, `SQ8`, `BF16`, `FP16`, `FP32` | None          | 

- Search parameters

  | Parameter     | Description                                                                                                | Range                                | Default Value |
  |---------------|------------------------------------------------------------------------------------------------------------|--------------------------------------|---------------|
  | `ef`          | Parameter controlling query time/accuracy trade-off. Higher `ef` leads to more accurate but slower search. | [`top_k`, int_max]                   | None          |
  | `refine_k`    | The magnification factor of refine compared to *k*.                                                        | [1, *float_max*)                     | `1`           |


### HNSW_PQ

The basic idea of PQ is to split the vector into `m` sub-vectors, each of which will find 2^{*nbits*} centroids based on kmeans, and each sub-vector will select the nearest centroid as its approximate sub-vector. Then we record all the centriods, so each subvector can be encoded as `nbits`, and a floating vector of length `dim` can be encoded as *m ⋅ nbits* bits.

Combined with PQ, HNSW_PQ offers a controllable tradeoff between index size and accuracy, but it has a lower QPS value and a higher recall rate than HNSW_SQ for the same compression rate. Compared with HNSW_SQ, it takes longer to build the index.

- Index building parameters

  | Parameter        | Description                                                                                                                                                                           | Range        | Default Value |
  |------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|---------------|
  | `M`              | M defines tha maximum number of outgoing connections in the graph. Higher M leads to higher accuracy/run_time at fixed ef/efConstruction.                                             | [2, 2048]    | None          |
  | `efConstruction` | ef_construction controls index search speed/build speed tradeoff. Increasing the efConstruction parameter may enhance index quality, but it also tends to lengthen the indexing time. | [1, int_max] | None          |
  | `m`              | The number of sub-vector groups to split the vector into.                                                                                                                             | [1, 65536]   | 32            |
  | `nbits`          | The number of bits into which each group of sub-vectors is quantized.                                                                                                                 | [1, 24]      | 8             |
  | `refine`      | Whether refined data is reserved during index building.                                                               | `true`, `false`                      | `false`       |
  | `refine_type` | The data type of the refine index.                                                                         | `SQ6`, `SQ8`, `BF16`, `FP16`, `FP32` | None          |

- Search parameters

  | Parameter     | Description                                                                                                | Range                                | Default Value |
  |---------------|------------------------------------------------------------------------------------------------------------|--------------------------------------|---------------|
  | `ef`          | Parameter controlling query time/accuracy trade-off. Higher `ef` leads to more accurate but slower search. | [`top_k`, int_max]                   | None          |
  | `refine_k`    | The magnification factor of refine compared to *k*.                                                        | [1, *float_max*)                     | `1`           |

### HNSW_PRQ

PRQ is similar to PQ, and also divides the vector into `m` groups. Each sub-vector will be encoded as `nbits`. After completing a pq quantization, it will calculate the residual between the vector and the pq quantized vector, and apply pq quantization to the residual vector. A total of `nrq` complete pq quantizations will be performed, so a floating vector of length `dim` will be encoded as *m ⋅ nbits ⋅ nrq* bits.

Combined with a Product Residual Quantizer (PRQ), HNSW_PRQ offers an even higher controllable tradeoff between index size and accuracy. It has almost equivalent QPS value and a higher recall rate than HNSW_PQ for the same compression rate. Compared with HNSW_PQ, the time to build the index may increase several times.

- Index building parameters

  | Parameter        | Description                                                                                                                                                                           | Range        | Default Value |
  |------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------------|---------------|
  | `M`              | M defines tha maximum number of outgoing connections in the graph. Higher M leads to higher accuracy/run_time at fixed ef/efConstruction.                                             | [2, 2048]    | None          |
  | `efConstruction` | ef_construction controls index search speed/build speed tradeoff. Increasing the efConstruction parameter may enhance index quality, but it also tends to lengthen the indexing time. | [1, int_max] | None          |
  | `m`              | The number of sub-vector groups to split the vector into.                                                                                                                             | [1, 65536]   | 32            |
  | `nbits`          | The number of bits into which each group of sub-vectors is quantized.                                                                                                                 | [1, 24]      | 8             |
  | `nrq`            | The number of residual subquantizers.                                                                                                                                                 | [1, 16]      | 2             |
  | `refine`      | Whether refined data is reserved during index building.                                                               | `true`, `false`                      | `false`       |
  | `refine_type` | The data type of the refine index.                                                                         | `SQ6`, `SQ8`, `BF16`, `FP16`, `FP32` | None          |

- Search parameters

  | Parameter     | Description                                                                                                | Range                                | Default Value |
  |---------------|------------------------------------------------------------------------------------------------------------|--------------------------------------|---------------|
  | `ef`          | Parameter controlling query time/accuracy trade-off. Higher `ef` leads to more accurate but slower search. | [`top_k`, int_max]                   | None          |
  | `refine_k`    | The magnification factor of refine compared to *k*.                                                        | [1, *float_max*)                     | `1`           |

</div>

<div class="filter-binary">

### BIN_FLAT

This index is exactly the same as FLAT except that this can only be used for binary embeddings.

For vector similarity search applications that require perfect accuracy and depend on relatively small (million-scale) datasets, the BIN_FLAT index is a good choice. BIN_FLAT does not compress vectors, and is the only index that can guarantee exact search results. Results from BIN_FLAT can also be used as a point of comparison for results produced by other indexes that have less than 100% recall.

BIN_FLAT is accurate because it takes an exhaustive approach to search, which means for each query the target input is compared to vectors in a dataset. This makes BIN_FLAT the slowest index on our list, and poorly suited for querying massive vector data. There are no parameters for the BIN_FLAT index in Milvus, and using it does not require data training or additional storage.

- Search parameters

  | Parameter     | Description                            | Range                               |
  | ------------- | -------------------------------------- | ----------------------------------- |
  | `metric_type` | [Optional] The chosen distance metric. | See [Supported Metrics](metric.md). |

### BIN_IVF_FLAT

This index is exactly the same as IVF_FLAT except that this can only be used for binary embeddings.

BIN_IVF_FLAT divides vector data into `nlist` cluster units, and then compares distances between the target input vector and the center of each cluster. Depending on the number of clusters the system is set to query (`nprobe`), similarity search results are returned based on comparisons between the target input and the vectors in the most similar cluster(s) only — drastically reducing query time.

By adjusting `nprobe`, an ideal balance between accuracy and speed can be found for a given scenario. Query time increases sharply as both the number of target input vectors (`nq`), and the number of clusters to search (`nprobe`), increase.

BIN_IVF_FLAT is the most basic BIN_IVF index, and the encoded data stored in each unit is consistent with the original data.

- Index building parameters

   | Parameter | Description             | Range      |
   | --------- | ----------------------- | ---------- |
   | `nlist`   | Number of cluster units | [1, 65536] |

- Search parameters

  - Common search

    | Parameter | Description              | Range           | Default Value |
    | --------- | ------------------------ | --------------- | ------------- |
    | `nprobe`  | Number of units to query | [1, nlist]      | 8 |

  - Range search

    | Parameter                  | Description                                             | Range      | Default Value |
    |----------------------------|---------------------------------------------------------|------------|---------------|
    | `max_empty_result_buckets` | Maximum number of buckets not returning any search results.<br/>This is a range-search parameter and terminates the search process whilst the number of consecutive empty buckets reaches the specified value.<br/>Increasing this value can improve recall rate at the cost of increased search time. | [1, 65535] | 2  |

</div>

<div class="filter-sparse">

### SPARSE_INVERTED_INDEX

Each dimension maintains a list of vectors that have a non-zero value at that dimension. During search, Milvus iterates through each dimension of the query vector and computes scores for vectors that have non-zero values in those dimensions.

- Index building parameters

  | Parameter        | Description                | Range        |
  | ---------------- | -------------------------- | ------------ |
  | `inverted_index_algo` | The algorithm used for building and querying the index. For details, refer to [Sparse Vector](sparse_vector.md#Set-index-params-for-vector-field). | `DAAT_MAXSCORE` (default), `DAAT_WAND`, `TAAT_NAIVE`  |
  | `bm25_k1`          | Controls the term frequency saturation. Higher values increase the importance of term frequencies in document ranking. | [1.2, 2.0] |
  | `bm25_b`           | Controls the extent to which document length is normalized. Defaults to 0.75. | [0, 1] |

  <div class="alert note">

  The `drop_ratio_build` parameter is deprecated since Milvus v2.5.4, which can still be accepted during index building, but will no longer have actual effect on the index.

  </div>

- Search parameters

    | Parameter           | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Range  |
    |---------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|--------|
    | `drop_ratio_search` | The proportion of small vector values that are excluded during the search process. This option allows fine-tuning of the search process by specifying the ratio of the smallest values in the query vector to ignore. It helps balance search precision and performance. The smaller the value set for `drop_ratio_search`, the less these small values contribute to the final score. By ignoring some small values, search performance can be improved with minimal impact on accuracy. | [0, 1] |

</div>

## FAQ

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

## What's next

- Learn more about the [Similarity Metrics](metric.md) supported in Milvus.
