# flush()

This operation flushes the streaming data onto the disk and seals the current segment.

```java
public void flush(FlushReq request)
```

## Request Syntax

```java
flush(FlushReq.builder()
    .databaseName(String databaseName)
    .collectionNames(List<String> collectionNames)
    .waitFlushedTimeoutMs(Long waitFlushedTimeoutMs)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionNames(List<String> collectionNames)` -

    A list of collection names.

- `waitFlushedTimeoutMs(Long waitFlushedTimeoutMs)` -

    The timeout in milliseconds to wait for flush completion.

**RETURNS:**

*void*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.utility.request.FlushReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Compact a collection
client.flush(FlushReq.builder()
    .collectionNames(Collections.singletonList("my_collection"))
    .build();
);
```
