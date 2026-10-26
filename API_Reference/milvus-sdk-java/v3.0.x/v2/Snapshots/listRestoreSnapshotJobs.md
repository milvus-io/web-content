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

**RETURN TYPE:**

*ListRestoreSnapshotJobsResp*

**RETURNS:**

A **ListRestoreSnapshotJobsResp** object containing the restore snapshot jobs that match the request filter.

- `getJobs()` (*List\<RestoreSnapshotJobInfo\>*) -

    The restore jobs that match the request filter. Each **RestoreSnapshotJobInfo** has the following getters (see [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md)):

    - `getJobId()` (*Long*) -

        The ID of the restore job.

    - `getSnapshotName()` (*String*) -

        The name of the snapshot to restore.

    - `getDbName()` (*String*) -

        The name of the database.

    - `getCollectionName()` (*String*) -

        The name of the collection.

    - `getState()` (*String*) -

        The state of the restore job.

    - `getProgress()` (*Integer*) -

        The progress of the restore job, expressed as a percentage.

    - `getReason()` (*String*) -

        The reason the restore job failed, if any.

    - `getStartTime()` (*Long*) -

        The start time of the restore job.

    - `getTimeCost()` (*Long*) -

        The time cost of the restore job, in seconds.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception is raised when required parameters are missing, numeric parameters are out of range, or the server returns an error for this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import java.util.Collections;
import io.milvus.v2.service.snapshot.request.ListRestoreSnapshotJobsReq;
import io.milvus.v2.service.snapshot.response.ListRestoreSnapshotJobsResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field and a "vector" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("book_chunks")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. List the restore snapshot jobs
ListRestoreSnapshotJobsReq request = ListRestoreSnapshotJobsReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .build();

ListRestoreSnapshotJobsResp response = client.listRestoreSnapshotJobs(request);
```
