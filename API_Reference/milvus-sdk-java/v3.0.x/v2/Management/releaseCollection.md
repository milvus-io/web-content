# releaseCollection()

This operation releases the data of a specific collection from memory.

```java
public void releaseCollection(ReleaseCollectionReq request)
```

## Request Syntax

```java
releaseCollection(ReleaseCollectionReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .async(Boolean async)
    .timeout(Long timeout)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `async(Boolean async)` -

    Whether to run the operation asynchronously. Defaults to `Boolean.TRUE`.

- `timeout(Long timeout)` -

    The timeout duration in milliseconds. Defaults to `60000L`.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.ReleaseCollectionReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Release collection "test"
ReleaseCollectionReq releaseCollectionReq = ReleaseCollectionReq.builder()
        .collectionName("test")
        .build();
client.releaseCollection(releaseCollectionReq);
```
