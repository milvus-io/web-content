# get()

This operation gets specific entities by their IDs.

```java
public GetResp get(GetReq request)
```

## Request Syntax

```java
get(GetReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .clusterId(String clusterId)
    .partitionName(String partitionName)
    .partitionNames(List<String> partitionNames)
    .ids(List<Object> ids)
    .outputFields(List<String> outputFields)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of an existing collection.

- `clusterId(String clusterId)`

    **Deprecated.** The ID of the cluster to query. Applies to global-cluster deployments.

- `partitionName(String partitionName)`

    The name of a partition.

- `partitionNames(List<String> partitionNames)`

    A list of partition names to query.

- `ids(List<Object> ids)`

    A specific entity ID or a list of entity IDs.

- `outputFields(List<String> outputFields)`

    A list of names of the fields to be included in the query result.

**RETURN TYPE:**

*GetResp*

**RETURN TYPE:**

*GetResp*

**RETURNS:**

A **GetResp** object representing one or more queried entities, including the operation cost (`getCost()`) and scanned-byte metrics (`getScannedRemoteBytes()`, `getScannedTotalBytes()`, `getCacheHitRatio()`) when available.

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

- `getGetResults()` (*List\<QueryResult\>*) -

    **Deprecated.** Use `getQueryResults()` instead.

**EXCEPTIONS