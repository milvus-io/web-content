---
id: load_collection.md
related_key: load collection
summary: Learn how to load a collection into memory for CRUD operations in Milvus.
---

# Load a Collection

This topic describes how to load the collection to memory before a search or a query. All search and query operations within Milvus are executed in memory. 

Milvus 2.1 allows users to load a collection as multiple replicas to utilize the CPU and memory resources of extra query nodes. This feature boost the overall QPS and throughput without extra hardware. It is supported on PyMilvus in current release.

<div class="alert warning">
<ul>
<li>In current release, volume of the data to load must be under 90% of the total memory resources of all query nodes to reserve memory resources for execution engine.</li>
<li>In current release, all on-line query nodes will be divided into multiple replica groups according to the replica number specified by user. All replica groups shall have minimal memory resources to load one replica of the provided collection. Otherwise, an error will be returned.</li>
</ul>
</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load(replica_number=2)
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
    .build()
);
```

```shell
load -c book
```

``` curl
curl -X 'POST' \
  'http://localhost:9091/api/v1/collection/load' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book"
  }'
```

<div class="language-curl">
Output:

```json
{}
```

</div>

<table class="language-python">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to load.</td>
	</tr>
    <tr>
		<td><code>replica_number</code> (optional)</td>
		<td>Number of the replica to load.</td>
	</tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>Name of the collection to load.</td>
	</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to load.</td>
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
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to load.</td>
        </tr>
    </tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to load.</td>
        </tr>
        <tr>
            <td>-p (Optional/Multiple)</td>
            <td>The name of the partition to load.</td>
        </tr>
    </tbody>
</table>

<table class="language-curl">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>Name of the collection to load.</td>
	</tr>
	</tbody>
</table>

## Get replica information

You can check the information of the loaded replicas.

```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load(replica_number=2)    # Load collection as 2 replicas
result = collection.get_replicas()
print(result)
```

Below is an example of the output.

```
Replica groups:
- Group: <group_id:435309823872729305>, <group_nodes:(21, 20)>, <shards:[Shard: <channel_name:milvus-zong-rootcoord-dml_27_435367661874184193v0>, <shard_leader:21>, <shard_nodes:[21]>, Shard: <channel_name:milvus-zong-rootcoord-dml_28_435367661874184193v1>, <shard_leader:20>, <shard_nodes:[20, 21]>]>
- Group: <group_id:435309823872729304>, <group_nodes:(25,)>, <shards:[Shard: <channel_name:milvus-zong-rootcoord-dml_28_435367661874184193v1>, <shard_leader:25>, <shard_nodes:[25]>, Shard: <channel_name:milvus-zong-rootcoord-dml_27_435367661874184193v0>, <shard_leader:25>, <shard_nodes:[25]>]>
```

## Constraints

- Error will be returned at the attempt to load partition(s) when the parent collection is already loaded. Future releases will support releasing partitions from a loaded collection, and (if needed) then loading some other partition(s).
- "Load successfully" will be returned at the attempt to load the collection that is already loaded.
- Error will be returned at the attempt to load the collection when the child partition(s) is/are already loaded. Future releases will support loading the collection when some of its partitions are already loaded.
- Loading different partitions in a same collection via separate RPCs is not allowed.


## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

