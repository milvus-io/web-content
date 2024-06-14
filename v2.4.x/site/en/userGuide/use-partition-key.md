---
id: use-partition-key.md
title: Use Partition Key
---

# Use Partition Key

This guide walks you through using the partition key to accelerate data retrieval from your collection.

## Overview

You can set a particular field in a collection as the partition key so that Milvus distributes incoming entities into different partitions according to their respective partition values in this field. This allows entities with the same key value to be grouped in a partition, accelerating search performance by avoiding the need to scan irrelevant partitions when filtering by the key field. When compared to traditional filtering methods, the partition key can greatly enhance query performance.

You can use the partition key to implement multi-tenancy. For details on multi-tenancy, read [Multi-tenancy](https://milvus.io/docs/multi_tenancy.md) for more.

## Enable partition key

To set a field as the partition key, specify `partition_key_field` when creating a collection schema.

In the example code below, `num_partitions` determines the number of partitions that will be created. By default, it is set to `16`. We recommend you retain the default value.

<div class="language-python">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md), [`create_schema()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_schema.md), and [`add_field()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/CollectionSchema/add_field.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md), [`createSchema()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createSchema.md), and [`addField()`](https://milvus.io/api-reference/java/v2.4.x/v2/CollectionSchema/addField.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`MilvusClient`](https://milvus.io/api-reference/node/v2.4.x/Client/MilvusClient.md) and [`createCollection()`](https://milvus.io/api-reference/node/v2.4.x/Collections/createCollection.md) in the SDK reference.

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
    enable_dynamic_field=True,
    # highlight-next-line
    partition_key_field="color",
    num_partitions=16 # Number of partitions. Defaults to 16.
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
schema.add_field(field_name="color", datatype=DataType.VARCHAR, max_length=512)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

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
    // highlight-next-line
    .isPartitionKey(true)
    .build());
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
        data_type: DataType.VarChar,
        max_length: 512,
        // highlight-next-line
        is_partition_key: true
    }
]
```

After you have defined the fields, set up the index parameters.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
index_params = MilvusClient.prepare_index_params()

index_params.add_index(
    field_name="id",
    index_type="STL_SORT"
)

index_params.add_index(
    field_name="color",
    index_type="Trie"
)

index_params.add_index(
    field_name="vector",
    index_type="IVF_FLAT",
    metric_type="L2",
    params={"nlist": 1024}
)
```

```java
// 2.3 Prepare index parameters
IndexParam indexParamForVectorField = IndexParam.builder()
    .fieldName("vector")
    .indexType(IndexParam.IndexType.IVF_FLAT)
    .metricType(IndexParam.MetricType.IP)
    .extraParams(Map.of("nlist", 1024))
    .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForVectorField);
```

```javascript
// 2.2 Prepare index parameters
const index_params = [{
    field_name: "color",
    index_type: "Trie"
},{
    field_name: "id",
    index_type: "STL_SORT"
},{
    field_name: "vector",
    index_type: "IVF_FLAT",
    metric_type: "IP",
    params: { nlist: 1024}
}]
```

Finally, you can create a collection.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
client.create_collection(
    collection_name="test_collection",
    schema=schema,
    index_params=index_params
)
```

```java
// 2.4 Create a collection with schema and index parameters
CreateCollectionReq customizedSetupReq = CreateCollectionReq.builder()
    .collectionName("test_collection")
    .collectionSchema(schema)
    .indexParams(indexParams)          
    .build();

client.createCollection(customizedSetupReq);
```

```javascript
// 2.3 Create a collection with fields and index parameters
res = await client.createCollection({
    collection_name: "test_collection",
    fields: fields, 
    index_params: index_params,
})

console.log(res.error_code)

// Output
// 
// Success
//
```

## List partitions

Once a field of a collection is used as the partition key, Milvus creates the specified number of partitions and manages them on your behalf. Therefore, you cannot manipulate the partitions in this collection anymore.

The following snippet demonstrates that 64 partitions in a collection once one of its fields is used as the partition key. 

## Insert data

Once the collection is ready, start inserting data as follows:

### Prepare data

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
// 3. Insert randomly generated vectors
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
// 3. Insert randomly generated vectors 
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

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 1000}
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
```

## Use partition key

Once you have indexed and loaded the collection as well as inserted data, you can conduct a similarity search using the partition key. 

<div class="language-python">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md) in the SDK reference.

</div>

<div class="language-java">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/search.md) in the SDK reference.

</div>

<div class="language-javascript">

For more information on parameters, refer to [`search()`](https://milvus.io/api-reference/node/v2.4.x/Vector/search.md) in the SDK reference.

</div>

<div class="admonition note">

<p><b>notes</b></p>

<p>To conduct a similarity search using the partition key, you should include either of the following in the boolean expression of the search request:</p>
<ul>
<li><p><code>expr='&lt;partition_key&gt;=="xxxx"'</code></p></li>
<li><p><code>expr='&lt;partition_key&gt; in ["xxx", "xxx"]'</code></p></li>
</ul>
<p>Do replace <code>&lt;partition_key&gt;</code> with the name of the field that is designated as the partition key.</p>

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 4. Search with partition key
query_vectors = [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]]

res = client.search(
    collection_name="test_collection",
    data=query_vectors,
    filter="color == 'green'",
    search_params={"metric_type": "L2", "params": {"nprobe": 10}},
    output_fields=["id", "color_tag"],
    limit=3
)

print(res)

# Output
#
# [
#     [
#         {
#             "id": 970,
#             "distance": 0.5770174264907837,
#             "entity": {
#                 "id": 970,
#                 "color_tag": "green_9828"
#             }
#         },
#         {
#             "id": 115,
#             "distance": 0.6898155808448792,
#             "entity": {
#                 "id": 115,
#                 "color_tag": "green_4073"
#             }
#         },
#         {
#             "id": 899,
#             "distance": 0.7028976678848267,
#             "entity": {
#                 "id": 899,
#                 "color_tag": "green_9897"
#             }
#         }
#     ]
# ]
```

```java
// 4. Search with partition key
List<List<Float>> query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

SearchReq searchReq = SearchReq.builder()
    .collectionName("test_collection")
    .data(query_vectors)
    .filter("color == \"green\"")
    .topK(3)
    .build();

SearchResp searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));   

// Output:
// {"searchResults": [[
//     {
//         "distance": 1.0586997,
//         "id": 414,
//         "entity": {}
//     },
//     {
//         "distance": 0.981384,
//         "id": 293,
//         "entity": {}
//     },
//     {
//         "distance": 0.9548756,
//         "id": 325,
//         "entity": {}
//     }
// ]]}
```

```javascript
// 4. Search with partition key
const query_vectors = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "test_collection",
    data: query_vectors,
    filter: "color == 'green'",
    output_fields: ["color_tag"],
    limit: 3
})

console.log(res.results)

// Output
// 
// [
//   { score: 2.402090549468994, id: '135', color_tag: 'green_2694' },
//   { score: 2.3938629627227783, id: '326', color_tag: 'green_7104' },
//   { score: 2.3235254287719727, id: '801', color_tag: 'green_3162' }
// ]
// 
```

## Typical use cases

You can utilize the partition key feature to achieve better search performance and enable multi-tenancy. This can be done by assigning a tenant-specific value as the partition key field for each entity. When searching or querying the collection, you can filter entities by the tenant-specific value by including the partition key field in the boolean expression. This approach ensures data isolation by tenants and avoids scanning unnecessary partitions.

