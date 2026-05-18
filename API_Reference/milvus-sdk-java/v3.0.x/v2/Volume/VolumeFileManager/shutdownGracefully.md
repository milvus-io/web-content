# shutdownGracefully()

This operation gracefully shuts down the internal executor service of the VolumeFileManager, allowing pending upload tasks to complete before termination.

```java
public void shutdownGracefully()
```

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.bulkwriter.VolumeFileManager;
import io.milvus.bulkwriter.VolumeFileManagerParam;
import io.milvus.bulkwriter.common.clientenum.ConnectType;
import io.milvus.bulkwriter.model.UploadFilesResult;
import io.milvus.bulkwriter.request.volume.UploadFilesRequest;

// Initialize VolumeFileManager
VolumeFileManagerParam param = VolumeFileManagerParam.newBuilder()
        .withCloudEndpoint("https://api.cloud.zilliz.com")
        .withApiKey("your_api_key")
        .withVolumeName("your_volume_name")
        .withConnectType(ConnectType.AUTO)
        .build();
VolumeFileManager manager = new VolumeFileManager(param);

// Upload files asynchronously
UploadFilesRequest request = UploadFilesRequest.builder()
        .sourceFilePath("/path/to/data/")
        .targetVolumePath("data/")
        .build();
UploadFilesResult result = manager.uploadFilesAsync(request).get();

// Gracefully shut down the manager when done
manager.shutdownGracefully();
```
