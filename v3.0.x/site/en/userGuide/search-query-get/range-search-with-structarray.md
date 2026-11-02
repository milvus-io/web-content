---
id: range-search-with-structarray.md
title: "Range Search with StructArray"
summary: "Use this page to run range search on StructArray vector subfields. Range search returns vector hits whose score or distance falls within a specified boundary. For StructArray fields, use range search with element-level vector search, where each Struct element is searched independently."
---
# Range Search with StructArray

Use this page to run range search on StructArray vector subfields. Range search returns vector hits whose score or distance falls within a specified boundary. For StructArray fields, use range search with element-level vector search, where each Struct element is searched independently.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a StructArray field named `chunks`. The `chunks[emb]` vector subfield is indexed for element-level search with a regular vector metric such as `COSINE`, `IP`, or `L2`.

Before running these examples, create the collection, insert the example data, create the required vector indexes, and load the collection. Use 4-dimensional vectors for the fields shown here. Each code block assumes the connection and variables from the preceding examples in the same language unless it defines them again.

## How range search applies to StructArray

| Search mode | Range search behavior | Result granularity |
| --- | --- | --- |
| EmbeddingList search | Not supported. | Not applicable. |
| Element-level search | Use a regular vector query with `radius` and, optionally, `range_filter`. | Struct element level. |
| Hybrid search | Supported when the StructArray request targets an element-level vector field. EmbeddingList-level requests do not support range search. | Element-level sub-search, then hybrid reranking. |

<div class="alert note">

If you only need the nearest Struct elements, start with [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md). Use range search when the result must satisfy a score or distance boundary instead of only a top-K ranking.

</div>

## Before you begin

Prepare the collection, data, and indexes before running range search.

| Requirement | Details |
| --- | --- |
| StructArray field | The collection contains a StructArray field such as `chunks`. |
| Element-level vector subfield | The target vector subfield is `chunks[emb]`, not `chunks[emb_list_vector]`. |
| Index metric | The vector subfield is indexed with a regular vector metric, such as `COSINE`, `IP`, or `L2`. |
| Query data | The query is a regular vector, not an `EmbeddingList`. |

For index setup, see [Index StructArray Fields](index-structarray-fields.md).

## Use radius and range_filter

Set `radius` to define the search boundary. Set `range_filter` when you need an inner boundary as well. The direction depends on whether a smaller distance is better or a larger similarity score is better.

| Metric type | Higher score is better? | Range condition when `range_filter` is used |
| --- | --- | --- |
| `L2` | No. Smaller distance is better. | `range_filter <= distance < radius` |
| `IP`, `COSINE` | Yes. Larger score is better. | `radius < distance <= range_filter` |

When only `radius` is set, the range search returns hits that satisfy the outer boundary for the metric. Choose values according to the score or distance scale of your embeddings.

## Run element-level range search

The examples use a `COSINE` index on `chunks[emb]` and 4-dimensional query vectors. The following example searches individual chunks whose `chunks[emb]` vectors are similar enough to the query vector. Each result hit represents a matched Struct element.

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
    search_params={
        "params": {
            "radius": 0.80,
            "range_filter": 0.95,
        },
    },
    limit=10,
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

FloatVec queryVector = new FloatVec(new float[]{0.19f, 0.24f, 0.30f, 0.37f});
Map<String, Object> extraParams = new HashMap<>();
extraParams.put("radius", 0.80);
extraParams.put("range_filter", 0.95);

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .data(Collections.singletonList(queryVector))
        .annsField("chunks[emb]")
        .searchParams(extraParams)
        .limit(10)
        .outputFields(Arrays.asList("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]"))
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err)
    return
}

queryVector := entity.FloatVector{0.19, 0.24, 0.30, 0.37}

annParam := index.NewCustomAnnParam()
annParam.WithRadius(0.80)
annParam.WithRangeFilter(0.95)

results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "tech_articles",
    10,
    []entity.Vector{queryVector},
).WithANNSField("chunks[emb]").
    WithAnnParam(annParam).
    WithOutputFields("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err)
    return
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query_vector = vec![0.19, 0.24, 0.30, 0.37];

let response = client
    .search(
        SearchRequest::builder()
            .collection_name("tech_articles")
            .vector_field("chunks[emb]")
            .vectors(SearchVectors::Float(vec![query_vector]))
            .radius(0.80)
            .range_filter(0.95)
            .limit(10)
            .output_fields(["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]"])
            .build()?,
    )
    .await?;

for result in response.results() {
    for row in result.rows()? {
        println!("{:?}", row.to_entity_row()?);
    }
}
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

auto request = milvus::SearchRequest()
                   .WithCollectionName("tech_articles")
                   .WithLimit(10)
                   .WithAnnsField("chunks[emb]")
                   .WithFloatVectors({{0.19, 0.24, 0.30, 0.37}})
                   .WithRadius(0.80)
                   .WithRangeFilter(0.95)
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
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
  token: "root:Milvus",
});

const queryVector = [0.19, 0.24, 0.30, 0.37];

const results = await client.search({
  collection_name: "tech_articles",
  data: queryVector,
  anns_field: "chunks[emb]",
  params: {
    radius: 0.80,
    range_filter: 0.95,
  },
  limit: 10,
  output_fields: [
    "doc_id",
    "title",
    "chunks[text]",
    "chunks[section]",
    "chunks[page]",
    "chunks[quality_score]",
  ],
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

SearchResp results = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "chunks[emb]",
    Vectors = [queryVector],
    Limit = 10,
    Parameters = new SearchParameters
    {
        Radius = "0.80",
        RangeFilter = "0.95",
        OutputFields = { "doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]" }
    }
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/entities/search" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "data": [
      [0.19, 0.24, 0.30, 0.37]
    ],
    "annsField": "chunks[emb]",
    "limit": 10,
    "outputFields": [
      "doc_id",
      "title",
      "chunks[text]",
      "chunks[section]",
      "chunks[page]",
      "chunks[quality_score]"
    ],
    "searchParams": {
      "params": {
        "radius": 0.80,
        "range_filter": 0.95
      }
    }
  }'
```

In this example, `COSINE` is a similarity-style metric, so the result range is greater than `radius` and less than or equal to `range_filter`. The `offset` value identifies the matched Struct element in the `chunks` array when returned.

## Add scalar filters

You can combine element-level range search with StructArray scalar filtering. Use a top-level predicate for parent-entity fields, and use `element_filter` to constrain which Struct elements participate in the vector range search.

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
    search_params={
        "params": {
            "radius": 0.80,
            "range_filter": 0.95,
        },
    },
    filter=filter_expr,
    limit=10,
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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

FloatVec queryVector = new FloatVec(new float[]{0.19f, 0.24f, 0.30f, 0.37f});
Map<String, Object> extraParams = new HashMap<>();
extraParams.put("radius", 0.80);
extraParams.put("range_filter", 0.95);

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .data(Collections.singletonList(queryVector))
        .annsField("chunks[emb]")
        .searchParams(extraParams)
        .filter("category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)")
        .limit(10)
        .outputFields(Arrays.asList("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err)
    return
}

queryVector := entity.FloatVector{0.19, 0.24, 0.30, 0.37}

annParam := index.NewCustomAnnParam()
annParam.WithRadius(0.80)
annParam.WithRangeFilter(0.95)

filterExpr := "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)"

results, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "tech_articles",
    10,
    []entity.Vector{queryVector},
).WithANNSField("chunks[emb]").
    WithAnnParam(annParam).
    WithFilter(filterExpr).
    WithOutputFields("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err)
    return
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query_vector = vec![0.19, 0.24, 0.30, 0.37];

let filter_expr = "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)";

let response = client
    .search(
        SearchRequest::builder()
            .collection_name("tech_articles")
            .vector_field("chunks[emb]")
            .vectors(SearchVectors::Float(vec![query_vector]))
            .radius(0.80)
            .range_filter(0.95)
            .filter(filter_expr)
            .limit(10)
            .output_fields(["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"])
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

auto request = milvus::SearchRequest()
                   .WithCollectionName("tech_articles")
                   .WithLimit(10)
                   .WithAnnsField("chunks[emb]")
                   .WithFloatVectors({{0.19, 0.24, 0.30, 0.37}})
                   .WithRadius(0.80)
                   .WithRangeFilter(0.95)
                   .WithFilter("category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)")
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
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
  token: "root:Milvus",
});

const queryVector = [0.19, 0.24, 0.30, 0.37];

const filterExpr = 'category == "search" && element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)';

const results = await client.search({
  collection_name: "tech_articles",
  data: queryVector,
  anns_field: "chunks[emb]",
  params: {
    radius: 0.80,
    range_filter: 0.95,
  },
  filter: filterExpr,
  limit: 10,
  output_fields: [
    "doc_id",
    "title",
    "category",
    "chunks[text]",
    "chunks[section]",
    "chunks[quality_score]",
  ],
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
    Limit = 10,
    Parameters = new SearchParameters
    {
        Radius = "0.80",
        RangeFilter = "0.95",
        Expression = filterExpr,
        OutputFields = { "doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]" }
    }
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/entities/search" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "data": [
      [0.19, 0.24, 0.30, 0.37]
    ],
    "annsField": "chunks[emb]",
    "filter": "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)",
    "limit": 10,
    "outputFields": [
      "doc_id",
      "title",
      "category",
      "chunks[text]",
      "chunks[section]",
      "chunks[quality_score]"
    ],
    "searchParams": {
      "params": {
        "radius": 0.80,
        "range_filter": 0.95
      }
    }
  }'
```

The top-level predicate selects candidate entities. The `element_filter` predicate restricts vector range search to matching Struct elements. For more filtering examples, see [Filtered Search with StructArray](filtered-search-with-structarray.md).

## Use range search in hybrid search

StructArray element-level vector fields support range search in hybrid search. Add `radius` and, optionally, `range_filter` to the `AnnSearchRequest` that targets the StructArray element-level vector field.

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
from pymilvus import MilvusClient, AnnSearchRequest, RRFRanker

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

query_vector = [0.19, 0.24, 0.30, 0.37]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="title_vector",
    param={},
    limit=10,
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="chunks[emb]",
    param={
        "params": {
            "radius": 0.80,
            "range_filter": 0.95,
        },
    },
    limit=10,
    expr='element_filter(chunks, $[section] == "index")',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[quality_score]",
    ],
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.ranker.RRFRanker;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

FloatVec queryVector = new FloatVec(new float[]{0.19f, 0.24f, 0.30f, 0.37f});

AnnSearchReq titleReq = AnnSearchReq.builder()
        .vectorFieldName("title_vector")
        .vectors(Collections.singletonList(queryVector))
        .limit(10)
        .build();

AnnSearchReq chunkReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[emb]")
        .vectors(Collections.singletonList(queryVector))
        .params("{\"radius\": 0.80, \"range_filter\": 0.95}")
        .limit(10)
        .filter("element_filter(chunks, $[section] == \"index\")")
        .build();

SearchResp resp = client.hybridSearch(HybridSearchReq.builder()
        .collectionName("tech_articles")
        .searchRequests(Arrays.asList(titleReq, chunkReq))
        .ranker(RRFRanker.builder().k(60).build())
        .limit(5)
        .outFields(Arrays.asList("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err)
    return
}

queryVector := entity.FloatVector{0.19, 0.24, 0.30, 0.37}

titleReq := milvusclient.NewAnnRequest("title_vector", 10, queryVector)

annParam := index.NewCustomAnnParam()
annParam.WithRadius(0.80)
annParam.WithRangeFilter(0.95)

chunkReq := milvusclient.NewAnnRequest("chunks[emb]", 10, queryVector)
chunkReq.WithAnnParam(annParam)
chunkReq.WithFilter("element_filter(chunks, $[section] == \"index\")")

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption(
    "tech_articles",
    5,
    titleReq,
    chunkReq,
).WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err)
    return
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query_vector = vec![0.19, 0.24, 0.30, 0.37];

let title_req = SubSearchRequest::builder()
    .vector_field("title_vector")
    .vectors(SearchVectors::Float(vec![query_vector.clone()]))
    .limit(10)
    .build()?;

let chunk_req = SubSearchRequest::builder()
    .vector_field("chunks[emb]")
    .vectors(SearchVectors::Float(vec![query_vector]))
    .radius(0.80)
    .range_filter(0.95)
    .filter("element_filter(chunks, $[section] == \"index\")")
    .limit(10)
    .build()?;

let response = client
    .hybrid_search(
        HybridSearchRequest::builder()
            .collection_name("tech_articles")
            .sub_requests(vec![title_req, chunk_req])
            .rerank(RRFRerank::new().k(60))
            .limit(5)
            .output_fields(vec!["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"])
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include <memory>
#include <vector>
#include "milvus/MilvusClientV2.h"
#include "milvus/request/dql/HybridSearchRequest.h"
#include "milvus/types/SubSearchRequest.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

std::vector<float> query_vector = {0.19f, 0.24f, 0.30f, 0.37f};

auto title_req = std::make_shared<milvus::SubSearchRequest>();
title_req->WithAnnsField("title_vector").WithLimit(10);
title_req->AddFloatVector(query_vector);

auto chunk_req = std::make_shared<milvus::SubSearchRequest>();
chunk_req->WithAnnsField("chunks[emb]").WithLimit(10);
chunk_req->SetRadius(0.80);
chunk_req->SetRangeFilter(0.95);
chunk_req->WithFilter("element_filter(chunks, $[section] == \"index\")");
chunk_req->AddFloatVector(query_vector);

milvus::HybridSearchRequest request;
request.WithCollectionName("tech_articles")
       .WithLimit(5)
       .AddSubRequest(title_req)
       .AddSubRequest(chunk_req)
       .WithRerank(std::make_shared<milvus::RRFRerank>(60));
request.WithOutputFields({"doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"});

milvus::HybridSearchResponse response;
status = client->HybridSearch(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
  token: "root:Milvus",
});

const queryVector = [0.19, 0.24, 0.30, 0.37];

const results = await client.search({
  collection_name: "tech_articles",
  data: [
    {
      anns_field: "title_vector",
      data: [queryVector],
      limit: 10,
    },
    {
      anns_field: "chunks[emb]",
      data: queryVector,
      params: { radius: 0.80, range_filter: 0.95 },
      filter: 'element_filter(chunks, $[section] == "index")',
      limit: 10,
    },
  ],
  rerank: { strategy: "rrf", params: { k: 60 } },
  limit: 5,
  output_fields: [
    "doc_id",
    "title",
    "chunks[text]",
    "chunks[section]",
    "chunks[quality_score]",
  ],
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

float[] queryVector = [0.19f, 0.24f, 0.30f, 0.37f];

AnnSearchReq titleReq = new()
{
    VectorFieldName = "title_vector",
    Vectors = [queryVector],
    Limit = 10
};

AnnSearchReq chunkReq = new()
{
    VectorFieldName = "chunks[emb]",
    Vectors = [queryVector],
    Radius = "0.80",
    RangeFilter = "0.95",
    Expression = "element_filter(chunks, $[section] == \"index\")",
    Limit = 10
};

SearchResp results = await client.HybridSearchAsync(new HybridSearchReq
{
    CollectionName = "tech_articles",
    SearchRequests = [titleReq, chunkReq],
    Reranker = new RrfReranker(),
    Limit = 5,
    Parameters = new SearchParameters
    {
        OutputFields = { "doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]" }
    }
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/entities/hybrid_search" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "search": [
      {
        "data": [[0.19, 0.24, 0.30, 0.37]],
        "annsField": "title_vector",
        "limit": 10
      },
      {
        "data": [[0.19, 0.24, 0.30, 0.37]],
        "annsField": "chunks[emb]",
        "limit": 10,
        "params": {
          "radius": 0.80,
          "range_filter": 0.95
        },
        "filter": "element_filter(chunks, $[section] == \"index\")"
      }
    ],
    "rerank": { "strategy": "rrf", "params": { "k": 60 } },
    "limit": 5,
    "outputFields": [
      "doc_id",
      "title",
      "chunks[text]",
      "chunks[section]",
      "chunks[quality_score]"
    ]
  }'
```

In this example, only the `chunks[emb]` sub-request uses range-search parameters. The StructArray request still follows element-level semantics: the range boundary applies to Struct element hits before the hybrid search combines and reranks results.

## Interpret range results

The following table describes standalone element-level range search. In the mixed hybrid example above, element hits are collapsed to parent entities before reranking, so the final results are entity-level and do not retain an element offset.

| Result item | Meaning |
| --- | --- |
| Primary key (`doc_id` in these examples) | Primary key of the entity that contains the matched Struct element. |
| `distance` or score | The score or distance between the query vector and the matched Struct element vector. |
| `offset` | Zero-based position of the matched Struct element in the StructArray field when returned. |
| Repeated primary keys | Possible. More than one Struct element in the same entity can fall within the specified range. |
| `limit` | Applies to element hits, not unique parent entities. |

## Limitations

- Do not use an `EmbeddingList` query or a `MAX_SIM*` metric for range search on StructArray vector subfields. EmbeddingList-level search does not support range search.

- Do not combine range search with grouping search. If you need one result per parent entity, run an element-level search without range parameters and use grouping where supported.

- Hybrid range search is supported for StructArray element-level vector fields. It is not supported for EmbeddingList-level StructArray requests.

## Common mistakes

- Running range search against `chunks[emb_list_vector]`, which is intended for EmbeddingList search.

- Using `MAX_SIM_COSINE` instead of a regular metric such as `COSINE` for element-level range search.

- Using an `EmbeddingList` query instead of a regular vector query.

- Expecting range search results to be unique by parent entity. Range search returns matching Struct element hits.

- Using `chunks.emb` instead of the required subfield path syntax `chunks[emb]`.

## Next steps

1. To learn the two basic StructArray vector search modes, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

2. To add scalar filters to range search, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

3. To return at most one result per parent entity where supported, read [Grouping Search with StructArray](grouping-search-with-structarray.md).

4. To check version-specific search limits, read [StructArray Limits](structarray-limits.md).
