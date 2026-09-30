# pinSnapshotData()

This operation pins snapshot data for a limited time so it is not garbage-collected while being copied or inspected.

```java
public PinSnapshotDataResp pinSnapshotData(PinSnapshotDataReq request)
```

## Request Syntax

```java
pinSnapshotData(PinSnapshotDataReq.builder()
    .snapshotName(String snapshotName)
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .ttlSeconds(Long ttlSeconds)
    .build()
)
```

**BUILDER METHODS:**

- `snapshotName(String snapshotName)`

    The name of the snapshot.

- `databaseName(String databaseName)`

    The name of the database that contains the collection. If omitted, the current database is used.

- `collectionName(String collectionName)`

    The name of the collection associated with the snapshot operation.

- `ttlSeconds(Long ttlSeconds)`

    The time-to-live in seconds for the snapshot data pin. Use `0L` to use the server default behavior.

**RETURNS:**

*PinSnapshotDataResp*

A response containing the pin ID for the pinned snapshot data.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception is raised when required parameters are missing, numeric parameters are out of range, or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.service.snapshot.request.PinSnapshotDataReq;
import io.milvus.v2.service.snapshot.response.PinSnapshotDataResp;

PinSnapshotDataReq request = PinSnapshotDataReq.builder()
    .snapshotName("book_chunks_backup")
    .databaseName("default")
    .collectionName("book_chunks")
    .ttlSeconds(3600L)
    .build();

PinSnapshotDataResp response = client.pinSnapshotData(request);
```
