---
id: upsert_entities.md
related_key: upsert entities
title: Upsert Entities
summary: Learn how to upsert entities in Milvus.
---

# Upsert Entities

This topic describes how to upsert entities in Milvus.

Upserting is a combination of insert and delete operations. In the context of a Milvus vector database, an upsert is a data-level operation that will overwrite an existing entity if a specified field already exists in a collection, and insert a new entity if the specified value doesn’t already exist.

The following example upserts 3,000 rows of randomly generated data as the example data. When performing upsert operations, it's important to note that the operation may compromise performance. This is because the operation involves deleting data during execution.

## Prepare data

First, prepare the data to upsert.  The type of data to upsert must match the schema of the collection, otherwise Milvus will raise an exception.

Milvus supports default values for scalar fields, excluding a primary key field. This indicates that some fields can be left empty during data inserts or upserts. For more information, refer to [Create a Collection](create_collection.md#prepare-schema).

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
# Generate data to upsert
import random
nb = 3000
dim = 8
vectors = [[random.random() for _ in range(dim)] for _ in range(nb)]
data = [
    [i for i in range(nb)],
    [str(i) for i in range(nb)],
    [i for i in range(10000, 10000+nb)],
    vectors,
    [str("dy"*i) for i in range(nb)]
]
```

```go
nEntities:= 3000
dim:= 8
idList:= make([]int64, 0, nEntities)
randomList:= make([]float64, 0, nEntities)
embeddingList := make([][]float32, 0, nEntities)

for i := 0; i < nEntities; i++ {
    idList = append(idList, int64(i))
}
    
for i := 0; i < nEntities; i++ {
    randomList = append(randomList, rand.Float64())
}
  
for i := 0; i < nEntities; i++ {
    vec := make([]float32, 0, dim)
for j := 0; j < dim; j++ {
        vec = append(vec, rand.Float32())
    }
    embeddingList = append(embeddingList, vec)
}
idColData := entity.NewColumnInt64("ID", idList)
randomColData := entity.NewColumnDouble("random", randomList)
embeddingColData := entity.NewColumnFloatVector("embeddings", dim, embeddingList)
```

## Upsert data

Upsert the data to the collection.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
from pymilvus import Collection
collection = Collection("book") # Get an existing collection.
mr = collection.upsert(data)
```

```go
if _, err := c.Upsert(ctx, collectionName, "", idColData, embeddingColData);
err != nil {
        log.Fatalf("failed to upsert data, err: %v", err)
}
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
		<td>Data to upsert into Milvus.</td>
	</tr>
	<tr>
		<td><code>partition_name</code> (optional)</td>
		<td>Name of the partition to upsert data into.</td>
	</tr>
    <tr>
		<td><code>timeout</code> (optional)</td>
		<td>An optional duration of time in seconds to allow for the RPC. If it is set to None, the client keeps waiting until the server responds or error occurs.</td>
	</tr>
	</tbody>
</table>

<table class="language-go">
	<thead>
    <tr>
        <th>Parameter</th>
        <th>Description</th>
    </tr>
	</thead>
	<tbody>
    <tr>
        <td><code>ctx</code></td>
        <td>Context to control API invocation process.</td>
    </tr>
    <tr>
        <td><code>collectionName</code></td>
        <td>Name of the collection to upsert data into.</td>
    </tr>
    <tr>
        <td><code>partitionName</code></td>
        <td>Name of the partition to upsert data into. Data will be upserted in the default partition if left blank.</td>
    </tr>
	<tr>
        <td><code>idColData</code></td>
        <td>Data to upsert into each field.</td>
    </tr>
  </tbody>
</table>

## Flush data

When data is upserted into Milvus it is updated and inserted into segments. Segments have to reach a certain size to be sealed and indexed. Unsealed segments will be searched brute force. In order to avoid this with any remainder data, it is best to call `flush()`. The `flush()` call will seal any remaining segments and send them for indexing. It is important to only call this at the end of an upsert session, as calling this too much will cause fragmented data that will need to be cleaned later on.

## Limits

- Updating primary key fields is not supported by `upsert()`.
- `upsert()` is not applicable and an error can occur if `autoID` is set to `True` for primary key fields.

## What's next

Learn more basic operations of Milvus:

- [Build an index for vectors](build_index.md)
- [Conduct a vector search](search.md)
- [Conduct a hybrid search](hybridsearch.md)
