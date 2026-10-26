# hybridSearch()

This operation performs multi-vector search on a collection and returns search results after reranking.

```java
public SearchResp hybridSearch(HybridSearchReq request)
```

## Request Syntax

```java
hybridSearch(HybridSearchReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionNames(List<String> partitionNames)
    .searchRequests(List<AnnSearchReq> searchRequests)
    .topK(int topK)
    .limit(long limit)
    .outFields(List<String> outFields)
    .offset(long offset)
    .roundDecimal(int roundDecimal)
    .consistencyLevel(ConsistencyLevel consistencyLevel)
    .groupByFieldName(String groupByFieldName)
    .groupSize(Integer groupSize)
    .strictGroupSize(Boolean strictGroupSize)
    .functionScore(FunctionScore functionScore)
    .rlsPrincipal(String rlsPrincipal)
    .skipRls(Boolean skipRls)
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

- `searchRequests(List<AnnSearchReq> searchRequests)`

    A list of AnnSearchReq objects for hybrid search.

- `topK(int topK)`

    **Deprecated.** The number of top results to return.

- `limit(long limit)`

    The maximum number of results to return.

- `outFields(List<String> outFields)`

    A list of field names to include in the output.

- `offset(long offset)`

    The number of results to skip before returning.

- `roundDecimal(int roundDecimal)`

    The number of decimal places for distance/score rounding.

- `consistencyLevel(ConsistencyLevel consistencyLevel)`

    The consistency level for the operation. See [ConsistencyLevel](../Collections/ConsistencyLevel.md).

- `groupByFieldName(String groupByFieldName)`

    The field name to group search results by.

- `groupSize(Integer groupSize)`

    The number of results to return per group.

- `strictGroupSize(Boolean strictGroupSize)`

    Whether to strictly enforce the group size.

- `functionScore(FunctionScore functionScore)`

    A FunctionScore object for custom scoring. See [FunctionScore](FunctionScore/FunctionScore.md).

- `ranker(CreateCollectionReq.Function ranker)`

    **Deprecated.** A single rerank function applied to the search results. Prefer `functionScore()`. See [Function](../Collections/Function/Function.md).

- `rlsPrincipal(String rlsPrincipal)`

    The name of the RLS principal the hybrid search runs as. Required for requests against an RLS-enabled collection unless `skipRls` is set. See [RowPolicyType](../RLS/RowPolicyType.md).

- `skipRls(Boolean skipRls)`

    Whether the hybrid search explicitly bypasses row-level security. Defaults to `null`, which uses the server default.

**RETURN TYPE:**

*SearchResp*

**RETURNS:**

A **SearchResp** object that contains search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets. See [AggregationBucket](AggregationBucket.md).

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
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.FunctionScore;
import io.milvus.v2.service.vector.request.ranker.WeightedRanker;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.BaseVector;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.data.BinaryVec;
import io.milvus.v2.service.vector.request.data.SparseFloatVec;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.TreeMap;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with float, binary, and sparse vector fields
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("float_vector").dataType(DataType.FloatVector).dimension(4).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("binary_vector").dataType(DataType.BinaryVector).dimension(32).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("sparse_vector").dataType(DataType.SparseFloatVector).build());
List<IndexParam> indexParams = Arrays.asList(
        IndexParam.builder().fieldName("float_vector").metricType(IndexParam.MetricType.COSINE).build(),
        IndexParam.builder().fieldName("binary_vector").metricType(IndexParam.MetricType.HAMMING).build(),
        IndexParam.builder().fieldName("sparse_vector").metricType(IndexParam.MetricType.IP).build());
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(indexParams)
        .build());

// 3. Insert a row and load the collection
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("float_vector", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
row.add("binary_vector", new Gson().toJsonTree(new int[]{1, 2, 3, 4}));
JsonObject sparse = new JsonObject();
sparse.addProperty("1", 0.2);
sparse.addProperty("2", 0.8);
row.add("sparse_vector", sparse);
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

// 4. Build ANN search requests for the multiple vector fields
List<BaseVector> floatVectors = Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
List<BaseVector> binaryVectors = Collections.singletonList(new BinaryVec(new byte[]{1, 2, 3, 4}));
List<BaseVector> sparseVectors = Collections.singletonList(new SparseFloatVec(new TreeMap<Long, Float>() {{
    put(1L, 0.2f);
}}));

List<AnnSearchReq> searchRequests = new ArrayList<>();
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("float_vector")
        .vectors(floatVectors)
        .params("{\"nprobe\": 10}")
        .limit(10)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("binary_vector")
        .vectors(binaryVectors)
        .limit(50)
        .build());
searchRequests.add(AnnSearchReq.builder()
        .vectorFieldName("sparse_vector")
        .vectors(sparseVectors)
        .limit(100)
        .build());

// 5. Hybrid search with WeightedRanker via FunctionScore
SearchResp searchResp = client.hybridSearch(HybridSearchReq.builder()
        .collectionName("my_collection")
        .searchRequests(searchRequests)
        .functionScore(FunctionScore.builder()
                .addFunction(WeightedRanker.builder()
                        .weights(Arrays.asList(0.2f, 0.5f, 0.6f))
                        .build())
                .build())
        .limit(5)
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build());

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
```
