# VolumeManager

A `VolumeManager` instance maintains a connection to Zilliz Cloud's Volume service. Before creating, listing, or deleting volumes, you need to initiate a `VolumeManager` instance.

```java
io.milvus.bulkwriter.VolumeManager
```

<div class="alert note">

A volume is an intermediate storage spot where you can hold your data for further processing, such as data merging, migration, or importing. For details, refer to [Volume](https://docs.zilliz.com/docs/volume).

</div>

## Constructor

This constructor initializes a new `VolumeManager` instance designed to maintain a connection to Zilliz Cloud's Volume service.

```java
VolumeManager(
    VolumeManagerParam.newBuilder()
        .withCloudEndpoint(String cloudEndpoint)
        .withApiKey(String apiKey)
        .build();
)
```

**PARAMETERS:**

- **cloudEndpoint** (*str*) -

    **[REQUIRED]**

    The Zilliz Cloud endpoint, which is `https:*//*api.cloud.zilliz.com`.

- **apiKey** (*str*) -

    **[REQUIRED]**

    Your Zilliz Cloud API key with sufficient permissions to manage volumes on Zilliz Cloud's Volume service. To obtain a Zilliz Cloud API key, follow the steps on [API Keys](https://docs.zilliz.com/docs/manage-api-keys).

**RETURN TYPE:**

`VolumeManager`

**RETURNS:**

A `VolumeManager` instance.

## Examples

```java
import io.milvus.bulkwriter.VolumeManager;
import io.milvus.bulkwriter.VolumeManagerParam;

VolumeManagerParam volumeManagerParam = VolumeManagerParam.newBuilder()
    .withCloudEndpoint("https://api.cloud.zilliz.com")
    .withApiKey("YOUR_API_KEY")
    .build();

VolumeManager volumeManager = new VolumeManager(volumeManagerParam);
```
