---
id: search.md
related_key: search
summary: Conduct a vector similarity search with Milvus.

---

# Conduct a Vector Similarity Search

This topic describes how to conduct a vector similarity search.

<div class="alert note">
Parameters marked with <code>*</code> are specific to Python SDK, and those marked with <code>**</code> are specific to Node.js SDK.
</div>

1. Create search parameters:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
```

```javascript
const searchParams = {
  anns_field: "example_field",
  topk: "4",
  metric_type: "L2",
  params: JSON.stringify({ nprobe: 10 }),
};
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
		<td><code>metric_type</code></td>
		<td>Metrics used to measure similarity of vectors</td>
		<td>Find more options in <a href="metric.md">Simlarity Metrics</a>.<br/>Mandatory</td>
	</tr>
	<tr>
		<td><code>index_type</code></td>
		<td>Type of index used to accelerate the vector search</td>
		<td>Find more options in <a href="index_selection.md">Index Selection</a>.<br/>Mandatory</td>
	</tr>
    <tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index</td>
		<td>Find more parameter details of different indexes in <a href="index_selection.md">Index Selection</a>.<br/>Mandatory</td>
	</tr>
    <tr>
		<td><code>anns_field**</code></td>
		<td>Name of the field to search on</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td><code>topk**</code></td>
		<td>Number of the most similar results to return</td>
		<td>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

2. Load the collection to memory before conducting a vector similarity search:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
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
		<td><code>collection_name</code>**</td>
		<td>Name of the collection to load</td>
		<td>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

<div class="alert warning">
In current release, data to be load must be under 70% of the total memory resources of all query nodes to reserve memory resources for execution engine.
</div>

3. Search with newly created random vectors:

_Milvus returns the IDs of the most similar vectors and their distances._

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> results = collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None)
>>> results[0].ids
[424363819726212428, 424363819726212436, ...]
>>> results[0].distances
[0.0, 1.0862197875976562, 1.1029295921325684, ...]
```

```javascript
await milvusClient.dataManager.search({
  collection_name: COLLECTION_NAME,
  // partition_names: [],
  expr: "",
  vectors: [[1, 2, 3, 4, 5, 6, 7, 8]],
  search_params: searchParams,
  vector_type: 100, // Float vector -> 100
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
		<td><code>collection_name</code>**</td>
		<td>Name of the collection to search</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td>vectors</td>
		<td>Vectors to search with. Length of the data represents the number of query <code>nq</code>.</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td><code>anns_field</code></td>
		<td>Name of the field to search on</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td><code>params</code>*</td>
		<td>Search parameter(s) specific to the index</td>
		<td>Find more parameter details of different indexes in <a href="index_selection.md">Index Selection</a>.<br/>Mandatory</td>
	</tr>
	<tr>
		<td><code>limit</code>*</td>
		<td>Number of the most similar results to return</td>
		<td>Mandatory</td>
	</tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute</td>
		<td>Find more expression details in <a href="boolean.md">Boolean Expression Rules</a>.<br/>Optional</td>
	</tr>
  <tr>
		<td><code>partition_names</code></td>
		<td>Name of the partition to search on</td>
		<td>Optional</td>
	</tr>
  <tr>
		<td><code>output_fields</code></td>
		<td>Name of the field to return (vector field not support in current release)</td>
		<td>Optional</td>
	</tr>
  <tr>
		<td><code>timeout</code></td>
		<td>Timeout (in seconds) to allow for RPC. Clients wait until server responds or error occurs when it is set to None.</td>
		<td>Optional</td>
	</tr>
  <tr>
		<td><code>vector_type</code>**</td>
		<td>Pre-check of binary/float vectors. <code>100</code> for binary vectors and <code>101</code> for float vectors.</td>
		<td>Mandatory</td>
	</tr>
  <tr>
		<td><code>round_decimal</code>**</td>
		<td>Number of decimal places of returned distance</td>
		<td>Data type: Integer<br/>Optional</td>
	</tr>
	</tbody>
</table>
</details>

To search in a specific partition or field, specify the name of the partition and field.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.search(vectors[:5], field_name, param=search_params, limit=10, expr=None, partition_names=[partition_name])
```

```javascript
await milvusClient.dataManager.search({
  collection_name: COLLECTION_NAME,
  partition_names: [partition_name],
  expr: "",
  vectors: [[1, 2, 3, 4, 5, 6, 7, 8]],
  search_params: searchParams,
  vector_type: 100, // Float vector -> 100
});
```

4. Release the collections loaded in Milvus to reduce memory consumption when the search is completed:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.release()
```

```javascript
await milvusClient.collectionManager.releaseCollection({  collection_name: COLLECTION_NAME,});
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
		<td><code>collection_name</code>**</td>
		<td>Name of the collection to release</td>
		<td>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

