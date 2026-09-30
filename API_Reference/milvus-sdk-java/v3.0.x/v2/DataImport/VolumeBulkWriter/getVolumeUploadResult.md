# getVolumeUploadResult()

This operation retrieves the result of the update to the specified volume.

```java
public UploadFilesResult getVolumeUploadResult()
```

**PARAMETERS:**

*None*

**RETURN TYPE:**

*UploadFilesResult*

**RETURNS:**

An UploadFilesResult instance that has the following methods:

- `getVolumeName()`

    Returns the name of the target volume.

- `setVolumeName()`

    Sets the name of the target volume.

- `getPath()`

    Returns the path of the uploaded file to the target volume.

- `setPath()`

    Sets the path of the uploaded file to the target volume.

- `toString()`

    Strigifies the UploadFilesResult instance.

## Example

```java
VolumeBulkWriter writer = new VolumeBulkWriter(config);
// ... append rows
UploadFilesResult result = writer.getVolumeUploadResult();

System.out.println("Target volume: " + result.getVolumeName());
System.out.println("Target paths: " + result.getPath());
```

