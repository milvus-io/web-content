---
id: build_scalar_index.md
related_key: create scalar index
summary: Learn how to build an index for scalar fields in Milvus.
---

# Build an Index on Scalars

This guide describes how to build an index on scalar fields.

## Overview

Unlike vectors, which have both magnitude and direction, scalars have only magnitude. Milvus regards single numbers and strings as scalars. [Here](schema.md#Supported-data-type) is a list of the available data types for scalar fields in Milvus. 

To speed up [attribute filtering](boolean.md) in [hybrid searches](hybridsearch.md), you can build indexes on scalar fields since Milvus v2.1.0. You can read more about scalar field indexing [here](scalar_index.md).

## Build index

To build an index on scalar fields, you do not need to set any index parameters. The default value of a scalar field index name is **_default_idx_**. You can set it to another value that seems fit.

The following code snippet assumes that a collection named `book` already exists and an index is to be created on the string field `book_name`.

```python
from pymilvus import Collection

collection = Collection("book")   
collection.create_index(
  field_name="book_name", 
  index_name="scalar_index",
)
collection.load()
```

Once the index has been created, you can include a boolean expression on this string field in a vector similarity search as follows:

```python
search_param = {
  "data": [[0.1, 0.2]],
  "anns_field": "book_intro",
  "param": {"metric_type": "L2", "params": {"nprobe": 10}},
  "limit": 2,
  "expr": "book_name like \"Hello%\"", 
}
res = collection.search(**search_param)
```

## What's next

- To learn more about scalar field indexing, read [Scalar Index](scalar_index.md).
- To learn more about the related terms and rules mentioned above, read

    - [Bitset](bitset.md)
    - [Hybrid search](hybridsearch.md)
    - [Boolean expression rules](boolean.md)
    - [Supported data types](schema.md#Supported-data-type)
