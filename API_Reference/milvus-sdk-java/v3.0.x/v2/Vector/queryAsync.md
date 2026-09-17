# queryAsync()

Queries entities by primary key or filter asynchronously, using the same request parameters as [query()](query.md).

```java
public CompletableFuture<QueryResp> queryAsync(QueryReq request)
```

This method invokes the same RPC interface as `query()`, but returns a `CompletableFuture` that completes with the query response, or exceptionally when the operation fails.

## Request Syntax

```java
QueryReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionNames(partitionNames)
    .outputFields(outputFields)
    .ids(ids)
    .filter(filter)
    .consistencyLevel(consistencyLevel)
    .offset(offset)
    .limit(limit)
    .ignoreGrowing(ignoreGrowing)
    .timezone(timezone)
    .orderByFields(orderByFields)
    .queryParams(queryParams)
    .filterTemplateValues(filterTemplateValues)
    .build();
```

Refer to [query()](query.md) for the full list of builder methods.

**RETURNS:**

*CompletableFuture\<QueryResp\>*

A future that completes with a **QueryResp** containing query rows ordered according to orderByFields when provided, plus execution metadata such as `cost`, `scannedTotalBytes`, `scannedRemoteBytes`, and `cacheHitRatio`, or exceptionally when the operation fails.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates queryAsync() against Milvus.

```java
QueryResp response = client.queryAsync(QueryReq.builder()
    .collectionName("books")
    .filter("published_year >= 2020")
    .limit(10)
    .build()).get();
```
