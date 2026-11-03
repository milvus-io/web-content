---
id: default-values.md
title: "Default Values"
summary: "Set default values for scalar fields so Milvus fills missing values during entity insertion."
---

# Default Values

Milvus allows you to set default values for scalar fields (excluding the primary field). When a field has a default value configured, Milvus automatically applies this value if no data is provided during insertion.

Default values simplify data migration from other database systems to Milvus by preserving existing default value settings. You can also use default values for fields where values might be uncertain at the time of insertion.

## Limits

- Only scalar fields support default values. The primary field and vector fields cannot have default values.

- `JSON` and `ARRAY` fields do not support default values.

- Default values can only be configured during collection creation and cannot be modified afterward.

## Set default values

When creating a collection, use the `default_value` parameter in `add_field()` to define the default value for a field.

The following example creates a collection with two scalar fields that have default values: `age` defaults to `18` and `status` defaults to `"active"`.

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

client = MilvusClient(uri='http://localhost:19530', token='root:Milvus')

# Drop the collection if it already exists
if client.has_collection("my_collection"):
    client.drop_collection("my_collection")

# Define collection schema
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="vector", datatype=DataType.FLOAT_VECTOR, dim=5)
# highlight-start
schema.add_field(field_name="age", datatype=DataType.INT64, default_value=18)
schema.add_field(field_name="status", datatype=DataType.VARCHAR, default_value="active", max_length=10)
# highlight-end

# Set index params
index_params = client.prepare_index_params()
index_params.add_index(field_name="vector", index_type="AUTOINDEX", metric_type="L2")

# Create collection
client.create_collection(collection_name="my_collection", schema=schema, index_params=index_params)

# Load the collection
client.load_collection("my_collection")
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.collection.request.HasCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import java.util.ArrayList;
import java.util.List;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());

String collectionName = "my_collection";

// Drop the collection if it already exists
if (client.hasCollection(HasCollectionReq.builder().collectionName(collectionName).build())) {
    client.dropCollection(DropCollectionReq.builder().collectionName(collectionName).build());
}

CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(true)
        .build();

schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(false)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());
// highlight-start
schema.addField(AddFieldReq.builder()
        .fieldName("age")
        .dataType(DataType.Int64)
        .defaultValue(18L)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("status")
        .dataType(DataType.VarChar)
        .defaultValue("active")
        .maxLength(10)
        .build());
// highlight-end

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(IndexParam.builder()
        .fieldName("vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.L2)
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(collectionName)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());

// Load the collection
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(collectionName)
        .build());
```

```go
import (
    "context"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    log.Fatal(err)
}
defer client.Close(ctx)

collectionName := "my_collection"

// Drop the collection if it already exists
has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
if err != nil {
    log.Fatal(err)
}
if has {
    err = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
    if err != nil {
        log.Fatal(err)
    }
}

schema := entity.NewSchema().WithDynamicFieldEnabled(true).
    WithField(entity.NewField().
        WithName("id").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true).
        WithIsAutoID(false)).
    WithField(entity.NewField().
        WithName("vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(5)).
    WithField(entity.NewField().
        WithName("age").
        WithDataType(entity.FieldTypeInt64).
        WithDefaultValueLong(18)).
    WithField(entity.NewField().
        WithName("status").
        WithDataType(entity.FieldTypeVarChar).
        WithDefaultValueString("active").
        WithMaxLength(10))

indexOption := milvusclient.NewCreateIndexOption(
    collectionName,
    "vector",
    index.NewAutoIndex(entity.L2),
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithIndexOptions(indexOption))
if err != nil {
    log.Fatal(err)
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
if err != nil {
    log.Fatal(err)
}
if err := loadTask.Await(ctx); err != nil {
    log.Fatal(err)
}
```

```rust
use milvus::v2::error::Result;
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

const COLLECTION_NAME: &str = "my_collection";

// Drop the collection if it already exists
if client
    .has_collection(
        HasCollectionRequest::builder()
            .collection_name(COLLECTION_NAME)
            .build()?,
    )
    .await?
    .exists()
{
    client
        .drop_collection(
            DropCollectionRequest::builder()
                .collection_name(COLLECTION_NAME)
                .build()?,
        )
        .await?;
}

// Define the collection schema
let schema = CollectionSchema::new()
    .enable_dynamic_field(true)
    .add_field(
        FieldSchema::new()
            .name("id")
            .data_type(DataType::Int64)
            .primary_key(true)
            .auto_id(false),
    )
    .add_field(
        FieldSchema::new()
            .name("vector")
            .data_type(DataType::FloatVector)
            .dimension(5),
    )
    // highlight-start
    .add_field(
        FieldSchema::new()
            .name("age")
            .data_type(DataType::Int64)
            .default_value(DefaultValue::Int64(18)),
    )
    .add_field(
        FieldSchema::new()
            .name("status")
            .data_type(DataType::VarChar)
            .default_value(DefaultValue::String("active".into()))
            .max_length(10),
    );
    // highlight-end

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name(COLLECTION_NAME)
            .schema(schema)
            .index_params(vec![IndexParam::new()
                .field_name("vector")
                .index_type(IndexType::AutoIndex)
                .metric_type(MetricType::L2)])
            .build()?,
    )
    .await?;

client
    .load_collection(
        LoadCollectionRequest::builder()
            .collection_name(COLLECTION_NAME)
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include <string>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const std::string collection_name = "my_collection";

// Drop the collection if it already exists
milvus::HasCollectionResponse has_resp;
status = client->HasCollection(milvus::HasCollectionRequest().WithCollectionName(collection_name), has_resp);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
if (has_resp.Has()) {
    status = client->DropCollection(milvus::DropCollectionRequest().WithCollectionName(collection_name));
    if (!status.IsOk()) {
        std::cout << status.Message() << std::endl;
    }
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField({"id", milvus::DataType::INT64, "", true, false});
schema->AddField(milvus::FieldSchema("vector", milvus::DataType::FLOAT_VECTOR).WithDimension(5));
// highlight-start
schema->AddField(milvus::FieldSchema("age", milvus::DataType::INT64).WithDefaultValue(18));
schema->AddField(milvus::FieldSchema("status", milvus::DataType::VARCHAR).WithDefaultValue("active").WithMaxLength(10));
// highlight-end

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                        .WithCollectionName(collection_name)
                                        .WithCollectionSchema(schema)
                                        .AddIndex(milvus::IndexDesc("vector", "vector_index", milvus::IndexType::AUTOINDEX, milvus::MetricType::L2)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->LoadCollection(milvus::LoadCollectionRequest().WithCollectionName(collection_name));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { DataType, MilvusClient } from '@zilliz/milvus2-sdk-node';

const client = new MilvusClient({
  address: 'http://localhost:19530',
  token: 'root:Milvus',
});

const collectionName = 'my_collection';

// Drop the collection if it already exists
await client.dropCollection({ collection_name: collectionName }).catch(() => {});

await client.createCollection({
  collection_name: collectionName,
  enable_dynamic_field: true,
  fields: [
    {
      name: 'id',
      data_type: DataType.Int64,
      is_primary_key: true,
      autoID: false,
    },
    {
      name: 'vector',
      data_type: DataType.FloatVector,
      dim: 5,
    },
    // highlight-start
    {
      name: 'age',
      data_type: DataType.Int64,
      default_value: 18,
    },
    {
      name: 'status',
      data_type: DataType.VarChar,
      default_value: 'active',
      max_length: 10,
    },
    // highlight-end
  ],
});

// Create an index on the vector field
await client.createIndex({
  collection_name: collectionName,
  field_name: 'vector',
  index_type: 'AUTOINDEX',
  metric_type: 'L2',
  index_name: 'vector_index',
});

// Load the collection
await client.loadCollection({ collection_name: collectionName });
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

var config = new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
};
using var client = new MilvusClientV2(config);
await client.ConnectAsync();

// Drop the collection if it already exists
if ((await client.HasCollectionAsync(new HasCollectionReq { CollectionName = "my_collection" })).Has)
{
    await client.DropCollectionAsync(new DropCollectionReq { CollectionName = "my_collection" });
}

// Define collection schema
var ageField = new FieldSchema("age", DataType.Int64) { DefaultValue = 18L };
var statusField = FieldSchema.CreateVarchar("status", maxLength: 10);
statusField.DefaultValue = "active";

var schema = new CollectionSchema
{
    EnableDynamicFields = true,
    Fields =
    {
        new FieldSchema("id", DataType.Int64, isPrimaryKey: true),
        FieldSchema.CreateFloatVector("vector", dimension: 5),
        ageField,
        statusField
    }
};

// Set index params
var indexParam = new IndexParam(
    fieldName: "vector",
    indexType: IndexType.AutoIndex,
    metricType: MetricType.L2);

// Create collection
await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema,
    Indexes = [indexParam]
});

// Load the collection
await client.LoadCollectionAsync(new LoadCollectionReq { CollectionName = "my_collection" });
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

# Drop the collection if it already exists
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{"collectionName": "my_collection"}'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "my_collection",
    "schema": {
      "enableDynamicField": true,
      "fields": [
        {
          "fieldName": "id",
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
          "fieldName": "age",
          "dataType": "Int64",
          "defaultValue": 18
        },
        {
          "fieldName": "status",
          "dataType": "VarChar",
          "defaultValue": "active",
          "elementTypeParams": {
            "max_length": 10
          }
        }
      ]
    },
    "indexParams": [
      {
        "fieldName": "vector",
        "indexName": "vector_index",
        "indexType": "AUTOINDEX",
        "metricType": "L2"
      }
    ]
  }'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "my_collection"
  }'
```

## Insert entities

When inserting data, if you omit a field that has a default value or explicitly set it to NULL, Milvus automatically uses the configured default value.

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
    # All fields provided explicitly
    {"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30, "status": "premium"},
    # age and status omitted → both use default values (18 and "active")
    {"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6]},
    # status set to None → uses default value "active"
    {"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7], "age": 25, "status": None},
    # age set to None → uses default value 18
    {"id": 4, "vector": [0.4, 0.5, 0.6, 0.7, 0.8], "age": None, "status": "inactive"}
]

client.insert(collection_name="my_collection", data=data)

# Flush so the inserted rows are immediately queryable
client.flush(collection_name="my_collection")
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonNull;
import com.google.gson.JsonObject;
import io.milvus.v2.service.utility.request.FlushReq;
import io.milvus.v2.service.vector.request.InsertReq;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

String collectionName = "my_collection";

Gson gson = new Gson();
List<JsonObject> data = new ArrayList<>();

// All fields provided explicitly
JsonObject row1 = new JsonObject();
row1.addProperty("id", 1L);
row1.add("vector", gson.toJsonTree(new float[]{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}));
row1.addProperty("age", 30L);
row1.addProperty("status", "premium");
data.add(row1);

// age and status omitted: both use default values (18 and "active")
JsonObject row2 = new JsonObject();
row2.addProperty("id", 2L);
row2.add("vector", gson.toJsonTree(new float[]{0.2f, 0.3f, 0.4f, 0.5f, 0.6f}));
data.add(row2);

// status set to null: uses default value "active"
JsonObject row3 = new JsonObject();
row3.addProperty("id", 3L);
row3.add("vector", gson.toJsonTree(new float[]{0.3f, 0.4f, 0.5f, 0.6f, 0.7f}));
row3.addProperty("age", 25L);
row3.add("status", JsonNull.INSTANCE);
data.add(row3);

// age set to null: uses default value 18
JsonObject row4 = new JsonObject();
row4.addProperty("id", 4L);
row4.add("vector", gson.toJsonTree(new float[]{0.4f, 0.5f, 0.6f, 0.7f, 0.8f}));
row4.add("age", JsonNull.INSTANCE);
row4.addProperty("status", "inactive");
data.add(row4);

client.insert(InsertReq.builder()
        .collectionName(collectionName)
        .data(data)
        .build());

// Flush so the inserted rows are immediately queryable
client.flush(FlushReq.builder()
        .collectionNames(Collections.singletonList(collectionName))
        .build());
```

```go
import (
    "log"

    "github.com/milvus-io/milvus/client/v3/column"

    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

collectionName = "my_collection"

ageColumn, err := column.NewNullableColumnInt64(
    "age",
    []int64{30, 0, 25, 0},
    []bool{true, false, true, false},
    column.WithSparseNullableMode[int64](true),
)
if err != nil {
    log.Fatal(err)
}

statusColumn, err := column.NewNullableColumnVarChar(
    "status",
    []string{"premium", "", "", "inactive"},
    []bool{true, false, false, true},
    column.WithSparseNullableMode[string](true),
)
if err != nil {
    log.Fatal(err)
}

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName,
    column.NewColumnInt64("id", []int64{1, 2, 3, 4}),
    column.NewColumnFloatVector("vector", 5, [][]float32{
        {0.1, 0.2, 0.3, 0.4, 0.5},
        {0.2, 0.3, 0.4, 0.5, 0.6},
        {0.3, 0.4, 0.5, 0.6, 0.7},
        {0.4, 0.5, 0.6, 0.7, 0.8},
    }),
    // age: row 2 and row 4 use the default value 18
    ageColumn,
    // status: row 2 and row 3 use the default value "active"
    statusColumn,
))
if err != nil {
    log.Fatal(err)
}

// Flush so the inserted rows are immediately queryable
flushTask, err := client.Flush(ctx, milvusclient.NewFlushOption(collectionName))
if err != nil {
    log.Fatal(err)
}
if err := flushTask.Await(ctx); err != nil {
    log.Fatal(err)
}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

const COLLECTION_NAME: &str = "my_collection";

let rows = vec![
    json!({"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30, "status": "premium"}),
    json!({"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6]}),
    json!({"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7], "age": 25, "status": null}),
    json!({"id": 4, "vector": [0.4, 0.5, 0.6, 0.7, 0.8], "age": null, "status": "inactive"}),
];

client
    .insert(
        InsertRequest::builder()
            .collection_name(COLLECTION_NAME)
            .rows(rows)
            .build()?,
    )
    .await?;

client
    .flush(
        FlushRequest::builder()
            .collection_names([COLLECTION_NAME])
            .wait_flushed_ms(60_000)
            .build()?,
    )
    .await?;
```

```cpp
#include <iostream>
#include <string>
#include <vector>

const std::string collection_name = "my_collection";

milvus::EntityRows rows;
rows.push_back({{"id", 1}, {"vector", std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}}, {"age", 30}, {"status", "premium"}});
rows.push_back({{"id", 2}, {"vector", std::vector<float>{0.2f, 0.3f, 0.4f, 0.5f, 0.6f}}});
rows.push_back({{"id", 3}, {"vector", std::vector<float>{0.3f, 0.4f, 0.5f, 0.6f, 0.7f}}, {"age", 25}, {"status", nullptr}});
rows.push_back({{"id", 4}, {"vector", std::vector<float>{0.4f, 0.5f, 0.6f, 0.7f, 0.8f}}, {"age", nullptr}, {"status", "inactive"}});

milvus::InsertResponse resp_insert;
auto status = client->Insert(milvus::InsertRequest()
                                 .WithCollectionName(collection_name)
                                 .WithRowsData(std::move(rows)),
                             resp_insert);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->Flush(milvus::FlushRequest()
                           .WithCollectionNames({collection_name})
                           .WithWaitFlushedMs(60000));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const data = [
  // All fields provided explicitly
  { id: 1, vector: [0.1, 0.2, 0.3, 0.4, 0.5], age: 30, status: 'premium' },
  // age and status omitted: both use default values (18 and "active")
  { id: 2, vector: [0.2, 0.3, 0.4, 0.5, 0.6] },
  // status set to null: uses default value "active"
  { id: 3, vector: [0.3, 0.4, 0.5, 0.6, 0.7], age: 25, status: null },
  // age set to null: uses default value 18
  { id: 4, vector: [0.4, 0.5, 0.6, 0.7, 0.8], age: null, status: 'inactive' },
];

await client.insert({
  collection_name: collectionName,
  fields_data: data,
});

// Flush so the inserted rows are immediately queryable
await client.flush({ collection_names: [collectionName] });
```

```csharp
using Milvus.Client.V2.Requests.Dml;

var data = new[]
{
    // All fields provided explicitly
    new Dictionary<string, object?>
    {
        ["id"] = 1L, ["vector"] = new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }, ["age"] = 30L, ["status"] = "premium"
    },
    // age and status omitted → both use default values (18 and "active")
    new Dictionary<string, object?>
    {
        ["id"] = 2L, ["vector"] = new[] { 0.2f, 0.3f, 0.4f, 0.5f, 0.6f }
    },
    // status set to None → uses default value "active"
    new Dictionary<string, object?>
    {
        ["id"] = 3L, ["vector"] = new[] { 0.3f, 0.4f, 0.5f, 0.6f, 0.7f }, ["age"] = 25L, ["status"] = null
    },
    // age set to None → uses default value 18
    new Dictionary<string, object?>
    {
        ["id"] = 4L, ["vector"] = new[] { 0.4f, 0.5f, 0.6f, 0.7f, 0.8f }, ["age"] = null, ["status"] = "inactive"
    }
};

await client.InsertAsync(new InsertReq
{
    CollectionName = "my_collection",
    RowsData = data
});

// Flush so the inserted rows are immediately queryable
await client.FlushAsync(new Milvus.Client.V2.Requests.Utility.FlushReq { CollectionNames = ["my_collection"] });
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "my_collection",
    "data": [
      {
        "id": 1,
        "vector": [0.1, 0.2, 0.3, 0.4, 0.5],
        "age": 30,
        "status": "premium"
      },
      {
        "id": 2,
        "vector": [0.2, 0.3, 0.4, 0.5, 0.6]
      },
      {
        "id": 3,
        "vector": [0.3, 0.4, 0.5, 0.6, 0.7],
        "age": 25,
        "status": null
      },
      {
        "id": 4,
        "vector": [0.4, 0.5, 0.6, 0.7, 0.8],
        "age": null,
        "status": "inactive"
      }
    ]
  }'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/flush" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "my_collection"
  }'
```

## Search and query with default values

Entities containing default values behave the same as any other entities during vector searches and scalar filtering. You can filter by default values in both `search` and `query` operations.

The following example searches for entities where `age` equals the default value `18`:

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
res = client.search(
    collection_name="my_collection",
    data=[[0.1, 0.2, 0.4, 0.3, 0.5]],
    search_params={"params": {"nprobe": 16}},
    filter="age == 18",
    limit=10,
    output_fields=["id", "age", "status"]
)

print("Search results (age == 18):")
for hit in res[0]:
    print(f"  id: {hit['id']}, age: {hit['entity']['age']}, status: {hit['entity']['status']}")
```

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

String collectionName = "my_collection";

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName(collectionName)
        .data(Collections.singletonList(new FloatVec(Arrays.asList(0.1f, 0.2f, 0.4f, 0.3f, 0.5f))))
        .annsField("vector")
        .searchParams(Collections.singletonMap("nprobe", 16))
        .filter("age == 18")
        .limit(10)
        .outputFields(Arrays.asList("id", "age", "status"))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

System.out.println("Search results (age == 18):");
for (SearchResp.SearchResult hit : searchResp.getSearchResults().get(0)) {
    System.out.printf("  id: %s, age: %s, status: %s%n",
            hit.getId(),
            hit.getEntity().get("age"),
            hit.getEntity().get("status"));
}
```

```go
import (
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"

    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

collectionName = "my_collection"

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 16)

searchResults, err := client.Search(ctx, milvusclient.NewSearchOption(
    collectionName,
    10,
    []entity.Vector{entity.FloatVector([]float32{0.1, 0.2, 0.4, 0.3, 0.5})},
).
    WithANNSField("vector").
    WithAnnParam(annParam).
    WithFilter("age == 18").
    WithOutputFields("id", "age", "status").
    WithConsistencyLevel(entity.ClStrong))
if err != nil {
    log.Fatal(err)
}

fmt.Println("Search results (age == 18):")
for _, resultSet := range searchResults {
    fmt.Println(resultSet.Fields)
}
```

```rust
use milvus::v2::prelude::*;
use std::collections::HashMap;

const COLLECTION_NAME: &str = "my_collection";

let response = client
    .search(
        SearchRequest::builder()
            .collection_name(COLLECTION_NAME)
            .vector_field("vector")
            .vectors(SearchVectors::Float(vec![vec![0.1, 0.2, 0.4, 0.3, 0.5]]))
            .filter("age == 18")
            .output_fields(["id", "age", "status"])
            .extra_params(HashMap::from([("nprobe".into(), "16".into())]))
            .limit(10)
            .build()?,
    )
    .await?;

println!("Search results (age == 18):");
for result in response.results() {
    for row in result.rows()? {
        let e = row.to_entity_row()?;
        println!("  id: {}, age: {}, status: {}", e["id"], e["age"], e["status"]);
    }
}
```

```cpp
#include <iostream>
#include <string>
#include <vector>

const std::string collection_name = "my_collection";

std::string filter = "age == 18";
std::vector<float> query_vector = {0.1f, 0.2f, 0.4f, 0.3f, 0.5f};
auto request = milvus::SearchRequest()
                   .WithCollectionName(collection_name)
                   .WithFilter(filter)
                   .WithLimit(10)
                   .AddOutputField("id")
                   .AddOutputField("age")
                   .AddOutputField("status")
                   .AddFloatVector(query_vector);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::cout << "Search results (age == 18):" << std::endl;
for (auto& result : response.Results().Results()) {
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "  id: " << row["id"] << ", age: " << row["age"] << ", status: " << row["status"] << std::endl;
    }
}
```

```javascript
const searchResults = await client.search({
  collection_name: collectionName,
  data: [[0.1, 0.2, 0.4, 0.3, 0.5]],
  anns_field: 'vector',
  params: { nprobe: 16 },
  filter: 'age == 18',
  limit: 10,
  output_fields: ['id', 'age', 'status'],
  consistency_level: 'Strong',
});

console.log('Search results (age == 18):');
for (const hit of searchResults.results) {
  console.log(`  id: ${hit.id}, age: ${hit.age}, status: ${hit.status}`);
}
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

SearchResp res = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    Vectors = [new ReadOnlyMemory<float>(new[] { 0.1f, 0.2f, 0.4f, 0.3f, 0.5f })],
    VectorFieldName = "vector",
    MetricType = MetricType.L2,
    Limit = 10,
    Parameters = new SearchParameters
    {
        Nprobe = 16,
        Expression = "age == 18",
        OutputFields = { "id", "age", "status" }
    }
});
Console.WriteLine("Search results (age == 18):");
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "my_collection",
    "data": [[0.1, 0.2, 0.4, 0.3, 0.5]],
    "annsField": "vector",
    "searchParams": {
      "params": {
        "nprobe": 16
      }
    },
    "filter": "age == 18",
    "limit": 10,
    "outputFields": ["id", "age", "status"],
    "consistencyLevel": "Strong"
  }'
```

<details>

<summary>Expected output</summary>

```plaintext
Output:
Search results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive
```

</details>

You can also query entities by matching default values directly:

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
# Query entities where age equals the default value (18)
default_age_results = client.query(
    collection_name="my_collection",
    filter="age == 18",
    output_fields=["id", "age", "status"]
)

print("\nQuery results (age == 18):")
for r in default_age_results:
    print(f"  id: {r['id']}, age: {r['age']}, status: {r['status']}")

# Query entities where status equals the default value ("active")
default_status_results = client.query(
    collection_name="my_collection",
    filter='status == "active"',
    output_fields=["id", "age", "status"]
)

print("\nQuery results (status == 'active'):")
for r in default_status_results:
    print(f"  id: {r['id']}, age: {r['age']}, status: {r['status']}")
```

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

String collectionName = "my_collection";

// Query entities where age equals the default value (18)
QueryResp defaultAgeResults = client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter("age == 18")
        .outputFields(Arrays.asList("id", "age", "status"))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

System.out.println("\nQuery results (age == 18):");
for (QueryResp.QueryResult row : defaultAgeResults.getQueryResults()) {
    System.out.printf("  id: %s, age: %s, status: %s%n",
            row.getEntity().get("id"),
            row.getEntity().get("age"),
            row.getEntity().get("status"));
}

// Query entities where status equals the default value ("active")
QueryResp defaultStatusResults = client.query(QueryReq.builder()
        .collectionName(collectionName)
        .filter("status == \"active\"")
        .outputFields(Arrays.asList("id", "age", "status"))
        .consistencyLevel(ConsistencyLevel.STRONG)
        .build());

System.out.println("\nQuery results (status == 'active'):");
for (QueryResp.QueryResult row : defaultStatusResults.getQueryResults()) {
    System.out.printf("  id: %s, age: %s, status: %s%n",
            row.getEntity().get("id"),
            row.getEntity().get("age"),
            row.getEntity().get("status"));
}
```

```go
import (
    "fmt"
    "log"

    "github.com/milvus-io/milvus/client/v3/entity"

    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

collectionName = "my_collection"

// Query entities where age equals the default value (18)
defaultAgeResults, err := client.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter("age == 18").
    WithOutputFields("id", "age", "status").
    WithConsistencyLevel(entity.ClStrong))
if err != nil {
    log.Fatal(err)
}

fmt.Println("\nQuery results (age == 18):")
fmt.Println(defaultAgeResults.Fields)

// Query entities where status equals the default value ("active")
defaultStatusResults, err := client.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(`status == "active"`).
    WithOutputFields("id", "age", "status").
    WithConsistencyLevel(entity.ClStrong))
if err != nil {
    log.Fatal(err)
}

fmt.Println("\nQuery results (status == 'active'):")
fmt.Println(defaultStatusResults.Fields)
```

```rust
use milvus::v2::prelude::*;

const COLLECTION_NAME: &str = "my_collection";

let response = client
    .query(
        QueryRequest::builder()
            .collection_name(COLLECTION_NAME)
            .filter("age == 18")
            .output_fields(["id", "age", "status"])
            .build()?,
    )
    .await?;

println!("\nQuery results (age == 18):");
for row in response.results().rows()? {
    let e = row.to_entity_row()?;
    println!("  id: {}, age: {}, status: {}", e["id"], e["age"], e["status"]);
}

let response = client
    .query(
        QueryRequest::builder()
            .collection_name(COLLECTION_NAME)
            .filter("status == \"active\"")
            .output_fields(["id", "age", "status"])
            .build()?,
    )
    .await?;

println!("\nQuery results (status == 'active'):");
for row in response.results().rows()? {
    let e = row.to_entity_row()?;
    println!("  id: {}, age: {}, status: {}", e["id"], e["age"], e["status"]);
}
```

```cpp
#include <iostream>
#include <string>

const std::string collection_name = "my_collection";

// Query entities where age equals the default value (18)
std::string filter = "age == 18";
auto request = milvus::QueryRequest()
                       .WithCollectionName(collection_name)
                       .WithFilter(filter)
                       .AddOutputField("id")
                       .AddOutputField("age")
                       .AddOutputField("status");

milvus::QueryResponse response;
auto status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::cout << "\nQuery results (age == 18):" << std::endl;
milvus::EntityRows output_rows;
status = response.Results().OutputRows(output_rows);
for (const auto& row : output_rows) {
    std::cout << "  id: " << row["id"] << ", age: " << row["age"] << ", status: " << row["status"] << std::endl;
}

// Query entities where status equals the default value ("active")
std::string filter2 = "status == \"active\"";
auto request2 = milvus::QueryRequest()
                       .WithCollectionName(collection_name)
                       .WithFilter(filter2)
                       .AddOutputField("id")
                       .AddOutputField("age")
                       .AddOutputField("status");

milvus::QueryResponse response2;
status = client->Query(request2, response2);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::cout << "\nQuery results (status == 'active'):" << std::endl;
milvus::EntityRows output_rows2;
status = response2.Results().OutputRows(output_rows2);
for (const auto& row : output_rows2) {
    std::cout << "  id: " << row["id"] << ", age: " << row["age"] << ", status: " << row["status"] << std::endl;
}
```

```javascript
// Query entities where age equals the default value (18)
const defaultAgeResults = await client.query({
  collection_name: collectionName,
  filter: 'age == 18',
  output_fields: ['id', 'age', 'status'],
  consistency_level: 'Strong',
});

console.log('\nQuery results (age == 18):');
for (const row of defaultAgeResults.data) {
  console.log(`  id: ${row.id}, age: ${row.age}, status: ${row.status}`);
}

// Query entities where status equals the default value ("active")
const defaultStatusResults = await client.query({
  collection_name: collectionName,
  filter: 'status == "active"',
  output_fields: ['id', 'age', 'status'],
  consistency_level: 'Strong',
});

console.log("\nQuery results (status == 'active'):");
for (const row of defaultStatusResults.data) {
  console.log(`  id: ${row.id}, age: ${row.age}, status: ${row.status}`);
}
```

```csharp
using Milvus.Client.V2.Requests.Dql;

QueryResp defaultAgeResults = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = "age == 18",
    Parameters = new QueryParameters
    {
        OutputFields = { "id", "age", "status" }
    }
});

Console.WriteLine("Query results (age == 18):");

QueryResp defaultStatusResults = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = "status == \"active\"",
    Parameters = new QueryParameters
    {
        OutputFields = { "id", "age", "status" }
    }
});

Console.WriteLine("Query results (status == 'active'):");
```

```bash
curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "my_collection",
    "filter": "age == 18",
    "outputFields": ["id", "age", "status"],
    "consistencyLevel": "Strong"
  }'

curl --request POST \
  --url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
  --header "Authorization: Bearer ${TOKEN}" \
  --header "Content-Type: application/json" \
  --data '{
    "collectionName": "my_collection",
    "filter": "status == \"active\"",
    "outputFields": ["id", "age", "status"],
    "consistencyLevel": "Strong"
  }'
```

<details>

<summary>Expected output</summary>

```plaintext
Query results (age == 18):
  id: 2, age: 18, status: active
  id: 4, age: 18, status: inactive

Query results (status == 'active'):
  id: 2, age: 18, status: active
  id: 3, age: 25, status: active
```

</details>

## Applicable rules

When both `nullable` and `default_value` are configured for a field, the following rules determine how Milvus handles NULL input or missing field values during insertion.

<table>
   <tr>
     <th><p>Nullable</p></th>
     <th><p>Default Value</p></th>
     <th><p>User Input</p></th>
     <th><p>Result</p></th>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>✅ (non-NULL)</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Uses the default value</p></td>
   </tr>
   <tr>
     <td><p>✅</p></td>
     <td><p>❌</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Stored as NULL</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅ (non-NULL)</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Uses the default value</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>❌</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Throws an error</p></td>
   </tr>
   <tr>
     <td><p>❌</p></td>
     <td><p>✅ (NULL)</p></td>
     <td><p>NULL or omitted</p></td>
     <td><p>Throws an error</p></td>
   </tr>
</table>

**Key takeaways:**

- When a field has a non-NULL default value, that value is used regardless of whether `nullable` is enabled.

- When `nullable=True` but no default value is set, the field stores NULL.

- When `nullable=False` and no default value is set, insertion fails with an error.

- Setting a NULL default value on a non-nullable field is invalid and causes an error.
