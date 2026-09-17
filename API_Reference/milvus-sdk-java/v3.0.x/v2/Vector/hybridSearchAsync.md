# hybridSearchAsync()

Asynchronously performs hybrid search that combines multiple vector searches with a reranking strategy. The request and builder parameters are identical to [hybridSearch()](hybridSearch.md); this variant returns a `CompletableFuture` instead of blocking.

```java
public CompletableFuture<SearchResp> hybridSearchAsync(HybridSearchReq request)
```

## Request Syntax

```java
CompletableFuture<SearchResp> future = client.hybridSearchAsync(HybridSearchReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionNames(partitionNames)
    .annsField(annsField)
    .topK(topK)
    .filter(filter)
    .outputFields(outputFields)
    .data(data)
    .ids(ids)
    .offset(offset)
    .limit(limit)
    .roundDecimal(roundDecimal)
    .searchParams(searchParams)
    .consistencyLevel(consistencyLevel)
    .ignoreGrowing(ignoreGrowing)
    .timezone(timezone)
    .orderByFields(orderByFields)
    .rerank(RRFRanker.builder().k(60).build())
    .build());
```

For the **BUILDER METHODS**, see [hybridSearch()](hybridSearch.md).

**RETURNS:**

*CompletableFuture\<SearchResp\>*

A future that completes with the search results once the server responds. Check `future.get()` to retrieve the `SearchResp`, or attach a callback to handle success and failure asynchronously.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates hybridSearchAsync() against Milvus.

```java
CompletableFuture<SearchResp> future = client.hybridSearchAsync(HybridSearchReq.builder()
    .collectionName("books")
    .data(Collections.singletonList(queryVector))
    .annsField("embedding")
    .rerank(RRFRanker.builder().k(60).build())
    .limit(10)
    .build());

future.whenComplete((resp, error) -> {
    if (error != null) {
        error.printStackTrace();
        return;
    }
    System.out.println(resp.getSearchResults());
});
```
