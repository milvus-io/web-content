---
id: json-indexing.md
title: "JSON Indexing"
summary: "JSON fields provide a flexible way to store structured metadata in Milvus. Without indexing, queries on JSON fields require full collection scans, which become slow as your dataset grows. JSON indexing creates indexes on specific paths within your JSON data so equality, range, and other filter queries on those paths run fast."
---

# JSON Indexing

JSON fields provide a flexible way to store structured metadata in Milvus. Without indexing, queries on JSON fields require full collection scans, which become slow as your dataset grows. JSON indexing creates an index on a specific path within your JSON data so equality, range, and other filter queries on that path run fast.

JSON indexing is ideal for:

- Structured schemas with consistent, known keys

- Equality, `IN`, range, and text-match queries on specific JSON paths

- Scenarios where you need precise control over which keys are indexed

For complex JSON documents with diverse query patterns, consider [JSON Shredding](json-shredding.md) as an alternative.

## Index type overview

Milvus offers four index types for JSON paths. Each is suited to a different query pattern.

Before choosing an index type, identify the **cast type** for the JSON path. The cast type determines how Milvus interprets the value at that path and which index types are available.

### Understand cast types

`json_cast_type` is the data type used to interpret and index the value at `json_path`. It is different from the field schema type: the field is still a `JSON` field, but each indexed path is treated as a specific scalar, array, or JSON object type.

Choose the cast type that matches the values stored at the path. To check whether a cast type works with a specific index type, see [Compatibility reference](json-indexing.md#Compatibility-reference).

| Cast type | Use when the path value is... | Example value |
| --- | --- | --- |
| `BOOL` | A Boolean value | `true` |
| `DOUBLE` | A numeric value | `99.99` |
| `VARCHAR` | A string value | `"electronics"` |
| `ARRAY_BOOL` | An array of Boolean values | `[true, false]` |
| `ARRAY_DOUBLE` | An array of numeric values | `[1.2, 3.14]` |
| `ARRAY_VARCHAR` | An array of string values | `["tag1", "tag2"]` |
| `JSON` | An entire JSON object or sub-object. Whole-object JSON indexing is deprecated starting in Milvus 3.0.0. | `{"supplier": {"country": "USA"}}` |

If values at the same path have inconsistent types, only values that match the cast type are indexed. For example, if `metadata["price"]` contains both `99.99` and `"99.99"`, an index of the `DOUBLE` cast type includes the numeric value and skips the string value. To convert string values during indexing, use `json_cast_function`; see [Example 5: Convert data type at index time](json-indexing.md#Example-5-Convert-data-type-at-index-time).

### Choose an index type

After you choose a cast type, choose the index type according to your query pattern.

| Query pattern | Recommended index type | Cast type requirement | Notes |
| --- | --- | --- | --- |
| Mixed equality and range filters on scalar values | `AUTOINDEX` | Use `BOOL`, `DOUBLE`, or `VARCHAR`. | Lets Milvus choose the internal index layout based on value cardinality. |
| Filters on values inside JSON arrays | `INVERTED` | Use `ARRAY_BOOL`, `ARRAY_DOUBLE`, or `ARRAY_VARCHAR`. | Required for all array cast types. |
| Whole-object or sub-object indexing (deprecated) | `INVERTED` or `AUTOINDEX` (compatibility only) | Use `JSON`. | Supported for compatibility. For new workloads, create path-specific indexes or consider [JSON Shredding](json-shredding.md). |
| Range filters on numbers or sortable strings | `STL_SORT` or `AUTOINDEX` | Use `DOUBLE` or `VARCHAR`. | Use `STL_SORT` to force a sorted layout; use `AUTOINDEX` when you want automatic selection. |
| Equality or `IN` filters on low-cardinality values | `BITMAP` or `AUTOINDEX` | Use `BOOL` or `VARCHAR`. | Use `BITMAP` to force a bitmap layout. For numeric values, use `AUTOINDEX` or `STL_SORT`. |

When in doubt, start with `AUTOINDEX` for scalar paths. Use `INVERTED` explicitly for array cast types and text-match queries. Whole-object JSON indexing with either `INVERTED` or `AUTOINDEX` remains supported, but it is deprecated starting in Milvus 3.0.0.

### AUTOINDEX

`AUTOINDEX` behavior depends on the `json_cast_type` you specify. In Milvus 3.0, `AUTOINDEX` no longer always resolves to `INVERTED` for JSON path indexes.

| Cast type | `AUTOINDEX` behavior |
| --- | --- |
| `BOOL`, `DOUBLE`, `VARCHAR` | Chooses between `BITMAP` and `STL_SORT` based on value cardinality. |
| `ARRAY_BOOL`, `ARRAY_DOUBLE`, `ARRAY_VARCHAR` | Not supported. Use `INVERTED` explicitly as the index type. |
| `JSON` | Uses `INVERTED` for whole-object or sub-object indexing. This mode is deprecated starting in Milvus 3.0.0. |

For scalar cast types (`BOOL`, `DOUBLE`, and `VARCHAR`), `AUTOINDEX` is the recommended starting point when you want Milvus to choose the internal index layout. During index build, Milvus measures the **cardinality** of the values at the JSON path. Cardinality means the number of distinct values at that path.

Based on cardinality, Milvus chooses one of two internal layouts:

- **Low cardinality**: Values repeat often, such as `metadata["in_stock"]` with `true` and `false`, or `metadata["status"]` with a small set of status strings. Milvus builds a `BITMAP` index internally for fast equality and `IN` filters.

- **High cardinality**: Most values are distinct, such as `metadata["price"]`, `metadata["created_at"]`, or `metadata["product_id"]`. Milvus builds an `STL_SORT` index internally for fast range filters such as `>`, `<`, `>=`, and `<=`.

The default `BITMAP`-vs-`STL_SORT` threshold is **100 distinct values**. You can tune this threshold with `bitmap_cardinality_limit`; see [How do I tune AUTOINDEX's BITMAP-vs-STL_SORT threshold?](json-indexing.md#How-do-I-tune-AUTOINDEXs-BITMAP-vs-STLSORT-threshold).

<div class="alert note">

**Behavior change in Milvus 3.0**. In earlier versions, `AUTOINDEX` on JSON paths always built an `INVERTED` index. From Milvus 3.0, `AUTOINDEX` picks between `BITMAP` and `STL_SORT` for scalar cast types. For `JSON`, `AUTOINDEX` still uses `INVERTED`, although whole-object JSON indexing is deprecated. For array cast types and text-match queries, specify `INVERTED` explicitly.

</div>

### INVERTED

`INVERTED` is the best fit when you need text-match queries or array indexing. It also remains available for deprecated whole-object JSON indexing.

Specify `INVERTED` explicitly when:

- You need to index values inside JSON arrays.

- You maintain an existing index on an entire JSON object or sub-object and want to make the `INVERTED` behavior explicit.

- You want one index type that handles equality, `IN`, range, text-match, and array queries. Whole-object support remains available for compatibility, at the cost of a larger index size.

For existing indexes on entire JSON objects (`json_cast_type="JSON"`), you can continue to use either `INVERTED` or `AUTOINDEX`. `AUTOINDEX` uses `INVERTED` for this cast type. Whole-object JSON indexing is no longer recommended for new workloads.

For details, refer to [INVERTED](inverted.md).

### STL_SORT

`STL_SORT` stores values from a JSON path in sorted order. It is optimized for range filters on numeric values or sortable string values.

`STL_SORT` supports only `DOUBLE` and `VARCHAR` cast types. Use it when:

- Your filters compare values with `>`, `<`, `>=`, or `<=`.

- The indexed values have high cardinality, such as prices, timestamps, IDs, or sortable codes.

- You want to force a sorted layout instead of letting `AUTOINDEX` choose.

`STL_SORT` does not support `BOOL`, `ARRAY_*`, or `JSON` cast types. Use `INVERTED` for arrays. Existing whole-object indexes can continue to use `INVERTED` or `AUTOINDEX`, but whole-object JSON indexing is deprecated.

For details, refer to [STL_SORT](stl-sort.md).

### BITMAP

`BITMAP` creates a compact bitmap for each distinct value at a JSON path. It is optimized for equality and `IN` filters on values that repeat often.

`BITMAP` supports only `BOOL` and `VARCHAR` cast types. Use it when:

- Your filters use `==` or `IN`.

- The indexed values have low cardinality, such as booleans, status values, or a small set of categories.

- You want to force a bitmap layout instead of letting `AUTOINDEX` choose.

`BITMAP` does not support `DOUBLE`, `ARRAY_*`, or `JSON` cast types. For numeric values, use `AUTOINDEX`, `STL_SORT`, or `INVERTED` instead.

For details, refer to [BITMAP](bitmap.md).

### Compatibility reference

Use the following matrix as a quick reference for supported `(cast type, index type)` combinations.

| Cast type | Description | Example value | AUTOINDEX | INVERTED | STL_SORT | BITMAP |
| --- | --- | --- | --- | --- | --- | --- |
| `BOOL` | Boolean values (`true`/`false`). | `true` | Yes | Yes | No | Yes |
| `DOUBLE` | Numeric values (integers or floats). | `99.99` | Yes | Yes | Yes | No |
| `VARCHAR` | String values. | `"electronics"` | Yes | Yes | Yes | Yes |
| `ARRAY_BOOL` | Array of booleans. | `[true, false]` | No | Yes | No | No |
| `ARRAY_DOUBLE` | Array of numbers. | `[1.2, 3.14]` | No | Yes | No | No |
| `ARRAY_VARCHAR` | Array of strings. | `["tag1", "tag2"]` | No | Yes | No | No |
| `JSON` | An entire JSON object or sub-object with automatic type inference and flattening. Deprecated starting in Milvus 3.0.0. | any nested object | Yes (deprecated) | Yes (deprecated) | No | No |

For cells marked `No`, Milvus rejects the request at index-creation time. For array cast types, use `INVERTED` explicitly (`AUTOINDEX` does not cover arrays).

## Create a JSON index

This section walks through indexing different shapes of JSON data. All examples use the sample structure below and assume you already have a collection that includes a `JSON` field named `metadata`.

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

The examples below assume you have a `MilvusClient` named `client` connected to your Milvus deployment, and a collection that already includes a `JSON` field named `metadata`. If you need to set those up from scratch, expand the block below.

<details>

<summary>Connect and create a sample collection</summary>

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

Each example that follows shows one `index_params.add_index(...)` call. Pick the ones that match your data and call them on the same `index_params` object. Then apply everything in a single `client.create_index(...)` call at the end. For details, see [Apply the index](json-indexing.md#Apply-the-index).

### Example 1: Index a top-level key with AUTOINDEX

Index the `category` field for fast filtering by product category. With `AUTOINDEX`, Milvus picks `BITMAP` or `STL_SORT` based on how many distinct categories exist in your data.

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

When you know your queries on a path will be dominated by range comparisons (`>`, `<`, `>=`, `<=`), pick `STL_SORT` directly. This bypasses cardinality measurement and builds the sorted layout immediately.

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

After indexing, range queries like `metadata["price"] > 50 AND metadata["price"] < 100` use binary search instead of a full scan.

### Example 4: Equality queries with BITMAP

For low-cardinality keys, such as status codes, booleans, or enum-like strings, pick `BITMAP` directly. Equality and `IN` queries become bitmap operations.

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

`BITMAP` is also a strong fit for fields like a `status` column with a handful of distinct string values.

### Example 5: Convert data type at index time

When numeric data is mistakenly stored as strings, use `STRING_TO_DOUBLE` to convert the value to a number during index build.

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

If conversion fails for a row (for example, a non-numeric string like `"invalid"`), that row is skipped during indexing.

### Example 6: Index entire JSON objects

<div class="alert warning">

Starting in Milvus 3.0.0, whole-object JSON indexing (`json_cast_type="JSON"`), also known as JSON flat indexing, is deprecated. Existing indexes and new index-creation requests remain supported for compatibility, but this mode is no longer recommended for new workloads. Create JSON path indexes for known query paths. For complex or evolving JSON documents with broad query patterns, consider [JSON Shredding](json-shredding.md). JSON shredding does not accelerate values inside arrays; use JSON path indexes with array cast types for those queries.

</div>

For compatible existing workloads, setting `json_cast_type="JSON"` indexes the full structure at the given path. Milvus flattens nested objects into paths and automatically infers each value's type. All keys under the path become searchable.

`AUTOINDEX` transparently uses `INVERTED` for `JSON` cast type, since flattening and type inference are inverted-index capabilities.

Index the entire `metadata` object:

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
    index_name="metadata_full_index",
    params={
        # highlight-start
        "json_path": "metadata",
        "json_cast_type": "JSON",
        # highlight-end
    }
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata");
extraParams.put("json_cast_type", "JSON");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("metadata_full_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex6 := index.NewJSONPathIndex(index.AUTOINDEX, "json", `metadata`).
    WithIndexName("metadata_full_index")
indexOpts = append(indexOpts, milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex6).
    WithIndexName("metadata_full_index"))
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("metadata_full_index")
        .index_type(IndexType::AutoIndex)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata".to_string()),
            ("json_cast_type".to_string(), "JSON".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc metadata_full_index("metadata", "metadata_full_index", milvus::IndexType::AUTOINDEX);
metadata_full_index.AddExtraParam("json_path", "metadata");
metadata_full_index.AddExtraParam("json_cast_type", "JSON");
index_params.push_back(std::move(metadata_full_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "metadata_full_index",
  index_type: "AUTOINDEX",
  extra_params: {
    json_path: "metadata",
    json_cast_type: "JSON",
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "metadata_full_index", IndexType.AutoIndex)
{
    ExtraParams =
    {
        ["json_path"] = "metadata",
        ["json_cast_type"] = "JSON"
    }
});
```

```bash
export metadataFullIndex='{
  "fieldName": "metadata",
  "indexName": "metadata_full_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata",
    "json_cast_type": "JSON"
  }
}'
```

Or index a sub-object, such as all `supplier` information:

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
    index_name="supplier_index",
    params={
        # highlight-start
        "json_path": 'metadata["supplier"]',
        "json_cast_type": "JSON",
        # highlight-end
    }
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.HashMap;
import java.util.Map;

Map<String, Object> extraParams = new HashMap<>();
extraParams.put("json_path", "metadata[\"supplier\"]");
extraParams.put("json_cast_type", "JSON");
indexParams.add(IndexParam.builder()
        .fieldName("metadata")
        .indexName("supplier_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .extraParams(extraParams)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/index"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

jsonIndex7 := index.NewJSONPathIndex(index.AUTOINDEX, "json", `metadata["supplier"]`).
    WithIndexName("supplier_index")
indexOpts = append(indexOpts, milvusclient.NewCreateIndexOption("your_collection_name", "metadata", jsonIndex7).
    WithIndexName("supplier_index"))
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

index_params.push(
    IndexParam::new()
        .field_name("metadata")
        .index_name("supplier_index")
        .index_type(IndexType::AutoIndex)
        .extra_params(HashMap::from([
            ("json_path".to_string(), "metadata[\"supplier\"]".to_string()),
            ("json_cast_type".to_string(), "JSON".to_string()),
        ])),
);
```

```cpp
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::IndexDesc supplier_index("metadata", "supplier_index", milvus::IndexType::AUTOINDEX);
supplier_index.AddExtraParam("json_path", "metadata[\"supplier\"]");
supplier_index.AddExtraParam("json_cast_type", "JSON");
index_params.push_back(std::move(supplier_index));
```

```javascript
indexParams.push({
  collection_name: "your_collection_name",
  field_name: "metadata",
  index_name: "supplier_index",
  index_type: "AUTOINDEX",
  extra_params: {
    json_path: 'metadata["supplier"]',
    json_cast_type: "JSON",
  },
});
```

```csharp
using Milvus.Client.V2.Types;

indexParams.Add(new IndexParam("metadata", "supplier_index", IndexType.AutoIndex)
{
    ExtraParams =
    {
        ["json_path"] = "metadata[\"supplier\"]",
        ["json_cast_type"] = "JSON"
    }
});
```

```bash
export supplierIndex='{
  "fieldName": "metadata",
  "indexName": "supplier_index",
  "params": {
    "index_type": "AUTOINDEX",
    "json_path": "metadata[\\\"supplier\\\"]",
    "json_cast_type": "JSON"
  }
}'
```

Indexing entire objects increases index size. For new workloads with deeply nested documents and diverse query patterns, use path-specific indexes or consider [JSON Shredding](json-shredding.md).

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

Index builds run asynchronously. Use `client.describe_index(...)` to check the build state of a specific index. The `state` field shows `Finished` once the build is done, and `total_rows`, `indexed_rows`, and `pending_index_rows` show progress along the way.

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

Once `state` reports `Finished`, queries against the indexed path use the new index automatically.

For `AUTOINDEX` entries, the `index_type` field in this response is reported as `AUTOINDEX`. Milvus does not expose which underlying layout (`BITMAP` or `STL_SORT`) was chosen at build time. Treat the choice as an internal optimization: equality, `IN`, and range queries against the path will work regardless of which layout was selected.

## FAQ

### How do I choose between AUTOINDEX and an explicit index type?

Start with `AUTOINDEX`. It picks the right layout from your data's cardinality, and it covers most equality, `IN`, and range queries on JSON paths. Pick an explicit type when:

- You know your query pattern (for example, always range queries use `STL_SORT`, and always equality queries on low-cardinality values use `BITMAP`) and want to skip cardinality measurement.

- You need text-match or substring queries. Use `INVERTED`.

- You're indexing array cast types. Use `INVERTED` explicitly.

- You're maintaining an existing whole-object JSON index. Both `INVERTED` and `AUTOINDEX` remain supported for compatibility, but whole-object JSON indexing is deprecated starting in Milvus 3.0.0.

### What happens if a query's filter expression uses a different type than the indexed cast type?

If your filter expression uses a different type than the index's `json_cast_type`, Milvus does not use the index and may fall back to a slower brute-force scan if the data allows. For best performance, always align your filter expression with the cast type of the index. For example, if a numeric index is created with `json_cast_type="DOUBLE"`, only numeric filter conditions will leverage the index.

### What if a JSON key has inconsistent data types across different entities?

Inconsistent types can lead to **partial indexing**. For example, if `metadata["price"]` is stored as both a number (`99.99`) and a string (`"99.99"`) and you create an index with `json_cast_type="DOUBLE"`, only the numeric values are indexed. String-form entries are skipped and won't appear in filter results. Use `json_cast_function="STRING_TO_DOUBLE"` to coerce strings to numbers at index time, or fix the source data so all entries share one type.

### Can I create multiple indexes on the same JSON key?

No. Milvus allows at most one index per `(field, json_path)` pair, regardless of cast type or index type. You cannot create both an `INVERTED` and a `BITMAP` index on the same path, or two indexes on the same path with different cast types. You can, however, create an index on the entire JSON object and a separate index on a nested key within that object because those are different paths.

### How do I tune AUTOINDEX's BITMAP-vs-STL_SORT threshold?

By default, `AUTOINDEX` picks `BITMAP` when the indexed values have **100 or fewer distinct values** and `STL_SORT` otherwise. You can override this threshold by adding `"bitmap_cardinality_limit"` to your index parameters (range: 1-1000):

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
        "bitmap_cardinality_limit": 200,  # use BITMAP up to 200 distinct values
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
        ["bitmap_cardinality_limit"] = "200" // use BITMAP up to 200 distinct values
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

Most users don't need to tune this. Raise it if you have a moderate-cardinality field you'd prefer bitmapped; lower it to push `AUTOINDEX` toward `STL_SORT` sooner. The setting is ignored when you specify `INVERTED`, `STL_SORT`, or `BITMAP` explicitly.
