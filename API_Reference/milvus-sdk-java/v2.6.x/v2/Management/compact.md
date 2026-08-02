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

**RETURNS:**

*CompactResp*

**EXCEPTIONS:**

- **MilvusClientExceptions**

    Raised when any error occurs during this operation. Inspect the exception message for the exact failure reason.

## Example

Starts compaction for a collection, with optional clustering, L0, and target-size controls.

```java
CompactResp response = client.compact(CompactReq.builder()
    .databaseName("default")
    .collectionName("books")
    .isClustering(true)
    .targetSize(512L * 1024 * 1024)
    .build());
```
