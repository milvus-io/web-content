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

__PARAMETERS:__

- __field_name__ (_string_) -

    The name of the field for which an index is to be created.

- __index_params__ (_dict_) - 

    The parameters that apply to the index-building process.

    - __index_type__ (string) -

        The algorithm used to build the index.

        Possible values are __FLAT__, __IVF_FLAT__, __GPU_IVF_FLAT__, __IVF_SQ8__, __IVF_PQ__, __GPU_IVF_PQ__, __HNSW__, __SCANN__, __BIN_FLAT__, __BIN_IVF_FLAT__, __DISKANN__, __GPU_CAGRA__, and __GPU_BRUTE_FORCE__. For details on these index types, refer to [In-memory Index](https://milvus.io/docs/index.md), [On-disk Index](https://milvus.io/docs/disk_index.md), and [GPU Index](https://milvus.io/docs/gpu_index.md).

    - __metric_type__ (_string_) - 

        The similarity metric type used to build the index.

        Possible values for float vector embeddings are __L2__, __IP__, and __COSINE__, and those for binary vector embeddings are __Jaccard__ and __Hamming__. Read [Similarity Metrics](https://milvus.io/docs/metric.md) to get more.

    - __params__ (_dict_) -

        Index-building parameters corresponding to the selected index type.

        For details on applicable index-building parameters, refer to [In-memory Index](https://milvus.io/docs/index.md) and [On-disk Index](https://milvus.io/docs/disk_index.md).

- __timeout__ (_float _|_ None_)  

    The timeout duration for this operation. Setting this to __None__ indicates that this operation timeouts when any response arrives or any error occurs.

__RETURN TYPE:__

_Status_

__RETURNS:__

A __Status__ object indicating whether this operation succeeds.

__EXCEPTIONS:__

- __MilvusException__

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

- [drop_index()](./drop_index.md)

- [has_index()](./has_index.md)

- [index()](./index.md)

- [index_building_progress()](./utility/index_building_progress.md)

- [wait_for_index_building_complete()](./utility/wait_for_index_building_complete.md)

- [list_indexes()](./utility/list_indexes.md)

