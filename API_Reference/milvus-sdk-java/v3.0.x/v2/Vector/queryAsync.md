# queryAsync()

Asynchronously queries entities by primary key or filter, with optional ordering through `orderByFields`. The request and builder parameters are identical to [query()](query.md); this variant returns a `CompletableFuture` instead of blocking.

```java
public CompletableFuture<QueryResp> queryAsync(QueryReq request)
```

## Request Syntax

```java
CompletableFuture<QueryResp> future = client.queryAsync(QueryReq.builder()
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
    .build());
```

For the **BUILDER METHODS**, see [query()](query.md).

**RETURNS:**

*CompletableFuture\<QueryResp\>*

A future that completes with the query rows once the server responds. Check `future.get()` to retrieve the `QueryResp`, or attach a callback to handle success and failure asynchronously.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates queryAsync() against Milvus.

```java
CompletableFuture<QueryResp> future = client.queryAsync(QueryReq.builder()
    .collectionName("books")
    .filter("published_year > 2000")
    .limit(10)
    .build());

future.whenComplete((resp, error) -> {
    if (error != null) {
        error.printStackTrace();
        return;
    }
    System.out.println(resp.getQueryResults());
});
```
