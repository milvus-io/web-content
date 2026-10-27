# insert()

Aligns insert-row validation for auto-ID fields, function output fields, dynamic fields, and Struct values.

```java
public InsertResp insert(InsertReq request)
```

## Request Syntax

```java
InsertReq.builder()
    .data(data)
    .databaseName(databaseName)
    .collectionName(collectionName)
    .partitionName(partitionName)
    .rlsPrincipal(rlsPrincipal)
    .skipRls(skipRls)
    .build();
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)`

    The rows to insert. Field names and values must conform to the collection schema.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database when omitted.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition.

- `rlsPrincipal(String rlsPrincipal)`

    The name of the RLS principal the insert runs as. Required for requests against an RLS-enabled collection unless `skipRls` is set. See [RowPolicyType](../RLS/RowPolicyType.md).

- `skipRls(Boolean skipRls)`

    Whether the insert explicitly bypasses row-level security. Defaults to `null`, which uses the server default.

**RETURN TYPE:**

*InsertResp*

**RETURNS:**

A **InsertResp** object that contains the result of this operation.

- `getInsertCnt()` (*long*) -

    The number of entities inserted.

- `getPrimaryKeys()` (*List\<Object\>*) -

    The primary keys generated for the inserted entities.

- `getCost()` (*Long*) -

    The time cost of the insert operation, in milliseconds.

**EXCEPTIONS:**

- **[MilvusClientException](../Client/MilvusClientException.md)**

    Raised when request validation, transport, or server execution fails. Inspect the exception message for the exact failure reason.

## Example

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import java.util.ArrayList;
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

// 3. Insert one row
JsonObject row = new JsonObject();
row.addProperty("id", 0L);
row.add("vector", new Gson().toJsonTree(new float[]{1.0f, 2.0f}));
client.insert(InsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(row))
        .build());
```
