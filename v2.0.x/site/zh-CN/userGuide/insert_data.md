---
id: insert_data.md
related_key: insert
summary: Learn how to insert data in Milvus.
---

# 插入数据



当前主题介绍如何通过客户端向 Milvus 中插入数据。

你还可以使用 [MilvusDM](migrate_overview.md) 将数据迁移到 Milvus，这是一款专门用于使用 Milvus 导入和导出数据而设计的开源工具。

以下示例插入 2000 行随机生成的数据作为示例数据（Milvus CLI 示例使用包含类似数据的预构建远程 CSV 文件）。实际应用程序可能会使用比示例更高维度的向量。你可以准备自己的数据来替换示例。

## 准备数据

首先，准备要插入的数据。插入数据的数据类型必须与 collection 的 schema 匹配，否则 Milvus 会抛出异常。

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
    		[i for i in range(2000)],
		[i for i in range(10000, 12000)],
    		[[random.random() for _ in range(2)] for _ in range(2000)],
		]
```

```javascript
const data = Array.from({ length: 2000 }, (v,k) => ({
  "book_id": k,
  "word_count": k+10000,
  "book_intro": Array.from({ length: 2 }, () => Math.random()),
}));
```

```go
bookIDs := make([]int64, 0, 2000)
wordCounts := make([]int64, 0, 2000)
bookIntros := make([][]float32, 0, 2000)
for i := 0; i < 2000; i++ {
	bookIDs = append(bookIDs, int64(i))
	wordCounts = append(wordCounts, int64(i+10000))
	v := make([]float32, 0, 2)
	for j := 0; j < 2; j++ {
		v = append(v, rand.Float32())
	}
	bookIntros = append(bookIntros, v)
}
idColumn := entity.NewColumnInt64("book_id", bookIDs)
wordColumn := entity.NewColumnInt64("word_count", wordCounts)
introColumn := entity.NewColumnFloatVector("book_intro", 2, bookIntros)
```

```java
Random ran = new Random();
List<Long> book_id_array = new ArrayList<>();
List<Long> word_count_array = new ArrayList<>();
List<List<Float>> book_intro_array = new ArrayList<>();
for (long i = 0L; i < 2000; ++i) {
	book_id_array.add(i);
	word_count_array.add(i + 10000);
	List<Float> vector = new ArrayList<>();
	for (int k = 0; k < 2; ++k) {
		vector.add(ran.nextFloat());
	}
	book_intro_array.add(vector);
}
```

```shell
# Prepare your data in a CSV file. Milvus CLI only supports importing data from local or remote files.
```


## 向 Milvus 插入数据

将数据插入到 collection 中。

通过指定 `partition_name`，可以选择将数据插入到指定的 partition 中。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
mr = collection.insert(data)
```

```javascript
const mr = await milvusClient.dataManager.insert({{
  collection_name: "book",
  fields_data: data,
});
```

```go
_, err = milvusClient.Insert(
	context.Background(), // ctx
	"book",               // CollectionName
	"",                   // partitionName
	idColumn,             // columnarData
	wordColumn,           // columnarData
	introColumn,          // columnarData
)
if err != nil {
	log.Fatal("failed to insert data:", err.Error())
}
```

```java
List<InsertParam.Field> fields = new ArrayList<>();
fields.add(new InsertParam.Field("book_id", DataType.Int64, book_id_array));
fields.add(new InsertParam.Field("word_count", DataType.Int64, word_count_array));
fields.add(new InsertParam.Field("book_intro", DataType.FloatVector, book_intro_array));

InsertParam insertParam = InsertParam.newBuilder()
		.withCollectionName("book")
		.withPartitionName("novel")
		.withFields(fields)
		.build();
milvusClient.insert(insertParam);
```

```shell
import -c book 'https://raw.githubusercontent.com/milvus-io/milvus_cli/main/examples/user_guide/search.csv'
```

<table class="language-python">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
    <tr>
		<td><code>data</code></td>
		<td>准备插入 Milvus 的数据。</td>
	</tr>
	<tr>
		<td><code>partition_name</code> (optional)</td>
		<td>要插入数据的 partition 名称。</td>
	</tr>
	</tbody>
</table>


<table class="language-javascript">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>要插入数据的 collection 名称。</td>
	</tr>
  <tr>
		<td><code>partition_name</code> (optional)</td>
		<td>要插入数据的 partition 名称。</td>
	</tr>
  <tr>
		<td><code>fields_data</code></td>
		<td>准备插入 Milvus 的数据。</td>
	</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
    <tr>
        <th>参数</th>
        <th>说明</th>
    </tr>
	</thead>
	<tbody>
    <tr>
        <td><code>ctx</code></td>
        <td>控制 API 调用过程的 Context 。</td>
    </tr>
    <tr>
        <td><code>CollectionName</code></td>
        <td>要插入数据的 collection 名称。</td>
    </tr>
    <tr>
        <td><code>partitionName</code></td>
        <td>要插入数据的 partition 名称。如果为空，数据将插入默认的 partition。</td>
    </tr>
	<tr>
        <td><code>columnarData</code></td>
        <td>要插入每个 field 的数据。</td>
    </tr>
  </tbody>
</table>

<table class="language-java">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>fieldName</code></td>
		<td>要插入数据的 field 名称。</td>
	</tr>
	<tr>
		<td><code>DataType</code></td>
		<td>要插入数据的 field 数据类型。</td>
	</tr>
    <tr>
		<td><code>data</code></td>
		<td>要插入每个 field 的数据。</td>
	</tr>
		<tr>
		<td><code>CollectionName</code></td>
		<td>要插入数据的 collection 名称。</td>
	</tr>
	<tr>
		<td><code>PartitionName</code> (optional)</td>
		<td>要插入数据的 partition 名称。</td>
	</tr>
	</tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>选项</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>要插入数据的 collection 名称。</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>要插入数据的 partition 名称。</td>
        </tr>
    </tbody>
</table>


## 限制

|属性|最大限制|
|---|---|
|向量维度|32,768|

## 更多内容

- 了解更多关于 Milvus 的基本操作:
  - [创建向量索引](build_index.md)
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)
- 探索 Milvus SDK 的 API 参考:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)

