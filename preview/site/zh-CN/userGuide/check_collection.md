---
id: check_collection.md
related_key: collection
summary: Learn how to check collection information in Milvus.
---

# 查看 Collection 信息



当前主题介绍如何在 Milvus 中查看 collection 信息。

## 查看 collection 是否存在

验证 Milvus 中是否存在输入的 collection。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import utility
utility.has_collection("book")
```

```javascript
await milvusClient.collectionManager.hasCollection({
  collection_name: "book",
});
```

```go
hasColl, err := milvusClient.HasCollection(
    context.Background(), // ctx
    collectionName,       // CollectionName
)
if err != nil {
    log.Fatal("failed to check whether collection exists:", err.Error())
}
log.Println(hasColl)
```

```java
R<Boolean> respHasCollection = milvusClient.hasCollection(
        HasCollectionParam.newBuilder()
                .withCollectionName("book")
                .build());
if (respHasCollection.getData() == Boolean.TRUE) {
    System.out.println("Collection exists.");
}
```

```shell
describe collection -c book
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
            <td>要查看的 collection 名称。</td>
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
            <td>要查看的 collection 名称。</td>
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
            <td>要查看的 collection 名称。</td>
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
            <td>要查看的 collection 名称。</td>
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
            <td>要查看的 collection 名称。</td>
        </tr>
    </tbody>
</table>

## 查看 collection 详细信息

查看输入 collection 的详细信息

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")  # Get an existing collection.

collection.schema                # Return the schema.CollectionSchema of the collection.
collection.description           # Return the description of the collection.
collection.name                  # Return the name of the collection.
collection.is_empty              # Return the boolean value that indicates if the collection is empty.
collection.num_entities          # Return the number of entities in the collection.
collection.primary_field         # Return the schema.FieldSchema of the primary key field.
collection.partitions            # Return the list[Partition] object.
collection.indexes               # Return the list[Index] object.
```

```javascript
await milvusClient.collectionManager.describeCollection({          // Return the name and schema of the collection.
  collection_name: "book",
});

await milvusClient.collectionManager.getCollectionStatistics({     // Return the statistics information of the collection.
  collection_name: "book",
});
```

```go
collDesc, err := milvusClient.DescribeCollection(               // Return the name and schema of the collection.
    context.Background(),   // ctx
    "book",                 // CollectionName
)
if err != nil {
    log.Fatal("failed to check collection schema:", err.Error())
}
log.Printf("%v\n", collDesc)

collStat, err := milvusClient.GetCollectionStatistics(          // Return the statistics information of the collection.
    context.Background(),   // ctx
    "book",                 // CollectionName
)
if err != nil {
log.Fatal("failed to check collection statistics:", err.Error())
}
```

```java
R<DescribeCollectionResponse> respDescribeCollection = milvusClient.describeCollection(          // Return the name and schema of the collection.
        DescribeCollectionParam.newBuilder()
                .withCollectionName("book")
                .build());
DescCollResponseWrapper wrapperDescribeCollection = new DescCollResponseWrapper(respDescribeCollection.getData());
System.out.println(wrapperDescribeCollection);

R<GetCollectionStatisticsResponse> respCollectionStatistics = milvusClient.getCollectionStatistics(   // Return the statistics information of the collection.
        GetCollectionStatisticsParam.newBuilder()
                .withCollectionName("book")
                .build());
GetCollStatResponseWrapper wrapperCollectionStatistics = new GetCollStatResponseWrapper(respCollectionStatistics.getData());
System.out.println("Collection row count: " + wrapperCollectionStatistics.getRowCount());
```

```shell
describe collection -c book
```

<table class="language-python">
    <thead>
        <tr>
            <th>属性</th>
            <th>返回</th>
            <th>异常</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>schema</td>
            <td>collection 的 schema 信息。</td>
        </tr>
        <tr>
            <td>description</td>
            <td>collection 的描述信息。</td>
        </tr>
        <tr>
            <td>name</td>
            <td>collection 的名称。</td>
        </tr>
        <tr>
            <td>is_empty</td>
            <td>表示 collection 是否为空的布尔值。</td>
        </tr>
        <tr>
            <td>num_entities</td>
            <td>collection 中的 entity 数</td>
            <td>如果 collection 不存在，触发<code>CollectionNotExistException</code>。 </td>
        </tr>
        <tr>
            <td>primary_field</td>
            <td>collection 的 primary field。</td>
        </tr>
        <tr>
            <td>partitions</td>
            <td>包含所有 partition 的列表</td>
            <td>如果 collection 不存在，触发<code>CollectionNotExistException</code>。</td>
        </tr>
        <tr>
            <td>indexes</td>
            <td>包含所有索引的列表</td>
            <td>如果 collection 不存在，触发<code>CollectionNotExistException</code> 。</td>
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
            <td>要查看的 collection 名称。</td>
        </tr>
	</tbody>
</table>



<table class="language-javascript">
	<thead>
        <tr>
            <th>Property</th>

            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>status</code></td>
            <td>{ error_code: number, reason: string }</td>
        </tr>
        <tr>
            <td><code>schema</code></td>
            <td>Information of all fields in this collection</td>
        <tr>
            <td><code>collectionID</code></td>
            <td> collectionID</td>
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
            <td>要查看的 collection 名称。</td>
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
            <td><code>CollectionName</code></td>
            <td>要查看的 collection 名称。</td>
        </tr>
    </tbody>

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
            <td>要查看的 collection 名称。</td>
        </tr>
    </tbody>
</table>


## 列出所有 collection

列出当前 Milvus 实例中的所有 collection。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import utility
utility.list_collections()
```

```javascript
await milvusClient.collectionManager.showCollections();
```

```go
listColl, err := milvusClient.ListCollections(
    context.Background(),   // ctx
    )
if err != nil {
		log.Fatal("failed to list all collections:", err.Error())
    }
log.Println(listColl)
```

```java
R<ShowCollectionsResponse> respShowCollections = milvusClient.showCollections(
        ShowCollectionsParam.newBuilder()
                .build());
System.out.println(respShowCollections);
```

```shell
list collections
```

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
