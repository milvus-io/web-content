---
id: gpu-ivf-pq.md
title: "GPU_IVF_PQ"
summary: "The GPU_IVF_PQ index builds on the IVF_PQ concept by combining inverted file clustering with Product Quantization (PQ), which breaks down high-dimensional vectors into smaller subspaces and quantizes them for efficient similarity searches. Exclusively designed for GPU environments, GPU_IVF_PQ leverages parallel processing to accelerate computations and handle large-scale vector data effectively. For more information on foundational concepts, refer to IVF_PQ."
---

# GPU_IVF_PQ

The **GPU_IVF_PQ** index builds on the **IVF_PQ** concept by combining inverted file clustering with Product Quantization (PQ), which breaks down high-dimensional vectors into smaller subspaces and quantizes them for efficient similarity searches. Exclusively designed for GPU environments, GPU_IVF_PQ leverages parallel processing to accelerate computations and handle large-scale vector data effectively. For more information on foundational concepts, refer to [IVF_PQ](ivf-pq.md).

## Build index

To build a `GPU_IVF_PQ` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type`, `metric_type`, and additional parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="GPU_IVF_PQ", # Type of the index to create
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    params={
        "m": 4, # Number of sub-vectors to split eahc vector into
    } # Index building params
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `GPU_IVF_PQ`.

- `metric_type`: The method used to calculate the distance between vectors. Supported values include `COSINE`, `L2`, and `IP`. For details, refer to [Metric Types](metric.md).

- `params`: Additional configuration options for building the index.

    - `m`: Number of sub-vectors to split the vector into.

    To learn more building parameters available for the `GPU_IVF_PQ` index, refer to [Index building params](gpu-ivf-pq.md#Index-building-params).

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
    anns_field="vector_field", # Vector field name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # Query vector
    limit=3,  # TopK results to return
    search_params=search_params
)
```

In this configuration:

- `params`: Additional configuration options for searching on the index.

    - `nprobe`: Number of clusters to search for.

    To learn more search parameters available for the `GPU_IVF_PQ` index, refer to [Index-specific search params](gpu-ivf-pq.md#Index-specific-search-params).

## Index params

This section provides an overview of the parameters used for building an index and performing searches on the index.

### Index building params

The following table lists the parameters that can be configured in `params` when [building an index](gpu-ivf-pq.md#Build-index).

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
     <td><p>The number of clusters to create using the k-means algorithm during index building.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, 65536]</p>
<p><strong>Default value</strong>: <code>128</code></p></td>
     <td><p>Larger <code>nlist</code> values improve recall by creating more refined clusters but increase index building time. Optimize based on dataset size and available resources.
 In most cases, we recommend you set a value within this range: [32, 4096].</p></td>
   </tr>
   <tr>
     <td rowspan="2"><p>PQ</p></td>
     <td><p><code>m</code></p></td>
     <td><p>The number of sub-vectors (used for quantization) to divide each high-dimensional vector into during the quantization process.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, 65536]</p>
<p><strong>Default value</strong>: None</p></td>
     <td><p>A higher <code>m</code> value can improve accuracy, but it also increases the computational complexity and memory usage.
 <code>m</code> must be a divisor of the vector dimension (<em>D</em>) to ensure proper decomposition. A commonly recommended value is <em>m = D/2</em>.</p>
<p>In most cases, we recommend you set a value within this range: [D/8, D].</p></td>
   </tr>
   <tr>
     <td><p><code>nbits</code></p></td>
     <td><p>The number of bits used to represent each sub-vector's centroid index in the compressed form. It directly determines the size of each codebook.
 Each codebook will contain $2^{\textit{nbits}}$ centroids. For example, if <code>nbits</code> is set to 8, each sub-vector will be represented by an 8-bit centroid's index. This allows for $2^8$ (256) possible centroids in the codebook for that sub-vector.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, 64]</p>
<p><strong>Default value</strong>: <code>8</code></p></td>
     <td><p>A higher <code>nbits</code> value allows for larger codebooks, potentially leading to more accurate representations of the original vectors. However, it also means using more bits to store each index, resulting in less compression.
 In most cases, we recommend you set a value within this range: [1, 16].</p></td>
   </tr>
   <tr>
     <td></td>
     <td><p><code>cache_dataset_on_device</code></p></td>
     <td><p>Decides whether to cache the original dataset in GPU memory. Possible values:</p>
<ul>
<li><p><code>"true"</code>: Caches the original dataset to enhance recall by refining search results.</p></li>
<li><p><code>"false"</code>: Does not cache the original dataset to save gpu memory.</p></li>
</ul></td>
     <td><p><strong>Type</strong>: String
 <strong>Range</strong>: [<code>"true"</code>, <code>"false"</code>]</p>
<p><strong>Default value</strong>: <code>"false"</code></p></td>
     <td><p>Setting it to <code>"true"</code> enhances recall by refining search results but uses more GPU memory. Setting it to <code>"false"</code> conserves GPU memory.</p></td>
   </tr>
</table>

### Index-specific search params

The following table lists the parameters that can be configured in `search_params.params` when [searching on the index](gpu-ivf-pq.md#Search-on-index).

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
     <td><p>The number of clusters to search for candidates.</p></td>
     <td><p><strong>Type</strong>: Integer
 <strong>Range</strong>: [1, <em>nlist</em>]</p>
<p><strong>Default value</strong>: <code>8</code></p></td>
     <td><p>Higher values allow more clusters to be searched, improving recall by expanding the search scope but at the cost of increased query latency.
 Set <code>nprobe</code> proportionally to <code>nlist</code> to balance speed and accuracy.</p>
<p>In most cases, we recommend you set a value within this range: [1, nlist].</p></td>
   </tr>
</table>

