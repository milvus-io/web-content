# list_import_jobs()

This function lists bulk import jobs with optional collection and pagination filters, including project/region filters for project databases.

## Request Syntax

```python
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
    
    verify: bool | str = True,
    cert: str | tuple | None = None,
    **kwargs,
)
```

**PARAMETERS:**

- **url** (*str*) -

    **[REQUIRED]**

    Server endpoint for bulk import APIs.

- **collection_name** (*str*) -

    Optional collection filter.

- **db_name** (*str*) -

    Optional database filter.

- **cluster_id** (*str*) -

    Cloud cluster ID.

- **api_key** (*str*) -

    API key for cloud authentication.

- **page_size** (*int*) -

    Number of jobs returned per page.

- **current_page** (*int*) -

    Page number to query.

- **verify** (*bool | str*) -

    TLS verification setting.

- **cert** (*str | tuple*) -

    Client certificate path or `(cert, key)` tuple.

- **project_id** (*str*) -

    Additional HTTP request options.

**RETURN TYPE:**
*requests.Response*

Returns the paginated list of import jobs.

HTTP response containing paged import job summaries.

**EXCEPTIONS:**

- **MilvusException**

    Raised when listing jobs fails.

## Examples

```python
from pymilvus.bulk_writer import list_import_jobs

resp = list_import_jobs(
    url="http://localhost:19530",
    api_key="username:password",
    collection_name="book_catalog",
    page_size=20,
    current_page=1,
)

print(resp.json())
```

