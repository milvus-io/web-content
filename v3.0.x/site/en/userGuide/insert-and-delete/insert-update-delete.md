---
id: insert-update-delete.md
title: "Insert Entities"
summary: "Entities in a collection are data records that share the same set of fields. Field values in every data record form an entity. This page introduces how to insert entities into a collection."
---

# Insert Entities

Entities in a collection are data records that share the same set of fields. Field values in every data record form an entity. This page introduces how to insert entities into a collection.

<div class="alert note">

- **Fields added after collection creation**: If you add new fields to a collection after creation and do not specify values during insertion, Milvus automatically populates them with defined default values or `NULL` if no defaults are set. For details, refer to [Alter Collection Schema](add-fields-to-an-existing-collection.md).

- **Duplicate handling**: The standard `insert` operation does not check for duplicate primary keys. Inserting data with an existing primary key creates a new entity with the same key, leading to data duplication and potential application issues. To update existing entities or avoid duplicates, use the **`upsert`** operation instead. For more information, refer to [Upsert Entities](upsert-entities.md).

</div>

## Overview

In Milvus, an **Entity** refers to data records in a **Collection** that share the same **Schema**, with the data in each field of a row constituting an Entity. Therefore, the Entities within the same Collection have the same attributes (such as field names, data types, and other constraints).

When inserting an Entity into a Collection, the Entity to be inserted can only be successfully added if it contains all the fields defined in the Schema. The inserted Entity will enter a Partition named **_default** in the order of insertion. Provided that a certain Partition exists, you can also insert Entities into that Partition by specifying the Partition name in the insertion request.

Milvus also supports dynamic fields to maintain the scalability of the Collection. When the dynamic field is enabled, you can insert fields that are not defined in the Schema into the Collection. These fields and values will be stored as key-value pairs in a reserved field named **\$meta**. For more information about dynamic fields, please refer to Dynamic Field.

## Insert Entities into a Collection

Before inserting data, you need to organize your data into a list of dictionaries according to the Schema, with each dictionary representing an Entity and containing all the fields defined in the Schema. If the Collection has the dynamic field enabled, each dictionary can also include fields that are not defined in the Schema.

In this section, you will insert entities into a Collection created in the quick-setup manner. A Collection created in this manner has only two fields, named **id** and **vector**. Additionally, this Collection has the dynamic field enabled, so the Entities in the example code include a field called **color** that is not defined in the Schema.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

data=[
    {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
    {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
    {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
    {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
    {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
    {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
    {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
    {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
    {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
    {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}
]

res = client.insert(
    collection_name="quick_setup",
    data=data
)

print(res)

# Output
# {'insert_count': 10, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

import java.util.*;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 0, \"vector\": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], \"color\": \"pink_8682\"}", JsonObject.class),
        gson.fromJson("{\"id\": 1, \"vector\": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], \"color\": \"red_7025\"}", JsonObject.class),
        gson.fromJson("{\"id\": 2, \"vector\": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], \"color\": \"orange_6781\"}", JsonObject.class),
        gson.fromJson("{\"id\": 3, \"vector\": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], \"color\": \"pink_9298\"}", JsonObject.class),
        gson.fromJson("{\"id\": 4, \"vector\": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], \"color\": \"red_4794\"}", JsonObject.class),
        gson.fromJson("{\"id\": 5, \"vector\": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], \"color\": \"yellow_4222\"}", JsonObject.class),
        gson.fromJson("{\"id\": 6, \"vector\": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], \"color\": \"red_9392\"}", JsonObject.class),
        gson.fromJson("{\"id\": 7, \"vector\": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], \"color\": \"grey_8510\"}", JsonObject.class),
        gson.fromJson("{\"id\": 8, \"vector\": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], \"color\": \"white_9381\"}", JsonObject.class),
        gson.fromJson("{\"id\": 9, \"vector\": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], \"color\": \"purple_4976\"}", JsonObject.class)
);

InsertReq insertReq = InsertReq.builder()
        .collectionName("quick_setup")
        .data(data)
        .build();

InsertResp insertResp = client.insert(insertReq);
System.out.println(insertResp);

// Output:
//
// InsertResp(InsertCnt=10, primaryKeys=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9])
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

// 3. Insert some data

var data = [
    {id: 0, vector: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], color: "pink_8682"},
    {id: 1, vector: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], color: "red_7025"},
    {id: 2, vector: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], color: "orange_6781"},
    {id: 3, vector: [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], color: "pink_9298"},
    {id: 4, vector: [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], color: "red_4794"},
    {id: 5, vector: [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], color: "yellow_4222"},
    {id: 6, vector: [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], color: "red_9392"},
    {id: 7, vector: [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], color: "grey_8510"},
    {id: 8, vector: [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], color: "white_9381"},
    {id: 9, vector: [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], color: "purple_4976"}        
]

var res = await client.insert({
    collection_name: "quick_setup",
    data: data,
})

console.log(res.insert_cnt)

// Output
// 
// 10
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

dynamicColumn := column.NewColumnString("color", []string{
    "pink_8682", "red_7025", "orange_6781", "pink_9298", "red_4794", "yellow_4222", "red_9392", "grey_8510", "white_9381", "purple_4976",
})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("quick_setup").
    WithInt64Column("id", []int64{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
        {0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345},
        {0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106},
        {0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955},
        {0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987},
        {-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052},
        {0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336},
        {0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608},
    }).
    WithColumns(dynamicColumn),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```cpp
#include <iostream>
#include <vector>

#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

milvus::InsertRequest insert_request;
insert_request.WithCollectionName("quick_setup")
    .AddRowData({{"id", 0}, {"vector", std::vector<float>{0.35803764F, -0.60234958F, 0.18414013F, -0.26286206F, 0.90294385F}}, {"color", "pink_8682"}})
    .AddRowData({{"id", 1}, {"vector", std::vector<float>{0.19886813F, 0.06023561F, 0.69769633F, 0.26144746F, 0.8387295F}}, {"color", "red_7025"}})
    .AddRowData({{"id", 2}, {"vector", std::vector<float>{0.43742132F, -0.55975026F, 0.6457888F, 0.7894059F, 0.20785794F}}, {"color", "orange_6781"}})
    .AddRowData({{"id", 3}, {"vector", std::vector<float>{0.31720054F, 0.9719045F, -0.36981147F, -0.48608947F, 0.9579189F}}, {"color", "pink_9298"}})
    .AddRowData({{"id", 4}, {"vector", std::vector<float>{0.44523495F, -0.8757027F, 0.82207793F, 0.4640629F, 0.30337483F}}, {"color", "red_4794"}})
    .AddRowData({{"id", 5}, {"vector", std::vector<float>{0.9858251F, -0.81446517F, 0.6299267F, 0.12069069F, -0.14462778F}}, {"color", "yellow_4222"}})
    .AddRowData({{"id", 6}, {"vector", std::vector<float>{0.8371978F, -0.01576437F, -0.31062937F, -0.56266695F, -0.8984948F}}, {"color", "red_9392"}})
    .AddRowData({{"id", 7}, {"vector", std::vector<float>{-0.3344515F, -0.2567135F, 0.898754F, 0.9402996F, 0.5378065F}}, {"color", "grey_8510"}})
    .AddRowData({{"id", 8}, {"vector", std::vector<float>{0.39524718F, 0.40002573F, -0.5890507F, -0.8650502F, -0.6140361F}}, {"color", "white_9381"}})
    .AddRowData({{"id", 9}, {"vector", std::vector<float>{0.57182807F, 0.24070317F, -0.37379134F, -0.06726932F, -0.6980532F}}, {"color", "purple_4976"}});
milvus::InsertResponse insert_response;
status = client->Insert(insert_request, insert_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
std::cout << "insert_count=" << insert_response.Results().InsertCount() << std::endl;
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let rows: Vec<_> = vec![
    serde_json::json!({"id": 0, "vector": [0.35803764, -0.60234958, 0.18414013, -0.26286206, 0.90294385], "color": "pink_8682"}),
    serde_json::json!({"id": 1, "vector": [0.19886813, 0.06023561, 0.69769633, 0.26144746, 0.8387295], "color": "red_7025"}),
    serde_json::json!({"id": 2, "vector": [0.43742132, -0.55975026, 0.6457888, 0.7894059, 0.20785794], "color": "orange_6781"}),
    serde_json::json!({"id": 3, "vector": [0.31720054, 0.9719045, -0.36981147, -0.48608947, 0.9579189], "color": "pink_9298"}),
    serde_json::json!({"id": 4, "vector": [0.44523495, -0.8757027, 0.82207793, 0.4640629, 0.30337483], "color": "red_4794"}),
    serde_json::json!({"id": 5, "vector": [0.9858251, -0.81446517, 0.6299267, 0.12069069, -0.14462778], "color": "yellow_4222"}),
    serde_json::json!({"id": 6, "vector": [0.8371978, -0.01576437, -0.31062937, -0.56266695, -0.8984948], "color": "red_9392"}),
    serde_json::json!({"id": 7, "vector": [-0.3344515, -0.2567135, 0.898754, 0.9402996, 0.5378065], "color": "grey_8510"}),
    serde_json::json!({"id": 8, "vector": [0.39524718, 0.40002573, -0.5890507, -0.8650502, -0.6140361], "color": "white_9381"}),
    serde_json::json!({"id": 9, "vector": [0.57182807, 0.24070317, -0.37379134, -0.06726932, -0.6980532], "color": "purple_4976"}),
];
client
    .insert(
        InsertRequest::builder()
            .collection_name("quick_setup")
            .rows(rows)
            .build()?,
    )
    .await?;
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
        {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
        {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
        {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
        {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
        {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
        {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
        {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
        {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
        {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}        
    ],
    "collectionName": "quick_setup"
}'

# {
#     "code": 0,
#     "data": {
#         "insertCount": 10,
#         "insertIds": [
#             0,
#             1,
#             2,
#             3,
#             4,
#             5,
#             6,
#             7,
#             8,
#             9
#         ]
#     }
# }
```

## Insert Entities into a Partition

You can also insert entities into a specified partition. The following code snippets assume that you have a partition named **PartitionA** in your collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
    <a href="#bash">cURL</a>
</div>

```python
data=[
    {"id": 10, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
    {"id": 11, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
    {"id": 12, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
    {"id": 13, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
    {"id": 14, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
    {"id": 15, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
    {"id": 16, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
    {"id": 17, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
    {"id": 18, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
    {"id": 19, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}
]

res = client.insert(
    collection_name="quick_setup",
    # highlight-next-line
    partition_name="partitionA",
    data=data
)

print(res)

# Output
# {'insert_count': 10, 'ids': [10, 11, 12, 13, 14, 15, 16, 17, 18, 19]}
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

import java.util.*;

Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 10, \"vector\": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], \"color\": \"pink_8682\"}", JsonObject.class),
        gson.fromJson("{\"id\": 11, \"vector\": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], \"color\": \"red_7025\"}", JsonObject.class),
        gson.fromJson("{\"id\": 12, \"vector\": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], \"color\": \"orange_6781\"}", JsonObject.class),
        gson.fromJson("{\"id\": 13, \"vector\": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], \"color\": \"pink_9298\"}", JsonObject.class),
        gson.fromJson("{\"id\": 14, \"vector\": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], \"color\": \"red_4794\"}", JsonObject.class),
        gson.fromJson("{\"id\": 15, \"vector\": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], \"color\": \"yellow_4222\"}", JsonObject.class),
        gson.fromJson("{\"id\": 16, \"vector\": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], \"color\": \"red_9392\"}", JsonObject.class),
        gson.fromJson("{\"id\": 17, \"vector\": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], \"color\": \"grey_8510\"}", JsonObject.class),
        gson.fromJson("{\"id\": 18, \"vector\": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], \"color\": \"white_9381\"}", JsonObject.class),
        gson.fromJson("{\"id\": 19, \"vector\": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], \"color\": \"purple_4976\"}", JsonObject.class)
);

InsertReq insertReq = InsertReq.builder()
        .collectionName("quick_setup")
        .partitionName("partitionA")
        .data(data)
        .build();

InsertResp insertResp = client.insert(insertReq);
System.out.println(insertResp);

// Output:
//
// InsertResp(InsertCnt=10, primaryKeys=[10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node")

// 3. Insert some data

var data = [
    {id: 10, vector: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], color: "pink_8682"},
    {id: 11, vector: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], color: "red_7025"},
    {id: 12, vector: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], color: "orange_6781"},
    {id: 13, vector: [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], color: "pink_9298"},
    {id: 14, vector: [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], color: "red_4794"},
    {id: 15, vector: [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], color: "yellow_4222"},
    {id: 16, vector: [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], color: "red_9392"},
    {id: 17, vector: [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], color: "grey_8510"},
    {id: 18, vector: [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], color: "white_9381"},
    {id: 19, vector: [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], color: "purple_4976"}        
]

var res = await client.insert({
    collection_name: "quick_setup",
    // highlight-next-line
    partition_name: "partitionA",
    data: data,
})

console.log(res.insert_cnt)

// Output
// 
// 10
// 
```

```go
dynamicColumn = column.NewColumnString("color", []string{
    "pink_8682", "red_7025", "orange_6781", "pink_9298", "red_4794", "yellow_4222", "red_9392", "grey_8510", "white_9381", "purple_4976",
})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("quick_setup").
    WithPartition("partitionA").
    WithInt64Column("id", []int64{10, 11, 12, 13, 14, 15, 16, 17, 18, 19}).
    WithFloatVectorColumn("vector", 5, [][]float32{
        {0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592},
        {0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104},
        {0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592},
        {0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345},
        {0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106},
        {0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955},
        {0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987},
        {-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052},
        {0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336},
        {0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608},
    }).
    WithColumns(dynamicColumn),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```cpp
milvus::InsertRequest insert_request;
insert_request.WithCollectionName("quick_setup")
    // highlight-next-line
    .WithPartitionName("partitionA")
    .AddRowData({{"id", 10}, {"vector", std::vector<float>{0.35803764F, -0.60234958F, 0.18414013F, -0.26286206F, 0.90294385F}}, {"color", "pink_8682"}})
    .AddRowData({{"id", 11}, {"vector", std::vector<float>{0.19886813F, 0.06023561F, 0.69769633F, 0.26144746F, 0.8387295F}}, {"color", "red_7025"}})
    .AddRowData({{"id", 12}, {"vector", std::vector<float>{0.43742132F, -0.55975026F, 0.6457888F, 0.7894059F, 0.20785794F}}, {"color", "orange_6781"}})
    .AddRowData({{"id", 13}, {"vector", std::vector<float>{0.31720054F, 0.9719045F, -0.36981147F, -0.48608947F, 0.9579189F}}, {"color", "pink_9298"}})
    .AddRowData({{"id", 14}, {"vector", std::vector<float>{0.44523495F, -0.8757027F, 0.82207793F, 0.4640629F, 0.30337483F}}, {"color", "red_4794"}})
    .AddRowData({{"id", 15}, {"vector", std::vector<float>{0.9858251F, -0.81446517F, 0.6299267F, 0.12069069F, -0.14462778F}}, {"color", "yellow_4222"}})
    .AddRowData({{"id", 16}, {"vector", std::vector<float>{0.8371978F, -0.01576437F, -0.31062937F, -0.56266695F, -0.8984948F}}, {"color", "red_9392"}})
    .AddRowData({{"id", 17}, {"vector", std::vector<float>{-0.3344515F, -0.2567135F, 0.898754F, 0.9402996F, 0.5378065F}}, {"color", "grey_8510"}})
    .AddRowData({{"id", 18}, {"vector", std::vector<float>{0.39524718F, 0.40002573F, -0.5890507F, -0.8650502F, -0.6140361F}}, {"color", "white_9381"}})
    .AddRowData({{"id", 19}, {"vector", std::vector<float>{0.57182807F, 0.24070317F, -0.37379134F, -0.06726932F, -0.6980532F}}, {"color", "purple_4976"}});
milvus::InsertResponse insert_response;
auto status = client->Insert(insert_request, insert_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
std::cout << "insert_count=" << insert_response.Results().InsertCount() << std::endl;
```

```rust
let rows: Vec<_> = vec![
    serde_json::json!({"id": 10, "vector": [0.35803764, -0.60234958, 0.18414013, -0.26286206, 0.90294385], "color": "pink_8682"}),
    serde_json::json!({"id": 11, "vector": [0.19886813, 0.06023561, 0.69769633, 0.26144746, 0.8387295], "color": "red_7025"}),
    serde_json::json!({"id": 12, "vector": [0.43742132, -0.55975026, 0.6457888, 0.7894059, 0.20785794], "color": "orange_6781"}),
    serde_json::json!({"id": 13, "vector": [0.31720054, 0.9719045, -0.36981147, -0.48608947, 0.9579189], "color": "pink_9298"}),
    serde_json::json!({"id": 14, "vector": [0.44523495, -0.8757027, 0.82207793, 0.4640629, 0.30337483], "color": "red_4794"}),
    serde_json::json!({"id": 15, "vector": [0.9858251, -0.81446517, 0.6299267, 0.12069069, -0.14462778], "color": "yellow_4222"}),
    serde_json::json!({"id": 16, "vector": [0.8371978, -0.01576437, -0.31062937, -0.56266695, -0.8984948], "color": "red_9392"}),
    serde_json::json!({"id": 17, "vector": [-0.3344515, -0.2567135, 0.898754, 0.9402996, 0.5378065], "color": "grey_8510"}),
    serde_json::json!({"id": 18, "vector": [0.39524718, 0.40002573, -0.5890507, -0.8650502, -0.6140361], "color": "white_9381"}),
    serde_json::json!({"id": 19, "vector": [0.57182807, 0.24070317, -0.37379134, -0.06726932, -0.6980532], "color": "purple_4976"}),
];
client
    .insert(
        InsertRequest::builder()
            .collection_name("quick_setup")
            // highlight-next-line
            .partition_name("partitionA")
            .rows(rows)
            .build()?,
    )
    .await?;
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "data": [
        {"id": 10, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},
        {"id": 11, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},
        {"id": 12, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},
        {"id": 13, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},
        {"id": 14, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},
        {"id": 15, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},
        {"id": 16, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},
        {"id": 17, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},
        {"id": 18, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},
        {"id": 19, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}        
    ],
    "collectionName": "quick_setup",
    "partitionName": "partitionA"
}'

# {
#     "code": 0,
#     "data": {
#         "insertCount": 10,
#         "insertIds": [
#             10,
#             11,
#             12,
#             13,
#             14,
#             15,
#             16,
#             17,
#             18,
#             19
#         ]
#     }
# }
```
