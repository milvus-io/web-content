# truncateCollection()

This operation removes all data from a collection while preserving the collection schema, indexes, and aliases.

```java
client.truncateCollection(TruncateCollectionReq request)
```

## Request Syntax

```java
TruncateCollectionReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .build()
```

**BUILDER METHODS:**

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection to truncate.

- `databaseName(String databaseName)` -

    The name of the database containing the collection. If not specified, the default database is used.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException** - The specified collection does not exist or the server is unreachable.

## Example

```java
import io.milvus.v2.service.collection.request.TruncateCollectionReq;

TruncateCollectionReq req = TruncateCollectionReq.builder()
    .collectionName("my_collection")
    .build();

client.truncateCollection(req);
```
