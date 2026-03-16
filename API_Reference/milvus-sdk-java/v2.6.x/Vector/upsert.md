# upsert()

This operation inserts or updates data in a specific collection.

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

- `partialUpdate(boolean partialUpdate)` -

    Whether to allow partial field updates during upsert.

**RETURNS:**

*UpsertResp*

An **UpsertResp** object that contains information about the number of inserted or updated entities.

**EXCEPTIONS:**

- **MilvusClientException**

    This exception will be raised when any error occurs during this operation.

## Example

```java
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.UpsertReq;

// 1. Set up a client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
        
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Upsert operation
JsonObject row = new JsonObject();
List<Float> vectorList = new ArrayList<>();
vectorList.add(2.0f);
vectorList.add(3.0f);
row.add("vector", gson.toJsonTree(vectorList));
row.addProperty("id", 0L);
row.addProperty("color", "purple")

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(row))
        .build();
client.upsert(upsertReq);

```
