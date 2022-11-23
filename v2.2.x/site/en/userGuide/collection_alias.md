---
id: collection_alias.md
related_key: collection alias
summary: Learn how to manage collection alias in Milvus.
---

# Collection Alias

This topic describes how to manage collection aliases. Milvus supports specifying a unique alias for a collection.

<div class="alert note">
A collection alias is globally unique, hence you cannot assign the same alias to different collections. However, you can assign multiple aliases to one collection.
</div>

The following example is based on the alias `publication`.

## Create a collection alias

Specify an an alias for a collection.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import utility
utility.create_alias(
  collection_name = "book",
  alias = "publication"
)
```

```javascript
await milvusClient.collectionManager.createAlias({
  collection_name: "book",
  alias: "publication",
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.createAlias(
  CreateAliasParam.newBuilder()
    .withCollectionName("book")
    .withAlias("publication")
    .build()
);
```

```shell
create alias -c book -a publication
```

```curl
curl -X 'POST' \
  'http://localhost:9091/api/v1/alias' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "alias":"publication"
  }'
```
```curl
# Output:
{}
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
            <td>Name of the collection to create alias on.</td>
        </tr>
        <tr>
            <td><code>Alias</code></td>
            <td>Collection alias to create.</td>
        </tr>
	</tbody>
</table>

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
            <td>Name of the collection to create alias on.</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>Collection alias to create.</td>
        </tr>
	</tbody>
</table>

## Drop a collection alias

Drop a specified alias.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import utility
utility.drop_alias(alias = "publication")
```

```javascript
await milvusClient.collectionManager.dropAlias({
  alias: "publication",
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.dropAlias(
  DropAliasParam.newBuilder()
    .withAlias("publication")
    .build()
);
```

```shell
delete alias -a publication
```

```curl
curl -X 'DELETE' \
  'http://localhost:9091/api/v1/alias' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "alias":"publication"
  }'
```
```curl
# Output:
{}
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

<table class="language-java">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>Alias</code></td>
            <td>Collection alias to drop.</td>
        </tr>
	</tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>-a</td>
            <td>Collection alias to drop.</td>
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
            <td><code>alias</code></td>
            <td>Collection alias to drop.</td>
        </tr>
	</tbody>
</table>

## Alter a collection alias

Alter an existing alias to another collection. The following example is based on the situation that the alias `publication` was originally created for another collection.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import utility
utility.alter_alias(
  collection_name = "book",
  alias = "publication"
)
```

```javascript
await milvusClient.collectionManager.alterAlias({
  collection_name: "book",
  alias: "publication",
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.alterAlias(
  AlterAliasParam.newBuilder()
    .withCollectionName("book")
    .withAlias("publication")
    .build()
);
```

```shell
create alias -c book -A -a publication
```

```curl
curl -X 'PATCH' \
  'http://localhost:9091/api/v1/alias' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "alias":"publication"
  }'
```

<div class="language-curl">
Output:

```json
{}
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
            <td>Name of the collection to alter alias to.</td>
        </tr>
        <tr>
            <td><code>Alias</code></td>
            <td>Collection alias to alter.</td>
        </tr>
	</tbody>
</table>

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
            <td>Name of the collection to alter alias to.</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>Collection alias to alter.</td>
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

