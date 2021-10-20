---
id: hybridsearch.md
related_key: filter
summary: Conduct a Hybrid Search with Milvus.
---

# Conduct a Hybrid Search

This topic describes how to conduct a hybrid search.

In addition to vectors, Milvus supports data types such as boolean, integers, floating-point numbers, and more. A collection in Milvus can hold multiple fields for accommodating different data features or properties. Milvus is a flexible vector database that pairs scalar filtering with powerful vector similarity search.

<div class="alert note">
Parameters marked with <code>*</code> are specific to Python SDK, and those marked with <code>**</code> are specific to Node.js SDK.
</div>

A hybrid search is a vector similarity search, during which you can filter the scalar data by specifying a [boolean expression](boolean.md).

1. Connect to the Milvus server:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
from pymilvus import connections
connections.connect("default", host='localhost', port='19530')
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";
const milvusClient = new MilvusClient("localhost:19530");
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
		<td><code>alias*</code></td>
		<td>Alias for the Milvus server</td>
    <td>Data type: String<br/>Mandatory</td>
	</tr>
	<tr>
		<td><code>host*</code></td>
		<td>IP address of the Milvus server</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td><code>port*</code></td>
		<td>Port of the Milvus server</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td><code>address**</code></td>
		<td>Address of the Milvus server</td>
		<td><code>"server_IP:server_port"</code><br/>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

2. Prepare collection parameters and create a collection:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection, FieldSchema, CollectionSchema, DataType
>>> collection_name = "test_collection_search"
>>> schema = CollectionSchema([
...     FieldSchema("film_id", DataType.INT64, is_primary=True),
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection(collection_name, schema, using='default', shards_num=2)
```

```javascript
const COLLECTION_NAME = "test_collection_search";
milvusClient.collectionManager.createCollection({
  collection_name: COLLECTION_NAME,
  fields: [
    {
      name: "films",
      description: "vector field",
      data_type: DataType.FloatVector,
      type_params: {
        dim: "2",
      },
    },
    {
      name: "film_id",
      data_type: DataType.Int64,
      autoID: false,
      is_primary_key: true,
      description: "",
    },
  ],
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
		<td>collection_name</td>
		<td>Name of the collection to create</td>
		<td>Data type: String</td>
	</tr>
	<tr>
		<td>field_name</td>
		<td>Name of the field in the collection</td>
		<td>Data type: String</td>
	</tr>
	<tr>
		<td>Schema</td>
		<td>Schema used to create a collection and the fields within. Refer to <a href="field_schema.md">field schema</a> and <a href="collection_schema.md">collection schema</a> for detailed description</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>description</td>
		<td>Description of the collection</td>
		<td>Data type: String</td>
	</tr>
  	<tr>
		<td>using*</td>
		<td>By specifying the srever alias here, you can decide in which Milvus server you create a collection</td>
		<td>Optional</td>
	</tr>
	<tr>
		<td>shards_num*</td>
		<td>Number of the shards for the collection to create</td>
		<td>Optional</td>
	</tr>
	</tbody>
</table>
</details>

3. Insert random vectors to the newly created collection:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> import random
>>> data = [
...     [i for i in range(10)],
...     [[random.random() for _ in range(2)] for _ in range(10)],
... ]
>>> collection.insert(data)
>>> collection.num_entities
10
```

```javascript
let id = 1;
const entities = Array.from({ length: 10 }, () => ({
  films: Array.from({ length: 2 }, () => Math.random() * 10),
  film_id: id++,
}));

await milvusClient.collectionManager.insert({
  collection_name: COLLECTION_NAME,
  fields_data: entities,
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
		<td>data</td>
		<td>Data to insert into Milvus</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td>partition_name</td>
		<td>Name of the partition to insert data into</td>
		<td>Optional</td>
	</tr>
	<tr>
		<td>timeout*</td>
		<td>Timeout (in seconds) to allow for RPC. Clients wait until server responds or error occurs when it is set to None</td>
		<td>Optional</td>
	</tr>
	</tbody>
</table>
</details>

4. Load the collection to memory and conduct a vector similarity search:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.load()
>>> search_param = {
...     "data": [[1.0, 1.0]],
...     "anns_field": "films",
...     "param": {"metric_type": "L2"},
...     "limit": 2,
...     "expr": "film_id in [2,4,6,8]",
... }
>>> res = collection.search(**search_param)
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: COLLECTION_NAME,
});
await milvusClient.dataManager.search({
  collection_name: COLLECTION_NAME,
  // partition_names: [],
  expr: "film_id in [1,4,6,8]",
  vectors: [entities[0].films],
  search_params: {
    anns_field: "films",
    topk: "4",
    metric_type: "L2",
    params: JSON.stringify({ nprobe: 10 }),
  },
  vector_type: 100, // float vector -> 100
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
		<td>Name of the collection to load and search</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td>vectors</td>
		<td>Vectors to search with. Length of the data represents the number of query <code>nq</code>.</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td>anns_field</td>
		<td>Name of the field to search on</td>
		<td>Mandatory</td>
	</tr>
    <tr>
		<td>params*</td>
		<td>Search parameter(s) specific to the index</td>
		<td>Find more parameter details of different indexes in <a href="index_selection.md">Index Selection</a>.<br/>Mandatory</td>
	<tr>
		<td>limit*</td>
		<td>Number of the most similar results to return</td>
		<td>Mandatory</td>
	</tr>
  <tr>
		<td>expr</td>
		<td>Boolean expression used to filter attribute</td>
		<td>Find more expression details in <a href="boolean.md">Boolean Expression Rules</a>.<br/>Optional</td>
	</tr>
  <tr>
		<td>partition_names</td>
		<td>Name of the partition to search on</td>
		<td>Optional</td>
	</tr>
  <tr>
		<td>output_fields</td>
		<td>Name of the field to return (vector field not support in current release)</td>
		<td>Optional</td>
	</tr>
  <tr>
		<td>timeout*</td>
		<td>Timeout (in seconds) to allow for RPC. Clients wait until server responds or error occurs when it is set to None</td>
		<td>Optional</td>
	</tr>
  <tr>
		<td>vector_type**</td>
		<td>Pre-check of binary/float vectors. <code>100</code> for binary vectors and <code>101</code> for float vectors</td>
		<td>Mandatory</td>
	</tr>
	</tbody>
</table>
</details>

<div class="alert warning">
In current release, data to be load must be under 70% of the total memory resources of all query nodes to reserve memory resources for execution engine.
</div>

5. Check the returned results:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> assert len(res) == 1>>> hits = res[0]>>> assert len(hits) == 2>>> print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")- Total hits: 2, hits ids: [2, 4]>>> print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")- Top1 hit id: 2, distance: 0.10143111646175385, score: 0.101431116461
```

```javascript
// search result will be like:{  status: { error_code: 'Success', reason: '' },  results: [    { score: 0, id: '1' },    { score: 9.266796112060547, id: '4' },    { score: 28.263811111450195, id: '8' },    { score: 41.055686950683594, id: '6' }  ]}
```
