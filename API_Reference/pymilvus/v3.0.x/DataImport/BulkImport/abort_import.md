# abort_import()

Aborts an import job as part of the two-phase commit (2PC) flow, discarding the imported data.

## Request Syntax

```python
abort_import(
    url: str,
    job_id: str,
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    db_name: str = "",
    verify: Optional[Union[bool, str]] = True,
    cert: Optional[Union[str, tuple]] = None,
    headers: Optional[Dict[str, str]] = None,
    **kwargs,
) -> requests.Response
```

**PARAMETERS:**

- **url** (*str*) -
**[REQUIRED]**
The Milvus server endpoint, such as `http://localhost:19530`.

- **job_id** (*str*) -
**[REQUIRED]**
The ID of the import job to abort.

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

- **db_name** (*str*) -
Default: `""`
The database name sent in the `DB-Name` header for role-based access control.

- **verify** (*Optional[Union[bool, str]]*) -
Default: `True`
The TLS verification setting. Use `True` to verify with the default trust store or provide a CA certificate path.

- **cert** (*Optional[Union[str, tuple]]*) -
Default: `None`
The client certificate path, or a certificate and private-key pair for mutual TLS.

- **headers** (*Optional[Dict[str, str]]*) -
Default: `None`
Extra HTTP headers merged into the request; a caller's value overrides the SDK default for the same name.

- **kwargs** (*Any*) -
The additional options forwarded to the HTTP request.

**RETURN TYPE:**

*requests.Response*

**RETURNS:**

HTTP response returned by the import-abort endpoint. Inspect the JSON payload for the abort result.

**EXCEPTIONS:**

- **[MilvusException](../../Exceptions/MilvusException.md)**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Example

The example aborts an import job.

```python
from pymilvus.bulk_writer import abort_import

response = abort_import(
    url="http://localhost:19530",
    api_key="root:Milvus",
    job_id="job-123",
)
print(response.json())
```
