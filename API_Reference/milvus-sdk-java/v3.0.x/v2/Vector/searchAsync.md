# searchAsync()

Asynchronously performs vector search with optional result ordering, aggregation requests and buckets, and execution metrics. The request and builder parameters are identical to [search()](search.md); this variant returns a `CompletableFuture` instead of blocking.

```java
public CompletableFuture<SearchResp> searchAsync(SearchReq request)
```

## Request Syntax

```java
CompletableFuture<SearchResp> future = client.searchAsync(SearchReq.builder()
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
    .guaranteeTimestamp(guaranteeTimestamp)
    .gracefulTime(gracefulTime)
    .consistencyLevel(consistencyLevel)
    .ignoreGrowing(ignoreGrowing)
    .timezone(timezone)
    .orderByFields(orderByFields)
    .groupByFieldName(groupByFieldName)
    .groupSize(groupSize)
    .strictGroupSize(strictGroupSize)
    .functionScore(functionScore)
    .filterTemplateValues(filterTemplateValues)
    .highlighter(highlighter)
    .searchAggregation(searchAggregation)
    .functionChains(functionChains)
    .build());
```

For the **BUILDER METHODS**, see [search()](search.md).

**RETURNS:**

*CompletableFuture\<SearchResp\>*

A future that completes with the search results once the server responds. Check `future.get()` to retrieve the `SearchResp`, or attach a callback to handle success and failure asynchronously.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates searchAsync() against Milvus.

```java
CompletableFuture<SearchResp> future = client.searchAsync(SearchReq.builder()
    .collectionName("books")
    .data(Collections.singletonList(queryVector))
    .annsField("embedding")
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
