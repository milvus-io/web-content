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
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

```go
bookIDs := make([]int64, 0, 2000)
wordCounts := make([]int64, 0, 2000)
bookIntros := make([][]float32, 0, 2000)
for i := 0; i < 2000; i++ {
	bookIDs = append(bookIDs, int64(i))
	wordCounts = append(wordCounts, int64(i+10000))
	v := make([]float32, 0, 2)
	for j := 0; j < 2; j++ {
		v = append(v, rand.Float32())
	}
	bookIntros = append(bookIntros, v)
}
idColumn := entity.NewColumnInt64("book_id", bookIDs)
wordColumn := entity.NewColumnInt64("word_count", wordCounts)
introColumn := entity.NewColumnFloatVector("book_intro", 2, bookIntros)
```

```java
Random ran = new Random();
List<Long> book_id_array = new ArrayList<>();
List<Long> word_count_array = new ArrayList<>();
List<List<Float>> book_intro_array = new ArrayList<>();
for (long i = 0L; i < 2000; ++i) {
	book_id_array.add(i);
	word_count_array.add(i + 10000);
	List<Float> vector = new ArrayList<>();
	for (int k = 0; k < 2; ++k) {
		vector.add(ran.nextFloat());
	}
	book_intro_array.add(vector);
}
```

```shell
# Prepare your data in a CSV file. Milvus CLI only supports importing data from local or remote files.
```


## Insert data to Milvus

Insert the data to the collection.

By specifying `partition_name`, you can optionally decide to which partition to insert the data.

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
mr = collection.insert(data)
```

```javascript
const mr = await milvusClient.dataManager.insert({{
  collection_name: "book",
  fields_data: data,
});
```

```go
_, err = milvusClient.Insert(
	context.Background(), // ctx
	"book",               // CollectionName
	"",                   // partitionName
	idColumn,             // columnarData
	wordColumn,           // columnarData
	introColumn,          // columnarData
)
if err != nil {
	log.Fatal("failed to insert data:", err.Error())
}
```

```java
List<InsertParam.Field> fields = new ArrayList<>();
fields.add(new InsertParam.Field("book_id", DataType.Int64, book_id_array));
fields.add(new InsertParam.Field("word_count", DataType.Int64, word_count_array));
fields.add(new InsertParam.Field("book_intro", DataType.FloatVector, book_intro_array));

InsertParam insertParam = InsertParam.newBuilder()
  .withCollectionName("book")
  .withPartitionName("novel")
  .withFields(fields)
  .build();
milvusClient.insert(insertParam);
```

```shell
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
        <td>Name of the collection to insert data in.</td>
    </tr>
    <tr>
        <td><code>partitionName</code></td>
        <td>Name of the partition to insert data in. Data will be inserted in the default partition if left blank.</td>
    </tr>
	<tr>
        <td><code>columnarData</code></td>
        <td>Data to insert into each field.</td>
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
		<td><code>fieldName</code></td>
		<td>Name of the field to insert data in.</td>
	</tr>
	<tr>
		<td><code>DataType</code></td>
		<td>Data type of the field to insert data in.</td>
	</tr>
    <tr>
		<td><code>data</code></td>
		<td>Data to insert into each field.</td>
	</tr>
		<tr>
		<td><code>CollectionName</code></td>
		<td>Name of the collection to insert data into.</td>
	</tr>
	<tr>
		<td><code>PartitionName</code> (optional)</td>
		<td>Name of the partition to insert data into.</td>
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
            <td>Name of the collection to insert data into.</td>
        </tr>
        <tr>
            <td>-p (Optional)</td>
            <td>Name of the partition to insert data into.</td>
        </tr>
    </tbody>
</table>


## Limits

|Feature|Maximum limit|
|---|---|
|Dimensions of a vector|32,768|

## What's next

- Learn more basic operations of Milvus:
  - [Build an index for vectors](build_index.md)
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

