---
id: ivf-pq.md
order: 2
summary: This article will introduce the IVF_PQ index in Milvus.
title: IVF_PQ
---

# IVF_PQ

The **IVF_PQ** index is a **quantization-based** indexing algorithm for approximate nearest neighbor search in high-dimensional spaces. While not as fast as some graph-based methods, **IVF_PQ** often requires significantly less memory, making it a practical choice for large datasets.

## Overview

The **IVF_PQ** stands for **Inverted File with Product Quantization**, a hybrid approach that combines indexing and compression for efficient vector search and retrieval. It leverages two core components: **Inverted File (IVF)** and **Product Quantization (PQ)**.

### IVF

IVF is like creating an index in a book. Instead of scanning every page (or, in our case, every vector), you look up specific keywords (clusters) in the index to quickly find the relevant pages (vectors). In our scenario, vectors are grouped into clusters, and the algorithm will search within a few clusters that are close to the query vector.

Here's how it works:

1. **Clustering:** Your vector dataset is divided into a specified number of clusters, using a clustering algorithm like k-means. Each cluster has a centroid (a representative vector for the cluster).
2. **Assignment:** Each vector is assigned to the cluster whose centroid is closest to it.
3. **Inverted Index:** An index is created, mapping each cluster centroid to the list of vectors assigned to that cluster.
4. **Search:** When you search for nearest neighbors, the search algorithm compares your query vector with the cluster centroids and selects the most promising cluster(s). The search is then narrowed down to the vectors within those selected clusters.

To learn more about its technical details , refer to [IVF_FLAT](ivf-flat.md).

### PQ

**Product Quantization (PQ)** is a compression method for high-dimensional vectors that significantly reduces storage requirements while enabling fast similarity search operations.

The PQ process involves these key stages:

![pq-process-1](../../../../../assets/ivf-pq-1.png)

1. **Dimension decomposition**: The algorithm begins by decomposing each high-dimensional vector into `m` equal-sized sub-vectors. This decomposition transforms the original D-dimensional space into `m` disjoint subspaces, where each subspace contains *D/m* dimensions. The parameter `m` controls the granularity of the decomposition and directly influences the compression ratio.
2. **Subspace codebook generation**: Within each subspace, the algorithm applies [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering) to learn a set of representative vectors (centroids). These centroids collectively form a codebook for that subspace. The number of centroids in each codebook is determined by the parameter `nbits`, where each codebook contains 2^nbits centroids. For example, if `nbits = 8`, each codebook will contain 256 centroids. Each centroid is assigned a unique index with `nbits` bits.
3. **Vector** **quantization**: For each sub-vector in the original vector, PQ identifies its nearest centroid within the corresponding subspace using a specific metric type. This process effectively maps each sub-vector to its closest representative vector in the codebook. Instead of storing the full sub-vector coordinates, only the index of the matched centroid is retained.
4. **Compressed representation**: The final compressed representation consists of `m` indices, one from each subspace, collectively referred to as **PQ codes**. This encoding reduces the storage requirement from *D × 32* bits (assuming 32-bit floating-point numbers) to *m* × *nbits* bits, achieving substantial compression while preserving the ability to approximate vector distances.

For more details on parameter tuning and optimization, refer to [Index params](#index-params).

<div class="alert note">

**Compression Example**

Consider a vector with *D = 128* dimensions using 32-bit floating-point numbers. With PQ parameters *m = 64* (sub-vectors) and *nbits = 8* (thus *k =* 2^8 *= 256* centroids per subspace), we can compare the storage requirements:

- Original vector: 128 dimensions × 32 bits = 4,096 bits
- PQ-compressed vector: 64 sub-vectors × 8 bits = 512 bits

This represents an 8x reduction in storage requirements.

</div>

**Distance computation with PQ**

When performing similarity search with a query vector, PQ enables efficient distance computation through the following steps:

1. **Query preprocessing**
    1. The query vector is decomposed into `m` sub-vectors, matching the original PQ decomposition structure.
    2. For each query sub-vector and its corresponding codebook (containing 2^nbits centroids), compute and store distances to all centroids.
    3. This generates `m` lookup tables, where each table contains 2^nbits distances.
2. **Distance approximation**
    
    For any database vector represented by PQ codes, its approximate distance to the query vector is computed as follows:
    
    1. For each of the `m` sub-vectors, retrieve the pre-computed distance from the corresponding lookup table using the stored centroid index.
    2. Sum these `m` distances to obtain the approximate distance based on a specific metric type (e.g. Euclidean distance).

![pq-process-1](../../../../../assets/ivf-pq-2.png)

### IVF + PQ

The **IVF_PQ** index combines the strengths of **IVF** and **PQ** to accelerate searches. The process works in two steps:

1. **Coarse filtering with IVF**: IVF partitions the vector space into clusters, reducing the search scope. Instead of evaluating the entire dataset, the algorithm focuses only on the clusters closest to the query vector.
2. **Fine-grained comparison with PQ**: Within the selected clusters, PQ uses compressed and quantized vector representations to compute approximate distances quickly.

The performance of the **IVF_PQ** index is significantly impacted by the parameters that control both the IVF and PQ algorithms. Tuning these parameters is crucial to achieve the optimal results for a given dataset and application. More detailed information about these parameters and how to tune them can be found in [Index params](#index-params).

## Build index

To build an `IVF_PQ` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type`, `metric_type`, and additional parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="IVF_PQ", # Type of the index to create
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    params={
        "m": 4, # Number of sub-vectors to split eahc vector into
    } # Index building params
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `IVF_PQ`.
- `metric_type`: The method used to calculate the distance between vectors. Supported values include `COSINE`, `L2`, and `IP`. For details, refer to [Metric Types](metric.md).
- `params`: Additional configuration options for building the index.
    - `m`: Number of sub-vectors to split the vector into.
    
    To learn more building parameters available for the `IVF_PQ` index, refer to [Index building params](#Index-building-params).
    

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
search_params = {
    "params": {
        "nprobe": 10, # Number of clusters to search
    }
}

res = MilvusClient.search(
    collection_name="your_collection_name", # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # Query vector
    limit=3,  # TopK results to return
    search_params=search_params
)

```

In this configuration:

- `params`: Additional configuration options for searching on the index.
    - `nprobe`: Number of clusters to search for.
    
    To learn more search parameters available for the `IVF_PQ` index, refer to [Index-specific search params](#index-specific-search-params).
    

## Index params

This section provides an overview of the parameters used for building an index and performing searches on the index.

### Index building params

The following table lists the parameters that can be configured in `params` when [building an index](#Build-index).

|  | **Parameter** | **Description** | **Value Range** | **Tuning Suggestion** |
| --- | --- | --- | --- | --- |
| IVF | `nlist` | The number of clusters to create using the k-means algorithm during index building. | **Type**: Integer<br>**Range**: [1, 65536]<br>**Default value**: `128` | Larger `nlist` values improve recall by creating more refined clusters but increase index building time. Optimize based on dataset size and available resources.<br>In most cases, we recommend you set a value within this range: [32, 4096]. |
| PQ | `m` | The number of sub-vectors (used for quantization) to divide each high-dimensional vector into during the quantization process. | **Type**: Integer<br>**Range**: [1, 65536]<br>**Default value**: None | A higher `m` value can improve accuracy, but it also increases the computational complexity and memory usage.<br>`m` must be a divisor of the vector dimension (*D*) to ensure proper decomposition. A commonly recommended value is *m = D/2*.<br>In most cases, we recommend you set a value within this range: [D/8, D]. |
|  | `nbits` | The number of bits used to represent each sub-vector's centroid index in the compressed form. It directly determines the size of each codebook.Each codebook will contain 2^nbits centroids. For example, if `nbits` is set to 8, each sub-vector will be represented by an 8-bit centroid's index. This allows for 2^8 (256) possible centroids in the codebook for that sub-vector. | **Type**: Integer<br>**Range**: [1, 64]<br>**Default value**: `8` | A higher `nbits` value allows for larger codebooks, potentially leading to more accurate representations of the original vectors. However, it also means using more bits to store each index, resulting in less compression.<br>In most cases, we recommend you set a value within this range: [1, 16]. |

### Index-specific search params

The following table lists the parameters that can be configured in `search_params.params` when [searching on the index](#Search-on-index).

|  | **Parameter** | **Description** | **Value Range** | **Tuning Suggestion** |
| --- | --- | --- | --- | --- |
| IVF | `nprobe` | The number of clusters to search for candidates. | **Type**: Integer<br>**Range**: [1, *nlist*]<br>**Default value**: `8` | Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency.<br>Set `nprobe` proportionally to `nlist` to balance speed and accuracy.<br>In most cases, we recommend you set a value within this range: [1, nlist]. |
