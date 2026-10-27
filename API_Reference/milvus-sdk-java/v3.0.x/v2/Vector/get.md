# get()

This operation gets specific entities by their IDs.

```java
public GetResp get(GetReq request)
```

## Request Syntax

```java
get(GetReq.builder()
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .clusterId(String clusterId)
    .partitionName(String partitionName)
    .partitionNames(List<String> partitionNames)
    .ids(List<Object> ids)
    .outputFields(List<String> outputFields)
    .rlsPrincipal(String rlsPrincipal)
    .skipRls(Boolean skipRls)
    .build()
)
```

**BUILDER METHODS:**

- `databaseName(String databaseName)`

    The name of the database to which the target collection belongs.

- `collectionName(String collectionName)`

    The name of an existing collection.

- `clusterId(String clusterId)`

    **Deprecated.** The ID of the cluster to query. Applies to global-cluster deployments.

- `partitionName(String partitionName)`

    The name of a partition.

- `partitionNames(List<String> partitionNames)`

    A list of partition names to query.

- `ids(List<Object> ids)`

    A specific entity ID or a list of entity IDs.

- `outputFields(List<String> outputFields)`

    A list of names of the fields to be included in the query result.

- `rlsPrincipal(String rlsPrincipal)`

    The name of the RLS principal the get runs as. Required for requests against an RLS-enabled collection unless `skipRls` is set. See [RowPolicyType](../RLS/RowPolicyType.md).

- `skipRls(Boolean skipRls)`

    Whether the get explicitly bypasses row-level security. Defaults to `null`, which uses the server default.

**RETURN TYPE:**

*GetResp*

**RETURNS:**

A **GetResp** object representing one or more queried entities, including the operation cost (`getCost()`) and scanned-byte metrics (`getScannedRemoteBytes()`, `getScannedTotalBytes()`, `getCacheHitRatio()`) when available.

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

- `getGetResults()` (*List\<QueryResult\>*) -

    **Deprecated.** Use `getQueryResults()` instead.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.GetReq;
import io.milvus.v2.service.vector.response.GetResp;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
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
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("test")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert a row
JsonObject row = new JsonObject();
row.addProperty("id", 0L);
row.add("vector", new Gson().toJsonTree(new float[]{1.0f, 2.0f}));
client.insert(InsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(row))
        .build());

// 4. Load the collection
client.loadCollection(LoadCollectionReq.builder().collectionName("test").build());

// 5. Get entity with id 0
GetReq getReq = GetReq.builder()
        .collectionName("test")
        .ids(Collections.singletonList(0L))
        .build();
GetResp getResp = client.get(getReq);
```
