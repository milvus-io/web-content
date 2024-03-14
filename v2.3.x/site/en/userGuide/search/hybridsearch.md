---
id: hybridsearch.md
label: Hybrid Search
related_key: filter
order: 1
group: search.md
summary: Conduct a Hybrid Search with Milvus.
---

<div class="tab-wrapper"><a href="search.md" class=''>Vector Similarity Search</a><a href="hybridsearch.md" class='active '>Hybrid Search</a><a href="within_range.md" class=''>Range Search</a></div>

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
</div>

```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load()
```

```javascript
await milvusClient.loadCollection({
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

<div style="display: none">
```shell
load -c book
```

```curl
# See the following step.
```
</div>

## Conduct a hybrid vector search

By specifying the boolean expression, you can filter the scalar field of the entities during the vector search. The following example limits the scale of search to the vectors within a specified `word_count` value range.

You can also use dynamic fields in the filter expression and output fields in the search requests. For example, refer to [Dynamic Schema](dynamic_schema.md).

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
</div>

```python
search_param = {
  "data": [[0.1, 0.2]],
  "anns_field": "book_intro",
  "param": {"metric_type": "L2", "params": {"nprobe": 10}, "offset": 0},
  "limit": 10,
  "expr": "word_count <= 11000",
}
res = collection.search(**search_param)
```

```javascript
const results = await milvusClient.search({
    collection_name: "book",
    vector: [0.1, 0.2],
    filter: null,
    // the sum of `limit` and `offset` should be less than 16384.
    limit: 10,
    offset: 2,
    metric_type: MetricType.L2,
    param: {
      params: { nprobe: 1024 } 
    },
    consistency_level: ConsistencyLevelEnum.Strong,
});
```

```go
sp, _ := entity.NewIndexFlatSearchParam(   // NewIndex*SearchParam func
  10,                                      // searchParam
)

opt := client.SearchQueryOptionFunc(func(option *client.SearchQueryOption) {
    option.Limit = 3
    option.Offset = 0
    option.ConsistencyLevel = entity.ClStrong
    option.IgnoreGrowing = false
})

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
  opt,                                     // search options
)

if err != nil {
  log.Fatal("fail to search collection:", err.Error())
}
```

```java
final Integer SEARCH_K = 2;
final String SEARCH_PARAM = "{\"nprobe\":10, \”offset\”:5}";
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

<div style="display:none;">
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
		<td><code>param</code></td>
		<td>Search parameters. Possible options are as follows: <ul>
      <li><code>metric_type</code> Method used to measure the distance between vectors during search. It should be the same as the one specified for the index-building process. See <a href="metric.md">Simlarity Metrics</a> for more information.</li>
      <li><code>offset</code> Number of entities to skip during the search. The sum of this parameter and <code>limit</code> of the <code>search</code> method should be less than <code>16384</code>.</li>
      <li><code>ignore_growing</code> Whether to ignore growing segments during similarity searches. The value defaults to <code>False</code>, indicating that searches involve growing segments.</li>
      <li><code>params</code> Search parameter(s) specific to the specified index type. See <a href="index.md">Vector Index</a> for more information. Possible options are as follows: <ul><li><code>nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code>index_type</code> is set to <code>IVF_FLAT</code>, <code>IVF_SQ8</code>, or <code>IVF_PQ</code>. The value should be less than <code>nlist</code> specified for the index-building process.</li>
			<li><code>ef</code> Indicates the search scope. This parameter is available only when <code>index_type</code> is set to <code>HNSW</code>. The value should be within the range from <code>top_k</code> to <code>32768</code>.</li>
		</ul></li>
	</tr>
	<tr>
		<td><code>limit</code></td>
		<td>Number of the most similar results to return. The sum of this value and <code>offset</code> should be less than 16384.</td>
	</tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>Name of the field to return. Vector field is not supported in current release.</td>
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
		<td><code>expr</code> (optional)</td>
		<td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>Name of the field to return. The vector field does not support in the current release.</td>
	</tr>
  <tr>
    <td><code>limit</code> (optional)</td>
    <td>Number of entities to return. The sum of this parameter and <code>offset</code> should be less than 16384.</td>
  </tr>
  <tr>
    <td><code>offset</code> (optional)</td>
    <td>Number of entities to skip. This parameter applies only when <code>limit</code> is specified, and the sum of this parameter and <code>limit</code> should be less than 16384.</td>
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
		<td>Search parameter(s) specific to the index.</td>
    <td>See <a href="index.md">Vector Index</a> for more information. Possible options are as follows: 
        <ul><li>For floating point vectors:
            <ul>
                <li><code>NewIndexFlatSearchParam()</code> (FLAT)</li>
                <li><code>NewIndexIvfFlatSearchParam(nprobe int)</code> (IVF_FLAT)</li>
                <li><code>NewIndexIvfSQ8SearchParam(nprobe int)</code> (IVF_SQ8)</li>
                <li><code>NewIndexIvfPQSearchParam(nprobe int)</code> (RNSG)</li>
                <li><code>NewIndexHNSWSearchParam(ef int)</code> (HNSW)</li>
            </ul></li>
            <li>For binary vectors:
            <ul>
                <li><code>NewIndexBinFlatSearchParam(nprobe int)</code> (BIN_FLAT)</li>
                <li><code>NewIndexBinIvfFlatSearchParam(nprobe int)</code> (BIN_IVF_FLAT)</li>
            </ul></li>
        </ul>
	</tr>
	<tr>
		<td><code>opts</code></td>
		<td>Search options in the form of <code>entity.SearchQueryOptionFunc</code>.</td>
        <td><ul>
            <li><code>Limit</code> Indicates the number of entities to return.</li>
            <li><code>Offset</code> Indicates the number of entities to skip during the search. The sum of this parameter and <code>Limit</code> should be less than <code>16384</code>.</li>
            <li><code>ConsistencyLevel</code> Indicates the consistency level applied during the search.</li>
            <li><code>Ignore Growing</code> Indicates whether to ignore growing segments during similarity searches. The value defaults to <code>False</code>, indicating that searches involve growing segments. </li>
        </ul></td>
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
    <td>See <a href="index.md">Vector Index</a> for more information. Possible options are as follows:<ul>
		<li><code>nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code>index_type</code> is set to <code>IVF_FLAT</code>, <code>IVF_SQ8</code>, or <code>IVF_PQ</code>. The value should be less than <code>nlist</code> specified for the index-building process.</li>
		<li><code>ef</code> Indicates the search scope. This parameter is available only when <code>index_type</code> is set to <code>HNSW</code>. The value should be within the range from <code>top_k</code> to <code>32768</code>.</li>
		<li><code>metric_type</code> Indicates the metric type used in the search. It should be the same as the one specified when you index the collection.</li>
		<li><code>limit</code> Indicates the number of entities to return starting from the last skippped entity.</li>
		<li><code>offset</code> Indicates the number of entities to skip during the search. The sum of this parameter and <code>topK</code> of the <code>withTopK()</code> method should be less than <code>16384</code>.</li>
	</ul></td>
	</tr>
	</tbody>
</table>

<table class="language-shell" style="display:none;">
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

<table class="language-curl" style="display:none;">
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

<div style="display:none;">

```shell
# Milvus CLI automatically returns the primary key values of the most similar vectors and their distances.
```

```curl
# See the output of the previous step.
```
</div>

## What's next

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.3.x/About.md)
  - [Node.js API reference](/api-reference/node/v2.3.x/About.md)
  - [Go API reference](/api-reference/go/v2.3.x/About.md)
  - [Java API reference](/api-reference/java/v2.3.x/About.md)


