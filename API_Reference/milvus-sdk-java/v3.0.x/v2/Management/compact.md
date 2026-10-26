# compact()

This operation compacts the collection by merging small segments into larger ones. It is recommended to call this operation after inserting a large amount of data into a collection.

```java
public CompactResp compact(CompactReq request)
```

## Request Syntax

```java
compact(CompactReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .isClustering(Boolean isClustering)
    .isL0(Boolean isL0)
    .targetSize(Long targetSize)
    .targetSizeUnit(String targetSizeUnit)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)`

    The name of the target collection.

- `isClustering(Boolean isClustering)`

    Whether to perform clustering compaction. Defaults to `Boolean.FALSE`.

- `isL0(Boolean isL0)`

    Whether to request L0 compaction. Defaults to `Boolean.FALSE` and is independent from clustering compaction.

- `targetSize(Long targetSize)`

    The target segment size expressed in `targetSizeUnit`. A `null` value uses the server default.

- `targetSizeUnit(String targetSizeUnit)`

    The unit of `targetSize`. Supported values: `"b"`, `"kb"`, `"mb"`, `"gb"`, `"tb"`, `"pb"`. Defaults to `"mb"`.

**RETURN TYPE:**

*CompactResp*

**RETURNS:**

A **CompactResp** object that contains a compaction ID.

- `getCompactionID()` (*Long*) -

    The ID of the compaction.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

Starts compaction for a collection, with optional clustering, L0, and target-size controls.

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.utility.request.CompactReq;
import io.milvus.v2.service.utility.response.CompactResp;

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
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .build());

// 3. Compact the collection
CompactResp response = client.compact(CompactReq.builder()
    .databaseName("default")
    .collectionName("test")
    .build());
```
