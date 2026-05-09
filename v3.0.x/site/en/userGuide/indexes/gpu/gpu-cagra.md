---
id: gpu-cagra.md
title: "GPU_CAGRA"
summary: "The GPU_CAGRA index is a graph-based index optimized for GPUs. Using inference-grade GPUs to run the Milvus GPU version can be more cost-effective compared to using expensive training-grade GPUs."
---

# GPU_CAGRA

The **GPU_CAGRA** index is a graph-based index optimized for GPUs. Using inference-grade GPUs to run the Milvus GPU version can be more cost-effective compared to using expensive training-grade GPUs.

## Build index

To build a `GPU_CAGRA` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type`, `metric_type`, and additional parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="GPU_CAGRA", # Type of the index to create
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    params={
        "intermediate_graph_degree": 64, # Affects recall and build time by determining the graph’s degree before pruning
        "graph_degree": 32, # Affets search performance and recall by setting the graph’s degree after pruning
        "build_algo": "IVF_PQ", # Selects the graph generation algorithm before pruning
        "cache_dataset_on_device": "true", # Decides whether to cache the original dataset in GPU memory
        "adapt_for_cpu": "false", # Decides whether to use GPU for index-building and CPU for search
    } # Index building params
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `GPU_CAGRA`.

- `metric_type`: The method used to calculate the distance between vectors. For details, refer to [Metric Types](metric.md).

- `params`: Additional configuration options for building the index. To learn more building parameters available for the `GPU_CAGRA` index, refer to [Index building params](gpu-cagra.md#Index-building-params).

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
search_params = {
    "params": {
        "itopk_size": 16, # Determines the size of intermediate results kept during the search
        "search_width": 8, # Specifies the number of entry points into the CAGRA graph during the search
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

- `params`: Additional configuration options for searching on the index. To learn more search parameters available for the `GPU_CAGRA` index, refer to [Index-specific search params](gpu-cagra.md#Index-specific-search-params).

## Enable CPU search at load time | Milvus 2.6.4+

To enable CPU search dynamically at load time, edit the following config in `milvus.yaml`:

```yaml
# milvus.yaml
knowhere:
  GPU_CAGRA:
    load: 
      adapt_for_cpu: true
```

**Behavior**

- When `load.adapt_for_cpu` is set to `true`, Milvus converts the **GPU_CAGRA** index into a CPU-executable format (HNSW-like) during load.

- Subsequent search operations are executed on CPU, even if the index was originally built for GPU.

- If omitted or false, the index stays on GPU and searches run on GPU.

<div class="alert note">

Use load-time CPU adaptation in hybrid or cost-sensitive environments where GPU resources are reserved for index building but searches run on CPU.

</div>

## Index params

This section provides an overview of the parameters used for building an index and performing searches on the index.

### Index building params

The following table lists the parameters that can be configured in `params` when [building an index](gpu-cagra.md#Build-index).

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
   </tr>
   <tr>
     <td><p><code>intermediate_graph_degree</code></p></td>
     <td><p>Affects recall and build time by determining the graph’s degree before pruning. Recommended values are <code>32</code> or <code>64</code>.</p></td>
     <td><p><code>128</code></p></td>
   </tr>
   <tr>
     <td><p><code>graph_degree</code></p></td>
     <td><p>Affects search performance and recall by setting the graph’s degree after pruning. A larger difference between these two degrees results in a longer build time. Its value must be smaller than the value of <code>intermediate_graph_degree</code>.</p></td>
     <td><p><code>64</code></p></td>
   </tr>
   <tr>
     <td><p><code>build_algo</code></p></td>
     <td><p>Selects the graph generation algorithm before pruning. Possible values:</p><ul><li><p><code>IVF_PQ</code>: Offers higher quality but slower build time.</p></li><li><p><code>NN_DESCENT</code>: Provides a quicker build with potentially lower recall.</p></li></ul></td>
     <td><p><code>IVF_PQ</code></p></td>
   </tr>
   <tr>
     <td><p><code>cache_dataset_on_device</code></p></td>
     <td><p>Decides whether to cache the original dataset in GPU memory. Possible values:</p><ul><li><p><code>"true"</code>: Caches the original dataset to enhance recall by refining search results.</p></li><li><p><code>"false"</code>: Does not cache the original dataset to save gpu memory.</p></li></ul></td>
     <td><p><code>"false"</code></p></td>
   </tr>
   <tr>
     <td><p><code>adapt_for_cpu</code></p></td>
     <td><p>Decides whether to use GPU for index-building and CPU for search.</p><p>Setting this parameter to <code>"true"</code> requires the presence of the <code>ef</code> parameter in the search requests.</p></td>
     <td><p><code>"false"</code></p></td>
   </tr>
</table>

### Index-specific search params

The following table lists the parameters that can be configured in `search_params.params` when [searching on the index](gpu-cagra.md#Search-on-index).

<table>
   <tr>
     <th><p>Parameter</p></th>
     <th><p>Description</p></th>
     <th><p>Default Value</p></th>
   </tr>
   <tr>
     <td><p><code>itopk_size</code></p></td>
     <td><p>Determines the size of intermediate results kept during the search. A larger value may improve recall at the expense of search performance. It should be at least equal to the final top-k (limit) value and is typically a power of 2 (e.g., 16, 32, 64, 128).</p></td>
     <td><p>Empty</p></td>
   </tr>
   <tr>
     <td><p><code>search_width</code></p></td>
     <td><p>Specifies the number of entry points into the CAGRA graph during the search. Increasing this value can enhance recall but may impact search performance（e.g. 1, 2, 4, 8, 16, 32).</p></td>
     <td><p>Empty</p></td>
   </tr>
   <tr>
     <td><p><code>min_iterations</code> / <code>max_iterations</code></p></td>
     <td><p>Controls the search iteration process. By default, they are set to <code>0</code>, and CAGRA automatically determines the number of iterations based on <code>itopk_size</code> and <code>search_width</code>. Adjusting these values manually can help balance performance and accuracy.</p></td>
     <td><p><code>0</code></p></td>
   </tr>
   <tr>
     <td><p><code>team_size</code></p></td>
     <td><p>Specifies the number of CUDA threads used for calculating metric distance on the GPU. Common values are a power of 2 up to 32 (e.g. 2, 4, 8, 16, 32). It has a minor impact on search performance. The default value is <code>0</code>, where Milvus automatically selects the <code>team_size</code> based on the vector dimension.</p></td>
     <td><p><code>0</code></p></td>
   </tr>
   <tr>
     <td><p><code>ef</code></p></td>
     <td><p>Specifies the query time/accuracy trade-off. A higher <code>ef</code> value leads to more accurate but slower search.</p><p>This parameter is mandatory if you set <code>adapt_for_cpu</code> to <code>true</code> when you build the index.</p></td>
     <td><p><code>[top_k, int_max]</code></p></td>
   </tr>
</table>

