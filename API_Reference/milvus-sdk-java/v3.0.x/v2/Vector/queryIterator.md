# queryIterator()

This method returns a query iterator to iterate data.

```java
public QueryIterator queryIterator(QueryIteratorReq request)
```

## Request Syntax

```java
queryIterator(QueryIteratorReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .outputFields(List<String> outputFields)
    .expr(String expr)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .offset(long offset)
    .limit(long limit)
    .ignoreGrowing(boolean ignoreGrowing)
    .timezone(String timezone)
    .batchSize(long batchSize)
    .reduceStopForBest(boolean reduceStopForBest)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
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

- `outputFields(List<String> outputFields)` -

    A list of field names to include in the output.

- `expr(String expr)` -

    A boolean expression to filter results.

- `consistencyLevel(ConsistencyLevel consistencyLevel)` -

    The consistency level for the operation.

- `offset(long offset)` -

    The number of results to skip before returning.

- `limit(long limit)` -

    The maximum number of results to return.

- `ignoreGrowing(boolean ignoreGrowing)` -

    Whether to ignore growing segments during the operation.

- `timezone(String timezone)` -

    The timezone string for time-related filters.

- `batchSize(long batchSize)` -

    The batch size for iterator operations.

- `reduceStopForBest(boolean reduceStopForBest)` -

    Whether to stop iteration when the best result is found.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    A map of template variable values for parameterized filters.

**RETURNS:**

*QueryIterator*

*QueryIterator*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.orm.iterator.QueryIterator;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.v2.service.vector.request.QueryIteratorReq;
import io.milvus.v2.common.ConsistencyLevel;

import java.util.Arrays;
import java.util.List;

// Create a query iterator to retrieve results in batches
QueryIterator queryIterator = client.queryIterator(QueryIteratorReq.builder()
        .collectionName("my_collection")
        .expr("userID < 3000")
        .outputFields(Arrays.asList("userID", "userAge"))
        .batchSize(100)
        .offset(0)
        .limit(10000)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

// Iterate through all results
int counter = 0;
while (true) {
    List<QueryResultsWrapper.RowRecord> res = queryIterator.next();
    if (res.isEmpty()) {
        queryIterator.close();
        break;
    }
    for (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
        counter++;
    }
}
System.out.printf("%d query results returned%n", counter);
```
