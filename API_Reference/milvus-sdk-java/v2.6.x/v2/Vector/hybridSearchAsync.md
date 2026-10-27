# hybridSearchAsync()

Runs a multi-vector similarity search with a ranker asynchronously and returns a future.

```java
public CompletableFuture<SearchResp> hybridSearchAsync(HybridSearchReq request)
```

This method uses the same request parameters as `hybridSearch()` but returns a `CompletableFuture<SearchResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<SearchResp> future = client.hybridSearchAsync(HybridSearchReq.builder()
    .collectionName(String collectionName)
    .searchRequests(List<AnnSearchReq> searchRequests)
    .functionScore(FunctionScore functionScore)
    .limit(long limit)
    .build());
```

For the full list of `HybridSearchReq` builder methods, refer to [hybridSearch()](hybridSearch.md).

**RETURN TYPE:**

*CompletableFuture\<SearchResp\>*

**RETURNS:**

A future completed with a **SearchResp** object that contains search results, recalls, cost, scanned byte counts, and cache hit ratio, or completed exceptionally when the operation fails. The **SearchResp** object exposes the following getters:

- `getSearchResults()` (*List\<List\<SearchResult\>\>*) -

    The search results, one list per query vector. Each **SearchResult** has the following getters:

    - `getEntity()` (*Map<String, Object>*) - The output field names and values for the result.

    - `getScore()` (*Float*) - The similarity score of the result.

    - `getId()` (*Object*) - The primary-key value of the result.

    - `getPrimaryKey()` (*String*) - The name of the primary-key field.

    - `getHighlightResults()` (*Map<String, HighlightResult>*) - The highlight results keyed by field name. Each **HighlightResult** has `getFieldName()` (*String*), `getFragments()` (*List<String>*), and `getScores()` (*List<Float>*).

    - `getHighlightResult(String fieldName)` (*HighlightResult*) - The highlight result for the specified field, or `null` if none exists.

    - `getElementOffset()` (*Long*) - The offset of the matched element in a struct-array element query, or `null` for an ordinary query.

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

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when request validation, transport, or server execution fails.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.data.BaseVector;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.data.SparseFloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.common.ConsistencyLevel;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.TreeMap;
import java.util.concurrent.CompletableFuture;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with dense and sparse vector fields
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("dense_vector").dataType(DataType.FloatVector).dimension(4).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("sparse_vector").dataType(DataType.SparseFloatVector).build());
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Arrays.asList(
                IndexParam.builder().fieldName("dense_vector").metricType(IndexParam.MetricType.COSINE).build(),
                IndexParam.builder().fieldName("sparse_vector").metricType(IndexParam.MetricType.IP).build()))
        .build());

// 3. Insert a row and load the collection
JsonObject row = new JsonObject();
row.addProperty("id", 1L);
row.add("dense_vector", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
JsonObject sparse = new JsonObject();
sparse.addProperty("1", 0.2);
sparse.addProperty("2", 0.8);
row.add("sparse_vector", sparse);
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

// 4. Run a hybrid search asynchronously
List<BaseVector> queryVector = Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
List<BaseVector> sparseVector = Collections.singletonList(new SparseFloatVec(new TreeMap<Long, Float>() {{
    put(1L, 0.2f);
}}));

// Strong consistency ensures the newly inserted rows are visible to this hybridSearch.
CompletableFuture<SearchResp> future = client.hybridSearchAsync(HybridSearchReq.builder()
        .collectionName("my_collection")
        .searchRequests(Arrays.asList(
                AnnSearchReq.builder()
                        .vectorFieldName("dense_vector")
                        .vectors(queryVector)
                        .limit(10)

    .consistencyLevel(ConsistencyLevel.STRONG).build(),
                AnnSearchReq.builder()
                        .vectorFieldName("sparse_vector")
                        .vectors(sparseVector)
                        .limit(10)
                        .build()))
        .limit(5)
        .build());
SearchResp response = future.get();
```
