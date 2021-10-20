---
id: insert.md
---

# 在集合中插入数据

你可以通过以下步骤在指定 collection 的指定 partition 中插入数据。

1.随机生成待插入的数据:

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> import random
>>> vectors = [[random.random() for _ in range(8)] for _ in range(10)]
>>> entities = [vectors]
```

```javascript
const entities = Array.from({ length: 10 }, () => ({
  [FIELD_NAME]: Array.from({ length: 8 }, () => Math.floor(Math.random() * 10)),
}));
```

2. 调用以上函数将随机生成的数据插入新创建的 collection 中。Milvus 会为每条插入的数据自动生成 ID，类似于关系型数据库中的 AutoID。

_Milvus 将返回 `MutationResult`，其中包含插入数据对应的主键列 `primary_keys`。_

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> mr = collection.insert(entities)
# 输出 `MutationResult` 的主键列
>>> mr.primary_keys
[425790736918318406, 425790736918318407, 425790736918318408, ...]
```

```javascript
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
		<td><code>data</code></td>
		<td>要插入 Milvus 的数据</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>collection_name**</code></td>
		<td>要将数据插入的 collection 名称</td>
		<td>必填项</td>
	</tr>
	<tr>
		<td><code>partition_name</code></td>
		<td>要将数据插入的 partition 名称</td>
		<td>选填项</td>
	</tr>
	</tbody>
</table>
</details>

3. 调用 insert() 函数时指定 `partitiont_name` 可以将向量插入到指定的 Partition 中：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.insert(data=entities, partition_name=partition_name)
```

```javascript
await milvusClient.dataManager.insert({{
  collection_name: COLLECTION_NAME,
  partition_name: partition_name
  fields_data: entities,
});
```

4. 插入的数据将存储在 Milvus 内存中。调用 `flush()` 函数将数据落盘：

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> pymilvus.utility.get_connection().flush([collection_name])
```

```javascript
await milvusClient.dataManager.flush({ collection_names: [COLLECTION_NAME] });
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
		<td>collection_name</td>
		<td>要处理的 collection 名称</td>
		<td>必填项</td>
	</tr>
	</tbody>
</table>
</details>
