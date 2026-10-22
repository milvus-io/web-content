# compact()

Starts compaction for a collection, with optional clustering, L0, and target-size controls.

```java
public CompactResp compact(CompactReq request)
```

## Request Syntax

```java
CompactReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .isClustering(isClustering)
    .isL0(isL0)
    .targetSize(targetSize)
    .targetSizeUnit(targetSizeUnit)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database that contains the target resource.

- `collectionName(String collectionName)`

    The name of the target collection.

- `isClustering(Boolean isClustering)`

    Whether to run a clustering compaction. Defaults to `false`.

- `isL0(Boolean isL0)`

    Whether to compact level-zero delete records. Defaults to `false`.

- `targetSize(Long targetSize)`

    The target segment size for the compaction operation.

- `targetSizeUnit(String targetSizeUnit)`

    The unit of **targetSize**. Supported values are `"b"`, `"kb"`, `"mb"` (default), `"gb"`, `"tb"`, and `"pb"`. Available in v2.6.25 or later.

**RETURN TYPE:**

*CompactResp*

**RETURNS:**

A **CompactResp** object that contains a compaction ID. The object exposes the following getters:

- `getCompactionID()` (*Long*) -

    The ID of the compaction.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

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
