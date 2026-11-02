---
id: insert-data-into-structarray-fields.md
title: "Insert Data into StructArray Fields"
summary: "Insert data into a StructArray field when each entity contains an ordered list of structured elements. In the insert payload, a StructArray field is represented as an array of objects. Each object represents one Struct element and uses the Struct subfield names defined in the collection schema."
---
# Insert Data into StructArray Fields

Insert data into a StructArray field when each entity contains an ordered list of structured elements. In the insert payload, a StructArray field is represented as an array of objects. Each object represents one Struct element and uses the Struct subfield names defined in the collection schema.

This page uses the `tech_articles` collection from [Create a StructArray Field](create-structarray-field.md). Each entity is a technical article, and the `chunks` field stores article chunks as Struct elements.

## Before you begin

Make sure the collection schema already contains the `chunks` StructArray field.

| Field | Type | Insert value |
| --- | --- | --- |
| `doc_id` | `INT64` | Article ID. |
| `title` | `VARCHAR` | Article title. |
| `category` | `VARCHAR` | Article category. |
| `title_vector` | `FLOAT_VECTOR` | Article-level embedding. |
| `chunks` | `ARRAY` | A list of chunk objects. |

Each object in `chunks` must follow the Struct schema.

| Subfield | Type | Insert value |
| --- | --- | --- |
| `text` | `VARCHAR` | Chunk text. |
| `section` | `VARCHAR` | Section name, such as `index`, `search`, or `filter`. |
| `page` | `INT64` | Page number or logical position. |
| `quality_score` | `FLOAT` | Chunk-level score. |
| `has_code` | `BOOL` | Whether the chunk contains code. |
| `emb_list_vector` | `FLOAT_VECTOR` | Vector written for EmbeddingList search. |
| `emb` | `FLOAT_VECTOR` | Vector written for element-level search. |

<div class="alert note">

In an insert payload, `chunks` is a regular field whose value is an array of Struct objects. Inside each object, use subfield names such as `text` and `emb`. Use path syntax, such as `chunks[text]` or `chunks[emb]`, only after insertion when you create indexes, run searches, build filters, or specify output fields.

</div>

## Understand the insert payload shape

The `chunks` value is an array of Struct elements. Each element is an object whose keys are subfield names.

```json
{
  "doc_id": 1,
  "title": "StructArray indexing patterns",
  "category": "index",
  "title_vector": [0.12, 0.08, 0.32, 0.48],
  "chunks": [
    {
      "text": "Create one index for each vector subfield.",
      "section": "index",
      "page": 1,
      "quality_score": 0.96,
      "has_code": false,
      "emb_list_vector": [0.10, 0.20, 0.30, 0.40],
      "emb": [0.10, 0.20, 0.30, 0.40]
    },
    {
      "text": "Use MAX_SIM metrics for EmbeddingList search.",
      "section": "index",
      "page": 2,
      "quality_score": 0.91,
      "has_code": true,
      "emb_list_vector": [0.16, 0.24, 0.35, 0.45],
      "emb": [0.16, 0.24, 0.35, 0.45]
    }
  ]
}
```

`emb_list_vector` and `emb` are separate vector subfields because they support different search modes. EmbeddingList search treats all vectors in a StructArray field as one embedding list and returns entity-level results with `MAX_SIM*` metrics. Element-level search searches each Struct element independently and can return the matched element offset. This example stores the same vector values in both fields for simplicity. In a production application, you can store the same embeddings in both subfields when both search modes use the same chunk embedding, or store different embeddings when the two search modes use different representations.

## Insert rows

Use the insert operation to write the following three entities. Each entity includes all required Struct subfields. The Go example uses column-based input: each map groups the subfield arrays for one entity.

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

data = [
    {
        "doc_id": 1,
        "title": "StructArray indexing patterns",
        "category": "index",
        "title_vector": [0.12, 0.08, 0.32, 0.48],
        "chunks": [
            {
                "text": "Create one index for each vector subfield.",
                "section": "index",
                "page": 1,
                "quality_score": 0.96,
                "has_code": False,
                "emb_list_vector": [0.10, 0.20, 0.30, 0.40],
                "emb": [0.10, 0.20, 0.30, 0.40],
            },
            {
                "text": "Use MAX_SIM metrics for EmbeddingList search.",
                "section": "index",
                "page": 2,
                "quality_score": 0.91,
                "has_code": True,
                "emb_list_vector": [0.16, 0.24, 0.35, 0.45],
                "emb": [0.16, 0.24, 0.35, 0.45],
            },
        ],
    },
    {
        "doc_id": 2,
        "title": "Filtered StructArray search",
        "category": "filter",
        "title_vector": [0.20, 0.18, 0.22, 0.40],
        "chunks": [
            {
                "text": "Use element_filter to match scalar conditions within the same Struct element.",
                "section": "filter",
                "page": 1,
                "quality_score": 0.93,
                "has_code": True,
                "emb_list_vector": [0.21, 0.18, 0.33, 0.44],
                "emb": [0.21, 0.18, 0.33, 0.44],
            },
            {
                "text": "MATCH_LEAST checks how many elements satisfy a predicate.",
                "section": "filter",
                "page": 2,
                "quality_score": 0.88,
                "has_code": False,
                "emb_list_vector": [0.24, 0.22, 0.31, 0.39],
                "emb": [0.24, 0.22, 0.31, 0.39],
            },
        ],
    },
    {
        "doc_id": 3,
        "title": "Element-level search with offsets",
        "category": "search",
        "title_vector": [0.33, 0.11, 0.29, 0.37],
        "chunks": [
            {
                "text": "Element-level search can return the offset of the matched Struct element.",
                "section": "search",
                "page": 1,
                "quality_score": 0.95,
                "has_code": False,
                "emb_list_vector": [0.32, 0.14, 0.28, 0.41],
                "emb": [0.32, 0.14, 0.28, 0.41],
            }
        ],
    },
]

result = client.insert(
    collection_name="tech_articles",
    data=data,
)

print(result)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import java.util.ArrayList;
import java.util.List;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

List<JsonObject> data = new ArrayList<>();
{
    JsonObject row = new JsonObject();
    row.addProperty("doc_id", 1L);
    row.addProperty("title", "StructArray indexing patterns");
    row.addProperty("category", "index");
    row.add("title_vector", JsonParser.parseString("[0.12, 0.08, 0.32, 0.48]"));
    JsonArray chunks = new JsonArray();
    {
        JsonObject chunk = new JsonObject();
        chunk.addProperty("text", "Create one index for each vector subfield.");
        chunk.addProperty("section", "index");
        chunk.addProperty("page", 1L);
        chunk.addProperty("quality_score", 0.96);
        chunk.addProperty("has_code", false);
        chunk.add("emb_list_vector", JsonParser.parseString("[0.1, 0.2, 0.3, 0.4]"));
        chunk.add("emb", JsonParser.parseString("[0.1, 0.2, 0.3, 0.4]"));
        chunks.add(chunk);
    }
    {
        JsonObject chunk = new JsonObject();
        chunk.addProperty("text", "Use MAX_SIM metrics for EmbeddingList search.");
        chunk.addProperty("section", "index");
        chunk.addProperty("page", 2L);
        chunk.addProperty("quality_score", 0.91);
        chunk.addProperty("has_code", true);
        chunk.add("emb_list_vector", JsonParser.parseString("[0.16, 0.24, 0.35, 0.45]"));
        chunk.add("emb", JsonParser.parseString("[0.16, 0.24, 0.35, 0.45]"));
        chunks.add(chunk);
    }
    row.add("chunks", chunks);
    data.add(row);
}
{
    JsonObject row = new JsonObject();
    row.addProperty("doc_id", 2L);
    row.addProperty("title", "Filtered StructArray search");
    row.addProperty("category", "filter");
    row.add("title_vector", JsonParser.parseString("[0.2, 0.18, 0.22, 0.4]"));
    JsonArray chunks = new JsonArray();
    {
        JsonObject chunk = new JsonObject();
        chunk.addProperty("text", "Use element_filter to match scalar conditions within the same Struct element.");
        chunk.addProperty("section", "filter");
        chunk.addProperty("page", 1L);
        chunk.addProperty("quality_score", 0.93);
        chunk.addProperty("has_code", true);
        chunk.add("emb_list_vector", JsonParser.parseString("[0.21, 0.18, 0.33, 0.44]"));
        chunk.add("emb", JsonParser.parseString("[0.21, 0.18, 0.33, 0.44]"));
        chunks.add(chunk);
    }
    {
        JsonObject chunk = new JsonObject();
        chunk.addProperty("text", "MATCH_LEAST checks how many elements satisfy a predicate.");
        chunk.addProperty("section", "filter");
        chunk.addProperty("page", 2L);
        chunk.addProperty("quality_score", 0.88);
        chunk.addProperty("has_code", false);
        chunk.add("emb_list_vector", JsonParser.parseString("[0.24, 0.22, 0.31, 0.39]"));
        chunk.add("emb", JsonParser.parseString("[0.24, 0.22, 0.31, 0.39]"));
        chunks.add(chunk);
    }
    row.add("chunks", chunks);
    data.add(row);
}
{
    JsonObject row = new JsonObject();
    row.addProperty("doc_id", 3L);
    row.addProperty("title", "Element-level search with offsets");
    row.addProperty("category", "search");
    row.add("title_vector", JsonParser.parseString("[0.33, 0.11, 0.29, 0.37]"));
    JsonArray chunks = new JsonArray();
    {
        JsonObject chunk = new JsonObject();
        chunk.addProperty("text", "Element-level search can return the offset of the matched Struct element.");
        chunk.addProperty("section", "search");
        chunk.addProperty("page", 1L);
        chunk.addProperty("quality_score", 0.95);
        chunk.addProperty("has_code", false);
        chunk.add("emb_list_vector", JsonParser.parseString("[0.32, 0.14, 0.28, 0.41]"));
        chunk.add("emb", JsonParser.parseString("[0.32, 0.14, 0.28, 0.41]"));
        chunks.add(chunk);
    }
    row.add("chunks", chunks);
    data.add(row);
}

InsertResp resp = client.insert(InsertReq.builder()
        .collectionName("tech_articles")
        .data(data)
        .build());
System.out.println(resp.getInsertCnt());
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

chunksSchema := entity.NewStructSchema().
    WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(500)).
    WithField(entity.NewField().WithName("section").WithDataType(entity.FieldTypeVarChar).WithMaxLength(50)).
    WithField(entity.NewField().WithName("page").WithDataType(entity.FieldTypeInt64)).
    WithField(entity.NewField().WithName("quality_score").WithDataType(entity.FieldTypeFloat)).
    WithField(entity.NewField().WithName("has_code").WithDataType(entity.FieldTypeBool)).
    WithField(entity.NewField().WithName("emb_list_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(4)).
    WithField(entity.NewField().WithName("emb").WithDataType(entity.FieldTypeFloatVector).WithDim(4))

chunksRows := []map[string]any{
    {
        "text":            []string{"Create one index for each vector subfield.", "Use MAX_SIM metrics for EmbeddingList search."},
        "section":         []string{"index", "index"},
        "page":            []int64{1, 2},
        "quality_score":   []float32{0.96, 0.91},
        "has_code":        []bool{false, true},
        "emb_list_vector": [][]float32{{0.1, 0.2, 0.3, 0.4}, {0.16, 0.24, 0.35, 0.45}},
        "emb":             [][]float32{{0.1, 0.2, 0.3, 0.4}, {0.16, 0.24, 0.35, 0.45}},
    },
    {
        "text":            []string{"Use element_filter to match scalar conditions within the same Struct element.", "MATCH_LEAST checks how many elements satisfy a predicate."},
        "section":         []string{"filter", "filter"},
        "page":            []int64{1, 2},
        "quality_score":   []float32{0.93, 0.88},
        "has_code":        []bool{true, false},
        "emb_list_vector": [][]float32{{0.21, 0.18, 0.33, 0.44}, {0.24, 0.22, 0.31, 0.39}},
        "emb":             [][]float32{{0.21, 0.18, 0.33, 0.44}, {0.24, 0.22, 0.31, 0.39}},
    },
    {
        "text":            []string{"Element-level search can return the offset of the matched Struct element."},
        "section":         []string{"search"},
        "page":            []int64{1},
        "quality_score":   []float32{0.95},
        "has_code":        []bool{false},
        "emb_list_vector": [][]float32{{0.32, 0.14, 0.28, 0.41}},
        "emb":             [][]float32{{0.32, 0.14, 0.28, 0.41}},
    },
}

result, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption("tech_articles").
    WithInt64Column("doc_id", []int64{1, 2, 3}).
    WithVarcharColumn("title", []string{"StructArray indexing patterns", "Filtered StructArray search", "Element-level search with offsets"}).
    WithVarcharColumn("category", []string{"index", "filter", "search"}).
    WithFloatVectorColumn("title_vector", 4, [][]float32{{0.12, 0.08, 0.32, 0.48}, {0.2, 0.18, 0.22, 0.4}, {0.33, 0.11, 0.29, 0.37}}).
    WithStructArrayColumn("chunks", chunksSchema, chunksRows))
if err != nil {
    panic(err)
}
fmt.Printf("inserted %d rows\n", result.InsertCount)
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let rows = vec![
    json!({
        "doc_id": 1,
        "title": "StructArray indexing patterns",
        "category": "index",
        "title_vector": [0.12, 0.08, 0.32, 0.48],
        "chunks": [
            {
                "text": "Create one index for each vector subfield.",
                "section": "index",
                "page": 1,
                "quality_score": 0.96,
                "has_code": false,
                "emb_list_vector": [0.1, 0.2, 0.3, 0.4],
                "emb": [0.1, 0.2, 0.3, 0.4],
            },
            {
                "text": "Use MAX_SIM metrics for EmbeddingList search.",
                "section": "index",
                "page": 2,
                "quality_score": 0.91,
                "has_code": true,
                "emb_list_vector": [0.16, 0.24, 0.35, 0.45],
                "emb": [0.16, 0.24, 0.35, 0.45],
            },
        ],
    }),
    json!({
        "doc_id": 2,
        "title": "Filtered StructArray search",
        "category": "filter",
        "title_vector": [0.2, 0.18, 0.22, 0.4],
        "chunks": [
            {
                "text": "Use element_filter to match scalar conditions within the same Struct element.",
                "section": "filter",
                "page": 1,
                "quality_score": 0.93,
                "has_code": true,
                "emb_list_vector": [0.21, 0.18, 0.33, 0.44],
                "emb": [0.21, 0.18, 0.33, 0.44],
            },
            {
                "text": "MATCH_LEAST checks how many elements satisfy a predicate.",
                "section": "filter",
                "page": 2,
                "quality_score": 0.88,
                "has_code": false,
                "emb_list_vector": [0.24, 0.22, 0.31, 0.39],
                "emb": [0.24, 0.22, 0.31, 0.39],
            },
        ],
    }),
    json!({
        "doc_id": 3,
        "title": "Element-level search with offsets",
        "category": "search",
        "title_vector": [0.33, 0.11, 0.29, 0.37],
        "chunks": [
            {
                "text": "Element-level search can return the offset of the matched Struct element.",
                "section": "search",
                "page": 1,
                "quality_score": 0.95,
                "has_code": false,
                "emb_list_vector": [0.32, 0.14, 0.28, 0.41],
                "emb": [0.32, 0.14, 0.28, 0.41],
            },
        ],
    }),
];

let rows = rows.into_iter().map(|r| r.as_object().cloned().unwrap()).collect::<Vec<_>>();
let request = InsertRequest::builder()
    .collection_name("tech_articles")
    .rows(rows)
    .build()?;
let resp = client.insert(request).await?;
println!("insert count: {}", resp.insert_count());
```

```cpp
#include <stdexcept>
#include <iostream>
#include <vector>

#include <nlohmann/json.hpp>
#include "milvus/MilvusClientV2.h"
#include "milvus/request/dml/InsertRequest.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

nlohmann::json rows = nlohmann::json::array({
    {
        {"doc_id", 1},
        {"title", "StructArray indexing patterns"},
        {"category", "index"},
        {"title_vector", std::vector<float>{0.12f, 0.08f, 0.32f, 0.48f}},
        {"chunks", nlohmann::json::array({
            {
                {"text", "Create one index for each vector subfield."},
                {"section", "index"},
                {"page", 1},
                {"quality_score", 0.96},
                {"has_code", false},
                {"emb_list_vector", std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f}},
                {"emb", std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f}},
            },
            {
                {"text", "Use MAX_SIM metrics for EmbeddingList search."},
                {"section", "index"},
                {"page", 2},
                {"quality_score", 0.91},
                {"has_code", true},
                {"emb_list_vector", std::vector<float>{0.16f, 0.24f, 0.35f, 0.45f}},
                {"emb", std::vector<float>{0.16f, 0.24f, 0.35f, 0.45f}},
            },
        })},
    },
    {
        {"doc_id", 2},
        {"title", "Filtered StructArray search"},
        {"category", "filter"},
        {"title_vector", std::vector<float>{0.2f, 0.18f, 0.22f, 0.4f}},
        {"chunks", nlohmann::json::array({
            {
                {"text", "Use element_filter to match scalar conditions within the same Struct element."},
                {"section", "filter"},
                {"page", 1},
                {"quality_score", 0.93},
                {"has_code", true},
                {"emb_list_vector", std::vector<float>{0.21f, 0.18f, 0.33f, 0.44f}},
                {"emb", std::vector<float>{0.21f, 0.18f, 0.33f, 0.44f}},
            },
            {
                {"text", "MATCH_LEAST checks how many elements satisfy a predicate."},
                {"section", "filter"},
                {"page", 2},
                {"quality_score", 0.88},
                {"has_code", false},
                {"emb_list_vector", std::vector<float>{0.24f, 0.22f, 0.31f, 0.39f}},
                {"emb", std::vector<float>{0.24f, 0.22f, 0.31f, 0.39f}},
            },
        })},
    },
    {
        {"doc_id", 3},
        {"title", "Element-level search with offsets"},
        {"category", "search"},
        {"title_vector", std::vector<float>{0.33f, 0.11f, 0.29f, 0.37f}},
        {"chunks", nlohmann::json::array({
            {
                {"text", "Element-level search can return the offset of the matched Struct element."},
                {"section", "search"},
                {"page", 1},
                {"quality_score", 0.95},
                {"has_code", false},
                {"emb_list_vector", std::vector<float>{0.32f, 0.14f, 0.28f, 0.41f}},
                {"emb", std::vector<float>{0.32f, 0.14f, 0.28f, 0.41f}},
            },
        })},
    },
});

milvus::InsertRequest request;
request.WithCollectionName("tech_articles");
for (auto& row : rows) {
    request.AddRowData(std::move(row));
}

milvus::InsertResponse response;
status = client->Insert(request, response);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
import { MilvusClient } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

const data = [
  {
    doc_id: 1, title: 'StructArray indexing patterns', category: 'index',
    title_vector: [0.12, 0.08, 0.32, 0.48],
    chunks: [
      {
        text: 'Create one index for each vector subfield.', section: 'index', page: 1,
        quality_score: 0.96, has_code: false,
        emb_list_vector: [0.1, 0.2, 0.3, 0.4], emb: [0.1, 0.2, 0.3, 0.4],
      },
      {
        text: 'Use MAX_SIM metrics for EmbeddingList search.', section: 'index', page: 2,
        quality_score: 0.91, has_code: true,
        emb_list_vector: [0.16, 0.24, 0.35, 0.45], emb: [0.16, 0.24, 0.35, 0.45],
      },
    ],
  },
  {
    doc_id: 2, title: 'Filtered StructArray search', category: 'filter',
    title_vector: [0.2, 0.18, 0.22, 0.4],
    chunks: [
      {
        text: 'Use element_filter to match scalar conditions within the same Struct element.', section: 'filter', page: 1,
        quality_score: 0.93, has_code: true,
        emb_list_vector: [0.21, 0.18, 0.33, 0.44], emb: [0.21, 0.18, 0.33, 0.44],
      },
      {
        text: 'MATCH_LEAST checks how many elements satisfy a predicate.', section: 'filter', page: 2,
        quality_score: 0.88, has_code: false,
        emb_list_vector: [0.24, 0.22, 0.31, 0.39], emb: [0.24, 0.22, 0.31, 0.39],
      },
    ],
  },
  {
    doc_id: 3, title: 'Element-level search with offsets', category: 'search',
    title_vector: [0.33, 0.11, 0.29, 0.37],
    chunks: [
      {
        text: 'Element-level search can return the offset of the matched Struct element.', section: 'search', page: 1,
        quality_score: 0.95, has_code: false,
        emb_list_vector: [0.32, 0.14, 0.28, 0.41], emb: [0.32, 0.14, 0.28, 0.41],
      },
    ],
  },
];

const res = await client.insert({
  collection_name: "tech_articles",
  data,
});
console.log(res.status.error_code, res.insert_cnt);
```

```csharp
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using Milvus.Client.V2;
using Milvus.Client.V2.Types;
using Milvus.Client.V2.Requests.Dml;

var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var data = new Dictionary<string, object?>[]
{
    new Dictionary<string, object?>
    {
        ["doc_id"] = 1L,
        ["title"] = "StructArray indexing patterns",
        ["category"] = "index",
        ["title_vector"] = new float[] { 0.12f, 0.08f, 0.32f, 0.48f },
        ["chunks"] = new object[]
        {
            new Dictionary<string, object?>
            {
                ["text"] = "Create one index for each vector subfield.",
                ["section"] = "index",
                ["page"] = 1L,
                ["quality_score"] = 0.96f,
                ["has_code"] = false,
                ["emb_list_vector"] = new float[] { 0.1f, 0.2f, 0.3f, 0.4f },
                ["emb"] = new float[] { 0.1f, 0.2f, 0.3f, 0.4f }
            },
            new Dictionary<string, object?>
            {
                ["text"] = "Use MAX_SIM metrics for EmbeddingList search.",
                ["section"] = "index",
                ["page"] = 2L,
                ["quality_score"] = 0.91f,
                ["has_code"] = true,
                ["emb_list_vector"] = new float[] { 0.16f, 0.24f, 0.35f, 0.45f },
                ["emb"] = new float[] { 0.16f, 0.24f, 0.35f, 0.45f }
            }
        }
    },
    new Dictionary<string, object?>
    {
        ["doc_id"] = 2L,
        ["title"] = "Filtered StructArray search",
        ["category"] = "filter",
        ["title_vector"] = new float[] { 0.2f, 0.18f, 0.22f, 0.4f },
        ["chunks"] = new object[]
        {
            new Dictionary<string, object?>
            {
                ["text"] = "Use element_filter to match scalar conditions within the same Struct element.",
                ["section"] = "filter",
                ["page"] = 1L,
                ["quality_score"] = 0.93f,
                ["has_code"] = true,
                ["emb_list_vector"] = new float[] { 0.21f, 0.18f, 0.33f, 0.44f },
                ["emb"] = new float[] { 0.21f, 0.18f, 0.33f, 0.44f }
            },
            new Dictionary<string, object?>
            {
                ["text"] = "MATCH_LEAST checks how many elements satisfy a predicate.",
                ["section"] = "filter",
                ["page"] = 2L,
                ["quality_score"] = 0.88f,
                ["has_code"] = false,
                ["emb_list_vector"] = new float[] { 0.24f, 0.22f, 0.31f, 0.39f },
                ["emb"] = new float[] { 0.24f, 0.22f, 0.31f, 0.39f }
            }
        }
    },
    new Dictionary<string, object?>
    {
        ["doc_id"] = 3L,
        ["title"] = "Element-level search with offsets",
        ["category"] = "search",
        ["title_vector"] = new float[] { 0.33f, 0.11f, 0.29f, 0.37f },
        ["chunks"] = new object[]
        {
            new Dictionary<string, object?>
            {
                ["text"] = "Element-level search can return the offset of the matched Struct element.",
                ["section"] = "search",
                ["page"] = 1L,
                ["quality_score"] = 0.95f,
                ["has_code"] = false,
                ["emb_list_vector"] = new float[] { 0.32f, 0.14f, 0.28f, 0.41f },
                ["emb"] = new float[] { 0.32f, 0.14f, 0.28f, 0.41f }
            }
        }
    }
};

await client.InsertAsync(new InsertReq
{
    CollectionName = "tech_articles",
    RowsData = data
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "data": [
        {
            "doc_id": 1,
            "title": "StructArray indexing patterns",
            "category": "index",
            "title_vector": [
                0.12,
                0.08,
                0.32,
                0.48
            ],
            "chunks": [
                {
                    "text": "Create one index for each vector subfield.",
                    "section": "index",
                    "page": 1,
                    "quality_score": 0.96,
                    "has_code": false,
                    "emb_list_vector": [
                        0.1,
                        0.2,
                        0.3,
                        0.4
                    ],
                    "emb": [
                        0.1,
                        0.2,
                        0.3,
                        0.4
                    ]
                },
                {
                    "text": "Use MAX_SIM metrics for EmbeddingList search.",
                    "section": "index",
                    "page": 2,
                    "quality_score": 0.91,
                    "has_code": true,
                    "emb_list_vector": [
                        0.16,
                        0.24,
                        0.35,
                        0.45
                    ],
                    "emb": [
                        0.16,
                        0.24,
                        0.35,
                        0.45
                    ]
                }
            ]
        },
        {
            "doc_id": 2,
            "title": "Filtered StructArray search",
            "category": "filter",
            "title_vector": [
                0.2,
                0.18,
                0.22,
                0.4
            ],
            "chunks": [
                {
                    "text": "Use element_filter to match scalar conditions within the same Struct element.",
                    "section": "filter",
                    "page": 1,
                    "quality_score": 0.93,
                    "has_code": true,
                    "emb_list_vector": [
                        0.21,
                        0.18,
                        0.33,
                        0.44
                    ],
                    "emb": [
                        0.21,
                        0.18,
                        0.33,
                        0.44
                    ]
                },
                {
                    "text": "MATCH_LEAST checks how many elements satisfy a predicate.",
                    "section": "filter",
                    "page": 2,
                    "quality_score": 0.88,
                    "has_code": false,
                    "emb_list_vector": [
                        0.24,
                        0.22,
                        0.31,
                        0.39
                    ],
                    "emb": [
                        0.24,
                        0.22,
                        0.31,
                        0.39
                    ]
                }
            ]
        },
        {
            "doc_id": 3,
            "title": "Element-level search with offsets",
            "category": "search",
            "title_vector": [
                0.33,
                0.11,
                0.29,
                0.37
            ],
            "chunks": [
                {
                    "text": "Element-level search can return the offset of the matched Struct element.",
                    "section": "search",
                    "page": 1,
                    "quality_score": 0.95,
                    "has_code": false,
                    "emb_list_vector": [
                        0.32,
                        0.14,
                        0.28,
                        0.41
                    ],
                    "emb": [
                        0.32,
                        0.14,
                        0.28,
                        0.41
                    ]
                }
            ]
        }
    ]
}'
```

## Insert into nullable StructArray fields

Run this optional example only if the parent `chunks` field was created with nullable enabled. NULL applies to the entire field, not an individual Struct element or subfield. An empty array is a present value and is not NULL.

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
client.insert(
    collection_name="tech_articles",
    data=[
        {
            "doc_id": 10,
            "title": "Article without chunks yet",
            "category": "draft",
            "title_vector": [0.05, 0.10, 0.15, 0.20],
            "chunks": None,
        }
    ],
)
```

```java
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import io.milvus.v2.service.vector.request.InsertReq;
import java.util.Collections;

JsonObject row = new JsonObject();
row.addProperty("doc_id", 10L);
row.addProperty("title", "Article without chunks yet");
row.addProperty("category", "draft");
row.add("title_vector", JsonParser.parseString("[0.05, 0.10, 0.15, 0.20]"));
row.add("chunks", JsonNull.INSTANCE);

client.insert(InsertReq.builder()
        .collectionName("tech_articles")
        .data(Collections.singletonList(row))
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption("tech_articles").
    WithInt64Column("doc_id", []int64{10}).
    WithVarcharColumn("title", []string{"Article without chunks yet"}).
    WithVarcharColumn("category", []string{"draft"}).
    WithFloatVectorColumn("title_vector", 4, [][]float32{{0.05, 0.10, 0.15, 0.20}}).
    WithStructArrayColumn("chunks", chunksSchema, []map[string]any{nil}))
if err != nil {
    panic(err)
}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let row = json!({
    "doc_id": 10,
    "title": "Article without chunks yet",
    "category": "draft",
    "title_vector": [0.05, 0.10, 0.15, 0.20],
    "chunks": null,
});
let request = InsertRequest::builder()
    .collection_name("tech_articles")
    .rows(vec![row.as_object().cloned().unwrap()])
    .build()?;
client.insert(request).await?;
```

```cpp
nlohmann::json row = {
    {"doc_id", 10},
    {"title", "Article without chunks yet"},
    {"category", "draft"},
    {"title_vector", std::vector<float>{0.05f, 0.10f, 0.15f, 0.20f}},
    {"chunks", nullptr},
};

milvus::InsertRequest request;
request.WithCollectionName("tech_articles");
request.AddRowData(std::move(row));

milvus::InsertResponse response;
status = client->Insert(request, response);
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
await client.insert({
  collection_name: "tech_articles",
  data: [
    { doc_id: 10, title: "Article without chunks yet", category: "draft", title_vector: [0.05, 0.10, 0.15, 0.20], chunks: null },
  ],
});
```

```csharp
using Milvus.Client.V2.Requests.Dml;

await client.InsertAsync(new InsertReq
{
    CollectionName = "tech_articles",
    RowsData =
    [
        new Dictionary<string, object?>
        {
            ["doc_id"] = 10L,
            ["title"] = "Article without chunks yet",
            ["category"] = "draft",
            ["title_vector"] = new[] { 0.05f, 0.10f, 0.15f, 0.20f },
            ["chunks"] = null
        }
    ]
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "data": [
        {
            "doc_id": 10,
            "title": "Article without chunks yet",
            "category": "draft",
            "title_vector": [0.05, 0.10, 0.15, 0.20],
            "chunks": null
        }
    ]
}'
```

For a non-NULL StructArray value, provide valid values for every required subfield. Do not mix NULL subfield arrays with present subfield arrays in the same entity.

<div class="alert note">

For version and deployment availability, see [StructArray Limits](structarray-limits.md). A StructArray field added to an existing collection must be nullable; existing entities have NULL for the whole added field.

</div>

## Validate inserted data

Before loading the collection, create the required vector indexes as described in [Index StructArray Fields](index-structarray-fields.md). The following examples wait for loading to complete, then query selected subfields. For cURL, install `jq` to check the load-state response. With bounded-staleness consistency, a query immediately after insertion may not include the new rows; repeat it after the writes become visible, or configure strong consistency when creating the example collection.

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
client.load_collection("tech_articles")

rows = client.query(
    collection_name="tech_articles",
    filter="doc_id in [1, 2, 3]",
    output_fields=[
        "doc_id",
        "title",
        "chunks[text]",
        "chunks[section]",
        "chunks[quality_score]",
    ],
)

for row in rows:
    print(row)
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import java.util.Arrays;

client.loadCollection(LoadCollectionReq.builder()
        .collectionName("tech_articles")
        .build());

QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName("tech_articles")
        .filter("doc_id in [1, 2, 3]")
        .outputFields(Arrays.asList("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
        .build());
System.out.println(queryResp.getQueryResults());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("tech_articles"))
if err != nil {
    panic(err)
}
if err := loadTask.Await(ctx); err != nil {
    panic(err)
}

rs, err := cli.Query(ctx, milvusclient.NewQueryOption("tech_articles").
    WithFilter("doc_id in [1, 2, 3]").
    WithOutputFields("doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"))
if err != nil {
    panic(err)
}
fmt.Printf("query returned %d rows\n", rs.ResultCount)
```

```rust
use milvus::v2::prelude::*;

client.load_collection(LoadCollectionRequest::builder()
    .collection_name("tech_articles")
    .sync(true)
    .build()?).await?;

let resp = client.query(QueryRequest::builder()
    .collection_name("tech_articles")
    .filter("doc_id in [1, 2, 3]")
    .output_fields(vec!["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"])
    .build()?).await?;
println!("query rows: {}", resp.results().get_output_field("doc_id").map(|f| f.len()).unwrap_or(0));
```

```cpp
milvus::LoadCollectionRequest load_req;
load_req.WithCollectionName("tech_articles");
status = client->LoadCollection(load_req);
if (!status.IsOk()) { throw std::runtime_error(status.Message()); }

milvus::QueryRequest query_req;
query_req.WithCollectionName("tech_articles")
         .WithFilter("doc_id in [1, 2, 3]")
         .WithOutputFields({"doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"});
milvus::QueryResponse query_resp;
status = client->Query(query_req, query_resp);
if (!status.IsOk()) { throw std::runtime_error(status.Message()); }

milvus::EntityRows output_rows;
status = query_resp.Results().OutputRows(output_rows);
if (!status.IsOk()) { throw std::runtime_error(status.Message()); }
for (const auto& row : output_rows) { std::cout << row << std::endl; }
```

```javascript
await client.loadCollection({ collection_name: "tech_articles" });

const rows = await client.query({
  collection_name: "tech_articles",
  filter: "doc_id in [1, 2, 3]",
  output_fields: ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"],
});
console.log(rows.data.length);
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

await client.LoadCollectionAsync(new LoadCollectionReq
{
    CollectionName = "tech_articles"
});

QueryResp rows = await client.QueryAsync(new QueryReq
{
    CollectionName = "tech_articles",
    Expression = "doc_id in [1, 2, 3]",
    Parameters = new QueryParameters { OutputFields = { "doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]" } }
});

Console.WriteLine($"rows: {rows.FieldsData.FirstOrDefault()?.RowCount ?? 0}");
```

```bash
set -euo pipefail

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --fail-with-body --silent --show-error --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data-raw '{"collectionName":"tech_articles"}' | jq -e '.code == 0' >/dev/null

loaded=false
for attempt in $(seq 1 60); do
  state=$(curl --fail-with-body --silent --show-error --request POST \
    --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
    --header "Authorization: Bearer ${TOKEN}" \
    --header "Content-Type: application/json" \
    --data-raw '{"collectionName":"tech_articles"}' | jq -er 'if .code == 0 then .data.loadState else error("load-state request failed") end')
  if [ "$state" = "LoadStateLoaded" ]; then
    loaded=true
    break
  fi
  sleep 1
done
[ "$loaded" = true ] || { echo "Collection did not finish loading" >&2; exit 1; }

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "tech_articles",
    "filter": "doc_id in [1, 2, 3]",
    "outputFields": ["doc_id", "title", "chunks[text]", "chunks[section]", "chunks[quality_score]"]
}'
```

Use StructArray field paths, such as `chunks[text]`, only when you query, search, filter, or create indexes. Insert payloads should still use nested objects under `chunks`.

## Insert rules

| Rule | Explanation |
| --- | --- |
| Use an array of objects for a StructArray field. | The value of `chunks` is a list, and each item in the list is a Struct element. |
| Use subfield names inside each Struct element. | Insert `{"text": "...", "emb": [...]}` inside `chunks`, not `{"chunks[text]": "..."}`. |
| Match the Struct schema. | Each Struct element must use the subfields defined in the Struct schema. |
| Match vector dimensions. | Vector values must match the `dim` configured for their vector subfields. |
| Respect `max_capacity`. | The number of Struct elements in one entity must not exceed the `max_capacity` of the StructArray field. |
| Use separate vector subfields for separate search modes. | If both EmbeddingList search and element-level search are required, write vector values to both vector subfields. |
| Use `null` only when the field is nullable. | Non-nullable StructArray fields require valid StructArray values. |

## Common mistakes

- Using field paths such as `chunks[text]` in insert payloads.

- Omitting required subfields from a Struct element.

- Inserting vectors with the wrong dimension.

- Inserting more Struct elements than `max_capacity` allows.

- Setting only one subfield to `null` while other subfields in the same StructArray value are valid.

- Writing vectors only to `emb_list_vector` and then trying to run element-level search on `chunks[emb]`.

- Writing vectors only to `emb` and then trying to run EmbeddingList search on `chunks[emb_list_vector]`.

## Next steps

1. To create indexes for `chunks[emb_list_vector]`, `chunks[emb]`, and scalar subfields, read [Index StructArray Fields](index-structarray-fields.md).

2. To search StructArray vector subfields, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

3. To review nullable behavior and version-specific limitations, read [StructArray Limits](structarray-limits.md).
