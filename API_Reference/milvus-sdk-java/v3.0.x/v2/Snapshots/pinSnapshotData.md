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

**RETURN TYPE:**

*PinSnapshotDataResp*

**RETURNS:**

A **PinSnapshotDataResp** object containing the pin ID for the pinned snapshot data.

- `getPinId()` (*Long*) -

    The ID of the pin.

**EXCEPTIONS:**

- **MilvusClientException**

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
import io.milvus.v2.service.snapshot.request.PinSnapshotDataReq;
import io.milvus.v2.service.snapshot.response.PinSnapshotDataResp;

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

// 4. Pin the snapshot data
PinSnapshotDataReq request = PinSnapshotDataReq.builder()
    .snapshotName("book_chunks_backup")
    .databaseName("default")
    .collectionName("book_chunks")
    .ttlSeconds(3600L)
    .build();

PinSnapshotDataResp response = client.pinSnapshotData(request);

// 5. Unpin the snapshot data so it can be dropped later
client.unpinSnapshotData(io.milvus.v2.service.snapshot.request.UnpinSnapshotDataReq.builder()
    .pinId(response.getPinId())
    .build());
```
