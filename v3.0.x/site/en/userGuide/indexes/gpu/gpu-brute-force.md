---
id: gpu-brute-force.md
title: "GPU_BRUTE_FORCE"
summary: "Dedicated to GPU environments, the GPU_BRUTE_FORCE index is engineered for scenarios where uncompromising accuracy is essential. It guarantees a recall of 1 by exhaustively comparing each query against all vectors in the dataset, ensuring that no potential match is overlooked. Leveraging GPU acceleration, GPU_BRUTE_FORCE is suited for applications demanding absolute precision in vector similarity searches."
---

# GPU_BRUTE_FORCE

Dedicated to GPU environments, the **GPU_BRUTE_FORCE** index is engineered for scenarios where uncompromising accuracy is essential. It guarantees a recall of 1 by exhaustively comparing each query against all vectors in the dataset, ensuring that no potential match is overlooked. Leveraging GPU acceleration, GPU_BRUTE_FORCE is suited for applications demanding absolute precision in vector similarity searches.

## Build index

To build a `GPU_BRUTE_FORCE` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type` and `metric_type` parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="GPU_BRUTE_FORCE", # Type of the index to create
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    params={} # No additional parameters required for GPU_BRUTE_FORCE
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `GPU_BRUTE_FORCE`.

- `metric_type`: The method used to calculate the distance between vectors. For details, refer to [Metric Types](metric.md).

- `params`: No extra parameters are needed for the GPU_BRUTE_FORCE index.

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
res = MilvusClient.search(
    collection_name="your_collection_name", # Collection name
    anns_field="vector_field", # Vector field name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # Query vector
    limit=3,  # TopK results to return
    search_params={"params": {}}  # No additional parameters required for GPU_BRUTE_FORCE
)
```

## Index params

For the `GPU_BRUTE_FORCE` index, no additional parameters are needed either during the index creation or the search process.