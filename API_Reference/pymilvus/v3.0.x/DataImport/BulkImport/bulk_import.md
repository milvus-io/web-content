# bulk_import()

Adds project_id/region_id routing and project-database import behavior.

## Request Syntax

```python
# include-start milvus
bulk_import(
    url: str,
    collection_name: str,
    db_name: str = "",
    files: Optional[List[List[str]]] = None,
    api_key: str = "",
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    headers: Optional[Dict[str, str]] = None,
    **kwargs,
) -> requests.Response
# include-end
# include-start zilliz
bulk_import(
    url: str,
    collection_name: str,
    db_name: str = "",
    object_url: str = "",
    object_urls: Optional[List[List[str]]] = None,
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    access_key: str = "",
    secret_key: str = "",
    token: str = "",
    volume_name: str = "",
    data_paths: Optional[List[List[str]]] = None,
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    headers: Optional[Dict[str, str]] = None,
    **kwargs,
) -> requests.Response
# include-end
```

**PARAMETERS:**

- **url** (*str*) -
**[REQUIRED]**

    The Milvus server endpoint, such as `http://localhost:19530`.

- **collection_name** (*str*) -
**[REQUIRED]**
The name of the target collection.

- **db_name** (*str*) -
Default: `""`
The name of the target database.

- **files** (*Optional[List[List[str]]]*) -
Default: `None`
The local import files. Each nested list contains one JSON or Parquet file, or a related set of NumPy files.

- **object_url** (*str*) -
Default: `""`
The object URL of the file to import from object storage. This parameter is deprecated; use **object_urls** instead.

- **object_urls** (*Optional[List[List[str]]]*) -
Default: `None`
The object URLs that contain the data to import. Each nested list contains a single object URL or folder.

- **cluster_id** (*str*) -
Default: `""`
The ID of a Milvus instance on Zilliz Cloud.

- **project_id** (*str*) -
Default: `""`
The ID of the project on Zilliz Cloud, for project databases.

- **region_id** (*str*) -
Default: `""`
The ID of the region on Zilliz Cloud, for project databases.

- **api_key** (*str*) -
Default: `""`

    The Milvus authentication token, such as `root:Milvus`.

- **access_key** (*str*) -
Default: `""`
The access key used to access the object storage.

- **secret_key** (*str*) -
Default: `""`
The secret key used to access the object storage.

- **token** (*str*) -
Default: `""`
The access token used to access the object storage, for short-term credentials.

- **volume_name** (*str*) -
Default: `""`
The name of the volume on Zilliz Cloud whose data is to be imported.

- **data_paths** (*Optional[List[List[str]]]*) -
Default: `None`
The paths of the files to import from a volume. Each nested list contains one file or folder path.

- **verify** (*Optional[Union[bool, str]]*) -
Default: `True`
The TLS verification setting. Use `True` to verify with the default trust store or provide a CA certificate path.

- **cert** (*Optional[Union[str, tuple]]*) -
Default: `None`
The client certificate path, or a certificate and private-key pair for mutual TLS.

- **headers** (*Optional[Dict[str, str]]*) -
Default: `None`
Extra HTTP headers merged into the request; a caller's value overrides the SDK default for the same name.

    The `pymilvus.bulk_writer.IDEMPOTENCY_KEY_HEADER` constant (`"Idempotency-Key"`) can be used as a header key. Passing the same idempotency key on a retry resolves the request to the original import job instead of creating a second one.

- **kwargs** (*Any*) -
The additional options forwarded to the HTTP request.

**RETURN TYPE:**

*requests.Response*

**RETURNS:**

HTTP response returned by the bulk-import endpoint. Inspect the JSON payload for the submitted job identifier.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

The example submits local files to a Milvus server.

```python
# include-start milvus
from pymilvus.bulk_writer import bulk_import

response = bulk_import(
    url="http://localhost:19530",
    api_key="root:Milvus",
    collection_name="book_chunks",
    files=[["./data/part-0001.parquet"]],
)
print(response.json())
# include-end
# include-start zilliz
from pymilvus.bulk_writer import bulk_import

response = bulk_import(
    url="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    project_id="proj-xxxx",
    region_id="aws-us-west-2",
    collection_name="book_chunks",
    object_urls=[["s3://bucket/books/part-0001.parquet"]],
)
print(response.json())
# include-end
```
