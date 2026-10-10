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

**RETURN TYPE:**

*RestoreSnapshotResp*

**RETURNS:**

A **RestoreSnapshotResp** object containing the restore snapshot job ID.

- `getJobId()` (*Long*) -

    The ID of the restore job.

**EXCEPTIONS