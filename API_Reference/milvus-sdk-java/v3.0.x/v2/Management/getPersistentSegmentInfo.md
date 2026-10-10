# getPersistentSegmentInfo()

This operation gets information about persistent segments of a collection from the data nodes, including the number of entities.

```java
public GetPersistentSegmentInfoResp getPersistentSegmentInfo(GetPersistentSegmentInfoReq request)
```

## Request Parameters

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

A **GetPersistentSegmentInfoResp** object that contains detailed information about the persisted segments in the specified collection, including the number of entities in each of these segments. The object has the following parameters:

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

**EXCEPTIONS