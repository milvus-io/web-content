# upload_file_to_volume()

This operation uploads the local file at the specified source path to the target file path within the specified managed volume.

<div class="alert note">

This applies only to managed volumes. External volumes are read-only.

</div>

## Request Syntax

```python
# include-start zilliz
upload_file_to_volume(
    source_file_path: str,
    target_volume_path: str,
    upload_concurrency: int = 5,
    max_retries: int = 5,
    retry_interval: float = 5.0,
    progress_callback: Callable[[UploadProgress], None] | None = None,
    part_size: int = 0,
) -> dict
# include-end
```

**PARAMETERS:**

**RETURN TYPE:**

*dict*

**RETURNS:**

Dictionary containing volumeName, volume_name, and the uploaded target path.

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
