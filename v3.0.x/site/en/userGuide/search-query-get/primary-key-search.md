---
id: primary-key-search.md
title: "Primary-Key Search"
summary: "When conducting similarity searches, you are always asked to provide one or more query vectors, even if the query vectors are already present in the target collection. To avoid retrieving vectors before the search, you can use primary keys instead."
beta: Milvus 2.6.9+
---

# Primary-Key Search

When conducting similarity searches, you are always asked to provide one or more query vectors, even if the query vectors are already present in the target collection. To avoid retrieving vectors before the search, you can use primary keys instead.

## Overview

On e-commerce platforms, users can enter a keyword to retrieve products that match it. Once the user views a product detail page, the platform will also display a list of similar products at the bottom of the page for users who want to compare them.

The recommendations are sorted by their similarity to the keyword or the current product. To achieve this, platform developers need to retrieve the vector representation of the keyword or the current product from Milvus before the actual similarity search, which increases the round-trip between the platform and Milvus and results in a large number of high-dimensional floats being transmitted across the network.

To simplify the interaction logic between your applications and Milvus, reduce the number of round-trips, and avoid transmitting large amounts of high-dimensional floating-point values across the network, consider using primary key searches.

In a primary key search, you do not need to provide any query vectors. Instead, you are asked to provide the primary keys (`ids`) of the entities that contain the query vectors. 

## Limits & restrictions

- Searches using primary keys apply to all vector data types, except sparse vector fields derived from VarChar fields, as in BM25 functions.

- You can use primary keys instead of query vectors in filtered, range, and grouping searches, optionally with pagination enabled. However, this feature does not apply to hybrid searches and search iterators.

- For similarity searches involving embedding lists, you still need to retrieve the query vectors, arrange them into embedding lists, and run the searches.

- You cannot use primary keys instead of query vectors in RESTful APIs.

- For any nonexistent primary keys or those in an incorrect format, Milvus will prompt errors.

- Primary keys and query vectors are mutually exclusive. Providing both also results in errors.

## Examples

The following examples assume that all provided Int64 IDs are available in the target collection.

<div class="alert note">

The primary keys are not used for filtering; they are used only for vector retrieval.

</div>

### Example 1: Basic primary-key search

To conduct a basic primary-key search, simply replace the query vectors with primary keys.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
from pymilvus import MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

res = client.search(
    collection_name="quick_setup",
    anns_field="vector",
    # highlight-start
    ids=[551, 296, 43], # a list of primary keys
    # highlight-end
    limit=3,
    search_params={"metric_type": "IP"}
)

for hits in res:
    for hit in hits:
        print(hit)
```

```java
// java
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
    address: "http://localhost:19530",
    token: "root:Milvus",
});

const res = await client.search({
    collection_name: "quick_setup",
    anns_field: "vector",
    // highlight-start
    ids: [551, 296, 43], // a list of primary keys
    // highlight-end
    limit: 3,
    metric_type: "IP",
});

console.log(res.results);
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/column"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

// highlight-start
ids := column.NewColumnInt64("id", []int64{551, 296, 43}) // a list of primary keys
// highlight-end
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    "quick_setup", // collectionName
    3,             // limit
    ids,
).WithANNSField("vector").
    WithSearchParam("metric_type", "IP"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs)
    fmt.Println("Scores: ", resultSet.Scores)
}
```

```bash
# restful
```

```cpp
auto searchRequest = milvus::SearchRequest()
                         .WithCollectionName("quick_setup")
                         .WithAnnsField("vector")
                         // highlight-start
                         .WithIDs({551, 296, 43})
                         // highlight-end
                         .WithLimit(3)
                         .WithMetricType(milvus::MetricType::IP);

milvus::SearchResponse searchResponse;
auto status = client->Search(searchRequest, searchResponse);
if (!status.IsOk()) {
    std::cerr << "Search failed: " << status.Message() << std::endl;
    return;
}

for (const auto& result : searchResponse.Results().Results()) {
    const auto ids = result.Ids().IntIDArray();
    for (size_t i = 0; i < result.Scores().size(); ++i) {
        std::cout << "id=" << ids[i] << ", score=" << result.Scores()[i] << std::endl;
    }
}
```

### Example 2: Filtered search using primary keys

The following example assumes that color and likes are two schema-defined fields in the target collection. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    # highlight-start
    ids=[551, 296, 43], #
    filter='color like "red%" and likes > 50',
    output_fields=["color", "likes"],
    # highlight-end
    limit=3,
)
```

```java
// java
```

```javascript
const res = await client.search({
    collection_name: "my_collection",
    // highlight-start
    ids: [551, 296, 43],
    filter: 'color like "red%" and likes > 50',
    output_fields: ["id", "color", "likes"],
    // highlight-end
    limit: 3,
});

console.log(res.results);
```

```go
// highlight-start
ids := column.NewColumnInt64("id", []int64{551, 296, 43})
// highlight-end
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    "my_collection", // collectionName
    3,               // limit
    ids,
).WithFilter(`color like "red%" and likes > 50`).
    WithOutputFields("color", "likes"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs)
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("color: ", resultSet.GetColumn("color"))
    fmt.Println("likes: ", resultSet.GetColumn("likes"))
}
```

```bash
# restful
```

```cpp
auto searchRequest = milvus::SearchRequest()
                         .WithCollectionName("my_collection")
                         // highlight-start
                         .WithIDs({551, 296, 43})
                         .WithFilter(R"(color like "red%" and likes > 50)")
                         .WithOutputFields({"color", "likes"})
                         // highlight-end
                         .WithLimit(3);

milvus::SearchResponse searchResponse;
auto status = client->Search(searchRequest, searchResponse);
if (!status.IsOk()) {
    std::cerr << "Search failed: " << status.Message() << std::endl;
    return;
}

for (const auto& result : searchResponse.Results().Results()) {
    const auto ids = result.Ids().IntIDArray();
    const auto colors = result.OutputField<milvus::VarCharFieldData>("color");
    const auto likes = result.OutputField<milvus::Int64FieldData>("likes");
    for (size_t i = 0; i < result.Scores().size(); ++i) {
        std::cout << "id=" << ids[i]
                  << ", score=" << result.Scores()[i]
                  << ", color=" << colors->Data()[i]
                  << ", likes=" << likes->Data()[i] << std::endl;
    }
}
```

### Example 3: Range search using primary keys

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    # highlight-start
    ids=[551, 296, 43],
    # highlight-end
    limit=3,
    search_params={
        # highlight-start
        "params": {
            "radius": 0.4,
            "range_filter": 0.6
        }
        # highlight-end
    }
)
```

```java
// java
```

```javascript
const res = await client.search({
    collection_name: "my_collection",
    // highlight-start
    ids: [551, 296, 43],
    // highlight-end
    limit: 3,
    params: {
        // highlight-start
        radius: 0.4,
        range_filter: 0.6,
        // highlight-end
    },
});

console.log(res.results);
```

```go
annParam := index.NewCustomAnnParam()
// highlight-start
annParam.WithRadius(0.4)
annParam.WithRangeFilter(0.6)
// highlight-end

// highlight-start
ids := column.NewColumnInt64("id", []int64{551, 296, 43})
// highlight-end
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    "my_collection", // collectionName
    3,               // limit
    ids,
).WithANNSField("vector").
    WithAnnParam(annParam))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs)
    fmt.Println("Scores: ", resultSet.Scores)
}
```

```bash
# restful
```

```cpp
auto searchRequest = milvus::SearchRequest()
                         .WithCollectionName("my_collection")
                         .WithAnnsField("vector")
                         // highlight-start
                         .WithIDs({551, 296, 43})
                         .WithRadius(0.4)
                         .WithRangeFilter(0.6)
                         // highlight-end
                         .WithLimit(3);

milvus::SearchResponse searchResponse;
auto status = client->Search(searchRequest, searchResponse);
if (!status.IsOk()) {
    std::cerr << "Search failed: " << status.Message() << std::endl;
    return;
}

for (const auto& result : searchResponse.Results().Results()) {
    const auto ids = result.Ids().IntIDArray();
    for (size_t i = 0; i < result.Scores().size(); ++i) {
        std::cout << "id=" << ids[i] << ", score=" << result.Scores()[i] << std::endl;
    }
}
```

### Example 4: Grouping search using primary keys

The following example assumes `docId` is a schema-defined fields in the target collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
res = client.search(
    collection_name="my_collection",
    # highlight-start
    ids=[551, 296, 43],
    # highlight-end
    limit=3,
    group_by_field="docId",
    output_fields=["docId"]
)
```

```java
// java
```

```javascript
const res = await client.search({
    collection_name: "my_collection",
    // highlight-start
    ids: [551, 296, 43],
    // highlight-end
    limit: 3,
    group_by_field: "docId",
    output_fields: ["id", "docId"],
});

console.log(res.results);
```

```go
// highlight-start
ids := column.NewColumnInt64("id", []int64{551, 296, 43})
// highlight-end
resultSets, err := client.Search(ctx, milvusclient.NewSearchByIDsOption(
    "my_collection", // collectionName
    3,               // limit
    ids,
).WithGroupByField("docId").
    WithOutputFields("docId"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs)
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("docId: ", resultSet.GetColumn("docId"))
}
```

```bash
# restful
```

```cpp
auto searchRequest = milvus::SearchRequest()
                         .WithCollectionName("my_collection")
                         .WithAnnsField("vector")
                         // highlight-start
                         .WithIDs({551, 296, 43})
                         .WithGroupByField("docId")
                         .WithOutputFields({"docId"})
                         // highlight-end
                         .WithLimit(3);

milvus::SearchResponse searchResponse;
auto status = client->Search(searchRequest, searchResponse);
if (!status.IsOk()) {
    std::cerr << "Search failed: " << status.Message() << std::endl;
    return;
}

for (const auto& result : searchResponse.Results().Results()) {
    const auto ids = result.Ids().IntIDArray();
    const auto docIds = result.OutputField<milvus::Int64FieldData>("docId");
    for (size_t i = 0; i < result.Scores().size(); ++i) {
        std::cout << "id=" << ids[i]
                  << ", score=" << result.Scores()[i]
                  << ", docId=" << docIds->Data()[i] << std::endl;
    }
}
```

