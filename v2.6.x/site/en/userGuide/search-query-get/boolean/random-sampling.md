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
// java
```

```go
// go
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
// java
```

```go
// go
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
// java
```

```go
// go
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
// java
```

```go
// go
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
// java
```

```go
// go
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
// java
```

```go
// go
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

