---
id: upsert-entities.md
title: "Upsert Entities"
summary: "The upsert operation provides a convenient way to insert or update entities in a collection."
---

# Upsert Entities

The `upsert` operation provides a convenient way to insert or update entities in a collection. 

## Overview

You can use `upsert` to either insert a new entity or update an existing one, depending on whether the primary key provided in the upsert request exists in the collection. If the primary key is not found, an insert operation occurs. Otherwise, an update operation will be performed. Partial updates on `autoID` collections are an exception: they update existing entities only, as described below.

An upsert in Milvus works in either **override** or **merge** mode.

### Upsert in override mode

An upsert request that works in override mode combines an insert and a delete. When an `upsert` request for an existing entity is received, Milvus inserts the data carried in the request payload and deletes the existing entity with the original primary key specified in the data at the same time. 

![Upsert In Override Mode](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/upsert-in-override-mode.png)

If the target collection has `autoID` enabled on its primary field, the `upsert` request must still include the primary key of the target entity. Milvus uses the provided primary key to locate the entity to replace, and generates a new primary key for the data carried in the request payload before inserting it.

For fields with `nullable` enabled, you can omit them in the `upsert` request if they do not require any updates.

### Upsert in merge mode | Milvus v2.6.2+

Use merge mode to update specific fields of an existing entity while keeping the other fields unchanged.

![Upsert In Merge Mode](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/upsert-in-merge-mode.png)

Set `partial_update=True` and provide the primary key and the fields you want to update.

Milvus retrieves the existing entity with a strong-consistency query, merges your changes with the stored data, inserts the merged entity, and deletes the old entity.

If the primary key does not exist, the result depends on whether `autoID` is enabled:

- **With `autoID` disabled**, Milvus attempts to insert a new entity with the primary key you supplied. The request succeeds if it meets the normal insertion requirements. If a required field is missing, the request fails with a missing-field error. Nullable fields and fields with default values can be omitted, just as in a normal insert.
- **With `autoID` enabled**, every primary key in the request must already exist. Milvus rejects the request if any primary key is missing, even if you provide all fields required for insertion. For existing entities, merge mode keeps the primary key unchanged.

If a partial update fails with a missing-field error, check whether the target entity exists. Without an existing entity, Milvus cannot retrieve the values of fields you omitted.

For new entities, use `insert` or an upsert in override mode. Use merge mode for subsequent updates to individual fields.

For `ARRAY` fields, merge mode supports two operators in Milvus v2.6.17 and later: `ARRAY_APPEND` and `ARRAY_REMOVE`. These operators let you append elements to or remove matching elements from an existing `ARRAY` field, without first querying the entity to retrieve its current value. For details, see [Upsert ARRAY fields in merge mode](upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode).

### Upsert behaviors: special notes

There are several special notes you should consider before using the merge feature. The following cases assume that you have a collection with two scalar fields named `title` and `issue`, along with a primary key `id` and a vector field called `vector`. 

- **Upsert fields with** `nullable` **enabled.**

    Suppose that the `issue` field can be null. When you upsert these fields, note that:

    - If you omit the `issue` field in the `upsert` request and disable `partial_update`, the `issue` field will be updated to `null` instead of retaining its original value.

    - To preserve the original value of the `issue` field, you need either to enable `partial_update` and omit the `issue` field or include the `issue` field with its original value in the `upsert` request.

- **Upsert keys in the dynamic field**.

    Suppose that you have enabled the dynamic key in the example collection, and the key-value pairs in the dynamic field of an entity are similar to `{"author": "John", "year": 2020, "tags": ["fiction"]}`. 

    When you upsert the entity with keys, such as `author`, `year`, or `tags`, or add other keys, note that:

    - If you upsert with `partial_update` disabled, the default behavior is to **override**. It means that the value of the dynamic field will be overridden by all non-schema-defined fields included in the request and their values. 

        For example, if the data included in the request is `{"author": "Jane", "genre": "fantasy"}`, the key-value pairs in the dynamic field of the target entity will be updated to that.

    - If you upsert with `partial_update` enabled, the default behavior is to **merge**. It means that the value of the dynamic field will merge with all non-schema-defined fields included in the request and their values.

        For example, if the data included in the request is `{"author": "John", "year": 2020, "tags": ["fiction"]}`, the key-value pairs in the dynamic field of the target entity will become `{"author": "John", "year": 2020, "tags": ["fiction"], "genre": "fantasy"}` after the upsert.

- **Upsert a JSON field.**

    Suppose that the example collection has a schema-defined JSON field named `extras`, and the key-value pairs in this JSON field of an entity are similar to `{"author": "John", "year": 2020, "tags": ["fiction"]}`.

    When you upsert the `extras` field of an entity with modified JSON data, note that the JSON field is treated as a whole, and you cannot update individual keys selectively. In other words, the JSON field **DOES NOT** support upsert in **merge** mode.

- **Upsert an** `ARRAY` **field.**

    By default, an `ARRAY` field in merge mode follows **REPLACE** semantics: the value carried in the request overwrites the existing array. For finer-grained updates, Milvus v2.6.17 and later also supports two operators:

    - `ARRAY_APPEND` appends the elements in the request payload to the existing array.

    - `ARRAY_REMOVE` removes every element from the existing array that matches a value in the request payload.

    For operator syntax, supported element types, and other constraints, see [Upsert ARRAY fields in merge mode](upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode).

- **Upsert a StructArray field.**

    Upserting a StructArray field in an entity overwrites the field value. To do so, you need to provide a list of dictionaries, each of which contains all subfields defined in the struct schema, even when you perform the upsert in merge mode.

    For details, refer to [Upsert StructArray field in merge mode](upsert-entities.md#Upsert-StructArray-field-in-merge-mode).

### Limits & Restrictions

Based on the above content, there are several limits and restrictions to follow:

- The `upsert` request must always include the primary keys of the target entities, even when `autoID` is enabled. For `autoID` collections, primary-key handling depends on the upsert mode:

    - In override mode, the primary key identifies the existing entity to replace, and Milvus generates a new primary key for the replacement entity.

    - In merge mode, the primary key identifies the existing entity to update and remains unchanged. If the primary key does not exist, the request fails instead of inserting a new entity.

- The target collection must be loaded and available for queries.

- All fields specified in the request must exist in the schema of the target collection.

- The values of all fields specified in the request must match the data types defined in the schema.

- For any field derived from another using functions, Milvus will remove the derived field during the upsert to allow recalculation.

## Upsert entities in a collection

In this section, we will upsert entities into a collection named `my_collection`. This collection has only two fields, named `id`, `vector`, `title`, and `issue`. The `id` field is the primary field, while the `title` and `issue` fields are scalar fields.

The three entities, if exists in the collection, will be overridden by those included the upsert request.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

data=[
    {
        "id": 0, 
        "vector": [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911],
        "title": "Artificial Intelligence in Real Life", 
        "issue": "vol.12"
    }, {
        "id": 1, 
        "vector": [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], 
        "title": "Hollow Man", 
        "issue": "vol.19"
    }, {
        "id": 2, 
        "vector": [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], 
        "title": "Treasure Hunt in Missouri", 
        "issue": "vol.12"
    }
]

res = client.upsert(
    collection_name='my_collection',
    data=data
)

print(res)

# Output
# {'upsert_count': 3}
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.UpsertResp;

import java.util.*;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 0, \"vector\": [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], \"title\": \"Artificial Intelligence in Real Life\", \"issue\": \"\vol.12\"}", JsonObject.class),
        gson.fromJson("{\"id\": 1, \"vector\": [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], \"title\": \"Hollow Man\", \"issue\": \"vol.19\"}", JsonObject.class),
        gson.fromJson("{\"id\": 2, \"vector\": [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], \"title\": \"Treasure Hunt in Missouri\", \"issue\": \"vol.12\"}", JsonObject.class),
);

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("my_collection")
        .data(data)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.out.println(upsertResp);

// Output:
//
// UpsertResp(upsertCnt=3)
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

data = [
    {id: 0, vector: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], title: "Artificial Intelligence in Real Life", issue: "vol.12"},
    {id: 1, vector: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], title: "Hollow Man", issue: "vol.19"},
    {id: 2, vector: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], title: "Treasure Hunt in Missouri", issue: "vol.12"},
]

res = await client.upsert({
    collection_name: "my_collection",
    data: data,
})

console.log(res.upsert_cnt)

// Output
// 
// 3
// 
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

titleColumn := column.NewColumnString("title", []string{
    "Artificial Intelligence in Real Life", "Hollow Man", "Treasure Hunt in Missouri", 
})

issueColumn := column.NewColumnString("issue", []string{
    "vol.12", "vol.19", "vol.12"
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("id", []int64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
    }).
    WithColumns(titleColumn, issueColumn),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include "milvus/MilvusClientV2.h"

int main() {
    auto client = milvus::MilvusClientV2::Create();
    auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
    if (!status.IsOk()) {
        std::cerr << status.Message() << std::endl;
        return 1;
    }

    // Upsert entities into the "my_collection" collection
    milvus::EntityRows rows;
    milvus::EntityRow row;
    row["id"] = 0;
    row["vector"] = std::vector<float>{-0.619954382375778f, 0.4479436794798608f, -0.17493894838751745f, -0.4248030059917294f, -0.8648452746018911f};
    row["title"] = "Artificial Intelligence in Real Life";
    row["issue"] = "vol.12";
    rows.emplace_back(std::move(row));

    row = milvus::EntityRow{};
    row["id"] = 1;
    row["vector"] = std::vector<float>{0.4762662251462588f, -0.6942502138717026f, -0.4490002642657902f, -0.628696575798281f, 0.9660395877041965f};
    row["title"] = "Hollow Man";
    row["issue"] = "vol.19";
    rows.emplace_back(std::move(row));

    row = milvus::EntityRow{};
    row["id"] = 2;
    row["vector"] = std::vector<float>{-0.8864122635045097f, 0.9260170474445351f, 0.801326976181461f, 0.6383943392381306f, 0.7563037341572827f};
    row["title"] = "Treasure Hunt in Missouri";
    row["issue"] = "vol.12";
    rows.emplace_back(std::move(row));

    milvus::UpsertResponse upsert_resp;
    status = client->Upsert(milvus::UpsertRequest()
        .WithCollectionName("my_collection")
        .WithRowsData(std::move(rows)), upsert_resp);
    if (!status.IsOk()) {
        std::cerr << status.Message() << std::endl;
        return 1;
    }
    std::cout << upsert_resp.Results().UpsertCount() << std::endl;

    return 0;
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "data": [
        {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "title": "Artificial Intelligence in Real Life", "issue": "vol.12"},
        {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "title": "Hollow Man", "issue": "vol.19"},
        {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "title": "Treasure Hunt in Missouri", "issue": "vol.12"},
],
    "collectionName": "my_collection"
}'

# {
#     "code": 0,
#     "data": {
#         "upsertCount": 3,
#         "upsertIds": [
#             0,
#             1,
#             2,
#         ]
#     }
# }
```

## Upsert entities in a partition

You can also upsert entities into a specified partition. The following code snippets assume that you have a partition named **PartitionA** in your collection.

The three entities, if exists in the partition, will be overridden by those included in the request. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
</div>

```python
data=[
    {
        "id": 10, 
        "vector": [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], 
        "title": "Layour Design Reference", 
        "issue": "vol.34"
    },
    {
        "id": 11, 
        "vector": [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], 
        "title": "Doraemon and His Friends", 
        "issue": "vol.2"
    },
    {
        "id": 12, 
        "vector": [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], 
        "title": "Pikkachu and Pokemon", 
        "issue": "vol.12"
    },
]

res = client.upsert(
    collection_name="my_collection",
    data=data,
    partition_name="partitionA"
)

print(res)

# Output
# {'upsert_count': 3}
```

```java
import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.UpsertResp;

Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 10, \"vector\": [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], \"title\": \"Layour Design Reference\", \"issue\": \"vol.34\"}", JsonObject.class),
        gson.fromJson("{\"id\": 11, \"vector\": [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], \"title\": \"Doraemon and His Friends\", \"issue\": \"vol.2\"}", JsonObject.class),
        gson.fromJson("{\"id\": 12, \"vector\": [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], \"title\": \"Pikkachu and Pokemon\", \"issue\": \"vol.12\"}", JsonObject.class),
);

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("my_collection")
        .partitionName("partitionA")
        .data(data)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.out.println(upsertResp);

// Output:
//
// UpsertResp(upsertCnt=3)
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

// 6. Upsert data in partitions
data = [
    {id: 10, vector: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], title: "Layour Design Reference", issue: "vol.34"},
    {id: 11, vector: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], title: "Doraemon and His Friends", issue: "vol.2"},
    {id: 12, vector: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], title: "Pikkachu and Pokemon", issue: "vol.12"},
]

res = await client.upsert({
    collection_name: "my_collection",
    data: data,
    partition_name: "partitionA"
})

console.log(res.upsert_cnt)

// Output
// 
// 3
// 
```

```go
titleColumn = column.NewColumnString("title", []string{
    "Layour Design Reference", "Doraemon and His Friends", "Pikkachu and Pokemon", 
})
issueColumn = column.NewColumnString("issue", []string{
    "vol.34", "vol.2", "vol.12", 
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithPartition("partitionA").
    WithInt64Column("id", []int64{10, 11, 12, 13, 14, 15, 16, 17, 18, 19}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
    }).
    WithColumns(titleColumn, issueColumn),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```cpp
// Upsert entities into a specific partition
row["id"] = 10;
row["vector"] = std::vector<float>{0.06998888224297328f, 0.8582816610326578f, -0.9657938677934292f, 0.6527905683627726f, -0.8668460657158576f};
row["title"] = "Layour Design Reference";
row["issue"] = "vol.34";
rows.emplace_back(std::move(row));

row = milvus::EntityRow{};
row["id"] = 11;
row["vector"] = std::vector<float>{0.6060703043917468f, -0.3765080534566074f, -0.7710758854987239f, 0.36993888322346136f, 0.5507513364206531f};
row["title"] = "Doraemon and His Friends";
row["issue"] = "vol.2";
rows.emplace_back(std::move(row));

row = milvus::EntityRow{};
row["id"] = 12;
row["vector"] = std::vector<float>{-0.9041813104515337f, -0.9610546012461163f, 0.20033003106083358f, 0.11842506351635174f, 0.8327356724591011f};
row["title"] = "Pikkachu and Pokemon";
row["issue"] = "vol.12";
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("my_collection")
    .WithPartitionName("partitionA")
    .WithRowsData(std::move(rows)), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
std::cout << upsert_resp.Results().UpsertCount() << std::endl;
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/upsert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "data": [
        {"id": 10, "vector": [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], "title": "Layour Design Reference", "issue": "vol.34"},
        {"id": 11, "vector": [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], "title": "Doraemon and His Friends", "issue": "vol.2"},
        {"id": 12, "vector": [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], "title": "Pikkachu and Pokemon", "issue": "vol.12"},
    ],
    "collectionName": "my_collection",
    "partitionName": "partitionA"
}'

# {
#     "code": 0,
#     "data": {
#         "upsertCount": 3,
#         "upsertIds": [
#             10,
#             11,
#             12,
#         ]
#     }
# }
```

## Upsert entities in merge mode | Milvus v2.6.2+

The following example updates only the `issue` field of the entities with primary keys `1` and `2` in `my_collection`. Before running it, ensure that both entities already exist. Their other fields retain their current values.

<div class="alert note">

When performing an upsert in merge mode, ensure that the entities involved in the request have the same set of fields. Suppose there are two or more entities to be upserted, as shown in the following code snippet, it is important that they include identical fields to prevent errors and maintain data integrity.

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
data=[
    {
        "id": 1,
        "issue": "vol.14"
    },
    {
        "id": 2, 
        "issue": "vol.7"
    }
]

res = client.upsert(
    collection_name="my_collection",
    data=data,
    partial_update=True
)

print(res)

# Output
# {'upsert_count': 2}
```

```java
JsonObject row1 = new JsonObject();
row1.addProperty("id", 1);
row1.addProperty("issue", "vol.14");

JsonObject row2 = new JsonObject();
row2.addProperty("id", 2);
row2.addProperty("issue", "vol.7");

UpsertReq upsertReq = UpsertReq.builder()
        .collectionName("my_collection")
        .data(Arrays.asList(row1, row2))
        .partialUpdate(true)
        .build();

UpsertResp upsertResp = client.upsert(upsertReq);
System.out.println(upsertResp);

// Output:
//
// UpsertResp(upsertCnt=2)
```

```go
pkColumn := column.NewColumnInt64("id", []int64{1, 2})
issueColumn = column.NewColumnString("issue", []string{
    "vol.17", "vol.7",
})

_, err = client.Upsert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithColumns(pkColumn, issueColumn).
    WithPartialUpdate(true),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```cpp
// Upsert entities in merge mode with partial updates
row["id"] = 1;
row["issue"] = "vol.14";
rows.emplace_back(std::move(row));

row = milvus::EntityRow{};
row["id"] = 2;
row["issue"] = "vol.7";
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("my_collection")
    .WithRowsData(std::move(rows))
    .WithPartialUpdate(true), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
std::cout << upsert_resp.Results().UpsertCount() << std::endl;
```

```javascript
const data=[
    {
        "id": 1,
        "issue": "vol.14"
    },
    {
        "id": 2, 
        "issue": "vol.7"
    }
];

const res = await client.upsert({
    collection_name: "my_collection",
    data,
    partial_update: true
});

console.log(res)

// Output
// 
// 2
// 
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

export COLLECTION_NAME="my_collection"
export UPSERT_DATA='[
  {
    "id": 1,
    "issue": "vol.14"
  },
  {
    "id": 2,
    "issue": "vol.7"
  }
]'

curl -X POST "http://localhost:19530/v2/vectordb/entities/upsert" \
  -H "Content-Type: application/json" \
  -H "Request-Timeout: 10" \
  -H "Authorization: Bearer ${TOKEN}" \
  -d "{
    \"collectionName\": \"${COLLECTION_NAME}\",
    \"data\": ${UPSERT_DATA},
    \"partialUpdate\": true
  }"

# {
#     "code": 0,
#     "data": {
#         "upsertCount": 2,
#         "upsertIds": [
#              3,
#             12,
#         ]
#     }
# }
```

## Upsert ARRAY fields in merge mode | Milvus 2.6.17+

Before Milvus v2.6.17, updating part of an `ARRAY` field required a client-side read-modify-write flow: query the existing array, change it in application code, and upsert the full replacement value. Partial-update operators (`ARRAY_APPEND` and `ARRAY_REMOVE`) let you send only the elements to append or remove, which reduces client-side logic and avoids the extra read before the upsert.

Suppose the entity with primary key `1` already has `tags = ["new", "trial"]`. Before partial-update operators, adding element `"premium"` to an array required upserting the full replacement array:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
</div>

```python
client.upsert(
    collection_name="users",
    # highlight-start
    data=[{"pk": 1, "tags": ["new", "trial", "premium"]}],
    partial_update=True,
    # highlight-end
)
```

```java
List<JsonObject> replacementData = Collections.singletonList(
        gson.fromJson("{\"pk\": 1, \"tags\": [\"new\", \"trial\", \"premium\"]}", JsonObject.class)
);

client.upsert(UpsertReq.builder()
        .collectionName("users")
        // highlight-start
        .partialUpdate(true)
        .data(replacementData)
        // highlight-end
        .build());
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Upserting the full replacement array
row["pk"] = 1;
row["tags"] = std::vector<std::string>{"new", "trial", "premium"};
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("users")
    .WithRowsData(std::move(rows))
    .WithPartialUpdate(true), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
```

With `ARRAY_APPEND`, send only the element to add:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
</div>

```python
client.upsert(
    collection_name="users",
    # highlight-start
    data=[{"pk": 1, "tags": ["premium"]}],
    field_ops={"tags": FieldOp.array_append()},
    # highlight-end
)
```

```java
List<JsonObject> appendData = Collections.singletonList(
        gson.fromJson("{\"pk\": 1, \"tags\": [\"premium\"]}", JsonObject.class)
);

UpsertReq.FieldPartialUpdateOp appendTags = UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName("tags")
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_APPEND)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName("users")
        // highlight-start
        .data(appendData)
        .fieldOps(Collections.singletonList(appendTags))
        // highlight-end
        .build());
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Append elements to the existing ARRAY field without reading it first
row["pk"] = 1;
row["tags"] = std::vector<std::string>{"premium"};
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("users")
    .WithRowsData(std::move(rows))
    .AddFieldOp(milvus::FieldPartialUpdateOp("tags", milvus::FieldPartialUpdateOp::OpType::ARRAY_APPEND)), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
```

With `ARRAY_REMOVE`, send only the matching element to remove:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
</div>

```python
client.upsert(
    collection_name="users",
    # highlight-start
    data=[{"pk": 1, "tags": ["trial"]}],
    field_ops={"tags": FieldOp.array_remove()},
    # highlight-end
)
```

```java
List<JsonObject> removeData = Collections.singletonList(
        gson.fromJson("{\"pk\": 1, \"tags\": [\"trial\"]}", JsonObject.class)
);

UpsertReq.FieldPartialUpdateOp removeTags = UpsertReq.FieldPartialUpdateOp.builder()
        .fieldName("tags")
        .opType(UpsertReq.FieldPartialUpdateOp.OpType.ARRAY_REMOVE)
        .build();

client.upsert(UpsertReq.builder()
        .collectionName("users")
        // highlight-start
        .data(removeData)
        .fieldOps(Collections.singletonList(removeTags))
        // highlight-end
        .build());
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Remove matching elements from the existing ARRAY field
row["pk"] = 1;
row["tags"] = std::vector<std::string>{"trial"};
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("users")
    .WithRowsData(std::move(rows))
    .AddFieldOp(milvus::FieldPartialUpdateOp("tags", milvus::FieldPartialUpdateOp::OpType::ARRAY_REMOVE)), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
```

<div class="alert note">

Attaching either operator to a field via `field_ops` implicitly enables partial-update semantics. Therefore, you do **not** need to pass `partial_update=True` alongside `field_ops`.

</div>

### Limits

- The payload values must match the `element_type` of the target `ARRAY` field. For example, if the target field is `ARRAY<VARCHAR>`, the payload must contain string values.

- In Milvus v2.6.17 and later, `ARRAY_APPEND` and `ARRAY_REMOVE` support `ARRAY` fields whose `element_type` is `BOOL`, `INT8`, `INT16`, `INT32`, `INT64`, `FLOAT`, `DOUBLE`, or `VARCHAR`.

- After an `ARRAY_APPEND` operation, the resulting array length must not exceed the field's `max_capacity`.

- Concurrent upserts to the same entity are not atomic across requests. If two requests update the same `ARRAY` field at the same time, the later write can overwrite the earlier one. Use application-level coordination if you need to preserve all concurrent changes.

### Example

The following example uses a small `users` collection with a primary key `pk`, a `tags` field of type `ARRAY<VARCHAR>`, and an `embedding` vector field. It first inserts two entities with initial `tags` values, then uses `ARRAY_APPEND` and `ARRAY_REMOVE` to show how each operator changes the stored array.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import DataType, FieldOp, MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 1. Create a collection with an ARRAY<VARCHAR> field
schema = client.create_schema(enable_dynamic_field=False)
schema.add_field("pk", DataType.INT64, is_primary=True)
schema.add_field("embedding", DataType.FLOAT_VECTOR, dim=5)
schema.add_field(
    "tags",
    DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=8,
    max_length=32,
)

index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",
    metric_type="L2",
)

client.create_collection(
    collection_name="users",
    schema=schema,
    index_params=index_params
)

# 2. Seed two entities
client.insert(
    collection_name="users",
    data=[
        {"pk": 1, "embedding": [0.1, 0.2, 0.3, 0.4, 0.5], "tags": ["new"]},
        {"pk": 2, "embedding": [0.6, 0.7, 0.8, 0.9, 1.0], "tags": ["new", "trial"]},
    ],
)

# 3. Append tags without reading the existing ARRAY values
client.upsert(
    collection_name="users",
    # highlight-start
    data=[
        {"pk": 1, "tags": ["premium", "vip"]},
        {"pk": 2, "tags": ["premium"]},
    ],
    field_ops={"tags": FieldOp.array_append()},
    # highlight-end
)

res = client.query(
    collection_name="users",
    filter="pk in [1, 2]",
    output_fields=["pk", "tags"],
)
print(res)

# Example output:
# data: [
#   "{'pk': 1, 'tags': ['new', 'premium', 'vip']}",
#   "{'pk': 2, 'tags': ['new', 'trial', 'premium']}"
# ]

# 4. Remove matching tags without replacing the full ARRAY field
client.upsert(
    collection_name="users",
    # highlight-start
    data=[
        {"pk": 1, "tags": ["new"]},
        {"pk": 2, "tags": ["trial"]},
    ],
    field_ops={"tags": FieldOp.array_remove()},
    # highlight-end
)

res = client.query(
    collection_name="users",
    filter="pk in [1, 2]",
    output_fields=["pk", "tags"],
)
print(res)

# Example output:
# data: [
#   "{'pk': 1, 'tags': ['premium', 'vip']}",
#   "{'pk': 2, 'tags': ['new', 'premium']}"
# ]
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Create a collection with an ARRAY<VARCHAR> field
milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField(milvus::FieldSchema("pk", milvus::DataType::INT64, "", true, false));
schema->AddField(milvus::FieldSchema("embedding", milvus::DataType::FLOAT_VECTOR).WithDimension(5));
schema->AddField(milvus::FieldSchema("tags", milvus::DataType::ARRAY).WithElementType(milvus::DataType::VARCHAR).WithMaxCapacity(8).WithMaxLength(32));

milvus::IndexDesc index("embedding", "", milvus::IndexType::AUTOINDEX, milvus::MetricType::L2);
status = client->CreateCollection(milvus::CreateCollectionRequest()
    .WithCollectionName("users")
    .WithCollectionSchema(schema)
    .AddIndex(std::move(index)));
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}

// Seed two entities
row["pk"] = 1;
row["embedding"] = std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f, 0.5f};
row["tags"] = std::vector<std::string>{"new"};
rows.emplace_back(std::move(row));

row = milvus::EntityRow{};
row["pk"] = 2;
row["embedding"] = std::vector<float>{0.6f, 0.7f, 0.8f, 0.9f, 1.0f};
row["tags"] = std::vector<std::string>{"new", "trial"};
rows.emplace_back(std::move(row));

status = client->Insert(milvus::InsertRequest()
    .WithCollectionName("users")
    .WithRowsData(std::move(rows)), resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}

// Append tags without reading the existing ARRAY values
row["pk"] = 1;
row["tags"] = std::vector<std::string>{"premium", "vip"};
rows.emplace_back(std::move(row));

row = milvus::EntityRow{};
row["pk"] = 2;
row["tags"] = std::vector<std::string>{"premium"};
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("users")
    .WithRowsData(std::move(rows))
    .AddFieldOp(milvus::FieldPartialUpdateOp("tags", milvus::FieldPartialUpdateOp::OpType::ARRAY_APPEND)), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}

// Remove matching tags without replacing the full ARRAY field
row["pk"] = 1;
row["tags"] = std::vector<std::string>{"new"};
rows.emplace_back(std::move(row));

row = milvus::EntityRow{};
row["pk"] = 2;
row["tags"] = std::vector<std::string>{"trial"};
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("users")
    .WithRowsData(std::move(rows))
    .AddFieldOp(milvus::FieldPartialUpdateOp("tags", milvus::FieldPartialUpdateOp::OpType::ARRAY_REMOVE)), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
```

## Upsert StructArray field in merge mode

Upserting a StructArray field in an entity overwrites the field value. That means you need to include all subfields defined in the struct schema when you upsert a StructArray field.

The following example demonstrates how to upsert the `chunks` field in merge mode, a StructArray field with 6 subfields. When the operation completes, the `chunks` field of the entity with id 1 is set to the array with the two-element structs provided in the request.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
</div>

```python
client.upsert(
    collection_name="books",
    # highlight-start
    data=[{
        "id": 1,
        "chunks": [
            {
              "text": "Use HNSW efSearch to trade recall for latency.",
              "section": "index",
              "page": 1,
              "quality_score": 0.92,
              "has_code": True,
              "emb_list_vector": [0.11, 0.21, 0.31, 0.41]
            },
            {
              "text": "Range search returns vectors within a distance boundary.",
              "section": "search",
              "page": 2,
              "quality_score": 0.86,
              "has_code": False,
              "emb_list_vector": [0.18, 0.23, 0.29, 0.36]
            }
        ]
    }],
    # highlight-end
    partial_update=True
)
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Upsert a StructArray field in merge mode: include all subfields
row["id"] = 1;
row["chunks"] = std::vector<nlohmann::json>{
    {
        {"text", "Use HNSW efSearch to trade recall for latency."},
        {"section", "index"},
        {"page", 1},
        {"quality_score", 0.92},
        {"has_code", true},
        {"emb_list_vector", std::vector<float>{0.11f, 0.21f, 0.31f, 0.41f}}
    },
    {
        {"text", "Range search returns vectors within a distance boundary."},
        {"section", "search"},
        {"page", 2},
        {"quality_score", 0.86},
        {"has_code", false},
        {"emb_list_vector", std::vector<float>{0.18f, 0.23f, 0.29f, 0.36f}}
    }
};
rows.emplace_back(std::move(row));

status = client->Upsert(milvus::UpsertRequest()
    .WithCollectionName("books")
    .WithRowsData(std::move(rows))
    .WithPartialUpdate(true), upsert_resp);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
```
