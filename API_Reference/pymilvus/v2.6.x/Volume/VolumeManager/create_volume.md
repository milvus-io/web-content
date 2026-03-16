# create_volume()

This operation creates a volume.

## Request Syntax

```python
create_volume(
    project_id: str,
    region_id: str,
    volume_name: str
)
```

**PARAMETERS**

- **project_id** (*str*) -

    **[REQUIRED]**

    The ID of the project to which the volume to be created belongs.

- **region_id** (*str*) -

    **[REQUIRED]**

    The ID of the cloud region in which the volume will be created. You can use [List Cloud Regions](https://docs.zilliz.com/reference/restful/list-cloud-regions-v2) to view possible values.

- **volume_name** (*str*) -

    **[REQUIRED]**

    The name of the volume to create.

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

volume_manager.create_volume(
    project_id="proj-xxxxxxxxxxxxxxxxxxxxxxx", 
    region_id="aws-us-west-1", 
    volume_name="my_volume"
)

print(f"\Volume my_volume created")

# Volume my_volume created
```

