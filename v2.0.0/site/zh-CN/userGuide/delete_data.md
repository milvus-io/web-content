---
id: delete_data.md
related_key: delete
summary: Learn how to delete data in Milvus.
---

# Delete Entities

This topic describes how to delete entities in Milvus.

Milvus supports deleting entities by primary key filtered with boolean expression.


<div class="alert caution">
    <ul>
        <li>Entities deleted beyond the pre-specified span of time for Time Travel cannot be retrieved again.</li>
        <li>Frequent deletion operations will impact the system performance.</li>
    </ul>
</div>

## Load the collection

All CRUD operations within Milvus are executed in memory, hence before deletion, load the collection that contains the entities you expect to delete.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
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

## Prepare boolean expression

Prepare the boolean expression that filters the entities to delete. See [Boolean Expression Rules](boolean.md) for more information.

The following example filters data with primary key values of `425790736918318406` and `425790736918318407`.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
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
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-c</td>
            <td>The name of the collection.</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>The name of the partition that the entities belong to.</td>
        </tr>
    </tbody>
</table>


## Delete entities

Delete the entities with the boolean expression you created.

By specifying `partition_name`, you can decide from which partition to delete the entities and thus save the resources.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
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
		<td>Name of the collection to delete entities from.</td>
	</tr>
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
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

