---
id: query.md
label: Conduct a Query
related_key: query vectors
order: 0
group: query.md
summary: Learn how to query vectors in Milvus.
---

<div class="tab-wrapper"><a href="query.md" class='active '>Conduct a Query</a><a href="with_iterators.md" class=''>Conduct a Query with Iterators</a></div>

# Conduct a Query

This topic describes how to conduct a query.

Unlike a vector similarity search, a query retrieves vectors via scalar filtering based on [boolean expression](boolean.md). Milvus supports many data types in the scalar fields and a variety of boolean expressions. The boolean expression filters on scalar fields or the primary key field, and it retrieves all results that match the filters.

The following example shows how to perform a query on a 2000-row dataset of book ID (primary key), word count (scalar field), and book introduction (vector field), simulating the situation where you query for certain books based on their IDs.


## Load collection

All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a query.

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
<div style="display: none;">

```shell
load -c book
```
</div>

```curl
# See the following step.
```

## Conduct a query

The following example filters the vectors with certain `book_id` values, and returns the `book_id` field and `book_intro` of the results.

Milvus supports setting consistency level specifically for a query. The example in this topic sets the consistency level as `Strong`. You can also set the consistency level as `Bounded`, `Session` or `Eventually`. See [Consistency](consistency.md) for more information about the four consistency levels in Milvus.

You can also use dynamic fields in the filter expression and output fields in the query requests. For example, refer to [Dynamic Schema](dynamic_schema.md).

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#curl">Curl</a>
</div>

```python
res = collection.query(
  expr = "book_id in [2,4,6,8]",
  offset = 0,
  limit = 10, 
  output_fields = ["book_id", "book_intro"],
)
```

```javascript
const results = await milvusClient.query({
  collection_name: "book",
  expr: "book_id in [2,4,6,8]",
  output_fields: ["book_id", "book_intro"],
  limit: 10,
  offset: 0,
});
```

```go
opt := client.SearchQueryOptionFunc(func(option *client.SearchQueryOption) {
    option.Limit = 3
    option.Offset = 0
    option.ConsistencyLevel = entity.ClStrong
    option.IgnoreGrowing = false
})

queryResult, err := milvusClient.Query(
    context.Background(),                                   // ctx
    "book",                                                 // CollectionName
    "",                                                     // PartitionName
    entity.NewColumnInt64("book_id", []int64{2,4,6,8}),     // expr
    []string{"book_id", "book_intro"},                      // OutputFields
    opt,                                                    // queryOptions
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
  .withOffset(0L)
  .withLimit(10L)
  .build();
R<QueryResults> respQuery = milvusClient.query(queryParam);
```

<div style="display:none;">

```shell
query

collection_name: book

The query expression: book_id in [2,4,6,8]

Name of partitions that contain entities(split by "," if multiple) []:

A list of fields to return(split by "," if multiple) []: book_id, book_intro

timeout []:
```

</div>

```curl
curl --request POST \
     --url '${MILVUS_HOST}:${MILVUS_PORT}/v1/vector/query' \
     --header 'Authorization: Bearer <TOKEN>' \
     --header 'accept: application/json' \
     --header 'content-type: application/json'
     -d '{
       "collectionName": "collection1",
       "outputFields": ["id", "name", "feature", "distance"],
       "filter": "id in (1, 2, 3)",
       "limit": 100,
       "offset": 0
     }'
```

<div class="language-curl">
Output:

```json
{
    "code": 200,
    "data": {}
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
        <td><code>limit</code></td>
        <td>Number of the most similar results to return. The sum of this value and <code>offset</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code>offset</code></td>
        <td>Number of results to skip in the returned set. This parameter is available only when <code>limit</code> is specified, and the sum of this value and <code>limit</code> should be less than 16384.</td>
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
        <td><code>limit</code> (optional)</td>
        <td>Number of the most similar results to return. The sum of this value and <code>offset</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code>offset</code> (optional)</td>
        <td>Number of results to skip in the returned set. This parameter is available only when <code>limit</code> is specified, and the sum of this value and <code>limit</code> should be less than 16384.</td>
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
    <tr>
        <td><code>opts</code></td>
        <td>Query options in the form of <code>entity.SearchQueryOptionFunc</code>.</td>
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
        <td><code>Limit</code> (optional)</td>
        <td>Number of the most similar results to return. The sum of this value and <code>offset</code> in <code>WithOffset()</code> should be less than 16384.</td>
    </tr>
    <tr>
        <td><code>Offset</code> (optional)</td>
        <td>Number of results to skip in the returned set. This parameter is available only when <code>limit</code> is specified, and the sum of this value and <code>limit</code> in <code>WithLimit()</code> should be less than 16384.</td>
    </tr>
  <tr>
        <td><code>ConsistencyLevel</code></td>
        <td>The consistency level used in the query.</td>
      <td><code>STRONG</code>, <code>BOUNDED</code>, and<code>EVENTUALLY</code>.</td>
    </tr>
    </tbody>
</table>

<table class="language-shell" style="display: none;">
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
        <td><code>collectionName</code></td>
        <td>(Required) The name of the collection to which this operation applies.</td>
    </tr>
    <tr>
        <td><code>filter</code></td>
        <td>The filter used to find matches for the search</td>
    </tr>
    <tr>
        <td><code>limit</code></td>
        <td>The maximum number of entities to return.<br>The sum of this value of that of `offset` should be less than **1024**.<br>The value defaults to <code>100</code>.<br>The value ranges from <code>1</code> to <code>100</code></td>
    </tr>
    <tr>
        <td><code>offset</code></td>
        <td>The number of entities to skip in the search results.<br>The sum of this value and that of `limit` should not be greater than <code>1024</code>.<br>The maximum value is <code>1024</code>.</td>
    </tr>
    <tr>
        <td><code>outputFields</code></td>
        <td>An array of fields to return along with the search results.</td>
    </tr>
    </tbody>
</table>

Check the returned results. 

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
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
<div style="display:none;">
```shell
# Milvus CLI automatically returns the entities with the pre-defined output fields.
```

```curl
# See the output of the previous step.
```
</div>

## Count entities

When conducting a query, you can append `count(*)` to `output_fields`, so Milvus can return the number of entities in the collection. If you want to count entities that meet specific conditions, use `expr` to define a Boolean expression.

Count all entities in a collection:

```python
res = collection.query(
  expr="", 
  output_fields = [count(*)],
)

print(res)
print(res[0])

# Output:
# [{'count(*)': 2996}]
# {'count(*)': 2996}
```

Count entities that meet specific filter conditions:

```python
res = collection.query(
  # filter entities whose ID is in the specified list
  expr="book_id in [2,4,6,8]", 
  output_fields = [count(*)],
)

print(res)
print(res[0])

# Output:
# [{'count(*)': 2996}]
# {'count(*)': 2996}
```

## Limits

When `count(*)` is used in `output_fields`, the `limit` parameter is forbidden.

## What's next

- Learn more basic operations of Milvus:
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.3.x/About.md)
  - [Node.js API reference](/api-reference/node/v2.3.x/About.md)
  - [Go API reference](/api-reference/go/v2.3.x/About.md)
  - [Java API reference](/api-reference/java/v2.3.x/About.md)


