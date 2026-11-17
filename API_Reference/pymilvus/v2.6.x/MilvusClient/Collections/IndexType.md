# IndexType

This is an enumeration that provides the following constants.

```python
class IndexType(IntEnum):
    INVALID = 0
    FLAT = 1
    IVFLAT = 2
    IVF_SQ8 = 3
    RNSG = 4
    IVF_SQ8H = 5
    IVF_PQ = 6
    HNSW = 11
    ANNOY = 12
    IVF_FLAT = IVFLAT
    IVF_SQ8_H = IVF_SQ8H
```

**Constants:**

- **INVALID** (0)

    An invalid index type.

- **FLAT** (1)

    Sets the index type to **FLAT**.

- **IVFLAT** (2)

    Sets the index type to **IVF_FLAT**.

- **IVF_SQ8** (3)

    Sets the index type to **IVF_SQ8**.

- **RNSG** (4)

    Sets the index type to **RNSG**.

- **IVF_SQ8H** (5)

    Sets the index type to **IVF_SQ8H**.

- **IVF_PQ** (6)

    Sets the index type to **IVF_PQ**.

- **HNSW** (11)

    Sets the index type to **HNSW**.

- **ANNOY** (12)

    Sets the index type to **ANNOY**.

- **IVF_FLAT** (2)

    An alias of **IVFLAT**.

- **IVF_SQ8_H** (5)

    An alias of **IVF_SQ8H**.

## Example

```python
from pymilvus import MilvusClient, DataType, IndexType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# Set up a schema
schema = client.create_schema(auto_id=False, enable_dynamic_field=False)
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)

# Prepare index parameters
index_params = client.prepare_index_params()

# Add an index using an IndexType constant
index_params.add_index(
    field_name="my_vector",
    index_type=IndexType.FLAT,
    metric_type="L2",
)

# Create the collection with the index
client.create_collection(
    collection_name="customized_setup",
    schema=schema,
    index_params=index_params,
)
```
