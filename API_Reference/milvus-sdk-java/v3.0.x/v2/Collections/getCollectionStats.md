# getCollectionStats()

Returns the complete collection statistics map in addition to the entity count.

```java
public GetCollectionStatsResp getCollectionStats(GetCollectionStatsReq request)
```

## Request Syntax

```java
GetCollectionStatsReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .build();
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

**RETURN TYPE:**

*GetCollectionStatsResp*

**RETURNS:**

A **GetCollectionStatsResp** object that contains `numOfEntities` and the complete stats map returned by Milvus.

- `getNumOfEntities()` (*Long*) -

    The number of entities in the collection.

- `getStats()` (*Map\<String, String\>*) -

    The complete stats map returned by Milvus.

**EXCEPTIONS