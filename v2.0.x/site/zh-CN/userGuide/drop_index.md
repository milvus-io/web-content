---
id: drop_index.md
related_key: drop index
summary: Learn how to drop an index in Milvus.
---

# 删除索引



当前主题介绍如何在 Milvus 中删除索引。

<div class="alert caution">
删除索引会不可逆转地删除所有相应的索引文件。
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
collection.drop_index()
```

```javascript
await milvusClient.indexManager.dropIndex({
  collection_name: "book",
});
```

```go
err = milvusClient.DropIndex(
    context.Background(),     // ctx
    "book",                   // CollectionName
    "book_intro",             // fieldName
)
if err != nil {
    log.Fatal("fail to drop index:", err.Error())
}
```

```java
milvusClient.dropIndex(
        DropIndexParam.newBuilder()
                .withCollectionName("book")
                .withFieldName("book_intro")
                .build());
```

```shell
delete index -c book
```


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
            <td>需要删除索引的 collection 名称。</td>
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
            <td>需要删除索引的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>fieldName</code></td>
            <td>需要删除索引的 vector field 名称。</td>
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
            <td>需要删除索引的 collection 名称。</td>
        </tr>
        <tr>
            <td><code>FieldName</code></td>
            <td>需要删除索引的 vector field 名称。</td>
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
            <td>需要删除索引的 collection 名称。</td>
        </tr>
    </tbody>
</table>


## 更多内容

- 了解更多 Milvus 的基本操作:
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)
  - [使用 Time Travel 搜索](timetravel.md)
- 探索 Milvus SDK 的 API 参考:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)

