# list_volumes()

This operation lists all volumes within a specific project in a paginated manner.

## Request Syntax

```python
list_volumes(
    project_id: str,
    current_page: int,
    page_size: int
)
```

**PARAMETERS**

- **project_id** (*str*) -

    **[REQUIRED]**

    The ID of the project to which the volume to be created belongs.

- **current_page** (*int*) -

    The current page of the volume lists. When specified, only the volumes on the specified page will be returned.

    This parameter is optional and its value defaults to `1`, indicating that the first page will be returned.

- **page_size** (*int*) -

    The  page  size of the volume lists.  When specified, only the specified number of volumes will be returned.

    This parameter is optional and its value defaults to `10`, indicating that a list of up to 10 volumes will be returned.

**RETURN TYPE**

An object.

**RETURNS**

An object with the following data structure:

```python
{
    "count": 1,
    "currentPage": 1,
    "pageSize": 10,
    "volumes": [
        {
            "volumeName": "my_volume"
        }        
    ]
}
```

**PARAMETERS**

- **count** (*int*) -

    The total number of volumes found.

- **currentPage** (*int*) -

    The current page.

- **pageSize** (*int*) -

    The maximum number of volumes per page.

- **volumes** (*list*) -

    A volume list.

    - **volumeName** (*str*) -

        The name of a volume.

## Example

```python
from pymilvus.bulk_writer.volume_manager import VolumeManager

volume_manager = VolumeManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY"
)

volume_list = volume_manager.list_volumes(
    project_id="proj-xxxxxxxxxxxxxxxxxxxxxxx"
)

print(f"\nlistVolumes results: \n", volume_list.json()['data'])

# listVolumes results: 
# 
# {
#     "count": 1,
#     "currentPage": 1,
#     "pageSize": 10,
#     "volumes": [
#         {
#             "volumeName": "my_volume"
#         }        
#     ]
# }
```

