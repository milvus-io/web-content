# listRestoreSnapshotJobs()

This operation lists restore snapshot jobs, optionally scoped to a database and collection.

```java
public ListRestoreSnapshotJobsResp listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq request)
```

## Request Syntax

```java
listRestoreSnapshotJobs(ListRestoreSnapshotJobsReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the collection. If omitted, the current database is used.

- `collectionName(String collectionName)`

    The name of the collection associated with the snapshot operation.

**RETURNS:**

*ListRestoreSnapshotJobsResp*

A **ListRestoreSnapshotJobsResp** object containing the restore snapshot jobs that match the request filter. The object has the following fields:

- **jobs** (*List\<RestoreSnapshotJobInfo\>*) -

    The restore jobs that match the request filter. Each **RestoreSnapshotJobInfo** has the following fields:

    - **jobId** (*Long*) -

        The ID of the restore job.

    - **snapshotName** (*String*) -

        The name of the snapshot to restore.

    - **dbName** (*String*) -

        The name of the database.

    - **collectionName** (*String*) -

        The name of the collection.

    - **state** (*String*) -

        The state of the restore job.

    - **progress** (*Integer*) -

        The progress of the restore job, expressed as a percentage.

    - **reason** (*String*) -

        The reason the restore job failed, if any.

    - **startTime** (*Long*) -

        The start time of the restore job.

    - **timeCost** (*Long*) -

        The time cost of the restore job, in seconds.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception is raised when required parameters are missing, numeric parameters are out of range, or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.service.snapshot.request.ListRestoreSnapshotJobsReq;
import io.milvus.v2.service.snapshot.response.ListRestoreSnapshotJobsResp;

ListRestoreSnapshotJobsReq request = ListRestoreSnapshotJobsReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .build();

ListRestoreSnapshotJobsResp response = client.listRestoreSnapshotJobs(request);
```
