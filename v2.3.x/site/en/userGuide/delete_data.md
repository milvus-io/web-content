---
id: delete_data.md
related_key: delete
summary: Learn how to delete data in Milvus.
title: Delete Entities
---

# Delete Entities

This topic describes how to delete entities in Milvus.

Milvus supports deleting entities by primary key or complex boolean expressions. Deleting entities by primary key is much faster and lighter than deleting them by complex boolean expressions. This is because Milvus executes queries first when deleting data by complex boolean expressions.


<div class="alert caution">
    <ul>
		  <li>Deleted entities can still be retrieved immediately after the deletion if the consistency level is set lower than <code>Strong</code>.</li>
	      <li>Entities deleted beyond the pre-specified span of time for Time Travel cannot be retrieved again.</li>
          <li>Frequent deletion operations will impact the system performance.</li>
		  <li>Before deleting entities by comlpex boolean expressions, make sure the collection has been loaded.</li>
		  <li>Deleting entities by complex boolean expressions is not an atomic operation. Therefore, if it fails halfway through, some data may still be deleted.</li>
		  <li>Deleting entities by complex boolean expressions is supported only when the consistency is set to <b>Bounded</b>. For details, see <a href="consistency.md#Consistency-levels">Consistency</a>.</li>
    </ul>
</div>

<div class="alert note">

When interacting with Milvus using Python code, you have the flexibility to choose between PyMilvus and MilvusClient (new). For more information, refer to <a href="https://milvus.io/api-reference/pymilvus/v2.3.x/About.md">Python SDK</a>.

</div>

## Prepare boolean expression

Prepare the boolean expression that filters the entities to delete.

Milvus supports deleting entities by primary key or complex boolean expressions. For more information on expression rules and supported operators, see [Boolean Expression Rules](boolean.md).

### Simple boolean expression

Use a simple expression to filter data with primary key values of `0` and `1`:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>

```python
expr = "book_id in [0,1]"
```

```javascript
const expr = "book_id in [0,1]";
```

```go
expr := "book_id in [0,1]"
```

```java
private static final String DELETE_EXPR = "book_id in [0,1]";
```

<div style="display: none">

```shell
delete entities -c book
The expression to specify entities to be deleted： book_id in [0,1]
```

</div>

```curl
# See the following section.
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

### Complex boolean expression

To filter entities that meet specific conditions, define complex boolean expressions.

Filter entities whose `word_count` is greater than or equal to `11000`:

```python
expr = "word_count >= 11000"
```

```go
expr := "word_count >= 11000"
```

Filter entities whose `book_name` is not `Unknown`:

```python
expr = "book_name != Unknown"
```

```go
expr := "book_name != Unknown"
```

Filter entities whose primary key values are greater than `5` and `word_count` is smaller than or equal to `9999`:

```python
expr = "book_id > 5 && word_count <= 9999"
```

```go
expr := "book_id > 5 && word_count <= 9999"
```

## Delete entities

Delete the entities with the boolean expression you created. Milvus returns the ID list of the deleted entities.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>

```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.delete(expr)
```

```javascript
await milvusClient.deleteEntities({
  collection_name: "book",
  expr: expr,
});
```

```go
err = milvusClient.Delete(
    context.Background(), // ctx
    "book",               // collection name
    "",                   // partition name
    expr,                 // expr
)
if err != nil {
    log.Fatal("failed to delete:", err.Error())
}
```

```java
milvusClient.delete(
  DeleteParam.newBuilder()
    .withCollectionName("book")
    .withExpr(DELETE_EXPR)
    .build()
);
```

<div style="display: none">

```shell
You are trying to delete the entities of collection. This action cannot be undone!
Do you want to continue? [y/N]: y
```

</div>

```curl
curl -X 'POST' \
  '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/delete' \
  -H 'Authorization: Bearer ${TOKEN}' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
       "collectionName": "collection1",
       "id": 1
     }'
```

<div class="language-curl">
Output:

```json
{
    "code": 200,
    "data": {}
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
		<td><code>collectionName</code></td>
		<td>The name of the collection to which this operation applies.</td>
	</tr>
	<tr>
		<td><code>id</code></td>
		<td>The ID of the entity to drop.</td>
	</tr>
	</tbody>
</table>

## What's next

- Learn more basic operations of Milvus:
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
