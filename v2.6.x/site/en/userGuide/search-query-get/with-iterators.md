---
id: with-iterators.md
order: 4
summary: Milvus provides search and query iterators for iterating results with a large volume of entities.
title: With Iterators
---

# With Iterators

Milvus provides search and query iterators for iterating through a large volume of entities. Since Milvus limits TopK to 16384, users can use iterators to return large numbers or even whole entities in a collection in batch mode.

## Overview

Iterators are efficient tool for scanning a whole collection or iterating through a large volume of entities by specifying primary key values or a filter expression. Compared to a search or query call with __offset__ and __limit__ parameters, using iterators is more efficient and scalable.

### Benefits of using iterators

- __Simplicity__: Eliminates the complex __offset__ and __limit__ settings.

- __Efficiency__: Provides scalable data retrieval by fetching only the data in need.

- __Consistency__: Ensures a consistent dataset size with boolean filters.

<div class="admonition note">

<p><b>notes</b></p>

<ul>

<li>This feature is available for Milvus 2.3.x or later.</li>

</ul>

</div>

## Preparations

The following preparation step connects to Milvus and inserts randomly generated entities into a collection.

### Step 1: Create a collection

<div class="language-python">

Use [`MilvusClient`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Client/MilvusClient.md) to connect to the Milvus server and [`create_collection()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Collections/create_collection.md) to create a collection.

</div>

<div class="language-java">

Use [`MilvusClientV2`](https://milvus.io/api-reference/java/v2.4.x/v2/Client/MilvusClientV2.md) to connect to the Milvus server and [`createCollection()`](https://milvus.io/api-reference/java/v2.4.x/v2/Collections/createCollection.md) to create a collection.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
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
)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.orm.iterator.QueryIterator;
import io.milvus.orm.iterator.SearchIterator;
import io.milvus.response.QueryResultsWrapper;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.vector.request.*;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.InsertResp;
import io.milvus.v2.service.vector.response.QueryResp;

import java.util.*;

String CLUSTER_ENDPOINT = "http://localhost:19530";

// 1. Connect to Milvus server
ConnectParam connectParam = ConnectParam.newBuilder()
        .withUri(CLUSTER_ENDPOINT)
        .build();

MilvusServiceClient client  = new MilvusServiceClient(connectParam);

// 2. Create a collection
CreateCollectionReq quickSetupReq = CreateCollectionReq.builder()
        .collectionName("quick_setup")
        .dimension(5)
        .build();
client.createCollection(quickSetupReq);
```

### Step 2: Insert randomly generated entities

<div class="language-python">

Use [`insert()`](https://milvus.io/api-reference/pymilvus/v2.4.x/MilvusClient/Vector/insert.md) to insert entities into the collection.

</div>

<div class="language-java">

Use [`insert()`](https://milvus.io/api-reference/java/v2.4.x/v2/Vector/insert.md) to insert entities into the collection.

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
</div>

```python
# 3. Insert randomly generated vectors 
colors = ["green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey"]
data = []

for i in range(10000):
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

# Output
#
# {
#     "id": 0,
#     "vector": [
#         -0.5705990742218152,
#         0.39844925120642083,
#         -0.8791287928610869,
#         0.024163154953680932,
#         0.6837669917169638
#     ],
#     "color": "purple",
#     "tag": 7774,
#     "color_tag": "purple_7774"
# }

res = client.insert(
    collection_name="quick_setup",
    data=data,
)

print(res)

# Output
#
# {
#     "insert_count": 10000,
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
#         "(9990 more items hidden)"
#     ]
# }
```

```java
// 3. Insert randomly generated vectors into the collection
List<String> colors = Arrays.asList("green", "blue", "yellow", "red", "black", "white", "purple", "pink", "orange", "brown", "grey");
List<JsonObject> data = new ArrayList<>();
Gson gson = new Gson();
for (int i=0; i<10000; i++) {
    Random rand = new Random();
    String current_color = colors.get(rand.nextInt(colors.size()-1));
    JsonObject row = new JsonObject();
    row.addProperty("id", (long) i);
    row.add("vector", gson.toJsonTree(Arrays.asList(rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat(), rand.nextFloat())));
    row.addProperty("color_tag", current_color + "_" + (rand.nextInt(8999) + 1000));
    data.add(row);
}

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("quick_setup")
        .data(data)
        .build());
System.out.println(insertR.getInsertCnt());

// Output
// 10000
```

## Search with iterator

Iterators make similarity searches more scalable.

<div class="language-python">

To search with an iterator, call the [search_iterator()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search_iterator.md) method:

</div>

<div class="language-java">

To search with an iterator, call the [searchIterator()](https://milvus.io/api-reference/java/v2.4.x/v1/QuerySearch/searchIterator.md) method:

</div>

1. Initialize the search iterator to define the search parameters and output fields.

1. Use the __next()__ method within a loop to paginate through the search results.

    - If the method returns an empty array, the loop ends, and no more pages are available.

    - All results carry the specified output fields.

1. Manually call the __close()__ method to close the iterator once all data has been retrieved.

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
</div>

```python
from pymilvus import Collection,connections

# 4. Search with iterator
connections.connect(host="127.0.0.1", port=19530)
collection = Collection("quick_setup")

query_vectors = [[0.3580376395471989, -0.6023495712049978, 0.18414012509913835, -0.26286205330961354, 0.9029438446296592]]
search_params = {
    "metric_type": "IP",
    "params": {"nprobe": 10}
}

iterator = collection.search_iterator(
    data=query_vectors,
    anns_field="vector",
    batch_size=10,
    param=search_params,
    output_fields=["color_tag"],
    limit=300
)
# search 300 entities totally with 10 entities per page

results = []

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break
        
    results.extend(result)
    
    for hit in result:
        results.append(hit.to_dict())

print(results)

# Output
#
# [
#     {
#         "id": 1756,
#         "distance": 2.0642056465148926,
#         "entity": {
#             "color_tag": "black_9109"
#         }
#     },
#     {
#         "id": 6488,
#         "distance": 1.9437453746795654,
#         "entity": {
#             "color_tag": "purple_8164"
#         }
#     },
#     {
#         "id": 3338,
#         "distance": 1.9107104539871216,
#         "entity": {
#             "color_tag": "brown_8121"
#         }
#     }
# ]
```

```java
// 4. Search with iterators
SearchIteratorReq iteratorReq = SearchIteratorReq.builder()
        .collectionName("quick_setup")
        .vectorFieldName("vector")
        .batchSize(10L)
        .vectors(Collections.singletonList(new FloatVec(Arrays.asList(0.3580376395471989f, -0.6023495712049978f, 0.18414012509913835f, -0.26286205330961354f, 0.9029438446296592f))))
        .params("{\"level\": 1}")
        .metricType(IndexParam.MetricType.COSINE)
        .outputFields(Collections.singletonList("color_tag"))
        .topK(300)
        .build();

SearchIterator searchIterator = client.searchIterator(iteratorReq);

List<QueryResultsWrapper.RowRecord> results = new ArrayList<>();
while (true) {
    List<QueryResultsWrapper.RowRecord> batchResults = searchIterator.next();
    if (batchResults.isEmpty()) {
        searchIterator.close();
        break;
    }

    results.addAll(batchResults);
}
System.out.println(results.size());

// Output
// 300
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
      <td><code>data</code></td>
      <td>A list of vector embeddings.<br/>Milvus searches for the most similar vector embeddings to the specified ones.</td>
    </tr>
    <tr>
      <td><code>anns_field</code></td>
      <td>The name of the vector field in the current collection.</td>
    </tr>
    <tr>
      <td><code>batch_size</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>param</code></td>
      <td>The parameter settings specific to this operation.<br/><ul><li><code>metric_type</code>: The metric type applied to this operation. This should be the same as the one used when you index the vector field specified above. Possible values are <strong>L2</strong>, <strong>IP</strong>, <strong>COSINE</strong>, <strong>JACCARD</strong>, <strong>HAMMING</strong>.</li><li><code>params</code>: Additional parameters. For details, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/search_iterator.md">search_iterator()</a>.</li></ul></td>
    </tr>
    <tr>
      <td><code>output_fields</code></td>
      <td>A list of field names to include in each entity in return.<br/>The value defaults to <strong>None</strong>. If left unspecified, only the primary field is included.</td>
    </tr>
    <tr>
      <td><code>limit</code></td>
      <td>The total number of entities to return.<br/>The value defaults to <strong>-1</strong>, indicating all matching entities will be in return.</td>
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
      <td><code>withCollectionName</code></td>
      <td>Set the collection name. Collection name cannot be empty or null.</td>
    </tr>
    <tr>
      <td><code>withVectorFieldName</code></td>
      <td>Set target vector field by name. Field name cannot be empty or null.</td>
    </tr>
    <tr>
      <td><code>withVectors</code></td>
      <td>Set the target vectors. Up to 16384 vectors allowed.</td>
    </tr>
    <tr>
      <td><code>withBatchSize</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>withParams</code></td>
      <td>Specifies the parameters of search in JSON format. For more information, refer to <a href="https://milvus.io/api-reference/java/v2.4.x/v1/QuerySearch/searchIterator.md">searchIterator()</a>.</td>
    </tr>
  </tbody>
</table>

## Query with an iterator

<div class="language-python">

To query with an iterator, call the [query_iterator()](https://milvus.io/api-reference/pymilvus/v2.4.x/ORM/Collection/query_iterator.md) method:

</div>

<div class="language-java">

To search with an iterator, call the [queryIterator()](https://milvus.io/api-reference/java/v2.4.x/v1/QuerySearch/queryIterator.md) method:

</div>

<div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#java">Java</a>
</div>

```python
# 6. Query with iterator
iterator = collection.query_iterator(
    batch_size=10, # Controls the size of the return each time you call next()
    expr="color_tag like \"brown_8\"",
    output_fields=["color_tag"]
)

results = []

while True:
    result = iterator.next()
    if not result:
        iterator.close()
        break
        
    results.extend(result)
    
# 8. Check the search results
print(len(results))

print(results[:3])

# Output
#
# [
#     {
#         "color_tag": "brown_8785",
#         "id": 94
#     },
#     {
#         "color_tag": "brown_8568",
#         "id": 176
#     },
#     {
#         "color_tag": "brown_8721",
#         "id": 289
#     }
# ]
```

```java
// 5. Query with iterators
QueryIterator queryIterator = client.queryIterator(QueryIteratorReq.builder()
        .collectionName("quick_setup")
        .expr("color_tag like \"brown_8%\"")
        .batchSize(50L)
        .outputFields(Arrays.asList("vector", "color_tag"))
        .build());

results.clear();
while (true) {
    List<QueryResultsWrapper.RowRecord> batchResults = queryIterator.next();
    if (batchResults.isEmpty()) {
        queryIterator.close();
        break;
    }

    results.addAll(batchResults);
}

System.out.println(results.subList(0, 3));

// Output
// [
//	[color_tag:brown_8975, vector:[0.93425006, 0.42161798, 0.1603949, 0.86406225, 0.30063087], id:104],
//	[color_tag:brown_8292, vector:[0.075261295, 0.51725155, 0.13842249, 0.13178307, 0.90713704], id:793],
//	[color_tag:brown_8763, vector:[0.80366623, 0.6534371, 0.6446101, 0.094082, 0.1318503], id:1157]
// ]

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
      <td><code>batch_size</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>expr</code></td>
      <td>A scalar filtering condition to filter matching entities.<br/>The value defaults to <strong>None</strong>, indicating that scalar filtering is ignored. To build a scalar filtering condition, refer to <a href="https://milvus.io/docs/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
      <td><code>output_fields</code></td>
      <td>A list of field names to include in each entity in return.<br/>The value defaults to <strong>None</strong>. If left unspecified, only the primary field is included.</td>
    </tr>
    <tr>
      <td><code>limit</code></td>
      <td>The total number of entities to return.<br/>The value defaults to <strong>-1</strong>, indicating all matching entities will be in return.</td>
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
      <td><code>withCollectionName</code></td>
      <td>Set the collection name. Collection name cannot be empty or null.</td>
    </tr>
    <tr>
      <td><code>withExpr</code></td>
      <td>Set the expression to query entities. To build a scalar filtering condition, refer to <a href="https://milvus.io/docs/boolean.md">Boolean Expression Rules</a>.</td>
    </tr>
    <tr>
      <td><code>withBatchSize</code></td>
      <td>The number of entities to return each time you call <code>next()</code> on the current iterator.<br/>The value defaults to <strong>1000</strong>. Set it to a proper value to control the number of entities to return per iteration.</td>
    </tr>
    <tr>
      <td><code>addOutField</code></td>
      <td>Specifies an output scalar field (Optional).</td>
    </tr>
  </tbody>
</table>
