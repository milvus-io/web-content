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

<details>
  <summary><b>详细资讯</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>参数</td>
		<th>说明</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>alias*</code></td>
		<td>Milvus 服务器的名称</td>
		<td>数据类型: String<br/>必填项</td>
	</tr>
	<tr>
		<td><code>host*</code></td>
		<td>Milvus 服务器的 IP</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>port*</code></td>
		<td>Milvus 服务器的端口</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>address**</code></td>
		<td>Milvus 服务器的地址</td>
		<td><code>"server_IP:server_port"</code><br/>必填项</td>
	</tr>
	</tbody>
</table>
</details>

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

<details>
  <summary><b>详细资讯</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>参数</td>
		<th>说明</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>要建立的 collection 名称</td>
		<td>数据类型: String</td>
	</tr>
	<tr>
		<td><code>field_name</code></td>
		<td>collection 中的字段名称</td>
		<td>数据类型: String</td>
	</tr>
	<tr>
		<td><code>Schema</code></td>
		<td>用于建立 collection 及其中字段。详细说明请参考 <a href="field_schema.md">field schema</a> and <a href="collection_schema.md">collection schema</a>。</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td><code>description</code></td>
		<td>collection 的说明</td>
		<td>数据类型: String</td>
	</tr>
	<tr>
		<td>using*</td>
		<td>在此处标明服务器名称，以指定要建立 collection 的 Milvus 服务器。</td>
		<td>选填项</td>
	</tr>
	<tr>
		<td>shards_num*</td>
		<td>指定 collection 要建立的 shards 数目</td>
		<td>选填项</td>
	</tr>
	</tbody>
</table>
</details>

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

<details>
  <summary><b>详细资讯</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>参数</td>
		<th>说明</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>data</td>
		<td>要插入 Milvus 的数据</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td>partition_name</td>
		<td>要将数据插入的 partition 名称</td>
		<td>选填项</td>
	</tr>
	<tr>
		<td>timeout*</td>
		<td>RPC 允许的时限（秒钟数）。设定成空值时，客户端会等待服务器回应或产生错误。</td>
		<td>选填项</td>
	</tr>
	</tbody>
</table>
</details>

4. 将 collection 加载到内存中并进行结构化匹配：

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

<details>
  <summary><b>详细资讯</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>参数</td>
		<th>说明</th>
		<th>备注</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>collection_name**</td>
		<td>要载入并查询的 collection 名称</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td>expr</td>
		<td>筛选属性用的布林表达式</td>
		<td>在<a href="boolean.md">布林表达式规则</a>中查询其他表达式资讯。<br/>选填项</td>
	</tr>
	<tr>
		<td>output_fields</td>
		<td>要传回的 field 名称（向量 field 在目前版本不支持）</td>
		<td>必填项</td>
	</tr>
	</tbody>
</table>
</details>

<div class="alert warning">
在当前版本中，加载数据最大值不能超过所有 query node 内存总量的 70%，从而为执行引擎预留内存资源。
</div>

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
