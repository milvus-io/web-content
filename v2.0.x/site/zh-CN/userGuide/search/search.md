---
id: search.md
related_key: search
summary: Conduct a vector similarity search with Milvus.
---

# 向量相似性搜索



本主题介绍如何使用 Milvus 搜索 entities 。

Milvus 中的向量相似度搜索计算查询向量与 collection 中具有指定相似度度量的向量之间的距离，并返回最相似的结果。通过指定过滤标量 field 或者 primary key field 的 [布尔表达式](boolean.md) ，你可以执行 [混合搜索](hybridsearch.md)，甚至使用 [Time Travel](timetravel.md) 来进行搜索。

下面的例子展示了如何对一个拥有 2000 行数据的数据集进行向量相似度搜索，模拟你基于书籍介绍的特征向量搜索某些书籍的情况。该数据集包含 book ID (primary key) 、 word count (scalar field) 和 book introduction (vector field)。 Milvus 会根据你定义的查询向量和搜索参数返回最相似的结果。


## 加载 collection

Milvus 中的所有搜索和结构化匹配操作都在内存中执行。在执行向量相似性搜索之前将 collection 加载到内存中。

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
                .build());
```

```shell
load -c book
```


## 准备搜索参数


准备适合你的搜索场景的参数。下面的示例定义了搜索将使用欧式距离计算，并从 IVF_FLAT 索引构建的十个最近的聚类中检索向量。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
search_params = {"metric_type": "L2", "params": {"nprobe": 10}}
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

<table class="language-python">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>metric_type</code></td>
		<td>用于衡量向量相似性的指标。详细信息请参考 <a href="metric.md">距离计算方式</a>。 </td>
	</tr>
    <tr>
		<td><code>params</code></td>
		<td>该索引特有的搜索参数。详细信息请参考 <a href="index.md">向量索引</a> 。</td>
	</tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
    <tr>
		<td><code>anns_field</code></td>
		<td>要搜索的 field 名称。</td>
	</tr>
	<tr>
		<td><code>topk</code></td>
		<td>输出向量结果数。</td>
	</tr>
	<tr>
		<td><code>metric_type</code></td>
		<td>用于衡量向量相似性的指标。详细信息请参考 <a href="metric.md">距离计算方式</a>。</td>
	</tr>
    <tr>
		<td><code>params</code></td>
		<td>该索引特有的搜索参数。详细信息请参考 <a href="index.md">向量索引</a> 。</td>
	</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
    <th>选项</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>NewIndex*SearchParam func</code></td>
		<td>根据不同的索引类型创建 entity.SearchParam 的函数。</td>
        <td>浮点型向量：
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
            二进制型向量：
            <ul>
                <li><code>NewIndexBinFlatSearchParam</code> (BIN_FLAT)</li>
                <li><code>NewIndexBinIvfFlatSearchParam</code> (BIN_IVF_FLAT)</li>
            </ul>
        </td>
	</tr>
	<tr>
		<td><code>searchParam</code></td>
		<td>该索引特有的搜索参数。</td>
    <td>详细信息请参考 <a href="index.md">向量索引</a> 。</td>
	</tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
    	<th>选项</th>
	</tr>
	</thead>
	<tbody>
  <tr>
		<td><code>TopK</code></td>
		<td>输出向量结果数。</td>
    <td>N/A</td>
	</tr>
  <tr>
		<td><code>Params</code></td>
		<td>该索引特有的搜索参数。</td>
    <td>详细信息请参考 <a href="index.md">向量索引</a> 。</td>
	</tr>
	</tbody>
</table>


<table class="language-shell">
    <thead>
        <tr>
            <th>选项</th>
            <th>全称</th>
            <th>说明</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>--help</td>
            <td>n/a</td>
            <td>显示使用命令的帮助。</td>
        </tr>
    </tbody>
</table>


## 进行向量搜索

使用 Milvus 搜索向量。要在特定的[partition](glossary.md#Partition)中搜索，请指定 partition 名称列表。 

Milvus 支持专门为搜索或结构化匹配设置一致性级别（目前仅在 PyMilvus 上）。在创建 collection 时，搜索或结构化匹配请求中设置的一致性级别将覆盖设置的一致性级别。Milvus 中，一致性级别默认为 `Bounded`，本例将搜索请求的一致性级别设置为 "Strong"，这意味着 Milvus 将在搜索或结构化匹配请求出现的确切时间点读取最新的数据视图。如果在搜索或结构化匹配期间不指定一致性级别，Milvus 将采用创建 collection 的原始一致性级别。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

<table class="language-python">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
    <tr>
		<td><code>data</code></td>
		<td>用于搜索的向量。</td>
	</tr>
	<tr>
		<td><code>anns_field</code></td>
		<td>要搜索的 field 名称。</td>
	</tr>
  <tr>
		<td><code>params</code></td>
		<td>该索引特有的搜索参数。详细信息请参考 <a href="index.md">向量索引</a> 。</td>
	</tr>
	<tr>
		<td><code>limit</code></td>
		<td>输出向量结果数。</td>
	</tr>
  <tr>
		<td><code>expr</code></td>
		<td>用于过滤属性的布尔表达式。有关详细信息，请参考 <a href="boolean.md">布尔表达式规则</a>。</td>
	</tr>
  <tr>
		<td><code>partition_names</code> (optional)</td>
		<td>要搜索的 partition 名称列表</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>返回的 field 名称。当前版本不支持 Vector filed 。</td>
	</tr>
  <tr>
		<td><code>timeout</code> (optional)</td>
		<td>允许 RPC 的持续时间（以秒为单位）。当设置为 None 时，客户端等待服务器响应或者发生错误。</td>
	</tr>
  <tr>
		<td><code>round_decimal</code> (optional)</td>
		<td>返回距离的小数位数。</td>
	</tr>
	<tr>
		<td><code>consistency_level</code> (optional)</td>
		<td>搜索的一致性级别。</td>
	</tr>
	</tbody>
</table>

<table class="language-javascript">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>collection_name</code></td>
		<td>要搜索的 collection 名称。</td>
	</tr>
	<tr>
    <td><code>search_params</code></td>
    <td>用于搜索的参数（作为对象）。</td>
  </tr>
	<tr>
    <td><code>vectors</code></td>
    <td>用于搜索的向量。</td>
  </tr>
  <tr>
		<td><code>vector_type</code></td>
		<td>二进制型或浮点型向量的预检查。二进制型向量为<code>100</code> ，浮点型向量为<code>101</code>。</td>
	</tr>
  <tr>
		<td><code>partition_names</code> (optional)</td>
		<td>要搜索的 partition 名称列表。</td>
	</tr>
    <tr>
		<td><code>expr</code> (optional)</td>
		<td>用于过滤属性的布尔表达式。有关详细信息，请参考 <a href="boolean.md">布尔表达式规则</a>。</td>
	</tr>
  <tr>
		<td><code>output_fields</code> (optional)</td>
		<td>返回的 field 名称。当前版本不支持 Vector field 。</td>
	</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
    <th>选项</th>
	</tr>
	</thead>
	<tbody>
  <tr>
    <td><code>ctx</code></td>
    <td>控制调用 API 的 Context。</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>CollectionName</code></td>
    <td>要加载的 collection 名称。</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>partitionNames</code></td>
    <td>要加载的 partition 名称列表。如果将其置空，将搜索所有的 partition 。</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>expr</code></td>
		<td>Boolean expression used to filter attribute.</td>
    <td>有关详细信息，请参考 <a href="boolean.md">布尔表达式规则</a>。</td>
	</tr>
  <tr>
		<td><code>output_fields</code></td>
		<td>要返回的 field 名称。</td>
    <td>当前版本不支持 vector field 。</td>
	</tr>
  <tr>
    <td><code>vectors</code></td>
    <td>用于搜索的向量。</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>vectorField</code></td>
		<td>要搜索的 filed 名称。</td>
    <td>N/A</td>
	</tr>
  <tr>
		<td><code>metricType</code></td>
		<td>用于搜索的指标类型。</td>
    <td>此参数必须设置为与用于索引构建的指标类型相同。</td>
	</tr>
  <tr>
		<td><code>topK</code></td>
		<td>输出向量结果数。</td>
    <td>N/A</td>
	</tr>
  <tr>
		<td><code>sp</code></td>
		<td>该索引特有的搜索参数 entity.SearchParam 。</td>
    <td>N/A</td>
	</tr>
	</tbody>
</table>

<table class="language-java">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
    <th>选项</th>
	</tr>
	</thead>
	<tbody>
	<tr>
    <td><code>CollectionName</code></td>
    <td>要加载的 collection 名称。</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>MetricType</code></td>
		<td>距离计算方式</td>
    <td>此参数必须设置为与用于索引构建的指标类型相同。</td>
	</tr>
  <tr>
		<td><code>OutFields</code></td>
		<td>要返回的 field 名称。.</td>
    <td>当前版本不支持 vector field 。</td>
	</tr>
  <tr>
    <td><code>Vectors</code></td>
    <td>用于搜索的向量。</td>
    <td>N/A</td>
  </tr>
<tr>
		<td><code>VectorFieldName</code></td>
		<td>要搜索的 field 名称。</td>
    <td>N/A</td>
	</tr>
  <tr>
		<td><code>Expr</code></td>
		<td>用于过滤属性的布尔表达式。</td>
    <td>有关详细信息，请参考 <a href="boolean.md">布尔表达式规则</a>。</td>
	</tr>
	</tbody>
</table>



查看最相似向量的 primary key 及其距离值。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

搜索完成时释放 Milvus 中加载的 collection 以减少内存消耗。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

## 限制
|特性|最大限制|
|---|---|
|collection 的名称长度|255 characters|
|collection 中的 partition 数量|4,096|
|collection 中的 field 数量|256|
|collection 中的 shard 数|256|
|向量维度|32,768|
|Top K|16,384|
|目标输入向量数|16,384|


## 更多内容

- 了解更多关于 Milvus 的基本操作:
  - [查询向量](query.md)
  - [进行混合搜索](hybridsearch.md)
  - [使用 Time Travel 搜索](timetravel.md)
- 探索 Milvus SDKs 的 API 参考:
  - [PyMilvus API 参考](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API 参考](/api-reference/node/v2.0.2/tutorial.html)
