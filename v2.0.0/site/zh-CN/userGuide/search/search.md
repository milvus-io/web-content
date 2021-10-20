---
id: search.md
---

# 查询向量

通过本章节文档，你将了解如何在 Milvus 中进行相似性搜索。

1. 创建搜索参数：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
```

```javascript
const searchParams = {
  anns_field: "example_field",
  topk: "4",
  metric_type: "L2",
  params: JSON.stringify({ nprobe: 10 }),
};
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
		<td><code>metric_type</code></td>
		<td>用于评估向量相似性的计算方式</td>
		<td>可在 <a href="metric.md">距离计算方式</a>中查看其他选项。<br/>必填项</td>
	</tr>
	<tr>
		<td><code>index_type</code></td>
		<td>用于加速向量搜寻的索引类型</td>
		<td>可在<a href="index_selection.md">选择索引</a>中查看其他选项。<br/>必填项</td>
	</tr>
	<tr>
		<td><code>params</code></td>
		<td>查询索引的参数</td>
		<td>可在<a href="index_selection.md">选择索引</a>中查看不同索引的更多参数详细资讯。<br/>必填项</td>
	</tr>
	<tr>
		<td><code>anns_field**</code></td>
		<td>要查询的字段名称</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>topk**</code></td>
		<td>传回多少条最接近的结果</td>
		<td>必填项</td>
	</tr>
	</tbody>
</table>
</details>

2. 在查询向量前，将集合加载到内存中：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: COLLECTION_NAME,
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
		<td><code>collection_name</code>**</td>
		<td>要载入的 collection 名称</td>
		<td>必填项</td>
	</tr>
	</tbody>
</table>
</details>

<div class="alert warning">
在当前版本中，加载数据最大值不能超过所有 query node 内存总量的 70%，从而为执行引擎预留内存资源。
</div>

3. 创建随机向量作为 `query_records` 并调用 `search()` 进行搜索。
   _Milvus 将返回搜索结果的 ID 和距离：_

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> results = collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None)
>>> results[0].ids
[424363819726212428, 424363819726212436, ...]
>>> results[0].distances
[0.0, 1.0862197875976562, 1.1029295921325684, ...]
```

```javascript
await milvusClient.dataManager.search({
  collection_name: COLLECTION_NAME,
  // partition_names: [],
  expr: "",
  vectors: [[1, 2, 3, 4, 5, 6, 7, 8]],
  search_params: searchParams,
  vector_type: 100, // Float vector -> 100
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
		<td><code>collection_name</code>**</td>
		<td>要查询的 collection 名称</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td>vectors</td>
		<td>要查询的向量。数据的数目表示查询数量 <code>nq</code>。</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>anns_field</code></td>
		<td>要查询的字段名称</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>params</code>*</td>
		<td>查询索引的参数</td>
		<td>可在<a href="index_selection.md">选择索引</a>中查看不同索引的更多参数详细资讯。<br/>必填项</td>
	</tr>
	<tr>
		<td><code>limit</code>*</td>
		<td>传回多少条最接近的结果</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>expr</code></td>
		<td>筛选属性用的布林表达式</td>
		<td>在<a href="boolean.md">布林表达式规则</a>中查询其他表达式资讯。<br/>选填项</td>
	</tr>
	<tr>
		<td><code>partition_names</code></td>
		<td>要查询的 partition 名称</td>
		<td>选填项</td>
	</tr>
	<tr>
		<td><code>output_fields</code></td>
		<td>要传回的字段名称（向量字段在目前版本不支持）</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>timeout</code></td>
		<td>RPC 允许的时限（秒钟数）。设定成空值时，客户端会等待伺服器回应或产生错误。</td>
		<td>选填项</td>
	</tr>
	<tr>
		<td><code>vector_type</code>**</td>
		<td>预先检查二进制或浮点数向量。二进制为 <code>100</code> 而浮点数为 <code>101</code>。</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>round_decimal</code>**</td>
		<td>小数点取至第几位</td>
		<td>数据类型: Integer<br/>选填项</td>
	</tr>
	</tbody>
</table>
</details>

如果要在指定分区或者指定列查询，则可以在调用 `search()` 时设置`partition_names` 和 `fields` 参数

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None, partition_names=[partition_name])
```

```javascript
await milvusClient.dataManager.search({
  collection_name: COLLECTION_NAME,
  partition_names: [partition_name],
  expr: "",
  vectors: [[1, 2, 3, 4, 5, 6, 7, 8]],
  search_params: searchParams,
  vector_type: 100, // Float vector -> 100
});
```

4. 查询完成后，可以调用 `release_collection()` 将 Milvus 中加载的 collection 从内存中释放，以减少内存消耗。查询其他 collection：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.release()
```

```javascript
await milvusClient.collectionManager.releaseCollection({
  collection_name: COLLECTION_NAME,
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
		<td><code>collection_name</code>**</td>
		<td>要释放的 collection 名称</td>
		<td>必填项</td>
	</tr>
	</tbody>
</table>
</details>
