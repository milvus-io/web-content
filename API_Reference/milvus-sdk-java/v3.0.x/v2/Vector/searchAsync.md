# searchAsync()

Performs a vector search asynchronously and returns a future.

```java
public CompletableFuture<SearchResp> searchAsync(SearchReq request)
```

This method uses the same request parameters as `search()` but returns a `CompletableFuture<SearchResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<SearchResp> future = client.searchAsync(SearchReq.builder()
    .collectionName(String collectionName)
    .data(List<BaseVector> data)
    .annsField(String annsField)
    .limit(long limit)
    .build());
```

For the full list of `SearchReq` builder methods, refer to [search()](search.md).

**RETURN TYPE:**

*CompletableFuture\<SearchResp\>*

**RETURNS:**

A future completed with a **SearchResp** object that contains search results, recalls, cost, scanned byte counts, cache hit ratio, and aggregation buckets, or completed exceptionally when the operation fails. The **SearchResp** object exposes the following getters:

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
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.Collections;
import java.util.concurrent.CompletableFuture;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// Create a collection with an "id" field and a "vector" field with dimension 3
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(3).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// Insert a row
JsonObject row = new JsonObject();
row.addProperty("id", 0L);
row.add("vector", new Gson().toJsonTree(new float[]{0.1f, 0.2f, 0.3f}));
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());

// Load the collection
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

CompletableFuture<SearchResp> future = client.searchAsync(SearchReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f})))
        .annsField("vector")
        .limit(10)
        .build());
SearchResp response = future.get();
```
