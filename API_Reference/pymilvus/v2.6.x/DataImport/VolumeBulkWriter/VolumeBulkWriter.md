# VolumeBulkWriter

A VolumeBulkWriter instance rewrites your raw data locally in a format that Milvus understands, and then uploads the resulting files to a remote volume in Zilliz Cloud.

```python
class pymilvus.bulk_writer.VolumeBulkWriter(LocalBulkWriter)
```

## Constructor

```python
VolumeBulkWriter(
    schema: CollectionSchema,
    remote_path: str,
    cloud_endpoint: str,
    api_key: str,
    volume_name: str,
    chunk_size: int = 1024 * MB,
    file_type: BulkFileType = BulkFileType.PARQUET,
    config: Optional[dict] = None,
    **kwargs,
)
```

**PARAMETERS:**

- **schema** (*[CollectionSchema](https://zilliverse.feishu.cn/docx/SSiodq10FoH26hx2HlccfcAgnje)*) -

    **[REQUIRED]**

    The schema of a target collection to which the rewritten data is to be imported.

- **remote_path** (*str*) -

    **[REQUIRED]**

    The path to the directory in the remote volume that is to hold the rewritten data.

- **cloud_endpoint** (*str*) -

    **[REQUIRED]**

    The endpoint URL of the Zilliz Cloud instance.

- **api_key** (*str*) -

    **[REQUIRED]**

    The API key used to authenticate with the Zilliz Cloud instance.

- **volume_name** (*str*) -

    **[REQUIRED]**

    The name of the remote volume in Zilliz Cloud to which the files are uploaded.

- **chunk_size** (*int*) -

    The maximum size of a file segment.

    While rewriting your raw data, Milvus segments the data into batches and stores each batch in a separate file.

    The value defaults to 1,073,741,824 in bytes, which is 1 GB.

- **file_type** (*[BulkFileType](../BulkFileType.md)*) -

    The file type of the output files.

    The value defaults to *BulkFileType.PARQUET*.

- **config** (*dict*) -

    Optional configuration parameters for the bulk writer.

**Notes**

A VolumeBulkWriter is a context manager and can be used in a `with` statement. When the context exits, the local working directory is cleaned up.

## Properties

The following are the properties of the VolumeBulkWriter class.

- **data_path** (*str*)

    Returns the remote path where the uploaded files are stored.

- **batch_files** (*List[List[str]]*)

    Returns the list of uploaded file batches. Each inner list contains the remote paths of files uploaded in a single commit.

## Examples

```python
from pymilvus.bulk_writer.volume_bulk_writer import VolumeBulkWriter
from pymilvus import CollectionSchema, FieldSchema, DataType

# Define collection schema
fields = [
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=False),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=128),
]
schema = CollectionSchema(fields, "example_collection")

# Create VolumeBulkWriter
with VolumeBulkWriter(
    schema=schema,
    remote_path="/data/bulk_import",
    cloud_endpoint="https://your-cloud-endpoint.zillizcloud.com",
    api_key="your-api-key",
    volume_name="my-volume",
    chunk_size=1024 * 1024 * 1024,
    file_type=BulkFileType.PARQUET,
) as writer:
    # Append rows
    for i in range(1000):
        writer.append_row({
            "id": i,
            "vector": [0.1] * 128,
        })

    # Commit and upload
    writer.commit()

    print(writer.data_path)
    print(writer.batch_files)
```
