# getRestoreSnapshotState()

This operation gets the state and progress of a restore snapshot job.

```java
public GetRestoreSnapshotStateResp getRestoreSnapshotState(GetRestoreSnapshotStateReq request)
```

## Request Syntax

```java
getRestoreSnapshotState(GetRestoreSnapshotStateReq.builder()
    .jobId(Long jobId)
    .build()
)
```

**BUILDER METHODS:**

- `jobId(Long jobId)`

    The restore snapshot job ID returned by `restoreSnapshot()`.

**RETURN TYPE:**

*GetRestoreSnapshotStateResp*

**RETURNS:**

A **GetRestoreSnapshotStateResp** object containing restore job state, progress, reason, timing, and collection metadata.

- `getJobInfo()` (*[RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md)*) -

    The restore job information. See [RestoreSnapshotJobInfo](RestoreSnapshotJobInfo.md) for its getters.

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
import io.milvus.v2.service.snapshot.request.CreateSnapshotReq;
import io.milvus.v2.service.snapshot.request.GetRestoreSnapshotStateReq;
import io.milvus.v2.service.snapshot.request.RestoreSnapshotReq;
import io.milvus.v2.service.snapshot.response.GetRestoreSnapshotStateResp;
import io.milvus.v2.service.snapshot.response.RestoreSnapshotResp;

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


// 3. Create a snapshot and restore it to get a restore job ID
client.createSnapshot(CreateSnapshotReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .snapshotName("book_chunks_backup")
    .build());
RestoreSnapshotResp restoreResp = client.restoreSnapshot(RestoreSnapshotReq.builder()
    .snapshotName("book_chunks_backup")
    .sourceCollectionName("book_chunks")
    .targetCollectionName("book_chunks_restored")
    .sourceDbName("default")
    .targetDbName("default")
    .build());

// 4. Get the state of the restore job
GetRestoreSnapshotStateReq request = GetRestoreSnapshotStateReq.builder()
    .jobId(restoreResp.getJobId())
    .build();

GetRestoreSnapshotStateResp response = client.getRestoreSnapshotState(request);
```
