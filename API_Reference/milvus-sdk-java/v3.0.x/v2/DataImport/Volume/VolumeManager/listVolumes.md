# listVolumes()

This operation lists all volumes within a specific project in a paginated manner.

```java
public ListVolumesResponse listVolumes(ListVolumesRequest request)
```

## Request Syntax

```java
listVolumes(ListVolumesRequest.builder()
    .projectId(String projectId)
    .currentPage(Integer currentPage)
    .pageSize(Integer pageSize)
    .build();
)
```

**PARAMETERS**

- **projectId** (*str*) -

    **[REQUIRED]**

    The ID of the project to which the volume to be created belongs.

- **currentPage** (*int*) -

    The current page of the volume lists. When specified, only the volumes on the specified page will be returned.

    This parameter is optional and its value defaults to `1`, indicating that the first page will be returned.

- **pageSize** (*int*) -

    The current page size of the volume lists. When specified, only the specified number of volumes will be returned.

    This parameter is optional and its value defaults to `10`, indicating that a list of up to 10 volumes will be returned.

**RETURN TYPE**

*ListVolumesResponse*

**RETURNS**

A **ListVolumesResponse** object that contains a list of volumes in a paginated manner.

- **count** (*Integer*) -

    The total number of volumes found.

- **currentPage** (*Integer*) -

    The current page.

- **pageSize** (*Integer*) -

    The maximum number of volumes per page.

- **volumes** (*List<VolumeInfo>*) -

    A list of `VolumeInfo` instances.

    - **volumeName** (*String*) -

        The name of a volume.

## Example

```java
import com.google.gson.Gson;
import io.milvus.bulkwriter.VolumeManager;
import io.milvus.bulkwriter.VolumeManagerParam;
import io.milvus.bulkwriter.request.volume.ListVolumesRequest;
import io.milvus.bulkwriter.response.volume.ListVolumesResponse;

VolumeManagerParam volumeManagerParam = VolumeManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .build();
        
VolumeManager volumeManager = new VolumeManager(volumeManagerParam);

ListVolumesRequest request = ListVolumesRequest.builder()
    .projectId("proj-xxxxxxxxxxxxxxxxxxxxxxx")
    .currentPage(1)
    .pageSize(10)
    .build();
    
ListVolumesResponse listVolumesResponse = volumeManager.listVolumes(request);

System.out.println("\nlistVolumes results: " + new Gson().toJson(listVolumesResponse));

// listVolumes results: 
// 
// {
//     "count": 1,
//     "currentPage": 1,
//     "pageSize": 10,
//     "volumes": [
//         {
//             "volumeName": "my_volume"
//         }        
//     ]
// }
```

