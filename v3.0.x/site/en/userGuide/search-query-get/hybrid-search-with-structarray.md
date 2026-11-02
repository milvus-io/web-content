---
id: hybrid-search-with-structarray.md
title: "Hybrid Search with StructArray"
summary: "Use this page to combine StructArray vector search with other vector searches in one hybrid search request. StructArray hybrid search can produce either entity-level results or element-level results, depending on the AnnSearchRequest objects you combine."
---
# Hybrid Search with StructArray

Use this page to combine StructArray vector search with other vector searches in one hybrid search request. StructArray hybrid search can produce either entity-level results or element-level results, depending on the `AnnSearchRequest` objects you combine.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a top-level vector field named `title_vector` and a StructArray field named `chunks`. The `chunks[emb_list_vector]` subfield is indexed for EmbeddingList search, and `chunks[emb]` is indexed for element-level search.

Before running these examples, create the collection, insert the example data, create the required vector indexes, and load the collection. Use 4-dimensional vectors for the fields shown here. Each code block assumes the connection and variables from the preceding examples in the same language unless it defines them again.

## How hybrid search applies to StructArray

| `AnnSearchRequest` combination | Final candidate scope | Result behavior | `element_scope` |
| --- | --- | --- | --- |
| Collection-level vector field + StructArray EmbeddingList subfield | Entity level | Final candidates are keyed by primary key. | Do not use. |
| Collection-level vector field + StructArray element-level subfield | Entity level | Element-level hits are collapsed to entity-level candidates before hybrid reranking. | Optional collapse config on the StructArray element-level `AnnSearchRequest`. |
| Multiple element-level subfields under the same StructArray field | Element level | Final candidates are keyed by primary key plus Struct element offset. | Do not use. |
| Element-level subfields under different StructArray fields | Entity level | Element offsets do not share identity, so each StructArray element-level `AnnSearchRequest` is collapsed before reranking. | Optional collapse config on each StructArray element-level `AnnSearchRequest`. |

<div class="alert note">

Warning

Use `element_scope` only to configure collapse for StructArray element-level `AnnSearchRequest` objects in a non-same-struct element-level hybrid search. Do not use it for EmbeddingList requests, collection-level vector requests, or same-StructArray element-level hybrid search.

</div>

## Before you begin

Prepare the collection, data, and indexes before running hybrid search.

| Requirement | Details |
| --- | --- |
| StructArray field | The collection contains a StructArray field such as `chunks`. |
| Vector subfields | Use separate vector subfields for EmbeddingList search and element-level search. |
| Indexes | `chunks[emb_list_vector]` uses a `MAX_SIM*` metric. `chunks[emb]` uses a regular vector metric such as `COSINE`, `IP`, or `L2`. |
| Reranker | Choose a hybrid reranker such as `RRFRanker` or another reranker supported by your application. |

For index setup, see [Index StructArray Fields](index-structarray-fields.md).

## Run hybrid search with an EmbeddingList request

EmbeddingList search on a StructArray vector subfield is entity-level in hybrid search. It behaves like an entity-level vector search request and does not return one matched Struct element offset.

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
from pymilvus import AnnSearchRequest, MilvusClient, RRFRanker
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

query_vector = [0.19, 0.24, 0.30, 0.37]

query_list = EmbeddingList()
query_list.add([0.12, 0.21, 0.32, 0.44])
query_list.add([0.18, 0.23, 0.29, 0.36])

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="title_vector",
    param={},
    limit=10,
)

chunk_list_req = AnnSearchRequest(
    data=[query_list],
    anns_field="chunks[emb_list_vector]",
    param={},
    limit=10,
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[title_req, chunk_list_req],
    ranker=RRFRanker(),
    limit=5,
    output_fields=[
        "doc_id",
        "title",
        "category",
        "chunks[text]",
        "chunks[section]",
    ],
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.ranker.RRFRanker;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

FloatVec queryVector = new FloatVec(Arrays.asList(0.19f, 0.24f, 0.30f, 0.37f));

EmbeddingList queryList = new EmbeddingList();
queryList.add(new FloatVec(Arrays.asList(0.12f, 0.21f, 0.32f, 0.44f)));
queryList.add(new FloatVec(Arrays.asList(0.18f, 0.23f, 0.29f, 0.36f)));

AnnSearchReq titleReq = AnnSearchReq.builder()
        .vectorFieldName("title_vector")
        .vectors(Collections.singletonList(queryVector))
        .limit(10)
        .build();

AnnSearchReq chunkListReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[emb_list_vector]")
        .vectors(Collections.singletonList(queryList))
        .limit(10)
        .build();

SearchResp results = client.hybridSearch(HybridSearchReq.builder()
        .collectionName("tech_articles")
        .searchRequests(Arrays.asList(titleReq, chunkListReq))
        .ranker(RRFRanker.builder().k(60).build())
        .limit(5)
        .outFields(Arrays.asList("doc_id", "title", "category", "chunks[text]", "chunks[section]"))
        .build());
```

```go
import (
    "context"
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    log.Fatal(err)
}

queryVector := entity.FloatVector{0.19, 0.24, 0.30, 0.37}

queryList := entity.FloatVectorArray{
    entity.FloatVector{0.12, 0.21, 0.32, 0.44},
    entity.FloatVector{0.18, 0.23, 0.29, 0.36},
}

titleReq := milvusclient.NewAnnRequest("title_vector", 10, queryVector)
chunkListReq := milvusclient.NewAnnRequest("chunks[emb_list_vector]", 10, queryList)

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption("tech_articles", 5,
    titleReq, chunkListReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields("doc_id", "title", "category", "chunks[text]", "chunks[section]"))
if err != nil {
    fmt.Println(err.Error())
    return
}

fmt.Printf("hybrid search returned %d result sets\n", len(results))
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query_vector = vec![0.19f32, 0.24, 0.30, 0.37];

let query_list = EmbeddingList::new()
    .add_vector(vec![0.12f32, 0.21, 0.32, 0.44])
    .add_vector(vec![0.18f32, 0.23, 0.29, 0.36]);

let title_req = SubSearchRequest::builder()
    .vector_field("title_vector")
    .vectors(SearchVectors::Float(vec![query_vector.clone()]))
    .limit(10)
    .build()?;

let chunk_list_req = SubSearchRequest::builder()
    .vector_field("chunks[emb_list_vector]")
    .vectors(SearchVectors::EmbeddingLists(vec![query_list]))
    .limit(10)
    .build()?;

let request = HybridSearchRequest::builder()
    .collection_name("tech_articles")
    .sub_requests(vec![title_req, chunk_list_req])
    .rerank(RRFRerank::new().k(60))
    .limit(5)
    .output_fields(vec!["doc_id", "title", "category", "chunks[text]", "chunks[section]"])
    .build()?;

let results = client.hybrid_search(request).await?;
```

```cpp
#include <iostream>
#include <memory>
#include <vector>

#include "milvus/MilvusClientV2.h"
#include "milvus/request/dql/HybridSearchRequest.h"
#include "milvus/types/SubSearchRequest.h"
#include "milvus/types/EmbeddingList.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

std::vector<float> query_vector = {0.19f, 0.24f, 0.30f, 0.37f};

milvus::EmbeddingList query_list;
query_list.AddFloatVector({0.12f, 0.21f, 0.32f, 0.44f});
query_list.AddFloatVector({0.18f, 0.23f, 0.29f, 0.36f});

auto title_req = std::make_shared<milvus::SubSearchRequest>();
title_req->WithAnnsField("title_vector").WithLimit(10);
title_req->AddFloatVector(query_vector);

auto chunk_list_req = std::make_shared<milvus::SubSearchRequest>();
chunk_list_req->WithAnnsField("chunks[emb_list_vector]").WithLimit(10);
chunk_list_req->AddEmbeddingList(std::move(query_list));

milvus::HybridSearchRequest request;
request.WithCollectionName("tech_articles")
       .WithLimit(5)
       .AddSubRequest(title_req)
       .AddSubRequest(chunk_list_req)
       .WithRerank(std::make_shared<milvus::RRFRerank>(60));
request.WithOutputFields({"doc_id", "title", "category", "chunks[text]", "chunks[section]"});

milvus::HybridSearchResponse response;
status = client->HybridSearch(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

const query_vector = [0.19, 0.24, 0.30, 0.37];

const query_list = [
  [0.12, 0.21, 0.32, 0.44],
  [0.18, 0.23, 0.29, 0.36],
];

const results = await client.search({
  collection_name: "tech_articles",
  data: [
    { anns_field: "title_vector", data: [query_vector], limit: 10 },
    { anns_field: "chunks[emb_list_vector]", data: query_list, limit: 10 },
  ],
  rerank: { strategy: "rrf", params: { k: 60 } },
  limit: 5,
  output_fields: ["doc_id", "title", "category", "chunks[text]", "chunks[section]"],
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var queryVector = new ReadOnlyMemory<float>(new[] { 0.19f, 0.24f, 0.30f, 0.37f });

var queryList = new EmbeddingList();
queryList.Add(new ReadOnlyMemory<float>(new[] { 0.12f, 0.21f, 0.32f, 0.44f }));
queryList.Add(new ReadOnlyMemory<float>(new[] { 0.18f, 0.23f, 0.29f, 0.36f }));

var titleReq = new AnnSearchReq
{
    VectorFieldName = "title_vector",
    Vectors = new[] { queryVector },
    Limit = 10
};

var chunkListReq = new AnnSearchReq
{
    VectorFieldName = "chunks[emb_list_vector]",
    EmbeddingLists = new[] { queryList },
    Limit = 10
};

var results = await client.HybridSearchAsync(new HybridSearchReq
{
    CollectionName = "tech_articles",
    SearchRequests = new[] { titleReq, chunkListReq },
    Reranker = new RrfReranker(60),
    Limit = 5,
    Parameters = new SearchParameters
    {
        OutputFields = { "doc_id", "title", "category", "chunks[text]", "chunks[section]" }
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "search": [
        {
            "data": [[0.19, 0.24, 0.30, 0.37]],
            "annsField": "title_vector",
            "limit": 10
        },
        {
            "data": [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
            "annsField": "chunks[emb_list_vector]",
            "limit": 10
        }
    ],
    "rerank": { "strategy": "rrf", "params": { "k": 60 } },
    "limit": 5,
    "outputFields": ["doc_id", "title", "category", "chunks[text]", "chunks[section]"]
}'
```

In this example, both `AnnSearchRequest` objects produce entity-level candidates. The final result is keyed by the parent entity primary key. Do not add `element_scope` to the EmbeddingList request.

## Run same-StructArray element-level hybrid search

When all `AnnSearchRequest` objects target element-level vector subfields under the same StructArray field, hybrid search can keep element-level candidates through reranking. This is the only StructArray hybrid mode where final results remain element-level.

The following example assumes the `chunks` StructArray field has two element-level vector subfields, `chunks[emb]` and `chunks[code_emb]`, and both use `COSINE`. Define and populate the additional 4-dimensional `code_emb` subfield when creating the collection; it is not included in the base schema linked above.

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
code_query_vector = [0.20, 0.25, 0.31, 0.38]

index_chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="chunks[emb]",
    limit=10,
    param={},
    expr='element_filter(chunks, $[section] == "index")',
)

code_chunk_req = AnnSearchRequest(
    data=[code_query_vector],
    anns_field="chunks[code_emb]",
    limit=10,
    param={},
    expr='element_filter(chunks, $[has_code] == true)',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[index_chunk_req, code_chunk_req],
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

FloatVec queryVector = new FloatVec(Arrays.asList(0.19f, 0.24f, 0.30f, 0.37f));
FloatVec codeQueryVector = new FloatVec(Arrays.asList(0.20f, 0.25f, 0.31f, 0.38f));

AnnSearchReq indexChunkReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[emb]")
        .vectors(Collections.singletonList(queryVector))
        .limit(10)
        .filter("element_filter(chunks, $[section] == \"index\")")
        .build();

AnnSearchReq codeChunkReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[code_emb]")
        .vectors(Collections.singletonList(codeQueryVector))
        .limit(10)
        .filter("element_filter(chunks, $[has_code] == true)")
        .build();

SearchResp results = client.hybridSearch(HybridSearchReq.builder()
        .collectionName("tech_articles")
        .searchRequests(Arrays.asList(indexChunkReq, codeChunkReq))
        .ranker(RRFRanker.builder().k(60).build())
        .limit(5)
        .outFields(Arrays.asList("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
        .build());

for (List<SearchResp.SearchResult> hits : results.getSearchResults()) {
    for (SearchResp.SearchResult hit : hits) {
        System.out.println("doc_id: " + hit.getId() + ", distance: " + hit.getScore()
                + ", offset: " + hit.getElementOffset() + ", entity: " + hit.getEntity());
    }
}
```

```go
import (
    "context"
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    log.Fatal(err)
}

queryVector := entity.FloatVector{0.19, 0.24, 0.30, 0.37}
codeQueryVector := entity.FloatVector{0.20, 0.25, 0.31, 0.38}

indexChunkReq := milvusclient.NewAnnRequest("chunks[emb]", 10, queryVector).
    WithFilter("element_filter(chunks, $[section] == \"index\")")
codeChunkReq := milvusclient.NewAnnRequest("chunks[code_emb]", 10, codeQueryVector).
    WithFilter("element_filter(chunks, $[has_code] == true)")

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption("tech_articles", 5,
    indexChunkReq, codeChunkReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err.Error())
    return
}

fmt.Printf("hybrid search returned %d result sets\n", len(results))
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query_vector = vec![0.19f32, 0.24, 0.30, 0.37];
let code_query_vector = vec![0.20f32, 0.25, 0.31, 0.38];

let index_chunk_req = SubSearchRequest::builder()
    .vector_field("chunks[emb]")
    .vectors(SearchVectors::Float(vec![query_vector]))
    .limit(10)
    .filter("element_filter(chunks, $[section] == \"index\")")
    .build()?;

let code_chunk_req = SubSearchRequest::builder()
    .vector_field("chunks[code_emb]")
    .vectors(SearchVectors::Float(vec![code_query_vector]))
    .limit(10)
    .filter("element_filter(chunks, $[has_code] == true)")
    .build()?;

let request = HybridSearchRequest::builder()
    .collection_name("tech_articles")
    .sub_requests(vec![index_chunk_req, code_chunk_req])
    .rerank(RRFRerank::new().k(60))
    .limit(5)
    .output_fields(vec!["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"])
    .build()?;

let results = client.hybrid_search(request).await?;
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
std::vector<float> code_query_vector = {0.20f, 0.25f, 0.31f, 0.38f};

auto index_chunk_req = std::make_shared<milvus::SubSearchRequest>();
index_chunk_req->WithAnnsField("chunks[emb]").WithLimit(10);
index_chunk_req->WithFilter("element_filter(chunks, $[section] == \"index\")");
index_chunk_req->AddFloatVector(query_vector);

auto code_chunk_req = std::make_shared<milvus::SubSearchRequest>();
code_chunk_req->WithAnnsField("chunks[code_emb]").WithLimit(10);
code_chunk_req->WithFilter("element_filter(chunks, $[has_code] == true)");
code_chunk_req->AddFloatVector(code_query_vector);

milvus::HybridSearchRequest request;
request.WithCollectionName("tech_articles")
       .WithLimit(5)
       .AddSubRequest(index_chunk_req)
       .AddSubRequest(code_chunk_req)
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
const query_vector = [0.19, 0.24, 0.30, 0.37];
const code_query_vector = [0.20, 0.25, 0.31, 0.38];

const results = await client.search({
  collection_name: "tech_articles",
  data: [
    { anns_field: "chunks[emb]", data: query_vector, limit: 10, expr: "element_filter(chunks, $[section] == \"index\")" },
    { anns_field: "chunks[code_emb]", data: code_query_vector, limit: 10, expr: "element_filter(chunks, $[has_code] == true)" },
  ],
  rerank: { strategy: "rrf", params: { k: 60 } },
  limit: 5,
  output_fields: ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"],
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

var queryVector = new ReadOnlyMemory<float>(new[] { 0.19f, 0.24f, 0.30f, 0.37f });
var codeQueryVector = new ReadOnlyMemory<float>(new[] { 0.20f, 0.25f, 0.31f, 0.38f });

var indexChunkReq = new AnnSearchReq
{
    VectorFieldName = "chunks[emb]",
    Vectors = new[] { queryVector },
    Limit = 10,
    Expression = "element_filter(chunks, $[section] == \"index\")"
};

var codeChunkReq = new AnnSearchReq
{
    VectorFieldName = "chunks[code_emb]",
    Vectors = new[] { codeQueryVector },
    Limit = 10,
    Expression = "element_filter(chunks, $[has_code] == true)"
};

var results = await client.HybridSearchAsync(new HybridSearchReq
{
    CollectionName = "tech_articles",
    SearchRequests = new[] { indexChunkReq, codeChunkReq },
    Reranker = new RrfReranker(60),
    Limit = 5,
    Parameters = new SearchParameters
    {
        OutputFields = { "doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]" }
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "search": [
        {
            "data": [[0.19, 0.24, 0.30, 0.37]],
            "annsField": "chunks[emb]",
            "limit": 10,
            "filter": "element_filter(chunks, $[section] == \"index\")"
        },
        {
            "data": [[0.20, 0.25, 0.31, 0.38]],
            "annsField": "chunks[code_emb]",
            "limit": 10,
            "filter": "element_filter(chunks, $[has_code] == true)"
        }
    ],
    "rerank": { "strategy": "rrf", "params": { "k": 60 } },
    "limit": 5,
    "outputFields": ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"]
}'
```

Both `AnnSearchRequest` objects search vector subfields under `chunks`. The same zero-based offset refers to the same Struct element, so the hybrid reranker can rank element candidates directly. Do not set `element_scope` in this mode because no entity-level collapse is performed.

## Collapse element-level hits for entity-level hybrid search

If a hybrid search mixes a StructArray element-level `AnnSearchRequest` with a collection-level vector request, an EmbeddingList request, or an element-level request under a different StructArray field, the final candidate scope is entity-level. In this case, each StructArray element-level `AnnSearchRequest` is collapsed to entity-level candidates before hybrid reranking.

Use `element_scope` inside the `params` of the StructArray element-level `AnnSearchRequest` when you need to control how multiple matched elements from the same entity are collapsed.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
</div>

```python
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
            "element_scope": {
                "collapse": {
                    "strategy": "topk_sum",
                    "topk": 3,
                },
            },
        },
    },
    limit=30,
    expr='element_filter(chunks, $[quality_score] > 0.8)',
)

results = client.hybrid_search(
    collection_name="tech_articles",
    reqs=[title_req, chunk_req],
    ranker=RRFRanker(),
    limit=5,
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
import io.milvus.v2.service.vector.request.AnnSearchReq;
import io.milvus.v2.service.vector.request.HybridSearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.request.ranker.RRFRanker;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

FloatVec queryVector = new FloatVec(Arrays.asList(0.19f, 0.24f, 0.30f, 0.37f));

AnnSearchReq titleReq = AnnSearchReq.builder()
        .vectorFieldName("title_vector")
        .vectors(Collections.singletonList(queryVector))
        .limit(10)
        .build();

AnnSearchReq chunkReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[emb]")
        .vectors(Collections.singletonList(queryVector))
        .limit(30)
        .filter("element_filter(chunks, $[quality_score] > 0.8)")
        .params("{\"element_scope\": {\"collapse\": {\"strategy\": \"topk_sum\", \"topk\": 3}}}")
        .build();

SearchResp results = client.hybridSearch(HybridSearchReq.builder()
        .collectionName("tech_articles")
        .searchRequests(Arrays.asList(titleReq, chunkReq))
        .ranker(RRFRanker.builder().k(60).build())
        .limit(5)
        .outFields(Arrays.asList("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
        .build());
```

```go
import (
    "context"
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    log.Fatal(err)
}

queryVector := entity.FloatVector{0.19, 0.24, 0.30, 0.37}

titleReq := milvusclient.NewAnnRequest("title_vector", 10, queryVector)

chunkReq := milvusclient.NewAnnRequest("chunks[emb]", 30, queryVector).
    WithFilter("element_filter(chunks, $[quality_score] > 0.8)").
    WithSearchParam("params", "{\"element_scope\": {\"collapse\": {\"strategy\": \"topk_sum\", \"topk\": 3}}}")

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption("tech_articles", 5,
    titleReq, chunkReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err.Error())
    return
}

fmt.Printf("hybrid search returned %d result sets\n", len(results))
```

```javascript
const query_vector = [0.19, 0.24, 0.30, 0.37];

const results = await client.search({
  collection_name: "tech_articles",
  data: [
    { anns_field: "title_vector", data: [query_vector], limit: 10 },
    {
      anns_field: "chunks[emb]",
      data: query_vector,
      limit: 30,
      expr: "element_filter(chunks, $[quality_score] > 0.8)",
      params: { element_scope: { collapse: { strategy: "topk_sum", topk: 3 } } },
    },
  ],
  rerank: { strategy: "rrf", params: { k: 60 } },
  limit: 5,
  output_fields: ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"],
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/hybrid_search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
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
            "limit": 30,
            "filter": "element_filter(chunks, $[quality_score] > 0.8)",
            "params": {
                "element_scope": {
                    "collapse": { "strategy": "topk_sum", "topk": 3 }
                }
            }
        }
    ],
    "rerank": { "strategy": "rrf", "params": { "k": 60 } },
    "limit": 5,
    "outputFields": ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"]
}'
```

The C++ and Rust 3.0.2 SDK builders and the C# 3.0.0 SDK do not encode the nested `element_scope` object used in this example through their string-valued extra-parameter interfaces. Use one of the SDKs shown above or the REST API to configure this collapse strategy.

In this example, `title_req` is entity-level, so the final hybrid result is also entity-level. The `chunk_req` request first returns element hits from `chunks[emb]`, then collapses the returned elements from the same entity by summing the best three element scores. If `element_scope` is omitted when entity-level collapse is needed, the collapse strategy defaults to `max`.

## Choose a collapse strategy

| Strategy | Behavior | `topk` | Metric requirement |
| --- | --- | --- | --- |
| `max` | Keep the best returned element score for the entity. | Not allowed. | Any supported regular vector metric. |
| `sum` | Sum all returned element scores for the entity. | Not allowed. | Positive-correlation metrics only, such as `IP` or `COSINE`. |
| `avg` | Average all returned element scores for the entity. | Not allowed. | Any supported regular vector metric. |
| `topk_sum` | Sum the best `K` returned element scores for the entity. | Required and must be positive. | Positive-correlation metrics only, such as `IP` or `COSINE`. |
| `topk_avg` | Average the best `K` returned element scores for the entity. | Required and must be positive. | Any supported regular vector metric. |

Collapse uses only the element hits returned by that StructArray element-level `AnnSearchRequest`. It does not scan every Struct element in the entity after ANN search. Set the request `limit` high enough to provide the elements you want available for collapse.

## Add filters, range search, and grouping

You can attach `element_filter` to a StructArray element-level `AnnSearchRequest` when scalar conditions should apply to the same Struct elements that participate in vector search. Apply a parent-entity condition to each sub-request that must satisfy it; do not rely on a top-level `filter` argument to propagate it to every request.

StructArray element-level vector fields support range search in hybrid search. Add `radius` and, optionally, `range_filter` to the element-level `AnnSearchRequest`. EmbeddingList-level StructArray requests do not support range search.

Element-level hybrid grouping is supported only when all `AnnSearchRequest` objects target element-level vector fields under the same StructArray field, and `group_by_field` must be the primary key. Hybrid grouping is not supported when the request mixes collection-level vector fields, different StructArray fields, or EmbeddingList-level requests. Do not combine range search with grouping.

## Interpret hybrid results

| Final candidate scope | Result key | Offset behavior | When it happens |
| --- | --- | --- | --- |
| Entity level | Primary key. | No element offset in the final result. | The hybrid request includes a collection-level vector field, an EmbeddingList request, or element-level requests under different StructArray fields. |
| Element level | Primary key plus parent StructArray field plus element offset. | The selected element offset can be returned when exposed by the API or SDK. | All `AnnSearchRequest` objects are element-level and under the same StructArray field. |

## Limitations

- Use `element_scope` only for StructArray element-level `AnnSearchRequest` objects that must be collapsed to entity-level candidates in hybrid search.

- Do not use `element_scope` for EmbeddingList requests, collection-level vector requests, or same-StructArray element-level hybrid search.

- `sum` and `topk_sum` collapse strategies require positive-correlation metrics, such as `IP` or `COSINE`. Do not use them with `L2`.

- `topk_sum` and `topk_avg` require a positive `topk` value. Other collapse strategies must not include `topk`.

- EmbeddingList-level StructArray requests do not support range search or group-by.

- Hybrid group-by is supported only for same-StructArray element-level hybrid search and only by primary key.

- Do not combine range search with group-by.

## Common mistakes

- Adding `element_scope` to a same-StructArray element-level hybrid request. That request remains element-level and does not perform entity-level collapse.

- Adding `element_scope` to `chunks[emb_list_vector]`. EmbeddingList search is already entity-level.

- Assuming two StructArray fields share element offsets. Offset `3` in `chunks` and offset `3` in another StructArray field are different elements, so the hybrid request becomes entity-level.

- Using `topk_sum` with `L2`. Use `max`, `avg`, or `topk_avg` for negative distance metrics.

- Expecting entity-level hybrid results to include the selected Struct element offset after collapse.

## Next steps

1. To learn the two basic StructArray vector search modes, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

1. To add scalar filters to hybrid search, read [Filtered Search with StructArray](filtered-search-with-structarray.md).

1. To use score or distance boundaries in hybrid search, read [Range Search with StructArray](range-search-with-structarray.md).

1. To group element-level hybrid results by parent entity, read [Grouping Search with StructArray](grouping-search-with-structarray.md).

1. To check StructArray search limits, read [StructArray Limits](structarray-limits.md).
