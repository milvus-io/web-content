# searchAsync()

Performs a vector search asynchronously and returns a future.

```java
public CompletableFuture<SearchResp> searchAsync(SearchReq request)
```

This method uses the same request parameters as `search()` but returns a `CompletableFuture<SearchResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<SearchResp> future = client.searchAsync(SearchReq.builder()
    .collectionName(String collectionName)
    .data(List<BaseVector> data)
    .annsField(String annsField)
    .limit(long limit)
    .build());
```

For the full list of `SearchReq` builder methods, refer to [search()](search.md).

**RETURN TYPE:**

*CompletableFuture\<SearchResp\>*

**RETURNS:**

A future completed with a **SearchResp** object that contains search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets, or completed exceptionally when the operation fails. The **SearchResp** object exposes the following getters:

- `getSearchResults()` (*List\<List\<SearchResult\>\>*) -

    The search results, one list per query vector. Each **SearchResult** has the following getters:

    - `getEntity()` (*Map\<String, Object\>*) -

        The retrieved entity data.

    - `getScore()` (*Float*) -

        The similarity score of the result.

    - `getId()` (*Object*) -

        The primary key value of the result.

    - `getPrimaryKey()` (*String*) -

        The primary key value rendered as a string.

    - `getHighlightResults()` (*Map\<String, HighlightResult\>*) -

        The highlighted text fragments for each requested field, keyed by field name. Each **HighlightResult** has the following getters:

        - `getFieldName()` (*String*) -

            The name of the highlighted field.

        - `getFragments()` (*List\<String\>*) -

            The highlighted text fragments.

        - `getScores()` (*List\<Float\>*) -

            The relevance scores of the fragments.

    - `getHighlightResult(String fieldName)` (*HighlightResult*) -

        The highlight result for the specified field name, or `null` if none exists.

    - `getElementOffset()` (*Long*) -

        For struct-array element-level queries, the index of the matched element within the array. Null for ordinary queries.

- `getSessionTs()` (*long*) -

    The session timestamp used for the search.

- `getRecalls()` (*List\<Float\>*) -

    The recall values of the search, one per query vector.

- `getCost()` (*Long*) -

    The time cost of the search operation, in milliseconds.

- `getScannedRemoteBytes()` (*Long*) -

    The number of bytes scanned from remote storage.

- `getScannedTotalBytes()` (*Long*) -

    The total number of bytes scanned during the search.

- `getCacheHitRatio()` (*Float*) -

    The cache hit ratio of the search.

- `getAggregationBuckets()` (*List\<List\<AggregationBucket\>\>*) -

    The aggregation buckets, one list per query vector. Each **AggregationBucket** has the following getters:

    - `getKey()` (*List\<KeyEntry\>*) -

        The bucket key entries that define the bucket. Each **KeyEntry** has the following getters:

        - `getFieldId()` (*long*) -

            The ID of the field the key is based on.

        - `getFieldName()` (*String*) -

            The name of the field the key is based on.

        - `getValue()` (*Object*) -

            The value of the key.

    - `getCount()` (*long*) -

        The number of entities in the bucket.

    - `getMetrics()` (*Map\<String, Object\>*) -

        The aggregation metric values for the bucket.

    - `getHits()` (*List\<AggregationHit\>*) -

        The top hits inside the bucket. Each **AggregationHit** has the following getters:

        - `getId()` (*Object*) -

            The primary key of the hit.

        - `getScore()` (*Float*) -

            The similarity score of the hit.

        - `getFields()` (*Map\<String, Object\>*) -

            The field values of the hit.

        - `getFieldIds()` (*Map\<String, Long\>*) -

            The field ID map of the hit.

    - `getSubGroups()` (*List\<AggregationBucket\>*) -

        The nested sub-buckets.

**EXCEPTIONS