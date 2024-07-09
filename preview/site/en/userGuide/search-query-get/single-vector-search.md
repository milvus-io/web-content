---
id: single-vector-search.md
order: 1
summary: This article describes how to search for vectors in a Milvus collection using a single query vector.
title: Single-Vector Search
---

# Single-Vector Search

Once you have inserted your data, the next step is to perform similarity searches on your collection in Milvus.

Milvus allows you to conduct two types of searches, depending on the number of vector fields in your collection:

- **Single-vector search**: If your collection has only one vector field, use the [`search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md) method to find the most similar entities. This method compares your query vector with the existing vectors in your collection and returns the IDs of the closest matches along with the distances between them. Optionally, it can also return the vector values and metadata of the results.
- **Hybrid search**: For collections with two or more vector fields, use the [`hybrid_search()`](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/hybrid_search.md) method. This method performs multiple Approximate Nearest Neighbor (ANN) search requests and combines the results to return the most relevant matches after reranking.

This guide focuses on how to perform a single-vector search in Milvus. For details on hybrid search, refer to [Hybrid search](https://milvus.io/docs/multi-vector-search.md).

## Overview

There are a variety of search types to meet different requirements:

- [Basic search](https://milvus.io/docs/single-vector-search.md#Basic-search): Includes single-vector search, bulk-vector search, partition search, and search with specified output fields.

- [Filtered search](https://milvus.io/docs/single-vector-search.md#Filtered-search): Applies filtering criteria based on scalar fields to refine search results.

- [Range search](https://milvus.io/docs/single-vector-search.md#Range-search): Finds vectors within a specific distance range from the query vector.

- [Grouping search](https://milvus.io/docs/single-vector-search.md#Grouping-search): Groups search results based on a specific field to ensure diversity in the results.

## Preparations

The code snippet below repurposes the existing code to establish a connection to Milvus and quickly set up a collection.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 1. Set up a Milvus client
client = MilvusClient(
    uri=CLUSTER_ENDPOINT,
    token=TOKEN 
)

# 2. Create a collection
client.create_collection(
    collection_name="quick_setup",
    dimension=5,
    metric_type="IP"
)

# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(1000):
    current_color = random.choice(colors)
    data.append({
        "id": i,
        "vector": [ random.uniform(-1, 1) for _ in range(5) ],
        "color": current_color,
        "color_tag": f"{current_color}_{str(random.randint(1000, 9999))}"
    })

res = client.insert(
    collection_name="quick_setup",
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

# 6.1 Create partitions 
client.create_partition(
    collection_name="quick_setup",
    partition_name="red"
)

client.create_partition(
    collection_name="quick_setup",
    partition_name="blue"
)

# 6.1 Insert data into partitions
red_data = [ {"id": i, "vector": [ random.uniform(-1, 1) for _ in range(5) ], "color": "red", "color_tag": f"red_{str(random.randint(1000, 9999))}" } for i in range(500) ]
blue_data = [ {"id": i, "vector": [ random.uniform(-1, 1) for _ in range(5) ], "color": "blue", "color_tag": f"blue_{str(random.randint(1000, 9999))}" } for i in range(500) ]

res = client.insert(
    collection_name="quick_setup",
    data=red_data,
    partition_name="red"
)

print(res)

# Output
#
# {
#     "insert_count": 500,
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
#         "(490 more items hidden)"
#     ]
# }

res = client.insert(
    collection_name="quick_setup",
    data=blue_data,
    partition_name="blue"
)

print(res)

# Output
#
# {
#     "insert_count": 500,
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
#         "(490 more items hidden)"
#     ]
# }
```

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Random;

import com.alibaba.fastjson.JSONObject;

import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp; 

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

GetLoadStateReq loadStateReq = GetLoadStateReq.builder()
    .collectionName("quick_setup")
    .build();

boolean state = client.getLoadState(loadStateReq);

System.out.println(state);

// Output:
// true

// 3. Insert randomly generated vectors into the collection
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JSONObject> data = new ArrayList<>();

for (int i=0; i<1000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
    data.add(row);
}

InsertReq insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .build();

InsertResp insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 1000}

// 6.1. Create a partition
CreatePartitionReq partitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("red")
    .build();

client.createPartition(partitionReq);

partitionReq = CreatePartitionReq.builder()
    .collectionName("quick_setup")
    .partitionName("blue")
    .build();

client.createPartition(partitionReq);

// 6.2 Insert data into the partition
data = new ArrayList<>();

for (int i=1000; i<1500; i++) {
    Random rand = new Random();
    String current_color = "red";
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
    data.add(row);
}     

insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("red")
    .build();

insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 500}

data = new ArrayList<>();

for (int i=1500; i<2000; i++) {
    Random rand = new Random();
    String current_color = "blue";
    JSONObject row = new JSONObject();
    row.put("id", Long.valueOf(i));
    row.put("vector", Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat()));
    row.put("color", current_color);
    row.put("color_tag", current_color + "_" + String.valueOf(rand.nextInt(8999) + 1000));
    data.add(row);
}

insertReq = InsertReq.builder()
    .collectionName("quick_setup")
    .data(data)
    .partitionName("blue")
    .build();

insertResp = client.insert(insertReq);

System.out.println(JSONObject.toJSON(insertResp));

// Output:
// {"insertCnt": 500}
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

// 3. Insert randomly generated vectors
const colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for (let i = 0; i < 1000; i++) {
    current_color = colors[Math.floor(Math.random() * colors.length)]
    data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: current_color,
        color_tag: `${current_color}_${Math.floor(Math.random() * 8999) + 1000}`
    })
}

var res = await client.insert({
    collection_name: "quick_setup",
    data: data
})

console.log(res.insert_cnt)

// Output
// 
// 1000
// 

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "red"
})

await client.createPartition({
    collection_name: "quick_setup",
    partition_name: "blue"
})

// 6.1 Insert data into partitions
var red_data = []
var blue_data = []

for (let i = 1000; i < 1500; i++) {
    red_data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: "red",
        color_tag: `red_${Math.floor(Math.random() * 8999) + 1000}`
    })
}

for (let i = 1500; i < 2000; i++) {
    blue_data.push({
        id: i,
        vector: [Math.random(), Math.random(), Math.random(), Math.random(), Math.random()],
        color: "blue",
        color_tag: `blue_${Math.floor(Math.random() * 8999) + 1000}`
    })
}

res = await client.insert({
    collection_name: "quick_setup",
    data: red_data,
    partition_name: "red"
})

console.log(res.insert_cnt)

// Output
// 
// 500
// 

res = await client.insert({
    collection_name: "quick_setup",
    data: blue_data,
    partition_name: "blue"
})

console.log(res.insert_cnt)

// Output
// 
// 500
// 
```

## Basic search

When sending a `search` request, you can provide one or more vector values representing your query embeddings and a `limit` value indicating the number of results to return.

Depending on your data and your query vector, you may get fewer than `limit` results. This happens when `limit` is larger than the number of possible matching vectors for your query.

### Single-vector search

Single-vector search is the simplest form of `search` operations in Milvus, designed to find the most similar vectors to a given query vector.

To perform a single-vector search, specify the target collection name, the query vector, and the desired number of results (`limit`). This operation returns a result set comprising the most similar vectors, their IDs, and distances from the query vector.

Here is an example of searching for the top 5 entities that are most similar to the query vector:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# Single vector search
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    # Replace with your query vector
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}} # Search parameters
)

# Convert the output to a formatted JSON string
result = json.dumps(res, indent=4)
print(result)
```

```java
// 4. Single vector search
List<List<Float>> query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

SearchReq searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .topK(3) // The number of results to return
    .build();

SearchResp searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
// 4. Single vector search
var query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 3, // The number of results to return
})

console.log(res.results)
```

<table class="language-python">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collection_name</code></td>
      <td>The name of an existing collection.</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>A list of vector embeddings.<br>Milvus searches for the most similar vector embeddings to the specified ones.</td>
    </tr>
    <tr>
      <td><code>limit</code></td>
      <td>The total number of entities to return.<br>You can use this parameter in combination with <strong>offset</strong> in <strong>param</strong> to enable pagination.<br>The sum of this value and <strong>offset</strong> in <strong>param</strong> should be less than 16,384.</td>
    </tr>
    <tr>
      <td><code>search_params</code></td>
      <td>The parameter settings specific to this operation.<br><ul><li><code>metric_type</code>: The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. Possible values are <strong>L2</strong>, <strong>IP</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</li><li><code>params</code>: Additional parameters. For details, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/search.md">search()</a>.</li></ul></td>
    </tr>
  </tbody>
</table>

<table class="language-java">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collectionName</code></td>
      <td>The name of an existing collection.</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>A list of vector embeddings.<br>Milvus searches for the most similar vector embeddings to the specified ones.</td>
    </tr>
    <tr>
      <td><code>topK</code></td>
      <td>The number of records to return in the search result. This parameter uses the same syntax as the <strong>limit</strong> parameter, so you should only set one of them.<br>You can use this parameter in combination with <strong>offset</strong> in <strong>param</strong> to enable pagination.<br>The sum of this value and <strong>offset</strong> in <strong>param</strong> should be less than 16,384.</td>
    </tr>
  </tbody>
</table>

<table class="language-javascript">
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>collection_name</code></td>
      <td>The name of an existing collection.</td>
    </tr>
    <tr>
      <td><code>data</code></td>
      <td>A list of vector embeddings.<br>Milvus searches for the most similar vector embeddings to the specified ones.</td>
    </tr>
    <tr>
      <td><code>limit</code></td>
      <td>The total number of entities to return.<br>You can use this parameter in combination with <strong>offset</strong> in <strong>param</strong> to enable pagination.<br>The sum of this value and <strong>offset</strong> in <strong>param</strong> should be less than 16,384.</td>
    </tr>
  </tbody>
</table>

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 0,
            "distance": 1.4093276262283325,
            "entity": {}
        },
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {}
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {}
        },
        {
            "id": 5,
            "distance": 0.7972343564033508,
            "entity": {}
        },
        {
            "id": 2,
            "distance": 0.5928734540939331,
            "entity": {}
        }
    ]
]
```

```java
{"searchResults": [[
    {
        "score": 1.263043,
        "fields": {
            "vector": [
                0.9533119,
                0.02538395,
                0.76714665,
                0.35481733,
                0.9845762
            ],
            "id": 740
        }
    },
    {
        "score": 1.2377806,
        "fields": {
            "vector": [
                0.7411156,
                0.08687937,
                0.8254139,
                0.08370924,
                0.99095553
            ],
            "id": 640
        }
    },
    {
        "score": 1.1869997,
        "fields": {
            "vector": [
                0.87928146,
                0.05324632,
                0.6312755,
                0.28005534,
                0.9542448
            ],
            "id": 455
        }
    }
]]}
```

```javascript
[
  { score: 1.7463608980178833, id: '854' },
  { score: 1.744946002960205, id: '425' },
  { score: 1.7258622646331787, id: '718' }
]
```

The output showcases the top 5 neighbors nearest to your query vector, including their unique IDs and the calculated distances.

### Bulk-vector search

A bulk-vector search extends the [single-vector search](https://milvus.io/docs/single-vector-search.md#Single-Vector-Search) concept by allowing multiple query vectors to be searched in a single request. This type of search is ideal for scenarios where you need to find similar vectors for a set of query vectors, significantly reducing the time and computational resources required.

In a bulk-vector search, you can include several query vectors in the `data` field. The system processes these vectors in parallel, returning a separate result set for each query vector, each set containing the closest matches found within the collection.

Here is an example of searching for two distinct sets of the most similar entities from two query vectors:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# Bulk-vector search
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[
        [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104],
        [0.3172005263489739, 0.9719044792798428, -0.36981146090600725, -0.4860894583077995, 0.95791889146345]
    ], # Replace with your query vectors
    limit=2, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}} # Search parameters
)

result = json.dumps(res, indent=4)
print(result)
```

```java
// 5. Batch vector search
query_vectors = Arrays.asList(
    Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f),
    Arrays.asList(0.19886812562848388f, 0.06023560599112088f, 0.6976963061752597f, 0.2614474506242501f, 0.838729485096104f)
);

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .topK(2)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
// 5. Batch vector search
var query_vectors = [
    [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592],
    [0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]
]

res = await client.search({
    collection_name: "quick_setup",
    data: query_vectors,
    limit: 2,
})

console.log(res.results)
```

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 1,
            "distance": 1.3017789125442505,
            "entity": {}
        },
        {
            "id": 7,
            "distance": 1.2419954538345337,
            "entity": {}
        }
    ], # Result set 1
    [
        {
            "id": 3,
            "distance": 2.3358664512634277,
            "entity": {}
        },
        {
            "id": 8,
            "distance": 0.5642921924591064,
            "entity": {}
        }
    ] # Result set 2
]
```

```java
// Two sets of vectors are returned as expected

{"searchResults": [
    [
        {
            "score": 1.263043,
            "fields": {
                "vector": [
                    0.9533119,
                    0.02538395,
                    0.76714665,
                    0.35481733,
                    0.9845762
                ],
                "id": 740
            }
        },
        {
            "score": 1.2377806,
            "fields": {
                "vector": [
                    0.7411156,
                    0.08687937,
                    0.8254139,
                    0.08370924,
                    0.99095553
                ],
                "id": 640
            }
        }
    ],
    [
        {
            "score": 1.8654699,
            "fields": {
                "vector": [
                    0.4671427,
                    0.8378432,
                    0.98844475,
                    0.82763994,
                    0.9729997
                ],
                "id": 638
            }
        },
        {
            "score": 1.8581753,
            "fields": {
                "vector": [
                    0.735541,
                    0.60140246,
                    0.86730254,
                    0.93152493,
                    0.98603314
                ],
                "id": 855
            }
        }
    ]
]}
```

```javascript
[
  [
    { score: 2.3590476512908936, id: '854' },
    { score: 2.2896690368652344, id: '59' }
  [
    { score: 2.664059638977051, id: '59' },
    { score: 2.59483003616333, id: '854' }
  ]
]
```

The results include two sets of nearest neighbors, one for each query vector, showcasing the efficiency of bulk-vector searches in handling multiple query vectors at once.

### Partition search

Partition search narrows the scope of your search to a specific subset or partition of your collection. This is particularly useful for organized datasets where data is segmented into logical or categorical divisions, allowing for faster search operations by reducing the volume of data to scan.

To conduct a partition search, simply include the name of the target partition in `partition_names` of your search request. This specifies that the `search` operation only considers vectors within the specified partition.

Here is an example of searching for entities in `red`:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# 6.2 Search within a partition
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP", "params": {"level": 1}},
    partition_names=["red"]
)

print(res)
```

```java
// 6.3 Search within partitions
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .partitionNames(Arrays.asList("red"))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
// 6.2 Search within partitions
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    partition_names: ["red"],
    limit: 5,
})

console.log(res.results)
```

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 16,
            "distance": 0.9200337529182434,
            "entity": {}
        },
        {
            "id": 14,
            "distance": 0.4505271911621094,
            "entity": {}
        },
        {
            "id": 15,
            "distance": 0.19924677908420563,
            "entity": {}
        },
        {
            "id": 17,
            "distance": 0.0075093843042850494,
            "entity": {}
        },
        {
            "id": 13,
            "distance": -0.14609718322753906,
            "entity": {}
        }
    ]
]
```

```java
{"searchResults": [
    [
        {
            "score": 1.1677284,
            "fields": {
                "vector": [
                    0.9986977,
                    0.17964739,
                    0.49086612,
                    0.23155272,
                    0.98438674
                ],
                "id": 1435
            }
        },
        {
            "score": 1.1476475,
            "fields": {
                "vector": [
                    0.6952647,
                    0.13417172,
                    0.91045254,
                    0.119336545,
                    0.9338931
                ],
                "id": 1291
            }
        },
        {
            "score": 1.0969629,
            "fields": {
                "vector": [
                    0.3363194,
                    0.028906643,
                    0.6675426,
                    0.030419827,
                    0.9735209
                ],
                "id": 1168
            }
        },
        {
            "score": 1.0741848,
            "fields": {
                "vector": [
                    0.9980543,
                    0.36063594,
                    0.66427994,
                    0.17359233,
                    0.94954175
                ],
                "id": 1164
            }
        },
        {
            "score": 1.0584627,
            "fields": {
                "vector": [
                    0.7187005,
                    0.12674773,
                    0.987718,
                    0.3110777,
                    0.86093885
                ],
                "id": 1085
            }
        }
    ],
    [
        {
            "score": 1.8030131,
            "fields": {
                "vector": [
                    0.59726167,
                    0.7054632,
                    0.9573117,
                    0.94529945,
                    0.8664103
                ],
                "id": 1203
            }
        },
        {
            "score": 1.7728865,
            "fields": {
                "vector": [
                    0.6672442,
                    0.60448086,
                    0.9325822,
                    0.80272985,
                    0.8861626
                ],
                "id": 1448
            }
        },
        {
            "score": 1.7536311,
            "fields": {
                "vector": [
                    0.59663296,
                    0.77831805,
                    0.8578314,
                    0.88818026,
                    0.9030075
                ],
                "id": 1010
            }
        },
        {
            "score": 1.7520742,
            "fields": {
                "vector": [
                    0.854198,
                    0.72294194,
                    0.9245805,
                    0.86126596,
                    0.7969224
                ],
                "id": 1219
            }
        },
        {
            "score": 1.7452049,
            "fields": {
                "vector": [
                    0.96419,
                    0.943535,
                    0.87611496,
                    0.8268136,
                    0.79786557
                ],
                "id": 1149
            }
        }
    ]
]}
```

```javascript
[
  { score: 3.0258803367614746, id: '1201' },
  { score: 3.004319190979004, id: '1458' },
  { score: 2.880324363708496, id: '1187' },
  { score: 2.8246407508850098, id: '1347' },
  { score: 2.797295093536377, id: '1406' }
]
```

Then, search for entities in `blue`:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
res = client.search(
    collection_name="quick_setup",
    data=[query_vector],
    limit=5,
    search_params={"metric_type": "IP", "params": {"level": 1}},
    partition_names=["blue"]
)

print(res)
```

```java
searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .partitionNames(Arrays.asList("blue"))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    partition_names: ["blue"],
    limit: 5,
})

console.log(res.results)
```

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 20,
            "distance": 2.363696813583374,
            "entity": {}
        },
        {
            "id": 26,
            "distance": 1.0665391683578491,
            "entity": {}
        },
        {
            "id": 23,
            "distance": 1.066049575805664,
            "entity": {}
        },
        {
            "id": 29,
            "distance": 0.8353596925735474,
            "entity": {}
        },
        {
            "id": 28,
            "distance": 0.7484277486801147,
            "entity": {}
        }
    ]
]
```

```java
{"searchResults": [
    [
        {
            "score": 1.1628494,
            "fields": {
                "vector": [
                    0.7442872,
                    0.046407282,
                    0.71031404,
                    0.3544345,
                    0.9819991
                ],
                "id": 1992
            }
        },
        {
            "score": 1.1470042,
            "fields": {
                "vector": [
                    0.5505825,
                    0.04367262,
                    0.9985836,
                    0.18922359,
                    0.93255126
                ],
                "id": 1977
            }
        },
        {
            "score": 1.1450152,
            "fields": {
                "vector": [
                    0.89994013,
                    0.052991092,
                    0.8645576,
                    0.6406729,
                    0.95679337
                ],
                "id": 1573
            }
        },
        {
            "score": 1.1439825,
            "fields": {
                "vector": [
                    0.9253267,
                    0.15890503,
                    0.7999555,
                    0.19126713,
                    0.898583
                ],
                "id": 1552
            }
        },
        {
            "score": 1.1029172,
            "fields": {
                "vector": [
                    0.95661926,
                    0.18777144,
                    0.38115507,
                    0.14323527,
                    0.93137646
                ],
                "id": 1823
            }
        }
    ],
    [
        {
            "score": 1.8005109,
            "fields": {
                "vector": [
                    0.5953582,
                    0.7794224,
                    0.9388869,
                    0.79825854,
                    0.9197286
                ],
                "id": 1888
            }
        },
        {
            "score": 1.7714822,
            "fields": {
                "vector": [
                    0.56805456,
                    0.89422905,
                    0.88187534,
                    0.914824,
                    0.8944365
                ],
                "id": 1648
            }
        },
        {
            "score": 1.7561421,
            "fields": {
                "vector": [
                    0.83421993,
                    0.39865613,
                    0.92319834,
                    0.42695504,
                    0.96633124
                ],
                "id": 1688
            }
        },
        {
            "score": 1.7553532,
            "fields": {
                "vector": [
                    0.89994013,
                    0.052991092,
                    0.8645576,
                    0.6406729,
                    0.95679337
                ],
                "id": 1573
            }
        },
        {
            "score": 1.7543385,
            "fields": {
                "vector": [
                    0.16542226,
                    0.38248396,
                    0.9888778,
                    0.80913955,
                    0.9501492
                ],
                "id": 1544
            }
        }
    ]
]}
```

```javascript
[
  { score: 2.8421106338500977, id: '1745' },
  { score: 2.838560104370117, id: '1782' },
  { score: 2.8134000301361084, id: '1511' },
  { score: 2.718268871307373, id: '1679' },
  { score: 2.7014894485473633, id: '1597' }
]
```

The data in `red` differs from that in `blue`. Therefore, the search results will be constrained to the specified partition, reflecting the unique characteristics and data distribution of that subset.

### Search with output fields

Search with output fields allows you to specify which attributes or fields of the matched vectors should be included in the search results.

You can specify `output_fields` in a request to return results with specific fields.

Here is an example of returning results with `color` attribute values:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# Search with output fields
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    output_fields=["color"] # Output fields to return
)

result = json.dumps(res, indent=4)
print(result)
```

```java
// 7. Search with output fields
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color"))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
// 7. Search with output fields
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    output_fields: ["color"],
})

console.log(res.results)
```

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 0,
            "distance": 1.4093276262283325,
            "entity": {
                "color": "pink_8682"
            }
        },
        {
            "id": 16,
            "distance": 1.0159327983856201,
            "entity": {
                "color": "yellow_1496"
            }
        },
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {
                "color": "red_4794"
            }
        },
        {
            "id": 14,
            "distance": 0.9803846478462219,
            "entity": {
                "color": "green_2899"
            }
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {
                "color": "red_7025"
            }
        }
    ]
]
```

```java
{"searchResults": [
    [
        {
            "score": 1.263043,
            "fields": {}
        },
        {
            "score": 1.2377806,
            "fields": {}
        },
        {
            "score": 1.1869997,
            "fields": {}
        },
        {
            "score": 1.1748955,
            "fields": {}
        },
        {
            "score": 1.1720343,
            "fields": {}
        }
    ]
]}
```

```javascript

[
  { score: 3.036271572113037, id: '59', color: 'orange' },
  { score: 3.0267879962921143, id: '1745', color: 'blue' },
  { score: 3.0069446563720703, id: '854', color: 'black' },
  { score: 2.984386682510376, id: '718', color: 'black' },
  { score: 2.916019916534424, id: '425', color: 'purple' }
]
```

Alongside the nearest neighbors, the search results will include the specified field `color`, providing a richer set of information for each matching vector.

## Filtered search

Filtered search applies scalar filters to vector searches, allowing you to refine the search results based on specific criteria. You can find more about filter expressions in [Boolean Expression Rules](https://milvus.io/docs/boolean.md) and examples in [Get & Scalar Query](https://milvus.io/docs/get-and-scalar-query.md).

### Use the `like` operator

The `like` operator enhances string searches by evaluating patterns including prefixes, infixes, and suffixes:

- __Prefix matching__: To find values starting with a specific prefix, use the syntax `'like "prefix%"'`.
- __Infix matching__: To find values containing a specific sequence of characters anywhere within the string, use the syntax `'like "%infix%"'`.
- __Suffix matching__: To find values ending with a specific suffix, use the syntax `'like "%suffix"'`.

For single-character matching, underscore (`_`) acts as a wildcard for one character, e.g., `'like "y_llow"'`.

### Special characters in search strings

If you want to search for a string that contains special characters like underscores (`_`) or percent signs (`%`), which are normally used as wildcards in search patterns (`_` for any single character and `%` for any sequence of characters), you must escape these characters to treat them as literal characters. Use a backslash (`\`) to escape special characters, and remember to escape the backslash itself. For instance:

- To search for a literal underscore, use `\\_`.
- To search for a literal percent sign, use `\\%`.

So, if you need to search for the text `"_version_"`, your query should be formatted as `'like "\\_version\\_"'` to ensure the underscores are treated as part of the search term and not as wildcards.

Filter results whose __color__ is prefixed with __red__:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# Search with filter
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    output_fields=["color"], # Output fields to return
    filter='color like "red%"'
)

result = json.dumps(res, indent=4)
print(result)
```

```java
// 8. Filtered search
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color_tag"))
    .filter("color_tag like \"red%\"")
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
// 8. Filtered search
// 8.1 Filter with "like" operator and prefix wildcard
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    filters: "color_tag like \"red%\"",
    output_fields: ["color_tag"]
})

console.log(res.results)
```

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {
                "color": "red_4794"
            }
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {
                "color": "red_7025"
            }
        },
        {
            "id": 6,
            "distance": -0.4113418459892273,
            "entity": {
                "color": "red_9392"
            }
        }
    ]
]
```

```java
{"searchResults": [
    [
        {
            "score": 1.1869997,
            "fields": {"color_tag": "red_3026"}
        },
        {
            "score": 1.1677284,
            "fields": {"color_tag": "red_9030"}
        },
        {
            "score": 1.1476475,
            "fields": {"color_tag": "red_3744"}
        },
        {
            "score": 1.0969629,
            "fields": {"color_tag": "red_4168"}
        },
        {
            "score": 1.0741848,
            "fields": {"color_tag": "red_9678"}
        }
    ]
]}
```

```javascript
[
  { score: 2.5080761909484863, id: '1201', color_tag: 'red_8904' },
  { score: 2.491129159927368, id: '425', color_tag: 'purple_8212' },
  { score: 2.4889798164367676, id: '1458', color_tag: 'red_6891' },
  { score: 2.42964243888855, id: '724', color_tag: 'black_9885' },
  { score: 2.4004223346710205, id: '854', color_tag: 'black_5990' }
]
```

Filter results whose __color__ contains the letters __ll__ anywhere within the string:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# Infix match on color field
res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=5, # Max. number of search results to return
    search_params={"metric_type": "IP", "params": {}}, # Search parameters
    output_fields=["color"], # Output fields to return
    filter='color like "%ll%"' # Filter on color field, infix match on "ll"
)

result = json.dumps(res, indent=4)
print(result)
```

```java
// 8. Filtered search
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color_tag"))
    .filter("color like \"%ll%\"")
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
// 8. Filtered search
// 8.1 Filter with "like" operator and prefix wildcard
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    filters: "color_tag like \"%ll%\"",
    output_fields: ["color_tag"]
})

console.log(res.results)
```

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 5,
            "distance": 0.7972343564033508,
            "entity": {
                "color": "yellow_4222"
            }
        }
    ]
]
```

```java
{"searchResults": [
    [
        {
            "score": 1.1869997,
            "fields": {"color_tag": "yellow_4222"}
        }
    ]
]}
```

```javascript
[
  { score: 2.5080761909484863, id: '1201', color_tag: 'yellow_4222' }
]
```

## Range search

Range search allows you to find vectors that lie within a specified distance range from your query vector.

By setting `radius` and optionally `range_filter`, you can adjust the breadth of your search to include vectors that are somewhat similar to the query vector, providing a more comprehensive view of potential matches.

- `radius`: Defines the outer boundary of your search space. Only vectors that are within this distance from the query vector are considered potential matches.

- `range_filter`: While `radius` sets the outer limit of the search, `range_filter` can be optionally used to define an inner boundary, creating a distance range within which vectors must fall to be considered matches.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
# Conduct a range search
search_params = {
    "metric_type": "IP",
    "params": {
        "radius": 0.8, # Radius of the search circle
        "range_filter": 1.0 # Range filter to filter out vectors that are not within the search circle
    }
}

res = client.search(
    collection_name="test_collection", # Replace with the actual name of your collection
    data=[[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]],
    limit=3, # Max. number of search results to return
    search_params=search_params, # Search parameters
    output_fields=["color"], # Output fields to return
)

result = json.dumps(res, indent=4)
print(result)
```

```java
// 9. Range search
query_vectors = Arrays.asList(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f));

searchReq = SearchReq.builder()
    .collectionName("quick_setup")
    .data(query_vectors)
    .outputFields(Arrays.asList("color_tag"))
    .searchParams(Map.of("radius", 0.1, "range", 1.0))
    .topK(5)
    .build();

searchResp = client.search(searchReq);

System.out.println(JSONObject.toJSON(searchResp));
```

```javascript
// 9. Range search
query_vector = [0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]

res = await client.search({
    collection_name: "quick_setup",
    data: [query_vector],
    limit: 5,
    params: {
        radius: 0.1,
        range: 1.0
    },
    output_fields: ["color_tag"]
})

console.log(res.results)
```

The output is similar to the following:

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
    <a href="#javascript">Node.js</a>
</div>

```python
[
    [
        {
            "id": 4,
            "distance": 0.9902134537696838,
            "entity": {
                "color": "red_4794"
            }
        },
        {
            "id": 14,
            "distance": 0.9803846478462219,
            "entity": {
                "color": "green_2899"
            }
        },
        {
            "id": 1,
            "distance": 0.8519943356513977,
            "entity": {
                "color": "red_7025"
            }
        }
    ]
]
```

```java
{"searchResults": [
    [
        {
            "score": 1.263043,
            "fields": {"color_tag": "green_2052"}
        },
        {
            "score": 1.2377806,
            "fields": {"color_tag": "purple_3709"}
        },
        {
            "score": 1.1869997,
            "fields": {"color_tag": "red_3026"}
        },
        {
            "score": 1.1748955,
            "fields": {"color_tag": "black_1646"}
        },
        {
            "score": 1.1720343,
            "fields": {"color_tag": "green_4853"}
        }
    ]
]}
```

```javascript
[
  { score: 2.3387961387634277, id: '718', color_tag: 'black_7154' },
  { score: 2.3352415561676025, id: '1745', color_tag: 'blue_8741' },
  { score: 2.290485382080078, id: '1408', color_tag: 'red_2324' },
  { score: 2.285870313644409, id: '854', color_tag: 'black_5990' },
  { score: 2.2593345642089844, id: '1309', color_tag: 'red_8458' }
]
```

You will observe that all the entities returned have a distance that falls within the range of 0.8 to 1.0 from the query vector.

The parameter settings for `radius` and `range_filter` vary with the metric type in use.

|  __Metric Type__ |  __Charactericstics__                             |  __Range Search Settings__                                                                               |
| ---------------- | ------------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
|  `L2`            |  Smaller L2 distances indicate higher similarity. |  To exclude the closest vectors from results, ensure that:<br/> `range_filter` <= distance < `radius` |
|  `IP`            |  Larger IP distances indicate higher similarity.  |  To exclude the closest vectors from results, ensure that:<br/> `radius` < distance <= `range_filter` |
|  `COSINE`            |  Larger cosine value indicates higher similarity.  |  To exclude the closest vectors from results, ensure that:<br/> `radius` < distance <= `range_filter` |
|  `JACCARD`            |  Smaller Jaccard distances indicate higher similarity. |  To exclude the closest vectors from results, ensure that:<br/> `range_filter` <= distance < `radius` |
|  `HAMMING`            |  Smaller Hamming distances indicate higher similarity. |  To exclude the closest vectors from results, ensure that:<br/> `range_filter` <= distance < `radius` |

To learn more about distance metric types, refer to [Similarity Metrics](metric.md).

## Grouping search

In Milvus, grouping search by a specific field can avoid redundancy of the same field item in the results. You can get a varied set of results for the specific field. 

Consider a collection of documents, each document splits into various passages. Each passage is represented by one vector embedding and belongs to one document. To find relevant documents instead of similar passages, you can include the `group_by_field` argument in the `search()` opeartion to group results by the document ID. This helps return the most relevant and unique documents, rather than separate passages from the same document.

Here is the example code to group search results by field:

```python
# Connect to Milvus
client = MilvusClient(uri='http://localhost:19530') # Milvus server address

# Load data into collection
client.load_collection("group_search") # Collection name

# Group search results
res = client.search(
    collection_name="group_search", # Collection name
    data=[[0.14529211512077012, 0.9147257273453546, 0.7965055218724449, 0.7009258593102812, 0.5605206522382088]], # Query vector
    search_params={
    "metric_type": "L2",
    "params": {"nprobe": 10},
    }, # Search parameters
    limit=10, # Max. number of search results to return
    group_by_field="doc_id", # Group results by document ID
    output_fields=["doc_id", "passage_id"]
)

# Retrieve the values in the `doc_id` column
doc_ids = [result['entity']['doc_id'] for result in res[0]]

print(doc_ids)
```

The output is similar to the following:

```python
[5, 10, 1, 7, 9, 6, 3, 4, 8, 2]
```

In the given output, it can be observed that the returned entities do not contain any duplicate `doc_id` values.

For comparison, let's comment out the `group_by_field` and conduct a regular search:

```python
# Connect to Milvus
client = MilvusClient(uri='http://localhost:19530') # Milvus server address

# Load data into collection
client.load_collection("group_search") # Collection name

# Search without `group_by_field`
res = client.search(
    collection_name="group_search", # Collection name
    data=query_passage_vector, # Replace with your query vector
    search_params={
    "metric_type": "L2",
    "params": {"nprobe": 10},
    }, # Search parameters
    limit=10, # Max. number of search results to return
    # group_by_field="doc_id", # Group results by document ID
    output_fields=["doc_id", "passage_id"]
)

# Retrieve the values in the `doc_id` column
doc_ids = [result['entity']['doc_id'] for result in res[0]]

print(doc_ids)
```

The output is similar to the following:

```python
[1, 10, 3, 10, 1, 9, 4, 4, 8, 6]
```

In the given output, it can be observed that the returned entities contain duplicate `doc_id` values.

__Limitations__

- __Indexing__: This grouping feature works only for collections that are indexed with the __HNSW__, __IVF_FLAT__, or __FLAT__ type. For more information, refer to [In-memory Index](https://milvus.io/docs/index.md#HNSW).

- __Vector__: Currently, grouping search does not support a vector field of the __BINARY_VECTOR__ type. For more information on data types, refer to [Supported data types](https://milvus.io/docs/schema.md#Supported-data-types).

- __Field__: Currently, grouping search allows only for a single column. You cannot specify multiple field names in the `group_by_field` config.  Additionally, grouping search is incompatible with data types of JSON, FLOAT, DOUBLE, ARRAY, or vector fields.

- __Performance Impact__: Be mindful that performance degrades with increasing query vector counts. Using a cluster with 2 CPU cores and 8 GB of memory as an example, the execution time for grouping search increases proportionally with the number of input query vectors.

- __Functionality__: Currently, grouping search is not supported by [range search](https://milvus.io/docs/single-vector-search.md#Range-search), [search iterators](https://milvus.io/docs/with-iterators.md#Search-with-iterator), or [hybrid search](multi-vector-search.md).

## Search parameters

In the above searches except the range search, the default search parameters apply. In normal cases, you do not need to manually set search parameters. 

```python
# In normal cases, you do not need to set search parameters manually
# Except for range searches.
search_parameters = {
    'metric_type': 'L2',
    'params': {
        'nprobe': 10,
        'level': 1，
        'radius': 1.0
        'range_filter': 0.8
    }
}
```

The following table lists all possible settings in the search parameters.

|  __Parameter Name__    |  __Parameter Description__                                                                                                                                      |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|  `metric_type`         |  How to measure similarity between vector embeddings.<br/> Possible values are `IP`, `L2`, and `COSINE`, and defaults to that of the loaded index file.      |
|  `params.nprobe`       |  Number of units to query during the search.<br/> The value falls in the range [1, nlist<sub>[1]</sub>].                                                     |
|  `params.level`        |  Search precision level.<br/> Possible values are `1`, `2`, and `3`, and defaults to `1`. Higher values yield more accurate results but slower performance.  |
|  `params.radius`       |  Minimum similarity between the query vector and candidate vectors.<br/> The value falls in the range [1, nlist<sub>[1]</sub>].                              |
|  `params.range_filter` |  A similarity range, optionally refining the search for vectors that fall in the range.<br/> The value falls in the range [top-K<sub>[2]</sub>, ∞].          |

<div class="admonition note">

<p><strong>notes</strong></p>

<p>[1] Number of cluster units after indexing. When indexing a collection, Milvus sub-divides the vector data into multiple cluster units, the number of which varies with the actual index settings.</p>
<p>[2] Number of entities to return in a search.</p>

</div>

