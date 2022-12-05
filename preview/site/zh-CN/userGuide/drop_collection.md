---
id: drop_collection.md
related_key: drop collection
summary: Learn how to drop a collection in Milvus.
---

# 删除 collection



当前主题介绍如何删除 collection 和 collection 中的数据。

<div class="alert caution">
删除 collection 会不可逆地删除 collection 中的所有数据。
</div>


<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import utility
utility.drop_collection("book")
```

```javascript
await milvusClient.collectionManager.dropCollection({  collection_name: "book",});
```

```go
err = milvusClient.DropCollection(
		context.Background(), // ctx
		"book",               // CollectionName
)
if err != nil {
	log.Fatal("fail to drop collection:", err.Error())
}
```

```java
milvusClient.dropCollection(
        DropCollectionParam.newBuilder()
                .withCollectionName("book")
                .build());
```

```shell
delete collection -c book
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
            <td><code>collection_name</code></td>
            <td>要删除的 collection 名称。</td>
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
            <td>要删除的 collection 名称。</td>
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
            <td>要删除的 collection 名称。</td>
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
            <td>要删除的 collection 名称。</td>
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
            <td>要删除的 collection 名称。</td>
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

