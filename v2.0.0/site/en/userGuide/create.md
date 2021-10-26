---
id: create.md
related_key: create collection
summary: Learn how to create a collection in Milvus.
---

# Create a Collection or Partition

This topic describes how to create a collection or a partition in Milvus.

<div class="alert note">
Parameters marked with <code>*</code> are specific to Python SDK, and those marked with <code>**</code> are specific to Node.js SDK.
</div>

## Create a collection

Collections can only be created after successfully connecting to the Milvus server.

<div class="alert note">
The created collection must contain a primary key field. Int64 is the only supported data type for the primary key field for now.
</div>

1. Prepare collection parameters, including collection name and field parameters. Refer to API documents for respective languages for a detailed description of these parameters.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
collection_name = "example_collection"
field_name = "example_field"
from pymilvus import Collection, CollectionSchema, FieldSchema, DataType
pk = FieldSchema(name="pk", dtype=DataType.INT64, is_primary=True, auto_id=True)
field = FieldSchema(name=field_name, dtype=DataType.FLOAT_VECTOR, dim=8)
schema = CollectionSchema(fields=[pk,field], description="example collection")
```

```javascript
const COLLECTION_NAME = "example_collection";
const FIELD_NAME = "example_field";

const params = {
  collection_name: COLLECTION_NAME,
  fields: [
    {
      name: FIELD_NAME,
      description: "vector field",
      data_type: DataType.FloatVector,

      type_params: {
        dim: "8",
      },
    },
    {
      name: "age",
      data_type: DataType.Int64,
      autoID: true,
      is_primary_key: true,
      description: "",
    },
  ],
};
```

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>Name of the collection to create</td>
		<td>Data type: String</td>
	</tr>
	<tr>
		<td><code>field_name</code></td>
		<td>Name of the field in the collection</td>
		<td>Data type: String</td>
	</tr>
	<tr>
		<td><code>Schema</code></td>
		<td>Schema used to create a collection and the fields within. Refer to <a href="field_schema.md">field schema</a> and <a href="collection_schema.md">collection schema</a> for detailed description</td>
		<td>&nbsp;</td>
	</tr>
	<tr>
		<td><code>description</code></td>
		<td>Description of the collection</td>
		<td>Data type: String</td>
	</tr>
	</tbody>
</table>
</details>

2. Create a collection:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection = Collection(name=collection_name, schema=schema, using='default', shards_num=2)

# Get an existing collection by its name.
collection=Collection(name=collection_name)
```

```javascript
await milvusClient.collectionManager.createCollection(params);
```

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>using*</td>

		<td>By specifying the server alias here, you can decide in which Milvus server you create a collection.</td>
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

3. Check if the collection is created successfully:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> import pymilvus
>>> pymilvus.utility.get_connection().has_collection(collection_name)
True
```

```javascript
await milvusClient.collectionManager.hasCollection({
  collection_name: COLLECTION_NAME,
});
```

4. List all created collections:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> pymilvus.utility.get_connection().list_collections()
['example_collection']
```

```javascript
await milvusClient.collectionManager.showCollections();
```

5. View collection statistics, such as row count:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.num_entities
0
```

```javascript
await milvusClient.collectionManager.getCollectionStatistics({
  collection_name: COLLECTION_NAME,
});
```

## Create a partition

Search performance worsens as more vectors are inserted into the collection. To help mitigate declining search performance, consider creating collection partitions. Partitioning is a way to separate data. Partition names narrow a search to a specific number of vectors, improving query performance. To improve search efficiency, divide a collection into several partitions by name.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> partition_name = "example_partition"
>>> partition = collection.create_partition(partition_name)
```

```javascript
await milvusClient.partitionManager.createPartition({
  collection_name: COLLECTION_NAME,
  partition_name: "example_partition",
});
```

<details>
  <summary><b>Detailed Description</b></summary>
<table class="params">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
		<th>Note</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td>partition_name</td>
		<td>Name of the partition to create</td>
		<td>Data type: String</td>
	</tr>
	</tbody>
</table>
</details>

Milvus creates a default partition name, `_default`, for new collections. After creating a partition, you have two partition names, `example_partition` and `_default`.

List all partitions in a collection:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.partitions
[{"name": "_default", "description": "", "num_entities": 0}, {"name": "example_partition", "description": "", "num_entities": 0}]
```

```javascript
await milvusClient.partitionManager.showPartitions({
  collection_name: COLLECTION_NAME,
});
```

Check if a partition is successfully created:

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
</div>


```python
>>> collection.has_partition(partition_name)
True
```

```javascript
await milvusClient.partitionManager.hasPartition({
  collection_name: COLLECTION_NAME,
  partition_name: "example_partition",
});
```
