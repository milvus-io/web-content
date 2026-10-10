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

**EXCEPTIONS