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
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
filter = "RANDOM_SAMPLE(sampling_factor)"
```

```java
String filter = "RANDOM_SAMPLE(sampling_factor)";
```

```go
filter := "RANDOM_SAMPLE(sampling_factor)"
```

```rust
let filter = "RANDOM_SAMPLE(sampling_factor)";
```

```cpp
auto filter = "RANDOM_SAMPLE(sampling_factor)";
```

```javascript
const filter = "RANDOM_SAMPLE(sampling_factor)";
```

```csharp
string filter = "RANDOM_SAMPLE(sampling_factor)";
```

```bash
# restful
export filterRandomSample='RANDOM_SAMPLE(sampling_factor)'
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
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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
String filter = "color == \"red\" AND RANDOM_SAMPLE(0.001)";
// Processing: Find all red items → Sample 0.1% of those red items

// Incorrect: OR doesn't make logical sense
String filterIncorrect = "color == \"red\" OR RANDOM_SAMPLE(0.001)";  // ❌ Invalid logic
// This would mean: "Either red items OR sample everything" - which is meaningless
```

```go
// Correct: Filter first, then sample
filter := "color == \"red\" AND RANDOM_SAMPLE(0.001)"
// Processing: Find all red items → Sample 0.1% of those red items

filter = "color == \"red\" OR RANDOM_SAMPLE(0.001)" // ❌ Invalid logic
// This would mean: "Either red items OR sample everything" - which is meaningless
```

```rust
// Correct: Filter first, then sample
let filter_correct = r#"color == "red" AND RANDOM_SAMPLE(0.001)"#;
// Processing: Find all red items → Sample 0.1% of those red items

// Incorrect: OR doesn't make logical sense
let filter_incorrect = r#"color == "red" OR RANDOM_SAMPLE(0.001)"#;  // ❌ Invalid logic
// This would mean: "Either red items OR sample everything" - which is meaningless
```

```cpp
auto filter_sample_correct = R"(color == "red" AND RANDOM_SAMPLE(0.001))";
auto filter_sample_incorrect = R"(color == "red" OR RANDOM_SAMPLE(0.001))";
```

```javascript
// Correct: Filter first, then sample
const filterCorrect = 'color == "red" AND RANDOM_SAMPLE(0.001)';
// Processing: Find all red items → Sample 0.1% of those red items

// Incorrect: OR doesn't make logical sense
const filterIncorrect = 'color == "red" OR RANDOM_SAMPLE(0.001)';  // ❌ Invalid logic
// This would mean: "Either red items OR sample everything" - which is meaningless
```

```csharp
// Correct: Filter first, then sample
string filter = "color == \"red\" AND RANDOM_SAMPLE(0.001)";
// Processing: Find all red items → Sample 0.1% of those red items

// Incorrect: OR doesn't make logical sense
string filterIncorrect = "color == \"red\" OR RANDOM_SAMPLE(0.001)"; // ❌ Invalid logic
// This would mean: "Either red items OR sample everything" - which is meaningless
```

```bash
# restful
# Correct: Filter first, then sample
export filterSampleCorrect='color == "red" AND RANDOM_SAMPLE(0.001)'
# Processing: Find all red items → Sample 0.1% of those red items

# Incorrect: OR doesn't make logical sense
export filterSampleIncorrect='color == "red" OR RANDOM_SAMPLE(0.001)'  # ❌ Invalid logic
# This would mean: "Either red items OR sample everything" - which is meaningless
```

## Examples

### Example 1: Data exploration

Quickly preview your collection structure:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;
import java.util.List;

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

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://localhost:19530"
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

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(&ConnectConfig::new().uri("http://localhost:19530")).await?;

// Sample approximately 1% of the entire collection
let res = client
    .query(
        QueryRequest::builder()
            .collection_name("product_catalog")
            .filter("RANDOM_SAMPLE(0.01)")
            .output_fields(["id", "product_name"])
            .limit(10)
            .build()?,
    )
    .await?;

println!("Sampled {} products from collection", res.results().get_row_count());
```

```cpp
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::QueryRequest()
                       .WithCollectionName("product_catalog")
                       .WithFilter("RANDOM_SAMPLE(0.01)")
                       .AddOutputField("id")
                       .AddOutputField("product_name")
                       .WithLimit(10);

milvus::QueryResponse response;
status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });

// Sample approximately 1% of the entire collection
const res = await client.query({
    collection_name: "product_catalog",
    filter: "RANDOM_SAMPLE(0.01)",
    output_fields: ["id", "product_name"],
    limit: 10
});

console.log(`Sampled ${res.data.length} products from collection`);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    Username = "root",
    Password = "Milvus"
});

// Sample approximately 1% of the entire collection
QueryResp resp = await client.QueryAsync(new QueryReq
{
    CollectionName = "product_catalog",
    Expression = "RANDOM_SAMPLE(0.01)",
    Parameters = new QueryParameters
    {
        OutputFields = { "id", "product_name" },
        Limit = 10
    }
});

Console.WriteLine($"Sampled {resp.FieldsData.FirstOrDefault()?.RowCount ?? 0} products from collection");
```

```bash
# restful
export TOKEN="root:Milvus"
export CLUSTER_ENDPOINT="http://localhost:19530"
export filterSample='RANDOM_SAMPLE(0.01)'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"product_catalog\",
  \"filter\": \"$filterSample\",
  \"outputFields\": [\"id\", \"product_name\"],
  \"limit\": 10
}"
```

### Example 2: Combined filtering with random sampling

Test filtering logic on a manageable subset:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

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
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

filter := "category == \"electronics\" AND price > 100 AND RANDOM_SAMPLE(0.005)"

_, err := client.Query(ctx, milvusclient.NewQueryOption("product_catalog").
    WithFilter(filter).
    WithOutputFields("product_name", "price", "rating"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
// First filter by category and price, then sample 0.5% of results
let filter_expression = r#"category == "electronics" AND price > 100 AND RANDOM_SAMPLE(0.005)"#;

let res = client
    .query(
        QueryRequest::builder()
            .collection_name("product_catalog")
            .filter(filter_expression)
            .output_fields(["product_name", "price", "rating"])
            .limit(10)
            .build()?,
    )
    .await?;

println!("Found {} electronics products in sample", res.results().get_row_count());
```

```cpp
#include "milvus/MilvusClientV2.h"

auto filter = R"(category == "electronics" AND price > 100 AND RANDOM_SAMPLE(0.005))";
auto request = milvus::QueryRequest()
                       .WithCollectionName("product_catalog")
                       .WithFilter(filter)
                       .AddOutputField("product_name")
                       .AddOutputField("price")
                       .AddOutputField("rating")
                       .WithLimit(10);

milvus::QueryResponse response;
auto status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// First filter by category and price, then sample 0.5% of results
const filter_expression = 'category == "electronics" AND price > 100 AND RANDOM_SAMPLE(0.005)';

const res = await client.query({
    collection_name: "product_catalog",
    filter: filter_expression,
    output_fields: ["product_name", "price", "rating"],
    limit: 10
});

console.log(`Found ${res.data.length} electronics products in sample`);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    Username = "root",
    Password = "Milvus"
});

// First filter by category and price, then sample 0.5% of results
string filter = "category == \"electronics\" AND price > 100 AND RANDOM_SAMPLE(0.005)";

QueryResp resp = await client.QueryAsync(new QueryReq
{
    CollectionName = "product_catalog",
    Expression = filter,
    Parameters = new QueryParameters
    {
        OutputFields = { "product_name", "price", "rating" },
        Limit = 10
    }
});

Console.WriteLine($"Found {resp.FieldsData.FirstOrDefault()?.RowCount ?? 0} electronics products in sample");
```

```bash
# restful
export filterComplex="category == \\\"electronics\\\" AND price > 100 AND RANDOM_SAMPLE(0.005)"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"product_catalog\",
  \"filter\": \"$filterComplex\",
  \"outputFields\": [\"product_name\", \"price\", \"rating\"]
}"
```

### Example 3: Quick analytics

Perform rapid statistical analysis on filtered data:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
# Get insights from ~0.1% of premium customer data
filter_expression = 'customer_tier == "premium" AND region == "North America" AND RANDOM_SAMPLE(0.001)'

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
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

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
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

filter := "customer_tier == \"premium\" AND region == \"North America\" AND RANDOM_SAMPLE(0.001)"

_, err := client.Query(ctx, milvusclient.NewQueryOption("customer_profiles").
    WithFilter(filter).
    WithOutputFields("purchase_amount", "satisfaction_score", "last_purchase_date"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
// Get insights from ~0.1% of premium customer data
let filter_expression = r#"customer_tier == "premium" AND region == "North America" AND RANDOM_SAMPLE(0.001)"#;

let res = client
    .query(
        QueryRequest::builder()
            .collection_name("customer_profiles")
            .filter(filter_expression)
            .output_fields(["purchase_amount", "satisfaction_score", "last_purchase_date"])
            .limit(10)
            .build()?,
    )
    .await?;

println!("Sample size: {}", res.results().get_row_count());
```

```cpp
#include "milvus/MilvusClientV2.h"

auto filter = R"(customer_tier == "premium" AND region == "North America" AND RANDOM_SAMPLE(0.001))";
auto request = milvus::QueryRequest()
                       .WithCollectionName("customer_profiles")
                       .WithFilter(filter)
                       .AddOutputField("purchase_amount")
                       .AddOutputField("satisfaction_score")
                       .AddOutputField("last_purchase_date")
                       .WithLimit(10);

milvus::QueryResponse response;
auto status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Get insights from ~0.1% of premium customer data
const filter_expression = 'customer_tier == "premium" AND region == "North America" AND RANDOM_SAMPLE(0.001)';

const res = await client.query({
    collection_name: "customer_profiles",
    filter: filter_expression,
    output_fields: ["purchase_amount", "satisfaction_score", "last_purchase_date"],
    limit: 10
});

// Analyze sample for quick insights
if (res.data.length > 0) {
    const average_purchase = res.data.reduce((sum, r) => sum + r.purchase_amount, 0) / res.data.length;
    const average_satisfaction = res.data.reduce((sum, r) => sum + r.satisfaction_score, 0) / res.data.length;

    console.log(`Sample size: ${res.data.length}`);
    console.log(`Average purchase amount: $${average_purchase.toFixed(2)}`);
    console.log(`Average satisfaction score: ${average_satisfaction.toFixed(2)}`);
}
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    Username = "root",
    Password = "Milvus"
});

// Get insights from ~0.1% of premium customer data
string filter = "customer_tier == \"premium\" AND region == \"North America\" AND RANDOM_SAMPLE(0.001)";

QueryResp resp = await client.QueryAsync(new QueryReq
{
    CollectionName = "customer_profiles",
    Expression = filter,
    Parameters = new QueryParameters
    {
        OutputFields = { "purchase_amount", "satisfaction_score", "last_purchase_date" },
        Limit = 10
    }
});
```

```bash
# restful
export TOKEN="root:Milvus"
export CLUSTER_ENDPOINT="http://localhost:19530"
export filterCustomer="customer_tier == \\\"premium\\\" AND region == \\\"North America\\\" AND RANDOM_SAMPLE(0.001)"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data "{
  \"collectionName\": \"customer_profiles\",
  \"filter\": \"$filterCustomer\",
  \"outputFields\": [\"purchase_amount\", \"satisfaction_score\", \"last_purchase_date\"],
  \"limit\": 10
}"
```

### Example 4: Combined with vector search

Use random sampling in filtered search scenarios:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
# Search for similar products within a sampled subset
search_results = client.search(
    collection_name="product_catalog",
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],  # query vector
    # highlight-next-line
    filter='category == "books" AND RANDOM_SAMPLE(0.01)',
    search_params={"params": {}},
    output_fields=["title", "author", "price"],
    limit=10
)

print(f"Found {len(search_results[0])} similar books in sample")
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

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
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

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

```rust
// Search for similar products within a sampled subset
let res = client
    .search(
        SearchRequest::builder()
            .collection_name("product_catalog")
            .vector_field("vector")
            .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.3, 0.4, 0.5]]))
            .filter(r#"category == "books" AND RANDOM_SAMPLE(0.01)"#)
            .limit(10)
            .output_fields(["title", "author", "price"])
            .build()?,
    )
    .await?;

println!("Found {} similar books in sample", res.results().len());
```

```cpp
#include "milvus/MilvusClientV2.h"

std::vector<float> query_vector = {0.1, 0.2, 0.3, 0.4, 0.5};
auto request = milvus::SearchRequest()
                   .WithCollectionName("product_catalog")
                   .WithLimit(10)
                   .WithFilter(R"(category == "books" AND RANDOM_SAMPLE(0.01))")
                   .AddOutputField("title")
                   .AddOutputField("author")
                   .AddOutputField("price")
                   .AddFloatVector(query_vector);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Search for similar products within a sampled subset
const res = await client.search({
    collection_name: "product_catalog",
    data: [[0.1, 0.2, 0.3, 0.4, 0.5]],  // query vector
    filter: 'category == "books" AND RANDOM_SAMPLE(0.01)',
    limit: 10,
    output_fields: ["title", "author", "price"]
});

console.log(`Found ${res.results.length} similar books in sample`);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    Username = "root",
    Password = "Milvus"
});

float[] queryVector = [0.1f, 0.2f, 0.3f, 0.4f, 0.5f];

// Search for similar products within a sampled subset
SearchResp resp = await client.SearchAsync(new SearchReq
{
    CollectionName = "product_catalog",
    VectorFieldName = "vector",
    Vectors = [queryVector],
    Limit = 10,
    Parameters = new SearchParameters
    {
        Expression = "category == \"books\" AND RANDOM_SAMPLE(0.01)",
        OutputFields = { "title", "author", "price" }
    }
});

Console.WriteLine($"Found {resp.Ids.LongIds?.Count ?? 0} similar books in sample");
```

```bash
# restful
export TOKEN="root:Milvus"
export CLUSTER_ENDPOINT="http://localhost:19530"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--data '{
  "collectionName": "product_catalog",
  "data": [[0.1, 0.2, 0.3, 0.4, 0.5]],
  "annsField": "vector",
  "limit": 10,
  "filter": "category == \"books\" AND RANDOM_SAMPLE(0.01)",
  "outputFields": ["title", "author", "price"]
}'
```

## Best practices

- **Start small**: Begin with smaller sampling factors (0.001-0.01) for initial exploration

- **Development workflow**: Use sampling during development, remove for production queries

- **Statistical validity**: Larger samples provide more accurate statistical representations

- **Performance testing**: Monitor query performance and adjust sampling factors as needed
