# delete_volume()

This operation deletes a volume.

## Request Syntax

```python
delete_volume(
    volume_name: str
)
```

**PARAMETERS**

- **volume_name** (*str*) -

    **[REQUIRED]**

    The name of the volume to delete.

**RETURN TYPE**

*None*

**RETURNS**

None

## Example

```python
from pymilvus.bulk_writer.volume_manager import VolumeManager

volume_manager = VolumeManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY"
)

volume_manager.delete_volume(
    volume_name="my_volume"
)

print(f"\nVolume my_volume deleted")

# Volume my_volume deleted
```

