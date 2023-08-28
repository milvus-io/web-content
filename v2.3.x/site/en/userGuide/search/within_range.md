---
id: within_range.md
label: Conduct a query within Range
related_key: Within Range
order: 2
group: query.md
summary: Learn how to conduct a range search.
---

<div class="tab-wrapper"><a href="query.md" class=''>Conduct a Query</a><a href="with_iterators.md" class=''>Conduct a Query with Iterators</a><a href="within_range.md" class='active '>Conduct a query within Range</a></div>

# Within Range

This topic describes how to conduct a range search.

A range search is a way of filtering search results based on the distance between a query vector and a vector field value. The distance can be measured using different metric types.

When performing a range search, Milvus first conducts a vector similarity search. It then executes vector filtering based on the specified distance condition, and finally returns the vector results whose distance falls into a specific range.

The following examples show how to conduct a range search on the basis of a regular [vector search](search.md).

## Load collection

All search and query operations within Milvus are executed in memory. Load the collection to memory before conducting a vector similarity search.

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

## Configure a range for vector filtering

Compared to a regular [vector search](search.md), a range search in Milvus passes in two new parameters `radius` and `range_filter` to control the search range and obtain the desired search results.

`radius` specifies the angle where the vector with the least similarity resides. The optional `range_filter` can be used in combination to filter vector field values whose similarity to the query vector falls into a specific range. Both data types of parameters `radius` and `range_filter` are FLOAT. By setting these two parameters, you can effectively balance the search accuracy and efficiency.

Typically, the similarity is measured by the distance between a vector field value and a query vector. Choosing different distance metric types would have a significant impact on the configuration of `radius` and `range_filter`.

For instance, in the case of [L2](metric.md#euclidean-distance-l2) distance, the search results must be filtered based on vector field values whose distance is smaller than `radius`. This is because in L2 distance, the smaller the distance, the more similar the vectors are. Based on this knowledge, if you want to filter out part of the most similar vectors not to return, you can specify a valid `range_filter` value that is smaller than `radius`.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
search_params = {
    # use `L2` as the metric to calculate the distance
    "metric_type": "L2",
    "params": {
        # search for vectors with a distance smaller than 10.0
        "radius": 10.0,
        # filter out vectors with a distance smaller than or equal to 5.0
        "range_filter" : 5.0
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
sp.AddRadius(10.0)
sp.AddRangeFilter(5.0)
```

In the case of [IP](metric.md#inner-product-ip) distance, the situation is somewhat different. In terms of IP distance, larger distances represent greater similarity. Therefore, the values of `radius` and `range_filter` in IP distance are reversed compared to L2 distance. That being said, in terms of IP distance, if you use `range_filter` to filter out part of the most similar vectors, a valid `range_filter` value must be greater than `radius`, and the result vectors should be with a distance greater than `radius` but smaller than or equal to `range_filter`.

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
search_params = {
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

## Conduct a range search

By specifying `radius` and `range_filter` based on distance metric types, you can define a range scope of result vectors to return.

In terms of L2 distance, conduct a range search that returns vectors with a similarity in a range of `5.0` and `10.0`:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
search_param = {
  "data": [[0.1, 0.2]], # query vector
  "anns_field": "book_intro", # name of the field to search on
  "param": {"metric_type": "L2", "nprobe": 10, "radius": 10.0, "range_filter" : 5.0},
  "offset": 0,
  "limit": 2,
  output_fields=["int64", "float"] # fields to return
}

res = collection.search(**search_param)
```

```go
fmt.Printf(msgFmt, "start searcching based on vector similarity")
    vec2search := []entity.Vector{
        entity.FloatVector(embeddingList[len(embeddingList)-2]),
        entity.FloatVector(embeddingList[len(embeddingList)-1]),
    }
    begin := time.Now()
    sp, _ := entity.NewIndexIvfFlatSearchParam(16)
    sp.AddRadius(10.0)
    sp.AddRangeFilter(5.0)
    sRet, err := c.Search(ctx, collectionName, nil, "", []string{randomCol}, vec2search,
        embeddingCol, entity.L2, topK, sp)
    end := time.Now()
    if err != nil {
        log.Fatalf("failed to search collection, err: %v", err)
    }
```

In terms of IP distance, conduct a range search that returns vectors with a similarity in a range of `1.0` and `0.8`:

<div class="multipleCode">
  <a href="#python">Python </a>
  <a href="#go">GO</a>
</div>

```python
search_param = {
  "data": [[0.1, 0.2]], # query vector
  "anns_field": "book_intro", # name of the field to search on
  "param": {"metric_type": "IP", "nprobe": 10, "radius": 0.8, "range_filter" : 1.0},
  "offset": 0,
  "limit": 2,
  output_fields=["int64", "float"] # fields to return
}

res = collection.search(**search_param)
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

A range search in Milvus can return similar vector results with a distance falling into a specific range. This functionality is enabled by specifying `radius` and `range_filter` in search parameters. The following table summarizes how a distance metric type can affect the configuration of the two parameters.

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


