---
id: flat.md
title: "FLAT"
summary: "The FLAT index is one of the simplest and most straightforward methods for indexing and searching floating-point vectors. It relies on a brute-force approach, where each query vector is directly compared to every vector in the dataset, without any advanced preprocessing or data structuring. This approach guarantees accuracy, offering 100% recall, as every potential match is evaluated."
---

# FLAT

The **FLAT** index is one of the simplest and most straightforward methods for indexing and searching floating-point vectors. It relies on a brute-force approach, where each query vector is directly compared to every vector in the dataset, without any advanced preprocessing or data structuring. This approach guarantees accuracy, offering 100% recall, as every potential match is evaluated.

However, this exhaustive search method comes with trade-offs. The FLAT index is the slowest indexing option, as it performs a full scan of the dataset for every query. Consequently, it is not well-suited for environments with massive datasets, where performance is a concern. The primary advantage of the FLAT index is its simplicity and reliability, as it requires no training or complex parameter configurations.

## Build index

To build an `FLAT` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type` and `metric_type` parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_vector_field_name", # Name of the vector field to be indexed
    index_type="FLAT", # Type of the index to create
    index_name="vector_index", # Name of the index to create
    metric_type="L2", # Metric type used to measure similarity
    params={} # No additional parameters required for FLAT
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `FLAT`.

- `metric_type`: The method used to calculate the distance between vectors. Supported values include `COSINE`, `L2`, and `IP`. For details, refer to [Metric Types](metric.md).

- `params`: No extra parameters are needed for the FLAT index.

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
res = MilvusClient.search(
    collection_name="your_collection_name", # Collection name
    anns_field="vector_field", # Vector field name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # Query vector
    limit=3,  # TopK results to return
    search_params={"params": {}}  # No additional parameters required for FLAT
)
```

## Index params

For the FLAT index, no additional parameters are needed either during the index creation or the search process.