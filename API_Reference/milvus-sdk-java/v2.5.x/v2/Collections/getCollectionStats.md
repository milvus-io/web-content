# getCollectionStats()

This operation lists the statistics collected on a specific collection.

```java
public GetCollectionStatsResp getCollectionStats(GetCollectionStatsReq request)
```

## Request Syntax

```java
getCollectionStats(GetCollectionStatsReq.builder()
    .collectionName(String collectionName)
    .build()
)
```

**BUILDER METHODS:**

- `collectionName(String collectionName)`

    The name of a collection.

**RETURN TYPE:**

*GetCollectionStatsResp*

**RETURNS:**

A **GetCollectionStatsResp** object containing collected statistics on the specified collection.

**PARAMETERS:**

- **numOfEntities** (*long*)

    The count of entities in the collection.

**EXCEPTIONS:**

- **MilvusClientExceptions**

    This exception will be raised when any error occurs during this operation.

## Example

```java
GetCollectionStatsReq getCollectionStatsReq = GetCollectionStatsReq.builder()
        .collectionName("test")
        .build();
GetCollectionStatsResp getCollectionStatsResp = client.getCollectionStats(getCollectionStatsReq);
```

