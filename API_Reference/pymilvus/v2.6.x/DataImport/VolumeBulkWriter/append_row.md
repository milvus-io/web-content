# append_row()

This operation appends a single row of data to the internal buffer. When the buffer size exceeds the configured chunk size, the buffer is automatically flushed to local files and uploaded to the remote volume.

## Request Syntax

```python
VolumeBulkWriter.append_row(
    row: Dict[str, Any],
    **kwargs
)
```

**PARAMETERS:**

- **row** (*Dict[str, Any]*) -

    **[REQUIRED]**

    A dictionary representing a single row of data. The keys must match the field names defined in the collection schema, and the values must conform to the corresponding field types.

**RETURN TYPE:**

*None*

This method does not return a value.

**EXCEPTIONS:**

- **MilvusException**

    Raised when the row data fails validation against the collection schema (e.g., type mismatch, missing required fields, vector dimension mismatch).

## Examples

```python
from pymilvus.bulk_writer.volume_bulk_writer import VolumeBulkWriter
from pymilvus import CollectionSchema, FieldSchema, DataType

fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=False),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=128),
]
schema = CollectionSchema(fields, "example_collection")

writer = VolumeBulkWriter(
    schema=schema,
    remote_path="/data/bulk_import",
    cloud_endpoint="https://your-cloud-endpoint.zillizcloud.com",
    api_key="your-api-key",
    volume_name="my-volume",
)

# Append a single row
writer.append_row({
    "id": 1,
    "vector": [0.1] * 128,
})

# Append multiple rows
for i in range(1000):
    writer.append_row({
        "id": i,
        "vector": [0.1] * 128,
    })
```
