# upsert()

Upserts rows into a collection. Partial updates can apply field operations, and each row is validated against the collection schema.

```java
public UpsertResp upsert(UpsertReq request)
```

## Request Syntax

```java
UpsertReq.builder()
    .data(data)
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .partialUpdate(partialUpdate)
    .fieldOps(fieldOps)
    .build();
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)`

    The rows to insert or update. Every partial-update row must include its primary key.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition.

- `partialUpdate(boolean partialUpdate)`

    Whether omitted non-primary fields should remain unchanged.

- `fieldOps(List<FieldPartialUpdateOp> fieldOps)`

    Field-level operations. `ARRAY_APPEND` and `ARRAY_REMOVE` imply partial-update semantics.

**RETURN TYPE:**

*UpsertResp*

**RETURNS:**

A **UpsertResp** object that contains the result of this operation.

- `getUpsertCnt()` (*long*) -

    The number of entities upserted.

- `getPrimaryKeys()` (*List\<Object\>*) -

    The primary keys of the upserted entities.

- `getCost()` (*Long*) -

    The time cost of the upsert operation, in milliseconds.

**EXCEPTIONS:**

- **MilvusClientException**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.UpsertResp;
import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection with an "id" field, a "vector" field, and a "tags" array field
CreateCollectionReq.CollectionSchema collectionSchema = MilvusClientV2.CreateSchema();
collectionSchema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(Boolean.TRUE).autoID(Boolean.FALSE).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(2).build());
collectionSchema.addField(AddFieldReq.builder().fieldName("tags").dataType(DataType.Array).elementType(DataType.VarChar).maxCapacity(8).build());
IndexParam indexParam = IndexParam.builder()
        .fieldName("vector")
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createCollection(CreateCollectionReq.builder()
        .collectionName("books")
        .collectionSchema(collectionSchema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// 3. Insert a row with a tags array
JsonObject row = new JsonObject();
row.addProperty("id", 0L);
row.add("vector", new Gson().toJsonTree(new float[]{1.0f, 2.0f}));
JsonArray tags = new JsonArray();
tags.add("fiction");
tags.add("classic");
row.add("tags", tags);
client.insert(InsertReq.builder()
        .collectionName("books")
        .data(Collections.singletonList(row))
        .build());

// 4. Upsert with a partial field update that appends to the "tags" array
List<JsonObject> rows = Collections.singletonList(row);
UpsertResp response = client.upsert(UpsertReq.builder()
    .databaseName("default")
    .collectionName("books")
    .data(rows)
    .partialUpdate(true)
    .fieldOps(Collections.singletonList(
        UpsertReq.FieldPartialUpdateOp.builder()
            .fieldName("tags")
            .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
            .build()))
    .build());
```
