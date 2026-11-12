# UploadProgress

A read-only snapshot of the progress of a volume file upload, passed to the **progress_callback** of [VolumeFileManager.upload_file_to_volume()](VolumeFileManager.md).

```python
@dataclass(frozen=True)
class UploadProgress:
    uploaded_bytes: int
    total_bytes: int
    completed_files: int
    total_files: int
    current_file: str
    current_file_uploaded_bytes: int
    current_file_total_bytes: int
    percent: float
```

**Attributes:**

- **uploaded_bytes** (*int*)

    The number of bytes uploaded so far.

- **total_bytes** (*int*)

    The total number of bytes to upload.

- **completed_files** (*int*)

    The number of files that have been fully uploaded.

- **total_files** (*int*)

    The total number of files to upload.

- **current_file** (*str*)

    The path of the file currently being uploaded.

- **current_file_uploaded_bytes** (*int*)

    The number of bytes uploaded for the current file.

- **current_file_total_bytes** (*int*)

    The total number of bytes of the current file.

- **percent** (*float*)

    The overall upload progress as a percentage from 0 to 100.
