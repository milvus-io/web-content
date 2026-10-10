# hybridSearch()

This operation performs multi-vector search on a collection and returns search results after reranking.

```java
public SearchResp hybridSearch(HybridSearchReq request)
```

## Request Syntax

```java
hybridSearch(HybridSearchReq.builder()
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
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database if not specified.

- `clusterId(String clusterId)`

    **Deprecated.** The ID of the cluster to query. Applies to global-cluster deployments.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionNames(List<String> partitionNames)`

    A list of partition names to target.

- `searchRequests(List<AnnSearchReq> searchRequests)`

    A list of AnnSearchReq objects for hybrid search.

- `topK(int topK)`

    **Deprecated.** The number of top results to return.

- `limit(long limit)`

    The maximum number of results to return.

- `outFields(List<String> outFields)`

    A list of field names to include in the output.

- `offset(long offset)`

    The number of results to skip before returning.

- `roundDecimal(int roundDecimal)`

    The number of decimal places for distance/score rounding.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level for the operation.

- `groupByFieldName(String groupByFieldName)`

    The field name to group search results by.

- `groupSize(Integer groupSize)`

    The number of results to return per group.

- `strictGroupSize(Boolean strictGroupSize)`

    Whether to strictly enforce the group size.

- `functionScore(FunctionScore functionScore)`

    A FunctionScore object for custom scoring.

- `ranker(CreateCollectionReq.Function ranker)`

    **Deprecated.** A single rerank function applied to the search results. Prefer `functionScore()`.

**RETURN TYPE:**

*SearchResp*

**RETURNS:**

A **SearchResp** object that contains search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets.

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

        The highlighted text fragments for each requested field, keyed by field name.

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

    The aggregation buckets, one list per query vector.

**EXCEPTIONS