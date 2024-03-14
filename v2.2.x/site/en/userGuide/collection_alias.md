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

Specify an alias for a collection.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import utility
utility.create_alias(
  collection_name = "book",
  alias = "publication"
)
```

```javascript
await milvusClient.createAlias({
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

```csharp
await milvusClient.CreateAliasAsync("book", "publication");
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

<table class="language-shell" style="display: none">
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

<table class="language-csharp">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collectionName</code></td>
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
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import utility
utility.drop_alias(alias = "publication")
```

```javascript
await milvusClient.dropAlias({
  alias: "publication",
});
```

```go
client.DropAlias(context.Background(), "publication")
```

```java
milvusClient.dropAlias(
  DropAliasParam.newBuilder()
    .withAlias("publication")
    .build()
);
```

```csharp
await milvusClient.DropAliasAsync("publication");
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

<table class="language-go">
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

<table class="language-csharp">
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
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import utility
utility.alter_alias(
  collection_name = "book",
  alias = "publication"
)
```

```javascript
await milvusClient.alterAlias({
  collection_name: "book",
  alias: "publication",
});
```

```go
client.AlterAlias(context.Background(), "book", "publication")
```

```java
milvusClient.alterAlias(
  AlterAliasParam.newBuilder()
    .withCollectionName("book")
    .withAlias("publication")
    .build()
);
```

```csharp
await milvusClient.AlterAliasAsync("book", "publication");
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
            <td>Name of the collection.</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>New alias</td>
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
            <td>Name of the collection</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>New alias</td>
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
            <td>Name of the collection.</td>
        </tr>
        <tr>
            <td><code>Alias</code></td>
            <td>New alias.</td>
        </tr>
	</tbody>
</table>

<table class="language-go">
    <thead>
        <tr>
            <th>Option</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>collName</td>
            <td>Name of the collection.</td>
        </tr>
        <tr>
            <td>alias</td>
            <td>New Alias</td>
        </tr>
    </tbody>
</table>

<table class="language-csharp">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>collectionName</code></td>
            <td>Name of the collection</td>
        </tr>
        <tr>
            <td><code>alias</code></td>
            <td>New Alias</td>
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

