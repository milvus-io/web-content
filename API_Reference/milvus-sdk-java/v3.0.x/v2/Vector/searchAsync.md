# searchAsync()

Performs a vector search asynchronously and returns a future.

```java
public CompletableFuture<SearchResp> searchAsync(SearchReq request)
```

This method uses the same request parameters as `search()` but returns a `CompletableFuture<SearchResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<SearchResp> future = client.searchAsync(SearchReq.builder()
    .collectionName(String collectionName)
    .data(List<BaseVector> data)
    .annsField(String annsField)
    .limit(long limit)
    .build());
```

For the full list of `SearchReq` builder methods, refer to [search()](search.md).

**RETURNS:**

*CompletableFuture\<SearchResp\>*

A future completed with a **SearchResp** object that contains search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets, or completed exceptionally when the operation fails. The **SearchResp** object has the following fields:

- **searchResults** (*List\<List\<SearchResult\>\>*) -

    The search results, one list per query vector. Each **SearchResult** has the following fields:

    - **entity** (*Map\<String, Object\>*) -

        The retrieved entity data.

    - **score** (*Float*) -

        The similarity score of the result.

    - **id** (*Object*) -

        The primary key value of the result.

    - **primaryKey** (*String*) -

        The primary key value rendered as a string.

    - **highlightResults** (*Map\<String, HighlightResult\>*) -

        The highlighted text fragments for each requested field, keyed by field name.

    - **elementOffset** (*Long*) -

        For struct-array element-level queries, the index of the matched element within the array. Null for ordinary queries.

- **sessionTs** (*long*) -

    The session timestamp used for the search.

- **recalls** (*List\<Float\>*) -

    The recall values of the search, one per query vector.

- **cost** (*Long*) -

    The time cost of the search operation, in milliseconds.

- **scannedRemoteBytes** (*Long*) -

    The number of bytes scanned from remote storage.

- **scannedTotalBytes** (*Long*) -

    The total number of bytes scanned during the search.

- **cacheHitRatio** (*Float*) -

    The cache hit ratio of the search.

- **aggregationBuckets** (*List\<List\<AggregationBucket\>\>*) -

    The aggregation buckets, one list per query vector.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when request validation, transport, or server execution fails.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;

import java.util.Collections;
import java.util.concurrent.CompletableFuture;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

CompletableFuture<SearchResp> future = client.searchAsync(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f})))
        .annsField("vector")
        .limit(10)
        .build());
SearchResp response = future.get();
```
