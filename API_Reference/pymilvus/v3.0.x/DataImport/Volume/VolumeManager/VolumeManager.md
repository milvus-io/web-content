# VolumeManager

A `VolumeManager` instance maintains a connection to Zilliz Cloud's Volume service. Before creating, listing, or deleting volumes, you need to initiate a `VolumeManager` instance.

```python
class pymilvus.bulk_writer.volume_manager import VolumeManager
```

<div class="alert note">

A volume is an intermediate storage spot where you can hold your data for further processing, such as data merging, migration, or importing. For details, refer to [Volume](https://docs.zilliz.com/docs/volume).

</div>

## Constructor

This constructor initializes a new `VolumeManager` instance designed to maintain a connection to Zilliz Cloud's Volume service.

```python
VolumeManager(
    cloud_endpoint: str,
    api_key: str
)
```

**PARAMETERS:**

- **cloud_endpoint** (*str*) -

    **[REQUIRED]**

    The Zilliz Cloud endpoint, which is `https:*//*api.cloud.zilliz.com`.

- **api_key** (*str*) -

    **[REQUIRED]**

    Your Zilliz Cloud API key with sufficient permissions to manage volumes on Zilliz Cloud's Volume service. To obtain a Zilliz Cloud API key, follow the steps on [API Keys](https://docs.zilliz.com/docs/manage-api-keys).

**RETURN TYPE:**

`VolumeManager`

**RETURNS:**

A `VolumeManager` instance.

## Examples

```python
from pymilvus.bulk_writer.volume_manager import VolumeManager

volume_manager = VolumeManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY"
)
```

