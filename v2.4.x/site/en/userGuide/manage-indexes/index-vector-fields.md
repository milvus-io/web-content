---
id: index-vector-fields.md
order: 1
summary: This guide walks you through the basic operations on creating and managing indexes on vector fields in a collection.
---

# Index Vector Fields

This guide walks you through the basic operations on creating and managing indexes on vector fields in a collection. 

## Overview

Leveraging the metadata stored in an index file, Milvus organizes your data in a specialized structure, facilitating rapid retrieval of requested information during searches or queries.

Milvus provides [several index types](https://milvus.io/docs/index.md) to sort field values for efficient similarity searches. It also offers three [metric types](https://milvus.io/docs/metric.md#Similarity-Metrics): __Cosine Similarity__ (COSINE), __Euclidean Distance__ (L2), and __Inner Product__ (IP) to measure the distances between vector embeddings.

It is recommended to create indexes for both the vector field and scalar fields that are frequently accessed.

<div class="alert note">

The code snippets on this page use new <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/About.md">MilvusClient</a> (Python) to interact with Milvus. New MilvusClient SDKs for other languages will be released in future updates.

</div>

## Preparations

As explained in [Manage Collections](manage-collections.md), Milvus automatically generates an index and loads it into memory when creating a collection if any of the following conditions are specified in the collection creation request:

- The dimensionality of the vector field and the metric type, or

- The schema and the index parameters.

The code snippet below repurposes the existing code to establish a connection to a Milvus instance and create a collection without specifying its index parameters. In this case, the collection lacks an index and remains unloaded.



```python
from pymilvus import MilvusClient, DataType

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://localhost:19530"
)

# 2. Create schema
# 2.1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# 2.2. Add fields to schema
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# 3. Create collection
client.create_collection(
    collection_name="customized_setup", 
    schema=schema, 
)
```

## Index a Collection

To create an index for a collection or index a collection, you need to set up the index parameters and call `create_index()`.



```python
# 4.1. Set up the index parameters
index_params = MilvusClient.prepare_index_params()

# 4.2. Add an index on the vector field.
index_params.add_index(
    field_name="vector",
    metric_type="COSINE",
    index_type=,
    index_name="vector_index"
)

# 4.3. Create an index file
client.create_index(
    collection_name="customized_setup",
    index_params=index_params
)
```

<div class="admonition note">

<p><b>notes</b></p>

<p>Currently, you can create only one index file for each field in a collection.</p>

</div>

## Check Index Details

Once you have created an index, you can check its details.



```python
# 5. Describe index
res = client.list_indexes(
    collection_name="customized_setup"
)

print(res)

# Output
#
# [
#     "vector_index",
# ]

res = client.describe_index(
    collection_name="customized_setup",
    index_name="vector_index"
)

print(res)

# Output
#
# {
#     "index_type": ,
#     "metric_type": "COSINE",
#     "field_name": "vector",
#     "index_name": "vector_index"
# }
```

You can check the index file created on a specific field, and collect the statistics on the number of rows indexed using this index file.

## Drop an Index

You can simply drop an index if it is no longer needed.



```python
# 6. Drop index
client.drop_index(
    collection_name="customized_setup",
    index_name="vector_index"
)
```