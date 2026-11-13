# AzureConnectParam

An **AzureConnectParam** instance sets connection parameters for a **[RemoteBulkWriter](RemoteBulkWriter.md)** instance.

```python
class pymilvus.RemoteBulkWriter.AzureConnectParam
```

## Constructor

Constructs an **AzureConnectParam** object by a set of parameters, such as **container_name**, **account_url**, **credential**, etc.

<div class="alert note">

An **AzureConnectParam** object defines the parameters necessary for Milvus to connect to an Azure blob storage bucket.

You need to create this object before initializing a **[RemoteBulkWriter](RemoteBulkWriter.md)** object.

</div>

```python
from pymilvus.bulk_writer import RemoteBulkWriter

connect_param = RemoteBulkWriter.AzureConnectParam(
    container_name="string",
    conn_str="string",
    account_url="string",
    credential="string",
    upload_chunk_size=8 * 1024 * 1024,
    upload_concurrency=4,
)
```

**PARAMETERS:**

- **container_name** (*str*)

    **[REQUIRED]**

    The name of the remote Azure blob storage container to connect to.

- **conn_str** (*str*)

    **[REQUIRED]**

    A connection string to an Azure Storage account, which can be parsed to an **account_url** and a **credential**. To generate a connection string, read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string).

- **account_url** (*str*)

    A string in format like `https://<storage-account>.blob.core.windows.net`.

    Read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) for more info.

    The value defaults to **None**.

- **credential** (*Optional[Union[str, Dict[str, str]]]*)

    Account access key for the account. Read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys) for more info.

    The value defaults to **None**.

- **upload_chunk_size** (*int*)

    If the blob size is larger than this value or unknown, the blob is uploaded in chunks by parallel connections. This parameter is passed to **max_single_put_size** of Azure. Read [this link](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-upload-python#specify-data-transfer-options-for-upload) for more.

    The value defaults to **8,388,608** in bytes, which is **8** MB.

- **upload_concurrency** (*int*)

    The maximum number of parallel connections to use when uploading in chunks. 

    The value defaults to **4**.

    This parameter is passed to **max_concurrency** of Azure. Read [this link](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-upload-python#specify-data-transfer-options-for-upload) for more.

**RETURN TYPE:**

*AzureConnectParam*

**RETURNS:**

An **AzureConnectParam** object.

**EXCEPTIONS:**

- **Exception**

    This exception will be raised if the connection fails.

## Example

```python
from pymilvus import CollectionSchema, FieldSchema, DataType
from pymilvus.bulk_writer import RemoteBulkWriter

# Set up a schema
schema = CollectionSchema(fields=[
    FieldSchema(name="id", dtype=DataType.INT64, is_primary=True),
    FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=5),
    ]
)

# Set up Azure blob storage connection parameters
connect_param = RemoteBulkWriter.AzureConnectParam(
    container_name="my-container",
    conn_str="<your-connection-string>",
)

# Set up a remote bulk writer
writer = RemoteBulkWriter(
    schema=schema,
    remote_path="/path/to/bucket/prefix",
    connect_param=connect_param,
)

# Append a row to the writer
writer.append_row(
    {"id": 0, "vector": [0.1, 0.4, -0.8, -0.2, 0.4]}
)

# Commit the appended data
writer.commit()
```

