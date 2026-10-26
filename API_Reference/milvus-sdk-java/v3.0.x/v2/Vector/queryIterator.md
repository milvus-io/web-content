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
    .cursor(QueryIteratorCursor cursor)
    .filterTemplateValues(Map<String, Object> filterTemplateValues)
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

- `outputFields(List<String> outputFields)`

    A list of field names to include in the output.

- `expr(String expr)`

    A boolean expression to filter results.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level for the operation. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `offset(long offset)`

    The number of results to skip before returning.

- `limit(long limit)`

    The maximum number of results to return.

- `ignoreGrowing(boolean ignoreGrowing)`

    Whether to ignore growing segments during the operation.

- `timezone(String timezone)`

    The timezone string for time-related filters.

- `batchSize(long batchSize)`

    The batch size for iterator operations.

- `reduceStopForBest(boolean reduceStopForBest)`

    Whether to stop iteration when the best result is found.

- `cursor(QueryIteratorCursor cursor)`

    A previously captured cursor to resume pagination from. When set, the iterator continues from the cursor's session timestamp and position instead of starting over; `offset()` is ignored in that case.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    A map of template variable values for parameterized filters.

**RETURN TYPE:**

*QueryIterator*

**RETURNS:**


A **QueryIterator** object that iterates over the query results in batches.

- `next()` (*List\<QueryResultsWrapper.RowRecord\>*) -

    Fetches the next batch of query results. An empty list indicates that iteration is finished.

    Each **RowRecord** exposes:

    - `getFieldValues()` (*Map\<String, Object\>*) -

        All field values keyed by field name.

    - `put(String keyName, Object obj)` (*boolean*) -

        Inserts a field value when the key is not already present.

    - `get(String keyName)` (*Object*) -

        Returns a field or dynamic-field value.

    - `contains(String keyName)` (*boolean*) -

        Whether the record contains the key.

- `close()` (*void*) -

    Closes the iterator and releases its server-side resources.

- `getCursor()` (*QueryIteratorCursor*) -

    Captures the iterator position for resumable pagination. The cursor exposes `getSessionTs()`, `getIntPk()`, `getStrPk()`, and `getLastElementOffset()`.

    - `getSessionTs()` (*long*) -

        The session timestamp of the original iterator.

    - `getIntPk()` (*Long*) -

        The last integer primary key returned.

    - `getStrPk()` (*String*) -

        The last string primary key returned.

    - `getLastElementOffset()` (*Long*) -

        The last matched element offset for element-filter iterators.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

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
