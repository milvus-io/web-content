---
id: within_range.md
label: Range Search
related_key: Within Range
order: 2
group: search.md
summary: Learn how to conduct a range search.
title: Conduct a Range Search
---

<div class="tab-wrapper"><a href="search.md" class=''>Vector Similarity Search</a><a href="hybridsearch.md" class=''>Hybrid Search</a><a href="within_range.md" class='active '>Range Search</a></div>

# Conduct a Range Search

Understanding how to filter your search results by the proximity of entities is crucial in vector database operations. A range search serves this exact purpose by narrowing down results according to the distance between a query vector and database vectors. This guide will walk you through the process of conducting a range search in Milvus, which consists of a vector similarity search followed by distance-based filtering.

## Quick steps for a range search

1. **Load your collection into memory**: Initiate by ensuring your dataset is loaded and ready for search.
2. **Set your search parameters**: Define `radius` and `range_filter` parameters to control your search precision.
3. **Execute the search**: Perform the range search using the parameters set in step 2. We provide examples for **L2 (Euclidean)** and **IP (Inner Product)** distances.
4. **Review your results**: The vectors returned will be within the range you specified, tailored to the distance metrics you have chosen.

<div class="alert note">
Milvus may return fewer results than your set <code>limit</code> if not enough vectors meet the specified distance criteria after range filtering.
</div>

## Step 1: Load collection

Before anything else, make sure the collection is loaded into memory as Milvus operates in-memory for search and query functions.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
from pymilvus import Collection
collection = Collection("book")      # Get an existing collection.
collection.load()
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

## Step 2: Configure range filtering

With Milvus, a range search is differentiated from a standard [vector search](search.md) by two key parameters:

- `radius`: Determines the threshold of least similarity.
- `range_filter`: Optionally refines the search to vectors within a specific similarity range.

These parameters are of the `FLOAT` type and are pivotal in balancing accuracy and search efficiency.

### Distance metrics influence

- **L2** distance: Filters vectors less distant than `radius`, since smaller L2 distances indicate higher similarity. To exclude the closest vectors from results, set `range_filter` less than `radius`.

  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#go">GO</a>
  </div>

  ```python
  param = {
      # use `L2` as the metric to calculate the distance
      "metric_type": "L2",
      "params": {
          # search for vectors with a distance smaller than 1.0
          "radius": 1.0,
          # filter out vectors with a distance smaller than or equal to 0.8
          "range_filter" : 0.8
      }
  }
  ```

  ```go
  fmt.Printf(msgFmt, "start creating index IVF_FLAT")
  idx, err := entity.NewIndexIvfFlat(entity.L2, 2)
  if err != nil {
          log.Fatalf("failed to create ivf flat index, err: %v", err)
  }
  if err := c.CreateIndex(ctx, collectionName, "embeddings", idx, false); err != nil {
          log.Fatalf("failed to create index, err: %v", err)
  }
  sp.AddRadius(1.0)
  sp.AddRangeFilter(0.8)
  ```

- **IP** distance: Filters vectors more distant than `radius`, since larger IP distances indicate higher similarity. Here, `range_filter` should be greater than `radius` to exclude the most similar vectors.

  <div class="multipleCode">
    <a href="#python">Python </a>
    <a href="#go">GO</a>
  </div>

  ```python
  param = {
      # use `IP` as the metric to calculate the distance
      "metric_type": "IP",
      "params": {
          # search for vectors with a distance greater than 0.8
          "radius": 0.8,
          # filter out most similar vectors with a distance greater than or equal to 1.0
          "range_filter" : 1.0
      }
  }
  ```

  ```go
  fmt.Printf(msgFmt, "start creating index IVF_FLAT")
  idx, err := entity.NewIndexIvfFlat(entity.IP, 2)
  if err != nil {
          log.Fatalf("failed to create ivf flat index, err: %v", err)
  }
  if err := c.CreateIndex(ctx, collectionName, "embeddings", idx, false); err != nil {
          log.Fatalf("failed to create index, err: %v", err)
  }
  sp.AddRadius(0.8)
  sp.AddRangeFilter(1.0)
  ```

## Step 3: Execute the range search

For an **L2** distance range search, get vectors within a similarity range of **0.8** to **1.0**:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
res = collection.search(
    data=[[0.3785311281681061,0.2960498034954071]], # query vector
    anns_field='book_intro', # vector field name
    param=param, # search parameters defined in step 2
    limit=5 # number of results to return
)

print(res)

# Output:
# ["['id: 494, distance: 0.8085046410560608, entity: {}', 'id: 108, distance: 0.8211717009544373, entity: {}', 'id: 1387, distance: 0.8252214789390564, entity: {}']"]
```

```go
fmt.Printf(msgFmt, "start searcching based on vector similarity")
    vec2search := []entity.Vector{
        entity.FloatVector(embeddingList[len(embeddingList)-2]),
        entity.FloatVector(embeddingList[len(embeddingList)-1]),
    }
    begin := time.Now()
    sp, _ := entity.NewIndexIvfFlatSearchParam(16)
    sp.AddRadius(1.0)
    sp.AddRangeFilter(0.8)
    sRet, err := c.Search(ctx, collectionName, nil, "", []string{randomCol}, vec2search,
        embeddingCol, entity.L2, topK, sp)
    end := time.Now()
    if err != nil {
        log.Fatalf("failed to search collection, err: %v", err)
    }
```

For an **IP** distance range search, get vectors within a similarity range of **1.0** to **0.8**:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
res = collection.search(
    data=[[0.8280364871025085,0.957599937915802]], # query vector
    anns_field='book_intro', # vector field name
    param=param, # search parameters defined in step 2
    limit=5 # number of results to return
)

print(res)

# Output:
# ["['id: 455, distance: 0.9997385740280151, entity: {}', 'id: 1908, distance: 0.9995749592781067, entity: {}', 'id: 262, distance: 0.9994202852249146, entity: {}', 'id: 1475, distance: 0.9993369579315186, entity: {}', 'id: 1536, distance: 0.999295175075531, entity: {}']"]
```

```go
fmt.Printf(msgFmt, "start searcching based on vector similarity")
    vec2search := []entity.Vector{
        entity.FloatVector(embeddingList[len(embeddingList)-2]),
        entity.FloatVector(embeddingList[len(embeddingList)-1]),
    }
    begin := time.Now()
    sp, _ := entity.NewIndexIvfFlatSearchParam(16)
    sp.AddRadius(0.8)
    sp.AddRangeFilter(1.0)
    sRet, err := c.Search(ctx, collectionName, nil, "", []string{randomCol}, vec2search,
        embeddingCol, entity.IP, topK, sp)
    end := time.Now()
    if err != nil {
        log.Fatalf("failed to search collection, err: %v", err)
    }
```

## Conclusion

Milvus returns vectors that fit within the specified range based on your `radius` and `range_filter` settings. Below is a quick reference table summarizing how different distance metrics affect these settings:

| Metric Type  | Configuration                         |
|--------------|---------------------------------------|
| L2 and other | `range_filter` <= distance < `radius` |
| IP and cosine| `radius` < distance <= `range_filter` |

## What's next

- Explore API references for Milvus SDKs:

  - [PyMilvus API reference](/api-reference/pymilvus/v2.3.x/About.md)
  - [Node.js API reference](/api-reference/node/v2.3.x/About.md)
  - [Go API reference](/api-reference/go/v2.3.x/About.md)
  - [Java API reference](/api-reference/java/v2.3.x/About.md)


