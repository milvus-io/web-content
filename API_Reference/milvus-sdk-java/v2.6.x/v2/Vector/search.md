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
    .metricType(IndexParam.MetricType metricType)
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

- `metricType(IndexParam.MetricType metricType)` -

    The metric type used to measure similarity between vectors. See [MetricType](../Management/MetricType.md).

- `topK(int topK)` -

    **Deprecated.** The number of top results to return.

- `filter(String filter)` -

    A boolean expression to filter results.

- `outputFields(List<String> outputFields)` -

    A list of field names to include in the output.

- `data(List<BaseVector> data)` -

    A list of query vectors.

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

    The consistency level for the operation. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

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

    A FunctionScore object for custom scoring. See [FunctionScore](FunctionScore/FunctionScore.md).

- `ranker(CreateCollectionReq.Function ranker)` -

    **Deprecated.** A Function object used for ranking. Use `functionScore` instead. See [Function](../Collections/Function.md).

- `filterTemplateValues(Map<String, Object> filterTemplateValues)` -

    A map of template variable values for parameterized filters.

- `highlighter(Highlighter highlighter)` -

    A Highlighter object for text highlighting in search results. See [Highlighter](Highlighter/Highlighter.md).

**RETURN TYPE:**

*SearchResp*

**RETURNS:**

A **SearchResp** object that contains search results, recalls, cost, scanned byte counts, and cache hit ratio. The object exposes the following getters:

- `getSearchResults()` (*List\<List\<SearchResult\>\>*) -

    The search results, one list per query vector. Each **SearchResult** has the following getters:

    - `getEntity()` (*Map\<String, Object\>*) -

        The retrieved entity data.

    - `getScore()` (*Float*) -

        The similarity score of the result.

    - `getId()` (*Object*) -

        The primary key value of the result.

    - `getPrimaryKey()` (*String*) -

        The primary key value rendered as a string.

- `getSessionTs()` (*long*) -

    The session timestamp used for the search.

- `getRecalls()` (*List\<Float\>*) -

    The recall values of the search, one per query vector.

- `getCost()` (*Long*) -

    The time cost of the search operation, in milliseconds.

- `getScannedRemoteBytes()` (*Long*) -

    The number of bytes scanned from remote storage.

- `getScannedTotalBytes()` (*Long*) -

    The total number of bytes scanned during the search.

- `getCacheHitRatio()` (*Float*) -

    The cache hit ratio of the search.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.FunctionScore;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.ranker.DecayRanker;
import io.milvus.v2.service.vector.response.SearchResp;
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

// 2. Create a collection with a "text" field, a BM25 output field "sparse_vector",
// and "birth_year"/"lifespan" fields used for reranking
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("text").dataType(DataType.VarChar).maxLength(512).enableAnalyzer(Boolean.TRUE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("sparse_vector").dataType(DataType.SparseFloatVector).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("birth_year").dataType(DataType.Int64).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("lifespan").dataType(DataType.Int64).build());
collectionSchema.addFunction(CreateCollectionReq.Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("sparse_vector"))
        .build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("sparse_vector")
        .metricType(IndexParam.MetricType.BM25)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert rows and load the collection
List<JsonObject> rows = new ArrayList<>();
JsonObject row1 = new JsonObject();
row1.addProperty("id", 1L);
row1.addProperty("text", "Albert Darwin was born in 1809 and died in 1882");
row1.addProperty("birth_year", 1809L);
row1.addProperty("lifespan", 73L);
rows.add(row1);
JsonObject row2 = new JsonObject();
row2.addProperty("id", 2L);
row2.addProperty("text", "Artificial intelligence was founded as an academic discipline in 1956");
row2.addProperty("birth_year", 1956L);
row2.addProperty("lifespan", 0L);
rows.add(row2);
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

// 4. Build a DecayRanker to rerank results by field value proximity
DecayRanker decay = DecayRanker.builder()
        .name("birth_year_decay")
        .inputFieldNames(Collections.singletonList("birth_year"))
        .function("linear")
        .origin(1900)
        .scale(50)
        .offset(0)
        .decay(0.1)
        .build();

// 5. Search with FunctionScore for reranking
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
