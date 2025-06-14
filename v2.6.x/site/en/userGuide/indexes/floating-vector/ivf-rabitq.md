---
id: ivf-rabitq.md
title: "IVF_RABITQ"
summary: "The IVF_RABITQ index is a binary quantization-based indexing algorithm that quantizes FP32 vectors into binary representations. It provides a highly configurable compression ratio with optional refinement for improved recall rates, making it suitable for applications requiring significant storage optimization."
beta: Milvus 2.6.x
---

# IVF_RABITQ

The **IVF_RABITQ** index is a **binary quantization-based** indexing algorithm that quantizes FP32 vectors into binary representations. This index offers exceptional storage efficiency with a 1-to-32 compression ratio while maintaining relatively good recall rates. It supports optional refinement to achieve higher recall at the cost of additional storage, making it a versatile replacement for [IVF_SQ8](ivf-sq8.md) and [IVF_FLAT](ivf-flat.md) in memory-constrained scenarios.

## Overview

The **IVF_RABITQ** stands for **Inverted File with RaBitQ quantization**, combining two powerful techniques for efficient vector search and storage.

### IVF

**Inverted File (IVF)** organizes the vector space into manageable regions using [k-means clustering](https://en.wikipedia.org/wiki/K-means_clustering). Each cluster is represented by a centroid, serving as a reference point for the vectors within that cluster. This clustering approach reduces the search space by allowing the algorithm to focus only on the most relevant clusters during query processing.

To learn more about IVF technical details, refer to [IVF_FLAT](ivf-flat.md).

### RaBitQ

**RaBitQ** is a state-of-the-art binary quantization method with theoretical guarantees, introduced in the research paper "RaBitQ: Quantizing High-Dimensional Vectors with a Theoretical Error Bound for Approximate Nearest Neighbor Search" by Jianyang Gao and Cheng Long.

RaBitQ introduces several innovative concepts:

**Angular Information Encoding**: Unlike traditional spatial encoding, RaBitQ encodes angular information through vector normalization. In IVF_RABITQ, data vectors are normalized against their nearest IVF centroid, enhancing the precision of the quantization process.

**Theoretical Foundation**: The core distance approximation formula is:

$$ \lVert \mathbf{o_r} - \mathbf{q_r} \rVert^2 \approx \lVert \mathbf{o_r} - \mathbf{c_o} \rVert^2 + \lVert \mathbf{q_r} - \mathbf{c_o} \rVert^2 - 2 \cdot C(\mathbf{o_r}, \mathbf{c_o}) \cdot \langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle + C_1(\mathbf{o_r}, \mathbf{c_o}) $$

Where:
- $\mathbf{o_r}$ is a data vector from the dataset
- $\mathbf{q_r}$ is a query vector
- $\mathbf{c_o}$ is the nearest IVF centroid vector for $\mathbf{o_r}$
- $C(\mathbf{o_r}, \mathbf{c_o})$ and $C_1(\mathbf{o_r}, \mathbf{c_o})$ are precomputed constants
- $\tilde{\mathbf{o}}$ is the quantized binary vector stored in the index
- $\langle \tilde{\mathbf{o}}, \mathbf{q_r} - \mathbf{c_o} \rangle$ represents the dot-product operation

**Computational Efficiency**: The binary nature of $\tilde{\mathbf{o}}$ makes distance calculations extremely fast, particularly benefiting from modern CPU architectures with dedicated `AVX-512 VPOPCNTDQ` instructions on Intel Ice Lake+ or AMD Zen 4+ processors.

**Algorithmic Enhancements**: RaBitQ integrates effectively with established techniques like the [`FastScan` approach](https://www.vldb.org/pvldb/vol9/p288-andre.pdf) and [random rotations](https://github.com/facebookresearch/faiss/wiki/Pre--and-post-processing) for improved performance.

### IVF + RaBitQ

The **IVF_RABITQ** index combines IVF's efficient clustering with RaBitQ's advanced binary quantization:

1. **Coarse Filtering**: IVF partitions the vector space into clusters, significantly reducing the search scope by focusing on the most relevant cluster regions.

2. **Binary Quantization**: Within each cluster, RaBitQ compresses vectors into binary representations while preserving essential distance relationships through theoretical guarantees.

3. **Optional Refinement**: When enabled, the index stores additional refined data using higher precision formats (SQ6, SQ8, FP16, BF16, or FP32) to improve recall rates at the cost of increased storage.

Milvus implements IVF_RABITQ using the following FAISS factory strings:
- With refinement: `"RR({dim}),IVF{nlist},RaBitQ,Refine({refine_index})"`
- Without refinement: `"RR({dim}),IVF{nlist},RaBitQ"`

## Build index

To build an `IVF_RABITQ` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type`, `metric_type`, and additional parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="IVF_RABITQ", # Type of the index to create
    # highlight-next-line
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    # highlight-start
    params={
        "nlist": 1024, # Number of clusters for the index
        "refine": True, # Enable refinement for higher recall
        "refine_type": "SQ8" # Refinement data format
    } # Index building params
    # highlight-end
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `IVF_RABITQ`.

- `metric_type`: The method used to calculate the distance between vectors. Supported values include `COSINE`, `L2`, and `IP`. For details, refer to [Metric Types](metric.md).

- `params`: Additional configuration options for building the index. For details, refer to [Index building params](ivf-rabitq.md#Index-building-params).

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
search_params = {
    # highlight-start
    "params": {
        "nprobe": 128, # Number of clusters to search
        "rbq_query_bits": 0, # Query vector quantization bits
        "refine_k": 1 # Refinement magnification factor
    }
    # highlight-end
}

res = MilvusClient.search(
    collection_name="your_collection_name", # Collection name
    anns_field="vector_field", # Vector field name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]], # Query vector
    limit=3, # TopK results to return
    # highlight-next-line
    search_params=search_params
)
```

In this configuration:

- `params`: Additional configuration options for searching on the index. For details, refer to [Index-specific search params](ivf-rabitq.md#Index-specific-search-params).

<div class="alert note">

The IVF_RABITQ index heavily relies on the `popcount` hardware instruction for optimal performance. Modern CPU architectures such as Intel IceLake+ or AMD Zen 4+ with `AVX512VPOPCNTDQ` instruction sets provide significant performance improvements for RaBitQ operations.

</div>

## Index params

This section provides an overview of the parameters used for building an index and performing searches on the index.

### Index building params

The following table lists the parameters that can be configured in `params` when [building an index](ivf-rabitq.md#Build-index).

<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code>nlist</code></p></td>
     <td><p>The number of clusters to create using the k-means algorithm during index building. Each cluster, represented by a centroid, stores a list of vectors. Increasing this parameter reduces the number of vectors in each cluster, creating smaller, more focused partitions.</p></td>
     <td><p><strong>Type</strong>: Integer<br><strong>Range</strong>: [1, 65536]<br><strong>Default value</strong>: <code>128</code></p></td>
     <td><p>Larger <code>nlist</code> values improve recall by creating more refined clusters but increase index building time. Optimize based on dataset size and available resources. In most cases, we recommend you set a value within this range: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="3"><p>RaBitQ</p></td>
     <td><p><code>refine</code></p></td>
     <td><p>Enables the refine process and stores the refined data.</p></td>
     <td><p><strong>Type</strong>: Boolean<br><strong>Range</strong>: [<code>true</code>, <code>false</code>]<br><strong>Default value</strong>: <code>false</code></p></td>
     <td><p>Set to <code>true</code> if a 0.9+ recall rate is needed. Enabling refinement improves accuracy but increases storage requirements and index building time.</p></td>
   </tr>
   <tr>
     <td><p><code>refine_type</code></p></td>
     <td><p>Defines the data representation used for refining when <code>refine</code> is enabled.</p></td>
     <td><p><strong>Type</strong>: String<br><strong>Range</strong>: [<code>SQ6</code>, <code>SQ8</code>, <code>FP16</code>, <code>BF16</code>, <code>FP32</code>]<br><strong>Default value</strong>: None</p></td>
     <td><p>The listed values are presented in order of increasing recall rate, decreasing QPS, and increasing storage size. <code>SQ8</code> is recommended as a starting point, offering a good balance between accuracy and resource usage.</p></td>
   </tr>
</table>

### Index-specific search params

The following table lists the parameters that can be configured in `search_params.params` when [searching on the index](ivf-rabitq.md#Search-on-index).

<table>
   <tr>
     <th></th>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Value Range</p></th>
     <th><p>Tuning Suggestion</p></th>
   </tr>
   <tr>
     <td><p>IVF</p></td>
     <td><p><code>nprobe</code></p></td>
     <td><p>The number of clusters to search for candidates. Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency.</p></td>
     <td><p><strong>Type</strong>: Integer<br><strong>Range</strong>: [1, <em>nlist</em>]<br><strong>Default value</strong>: <code>8</code></p></td>
     <td><p>Increasing this value improves recall but may slow down the search. Set <code>nprobe</code> proportionally to <code>nlist</code> to balance speed and accuracy. In most cases, we recommend you set a value within this range: [1, <em>nlist</em>].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code>rbq_query_bits</code></p></td>
     <td><p>Sets whether additional scalar quantization of a query vector is applied. If set to <code>0</code>, the query is used without quantization. If set to a value within [1, 8], the query is preprocessed using n-bit scalar quantization.</p></td>
     <td><p><strong>Type</strong>: Integer<br><strong>Range</strong>: [0, 8]<br><strong>Default value</strong>: <code>0</code></p></td>
     <td><p>The default <code>0</code> value provides maximum recall rate but slowest performance. We recommend testing values <code>0</code>, <code>8</code>, and <code>6</code>, as they provide similar recall rates with <code>6</code> being the fastest. Use smaller values for higher recall requirements.</p></td>
   </tr>
   <tr>
     <td><p><code>refine_k</code></p></td>
     <td><p>The refining process uses higher quality quantization to pick the needed number of nearest neighbors from a <code>refine_k</code> times larger pool of candidates chosen using IVF_RABITQ.</p></td>
     <td><p><strong>Type</strong>: Float<br><strong>Range</strong>: [1, <em>float_max</em>)<br><strong>Default value</strong>: <code>1</code></p></td>
     <td><p>Higher <code>refine_k</code> values decrease QPS but increase recall rate. Start with <code>1</code> and test values <code>2</code>, <code>3</code>, <code>4</code>, and <code>5</code> to find the optimal trade-off between QPS and recall for your dataset.</p></td>
   </tr>
</table>
