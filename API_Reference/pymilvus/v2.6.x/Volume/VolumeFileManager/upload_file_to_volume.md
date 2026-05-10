# upload_file_to_volume()

This operation uploads the local file at the specified source path to the target file path within the specified managed volume.

<div class="alert note">

This applies only to managed volumes. External volumes are read-only.

</div>

## Request Syntax

```python
upload_file_to_volume(
    source_file_path: str,
    target_volume_path: str
)
```

**PARAMETERS**

- **source_file_path** (*str*) -

    **[REQUIRED]**

    The path to the local data file to be uploaded to the specified volume.

- **target_volume_path** (*str*) -

    **[REQUIRED]**

    The path to the data file within the specified volume after this operation.

**RETURN TYPE**

An object.

**RETURNS**

An object with the following data structure:

```python
{
    "volumeName": "my_volume",
    "path": "path/to/your/data/file/in/the/volume"
}
```

- **volumeName** (*str*) -

    **[REQUIRED]**

    The name of the target volume of this operation.

- **path** (*str*) -

    **[REQUIRED]**

    The path to the data file within the specified volume after this operation.

## Example

```python
from pymilvus.bulk_writer.volume_file_manager import VolumeFileManager

volume_file_manager = VolumeFileManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    volume_name="my_volume"
)

result = volume_file_manager.upload_file_to_volume(
    source_file_path="/path/to/your/local/data/file", 
    target_volume_path="data/"
)

print(f"\nuploadFileToVolume results\n: {result}")

# target_volume_path results: 
# 
# {
#     "volumeName": "my_volume",
#     "path": "data/"
# }
```
