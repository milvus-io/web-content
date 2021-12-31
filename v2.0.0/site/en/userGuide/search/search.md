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

1.  Connect to the Milvus server. See [Manage Connection](manage_connection.md) for more instruction.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import connections
connections.connect("default", host='localhost', port='19530')
```

```javascript
const { MilvusClient } =require("@zilliz/milvus2-sdk-node");
const milvusClient = new MilvusClient("localhost:19530");
```

```cli
connect -h localhost -p 19530 -a default
```

2. Create a collection. See [Create a Collection](create_collection.md) for more instruction.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
schema = CollectionSchema([
    		FieldSchema("book_id", DataType.INT64, is_primary=True),
			FieldSchema("word_count", DataType.INT64),
    		FieldSchema("book_intro", dtype=DataType.FLOAT_VECTOR, dim=2)
		])
collection = Collection("book", schema, using='default', shards_num=2)
```

```javascript
const params = {
  collection_name: "book",
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
```

```cli
create collection -c book -f book_intro:FLOAT_VECTOR:2 -f book_id:INT64 book_id -f word_count:INT64 word_count -p book_id
```

3. Insert data into the collection (Milvus CLI example uses a pre-built, remote CSV file containing similar data). See [Insert Data](insert_data.md) for more instruction.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
import random
data = [
    		[i for i in range(2000)],
			[i for i in range(10000, 12000)],
    		[[random.random() for _ in range(2)] for _ in range(2000)],
		]
collection.insert(data)
```

```javascript
const data = Array.from({ length: 2000 }, (v,k) => ({
  "book_intro": Array.from({ length: 2 }, () => Math.random()),
  "book_id": k,
  "word_count": k+10000,
}));
await milvusClient.dataManager.insert({
  collection_name: "book",
  fields_data: entities,
});
```

```cli
import -c book 'https://raw.githubusercontent.com/milvus-io/milvus_cli/main/examples/user_guide/search.csv'
```

4. Create an index for the vector field. See [Build Index](build_index.md) for more instruction.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
index_params = {
        "metric_type":"L2",
        "index_type":"IVF_FLAT",
        "params":{"nlist":1024}
    }
collection.create_index("book_intro", index_params=index_params)
```

```javascript
const index_params = {
  metric_type: "L2",
  index_type: "IVF_FLAT",
  params: JSON.stringify({ nlist: 1024 }),
};
await milvusClient.indexManager.createIndex({
  collection_name: "book",
  field_name: "book_intro",
  extra_params: index_params,
});
```

```cli
create index

Collection name (book): book

The name of the field to create an index for (book_intro): book_intro

Index type (FLAT, IVF_FLAT, IVF_SQ8, IVF_PQ, RNSG, HNSW, ANNOY): IVF_FLAT

Index metric type (L2, IP, HAMMING, TANIMOTO): L2

Index params nlist: 1024

Timeout []:
```

## Load collection

All CRUD operations within Milvus are executed in memory. Load the collection to memory before conducting a vector similarity search.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: "book",
});
```

```cli
load -c book
```


<div class="alert warning">
In current release, volume of the data to load must be under 70% of the total memory resources of all query nodes to reserve memory resources for execution engine.
</div>

## Prepare search parameters

Prepare the parameters that suit your search scenario. The following example defines that the search will calculate the distance with Euclidean distance, and retrieve vectors from ten closest clusters built by the IVF_FLAT index.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
```

```javascript
const searchParams = {
  anns_field: "book_intro",
  topk: "10",
  metric_type: "L2",
  params: JSON.stringify({ nprobe: 10 }),
};
```

```cli
search

Collection name (book): book

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a csv file without headers): [[0.1, 0.2]]

The vector field used to search of collection (book_intro): book_intro

Metric type: L2

Search parameter nprobe's value: 10

The max number of returned record, also known as topk: 10

The boolean expression used to filter attribute []: 

The names of partitions to search (split by "," if multiple) ['_default'] []: 

timeout []:

Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]: 

Travel Timestamp(Specify a timestamp in a search to get results based on a data view) [0]:
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

<table class="language-cli">
    <thead>
        <tr>
            <th>Option</th>
            <th>Full name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>


## Conduct a vector search

Search vectors with Milvus. To search in a specific [partition](glossary.md#Partition), specify the list of partition names. 

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
results = collection.search(data=[[0.1, 0.2]], anns_field="book_intro", param=search_params, limit=10, expr=None)
```

```javascript
const results = await milvusClient.dataManager.search({
  collection_name: "book",
  expr: "",
  vectors: [[0.1, 0.2]],
  search_params: searchParams,
  vector_type: 101,    // DataType.FloatVector
});
```

```cli

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
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
results[0].ids
results[0].distances
```

```javascript
console.log(results.results)
```

```cli
# Milvus CLI automatically returns the primary key values of the most similar vectors and their distances.
```

Release the collection loaded in Milvus to reduce memory consumption when the search is completed.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
collection.release()
```

```javascript
await milvusClient.collectionManager.releaseCollection({  collection_name: "book",});
```

```cli
release -c book
```

## Limits
|Feature|Maximum limit|
|---|---|
|Length of a collection name|255 characters|
|Number of partitions in a collection|4,096|
|Number of fields in a collection|256|
|Number of shards in a collection|256|
|Dimensions of a vector|32,768|
|Top K|16,384|
|Target input vectors|16,384|


## What's next

- Learn more basic operations of Milvus:
  - [Query vectors](query.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc9/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.20/tutorial.html)
