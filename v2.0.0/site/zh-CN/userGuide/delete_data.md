---
id: delete_data.md
related_key: delete
summary: Learn how to delete data in Milvus.
---

# Delete Entities

<div class="alert note">
<h3>Milvus Docs 需要你的帮助</h3>
本文档暂时没有中文版本，欢迎你成为社区贡献者，协助中文技术文档的翻译。<br>
你可以通过页面右边的 <b>编辑</b> 按钮直接贡献你的翻译。更多详情，参考 <a href="https://github.com/milvus-io/milvus-docs/blob/v2.0.0/CONTRIBUTING.md">贡献指南</a>。如需帮助，你可以 <a href="https://github.com/milvus-io/milvus-docs/issues/new/choose">提交 GitHub Issue</a>。
</div>


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

Prepare the boolean expression that filters the entities to delete. See [Boolean Expression Rules](boolean.md) for more information.

The following example filters data with primary key values of `0` and `1`.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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
				.build());
```

```shell
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


## What's next

- Learn more basic operations of Milvus:
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.1/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.1/tutorial.html)

