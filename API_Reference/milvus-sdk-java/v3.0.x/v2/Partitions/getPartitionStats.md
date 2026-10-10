# getPartitionStats()

Returns the complete partition statistics map in addition to the entity count.

```java
public GetPartitionStatsResp getPartitionStats(GetPartitionStatsReq request)
```

## Request Syntax

```java
GetPartitionStatsReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition.

**RETURN TYPE:**

*GetPartitionStatsResp*

**RETURNS:**

A **GetPartitionStatsResp** object that contains `numOfEntities` and the complete stats map returned by Milvus.

- `getNumOfEntities()` (*Long*) -

    The number of entities in the partition.

- `getStats()` (*Map\<String, String\>*) -

    The complete stats map returned by Milvus.

**EXCEPTIONS