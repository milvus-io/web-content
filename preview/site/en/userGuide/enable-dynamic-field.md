---
id: enable-dynamic-field.md
title: Enable Dynamic Field
---

# Enable Dynamic Field

This page explains how to use the dynamic field in a collection for flexible data insertion and retrieval.

## Overview

Milvus allows you to define the schema of a collection by setting the name and the data type of each specific field so that you can create indexes in these fields for improved search performance.

Once a field is defined, you need to include this field when you insert data. What if some fields are not always present in all your data entries? This is where the dynamic field comes in.

The dynamic field in a collection is a reserved JSON field named $meta. It can hold non-schema-defined fields and their values as key-value pairs. Using the dynamic field, you can search and query both schema-defined fields and any non-schema-defined fields they may have.

## Enable dynamic field

When defining a schema for a collection, you can set `enable_dynamic_field` to `True` to enable the reserved dynamic field, indicating that any non-schema-defined fields and their values inserted later on will be saved as key-value pairs in the reserved dynamic field.

The following snippet creates a collection with two schema-defined fields, namely id and vector, and enables the dynamic field.

<div class="language-python">

For more information on parameters, refer to [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) in the SDK reference.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
import random, time
from pymilvus import connections, MilvusClient, DataType

SERVER_ADDR = "http://localhost:19530"

# 1. Set up a Milvus client
client = MilvusClient(
    uri=SERVER_ADDR
)

# 2. Create a collection
schema = MilvusClient.create_schema(
    auto_id=False,
    # highlight-next-line
    enable_dynamic_field=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)

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
schema.addField(AddFieldReq.builder().fieldName("id").dataType(DataType.Int64).isPrimaryKey(true).autoID(false).build());
schema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(5).build());

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

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);

// 2.4 Create a collection with schema and index parameters
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
    .collectionName("customized_setup")
    .collectionSchema(schema)
    .indexParams(indexParams)
    // highlight-next-line
    .enableDynamicField(true)
    .build();

client.createCollection(customizedSetupReq);

Thread.sleep(5000);

// 2.5 Get load state of the collection
GetLoadStateReq customSetupLoadStateReq1 = GetLoadStateReq.builder()
    .collectionName("customized_setup")
    .build();

boolean res = client.getLoadState(customSetupLoadStateReq1);

System.out.println(res);

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
]

// 2.2 Prepare index parameters
const index_params = [{
    field_name: "id",
    index_type: "STL_SORT"
},{
    field_name: "vector",
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: { nlist: 1024}
}]

// 2.3 Create a collection with fields and index parameters
res = await client.createCollection({
    collection_name: "test_collection",
    fields: fields, 
    index_params: index_params,
    // highlight-next-line
    enable_dynamic_field: true
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

## Insert dynamic data

Once the collection is created, you can start inserting data, including the dynamic data into the collection.

### Prepare data

In this section, you need to prepare some randomly generated data for the insertion later on.

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
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "tag": current_tag,
        "color_tag": f"{current_color}_{str(current_tag)}"
    })

print(data[0])
```

```java
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JSONObject> data = new ArrayList<>();

for (int i=0; i<1000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    int current_tag = rand.nextInt(8999) + 1000;
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("tag", current_tag);
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
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
    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: current_color,
        tag: current_tag,
        color_tag: `${current_color}_${current_tag}`
    })
}

console.log(data[0])
```

You can view the structure of the generated data by checking its first entry.

```
{
    id: 0,
    vector: [
        0.1275656405044483,
        0.47417858592773277,
        0.13858264437643286,
        0.2390904907020377,
        0.8447862593689635
    ],
    color: 'blue',
    tag: 2064,
    color_tag: 'blue_2064'
}
```

### Insert data

Then you can safely insert the data into the collection.

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
res = client.insert(
    collection_name="test_collection",
    data=data,
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
// 3.1 Insert data into the collection
InsertReq insertReq = InsertReq.builder()
    .collectionName("customized_setup")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 1000}

Thread.sleep(5000);
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

## Search with dynamic fields

If you have created the collection with the dynamic field enabled and inserted non-schema-defined fields, you can use these fields in the filter expression of a search or a query as follows.

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
# 4. Search with dynamic fields
query_vectors = [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    filter="color in [\"red\", \"green\"]",
    search_params={"metric_type": "L2", "params": {"nprobe": 10}},
    limit=3
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 863,
#             "distance": 0.188413605093956,
#             "entity": {
#                 "id": 863,
#                 "color_tag": "red_2371"
#             }
#         },
#         {
#             "id": 799,
#             "distance": 0.29188022017478943,
#             "entity": {
#                 "id": 799,
#                 "color_tag": "red_2235"
#             }
#         },
#         {
#             "id": 564,
#             "distance": 0.3492690920829773,
#             "entity": {
#                 "id": 564,
#                 "color_tag": "red_9186"
#             }
#         }
#     ]
# ]
```

```java
// 4. Search with non-schema-defined fields
List<List<Float>> queryVectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

SearchReq searchReq = SearchReq.builder()
    .collectionName("customized_setup")
    .data(queryVectors)
    .filter("$meta[\"color\"] in [\"red\", \"green\"]")
    .outputFields(List.of("id", "color_tag"))
    .topK(3)
    .build();

SearchResp searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));

// Output:
// {"searchResults": [[
//     {
//         "distance": 1.3159835,
//         "id": 979,
//         "entity": {
//             "color_tag": "red_7155",
//             "id": 979
//         }
//     },
//     {
//         "distance": 1.0744804,
//         "id": 44,
//         "entity": {
//             "color_tag": "green_8006",
//             "id": 44
//         }
//     },
//     {
//         "distance": 1.0060014,
//         "id": 617,
//         "entity": {
//             "color_tag": "red_4056",
//             "id": 617
//         }
//     }
// ]]}
```

```javascript
// 4. Search with non-schema-defined fields
const query_vectors = [[0.1, 0.2, 0.3, 0.4, 0.5]]

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "color in [\"red\", \"green\"]",
    output_fields: ["color_tag"],
    limit: 3
})

console.log(res.results)

// Output
// 
// [
//   { score: 1.2284551858901978, id: '301', color_tag: 'red_1270' },
//   { score: 1.2195171117782593, id: '205', color_tag: 'red_2780' },
//   { score: 1.2055039405822754, id: '487', color_tag: 'red_6653' }
// ]
// 
```

## Recaps

It is worth noting that __color__, __tag__, and __color_tag__ are not present when you define the collection schema, but you can use them as schema-defined fields when you conduct searches and queries.

If the name of a non-schema-defined field contains characters other than digits, letters, and underscores, such as plus signs (+), asterisks (*), or dollar signs ($), you have to include the key within __$meta[]__ as shown in the following code snippet when using it in a boolean expression or including it in the output fields.

```python
... 
filter='$meta["$key"] in ["a", "b", "c"]', 
output_fields='$meta["$key"]'  
...
```
