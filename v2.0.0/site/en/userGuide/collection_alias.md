---
id: collection_alias.md
related_key: collection alias
summary: Learn how to manage collection alias in Milvus.
---

# Collection Alias

Milvus supports specifying a unique alias for a collection.

<div class="alert note">
A collection alias is globally unique, hence you cannot assign the same alias to different collections. However, you can assign multiple aliases to one collection.
</div>

The following example is based on the alias `publication`.

## Create a collection alias

Specify an an alias for a collection.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.create_alias("publication")
```

```javascript
await milvusClient.collectionManager.createAlias({
  collection_name: "book",
  alias: "publication",
});
```

```cli
create alias -c book -a publication
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
            <td>Name of the collection to create alias on.</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>Collection alias to create.</td>
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
            <td>Name of the collection to create alias on.</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>Collection alias to create.</td>
        </tr>
	</tbody>
</table>

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
            <td>Name of the collection to create alias on.</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>Collection alias to create.</td>
        </tr>
        <tr>
            <td>-A (Optional)</td>
            <td>Flag to transfer the alias to a specified collection.</td>
        </tr>
    </tbody>
</table>



## Drop a collection alias

Drop a specified alias.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection.drop_alias("publication")
```

```javascript
await milvusClient.collectionManager.dropAlias({
  alias: "publication",
});
```

```cli
delete alias -c book -a publication
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
            <td><code>alias</code></td>
            <td>Collection alias to drop.</td>
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
            <td><code>alias</code></td>
            <td>Collection alias to drop.</td>
        </tr>
	</tbody>
</table>

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
            <td>Name of the collection to drop alias on.</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>Collection alias to drop.</td>
        </tr>
    </tbody>
</table>


## Alter a collection alias

Alter an existing alias to another collection.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.alter_alias("publication")
```

```javascript
await milvusClient.collectionManager.alterAlias({
  collection_name: "book",
  alias: "publication",
});
```

```cli
create alias -c book -A -a publication
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
            <td>Name of the collection to alter alias to.</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>Collection alias to alter.</td>
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
            <td>Name of the collection to alter alias to.</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>Collection alias to alter.</td>
        </tr>
	</tbody>
</table>

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
            <td>Name of the collection to alter alias to.</td>
        </tr>
        <tr>
            <td>-a</td>
            <td>Collection alias to alter.</td>
        </tr>
        <tr>
            <td>-A</td>
            <td>Flag to transfer the alias to a specified collection.</td>
        </tr>
    </tbody>
</table>

## Limits

|Feature|Maximum limit|
|---|---|
|Length of an alias|255 characters|

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc9/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.20/tutorial.html)

