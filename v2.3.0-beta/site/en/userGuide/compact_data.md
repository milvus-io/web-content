---
id: compact_data.md
related_key: compact data
summary: Learn how to compact data in Milvus.
---

# Compact Data

This topic describes how to compact data in Milvus.

Milvus supports automatic data compaction by default. You can [configure](configure-docker.md) your Milvus to enable or disable [compaction](configure_datacoord.md#dataCoordenableCompaction) and [automatic compaction](configure_datacoord.md#dataCoordcompactionenableAutoCompaction).

If automatic compaction is disabled, you can still compact data manually.

<div class="alert note">
To ensure accuracy of searches with Time Travel, Milvus retains the data operation log within the span specified in <a href="configure_common.md#common.retentionDuration"><code>common.retentionDuration</code></a>. Therefore, data operated within this period will not be compacted. 
</div>

## Compact data manually

Compaction requests are processed asynchronously because they are usually time-consuming. 

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
collection.compact()
```

```javascript
const res = await milvusClient.collectionManager.compact({
  collection_name: "book",
});
const compactionID = res.compactionID;
```

```go
// This function is under active development on the GO client.
```

```java
R<ManualCompactionResponse> response = milvusClient.manualCompaction(
  ManualCompactionParam.newBuilder()
    .withCollectionName("book")
    .build()
);
long compactionID = response.getData().getCompactionID();
```

```shell
compact -c book
```

```curl
curl -X 'POST' \
  'http://localhost:9091/api/v1/compaction' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collectionID": 434262071120432449
  }'
```

<div class="language-curl">
Output:

```json
{"status":{},"compactionID":434262132129005569}
```

</div>

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
		<td>Name of the collection to compact data.</td>
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
            <td>Name of the collection to compact data.</td>
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
            <td>Name of the collection to compact data.</td>
        </tr>
    </tbody>
</table>

## Check compaction status

You can check the compaction status with the compaction ID returned when the manual compaction is triggered.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
collection.get_compaction_state()
```

```javascript
const state = await milvusClient.collectionManager.getCompactionState({
    compactionID
});
```

```go
// This function is under active development on the GO client.
```

```java
milvusClient.getCompactionState(GetCompactionStateParam.newBuilder()
  .withCompactionID(compactionID)
  .build()
);
```

```shell
show compaction_state -c book
```

```curl
curl -X 'GET' \
  'http://localhost:9091/api/v1/compaction/state' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "compactionID": 434262132129005569
  }'
```

<div class="language-curl">
Output:

```json
{"status":{},"state":2}
```

</div>

## What's next

- Learn more basic operations of Milvus:
  - [Insert data into Milvus](insert_data.md)
  - [Create a partition](create_partition.md)
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
