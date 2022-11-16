---
id: timetravel.md
related_key: Time Travel
summary: Learn how to search with Time Travel in Milvus.
---

# Search with Time Travel

This topic describes how to use the Time Travel feature during vector search.

Milvus maintains a timeline for all data insert and delete operations. It allows users to specify a timestamp in a search to retrieve a data view at a specified point in time, without spending tremendously on maintenance for data rollback.

<div class="alert note">
By default, Milvus allows Time Travel span of 432,000 seconds (120h0m0s). You can configure this parameter in <code>common.retentionDuration</code>.
</div>

## Preparations

The following example code demonstrates the steps prior to inserting data.

If you work with your own dataset in an existing Milvus instance, you can move forward to the next step.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?shell">CLI</a>
</div>


```python
from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
connections.connect("default", host='localhost', port='19530')
collection_name = "test_time_travel"
schema = CollectionSchema([
  FieldSchema("pk", DataType.INT64, is_primary=True),
  FieldSchema("example_field", dtype=DataType.FLOAT_VECTOR, dim=2)
])
collection = Collection(collection_name, schema)
```

```javascript
const { MilvusClient } =require("@zilliz/milvus2-sdk-node");
const milvusClient = new MilvusClient("localhost:19530");
const params = {
  collection_name: "test_time_travel",
  fields: [{
      name: "example_field",
      description: "",
      data_type: 101, // DataType.FloatVector
      type_params: {
        dim: "2",
      },
    },
    {
      name: "pk",
      data_type: 5, //DataType.Int64
      is_primary_key: true,
      description: "",
    },
  ],
};
await milvusClient.collectionManager.createCollection(params);
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
connect -h localhost -p 19530 -a default
create collection -c test_time_travel -f pk:INT64:primary_field -f example_field:FLOAT_VECTOR:2 -p pk
```

## Insert the first batch of data

Insert random data to simulate the original data (Milvus CLI example uses a pre-built, remote CSV file containing similar data).

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?shell">CLI</a>
</div>


```python
import random
data = [
  [i for i in range(10)],
  [[random.random() for _ in range(2)] for _ in range(10)],
]
batch1 = collection.insert(data)
```

```javascript
const entities1 = Array.from({ length: 10 }, (v, k) => ({
  "example_field": Array.from({   length: 2  }, () => Math.random()),
  "pk": k,
}));
const batch1 = milvusClient.dataManager.insert({
  collection_name: "test_time_travel",
  fields_data: entities1,
});
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
import -c test_time_travel https://raw.githubusercontent.com/zilliztech/milvus_cli/main/examples/user_guide/search_with_timetravel_1.csv
Reading file from remote URL.
Reading csv rows...  [####################################]  100%
Column names are ['pk', 'example_field']
Processed 11 lines.

Inserted successfully.

--------------------------  ------------------
Total insert entities:                      10
Total collection entities:                  10
Milvus timestamp:           430390410783752199
--------------------------  ------------------
```

## Check the timestamp of the first data batch

Check the timestamp of the first data batch for search with Time Travel. Data inserted within the same batch share an identical timestamp.

```python
batch1.timestamp
428828271234252802
```

```javascript
batch1.timestamp
428828271234252802
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
# Milvus CLI automatically returns the timestamp as shown in the previous step.
```

<div class="alert note">
  Milvus adopts a combination of physical clock and logic counter as a hybrid timestamp. The 64-bit timestamp consists of a 46-bit physical part (high-order bits) and an 18-bit logic part (low-order bits). The physical part is the number of milliseconds that have elapsed since January 1, 1970 (midnight UTC/GMT).
</div>



## Insert the second batch of data

Insert the second batch of data to simulate the dirty data, among which a piece of data with primary key value `19` and vector value `[1.0,1.0]` is appended as the target data to search with in the following step (Milvus CLI example uses a pre-built, remote CSV file containing similar data).

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?shell">CLI</a>
</div>


```python
data = [
  [i for i in range(10, 20)],
  [[random.random() for _ in range(2)] for _ in range(9)],
]
data[1].append([1.0,1.0])
batch2 = collection.insert(data)
```

```javascript
const entities2 = Array.from({
  length: 9
}, (v, k) => ({
  "example_field": Array.from({
    length: 2
  }, () => Math.random()),
  "pk": k + 10,
}));
entities2.push({
  "pk": 19,
  "example_field": [1.0, 1.0],
});
const batch2 = await milvusClient.dataManager.insert({
  collection_name: "test_time_travel",
  fields_data: entities2,
});
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```


```shell
import -c test_time_travel https://raw.githubusercontent.com/zilliztech/milvus_cli/main/examples/user_guide/search_with_timetravel_2.csv
Reading file from remote URL.
Reading csv rows...  [####################################]  100%
Column names are ['pk', 'example_field']
Processed 11 lines.

Inserted successfully.

--------------------------  ------------------
Total insert entities:                      10
Total collection entities:                  20
Milvus timestamp:           430390435713122310
--------------------------  ------------------
```

## Search with a specified timestamp

Load the collection and search the target data with the timestamp of the first data batch. With the timestamp specified, Milvus only retrieves the data view at the point of time the timestamp indicates.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?shell">CLI</a>
</div>


```python
collection.load()
search_param = {
  "data": [[1.0, 1.0]],
  "anns_field": "example_field",
  "param": {"metric_type": "L2"},
  "limit": 10,
  "travel_timestamp": batch1.timestamp,
}
res = collection.search(**search_param)
res[0].ids
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: "test_time_travel",
});
const res = await milvusClient.dataManager.search({
  collection_name: "test_time_travel",
  vectors: [
    [1.0, 1.0]
  ],
  travel_timestamp: batch1.timestamp,
  search_params: {
    anns_field: "example_field",
    topk: "10",
    metric_type: "L2",
    params: JSON.stringify({
      nprobe: 10
    }),
  },
  vector_type: 101, // DataType.FloatVector,
});
console.log(res1.results)
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
search
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a CSV file without headers): [[1.0, 1.0]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-1]: 
The max number of returned record, also known as topk: 10
The boolean expression used to filter attribute []: 
The names of partitions to search (split by "," if multiple) ['_default'] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]: 
Travel Timestamp(Specify a timestamp in a search to get results based on a data view) [0]: 430390410783752199
```

As shown below, the target data itself and other data inserted later are not returned as results.

```python
[8, 7, 4, 2, 5, 6, 9, 3, 0, 1]
```

```javascript
[8, 7, 4, 2, 5, 6, 9, 3, 0, 1]
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```


```shell
Search results:

No.1:
+---------+------+------------+-----------+
|   Index |   ID |   Distance |     Score |
+=========+======+============+===========+
|       0 |    2 |  0.0563737 | 0.0563737 |
+---------+------+------------+-----------+
|       1 |    5 |  0.122474  | 0.122474  |
+---------+------+------------+-----------+
|       2 |    3 |  0.141737  | 0.141737  |
+---------+------+------------+-----------+
|       3 |    8 |  0.331008  | 0.331008  |
+---------+------+------------+-----------+
|       4 |    0 |  0.618705  | 0.618705  |
+---------+------+------------+-----------+
|       5 |    1 |  0.676788  | 0.676788  |
+---------+------+------------+-----------+
|       6 |    9 |  0.69871   | 0.69871   |
+---------+------+------------+-----------+
|       7 |    6 |  0.706456  | 0.706456  |
+---------+------+------------+-----------+
|       8 |    4 |  0.956929  | 0.956929  |
+---------+------+------------+-----------+
|       9 |    7 |  1.19445   | 1.19445   |
+---------+------+------------+-----------+
```

If you do not specify the timestamp or specify it with the timestamp of the second data batch, Milvus will return the results from both batches.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?shell">CLI</a>
</div>


```python
batch2.timestamp
428828283406123011
search_param = {
    "data": [[1.0, 1.0]],
    "anns_field": "example_field",
    "param": {"metric_type": "L2"},
    "limit": 10,
    "travel_timestamp": batch2.timestamp,
}
res = collection.search(**search_param)
res[0].ids
[19, 10, 8, 7, 4, 17, 2, 5, 13, 15]
```

```javascript
batch2.timestamp
428828283406123011
const res2 = await milvusClient.dataManager.search({
  collection_name: "test_time_travel",
  vectors: [
    [1.0, 1.0]
  ],
  travel_timestamp: batch2.timestamp,
  search_params: {
    anns_field: "example_field",
    topk: "10",
    metric_type: "L2",
    params: JSON.stringify({
      nprobe: 10
    }),
  },
  vector_type: 101, // DataType.FloatVector,
});
console.log(res2.results)
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
search 
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a CSV file without headers): [[1.0, 1.0]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-1]: 
The max number of returned record, also known as topk: 10
The boolean expression used to filter attribute []: 
The names of partitions to search (split by "," if multiple) ['_default'] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]: 
Travel Timestamp(Specify a timestamp in a search to get results based on a data view) [0]: 
Search results:

No.1:
+---------+------+------------+------------+
|   Index |   ID |   Distance |      Score |
+=========+======+============+============+
|       0 |   19 | 0          | 0          |
+---------+------+------------+------------+
|       1 |   12 | 0.00321393 | 0.00321393 |
+---------+------+------------+------------+
|       2 |    2 | 0.0563737  | 0.0563737  |
+---------+------+------------+------------+
|       3 |    5 | 0.122474   | 0.122474   |
+---------+------+------------+------------+
|       4 |    3 | 0.141737   | 0.141737   |
+---------+------+------------+------------+
|       5 |   10 | 0.238646   | 0.238646   |
+---------+------+------------+------------+
|       6 |    8 | 0.331008   | 0.331008   |
+---------+------+------------+------------+
|       7 |   18 | 0.403166   | 0.403166   |
+---------+------+------------+------------+
|       8 |   13 | 0.508617   | 0.508617   |
+---------+------+------------+------------+
|       9 |   11 | 0.531529   | 0.531529   |
+---------+------+------------+------------+
```

## Generate a timestamp for search

In the case that the previous timestamp is not recorded, Milvus allows you to generate a timestamp using an existing timestamp, Unix Epoch time, or date time.

The following example simulates an unwanted deletion operation and shows how to generate a timestamp prior to the deletion and search with it.

Generate a timestamp based on the date time or Unix Epoch time prior to the deletion.

```python
import datetime
datetime = datetime.datetime.now()
from pymilvus import utility
pre_del_timestamp = utility.mkts_from_datetime(datetime)
```

```javascript
const {  datetimeToHybrids } = require("@zilliz/milvus2-sdk-node/milvus/utils/Format");
const datetime = new Date().getTime()
const pre_del_timestamp = datetimeToHybrids(datetime)
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
calc mkts_from_unixtime -e 1641809375
430390476800000000
```

Delete part of the data to simulate an accidental deletion operation.

```python
expr = "pk in [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]"
collection.delete(expr)
```

```javascript
const expr = "pk in [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]"
await milvusClient.dataManager.deleteEntities({
  collection_name: "test_time_travel",
  expr: expr,
});
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
delete entities -c test_time_travel
The expression to specify entities to be deleted, such as "film_id in [ 0, 1 ]": pk in [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]
You are trying to delete the entities of collection. This action cannot be undone!

Do you want to continue? [y/N]: y
(insert count: 0, delete count: 10, upsert count: 0, timestamp: 430390494161534983)
```

As shown below, the deleted entities are not returned in the results if you search without specifying the timestamp.

```python
search_param = {
    "data": [[1.0, 1.0]],
    "anns_field": "example_field",
    "param": {"metric_type": "L2"},
    "limit": 10,
}
res = collection.search(**search_param)
res[0].ids
```

```javascript
const res3 = await milvusClient.dataManager.search({
  collection_name: "test_time_travel",
  vectors: [
    [1.0, 1.0]
  ],
  search_params: {
    anns_field: "example_field",
    topk: "10",
    metric_type: "L2",
    params: JSON.stringify({
      nprobe: 10
    }),
  },
  vector_type: 101, // DataType.FloatVector,
});
console.log(res3.results)
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
search 
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a CSV file without headers): [[1.0, 1.0]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-1]: 
The max number of returned record, also known as topk: 10
The boolean expression used to filter attribute []: 
The names of partitions to search (split by "," if multiple) ['_default'] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]: 
Travel Timestamp(Specify a timestamp in a search to get results based on a data view) [0]: 
Search results:

No.1:
+---------+------+------------+----------+
|   Index |   ID |   Distance |    Score |
+=========+======+============+==========+
|       0 |   19 |   0        | 0        |
+---------+------+------------+----------+
|       1 |    5 |   0.122474 | 0.122474 |
+---------+------+------------+----------+
|       2 |    3 |   0.141737 | 0.141737 |
+---------+------+------------+----------+
|       3 |   13 |   0.508617 | 0.508617 |
+---------+------+------------+----------+
|       4 |   11 |   0.531529 | 0.531529 |
+---------+------+------------+----------+
|       5 |   17 |   0.593702 | 0.593702 |
+---------+------+------------+----------+
|       6 |    1 |   0.676788 | 0.676788 |
+---------+------+------------+----------+
|       7 |    9 |   0.69871  | 0.69871  |
+---------+------+------------+----------+
|       8 |    7 |   1.19445  | 1.19445  |
+---------+------+------------+----------+
|       9 |   15 |   1.53964  | 1.53964  |
+---------+------+------------+----------+
```

Search with the prior-to-deletion timestamp. Milvus retrieves entities from the data before the deletion.

```python
search_param = {
    "data": [[1.0, 1.0]],
    "anns_field": "example_field",
    "param": {"metric_type": "L2"},
    "limit": 10,
    "travel_timestamp": pre_del_timestamp,
}
res = collection.search(**search_param)
res[0].ids
```

```javascript
const res4 = await milvusClient.dataManager.search({
  collection_name: "test_time_travel",
  vectors: [
    [1.0, 1.0]
  ],
  travel_timestamp: pre_del_timestamp,
  search_params: {
    anns_field: "example_field",
    topk: "10",
    metric_type: "L2",
    params: JSON.stringify({
      nprobe: 10
    }),
  },
  vector_type: 101, // DataType.FloatVector,
});
console.log(res4.results)
```

```go
// This function is under active development on the GO client.
```

```java
// Java User Guide will be ready soon.
```

```shell
search 
Collection name (test_collection_query, test_time_travel): test_time_travel
The vectors of search data (the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a CSV file without headers): [[1.0, 1.0]]
The vector field used to search of collection (example_field): example_field
The specified number of decimal places of returned distance [-1]: 
The max number of returned record, also known as topk: 10
The boolean expression used to filter attribute []: 
The names of partitions to search (split by "," if multiple) ['_default'] []: 
Timeout []: 
Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]: 
Travel Timestamp(Specify a timestamp in a search to get results based on a data view) [0]: 430390476800000000
Search results:

No.1:
+---------+------+------------+------------+
|   Index |   ID |   Distance |      Score |
+=========+======+============+============+
|       0 |   19 | 0          | 0          |
+---------+------+------------+------------+
|       1 |   12 | 0.00321393 | 0.00321393 |
+---------+------+------------+------------+
|       2 |    2 | 0.0563737  | 0.0563737  |
+---------+------+------------+------------+
|       3 |    5 | 0.122474   | 0.122474   |
+---------+------+------------+------------+
|       4 |    3 | 0.141737   | 0.141737   |
+---------+------+------------+------------+
|       5 |   10 | 0.238646   | 0.238646   |
+---------+------+------------+------------+
|       6 |    8 | 0.331008   | 0.331008   |
+---------+------+------------+------------+
|       7 |   18 | 0.403166   | 0.403166   |
+---------+------+------------+------------+
|       8 |   13 | 0.508617   | 0.508617   |
+---------+------+------------+------------+
|       9 |   11 | 0.531529   | 0.531529   |
+---------+------+------------+------------+
```

## What's next

- Learn more basic operations of Milvus:
  - [Query vectors](query.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/About.md)
  - [Node.js API reference](/api-reference/node/v2.0.2/About.md)
  - [Go API reference](/api-reference/go/v2.0.0/About.md)
  - [Java API reference](/api-reference/java/v2.0.4/About.md)

