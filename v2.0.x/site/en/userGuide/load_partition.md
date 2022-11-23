---
id: load_partition.md
related_key: load partition
summary: Learn how to load a partition into memory for search or query in Milvus.
---

# Load a Partition

This topic describes how to load a partition to memory. Loading partitions instead of the whole collection to memory can significantly reduce the memory usage. All search and query operations within Milvus are executed in memory. 

<div class="alert warning">
In current release, volume of the data to load must be under 90% of the total memory resources of all query nodes to reserve memory resources for execution engine.
</div>

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
collection.load(["novel"])

# Or you can load a partition with the partition as an object
from pymilvus import Partition
partition = Partition("novel")       # Get an existing partition.
partition.load()
```

```javascript
await milvusClient.partitionManager.loadPartitions({
  collection_name: "book",
  partition_names: ["novel"],
});
```

```go
err := milvusClient.LoadPartitions(
  context.Background(),   // ctx
  "book",                 // CollectionName
  []string{"novel"},      // partitionNames
  false                   // async
)
if err != nil {
  log.Fatal("failed to load partitions:", err.Error())
}
```

```java
milvusClient.loadPartitions(
  LoadPartitionsParam.newBuilder()
          .withCollectionName("book")
          .withPartitionNames(["novel"])
          .build()
);
```

```shell
load -c book -p novel
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
		<td>Name of the collection to load partitions from.</td>
	</tr>
    <tr>
		<td><code>partition_names</code></td>
		<td>List of names of the partitions to load.</td>
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
            <td>Name of the collection to load partitions from.</td>
        </tr>
        <tr>
            <td><code>partitionNames</code></td>
            <td>List of names of the partitions to load.</td>
        </tr>
        <tr>
            <td><code>async</code></td>
            <td>Switch to control sync/async behavior. The deadline of context is not applied in sync load.</td>
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
            <td>Name of the collection to load partitions from.</td>
        </tr>
        <tr>
            <td><code>PartitionNames</code></td>
            <td>List of names of the partitions to load.</td>
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
            <td>Name of the collection to load partitions from.</td>
        </tr>
        <tr>
            <td>-p (Multiple)</td>
            <td>The name of the partition to load.</td>
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

