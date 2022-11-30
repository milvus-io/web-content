---
id: load_collection.md
related_key: load collection
summary: Learn how to load a collection into memory for CRUD operations in Milvus.
---

# 加载 Collection




当前主题介绍如何在搜索或查询之前将 collection 加载到内存中。 Milvus 中所有的搜索和查询操作都在内存中执行。

<div class="alert warning">
在当前版本中，要加载的数据量必须低于所有 query node 总内存资源的 90%，以便为执行引擎预留内存资源。
</div>

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
collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: "book",
});
```

```go
err := milvusClient.LoadCollection(
    context.Background(),   // ctx
    "book",                 // CollectionName
    false                   // async
    )
if err != nil {
    log.Fatal("failed to load collection:", err.Error())
}
```

```java
milvusClient.loadCollection(
        LoadCollectionParam.newBuilder()
                .withCollectionName("book")
                .build());
```

```shell
load -c book
```

<table class="language-python">
	<thead>
	<tr>
		<th>参数</th>
		<th>描述</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>partition_name</code> (optional)</td>
		<td>要加载的 partition 名称。</td>
	</tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
	<tr>
		<th>参数</th>
		<th>描述</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>要加载的 collection 名称。</td>
	</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>ctx</code></td>
            <td>控制调用 API 的 Context。</td>
        </tr>
        <tr>
            <td><code>CollectionName</code></td>
            <td>要加载的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>async</code></td>
            <td>Switch to control sync/async behavior. The deadline of context is not applied in sync load.切换以控制 sync/async 行为。Sync 加载中未应用 context 的截止日期。</td>
        </tr>
    </tbody>
</table>

<table class="language-java">
	<thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>CollectionName</code></td>
            <td>要加载的 collection 名称。</td>
        </tr>
    </tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>选项</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>要加载的 collection 名称。</td>
        </tr>
        <tr>
            <td>-p (Optional/Multiple)</td>
            <td>要加载的 partition 名称。</td>
        </tr>
    </tbody>
</table>


## 更多内容

- 了解更多 Milvus 的基本操作：
  - [插入数据](insert_data.md)
  - [创建 partition](create_partition.md)
  - [创建索引](build_index.md)
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)
- 探索 Milvus SDK 的 API 参考：
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)

