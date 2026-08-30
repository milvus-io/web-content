# bulk_import()

This function submits a bulk import job for open-source Milvus or Zilliz Cloud.

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

- **api_key** (*str*) -
Default: `""`

    The Milvus authentication token, such as `root:Milvus`.

- **verify** (*Optional[Union[bool, str]]*) -
Default: `True`
The TLS verification setting. Use `True` to verify with the default trust store or provide a CA certificate path.

- **cert** (*Optional[Union[str, tuple]]*) -
Default: `None`
The client certificate path, or a certificate and private-key pair for mutual TLS.

- **kwargs** (*Any*) -
The additional options forwarded to the HTTP request.

**RETURN TYPE:**

*requests.Response*

**RETURNS:**

HTTP response returned by the bulk-import endpoint. Inspect the JSON payload for the submitted job identifier.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

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
