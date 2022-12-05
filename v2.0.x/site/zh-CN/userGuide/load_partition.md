---
id: load_partition.md
related_key: load partition
summary: 了解如何将 Partition 加载到内存中，以便在 Milvus 中进行搜索或查询。
---

# 加载 Partition

本章介绍如何将 partition 加载到内存中。将 partition 而不是整个 collection 加载到内存可以显着减少内存使用量。 Milvus 中的所有搜索和查询操作都在内存中执行。

<div class="alert warning">
在当前版本中，要加载的数据量必须低于所有查询节点总内存资源的 90%，以便为执行引擎预留内存资源。
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
collection = Collection("book")      # 获取已存在的collection。
collection.load(["novel"])

# Or you can load a partition with the partition as an object
from pymilvus import Partition
partition = Partition("novel")       # 获取已存在的collection。
partition.load()
```

```javascript
await milvusClient.partitionManager.loadPartitions({
    collection_name: "book",
    partition_names: ["novel"],
 });
```

```go
err := milvusClient.LoadPartitions(
    context.Background(),   // ctx
    "book",                 // CollectionName
    []string{"novel"},      // partitionNames
    false                   // async
    )
if err != nil {
    log.Fatal("failed to load partitions:", err.Error())
}
```

```java
milvusClient.loadPartitions(
        LoadPartitionsParam.newBuilder()
                .withCollectionName("book")
                .withPartitionNames(["novel"])
                .build());
```

```shell
load -c book -p novel
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
		<td>partition 的名称。</td>
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
		<td>partition 所属 collection 的名称。</td>
	</tr>
    <tr>
		<td><code>partition_names</code></td>
		<td>待加载的 partition 列表。</td>
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
            <td>partition 所属 collection 的名称。</td>
        </tr>
        <tr>
            <td><code>partitionNames</code></td>
            <td>待加载的 partition 列表。</td>
        </tr>
        <tr>
            <td><code>async</code></td>
            <td>Switch to control sync/async behavior. The deadline of context is not applied in sync load.</td>
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
            <td>partition 所属 collection 的名称。</td>
        </tr>
        <tr>
            <td><code>PartitionNames</code></td>
            <td>待加载的 partition 列表。</td>
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
            <td>partition 所属 collection 的名称。</td>
        </tr>
        <tr>
            <td>-p (Multiple)</td>
            <td>待加载的 partition</td>
        </tr>
    </tbody>
</table>

## 使用限制

- 当 collection 已加载时，尝试加载 该collection 中的 partition 将返回错误。未来的版本将支持从已加载的 collection 中释放 partitions，然后（如果需要）加载其他一些分区。
- 尝试加载已加载的 collection 时将返回“加载成功”。
- 当 partition 已加载时，尝试加载 collection 时将返回错误。未来版本将支持在其某些 partition 已加载时加载 collection。
- 不允许通过多个 RPC 加载同一个 collection 的不同 partition。


## What's next

- 学习 Milvus 更多基础操作：
  - [在 Milvus 中插入数据](insert_data.md)
  - [创建向量索引](build_index.md)
  - [向量检索](search.md)
  - [混合检索](hybridsearch.md)
- 探索 Milvus SDKs 中的 API：
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)

