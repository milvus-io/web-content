---
id: with_iterators.md
label: Conduct a Query with Iterators
related_key: With Iterators
order: 1
group: query.md
summary: Learn how to search and query data with iterators. 
---

<div class="tab-wrapper"><a href="query.md" class=''>Conduct a Query</a><a href="with_iterators.md" class='active '>Conduct a Query with Iterators</a></div>

# Conduct a Query With Iterators

This topic describes how to search and query data with iterators.

Before an iterator is introduced, one common way of querying or searching a large dataset in Milvus is to use `offset` and `limit` parameters in combination, which specify the starting position and the maximum number of items to return respectively. However, this approach may result in performance issues when your database accumulates more data than your server can store in memory, and you still need to paginate through all the data. For more information about `offset` and `limit`, see [Conduct a Vector Similarity Search](search.md#prepare-search-parameters).

For that to happen the database will need to perform an inefficient full scan every time you request a pagination. This means that if there are 100,000,000 search results and you request an `offset` of 50,000,000, the system will need to fetch all those records (which will not even be needed), cache them in memory, and afterwards only retrieve the 20 results specified in `limit`.

To address the performance issue, an alternative is to use an iterator, which is an object that allows you to use `expr` to filter scalar fields by primary keys and then iterate over a sequence of search or query results. Using an iterator has some advantages:

- It simplifies the code and eliminates the need for manual configuration of `offset` and `limit`.
- It’s more efficient and consistent, as it filters fields by Boolean expressions first and fetches data on demand.

Milvus provides two types of iterators, query iterator and search iterator, for vector query and similarity search, respectively. The following examples show how to search and query data with iterators.

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

## Query with iterator

The following example uses `expr` to define a Boolean expression that looks for results where the number of pages in a book is between 600 and 700 inclusive, and then creates a query iterator along with output fields for the book ID and authors. The `limit` parameter is set to **5**, which means that the query will return a maximum of 5 results per page.

In the code, the query iterator's `next()` method is called repeatedly to retrieve each page of results. If the length of the returned results is zero, it means that there are no more pages to retrieve, so the loop is exited and the iterator is closed by using `close()`. Otherwise, the results are printed to the console, with each result showing the book ID and authors.

```python
# filter books with the number of pages ranging from 600 to 700
expr = "600 <= num_pages <= 700"

# return `bookID` and `authors`
output_fields=[bookID, authors]

# return 5 results per page
limit = 5

# create a query iterator
query_iterator = collection.query_iterator(expr, output_fields, limit)

while True:
    # turn to the next page
    res = query_iterator.next()
    if len(res) == 0:
        print("query iteration finished, close")
        # close the iterator
        query_iterator.close()
        break
    for i in range(len(res)):
        print(res[i])
```

## Search with iterator

The following example creates a search iterator using the generated vectors, search parameters, and output fields for the book ID and authors. The `limit` parameter is also set to 5, which means that the search will return a maximum of 5 results per page.

```python
vectors_to_search = rng.random((SEARCH_NQ, DIM))

search_params = {
    "metric_type": "L2",
    "params": {"nprobe": 10, "radius": 1.0},
}

# create a search iterator
search_iterator = collection.search_iterator(
    vectors_to_search,
    search_params,
    limit=5,
    output_fields=[bookID, authors]
)
                                             
while True:
    # turn to the next page
    res = search_iterator.next()
    if len(res[0]) == 0:
        print("search iteration finished, close")
        # close the iterator
        search_iterator.close()
        break
    for i in range(len(res[0])):
        print(res[0][i])
```

## Parameters

The following table describes the parameters for searching or querying data with iterators.

| Parameter | Description |
| --- | --- |
| `expr` | Boolean expression used to filter attributes. Find more expression details in [Boolean Expression Rules](boolean.md). |
| `vectors_to_search` | Query vector to search with. |
| `vector_field` | Name of the vector field. |
| `search_params` | Search parameters specific to the index. Find more expression details in [Conduct a Vector Similarity Search](search.md#prepare-search-parameters). |
| `limit` | Number of results to return per page. |
| `radius` | Angle where the vector with the least similarity resides. Find more expression details in [Within Range](within_range.md#configure-a-range-for-vector-filtering). |
| `output_fields` | Name of the field to return. |

## What's next

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.3.x/About.md)
  - [Node.js API reference](/api-reference/node/v2.3.x/About.md)
  - [Go API reference](/api-reference/go/v2.3.x/About.md)
  - [Java API reference](/api-reference/java/v2.3.x/About.md)


