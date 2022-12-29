---
id: release_partition.md
related_key: release partition
summary: Learn how to release a partition into memory for search or query in Milvus.
---

# Release a Partition

This topic describes how to release a partition from memory after a search or a query to reduce memory usage.


<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import Partition
partition = Partition("novel")       # Get an existing partition.
partition.release()
```

```javascript
await milvusClient.partitionManager.releasePartitions({
    collection_name: "book",
    partition_names: ["novel"],
 });
```

```go
err := milvusClient.ReleasePartitions(
  context.Background(),   // ctx
  "book",                 // CollectionName
  []string{"novel"}       // partitionNames
)
if err != nil {
  log.Fatal("failed to release partitions:", err.Error())
}
```

```java
milvusClient.releasePartitions(
  ReleasePartitionsParam.newBuilder()
    .withCollectionName("book")
    .withPartitionNames(["novel"])
    .build()
);
```

```shell
release -c book -p novel
```

``` curl
curl -X 'DELETE' \
  'http://localhost:9091/api/v1/partitions/load' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "partition_names": ["novel"],
    "replica_number": 1
  }'
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
		<td><code>partition_name</code></td>
		<td>Name of the partition.</td>
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
		<td>Name of the collection to release partitions.</td>
	</tr>
    <tr>
		<td><code>partition_names</code></td>
		<td>List of names of the partitions to release.</td>
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
            <td>Name of the collection to release partitions.</td>
        </tr>
        <tr>
            <td><code>partitionNames</code></td>
            <td>List of names of the partitions to release.</td>
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
            <td>Name of the collection to release partition.</td>
        </tr>
        <tr>
            <td><code>PartitionNames</code></td>
            <td>List of names of the partitions to release.</td>
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
            <td>Name of the collection to release partition.</td>
        </tr>
        <tr>
            <td>-p (Multiple)</td>
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
		<td>Name of the collection to release partitions.</td>
	</tr>
    <tr>
		<td><code>partition_names</code></td>
		<td>List of names of the partitions to release.</td>
	</tr>
	</tbody>
</table>

## Constraints

- Error will be returned at the attempt to load partition(s) when the parent collection is already loaded. Future releases will support releasing partitions from a loaded collection, and (if needed) then loading some other partition(s).
- "Load successfully" will be returned at the attempt to load the collection that is already loaded.
- Error will be returned at the attempt to load the collection when the child partition(s) is/are already loaded. Future releases will support loading the collection when some of its partitions are already loaded.
- Loading different partitions in a same collection via separate RPCs is not allowed.


## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
