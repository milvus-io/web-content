# VolumeManager

A **VolumeManager** instance manages Zilliz Cloud volumes, including creating, deleting, describing, and listing volumes.

```python
class pymilvus.VolumeManager
```

## Constructor

Constructs a **VolumeManager** object with a set of parameters, such as **cloud_endpoint**, **api_key**, etc.

```python
from pymilvus.bulk_writer import VolumeManager

manager = VolumeManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
)
```

**PARAMETERS:**

- **cloud_endpoint** (*str*) -

    **[REQUIRED]**

    The fixed cloud endpoint URL. For international regions, use `https://api.cloud.zilliz.com`; for regions in China, use `https://api.cloud.zilliz.com.cn`.

- **api_key** (*str*) -

    **[REQUIRED]**

    The API key associated with your organization or cluster.

**RETURN TYPE:**

*VolumeManager*

**RETURNS:**

A **VolumeManager** object.

## Methods

- **create_volume()** -

    Creates a volume under the specified project and region.

    **PARAMETERS:**

    - **project_id** (*str*) -

        **[REQUIRED]**

        The ID of the project.

    - **region_id** (*str*) -

        **[REQUIRED]**

        The ID of the region.

    - **volume_name** (*str*) -

        **[REQUIRED]**

        The name of the volume.

    - **volume_type** (*str*) -

        The type of the volume. Possible values are **MANAGED** or **EXTERNAL**. The value defaults to **MANAGED** when not set.

    - **storage_integration_id** (*str*) -

        The storage integration ID, required for the **EXTERNAL** volume type.

    - **path** (*str*) -

        The storage path for the **EXTERNAL** volume type. If not set, the value defaults to the storage integration root directory. If set, the path must end with `/`.

- **delete_volume()** -

    Deletes a volume.

    **PARAMETERS:**

    - **volume_name** (*str*) -

        **[REQUIRED]**

        The name of the volume to delete.

- **describe_volume()** -

    Gets detailed information about a specific volume.

    **PARAMETERS:**

    - **volume_name** (*str*) -

        **[REQUIRED]**

        The name of the volume to describe.

- **list_volumes()** -

    Queries the list of volumes under a specified project in pages.

    **PARAMETERS:**

    - **project_id** (*str*) -

        **[REQUIRED]**

        The ID of the project.

    - **current_page** (*int*) -

        The current page. The value defaults to **1**.

    - **page_size** (*int*) -

        The size of each page. The value defaults to **10**.

    - **volume_type** (*str*) -

        A filter by volume type. Possible values are **MANAGED** or **EXTERNAL**.
