---
id: insert_data.md
related_key: insert
summary: Learn how to insert data in Milvus.
---

# Insert Entities

This topic describes how to insert data in Milvus via client.

You can also migrate data to Milvus with [MilvusDM](migrate_overview.md), an open-source tool designed specifically for importing and exporting data with Milvus.

Milvus 2.1 supports VARCHAR data type on scalar field. When building indexes for VARCHAR-type scalar fields, the default index type is dictionary tree.

The following example inserts 2,000 rows of randomly generated data as the example data (Milvus CLI example uses a pre-built, remote CSV file containing similar data). Real applications will likely use much higher dimensional vectors than the example. You can prepare your own data to replace the example.

## Prepare data

First, prepare the data to insert.  Data type of the data to insert must match the schema of the collection, otherwise Milvus will raise exception.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
import random
data = [
  [i for i in range(2000)],
  [str(i) for i in range(2000)],
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

```curl
# See the following step.
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
  <a href="#curl">Curl</a>
</div>


```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
mr = collection.insert(data)
```

```javascript
const mr = await milvusClient.dataManager.insert({
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

```curl
curl -X 'POST' \
  'http://localhost:9091/api/v1/entities' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "collection_name": "book",
  "fields_data": [
    {
      "field_name": "book_id",
      "type": 5,
      "field": [
        1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
      ]
    },
    {
      "field_name": "word_count",
      "type": 5,
      "field": [
        1000,2000,3000,4000,5000,6000,7000,8000,9000,10000,11000,12000,13000,14000,15000,16000,17000,18000,19000,20000,21000,22000,23000,24000,25000,26000,27000,28000,29000,30000,31000,32000,33000,34000,35000,36000,37000,38000,39000,40000,41000,42000,43000,44000,45000,46000,47000,48000,49000,50000,51000,52000,53000,54000,55000,56000,57000,58000,59000,60000,61000,62000,63000,64000,65000,66000,67000,68000,69000,70000,71000,72000,73000,74000,75000,76000,77000,78000,79000,80000,81000,82000,83000,84000,85000,86000,87000,88000,89000,90000,91000,92000,93000,94000,95000,96000,97000,98000,99000,100000
      ]
    },
    {
      "field_name": "book_intro",
      "type": 101,
      "field": [
        [1,1],[2,1],[3,1],[4,1],[5,1],[6,1],[7,1],[8,1],[9,1],[10,1],[11,1],[12,1],[13,1],[14,1],[15,1],[16,1],[17,1],[18,1],[19,1],[20,1],[21,1],[22,1],[23,1],[24,1],[25,1],[26,1],[27,1],[28,1],[29,1],[30,1],[31,1],[32,1],[33,1],[34,1],[35,1],[36,1],[37,1],[38,1],[39,1],[40,1],[41,1],[42,1],[43,1],[44,1],[45,1],[46,1],[47,1],[48,1],[49,1],[50,1],[51,1],[52,1],[53,1],[54,1],[55,1],[56,1],[57,1],[58,1],[59,1],[60,1],[61,1],[62,1],[63,1],[64,1],[65,1],[66,1],[67,1],[68,1],[69,1],[70,1],[71,1],[72,1],[73,1],[74,1],[75,1],[76,1],[77,1],[78,1],[79,1],[80,1],[81,1],[82,1],[83,1],[84,1],[85,1],[86,1],[87,1],[88,1],[89,1],[90,1],[91,1],[92,1],[93,1],[94,1],[95,1],[96,1],[97,1],[98,1],[99,1],[100,1]
      ]
    }
  ],
  "num_rows": 100
}'
```

<div class="language-curl">
Output:

```json
{
  "status":{},
  "IDs":{
    "IdField":{
      "IntId":{"data":[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100]
      }
    }
  },
  "succ_index":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99],
  "insert_cnt":100,
  "timestamp":434262073374408706
}
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
        <td>Name of the collection to insert data into.</td>
    </tr>
    <tr>
        <td><code>partitionName</code></td>
        <td>Name of the partition to insert data into. Data will be inserted in the default partition if left blank.</td>
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
		<td>Name of the field to insert data into.</td>
	</tr>
	<tr>
		<td><code>DataType</code></td>
		<td>Data type of the field to insert data into.</td>
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

<table class="language-curl">
    <thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>collection_name</code></td>
            <td>Name of the collection to insert data into.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>fields_data</code></td>
            <td>Data to insert into Milvus.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>field_name</code></td>
            <td>Name of the field to insert data into.</td>
            <td>N/A</td>
        </tr>		
        <tr>
            <td><code>type</code></td>
            <td>Data type of the field to insert data into.</td>
            <td>
                Enums:
                <br>1: "Bool",
                <br>2: "Int8",
                <br>3: "Int16",
                <br>4: "Int32",
                <br>5: "Int64",
                <br>10: "Float",
                <br>11: "Double",
                <br>20: "String",
                <br>21: "VarChar",
                <br>100: "BinaryVector",
                <br>101: "FloatVector",
            </td>
        </tr>
        <tr>
            <td><code>field</code></td>
            <td>The data of one column to be inserted.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>num_rows</code></td>
            <td>Number of rows to be inserted. The number should be the same as the length of each <code>field</code> array.</td>
            <td>N/A</td>
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

