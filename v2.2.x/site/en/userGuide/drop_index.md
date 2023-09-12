---
id: drop_index.md
related_key: drop index
summary: Learn how to drop an index in Milvus.
---

# Drop an Index

This topic describes how to drop an index in Milvus. Before dropping an index, make sure to release it first.

<div class="alert caution">
Dropping an index irreversibly removes all corresponding index files.
</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">Go</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.drop_index()
```

```javascript
await milvusClient.dropIndex({
  collection_name: "book",
});
```

```go
err = milvusClient.DropIndex(
  context.Background(),     // ctx
  "book",                   // CollectionName
  "book_intro",             // fieldName
)
if err != nil {
  log.Fatal("fail to drop index:", err.Error())
}
```

```java
milvusClient.dropIndex(
  DropIndexParam.newBuilder()
    .withCollectionName("book")
    .withFieldName("book_intro")
    .build()
);
```

```csharp
await milvusClient.GetCollection("book").DropIndexAsync("book_intro");
```

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
            <td>Name of the collection to drop index from.</td>
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
            <td><code>ctx</code></td>
            <td>Context to control API invocation process.</td>
        </tr>
        <tr>
            <td><code>CollectionName</code></td>
            <td>Name of the collection to drop index on.</td>
        </tr>
        <tr>
            <td><code>fieldName</code></td>
            <td>Name of the vector field to drop index on.</td>
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
            <td>Name of the collection to drop index on.</td>
        </tr>
        <tr>
            <td><code>FieldName</code></td>
            <td>Name of the vector field to drop index on.</td>
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
            <td>Name of the collection to drop index on.</td>
        </tr>
        <tr>
            <td><code>fieldName</code></td>
            <td>Name of the vector field to drop index on.</td>
        </tr>
    </tbody>
</table>

## What's next

- Learn more basic operations of Milvus:
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)

