---
id: search.md
related_key: search
summary: Conduct a vector similarity search with Milvus.
---

# Conduct a Vector Similarity Search

This topic describes how to search entities with Milvus.

A vector similarity search in Milvus calculates the distance between query vector(s) and vectors in the collection with specified similarity metrics, and returns the most similar results. By specifying a [boolean expression](boolean.md) that filters the scalar field or the primary key field, you can perform a [hybrid search](hybridsearch.md) or even a search with [Time Travel](timetravel.md).

The following example shows how to perform a vector similarity search on a 2000-row dataset of book ID (primary key), word count (scalar field), and book introduction (vector field), simulating the situation that you search for certain books based on their vectorized introductions. Milvus will return the most similar results according to the query vector and search parameters you have defined. 


## Load collection

All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector similarity search.

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
curl -X 'POST' \
  'http://localhost:9091/api/v1/collection/load' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book"
  }'
```

## Prepare search parameters

Prepare the parameters that suit your search scenario. The following example defines that the search will calculate the distance with Euclidean distance, and retrieve vectors from ten closest clusters built by the IVF_FLAT index.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
search_params = {"metric_type": "L2", "params": {"nprobe": 10}, "offset": 5}
```

```javascript
const searchParams = {
  anns_field: "book_intro",
  topk: "2",
  metric_type: "L2",
  params: JSON.stringify({ nprobe: 10 }),
};
```

```go
sp, _ := entity.NewIndexFlatSearchParam( // NewIndex*SearchParam func
	10,                                  // searchParam
)
```

```java
final Integer SEARCH_K = 2;                       // TopK
final String SEARCH_PARAM = "{\"nprobe\":10}";    // Params
```

```shell
search

Collection name (book): book

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a csv file without headers): [[0.1, 0.2]]

The vector field used to search of collection (book_intro): book_intro

Metric type: L2

Search parameter nprobe's value: 10

The max number of returned record, also known as topk: 10

The boolean expression used to filter attribute []: 

The names of partitions to search (split by "," if multiple) ['_default'] []: 

timeout []:

Guarantee Timestamp(It instructs Milvus to see all operations performed before a provided timestamp. If no such timestamp is provided, then Milvus will search all operations performed to date) [0]: 

Travel Timestamp(Specify a timestamp in a search to get results based on a data view) [0]:
```

```curl
curl -X 'POST' \
  'http://localhost:9091/api/v1/search' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
    "collection_name": "book",
    "output_fields": ["book_id"],
    "search_params": [
      {"key": "anns_field", "value": "book_intro"},
      {"key": "topk", "value": "2"},
      {"key": "params", "value": "{\"nprobe\": 10}"},
      {"key": "metric_type", "value": "L2"},
      {"key": "round_decimal", "value": "-1"}
    ],
    "vectors": [ [0.1,0.2] ],
    "dsl_type": 1
  }'
```

<div class="language-curl">
Output:

```json
{
  "status":{},
  "results":{
    "num_queries":1,
    "top_k":2,
    "fields_data":[
      {
        "type":5,
        "field_name":"book_id",
        "Field":{"Scalars":{"Data":{"LongData":{"data":[1,2]}}}},
        "field_id":100
      }
    ],
    "scores":[1.45,4.25],
    "ids":{"IdField":{"IntId":{"data":[1,2]}}},
    "topks":[2]},
    "collection_name":"book"
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
		<td><code>metric_type</code></td>
		<td>Metrics used to measure similarity of vectors. See <a href="metric.md">Simlarity Metrics</a> for more information.</td>
	</tr>
    <tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index.md">Vector Index</a> for more information.</td>
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
		<td><code>anns_field</code></td>
		<td>Name of the field to search on.</td>
	</tr>
	<tr>
		<td><code>topk</code></td>
		<td>Number of the most similar results to return.</td>
	</tr>
	<tr>
		<td><code>metric_type</code></td>
		<td>Metrics used to measure similarity of vectors. See <a href="metric.md">Simlarity Metrics</a> for more information.</td>
	</tr>
    <tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index.md">Vector Index</a> for more information.</td>
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
		<td><code>NewIndex*SearchParam func</code></td>
		<td>Function to create entity.SearchParam according to different index types.</td>
        <td>For floating point vectors:
            <ul>
                <li><code>NewIndexFlatSearchParam</code> (FLAT)</li>
                <li><code>NewIndexIvfFlatSearchParam</code> (IVF_FLAT)</li>
                <li><code>NewIndexIvfSQ8SearchParam</code> (IVF_SQ8)</li>
                <li><code>NewIndexIvfPQSearchParam</code> (RNSG)</li>
                <li><code>NewIndexRNSGSearchParam</code> (HNSW)</li>
                <li><code>NewIndexHNSWSearchParam</code> (HNSW)</li>
                <li><code>NewIndexANNOYSearchParam</code> (ANNOY)</li>
                <li><code>NewIndexRHNSWFlatSearchParam</code> (RHNSW_FLAT)</li>
                <li><code>NewIndexRHNSW_PQSearchParam</code> (RHNSW_PQ)</li>
                <li><code>NewIndexRHNSW_SQSearchParam</code> (RHNSW_SQ)</li>
            </ul>
            For binary vectors:
            <ul>
                <li><code>NewIndexBinFlatSearchParam</code> (BIN_FLAT)</li>
                <li><code>NewIndexBinIvfFlatSearchParam</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
	</tr>
	<tr>
		<td><code>searchParam</code></td>
		<td>Search parameter(s) specific to the index.</td>
    <td>See <a href="index.md">Vector Index</a> for more information.</td>
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
		<td><code>TopK</code></td>
		<td>Number of the most similar results to return.</td>
    <td>N/A</td>
	</tr>
  <tr>
		<td><code>Params</code></td>
		<td>Search parameter(s) specific to the index.</td>
    <td>See <a href="index.md">Vector Index</a> for more information.</td>
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
		<td><code>output_fields</code>(optional)</td>
		<td>Name of the field to return. Vector field is not supported in current release.</td>
	</tr>
	<tr>
		<td><code>anns_field</code></td>
		<td>Name of the field to search on.</td>
	</tr>
	<tr>
		<td><code>topk</code></td>
		<td>Number of the most similar results to return.</td>
	</tr>
	<tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index.md">Vector Index</a> for more information.</td>
	</tr>
	<tr>
		<td><code>metric_type</code></td>
		<td>Metrics used to measure similarity of vectors. See <a href="metric.md">Simlarity Metrics</a> for more information.</td>
	</tr>
	<tr>
		<td><code>round_decimal</code> (optional)</td>
		<td>Number of decimal places of returned distance.</td>
	</tr>
	<tr>
		<td><code>Vectors</code></td>
		<td>Vectors to search with.</td>
	</tr>
	<tr>
		<td><code>dsl_type</code></td>
		<td>Type of <code>dsl</code> (Data Search Language) field:
		<br>0: "Dsl"
		<br>1: "BoolExprV1"
		</td>
	</tr>
	</tbody>
</table>

## Conduct a vector search

Search vectors with Milvus. To search in a specific [partition](glossary.md#Partition), specify the list of partition names. 

Milvus supports setting consistency level specifically for a search. The example in this topic sets the consistency level as `Strong`. You can also set the consistency level as `Bounded`, `Session` or `Eventually`. See [Consistency](consistency.md) for more information about the four consistency levels in Milvus.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
results = collection.search(
	data=[[0.1, 0.2]], 
	anns_field="book_intro", 
	param=search_params,
	limit=10, 
	expr=None,
	consistency_level="Strong"
)
```

```javascript
const results = await milvusClient.dataManager.search({
  collection_name: "book",
  expr: "",
  vectors: [[0.1, 0.2]],
  search_params: searchParams,
  vector_type: 101,    // DataType.FloatVector
});
```

```go
searchResult, err := milvusClient.Search(
	context.Background(),                    // ctx
	"book",                                  // CollectionName
	[]string{},                              // partitionNames
	"",                                      // expr
	[]string{"book_id"},                     // outputFields
	[]entity.Vector{entity.FloatVector([]float32{0.1, 0.2})}, // vectors
	"book_intro",                            // vectorField
	entity.L2,                               // metricType
	2,                                       // topK
	sp,                                      // sp
)
if err != nil {
	log.Fatal("fail to search collection:", err.Error())
}
```

```java
List<String> search_output_fields = Arrays.asList("book_id");
List<List<Float>> search_vectors = Arrays.asList(Arrays.asList(0.1f, 0.2f));

SearchParam searchParam = SearchParam.newBuilder()
		.withCollectionName("book")
		.withConsistencyLevel(ConsistencyLevelEnum.STRONG)
		.withMetricType(MetricType.L2)
		.withOutFields(search_output_fields)
		.withTopK(SEARCH_K)
		.withVectors(search_vectors)
		.withVectorFieldName("book_intro")
		.withParams(SEARCH_PARAM)
		.build();
R<SearchResults> respSearch = milvusClient.search(searchParam);
```

```shell
# Follow the previous step.
```

```curl
# Follow the previous step.
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
		<td>Vectors to search with.</td>
	</tr>
	<tr>
		<td><code>anns_field</code></td>
		<td>Name of the field to search on.</td>
	</tr>
    <tr>
		<td><code>param</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index.md">Vector Index</a> for more information.</td>
	</tr>
	<tr>
		<td><code>offset</code></td>
		<td>Number of results to skip in the returned set.  The sum of this value and `limit` should be less than 65535.</td>
	</tr>
	<tr>
		<td><code>limit</code></td>
		<td>Number of the most similar results to return.  The sum of this value and `offset` should be less than 65535.</td>
	</tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>partition_names</code> (optional)</td>
		<td>List of names of the partition to search in.</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>Name of the field to return. Vector field is not supported in current release.</td>
	</tr>
  <tr>
		<td><code>timeout</code> (optional)</td>
		<td>A duration of time in seconds to allow for RPC. Clients wait until server responds or error occurs when it is set to None.</td>
	</tr>
  <tr>
		<td><code>round_decimal</code> (optional)</td>
		<td>Number of decimal places of returned distance.</td>
	</tr>
	<tr>
		<td><code>consistency_level</code> (optional)</td>
		<td>Consistency level of the search.</td>
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
		<td>Name of the collection to search in.</td>
	</tr>
	<tr>
    <td><code>search_params</code></td>
    <td>Parameters (as an object) used for search.</td>
  </tr>
	<tr>
    <td><code>vectors</code></td>
    <td>Vectors to search with.</td>
  </tr>
  <tr>
		<td><code>vector_type</code></td>
		<td>Pre-check of binary or float vectors. <code>100</code> for binary vectors and <code>101</code> for float vectors.</td>
	</tr>
  <tr>
		<td><code>partition_names</code> (optional)</td>
		<td>List of names of the partition to search in.</td>
	</tr>
    <tr>
		<td><code>expr</code> (optional)</td>
		<td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>Name of the field to return. Vector field is not supported in current release.</td>
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
    <td>Name of the collection to load.</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>partitionNames</code></td>
    <td>List of names of the partitions to load. All partitions will be searched if it is left empty.</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute.</td>
    <td>See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>output_fields</code></td>
		<td>Name of the field to return.</td>
    <td>Vector field is not supported in current release.</td>
	</tr>
  <tr>
    <td><code>vectors</code></td>
    <td>Vectors to search with.</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>vectorField</code></td>
		<td>Name of the field to search on.</td>
    <td>N/A</td>
	</tr>
  <tr>
		<td><code>metricType</code></td>
		<td>Metric type used for search.</td>
    <td>This parameter must be set identical to the metric type used for index building.</td>
	</tr>
  <tr>
		<td><code>topK</code></td>
		<td>Number of the most similar results to return.</td>
    <td>N/A</td>
	</tr>
  <tr>
		<td><code>sp</code></td>
		<td>entity.SearchParam specific to the index.</td>
    <td>N/A</td>
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
		<td><code>MetricType</code></td>
		<td>Metric type used for search.</td>
    <td>This parameter must be set identical to the metric type used for index building.</td>
	</tr>
  <tr>
		<td><code>OutFields</code></td>
		<td>Name of the field to return.</td>
    <td>Vector field is not supported in current release.</td>
	</tr>
  <tr>
    <td><code>Vectors</code></td>
    <td>Vectors to search with.</td>
    <td>N/A</td>
  </tr>
<tr>
		<td><code>VectorFieldName</code></td>
		<td>Name of the field to search on.</td>
    <td>N/A</td>
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



Check the primary key values of the most similar vectors and their distances.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
results[0].ids
results[0].distances
```

```javascript
console.log(results.results)
```

```go
fmt.Printf("%#v\n", searchResult)
for _, sr := range searchResult {
	fmt.Println(sr.IDs)
	fmt.Println(sr.Scores)
}
```

```java
SearchResultsWrapper wrapperSearch = new SearchResultsWrapper(respSearch.getData().getResults());
System.out.println(wrapperSearch.getIDScore(0));
System.out.println(wrapperSearch.getFieldData("book_id", 0));
```

```shell
# Milvus CLI automatically returns the primary key values of the most similar vectors and their distances.
```

Release the collection loaded in Milvus to reduce memory consumption when the search is completed.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
collection.release()
```

```javascript
await milvusClient.collectionManager.releaseCollection({  collection_name: "book",});
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
                .build());
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

## Limits
|Feature|Maximum limit|
|---|---|
|Length of a collection name|255 characters|
|Number of partitions in a collection|4,096|
|Number of fields in a collection|256|
|Number of shards in a collection|256|
|Dimensions of a vector|32,768|
|Top K|16,384|
|Target input vectors|16,384|


## What's next

- Learn more basic operations of Milvus:
  - [Query vectors](query.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.2.0/About.md)
  - [Node.js API reference](/api-reference/node/v2.2.0/About.md)
  - [Go API reference](/api-reference/go/v2.1.2/About.md)
  - [Java API reference](/api-reference/java/v2.2.1/About.md)


