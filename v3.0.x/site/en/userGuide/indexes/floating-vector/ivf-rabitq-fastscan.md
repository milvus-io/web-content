---
id: ivf-rabitq-fastscan.md
title: "IVF_RABITQ_FASTSCAN"
summary: "IVF_RABITQ_FASTSCAN combines IVF, RaBitQ binary quantization, and SIMD batch scanning to provide memory-efficient, high-throughput vector search."
beta: Milvus 3.0.x
---

# IVF_RABITQ_FASTSCAN

`IVF_RABITQ_FASTSCAN` combines IVF partitioning, RaBitQ binary quantization, and FastScan batch processing. It stores one-bit RaBitQ codes for database vectors and processes the codes in SIMD-friendly blocks of 32 database vectors. This makes it a good choice for high-throughput, memory-constrained workloads that can accept approximate results.

Choose `IVF_RABITQ_FASTSCAN` over [IVF_RABITQ](ivf-rabitq.md) when searches scan many candidates and throughput is the primary goal. FastScan's per-query setup cost is amortized across packed code blocks, so it is typically more beneficial for large datasets or long IVF lists. For small collections or searches that inspect few candidates, use `IVF_RABITQ` instead. It also supports configurable query quantization, more refinement types, and iterators.

## How it works

`IVF_RABITQ_FASTSCAN` uses the following stages:

1. **IVF partitioning**: IVF groups vectors into `nlist` clusters and searches the `nprobe` closest clusters.
1. **RaBitQ encoding**: Each vector residual is encoded as a one-bit-per-dimension RaBitQ code.
1. **FastScan**: The index packs codes for cache-friendly, SIMD batch processing. It evaluates 32 database vectors in each batch.
1. **Optional refinement**: When enabled, an FP32 refiner re-scores candidates before Milvus returns the final results.

The underlying Faiss index is `IndexIVFRaBitQFastScan`. Knowhere wraps it with a random rotation transform and optionally adds an FP32 refiner.

FastScan performs per-query setup work, such as building and quantizing query-related lookup tables, before scanning packed code blocks. Benchmark both `IVF_RABITQ` and `IVF_RABITQ_FASTSCAN` with your data and search parameters.

## Build index

To build an `IVF_RABITQ_FASTSCAN` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type`, `metric_type`, and additional parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="IVF_RABITQ_FASTSCAN", # Type of the index to create
    # highlight-next-line
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    # highlight-start
    params={
        "nlist": 1024, # Number of clusters for the index
        "refine": True, # Enable refinement for higher recall
        "refine_type": "FP32" # Refinement data format
    } # Index building params
    # highlight-end
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `IVF_RABITQ_FASTSCAN`.

- `metric_type`: The method used to calculate the distance between vectors. Supported values include `COSINE`, `L2`, and `IP`. For details, refer to [Metric Types](metric.md).

- `params`: Additional configuration options for building the index. For details, refer to [Index building params](ivf-rabitq-fastscan.md#Index-building-params).

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

Set `nprobe` to control how many IVF clusters are searched. If the index was built with refinement, use `refine_k` to control the candidate pool passed to the FP32 refiner.

```python
client = MilvusClient(uri="http://localhost:19530") # Replace with your Milvus server address

search_params = {
    # highlight-start
    "params": {
        "nprobe": 128, # Number of clusters to search
        "refine_k": 2 # Refinement magnification factor
    }
    # highlight-end
}

res = client.search(
    collection_name="your_collection_name", # Collection name
    anns_field="your_vector_field_name", # Vector field name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]], # Query vector
    limit=3, # TopK results to return
    # highlight-next-line
    search_params=search_params
)
```

In this configuration:

- `params`: Additional configuration options for searching on the index. For details, refer to [Index-specific search params](ivf-rabitq-fastscan.md#Index-specific-search-params).

<div class="alert note">

Unlike `IVF_RABITQ`, `IVF_RABITQ_FASTSCAN` does not accept the `rbq_bits_query` search parameter. FastScan always uses 8-bit query quantization internally, so omit `rbq_bits_query` or set it to `0`; larger values are rejected.

</div>

## Index params

This section provides an overview of the parameters used for building an index and performing searches on the index.

### Index building params

The following table lists the parameters that can be configured in `params` when [building an index](ivf-rabitq-fastscan.md#Build-index).

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
     <td rowspan="2"><p>RaBitQ</p></td>
     <td><p><code>refine</code></p></td>
     <td><p>Enables the refine process and stores the refined data. <code>IVF_RABITQ_FASTSCAN</code> supports FP32 refinement only.</p></td>
     <td><p><strong>Type</strong>: Boolean<br><strong>Range</strong>: [<code>true</code>, <code>false</code>]<br><strong>Default value</strong>: <code>false</code></p></td>
     <td><p>Set to <code>true</code> if a 0.9+ recall rate is needed. Enabling refinement improves accuracy but increases storage requirements and index building time.</p></td>
   </tr>
   <tr>
     <td><p><code>refine_type</code></p></td>
     <td><p>Defines the data representation used for refining when <code>refine</code> is enabled. Required only when <code>refine</code> is <code>true</code>.</p></td>
     <td><p><strong>Type</strong>: String<br><strong>Range</strong>: [<code>FP32</code>, <code>FLAT</code>]<br><strong>Default value</strong>: None</p></td>
     <td><p><code>IVF_RABITQ_FASTSCAN</code> supports FP32 refinement only, and <code>FLAT</code> is identical to <code>FP32</code>. Value matching is case-insensitive.</p></td>
   </tr>
</table>

### Index-specific search params

The following table lists the parameters that can be configured in `search_params.params` when [searching on the index](ivf-rabitq-fastscan.md#Search-on-index).

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
     <td><p><code>refine_k</code></p></td>
     <td><p>The refining process uses higher quality quantization to pick the needed number of nearest neighbors from a <code>refine_k</code> times larger pool of candidates chosen using IVF_RABITQ_FASTSCAN. Has no effect if refinement is disabled.</p></td>
     <td><p><strong>Type</strong>: Float<br><strong>Range</strong>: [1, <em>float_max</em>)<br><strong>Default value</strong>: <code>1</code></p></td>
     <td><p>Higher <code>refine_k</code> values decrease QPS but increase recall rate. Start with <code>1</code> and test values <code>2</code>, <code>3</code>, <code>4</code>, and <code>5</code> to find the optimal trade-off between QPS and recall for your dataset.</p></td>
   </tr>
   <tr>
     <td><p><code>rbq_bits_query</code></p></td>
     <td><p>Sets whether additional scalar quantization of a query vector is applied. <strong>Not supported on <code>IVF_RABITQ_FASTSCAN</code></strong>: the index always uses 8-bit query quantization internally. Omit this parameter or set it to <code>0</code>; values greater than <code>0</code> are rejected.</p></td>
     <td><p><strong>Type</strong>: Integer<br><strong>Range</strong>: [0, 0]<br><strong>Default value</strong>: <code>0</code></p></td>
     <td><p>Leave it unset. For configurable query quantization, use <a href="ivf-rabitq.md">IVF_RABITQ</a> instead.</p></td>
   </tr>
</table>

## Limitations

- FastScan uses a fixed 1-bit RaBitQ database encoding and 8-bit query quantization. `rbq_bits_query` must be omitted or set to `0`.
- Only FP32 (equivalently `FLAT`) refinement is supported.
- Iterators are not supported.
- This is a CPU index. It does not run on GPU.
- Actual performance depends on CPU SIMD support, vector dimension, `nlist`, `nprobe`, and data distribution. Benchmark it with your workload before deploying it to production.

For the non-FastScan RaBitQ variant and its additional refinement options, see [IVF_RABITQ](ivf-rabitq.md).
