# getQuerySegmentInfo()

This operation gets information about persistent segments of a collection from the query nodes, including the number of entities.

```java
public GetQuerySegmentInfoResp getQuerySegmentInfo(GetQuerySegmentInfoReq request)
```

## Request Parameters

```java
getQuerySegmentInfo(GetQuerySegmentInfoReq.builder()
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of the target collection.

**RETURN TYPE:**

*GetQuerySegmentInfoResp*

**RETURNS:**

A **GetQuerySegmentInfoResp** object that contains detailed information about the persisted segments in the specified collection, including the number of entities in each of these segments. The object has the following parameters:

- **segmentInfos** (*List\<PersistentSegmentInfo>*) -

    A list of segments, each represented by a **PersistentSegmentInfo** object, which has the following fields

    - **segmentID** (*Long*) -

        The ID of the current segment.

    - **collectionID** (*Long*) -

        The ID of the collection to which the current segment belongs.

    - **partitionID** (*Long*) -

        The ID of the partition to which the current segment belongs.

    - **memSize** (*Long*) -

        The size that the current segment takes up in memory.

    - **numOfRows** (*Long*) -

        The number of entities in the current segment.

    - **indexName** (*String*) -

        The name of the index that is related to the current segment.

    - **indexID** (*Long*) -

        The ID of the index that is related to the current segment.

    - **state** (*String*) -

        The state of the current segment. Possible values are: "Growing", "Sealed", "Flushed", "Flushing", "Dropped", "Importing".

    - **level** (*String*) -

        The compaction level of the current segment. Possible values are : "Legacy", "L0", "L1", "L2".

    - **nodeIDs** (*List\<Long>*) -

        A list of query node IDs.

    - **isSorted** (*Boolean*) -   

        Whether the entities in the current segment are sorted.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.GetQuerySegmentInfoReq;
import io.milvus.v2.service.utility.response.GetQuerySegmentInfoResp;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Get segment info
GetQuerySegmentInfoResp segInfoResp = client.getQuerySegmentInfo(GetQuerySegmentInfoReq.builder()
        .collectionName("test")
        .build());
```

