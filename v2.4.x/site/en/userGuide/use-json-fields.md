---
id: use-json-fields.md
title: Use JSON Fields
---

# Use JSON Fields

This guide explains how to use the JSON fields, such as inserting JSON values as well as searching and querying in JSON fields with basic and advanced operators.

## Overview

JSON stands for Javascript Object Notation, which is a lightweight and simple text-based data format. Data in JSON is structured in key-value pairs, where every key is a string that maps to a value of a number, string, boolean, list, or array. With Milvus clusters, it's possible to store dictionaries as a field value in collections. 

For example, the following code randomly generates key-value pairs, each containing a JSON field with the key __color__.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    current_tag = random.randint(1000, 9999)
    current_coord = [ random.randint(0, 40) for _ in range(3) ]
    current_ref = [ [ random.choice(colors) for _ in range(3) ] for _ in range(3) ]
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": {
            "label": current_color,
            "tag": current_tag,
            "coord": current_coord,
            "ref": current_ref
        }
    })

print(data[0])
```

```java
import java.util.*;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

// 3. Insert randomly generated vectors and JSON data into the collection
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JsonObject> data = new ArrayList<>();

Gson gson = new Gson();
Random rand = new Random();
for (int i=0; i<1000; i++) {
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    Integer current_tag = rand.nextInt(8999) + 1000;
    List<Integer> current_coord = Arrays.asList(rand.nextInt(40), rand.nextInt(40), rand.nextInt(40));
    List<List<String>> current_ref = Arrays.asList(
            Arrays.asList(colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1))),
            Arrays.asList(colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1))),
            Arrays.asList(colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)), colors.get(rand.nextInt(colors.size()-1)))
    );
    JsonObject row = new JsonObject();
    row.addProperty("id", (long) i);
    row.add("vector", gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    JsonObject color = new JsonObject();
    color.addProperty("label", current_color);
    color.addProperty("tag", current_tag);
    color.add("coord", gson.toJsonTree(current_coord));
    color.add("ref", gson.toJsonTree(current_ref));
    row.add("color", color);
    data.add(row);
}

System.out.println(data.get(0));
```

```javascript
// 3. Insert randomly generated vectors 
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
var data = []

for (let i = 0; i < 1000; i++) {
    const current_color = colors[Math.floor(Math.random() * colors.length)]
    const current_tag = Math.floor(Math.random() * 8999 + 1000)
    const current_coord = Array(3).fill(0).map(() => Math.floor(Math.random() * 40))
    const current_ref = [ Array(3).fill(0).map(() => colors[Math.floor(Math.random() * colors.length)]) ]

    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: {
            label: current_color,
            tag: current_tag,
            coord: current_coord,
            ref: current_ref
        }
    })
}

console.log(data[0])
```

You can view the structure of the generated data by checking its first entry.

```
{
    "id": 0,
    "vector": [
        -0.8017921296923975,
        0.550046715206634,
        0.764922589768134,
        0.6371433836123146,
        0.2705233937454232
    ],
    "color": {
        "label": "blue",
        "tag": 9927,
        "coord": [
            22,
            36,
            6
        ],
        "ref": [
            [
                "blue",
                "green",
                "white"
            ],
            [
                "black",
                "green",
                "pink"
            ],
            [
                "grey",
                "black",
                "brown"
            ]
        ]
    }
}
```

<div class="admonition note">

<p><b>notes</b></p>

<ul>
<li><p>Ensure that all values in a list or array are of the same data type.</p></li>
<li><p>Any nested dictionaries in a JSON field value will be considered strings.</p></li>
<li><p>Use only alphanumeric characters and underscores to name JSON keys, as other characters may cause problems with filtering or searching.</p></li>
<li>Currently, indexing JSON fields is not available, which can make filtering time-consuming. However, this limitation will be addressed in upcoming releases.</li>
</ul>

</div>

## Define JSON field

To define a JSON field, simply follow the same procedure as defining fields of other types.

<div class="language-python">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md), [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md), [`add_field()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md), [`add_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md), [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md), and [`get_load_state()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md), [`createSchema()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md), [`addField()`](https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md), [`IndexParam`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md), [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md), and [`getLoadState()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md) and [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) and [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) in the SDK reference.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
import random, time
from pymilvus import connections, MilvusClient, DataType

CLUSTER_ENDPOINT = "http://localhost:19530"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT
)

# 2. Create a collection
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=False,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
schema.add_field(field_name="color", datatype=DataType.JSON)

index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="id",
    index_type="STL_SORT"
)

index_params.add_index(
    field_name="vector",
    index_type="IVF_FLAT",
    metric_type="L2",
    params={"nlist": 1024}
)

client.create_collection(
    collection_name="test_collection",
    schema=schema,
    index_params=index_params
)

res = client.get_load_state(
    collection_name="test_collection"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.*;
import io.milvus.v2.service.vector.request.*;
import io.milvus.v2.service.vector.request.data.*;
import io.milvus.v2.service.vector.response.*;

String CLUSTER_ENDPOINT = "http://localhost:19530";

// 1. Connect to Milvus server
ConnectConfig connectConfig = ConnectConfig.builder()
    .uri(CLUSTER_ENDPOINT)
    .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 2. Create a collection in customized setup mode

// 2.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();

// 2.2 Add fields to schema
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(false)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("color")
        .dataType(DataType.JSON)
        .build());

// 2.3 Prepare index parameters
IndexParam indexParamForIdField = IndexParam.builder()
        .fieldName("id")
        .indexType(IndexParam.IndexType.STL_SORT)
        .build();

Map<String, Object> params = new HashMap<>();
params.put("nlist", 1024);
IndexParam indexParamForVectorField = IndexParam.builder()
        .fieldName("vector")
        .indexType(IndexParam.IndexType.IVF_FLAT)
        .metricType(IndexParam.MetricType.IP)
        .extraParams(params)
        .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);

// 2.4 Create a collection with schema and index parameters
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
        .collectionName("test_collection")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();

client.createCollection(customizedSetupReq);

// 2.5 Check if the collection is loaded
GetLoadStateReq getLoadStateReq = GetLoadStateReq.builder()
        .collectionName("test_collection")
        .build();

Boolean isLoaded = client.getLoadState(getLoadStateReq);

System.out.println(isLoaded);

// Output:
// true
```

```javascript
const { MilvusClient, DataType, sleep } = require("@zilliz/milvus2-sdk-node")

const address = "http://localhost:19530"

async function main() {
// 1. Set up a Milvus Client
client = new MilvusClient({address}); 

// 2. Create a collection
// 2.1 Define fields
const fields = [
    {
        name: "id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
    {
        name: "color",
        data_type: DataType.JSON,
    }
]

// 2.2 Prepare index parameters
const index_params = [{
    field_name: "vector",
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: { nlist: 1024}
}]

// 2.3 Create a collection with fields and index parameters
res = await client.createCollection({
    collection_name: "test_collection",
    fields: fields, 
    index_params: index_params
})

console.log(res.error_code)

// Output
// 
// Success
// 

res = await client.getLoadState({
    collection_name: "test_collection",
})  

console.log(res.state)

// Output
// 
// LoadStateLoaded
// 
```

<div class="language-python">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md), [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md), [`add_field()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md), [`add_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md), [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md), and [`get_load_state()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md), [`createSchema()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md), [`addField()`](https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md), [`IndexParam`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md), [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md), and [`getLoadState()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md), [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md), and [`getLoadState()`](https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md) in the SDK reference.

</div>

## Insert field values

After creating a collection from the `CollectionSchema` object, dictionaries such as the one above can be inserted into it.

<div class="language-python">

Use the [`insert()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md) method to insert the data into the collection.

</div>

<div class="language-java">

Use the [`insert()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md) method to insert the data into the collection.

</div>

<div class="language-javascript">

Use the [`insert()`](https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md) method to insert the data into the collection.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
res = client.insert(
    collection_name="test_collection",
    data=data
)

print(res)

# Output
#
# {
#     "insert_count": 1000,
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
#         9,
#         "(990 more items hidden)"
#     ]
# }
```

```java
// 3.1 Insert data into the collection
InsertReq insertReq = InsertReq.builder()
        .collectionName("test_collection")
        .data(data)
        .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(insertResp.getInsertCnt());

// Output:
// 1000
```

```javascript
// 3. Insert randomly generated vectors 
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
var data = []

for (let i = 0; i < 1000; i++) {
    const current_color = colors[Math.floor(Math.random() * colors.length)]
    const current_tag = Math.floor(Math.random() * 8999 + 1000)
    const current_coord = Array(3).fill(0).map(() => Math.floor(Math.random() * 40))
    const current_ref = [ Array(3).fill(0).map(() => colors[Math.floor(Math.random() * colors.length)]) ]

    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: {
            label: current_color,
            tag: current_tag,
            coord: current_coord,
            ref: current_ref
        }
    })
}

console.log(data[0])

// Output
// 
// {
//   id: 0,
//   vector: [
//     0.11455530974226114,
//     0.21704086958595314,
//     0.9430119822312437,
//     0.7802712923612023,
//     0.9106927960926137
//   ],
//   color: { label: 'grey', tag: 7393, coord: [ 22, 1, 22 ], ref: [ [Array] ] }
// }
// 

res = await client.insert({
    collection_name: "test_collection",
    data: data,
})

console.log(res.insert_cnt)

// Output
// 
// 1000
// 
```

## Basic scalar filtering

Once all of your data has been added, you can conduct searches and queries using the keys in the JSON field in the same manner as you would with a standard scalar field. 

<div class="language-python">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/search.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/node/v2.4.x/Vector/search.md) in the SDK reference.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 4. Basic search with a JSON field
query_vectors = [ [ random.uniform(-1, 1) for _ in range(5) ]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    filter='color["label"] in ["red"]',
    search_params={
        "metric_type": "L2",
        "params": {"nprobe": 16}
    },
    output_fields=["id", "color"],
    limit=3
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 460,
#             "distance": 0.4016231596469879,
#             "entity": {
#                 "id": 460,
#                 "color": {
#                     "label": "red",
#                     "tag": 5030,
#                     "coord": [14, 32, 40],
#                     "ref": [
#                         [ "pink", "green", "brown" ],
#                         [ "red", "grey", "black"],
#                         [ "red", "yellow", "orange"]
#                     ]
#                 }
#             }
#         },
#         {
#             "id": 785,
#             "distance": 0.451080858707428,
#             "entity": {
#                 "id": 785,
#                 "color": {
#                     "label": "red",
#                     "tag": 5290,
#                     "coord": [31, 13, 23],
#                     "ref": [
#                         ["yellow", "pink", "pink"],
#                         ["purple", "grey", "orange"],
#                         ["grey", "purple", "pink"]
#                     ]
#                 }
#             }
#         },
#         {
#             "id": 355,
#             "distance": 0.5839247703552246,
#             "entity": {
#                 "id": 355,
#                 "color": {
#                     "label": "red",
#                     "tag": 8725,
#                     "coord": [5, 10, 22],
#                     "ref": [
#                         ["white", "purple", "yellow"],
#                         ["white", "purple", "white"],
#                         ["orange", "white", "pink"]
#                     ]
#                 }
#             }
#         }
#     ]
# ]
```

```java
// 4. Search with partition key
List<BaseVector> query_vectors = Collections.singletonList(new FloatVec(new float[]{0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f}));

SearchReq searchReq = SearchReq.builder()
        .collectionName("test_collection")
        .data(query_vectors)
        .filter("color[\"label\"] in [\"red\"]")
        .outputFields(Arrays.asList("id", "color"))
        .topK(3)
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

// Output:
// SearchResp.SearchResult(entity=\{color=\{"label":"red","tag":1018,"coord":[3,30,1],"ref":[["yellow","brown","orange"],["yellow","purple","blue"],["green","purple","purple"]]}, id=295}, score=1.1190735, id=295)
// SearchResp.SearchResult(entity=\{color=\{"label":"red","tag":8141,"coord":[38,31,29],"ref":[["blue","white","white"],["green","orange","green"],["yellow","green","black"]]}, id=667}, score=1.0679582, id=667)
// SearchResp.SearchResult(entity=\{color=\{"label":"red","tag":6837,"coord":[29,9,8],"ref":[["green","black","blue"],["purple","white","green"],["red","blue","black"]]}, id=927}, score=1.0029297, id=927)
```

```javascript
// 4. Basic search with a JSON field
query_vectors = [[0.6765405125697714, 0.759217474274025, 0.4122471841491111, 0.3346805565394215, 0.09679748345514638]]

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: 'color["label"] in ["red"]',
    output_fields: ["color", "id"],
    limit: 3
})

console.log(JSON.stringify(res.results, null, 4))

// Output
// 
// [
//     {
//         "score": 1.777988076210022,
//         "id": "595",
//         "color": {
//             "label": "red",
//             "tag": 7393,
//             "coord": [31,34,18],
//             "ref": [
//                 ["grey", "white", "orange"]
//             ]
//         }
//     },
//     {
//         "score": 1.7542595863342285,
//         "id": "82",
//         "color": {
//             "label": "red",
//             "tag": 8636,
//             "coord": [4,37,29],
//             "ref": [
//                 ["brown", "brown", "pink"]
//             ]
//         }
//     },
//     {
//         "score": 1.7537562847137451,
//         "id": "748",
//         "color": {
//             "label": "red",
//             "tag": 1626,
//             "coord": [31,4,25
//             ],
//             "ref": [
//                 ["grey", "green", "blue"]
//             ]
//         }
//     }
// ]
// 
```

## Advanced scalar filtering

Milvus provides a set of advanced filters for scalar filtering in JSON fields. These filters are `JSON_CONTAINS`, `JSON_CONTAINS_ALL`, and `JSON_CONTAINS_ANY`.

- Filters all entities that have `["blue", "brown", "grey"]` as the reference color set.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    # 5. Advanced search within a JSON field

    res = client.query(
        collection_name="test_collection",
        data=query_vectors,
        filter='JSON_CONTAINS(color["ref"], ["blue", "brown", "grey"])',
        output_fields=["id", "color"],
        limit=3
    )

    print(res)

    # Output
    #
    # [
    #     {
    #         "id": 79,
    #         "color": {
    #             "label": "orange",
    #             "tag": 8857,
    #             "coord": [
    #                 10,
    #                 14,
    #                 5
    #             ],
    #             "ref": [
    #                 [
    #                     "yellow",
    #                     "white",
    #                     "green"
    #                 ],
    #                 [
    #                     "blue",
    #                     "purple",
    #                     "purple"
    #                 ],
    #                 [
    #                     "blue",
    #                     "brown",
    #                     "grey"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 371,
    #         "color": {
    #             "label": "black",
    #             "tag": 1324,
    #             "coord": [
    #                 2,
    #                 18,
    #                 32
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "orange",
    #                     "brown"
    #                 ],
    #                 [
    #                     "blue",
    #                     "brown",
    #                     "grey"
    #                 ],
    #                 [
    #                     "purple",
    #                     "blue",
    #                     "blue"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 590,
    #         "color": {
    #             "label": "red",
    #             "tag": 3340,
    #             "coord": [
    #                 13,
    #                 21,
    #                 13
    #             ],
    #             "ref": [
    #                 [
    #                     "yellow",
    #                     "yellow",
    #                     "red"
    #                 ],
    #                 [
    #                     "blue",
    #                     "brown",
    #                     "grey"
    #                 ],
    #                 [
    #                     "pink",
    #                     "yellow",
    #                     "purple"
    #                 ]
    #             ]
    #         }
    #     }
    # ]
    ```

    ```java
    // 5. Advanced search within a JSON field
    searchReq = SearchReq.builder()
            .collectionName("test_collection")
            .data(query_vectors)
            .filter("JSON_CONTAINS(color[\"ref\"], [\"purple\", \"pink\", \"orange\"])")
            .outputFields(Arrays.asList("id", "color"))
            .topK(3)
            .build();

    searchResp = client.search(searchReq);

    searchResults = searchResp.getSearchResults();
    for (List<SearchResp.SearchResult> results : searchResults) {
        System.out.println("TopK results:");
        for (SearchResp.SearchResult result : results) {
            System.out.println(result);
        }
    }

    // Output:
    // SearchResp.SearchResult(entity={color={"label":"pink","tag":2963,"coord":[15,33,30],"ref":[["green","white","white"],["purple","pink","orange"],["yellow","black","pink"]]}, id=273}, score=0.46558747, id=273)
    // SearchResp.SearchResult(entity={color={"label":"pink","tag":4027,"coord":[32,34,19],"ref":[["red","white","blue"],["white","pink","yellow"],["purple","pink","orange"]]}, id=344}, score=0.2637315, id=344)
    // SearchResp.SearchResult(entity={color={"label":"black","tag":1603,"coord":[33,12,23],"ref":[["pink","brown","black"],["black","purple","black"],["purple","pink","orange"]]}, id=205}, score=0.26133868, id=205)

    ```    

    ```javascript
    // 5. Advanced search within a JSON field
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: 'JSON_CONTAINS(color["ref"], ["blue", "brown", "grey"])',
        output_fields: ["color", "id"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "id": 79,
    //         "color": {
    //             "label": "orange",
    //             "tag": 8857,
    //             "coord": [
    //                 10,
    //                 14,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "yellow",
    //                     "white",
    //                     "green"
    //                 ],
    //                 [
    //                     "blue",
    //                     "purple",
    //                     "purple"
    //                 ],
    //                 [
    //                     "blue",
    //                     "brown",
    //                     "grey"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "id": 371,
    //         "color": {
    //             "label": "black",
    //             "tag": 1324,
    //             "coord": [
    //                 2,
    //                 18,
    //                 32
    //             ],
    //             "ref": [
    //                 [
    //                     "purple",
    //                     "orange",
    //                     "brown"
    //                 ],
    //                 [
    //                     "blue",
    //                     "brown",
    //                     "grey"
    //                 ],
    //                 [
    //                     "purple",
    //                     "blue",
    //                     "blue"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "id": 590,
    //         "color": {
    //             "label": "red",
    //             "tag": 3340,
    //             "coord": [
    //                 13,
    //                 21,
    //                 13
    //             ],
    //             "ref": [
    //                 [
    //                     "yellow",
    //                     "yellow",
    //                     "red"
    //                 ],
    //                 [
    //                     "blue",
    //                     "brown",
    //                     "grey"
    //                 ],
    //                 [
    //                     "pink",
    //                     "yellow",
    //                     "purple"
    //                 ]
    //             ]
    //         }
    //     }
    // ]
    // 
    ```

- Filters entities that have the coordinator of `[4, 5]`.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        data=query_vectors,
        filter='JSON_CONTAINS_ALL(color["coord"], [4, 5])',
        output_fields=["id", "color"],
        limit=3
    )

    print(res)

    # Output
    #
    # [
    #     {
    #         "id": 281,
    #         "color": {
    #             "label": "red",
    #             "tag": 3645,
    #             "coord": [
    #                 5,
    #                 33,
    #                 4
    #             ],
    #             "ref": [
    #                 [
    #                     "orange",
    #                     "blue",
    #                     "pink"
    #                 ],
    #                 [
    #                     "purple",
    #                     "blue",
    #                     "purple"
    #                 ],
    #                 [
    #                     "black",
    #                     "brown",
    #                     "yellow"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 464,
    #         "color": {
    #             "label": "brown",
    #             "tag": 6261,
    #             "coord": [
    #                 5,
    #                 9,
    #                 4
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "purple",
    #                     "brown"
    #                 ],
    #                 [
    #                     "black",
    #                     "pink",
    #                     "white"
    #                 ],
    #                 [
    #                     "brown",
    #                     "grey",
    #                     "brown"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 567,
    #         "color": {
    #             "label": "green",
    #             "tag": 4589,
    #             "coord": [
    #                 5,
    #                 39,
    #                 4
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "yellow",
    #                     "white"
    #                 ],
    #                 [
    #                     "yellow",
    #                     "yellow",
    #                     "brown"
    #                 ],
    #                 [
    #                     "blue",
    #                     "red",
    #                     "yellow"
    #                 ]
    #             ]
    #         }
    #     }
    # ]
    ```

    ```java
    searchReq = SearchReq.builder()
            .collectionName("test_collection")
            .data(query_vectors)
            .filter("JSON_CONTAINS_ALL(color[\"coord\"], [4, 5])")
            .outputFields(Arrays.asList("id", "color"))
            .topK(3)
            .build();

    searchResp = client.search(searchReq);

    searchResults = searchResp.getSearchResults();
    for (List<SearchResp.SearchResult> results : searchResults) {
        System.out.println("TopK results:");
        for (SearchResp.SearchResult result : results) {
            System.out.println(result);
        }
    } 

    // Output:
    // SearchResp.SearchResult(entity={color={"label":"green","tag":9899,"coord":[5,4,25],"ref":[["purple","black","yellow"],["orange","green","purple"],["red","purple","pink"]]}, id=708}, score=0.56576324, id=708)
    // SearchResp.SearchResult(entity={color={"label":"red","tag":2176,"coord":[4,5,23],"ref":[["red","black","green"],["brown","orange","brown"],["brown","orange","yellow"]]}, id=981}, score=0.5656834, id=981)
    // SearchResp.SearchResult(entity={color={"label":"pink","tag":3085,"coord":[5,3,4],"ref":[["yellow","orange","green"],["black","pink","red"],["orange","blue","blue"]]}, id=221}, score=0.3708634, id=221)

    ```    

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: 'JSON_CONTAINS_ALL(color["coord"], [4, 5])',
        output_fields: ["color", "id"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 1.8944344520568848,
    //         "id": "792",
    //         "color": {
    //             "label": "purple",
    //             "tag": 8161,
    //             "coord": [
    //                 4,
    //                 38,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "red",
    //                     "white",
    //                     "grey"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.2801706790924072,
    //         "id": "489",
    //         "color": {
    //             "label": "red",
    //             "tag": 4358,
    //             "coord": [
    //                 5,
    //                 4,
    //                 1
    //             ],
    //             "ref": [
    //                 [
    //                     "blue",
    //                     "orange",
    //                     "orange"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.2097992897033691,
    //         "id": "656",
    //         "color": {
    //             "label": "red",
    //             "tag": 7856,
    //             "coord": [
    //                 5,
    //                 20,
    //                 4
    //             ],
    //             "ref": [
    //                 [
    //                     "black",
    //                     "orange",
    //                     "white"
    //                 ]
    //             ]
    //         }
    //     }
    // ]
    // 
    ```

- Filters entities that have the coordinator containing either `4` or `5`.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        data=query_vectors,
        filter='JSON_CONTAINS_ANY(color["coord"], [4, 5])',
        output_fields=["id", "color"],
        limit=3
    )

    print(res)

    # Output
    #
    # [
    #     {
    #         "id": 0,
    #         "color": {
    #             "label": "yellow",
    #             "tag": 6340,
    #             "coord": [
    #                 40,
    #                 4,
    #                 40
    #             ],
    #             "ref": [
    #                 [
    #                     "purple",
    #                     "yellow",
    #                     "orange"
    #                 ],
    #                 [
    #                     "green",
    #                     "grey",
    #                     "purple"
    #                 ],
    #                 [
    #                     "black",
    #                     "white",
    #                     "yellow"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 2,
    #         "color": {
    #             "label": "brown",
    #             "tag": 9359,
    #             "coord": [
    #                 38,
    #                 21,
    #                 5
    #             ],
    #             "ref": [
    #                 [
    #                     "red",
    #                     "brown",
    #                     "white"
    #                 ],
    #                 [
    #                     "purple",
    #                     "red",
    #                     "brown"
    #                 ],
    #                 [
    #                     "pink",
    #                     "grey",
    #                     "black"
    #                 ]
    #             ]
    #         }
    #     },
    #     {
    #         "id": 7,
    #         "color": {
    #             "label": "green",
    #             "tag": 3560,
    #             "coord": [
    #                 5,
    #                 9,
    #                 5
    #             ],
    #             "ref": [
    #                 [
    #                     "blue",
    #                     "orange",
    #                     "green"
    #                 ],
    #                 [
    #                     "blue",
    #                     "blue",
    #                     "black"
    #                 ],
    #                 [
    #                     "green",
    #                     "purple",
    #                     "green"
    #                 ]
    #             ]
    #         }
    #     }
    # ]
    ```

    ```java
    searchReq = SearchReq.builder()
            .collectionName("test_collection")
            .data(query_vectors)
            .filter("JSON_CONTAINS_ANY(color[\"coord\"], [4, 5])")
            .outputFields(Arrays.asList("id", "color"))
            .topK(3)
            .build();

    searchResp = client.search(searchReq);
    searchResults = searchResp.getSearchResults();
    for (List<SearchResp.SearchResult> results : searchResults) {
        System.out.println("TopK results:");
        for (SearchResp.SearchResult result : results) {
            System.out.println(result);
        }
    } 

    // Output:
    // SearchResp.SearchResult(entity={color={"label":"brown","tag":8414,"coord":[3,4,15],"ref":[["blue","green","pink"],["red","orange","pink"],["yellow","pink","green"]]}, id=11}, score=1.18235, id=11)
    // SearchResp.SearchResult(entity={color={"label":"yellow","tag":2846,"coord":[20,4,15],"ref":[["white","black","purple"],["green","black","yellow"],["red","purple","brown"]]}, id=589}, score=1.1414992, id=589)
    // SearchResp.SearchResult(entity={color={"label":"pink","tag":6744,"coord":[25,33,5],"ref":[["orange","purple","white"],["white","pink","brown"],["red","pink","red"]]}, id=567}, score=1.1087029, id=567)

    ```

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: 'JSON_CONTAINS_ANY(color["coord"], [4, 5])',
        output_fields: ["color", "id"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 1.9083369970321655,
    //         "id": "453",
    //         "color": {
    //             "label": "brown",
    //             "tag": 8788,
    //             "coord": [
    //                 21,
    //                 18,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "pink",
    //                     "black",
    //                     "brown"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.8944344520568848,
    //         "id": "792",
    //         "color": {
    //             "label": "purple",
    //             "tag": 8161,
    //             "coord": [
    //                 4,
    //                 38,
    //                 5
    //             ],
    //             "ref": [
    //                 [
    //                     "red",
    //                     "white",
    //                     "grey"
    //                 ]
    //             ]
    //         }
    //     },
    //     {
    //         "score": 1.8615753650665283,
    //         "id": "272",
    //         "color": {
    //             "label": "grey",
    //             "tag": 3400,
    //             "coord": [
    //                 5,
    //                 1,
    //                 32
    //             ],
    //             "ref": [
    //                 [
    //                     "purple",
    //                     "green",
    //                     "white"
    //                 ]
    //             ]
    //         }
    //     }
    // ]
    // 
    ```    

## Reference on JSON filters

When working with JSON fields, you can either use the JSON fields as filters or some of its specific keys.

<div class="admonition note">

<p><b>notes</b></p>

<ul>
<li>Milvus stores string values in the JSON field as is without performing semantic escape or conversion. </li>
</ul>
<p>For instance, <code>'a"b'</code>, <code>"a'b"</code>, <code>'a\\\\'b'</code>, and <code>"a\\\\"b"</code> will be saved as is, while <code>'a'b'</code> and <code>"a"b"</code> will be treated as invalid values.</p>
<ul>
<li><p>To build filter expressions using a JSON field, you can utilize the keys within the field. </p></li>
<li><p>If a key's value is an integer or a float, you can compare it with another integer or float key or an INT32/64 or FLOAT32/64 field.</p></li>
<li><p>If a key's value is a string, you can compare it only with another string key or a VARCHAR field.</p></li>
</ul>

</div>

### Basic Operators in JSON Fields

The following table assumes that the value of a JSON field named `json_key` has a key named `A`. Use it as a reference when constructing boolean expressions using JSON field keys.

|  __Operator__  |  __Examples__                                   |  __Remarks__                                                                                                                                                                                                                                                                                                     |
| -------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  __<__         |  `'json_field["A"] < 3'`                        |  This expression evaluates to true if the value of `json_field["A"]` is less than `3`.                                                                                                                                                                                                                           |
|  __>__         |  `'json_field["A"] > 1'`                        |  This expression evaluates to true if the value of `json_field["A"]` is greater than `1`.                                                                                                                                                                                                                        |
|  __==__        |  `'json_field["A"] == 1'`                       |  This expression evaluates to true if the value of `json_field["A"]` is equal to `1`.                                                                                                                                                                                                                            |
|  __!=__        |  `'json_field["A"][0]' != "abc"'`               |  This expression evaluates to true if<br/> - `json_field` does not have a key named `A`.<br/> - `json_field` has a key named `A` but `json_field["A"]` is not an array.<br/> - `json_field["A"]` is an empty array.<br/> - `json_field["A"]` is an array but the first element is not `abc`.<br/> |
|  __<=__        |  `'json_field["A"] <= 5'`                       |  This expression evaluates to true if the value of `json_field["A"]` is less than or equal to `5`.                                                                                                                                                                                                               |
|  __>=__        |  `'json_field["A"] >= 1'`                       |  This expression evaluates to true if the value of `json_field["A"]` is greater than or equal to `1`.                                                                                                                                                                                                            |
|  __not__       |  `'not json_field["A"] == 1'`                   |  This expression evaluates to true if<br/> - `json_field` does not have a key named `A`.<br/> - `json_field["A"]` is not equal to `1`.<br/>                                                                                                                                                             |
|  __in__        |  `'json_field["A"] in [1, 2, 3]'`               |  This expression evaluates to true if the value of `json_field["A"]` is `1`, `2`, or `3`.                                                                                                                                                                                                                        |
|  __and (&&)__  |  `'json_field["A"] > 1 && json_field["A"] < 3'` |  This expression evaluates to true if the value of `json_field["A"]` is greater than 1 and less than `3`.                                                                                                                                                                                                        |
|  __or (&#124;&#124;)__ |  <code>'json_field["A"] > 1 &#124;&#124; json_field["A"] < 3'</code> |  This expression evaluates to true if the value of `json_field["A"]` is greater than `1` or less than `3`.                                                                                                                                                                                                       |
|  __exists__    |  `'exists json_field["A"]'`                     |  This expression evaluates to true if `json_field` has a key named `A`.                                                                                                                                                                                                                                |

### Advanced Operators

The following operators are specific to JSON fields:

- `json_contains(identifier, jsonExpr)`

    This operator filters entities whose identifier contains the specified JSON expression. 

    - Example 1: `{"x": [1,2,3]}`

        ```python
        json_contains(x, 1) # => True (x contains 1.)
        json_contains(x, "a") # => False (x does not contain a member "a".)
        ```

    - Example 2: `{"x", [[1,2,3], [4,5,6], [7,8,9]]}`

        ```python
        json_contains(x, [1,2,3]) # => True (x contains [1,2,3].)
        json_contains(x, [3,2,1]) # => False (x does contain a member [3,2,1].)
        ```

- `json_contains_all(identifier, jsonExpr)`

    This operator filters entities whose identifier contains all the members of the JSON expression.

    Example: `{"x": [1,2,3,4,5,7,8]}`

    ```python
    json_contains_all(x, [1,2,8]) # => True (x contains 1, 2, and 8.)
    json_contains_all(x, [4,5,6]) # => False (x does not has a member 6.)
    ```

- `json_contains_any(identifier, jsonExpr)`

    This operator filters entities whose identifier contains any members of the JSON expression.

    Example: `{"x": [1,2,3,4,5,7,8]}`

    ```python
    json_contains_any(x, [1,2,8]) # => True (x contains 1, 2, and 8.)
    json_contains_any(x, [4,5,6]) # => True (x contains 4 and 5.)
    json_contains_any(x, [6,9]) # => False (x contains none of 6 and 9.)
    ```
