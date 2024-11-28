# commit()

This operation commits the appended data.

## Request syntax

```python
commit(
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
from pymilvus.bulk_writer import RemoteBulkWriter, BulkFileType

# Set up a schema
schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=5),
    ]
)

# Set up bucket connection parameters
connect_param = RemoteBulkWriter.ConnectParam(
    endpoint="storage.googleapis.com", # use 's3.amazonaws.com' for AWS
    access_key="ACCESS_KEY",
    secret_key="SECRET_KEY",
    bucket_name="BUCKET_NAME",
    secure=True,
)

# Set up a remote bulk writer
writer = RemoteBulkWriter(
    schema=schema,
    connect_param=connect_param,
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

## Related classes and methods

- [append_row()](append_row.md)

- [AzureConnectParam](AzureConnectParam.md)

- [S3ConnectParam](S3ConnectParam.md)

