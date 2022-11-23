---
id: query.md
related_key: query vectors
summary: Learn how to query vectors in Milvus.
---

# Conduct a Vector Query

This topic describes how to conduct a vector query.

Unlike a vector similarity search, a vector query retrieves vectors via scalar filtering based on [boolean expression](boolean.md). Milvus supports many data types in the scalar fields and a variety of boolean expressions. The boolean expression filters on scalar fields or the primary key field, and it retrieves all results that match the filters.

The following example shows how to perform a vector query on a 2000-row dataset of book ID (primary key), word count (scalar field), and book introduction (vector field), simulating the situation where you query for certain books based on their IDs.


## Load collection

All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector query.

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
collection.load()
```

```javascript
await milvusClient.collectionManager.loadCollection({
  collection_name: "book",
});
```

```go
err := milvusClient.LoadCollection(
  context.Background(),   // ctx
  "book",                 // CollectionName
  false                   // async
)
if err != nil {
  log.Fatal("failed to load collection:", err.Error())
}
```

```java
milvusClient.loadCollection(
  LoadCollectionParam.newBuilder()
    .withCollectionName("book")
    .build()
);
```

```shell
load -c book
```

```curl
# See the following step.
```

## Conduct a vector query

The following example filters the vectors with certain `book_id` values, and returns the `book_id` field and `book_intro` of the results.

Milvus supports setting consistency level specifically for a query. The example in this topic sets the consistency level as `Strong`. You can also set the consistency level as `Bounded`, `Session` or `Eventually`. See [Consistency](consistency.md) for more information about the four consistency levels in Milvus.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
res = collection.query(
  expr = "book_id in [2,4,6,8]",
  offset = 0,
  limit = 10, 
  output_fields = ["book_id", "book_intro"],
  consistency_level="Strong"
)
```

```javascript
const results = await milvusClient.dataManager.query({
  collection_name: "book",
  expr: "book_id in [2,4,6,8]",
  output_fields: ["book_id", "book_intro"],
});
```

```go
queryResult, err := milvusClient.Query(
	context.Background(),                                   // ctx
	"book",                                                 // CollectionName
	"",                                                     // PartitionName
	entity.NewColumnInt64("book_id", []int64{2,4,6,8}),     // expr
	[]string{"book_id", "book_intro"}                       // OutputFields
)
if err != nil {
	log.Fatal("fail to query collection:", err.Error())
}
```

```java
List<String> query_output_fields = Arrays.asList("book_id", "word_count");
QueryParam queryParam = QueryParam.newBuilder()
  .withCollectionName("book")
  .withConsistencyLevel(ConsistencyLevelEnum.STRONG)
  .withExpr("book_id in [2,4,6,8]")
  .withOutFields(query_output_fields)
  .build();
R<QueryResults> respQuery = milvusClient.query(queryParam);
```

```shell
query

collection_name: book

The query expression: book_id in [2,4,6,8]

Name of partitions that contain entities(split by "," if multiple) []:

A list of fields to return(split by "," if multiple) []: book_id, book_intro

timeout []:
```

```curl
curl -X 'POST' \
  'http://localhost:9091/api/v1/query' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "output_fields": ["book_id", "book_intro"],
    "vectors": [ [0.1,0.2] ],
    "expr": "book_id in [2,4,6,8]"
  }'
```

<div class="language-curl">
Output:

```json
{
  "status":{},
  "fields_data":[
    {
      "type":5,
      "field_name":"book_id",
      "Field":{"Scalars":{"Data":{"LongData":{"data":[6,8,2,4]}}}},
      "field_id":100
    },
    {
      "type":101,
      "field_name":"book_intro",
      "Field":{"Vectors":{"dim":2,"Data":{"FloatVector":{"data":[6,1,8,1,2,1,4,1]}}}},
      "field_id":102
    }
  ]
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
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute. Find more expression details in <a href="boolean.md">Boolean Expression Rules</a>.</td>
	</tr>
	<tr>
		<td><code>offset</code></td>
		<td>Number of results to skip in the returned set. The sum of this value and `limit` should be less than 65535.</td>
	</tr>
	<tr>
		<td><code>limit</code></td>
		<td>Number of the most similar results to return. The sum of this value and `offset` should be less than 65535.</td>
	</tr>
	<tr>
		<td><code>output_fields</code> (optional)</td>
		<td>List of names of the field to return.</td>
	</tr>
	<tr>
		<td><code>partition_names</code> (optional)</td>
		<td>List of names of the partitions to query on.</td>
	</tr>
	<tr>
		<td><code>consistency_level</code> (optional)</td>
		<td>Consistency level of the query.</td>
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
		<td>Name of the collection to query.</td>
	</tr>
	<tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute. Find more expression details in <a href="boolean.md">Boolean Expression Rules</a>.</td>
	</tr>
	<tr>
		<td><code>output_fields</code> (optional)</td>
		<td>List of names of the field to return.</td>
	</tr>
	<tr>
		<td><code>partition_names</code> (optional)</td>
		<td>List of names of the partitions to query on.</td>
	</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
    <th>Options</th>
	</tr>
	</thead>
	<tbody>
  <tr>
    <td><code>ctx</code></td>
    <td>Context to control API invocation process.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>CollectionName</code></td>
    <td>Name of the collection to query.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>partitionName</code></td>
    <td>List of names of the partitions to load. All partitions will be queried if it is left empty.</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute.</td>
    <td>See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
    <tr>
		<td><code>OutputFields</code></td>
		<td>Name of the field to return.</td>
    	<td>Vector field is not supported in current release.</td>
	</tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
	<tr>
		<th>Parameter</th>
		<th>Description</th>
    <th>Options</th>
	</tr>
	</thead>
	<tbody>
	<tr>
    <td><code>CollectionName</code></td>
    <td>Name of the collection to load.</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>OutFields</code></td>
		<td>Name of the field to return.</td>
    <td>Vector field is not supported in current release.</td>
	</tr>
  <tr>
		<td><code>Expr</code></td>
		<td>Boolean expression used to filter attribute.</td>
    <td>See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>ConsistencyLevel</code></td>
		<td>The consistency level used in the query.</td>
	  <td><code>STRONG</code>, <code>BOUNDED</code>, and<code>EVENTUALLY</code>.</td>
	</tr>
	</tbody>
</table>

<table class="language-shell">
    <thead>
        <tr>
            <th>Option</th>
            <th>Full name</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>Displays help for using the command.</td>
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
		<td><code>output_fields</code> (optional)</td>
		<td>List of names of the fields to return.</td>
	</tr>
	<tr>
		<td><code>vectors</code></td>
		<td>Vectors to query.</td>
	</tr>
	<tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute. Find more expression details in <a href="boolean.md">Boolean Expression Rules</a>.</td>
	</tr>
	</tbody>
</table>

Check the returned results. 

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
sorted_res = sorted(res, key=lambda k: k['book_id'])
sorted_res
```

```javascript
console.log(results.data)
```

```go
fmt.Printf("%#v\n", queryResult)
for _, qr := range queryResult {
	fmt.Println(qr.IDs)
}
```

```java
QueryResultsWrapper wrapperQuery = new QueryResultsWrapper(respQuery.getData());
System.out.println(wrapperQuery.getFieldWrapper("book_id").getFieldData());
System.out.println(wrapperQuery.getFieldWrapper("word_count").getFieldData());
```

```shell
# Milvus CLI automatically returns the entities with the pre-defined output fields.
```

```curl
# See the output of the previous step.
```

## What's next

- Learn more basic operations of Milvus:
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.2.0/About.md)
  - [Node.js API reference](/api-reference/node/v2.2.0/About.md)
  - [Go API reference](/api-reference/go/v2.1.2/About.md)
  - [Java API reference](/api-reference/java/v2.2.1/About.md)


