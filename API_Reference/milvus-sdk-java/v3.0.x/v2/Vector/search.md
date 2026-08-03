# search()

Performs vector search with optional result ordering, aggregation requests and buckets, and execution metrics.

```java
public SearchResp search(SearchReq request)
```

## Request Syntax

```java
// include-start milvus
SearchReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionNames(partitionNames)
    .annsField(annsField)
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
    .functionScore(functionScore)
    .filterTemplateValues(filterTemplateValues)
    .highlighter(highlighter)
    .searchAggregation(searchAggregation)
    .build();
// include-end
// include-start zilliz
SearchReq.builder()
    .databaseName(databaseName)
    .collectionName(collectionName)
    .clusterId(clusterId)
    .partitionNames(partitionNames)
    .annsField(annsField)
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
    .functionScore(functionScore)
    .filterTemplateValues(filterTemplateValues)
    .highlighter(highlighter)
    .searchAggregation(searchAggregation)
    .build();
// include-end
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionNames(List<String> partitionNames)`

    The partitions to search.

- `annsField(String annsField)`

    The vector field used for approximate nearest-neighbor search.

- `topK(int topK)`

    The number of nearest candidates requested from the server.

- `filter(String filter)`

    A scalar filtering expression.

- `outputFields(List<String> outputFields)`

    The entity fields included with each match.

- `data(List<BaseVector> data)`

    The query vectors. Do not use together with ids.

- `ids(List<Object> ids)`

    Primary keys whose stored vectors are used as query vectors. Do not use together with data.

- `offset(long offset)`

    The number of matches to skip.

- `limit(long limit)`

    The maximum number of matches returned for each query.

- `roundDecimal(int roundDecimal)`

    The number of decimal places used to round scores.

- `searchParams(Map<String, Object> searchParams)`

    Index-specific search parameters.

- `guaranteeTimestamp(long guaranteeTimestamp)`

    Deprecated guarantee timestamp.

- `gracefulTime(Long gracefulTime)`

    Deprecated graceful consistency window.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level for the search.

- `ignoreGrowing(boolean ignoreGrowing)`

    Whether to ignore growing segments.

- `timezone(String timezone)`

    The timezone used to interpret temporal expressions.

- `orderByFields(List<OrderByField> orderByFields)`

    The scalar fields and directions used to order search results.

- `groupByFieldName(String groupByFieldName)`

    The field used to group matching entities.

- `groupSize(Integer groupSize)`

    The maximum number of entities returned per group.

- `strictGroupSize(Boolean strictGroupSize)`

    Whether every returned group must contain groupSize entities.

- `functionScore(FunctionScore functionScore)`

    The scoring functions applied to the search results.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    Values substituted into placeholders in the filter expression.

- `highlighter(Highlighter highlighter)`

    Text-highlighting configuration for returned fields.

- `searchAggregation(SearchAggregation searchAggregation)`

    Aggregation fields, metrics, ordering, top hits, and nested aggregation configuration.

**RETURNS:**

*SearchResp*

Contains search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

Demonstrates search() against Milvus.

```java
// include-start milvus
SearchResp response = client.search(SearchReq.builder()
    .collectionName("books")
    .data(Collections.singletonList(queryVector))
    .annsField("embedding")
    .searchAggregation(SearchAggregation.builder()
        .fields(Collections.singletonList("category"))
        .size(10)
        .build())
    .limit(10)
    .build());
// include-end
// include-start zilliz
SearchResp response = client.search(SearchReq.builder()
    .collectionName("books")
    .clusterId(CLUSTER_ID)
    .data(Collections.singletonList(queryVector))
    .annsField("embedding")
    .searchAggregation(SearchAggregation.builder()
        .fields(Collections.singletonList("category"))
        .size(10)
        .build())
    .limit(10)
    .build());
// include-end
```
