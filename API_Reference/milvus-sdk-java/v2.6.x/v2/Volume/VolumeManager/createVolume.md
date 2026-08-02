# createVolume()

Creates a volume backed by the specified storage integration and path.

```java
public void createVolume(CreateVolumeRequest request)
```

## Request Syntax

```java
CreateVolumeRequest.builder()
    .projectId(projectId)
    .regionId(regionId)
    .volumeName(volumeName)
    .type(type)
    .storageIntegrationId(storageIntegrationId)
    .path(path)
    .build();
```

**BUILDER METHODS:**

- `projectId(String projectId)`

    The ID of the Zilliz Cloud project.

- `regionId(String regionId)`

    The ID of the cloud region.

- `volumeName(String volumeName)`

    The name of the volume.

- `type(String type)`

    The volume type: `MANAGED` or `EXTERNAL`. The default is `MANAGED`.

- `storageIntegrationId(String storageIntegrationId)`

    The ID of the storage integration used by an external volume.

- `path(String path)`

    The storage path for an external volume. If set, the path must end with `/`; otherwise the storage integration root is used.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Creates a volume backed by the specified storage integration and path.

```java
volumeManager.createVolume(CreateVolumeRequest.builder()
    .projectId(PROJECT_ID)
    .regionId(REGION_ID)
    .volumeName("bulk-data")
    .type("S3")
    .storageIntegrationId(STORAGE_INTEGRATION_ID)
    .path("s3://bucket/prefix")
    .build());
```
