---
id: array_data_type.md
title: Use Array Fields
---

# Use Array Fields

This guide explains how to use the array fields, such as inserting array values as well as searching and querying in array fields with basic and advanced operators.

## Overview

Milvus provides support for arrays as one of the field data types. If you want to add an array field to the schema, you have to set the data type for its element and the maximum number of elements that this field can contain. This indicates that an array in a Milvus collection should always have elements of the same data type.

For example, the following code snippet generates a random dataset containing an array field.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    current_tag = random.randint(1000, 9999)
    current_coord = [ random.randint(0, 40) for _ in range(random.randint(3, 5)) ]
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "color_tag": current_tag,
        "color_coord": current_coord,
    })

print(data[0])
```

```java
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JSONObject> data = new ArrayList<>();

for (int i=0; i<1000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    Long current_tag = rand.nextLong(8999L) + 1000L;

    // Generate an random-sized array
    Long capacity = rand.nextLong(5L) + 1L;
    List<Long> current_coord = new ArrayList<>();
    current_coord.add(rand.nextLong(40L) + 1L);
    current_coord.add(rand.nextLong(40L) + 1L);
    for (int j=3; j<capacity; j++) {
        current_coord.add(rand.nextLong(40L) + 1L);
    }

    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("color_tag", current_tag);
    row.put("color_coord", current_coord);
    data.add(row);
}

System.out.println(JSONObject.toJSON(data.get(0)));   
```

```javascript
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
var data = []

for (let i = 0; i < 1000; i++) {
    const current_color = colors[Math.floor(Math.random() * colors.length)]
    const current_tag = Math.floor(Math.random() * 8999 + 1000)
    const current_coord = Array(Math.floor(Math.random() * 5 + 1)).fill(0).map(() => Math.floor(Math.random() * 40))

    data.push({
        id: i,
        vector: Array(5).fill(0).map(() => Math.random()),
        color: current_color,
        color_tag: current_tag,
        color_coord: current_coord,
    })
}

console.log(data[0])
```

You can view the structure of the generated data by checking its first entry.

```
{
    id: 0,
    vector: [
        0.0338537420906162,
        0.6844108238358322,
        0.28410588909961754,
        0.09752595400212116,
        0.22671013058761114
    ],
    color: 'orange',
    color_tag: 5677,
    color_coord: [ 3, 0, 18, 29 ]
}
```

<div class="alert note">

- Elements in an array field should be of the same data type.
- The number of elements in an array field should be less than or equal to the specified maximum capacity of the array field.

</div>

## Define array field

To define an array field, simply follow the same procedure as defining fields of other data types.

<div class="language-python">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md), [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md), [`add_field()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md), [`add_index()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/add_index.md), [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md), and [`get_load_state()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Management/get_load_state.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md), [`createSchema()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md), [`addField()`](https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md), [`IndexParam`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/IndexParam.md), [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md), and [`getLoadState()`](https://milvus.io/api-reference/java/v2.4.x/v2/Management/getLoadState.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md), [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md), and [`getLoadState()`](https://milvus.io/api-reference/node/v2.4.x/Management/getLoadState.md) in the SDK reference.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
import random, time
from pymilvus import MilvusClient, DataType

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
schema.add_field(field_name="color", datatype=DataType.VARCHAR, max_length=512)
schema.add_field(field_name="color_tag", datatype=DataType.INT64)
# highlight-next-line
schema.add_field(field_name="color_coord", datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=5)

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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;

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
    .dataType(DataType.VarChar)
    .maxLength(512)
    .build());

schema.addField(AddFieldReq.builder()
    .fieldName("color_tag")
    .dataType(DataType.Int64)
    .build());

// highlight-start
schema.addField(AddFieldReq.builder()
    .fieldName("color_coord")
    .dataType(DataType.Array)
    .elementType(DataType.Int64)
    .maxCapacity(5)
    .build());
// highlight-end

// 2.3 Prepare index parameters
IndexParam indexParamForIdField = IndexParam.builder()
    .fieldName("id")
    .indexType(IndexParam.IndexType.STL_SORT)
    .build();

IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("vector")
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.IP)
    .extraParams(Map.of("nlist", 1024))
    .build();

IndexParam indexParamForColorField = IndexParam.builder()
    .fieldName("color")
    .indexType(IndexParam.IndexType.TRIE)
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
indexParams.add(indexParamForColorField);

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
        data_type: DataType.VarChar,
        max_length: 512
    },
    {
        name: "color_tag",
        data_type: DataType.Int64,
    },
// highlight-start
    {
        name: "color_coord",
        data_type: DataType.Array,
        element_type: DataType.Int64,
        max_capacity: 5
    }
// highlight-end
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

## Insert field values

After creating a collection, you can insert arrays such as the one demonstrated in [Overview](#overview).

<div class="language-python">

For more information on parameters, refer to [`insert()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`insert()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`insert()`](https://milvus.io/api-reference/node/v2.4.x/Vector/insert.md) in the SDK reference.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 3. Insert data
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

time.sleep(5)
```

```java
import com.alibaba.fastjson.JSONObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

// 3.1 Insert data into the collection
InsertReq insertReq = InsertReq.builder()
    .collectionName("test_collection")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 1000}

Thread.sleep(5000);   // wait for a while to ensure the data is indexed
```

```javascript
res = await client.insert({
    collection_name: "test_collection",
    data: data,
})

console.log(res.insert_cnt)

// Output
// 
// 1000
// 

await sleep(5000)
```

## Basic scalar filtering

Once all of your data has been added, you can conduct searches and queries using the elements in the array field in the same manner as you would with a standard scalar field.

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
# 4. Basic search with the array field
query_vectors = [ [ random.uniform(-1, 1) for _ in range(5) ]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    filter="color_coord[0] < 10",
    search_params={
        "metric_type": "L2",
        "params": {"nprobe": 16}
    },
    output_fields=["id", "color", "color_tag", "color_coord"],
    limit=3
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 993,
#             "distance": 0.1538649946451187,
#             "entity": {
#                 "color_coord": [
#                     5,
#                     37,
#                     39,
#                     18
#                 ],
#                 "id": 993,
#                 "color": "black",
#                 "color_tag": 6785
#             }
#         },
#         {
#             "id": 452,
#             "distance": 0.2353954315185547,
#             "entity": {
#                 "color_coord": [
#                     2,
#                     27,
#                     34,
#                     32,
#                     30
#                 ],
#                 "id": 452,
#                 "color": "brown",
#                 "color_tag": 2075
#             }
#         },
#         {
#             "id": 862,
#             "distance": 0.27913951873779297,
#             "entity": {
#                 "color_coord": [
#                     0,
#                     19,
#                     0,
#                     26
#                 ],
#                 "id": 862,
#                 "color": "brown",
#                 "color_tag": 1787
#             }
#         }
#     ]
# ]
```

```java
// 4. Basic search with an Array field

QueryReq queryReq = QueryReq.builder()
    .collectionName("test_collection")
    .filter("color_coord[0] in [7, 8, 9]")
    .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
    .limit(3L)
    .build();

QueryResp queryResp = client.query(queryReq);

System.out.println(JSONObject.toJSON(queryResp));

// Output:
// {"queryResults": [
//     {"entity": {
//         "color": "orange",
//         "color_tag": 2464,
//         "id": 18,
//         "color_coord": [
//             9,
//             30
//         ]
//     }},
//     {"entity": {
//         "color": "pink",
//         "color_tag": 2602,
//         "id": 22,
//         "color_coord": [
//             8,
//             34,
//             16
//         ]
//     }},
//     {"entity": {
//         "color": "pink",
//         "color_tag": 1243,
//         "id": 42,
//         "color_coord": [
//             9,
//             20
//         ]
//     }}
// ]}
```

```javascript
// 4. Basic search with the array field
const query_vectors = [Array(5).fill(0).map(() => Math.random())]

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "color_coord[0] < 10",
    output_fields: ["id", "color", "color_tag", "color_coord"],
    limit: 3
})

console.log(JSON.stringify(res.results, null, 4))

// Output
// 
// [
//     {
//         "score": 2.015894889831543,
//         "id": "260",
//         "color": "green",
//         "color_tag": "5320",
//         "color_coord": [
//             "1",
//             "7",
//             "33",
//             "13",
//             "23"
//         ]
//     },
//     {
//         "score": 2.006500720977783,
//         "id": "720",
//         "color": "green",
//         "color_tag": "4939",
//         "color_coord": [
//             "0",
//             "19",
//             "5",
//             "30",
//             "15"
//         ]
//     },
//     {
//         "score": 1.9539016485214233,
//         "id": "243",
//         "color": "red",
//         "color_tag": "2403",
//         "color_coord": [
//             "4"
//         ]
//     }
// ]
// 
```

## Advanced filtering

As what we have in a JSON field, Milvus also provides advanced filtering operators for arrays, namely `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ALL`, `ARRAY_CONTAINS_ANY`, and `ARRAY_LENGTH`.

- Filters all entities having a `10` in their color coordinators.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>
    
    ```python
    # 5. Advanced search within the array field

    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS(color_coord, 10)",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output
    #
    # [
    #     {
    #         "id": 21,
    #         "color": "white",
    #         "color_tag": 4202,
    #         "color_coord": [
    #             10,
    #             5,
    #             5
    #         ]
    #     },
    #     {
    #         "id": 31,
    #         "color": "grey",
    #         "color_tag": 7386,
    #         "color_coord": [
    #             8,
    #             10,
    #             23,
    #             7,
    #             31
    #         ]
    #     },
    #     {
    #         "id": 45,
    #         "color": "purple",
    #         "color_tag": 6126,
    #         "color_coord": [
    #             0,
    #             10,
    #             24
    #         ]
    #     }
    # ]
    ```

    ```java
    // 5. Advanced search within an Array field
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_CONTAINS(color_coord, 10)")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();

    queryResp = client.query(queryReq);

    System.out.println(JSONObject.toJSON(queryResp));

    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color": "blue",
    //         "color_tag": 4337,
    //         "id": 17,
    //         "color_coord": [
    //             11,
    //             33,
    //             10,
    //             20
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "white",
    //         "color_tag": 5219,
    //         "id": 25,
    //         "color_coord": [
    //             10,
    //             15
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "red",
    //         "color_tag": 7120,
    //         "id": 35,
    //         "color_coord": [
    //             19,
    //             10,
    //             10,
    //             14
    //         ]
    //     }}
    // ]}
    ```    

    ```javascript
    // 5. Advanced search within the array field
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS(color_coord, 10)",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 1.7962548732757568,
    //         "id": "696",
    //         "color": "red",
    //         "color_tag": "1798",
    //         "color_coord": [
    //             "33",
    //             "10",
    //             "37"
    //         ]
    //     },
    //     {
    //         "score": 1.7126177549362183,
    //         "id": "770",
    //         "color": "red",
    //         "color_tag": "1962",
    //         "color_coord": [
    //             "21",
    //             "23",
    //             "10"
    //         ]
    //     },
    //     {
    //         "score": 1.6707111597061157,
    //         "id": "981",
    //         "color": "yellow",
    //         "color_tag": "3100",
    //         "color_coord": [
    //             "28",
    //             "39",
    //             "10",
    //             "6"
    //         ]
    //     }
    // ]
    // 
    ```    

- Filters all entities having a `7` and an `8` in their color coordinators.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS_ALL(color_coord, [7, 8])",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output
    #
    # [
    #     {
    #         "color": "grey",
    #         "color_tag": 7386,
    #         "color_coord": [
    #             8,
    #             10,
    #             23,
    #             7,
    #             31
    #         ],
    #         "id": 31
    #     },
    #     {
    #         "color": "purple",
    #         "color_tag": 7823,
    #         "color_coord": [
    #             38,
    #             8,
    #             36,
    #             38,
    #             7
    #         ],
    #         "id": 258
    #     },
    #     {
    #         "color": "purple",
    #         "color_tag": 6356,
    #         "color_coord": [
    #             34,
    #             32,
    #             11,
    #             8,
    #             7
    #         ],
    #         "id": 348
    #     }
    # ]
    ```

    ```java
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_CONTAINS_ALL(color_coord, [7, 8, 9])")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();

    queryResp = client.query(queryReq);

    System.out.println(JSONObject.toJSON(queryResp));     

    // Output:
    // {"queryResults": [{"entity": {
    //     "color": "red",
    //     "color_tag": 6986,
    //     "id": 423,
    //     "color_coord": [
    //         26,
    //         7,
    //         8,
    //         9
    //     ]
    // }}]}
    ```    

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS_ALL(color_coord, [7, 8])",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 0.8267516493797302,
    //         "id": "913",
    //         "color": "brown",
    //         "color_tag": "8897",
    //         "color_coord": [
    //             "39",
    //             "31",
    //             "8",
    //             "29",
    //             "7"
    //         ]
    //     },
    //     {
    //         "score": 0.6889009475708008,
    //         "id": "826",
    //         "color": "blue",
    //         "color_tag": "4903",
    //         "color_coord": [
    //             "7",
    //             "25",
    //             "5",
    //             "12",
    //             "8"
    //         ]
    //     },
    //     {
    //         "score": 0.5851659774780273,
    //         "id": "167",
    //         "color": "blue",
    //         "color_tag": "1550",
    //         "color_coord": [
    //             "8",
    //             "27",
    //             "7"
    //         ]
    //     }
    // ]
    // 
    ```

- Filters all entities having either 7, 8, or 9 in their color coordinators. 

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output
    #
    # [
    #     {
    #         "id": 0,
    #         "color": "green",
    #         "color_tag": 9212,
    #         "color_coord": [
    #             37,
    #             36,
    #             36,
    #             7,
    #             9
    #         ]
    #     },
    #     {
    #         "id": 5,
    #         "color": "blue",
    #         "color_tag": 9643,
    #         "color_coord": [
    #             8,
    #             20,
    #             20,
    #             11
    #         ]
    #     },
    #     {
    #         "id": 12,
    #         "color": "blue",
    #         "color_tag": 3075,
    #         "color_coord": [
    #             29,
    #             7,
    #             17
    #         ]
    #     }
    # ]
    ```

    ```java
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();

    queryResp = client.query(queryReq);

    System.out.println(JSONObject.toJSON(queryResp));   

    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color": "orange",
    //         "color_tag": 2464,
    //         "id": 18,
    //         "color_coord": [
    //             9,
    //             30
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "pink",
    //         "color_tag": 2602,
    //         "id": 22,
    //         "color_coord": [
    //             8,
    //             34,
    //             16
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "pink",
    //         "color_tag": 1243,
    //         "id": 42,
    //         "color_coord": [
    //             9,
    //             20
    //         ]
    //     }}
    // ]}
    ```

    ```javascript
    res = await client.search({
        collection_name: "test_collection",
        data: query_vectors,
        filter: "ARRAY_CONTAINS_ANY(color_coord, [7, 8, 9])",
        output_fields: ["id", "color", "color_tag", "color_coord"],
        limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 2.015894889831543,
    //         "id": "260",
    //         "color": "green",
    //         "color_tag": "5320",
    //         "color_coord": [
    //             "1",
    //             "7",
    //             "33",
    //             "13",
    //             "23"
    //         ]
    //     },
    //     {
    //         "score": 1.783075213432312,
    //         "id": "593",
    //         "color": "orange",
    //         "color_tag": "4079",
    //         "color_coord": [
    //             "8",
    //             "19"
    //         ]
    //     },
    //     {
    //         "score": 1.7713876962661743,
    //         "id": "874",
    //         "color": "blue",
    //         "color_tag": "7029",
    //         "color_coord": [
    //             "14",
    //             "8",
    //             "15"
    //         ]
    //     }
    // ]
    // 
    ```   

- Filters entities that have exactly four elements.

    <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
    </div>

    ```python
    res = client.query(
        collection_name="test_collection",
        filter="ARRAY_LENGTH(color_coord) == 4",
        output_fields=["id", "color", "color_tag", "color_coord"],
        limit=3
    )

    print(res)

    # Output
    #
    # [
    #     {
    #         "id": 1,
    #         "color": "pink",
    #         "color_tag": 6708,
    #         "color_coord": [
    #             15,
    #             36,
    #             38,
    #             2
    #         ]
    #     },
    #     {
    #         "id": 4,
    #         "color": "green",
    #         "color_tag": 5386,
    #         "color_coord": [
    #             13,
    #             32,
    #             35,
    #             5
    #         ]
    #     },
    #     {
    #         "id": 5,
    #         "color": "blue",
    #         "color_tag": 9643,
    #         "color_coord": [
    #             8,
    #             20,
    #             20,
    #             11
    #         ]
    #     }
    # ]
    ```

    ```java
    queryReq = QueryReq.builder()
        .collectionName("test_collection")
        .filter("ARRAY_LENGTH(color_coord) == 4")
        .outputFields(Arrays.asList("id", "color", "color_tag", "color_coord"))
        .limit(3)
        .build();

    queryResp = client.query(queryReq);

    System.out.println(JSONObject.toJSON(queryResp));   

    // Output:
    // {"queryResults": [
    //     {"entity": {
    //         "color": "green",
    //         "color_tag": 2984,
    //         "id": 2,
    //         "color_coord": [
    //             27,
    //             31,
    //             23,
    //             29
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "black",
    //         "color_tag": 6867,
    //         "id": 4,
    //         "color_coord": [
    //             37,
    //             3,
    //             30,
    //             33
    //         ]
    //     }},
    //     {"entity": {
    //         "color": "brown",
    //         "color_tag": 3464,
    //         "id": 10,
    //         "color_coord": [
    //             31,
    //             38,
    //             21,
    //             28
    //         ]
    //     }}
    // ]}
    ```   

    ```javascript
    res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "ARRAY_LENGTH(color_coord) == 4",
    output_fields: ["id", "color", "color_tag", "color_coord"],
    limit: 3
    })

    console.log(JSON.stringify(res.results, null, 4))

    // Output
    // 
    // [
    //     {
    //         "score": 2.0404388904571533,
    //         "id": "439",
    //         "color": "orange",
    //         "color_tag": "7096",
    //         "color_coord": [
    //             "27",
    //             "34",
    //             "26",
    //             "39"
    //         ]
    //     },
    //     {
    //         "score": 1.9059759378433228,
    //         "id": "918",
    //         "color": "purple",
    //         "color_tag": "2903",
    //         "color_coord": [
    //             "28",
    //             "19",
    //             "36",
    //             "35"
    //         ]
    //     },
    //     {
    //         "score": 1.8385567665100098,
    //         "id": "92",
    //         "color": "yellow",
    //         "color_tag": "4693",
    //         "color_coord": [
    //             "1",
    //             "23",
    //             "2",
    //             "3"
    //         ]
    //     }
    // ]
    // 
    ```