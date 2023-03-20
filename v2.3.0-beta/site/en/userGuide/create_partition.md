---
id: create_partition.md
related_key: Partition
summary: Learn how to create a partition in Milvus.
---

# Create a Partition

This topic describes how to create a partition in Milvus.

Milvus allows you to divide the bulk of vector data into a small number of partitions. Search and other operations can then be limited to one partition to improve the performance.

A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition `_default`. See [Glossary - Partition](glossary.md#Partition) for more information.

The following example builds a partition `novel` in the collection `book`.


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
collection.create_partition("novel")
```

```javascript
await milvusClient.partitionManager.createPartition({
  collection_name: "book",
  partition_name: "novel",
});
```

```go
err := milvusClient.CreatePartition(
  context.Background(),   // ctx
  "book",                 // CollectionName
  "novel"                 // partitionName
)
if err != nil {
  log.Fatal("failed to create partition:", err.Error())
}
```

```java
milvusClient.createPartition(
  CreatePartitionParam.newBuilder()
    .withCollectionName("book")
    .withPartitionName("novel")
    .build()
);
```

```shell
create partition -c book -p novel
```

```curl
curl -X 'POST' \
  'http://localhost:9091/api/v1/partition' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "partition_name": "novel"
  }'
```

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
		<td>Name of the partition to create.</td>
	</tr>
  <tr>
		<td><code>description</code> (optional)</td>
		<td>Description of the partition to create.</td>
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
      <td>Name of the collection to create a partition in.</td>
    </tr>
    <tr>
      <td><code>partition_name</code></td>
      <td>Name of the partition to create.</td>
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
        <td>Name of the collection to create a partition in.</td>
    </tr>
    <tr>
        <td><code>partitionName</code></td>
        <td>Name of the partition to create.</td>
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
        <td>Name of the collection to create a partition in.</td>
    </tr>
    <tr>
        <td><code>PartitionName</code></td>
        <td>Name of the partition to create.</td>
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
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>The partition name.</td>
        </tr>
        <tr>
            <td>-d (Optional)</td>
            <td>The description of the partition.</td>
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
      <td>Name of the collection to create a partition in.</td>
    </tr>
    <tr>
      <td><code>partition_name</code></td>
      <td>Name of the partition to create.</td>
    </tr>
	</tbody>
</table>

## Limits
|Feature |Maximum limit|
|---|---|
|Number of partitions in a collection|4,096|

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

