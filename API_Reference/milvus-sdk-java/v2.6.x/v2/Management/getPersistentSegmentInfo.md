# getPersistentSegmentInfo()

This operation gets information about persistent segments of a collection from the data nodes, including the number of entities.

```java
public GetPersistentSegmentInfoResp getPersistentSegmentInfo(GetPersistentSegmentInfoReq request)
```

## Request Syntax

```java
getPersistentSegmentInfo(GetPersistentSegmentInfoReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of the target collection.

**RETURN TYPE:**

*GetPersistentSegmentInfoResp*

**RETURNS:**

A **GetPersistentSegmentInfoResp** object that contains detailed information about the persisted segments in the specified collection, including the number of entities in each of these segments. The object has the following getters:

- `getSegmentInfos()` (*List<PersistentSegmentInfo>*) -

    A list of segments, each represented by a **PersistentSegmentInfo** object, which exposes the following getters

    - `getSegmentID()` (*Long*) -

        The ID of the current segment.

    - `getCollectionID()` (*Long*) -

        The ID of the collection to which the current segment belongs.

    - `getPartitionID()` (*Long*) -

        The ID of the partition to which the current segment belongs.

    - `getCollectionName()` (*String*) -

        The name of the collection to which the current segment belongs.

    - `getNumOfRows()` (*Long*) -

        The number of entities in the current segment.

    - `getState()` (*String*) -

        The state of the current segment. Possible values are: "Growing", "Sealed", "Flushed", "Flushing", "Dropped", "Importing".

    - `getLevel()` (*String*) -

        The compaction level of the current segment. Possible values are : "Legacy", "L0", "L1", "L2".

    - `getStorageVersion()` (*Long*) -

        The storage version of the current segment.

    - `getIsSorted()` (*Boolean*) -   

        Whether the entities in the current segment are sorted.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.GetPersistentSegmentInfoReq;
import io.milvus.v2.service.utility.response.GetPersistentSegmentInfoResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get segment info
GetPersistentSegmentInfoResp segInfoResp = client.getPersistentSegmentInfo(GetPersistentSegmentInfoReq.builder()
        .collectionName(randomCollectionName)
        .build());
```
