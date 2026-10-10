# query()

Queries entities by primary key or filter, with optional ordering through `orderByFields`.

```java
public QueryResp query(QueryReq request)
```

## Request Syntax

```java
// include-start milvus
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
// include-end
// include-start zilliz
QueryReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .clusterId(clusterId)
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
// include-end
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `clusterId(String clusterId)`

    **Deprecated.** The ID of the cluster to query. Applies to global-cluster deployments.

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

*QueryResp*

A **QueryResp** object that contains query rows ordered according to `orderByFields` when provided, along with execution metrics. The object has the following fields:

- **queryResults** (*List\<QueryResult\>*) -

    The query result rows. Each **QueryResult** has the following fields:

    - **entity** (*Map\<String, Object\>*) -

        The field values of the result row.

    - **elementOffset** (*Long*) -

        For struct-array element-level queries (via `element_filter`), the index of the matched element within the array. Null for ordinary queries.

- **sessionTs** (*long*) -

    The session timestamp used for the query.

- **cost** (*Long*) -

    The time cost of the query operation, in milliseconds.

- **scannedRemoteBytes** (*Long*) -

    The number of bytes scanned from remote storage.

- **scannedTotalBytes** (*Long*) -

    The total number of bytes scanned during the query.

- **cacheHitRatio** (*Float*) -

    The cache hit ratio of the query.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates query() against Milvus.

```java
// include-start milvus
QueryResp response = client.query(QueryReq.builder()
    .collectionName("books")
    .orderByFields(Collections.singletonList(OrderByField.builder()
        .fieldName("published_year")
        .direction(AggDirection.DESC)
        .build()))
    .limit(10)
    .build());
// include-end
// include-start zilliz
QueryResp response = client.query(QueryReq.builder()
    .collectionName("books")
    .clusterId(CLUSTER_ID)
    .orderByFields(Collections.singletonList(OrderByField.builder()
        .fieldName("published_year")
        .direction(AggDirection.DESC)
        .build()))
    .limit(10)
    .build());
// include-end
```
