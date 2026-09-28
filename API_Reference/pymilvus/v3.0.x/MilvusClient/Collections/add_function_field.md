# add_function_field()

This operation adds a function-backed field to an existing collection. It is a high-level convenience wrapper that commits the schema change — the new output field plus the function definition — together with the index meta bound to the new output field. The server creates the index meta atomically with the schema change, so backfill compaction is never blocked on a missing vector index.

<div class="alert note">

**index_params** must contain exactly one entry with an explicit **index_type** for the output field. The server rejects vector output fields without bound index params.

</div>

## Request syntax

```python
client.add_function_field(
    collection_name: str,
    field_schema: FieldSchema,
    func: Function,
    index_params: IndexParams,
    timeout: Optional[float] = None
)
```

**PARAMETERS:**

- **collection_name** (*str*) -

    **[REQUIRED]**

    The name of the collection to modify.

- **field_schema** (*[FieldSchema](../FieldSchema/FieldSchema.md)*) -

    **[REQUIRED]**

    The schema of the new output field produced by the function. For example, a **SPARSE_FLOAT_VECTOR** field for BM25 or a **BINARY_VECTOR** field for MinHash.

- **func** (*[Function](../Function/Function.md)*) -

    **[REQUIRED]**

    The function definition that generates the output field. For example, a `FunctionType.BM25` or `FunctionType.MINHASH` function.

    The supported combinations are `FunctionType.BM25` with `DataType.SPARSE_FLOAT_VECTOR` and `FunctionType.MINHASH` with `DataType.BINARY_VECTOR`.

- **index_params** (*[IndexParams](../Management/prepare_index_params.md)*) -

    **[REQUIRED]**

    The index definition bound to the new output field. It must contain exactly one entry with an explicit **index_type** (for example, `SPARSE_INVERTED_INDEX`/`BM25` or `MINHASH_LSH`/`MHJACCARD`).

- **timeout** (*float* | *None*) -

    The timeout in seconds for the schema-change RPC. Setting this to **None** indicates that this operation timeouts when any response arrives or any error occurs.

**RETURN TYPE:**

*NoneType*

**RETURNS:**

None

**EXCEPTIONS:**

- **ParamError**

    Raised when a required parameter is missing or invalid.

- **MilvusException**

    This exception will be raised when the schema change fails.

## Example

```python
from pymilvus import MilvusClient, DataType, FieldSchema, CollectionSchema, Function, FunctionType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# The target collection must exist first. The BM25 input field must have
# enable_analyzer set to True, and the schema must contain a vector field.
client.create_collection(
    collection_name="my_collection",
    schema=CollectionSchema(
        fields=[
            FieldSchema("id", DataType.INT64, is_primary=True),
            FieldSchema("text", DataType.VARCHAR, max_length=512, enable_analyzer=True),
            FieldSchema("dense", DataType.FLOAT_VECTOR, dim=3),
        ],
    ),
)

# Define the BM25 function and its output sparse vector field
bm25_function = Function(
    name="bm25",
    function_type=FunctionType.BM25,
    input_field_names=["text"],
    output_field_names=["sparse_vector"],
)

sparse_field = FieldSchema(
    name="sparse_vector",
    dtype=DataType.SPARSE_FLOAT_VECTOR,
)

# The index params bound to the output field
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="sparse_vector",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="BM25",
)

client.add_function_field(
    collection_name="my_collection",
    field_schema=sparse_field,
    func=bm25_function,
    index_params=index_params,
)
```

## Related methods

- [drop_function_field()](drop_function_field.md)

- [create_collection()](create_collection.md)

- [prepare_index_params()](../Management/prepare_index_params.md)
