---
id: query.md
related_key: query vectors
summary: Learn how to query vectors in Milvus.
---

# 结构化匹配



当前主题介绍如何进行向量结构化匹配。

与向量相似性搜索不同，向量结构化匹配通过基于[布尔表达式](boolean.md) 的标量过滤来检索向量。 Milvus 支持标量 field 中的多种数据类型和多种布尔表达式。布尔表达式过滤标量 field 或者 primary key field，并检索与过滤器匹配的所有结果。

下面的例子展示了如何对一个拥有 2000 行数据的数据集进行向量结构化匹配，模拟你基于书籍 ID 结构化匹配某些书籍的情况。该数据集包含 book ID (primary key)、word count (scalar field) 和 book introduction (vector field)。


## 加载 collection

Milvus 中的所有搜索和结构化匹配操作都在内存中执行。在执行向量结构化匹配之前将 collection 加载到内存中。

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

## 向量结构化匹配

下面的示例过滤具有特定 `book_id` 的向量，并返回结果的 `book_id` field 和 `book_intro` field。

Milvus 支持专门为搜索或结构化匹配设置一致性级别（目前仅在 PyMilvus 上）。在创建 collection 时，搜索或结构化匹配请求中设置的一致性级别将覆盖设置的一致性级别。在本例中，搜索请求的一致性级别设置为 "Strong"，这意味着 Milvus 将在搜索或结构化匹配请求出现的确切时间点读取最新的数据视图。如果在搜索或结构化匹配期间不指定一致性级别，Milvus 将采用创建 collection 的原始一致性级别。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
res = collection.query(
	expr = "book_id in [2,4,6,8]", 
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

<table class="language-python">
	<thead>
	<tr>
		<th>参数</th>
		<th>说明</th>
	</tr>
	</thead>
	<tbody>
	<tr>
		<td><code>expr</code></td>
		<td>用于过滤属性的布尔表达式。可在<a href="boolean.md">布尔表达式规则</a>中查找更多关于布尔表达式的详细信息。</td>
	</tr>
	<tr>
		<td><code>output_fields</code> (optional)</td>
		<td>要返回的 field 名称列表。</td>
	</tr>
	<tr>
		<td><code>partition_names</code> (optional)</td>
		<td>要查询的 partition 名称列表。</td>
	</tr>
	<tr>
		<td><code>consistency_level</code> (optional)</td>
		<td>查询的一致性级别。</td>
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
		<td>要查询的 collection 的名称。</td>
	</tr>
	<tr>
		<td><code>expr</code></td>
		<td>用于过滤属性的布尔表达式。可在<a href="boolean.md">布尔表达式规则</a>中查找更多关于布尔表达式的详细信息。</td>
	</tr>
	<tr>
		<td><code>output_fields</code> (optional)</td>
		<td>要返回的 field 名称列表。</td>
	</tr>
	<tr>
		<td><code>partition_names</code> (optional)</td>
		<td>要查询的 partition 名称列表。</td>
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
    <td>要查询的 collection 的名称。</td>
    <td>N/A</td>
  </tr>
  <tr>
    <td><code>partitionName</code></td>
    <td>要加载的 partition 的名称列表。如果为空，将查询所有 partition。</td>
    <td>N/A</td>
  </tr>
  <tr>
		<td><code>expr</code></td>
		<td>用于过滤属性的布尔表达式。</td>
    <td>有关详细信息，请参考 <a href="boolean.md">布尔表达式规则</a>。</td>
	</tr>
    <tr>
		<td><code>OutputFields</code></td>
		<td>要返回的 field 名称。</td>
    	<td>当前版本不支持 vector field。</td>
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
		<td><code>OutFields</code></td>
		<td>要返回的 field 名称。</td>
    <td>当前版本不支持 vector field 。</td>
	</tr>
  <tr>
		<td><code>Expr</code></td>
		<td>用于过滤属性的布尔表达式。</td>
    <td>有关详细信息，请参考 <a href="boolean.md">布尔表达式规则</a>。</td>
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


查看返回的结果。

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
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

## 更多内容

- 了解更多关于 Milvus 的基本操作：
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)
- 探索 Milvus SDKs 的 API 参考：
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/tutorial.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/tutorial.html)
