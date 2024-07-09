---
id: insert-update-delete.md
summary: This guide walks you through the data manipulation operations within a collection, including insertion, upsertion, and deletion.
title: Insert, Upsert & Delete
---

# Insert, Upsert & Delete

This guide walks you through the data manipulation operations within a collection, including insertion, upsertion, and deletion.

## Before you start

- You have installed the SDK of your choice. To install an SDK, refer to [Install SDKs](https://milvus.io/docs/install-pymilvus.md).

- You have created a collection. To create a collection, refer to [Manage Collections](manage-collections.md).

- To insert a large volume of data, you are advised to use [Data Import](https://milvus.io/api-reference/pymilvus/v2.4.x/DataImport/LocalBulkWriter/LocalBulkWriter.md).

## Overview

An entity, within the context of Milvus collections, is a singular, identifiable instance within a collection. It represents a distinct member of a particular class, be it a book in a library, a gene in a genome, or any other identifiable entity.

Entities within a collection share a common set of attributes, termed schema, outlining the structure that each entity must adhere to, including field names, data types, and any other constraints.

Successful insertion of entities into a collection requires that the provided data should contain all the schema-defined fields of the target collection. Additionally, you can also include non-schema-defined fields only if you have enabled the dynamic field. For details, refer to [Enable Dynamic Field](enable-dynamic-field.md).

## Preparations

The code snippet below repurposes the existing code to establish a connection to a Milvus cluster and quickly set up a collection.

<div class="language-python">

For preparations, use [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md) to connect to the Milvus server and [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) to create a collection in a quick-setup mode.

</div>

<div class="language-java">

For preparations, use [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md) to connect to the Milvus server and [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md) to create a collection in a quick-setup mode.

</div>

<div class="language-javascript">

For preparations, use [`MilvusClient`](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md) to connect to the Milvus server and [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) to create a collection in a quick-setup mode.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
from pymilvus import MilvusClient

# 1. Set up a Milvus client
client = MilvusClient(
    uri="http://localhost:19530"
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
    metric_type="IP"
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in quick setup mode
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
    .collectionName("quick_setup")
    .dimension(5)
    .metricType("IP")
    .build();

client.createCollection(quickSetupReq);
```

```javascript
const { MilvusClient, DataType, sleep } = require("@zilliz/milvus2-sdk-node")

const address = "http://localhost:19530"

// 1. Set up a Milvus Client
client = new MilvusClient({address});

// 2. Create a collection in quick setup mode
await client.createCollection({
    collection_name: "quick_setup",
    dimension: 5,
    metric_type: "IP"
});  
```

<div class="admonition note">

<p><b>notes</b></p>

<p>The collection generated in the above code contains only two fields: <code>id</code> (as the primary key) and <code>vector</code> (as the vector field), with <code>auto_id</code> and <code>enable_dynamic_field</code> settings enabled by default. When inserting data,</p>
<ul>
<li><p>You do not need to include <strong>id</strong> in the data to be inserted, because the primary field automatically increments as data is inserted.</p></li>
<li><p>Non-schema-defined fields will be saved as key-value pairs in a reserved JSON field named <strong>$meta</strong>.</p></li>
</ul>

</div>

## Insert entities

To insert entities, you need to organize the data into a list of dictionaries, where each dictionary represents an entity. Each dictionary contains the keys corresponding to both pre-defined and dynamic fields in the target collection.

<div class="language-python">

To insert entities into a collection, use the [`insert()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md) method.

</div>

<div class="language-java">

To insert entities into a collection, use the [`insert()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md) method.

</div>

<div class="language-javascript">


To insert entities into a collection, use the [`insert()`](https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md) method.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 3. Insert some data
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
#
# {
#     "insert_count": 10,
#     "ids": [
#         0,
#         1,
#         2,
#         3,
#         4,
#         5,
#         6,
#         7,
#         8,
#         9
#     ]
# }
```

```java
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

// 3. Insert some data
List<JSONObject> data = Arrays.asList(
    new JSONObject(Map.of("id", 0L, "vector", Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f), "color", "pink_8682")),
    new JSONObject(Map.of("id", 1L, "vector", Arrays.asList(0.19886812562848388f, 0.06023560599112088f, 0.6976963061752597f, 0.2614474506242501f, 0.838729485096104f), "color", "red_7025")),
    new JSONObject(Map.of("id", 2L, "vector", Arrays.asList(0.43742130801983836f, -0.5597502546264526f, 0.6457887650909682f, 0.7894058910881185f, 0.20785793220625592f), "color", "orange_6781")),
    new JSONObject(Map.of("id", 3L, "vector", Arrays.asList(0.3172005263489739f, 0.9719044792798428f, -0.36981146090600725f, -0.4860894583077995f, 0.95791889146345f), "color", "pink_9298")),
    new JSONObject(Map.of("id", 4L, "vector", Arrays.asList(0.4452349528804562f, -0.8757026943054742f, 0.8220779437047674f, 0.46406290649483184f, 0.30337481143159106f), "color", "red_4794")),
    new JSONObject(Map.of("id", 5L, "vector", Arrays.asList(0.985825131989184f, -0.8144651566660419f, 0.6299267002202009f, 0.1206906911183383f, -0.1446277761879955f), "color", "yellow_4222")),
    new JSONObject(Map.of("id", 6L, "vector", Arrays.asList(0.8371977790571115f, -0.015764369584852833f, -0.31062937026679327f, -0.562666951622192f, -0.8984947637863987f), "color", "red_9392")),
    new JSONObject(Map.of("id", 7L, "vector", Arrays.asList(-0.33445148015177995f, -0.2567135004164067f, 0.8987539745369246f, 0.9402995886420709f, 0.5378064918413052f), "color", "grey_8510")),
    new JSONObject(Map.of("id", 8L, "vector", Arrays.asList(0.39524717779832685f, 0.4000257286739164f, -0.5890507376891594f, -0.8650502298996872f, -0.6140360785406336f), "color", "white_9381")),
    new JSONObject(Map.of("id", 9L, "vector", Arrays.asList(0.5718280481994695f, 0.24070317428066512f, -0.3737913482606834f, -0.06726932177492717f, -0.6980531615588608f), "color", "purple_4976"))
);

InsertReq insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 10}
```

```javascript
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

### Insert into partitions

To insert data into a specific partition, you can specify the name of the partition in the insert request as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 4. Insert some more data into a specific partition
data=[
    {"id": 10, "vector": [-0.5570353903748935, -0.8997887893201304, -0.7123782431855732, -0.6298990746450119, 0.6699215060604258], "color": "red_1202"},
    {"id": 11, "vector": [0.6319019033373907, 0.6821488267878275, 0.8552303045704168, 0.36929791364943054, -0.14152860714878068], "color": "blue_4150"},
    {"id": 12, "vector": [0.9483947484855766, -0.32294203351925344, 0.9759290319978025, 0.8262982148666174, -0.8351194181285713], "color": "orange_4590"},
    {"id": 13, "vector": [-0.5449109892498731, 0.043511240563786524, -0.25105249484790804, -0.012030655265886425, -0.0010987671273892108], "color": "pink_9619"},
    {"id": 14, "vector": [0.6603339372951424, -0.10866551787442225, -0.9435597754324891, 0.8230244263466688, -0.7986720938400362], "color": "orange_4863"},
    {"id": 15, "vector": [-0.8825129181091456, -0.9204557711667729, -0.935350065513425, 0.5484069690287079, 0.24448151140671204], "color": "orange_7984"},
    {"id": 16, "vector": [0.6285586391568163, 0.5389064528263487, -0.3163366239905099, 0.22036279378888013, 0.15077052220816167], "color": "blue_9010"},
    {"id": 17, "vector": [-0.20151825016059233, -0.905239387635804, 0.6749305353372479, -0.7324272081377843, -0.33007998971889263], "color": "blue_4521"},
    {"id": 18, "vector": [0.2432286610792349, 0.01785636564206139, -0.651356982731391, -0.35848148851027895, -0.7387383128324057], "color": "orange_2529"},
    {"id": 19, "vector": [0.055512329053363674, 0.7100266349039421, 0.4956956543575197, 0.24541352586717702, 0.4209030729923515], "color": "red_9437"}
]

client.create_partition(
    collection_name="quick_setup",
    partition_name="partitionA"
)

res = client.insert(
    collection_name="quick_setup",
    data=data,
    partition_name="partitionA"
)

print(res)

# Output
#
# {
#     "insert_count": 10,
#     "ids": [
#         10,
#         11,
#         12,
#         13,
#         14,
#         15,
#         16,
#         17,
#         18,
#         19
#     ]
# }
```

```java
// 4. Insert some more data into a specific partition
data = Arrays.asList(
    new JSONObject(Map.of("id", 10L, "vector", Arrays.asList(-0.5570353903748935f, -0.8997887893201304f, -0.7123782431855732f, -0.6298990746450119f, 0.6699215060604258f), "color", "red_1202")),
    new JSONObject(Map.of("id", 11L, "vector", Arrays.asList(0.6319019033373907f, 0.6821488267878275f, 0.8552303045704168f, 0.36929791364943054f, -0.14152860714878068f), "color", "blue_4150")),
    new JSONObject(Map.of("id", 12L, "vector", Arrays.asList(0.9483947484855766f, -0.32294203351925344f, 0.9759290319978025f, 0.8262982148666174f, -0.8351194181285713f), "color", "orange_4590")),
    new JSONObject(Map.of("id", 13L, "vector", Arrays.asList(-0.5449109892498731f, 0.043511240563786524f, -0.25105249484790804f, -0.012030655265886425f, -0.0010987671273892108f), "color", "pink_9619")),
    new JSONObject(Map.of("id", 14L, "vector", Arrays.asList(0.6603339372951424f, -0.10866551787442225f, -0.9435597754324891f, 0.8230244263466688f, -0.7986720938400362f), "color", "orange_4863")),
    new JSONObject(Map.of("id", 15L, "vector", Arrays.asList(-0.8825129181091456f, -0.9204557711667729f, -0.935350065513425f, 0.5484069690287079f, 0.24448151140671204f), "color", "orange_7984")),
    new JSONObject(Map.of("id", 16L, "vector", Arrays.asList(0.6285586391568163f, 0.5389064528263487f, -0.3163366239905099f, 0.22036279378888013f, 0.15077052220816167f), "color", "blue_9010")),
    new JSONObject(Map.of("id", 17L, "vector", Arrays.asList(-0.20151825016059233f, -0.905239387635804f, 0.6749305353372479f, -0.7324272081377843f, -0.33007998971889263f), "color", "blue_4521")),
    new JSONObject(Map.of("id", 18L, "vector", Arrays.asList(0.2432286610792349f, 0.01785636564206139f, -0.651356982731391f, -0.35848148851027895f, -0.7387383128324057f), "color", "orange_2529")),
    new JSONObject(Map.of("id", 19L, "vector", Arrays.asList(0.055512329053363674f, 0.7100266349039421f, 0.4956956543575197f, 0.24541352586717702f, 0.4209030729923515f), "color", "red_9437"))
);

CreatePartitionReq createPartitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("partitionA")
    .build();

client.createPartition(createPartitionReq);

insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("partitionA")
    .build();

insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 10}
```

```javascript
// 4. Insert some more data into a specific partition
data = [
    {id: 10, vector: [-0.5570353903748935, -0.8997887893201304, -0.7123782431855732, -0.6298990746450119, 0.6699215060604258], color: "red_1202"},
    {id: 11, vector: [0.6319019033373907, 0.6821488267878275, 0.8552303045704168, 0.36929791364943054, -0.14152860714878068], color: "blue_4150"},
    {id: 12, vector: [0.9483947484855766, -0.32294203351925344, 0.9759290319978025, 0.8262982148666174, -0.8351194181285713], color: "orange_4590"},
    {id: 13, vector: [-0.5449109892498731, 0.043511240563786524, -0.25105249484790804, -0.012030655265886425, -0.0010987671273892108], color: "pink_9619"},
    {id: 14, vector: [0.6603339372951424, -0.10866551787442225, -0.9435597754324891, 0.8230244263466688, -0.7986720938400362], color: "orange_4863"},
    {id: 15, vector: [-0.8825129181091456, -0.9204557711667729, -0.935350065513425, 0.5484069690287079, 0.24448151140671204], color: "orange_7984"},
    {id: 16, vector: [0.6285586391568163, 0.5389064528263487, -0.3163366239905099, 0.22036279378888013, 0.15077052220816167], color: "blue_9010"},
    {id: 17, vector: [-0.20151825016059233, -0.905239387635804, 0.6749305353372479, -0.7324272081377843, -0.33007998971889263], color: "blue_4521"},
    {id: 18, vector: [0.2432286610792349, 0.01785636564206139, -0.651356982731391, -0.35848148851027895, -0.7387383128324057], color: "orange_2529"},
    {id: 19, vector: [0.055512329053363674, 0.7100266349039421, 0.4956956543575197, 0.24541352586717702, 0.4209030729923515], color: "red_9437"}
]

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "partitionA"
})

res = await client.insert({
    collection_name: "quick_setup",
    data: data,
    partition_name: "partitionA"
})

console.log(res.insert_cnt)

// Output
// 
// 10
// 
```

The output is a dictionary containing the statistics on the affected entities. For details on partition operations, refer to [Manage Partitions](manage-partitions.md).

## Upsert entities

Upserting data is a combination of update and insert operations. In Milvus, an upsert operation performs a data-level action to either insert or update an entity based on whether its primary key already exists in a collection. Specifically:

- If the primary key of the entity already exists in the collection, the existing entity will be overwritten.

- If the primary key does not exist in the collection, a new entity will be inserted.

<div class="alert note">

- Upsert operations will not update the primary keys.
- Upsert operations does not support collections with <code>autoID</code> enabled.
- If you plan to use the <code>upsert</code> operation instead of <code>insert</code> for large-scale data ingestion (e.g. millions of vectors), be aware that this can lead to high memory consumption on Milvus data nodes.

</div>

<div class="language-python">

To upsert entities, use the [`upsert()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/upsert.md) method.

</div>

<div class="language-java">

To upsert entities, use the [`upsert()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md) method.

</div>

<div class="language-javascript">

To upsert entities, use the [`upsert()`](https://milvus.io/api-reference/node/v2.4.x/Vector/upsert.md) method.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 5. Upsert some data
data=[
    {"id": 0, "vector": [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], "color": "black_9898"},
    {"id": 1, "vector": [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], "color": "red_7319"},
    {"id": 2, "vector": [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], "color": "white_6465"},
    {"id": 3, "vector": [0.14594326235891586, -0.3775407299900644, -0.3765479013078812, 0.20612075380355122, 0.4902678929632145], "color": "orange_7580"},
    {"id": 4, "vector": [0.4548498669607359, -0.887610217681605, 0.5655081329910452, 0.19220509387904117, 0.016513983433433577], "color": "red_3314"},
    {"id": 5, "vector": [0.11755001847051827, -0.7295149788999611, 0.2608115847524266, -0.1719167007897875, 0.7417611743754855], "color": "black_9955"},
    {"id": 6, "vector": [0.9363032158314308, 0.030699901477745373, 0.8365910312319647, 0.7823840208444011, 0.2625222076909237], "color": "yellow_2461"},
    {"id": 7, "vector": [0.0754823906014721, -0.6390658668265143, 0.5610517334334937, -0.8986261118798251, 0.9372056764266794], "color": "white_5015"},
    {"id": 8, "vector": [-0.3038434006935904, 0.1279149203380523, 0.503958664270957, -0.2622661156746988, 0.7407627307791929], "color": "purple_6414"},
    {"id": 9, "vector": [-0.7125086947677588, -0.8050968321012257, -0.32608864121785786, 0.3255654958645424, 0.26227968923834233], "color": "brown_7231"}
]

res = client.upsert(
    collection_name='quick_setup',
    data=data
)

print(res)

# Output
#
# {
#     "upsert_count": 10
# }
```

```java
// 5. Upsert some data
data = Arrays.asList(
    new JSONObject(Map.of("id", 0L, "vector", Arrays.asList(-0.619954382375778f, 0.4479436794798608f, -0.17493894838751745f, -0.4248030059917294f, -0.8648452746018911f), "color", "black_9898")),
    new JSONObject(Map.of("id", 1L, "vector", Arrays.asList(0.4762662251462588f, -0.6942502138717026f, -0.4490002642657902f, -0.628696575798281f, 0.9660395877041965f), "color", "red_7319")),
    new JSONObject(Map.of("id", 2L, "vector", Arrays.asList(-0.8864122635045097f, 0.9260170474445351f, 0.801326976181461f, 0.6383943392381306f, 0.7563037341572827f), "color", "white_6465")),
    new JSONObject(Map.of("id", 3L, "vector", Arrays.asList(0.14594326235891586f, -0.3775407299900644f, -0.3765479013078812f, 0.20612075380355122f, 0.4902678929632145f), "color", "orange_7580")),
    new JSONObject(Map.of("id", 4L, "vector", Arrays.asList(0.4548498669607359f, -0.887610217681605f, 0.5655081329910452f, 0.19220509387904117f, 0.016513983433433577f), "color", "red_3314")),
    new JSONObject(Map.of("id", 5L, "vector", Arrays.asList(0.11755001847051827f, -0.7295149788999611f, 0.2608115847524266f, -0.1719167007897875f, 0.7417611743754855f), "color", "black_9955")),
    new JSONObject(Map.of("id", 6L, "vector", Arrays.asList(0.9363032158314308f, 0.030699901477745373f, 0.8365910312319647f, 0.7823840208444011f, 0.2625222076909237f), "color", "yellow_2461")),
    new JSONObject(Map.of("id", 7L, "vector", Arrays.asList(0.0754823906014721f, -0.6390658668265143f, 0.5610517334334937f, -0.8986261118798251f, 0.9372056764266794f), "color", "white_5015")),
    new JSONObject(Map.of("id", 8L, "vector", Arrays.asList(-0.3038434006935904f, 0.1279149203380523f, 0.503958664270957f, -0.2622661156746988f, 0.7407627307791929f), "color", "purple_6414")),
    new JSONObject(Map.of("id", 9L, "vector", Arrays.asList(-0.7125086947677588f, -0.8050968321012257f, -0.32608864121785786f, 0.3255654958645424f, 0.26227968923834233f), "color", "brown_7231"))
);

UpsertReq upsertReq = UpsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .build();

UpsertResp upsertResp = client.upsert(upsertReq);

System.out.println(JSONObject.toJSON(upsertResp));

// Output:
// {"upsertCnt": 10}
```

```javascript
// 5. Upsert some data
data = [
    {id: 0, vector: [-0.619954382375778, 0.4479436794798608, -0.17493894838751745, -0.4248030059917294, -0.8648452746018911], color: "black_9898"},
    {id: 1, vector: [0.4762662251462588, -0.6942502138717026, -0.4490002642657902, -0.628696575798281, 0.9660395877041965], color: "red_7319"},
    {id: 2, vector: [-0.8864122635045097, 0.9260170474445351, 0.801326976181461, 0.6383943392381306, 0.7563037341572827], color: "white_6465"},
    {id: 3, vector: [0.14594326235891586, -0.3775407299900644, -0.3765479013078812, 0.20612075380355122, 0.4902678929632145], color: "orange_7580"},
    {id: 4, vector: [0.4548498669607359, -0.887610217681605, 0.5655081329910452, 0.19220509387904117, 0.016513983433433577], color: "red_3314"},
    {id: 5, vector: [0.11755001847051827, -0.7295149788999611, 0.2608115847524266, -0.1719167007897875, 0.7417611743754855], color: "black_9955"},
    {id: 6, vector: [0.9363032158314308, 0.030699901477745373, 0.8365910312319647, 0.7823840208444011, 0.2625222076909237], color: "yellow_2461"},
    {id: 7, vector: [0.0754823906014721, -0.6390658668265143, 0.5610517334334937, -0.8986261118798251, 0.9372056764266794], color: "white_5015"},
    {id: 8, vector: [-0.3038434006935904, 0.1279149203380523, 0.503958664270957, -0.2622661156746988, 0.7407627307791929], color: "purple_6414"},
    {id: 9, vector: [-0.7125086947677588, -0.8050968321012257, -0.32608864121785786, 0.3255654958645424, 0.26227968923834233], color: "brown_7231"}
]

res = await client.upsert({
    collection_name: "quick_setup",
    data: data,
})

console.log(res.upsert_cnt)

// Output
// 
// 10
// 
```

### Upsert data in partitions

To upsert data into a specific partition, you can specify the name of the partition in the insert request as follows:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 6. Upsert data in partitions
data=[
    {"id": 10, "vector": [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], "color": "black_3651"},
    {"id": 11, "vector": [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], "color": "grey_2049"},
    {"id": 12, "vector": [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], "color": "blue_6168"},
    {"id": 13, "vector": [0.3202914977909075, -0.7279137773695252, -0.04747830871620273, 0.8266053056909548, 0.8277957187455489], "color": "blue_1672"},
    {"id": 14, "vector": [0.2975811497890859, 0.2946936202691086, 0.5399463833894609, 0.8385334966677529, -0.4450543984655133], "color": "pink_1601"},
    {"id": 15, "vector": [-0.04697464305600074, -0.08509022265734134, 0.9067184632552001, -0.2281912685064822, -0.9747503428652762], "color": "yellow_9925"},
    {"id": 16, "vector": [-0.9363075919673911, -0.8153981031085669, 0.7943039120490902, -0.2093886809842529, 0.0771191335807897], "color": "orange_9872"},
    {"id": 17, "vector": [-0.050451522820639916, 0.18931572752321935, 0.7522886192190488, -0.9071793089474034, 0.6032647330692296], "color": "red_6450"},
    {"id": 18, "vector": [-0.9181544231141592, 0.6700755998126806, -0.014174674636136642, 0.6325780463623432, -0.49662222164032976], "color": "purple_7392"},
    {"id": 19, "vector": [0.11426945899602536, 0.6089190684002581, -0.5842735738352236, 0.057050610092692855, -0.035163433018196244], "color": "pink_4996"}
]

res = client.upsert(
    collection_name="quick_setup",
    data=data,
    partition_name="partitionA"
)

print(res)

# Output
#
# {
#     "upsert_count": 10
# }
```

```java
import io.milvus.v2.service.vector.request.UpsertReq;
import io.milvus.v2.service.vector.response.UpsertResp;

// 6. Upsert data in parition

data = Arrays.asList(
    new JSONObject(Map.of("id", 10L, "vector", Arrays.asList(0.06998888224297328f, 0.8582816610326578f, -0.9657938677934292f, 0.6527905683627726f, -0.8668460657158576f), "color", "black_3651")),
    new JSONObject(Map.of("id", 11L, "vector", Arrays.asList(0.6060703043917468f, -0.3765080534566074f, -0.7710758854987239f, 0.36993888322346136f, 0.5507513364206531f), "color", "grey_2049")),
    new JSONObject(Map.of("id", 12L, "vector", Arrays.asList(-0.9041813104515337f, -0.9610546012461163f, 0.20033003106083358f, 0.11842506351635174f, 0.8327356724591011f), "color", "blue_6168")),
    new JSONObject(Map.of("id", 13L, "vector", Arrays.asList(0.3202914977909075f, -0.7279137773695252f, -0.04747830871620273f, 0.8266053056909548f, 0.8277957187455489f), "color", "blue_1672")),
    new JSONObject(Map.of("id", 14L, "vector", Arrays.asList(0.2975811497890859f, 0.2946936202691086f, 0.5399463833894609f, 0.8385334966677529f, -0.4450543984655133f), "color", "pink_1601")),
    new JSONObject(Map.of("id", 15L, "vector", Arrays.asList(-0.04697464305600074f, -0.08509022265734134f, 0.9067184632552001f, -0.2281912685064822f, -0.9747503428652762f), "color", "yellow_9925")),
    new JSONObject(Map.of("id", 16L, "vector", Arrays.asList(-0.9363075919673911f, -0.8153981031085669f, 0.7943039120490902f, -0.2093886809842529f, 0.0771191335807897f), "color", "orange_9872")),
    new JSONObject(Map.of("id", 17L, "vector", Arrays.asList(-0.050451522820639916f, 0.18931572752321935f, 0.7522886192190488f, -0.9071793089474034f, 0.6032647330692296f), "color", "red_6450")),
    new JSONObject(Map.of("id", 18L, "vector", Arrays.asList(-0.9181544231141592f, 0.6700755998126806f, -0.014174674636136642f, 0.6325780463623432f, -0.49662222164032976f), "color", "purple_7392")),
    new JSONObject(Map.of("id", 19L, "vector", Arrays.asList(0.11426945899602536f, 0.6089190684002581f, -0.5842735738352236f, 0.057050610092692855f, -0.035163433018196244f), "color", "pink_4996"))
);

upsertReq = UpsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("partitionA")
    .build();

upsertResp = client.upsert(upsertReq);

System.out.println(JSONObject.toJSON(upsertResp));

// Output:
// {"upsertCnt": 10}
```

```javascript
// 6. Upsert data in partitions
data = [
    {id: 10, vector: [0.06998888224297328, 0.8582816610326578, -0.9657938677934292, 0.6527905683627726, -0.8668460657158576], color: "black_3651"},
    {id: 11, vector: [0.6060703043917468, -0.3765080534566074, -0.7710758854987239, 0.36993888322346136, 0.5507513364206531], color: "grey_2049"},
    {id: 12, vector: [-0.9041813104515337, -0.9610546012461163, 0.20033003106083358, 0.11842506351635174, 0.8327356724591011], color: "blue_6168"},
    {id: 13, vector: [0.3202914977909075, -0.7279137773695252, -0.04747830871620273, 0.8266053056909548, 0.8277957187455489], color: "blue_1672"},
    {id: 14, vector: [0.2975811497890859, 0.2946936202691086, 0.5399463833894609, 0.8385334966677529, -0.4450543984655133], color: "pink_1601"},
    {id: 15, vector: [-0.04697464305600074, -0.08509022265734134, 0.9067184632552001, -0.2281912685064822, -0.9747503428652762], color: "yellow_9925"},
    {id: 16, vector: [-0.9363075919673911, -0.8153981031085669, 0.7943039120490902, -0.2093886809842529, 0.0771191335807897], color: "orange_9872"},
    {id: 17, vector: [-0.050451522820639916, 0.18931572752321935, 0.7522886192190488, -0.9071793089474034, 0.6032647330692296], color: "red_6450"},
    {id: 18, vector: [-0.9181544231141592, 0.6700755998126806, -0.014174674636136642, 0.6325780463623432, -0.49662222164032976], color: "purple_7392"},
    {id: 19, vector: [0.11426945899602536, 0.6089190684002581, -0.5842735738352236, 0.057050610092692855, -0.035163433018196244], color: "pink_4996"}
]

res = await client.upsert({
    collection_name: "quick_setup",
    data: data,
    partition_name: "partitionA"
})

console.log(res.upsert_cnt)

// Output
// 
// 10
// 
```

The output is a dictionary containing the statistics on the affected entities. For details on partition operations, refer to [Manage Partitions](manage-partitions.md).

## Delete entities

<div class="language-python">

If an entity is no longer needed, you can delete it from the collection by using [`delete()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/delete.md).

</div>

<div class="language-java">

If an entity is no longer needed, you can delete it from the collection by using [`delete()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/delete.md).

</div>

<div class="language-javascript">

If an entity is no longer needed, you can delete it from the collection by using [`delete()`](https://milvus.io/api-reference/node/v2.4.x/Vector/delete.md).

</div>

Milvus offers two ways for you to identify the entities to delete.

- __Delete entities by filter.__

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    # 7. Delete entities
    res = client.delete(
        collection_name="quick_setup",
        filter="id in [4,5,6]"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "delete_count": 3
    # }
    ```

    ```java
    import io.milvus.v2.service.vector.request.DeleteReq;
    import io.milvus.v2.service.vector.response.DeleteResp;


    // 7. Delete entities

    DeleteReq deleteReq = DeleteReq.builder()
        .collectionName("quick_setup")
        .filter("id in [4, 5, 6]")
        .build();

    DeleteResp deleteResp = client.delete(deleteReq);

    System.out.println(JSONObject.toJSON(deleteResp));

    // Output:
    // {"deleteCnt": 3}
    ```

    ```javascript
    // 7. Delete entities
    res = await client.delete({
        collection_name: "quick_setup",
        filter: "id in [4,5,6]"
    })

    console.log(res.delete_cnt)

    // Output
    // 
    // 3
    // 
    ```

- __Delete entities by IDs.__

    The following snippets demonstrate how to delete entities by IDs from a specific partition. It also works if you leave the partition name unspecified.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.delete(
        collection_name="quick_setup",
        ids=[18, 19],
        partition_name="partitionA"
    )
    
    print(res)
    
    # Output
    #
    # {
    #     "delete_count": 2
    # }
    ```

    ```java
    deleteReq = DeleteReq.builder()
        .collectionName("quick_setup")
        .ids(Arrays.asList(18L, 19L))
        .partitionName("partitionA")
        .build();

    deleteResp = client.delete(deleteReq);

    System.out.println(JSONObject.toJSON(deleteResp));

    // Output:
    // {"deleteCnt": 2}
    ```

    ```javascript
    res = await client.delete({
        collection_name: "quick_setup",
        ids: [18, 19],
        partition_name: "partitionA"
    })

    console.log(res.delete_cnt)

    // Output
    // 
    // 2
    // 
    ```

For details on how to use filter expressions, refer to [Get & Scalar Query](get-and-scalar-query.md).
