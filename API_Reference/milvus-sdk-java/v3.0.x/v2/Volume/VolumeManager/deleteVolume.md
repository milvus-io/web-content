# deleteVolume()

This operation deletes a volume.

```java
public void deleteVolume(DeleteVolumeRequest request)
```

## Request Syntax

```java
deleteVolume(DeleteVolumeRequest.builder()
    .volumeName(String volumeName)
    .build();
)
```

**PARAMETERS**

- **volumeName** (*str*) -

    **[REQUIRED]**

    The name of the volume to delete.

**RETURN TYPE**

*void*

**RETURNS**

None

## Example

```java
import io.milvus.bulkwriter.VolumeManager;
import io.milvus.bulkwriter.VolumeManagerParam;
import io.milvus.bulkwriter.request.volume.DeleteVolumeRequest;

VolumeManagerParam volumeManagerParam = VolumeManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .build();

VolumeManager volumeManager = new VolumeManager(volumeManagerParam);

DeleteVolumeRequest request = DeleteVolumeRequest.builder()
    .volumeName("my_volume")
    .build();

volumeManager.deleteVolume(request);

System.out.printf("\nVolume %s deleted%n", "my_volume");

// Volume my_volume deleted
```
