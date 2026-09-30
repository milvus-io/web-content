# list_import_jobs()

Adds project_id and region_id filtering.

## Request Syntax

```python
# include-start milvus
list_import_jobs(
    url: str,
    collection_name: str = "",
    db_name: str = "",
    api_key: str = "",
    page_size: int = 10,
    current_page: int = 1,
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    **kwargs,
) -> requests.Response
# include-end
# include-start zilliz
list_import_jobs(
    url: str,
    collection_name: str = "",
    db_name: str = "",
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    page_size: int = 10,
    current_page: int = 1,
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
Default: `""`
The name of the collection whose import jobs are listed.

- **db_name** (*str*) -
Default: `""`
The name of the database whose import jobs are listed.

- **api_key** (*str*) -
Default: `""`

    The Milvus authentication token, such as `root:Milvus`.

- **page_size** (*int*) -
Default: `10`
The maximum number of import jobs to return per page.

- **current_page** (*int*) -
Default: `1`
The one-based page number to return.

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

HTTP response containing the matching import jobs and pagination information.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

The example lists import jobs from a Milvus server.

```python
# include-start milvus
from pymilvus.bulk_writer import list_import_jobs

response = list_import_jobs(
    url="http://localhost:19530",
    api_key="root:Milvus",
    collection_name="book_chunks",
)
print(response.json())
# include-end
# include-start zilliz
from pymilvus.bulk_writer import list_import_jobs

response = list_import_jobs(
    url="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    project_id="proj-xxxx",
    region_id="aws-us-west-2",
)
print(response.json())
# include-end
```
