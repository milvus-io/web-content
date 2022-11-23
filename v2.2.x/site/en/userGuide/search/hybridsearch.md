---
id: hybridsearch.md
related_key: filter
summary: Conduct a Hybrid Search with Milvus.
---

# Conduct a Hybrid Search

This topic describes how to conduct a hybrid search.

A hybrid search is essentially a vector search with attribute filtering. By specifying [boolean expressions](boolean.md) that filter the scalar fields or the primary key field, you can limit your search with certain conditions.

The following example shows how to perform a hybrid search on the basis of a regular [vector search](search.md). Suppose you want to search for certain books based on their vectorized introductions, but you only want those within a specific range of word count. You can then specify the boolean expression to filter the `word_count` field in the search parameters. Milvus will search for similar vectors only among those entities that match the expression.


## Load collection

All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector search.

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

## Conduct a hybrid vector search

By specifying the boolean expression, you can filter the scalar field of the entities during the vector search. The following example limits the scale of search to the vectors within a specified `word_count` value range.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
  <a href="#curl">Curl</a>
</div>


```python
search_param = {
  "data": [[0.1, 0.2]],
  "anns_field": "book_intro",
  "param": {"metric_type": "L2", "params": {"nprobe": 10}},
  "offset": 0,
  "limit": 2,
  "expr": "word_count <= 11000",
}
res = collection.search(**search_param)
```

```javascript
const results = await milvusClient.dataManager.search({
  collection_name: "book",
  expr: "word_count <= 11000",
  vectors: [[0.1, 0.2]],
  search_params: {
    anns_field: "book_intro",
    topk: "2",
    metric_type: "L2",
    params: JSON.stringify({ nprobe: 10 }),
  },
  vector_type: 101,    // DataType.FloatVector,
});
```

```go
sp, _ := entity.NewIndexFlatSearchParam(   // NewIndex*SearchParam func
  10,                                      // searchParam
)
searchResult, err := milvusClient.Search(
  context.Background(),                    // ctx
  "book",                                  // CollectionName
  []string{},                              // partitionNames
  "word_count <= 11000",                   // expr
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
final Integer SEARCH_K = 2;
final String SEARCH_PARAM = "{\"nprobe\":10}";
List<String> search_output_fields = Arrays.asList("book_id");
List<List<Float>> search_vectors = Arrays.asList(Arrays.asList(0.1f, 0.2f));

SearchParam searchParam = SearchParam.newBuilder()
  .withCollectionName("book")
  .withMetricType(MetricType.L2)
  .withOutFields(search_output_fields)
  .withTopK(SEARCH_K)
  .withVectors(search_vectors)
  .withVectorFieldName("book_intro")
  .withExpr("word_count <= 11000")
  .withParams(SEARCH_PARAM)
  .build();
R<SearchResults> respSearch = milvusClient.search(searchParam);
```

```shell
search

Collection name (book): book

The vectors of search data(the length of data is number of query (nq), the dim of every vector in data must be equal to vector field’s of collection. You can also import a csv file without headers): [[0.1, 0.2]]

The vector field used to search of collection (book_intro): book_intro

Metric type: L2

Search parameter nprobe's value: 10

The max number of returned record, also known as topk: 2

The boolean expression used to filter attribute []: word_count <= 11000

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
    "dsl": "word_count >= 11000",
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
        "Field":{"Scalars":{"Data":{"LongData":{"data":[11,12]}}}},
        "field_id":100
      }
    ],
    "scores":[119.44999,142.24998],
    "ids":{"IdField":{"IntId":{"data":[11,12]}}},"topks":[2]
  },
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
		<td><code>data</code></td>
		<td>Vectors to search with.</td>
	</tr>
	<tr>
		<td><code>anns_field</code></td>
		<td>Name of the field to search on.</td>
	</tr>
  <tr>
		<td><code>params</code></td>
		<td>Search parameter(s) specific to the index. See <a href="index.md">Vector Index</a> for more information.</td>
	</tr>
	<tr>
		<td><code>offset</code></td>
		<td>Number of results to skip in the returned set. The sum of this value and `limit` should be less than 65535.</td>
	</tr>
	<tr>
		<td><code>limit</code></td>
		<td>Number of the most similar results to return.</td>
	</tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>partition_names</code> (optional)</td>
		<td>List of names of the partition to search in.  The sum of this value and `offset` should be less than 65535.</td>
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
		<td>Name of the field to return. Vector field not support in current release.</td>
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
		<td><code>TopK</code></td>
		<td>Number of the most similar results to return.</td>
    <td>N/A</td>
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
		<td>Metric type used for search. This parameter must be set identical to the metric type used for index building.</td>
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
		<td><code>dsl</code></td>
		<td>Boolean expression used to filter attribute. Find more expression details in <a href="boolean.md">Boolean Expression Rules</a>.</td>
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
assert len(res) == 1
hits = res[0]
assert len(hits) == 2
print(f"- Total hits: {len(hits)}, hits ids: {hits.ids} ")
print(f"- Top1 hit id: {hits[0].id}, distance: {hits[0].distance}, score: {hits[0].score} ")
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

```curl
# See the output of the previous step.
```

## What's next

- Try [Search with Time Travel](timetravel.md)

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.2.0/About.md)
  - [Node.js API reference](/api-reference/node/v2.2.0/About.md)
  - [Go API reference](/api-reference/go/v2.1.2/About.md)
  - [Java API reference](/api-reference/java/v2.2.1/About.md)


