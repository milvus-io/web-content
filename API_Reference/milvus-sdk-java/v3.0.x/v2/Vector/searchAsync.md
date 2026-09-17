# searchAsync()

Performs vector search asynchronously, using the same request parameters as [search()](search.md).

```java
public CompletableFuture<SearchResp> searchAsync(SearchReq request)
```

This method invokes the same RPC interface as `search()`, but returns a `CompletableFuture` that completes with the search response, or exceptionally when the operation fails.

## Request Syntax

```java
SearchReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionNames(partitionNames)
    .annsField(annsField)
    .metricType(metricType)
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
    .ranker(ranker)
    .functionScore(functionScore)
    .functionChains(functionChains)
    .filterTemplateValues(filterTemplateValues)
    .highlighter(highlighter)
    .searchAggregation(searchAggregation)
    .build();
```

Refer to [search()](search.md) for the full list of builder methods.

**RETURNS:**

*CompletableFuture\<SearchResp\>*

A future that completes with a **SearchResp** containing search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets, or exceptionally when the operation fails.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates searchAsync() against Milvus.

```java
SearchResp response = client.searchAsync(SearchReq.builder()
    .collectionName("books")
    .data(Collections.singletonList(queryVector))
    .annsField("embedding")
    .limit(10)
    .build()).get();
```
