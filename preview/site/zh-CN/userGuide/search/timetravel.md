---
id: timetravel.md
related_key: Time Travel
summary: Learn how to search with Time Travel in Milvus.
---

# 使用 Time Travel 搜索



当前主题介绍如何在向量搜索过程中使用 Time Travel 功能。

Milvus 为所有数据插入和删除操作维护一条时间线。它允许用户在搜索中指定时间戳，以便检索指定时间点的数据视图，而无需花费大量资源维护集群使其回滚数据。

<div class="alert note">
默认情况下，Milvus 允许 Time Travel 的跨度为 432,000 秒（120h0m0s）。你可以在 <code>common.retentionDuration</code> 中配置此参数。
</div>

## 准备工作

以下的示例代码演示了插入数据之前的步骤。

如果你在现有 Milvus 实例中使用自己的数据集，则可以继续下一步。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

## 插入第一批数据

插入随机数据以模拟原始数据（Milvus CLI 示例使用包含类似数据的预构建远程 CSV 文件）。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

## 查看第一批数据的时间戳

查看第一批数据的时间戳并使用 Time Travel 进行搜索。在同一批次中插入的数据共享相同的时间戳。

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
Milvus 采用物理时钟和逻辑计数器的组合作为混合时间戳。 64 位时间戳由 46 位物理部分（高位）和 18 位逻辑部分（低位）组成。物理部分是自 1970 年 1 月 1 日（UTC/GMT 午夜）以来经过的毫秒数。
</div>



## 插入第二批数据

插入第二批数据以模拟脏数据，其中追加一条 primary key 值为 `19`，向量值为 `[1.0,1.0]` 的数据作为后续步骤搜索的目标数据（Milvus CLI 示例使用包含类似数据的预构建远程 CSV 文件）。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

## 使用指定的时间戳搜索

加载 collection 并使用第一批数据的时间戳搜索目标数据。指定时间戳后，Milvus 只会在时间戳指示的时间点检索数据视图。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

如下所示，目标数据本身和后面插入的其他数据都不会作为结果返回。

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

如果不指定时间戳或指定第二批数据的时间戳，Milvus 将返回两个批次的结果。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

## 为搜索生成时间戳

在没有记录之前的时间戳的情况下，Milvus 允许你使用现有的时间戳、Unix Epoch 时间或日期时间生成时间戳。

下面的示例模拟了意外的删除操作，并展示如何生成删除操作前的时间戳并使用它进行搜索。

根据删除前的日期时间或 Unix  Epoch 时间生成时间戳。

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

删除部分数据以模拟意外删除操作。

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

如下所示，如果不指定时间戳进行搜索，结果中不会返回被删除的 entity。

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

使用删除之前的时间戳进行搜索。 Milvus 在删除操作之前的数据视图中检索 entity。

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

## 更多内容

- 了解更多关于 Milvus 的基本操作：
  - [Query vectors](query.md)
  - [Conduct a hybrid search](hybridsearch.md)
- 探索 Milvus SDK 的 API 参考：
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)
