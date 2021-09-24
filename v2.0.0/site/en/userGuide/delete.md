---
id: delete.md
summary: Learn how to drop index, partition, and collection in Milvus.

---

# Delete Operations

The delete operations affect data already inserted into Milvus. Think twice before you delete.

> Parameters marked with `*` are specific to Python SDK, and those marked with `**` are specific to Node.js SDK.

## Drop an index

Drop the index of a specified field in a specified collection:

<div class="alert note">
Current release of Milvus only supports building and dropping index on vector field. Future version of Milvus will supports these operations on scalar field.
</div>

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.drop_index()
```

```javascript
await milvusClient.indexManager.dropIndex({
  collection_name: COLLECTION_NAME,
});
```

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</td>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
 	<tr>
		<td>collection_name**</td>
		<td>Name of the collection to drop index from</td>
		<td>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

## Drop a partition

Remove a partition and all vectors under it:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.drop_partition(partition_name=partition_name)
```

```javascript
await milvusClient.partitionManager.dropPartition({
  collection_name: COLLECTION_NAME,
  partition_name: PARTITION_NAME,
});
```

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</td>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
 	<tr>
		<td>partition_name</td>
		<td>Name of the partition to drop</td>
		<td>Mandatory</td>
	</tr>
  <tr>
		<td>collection_name**</td>
		<td>Name of the collection to drop partition from</td>
		<td>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

## Drop a collection

When you no longer need a collection, you can delete it.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.drop()
```

```javascript
await milvusClient.collectionManager.dropCollection({
  collection_name: COLLECTION_NAME,
});
```

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</td>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
  <tr>
		<td>collection_name**</td>
		<td>Name of the collection to drop</td>
		<td>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

## Delete entities

This feature is still under development and will be available when a stable version of Milvus 2.0 is released.
