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

**RETURN TYPE:**

*CompletableFuture\<QueryResp\>*

**RETURNS:**

A future completed with a **QueryResp** object that contains query rows and execution metrics, or completed exceptionally when the operation fails. The **QueryResp** object exposes the following getters:

- `getQueryResults()` (*List\<QueryResult\>*) -

    The query result rows. Each **QueryResult** has the following getters:

    - `getEntity()` (*Map\<String, Object\>*) -

        The field values of the result row.

    - `getElementOffset()` (*Long*) -

        For struct-array element-level queries (via `element_filter`), the index of the matched element within the array. Null for ordinary queries.

- `getSessionTs()` (*long*) -

    The session timestamp used for the query.

- `getCost()` (*Long*) -

    The time cost of the query operation, in milliseconds.

- `getScannedRemoteBytes()` (*Long*) -

    The number of bytes scanned from remote storage.

- `getScannedTotalBytes()` (*Long*) -

    The total number of bytes scanned during the query.

- `getCacheHitRatio()` (*Float*) -

    The cache hit ratio of the query.

**EXCEPTIONS