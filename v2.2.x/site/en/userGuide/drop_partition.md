---
id: drop_partition.md
related_key: Partition
summary: Learn how to drop a partition in Milvus.
---

# Drop Partitions

This topic describes how to drop a partition in a specified collection.

<div class="alert caution">
  <ul>
    <li>&nbsp; You have to release the partition before you drop it.</li>
    <li>&nbsp; Dropping a partition irreversibly deletes all data within it.</li>
  </ul>
</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
</div>

```python
from pymilvus import Collection
collection.drop_partition("novel")
```

```javascript
await milvusClient.dropPartition({
  collection_name: "book",
  partition_name: "novel",
});
```

```go
err := milvusClient.DropPartition(
  context.Background(),   // ctx
  "book",                 // CollectionName
  "novel",                // partitionName
)
if err != nil {
  log.Fatal("fail to drop partition:", err.Error())
}
```

```java
milvusClient.dropPartition(
  DropPartitionParam.newBuilder()
    .withCollectionName("book")
    .withPartitionName("novel")
    .build()
);
```

```csharp
await milvusClient.GetCollection("book").DropPartitionsAsync("novel");
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
            <td>Name of the partition to drop.</td>
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
            <td>Name of the collection to drop partition from.</td>
        </tr>
        <tr>
            <td><code>partition_name</code></td>
            <td>Name of the partition to drop.</td>
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
        <td>Name of the collection to drop a partition in.</td>
    </tr>
    <tr>
        <td><code>partitionName</code></td>
        <td>Name of the partition to drop.</td>
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
        <td>Name of the collection to drop a partition in.</td>
    </tr>
    <tr>
        <td><code>PartitionName</code></td>
        <td>Name of the partition to drop.</td>
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
            <td>Name of the collection to drop partition from.</td>
        </tr>
        <tr>
            <td><code>partitionName</code></td>
            <td>Name of the partition to drop.</td>
        </tr>
	</tbody>
</table>

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

