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
    .functionChains(functionChains)
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
    .functionChains(functionChains)
    .filterTemplateValues(filterTemplateValues)
    .highlighter(highlighter)
    .searchAggregation(searchAggregation)
    .build();
// include-end
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `clusterId(String clusterId)`

    **Deprecated.** The ID of the cluster to search. Applies to global-cluster deployments.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionNames(List<String> partitionNames)`

    The partitions to search.

- `annsField(String annsField)`

    The vector field used for approximate nearest-neighbor search.

- `metricType(IndexParam.MetricType metricType)`

    The metric type used to measure vector similarity. See [MetricType](../Management/MetricType.md).

- `topK(int topK)`

    **Deprecated.** The number of nearest candidates requested from the server.

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

    The consistency level for the search. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

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

    The scoring functions applied to the search results. See [FunctionScore](FunctionScore/FunctionScore.md).

- `ranker(CreateCollectionReq.Function ranker)`

    A single rerank function applied to the search results. Do not use together with `functionScore()` or `functionChains()`. See [Function](../Collections/Function.md).

- `functionChains(List<FunctionChain> functionChains)`

    The function chains applied to post-process the search results. Function chains and rerank (`ranker()`/`functionScore()`) cannot be used together. See [FunctionChain](FunctionChain/FunctionChain.md).

- `addFunctionChain(FunctionChain functionChain)`

    Appends one function chain to the search request. Function chains and rerank (`ranker()`/`functionScore()`) cannot be used together. See [FunctionChain](FunctionChain/FunctionChain.md).

- `filterTemplateValues(Map<String, Object> filterTemplateValues)`

    Values substituted into placeholders in the filter expression.

- `highlighter(Highlighter highlighter)`

    Text-highlighting configuration for returned fields. See [Highlighter](Highlighter/Highlighter.md).

- `searchAggregation(SearchAggregation searchAggregation)`

    Aggregation fields, metrics, ordering, top hits, and nested aggregation configuration.

**RETURN TYPE:**

*SearchResp*

**RETURNS:**

A **SearchResp** object that contains search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets.

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

    - `getHighlightResults()` (*Map\<String, HighlightResult\>*) -

        The highlighted text fragments for each requested field, keyed by field name. Each **HighlightResult** has the following getters:

        - `getFieldName()` (*String*) -

            The name of the highlighted field.

        - `getFragments()` (*List\<String\>*) -

            The highlighted text fragments.

        - `getScores()` (*List\<Float\>*) -

            The relevance scores of the fragments.

    - `getHighlightResult(String fieldName)` (*HighlightResult*) -

        The highlight result for the specified field name, or `null` if none exists.

    - `getElementOffset()` (*Long*) -

        For struct-array element-level queries, the index of the matched element within the array. Null for ordinary queries.

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

- `getAggregationBuckets()` (*List\<List\<AggregationBucket\>\>*) -

    The aggregation buckets, one list per query vector. Each **AggregationBucket** has the following getters:

    - `getKey()` (*List\<KeyEntry\>*) -

        The bucket key entries that define the bucket. Each **KeyEntry** has the following getters:

        - `getFieldId()` (*long*) -

            The ID of the field the key is based on.

        - `getFieldName()` (*String*) -

            The name of the field the key is based on.

        - `getValue()` (*Object*) -

            The value of the key.

    - `getCount()` (*long*) -

        The number of entities in the bucket.

    - `getMetrics()` (*Map\<String, Object\>*) -

        The aggregation metric values for the bucket.

    - `getHits()` (*List\<AggregationHit\>*) -

        The top hits inside the bucket. Each **AggregationHit** has the following getters:

        - `getId()` (*Object*) -

            The primary key of the hit.

        - `getScore()` (*Float*) -

            The similarity score of the hit.

        - `getFields()` (*Map\<String, Object\>*) -

            The field values of the hit.

        - `getFieldIds()` (*Map\<String, Long\>*) -

            The field ID map of the hit.

    - `getSubGroups()` (*List\<AggregationBucket\>*) -

        The nested sub-buckets.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

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
