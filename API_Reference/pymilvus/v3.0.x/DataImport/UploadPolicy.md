# UploadPolicy

An enumeration that defines how a [VolumeFileManager](VolumeFileManager.md) decides whether a target object can be skipped during upload.

```python
class UploadPolicy(str, Enum):
    OVERWRITE = "OVERWRITE"
    SKIP_IF_EXISTS = "SKIP_IF_EXISTS"
    SKIP_IF_SAME_SIZE = "SKIP_IF_SAME_SIZE"
    SIZE_AND_MTIME = "SIZE_AND_MTIME"
```

**Constants:**

- **OVERWRITE** (*"OVERWRITE"*)

    Always uploads the file, overwriting the target object.

- **SKIP_IF_EXISTS** (*"SKIP_IF_EXISTS"*)

    Skips the upload if the target object already exists.

- **SKIP_IF_SAME_SIZE** (*"SKIP_IF_SAME_SIZE"*)

    Skips the upload when the size of the remote object matches the local file.

- **SIZE_AND_MTIME** (*"SIZE_AND_MTIME"*)

    Skips the upload when the sizes match and the local file is no newer than the remote object.

## Methods

- **should_skip()** -

    Determines whether the upload of an object should be skipped based on this policy and the given file attributes.

    **RETURN TYPE:**

    *bool*

    **RETURNS:**

    **True** if the object should be skipped; otherwise, **False**.
