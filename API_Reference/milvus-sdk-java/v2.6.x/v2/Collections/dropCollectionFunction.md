# dropCollectionFunction()

This operation drops an existing function from a collection.

```java
public void dropCollectionFunction(DropCollectionFunctionReq request)
```

## Request Syntax

```java
dropCollectionFunction(DropCollectionFunctionReq.builder()
    .collectionName(String collectionName)
    .databaseName(String databaseName)
    .functionName(String functionName)
    .build()
);
```

**BUILDER METHODS:**

- `collectionName(String collectionName)` -

    **[REQUIRED]**

    The name of the collection.

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `functionName(String functionName)` -

    **[REQUIRED]**

    The name of the function to drop.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.collection.request.DropCollectionFunctionReq;

client.dropCollectionFunction(DropCollectionFunctionReq.builder()
    .collectionName("my_collection")
    .functionName("bm25")
    .build());
```
