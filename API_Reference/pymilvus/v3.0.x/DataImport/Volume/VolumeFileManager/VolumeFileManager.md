# VolumeFileManager

A `VolumeFileManager` instance maintains a connection to a specific Zilliz Cloud managed volume. Before uploading data files to a volume, you need to initiate a `VolumeFileManager` instance.

```python
class pymilvus.bulk_writer.volume_file_manager import VolumeFileManager
```

<div class="alert note">

This method uploads files to managed volumes on Zilliz Cloud. It does not upload files to external volumes, which are read-only references to data in external object storage. For details, refer to [Volume](https://docs.zilliz.com/docs/volume).

</div>

## Constructor

This constructor initializes a new `VolumeFileManager` instance designed to maintain a connection to a specific Zilliz Cloud volume.

```python
VolumeFileManager(
    cloud_endpoint: str,
    api_key: str,
    volume_name: str
)
```

**PARAMETERS:**

- **cloud_endpoint** (*str*) -

    **[REQUIRED]**

    The Zilliz Cloud endpoint, which is `https://api.cloud.zilliz.com`.

- **api_key** (*str*) -

    **[REQUIRED]**

    Your Zilliz Cloud API key with sufficient permissions to manage volumes on Zilliz Cloud's Volume service. To obtain a Zilliz Cloud API key, follow the steps on [API Keys](https://docs.zilliz.com/docs/manage-api-keys).

- **volume_name** (*str*) -

    **[REQUIRED]**

    The name of the target volume of this operation.

**RETURN TYPE:**

`VolumeFileManager`

**RETURNS:**

A `VolumeFileManager` instance.

## Examples

```python
from pymilvus.bulk_writer.volume_file_manager import VolumeFileManager

volume_file_manager = VolumeFileManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    volume_name="my_volume"
)
```

