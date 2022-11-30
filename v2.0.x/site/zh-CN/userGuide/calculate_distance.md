---
id: calculate_distance.md
related_key: calculate distance
summary: Learn how to calculate distance between vectors with Milvus.
---

# Calculate Distance Between Vectors

This topic describes how to calculate distance between vectors with Milvus.

Milvus searches most similar vectors based on the distance calculation of vectors. Vice versa, you can use Milvus to calculate the distance between vectors using distance metrics that suit specific scenario. See [Similarity Metrics](metric.md) for more information.

The following example simulates the scenarios when you want to calculate the distance between vectors in the collection and some other vectors.

## Prepare vectors

Prepare the vectors used for calculation.

<div class="alert note">
Vectors to be calculated must agree in vector type and dimension.
</div>

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
vectors_left = {
    "ids": [0, 1], 
    "collection": "book", 
    "partition": "_default", 
    "field": "book_intro"
}
import random
external_vectors = [[random.random() for _ in range(2)] for _ in range(4)]
vectors_right = {"float_vectors": external_vectors}
```

```javascript
// Node User Guide will be ready soon.
```

```go
// GO User Guide will be ready soon.
```

```java
// Java User Guide will be ready soon.
```

```shell
// CLI User Guide will be ready soon.
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
		<td><code>vectors_left</code> and <code>vectors_right</code></td>
		<td>Vectors on the left and right side of the operator. Dict type that can be represented as <code>{"ids": [primary_key_1, primary_key_2, ... primary_key_n], "collection": "collection_name", "partition": "partition_name", "field": "vector_field_name"}</code>, <code>{"float_vectors": [[1.0, 2.0], [3.0, 4.0], ... [9.0, 10.0]]}</code>, or <code>{"bin_vectors": [b'', b'N', ... b'Ê']}</code>.</td>
	</tr>
    <tr>
		<td><code>"ids"</code></td>
		<td>List of primary key of entities that in the collection.</td>
	</tr>
    <tr>
		<td><code>"collection"</code></td>
		<td>Name of the collection that holds the entities.</td>
	</tr>
    <tr>
		<td><code>"partition"</code></td>
		<td>Name of the partition that holds the entities.</td>
	</tr>
    <tr>
		<td><code>"field"</code></td>
		<td>Name of the vector field in the collection.</td>
	</tr>
    <tr>
		<td><code>"float_vectors"</code> or <code>"bin_vectors"</code></td>
		<td>Type of the vectors.</td>
	</tr>
	</tbody>
</table>


## Prepare calculation parameters

Specify the parameters used for the calculation.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#java">Java</a>
  <a href="#go">GO</a>
  <a href="#javascript">Node.js</a>
  <a href="#shell">CLI</a>
</div>


```python
params = {
    "metric": "IP", 
    "dim": 2
}
```

```javascript
// Node User Guide will be ready soon.
```

```go
// GO User Guide will be ready soon.
```

```java
// Java User Guide will be ready soon.
```

```shell
// CLI User Guide will be ready soon.
```

<table class="language-python">
	<thead>
        <tr>
            <th>Parameter</th>
            <th>Description</th>
            <th>Option</th>
        </tr>
	</thead>
	<tbody>
        <tr>
            <td><code>params</code></td>
            <td>Calculation parameters.</td>
            <td>N/A</td>
        </tr>
        <tr>
            <td><code>"metric"</code></td>
            <td>Metric types used for calculation.</td>
            <td>For floating point vectors:
                <ul>
                    <li><code>L2</code> (Euclidean distance)</li>
                    <li><code>IP</code> (Inner product)</li>
                </ul>
                For binary vectors:
                <ul>
                    <li><code>JACCARD</code> (Jaccard distance)</li>
                    <li><code>TANIMOTO</code> (Tanimoto distance)</li>
                    <li><code>HAMMING</code> (Hamming distance)</li>
                    <li><code>SUPERSTRUCTURE</code> (Superstructure)</li>
                    <li><code>SUBSTRUCTURE</code> (Substructure)</li>
                </ul>
            </td>
        </tr>
        <tr>
            <td><code>"dim"</code></td>
            <td>Dimension of the vector.</td>
            <td>N/A</td>
        </tr>
	</tbody>
</table>

## (Optional) Load collection

If you calculate with the vectors in a collection in Milvus, you must load the collection to memory first.

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
    .build()
);
```

```shell
load -c book
```

## Calculate vector distance

Calculate the distance between vectors based on the vectors and parameters provided.

```python
from pymilvus import utility
results = utility.calc_distance(
    vectors_left=vectors_left, 
    vectors_right=vectors_right, 
    params=params
)
print(results)
```

```javascript
// Node User Guide will be ready soon.
```

```go
// GO User Guide will be ready soon.
```

```java
// Java User Guide will be ready soon.
```

```shell
// CLI User Guide will be ready soon.
```

## What's next

- Learn more basic operations of Milvus:
  - [Conduct a vector search](search.md)
  - [Conduct a hybrid search](hybridsearch.md)
  - [Search with Time Travel](timetravel.md)
  
- Explore API references for Milvus SDKs:
  - [PyMilvus API reference](/api-reference/pymilvus/v2.0.2/About.html)
  - [Node.js API reference](/api-reference/node/v2.0.2/About.html)
  - [Go API reference](/api-reference/go/v2.0.0/About.html)
  - [Java API reference](/api-reference/java/v2.0.4/tutorial.html)

