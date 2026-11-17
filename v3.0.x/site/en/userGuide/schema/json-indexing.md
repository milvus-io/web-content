---
id: json-indexing.md
title: "JSON Indexing"
summary: "Choose a JSON path and cast, check JSON-specific requirements, and create path indexes."
---

# JSON Indexing

JSON path indexes accelerate filters on selected keys in a [JSON field](json-field-overview.md). This guide covers the path and cast settings, supported combinations, and creation steps specific to JSON. For general index selection and automatic-selection rules, see [Scalar Index](scalar_index.md).

For documents with diverse query paths, consider [JSON Shredding](json-shredding.md).

<a id="Index-type-overview"></a>

## Before you create an index

### Understand cast types

Choose the key to index with `json_path`, such as `metadata["price"]`. Set `json_cast_type` to the type of values at that path; the field schema remains `JSON`. The cast is required for both explicit indexes and `AUTOINDEX`. If you omit `json_path`, Milvus uses the field name supplied in the request.

<a id="Choose-an-index-type"></a>
<a id="Compatibility-reference"></a>
<a id="How-do-I-choose-between-AUTOINDEX-and-an-explicit-index-type"></a>
<a id="INVERTED"></a>
<a id="STLSORT"></a>
<a id="BITMAP"></a>
<a id="NGRAM"></a>

Choose a cast and one of its supported index types. This table lists the JSON path combinations supported in Milvus 3.0.6 with the default automatic type mapping; options marked * require the [opt-in setup](#Index-requirements):

| Cast type | Values at the path | Supported index types |
| --- | --- | --- |
| `BOOL` | Boolean, such as `true` | `AUTOINDEX`, `INVERTED`, `BITMAP`* |
| `DOUBLE` | Number, such as `99.99` | `AUTOINDEX`, `INVERTED`, `STL_SORT`* |
| `VARCHAR` | String, such as `"electronics"` | `AUTOINDEX`, `INVERTED`, `STL_SORT`*, `BITMAP`*, `NGRAM` |
| `ARRAY_BOOL` | Boolean array, such as `[true, false]` | `INVERTED` |
| `ARRAY_DOUBLE` | Number array, such as `[1.2, 3.14]` | `INVERTED` |
| `ARRAY_VARCHAR` | String array, such as `["tag1", "tag2"]` | `INVERTED` |

<a id="What-if-a-JSON-key-has-inconsistent-data-types-across-different-entities"></a>

Only values matching the cast are indexed. For example, a `DOUBLE` cast indexes `99.99` but skips `"99.99"`. To convert numeric strings during indexing, use `json_cast_function="STRING_TO_DOUBLE"` with a `DOUBLE` cast, as shown in [Example 5](#Example-5-Convert-data-type-at-index-time). This function cannot be used with other casts; values that fail conversion are skipped.

### Index requirements

<a id="Can-I-create-multiple-indexes-on-the-same-JSON-key"></a>
<a id="What-happens-if-a-querys-filter-expression-uses-a-different-type-than-the-indexed-cast-type"></a>

Check these conditions before creating an index:

- **One index per path:** Each `(field, json_path)` pair supports at most one index across all cast and index types.
- **Matching query types:** A query must target the indexed path with a compatible value type to use the index. Incompatible filters can fall back to scanning.
- **Array casts:** Specify `INVERTED` explicitly for `ARRAY_BOOL`, `ARRAY_DOUBLE`, and `ARRAY_VARCHAR`. The default automatic type mapping does not accept these casts.
- **String-pattern indexes:** For a `NGRAM` index, use a `VARCHAR` cast and supply `min_gram` and `max_gram`. See [NGRAM on a JSON path](ngram.md#Example-2-Create-on-a-JSON-path) for parameters and creation examples.

<a id="AUTOINDEX"></a>

JSON scalar `BITMAP`, `STL_SORT`, and cardinality-based automatic selection are available from Milvus 3.0.0. Before using the options marked * or cardinality-based `AUTOINDEX`, have your administrator complete the [index opt-in setup in the compatibility notes](release_notes.md#Compatibility-and-behavior-notes).

<div class="alert note">

> Without the opt-in setup, `AUTOINDEX` uses `INVERTED` for scalar JSON paths, and explicit JSON `BITMAP` or `STL_SORT` requests fail. `INVERTED` and `NGRAM` do not require this setup. For automatic-selection rules and administrator overrides, see [AUTOINDEX behavior](scalar_index.md#AUTOINDEX-behavior).

</div>

<details id="Supported-filters">
<summary><strong>JSON filter execution details</strong></summary>

For scalar comparisons and string patterns, follow the selected index's [filter capabilities](scalar_index.md#Index-types). String filter syntax and planning rules are described in [Pattern Matching](pattern-matching.md).

JSON-specific operations have these additional behaviors:

| Filter | JSON path index behavior |
| --- | --- |
| `JSON_CONTAINS`, `JSON_CONTAINS_ANY`, `JSON_CONTAINS_ALL` | An `INVERTED` index on a typed array path can look up compatible elements. Mixed-type or nested-array operands can fall back to scanning. |
| `exists`, such as `exists metadata["price"]` | Can use an indexed path to test its presence. This differs from comparing the value or testing whether the entire field is NULL. |

For expression syntax, see [JSON Operators](json-operators.md).

</details>

## Create a JSON index

The examples use a connected client and a collection with a `JSON` field named `metadata`, containing data shaped as follows:

### Sample JSON structure

```json
{
  "metadata": {
    "category": "electronics",
    "brand": "BrandA",
    "in_stock": true,
    "price": 99.99,
    "string_price": "99.99",
    "tags": ["clearance", "summer_sale"],
    "supplier": {
      "name": "SupplierX",
      "country": "USA",
      "contact": {
        "email": "support@supplierx.com",
        "phone": "+1-800-555-0199"
      }
    }
  }
}
```

### Basic setup

For connection and collection setup, expand the following block:

<details>

<summary><strong>Connect and create a sample collection</strong></summary>

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
from pymilvus import DataType, MilvusClient

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Define a schema with a JSON field
schema = client.create_schema(enable_dynamic_field=False)
schema.add_field("pk", DataType.INT64, is_primary=True, auto_id=False)
schema.add_field("vec", DataType.FLOAT_VECTOR, dim=4)
schema.add_field("metadata", DataType.JSON, nullable=True)

# Minimal vector index so the collection can be loaded
vec_index = client.prepare_index_params()
vec_index.add_index(field_name="vec", index_type="AUTOINDEX", metric_type="L2")

client.create_collection(
    collection_name="your_collection_name",
    schema=schema,
    index_params=vec_index,
)

# Insert one row that matches the sample JSON structure above
client.insert(
    collection_name="your_collection_name",
    data=[{
        "pk": 1,
        "vec": [0.1, 0.2, 0.3, 0.4],
        "metadata": {
            "category": "electronics",
            "brand": "BrandA",
            "in_stock": True,
            "price": 99.99,
            "string_price": "99.99",
            "tags": ["clearance", "summer_sale"],
            "supplier": {
                "name": "SupplierX",
                "country": "USA",
                "contact": {
                    "email": "support@supplierx.com",
                    "phone": "+1-800-555-0199"
                }
            }
        }
    }],
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.util.*;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// Define a schema with a JSON field
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(false);
schema.addField(AddFieldReq.builder().fieldName("pk").dataType(DataType.Int64).isPrimaryKey(true).autoID(false).build());
schema.addField(AddFieldReq.builder().fieldName("vec").dataType(DataType.FloatVector).dimension(4).build());
schema.addField(AddFieldReq.builder().fieldName("metadata").dataType(DataType.JSON).isNullable(true).build());

// Minimal vector index so the collection can be loaded
List<IndexParam> vecIndex = new ArrayList<>();
vecIndex.add(IndexParam.builder()
        .fieldName("vec")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName("your_collection_name")
        .collectionSchema(schema)
        .indexParams(vecIndex)
        .build());

// Insert one row that matches the sample JSON structure above
Gson gson = new Gson();
JsonObject metadata = gson.fromJson("{"
        + "\"category\": \"electronics\","
        + "\"brand\": \"BrandA\","
        + "\"in_stock\": true,"
        + "\"price\": 99.99,"
        + "\"string_price\": \"99.99\","
        + "\"tags\": [\"clearance\", \"summer_sale\"],"
        + "\"supplier\": {"
        + "    \"name\": \"SupplierX\","
        + "    \"country\": \"USA\","
        + "    \"contact\": {"
        + "        \"email\": \"support@supplierx.com\","
        + "        \"phone\": \"+1-800-555-0199\""
        + "    }"
        + "}"
        + "}", JsonObject.class);
JsonObject row = new JsonObject();
row.addProperty("pk", 1L);
row.add("vec", gson.toJsonTree(Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f)));
row.add("metadata", metadata);

client.insert(InsertReq.builder()
        .collectionName("your_collection_name")
        .data(Collections.singletonList(row))
        .build());
```

```go
package main

import (
    "context"
    "log"

    "github.com/milvus-io/milvus/client/v3/column"
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
    log.Fatal(err)
}
defer cli.Close(ctx)

// Define a schema with a JSON field
schema := entity.NewSchema().WithDynamicFieldEnabled(false).
    WithField(entity.NewField().WithName("pk").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(false)).
    WithField(entity.NewField().WithName("vec").WithDataType(entity.FieldTypeFloatVector).WithDim(4)).
    WithField(entity.NewField().WithName("metadata").WithDataType(entity.FieldTypeJSON).WithNullable(true))

// Minimal vector index so the collection can be loaded
vecIndex := milvusclient.NewCreateIndexOption("your_collection_name", "vec", index.NewAutoIndex(entity.L2))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("your_collection_name", schema).
    WithIndexOptions(vecIndex))
if err != nil {
    log.Fatal(err)
}

// Insert one row that matches the sample JSON structure above
metadata := []byte(`{
    "category": "electronics",
    "brand": "BrandA",
    "in_stock": true,
    "price": 99.99,
    "string_price": "99.99",
    "tags": ["clearance", "summer_sale"],
    "supplier": {
        "name": "SupplierX",
        "country": "USA",
        "contact": {
            "email": "support@supplierx.com",
            "phone": "+1-800-555-0199"
        }
    }
}`)
result, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption("your_collection_name").
    WithInt64Column("pk", []int64{1}).
    WithFloatVectorColumn("vec", 4, [][]float32{{0.1, 0.2, 0.3, 0.4}}).
    WithColumns(column.NewColumnJSONBytes("metadata", [][]byte{metadata})))
if err != nil {
    log.Fatal(err)
}
log.Printf("inserted %d rows", result.InsertCount)
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

// Define a schema with a JSON field
let schema = CollectionSchema::new()
    .add_field(FieldSchema::new().name("pk").data_type(DataType::Int64).primary_key(true).auto_id(false))
    .add_field(FieldSchema::new().name("vec").data_type(DataType::FloatVector).dimension(4))
    .add_field(FieldSchema::new().name("metadata").data_type(DataType::Json).nullable(true));

client.create_collection(
    CreateCollectionRequest::builder()
        .collection_name("your_collection_name")
        .schema(schema)
        .build()?,
)
.await?;

// Minimal vector index so the collection can be loaded
let vec_index = IndexParam::new()
    .field_name("vec")
    .index_type(IndexType::AutoIndex)
    .metric_type(MetricType::L2);

client.create_index(
    CreateIndexRequest::builder()
        .collection_name("your_collection_name")
        .index_params(vec![vec_index])
        .build()?,
)
.await?;

// Insert one row that matches the sample JSON structure above
let row = json!({
    "pk": 1,
    "vec": [0.1f32, 0.2, 0.3, 0.4],
    "metadata": {
        "category": "electronics",
        "brand": "BrandA",
        "in_stock": true,
        "price": 99.99,
        "string_price": "99.99",
        "tags": ["clearance", "summer_sale"],
        "supplier": {
            "name": "SupplierX",
            "country": "USA",
            "contact": {
                "email": "support@supplierx.com",
                "phone": "+1-800-555-0199"
            }
        }
    }
});
client.insert(
    InsertRequest::builder()
        .collection_name("your_collection_name")
        .rows(vec![row])
        .build()?,
)
.await?;
```

```cpp
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Define a schema with a JSON field
milvus::CollectionSchema schema("your_collection_name");
schema.AddField(milvus::FieldSchema("pk", milvus::DataType::INT64, "", true, false));
schema.AddField(milvus::FieldSchema("vec", milvus::DataType::FLOAT_VECTOR, "").WithDimension(4));
schema.AddField(milvus::FieldSchema("metadata", milvus::DataType::JSON, "").WithNullable(true));

// Minimal vector index so the collection can be loaded
milvus::IndexDesc vec_index("vec", "vec_index", milvus::IndexType::AUTOINDEX, milvus::MetricType::L2);

status = client->CreateCollection(milvus::CreateCollectionRequest()
    .WithCollectionName("your_collection_name")
    .WithCollectionSchema(std::make_shared<milvus::CollectionSchema>(schema)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->CreateIndex(milvus::CreateIndexRequest()
    .WithCollectionName("your_collection_name")
    .WithIndexes({std::move(vec_index)})
    .WithSync(true));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Insert one row that matches the sample JSON structure above
milvus::InsertRequest insert_req;
insert_req.WithCollectionName("your_collection_name");
insert_req.AddRowData({{"pk", 1},
                       {"vec", std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f}},
                       {"metadata", nlohmann::json::parse(R"({
                            "category": "electronics",
                            "brand": "BrandA",
                            "in_stock": true,
                            "price": 99.99,
                            "string_price": "99.99",
                            "tags": ["clearance", "summer_sale"],
                            "supplier": {
                                "name": "SupplierX",
                                "country": "USA",
                                "contact": {
                                    "email": "support@supplierx.com",
                                    "phone": "+1-800-555-0199"
                                }
                            }
                        })")}});
milvus::InsertResponse insert_resp;
status = client->Insert(insert_req, insert_resp);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

// Define a schema with a JSON field
const fields = [
  { name: "pk", data_type: DataType.Int64, is_primary_key: true, autoID: false },
  { name: "vec", data_type: DataType.FloatVector, type_params: { dim: "4" } },
  { name: "metadata", data_type: DataType.JSON, nullable: true },
];

// Minimal vector index so the collection can be loaded
const indexParams = [
  { field_name: "vec", index_name: "vec_index", index_type: "AUTOINDEX", metric_type: "L2" },
];

await client.createCollection({
  collection_name: "your_collection_name",
  fields,
  index_params: indexParams,
});

// Insert one row that matches the sample JSON structure above
await client.insert({
  collection_name: "your_collection_name",
  data: [
    {
      pk: 1,
      vec: [0.1, 0.2, 0.3, 0.4],
      metadata: {
        category: "electronics",
        brand: "BrandA",
        in_stock: true,
        price: 99.99,
        string_price: "99.99",
        tags: ["clearance", "summer_sale"],
        supplier: {
          name: "SupplierX",
          country: "USA",
          contact: {
            email: "support@supplierx.com",
            phone: "+1-800-555-0199",
          },
        },
      },
    },
  ],
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

using var client = new MilvusClientV2(new ConnectConfig { Uri = "http://localhost:19530", ApiKey = "root:Milvus" });
await client.ConnectAsync();

// Define a schema with a JSON field
var schema = new CollectionSchema
{
    Fields =
    {
        new FieldSchema("pk", DataType.Int64, isPrimaryKey: true, autoId: false),
        FieldSchema.CreateFloatVector("vec", dimension: 4),
        new FieldSchema("metadata", DataType.Json) { Nullable = true }
    }
};

// Minimal vector index so the collection can be loaded
await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "your_collection_name",
    Schema = schema,
    Indexes = new[]
    {
        new IndexParam("vec", "vec_index", IndexType.AutoIndex, MetricType.L2)
    }
});

// Insert one row that matches the sample JSON structure above
await client.InsertAsync(new InsertReq
{
    CollectionName = "your_collection_name",
    RowsData = new[]
    {
        new Dictionary<string, object?>
        {
            ["pk"] = 1L,
            ["vec"] = new[] { 0.1f, 0.2f, 0.3f, 0.4f },
            ["metadata"] = new Dictionary<string, object?>
            {
                ["category"] = "electronics",
                ["brand"] = "BrandA",
                ["in_stock"] = true,
                ["price"] = 99.99,
                ["string_price"] = "99.99",
                ["tags"] = new[] { "clearance", "summer_sale" },
                ["supplier"] = new Dictionary<string, object?>
                {
                    ["name"] = "SupplierX",
                    ["country"] = "USA",
                    ["contact"] = new Dictionary<string, object?>
                    {
                        ["email"] = "support@supplierx.com",
                        ["phone"] = "+1-800-555-0199"
                    }
                }
            }
        }
    }
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "your_collection_name",
    "schema": {
      "autoID": false,
      "enableDynamicField": false,
      "fields": [
        {"fieldName": "pk", "dataType": "Int64", "isPrimary": true},
        {"fieldName": "vec", "dataType": "FloatVector", "elementTypeParams": {"dim": 4}},
        {"fieldName": "metadata", "dataType": "JSON", "nullable": true}
      ]
    },
    "indexParams": [
      {"fieldName": "vec", "indexName": "vec_index", "indexType": "AUTOINDEX", "metricType": "L2"}
    ]
  }'
```

</details>

Prepare an index-params object to collect the index definitions added in the examples below:

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
index_params = client.prepare_index_params()
```

```java
List<IndexParam> indexParams = new ArrayList<>();
```

```go
var indexOpts []milvusclient.CreateIndexOption
```

```rust
let mut index_params = Vec::new();
```

```cpp
std::vector<milvus::IndexDesc> index_params;
```

```javascript
const indexParams = [];
```

```csharp
using Milvus.Client.V2.Types;

var indexParams = new List<IndexParam>();
```

```bash
# REST creates one index per request; collect the definitions below
export indexParams="[]"
```

Add the definitions that match your data to the same index-params object, then [apply the indexes](#Apply-the-index) in one request.

### Example 1: Index a top-level key with AUTOINDEX

Index `metadata["category"]` with a `VARCHAR` cast and `AUTOINDEX`. The [index requirements](#Index-requirements) explain which automatic-selection mode your deployment uses.

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
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="category_index",
    # highlight-start
    params={
        "json_path": 'metadata["category"]',
        "json_cast_type": "VARCHAR",
    }
    # highlight-end
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata[\"category\"]");
extraParams.put("json_cast_type", "VARCHAR");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("category_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex1 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `metadata["category"]`).
    WithIndexName("category_index")
indexOpts = append(indexOpts, milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex1).
    WithIndexName("category_index"))
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("category_index")
        .index_type(IndexType::AutoIndex)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata[\"category\"]".to_string()),
            ("json_cast_type".to_string(), "VARCHAR".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc category_index("metadata", "category_index", milvus::IndexType::AUTOINDEX);
category_index.AddExtraParam("json_path", "metadata[\"category\"]");
category_index.AddExtraParam("json_cast_type", "VARCHAR");
index_params.push_back(std::move(category_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "category_index",
  index_type: "AUTOINDEX",
  extra_params: {
    json_path: 'metadata["category"]',
    json_cast_type: "VARCHAR",
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "category_index", IndexType.AutoIndex)
{
    ExtraParams =
    {
        ["json_path"] = "metadata[\"category\"]",
        ["json_cast_type"] = "VARCHAR"
    }
});
```

```bash
export categoryIndex='{
  "fieldName": "metadata",
  "indexName": "category_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"category\\\"]",
    "json_cast_type": "VARCHAR"
  }
}'
```

### Example 2: Index a nested key

Index the deeply nested `email` field for supplier contact lookups. The `json_path` parameter accepts any depth of bracket notation.

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
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="email_index",
    # highlight-start
    params={
        "json_path": 'metadata["supplier"]["contact"]["email"]',
        "json_cast_type": "VARCHAR",
    }
    # highlight-end
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata[\"supplier\"][\"contact\"][\"email\"]");
extraParams.put("json_cast_type", "VARCHAR");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("email_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex2 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `metadata["supplier"]["contact"]["email"]`).
    WithIndexName("email_index")
indexOpts = append(indexOpts, milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex2).
    WithIndexName("email_index"))
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("email_index")
        .index_type(IndexType::AutoIndex)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata[\"supplier\"][\"contact\"][\"email\"]".to_string()),
            ("json_cast_type".to_string(), "VARCHAR".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc email_index("metadata", "email_index", milvus::IndexType::AUTOINDEX);
email_index.AddExtraParam("json_path", "metadata[\"supplier\"][\"contact\"][\"email\"]");
email_index.AddExtraParam("json_cast_type", "VARCHAR");
index_params.push_back(std::move(email_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "email_index",
  index_type: "AUTOINDEX",
  extra_params: {
    json_path: 'metadata["supplier"]["contact"]["email"]',
    json_cast_type: "VARCHAR",
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "email_index", IndexType.AutoIndex)
{
    ExtraParams =
    {
        ["json_path"] = "metadata[\"supplier\"][\"contact\"][\"email\"]",
        ["json_cast_type"] = "VARCHAR"
    }
});
```

```bash
export emailIndex='{
  "fieldName": "metadata",
  "indexName": "email_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"supplier\\\"][\\\"contact\\\"][\\\"email\\\"]",
    "json_cast_type": "VARCHAR"
  }
}'
```

### Example 3: Range queries with STL_SORT

After completing the [opt-in setup](#Index-requirements), index `metadata["price"]` with a `DOUBLE` cast and [STL_SORT](stl-sort.md).

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
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="STL_SORT",
    index_name="price_index",
    params={
        "json_path": 'metadata["price"]',
        "json_cast_type": "DOUBLE",
    }
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata[\"price\"]");
extraParams.put("json_cast_type", "DOUBLE");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("price_index")
        .indexType(IndexParam.IndexType.STL_SORT)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex3 := index.NewJSONPathIndex(index.Sorted, "double", `metadata["price"]`).
    WithIndexName("price_index")
indexOpts = append(indexOpts, milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex3).
    WithIndexName("price_index"))
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("price_index")
        .index_type(IndexType::StlSort)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata[\"price\"]".to_string()),
            ("json_cast_type".to_string(), "DOUBLE".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc price_index("metadata", "price_index", milvus::IndexType::STL_SORT);
price_index.AddExtraParam("json_path", "metadata[\"price\"]");
price_index.AddExtraParam("json_cast_type", "DOUBLE");
index_params.push_back(std::move(price_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "price_index",
  index_type: "STL_SORT",
  extra_params: {
    json_path: 'metadata["price"]',
    json_cast_type: "DOUBLE",
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "price_index", IndexType.StlSort)
{
    ExtraParams =
    {
        ["json_path"] = "metadata[\"price\"]",
        ["json_cast_type"] = "DOUBLE"
    }
});
```

```bash
export priceIndex='{
  "fieldName": "metadata",
  "indexName": "price_index",
  "params": {
    "index_type": "STL_SORT",
    "json_path": "metadata[\\\"price\\\"]",
    "json_cast_type": "DOUBLE"
  }
}'
```

This supports range lookups such as `metadata["price"] > 50 AND metadata["price"] < 100`.

### Example 4: Equality queries with BITMAP

After completing the [opt-in setup](#Index-requirements), index `metadata["in_stock"]` with a `BOOL` cast and [BITMAP](bitmap.md).

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
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="BITMAP",
    index_name="in_stock_index",
    params={
        "json_path": 'metadata["in_stock"]',
        "json_cast_type": "BOOL",
    }
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata[\"in_stock\"]");
extraParams.put("json_cast_type", "BOOL");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("in_stock_index")
        .indexType(IndexParam.IndexType.BITMAP)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex4 := index.NewJSONPathIndex(index.BITMAP, "bool", `metadata["in_stock"]`).
    WithIndexName("in_stock_index")
indexOpts = append(indexOpts, milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex4).
    WithIndexName("in_stock_index"))
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("in_stock_index")
        .index_type(IndexType::Bitmap)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata[\"in_stock\"]".to_string()),
            ("json_cast_type".to_string(), "BOOL".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc in_stock_index("metadata", "in_stock_index", milvus::IndexType::BITMAP);
in_stock_index.AddExtraParam("json_path", "metadata[\"in_stock\"]");
in_stock_index.AddExtraParam("json_cast_type", "BOOL");
index_params.push_back(std::move(in_stock_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "in_stock_index",
  index_type: "BITMAP",
  extra_params: {
    json_path: 'metadata["in_stock"]',
    json_cast_type: "BOOL",
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "in_stock_index", IndexType.Bitmap)
{
    ExtraParams =
    {
        ["json_path"] = "metadata[\"in_stock\"]",
        ["json_cast_type"] = "BOOL"
    }
});
```

```bash
export inStockIndex='{
  "fieldName": "metadata",
  "indexName": "in_stock_index",
  "params": {
    "index_type": "BITMAP",
    "json_path": "metadata[\\\"in_stock\\\"]",
    "json_cast_type": "BOOL"
  }
}'
```

### Example 5: Convert data type at index time

When numeric values are stored as strings, use `STRING_TO_DOUBLE` with a `DOUBLE` cast to convert them during index build.

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
index_params.add_index(
    field_name="metadata",
    # highlight-next-line
    index_type="AUTOINDEX",
    index_name="string_to_double_index",
    params={
        "json_path": 'metadata["string_price"]',
        "json_cast_type": "DOUBLE",
        # highlight-next-line
        "json_cast_function": "STRING_TO_DOUBLE",
    }
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata[\"string_price\"]");
extraParams.put("json_cast_type", "DOUBLE");
extraParams.put("json_cast_function", "STRING_TO_DOUBLE");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("string_to_double_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex5 := index.NewJSONPathIndex(index.AUTOINDEX, "double", `metadata["string_price"]`).
    WithIndexName("string_to_double_index")
opt5 := milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex5).
    WithIndexName("string_to_double_index")
opt5.WithExtraParam("json_cast_function", "STRING_TO_DOUBLE")
indexOpts = append(indexOpts, opt5)
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("string_to_double_index")
        .index_type(IndexType::AutoIndex)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata[\"string_price\"]".to_string()),
            ("json_cast_type".to_string(), "DOUBLE".to_string()),
            ("json_cast_function".to_string(), "STRING_TO_DOUBLE".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc string_to_double_index("metadata", "string_to_double_index", milvus::IndexType::AUTOINDEX);
string_to_double_index.AddExtraParam("json_path", "metadata[\"string_price\"]");
string_to_double_index.AddExtraParam("json_cast_type", "DOUBLE");
string_to_double_index.AddExtraParam("json_cast_function", "STRING_TO_DOUBLE");
index_params.push_back(std::move(string_to_double_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "string_to_double_index",
  index_type: "AUTOINDEX",
  extra_params: {
    json_path: 'metadata["string_price"]',
    json_cast_type: "DOUBLE",
    json_cast_function: "STRING_TO_DOUBLE",
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "string_to_double_index", IndexType.AutoIndex)
{
    ExtraParams =
    {
        ["json_path"] = "metadata[\"string_price\"]",
        ["json_cast_type"] = "DOUBLE",
        ["json_cast_function"] = "STRING_TO_DOUBLE"
    }
});
```

```bash
export stringToDoubleIndex='{
  "fieldName": "metadata",
  "indexName": "string_to_double_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"string_price\\\"]",
    "json_cast_type": "DOUBLE",
    "json_cast_function": "STRING_TO_DOUBLE"
  }
}'
```

For conversion and skipped-value behavior, see [Understand cast types](#Understand-cast-types).


### Apply the index

After adding all your index parameters, apply them to your collection:

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
client.create_index(
    collection_name="your_collection_name",
    index_params=index_params
)
```

```java
import io.milvus.v2.service.index.request.CreateIndexReq;

client.createIndex(CreateIndexReq.builder()
        .collectionName("your_collection_name")
        .indexParams(indexParams)
        .build());
```

```go
import "log"

for _, opt := range indexOpts {
    _, err := cli.CreateIndex(ctx, opt)
    if err != nil {
        log.Fatal(err)
    }
}
```

```rust
use milvus::v2::prelude::*;

client.create_index(
    CreateIndexRequest::builder()
        .collection_name("your_collection_name")
        .index_params(index_params)
        .build()?,
)
.await?;
```

```cpp
#include <iostream>
#include <utility>
#include "milvus/MilvusClientV2.h"

status = client->CreateIndex(milvus::CreateIndexRequest()
    .WithCollectionName("your_collection_name")
    .WithIndexes(std::move(index_params))
    .WithSync(true));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.createIndex(indexParams);
```

```csharp
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "your_collection_name",
    Indexes = indexParams
});
```

```bash
export indexParams="[
  $categoryIndex,
  $emailIndex,
  $priceIndex,
  $inStockIndex,
  $stringToDoubleIndex,
  $metadataFullIndex,
  $supplierIndex
]"
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data "{
    \"collectionName\": \"your_collection_name\",
    \"indexParams\": $indexParams
  }"
```

After submitting the definitions, check each index's build state. The `state` field reports `Finished` when the build is complete; `total_rows`, `indexed_rows`, and `pending_index_rows` report progress:

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
client.describe_index(
    collection_name="your_collection_name",
    index_name="category_index",
)
```

```java
import io.milvus.v2.service.index.request.DescribeIndexReq;
import io.milvus.v2.service.index.response.DescribeIndexResp;

DescribeIndexResp descResp = client.describeIndex(DescribeIndexReq.builder()
        .collectionName("your_collection_name")
        .indexName("category_index")
        .build());
System.out.println(descResp);
```

```go
import (
    "log"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

desc, err := cli.DescribeIndex(ctx, milvusclient.NewDescribeIndexOption("your_collection_name", "category_index"))
if err != nil {
    log.Fatal(err)
}
log.Printf("state=%s totalRows=%d indexedRows=%d", desc.State, desc.TotalRows, desc.IndexedRows)
```

```rust
use milvus::v2::prelude::*;

let desc = client
    .describe_index(
        DescribeIndexRequest::builder()
            .collection_name("your_collection_name")
            .index_name("category_index")
            .build()?,
    )
    .await?;
println!("{:?}", desc);
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

milvus::DescribeIndexRequest describe_req;
describe_req.WithCollectionName("your_collection_name");
describe_req.WithIndexName("category_index");
milvus::DescribeIndexResponse describe_resp;
status = client->DescribeIndex(describe_req, describe_resp);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.describeIndex({ collection_name: "your_collection_name", index_name: "category_index" });
```

```csharp
using Milvus.Client.V2.Requests.Index;

var describeResp = await client.DescribeIndexAsync(new DescribeIndexReq
{
    CollectionName = "your_collection_name",
    IndexName = "category_index"
});
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/describe" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "your_collection_name",
    "indexName": "category_index"
  }'
```

Sample response:

```json
{
  "json_path": "metadata[\"category\"]",
  "json_cast_type": "VARCHAR",
  "index_type": "AUTOINDEX",
  "field_name": "metadata",
  "index_name": "category_index",
  "total_rows": 20,
  "indexed_rows": 20,
  "pending_index_rows": 0,
  "state": "Finished"
}
```

Once `state` reports `Finished`, the index is available to queries with compatible filters.

For `AUTOINDEX` entries, the `index_type` field in this response is reported as `AUTOINDEX`. The response does not identify the underlying index layout. For the selection rules, see [AUTOINDEX behavior](scalar_index.md#AUTOINDEX-behavior); the [path and cast requirements](#Index-requirements) still apply.

<a id="FAQ"></a>

<details id="How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold">
<summary><strong>Advanced: Tune automatic selection for a JSON path</strong></summary>

This example changes the cardinality threshold for `metadata["category"]`. It requires cardinality-based `AUTOINDEX`; check the [index requirements](#Index-requirements) before using it. For the parameter range, layout choices, and explicit-index behavior, see [Cardinality threshold](scalar_index.md#Cardinality-threshold):

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
index_params.add_index(
    field_name="metadata",
    index_type="AUTOINDEX",
    index_name="category_index",
    params={
        "json_path": 'metadata["category"]',
        "json_cast_type": "VARCHAR",
        # highlight-next-line
        "bitmap_cardinality_limit": 200,  # use BITMAP for fewer than 200 distinct values
    }
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata[\"category\"]");
extraParams.put("json_cast_type", "VARCHAR");
extraParams.put("bitmap_cardinality_limit", 200);
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("category_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex8 := index.NewJSONPathIndex(index.AUTOINDEX, "varchar", `metadata["category"]`).
    WithIndexName("category_index")
opt8 := milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex8).
    WithIndexName("category_index")
opt8.WithExtraParam("bitmap_cardinality_limit", "200")
indexOpts = append(indexOpts, opt8)
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("category_index")
        .index_type(IndexType::AutoIndex)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata[\"category\"]".to_string()),
            ("json_cast_type".to_string(), "VARCHAR".to_string()),
            ("bitmap_cardinality_limit".to_string(), "200".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc category_limit_index("metadata", "category_index", milvus::IndexType::AUTOINDEX);
category_limit_index.AddExtraParam("json_path", "metadata[\"category\"]");
category_limit_index.AddExtraParam("json_cast_type", "VARCHAR");
category_limit_index.AddExtraParam("bitmap_cardinality_limit", "200");
index_params.push_back(std::move(category_limit_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "category_index",
  index_type: "AUTOINDEX",
  extra_params: {
    json_path: 'metadata["category"]',
    json_cast_type: "VARCHAR",
    bitmap_cardinality_limit: 200,
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "category_index", IndexType.AutoIndex)
{
    ExtraParams =
    {
        ["json_path"] = "metadata[\"category\"]",
        ["json_cast_type"] = "VARCHAR",
        ["bitmap_cardinality_limit"] = "200" // use BITMAP for fewer than 200 distinct values
    }
});
```

```bash
export categoryLimitIndex='{
  "fieldName": "metadata",
  "indexName": "category_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"category\\\"]",
    "json_cast_type": "VARCHAR",
    "bitmap_cardinality_limit": 200
  }
}'
```

Apply this definition in place of Example 1, then [apply the index](#Apply-the-index).

</details>
