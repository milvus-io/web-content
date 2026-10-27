# getAsync()

Gets specific entities by their IDs asynchronously and returns a future.

```java
public CompletableFuture<GetResp> getAsync(GetReq request)
```

This method uses the same request parameters as `get()` but returns a `CompletableFuture<GetResp>` immediately. Use the returned future to consume the result or handle the exceptional completion when the operation fails.

## Request Syntax

```java
CompletableFuture<GetResp> future = client.getAsync(GetReq.builder()
    .collectionName(String collectionName)
    .ids(List<Object> ids)
    .build());
```

For the full list of `GetReq` builder methods, refer to [get()](get.md).

**RETURN TYPE:**

*CompletableFuture\<GetResp\>*

**RETURNS:**

A future completed with a **GetResp** object representing one or more queried entities, or completed exceptionally when the operation fails. The **GetResp** object exposes the following getters:

- `getQueryResults()` (*List\<QueryResult\>*) -

    The query result rows. Each **QueryResult** has the following getters:

    - `getEntity()` (*Map<String, Object>*) - The output field names and values for the row.

    - `getElementOffset()` (*Long*) - The index of the matched element within a struct-array field for element-level queries; `null` for ordinary queries.

- `getSessionTs()` (*long*) -

    The session timestamp used for the operation.

- `getCost()` (*Long*) -

    The time cost of the operation, in milliseconds.

- `getScannedRemoteBytes()` (*Long*) -

    The number of bytes scanned from remote storage.

- `getScannedTotalBytes()` (*Long*) -

    The total number of bytes scanned during the operation.

- `getCacheHitRatio()` (*Float*) -

    The cache hit ratio of the operation.

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
import io.milvus.v2.service.vector.request.GetReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.GetResp;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.Collections;
import java.util.concurrent.CompletableFuture;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// Create a collection with an "id" field and a "vector" field with dimension 2
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
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

// Insert a row
JsonObject row = new JsonObject();
row.addProperty("id", 0L);
row.add("vector", new Gson().toJsonTree(new float[]{1.0f, 2.0f}));
client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(Collections.singletonList(row))
        .build());

// Load the collection
client.loadCollection(LoadCollectionReq.builder().collectionName("my_collection").build());

CompletableFuture<GetResp> future = client.getAsync(GetReq.builder()
        .collectionName("my_collection")
        .ids(Collections.singletonList(0L))
        .build());
GetResp response = future.get();
```
