---
id: primary-field.md
title: "Primary Field & AutoID"
summary: "Every collection in Milvus must have a primary field to uniquely identify each entity. This field ensures that every entity can be inserted, updated, queried, or deleted without ambiguity."
---

# Primary Field & AutoID

Every collection in Milvus must have a primary field to uniquely identify each entity. This field ensures that every entity can be inserted, updated, queried, or deleted without ambiguity.

Depending on your use case, you can either let Milvus automatically generate IDs (AutoID) or assign your own IDs manually.

## What is a primary field?

A primary field acts as the unique key for each entity in a collection, similar to a primary key in a traditional database. Milvus uses the primary field to manage entities during insert, upsert, delete, and query operations.

Key requirements:

- Each collection must have **exactly one** primary field.

- Primary field values cannot be null.

- The data type must be specified at creation and cannot be changed later.

## Supported data types

The primary field must use a supported scalar data type that can uniquely identify entities.

<table>
   <tr>
     <th><p>Data Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>INT64</code></p></td>
     <td><p>64-bit integer type, commonly used with AutoID. This is the recommended option for most use cases.</p></td>
   </tr>
   <tr>
     <td><p><code>VARCHAR</code></p></td>
     <td><p>Variable-length string type. Use this when entity identifiers come from external systems (for example, product codes or user IDs). Requires the <code>max_length</code> property to define the maximum number of bytes allowed per value.</p></td>
   </tr>
</table>

## Choose between AutoID and Manual IDs

Milvus supports two modes for assigning primary key values.

<table>
   <tr>
     <th><p>Mode</p></th>
     <th><p>Description</p></th>
     <th><p>Recommended For</p></th>
   </tr>
   <tr>
     <td><p>AutoID</p></td>
     <td><p>Milvus automatically generates unique identifiers for inserted or imported entities.</p></td>
     <td><p>Most scenarios where you don’t need to manage IDs manually.</p></td>
   </tr>
   <tr>
     <td><p>Manual ID</p></td>
     <td><p>You provide unique IDs yourself when inserting or importing data.</p></td>
     <td><p>When IDs must align with external systems or pre-existing datasets.</p></td>
   </tr>
</table>

<div class="alert note">

- If you are unsure which mode to choose, [start with AutoID](primary-field.md#Quickstart-Use-AutoID) for simpler ingestion and guaranteed uniqueness.

- You are advised to rely on `autoId` in all cases unless manually setting primary keys is beneficial.

</div>

## Quickstart: Use AutoID

You can let Milvus handle ID generation automatically.

### Step 1: Create a collection with AutoID

Enable `auto_id=True` in your primary field definition. Milvus will handle ID generation automatically.

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

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema()

# Define primary field with AutoID enabled
# highlight-start
schema.add_field(
    field_name="id", # Primary field name
    is_primary=True,
    auto_id=True,  # Milvus generates IDs automatically; Defaults to False
    datatype=DataType.INT64
)
# highlight-end

# Define the other fields
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=4) # Vector field
schema.add_field(field_name="category", datatype=DataType.VARCHAR, max_length=1000) # Scalar field of the VARCHAR type

# Create the collection
if client.has_collection("demo_autoid"):
    client.drop_collection("demo_autoid")
client.create_collection(collection_name="demo_autoid", schema=schema)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

CreateCollectionReq.CollectionSchema collectionSchema = CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(true)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(4)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("category")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName("demo_autoid")
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("demo_autoid")
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
```

```go
import (
    "context"
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
        Address: "http://localhost:19530",
        APIKey:  "root:Milvus",
})
if err != nil {
        log.Fatal("failed to connect:", err)
}
defer cli.Close(ctx)

schema := &entity.Schema{
        CollectionName: "demo_autoid",
        Fields: []*entity.Field{
                entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true),
                entity.NewField().WithName("embedding").WithDataType(entity.FieldTypeFloatVector).WithDim(4),
                entity.NewField().WithName("category").WithDataType(entity.FieldTypeVarChar).WithMaxLength(1000),
        },
}

cli.DropCollection(ctx, milvusclient.NewDropCollectionOption("demo_autoid"))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("demo_autoid", schema))
if err != nil {
        log.Fatal("failed to create collection:", err)
}
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let schema = CollectionSchema::new()
    .add_field(
        FieldSchema::new()
            .name("id")
            .data_type(DataType::Int64)
            .primary_key(true)
            .auto_id(true),
    )
    .add_field(
        FieldSchema::new()
            .name("embedding")
            .data_type(DataType::FloatVector)
            .dimension(4),
    )
    .add_field(
        FieldSchema::new()
            .name("category")
            .data_type(DataType::VarChar)
            .max_length(1000),
    );

if client
    .has_collection(
        HasCollectionRequest::builder()
            .collection_name("demo_autoid")
            .build()?,
    )
    .await?
    .exists()
{
    client
        .drop_collection(
            DropCollectionRequest::builder()
                .collection_name("demo_autoid")
                .build()?,
        )
        .await?;
}

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("demo_autoid")
            .schema(schema)
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField({"id", milvus::DataType::INT64, "Primary field", true, true});
schema->AddField(milvus::FieldSchema("embedding", milvus::DataType::FLOAT_VECTOR, "Vector field").WithDimension(4));
schema->AddField(milvus::FieldSchema("category", milvus::DataType::VARCHAR, "Scalar field").WithMaxLength(1000));

status = client->DropCollection(milvus::DropCollectionRequest().WithCollectionName("demo_autoid"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                    .WithCollectionName("demo_autoid")
                                    .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
});

// Define schema fields
const schema = [
  {
    name: "id",
    description: "Primary field",
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: true, // Milvus generates IDs automatically
  },
  {
    name: "embedding",
    description: "Vector field",
    data_type: DataType.FloatVector,
    dim: 4,
  },
  {
    name: "category",
    description: "Scalar field",
    data_type: DataType.VarChar,
    max_length: 1000,
  },
];

// Create the collection
await client.createCollection({
  collection_name: "demo_autoid",
  fields: schema,
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var schema = new CollectionSchema
{
    Fields =
    {
        new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true), // Milvus generates IDs automatically
        FieldSchema.CreateFloatVector("embedding", dimension: 4), // Vector field
        FieldSchema.CreateVarchar("category", maxLength: 1000) // Scalar field of the VARCHAR type
    }
};

if ((await client.HasCollectionAsync(new HasCollectionReq { CollectionName = "demo_autoid" })).Has)
{
    await client.DropCollectionAsync(new DropCollectionReq { CollectionName = "demo_autoid" });
}

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "demo_autoid",
    Schema = schema
});
```

```bash
# restful
export SCHEMA='{
    "autoID": true,
    "fields": [
        {
            "fieldName": "id",
            "dataType": "Int64",
            "isPrimary": true,
            "elementTypeParams": {}
        },
        {
            "fieldName": "embedding",
            "dataType": "FloatVector",
            "isPrimary": false,
            "elementTypeParams": {
                "dim": "4"
            }
        },
        {
            "fieldName": "category",
            "dataType": "VarChar",
            "isPrimary": false,
            "elementTypeParams": {
                "max_length": "1000"
            }
        }
    ]
}'

curl -X POST 'http://localhost:19530/v2/vectordb/collections/create' \
-H 'Content-Type: application/json' \
-H "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"demo_autoid\",
    \"schema\": $SCHEMA
}"
```

### Step 2: Insert Data

**Important:** Do not include the primary field column in your data. Milvus generates IDs automatically.

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
data = [
    {"embedding": [0.1, 0.2, 0.3, 0.4], "category": "book"},
    {"embedding": [0.2, 0.3, 0.4, 0.5], "category": "toy"},
]

res = client.insert(collection_name="demo_autoid", data=data)
print("Generated IDs:", res.get("ids"))

# Output example:
# Generated IDs: [461526052788333649, 461526052788333650]
```

```java
import com.google.gson.*;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;
import java.util.ArrayList;
import java.util.List;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
JsonObject row1 = new JsonObject();
row1.add("embedding", gson.toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
row1.addProperty("category", "book");
rows.add(row1);

JsonObject row2 = new JsonObject();
row2.add("embedding", gson.toJsonTree(new float[]{0.2f, 0.3f, 0.4f, 0.5f}));
row2.addProperty("category", "toy");
rows.add(row2);

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("demo_autoid")
        .data(rows)
        .build());
System.out.printf("Generated IDs: %s\n", insertR.getPrimaryKeys());
```

```go
import (
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

data := []any{
        map[string]any{"embedding": []float32{0.1, 0.2, 0.3, 0.4}, "category": "book"},
        map[string]any{"embedding": []float32{0.2, 0.3, 0.4, 0.5}, "category": "toy"},
}

result, err := cli.Insert(ctx, milvusclient.NewRowBasedInsertOption("demo_autoid", data...))
if err != nil {
        log.Fatal("failed to insert:", err)
}
for i := 0; i < result.IDs.Len(); i++ {
        id, _ := result.IDs.GetAsInt64(i)
        fmt.Println("Generated ID:", id)
}
```

```rust
use milvus::v2::prelude::*;

client
    .insert(
        InsertRequest::builder()
            .collection_name("demo_autoid")
            .rows([
                serde_json::json!({"embedding": [0.1, 0.2, 0.3, 0.4], "category": "book"}),
                serde_json::json!({"embedding": [0.2, 0.3, 0.4, 0.5], "category": "toy"}),
            ])
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>

milvus::EntityRows data = {{{"embedding", std::vector<float>{0.1, 0.2, 0.3, 0.4}}, {"category", "book"}},
                           {{"embedding", std::vector<float>{0.2, 0.3, 0.4, 0.5}}, {"category", "toy"}}};

milvus::InsertResponse response;
auto status = client->Insert(milvus::InsertRequest()
                                .WithCollectionName("demo_autoid")
                                .WithRowsData(std::move(data))
                                , response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
auto ids = response.Results().IdArray().IntIDArray();
```

```javascript
const data = [
    {"embedding": [0.1, 0.2, 0.3, 0.4], "category": "book"},
    {"embedding": [0.2, 0.3, 0.4, 0.5], "category": "toy"},
];

const res = await client.insert({
    collection_name: "demo_autoid",
    fields_data: data,
});

console.log(res);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Responses.Dml;
using Milvus.Client.V2.Types;

var data = new[]
{
    new Dictionary<string, object?>
    {
        ["embedding"] = new[] { 0.1f, 0.2f, 0.3f, 0.4f },
        ["category"] = "book"
    },
    new Dictionary<string, object?>
    {
        ["embedding"] = new[] { 0.2f, 0.3f, 0.4f, 0.5f },
        ["category"] = "toy"
    }
};

MutationResp res = await client.InsertAsync(new InsertReq
{
    CollectionName = "demo_autoid",
    RowsData = data
});
Console.WriteLine("Generated IDs: " + string.Join(", ", res.LongIds ?? []));
```

```bash
# restful
export INSERT_DATA='[
    {
        "embedding": [0.1, 0.2, 0.3, 0.4],
        "category": "book"
    },
    {
        "embedding": [0.2, 0.3, 0.4, 0.5],
        "category": "toy"
    }
]'

curl -X POST 'http://localhost:19530/v2/vectordb/entities/insert' \
-H 'Content-Type: application/json' \
-H "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"demo_autoid\",
    \"data\": $INSERT_DATA
}"
```

<div class="alert note">

Use `upsert()` instead of `insert()` when working with existing entities to avoid duplicate ID errors.

</div>

## Use manual IDs

If you need to control IDs manually, disable AutoID and provide your own values.

### Step 1: Create a collection without AutoID

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

client = MilvusClient(uri="http://localhost:19530")

schema = client.create_schema()

# Define the primary field without AutoID
# highlight-start
schema.add_field(
    field_name="product_id",
    is_primary=True,
    auto_id=False,  # You'll provide IDs manually at data ingestion
    datatype=DataType.VARCHAR,
    max_length=100 # Required when datatype is VARCHAR
)
# highlight-end

# Define the other fields
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=4) # Vector field
schema.add_field(field_name="category", datatype=DataType.VARCHAR, max_length=1000) # Scalar field of the VARCHAR type

# Create the collection
if client.has_collection("demo_manual_ids"):
    client.drop_collection("demo_manual_ids")
client.create_collection(collection_name="demo_manual_ids", schema=schema)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

CreateCollectionReq.CollectionSchema collectionSchema = CreateCollectionReq.CollectionSchema.builder()
        .build();
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("product_id")
        .dataType(DataType.VarChar)
        .isPrimaryKey(true)
        .autoID(false)
        .maxLength(100)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(4)
        .build());
collectionSchema.addField(AddFieldReq.builder()
        .fieldName("category")
        .dataType(DataType.VarChar)
        .maxLength(1000)
        .build());

client.dropCollection(DropCollectionReq.builder()
        .collectionName("demo_manual_ids")
        .build());

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("demo_manual_ids")
        .collectionSchema(collectionSchema)
        .build();
client.createCollection(requestCreate);
```

```go
import (
    "context"
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
        Address: "http://localhost:19530",
        APIKey:  "root:Milvus",
})
if err != nil {
        log.Fatal("failed to connect:", err)
}
defer cli.Close(ctx)

schema := &entity.Schema{
        CollectionName: "demo_manual_ids",
        Fields: []*entity.Field{
                entity.NewField().WithName("product_id").WithDataType(entity.FieldTypeVarChar).WithIsPrimaryKey(true).WithMaxLength(100),
                entity.NewField().WithName("embedding").WithDataType(entity.FieldTypeFloatVector).WithDim(4),
                entity.NewField().WithName("category").WithDataType(entity.FieldTypeVarChar).WithMaxLength(1000),
        },
}

cli.DropCollection(ctx, milvusclient.NewDropCollectionOption("demo_manual_ids"))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("demo_manual_ids", schema))
if err != nil {
        log.Fatal("failed to create collection:", err)
}
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let schema = CollectionSchema::new()
    .add_field(
        FieldSchema::new()
            .name("product_id")
            .data_type(DataType::VarChar)
            .primary_key(true)
            .max_length(100),
    )
    .add_field(
        FieldSchema::new()
            .name("embedding")
            .data_type(DataType::FloatVector)
            .dimension(4),
    )
    .add_field(
        FieldSchema::new()
            .name("category")
            .data_type(DataType::VarChar)
            .max_length(1000),
    );

if client
    .has_collection(
        HasCollectionRequest::builder()
            .collection_name("demo_manual_ids")
            .build()?,
    )
    .await?
    .exists()
{
    client
        .drop_collection(
            DropCollectionRequest::builder()
                .collection_name("demo_manual_ids")
                .build()?,
        )
        .await?;
}

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("demo_manual_ids")
            .schema(schema)
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField(milvus::FieldSchema("product_id", milvus::DataType::VARCHAR, "", true, false).WithMaxLength(100));
schema->AddField(milvus::FieldSchema("embedding", milvus::DataType::FLOAT_VECTOR).WithDimension(4));
schema->AddField(milvus::FieldSchema("category", milvus::DataType::VARCHAR).WithMaxLength(1000));

status = client->DropCollection(milvus::DropCollectionRequest().WithCollectionName("demo_manual_ids"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                    .WithCollectionName("demo_manual_ids")
                                    .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
});

const schema = [
  {
    name: "product_id",
    data_type: DataType.VarChar,
    is_primary_key: true,
    autoID: false,
    max_length: 100,
  },
  {
    name: "embedding",
    data_type: DataType.FloatVector,
    dim: 4,
  },
  {
    name: "category",
    data_type: DataType.VarChar,
    max_length: 1000,
  },
];

await client.createCollection({
  collection_name: "demo_manual_ids",
  fields: schema,
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var schema = new CollectionSchema
{
    Fields =
    {
        FieldSchema.CreateVarchar("product_id", maxLength: 100, isPrimaryKey: true, autoId: false), // You provide IDs manually
        FieldSchema.CreateFloatVector("embedding", dimension: 4), // Vector field
        FieldSchema.CreateVarchar("category", maxLength: 1000) // Scalar field of the VARCHAR type
    }
};

if ((await client.HasCollectionAsync(new HasCollectionReq { CollectionName = "demo_manual_ids" })).Has)
{
    await client.DropCollectionAsync(new DropCollectionReq { CollectionName = "demo_manual_ids" });
}

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "demo_manual_ids",
    Schema = schema
});
```

```bash
# restful
export SCHEMA='{
    "autoID": false,
    "fields": [
        {
            "fieldName": "product_id",
            "dataType": "VarChar",
            "isPrimary": true,
            "elementTypeParams": {
                "max_length": "100"
            }
        },
        {
            "fieldName": "embedding",
            "dataType": "FloatVector",
            "isPrimary": false,
            "elementTypeParams": {
                "dim": "4"
            }
        },
        {
            "fieldName": "category",
            "dataType": "VarChar",
            "isPrimary": false,
            "elementTypeParams": {
                "max_length": "1000"
            }
        }
    ]
}'

curl -X POST 'http://localhost:19530/v2/vectordb/collections/create' \
-H 'Content-Type: application/json' \
-H "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"demo_manual_ids\",
    \"schema\": $SCHEMA
}"
```

### Step 2: Insert data with your IDs

You must include the primary field column in every insert operation.

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
# Each entity must contain the primary field `product_id`
data = [
    {"product_id": "PROD-001", "embedding": [0.1, 0.2, 0.3, 0.4], "category": "book"},
    {"product_id": "PROD-002", "embedding": [0.2, 0.3, 0.4, 0.5], "category": "toy"},
]

res = client.insert(collection_name="demo_manual_ids", data=data)
print("Generated IDs:", res.get("ids"))

# Output example:
# Generated IDs: ['PROD-001', 'PROD-002']
```

```java
import com.google.gson.*;
import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;
import java.util.ArrayList;
import java.util.List;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
JsonObject row1 = new JsonObject();
row1.addProperty("product_id", "PROD-001");
row1.add("embedding", gson.toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f}));
row1.addProperty("category", "book");
rows.add(row1);

JsonObject row2 = new JsonObject();
row2.addProperty("product_id", "PROD-002");
row2.add("embedding", gson.toJsonTree(new float[]{0.2f, 0.3f, 0.4f, 0.5f}));
row2.addProperty("category", "toy");
rows.add(row2);

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("demo_manual_ids")
        .data(rows)
        .build());
System.out.printf("Generated IDs: %s\n", insertR.getPrimaryKeys());
```

```go
import (
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

data = []any{
        map[string]any{"product_id": "PROD-001", "embedding": []float32{0.1, 0.2, 0.3, 0.4}, "category": "book"},
        map[string]any{"product_id": "PROD-002", "embedding": []float32{0.2, 0.3, 0.4, 0.5}, "category": "toy"},
}

result, err = cli.Insert(ctx, milvusclient.NewRowBasedInsertOption("demo_manual_ids", data...))
if err != nil {
        log.Fatal("failed to insert:", err)
}
for i := 0; i < result.IDs.Len(); i++ {
        id, _ := result.IDs.GetAsString(i)
        fmt.Println("Inserted ID:", id)
}
```

```rust
use milvus::v2::prelude::*;

client
    .insert(
        InsertRequest::builder()
            .collection_name("demo_manual_ids")
            .rows([
                serde_json::json!({"product_id": "PROD-001", "embedding": [0.1, 0.2, 0.3, 0.4], "category": "book"}),
                serde_json::json!({"product_id": "PROD-002", "embedding": [0.2, 0.3, 0.4, 0.5], "category": "toy"}),
            ])
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>

milvus::EntityRows data = {{{"product_id", "PROD-001"}, {"embedding", std::vector<float>{0.1, 0.2, 0.3, 0.4}}, {"category", "book"}},
                           {{"product_id", "PROD-002"}, {"embedding", std::vector<float>{0.2, 0.3, 0.4, 0.5}}, {"category", "toy"}}};

milvus::InsertResponse response;
auto status = client->Insert(milvus::InsertRequest()
                                .WithCollectionName("demo_manual_ids")
                                .WithRowsData(std::move(data))
                                , response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
auto string_ids = response.Results().IdArray().StrIDArray();
```

```javascript
const data = [
    {"product_id": "PROD-001", "embedding": [0.1, 0.2, 0.3, 0.4], "category": "book"},
    {"product_id": "PROD-002", "embedding": [0.2, 0.3, 0.4, 0.5], "category": "toy"},
];

const insert = await client.insert({
    collection_name: "demo_manual_ids",
    fields_data: data,
});

console.log(insert);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Responses.Dml;
using Milvus.Client.V2.Types;

// Each entity must contain the primary field `product_id`
var data = new[]
{
    new Dictionary<string, object?>
    {
        ["product_id"] = "PROD-001",
        ["embedding"] = new[] { 0.1f, 0.2f, 0.3f, 0.4f },
        ["category"] = "book"
    },
    new Dictionary<string, object?>
    {
        ["product_id"] = "PROD-002",
        ["embedding"] = new[] { 0.2f, 0.3f, 0.4f, 0.5f },
        ["category"] = "toy"
    }
};

MutationResp res = await client.InsertAsync(new InsertReq
{
    CollectionName = "demo_manual_ids",
    RowsData = data
});
Console.WriteLine("Generated IDs: " + string.Join(", ", res.StringIds ?? []));
```

```bash
# restful
export INSERT_DATA='[
    {
        "product_id": "PROD-001",
        "embedding": [0.1, 0.2, 0.3, 0.4],
        "category": "book"
    },
    {
        "product_id": "PROD-002",
        "embedding": [0.2, 0.3, 0.4, 0.5],
        "category": "toy"
    }
]'

# 插入数据
curl -X POST 'http://localhost:19530/v2/vectordb/entities/insert' \
-H 'Content-Type: application/json' \
-H "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"demo_manual_ids\",
    \"data\": $INSERT_DATA
}"
```

Your responsibilities:

- Ensure all IDs are unique across all entities

- Include the primary field in every insert/import operation

- Handle ID conflicts and duplicate detection yourself

## Advanced usage

### Migrate data with existing AutoIDs

To preserve existing IDs during data migration, enable the `allow_insert_auto_id` property by making the `alter_collection_properties` call. When set to true, Milvus accepts user-provided IDs even if AutoID is enabled.

For configuration details, refer to [Modify Collection](modify-collection.md#Example-6-Enable-allow_insert_auto_id).

### Ensure global AutoID uniqueness across clusters

When running multiple Milvus clusters, configure a unique cluster ID for each to ensure AutoIDs never overlap.

**Configuration:** Edit the `common.clusterID` config in `milvus.yaml` before initializing your cluster:

```yaml
common:
  clusterID: 3   # Must be unique across all clusters (Range: 0-7)
```

In this config, `clusterID` specifies the unique identifier used in AutoID generation, ranging from 0 to 7 (supports up to eight clusters).

<div class="alert note">

Milvus handles bit-reversal internally to enable future expansion without ID overlap. No manual configuration needed beyond setting the cluster ID.

</div>

## Reference: How AutoID works

Understanding how AutoID generates unique identifiers internally can help you [configure cluster IDs](primary-field.md#Ensure-global-AutoID-uniqueness-across-clusters) correctly and troubleshoot ID-related issues.

AutoID uses a structured 64-bit format to guarantee uniqueness:

```plaintext
[sign_bit][cluster_id][physical_ts][logical_ts]
```

<table>
   <tr>
     <th><p>Segment</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>sign_bit</code></p></td>
     <td><p>Reserved for internal use</p></td>
   </tr>
   <tr>
     <td><p><code>cluster_id</code></p></td>
     <td><p>Identifies which cluster generated the ID (value range: 0-7)</p></td>
   </tr>
   <tr>
     <td><p><code>physical_ts</code></p></td>
     <td><p>Timestamp in milliseconds when the ID was generated</p></td>
   </tr>
   <tr>
     <td><p><code>logical_ts</code></p></td>
     <td><p>Counter to distinguish IDs created in the same millisecond</p></td>
   </tr>
</table>

<div class="alert note">

Even when AutoID is enabled with `VARCHAR` as the data type, Milvus still generates numeric IDs. These are stored as numeric strings with a maximum length of 20 characters (uint64 range).

</div>

