---
id: enable-dynamic-field.md
title: Enable Dynamic Field
summary: All fields defined in the schema of a collection must be included in the entities to be inserted. If you want some fields to be optional, consider enabling the dynamic field. This topic describes how to enable and use the dynamic field.​
---

# Dynamic Field​

All fields defined in the schema of a collection must be included in the entities to be inserted. If you want some fields to be optional, consider enabling the dynamic field. This topic describes how to enable and use the dynamic field.​

## Overview​

In Milvus, you can create a collection schema by setting the names and data types for each field in the collection. When you add a field to the schema, make sure that this field is included in the entity you intend to insert. If you want some fields to be optional, enabling the dynamic field is one option.​

The dynamic field is a reserved field named `$meta`, which is of the JavaScript Object Notation (JSON) type. Any fields in the entities that are not defined in the schema will be stored in this reserved JSON field as key-value pairs.​

For a collection with the dynamic field enabled, you can use keys in the dynamic field for scalar filtering, just as you would with fields explicitly defined in the schema.​

## Enable dynamic field​

Collections created using the method described in [​Create Collection Instantly](create-collection-instantly.md) have the dynamic field enabled by default. You can also enable the dynamic field manually when creating a collection with custom settings.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
from pymilvus import MilvusClient​
​
client= MilvusClient(uri="http://localhost:19530")​
​
client.create_collection(​
    collection_name="my_dynamic_collection",​
    dimension=5,​
    # highlight-next-line​
    enable_dynamic_field=True​
)​

```

```java
import io.milvus.v2.client.ConnectConfig;​
import io.milvus.v2.client.MilvusClientV2;​
import io.milvus.v2.service.collection.request.CreateCollectionReq;​
​
MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()​
        .uri("http://localhost:19530")​
        .build());​
        ​
CreateCollectionReq createCollectionReq = CreateCollectionReq.builder()​
    .collectionName("my_dynamic_collection")​
    .dimension(5)​
    // highlight-next-line​
    .enableDynamicField(true)​
    .build()​
client.createCollection(createCollectionReq);​

```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";​
​
const client = new Client({​
    address: 'http://localhost:19530'​
});​
​
await client.createCollection({​
    collection_name: "customized_setup_2",​
    schema: schema,​
    // highlight-next-line​
    enable_dynamic_field: true​
});​

```

```curl
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_dynamic_collection",​
    "dimension": 5,​
    "enableDynamicField": true​
}'​

```

## Use dynamic field​

When the dynamic field is enabled in your collection, all fields and their values that are not defined in the schema will be stored as key-value pairs in the dynamic field.​

For example, suppose your collection schema defines only two fields, named `id` and `vector`, with the dynamic field enabled. Now, insert the following dataset into this collection.​

```JSON
[​
    {id: 0, vector: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], color: "pink_8682"},​
    {id: 1, vector: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], color: "red_7025"},​
    {id: 2, vector: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], color: "orange_6781"},​
    {id: 3, vector: [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], color: "pink_9298"},​
    {id: 4, vector: [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], color: "red_4794"},​
    {id: 5, vector: [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], color: "yellow_4222"},​
    {id: 6, vector: [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], color: "red_9392"},​
    {id: 7, vector: [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], color: "grey_8510"},​
    {id: 8, vector: [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], color: "white_9381"},​
    {id: 9, vector: [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], color: "purple_4976"}        ​
]​

```

The dataset above contains 10 entities, each including the fields `id`, `vector`, and `color`. Here, the `color` field is not defined in the schema. Since the collection has the dynamic field enabled, the field `color` will be stored as a key-value pair within the dynamic field.​

### Insert data​

The following code demonstrates how to insert this dataset into the collection.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
data=[​
    {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},​
    {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},​
    {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},​
    {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},​
    {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},​
    {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},​
    {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},​
    {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},​
    {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},​
    {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}​
]​
​
res = client.insert(​
    collection_name="my_dynamic_collection",​
    data=data​
)​
​
print(res)​
​
# Output​
# {'insert_count': 10, 'ids': [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}​

```

```java
import com.google.gson.Gson;​
import com.google.gson.JsonObject;​
​
import io.milvus.v2.service.vector.request.InsertReq;​
import io.milvus.v2.service.vector.response.InsertResp;​
   ​
Gson gson = new Gson();​
List<JsonObject> data = Arrays.asList(​
        gson.fromJson("{\"id\": 0, \"vector\": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], \"color\": \"pink_8682\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 1, \"vector\": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], \"color\": \"red_7025\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 2, \"vector\": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], \"color\": \"orange_6781\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 3, \"vector\": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], \"color\": \"pink_9298\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 4, \"vector\": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], \"color\": \"red_4794\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 5, \"vector\": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], \"color\": \"yellow_4222\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 6, \"vector\": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], \"color\": \"red_9392\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 7, \"vector\": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], \"color\": \"grey_8510\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 8, \"vector\": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], \"color\": \"white_9381\"}", JsonObject.class),​
        gson.fromJson("{\"id\": 9, \"vector\": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], \"color\": \"purple_4976\"}", JsonObject.class)​
);​
​
InsertReq insertReq = InsertReq.builder()​
        .collectionName("my_dynamic_collection")​
        .data(data)​
        .build();​
​
InsertResp insertResp = client.insert(insertReq);​
System.out.println(insertResp);​
​
// Output:​
//​
// InsertResp(InsertCnt=10, primaryKeys=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9])​

```

```javascript
const { DataType } = require("@zilliz/milvus2-sdk-node")​
​
// 3. Insert some data​
​
var data = [​
    {id: 0, vector: [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], color: "pink_8682"},​
    {id: 1, vector: [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], color: "red_7025"},​
    {id: 2, vector: [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], color: "orange_6781"},​
    {id: 3, vector: [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], color: "pink_9298"},​
    {id: 4, vector: [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], color: "red_4794"},​
    {id: 5, vector: [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], color: "yellow_4222"},​
    {id: 6, vector: [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], color: "red_9392"},​
    {id: 7, vector: [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], color: "grey_8510"},​
    {id: 8, vector: [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], color: "white_9381"},​
    {id: 9, vector: [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], color: "purple_4976"}        ​
]​
​
var res = await client.insert({​
    collection_name: "quick_setup",​
    data: data,​
})​
​
console.log(res.insert_cnt)​
​
// Output​
// ​
// 10​
// ​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "data": [​
        {"id": 0, "vector": [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592], "color": "pink_8682"},​
        {"id": 1, "vector": [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104], "color": "red_7025"},​
        {"id": 2, "vector": [0.43742130801983836, -0.5597502546264526, 0.6457887650909682, 0.7894058910881185, 0.20785793220625592], "color": "orange_6781"},​
        {"id": 3, "vector": [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345], "color": "pink_9298"},​
        {"id": 4, "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], "color": "red_4794"},​
        {"id": 5, "vector": [0.985825131989184, -0.8144651566660419, 0.6299267002202009, 0.1206906911183383, -0.1446277761879955], "color": "yellow_4222"},​
        {"id": 6, "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], "color": "red_9392"},​
        {"id": 7, "vector": [-0.33445148015177995, -0.2567135004164067, 0.8987539745369246, 0.9402995886420709, 0.5378064918413052], "color": "grey_8510"},​
        {"id": 8, "vector": [0.39524717779832685, 0.4000257286739164, -0.5890507376891594, -0.8650502298996872, -0.6140360785406336], "color": "white_9381"},​
        {"id": 9, "vector": [0.5718280481994695, 0.24070317428066512, -0.3737913482606834, -0.06726932177492717, -0.6980531615588608], "color": "purple_4976"}        ​
    ],​
    "collectionName": "my_dynamic_collection"​
}'​
​
# {​
#     "code": 0,​
#     "data": {​
#         "insertCount": 10,​
#         "insertIds": [​
#             0,​
#             1,​
#             2,​
#             3,​
#             4,​
#             5,​
#             6,​
#             7,​
#             8,​
#             9​
#         ]​
#     }​
# }​

```

### Query and search with dynamic field​

Milvus supports the use of filter expressions during queries and searches, allowing you to specify which fields to include in the results. The following example demonstrates how to perform queries and searches using the `color` field, which is not defined in the schema, by using the dynamic field.​

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#javascript">Node.js</a>
  <a href="#go">Go</a>
  <a href="#curl">cURL</a>
</div>

```python
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
​
res = client.search(​
    collection_name="my_dynamic_collection",​
    data=[query_vector],​
    limit=5,​
    # highlight-start​
    filter='color like "red%"',​
    output_fields=["color"]​
    # highlight-end​
)​
​
print(res)​
​
# Output​
# data: ["[{'id': 1, 'distance': 0.6290165185928345, 'entity': {'color': 'red_7025'}}, {'id': 4, 'distance': 0.5975797176361084, 'entity': {'color': 'red_4794'}}, {'id': 6, 'distance': -0.24996188282966614, 'entity': {'color': 'red_9392'}}]"] ​
​

```

```java
import io.milvus.v2.service.vector.request.SearchReq​
import io.milvus.v2.service.vector.request.data.FloatVec;​
import io.milvus.v2.service.vector.response.SearchResp​
​
FloatVec queryVector = new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f});​
SearchResp resp = client.search(SearchReq.builder()​
        .collectionName("my_dynamic_collection")​
        .annsField("vector")​
        .data(Collections.singletonList(queryVector))​
        .outputFields(Collections.singletonList("color"))​
        .filter("color like \"red%\"")​
        .topK(5)​
        .consistencyLevel(ConsistencyLevel.STRONG)​
        .build());​
​
System.out.println(resp.getSearchResults());​
​
// Output​
//​
// [[SearchResp.SearchResult(entity={color=red_7025}, score=0.6290165, id=1), SearchResp.SearchResult(entity={color=red_4794}, score=0.5975797, id=4), SearchResp.SearchResult(entity={color=red_9392}, score=-0.24996188, id=6)]]​
​

```

```javascript
const query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
​
res = await client.search({​
    collection_name: "quick_setup",​
    data: [query_vector],​
    limit: 5,​
    // highlight-start​
    filters: "color like \"red%\"",​
    output_fields: ["color"]​
    // highlight-end​
})​

```

```curl
export CLUSTER_ENDPOINT="http://localhost:19530"​
export TOKEN="root:Milvus"​
​
curl --request POST \​
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \​
--header "Authorization: Bearer ${TOKEN}" \​
--header "Content-Type: application/json" \​
-d '{​
    "collectionName": "my_dynamic_collection",​
    "data": [​
        [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]​
    ],​
    "annsField": "vector",​
    "filter": "color like \"red%\"",​
    "limit": 3,​
    "outputFields": ["color"]​
}'​
# {"code":0,"cost":0,"data":[{"color":"red_7025","distance":0.6290165,"id":1},{"color":"red_4794","distance":0.5975797,"id":4},{"color":"red_9392","distance":-0.24996185,"id":6}]}​

```

In the filter expression used in the code example above, `color like "red%" and likes > 50`, the conditions specify that the value of the `color` field must start with **"red"**. In the sample data, only two entities meet this condition. Thus, when `limit` (topK) is set to `3` or fewer, both of these entities will be returned.​

```JSON
[​
    {​
        "id": 4, ​
        "distance": 0.3345786594834839,​
        "entity": {​
            "vector": [0.4452349528804562, -0.8757026943054742, 0.8220779437047674, 0.46406290649483184, 0.30337481143159106], ​
            "color": "red_4794", ​
            "likes": 122​
        }​
    },​
    {​
        "id": 6, ​
        "distance": 0.6638239834383389，​
        "entity": {​
            "vector": [0.8371977790571115, -0.015764369584852833, -0.31062937026679327, -0.562666951622192, -0.8984947637863987], ​
            "color": "red_9392", ​
            "likes": 58​
        }​
    },​
]​

```

​

