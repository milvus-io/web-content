# hybridSearchAsync()

Performs multi-vector search on a collection and returns search results after reranking, asynchronously.

```java
public CompletableFuture<SearchResp> hybridSearchAsync(HybridSearchReq request)
```

This method invokes the same RPC interface as `hybridSearch()`, but returns a `CompletableFuture` that completes with the search response, or exceptionally when the operation fails.

## Request Syntax

```java
HybridSearchReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .searchRequests(List<AnnSearchReq> searchRequests)
    .topK(int topK)
    .limit(long limit)
    .outFields(List<String> outFields)
    .offset(long offset)
    .roundDecimal(int roundDecimal)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .groupByFieldName(String groupByFieldName)
    .groupSize(Integer groupSize)
    .strictGroupSize(Boolean strictGroupSize)
    .functionScore(FunctionScore functionScore)
    .build();
```

Refer to [hybridSearch()](hybridSearch.md) for the full list of builder methods.

**RETURNS:**

*CompletableFuture\<SearchResp\>*

A future that completes with a **SearchResp** object, or exceptionally when the operation fails.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
SearchResp searchResp = client.hybridSearchAsync(HybridSearchReq.builder()
        .collectionName("my_collection")
        .searchRequests(searchRequests)
        .functionScore(FunctionScore.builder()
                .addFunction(WeightedRanker.builder()
                        .weights(Arrays.asList(0.2f, 0.5f, 0.6f))
                        .build())
                .build())
        .limit(5)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build()).get();
```
