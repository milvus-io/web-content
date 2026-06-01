# get_import_progress()

This function returns the current status of a bulk import job, including project/region scoped jobs for cloud project databases.

## Request Syntax

```python
get_import_progress(
    url: str,
    job_id: str,
    cluster_id: str = "",
    project_id: str = "",
    region_id: str = "",
    api_key: str = "",
    db_name: str = "",
    
    verify: bool | str = True,
    cert: str | tuple | None = None,
    **kwargs,
)
```

**PARAMETERS:**

- **url** (*str*) -

    **[REQUIRED]**

    Server endpoint for bulk import APIs.

- **job_id** (*str*) -

    **[REQUIRED]**

    Import job ID returned by `bulk_import()`.

- **cluster_id** (*str*) -

    Cloud cluster ID.

- **api_key** (*str*) -

    API key for cloud authentication.

- **db_name** (*str*) -

    Database name for request routing.

- **verify** (*bool | str*) -

    TLS verification setting.

- **cert** (*str | tuple*) -

    Client certificate path or `(cert, key)` tuple.

- **project_id** (*str*) -

    Additional HTTP request options.

**RETURN TYPE:**
*requests.Response*

Returns the current import-job progress payload.

**EXCEPTIONS:**

- **MilvusException**

    Raised when progress lookup fails.

## Examples

```python
from pymilvus.bulk_writer import get_import_progress

resp = get_import_progress(
    url="http://localhost:19530",
    api_key="username:password",
    job_id="448996221577371648",
    db_name="book_db",
)

print(resp.json())
```

