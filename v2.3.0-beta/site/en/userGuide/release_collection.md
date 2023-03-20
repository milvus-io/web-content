---
id: release_collection.md
related_key: release collection
summary: Learn how to release a collection from memory in Milvus.
---

# Release a Collection

This topic describes how to release a collection from memory after a search or a query to reduce memory usage.

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
collection.release()
```

```javascript
await milvusClient.collectionManager.releaseCollection({
  collection_name: "book",
});
```

```go
err := milvusClient.ReleaseCollection(
  context.Background(),                            // ctx
  "book",                                          // CollectionName
)
if err != nil {
  log.Fatal("failed to release collection:", err.Error())
}
```

```java
milvusClient.releaseCollection(
  ReleaseCollectionParam.newBuilder()
    .withCollectionName("book")
    .build()
);
```

```shell
release -c book
```

``` curl
curl -X 'DELETE' \
  'http://localhost:9091/api/v1/collection/load' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book"
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
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to release.</td>
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
		<td>Name of the collection to release.</td>
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
            <td>Name of the collection to release.</td>
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
            <td>Name of the collection to release.</td>
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
            <td>Name of the collection to release.</td>
        </tr>
        <tr>
            <td>-p (Optional/Multiple)</td>
            <td>The name of the partition to release.</td>
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
		<td>Name of the collection to release.</td>
	</tr>
	</tbody>
</table>

## Constraints

- Releasing the collection that is successfully loaded is allowed.
- Releasing the collection is allowed when its partition(s) are loaded.
- Error will be returned at the attempt to release partition(s) when the parent collection is already loaded. Future releases will support releasing partitions from a loaded collection, and loading the collection when its partition(s) are released.



## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

