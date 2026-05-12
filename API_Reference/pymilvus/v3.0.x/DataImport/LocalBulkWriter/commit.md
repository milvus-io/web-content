# commit()

This operation commits the appended data.

## Request syntax

```python
pymilvus.LocalBulkWriter.commit(
    **kwargs
)
```

**PARAMETERS:**

- **kwargs** -

    - **call_back** (function)

        A callback function to call after this operation is completed.

        The value defaults to **None**, indicating no callback is there to call. Use this to add post-commit actions.

## Examples

```python
from pymilvus import CollectionSchema, FieldSchema, DataType
from pymilvus.bulk_writer import LocalBulkWriter, BulkFileType

# Set up a schema
schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=5),
    ]
)

# Set up a local bulk writer
writer = LocalBulkWriter(
    schema=schema,
    local_path="/tmp/output",
)

# Append a row to the writer
writer.append_row(
    {"id": 0, "vector": [0.1, 0.4, -0.8, -0.2, 0.4]}
)

# Commit the appended data
def callback():
    print("Commit completes")

writer.commit(call_back=callback)
```

## Related methods

- [append_row()](append_row.md)

