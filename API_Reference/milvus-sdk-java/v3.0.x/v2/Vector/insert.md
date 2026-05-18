# insert()

This operation inserts data into a specific collection.

```java
public InsertResp insert(InsertReq request)
```

## Request Syntax

```java
insert(InsertReq.builder()
    .data(List<JsonObject> data)
    .databaseName(String databaseName)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
);
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)` -

    A list of data rows to insert/upsert as JSON objects.

- `databaseName(String databaseName)` -

    The name of the database. Defaults to the current database if not specified.

- `collectionName(String collectionName)` -

    The name of the target collection.

- `partitionName(String partitionName)` -

    The name of the target partition.

**RETURNS:**

*InsertResp*

An **InsertResp** object containing information about the number of inserted entities.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.InsertReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Add one row to the collection, the collection has an "id" field
// and a "vector" field with dimension 2
JsonObject row = new JsonObject();
List<Float> vectorList = new ArrayList<>();
vectorList.add(1.0f);
vectorList.add(2.0f);
row.add("vector", gson.toJsonTree(vectorList));
row.addProperty("id", 0L);

InsertReq insertReq = InsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(row))
        .build();
client.insert(insertReq);
```
