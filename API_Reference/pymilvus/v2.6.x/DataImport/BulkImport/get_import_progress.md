# get_import_progress()

Adds project_id, region_id, db_name, and DB-Name header behavior.

## Request Syntax

```python
# include-start milvus
get_import_progress(
    url: str,
    job_id: str,
    api_key: str = "",
    db_name: str = "",
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    **kwargs,
) -> requests.Response
# include-end
# include-start zilliz
get_import_progress(
    url: str,
    job_id: str,
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    db_name: str = "",
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

- **job_id** (*str*) -
**[REQUIRED]**
The ID of the import job to inspect.

- **api_key** (*str*) -
Default: `""`

    The Milvus authentication token, such as `root:Milvus`.

- **db_name** (*str*) -
Default: `""`
The database name sent in the `DB-Name` header for role-based access control.

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

HTTP response containing the current bulk-import job state and progress.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

The example retrieves import progress from a Milvus server.

```python
# include-start milvus
from pymilvus.bulk_writer import get_import_progress

response = get_import_progress(
    url="http://localhost:19530",
    api_key="root:Milvus",
    job_id="job-123",
)
print(response.json())
# include-end
# include-start zilliz
from pymilvus.bulk_writer import get_import_progress

response = get_import_progress(
    url="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    project_id="proj-xxxx",
    region_id="aws-us-west-2",
    job_id="job-123",
)
print(response.json())
# include-end
```
