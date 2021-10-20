---
id: hybridsearch.md
---

# 混合搜索

除了向量以外，Milvus 还支持布尔值、整型、浮点等数据类型。在 Milvus 中，一个 collection 可以包含多个字段来代表数据特征或属性。Milvus 是一款灵活的向量数据库，还支持在向量相似度检索过程中进行标量字段过滤。

混合搜索是一种向量相似度检索。在混合搜索时，你可以通过使用[布尔表达式（boolean expression）](boolean.md)进行标量字段过滤。

1. 连接至 Milvus 服务器：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
from pymilvus import connections
connections.connect("default", host='localhost', port='19530')
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
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection(collection_name, schema)
```

```javascript
const COLLECTION_NAME = 'test_collection_search'
milvusClient.collectionManager.createCollection({
  collection_name: COLLECTION_NAME,
  fields: [
    {
      name: "films",
      description: "vector field",
      data_type: DataType.FloatVector,
      type_params: {
        dim:"2
      }
    },
    {
      name: "film_id",
      data_type: DataType.Int64,
      autoID: false,
      is_primary_key: true,
      description: "",
    },
  ],
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
		<td><code>collection_name</code></td>
		<td>要建立的 collection 名称</td>
		<td>数据类型: String</td>
	</tr>
	<tr>
		<td><code>field_name</code></td>
		<td>collection 中的 field 名称</td>
		<td>数据类型: String</td>
	</tr>
	<tr>
		<td><code>Schema</code></td>
		<td>用于建立 collection 及其中的 field。详细说明请参考 <a href="field_schema.md">field schema</a> and <a href="collection_schema.md">collection schema</a>。</td>
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

await milvusClient.collectionManager.insert({
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

4. 将集合加载到内存中并进行向量相似度检索：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.load()
>>> search_param = {
...     "data": [[1.0, 1.0]],
...     "anns_field": "films",
...     "param": {"metric_type": "L2"},
...     "limit": 2,
...     "expr": "film_id in [2,4,6,8]",
... }
>>> res = collection.search(**search_param)
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: COLLECTION_NAME,
});
await milvusClient.dataManager.search({
  collection_name: COLLECTION_NAME,
  // partition_names: [],
  expr: "film_id in [1,4,6,8]",
  vectors: [entities[0].films],
  search_params: {
    anns_field: "films",
    topk: "4",
    metric_type: "L2",
    params: JSON.stringify({ nprobe: 10 }),
  },
  vector_type: 100, // float vector -> 100
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
		<td>vectors</td>
		<td>要查询的向量。数据的数目表示查询数量 <code>nq</code>。</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td>anns_field</td>
		<td>要查询的字段名称</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td>params*</td>
		<td>查询索引的参数</td>
		<td>可在<a href="index_selection.md">选择索引</a>中查看不同索引的更多参数详细资讯。<br/>必填项</td>
	<tr>
		<td>limit*</td>
		<td>传回多少条最接近的结果</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td>expr</td>
		<td>筛选属性用的布林表达式</td>
		<td>在<a href="boolean.md">布林表达式规则</a>中查询其他表达式资讯。<br/>选填项</td>
	</tr>
	<tr>
		<td>partition_names</td>
		<td>要查询的 partition 名称</td>
		<td>选填项</td>
	</tr>
	<tr>
		<td>output_fields</td>
		<td>要传回的字段名称（向量字段在目前版本不支持）</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td>timeout*</td>
		<td>RPC 允许的时限（秒钟数）。设定成空值时，客户端会等待服务器回应或产生错误。</td>
		<td>选填项</td>
	</tr>
	<tr>
		<td>vector_type**</td>
		<td>预先检查二进制或浮点数向量。二进制为 <code>100</code> 而浮点数为 <code>101</code>。</td>
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
>>> assert len(res) == 1
>>> hits = res[0]
>>> assert len(hits) == 2
>>> print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")
- Total hits: 2, hits ids: [2, 4]
>>> print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")
- Top1 hit id: 2, distance: 0.10143111646175385, score: 0.101431116461
```

```javascript
// search result will be like:
{
  status: { error_code: 'Success', reason: '' },
  results: [
    { score: 0, id: '1' },
    { score: 9.266796112060547, id: '4' },
    { score: 28.263811111450195, id: '8' },
    { score: 41.055686950683594, id: '6' }
  ]
}
```
