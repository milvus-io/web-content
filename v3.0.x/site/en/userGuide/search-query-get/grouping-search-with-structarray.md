---
id: grouping-search-with-structarray.md
title: "Grouping Search with StructArray"
summary: "Use this page to group StructArray element-level search results by the parent entity. Element-level search can return multiple hits from the same entity when several Struct elements match the query. Grouping collapses those element hits so each parent entity appears at most once."
---
# Grouping Search with StructArray

Use this page to group StructArray element-level search results by the parent entity. Element-level search can return multiple hits from the same entity when several Struct elements match the query. Grouping collapses those element hits so each parent entity appears at most once.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a StructArray field named `chunks`. The `chunks[emb]` vector subfield is indexed for element-level search with a regular vector metric.

The examples use the default group size of one.

Before running these examples, create the collection, insert the example data, create the required vector indexes, and load the collection. Use 4-dimensional vectors for the fields shown here. Each code block assumes the connection and variables from the preceding examples in the same language unless it defines them again.

## How grouping applies to StructArray

| Search mode | Grouping behavior | Result behavior |
| --- | --- | --- |
| EmbeddingList search | Not supported. | Not applicable. |
| Element-level search | Supported by grouping on the primary key. | Returns at most one result per parent entity. Element-level metadata is preserved, so the selected element index or offset can be returned when exposed by the API or SDK. |
| Hybrid search | Supported only when all sub-searches target element-level vector fields under the same StructArray field. | Element-level sub-searches are grouped by primary key before final result handling. |

<div class="alert note">

Use grouping when ungrouped element-level search returns too many duplicate parent entities. If you want every matching Struct element as an individual hit, use [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md) without `group_by_field`.

</div>

## Before you begin

Prepare the collection, data, and indexes before running grouping search.

| Requirement | Details |
| --- | --- |
| Element-level vector subfield | Use a StructArray vector subfield such as `chunks[emb]`, indexed with a regular vector metric. |
| Regular vector query | Use a regular query vector, not an `EmbeddingList`. |
| Primary key grouping | Use the collection primary key as `group_by_field`, such as `doc_id`. |
| No range parameters | Do not combine grouping search with range-search parameters such as `radius` or `range_filter`. |

For index setup, see [Index StructArray Fields](index-structarray-fields.md).

## Run grouped element-level search

The following example searches individual chunks first, then groups the element hits by the parent entity's primary key.

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

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

query_vector = [0.19, 0.24, 0.30, 0.37]

results = client.search(
    collection_name="tech_articles",
    data=[query_vector],
    anns_field="chunks[emb]",
    limit=5,
    group_by_field="doc_id",
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[page]",
        "chunks[quality_score]",
    ],
)

for hits in results:
    for hit in hits:
        print(
            "doc_id:", hit["doc_id"],
            "distance:", hit["distance"],
            "offset:", hit.get("offset"),
            "entity:", hit["entity"],
        )
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

FloatVec queryVector = new FloatVec(new float[]{0.19f, 0.24f, 0.30f, 0.37f});

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .annsField("chunks[emb]")
        .data(Collections.singletonList(queryVector))
        .topK(5)
        .groupByFieldName("doc_id")
        .outputFields(Arrays.asList(
                "doc_id", "title", "chunks[text]", "chunks[section]",
                "chunks[page]", "chunks[quality_score]"))
        .build());

for (List<SearchResp.SearchResult> results : searchResp.getSearchResults()) {
    for (SearchResp.SearchResult result : results) {
        System.out.println("doc_id: " + result.getId()
                + ", distance: " + result.getScore()
                + ", offset: " + result.getElementOffset()
                + ", entity: " + result.getEntity());
    }
}
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    return
}
defer cli.Close(ctx)

queryVector := []float32{0.19, 0.24, 0.30, 0.37}

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "tech_articles",
    5,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("chunks[emb]").
    WithGroupByField("doc_id").
    WithOutputFields("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err.Error())
    return
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("doc_id: ", resultSet.GetColumn("doc_id").FieldData().GetScalars())
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let response = client.search(
    SearchRequest::builder()
        .collection_name("tech_articles")
        .vector_field("chunks[emb]")
        .vectors(SearchVectors::Float(vec![vec![0.19, 0.24, 0.30, 0.37]]))
        .output_fields(["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]"])
        .limit(5)
        .group_by_field("doc_id")
        .build()?,
).await?;

for result in response.results() {
    for row in result.rows()? {
        println!("doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}",
            row.get("doc_id")?, row.get("score")?, row.element_offset(), row.to_entity_row()?);
    }
}
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
#include <vector>

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

std::vector<float> query_vector = {0.19f, 0.24f, 0.30f, 0.37f};

milvus::SearchRequest request;
request.WithCollectionName("tech_articles")
       .WithAnnsField("chunks[emb]")
       .AddFloatVector(query_vector)
       .WithLimit(5)
       .WithGroupByField("doc_id")
       .AddOutputField("doc_id")
       .AddOutputField("title")
       .AddOutputField("chunks[text]")
       .AddOutputField("chunks[section]")
       .AddOutputField("chunks[page]")
       .AddOutputField("chunks[quality_score]");

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

for (const auto& result : response.Results().Results()) {
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    if (!status.IsOk()) {
        std::cout << status.Message() << std::endl;
    }
    for (const auto& row : output_rows) {
        std::cout << row << std::endl;
    }
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

const query_vector = [0.19, 0.24, 0.30, 0.37];

const res = await client.search({
  collection_name: "tech_articles",
  data: query_vector,
  anns_field: "chunks[emb]",
  limit: 5,
  group_by_field: "doc_id",
  output_fields: ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]"],
});

for (const hit of res.results) {
  console.log("doc_id:", hit.doc_id, "distance:", hit.score, "offset:", hit.offset);
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
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

float[] queryVector = [0.19f, 0.24f, 0.30f, 0.37f];

SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "chunks[emb]",
    Vectors = [queryVector],
    Limit = 5,
    Parameters = new SearchParameters
    {
        GroupByField = "doc_id",
        OutputFields = { "doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]" }
    }
});

foreach (long id in results.Ids.LongIds ?? [])
{
    Console.WriteLine($"doc_id: {id}");
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "data": [
        [0.19, 0.24, 0.30, 0.37]
    ],
    "annsField": "chunks[emb]",
    "limit": 5,
    "groupingField": "doc_id",
    "outputFields": ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]"]
}'
```

Without grouping, the same `doc_id` can appear multiple times if several chunks match the query. With `group_by_field="doc_id"`, each parent entity appears at most once. Grouping preserves element-level metadata, so the grouped result can still include the selected Struct element index or offset when the API or SDK exposes it.

## Add scalar filters

You can combine grouping search with StructArray scalar filtering. Use `element_filter` when the scalar condition should constrain which Struct elements participate in element-level vector search.

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
query_vector = [0.19, 0.24, 0.30, 0.37]

filter_expr = (
    'category == "search" && '
    'element_filter(chunks, '
    '$[section] == "index" && '
    '$[quality_score] > 0.9)'
)

results = client.search(
    collection_name="tech_articles",
    data=[query_vector],
    anns_field="chunks[emb]",
    filter=filter_expr,
    limit=5,
    group_by_field="doc_id",
    output_fields=[
        "doc_id",
        "title",
        "category",
        "chunks[text]",
        "chunks[section]",
        "chunks[quality_score]",
    ],
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

FloatVec queryVector = new FloatVec(new float[]{0.19f, 0.24f, 0.30f, 0.37f});

String filterExpr = "category == \"search\" && "
        + "element_filter(chunks, "
        + "$[section] == \"index\" && "
        + "$[quality_score] > 0.9)";

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .annsField("chunks[emb]")
        .data(Collections.singletonList(queryVector))
        .filter(filterExpr)
        .topK(5)
        .groupByFieldName("doc_id")
        .outputFields(Arrays.asList(
                "doc_id", "title", "category",
                "chunks[text]", "chunks[section]", "chunks[quality_score]"))
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

queryVector := []float32{0.19, 0.24, 0.30, 0.37}

filterExpr := "category == \"search\" && " +
    "element_filter(chunks, " +
    "$[section] == \"index\" && " +
    "$[quality_score] > 0.9)"

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "tech_articles",
    5,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("chunks[emb]").
    WithFilter(filterExpr).
    WithGroupByField("doc_id").
    WithOutputFields("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err.Error())
    return
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("doc_id: ", resultSet.GetColumn("doc_id").FieldData().GetScalars())
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let filter_expr = "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)";

let response = client.search(
    SearchRequest::builder()
        .collection_name("tech_articles")
        .vector_field("chunks[emb]")
        .vectors(SearchVectors::Float(vec![vec![0.19, 0.24, 0.30, 0.37]]))
        .filter(filter_expr)
        .output_fields(["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"])
        .limit(5)
        .group_by_field("doc_id")
        .build()?,
).await?;

for result in response.results() {
    for row in result.rows()? {
        println!("doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}",
            row.get("doc_id")?, row.get("score")?, row.element_offset(), row.to_entity_row()?);
    }
}
```

```cpp
std::vector<float> query_vector = {0.19f, 0.24f, 0.30f, 0.37f};

std::string filter_expr = "category == \"search\" && "
                          "element_filter(chunks, "
                          "$[section] == \"index\" && "
                          "$[quality_score] > 0.9)";

milvus::SearchRequest request;
request.WithCollectionName("tech_articles")
       .WithAnnsField("chunks[emb]")
       .AddFloatVector(query_vector)
       .WithFilter(filter_expr)
       .WithLimit(5)
       .WithGroupByField("doc_id")
       .AddOutputField("doc_id")
       .AddOutputField("title")
       .AddOutputField("category")
       .AddOutputField("chunks[text]")
       .AddOutputField("chunks[section]")
       .AddOutputField("chunks[quality_score]");

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}
```

```javascript
const query_vector = [0.19, 0.24, 0.30, 0.37];

const filter_expr = 'category == "search" && element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)';

const res = await client.search({
  collection_name: "tech_articles",
  data: query_vector,
  anns_field: "chunks[emb]",
  filter: filter_expr,
  limit: 5,
  group_by_field: "doc_id",
  output_fields: ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"],
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

float[] queryVector = [0.19f, 0.24f, 0.30f, 0.37f];

string filterExpr = "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)";

SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "chunks[emb]",
    Vectors = [queryVector],
    Limit = 5,
    Parameters = new SearchParameters
    {
        Expression = filterExpr,
        GroupByField = "doc_id",
        OutputFields = { "doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]" }
    }
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "data": [
        [0.19, 0.24, 0.30, 0.37]
    ],
    "annsField": "chunks[emb]",
    "filter": "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)",
    "limit": 5,
    "groupingField": "doc_id",
    "outputFields": ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"]
}'
```

The top-level predicate selects candidate entities. The `element_filter` predicate restricts element-level vector search to matching Struct elements. Grouping then collapses matching element hits by the primary key.

## Use grouping in hybrid search

Hybrid grouping with StructArray is an element-level feature. It is supported only when all sub-searches target element-level vector fields under the same StructArray field. Do not use EmbeddingList-level requests in a grouped StructArray hybrid search.

The following example assumes the `chunks` StructArray field has two element-level vector subfields, `chunks[emb]` and `chunks[code_emb]`, and both are indexed with `COSINE`. Define and populate the additional 4-dimensional `code_emb` subfield when creating the collection; it is not included in the base schema linked above.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import AnnSearchRequest, RRFRanker

query_vector = [0.19, 0.24, 0.30, 0.37]
code_query_vector = [0.18, 0.23, 0.29, 0.36]

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="chunks[emb]",
    param={"metric_type": "COSINE"},
    limit=10,
    expr='element_filter(chunks, $[section] == "index")',
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field="chunks[code_emb]",
    param={"metric_type": "COSINE"},
    limit=10,
    expr='element_filter(chunks, $[has_code] == true)',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[index_chunk_req, code_chunk_req],
    ranker=RRFRanker(),
    limit=5,
    group_by_field="doc_id",
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
    ],
)
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.ranker.RRFRanker;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

FloatVec queryVector = new FloatVec(new float[]{0.19f, 0.24f, 0.30f, 0.37f});
FloatVec codeQueryVector = new FloatVec(new float[]{0.18f, 0.23f, 0.29f, 0.36f});

AnnSearchReq indexChunkReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[emb]")
        .vectors(Collections.singletonList(queryVector))
        .metricType(IndexParam.MetricType.COSINE)
        .limit(10)
        .filter("element_filter(chunks, $[section] == \"index\")")
        .build();

AnnSearchReq codeChunkReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[code_emb]")
        .vectors(Collections.singletonList(codeQueryVector))
        .metricType(IndexParam.MetricType.COSINE)
        .limit(10)
        .filter("element_filter(chunks, $[has_code] == true)")
        .build();

SearchResp searchResp = client.hybridSearch(HybridSearchReq.builder()
        .collectionName("tech_articles")
        .searchRequests(Arrays.asList(indexChunkReq, codeChunkReq))
        .ranker(RRFRanker.builder().build())
        .limit(5)
        .groupByFieldName("doc_id")
        .outFields(Arrays.asList("doc_id", "title", "chunks[text]", "chunks[section]"))
        .build());
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let index_chunk_req = SubSearchRequest::builder()
    .vector_field("chunks[emb]")
    .vectors(SearchVectors::Float(vec![vec![0.19, 0.24, 0.30, 0.37]]))
    .filter("element_filter(chunks, $[section] == \"index\")")
    .limit(10)
    .build()?;

let code_chunk_req = SubSearchRequest::builder()
    .vector_field("chunks[code_emb]")
    .vectors(SearchVectors::Float(vec![vec![0.18, 0.23, 0.29, 0.36]]))
    .filter("element_filter(chunks, $[has_code] == true)")
    .limit(10)
    .build()?;

let response = client.hybrid_search(
    HybridSearchRequest::builder()
        .collection_name("tech_articles")
        .sub_requests(vec![index_chunk_req, code_chunk_req])
        .rerank(RRFRerank::new())
        .limit(5)
        .group_by_field("doc_id")
        .output_fields(["doc_id", "title", "chunks[text]", "chunks[section]"])
        .build()?,
).await?;

for result in response.results() {
    for row in result.rows()? {
        println!("doc_id: {:?}, distance: {:?}, offset: {:?}, entity: {:?}",
            row.get("doc_id")?, row.get("score")?, row.element_offset(), row.to_entity_row()?);
    }
}
```

```cpp
std::vector<float> query_vector = {0.19f, 0.24f, 0.30f, 0.37f};
std::vector<float> code_query_vector = {0.18f, 0.23f, 0.29f, 0.36f};

auto index_chunk_req = std::make_shared<milvus::SubSearchRequest>();
index_chunk_req->WithAnnsField("chunks[emb]")
                .AddFloatVector(query_vector)
                .WithFilter("element_filter(chunks, $[section] == \"index\")")
                .WithLimit(10);

auto code_chunk_req = std::make_shared<milvus::SubSearchRequest>();
code_chunk_req->WithAnnsField("chunks[code_emb]")
               .AddFloatVector(code_query_vector)
               .WithFilter("element_filter(chunks, $[has_code] == true)")
               .WithLimit(10);

milvus::HybridSearchRequest request;
request.WithCollectionName("tech_articles")
       .AddSubRequest(index_chunk_req)
       .AddSubRequest(code_chunk_req)
       .WithRerank(std::make_shared<milvus::RRFRerank>(60))
       .WithLimit(5)
       .WithGroupByField("doc_id")
       .AddOutputField("doc_id")
       .AddOutputField("title")
       .AddOutputField("chunks[text]")
       .AddOutputField("chunks[section]");

milvus::HybridSearchResponse response;
status = client->HybridSearch(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
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
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

float[] queryVector = [0.19f, 0.24f, 0.30f, 0.37f];
float[] codeQueryVector = [0.18f, 0.23f, 0.29f, 0.36f];

AnnSearchReq indexChunkReq = new()
{
    VectorFieldName = "chunks[emb]",
    Vectors = [queryVector],
    MetricType = MetricType.Cosine,
    Limit = 10,
    Expression = "element_filter(chunks, $[section] == \"index\")"
};

AnnSearchReq codeChunkReq = new()
{
    VectorFieldName = "chunks[code_emb]",
    Vectors = [codeQueryVector],
    MetricType = MetricType.Cosine,
    Limit = 10,
    Expression = "element_filter(chunks, $[has_code] == true)"
};

SearchResp results = await client.HybridSearchAsync(new HybridSearchReq
{
    CollectionName = "tech_articles",
    SearchRequests = [indexChunkReq, codeChunkReq],
    Reranker = new RrfReranker(),
    Limit = 5,
    Parameters = new SearchParameters
    {
        GroupByField = "doc_id",
        OutputFields = { "doc_id", "title", "chunks[text]", "chunks[section]" }
    }
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "search": [
        {
            "annsField": "chunks[emb]",
            "data": [[0.19, 0.24, 0.30, 0.37]],
            "limit": 10,
            "filter": "element_filter(chunks, $[section] == \"index\")"
        },
        {
            "annsField": "chunks[code_emb]",
            "data": [[0.18, 0.23, 0.29, 0.36]],
            "limit": 10,
            "filter": "element_filter(chunks, $[has_code] == true)"
        }
    ],
    "rerank": { "strategy": "rrf", "params": {} },
    "limit": 5,
    "groupingField": "doc_id",
    "outputFields": ["doc_id", "title", "chunks[text]", "chunks[section]"]
}'
```

The Go client source shipped with Milvus 3.0.2 does not expose final hybrid grouping through `NewHybridSearchOption`. Setting `WithGroupByField` on each sub-request does not configure final hybrid grouping. NodeJS 3.0.6 also omits the top-level `group_by_field` from hybrid rank parameters. Use one of the APIs shown above for this example.

In this example, both sub-requests target element-level vector fields under the same StructArray field, `chunks`. A hybrid search does not support element-level group-by if it mixes normal vector fields, different StructArray fields, or EmbeddingList-level requests.

## Interpret grouped results

| Result item | Meaning |
| --- | --- |
| Primary key (`doc_id` in these examples) | Primary key of the grouped parent entity. |
| `distance` or score | Score or distance of the selected Struct element for that parent entity. |
| `offset` | Zero-based position of the selected Struct element when returned. |
| Repeated primary keys | Not expected when grouping by the primary key. |
| `limit` | Applies to grouped parent-entity results. |

## Limitations

- Grouping search applies only to element-level StructArray vector search. EmbeddingList search and EmbeddingList-level hybrid search do not support group-by.

- Use the primary key as `group_by_field`. StructArray element-level grouping is not a general-purpose group-by over arbitrary scalar fields.

- Do not combine grouping search with range search.

- Do not use an `EmbeddingList` query or a `MAX_SIM*` metric for grouping search.

- Hybrid grouping is supported only when all sub-searches target element-level vector fields under the same StructArray field.

- Hybrid grouping is not supported when the hybrid search mixes a normal vector field, a different StructArray field, or an EmbeddingList-level request.

## Common mistakes

- Using grouping with `chunks[emb_list_vector]`, which is intended for EmbeddingList search.

- Grouping by a non-primary-key scalar field.

- Grouping by multiple fields. Element-level StructArray grouping supports only primary-key grouping.

- Expecting grouped results to represent every matched Struct element. Grouping returns at most one result per parent entity.

- Assuming grouped element-level search recomputes an EmbeddingList-style `MAX_SIM*` score. Grouping collapses element-level hits; it does not change the scoring model.

- Combining `group_by_field` with `radius` or `range_filter`.

## Next steps

1. To learn ungrouped element-level search first, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

2. To add scalar filters to grouped search, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

3. To use score or distance boundaries instead of grouping, read [Range Search with StructArray](range-search-with-structarray.md).

4. To check StructArray search limits, read [StructArray Limits](structarray-limits.md).
