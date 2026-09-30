# restoreSnapshot()

This operation starts an asynchronous job to restore a snapshot into a target collection.

```java
public RestoreSnapshotResp restoreSnapshot(RestoreSnapshotReq request)
```

## Request Syntax

```java
restoreSnapshot(RestoreSnapshotReq.builder()
    .snapshotName(String snapshotName)
    .sourceCollectionName(String sourceCollectionName)
    .targetCollectionName(String targetCollectionName)
    .sourceDbName(String sourceDbName)
    .targetDbName(String targetDbName)
    .build()
)
```

**BUILDER METHODS:**

- `snapshotName(String snapshotName)`

    The name of the snapshot.

- `sourceCollectionName(String sourceCollectionName)`

    The name of the collection from which the snapshot was created.

- `targetCollectionName(String targetCollectionName)`

    The name of the collection to restore the snapshot into.

- `sourceDbName(String sourceDbName)`

    The database that contains the source collection. If omitted, the current database is used.

- `targetDbName(String targetDbName)`

    The database in which to create the restored collection. If omitted, the current database is used.

**RETURNS:**

*RestoreSnapshotResp*

A response containing the restore snapshot job ID.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception is raised when required parameters are missing, numeric parameters are out of range, or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.service.snapshot.request.RestoreSnapshotReq;
import io.milvus.v2.service.snapshot.response.RestoreSnapshotResp;

RestoreSnapshotReq request = RestoreSnapshotReq.builder()
    .snapshotName("book_chunks_backup")
    .sourceCollectionName("book_chunks")
    .targetCollectionName("book_chunks_restored")
    .sourceDbName("default")
    .targetDbName("default")
    .build();

RestoreSnapshotResp response = client.restoreSnapshot(request);
```
