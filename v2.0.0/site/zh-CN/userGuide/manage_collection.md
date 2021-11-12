---
id: manage_collection.md
related_key: create collection
summary: Learn how to manage collections in Milvus.
---

# Manage Collections

This topic describes how to manage collections in Milvus.

A collection consists of one or more partitions. While creating a new collection, Milvus creates a default partition `_default`. See [Glossary - Collection](glossary.md#Collection) for more information.

The following example is based on a two-shard collection named `example_collection` with an eight-dimension float vector field, and an INT64, `auto_id` enabled primary key field.


## Create a collection

<div class="alert note">
<ul>
  <li>You can create collections only after <a href="manage_connection.md">connecting to Milvus server</a>.</li>
  <li>The collection to create must contain a primary key field. INT64 is the only supported data type for the primary key field in current release of Milvus.</li>
  </ul>
</div>


First, prepare necessary parameters, including field schema, collection schema, and collection name.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import CollectionSchema, FieldSchema, DataType
>>> pk = FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=True)
>>> field = FieldSchema(name="example_field", dtype=DataType.FLOAT_VECTOR, dim=8)
>>> schema = CollectionSchema(fields=[pk,field], description="example collection")
>>> collection_name = "example_collection"
```

```javascript
const params = {
  collection_name: "example_collection",
  description: "example collection",
  fields: [
    {
      name: "example_field",
      description: "",
      data_type: 101,     // DataType.FloatVector
      type_params: {
        dim: "8",
      },
    },
    {
      name: "pk",
      data_type: 5,       // DataType.Int64
      autoID: true,
      is_primary_key: true,
      description: "",
    },
  ],
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
		<td><code>FieldSchema</code></td>
		<td>Schema of the fields within the collection to create. Refer to <a href="field_schema.md">Field Schema</a> for more information.</td>
	</tr>
	<tr>
		<td><code>CollectionSchema</code></td>
    <td>Schema of the collection to create. Refer to <a href="collection_schema.md">Collection Schema</a> for more information.</td>
	</tr>
	<tr>
		<td><code>collection_name</code></td>
		<td>Name of the collection to create.</td>
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
		<td>Name of the collection to create.</td>
	</tr>
    <tr>
		<td><code>description</code></td>
		<td>Description of the collection to create.</td>
	</tr>
	<tr>
		<td><code>fields</code></td>
    <td>Schema of the filed and the collection to create. Refer to <a href="field_schema.md">Field Schema</a> and <a href="collection_schema.md">Collection Schema</a> for more information.</td>
	</tr>
	<tr>
		<td><code>data_type</code></td>
    <td>Data type of the filed to create. Refer to <a href="https://github.com/milvus-io/milvus-sdk-node/blob/main/milvus/types/Common.ts">data type reference number</a> for more information.</td>
	</tr>
	</tbody>
</table>

Then, create a collection with the parameters you created above.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection = Collection(name=collection_name, schema=schema, using='default', shards_num=2)
```

```javascript
await milvusClient.collectionManager.createCollection(params);
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
		<td><code>using</code> (optional)</td>
    <td>By specifying the server alias here, you can choose in which Milvus server you create a collection.</td>
</tr>
<tr>
	<td><code>shards_num</code> (optional)</td>
	<td>Number of the shards for the collection to create.</td>
</tr>
</tbody>
</table>




## Verify if a collection exists

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import utility
>>> utility.has_collection("example_collection")
```

```javascript
await milvusClient.collectionManager.hasCollection({
  collection_name: "example_collection",
});
```



## List all collections

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import utility
>>> utility.list_collections()
```

```javascript
await milvusClient.collectionManager.showCollections();
```

## View collection statistics

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection = Collection("example_collection")      # Get an existing collection.
>>> collection.num_entities
```

```javascript
await milvusClient.collectionManager.getCollectionStatistics({  collection_name: "example_collection",});
```


## Load a collection

All CRUD operations within Milvus are executed in memory. Load the collection to memory before searching or deleting data.

<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> from pymilvus import Collection
>>> collection = Collection("example_collection")      # Get an existing collection.
>>> collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: "example_collection",
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
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to load.</td>
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

## Drop a collection

Remove a collection and the data within.

<div class="alert caution">
The drop operation is irreversible. Dropping a collection deletes all data within it.
</div>


<div class="multipleCode">

  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.drop("example_collection")
```

```javascript
await milvusClient.collectionManager.dropCollection({  collection_name: "example_collection",});
```

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](manage_data.md)
  - [Create a partition](manage_partition.md)
  - [Build an index for vectors](manage_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

