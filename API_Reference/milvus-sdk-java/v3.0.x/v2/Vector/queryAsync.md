# queryAsync()

Queries entities in a collection asynchronously and returns a future.

```java
public CompletableFuture<QueryResp> queryAsync(QueryReq request)
```

This method uses the same request parameters as `query()` but returns a `CompletableFuture<QueryResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<QueryResp> future = client.queryAsync(QueryReq.builder()
    .collectionName(String collectionName)
    .filter(String filter)
    .outputFields(List<String> outputFields)
    .build());
```

For the full list of `QueryReq` builder methods, refer to [query()](query.md).

**RETURNS:**

*CompletableFuture\<QueryResp\>*

A future completed with a **QueryResp** object that contains query rows and execution metrics, or completed exceptionally when the operation fails. The **QueryResp** object has the following fields:

- **queryResults** (*List\<QueryResult\>*) -

    The query result rows. Each **QueryResult** has the following fields:

    - **entity** (*Map\<String, Object\>*) -

        The field values of the result row.

    - **elementOffset** (*Long*) -

        For struct-array element-level queries (via `element_filter`), the index of the matched element within the array. Null for ordinary queries.

- **sessionTs** (*long*) -

    The session timestamp used for the query.

- **cost** (*Long*) -

    The time cost of the query operation, in milliseconds.

- **scannedRemoteBytes** (*Long*) -

    The number of bytes scanned from remote storage.

- **scannedTotalBytes** (*Long*) -

    The total number of bytes scanned during the query.

- **cacheHitRatio** (*Float*) -

    The cache hit ratio of the query.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when request validation, transport, or server execution fails.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

import java.util.Arrays;
import java.util.concurrent.CompletableFuture;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

CompletableFuture<QueryResp> future = client.queryAsync(QueryReq.builder()
        .collectionName("my_collection")
        .filter("age > 20")
        .outputFields(Arrays.asList("name", "age"))
        .build());
QueryResp response = future.get();
```
