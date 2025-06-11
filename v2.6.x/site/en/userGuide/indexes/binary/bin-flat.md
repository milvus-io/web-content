---
id: bin-flat.md
title: "BIN_FLAT"
summary: "The BIN_FLAT index is a variant of the FLAT index tailored exclusively for binary embeddings. It excels in applications where vector similarity search demands perfect accuracy on relatively small, million-scale datasets. By employing an exhaustive search methodology—comparing every target input against all vectors in the dataset—BIN_FLAT guarantees exact results. This precision makes it an ideal benchmark for assessing the performance of other indexes that might offer less than 100% recall, although its thorough approach also renders it the slowest option for large-scale data."
---

# BIN_FLAT

The **BIN_FLAT** index is a variant of the **FLAT** index tailored exclusively for binary embeddings. It excels in applications where vector similarity search demands perfect accuracy on relatively small, million-scale datasets. By employing an exhaustive search methodology—comparing every target input against all vectors in the dataset—BIN_FLAT guarantees exact results. This precision makes it an ideal benchmark for assessing the performance of other indexes that might offer less than 100% recall, although its thorough approach also renders it the slowest option for large-scale data.

## Build index

To build a `BIN_FLAT` index on a vector field in Milvus, use the `add_index()` method, specifying the `index_type` and `metric_type` parameters for the index.

```python
from pymilvus import MilvusClient

# Prepare index building params
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="your_binary_vector_field_name", # Name of the vector field to be indexed
    index_type="BIN_FLAT", # Type of the index to create
    index_name="vector_index", # Name of the index to create
    metric_type="HAMMING", # Metric type used to measure similarity
    params={} # No additional parameters required for BIN_FLAT
)
```

In this configuration:

- `index_type`: The type of index to be built. In this example, set the value to `BIN_FLAT`.

- `metric_type`: The method used to calculate the distance between vectors. Supported values for binary embeddings include `HAMMING` (default) and `JACCARD`. For details, refer to [Metric Types](metric.md).

- `params`: No extra parameters are needed for the BIN_FLAT index.

Once the index parameters are configured, you can create the index by using the `create_index()` method directly or passing the index params in the `create_collection` method. For details, refer to [Create Collection](create-collection.md).

## Search on index

Once the index is built and entities are inserted, you can perform similarity searches on the index.

```python
res = MilvusClient.search(
    collection_name="your_collection_name", # Collection name
    anns_field="binary_vector_field",  # Binary vector field name
    data=[query_binary_vector],  # Query binary vector
    limit=3,  # TopK results to return
    search_params={"params": {}}  # No additional parameters required for BIN_FLAT
)
```

For more information, refer to [Binary Vector](binary-vector.md).

## Index params

For the BIN_FLAT index, no additional parameters are needed either during the index creation or the search process.