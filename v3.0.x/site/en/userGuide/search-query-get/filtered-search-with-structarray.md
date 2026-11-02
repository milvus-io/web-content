---
id: filtered-search-with-structarray.md
title: "Filtered Search with StructArray"
summary: "Use this page to add scalar filtering to vector search on StructArray fields. StructArray filtering has two levels: row-level filters select parent entities, while element-level filters constrain which Struct elements participate in element-level vector search."
---
# Filtered Search with StructArray

Use this page to add scalar filtering to vector search on StructArray fields. StructArray filtering has two levels: row-level filters select parent entities, while element-level filters constrain which Struct elements participate in element-level vector search.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). The collection has a StructArray field named `chunks`, with scalar subfields such as `section`, `page`, `quality_score`, and `has_code`, plus vector subfields for search.

Before running these examples, create the collection, insert the example data, create the required vector indexes, and load the collection. Use 4-dimensional vectors for the fields shown here. Each code block assumes the connection and variables from the preceding examples in the same language unless it defines them again.

## Choose a filter type

| Goal | Use | Result behavior |
| --- | --- | --- |
| Filter by a top-level scalar field, such as `category`. | Regular filter expression. | Selects parent entities before or during search. |
| Constrain element-level vector search to Struct elements that match scalar conditions. | `element_filter`. | Searches only matching Struct elements and can return matched element offsets. |
| Select entities by whether any, all, or a specific number of Struct elements match a predicate. | `MATCH_ANY`, `MATCH_ALL`, `MATCH_LEAST`, `MATCH_MOST`, or `MATCH_EXACT`. | Row-level filtering. These operators do not return offsets by themselves. |
| Test one element position, count Struct elements, or check subfield values across elements without `$[...]`. | Row-level StructArray paths, such as `chunks[0][section]`, `array_length(chunks)`, or `array_contains(chunks[section], ...)`. | Row-level filtering. For syntax, see [StructArray Operators](struct-array-operators.md). |

<div class="alert note">

This page explains how to use StructArray filters in search workflows. For the full syntax rules, supported predicate types, and unsupported predicate matrix, see [StructArray Operators](struct-array-operators.md).

</div>

## Filter by top-level fields

Use regular filter expressions when the condition belongs to the parent entity, not to an individual Struct element. This works with both EmbeddingList search and element-level search.

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
from pymilvus.client.embedding_list import EmbeddingList

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

query = EmbeddingList()
query.add([0.12, 0.21, 0.32, 0.44])
query.add([0.18, 0.23, 0.29, 0.36])

results = client.search(
    collection_name="tech_articles",
    data=[query],
    anns_field="chunks[emb_list_vector]",
    filter='category == "search"',
    limit=3,
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
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

EmbeddingList query = new EmbeddingList();
query.add(new FloatVec(Arrays.asList(0.12f, 0.21f, 0.32f, 0.44f)));
query.add(new FloatVec(Arrays.asList(0.18f, 0.23f, 0.29f, 0.36f)));

SearchResp results = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .data(Collections.singletonList(query))
        .annsField("chunks[emb_list_vector]")
        .filter("category == \"search\"")
        .limit(3)
        .outputFields(Arrays.asList("doc_id", "title", "category", "chunks[text]", "chunks[section]"))
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

query := entity.FloatVectorArray{
    entity.FloatVector{0.12, 0.21, 0.32, 0.44},
    entity.FloatVector{0.18, 0.23, 0.29, 0.36},
}

results, err := cli.Search(ctx, milvusclient.NewSearchOption("tech_articles", 3, []entity.Vector{query}).
    WithANNSField("chunks[emb_list_vector]").
    WithFilter("category == \"search\"").
    WithOutputFields("doc_id", "title", "category", "chunks[text]", "chunks[section]"))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Printf("returned %d result sets\n", len(results))
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query = EmbeddingList::new()
    .add_vector(vec![0.12f32, 0.21, 0.32, 0.44])
    .add_vector(vec![0.18f32, 0.23, 0.29, 0.36]);

let request = SearchRequest::builder()
    .collection_name("tech_articles")
    .vector_field("chunks[emb_list_vector]")
    .vectors(SearchVectors::EmbeddingLists(vec![query]))
    .filter("category == \"search\"")
    .limit(3)
    .output_fields(vec!["doc_id", "title", "category", "chunks[text]", "chunks[section]"])
    .build()?;

let results = client.search(request).await?;
```

```cpp
#include <iostream>
#include <memory>

#include "milvus/MilvusClientV2.h"
#include "milvus/request/dql/SearchRequest.h"
#include "milvus/types/EmbeddingList.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

milvus::EmbeddingList query;
query.AddFloatVector({0.12f, 0.21f, 0.32f, 0.44f});
query.AddFloatVector({0.18f, 0.23f, 0.29f, 0.36f});

milvus::SearchRequest request;
request.WithCollectionName("tech_articles")
       .WithAnnsField("chunks[emb_list_vector]")
       .WithLimit(3)
       .WithFilter("category == \"search\"");
request.WithOutputFields({"doc_id", "title", "category", "chunks[text]", "chunks[section]"});
request.AddEmbeddingList(std::move(query));

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

const query = [
  [0.12, 0.21, 0.32, 0.44],
  [0.18, 0.23, 0.29, 0.36],
];

const results = await client.search({
  collection_name: "tech_articles",
  data: query,
  anns_field: "chunks[emb_list_vector]",
  filter: 'category == "search"',
  limit: 3,
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

var query = new EmbeddingList();
query.Add(new ReadOnlyMemory<float>(new[] { 0.12f, 0.21f, 0.32f, 0.44f }));
query.Add(new ReadOnlyMemory<float>(new[] { 0.18f, 0.23f, 0.29f, 0.36f }));

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "chunks[emb_list_vector]",
    EmbeddingLists = new[] { query },
    Limit = 3,
    Parameters = new SearchParameters
    {
        Expression = "category == \"search\"",
        OutputFields = { "doc_id", "title", "category", "chunks[text]", "chunks[section]" }
    }
});
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
    "data": [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
    "annsField": "chunks[emb_list_vector]",
    "filter": "category == \"search\"",
    "limit": 3,
    "outputFields": ["doc_id", "title", "category", "chunks[text]", "chunks[section]"]
}'
```

The filter above selects only entities whose top-level `category` field is `"search"`. It does not identify one matched Struct element.

## Filter element-level vector search

Use `element_filter(structArrayField, predicate)` when the scalar conditions must apply to the same Struct element that participates in element-level vector search. Inside the predicate, use `$[subfield]` to refer to scalar subfields of the current Struct element.

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
    '$[quality_score] > 0.9 && '
    '$[has_code] == true)'
)

results = client.search(
    collection_name="tech_articles",
    data=[query_vector],
    anns_field="chunks[emb]",
    filter=filter_expr,
    limit=5,
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[page]",
        "chunks[quality_score]",
        "chunks[has_code]",
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

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

FloatVec queryVector = new FloatVec(Arrays.asList(0.19f, 0.24f, 0.30f, 0.37f));

String filterExpr = "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9 && $[has_code] == true)";

SearchResp results = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .data(Collections.singletonList(queryVector))
        .annsField("chunks[emb]")
        .filter(filterExpr)
        .limit(5)
        .outputFields(Arrays.asList("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]", "chunks[has_code]"))
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

filterExpr := "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9 && $[has_code] == true)"

results, err := cli.Search(ctx, milvusclient.NewSearchOption("tech_articles", 5, []entity.Vector{queryVector}).
    WithANNSField("chunks[emb]").
    WithFilter(filterExpr).
    WithOutputFields("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]", "chunks[has_code]"))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Printf("returned %d result sets\n", len(results))
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query_vector = vec![0.19f32, 0.24, 0.30, 0.37];

let filter_expr = "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9 && $[has_code] == true)";

let request = SearchRequest::builder()
    .collection_name("tech_articles")
    .vector_field("chunks[emb]")
    .vectors(SearchVectors::Float(vec![query_vector]))
    .filter(filter_expr)
    .limit(5)
    .output_fields(vec!["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]", "chunks[has_code]"])
    .build()?;

let results = client.search(request).await?;
```

```cpp
#include <iostream>
#include <memory>
#include <vector>

#include "milvus/MilvusClientV2.h"
#include "milvus/request/dql/SearchRequest.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

std::vector<float> query_vector = {0.19f, 0.24f, 0.30f, 0.37f};

milvus::SearchRequest request;
request.WithCollectionName("tech_articles")
       .WithAnnsField("chunks[emb]")
       .WithLimit(5)
       .WithFilter("category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9 && $[has_code] == true)");
request.WithOutputFields({"doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]", "chunks[has_code]"});
request.AddFloatVector(query_vector);

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}
```

```javascript
const query_vector = [0.19, 0.24, 0.30, 0.37];

const filter_expr = 'category == "search" && element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9 && $[has_code] == true)';

const results = await client.search({
  collection_name: "tech_articles",
  data: query_vector,
  anns_field: "chunks[emb]",
  filter: filter_expr,
  limit: 5,
  output_fields: ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]", "chunks[has_code]"],
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

var queryVector = new ReadOnlyMemory<float>(new[] { 0.19f, 0.24f, 0.30f, 0.37f });

var filterExpr = "category == \"search\" && " +
    "element_filter(chunks, " +
    "$[section] == \"index\" && " +
    "$[quality_score] > 0.9 && " +
    "$[has_code] == true)";

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "chunks[emb]",
    Vectors = new[] { queryVector },
    Limit = 5,
    Parameters = new SearchParameters
    {
        Expression = filterExpr,
        OutputFields = { "doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]", "chunks[has_code]" }
    }
});
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
    "data": [[0.19, 0.24, 0.30, 0.37]],
    "annsField": "chunks[emb]",
    "filter": "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9 && $[has_code] == true)",
    "limit": 5,
    "outputFields": ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[page]", "chunks[quality_score]", "chunks[has_code]"]
}'
```

In this example, the top-level predicate `category == "search"` selects candidate entities, and `element_filter` restricts element-level vector search to chunks where `section`, `quality_score`, and `has_code` all match in the same Struct element.

<div class="alert note">

Warning

When you combine a top-level predicate with `element_filter`, place `element_filter` at the end of the expression. A filter expression can contain only one `element_filter`, and you cannot nest `element_filter` or `MATCH_*` inside another StructArray operator.

</div>

## Filter entities with MATCH operators

Use `MATCH_*` operators when the filter should decide whether a parent entity qualifies based on its Struct elements. These operators are row-level filters: they select entities, but do not return element offsets by themselves.

| Operator | Use it when | Example |
| --- | --- | --- |
| `MATCH_ANY` | At least one Struct element must satisfy the predicate. | `MATCH_ANY(chunks, $[section] == "index")` |
| `MATCH_ALL` | All Struct elements must satisfy the predicate. | `MATCH_ALL(chunks, $[quality_score] > 0.5)` |
| `MATCH_LEAST` | At least `N` Struct elements must satisfy the predicate. | `MATCH_LEAST(chunks, $[has_code] == true, threshold=2)` |
| `MATCH_MOST` | At most `N` Struct elements must satisfy the predicate. | `MATCH_MOST(chunks, $[section] == "appendix", threshold=1)` |
| `MATCH_EXACT` | Exactly `N` Struct elements must satisfy the predicate. | `MATCH_EXACT(chunks, $[section] == "summary", threshold=1)` |

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
from pymilvus.client.embedding_list import EmbeddingList

query = EmbeddingList()
query.add([0.12, 0.21, 0.32, 0.44])
query.add([0.18, 0.23, 0.29, 0.36])

filter_expr = (
    'category == "search" && '
    'MATCH_ANY(chunks, $[section] == "index" && $[quality_score] > 0.9)'
)

results = client.search(
    collection_name="tech_articles",
    data=[query],
    anns_field="chunks[emb_list_vector]",
    filter=filter_expr,
    limit=3,
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
import io.milvus.v2.service.vector.request.data.EmbeddingList;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

EmbeddingList query = new EmbeddingList();
query.add(new FloatVec(Arrays.asList(0.12f, 0.21f, 0.32f, 0.44f)));
query.add(new FloatVec(Arrays.asList(0.18f, 0.23f, 0.29f, 0.36f)));

String filterExpr = "category == \"search\" && MATCH_ANY(chunks, $[section] == \"index\" && $[quality_score] > 0.9)";

SearchResp results = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .data(Collections.singletonList(query))
        .annsField("chunks[emb_list_vector]")
        .filter(filterExpr)
        .limit(3)
        .outputFields(Arrays.asList("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
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

query := entity.FloatVectorArray{
    entity.FloatVector{0.12, 0.21, 0.32, 0.44},
    entity.FloatVector{0.18, 0.23, 0.29, 0.36},
}

filterExpr := "category == \"search\" && MATCH_ANY(chunks, $[section] == \"index\" && $[quality_score] > 0.9)"

results, err := cli.Search(ctx, milvusclient.NewSearchOption("tech_articles", 3, []entity.Vector{query}).
    WithANNSField("chunks[emb_list_vector]").
    WithFilter(filterExpr).
    WithOutputFields("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Printf("returned %d result sets\n", len(results))
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query = EmbeddingList::new()
    .add_vector(vec![0.12f32, 0.21, 0.32, 0.44])
    .add_vector(vec![0.18f32, 0.23, 0.29, 0.36]);

let filter_expr = "category == \"search\" && MATCH_ANY(chunks, $[section] == \"index\" && $[quality_score] > 0.9)";

let request = SearchRequest::builder()
    .collection_name("tech_articles")
    .vector_field("chunks[emb_list_vector]")
    .vectors(SearchVectors::EmbeddingLists(vec![query]))
    .filter(filter_expr)
    .limit(3)
    .output_fields(vec!["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"])
    .build()?;

let results = client.search(request).await?;
```

```cpp
#include <iostream>
#include <memory>

#include "milvus/MilvusClientV2.h"
#include "milvus/request/dql/SearchRequest.h"
#include "milvus/types/EmbeddingList.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

milvus::EmbeddingList query;
query.AddFloatVector({0.12f, 0.21f, 0.32f, 0.44f});
query.AddFloatVector({0.18f, 0.23f, 0.29f, 0.36f});

milvus::SearchRequest request;
request.WithCollectionName("tech_articles")
       .WithAnnsField("chunks[emb_list_vector]")
       .WithLimit(3)
       .WithFilter("category == \"search\" && MATCH_ANY(chunks, $[section] == \"index\" && $[quality_score] > 0.9)");
request.WithOutputFields({"doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"});
request.AddEmbeddingList(std::move(query));

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}
```

```javascript
const query = [
  [0.12, 0.21, 0.32, 0.44],
  [0.18, 0.23, 0.29, 0.36],
];

const filter_expr = 'category == "search" && MATCH_ANY(chunks, $[section] == "index" && $[quality_score] > 0.9)';

const results = await client.search({
  collection_name: "tech_articles",
  data: query,
  anns_field: "chunks[emb_list_vector]",
  filter: filter_expr,
  limit: 3,
  output_fields: ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"],
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

var query = new EmbeddingList();
query.Add(new ReadOnlyMemory<float>(new[] { 0.12f, 0.21f, 0.32f, 0.44f }));
query.Add(new ReadOnlyMemory<float>(new[] { 0.18f, 0.23f, 0.29f, 0.36f }));

var filterExpr = "category == \"search\" && " +
    "MATCH_ANY(chunks, $[section] == \"index\" && $[quality_score] > 0.9)";

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "chunks[emb_list_vector]",
    EmbeddingLists = new[] { query },
    Limit = 3,
    Parameters = new SearchParameters
    {
        Expression = filterExpr,
        OutputFields = { "doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]" }
    }
});
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
    "data": [[[0.12, 0.21, 0.32, 0.44], [0.18, 0.23, 0.29, 0.36]]],
    "annsField": "chunks[emb_list_vector]",
    "filter": "category == \"search\" && MATCH_ANY(chunks, $[section] == \"index\" && $[quality_score] > 0.9)",
    "limit": 3,
    "outputFields": ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"]
}'
```

Use `MATCH_ANY` here because the EmbeddingList search result is entity-level. The filter requires at least one chunk in the entity to be an `"index"` chunk with high quality, but the search result itself still represents the parent entity.

## Use filters in hybrid search

In hybrid search, apply StructArray filters where the condition should take effect. Apply a parent-entity condition to each sub-request that must satisfy it. Attach `element_filter` only to the StructArray element-level request that needs element-level constraints, after the parent-entity condition.

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
from pymilvus import AnnSearchRequest, RRFRanker

query_vector = [0.19, 0.24, 0.30, 0.37]

title_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="title_vector",
    param={},
    limit=10,
    expr='category == "search"',
)

chunk_req = AnnSearchRequest(
    data=[query_vector],
    anns_field="chunks[emb]",
    param={},
    limit=10,
    expr='category == "search" && element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)',
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
        .filter("category == \"search\"")
        .build();

AnnSearchReq chunkReq = AnnSearchReq.builder()
        .vectorFieldName("chunks[emb]")
        .vectors(Collections.singletonList(queryVector))
        .limit(10)
        .filter("category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)")
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

titleReq := milvusclient.NewAnnRequest("title_vector", 10, queryVector).
    WithFilter("category == \"search\"")
chunkReq := milvusclient.NewAnnRequest("chunks[emb]", 10, queryVector).
    WithFilter("category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)")

results, err := cli.HybridSearch(ctx, milvusclient.NewHybridSearchOption("tech_articles", 5,
    titleReq, chunkReq).
    WithReranker(milvusclient.NewRRFReranker()).
    WithOutputFields("doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Printf("returned %d result sets\n", len(results))
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let query_vector = vec![0.19f32, 0.24, 0.30, 0.37];

let title_req = SubSearchRequest::builder()
    .vector_field("title_vector")
    .vectors(SearchVectors::Float(vec![query_vector.clone()]))
    .limit(10)
    .filter("category == \"search\"")
    .build()?;

let chunk_req = SubSearchRequest::builder()
    .vector_field("chunks[emb]")
    .vectors(SearchVectors::Float(vec![query_vector]))
    .limit(10)
    .filter("category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)")
    .build()?;

let request = HybridSearchRequest::builder()
    .collection_name("tech_articles")
    .sub_requests(vec![title_req, chunk_req])
    .rerank(RRFRerank::new().k(60))
    .limit(5)
    .output_fields(vec!["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"])
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

auto title_req = std::make_shared<milvus::SubSearchRequest>();
title_req->WithAnnsField("title_vector").WithLimit(10);
title_req->WithFilter("category == \"search\"");
title_req->AddFloatVector(query_vector);

auto chunk_req = std::make_shared<milvus::SubSearchRequest>();
chunk_req->WithAnnsField("chunks[emb]").WithLimit(10);
chunk_req->WithFilter("category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)");
chunk_req->AddFloatVector(query_vector);

milvus::HybridSearchRequest request;
request.WithCollectionName("tech_articles")
       .WithLimit(5)
       .AddSubRequest(title_req)
       .AddSubRequest(chunk_req)
       .WithRerank(std::make_shared<milvus::RRFRerank>(60));
request.WithOutputFields({"doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"});

milvus::HybridSearchResponse response;
status = client->HybridSearch(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}
```

```javascript
const query_vector = [0.19, 0.24, 0.30, 0.37];

const results = await client.search({
  collection_name: "tech_articles",
  data: [
    { anns_field: "title_vector", data: [query_vector], limit: 10, expr: 'category == "search"' },
    {
      anns_field: "chunks[emb]",
      data: query_vector,
      limit: 10,
      expr: 'category == "search" && element_filter(chunks, $[section] == "index" && $[quality_score] > 0.9)',
    },
  ],
  rerank: { strategy: "rrf", params: { k: 60 } },
  limit: 5,
  output_fields: ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"],
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Types;

var queryVector = new ReadOnlyMemory<float>(new[] { 0.19f, 0.24f, 0.30f, 0.37f });

var titleReq = new AnnSearchReq
{
    VectorFieldName = "title_vector",
    Vectors = new[] { queryVector },
    Limit = 10,
    Expression = "category == \"search\""
};

var chunkReq = new AnnSearchReq
{
    VectorFieldName = "chunks[emb]",
    Vectors = new[] { queryVector },
    Limit = 10,
    Expression = "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)"
};

var results = await client.HybridSearchAsync(new HybridSearchReq
{
    CollectionName = "tech_articles",
    SearchRequests = new[] { titleReq, chunkReq },
    Reranker = new RrfReranker(60),
    Limit = 5,
    Parameters = new SearchParameters
    {
        OutputFields = { "doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]" }
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
            "limit": 10,
            "filter": "category == \"search\""
        },
        {
            "data": [[0.19, 0.24, 0.30, 0.37]],
            "annsField": "chunks[emb]",
            "limit": 10,
            "filter": "category == \"search\" && element_filter(chunks, $[section] == \"index\" && $[quality_score] > 0.9)"
        }
    ],
    "rerank": { "strategy": "rrf", "params": { "k": 60 } },
    "limit": 5,
    "outputFields": ["doc_id", "title", "category", "chunks[text]", "chunks[section]", "chunks[quality_score]"]
}'
```

Both sub-requests apply `category == "search"`. The `chunk_req` expression also constrains the Struct elements that participate in its vector search. For supported hybrid search combinations and version-specific limits, see [Hybrid Search with StructArray](hybrid-search-with-structarray.md) and [StructArray Limits](structarray-limits.md).

## Predicate support summary

Use scalar subfields in StructArray predicates. Vector subfields are not scalar predicate inputs.

| Subfield type | Typical predicate examples |
| --- | --- |
| `BOOL` | `$[has_code] == true`, `!($[has_code] == true)` |
| Integer types | `$[page] >= 2`, `$[page] in [1, 2, 3]` |
| `FLOAT`, `DOUBLE` | `$[quality_score] > 0.9`, `0.7 < $[quality_score] < 0.95` |
| `VARCHAR` | `$[section] == "index"`, `$[text] like "range%"` |
| Vector subfields | Not supported as `$[...]` scalar predicate inputs. Use vector subfields through vector search instead. |

For unsupported cases such as JSON paths, array container functions, text match functions, null predicates on `$[...]`, Geometry functions, Timestamptz expressions, and generic function calls, see [StructArray Operators](struct-array-operators.md).

## Common mistakes

- Using `$[subfield]` outside `element_filter` or `MATCH_*`.

- Using `chunks.section` instead of StructArray operator syntax such as `element_filter(chunks, $[section] == "index")`.

- Using `element_filter` when you only need row-level filtering. Use `MATCH_ANY` instead if you only need to select entities.

- Expecting `MATCH_*` to return element offsets. These operators select entities and do not identify one matched element by themselves.

- Writing bare boolean predicates such as `$[has_code]`. Use explicit comparisons such as `$[has_code] == true`.

- Putting `element_filter` before a top-level predicate in the same filter expression.

## Next steps

1. To review full StructArray filter syntax, read [StructArray Operators](struct-array-operators.md).

2. To run unfiltered vector searches first, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

3. To create scalar indexes for frequently used StructArray filters, read [Index StructArray Fields](index-structarray-fields.md).

4. To check version-specific filter and search limits, read [StructArray Limits](structarray-limits.md).
