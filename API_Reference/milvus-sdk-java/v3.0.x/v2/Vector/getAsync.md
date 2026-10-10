# getAsync()

Gets specific entities by their IDs asynchronously and returns a future.

```java
public CompletableFuture<GetResp> getAsync(GetReq request)
```

This method uses the same request parameters as `get()` but returns a `CompletableFuture<GetResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<GetResp> future = client.getAsync(GetReq.builder()
    .collectionName(String collectionName)
    .ids(List<Object> ids)
    .build());
```

For the full list of `GetReq` builder methods, refer to [get()](get.md).

**RETURN TYPE:**

*CompletableFuture\<GetResp\>*

**RETURNS:**

A future completed with a **GetResp** object representing one or more queried entities, or completed exceptionally when the operation fails. The **GetResp** object exposes the following getters:

- `getQueryResults()` (*List\<QueryResult\>*) -

    The queried entities. Each **QueryResult** has the following getters:

    - `getEntity()` (*Map\<String, Object\>*) -

        The field values of the result.

    - `getElementOffset()` (*Long*) -

        For struct-array element-level queries (via `element_filter`), the index of the matched element within the array. Null for ordinary queries.

- `getSessionTs()` (*long*) -

    The session timestamp used for the operation.

- `getCost()` (*Long*) -

    The time cost of the operation, in milliseconds.

- `getScannedRemoteBytes()` (*Long*) -

    The number of bytes scanned from remote storage.

- `getScannedTotalBytes()` (*Long*) -

    The total number of bytes scanned during the operation.

- `getCacheHitRatio()` (*Float*) -

    The cache hit ratio of the operation.

**EXCEPTIONS