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
  <a href="#csharp">C#</a>
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

```csharp
var collection = milvusClient.GetCollection("book").LoadAsync();
```

## Conduct a hybrid vector search

By specifying the boolean expression, you can filter the scalar field of the entities during the vector search. The following example limits the scale of search to the vectors within a specified `word_count` value range.

You can also use dynamic fields in the filter expression and output fields in the search requests. For example, refer to [Dynamic Schema](dynamic_schema.md).

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
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

```csharp
var results = await milvusClient.GetCollection("book").SearchAsync(
    vectorFieldName: "book_intro",
    vectors: new ReadOnlyMemory<float>[] { new[] { 0.1f, 0.2f } },
    SimilarityMetricType.L2,
    limit: 10,
    new SearchParameters
    {
        OutputFields = { "title" },
        ConsistencyLevel = ConsistencyLevel.Strong,
        Offset = 5,
        Expression = "word_count <= 11000",
        ExtraParameters = { ["nprobe"] = "1024" }
    });
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
		<td>Search parameters. Possible options are as follows: <ul>
      <li><code>metric_type</code> Method used to measure the distance between vectors during search. It should be the same as the one specified for the index-building process. See <a href="metric.md">Simlarity Metrics</a> for more information.</li>
      <li><code>offset</code> Number of entities to skip during the search. The sum of this parameter and <code>limit</code> of the <code>search</code> method should be less than <code>16384</code>.</li>
      <li><code>ignore_growing</code> Whether to ignore growing segments during similarity searches. The value defaults to <code>False</code>, indicating that searches involve growing segments.</li>
      <li><code>params</code> Search parameter(s) specific to the specified index type. See <a href="index.md">Vector Index</a> for more information. Possible options are as follows: <ul><li><code>nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code>index_type</code> is set to <code>IVF_FLAT</code>, <code>IVF_SQ8</code>, or <code>IVF_PQ</code>. The value should be less than <code>nlist</code> specified for the index-building process.</li>
			<li><code>ef</code> Indicates the search scope. This parameter is available only when <code>index_type</code> is set to <code>HNSW</code>. The value should be within the range from <code>top_k</code> to <code>32768</code>.</li>
			<li><code>search_k</code> Indicates the search scope. This parameter is available only when <code>index_type</code> is set to <code>ANNOY</code>. The value should be greater than or equal to the top K. </li>
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
                <li><code>NewIndexANNOYSearchParam(search_k int)</code> (ANNOY)</li>
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
		<li><code>search_k</code> Indicates the search scope. This parameter is available only when <code>index_type</code> is set to <code>ANNOY</code>. The value should be greater than or equal to the top K.</li>
		<li><code>metric_type</code> Indicates the metric type used in the search. It should be the same as the one specified when you index the collection.</li>
		<li><code>limit</code> Indicates the number of entities to return starting from the last skippped entity.</li>
		<li><code>offset</code> Indicates the number of entities to skip during the search. The sum of this parameter and <code>topK</code> of the <code>withTopK()</code> method should be less than <code>16384</code>.</li>
	</ul></td>
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
            <td>OutputFields</td>
            <td>A dictionary of the fields in the search results.</td>
        </tr>
        <tr>
            <td>ConsistencyLevel</td>
            <td>Consistency level for the search. Possible values are: <ul>
                <li>ConsistencyLevel.Strong</li>
                <li>ConsistencyLevel.Session</li>
                <li>ConsistencyLevel.BoundedStaleness</li>
                <li>ConsistencyLevel.Eventually</li>
                <li>ConsistencyLevel.Customized</li>
            </ul></td>
        </tr>
        <tr>
            <td>Offset</td>
            <td>Number of records to skip before return. The sum of this value and <code>limit</code> in the search request should be less than <code>16384</code>.</td>
        </tr>
        <tr>
            <td>Expression</td>
            <td>Boolean expression used to filter attribute. See <a href="boolean.md">Boolean Expression Rules</a> for more information.</td>
        </tr>
        <tr>
            <td>ExtraParameters</td>
            <td>Other applicable parameters. See <a href="index.md">Vector Index</a> for more information. Possible options are as follows:<ul>
        <li><code>nprobe</code> Indicates the number of cluster units to search. This parameter is available only when <code>index_type</code> is set to <code>IVF_FLAT</code>, <code>IVF_SQ8</code>, or <code>IVF_PQ</code>. The value should be less than <code>nlist</code> specified for the index-building process.</li>
        <li><code>ef</code> Indicates the search scope. This parameter is available only when <code>index_type</code> is set to <code>HNSW</code>. The value should be within the range from <code>top_k</code> to <code>32768</code>.</li>
        <li><code>search_k</code> Indicates the search scope. This parameter is available only when <code>index_type</code> is set to <code>ANNOY</code>. The value should be greater than or equal to the top K.</li>
    </ul></td>
        </tr>
    </tbody>
</table>

Check the returned results.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#csharp">C#</a>
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

```csharp
// # get the IDs of all returned hits
Console.WriteLine(results.Ids.LongIds)
// alternative Console.WriteLine(results.Ids.StringIds)

// get the scores to the query vector from all returned hits
foreach (var score in results.Scores.ToList()) {
    Console.WriteLine(score);
};
```

## What's next

- Try [Search with Time Travel](timetravel.md)

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.2.x/About.md)
  - [Node.js API reference](/api-reference/node/v2.2.x/About.md)
  - [Go API reference](/api-reference/go/v2.2.x/About.md)
  - [Java API reference](/api-reference/java/v2.2.x/About.md)


