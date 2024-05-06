# upsert()

This operation inserts or updates data in a specific collection.

```java
public UpsertResp upsert(UpsertReq request)
```

## Request Syntax

```java
upsert(UpsertReq.builder()
    .data(List<JSONObject> data)
    .collectionName(String collectionName)
    .partitionName(String partitionName)
    .build()
)
```

**BUILDER METHODS:**

- `data(List<JSONObject> data)`

    The data to insert or update into the current collection.

    The data to insert or update should be a dictionary that matches the schema of the current collection or a list of such dictionaries. 

    The following code assumes that the schema of the current collection has two fields named **id** and **vector**. The former is the primary field and the latter is a field to hold 5-dimensional vector embeddings.

    ```java
    List<JSONObject> data = new ArrayList<>();
    
    JSONObject dict1 = new JSONObject();
    List<Float> vectorArray1 = new ArrayList<>();
    vectorArray1.add(0.37417449965222693);
    vectorArray1.add(-0.9401784221711342);
    vectorArray1.add(0.9197526367693833);
    vectorArray1.add(0.49519396415367245);
    vectorArray1.add(-0.558567588166478);
    
    dict1.put("id", 1);
    dict1.put("vector", vectorArray1);
    
    JSONObject dict2 = new JSONObject();
    JSONArray vectorArray2 = new ArrayList<>();
    vectorArray2.add(0.46949086179692356);
    vectorArray2.add(-0.533609076732849);
    vectorArray2.add(-0.8344432775467099);
    vectorArray2.add(0.9797361846081416);
    vectorArray2.add(0.6294256393761057);
    
    dict2.put("id", 2);
    dict2.put("vector", vectorArray2);
    
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
// upsert operation
JSONObject jsonObject = new JSONObject();
List<Float> vectorList = new ArrayList<>();
vectorList.add(2.0f);
vectorList.add(3.0f);
jsonObject.put("vector", vectorList);
jsonObject.put("id", 0L);
UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("test")
        .data(Collections.singletonList(jsonObject))
        .build();

client.upsert(upsertReq);
```

