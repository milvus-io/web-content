# queryAsync()

Queries entities asynchronously by primary key or filter, with optional ordering through `orderByFields`.

```java
public CompletableFuture<QueryResp> queryAsync(QueryReq request)
```

This method uses the same parameters as `query()`. It submits the request asynchronously and returns a `CompletableFuture` immediately; the future completes with the query results when the RPC finishes.

## Request Syntax

```java
queryAsync(QueryReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .outputFields(List<String> outputFields)
    .ids(List<Object> ids)
    .filter(String filter)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .offset(long offset)
    .limit(long limit)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .orderByFields(List<OrderByField> orderByFields)
    .queryParams(Map<String, Object> queryParams)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionNames(List<String> partitionNames)`

    The partitions to query.

- `outputFields(List<String> outputFields)`

    The fields to include in each returned row.

- `ids(List<Object> ids)`

    Primary-key values to query.

- `filter(String filter)`

    A scalar filtering expression.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level for the query.

- `offset(long offset)`

    The number of matching rows to skip.

- `limit(long limit)`

    The maximum number of rows to return.

- `ignoreGrowing(boolean ignoreGrowing)`

    Whether to ignore growing segments.

- `timezone(String timezone)`

    The timezone used to interpret temporal expressions.

- `orderByFields(List<OrderByField> orderByFields)`

    The scalar fields and directions used to order matching rows.

- `queryParams(Map<String, Object> queryParams)`

    Additional query parameters.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    Values substituted into placeholders in the filter expression.

**RETURNS:**

*CompletableFuture&lt;QueryResp&gt;*

A `CompletableFuture` that completes with a **QueryResp** containing query rows ordered according to `orderByFields` when provided.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
QueryResp response = client.queryAsync(QueryReq.builder()
    .collectionName("books")
    .filter("published_year > 2000")
    .limit(10)
    .build()).join();
```
