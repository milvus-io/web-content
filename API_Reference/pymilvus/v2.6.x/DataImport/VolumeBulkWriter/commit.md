# commit()

This operation persists the buffered data to local files and uploads them to the remote volume configured in the VolumeBulkWriter instance.

## Request Syntax

```python
VolumeBulkWriter.commit(
    **kwargs
)
```

**PARAMETERS:**

- **_async** (*bool*) -

    Whether to flush the buffer asynchronously.

    If set to `True`, the flush operation runs in a background thread and the method returns immediately. If set to `False` (default), the method blocks until the flush completes.

- **call_back** (*Callable[[List[str]], List[str]]*) -

    An optional callback function invoked after the local files are flushed. In VolumeBulkWriter, this callback is used internally to upload files to the remote volume.

**RETURN TYPE:**

*None*

This method does not return a value.

**EXCEPTIONS:**

- **MilvusException**

    Raised when the flush or upload operation fails.

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

# Append data
for i in range(1000):
    writer.append_row({"id": i, "vector": [0.1] * 128})

# Commit and upload to remote volume
writer.commit()

print(f"Files uploaded to: {writer.data_path}")
```
