---
id: manage_data.md
related_key: insert, delete
summary: Learn how to insert and delete data in Milvus.
---

# Manage Data

This topic describes how to insert and delete data in Milvus.

## Insert data

First, prepare the data to insert.

This topic inserts randomly generated 2,000 rows of eight-dimensional vector data as the example data (Milvus CLI example uses a pre-built, remote CSV file containing similar data). Real applications will likely use much higher dimensional vectors than this. You can prepare your own data to replace the example.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
import random
vectors = [[random.random() for _ in range(8)] for _ in range(2000)]
entities = [vectors]
```

```javascript
const entities = Array.from({ length: 2000 }, () => ({
  ["example_field"]: Array.from({ length: 8 }, () => Math.random()),
}));
```

```cli
import -c example_collection 'https://raw.githubusercontent.com/milvus-io/milvus_cli/main/examples/user_guide/manage_data.csv'
```

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
            <td>-c</td>
            <td>--collection-name</td>
            <td>The name of the collection that the data is inserted into.</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>--partition</td>
            <td>(Optional) The name of the partition that the data is inserted into. Not passing this partition option indicates choosing the "_default" partition.</td>
        </tr>
        <tr>
            <td>-t</td>
            <td>--timeout</td>
            <td>(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>

Insert the data to the collection. By specifying `partition_name`, you can decide to which partition to insert the data.

With the collection schema `auto_id` enabled, Milvus automatically assigns an ID (primary key value) to each inserted data.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import collection
collection = Collection("example_collection")      # Get an existing collection.
mr = collection.insert(entities)
```

```javascript
const mr = await milvusClient.dataManager.insert({{
  collection_name: "example_collection",
  fields_data: entities,
});
```

```cli
# See the previous step.
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
		<td><code>collection_name</code></td>
		<td>Name of the collection to get.</td>
	</tr>
    <tr>
		<td><code>data</code></td>
		<td>Data to insert into Milvus.</td>
	</tr>
	<tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to insert data into.</td>
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
		<td>Name of the collection to get.</td>
	</tr>
  <tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to insert data into.</td>
	</tr>
  <tr>
		<td><code>fields_data</code></td>
		<td>Data to insert into Milvus.</td>
	</tr>
	</tbody>
</table>


After the data are inserted, Milvus returns `MutationResult` as an object. You can check the value of `MutationResult`, which contains the corresponding primary keys of the inserted data. As for Milvus CLI, it automatically returns the row count of the successfully inserted data after the data is inserted.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
mr.primary_keys
```

```javascript
console.log(mr.IDs) 
```

```cli
Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are ['pk', 'example_field']

Processed 2001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                    2000
Total collection entities:                2000
Milvus timestamp:           425790736918318406
--------------------------  ------------------
```

```
[425790736918318406, 425790736918318407, 425790736918318408, ...]
```



## Delete entities

Milvus supports deleting entities by primary key specified with boolean expression.


<div class="alert caution">
<ul>
<li>The delete operation is irreversible. Deleted entities cannot be retrieved again.</li>
<li>Frequent delete operations will impact the system performance.</li>
</ul>
</div>

All CRUD operations within Milvus are executed in memory. Before deleting, load the collection that contains the entities you expect to delete to memory.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import collection
collection = Collection("example_collection")      # Get an existing collection.
collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: "example_collection",
});
```

```cli
load -c example_collection
```

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
            <td>-c</td>
            <td>--collection-name</td>
            <td>The name of the collection that the partition belongs to.</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>--partition</td>
            <td>(Optional/Multiple) The name of the partition.</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>


Prepare the boolean expression that filters the entities to delete. See [Boolean Expression Rules](boolean.md) for more information.

The following example filters data with primary key values of `425790736918318406` and `425790736918318407`.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
expr = "pk in [425790736918318406,425790736918318407]"
```

```javascript
const expr = "pk in [425790736918318406,425790736918318407]";
```

```cli
delete entities -c example_collection
The expression to specify entities to be deleted： pk in [425790736918318406,425790736918318407]
```

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
            <td>-c</td>
            <td>--collection-name</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>-p</td>
            <td>--partition</td>
            <td>(Optional) The name of the partition that the entities belong to.</td>
        </tr>
        <tr>
            <td>-t</td>
            <td>--timeout</td>
            <td>(Optional) The maximum allowed duration in seconds of an RPC call. Not passing this option indicates that the client keeps waiting until the server responds or an error occurs.</td>
        </tr>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
        </tr>
    </tbody>
</table>

Delete the entities with the boolean expression you created. By specifying `partition_name`, you can decide from which partition to delete the entities and thus save the resources.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node</a>
  <a href="?cli">CLI</a>
</div>


```python
collection.delete(expr)
```

```javascript
await milvusClient.dataManager.deleteEntities({
  collection_name: "example_collection",
  expr: expr,
});
```

```cli
You are trying to delete the entities of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
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
		<td><code>expr</code></td>
		<td>Boolean expression that specifies the entities to delete.</td>
	</tr>
  <tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to delete entities from.</td>
	</tr>
	</tbody>
</table>




You can verify the delete operation by checking the number of entities after deleting.

```python
collection.num_entities
1998
```

```javascript
const res = await collectionManager.getCollectionStatistics({
  collection_name: "example_collection",
});
console.log(res.data.row_count);
```

```cli
# Milvus CLI automatically returns the row count of the successfully deleted data.
```

## What's next

- Learn more basic operations of Milvus:
  - [Build an index for vectors](manage_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

