
# RemoteBulkWriter.AzureConnectParam

An __AzureConnectParam__ instance sets connection parameters for a __RemoteBulkWriter__ instance.

```python
class pymilvus.RemoteBulkWriter.AzureConnectParam
```

## Constructor

Constructs an __AzureConnectParam__ object by a set of parameters, such as __container_name__, __account_url__, __credential__, etc.

<div class="admonition note">

<p><b>notes</b></p>

<p>An <strong>AzureConnectParam</strong> object defines the parameters necessary for Milvus to connect to an Azure blob storage bucket.</p>
<p>You need to create this object before initializing a <strong>RemoteBulkWriter</strong> object.</p>

</div>

```python
from pymilvus.RemoteBulkWriter import AzureConnectParam

connect_param = S3ConnectParam(
    container_name: str,
    conn_str: str,
    account_url: Optional[str] = None,
    credential: Optional[Union[str, Dict[str, str]]] = None,
    upload_chunk_size: int = 8 * 1024 * 1024,
    upload_concurrency: int = 4,
)
```

__PARAMETERS:__

- __container_name__ (_str_)

    The name of the remote Azure blob storage container to connect to.

- __conn_str__ (_str_)

    A connection string to an Azure Storage account, which can be parsed to an __account_url__ and a __credential__. To generate a connection string, read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string).

- __account_url__ (_str_)

    A string in format like `https://<storage-account>.blob.core.windows.net`.

    Read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-overview) for more info.

- __credential__ (_str_)

    Account access key for the account. Read [this link](https://learn.microsoft.com/en-us/azure/storage/common/storage-account-keys-manage?tabs=azure-portal#view-account-access-keys) for more info.

- __upload_chunk_size__ (_int_)

    If the blob size is larger than this value or unknown, the blob is uploaded in chunks by parallel connections. This parameter is passed to __max_single_put_size__ of Azure. Read [this link](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-upload-python#specify-data-transfer-options-for-upload) for more.

- __upload_concurrency__ (_int_)

    The maximum number of parallel connections to use when uploading in chunks. 

    This parameter is passed to __max_concurrency__ of Azure. Read [this link](https://learn.microsoft.com/en-us/azure/storage/blobs/storage-blob-upload-python#specify-data-transfer-options-for-upload) for more.

__RETURN TYPE:__

_AzureConnectParam_

__RETURNS:__

An __AzureConnectParam__ object.

__EXCEPTIONS:__

- __Exception__

    This exception will be raised if the connection fails.

