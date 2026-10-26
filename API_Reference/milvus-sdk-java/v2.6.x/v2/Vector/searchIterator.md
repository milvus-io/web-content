# searchIterator()

This method returns a search iterator to iterate search results.

```java
public SearchIterator searchIterator(SearchIteratorReq request)
```

## Request Syntax

```java
searchIterator(SearchIteratorReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .vectorFieldName(String vectorFieldName)
    .metricType(IndexParam.MetricType metricType)
    .topK(int topK)
    .limit(long limit)
    .expr(String expr)
    .outputFields(List<String> outputFields)
    .vectors(List<BaseVector> vectors)
    .roundDecimal(int roundDecimal)
    .params(String params)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .ignoreGrowing(boolean ignoreGrowing)
    .groupByFieldName(String groupByFieldName)
    .batchSize(long batchSize)
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

- `vectorFieldName(String vectorFieldName)` -

    The name of the vector field.

- `metricType(IndexParam.MetricType metricType)` -

    The metric type used to measure similarity between vectors. See [MetricType](../Management/MetricType.md).

- `topK(int topK)` -

    **Deprecated.** The number of top results to return.

- `limit(long limit)` -

    The maximum number of results to return.

- `expr(String expr)` -

    A boolean expression to filter results.

- `outputFields(List<String> outputFields)` -

    A list of field names to include in the output.

- `vectors(List<BaseVector> vectors)` -

    A list of vectors to search with.

- `roundDecimal(int roundDecimal)` -

    The number of decimal places for distance/score rounding.

- `params(String params)` -

    Additional search parameters as a JSON string.

- `consistencyLevel(ConsistencyLevel consistencyLevel)` -

    The consistency level for the operation. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `ignoreGrowing(boolean ignoreGrowing)` -

    Whether to ignore growing segments during the operation.

- `groupByFieldName(String groupByFieldName)` -

    The field name to group search results by.

- `batchSize(long batchSize)` -

    The batch size for iterator operations.

**RETURN TYPE:**

*SearchIterator*

**RETURNS:**


A *SearchIterator* object to iterate search results, which offers the following methods:

- `next()` (*List\<QueryResultsWrapper.RowRecord\>*) -

    Fetches the next batch of search results. An empty list indicates that iteration is finished.

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

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.orm.iterator.SearchIterator;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.SearchIteratorReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import com.google.common.collect.Lists;
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

// 2. Create a collection with an "id" field and a "vector" field with dimension 2
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.L2)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert rows and load the collection
List<JsonObject> rows = new ArrayList<>();
for (long i = 0; i < 200; i++) {
    JsonObject row = new JsonObject();
    row.addProperty("id", i);
    row.add("vector", new Gson().toJsonTree(new float[]{i * 0.01f, i * 0.02f}));
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName("test")
        .data(rows)
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("test").build());

// 4. Iterator search
List<Float> vector = Arrays.asList(0.1f, 0.2f);
SearchIterator searchIterator = client.searchIterator(SearchIteratorReq.builder()
        .collectionName("test")
        .outputFields(Lists.newArrayList("vector"))
        .batchSize(50L)
        .vectorFieldName("vector")
        .vectors(Collections.singletonList(new FloatVec(vector)))
        .expr("id > 100")
        .params("{\"range_filter\": 15.0, \"radius\": 20.0}")
        .topK(300)
        .metricType(IndexParam.MetricType.L2)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

System.out.println("SearchIteratorV1 results:");
while (true) {
    List<QueryResultsWrapper.RowRecord> res = searchIterator.next();
    if (res.isEmpty()) {
        System.out.println("Search iteration finished, close");
        searchIterator.close();
        break;
    }

    for (QueryResultsWrapper.RowRecord record : res) {
        System.out.println(record);
    }
}
```
