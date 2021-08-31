---
id: query.md
title: 结构化匹配
---

# 结构化匹配

Milvus 除了支持存储向量数据外，还支持存储 bool、int、float 等类型的结构化数据，并且提供了结构化数据的匹配功能。结构化匹配是一个全量检索的过程，Milvus 会返回满足条件的所有数据。结构化匹配使用[布尔表达式（boolean expression）](https://milvus.io/cn/docs/v2.0.0/boolean.md)来表示匹配条件。

1. 连接至 Milvus 服务器：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import connections
>>> connections.connect("default", host='localhost', port='19530')
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const milvusClient = new MilvusClient("localhost:19530");
```

2. 准备 collection 参数并创建 collection：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection, FieldSchema, CollectionSchema, DataType
>>> collection_name = "test_collection_search"
>>> schema = CollectionSchema([
...     FieldSchema("film_id", DataType.INT64, is_primary=True),
...     FieldSchema("film_date", DataType.INT64),
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection(collection_name, schema)
```

```javascript
const COLLECTION_NAME = "example_collection";
const FIELD_NAME = "example_field";

const params = {
  collection_name: COLLECTION_NAME,
  fields: [
    {
      name: "films",
      description: "vector field",
      data_type: DataType.FloatVector,

      type_params: {
        dim: "8",
      },
    },
    {
      name: "film_id",
      data_type: DataType.Int64,
      autoID: false,
      is_primary_key: true,
      description: "",
    },
  ],
};

await milvusClient.collectionManager.createCollection(params);
```

3. 随机生成向量数据并插入新建 collection 中：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> import random
>>> data = [
...     [i for i in range(10)],
...     [1990 + i for i in range(10)],
...     [[random.random() for _ in range(2)] for _ in range(10)],
... ]
>>> collection.insert(data)
>>> collection.num_entities
10
```

```javascript
let id = 1;
const entities = Array.from({ length: 10 }, () => ({
  films: Array.from({ length: 2 }, () => Math.random() * 10),
  film_id: id++,
}));

await milvusClient.dataManager.insert({{
  collection_name: COLLECTION_NAME,
  fields_data: entities,
});
```

4. 将集合加载到内存中并进行结构化匹配：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.load()
>>> expr = "film_id in [2,4,6,8]"
>>> output_fields = ["film_id", "film_date"]
>>> res = collection.query(expr, output_fields)
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: COLLECTION_NAME,
});

await milvusClient.dataManager.query({
  collection_name: COLLECTION_NAME,
  expr: "film_id in [2,4,6,8]",
  output_fields: ["film_id"],
});
```

5. 检查返回结果：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> sorted_res = sorted(res, key=lambda k: k['film_id'])
>>> sorted_res
[{'film_id': 2, 'film_date': 1992},
 {'film_id': 4, 'film_date': 1994},
 {'film_id': 6, 'film_date': 1996},
 {'film_id': 8, 'film_date': 1998}]
```

```javascript
// query result
[{ film_id: "2" }, { film_id: "4" }, { film_id: "6" }, { film_id: "8" }];
```
