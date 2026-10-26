# searchIteratorV2()

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
    .metricType(IndexParam.MetricType metricType)
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

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `partitionNames(List<String> partitionNames)` -

    A list of partition names to target.

- `vectorFieldName(String vectorFieldName)` -

    The name of the vector field to search.

- `metricType(IndexParam.MetricType metricType)` -

    The metric type used to measure similarity between vectors. See [MetricType](../Management/MetricType.md).

- `topK(int topK)` -

    **Deprecated.** Use `limit(long limit)` instead.

    The number of top results to return.

- `limit(long limit)` -

    The maximum number of results to return.

- `filter(String filter)` -

    A boolean expression to filter results.

- `outputFields(List<String> outputFields)` -

    A list of field names to include in the output.

- `vectors(List<BaseVector> vectors)` -

    A list of vectors to search with.

- `roundDecimal(int roundDecimal)` -

    The number of decimal places for distance/score rounding.

- `searchParams(Map<String, Object> searchParams)` -

    Additional search parameters as key-value pairs.

- `consistencyLevel(ConsistencyLevel consistencyLevel)` -

    The consistency level for the operation. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `ignoreGrowing(boolean ignoreGrowing)` -

    Whether to ignore growing segments during the operation.

- `timezone(String timezone)` -

    The timezone string for time-related filters.

- `groupByFieldName(String groupByFieldName)` -

    The field name to group search results by.

- `batchSize(long batchSize)` -

    The batch size for iterator operations.

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    A map of template variable values for parameterized filters.

- `externalFilterFunc(Function<List<SearchResp.SearchResult>, List<SearchResp.SearchResult>> externalFilterFunc)` -

    A function used to filter the search results before returning them.

**RETURN TYPE:**

*SearchIteratorV2*

**RETURNS:**


A **SearchIteratorV2** fetches token-based search results in batches and exposes:

- `next()` (*List\<SearchResp.SearchResult\>*) -

    Fetches the next batch of search hits. An empty list indicates that iteration is finished. Each **SearchResult** exposes:

    - `getEntity()` (*Map\<String, Object\>*) -

        The retrieved entity data.

    - `getScore()` (*Float*) -

        The similarity score.

    - `getId()` (*Object*) -

        The primary key value.

    - `getPrimaryKey()` (*String*) -

        The primary key value rendered as a string.

    - `getHighlightResults()` (*Map\<String, HighlightResult\>*) -

        Highlighted text fragments keyed by field name. Each **HighlightResult** exposes:

        - `getFieldName()` (*String*) -

            The highlighted field name.

        - `getFragments()` (*List\<String\>*) -

            The highlighted text fragments.

        - `getScores()` (*List\<Float\>*) -

            The relevance score of each fragment.

    - `getHighlightResult(String fieldName)` (*HighlightResult*) -

        The highlighted text fragments for one field, with the same getters as `getHighlightResults()`.

    - `getElementOffset()` (*Long*) -

        The matched element offset for struct-array element-level searches.

- `close()` (*void*) -

    Closes the iterator and releases its server-side resources.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.orm.iterator.SearchIteratorV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.SearchIteratorReqV2;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with a "userFace" vector field and a "userAge" field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("userFace").dataType(DataType.FloatVector).dimension(4).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("userAge").dataType(DataType.Int64).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("userFace")
        .metricType(IndexParam.MetricType.L2)
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
    row.add("userFace", new Gson().toJsonTree(new float[]{i * 0.1f, i * 0.2f, i * 0.3f, i * 0.4f}));
    row.addProperty("userAge", 15L + i);
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

// 4. Create a SearchIteratorV2 for paginated vector search.
// V2 is recommended over V1: 20-30% faster with better recall.
List<Float> queryVector = Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f);
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

// 5. Iterate through search results
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
