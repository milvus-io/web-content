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

    The consistency level for the operation. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

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

    Whether to stop iteration when the best result is found. Defaults to `true` in v2.6.25 or later; in earlier versions it defaults to `false`.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    A map of template variable values for parameterized filters.

**RETURNS:**

*QueryIterator*

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.QueryIteratorReq;
import io.milvus.orm.iterator.QueryIterator;
import io.milvus.response.QueryResultsWrapper;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with "id", "userID", and "userAge" fields
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("userID").dataType(DataType.Int64).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("userAge").dataType(DataType.Int64).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert rows and load the collection
List<JsonObject> rows = new ArrayList<>();
for (long i = 1; i <= 5; i++) {
    JsonObject row = new JsonObject();
    row.addProperty("id", i);
    row.addProperty("userID", i * 100L);
    row.addProperty("userAge", 20L + i);
    row.add("vector", new Gson().toJsonTree(new float[]{i * 0.1f, i * 0.2f}));
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

// 4. Create a query iterator to retrieve results in batches
QueryIterator queryIterator = client.queryIterator(QueryIteratorReq.builder()
        .collectionName("my_collection")
        .expr("userID < 3000")
        .outputFields(Arrays.asList("userID", "userAge"))
        .batchSize(100)
        .offset(0)
        .limit(10000)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

// 5. Iterate through all results
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
