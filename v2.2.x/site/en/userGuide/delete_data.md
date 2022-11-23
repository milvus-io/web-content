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
	      <li>Deleted entities can still be retrieved immediately after the deletion if the consistency level is set lower than <code>Strong</code>.</li>
	      <li>Entities deleted beyond the pre-specified span of time for Time Travel cannot be retrieved again.</li>
        <li>Frequent deletion operations will impact the system performance.</li>
    </ul>
</div>



## Prepare boolean expression

Prepare the boolean expression that filters the entities to delete. 

Milvus only supports deleting entities with clearly specified primary keys, which can be achieved merely with the term expression `in`. Other operators can be used only in query or scalar filtering in vector search. See [Boolean Expression Rules](boolean.md) for more information.

The following example filters data with primary key values of `0` and `1`.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
expr = "book_id in [0,1]"
```

```javascript
const expr = "book_id in [0,1]";
```

```java
private static final String DELETE_EXPR = "book_id in [0,1]";
```

```shell
delete entities -c book
The expression to specify entities to be deleted： book_id in [0,1]
```

```curl
"expr" = "book_id in [0,1]"
```

<table class="language-shell">
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

Delete the entities with the boolean expression you created. Milvus returns the ID list of the deleted entities.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.delete(expr)
```

```javascript
await milvusClient.dataManager.deleteEntities({
  collection_name: "book",
  expr: expr,
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.delete(
  DeleteParam.newBuilder()
    .withCollectionName("book")
    .withExpr(DELETE_EXPR)
    .build()
);
```

```shell
You are trying to delete the entities of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

```curl
curl -X 'DELETE' \
  'http://localhost:9091/api/v1/entities' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "expr": "book_id in [0,1]"
  }'
```

<div class="language-curl">
Output:

```json
{
  "status":{},
  "IDs":{"IdField":{"IntId":{"data":[0,1]}}},
  "delete_cnt":2,
  "timestamp":434262178115092482
}
```

</div>

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

<table class="language-java">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>CollectionName</code></td>
		<td>Name of the collection to delete entities from.</td>
	</tr>
    <tr>
		<td><code>expr</code></td>
		<td>Boolean expression that specifies the entities to delete.</td>
	</tr>
    <tr>
		<td><code>PartitionName</code> (optional)</td>
		<td>Name of the partition to delete entities from.</td>
	</tr>
	</tbody>
</table>

<table class="language-curl">
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
	</tbody>
</table>

## What's next

- Learn more basic operations of Milvus:
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
