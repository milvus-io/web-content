# queryAsync()

Queries entities in a collection asynchronously and returns a future.

```java
public CompletableFuture<QueryResp> queryAsync(QueryReq request)
```

This method uses the same request parameters as `query()` but returns a `CompletableFuture<QueryResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<QueryResp> future = client.queryAsync(QueryReq.builder()
    .collectionName(String collectionName)
    .filter(String filter)
    .outputFields(List<String> outputFields)
    .build());
```

For the full list of `QueryReq` builder methods, refer to [query()](query.md).

**RETURN TYPE:**

*CompletableFuture\<QueryResp\>*

**RETURNS:**

A future completed with a **QueryResp** object that contains query rows and execution metrics, or completed exceptionally when the operation fails. The **QueryResp** object exposes the following getters:

- `getQueryResults()` (*List\<QueryResult\>*) -

    The query result rows. Each **QueryResult** has the following getters:

    - `getEntity()` (*Map\<String, Object\>*) -

        The field values of the result row.

    - `getElementOffset()` (*Long*) -

        For struct-array element-level queries (via `element_filter`), the index of the matched element within the array. Null for ordinary queries.

- `getSessionTs()` (*long*) -

    The session timestamp used for the query.

- `getCost()` (*Long*) -

    The time cost of the query operation, in milliseconds.

- `getScannedRemoteBytes()` (*Long*) -

    The number of bytes scanned from remote storage.

- `getScannedTotalBytes()` (*Long*) -

    The total number of bytes scanned during the query.

- `getCacheHitRatio()` (*Float*) -

    The cache hit ratio of the query.

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
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.concurrent.CompletableFuture;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// Create a collection with "id", "vector", "name", and "age" fields
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("name").dataType(DataType.VarChar).maxLength(128).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("age").dataType(DataType.Int64).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(collectionSchema)
        .indexParams(Arrays.asList(indexParam))
        .build());

// Insert rows
List<JsonObject> rows = new ArrayList<>();
for (long id = 0; id < 3; id++) {
    JsonObject row = new JsonObject();
    row.addProperty("id", id);
    row.add("vector", new Gson().toJsonTree(new float[]{id * 0.1f, id * 0.2f}));
    row.addProperty("name", "name_" + id);
    row.addProperty("age", 20L + id);
    rows.add(row);
}
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());

// Load the collection
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

CompletableFuture<QueryResp> future = client.queryAsync(QueryReq.builder()
        .collectionName("my_collection")
        .filter("age > 20")
        .outputFields(Arrays.asList("name", "age"))
        .build());
QueryResp response = future.get();
```
