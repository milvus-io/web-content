# search()

This operation conducts a vector similarity search with an optional scalar filtering expression.

```java
public SearchResp search(SearchReq request)
```

## Request Syntax

```java
search(SearchReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .annsField(String annsField)
    .topK(int topK)
    .filter(String filter)
    .outputFields(List<String> outputFields)
    .data(List<BaseVector> data)
    .ids(List<Object> ids)
    .offset(long offset)
    .limit(long limit)
    .roundDecimal(int roundDecimal)
    .searchParams(Map<String, Object> searchParams)
    .guaranteeTimestamp(long guaranteeTimestamp)
    .gracefulTime(Long gracefulTime)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .groupByFieldName(String groupByFieldName)
    .groupSize(Integer groupSize)
    .strictGroupSize(Boolean strictGroupSize)
    .functionScore(FunctionScore functionScore)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .highlighter(Highlighter highlighter)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `partitionNames(List<String> partitionNames)` -

    A list of partition names to target.

- `annsField(String annsField)` -

    The name of the vector field for approximate nearest neighbor search.

- `topK(int topK)` -

    The number of top results to return.

- `filter(String filter)` -

    A boolean expression to filter results.

- `outputFields(List<String> outputFields)` -

    A list of field names to include in the output.

- `data(List<BaseVector> data)` -

    A list of data rows to insert/upsert as JSON objects.

- `ids(List<Object> ids)` -

    A list of primary key values to identify specific entities.

- `offset(long offset)` -

    The number of results to skip before returning.

- `limit(long limit)` -

    The maximum number of results to return.

- `roundDecimal(int roundDecimal)` -

    The number of decimal places for distance/score rounding.

- `searchParams(Map<String, Object> searchParams)` -

    Additional search parameters as key-value pairs.

- `guaranteeTimestamp(long guaranteeTimestamp)` -

    A timestamp guaranteeing that all operations before it are visible.

- `gracefulTime(Long gracefulTime)` -

    The graceful time in milliseconds for consistency.

- `consistencyLevel(ConsistencyLevel consistencyLevel)` -

    The consistency level for the operation.

- `ignoreGrowing(boolean ignoreGrowing)` -

    Whether to ignore growing segments during the operation.

- `timezone(String timezone)` -

    The timezone string for time-related filters.

- `groupByFieldName(String groupByFieldName)` -

    The field name to group search results by.

- `groupSize(Integer groupSize)` -

    The number of results to return per group.

- `strictGroupSize(Boolean strictGroupSize)` -

    Whether to strictly enforce the group size.

- `functionScore(FunctionScore functionScore)` -

    A FunctionScore object for custom scoring.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    A map of template variable values for parameterized filters.

- `highlighter(Highlighter highlighter)` -

    A Highlighter object for text highlighting in search results.

**RETURNS:**

*SearchResp*

*SearchResp*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.FunctionScore;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.ranker.DecayRanker;
import io.milvus.v2.service.vector.response.SearchResp;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

// Build a DecayRanker to rerank results by field value proximity
DecayRanker decay = DecayRanker.builder()
        .name("birth_year_decay")
        .inputFieldNames(Collections.singletonList("birth_year"))
        .function("linear")
        .origin(1900)
        .scale(50)
        .offset(0)
        .decay(0.1)
        .build();

// Search with FunctionScore for reranking
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(new EmbeddedText("Albert Darwin")))
        .limit(100)
        .outputFields(Arrays.asList("birth_year", "lifespan"))
        .functionScore(FunctionScore.builder()
        .addFunction(decay)
        .build())
        .build());

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
```
