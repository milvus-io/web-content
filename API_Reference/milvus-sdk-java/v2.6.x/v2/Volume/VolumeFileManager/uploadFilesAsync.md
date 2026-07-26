# uploadFilesAsync()

Uploads a local file or directory to a volume asynchronously.

```java
public CompletableFuture<UploadFilesResult> uploadFilesAsync(UploadFilesRequest request)
```

## Request Syntax

```java
UploadFilesRequest.builder()
    .sourceFilePath(sourceFilePath)
    .targetVolumePath(targetVolumePath)
    .uploadConcurrency(uploadConcurrency)
    .maxRetries(maxRetries)
    .retryIntervalMillis(retryIntervalMillis)
    .progressListener(progressListener)
    .partSizeBytes(partSizeBytes)
    .build();
```

**BUILDER METHODS:**

- `sourceFilePath(String sourceFilePath)`

    The full path of the local file or directory to upload. Directory paths must end with `/`.

- `targetVolumePath(String targetVolumePath)`

    The destination directory in the volume. Leave it empty for the root directory, or end it with `/` for a folder.

- `uploadConcurrency(int uploadConcurrency)`

    The maximum number of files uploaded concurrently. Defaults to **5**.

- `maxRetries(int maxRetries)`

    The maximum number of retries for each file. Defaults to **5**.

- `retryIntervalMillis(long retryIntervalMillis)`

    The interval between retries, in milliseconds. Defaults to **5,000** milliseconds.

- `progressListener(ProgressListener progressListener)`

    The optional `UploadFilesRequest.ProgressListener` callback that receives `UploadProgress` snapshots.

    - `UploadProgress` -

        The snapshot passed to `UploadFilesRequest.ProgressListener.onProgress(...)`.

        - `getUploadedBytes()` -

            Returns the bytes uploaded across all files.

        - `getTotalBytes()` -

            Returns the total bytes scheduled for upload.

        - `getCompletedFiles()` -

            Returns the number of files uploaded successfully.

        - `getTotalFiles()` -

            Returns the total number of files scheduled for upload.

        - `getCurrentFile()` -

            Returns the path of the file currently being uploaded.

        - `getCurrentFileUploadedBytes()` -

            Returns the uploaded bytes for the current file.

        - `getCurrentFileTotalBytes()` -

            Returns the total bytes in the current file.

        - `getPercent()` -

            Returns the aggregate upload percentage.

- `partSizeBytes(long partSizeBytes)`

    The multipart upload part size in bytes. A value of **0** or less selects the part size automatically.

**RETURNS:**

*CompletableFuture<UploadFilesResult>*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Uploads a local file or directory to a volume asynchronously.

```java
CompletableFuture<UploadFilesResult> future = volumeFileManager.uploadFilesAsync(
    UploadFilesRequest.builder()
        .sourceFilePath("/data/books.json")
        .targetVolumePath("imports/books.json")
        .uploadConcurrency(5)
        .progressListener(progress ->
            System.out.printf("Uploaded %.2f%% (%d/%d bytes)%n",
                progress.getPercent(),
                progress.getUploadedBytes(),
                progress.getTotalBytes()))
        .build());
UploadFilesResult result = future.get();
```
