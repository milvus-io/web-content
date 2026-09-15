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
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.common.IndexParam;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

List<Object> ids = Arrays.asList(551L, 296L, 43L);
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("quick_setup")
        .annsField("vector")
        .ids(ids)
        .limit(3)
        .metricType(IndexParam.MetricType.IP)
        .build());
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
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

```cpp
#include <iostream>
#include <memory>
#include <string>
#include <vector>
#include "milvus/MilvusClientV2.h"

int main() {
    auto client = milvus::MilvusClientV2::Create();
    auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
    if (!status.IsOk()) {
        std::cerr << status.Message() << std::endl;
        return 1;
    }

    milvus::SearchRequest request;
    request.WithCollectionName("quick_setup")
        .WithAnnsField("vector")
        .WithIDs(std::vector<int64_t>{551, 296, 43})
        .WithMetricType(milvus::MetricType::IP)
        .WithLimit(3);

    milvus::SearchResponse response;
    status = client->Search(request, response);
    if (!status.IsOk()) {
        std::cerr << status.Message() << std::endl;
        return 1;
    }

    for (auto& result : response.Results().Results()) {
        milvus::EntityRows output_rows;
        status = result.OutputRows(output_rows);
        for (const auto& row : output_rows) {
            std::cout << row << std::endl;
        }
    }

    return 0;
}
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/entities/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "quick_setup",
    "annsField": "vector",
    "ids": [551, 296, 43],
    "limit": 3
  }' 
```


### Example 2: Filtered search using primary keys

The following example assumes that color and likes are two schema-defined fields in the target collection. 

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
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
List<Object> ids = Arrays.asList(551L, 296L, 43L);
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .ids(ids)
        .filter("color like \"red%\" and likes > 50")
        .limit(3)
        .outputFields(Arrays.asList("color", "likes"))
        .build());
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
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

```cpp
milvus::SearchRequest request;
request.WithCollectionName("my_collection")
    .WithAnnsField("vector")
    .WithIDs(std::vector<int64_t>{551, 296, 43})
    .WithFilter("color like \"red%\" and likes > 50")
    .WithLimit(3)
    .AddOutputField("color")
    .AddOutputField("likes");

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/entities/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "my_collection",
    "annsField": "vector",
    "ids": [551, 296, 43],
    "filter": "color like \\"red%\\" and likes > 50",
    "outputFields": ["color", "likes"],
    "limit": 3
  }' 
```


### Example 3: Range search using primary keys

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
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
Map<String, Object> params = new HashMap<>();
params.put("radius", "0.4");
params.put("range_filter", "0.6");

List<Object> ids = Arrays.asList(551L, 296L, 43L);
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .ids(ids)
        .limit(3)
        .searchParams(params)
        .build());
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
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

```cpp
milvus::SearchRequest request;
request.WithCollectionName("my_collection")
    .WithAnnsField("vector")
    .WithIDs(std::vector<int64_t>{551, 296, 43})
    .WithLimit(3)
    .WithRadius(0.4)
    .WithRangeFilter(0.6);

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/entities/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "my_collection",
    "annsField": "vector",
    "ids": [551, 296, 43],
    "limit": 3,
    "searchParams": {
      "params": {
        "radius": 0.4,
        "range_filter": 0.6
      }
    }
  }' 
```


### Example 4: Grouping search using primary keys

The following example assumes `docId` is a schema-defined fields in the target collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#bash">cURL</a>
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
List<Object> ids = Arrays.asList(551L, 296L, 43L);
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .ids(ids)
        .limit(3)
        .groupByFieldName("docId")
        .outputFields(Collections.singletonList("docId"))
        .build());
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (List<SearchResp.SearchResult> results : searchResults) {
    System.out.println("TopK results:");
    for (SearchResp.SearchResult result : results) {
        System.out.println(result);
    }
}
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

```cpp
milvus::SearchRequest request;
request.WithCollectionName("my_collection")
    .WithAnnsField("vector")
    .WithIDs(std::vector<int64_t>{551, 296, 43})
    .WithLimit(3)
    .WithGroupByField("docId")
    .AddOutputField("docId");

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return 1;
}
```

```bash
# restful
curl -X POST "http://localhost:19530/v2/vectordb/entities/search" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "my_collection",
    "annsField": "vector",
    "ids": [551, 296, 43],
    "limit": 3,
    "groupingField": "docId",
    "outputFields": ["docId"]
  }' 
```


