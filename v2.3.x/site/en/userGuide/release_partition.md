---
id: release_partition.md
related_key: release partition
summary: Learn how to release a partition into memory for search or query in Milvus.
title: Release a Partition
---

# Release a Partition

This topic describes how to release a partition from memory after a search or a query to reduce memory usage.

Since version 2.3.0, Milvus has enhanced its partition operations and now supports cascading load and release operations. This means that you can perform any combination of the following operations:

- Release a loaded collection.
- Release a specific partition from a loaded collection.
- Release a loaded partition.
- Release a collection that has part of partitions loaded.

<div class="alert note">

When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.

</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>

```python
from pymilvus import Partition
partition = Partition("novel")       # Get an existing partition.
partition.release()
```

```javascript
await milvusClient.releasePartitions({
    collection_name: "book",
    partition_names: ["novel"],
 });
```

```go
err := milvusClient.ReleasePartitions(
  context.Background(),   // ctx
  "book",                 // CollectionName
  []string{"novel"},      // partitionNames
)
if err != nil {
  log.Fatal("failed to release partitions:", err.Error())
}
```

```java
List<String> partitionNames = new ArrayList<>();
partitionNames.add("novel");
milvusClient.releasePartitions(
  ReleasePartitionsParam.newBuilder()
    .withCollectionName("book")
    .withPartitionNames(partitionNames)
    .build()
);
```

<div style="display: none">

```shell
release -c book -p novel
```

``` curl
curl -X 'DELETE' \
  'http://localhost:9091/api/v1/partitions/load' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "partition_names": ["novel"],
    "replica_number": 1
  }'
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
		<td><code>partition_name</code></td>
		<td>Name of the partition.</td>
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
		<td>Name of the collection to release partitions.</td>
	</tr>
    <tr>
		<td><code>partition_names</code></td>
		<td>List of names of the partitions to release.</td>
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
            <td>Name of the collection to release partitions.</td>
        </tr>
        <tr>
            <td><code>partitionNames</code></td>
            <td>List of names of the partitions to release.</td>
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
            <td>Name of the collection to release partition.</td>
        </tr>
        <tr>
            <td><code>PartitionNames</code></td>
            <td>List of names of the partitions to release.</td>
        </tr>
    </tbody>
</table>

<table class="language-shell" style="display: none">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>Name of the collection to release partition.</td>
        </tr>
        <tr>
            <td>-p (Multiple)</td>
            <td>The name of the partition to release.</td>
        </tr>
    </tbody>
</table>

<table class="language-curl" style="display: none">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>Name of the collection to release partitions.</td>
	</tr>
    <tr>
		<td><code>partition_names</code></td>
		<td>List of names of the partitions to release.</td>
	</tr>
	</tbody>
</table>

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
