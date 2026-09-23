# VolumeFileManager

A `VolumeFileManager` instance maintains a connection to a specific volume on Zilliz Cloud's Volume service. Before uploading data files to a volume, you need to initiate a `VolumeFileManager` instance.

```java
io.milvus.bulkwriter.VolumeFileManager
```

<div class="alert note">

A volume is an intermediate storage spot where you can hold your data for further processing, such as data merging, migration, or importing. For details, refer to [Volume](https://docs.zilliz.com/docs/volume).

</div>

## Constructor

This constructor initializes a new `VolumeFileManager` instance designed to maintain a connection to a specific volume on Zilliz Cloud's Volume service.

```java
VolumeFileManager(
    VolumeFileManager.newBuilder()
        .withCloudEndpoint(String cloudEndpoint)
        .withApiKey(String apiKey)
        .withVolumeName(String volumeName)
        .build();
)
```

**PARAMETERS:**

- **cloudEndpoint** (*str*) -

    **[REQUIRED]**

    The Zilliz Cloud endpoint, which is `https://api.cloud.zilliz.com`.

- **apiKey** (*str*) -

    **[REQUIRED]**

    Your Zilliz Cloud API key with sufficient permissions to manage volumes on Zilliz Cloud's Control Plane. To obtain a Zilliz Cloud API key, follow the steps on [API Keys](https://docs.zilliz.com/docs/manage-api-keys).

- **volumeName** (*str*) -

    **[REQUIRED]**

    The name of the target volume of this operation.

**RETURN TYPE:**

`VolumeFileManager`

**RETURNS:**

A `VolumeFileManager` instance.

## Examples

```java
import io.milvus.bulkwriter.VolumeFileManager;
import io.milvus.bulkwriter.VolumeFileManagerParam;

VolumeFileManagerParam volumeFileManagerParam = VolumeFileManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .withVolumeName("my_volume")
    .build();

VolumeFileManager volumeFileManager = new VolumeFileManager(volumeFileManagerParam);
```

