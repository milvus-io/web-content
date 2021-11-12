---
id: search.md
related_key: search
summary: Conduct a vector similarity search with Milvus.
---

# Conduct a Vector Similarity Search

This topic describes how to search entities with Milvus.

A vector similarity search in Milvus calculates the distance between query vector(s) and vectors in the collection with specified similarity metrics, and returns the most similar results. By specifying a [boolean expression](boolean.md) that filters the scalar field or the primary key field, you can perform a [hybrid search](hybridsearch.md) or even a search with [Time Travel](timetravel.md).

The following example shows how to perform a vector similarity search on a 2000-row dataset of book ID (primary key), word count (scalar field), and book introduction (vector field), simulating the situation that you search for certain books based on their vectorized introductions. Milvus will return the most similar results according to the query vector and search parameters you have defined. 

## Preparations

The following example code demonstrates the steps prior to a search.

If you work with your own dataset in an existing Milvus instance, you can move forward to the next step.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import connections, Collection, FieldSchema, CollectionSchema, DataType
>>> connections.connect("default", host='localhost', port='19530')
>>> schema = CollectionSchema([
    		FieldSchema("book_id", DataType.INT64, is_primary=True),
			FieldSchema("word_count", DataType.INT64),
    		FieldSchema("book_intro", dtype=DataType.FLOAT_VECTOR, dim=2)
		])
>>> collection = Collection("test_book_search", schema, using='default', shards_num=2)
>>> import random
>>> data = [
    		[i for i in range(2000)],
			[i for i in range(10000, 12000)],
    		[[random.random() for _ in range(2)] for _ in range(2000)],
		]
>>> collection.insert(data)
>>> index_params = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
>>> collection.create_index("book_intro", index_params=index_params)
```

```javascript
const { MilvusClient } =require("@zilliz/milvus2-sdk-node");
const milvusClient = new MilvusClient("localhost:19530");
const params = {
  collection_name: "test_book_search",
  fields: [
    {
      name: "book_intro",
      description: "",
      data_type: 101,  // DataType.FloatVector
      type_params: {
        dim: "2",
      },
    },
	{
      name: "book_id",
      data_type: 5,   //DataType.Int64
      is_primary_key: true,
      description: "",
    },
    {
      name: "word_count",
      data_type: 5,    //DataType.Int64
      description: "",
    },
  ],
};
await milvusClient.collectionManager.createCollection(params);
const entities = Array.from({ length: 2000 }, (v,k) => ({
  "book_intro": Array.from({ length: 2 }, () => Math.random()),
  "book_id": k,
  "word_count": k+10000,
}));
await milvusClient.dataManager.insert({
  collection_name: "test_book_search",
  fields_data: entities,
});
const index_params = {
  metric_type: "L2",
  index_type: "IVF_FLAT",
  params: JSON.stringify({ nlist: 1024 }),
};
await milvusClient.indexManager.createIndex({
  collection_name: "test_book_search",
  field_name: "book_intro",
  extra_params: index_params,
});
```

## Load collection

All CRUD operations within Milvus are executed in memory. Load the collection to memory before conducting a vector similarity search.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection = Collection("test_book_search")      # Get an existing collection.
>>> collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: "test_book_search",
});
```


<div class="alert warning">
In current release, volume of the data to load must be under 70% of the total memory resources of all query nodes to reserve memory resources for execution engine.
</div>

## Prepare search parameters

Prepare the parameters that suit your search scenario. The following example defines that the search will calculate the distance with Euclidean distance, and retrieve vectors from ten closest clusters built by the IVF_FLAT index.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
```

```javascript
const searchParams = {
  anns_field: "book_intro",
  topk: "10",
  metric_type: "L2",
  params: JSON.stringify({ nprobe: 10 }),
};
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
		<td><code>metric_type</code></td>
		<td>Metrics used to measure similarity of vectors. See <a href="metric.md">Simlarity Metrics</a> for more information.</td>
	</tr>
    <tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index_selection.md">Index Selection</a> for more information.</td>
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
		<td><code>anns_field</code></td>
		<td>Name of the field to search on.</td>
	</tr>
	<tr>
		<td><code>topk</code></td>
		<td>Number of the most similar results to return.</td>
	</tr>
	<tr>
		<td><code>metric_type</code></td>
		<td>Metrics used to measure similarity of vectors. See <a href="metric.md">Simlarity Metrics</a> for more information.</td>
	</tr>
    <tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index_selection.md">Index Selection</a> for more information.</td>
	</tr>
	</tbody>
</table>


## Conduct a vector search

Search vectors with Milvus. To search in a specific [partition](manage_partition.md), specify the list of partition names. 

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> results = collection.search(data=[[0.1, 0.2]], anns_field="book_intro", param=search_params, limit=10, expr=None)
```

```javascript
const results = await milvusClient.dataManager.search({
  collection_name: "test_book_search",
  expr: "",
  vectors: [[0.1, 0.2]],
  search_params: searchParams,
  vector_type: 101,    // DataType.FloatVector
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
		<td><code>data</code></td>
		<td>Vectors to search with.</td>
	</tr>
	<tr>
		<td><code>anns_field</code></td>
		<td>Name of the field to search on.</td>
	</tr>
  <tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index_selection.md">Index Selection</a> for more information.</td>
	</tr>
	<tr>
		<td><code>limit</code></td>
		<td>Number of the most similar results to return.</td>
	</tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>partition_names</code> (optional)</td>
		<td>List of names of the partition to search in.</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>Name of the field to return. Vector field is not supported in current release.</td>
	</tr>
  <tr>
		<td><code>timeout</code> (optional)</td>
		<td>A duration of time in seconds to allow for RPC. Clients wait until server responds or error occurs when it is set to None.</td>
	</tr>
  <tr>
		<td><code>round_decimal</code> (optional)</td>
		<td>Number of decimal places of returned distance.</td>
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
		<td>Name of the collection to search in.</td>
	</tr>
	<tr>
    <td><code>search_params</code></td>
    <td>Parameters (as an object) used for search.</td>
  </tr>
	<tr>
    <td><code>vectors</code></td>
    <td>Vectors to search with.</td>
  </tr>
  <tr>
		<td><code>vector_type</code></td>
		<td>Pre-check of binary or float vectors. <code>100</code> for binary vectors and <code>101</code> for float vectors.</td>
	</tr>
  <tr>
		<td><code>partition_names</code> (optional)</td>
		<td>List of names of the partition to search in.</td>
	</tr>
    <tr>
		<td><code>expr</code> (optional)</td>
		<td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>Name of the field to return. Vector field is not supported in current release.</td>
	</tr>
	</tbody>
</table>


Check the primary key values of the most similar vectors and their distances.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> results[0].ids
>>> results[0].distances
```

```javascript
console.log(results.results)
```

Release the collection loaded in Milvus to reduce memory consumption when the search is completed.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.release()
```

```javascript
await milvusClient.collectionManager.releaseCollection({  collection_name: "test_book_search",});
```

## What's next

- Learn more basic operations of Milvus:
  - [Query vectors](query.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)
