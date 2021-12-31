---
id: insert_data.md
related_key: insert
summary: Learn how to insert data in Milvus.
---

# Insert Data

This topic describes how to insert data in Milvus via client.

You can also migrate data to Milvus with [MilvusDM](migrate_overview.md), an open-source tool designed specifically for importing and exporting data with Milvus.

The following example inserts 2,000 rows of randomly generated data as the example data (Milvus CLI example uses a pre-built, remote CSV file containing similar data). Real applications will likely use much higher dimensional vectors than the example. You can prepare your own data to replace the example.

## Prepare data

First, prepare the data to insert.  Data type of the data to insert must match the schema of the collection, otherwise Milvus will raise exception.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
import random
data = [
    		[i for i in range(2000)],
		[i for i in range(10000, 12000)],
    		[[random.random() for _ in range(2)] for _ in range(2000)],
		]
```

```javascript
const data = Array.from({ length: 2000 }, (v,k) => ({
  "book_id": k,
  "word_count": k+10000,
  "book_intro": Array.from({ length: 2 }, () => Math.random()),
}));
```

```cli
# Prepare your data in a CSV file. Milvus CLI only supports importing data from local or remote files.
```


## Insert data to Milvus

Insert the data to the collection.

By specifying `partition_name`, you can optionally decide to which partition to insert the data.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
mr = collection.insert(data)
```

```javascript
const mr = await milvusClient.dataManager.insert({{
  collection_name: "book",
  fields_data: data,
});
```

```cli
import -c book 'https://raw.githubusercontent.com/milvus-io/milvus_cli/main/examples/user_guide/search.csv'
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
		<td><code>data</code></td>
		<td>Data to insert into Milvus.</td>
	</tr>
	<tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to insert data into.</td>
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
		<td>Name of the collection to insert data into.</td>
	</tr>
  <tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to insert data into.</td>
	</tr>
  <tr>
		<td><code>fields_data</code></td>
		<td>Data to insert into Milvus.</td>
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
            <td>Name of the collection to insert data into.</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>Name of the partition to insert data into.</td>
        </tr>
    </tbody>
</table>


After the data are inserted, Milvus returns the `MutationResult` as an object. You can check the value of the `MutationResult`, which contains the corresponding primary keys of the inserted data. As for Milvus CLI, it automatically returns the row count of the successfully inserted data after the data is inserted.

<div class="multipleCode">
  <a href="?python">Python </a>
  <a href="?javascript">Node.js</a>
  <a href="?cli">CLI</a>
</div>


```python
mr.primary_keys
```

```javascript
console.log(mr.IDs) 
```

```cli
Reading file from remote URL.

Reading csv file...  [####################################]  100%

Column names are ['pk', 'example_field']

Processed 2001 lines.

Inserting ...

Insert successfully.

--------------------------  ------------------
Total insert entities:                    2000
Total collection entities:                2000
Milvus timestamp:           425790736918318406
--------------------------  ------------------
```



## What's next

- Learn more basic operations of Milvus:
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.0rc9/tutorial.html)
  - [Node.js API reference](/api-reference/node/v1.0.20/tutorial.html)

