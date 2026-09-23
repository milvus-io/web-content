# create_volume()

Adds project/region and external-volume parameters.

## Request Syntax

```python
# include-start zilliz
create_volume(
    project_id: str,
    region_id: str,
    volume_name: str,
    volume_type: Optional[str] = None,
    storage_integration_id: Optional[str] = None,
    path: Optional[str] = None,
) -> requests.Response
# include-end
```

**PARAMETERS:**

**RETURN TYPE:**

*requests.Response*

**RETURNS:**

HTTP response describing the volume creation request.

**EXCEPTIONS:**

- **MilvusException**
Raised when the server rejects the request or the RPC fails. Inspect the server error message for exact failure details.

## Examples

```python
# include-start zilliz
from pymilvus.bulk_writer import VolumeFileManager, VolumeManager

manager = VolumeManager(cloud_endpoint="https://api.cloud.zilliz.com", api_key="YOUR_API_KEY")
manager.create_volume(project_id="proj-xxxx", region_id="aws-us-west-2", volume_name="book-volume", volume_type="EXTERNAL")
manager.describe_volume("book-volume")
manager.list_volumes(project_id="proj-xxxx", volume_type="EXTERNAL")

file_manager = VolumeFileManager(cloud_endpoint="https://api.cloud.zilliz.com", api_key="YOUR_API_KEY", volume_name="book-volume")
file_manager.upload_file_to_volume(source_file_path="./data/books.parquet", target_volume_path="datasets/books/books.parquet", upload_concurrency=4)
# include-end
```
