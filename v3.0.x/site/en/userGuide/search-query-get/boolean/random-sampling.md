---
id: random-sampling.md
title: "Random Sampling"
summary: "When working with large-scale datasets, you often don't need to process all your data to gain insights or test filtering logic. Random sampling provides a solution by allowing you to work with a statistically representative subset of your data, significantly reducing query time and resource consumption."
beta: Milvus 2.6.x
---

# Random Sampling

When working with large-scale datasets, you often don't need to process all your data to gain insights or test filtering logic. Random sampling provides a solution by allowing you to work with a statistically representative subset of your data, significantly reducing query time and resource consumption.

Random sampling operates at the segment level, ensuring efficient performance while maintaining the randomness of the sample across your collection's data distribution.

**Key use cases:**

- **Data exploration**: Quickly preview collection structure and content with minimal resource usage

- **Development testing**: Test complex filtering logic on manageable data samples before full deployment

- **Resource optimization**: Reduce computational costs for exploratory queries and statistical analysis

## Syntax

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = "RANDOM_SAMPLE(sampling_factor)"
```

```java
String filter = "RANDOM_SAMPLE(sampling_factor)"
```

```go
filter := "RANDOM_SAMPLE(sampling_factor)"
```

```javascript
// node
```

```bash
# restful
```

**Parameters:**

- `sampling_factor`: A sampling factor in the range (0, 1), excluding the boundaries. For example, `RANDOM_SAMPLE(0.001)` selects approximately 0.1% of the results.

**Important rules:**

- The expression is case-insensitive (`RANDOM_SAMPLE` or `random_sample`)

- The sampling factor must be in the range (0, 1), excluding boundaries

## Combine with other filters

The random sampling operator must be combined with other filtering expressions using logical `AND`. When combining filters, Milvus first applies the other conditions and then performs random sampling on the result set.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Correct: Filter first, then sample
filter = 'color == "red" AND RANDOM_SAMPLE(0.001)'
# Processing: Find all red items → Sample 0.1% of those red items

# Incorrect: OR doesn't make logical sense
filter = 'color == "red" OR RANDOM_SAMPLE(0.001)'  # ❌ Invalid logic
# This would mean: "Either red items OR sample everything" - which is meaningless
```

```java
// Correct: Filter first, then sample
String filter = 'color == "red" AND RANDOM_SAMPLE(0.001)';
// Processing: Find all red items → Sample 0.1% of those red items

// Incorrect: OR doesn't make logical sense
String filter = 'color == "red" OR RANDOM_SAMPLE(0.001)';  // ❌ Invalid logic
// This would mean: "Either red items OR sample everything" - which is meaningless
```

```go
// Correct: Filter first, then sample
filter := 'color == "red" AND RANDOM_SAMPLE(0.001)'
// Processing: Find all red items → Sample 0.1% of those red items

filter := 'color == "red" OR RANDOM_SAMPLE(0.001)' // ❌ Invalid logic
// This would mean: "Either red items OR sample everything" - which is meaningless
```

```javascript
// node
```

```bash
# restful
```

## Examples

### Example 1: Data exploration

Quickly preview your collection structure:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(uri="http://localhost:19530")

# Sample approximately 1% of the entire collection
result = client.query(
    collection_name="product_catalog",
    # highlight-next-line
    filter="RANDOM_SAMPLE(0.01)",
    output_fields=["id", "product_name"],
    limit=10
)

print(f"Sampled {len(result)} products from collection")
```

```java
import io.milvus.v2.client.*;
import io.milvus.v2.service.vector.request.QueryReq
import io.milvus.v2.service.vector.request.QueryResp

ConnectConfig config = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build();
MilvusClientV2 client = new MilvusClientV2(config);

QueryReq queryReq = QueryReq.builder()
        .collectionName("product_catalog")
        .filter("RANDOM_SAMPLE(0.01)")
        .outputFields(Arrays.asList("id", "product_name"))
        .limit(10)
        .build();

QueryResp queryResp = client.query(queryReq);

List<QueryResp.QueryResult> results = queryResp.getQueryResults();
for (QueryResp.QueryResult result : results) {
    System.out.println(result.getEntity());
}
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("product_catalog").
    WithFilter("RANDOM_SAMPLE(0.01)").
    WithOutputFields("id", "product_name"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("id: ", resultSet.GetColumn("id").FieldData().GetScalars())
fmt.Println("product_name: ", resultSet.GetColumn("product_name").FieldData().GetScalars())
```

```javascript
// node
```

```bash
# restful
```

### Example 2: Combined filtering with random sampling

Test filtering logic on a manageable subset:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# First filter by category and price, then sample 0.5% of results
filter_expression = 'category == "electronics" AND price > 100 AND RANDOM_SAMPLE(0.005)'

result = client.query(
    collection_name="product_catalog",
    # highlight-next-line
    filter=filter_expression,
    output_fields=["product_name", "price", "rating"],
    limit=10
)

print(f"Found {len(result)} electronics products in sample")
```

```java
String filter = "category == \"electronics\" AND price > 100 AND RANDOM_SAMPLE(0.005)";

QueryReq queryReq = QueryReq.builder()
        .collectionName("product_catalog")
        .filter(filter)
        .outputFields(Arrays.asList("product_name", "price", "rating"))
        .limit(10)
        .build();

QueryResp queryResp = client.query(queryReq);
```

```go
filter := "category == \"electronics\" AND price > 100 AND RANDOM_SAMPLE(0.005)"

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("product_catalog").
    WithFilter(filter).
    WithOutputFields("product_name", "price", "rating"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
// node
```

```bash
# restful
```

### Example 3: Quick analytics

Perform rapid statistical analysis on filtered data:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Get insights from ~0.1% of premium customer data
filter_expression = 'customer_tier == "premium" AND region == 'North America' AND RANDOM_SAMPLE(0.001)'

result = client.query(
    collection_name="customer_profiles",
    # highlight-next-line
    filter=filter_expression,
    output_fields=["purchase_amount", "satisfaction_score", "last_purchase_date"],
    limit=10
)

# Analyze sample for quick insights
if result:
    average_purchase = sum(r["purchase_amount"] for r in result) / len(result)
    average_satisfaction = sum(r["satisfaction_score"] for r in result) / len(result)
    
    print(f"Sample size: {len(result)}")
    print(f"Average purchase amount: ${average_purchase:.2f}")
    print(f"Average satisfaction score: {average_satisfaction:.2f}")
```

```java
String filter = "customer_tier == \"premium\" AND region == \"North America\" AND RANDOM_SAMPLE(0.001)";

QueryReq queryReq = QueryReq.builder()
        .collectionName("customer_profiles")
        .filter(filter)
        .outputFields(Arrays.asList("purchase_amount", "satisfaction_score", "last_purchase_date"))
        .limit(10)
        .build();

QueryResp queryResp = client.query(queryReq);
```

```go
filter := "customer_tier == \"premium\" AND region == \"North America\" AND RANDOM_SAMPLE(0.001)"

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("customer_profiles").
    WithFilter(filter).
    WithOutputFields("purchase_amount", "satisfaction_score", "last_purchase_date"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
// node
```

```bash
# restful
```

### Example 4: Combined with vector search

Use random sampling in filtered search scenarios:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
# Search for similar products within a sampled subset
search_results = client.search(
    collection_name="product_catalog",
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # query vector
    # highlight-next-line
    filter='category == "books" AND RANDOM_SAMPLE(0.01)',
    search_params={"metric_type": "L2", "params": {}},
    output_fields=["title", "author", "price"],
    limit=10
)

print(f"Found {len(search_results[0])} similar books in sample")
```

```java
import io.milvus.v2.service.vector.request.SearchReq
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp

FloatVec queryVector = new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f});
SearchReq searchReq = SearchReq.builder()
        .collectionName("product_catalog")
        .data(Collections.singletonList(queryVector))
        .topK(10)
        .filter("category == \"books\" AND RANDOM_SAMPLE(0.01)")
        .outputFields(Arrays.asList("title", "author", "price"))
        .build();

SearchResp searchResp = client.search(searchReq);

List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}

```

```go
queryVector := []float32{0.1, 0.2, 0.3, 0.4, 0.5}

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "product_catalog", // collectionName
    10,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithConsistencyLevel(entity.ClStrong).
    WithFilter("category == \"books\" AND RANDOM_SAMPLE(0.01)").
    WithOutputFields("title", "author", "price"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("title: ", resultSet.GetColumn("title").FieldData().GetScalars())
    fmt.Println("author: ", resultSet.GetColumn("author").FieldData().GetScalars())
    fmt.Println("price: ", resultSet.GetColumn("price").FieldData().GetScalars())
}
```

```javascript
// node
```

```bash
# restful
```

## Best practices

- **Start small**: Begin with smaller sampling factors (0.001-0.01) for initial exploration

- **Development workflow**: Use sampling during development, remove for production queries

- **Statistical validity**: Larger samples provide more accurate statistical representations

- **Performance testing**: Monitor query performance and adjust sampling factors as needed

