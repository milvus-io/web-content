---
id: stl-sort.md
title: "STL_SORT"
summary: "The STL_SORT index is an index type specifically designed to enhance query performance on numeric fields (INT8, INT16, etc.), VARCHAR fields, or TIMESTAMPTZ fields within Milvus by organizing the data in a sorted order."
---

# STL_SORT

The `STL_SORT` index is an index type specifically designed to enhance query performance on numeric fields (INT8, INT16, etc.), `VARCHAR` fields, or `TIMESTAMPTZ` fields within Milvus by organizing the data in a sorted order.

Use the `STL_SORT` index if you frequently run queries with:

- Comparison filtering with `==`, `!=`, `>`, `<`, `>=`, and `<=` operators

-  Range filtering with `IN` and `LIKE` operators

## Supported data types

- Numeric fields (e.g., `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`). For details, refer to [Boolean & Number](number.md).

- `VARCHAR` fields. For details, refer to [String Field](string.md).

- `TIMESTAMPTZ` fields. For details, refer to [TIMESTAMPTZ Field](timestamptz-field.md).

## How it works

Milvus implements `STL_SORT` in two phases:

1. **Build index**

    - During ingestion, Milvus collects all values for the indexed field.

    - The values are sorted in ascending order using C++ STL’s [std::sort](https://en.cppreference.com/w/cpp/algorithm/sort.html).

    - Each value is paired with its entity ID, and the sorted array is persisted as the index.

1. **Accelerate queries**

    - At query time, Milvus uses **binary search** ([std::lower_bound](https://en.cppreference.com/w/cpp/algorithm/lower_bound.html) and [std::upper_bound](https://en.cppreference.com/w/cpp/algorithm/upper_bound.html)) on the sorted array.

    - For equality, Milvus quickly finds all matching values.

    - For ranges, Milvus locates the start and end positions and returns all values in between.

    - Matching entity IDs are passed to the query executor for final result assembly.

This reduces query complexity from **O(n)** (full scan) to **O(log n + m)**, where *m* is the number of matches.

## Create an STL_SORT index

You can create an `STL_SORT` index on a numeric or `TIMESTAMPTZ` field. No extra parameters are required.

The example below shows how to create an `STL_SORT` index on a `TIMESTAMPTZ` field:

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530") # Replace with your server address

# Assume you have defined a TIMESTAMPTZ field named "tsz" in your collection schema

# Prepare index parameters
index_params = client.prepare_index_params()

# Add RTREE index on the "tsz" field
# highlight-start
index_params.add_index(
    field_name="tsz",
    index_type="STL_SORT",   # Index for TIMESTAMPTZ
    index_name="tsz_index",  # Optional, name your index
    params={}                # No extra params needed
)
# highlight-end

# Create the index on the collection
client.create_index(
    collection_name="tsz_demo",
    index_params=index_params
)
```

## Drop an index

Use the `drop_index()` method to remove an existing index from a collection.

<div class="alert note">

</div>

```python
client.drop_index(
    collection_name="tsz_demo",   # Name of the collection
    index_name="tsz_index" # Name of the index to drop
)
```

## Usage notes

- **Field types:** Works with numeric and `TIMESTAMPTZ` fields. For more information on data types, refer to [Boolean & Number](number.md) and [TIMESTAMPTZ Field](timestamptz-field.md).

- **Parameters:** No index parameters are needed.

- **Mmap not supported:** Memory-mapped mode is not available for `STL_SORT`.

