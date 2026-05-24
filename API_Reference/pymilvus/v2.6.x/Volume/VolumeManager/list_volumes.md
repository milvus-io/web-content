# list_volumes()

This function lists volumes under a project with pagination and optional filtering by volume type.

## Request Syntax

```python
volume_manager.list_volumes(
    project_id: str,
    current_page: int = 1,
    page_size: int = 10,
    volume_type: str | None = None,
)
```

**PARAMETERS:**

- **project_id** (*str*) -

    **[REQUIRED]**

    Project ID to query.

- **current_page** (*int*) -

    Page number to query.

- **page_size** (*int*) -

    Number of records returned per page.

- **volume_type** (*str*) -

    Optional filter for volume type. Supported values are `MANAGED` and `EXTERNAL`.

**RETURN TYPE:**
*requests.Response*

Returns a paginated volume list.

HTTP response containing volume list results.

**EXCEPTIONS:**

- **MilvusException**

    Raised when the list request fails.

## Examples

```python
from pymilvus.bulk_writer import VolumeManager

volume_manager = VolumeManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
)

resp = volume_manager.list_volumes(
    project_id="proj-xxx",
    current_page=1,
    page_size=20,
    volume_type="EXTERNAL",
)

print(resp.json())
```
