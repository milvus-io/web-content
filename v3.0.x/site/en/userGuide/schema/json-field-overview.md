---
id: json-field-overview.md
title: "JSON Field Overview"
summary: "When building applications like product catalogs, content management systems, or user preference engines, you often need to store flexible metadata alongside your vector embeddings. Product attributes vary by category, user preferences evolve over time, and document properties have complex nested structures. JSON fields in Milvus solve this challenge by allowing you to store and query flexible structured data without sacrificing performance."
---

# JSON Field Overview

When building applications like product catalogs, content management systems, or user preference engines, you often need to store flexible metadata alongside your vector embeddings. Product attributes vary by category, user preferences evolve over time, and document properties have complex nested structures. JSON fields in Milvus solve this challenge by allowing you to store and query flexible structured data without sacrificing performance.

## What is a JSON field?

A JSON field is a schema-defined data type (`DataType.JSON`) in Milvus that stores structured key-value data. Unlike traditional rigid database columns, JSON fields accommodate nested objects, arrays, and mixed data types while providing multiple indexing options for fast queries.

Example JSON field structure:

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

In this example, `metadata` is a single JSON field that contains a mix of flat values (e.g. `category`, `in_stock`), arrays (`tags`), and nested objects (`supplier`).

<div class="alert note">

**Naming convention:** Use only letters, numbers, and underscores in JSON keys. Avoid special characters, spaces, or dots as they may cause parsing issues in queries.

</div>

## JSON field vs. dynamic field

A common point of confusion is the difference between a JSON field and the [dynamic field](enable-dynamic-field.md). While both are related to JSON, they serve different purposes.

The table below summarizes the key differences between a JSON field and the dynamic field:

<table>
   <tr>
     <th><p>Feature</p></th>
     <th><p>JSON Field</p></th>
     <th><p>Dynamic Field</p></th>
   </tr>
   <tr>
     <td><p>Schema definition</p></td>
     <td><p>A scalar field that must be explicitly declared in the collection schema with the <code>DataType.JSON</code> type.</p></td>
     <td><p>A hidden JSON field (named <code>$meta</code>) that automatically stores undeclared fields.</p></td>
   </tr>
   <tr>
     <td><p>Use case</p></td>
     <td><p>Stores structured data where the schema is known and consistent.</p></td>
     <td><p>Stores flexible, evolving, or semi-structured data that doesn't fit a fixed schema.</p></td>
   </tr>
   <tr>
     <td><p>Control</p></td>
     <td><p>You control the field name and structure.</p></td>
     <td><p>System-managed for undefined fields.</p></td>
   </tr>
   <tr>
     <td><p>Querying</p></td>
     <td><p>Query using your field name or target key inside the JSON field: <code>metadata["key"]</code>.</p></td>
     <td><p>Query directly using the dynamic field key: <code>"dynamic_key"</code> or via <code>$meta</code>: <code>$meta["dynamic_key"]</code></p></td>
   </tr>
</table>

## Basic operations

The fundamental workflow for using a JSON field involves defining it in your schema, inserting data, and then querying the data using specific filter expressions.

### Define a JSON field

To use a JSON field, explicitly define it in your collection schema when creating the collection. The following example demonstrates how to create a collection with a `metadata` field of type `DataType.JSON`:

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
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri="http://localhost:19530", token="root:Milvus")

# Create schema
schema = client.create_schema(auto_id=False, enable_dynamic_field=True)

schema.add_field(field_name="product_id", datatype=DataType.INT64, is_primary=True) # Primary field
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5) # Vector field
# Define a JSON field that allows null values
# highlight-next-line
schema.add_field(field_name="metadata", datatype=DataType.JSON, nullable=True)

client.create_collection(
    collection_name="product_catalog",
    schema=schema
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// Set up a Milvus client
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

// Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);

// Primary field
schema.addField(AddFieldReq.builder().fieldName("product_id").dataType(DataType.Int64).isPrimaryKey(true).autoID(false).build());
// Vector field
schema.addField(AddFieldReq.builder().fieldName("vector").dataType(DataType.FloatVector).dimension(5).build());
// Define a JSON field that allows null values
schema.addField(AddFieldReq.builder().fieldName("metadata").dataType(DataType.JSON).isNullable(true).build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName("product_catalog")
        .collectionSchema(schema)
        .build());
```

```go
import (
    "context"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Set up a Milvus client
ctx := context.Background()
cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    log.Fatal(err)
}
defer cli.Close(ctx)

// Create schema
schema := entity.NewSchema().WithDynamicFieldEnabled(true)

// Primary field
schema.WithField(entity.NewField().WithName("product_id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true))
// Vector field
schema.WithField(entity.NewField().WithName("vector").WithDataType(entity.FieldTypeFloatVector).WithDim(5))
// Define a JSON field that allows null values
schema.WithField(entity.NewField().WithName("metadata").WithDataType(entity.FieldTypeJSON).WithNullable(true))

if err := cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("product_catalog", schema)); err != nil {
    log.Fatal(err)
}
```

```rust
use milvus::v2::prelude::*;

// Set up a Milvus client
let client = ClientV2::new(
    &ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus"),
)
.await?;

// Create schema
let schema = CollectionSchema::new()
    .enable_dynamic_field(true)
    // Primary field
    .add_field(
        FieldSchema::new()
            .name("product_id")
            .data_type(DataType::Int64)
            .primary_key(true),
    )
    // Vector field
    .add_field(
        FieldSchema::new()
            .name("vector")
            .data_type(DataType::FloatVector)
            .dimension(5),
    )
    // Define a JSON field that allows null values
    .add_field(
        FieldSchema::new()
            .name("metadata")
            .data_type(DataType::Json)
            .nullable(true),
    );

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("product_catalog")
            .schema(schema)
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

// Set up a Milvus client
auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Create schema
milvus::CollectionSchema schema;
schema.SetEnableDynamicField(true);

// Primary field
schema.AddField(milvus::FieldSchema("product_id", milvus::DataType::INT64).WithPrimaryKey(true));
// Vector field
schema.AddField(milvus::FieldSchema("vector", milvus::DataType::FLOAT_VECTOR).WithDimension(5));
// Define a JSON field that allows null values
schema.AddField(milvus::FieldSchema("metadata", milvus::DataType::JSON).WithNullable(true));

status = client->CreateCollection(milvus::CreateCollectionRequest()
    .WithCollectionName("product_catalog")
    .WithCollectionSchema(std::make_shared<milvus::CollectionSchema>(schema)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const CLUSTER_ENDPOINT = "http://localhost:19530";
const TOKEN = "root:Milvus";

// Set up a Milvus client
const client = new MilvusClient({ address: CLUSTER_ENDPOINT, token: TOKEN });

// Create schema
const schema = [
  {
    name: "product_id",
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: false,
  },
  {
    name: "vector",
    data_type: DataType.FloatVector,
    dim: 5,
  },
  // Define a JSON field that allows null values
  {
    name: "metadata",
    data_type: DataType.JSON,
    nullable: true,
  },
];

await client.createCollection({
  collection_name: "product_catalog",
  enableDynamicField: true,
  schema,
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

// Set up a Milvus client
MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});

// Create schema
CollectionSchema schema = new()
{
    EnableDynamicFields = true,
    Fields =
    {
        new FieldSchema("product_id", DataType.Int64, isPrimaryKey: true), // Primary field
        new FieldSchema("vector", DataType.FloatVector) { Dimension = 5 }, // Vector field
        // Define a JSON field that allows null values
        new FieldSchema("metadata", DataType.Json) { Nullable = true }
    }
};

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "product_catalog",
    Schema = schema
});
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data '{
    "collectionName": "product_catalog",
    "schema": {
      "autoId": false,
      "enableDynamicField": true,
      "fields": [
        {
          "fieldName": "product_id",
          "dataType": "Int64",
          "isPrimary": true
        },
        {
          "fieldName": "vector",
          "dataType": "FloatVector",
          "elementTypeParams": {
            "dim": 5
          }
        },
        {
          "fieldName": "metadata",
          "dataType": "JSON",
          "nullable": true
        }
      ]
    }
  }'
```

<div class="alert note">

In this example, the JSON field defined in the collection schema allows null values with `nullable=True`. For details, refer to [Nullable & Default](nullable-and-default.md).

</div>

### Insert data

Once the collection is created, insert entities that contain structured JSON objects in your designated JSON field. Your data should be formatted as a list of dictionaries.

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
entities = [
    {
        "product_id": 1,
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
        # highlight-start
        "metadata": { # JSON field
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
        # highlight-end
    }
]

client.insert(collection_name="product_catalog", data=entities)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.vector.request.InsertReq;
import java.util.Arrays;
import java.util.List;

// Insert data
Gson gson = new Gson();

List<JsonObject> data = Arrays.asList(
    gson.fromJson(
        "{\"product_id\": 1, \"vector\": [0.1, 0.2, 0.3, 0.4, 0.5], \"metadata\": {\"category\": \"electronics\", \"brand\": \"BrandA\", \"in_stock\": true, \"price\": 99.99, \"string_price\": \"99.99\", \"tags\": [\"clearance\", \"summer_sale\"], \"supplier\": {\"name\": \"SupplierX\", \"country\": \"USA\", \"contact\": {\"email\": \"support@supplierx.com\", \"phone\": \"+1-800-555-0199\"}}}}",
        JsonObject.class
    )
);

InsertReq insertReq = InsertReq.builder()
        .collectionName("product_catalog")
        .data(data)
        .build();
client.insert(insertReq);
```

```go
import (
    "encoding/json"
    "log"

    "github.com/milvus-io/milvus/client/v3/column"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Insert data
metadata, _ := json.Marshal(map[string]any{
    "category":     "electronics",
    "brand":        "BrandA",
    "in_stock":     true,
    "price":        99.99,
    "string_price": "99.99",
    "tags":         []string{"clearance", "summer_sale"},
    "supplier": map[string]any{
        "name":    "SupplierX",
        "country": "USA",
        "contact": map[string]any{
            "email": "support@supplierx.com",
            "phone": "+1-800-555-0199",
        },
    },
})

columns := []column.Column{
    column.NewColumnInt64("product_id", []int64{1}),
    column.NewColumnFloatVector("vector", 5, [][]float32{{0.1, 0.2, 0.3, 0.4, 0.5}}),
    column.NewColumnJSONBytes("metadata", [][]byte{metadata}),
}

if _, err := cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption("product_catalog", columns...)); err != nil {
    log.Fatal(err)
}
```

```rust
use serde_json::json;

// Insert data
let entities = vec![
    json!({
        "product_id": 1,
        "vector": [0.1_f32, 0.2_f32, 0.3_f32, 0.4_f32, 0.5_f32],
        // JSON field
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
    }),
];

client
    .insert(
        InsertRequest::builder()
            .collection_name("product_catalog")
            .rows(entities)
            .build()?,
    )
    .await?;
```

```cpp
#include <utility>

// Insert data
milvus::EntityRows rows = {
    {
        {"product_id", 1},
        {"vector", {0.1f, 0.2f, 0.3f, 0.4f, 0.5f}},
        // JSON field
        {"metadata", {
            {"category", "electronics"},
            {"brand", "BrandA"},
            {"in_stock", true},
            {"price", 99.99},
            {"string_price", "99.99"},
            {"tags", {"clearance", "summer_sale"}},
            {"supplier", {
                {"name", "SupplierX"},
                {"country", "USA"},
                {"contact", {
                    {"email", "support@supplierx.com"},
                    {"phone", "+1-800-555-0199"}
                }}
            }}
        }}
    }
};

milvus::InsertResponse insert_resp;
auto status = client->Insert(milvus::InsertRequest()
    .WithCollectionName("product_catalog")
    .WithRowsData(std::move(rows)), insert_resp);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Insert data
const entities = [
  {
    product_id: 1,
    vector: [0.1, 0.2, 0.3, 0.4, 0.5],
    // JSON field
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
];

await client.insert({
  collection_name: "product_catalog",
  data: entities,
});
```

```csharp
using Milvus.Client.V2.Requests.Dml;

// Insert data
await client.InsertAsync(new InsertReq
{
    CollectionName = "product_catalog",
    RowsData =
    [
        new Dictionary<string, object?>
        {
            ["product_id"] = 1L,
            ["vector"] = new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f },
            ["metadata"] = new Dictionary<string, object?> // JSON field
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
    ]
});
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data '{
    "collectionName": "product_catalog",
    "data": [
      {
        "product_id": 1,
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
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
    ]
  }'
```

### Filtering operations

Before you can perform filtering operations on JSON fields, make sure:

- You have created an index on each vector field.

- The collection is loaded into memory.

<details>

<summary>Show code</summary>

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
index_params.add_index(
    field_name="vector",
    index_type="AUTOINDEX",
    index_name="vector_index",
    metric_type="COSINE"
)

client.create_index(collection_name="product_catalog", index_params=index_params)

client.load_collection(collection_name="product_catalog")
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.index.request.CreateIndexReq;
import java.util.Arrays;

// Create an index on the vector field
client.createIndex(CreateIndexReq.builder()
        .collectionName("product_catalog")
        .indexParams(Arrays.asList(IndexParam.builder()
                .fieldName("vector")
                .indexName("vector_index")
                .indexType(IndexParam.IndexType.AUTOINDEX)
                .metricType(IndexParam.MetricType.COSINE)
                .build()))
        .build());

// Load the collection
client.loadCollection(LoadCollectionReq.builder()
        .collectionName("product_catalog")
        .build());
```

```go
import (
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Create an index on the vector field
indexTask, err := cli.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    "product_catalog", "vector", index.NewAutoIndex(entity.COSINE),
).WithIndexName("vector_index"))
if err != nil {
    log.Fatal(err)
}
if err := indexTask.Await(ctx); err != nil {
    log.Fatal(err)
}

// Load the collection
loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("product_catalog"))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}
```

```rust
// Create an index on the vector field
client
    .create_index(
        CreateIndexRequest::builder()
            .collection_name("product_catalog")
            .index_params(vec![
                IndexParam::new()
                    .field_name("vector")
                    .index_name("vector_index")
                    .index_type(IndexType::AutoIndex)
                    .metric_type(MetricType::Cosine),
            ])
            .build()?,
    )
    .await?;

// Load the collection
client
    .load_collection(
        LoadCollectionRequest::builder()
            .collection_name("product_catalog")
            .build()?,
    )
    .await?;
```

```cpp
#include <utility>

// Create an index on the vector field
milvus::IndexDesc index("vector", "vector_index", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE);
auto status = client->CreateIndex(milvus::CreateIndexRequest()
    .WithCollectionName("product_catalog")
    .WithIndexes({std::move(index)})
    .WithSync(true));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Load the collection
status = client->LoadCollection(milvus::LoadCollectionRequest()
    .WithCollectionName("product_catalog")
    .WithSync(true));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { IndexType, MetricType } from "@zilliz/milvus2-sdk-node";

// Create an index on the vector field
await client.createIndex({
  collection_name: "product_catalog",
  field_name: "vector",
  index_name: "vector_index",
  index_type: IndexType.AUTOINDEX,
  metric_type: MetricType.COSINE,
});

// Load the collection
await client.loadCollection({
  collection_name: "product_catalog",
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

// Create an index on the vector field
await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = "product_catalog",
    Indexes = [new IndexParam("vector", "vector_index", IndexType.AutoIndex, MetricType.Cosine)]
});

// Load the collection
await client.LoadCollectionAsync(new LoadCollectionReq
{
    CollectionName = "product_catalog"
});
```

```bash
# Create an index on the vector field
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data '{
    "collectionName": "product_catalog",
    "indexParams": [
      {
        "fieldName": "vector",
        "indexName": "vector_index",
        "indexType": "AUTOINDEX",
        "metricType": "COSINE"
      }
    ]
  }'

# Load the collection
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data '{
    "collectionName": "product_catalog"
  }'
```

</details>

Once these requirements are met, you can use the expressions below to filter on your collection based on the values within the JSON field. These filter expressions leverage specific JSON path syntax and dedicated operators.

#### Filtering with JSON path syntax

To query a specific key, use bracket notation to access JSON keys: `json_field_name["key"]`. For nested keys, chain them together: `json_field_name["key1"]["key2"]`.

To filter for entities where the `category` is `"electronics"`:

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
# Define filter expression
filter = 'metadata["category"] == "electronics"'

client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;

// Define filter expression
String filter = "metadata[\"category\"] == \"electronics\"";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("product_catalog") // Collection name
        .data(Arrays.asList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}))) // Query vector (must match collection's vector dim)
        .limit(5) // Max. number of results to return
        .filter(filter) // Filter expression
        .outputFields(Arrays.asList("product_id", "metadata")) // Fields to include in the search results
        .build());

System.out.println(resp.getSearchResults());
```

```go
import (
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Define filter expression
filter := `metadata["category"] == "electronics"`

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "product_catalog", // Collection name
    5, // Max. number of results to return
    []entity.Vector{entity.FloatVector{0.1, 0.2, 0.3, 0.4, 0.5}}, // Query vector (must match collection's vector dim)
).WithFilter(filter).WithOutputFields("product_id", "metadata")) // Filter expression; fields to include in the search results
if err != nil {
    log.Fatal(err)
}

for _, resultSet := range res {
    log.Println("IDs: ", resultSet.IDs)
}
```

```rust
// Define filter expression
let filter = r#"metadata["category"] == "electronics""#;

let search = client
    .search(
        SearchRequest::builder()
            .collection_name("product_catalog") // Collection name
            .vector_field("vector")
            .vectors(SearchVectors::Float(vec![vec![0.1_f32, 0.2_f32, 0.3_f32, 0.4_f32, 0.5_f32]])) // Query vector (must match collection's vector dim)
            .limit(5) // Max. number of results to return
            .filter(filter) // Filter expression
            .output_fields(["product_id", "metadata"]) // Fields to include in the search results
            .build()?,
    )
    .await?;

println!("{} rows returned", search.results().len());
```

```cpp
// Define filter expression
std::string filter = R"(metadata["category"] == "electronics")";

milvus::SearchRequest search_request;
search_request.WithCollectionName("product_catalog"); // Collection name
search_request.AddFloatVector({0.1f, 0.2f, 0.3f, 0.4f, 0.5f}); // Query vector (must match collection's vector dim)
search_request.WithLimit(5); // Max. number of results to return
search_request.WithFilter(filter); // Filter expression
search_request.WithOutputFields({"product_id", "metadata"}); // Fields to include in the search results

milvus::SearchResponse search_response;
auto status = client->Search(search_request, search_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Define filter expression
const filter = 'metadata["category"] == "electronics"';

const res = await client.search({
  collection_name: "product_catalog", // Collection name
  data: [[0.1, 0.2, 0.3, 0.4, 0.5]], // Query vector (must match collection's vector dim)
  limit: 5, // Max. number of results to return
  filter, // Filter expression
  output_fields: ["product_id", "metadata"], // Fields to include in the search results
});

console.log(res.results);
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

// Define filter expression
string filter = "metadata[\"category\"] == \"electronics\"";

SearchResp res = await client.SearchAsync(new SearchReq
{
    CollectionName = "product_catalog", // Collection name
    VectorFieldName = "vector",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }], // Query vector (must match collection's vector dim)
    Limit = 5, // Max. number of results to return
    Parameters = new SearchParameters
    {
        Expression = filter, // Filter expression
        OutputFields = { "product_id", "metadata" } // Fields to include in the search results
    }
});
```

```bash
# Define filter expression
FILTER='metadata[\"category\"] == \"electronics\"'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data "{
    \"collectionName\": \"product_catalog\",
    \"data\": [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \"limit\": 5,
    \"filter\": \"${FILTER}\",
    \"outputFields\": [\"product_id\", \"metadata\"]
  }"
```

To filter for entities where the nested key `supplier["country"]` is `"USA"`:

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
# Define filter expression
filter = 'metadata["supplier"]["country"] == "USA"'

res = client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)

print(res)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;

// Define filter expression
String filter = "metadata[\"supplier\"][\"country\"] == \"USA\"";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("product_catalog") // Collection name
        .data(Arrays.asList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}))) // Query vector (must match collection's vector dim)
        .limit(5) // Max. number of results to return
        .filter(filter) // Filter expression
        .outputFields(Arrays.asList("product_id", "metadata")) // Fields to include in the search results
        .build());

System.out.println(resp.getSearchResults());
```

```go
import (
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Define filter expression
filter := `metadata["supplier"]["country"] == "USA"`

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "product_catalog", // Collection name
    5, // Max. number of results to return
    []entity.Vector{entity.FloatVector{0.1, 0.2, 0.3, 0.4, 0.5}}, // Query vector (must match collection's vector dim)
).WithFilter(filter).WithOutputFields("product_id", "metadata")) // Filter expression; fields to include in the search results
if err != nil {
    log.Fatal(err)
}

for _, resultSet := range res {
    log.Println("IDs: ", resultSet.IDs)
}
```

```rust
// Define filter expression
let filter = r#"metadata["supplier"]["country"] == "USA""#;

let search = client
    .search(
        SearchRequest::builder()
            .collection_name("product_catalog") // Collection name
            .vector_field("vector")
            .vectors(SearchVectors::Float(vec![vec![0.1_f32, 0.2_f32, 0.3_f32, 0.4_f32, 0.5_f32]])) // Query vector (must match collection's vector dim)
            .limit(5) // Max. number of results to return
            .filter(filter) // Filter expression
            .output_fields(["product_id", "metadata"]) // Fields to include in the search results
            .build()?,
    )
    .await?;

println!("{} rows returned", search.results().len());
```

```cpp
// Define filter expression
std::string filter = R"(metadata["supplier"]["country"] == "USA")";

milvus::SearchRequest search_request;
search_request.WithCollectionName("product_catalog"); // Collection name
search_request.AddFloatVector({0.1f, 0.2f, 0.3f, 0.4f, 0.5f}); // Query vector (must match collection's vector dim)
search_request.WithLimit(5); // Max. number of results to return
search_request.WithFilter(filter); // Filter expression
search_request.WithOutputFields({"product_id", "metadata"}); // Fields to include in the search results

milvus::SearchResponse search_response;
auto status = client->Search(search_request, search_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Define filter expression
const filter = 'metadata["supplier"]["country"] == "USA"';

const res = await client.search({
  collection_name: "product_catalog", // Collection name
  data: [[0.1, 0.2, 0.3, 0.4, 0.5]], // Query vector (must match collection's vector dim)
  limit: 5, // Max. number of results to return
  filter, // Filter expression
  output_fields: ["product_id", "metadata"], // Fields to include in the search results
});

console.log(res.results);
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

// Define filter expression
string filter = "metadata[\"supplier\"][\"country\"] == \"USA\"";

SearchResp res = await client.SearchAsync(new SearchReq
{
    CollectionName = "product_catalog", // Collection name
    VectorFieldName = "vector",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }], // Query vector (must match collection's vector dim)
    Limit = 5, // Max. number of results to return
    Parameters = new SearchParameters
    {
        Expression = filter, // Filter expression
        OutputFields = { "product_id", "metadata" } // Fields to include in the search results
    }
});
```

```bash
# Define filter expression
FILTER='metadata[\"supplier\"][\"country\"] == \"USA\"'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data "{
    \"collectionName\": \"product_catalog\",
    \"data\": [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \"limit\": 5,
    \"filter\": \"${FILTER}\",
    \"outputFields\": [\"product_id\", \"metadata\"]
  }"
```

#### Filtering with JSON-specific operators

Milvus also provides special operators for querying array values on specific JSON field keys. For example:

- `json_contains(identifier, expr)`: Checks if a specific element or sub-array exists within a JSON array

- `json_contains_all(identifier, expr)`: Ensures that all elements of the specified JSON expression are present in the field

- `json_contains_any(identifier, expr)`: Filters entities where at least one member of the JSON expression exists within the field

To find a product that has the `"summer_sale"` value under the `tags` key:

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
# Define filter expression
filter = 'json_contains(metadata["tags"], "summer_sale")'

res = client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)

print(res)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;

// Define filter expression
String filter = "json_contains(metadata[\"tags\"], \"summer_sale\")";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("product_catalog") // Collection name
        .data(Arrays.asList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}))) // Query vector (must match collection's vector dim)
        .limit(5) // Max. number of results to return
        .filter(filter) // Filter expression
        .outputFields(Arrays.asList("product_id", "metadata")) // Fields to include in the search results
        .build());

System.out.println(resp.getSearchResults());
```

```go
import (
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Define filter expression
filter := `json_contains(metadata["tags"], "summer_sale")`

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "product_catalog", // Collection name
    5, // Max. number of results to return
    []entity.Vector{entity.FloatVector{0.1, 0.2, 0.3, 0.4, 0.5}}, // Query vector (must match collection's vector dim)
).WithFilter(filter).WithOutputFields("product_id", "metadata")) // Filter expression; fields to include in the search results
if err != nil {
    log.Fatal(err)
}

for _, resultSet := range res {
    log.Println("IDs: ", resultSet.IDs)
}
```

```rust
// Define filter expression
let filter = r#"json_contains(metadata["tags"], "summer_sale")"#;

let search = client
    .search(
        SearchRequest::builder()
            .collection_name("product_catalog") // Collection name
            .vector_field("vector")
            .vectors(SearchVectors::Float(vec![vec![0.1_f32, 0.2_f32, 0.3_f32, 0.4_f32, 0.5_f32]])) // Query vector (must match collection's vector dim)
            .limit(5) // Max. number of results to return
            .filter(filter) // Filter expression
            .output_fields(["product_id", "metadata"]) // Fields to include in the search results
            .build()?,
    )
    .await?;

println!("{} rows returned", search.results().len());
```

```cpp
// Define filter expression
std::string filter = R"(json_contains(metadata["tags"], "summer_sale"))";

milvus::SearchRequest search_request;
search_request.WithCollectionName("product_catalog"); // Collection name
search_request.AddFloatVector({0.1f, 0.2f, 0.3f, 0.4f, 0.5f}); // Query vector (must match collection's vector dim)
search_request.WithLimit(5); // Max. number of results to return
search_request.WithFilter(filter); // Filter expression
search_request.WithOutputFields({"product_id", "metadata"}); // Fields to include in the search results

milvus::SearchResponse search_response;
auto status = client->Search(search_request, search_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Define filter expression
const filter = 'json_contains(metadata["tags"], "summer_sale")';

const res = await client.search({
  collection_name: "product_catalog", // Collection name
  data: [[0.1, 0.2, 0.3, 0.4, 0.5]], // Query vector (must match collection's vector dim)
  limit: 5, // Max. number of results to return
  filter, // Filter expression
  output_fields: ["product_id", "metadata"], // Fields to include in the search results
});

console.log(res.results);
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

// Define filter expression
string filter = "json_contains(metadata[\"tags\"], \"summer_sale\")";

SearchResp res = await client.SearchAsync(new SearchReq
{
    CollectionName = "product_catalog", // Collection name
    VectorFieldName = "vector",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }], // Query vector (must match collection's vector dim)
    Limit = 5, // Max. number of results to return
    Parameters = new SearchParameters
    {
        Expression = filter, // Filter expression
        OutputFields = { "product_id", "metadata" } // Fields to include in the search results
    }
});
```

```bash
# Define filter expression
FILTER='json_contains(metadata[\"tags\"], \"summer_sale\")'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data "{
    \"collectionName\": \"product_catalog\",
    \"data\": [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \"limit\": 5,
    \"filter\": \"${FILTER}\",
    \"outputFields\": [\"product_id\", \"metadata\"]
  }"
```

To find a product that has at least one of the `"electronics"`, `"new"`, or `"clearance"` values under the `tags` key:

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
# Define filter expression
filter = 'json_contains_any(metadata["tags"], ["electronics", "new", "clearance"])'

res = client.search(
    collection_name="product_catalog",  # Collection name
    data=[[0.1, 0.2, 0.3, 0.4, 0.5]],               # Query vector (must match collection's vector dim)
    limit=5,                           # Max. number of results to return
    # highlight-next-line
    filter=filter,                    # Filter expression
    output_fields=["product_id", "metadata"]   # Fields to include in the search results
)

print(res)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;

// Define filter expression
String filter = "json_contains_any(metadata[\"tags\"], [\"electronics\", \"new\", \"clearance\"])";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("product_catalog") // Collection name
        .data(Arrays.asList(new FloatVec(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}))) // Query vector (must match collection's vector dim)
        .limit(5) // Max. number of results to return
        .filter(filter) // Filter expression
        .outputFields(Arrays.asList("product_id", "metadata")) // Fields to include in the search results
        .build());

System.out.println(resp.getSearchResults());
```

```go
import (
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

// Define filter expression
filter := `json_contains_any(metadata["tags"], ["electronics", "new", "clearance"])`

res, err := cli.Search(ctx, milvusclient.NewSearchOption(
    "product_catalog", // Collection name
    5, // Max. number of results to return
    []entity.Vector{entity.FloatVector{0.1, 0.2, 0.3, 0.4, 0.5}}, // Query vector (must match collection's vector dim)
).WithFilter(filter).WithOutputFields("product_id", "metadata")) // Filter expression; fields to include in the search results
if err != nil {
    log.Fatal(err)
}

for _, resultSet := range res {
    log.Println("IDs: ", resultSet.IDs)
}
```

```rust
// Define filter expression
let filter = r#"json_contains_any(metadata["tags"], ["electronics", "new", "clearance"])"#;

let search = client
    .search(
        SearchRequest::builder()
            .collection_name("product_catalog") // Collection name
            .vector_field("vector")
            .vectors(SearchVectors::Float(vec![vec![0.1_f32, 0.2_f32, 0.3_f32, 0.4_f32, 0.5_f32]])) // Query vector (must match collection's vector dim)
            .limit(5) // Max. number of results to return
            .filter(filter) // Filter expression
            .output_fields(["product_id", "metadata"]) // Fields to include in the search results
            .build()?,
    )
    .await?;

println!("{} rows returned", search.results().len());
```

```cpp
// Define filter expression
std::string filter = R"(json_contains_any(metadata["tags"], ["electronics", "new", "clearance"]))";

milvus::SearchRequest search_request;
search_request.WithCollectionName("product_catalog"); // Collection name
search_request.AddFloatVector({0.1f, 0.2f, 0.3f, 0.4f, 0.5f}); // Query vector (must match collection's vector dim)
search_request.WithLimit(5); // Max. number of results to return
search_request.WithFilter(filter); // Filter expression
search_request.WithOutputFields({"product_id", "metadata"}); // Fields to include in the search results

milvus::SearchResponse search_response;
auto status = client->Search(search_request, search_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Define filter expression
const filter = 'json_contains_any(metadata["tags"], ["electronics", "new", "clearance"])';

const res = await client.search({
  collection_name: "product_catalog", // Collection name
  data: [[0.1, 0.2, 0.3, 0.4, 0.5]], // Query vector (must match collection's vector dim)
  limit: 5, // Max. number of results to return
  filter, // Filter expression
  output_fields: ["product_id", "metadata"], // Fields to include in the search results
});

console.log(res.results);
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

// Define filter expression
string filter = "json_contains_any(metadata[\"tags\"], [\"electronics\", \"new\", \"clearance\"])";

SearchResp res = await client.SearchAsync(new SearchReq
{
    CollectionName = "product_catalog", // Collection name
    VectorFieldName = "vector",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }], // Query vector (must match collection's vector dim)
    Limit = 5, // Max. number of results to return
    Parameters = new SearchParameters
    {
        Expression = filter, // Filter expression
        OutputFields = { "product_id", "metadata" } // Fields to include in the search results
    }
});
```

```bash
# Define filter expression
FILTER='json_contains_any(metadata[\"tags\"], [\"electronics\", \"new\", \"clearance\"])'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "accept: application/json" \
  --header "content-type: application/json" \
  --data "{
    \"collectionName\": \"product_catalog\",
    \"data\": [[0.1, 0.2, 0.3, 0.4, 0.5]],
    \"limit\": 5,
    \"filter\": \"${FILTER}\",
    \"outputFields\": [\"product_id\", \"metadata\"]
  }"
```

For more information about JSON-specific operators, refer to [JSON Operators](json-operators.md).

## Next: Accelerate JSON queries

By default, queries on JSON fields without acceleration will perform a full scan of all rows, which can be slow on large datasets. To speed up JSON queries, Milvus provides advanced indexing and storage optimization features.

<div class="alert warning">

Starting in Milvus 3.0.0, whole-object JSON indexing (`json_cast_type="JSON"`), also known as JSON flat indexing, is deprecated. Existing indexes and new index-creation requests remain supported for compatibility, but this mode is no longer recommended for new workloads. Use JSON path indexing for known query paths, or consider [JSON Shredding](json-shredding.md) for broad query acceleration across complex or evolving documents.

</div>

The table below summarizes their differences and best-use scenarios:

<table>
   <tr>
     <th><p>Technique</p></th>
     <th><p>Best For</p></th>
     <th><p>Arrays Acceleration</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p>JSON Indexing</p></td>
     <td><p>Small set of frequently accessed keys, arrays on a specific array key</p></td>
     <td><p>Yes (on indexed array key)</p></td>
     <td><p>Must preselect keys, maintenance needed if schema evolves</p></td>
   </tr>
   <tr>
     <td><p>JSON Shredding</p></td>
     <td><p>General speed-up across many keys, flexible for varied queries</p></td>
     <td><p>No (does not accelerate values inside arrays)</p></td>
     <td><p>Extra storage config, arrays still need per-key index</p></td>
   </tr>
   <tr>
     <td><p>NGRAM Index</p></td>
     <td><p>Wildcard searches, substring matching in text fields</p></td>
     <td><p>N/A</p></td>
     <td><p>Not for numeric/range filters</p></td>
   </tr>
</table>

**Tip:** You can combine these approaches—for example, use JSON shredding for broad query acceleration, JSON indexing for high-frequency array keys, and NGRAM indexing for flexible text search.

For implementation details, refer to:

-  [JSON Indexing](json-indexing.md)

- [JSON Shredding](json-shredding.md)

- [NGRAM](ngram.md)

## FAQ

### Are there any limitations on the size of a JSON field?

Yes. Each JSON field is limited to 65,536 bytes.

### Does a JSON field support setting a default value?

No, JSON fields do not support default values. However, you can set `nullable=True` when defining the field to allow empty entries.

Refer to [Nullable & Default](nullable-and-default.md) for details.

### Are there any naming conventions for JSON field keys?

Yes, to ensure compatibility with queries and indexing:

- Use only letters, numbers, and underscores in JSON keys.

- Avoid using special characters, spaces, or dots (`.`, `/`, etc.).

- Incompatible keys may cause parsing issues in filter expressions.

### How does Milvus handle string values in JSON fields?

Milvus stores string values exactly as they appear in the JSON input—without semantic transformation. Improperly quoted strings may result in errors during parsing.

**Examples of valid strings**:

```plaintext
"a\"b", "a'b", "a\\b"
```

**Examples of invalid strings**:

```plaintext
'a"b', 'a\'b'
```

