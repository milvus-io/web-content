---
id: check_partition.md
related_key: Partition
summary: 学习如何在 Milvus 中查看分区信息。
---

# 查看 Partition 信息

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


本章介绍如何在 Milvus 中查看分区信息。

## 查看 Partition 是否存在

校验 给定的 Collection 中是否存在 Partition。

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?shell">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.has_partition("novel")
```

```javascript
await milvusClient.partitionManager.hasPartition({
  collection_name: "book",
  partition_name: "novel",
});
```

```go
hasPar, err := milvusClient.HasPartition(
    context.Background(),   // ctx
    "book",                 // CollectionName
    "novel",                // partitionName
    )
if err != nil {
    log.Fatal("failed to check the partition:", err.Error())
}
log.Println(hasPar)
```

```java
R<Boolean> respHasPartition = milvusClient.hasPartition(
        HasPartitionParam.newBuilder()
                .withCollectionName("book")
                .withPartitionName("novel")
                .build());
if (respHasPartition.getData() == Boolean.TRUE) {
    System.out.println("Partition exists.");
}
```

```shell
describe partition -c book -p novel
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
            <td><code>partition_name</code></td>
            <td>待查看的 Partition 名称。</td>
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
            <td>待查看的 Collection 名称。</td>
        </tr>
        <tr>
            <td><code>partition_name</code></td>
            <td>待查看的 Partition 名称。</td>
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
        <td>控制 API 调用过程的上下文。</td>
    </tr>
    <tr>
        <td><code>CollectionName</code></td>
        <td>待查看 Collection 的名称。</td>
    </tr>
    <tr>
        <td><code>partitionName</code></td>
        <td>待查看 Partition 的名称。</td>
    </tr>
  </tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>待查看 Collection 的名称。</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>待查看 Partition 的名称。</td>
        </tr>
    </tbody>
</table>


## 获取 partitions 列表

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?java">Java</a>
  <a href="?go">GO</a>
  <a href="?javascript">Node.js</a>
  <a href="?shell">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.partitions
```

```javascript
await milvusClient.partitionManager.showPartitions({
  collection_name: "book",
});
```

```go
listPar, err := milvusClient.ShowPartitions(
    context.Background(),   // ctx
    "book",                 // CollectionName
    )
if err != nil {
    log.Fatal("failed to list partitions:", err.Error())
}
log.Println(listPar)
```

```java
R<ShowPartitionsResponse> respShowPartitions = milvusClient.showPartitions(
        ShowPartitionsParam.newBuilder()
                .withCollectionName("book")
                .build());
System.out.println(respShowPartitions);
```

```shell
list partitions -c book
```

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
            <td>待查看 Collection 的名称。</td>
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
        <td>控制 API 调用过程的上下文。</td>
    </tr>
    <tr>
        <td><code>CollectionName</code></td>
        <td>待查看 Collection 的名称。</td>
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
        <td>待查看 Collection 的名称。</td>
    </tr>
  </tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>参数</th>
            <th>描述</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>待查看 Collection 的名称。</td>
        </tr>
    </tbody>
</table>


## 更多内容

- 学习 Milvus 更多基础操作：
  - [在 Milvus 中插入数据](insert_data.md)
  - [创建向量索引](build_index.md)
  - [向量检索](search.md)
  - [混合检索](hybridsearch.md)
- 探索 Milvus SDKs 中的 API：
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)

