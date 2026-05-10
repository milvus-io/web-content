# create_volume()

This operation creates a volume.

<div class="alert note">

This method is available on Zilliz Cloud's control-plane Volume service. Create `VolumeManager` with `cloud_endpoint="https://api.cloud.zilliz.com"` and a Zilliz Cloud API key that has access to the target project.

</div>

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

    The ID of the cloud region in which the volume will be created. You can use [List Cloud Regions](https://docs.zilliz.com/reference/restful/list-cloud-regions-v2) to view possible values. The region must be bound to the specified project.

- **volume_name** (*str*) -

    **[REQUIRED]**

    The name of the volume to create.

- **volume_type** (*str*) -

    The type of the volume to create. Possible values are `MANAGED` and `EXTERNAL`.

- **storage_integration_id** (*str*) -

    The storage integration from which the volume is to create. You can refer to [AWS](https://docs.zilliz.com/docs/integrate-with-aws-s3), [GCS](https://docs.zilliz.com/docs/integrate-with-gcp), and [Azure](https://docs.zilliz.com/docs/integrate-with-azure-blob-storage) guides for this. This is required when you create an external volume.

- **path** (*str*) -

    The path in the integrated storage. Note that the value should end with a forward slash (`/`).

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

