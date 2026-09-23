# createVolume()

This operation creates volume.

```java
public void createVolume(CreateVolumeRequest request)
```

## Request Syntax

```java
createVolume(CreateVolumeRequest.builder()
    .projectId(String projectId)
    .regionId(String regionId)
    .volumeName(String volumeName)
    .build();
)
```

**PARAMETERS**

- **projectId** (*str*) -

    **[REQUIRED]**

    The ID of the project to which the volume to be created belongs.

- **regionId** (*str*) -

    **[REQUIRED]**

    The ID of the cloud region in which the volume will be created. You can use [List Cloud Regions](https://docs.zilliz.com/reference/restful/list-cloud-regions-v2) to view possible values.

- **volumeName** (*str*) -

    **[REQUIRED]**

    The name of the volume to create.

**RETURN TYPE**

*void*

**RETURNS**

None

## Example

```java
import io.milvus.bulkwriter.VolumeManager;
import io.milvus.bulkwriter.VolumeManagerParam;
import io.milvus.bulkwriter.request.volume.CreateVolumeRequest;

VolumeManagerParam volumeManagerParam = VolumeManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .build();
        
VolumeManager volumeManager = new VolumeManager(volumeManagerParam);

CreateVolumeRequest request = CreateVolumeRequest.builder()
    .projectId("proj-xxxxxxxxxxxxxxxxxxxxxxx")
    .regionId("aws-us-west-1")
    .volumeName("my_volume")
    .build();

volumeManager.createVolume(request);

System.out.printf("\nVolume %s created%n", "my_volume");

// Volume my_volume created
```

