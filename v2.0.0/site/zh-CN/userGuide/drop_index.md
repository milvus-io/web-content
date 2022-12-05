---
id: drop_index.md
related_key: drop index
summary: Learn how to drop an index in Milvus.
---

# 删除索引

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


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
  - [PyMilvus API 参考](/api-reference/pymilvus/v2.0.1/tutorial.html)
  - [Node.js API 参考](/api-reference/node/v2.0.1/tutorial.html)

