# create_index()

This creates a named index for a target field, which can either be a vector field or a scalar field.

<div class="admonition note">

<p><b>notes</b></p>

<p>This operation is non-blocking. You can call <code>utility.wait_for_index_building_complete()</code> to block the current process.</p>

</div>

## Request Syntax

```python
create_index(
    field_name: str, 
    index_params: dict | None, 
    timeout: float | None
)
```

**PARAMETERS:**

- **field_name** (*string*) -

    The name of the field for which an index is to be created.

- **index_params** (*dict*) - 

    The parameters that apply to the index-building process.

    - **index_type** (string) -

        The algorithm used to build the index.

        Possible values are **FLAT**, **IVF_FLAT**, **GPU_IVF_FLAT**, **IVF_SQ8**, **IVF_PQ**, **GPU_IVF_PQ**, **HNSW**, **SCANN**, **BIN_FLAT**, **BIN_IVF_FLAT**, **DISKANN**, **GPU_CAGRA**, and **GPU_BRUTE_FORCE**. For details on these index types, refer to [In-memory Index](https://milvus.io/docs/index.md), [On-disk Index](https://milvus.io/docs/disk_index.md), and [GPU Index](https://milvus.io/docs/gpu_index.md).

    - **metric_type** (*string*) - 

        The similarity metric type used to build the index.

        Possible values for float vector embeddings are **L2**, **IP**, and **COSINE**, and those for binary vector embeddings are **Jaccard** and **Hamming**. Read [Similarity Metrics](https://milvus.io/docs/metric.md) to get more.

    - **params** (*dict*) -

        Index-building parameters corresponding to the selected index type.

        For details on applicable index-building parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- **timeout** (*float* | *None*)  

    The timeout duration for this operation. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*Status*

**RETURNS:**

A **Status** object indicating whether this operation succeeds.

**EXCEPTIONS:**

- **MilvusException**

    This exception will be raised when any error occurs during this operation.

## Examples

```python
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType

schema = CollectionSchema([
    FieldSchema("id", DataType.INT64, is_primary=True),
    FieldSchema("vector", DataType.FLOAT_VECTOR, dim=5)
])

# Create a collection
collection = Collection(
    name="test_collection",
    schema=schema
)

# Create an index on a scalar field
collection.create_index(
    field_name="id"
)

# Set the index parameters
index_params = {
    "index_type": "IVF_FLAT",
    "metric_type": "COSINE",
    "params": {
        "nlist": 128
    }
}

# Create an index on the vector field
collection.create_index(
    field_name="vector", 
    index_params=index_params, 
    timeout=None
)

# Check the index
collection.has_index() # True
```

## Related operations

The following operations are related to `create_index()`

- [drop_index()](drop_index.md)

- [has_index()](has_index.md)

- [index()](index.md)

- [index_building_progress()](../utility/index_building_progress.md)

- [wait_for_index_building_complete()](../utility/wait_for_index_building_complete.md)

- [list_indexes()](../utility/list_indexes.md)

