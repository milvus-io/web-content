---
id: query.md
related_key: query vectors
summary: Learn how to query vectors in Milvus.
---

# Query

This topic describes how to conduct a query.

In addition to vectors, Milvus supports data types such as boolean, integers, floating-point numbers, and more.

A query is a search on all existing data. In Milvus, you can run a query which will return all the results that meet your specified requirements. Use [boolean expression](boolean.md) to specify the requirements.

<div class="alert note">
Parameters marked with <code>*</code> are specific to Python SDK, and those marked with <code>**</code> are specific to Node.js SDK.
</div>

1. Connect to the Milvus server:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import connections
>>> connections.connect("default", host='localhost', port='19530')
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
		<td>Address of the Milvus server.</td>
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
...     FieldSchema("film_date", DataType.INT64),
...     FieldSchema("films", dtype=DataType.FLOAT_VECTOR, dim=2)
... ])
>>> collection = Collection(collection_name, schema, using='default', shards_num=2)
```

```javascript
const COLLECTION_NAME = "example_collection";
const FIELD_NAME = "example_field";

const params = {
  collection_name: COLLECTION_NAME,
  fields: [
    {
      name: "films",
      description: "vector field",
      data_type: DataType.FloatVector,

      type_params: {
        dim: "8",
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
};

await milvusClient.collectionManager.createCollection(params);
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
		<td>Schema used to create a collection and the fields within. Refer to <a href="field_schema.md">field schema</a> and <a href="collection_schema.md">collection schema</a> for detailed description. </td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td>description</td>
		<td>Description of the collection</td>
		<td>Data type: String</td>
	</tr>
  	<tr>
		<td>using*</td>
		<td>By specifying the srever alias here, you can decide in which Milvus server you create a collection.</td>
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
...     [1990 + i for i in range(10)],
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

await milvusClient.dataManager.insert({{
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
		<td>Timeout (in seconds) to allow for RPC. Clients wait until server responds or error occurs when it is set to None.</td>
		<td>Optional</td>
	</tr>
	</tbody>
</table>
</details>

4. Load the collection to memory and run a query:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.load()
>>> expr = "film_id in [2,4,6,8]"
>>> output_fields = ["film_id", "film_date"]
>>> res = collection.query(expr, output_fields)
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: COLLECTION_NAME,
});

await milvusClient.dataManager.query({
  collection_name: COLLECTION_NAME,
  expr: "film_id in [2,4,6,8]",
  output_fields: ["film_id"],
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
		<td>Name of the collection to load and query</td>
		<td>Mandatory</td>
	</tr>
	<tr>
		<td>expr</td>
		<td>Boolean expression used to filter attribute</td>
		<td>Find more expression details in <a href="boolean.md">Boolean Expression Rules</a>.<br/>Optional</td>
	</tr>
	<tr>
		<td>output_fields</td>
		<td>Name of the field to return (vector field not support in current release)</td>
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
>>> sorted_res = sorted(res, key=lambda k: k['film_id'])
>>> sorted_res
[{'film_id': 2, 'film_date': 1992},
 {'film_id': 4, 'film_date': 1994},
 {'film_id': 6, 'film_date': 1996},
 {'film_id': 8, 'film_date': 1998}]
```

```javascript
// query result
[{ film_id: "2" }, { film_id: "4" }, { film_id: "6" }, { film_id: "8" }];
```
