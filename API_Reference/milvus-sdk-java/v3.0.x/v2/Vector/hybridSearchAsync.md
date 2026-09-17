# hybridSearchAsync()

Runs a multi-vector similarity search with a ranker asynchronously and returns a future.

```java
public CompletableFuture<SearchResp> hybridSearchAsync(HybridSearchReq request)
```

This method uses the same request parameters as `hybridSearch()` but returns a `CompletableFuture<SearchResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<SearchResp> future = client.hybridSearchAsync(HybridSearchReq.builder()
    .collectionName(String collectionName)
    .searchRequests(List<AnnSearchReq> searchRequests)
    .ranker(FunctionScore ranker)
    .limit(long limit)
    .build());
```

For the full list of `HybridSearchReq` builder methods, refer to [hybridSearch()](hybridSearch.md).

**RETURNS:**

*CompletableFuture\<SearchResp\>*

A future completed with a `SearchResp`, or completed exceptionally when the operation fails.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when request validation, transport, or server execution fails.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.response.SearchResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

CompletableFuture<SearchResp> future = client.hybridSearchAsync(HybridSearchReq.builder()
        .collectionName("my_collection")
        .searchRequests(Arrays.asList(
                AnnSearchReq.builder()
                        .vectorFieldName("dense_vector")
                        .vectors(Collections.singletonList(queryVector))
                        .build(),
                AnnSearchReq.builder()
                        .vectorFieldName("sparse_vector")
                        .vectors(Collections.singletonList(sparseVector))
                        .build()))
        .build());
SearchResp response = future.get();
```
