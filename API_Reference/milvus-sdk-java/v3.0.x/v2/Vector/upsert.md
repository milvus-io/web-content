# upsert()

# upsert()

This operation inserts new rows into a collection or updates existing rows when their primary keys already exist. You can also use partial updates and field-level operations to update selected fields.

```java
public UpsertResp upsert(UpsertReq request)
```

## Request Syntax

```java
upsert(UpsertReq.builder()
    .data(List<JsonObject> data)
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .partialUpdate(boolean partialUpdate)
    .fieldOps(List<UpsertReq.FieldPartialUpdateOp> fieldOps)
    .build()
);
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)`

    A list of data rows to insert/upsert as JSON objects.

- `databaseName(String databaseName)`

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)`

    The name of the target collection.

- `partitionName(String partitionName)`

    The name of the target partition.

- `partialUpdate(boolean partialUpdate)`

    Whether to enable partial field updates during upsert. Set this to `true` when you want to update only the primary key and the fields provided in each row. If you use `ARRAY_APPEND` or `ARRAY_REMOVE` in `fieldOps`, the SDK sends the request with partial update semantics automatically.

- `fieldOps(List<UpsertReq.FieldPartialUpdateOp> fieldOps)`

    Controls how fields in `data` are applied during a partial upsert. For most fields, omit this parameter or use the default `REPLACE` operation to replace the field value carried in the request. For `ARRAY` fields, use `ARRAY_APPEND` to append the request payload to the existing array, or `ARRAY_REMOVE` to remove all existing elements that match the request payload, without first reading and rewriting the full array. Each `FieldPartialUpdateOp` targets one `fieldName`. The value in `data` for that field must match the array `element_type`; after `ARRAY_APPEND`, the final array must not exceed the field `max_capacity`.

**FieldPartialUpdateOp BUILDER METHODS:**

- `fieldName(String fieldName)`

    The field affected by the partial update operation.

- `opType(UpsertReq.FieldPartialUpdateOp.OpType opType)`

    The operation to apply. Valid values are `REPLACE`, `ARRAY_APPEND`, and `ARRAY_REMOVE`. Non-`REPLACE` operations imply partial-update semantics.

**RETURNS:**

*UpsertResp*

An **UpsertResp** object that contains information about the number of inserted or updated entities.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation, including invalid field-level operation parameters such as a `null` operation, an empty `fieldName`, or a `null` `opType`.

## Example

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.UpsertReq;

import java.util.Arrays;
import java.util.Collections;

Gson gson = new Gson();

// 1. Set up a client.
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Upsert a complete row.
JsonObject row = new JsonObject();
row.addProperty("id", 0L);
row.add("vector", gson.toJsonTree(Arrays.asList(2.0f, 3.0f)));
row.addProperty("color", "purple");

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(row))
        .build();
client.upsert(upsertReq);

// 3. Partially update selected fields.
JsonObject partialRow = new JsonObject();
partialRow.addProperty("id", 0L);
partialRow.addProperty("color", "green");

UpsertReq partialUpdateReq = UpsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(partialRow))
        .partialUpdate(true)
        .build();
client.upsert(partialUpdateReq);

// 4. Apply a field-level operation during upsert.
JsonObject arrayRow = new JsonObject();
arrayRow.addProperty("id", 0L);
arrayRow.add("tags", gson.toJsonTree(Arrays.asList("new-tag")));

UpsertReq fieldOpReq = UpsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(arrayRow))
        .partialUpdate(true)
        .fieldOps(Collections.singletonList(
                UpsertReq.FieldPartialUpdateOp.builder()
                        .fieldName("tags")
                        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
                        .build()))
        .build();
client.upsert(fieldOpReq);
```
