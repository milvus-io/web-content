---
id: drop_partition.md
related_key: Partition
summary: Learn how to drop a partition in Milvus.
---

# Drop Partitions

This topic describes how to drop a partition in a specified collection.


<div class="alert caution">
Dropping a partition irreversibly deletes all data within it.
</div>


<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection.drop_partition("novel")
```

```javascript
await milvusClient.partitionManager.dropPartition({
  collection_name: "book",
  partition_name: "novel",
});
```

```cli
delete partition -c book -p novel
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
            <td>Name of the collection to drop partition from.</td>
        </tr>
        <tr>
            <td>-p</td>
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
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc8/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.19/tutorial.html)

