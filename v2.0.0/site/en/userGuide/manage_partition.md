---
id: manage_partition.md
related_key: Partition
summary: Learn how to manage partitions in Milvus.

---

# Manage Partitions

This topic describes how to manage partitions in Milvus.

Milvus allows you to divide the bulk of vector data into a small number of partitions. Search and other operations can then be limited to one partition to improve the performance.

A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition `_default`. See [Glossary - Partition](glossary.md#Partition) for more information.

The following example is based on a partition `example_partition` in the collection `example_collection`.

## Create a partition

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection = Collection("example_collection")      # Get an existing collection.
>>> partition = collection.create_partition("example_partition")
```

```javascript
await milvusClient.partitionManager.createPartition({
  collection_name: "example_collection",
  partition_name: "example_partition",
});
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

## List all partitions

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection = Collection("example_collection")      # Get an existing collection.
>>> collection.partitions
```

```javascript
await milvusClient.partitionManager.showPartitions({
  collection_name: "example_collection",
});
```



## Verify if a partition exist

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection.has_partition("example_partition")
```

```javascript
await milvusClient.partitionManager.hasPartition({
  collection_name: "example_collection",
  partition_name: "example_partition",
});
```


## Drop a partition

Remove a partition.

<div class="alert caution">
The drop operation is irreversible. Dropping a partition deletes all data within it.
</div>


<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection.drop_partition("example_partition")
```

```javascript
await milvusClient.partitionManager.dropPartition({
  collection_name: "example_collection",
  partition_name: "example_partition",
});
```

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](manage_data.md)
  - [Build an index for vectors](manage_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

