---
id: load_balance.md
related_key: Load balance
summary: Learn how to balance query load in Milvus.
---

# 负载均衡



本主题介绍如何平衡 Milvus 中的查询负载。

Milvus 默认支持自动负载均衡。你可以[配置](configure-docker.md)  Milvus 以启用或禁用[自动负载均衡](configure_querycoord.md#queryCoordautoBalance)。通过指定 [`queryCoord.balanceIntervalSeconds`](configure_querycoord.md#queryCoordbalanceIntervalSeconds), [`queryCoord.overloadedMemoryThresholdPercentage`](configure_querycoord.md#queryCoordoverloadedMemoryThresholdPercentage) 和 [`queryCoord.memoryUsageMaxDifferencePercentage`](configure_querycoord.md#queryCoordmemoryUsageMaxDifferencePercentage)，你可以更改触发自动负载均衡的阈值。

如果禁用自动负载均衡，你仍然可以手动平衡负载。

## 查看 segment 信息

获取输入 collection 的 sealed segment 的 `segmentID` 和 query node 的 `nodeID` 。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
from pymilvus import utility
utility.get_query_segment_info("book")
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.getQuerySegmentInfo(
    GetQuerySegmentInfoParam.newBuilder()
        .withCollectionName("book")
        .build());
```

```javascript
await dataManager.getQuerySegmentInfo({
    collectionName: "book",
});
```

```shell
show query_segment -c book
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
		<td><code>collection_name</code></td>
		<td>用于查看 segment 信息的 collection 名称。</td>
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
		<td><code>collectionName</code></td>
		<td>用于查看 segment 信息的 collection 名称。</td>
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
		<td>用于查看 segment 信息的 collection 名称。</td>
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
            <td>用于查看 segment 信息的 collection 名称。</td>
        </tr>
    </tbody>
</table>

## 迁移 segment

使用当前 query node 和新 query node 的 `segmentID` 和 `nodeID` 迁移 sealed segment 。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
utility.load_balance(
    src_node_id=3, 
    dst_node_ids=[4], 
    sealed_segment_ids=[431067441441538050]
)
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.loadBalance(LoadBalanceParam.newBuilder()
                .withSourceNodeID(3L)
                .addDestinationNodeID(4L)
                .addSegmentID(431067441441538050L)
                .build());
```

```javascript
await dataManager.loadBalance({
    src_nodeID: 3,
    dst_nodeIDs: [4],
    sealed_segmentIDs: [431067441441538050]
});
```

```shell
load_balance -s 3 -d 4 -ss 431067441441538050
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
		<td><code>src_node_id</code></td>
		<td>源 segment query node 的 ID 。</td>
	</tr>
	<tr>
		<td><code>dst_node_ids</code> (Optional)</td>
		<td>目标 segment query node 的 ID 。如果该参数为空，Milvus 会自动将 segment 转移到其他 query node 。</td>
	</tr>
	<tr>
		<td><code>sealed_segment_ids</code> (Optional)</td>
		<td>要转移的 segment ID 。如果该参数为空，Milvus 会自动将源 query node 中的所有 sealed segment 传输到其他 query node 。</td>
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
		<td><code>src_nodeID</code></td>
		<td>源 segment query node 的 ID 。</td>
	</tr>
	<tr>
		<td><code>dst_nodeIDs</code> (Optional)</td>
		<td>目标 segment query node 的 ID 。如果该参数为空，Milvus 会自动将 segment 转移到其他 query node 。</td>
	</tr>
	<tr>
		<td><code>sealed_segmentIDs</code> (Optional)</td>
		<td>要转移的 segment ID 。如果该参数为空，Milvus 会自动将源 query node 中的所有 sealed segment 传输到其他 query node 。</td>
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
		<td><code>SourceNodeID</code></td>
		<td>源 segment query node 的 ID 。</td>
	</tr>
	<tr>
		<td><code>DestinationNodeID</code> (Optional)</td>
		<td>目标 segment query node 的 ID 。如果该参数为空，Milvus 会自动将 segment 转移到其他 query node 。</td>
	</tr>
	<tr>
		<td><code>SegmentID</code> (Optional)</td>
		<td>要转移的 segment ID 。如果该参数为空，Milvus 会自动将源 query node 中的所有 sealed segment 传输到其他 query node 。</td>
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
		<td><code>-s</code></td>
		<td>源 segment query node 的 ID 。</td>
	</tr>
	<tr>
		<td><code>-d</code> (Multiple)</td>
		<td>目标 segment query node 的 ID 。</td>
	</tr>
	<tr>
		<td><code>-ss</code> (Multiple)</td>
		<td>要转移的 segment ID 。</td>
	</tr>
	</tbody>
</table>

## 更多内容

- 了解更多 Milvus 的基本操作：
  - [插入数据](insert_data.md)
  - [创建 partition](create_partition.md)
  - [创建向量索引](build_index.md)
  - [进行向量搜索](search.md)
  - [进行混合搜索](hybridsearch.md)
- 探索 Milvus SDK 的 API 参考：
  - [PyMilvus API 参考](/api-reference/pymilvus/v2.0.1/tutorial.html)
  - [Node.js API 参考](/api-reference/node/v2.0.1/tutorial.html)

