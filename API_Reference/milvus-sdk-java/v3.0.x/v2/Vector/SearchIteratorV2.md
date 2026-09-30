# SearchIteratorV2()

This operation creates an iterator for you to iterate over the search results. It is useful, especially when the search result contains a large volume of data.

```java
public SearchIteratorV2 searchIteratorV2(SearchIteratorReqV2 request)
```

## Request Syntax

```java
searchIteratorV2(SearchIteratorReqV2.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .vectorFieldName(String vectorFieldName)
    .topK(int topK)
    .limit(long limit)
    .filter(String filter)
    .outputFields(List<String> outputFields)
    .vectors(List<BaseVector> vectors)
    .roundDecimal(int roundDecimal)
    .searchParams(Map<String, Object> searchParams)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .groupByFieldName(String groupByFieldName)
    .batchSize(long batchSize)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
    .build()
);
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionNames(List<String> partitionNames)`

    A list of partition names to target.

- `vectorFieldName(String vectorFieldName)`

    The name of the vector field to search.

- `topK(int topK)`

    The number of top results to return.

- `limit(long limit)`

    The maximum number of results to return.

- `filter(String filter)`

    A boolean expression to filter results.

- `outputFields(List<String> outputFields)`

    A list of field names to include in the output.

- `vectors(List<BaseVector> vectors)`

    A list of vectors to search with.

- `roundDecimal(int roundDecimal)`

    The number of decimal places for distance/score rounding.

- `searchParams(Map<String, Object> searchParams)`

    Additional search parameters as key-value pairs.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level for the operation.

- `ignoreGrowing(boolean ignoreGrowing)`

    Whether to ignore growing segments during the operation.

- `timezone(String timezone)`

    The timezone string for time-related filters.

- `groupByFieldName(String groupByFieldName)`

    The field name to group search results by.

- `batchSize(long batchSize)`

    The batch size for iterator operations.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    A map of template variable values for parameterized filters.

**RETURNS:**

*SearchIteratorV2*

*SearchIteratorV2*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.orm.iterator.SearchIteratorV2;
import io.milvus.v2.service.vector.request.SearchIteratorReqV2;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.IndexParam;

import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

// Create a SearchIteratorV2 for paginated vector search.
// V2 is recommended over V1: 20-30% faster with better recall.
SearchIteratorV2 searchIterator = client.searchIteratorV2(SearchIteratorReqV2.builder()
        .collectionName("my_collection")
        .outputFields(Arrays.asList("userAge"))
        .batchSize(50)
        .vectorFieldName("userFace")
        .vectors(Collections.singletonList(new FloatVec(queryVector)))
        .filter("userAge > 10 && userAge < 20")
        .searchParams(new HashMap<>())
        .limit(120)
        .metricType(IndexParam.MetricType.L2)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

// Iterate through search results
int counter = 0;
while (true) {
    List<SearchResp.SearchResult> res = searchIterator.next();
    if (res.isEmpty()) {
        searchIterator.close();
        break;
    }
    for (SearchResp.SearchResult result : res) {
        System.out.println(result);
        counter++;
    }
}
System.out.printf("%d search results returned%n", counter);
```
