# upsert()

This operation inserts or updates data in a specific collection.

```java
public UpsertResp upsert(UpsertReq request)
```

## Request Syntax

```java
upsert(UpsertReq.builder()
    .data(List<JsonObject> data)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
)
```

**BUILDER METHODS:**

- `data(List<JsonObject> data)`

    The data to insert or update into the current collection.

    The data to insert or update should be a `gson.JsonObject` that matches the schema of the current collection or a list of such dictionaries. 

    The following code assumes that the schema of the current collection has two fields named **id** and **vector**. The former is the primary field and the latter is a field to hold 5-dimensional vector embeddings.

    <div class="admonition note">

    <p><b>notes</b></p>

    <p>In Java SDK versions v2.4.1 or earlier versions, the input is a <code>fastjson.JSONObject</code>. But <code>fastjson</code> is not recommended to use now because of its unsafe deserialization vulnerability. Therefore, replace <code>fastjson</code> with <code>gson</code> if you use the Java SDK of v2.4.2 or later releases.</p>

    </div>

    ```java
    List<JsonObject> data = new ArrayList<>();
    
    JsonObject dict1 = new JsonObject();
    List<Float> vectorArray1 = new ArrayList<>();
    vectorArray1.add(0.37417449965222693);
    vectorArray1.add(-0.9401784221711342);
    vectorArray1.add(0.9197526367693833);
    vectorArray1.add(0.49519396415367245);
    vectorArray1.add(-0.558567588166478);
    
    dict1.addProperty("id", 1L);
    dict1.add("vector", gson.toJsonTree(vectorArray1));
    
    JsonObject dict2 = new JsonObject();
    JSONArray vectorArray2 = new ArrayList<>();
    vectorArray2.add(0.46949086179692356);
    vectorArray2.add(-0.533609076732849);
    vectorArray2.add(-0.8344432775467099);
    vectorArray2.add(0.9797361846081416);
    vectorArray2.add(0.6294256393761057);
    
    dict2.addProperty("id", 2L);
    dict2.add("vector", gson.toJsonTree(vectorArray2));
    
    data.add(dict1);
    data.add(dict2);
    ```

- `collectionName(String collectionName)`

    The name of an existing collection.

- `partitionName(String partitionName)`

    The name of an existing partition.

**RETURN TYPE:**

*UpsertResp*

**RETURNS:**

An **UpsertResp** object that contains information about the number of inserted or updated entities.

**EXCEPTIONS:**

- **MilvusClientExceptions**

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

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(row))
        .build();
client.upsert(upsertReq);
```

