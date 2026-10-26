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
import io.milvus.v2.service.snapshot.request.RestoreSnapshotReq;
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

// 3. Create a snapshot of the collection
client.createSnapshot(CreateSnapshotReq.builder()
    .databaseName("default")
    .collectionName("book_chunks")
    .snapshotName("book_chunks_backup")
    .build());

// 4. Restore the snapshot to a new collection
RestoreSnapshotReq request = RestoreSnapshotReq.builder()
    .snapshotName("book_chunks_backup")
    .sourceCollectionName("book_chunks")
    .targetCollectionName("book_chunks_restored")
    .sourceDbName("default")
    .targetDbName("default")
    .build();

RestoreSnapshotResp response = client.restoreSnapshot(request);
```
