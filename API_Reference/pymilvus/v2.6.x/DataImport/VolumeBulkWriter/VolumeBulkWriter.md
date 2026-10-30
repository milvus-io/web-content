# VolumeBulkWriter

Adds connection and local output-path behavior.

## Request Syntax

```python
# include-start zilliz
VolumeBulkWriter(
    schema: CollectionSchema,
    remote_path: str,
    cloud_endpoint: str,
    api_key: str,
    volume_name: str,
    chunk_size: int = 1024 * MB,
    file_type: BulkFileType = BulkFileType.PARQUET,
    config: Optional[dict] = None,
    connect_type: ConnectType = ConnectType.AUTO,
    **kwargs,
)
# include-end
```

**PARAMETERS:**

- **schema** (*[CollectionSchema](../../ORM/CollectionSchema/CollectionSchema.md)*) -

    **[REQUIRED]**

    The schema of a target collection to which the rewritten data is to be imported.

- **remote_path** (*str*) -

    **[REQUIRED]**

    The remote path in the volume that is to hold the rewritten data.

- **cloud_endpoint** (*str*) -

    **[REQUIRED]**

    The endpoint of the Zilliz Cloud cluster that hosts the target volume.

- **api_key** (*str*) -

    **[REQUIRED]**

    The API key used to authenticate with the Zilliz Cloud cluster.

- **volume_name** (*str*) -

    **[REQUIRED]**

    The name of the target volume.

- **chunk_size** (*int*) -

    The maximum size of a file segment.

    While rewriting your raw data, Milvus splits your raw data into segments.

    The value defaults to **536,870,912** in bytes, which is **512** MB.

- **file_type** (*[BulkFileType](../BulkFileType.md)*) -

    The type of the output file.

    The value defaults to **BulkFileType.PARQUET**. 

    Possible options are **BulkFileType.JSON**, **BulkFileType.PARQUET**, **BulkFileType.CSV**.

- **config** (*dict*) -

    Additional configurations for the writer.

- **connect_type** (*ConnectType*) -

    The connection type used to access the target volume.

    The value defaults to **ConnectType.AUTO**.

**RETURN TYPE:**

*VolumeBulkWriter*

**RETURNS:**

A writer that stages bulk files locally and uploads committed files to the configured Zilliz Cloud volume.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

```python
# include-start zilliz
from pymilvus import CollectionSchema, FieldSchema, DataType
from pymilvus.bulk_writer import VolumeBulkWriter

# Set up a schema
schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=5),
    ]
)

# Set up a volume bulk writer
writer = VolumeBulkWriter(
    schema=schema,
    remote_path="/remote/output",
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    volume_name="book-volume",
)

# Append a row to the writer
writer.append_row(
    {"id": 0, "vector": [0.1, 0.4, -0.8, -0.2, 0.4]}
)

# Commit the appended data and upload it to the volume
def callback():
    print("Commit completes")

writer.commit(call_back=callback)
# include-end
```
