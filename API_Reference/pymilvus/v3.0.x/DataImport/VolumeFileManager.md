# VolumeFileManager

A **VolumeFileManager** instance manages the upload of local files to a Zilliz Cloud volume.

```python
class pymilvus.VolumeFileManager
```

## Constructor

Constructs a **VolumeFileManager** object with a set of parameters, such as **cloud_endpoint**, **api_key**, **volume_name**, etc.

```python
from pymilvus.bulk_writer import VolumeFileManager

manager = VolumeFileManager(
    cloud_endpoint="https://api.cloud.zilliz.com",
    api_key="YOUR_API_KEY",
    volume_name="book-volume",
)
```

**PARAMETERS:**

- **cloud_endpoint** (*str*) -

    **[REQUIRED]**

    The fixed cloud endpoint URL. For international regions, use `https://api.cloud.zilliz.com`; for regions in China, use `https://api.cloud.zilliz.com.cn`.

- **api_key** (*str*) -

    **[REQUIRED]**

    The API key associated with your organization.

- **volume_name** (*str*) -

    **[REQUIRED]**

    The name of the volume.

- **connect_type** (*ConnectType*) -

    The connection type used to access the volume.

    The value defaults to **ConnectType.AUTO**, which uses the internal endpoint when the volume is reachable through it and the public endpoint otherwise. You can also force the use of either the internal or the public endpoint.

**RETURN TYPE:**

*VolumeFileManager*

**RETURNS:**

A **VolumeFileManager** object.

## Methods

- **upload_file_to_volume()** -

    Uploads a local file or directory to the volume using paginated existence checks.

    **PARAMETERS:**

    - **source_file_path** (*str*) -

        **[REQUIRED]**

        The path of the local file or directory to upload.

    - **target_volume_path** (*str*) -

        **[REQUIRED]**

        The target path in the volume. Paths containing a `..` segment are rejected.

    - **upload_concurrency** (*int*) -

        The maximum number of files uploaded at the same time. The value defaults to **5**.

    - **max_retries** (*int*) -

        The number of additional attempts on retryable failures. A value of **0** disables retry. The value defaults to **5**.

    - **retry_interval** (*float*) -

        The number of seconds to wait between retries. The value defaults to **5.0**.

    - **progress_callback** (*Callable[[UploadProgress], None]*) -

        An optional callback that receives throttled [UploadProgress](UploadProgress.md) snapshots during the upload. The value defaults to **None**.

    - **part_size** (*int*) -

        The multipart upload part size in bytes. A value of **0** selects the part size automatically. The value defaults to **0**.

    - **upload_policy** (*[UploadPolicy](UploadPolicy.md)*) -

        The policy used to decide whether a target object can be skipped. The value defaults to **UploadPolicy.SKIP_IF_SAME_SIZE**.

    - **temporary_directory** (*str*) -

        The directory used for temporary upload manifests. The value defaults to **None**, which uses the system temporary directory.

    **RETURN TYPE:**

    *dict*

    **RETURNS:**

    A dictionary with the following keys:

    - **volumeName** (*str*)

        The name of the target volume.

    - **volume_name** (*str*)

        The name of the target volume.

    - **path** (*str*)

        The target path in the volume that holds the uploaded data.
