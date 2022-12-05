---
id: release_collection.md
related_key: release collection
summary: Learn how to release a collection from memory in Milvus.
---

# 释放 Collection



当前主题介绍如何在搜索或查询后从内存中释放 collection 以减少内存使用。

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
collection.release()
```

```javascript
await milvusClient.collectionManager.releaseCollection({
  collection_name: "book",
});
```

```go
err := milvusClient.ReleaseCollection(
    context.Background(),                            // ctx
    "book",                                          // CollectionName
    )
if err != nil {
    log.Fatal("failed to release collection:", err.Error())
}
```


```java
milvusClient.releaseCollection(
        ReleaseCollectionParam.newBuilder()
                .withCollectionName("book")
                .build());
```

```shell
release -c book
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
		<td><code>partition_name</code> (optional)</td>
		<td>要释放的 partition 名称。</td>
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
		<td>要释放的 collection 名称。</td>
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
            <td>控制调用 API 的 Context。</td>
        </tr>
        <tr>
            <td><code>CollectionName</code></td>
            <td>要释放的 collection 名称。</td>
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
            <td>要释放的 collection 名称。</td>
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
            <td>要释放的 collection 名称。</td>
        </tr>
        <tr>
            <td>-p (Optional/Multiple)</td>
            <td>要释放的 partition 名称。</td>
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

