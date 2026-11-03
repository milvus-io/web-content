---
id: number.md
title: "Boolean & Number"
summary: "A boolean or number field is a scalar field that stores boolean or numeric values. These values can be one of two possible values or whole numbers (integers) and decimal numbers (floating-point numbers). They are typically used to represent quantities, measurements, or any data that needs to be logically or mathematically processed."
---

# Boolean & Number

A boolean or number field is a scalar field that stores boolean or numeric values. These values can be one of two possible values or whole numbers (**integers**) and decimal numbers (**floating-point numbers**). They are typically used to represent quantities, measurements, or any data that needs to be logically or mathematically processed.

The table below describes the data types of number fields available in Milvus clusters.

| Field Type | Description |
| --- | --- |
| `BOOL` | Boolean type for storing `true` or `false`, suitable for describing binary states. |
| `INT8` | 8-bit integer, suitable for storing small-range integer data. |
| `INT16` | 16-bit integer, for medium-range integer data. |
| `INT32` | 32-bit integer, ideal for general integer data storage like product quantities or user IDs. |
| `INT64` | 64-bit integer, suitable for storing large-range data like timestamps or identifiers. |
| `FLOAT` | 32-bit floating-point number, for data requiring general precision, such as ratings or temperature. |
| `DOUBLE` | 64-bit double-precision floating-point number, for high-precision data like financial information or scientific calculations. |

To declare a boolean field, simply set `datatype` to `BOOL`. To declare a number field, simply set that to one of the available numeric data types. For example, `DataType.INT64` for an integer field or `DataType.FLOAT` for a floating-point field.

<div class="alert note">

Milvus supports null values and default values for boolean and number fields. To enable these features, set `nullable` to `True` and `default_value` to a numeric value. For details, refer to [Nullable & Default](nullable-and-default.md).

</div>

## Add boolean and number fields

To store boolean or numeric data, define corresponding types of fields in your collection schema. Below is an example of a collection schema with two number fields:

- `age`: stores integer data, allows null values, and has a default value of `18`.

- `broken`: stores boolean data, allows null values, but does not have a default value.

- `price`: stores float data, allows null values, but does not have a default value.

<div class="alert note">

If you set `enable_dynamic_field=True` when defining the schema, Milvus allows you to insert scalar fields that were not defined in advance. However, this may increase the complexity of queries and management, potentially impacting performance. For more information, refer to [Dynamic Field](enable-dynamic-field.md).

</div>

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
# Import necessary libraries
from pymilvus import MilvusClient, DataType

# Define server address
SERVER_ADDR = "http://localhost:19530"

# Create a MilvusClient instance
client = MilvusClient(uri=SERVER_ADDR)

# Define the collection schema
schema = client.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# Add an INT64 field `age` that supports null values with default value 18
schema.add_field(field_name="age", datatype=DataType.INT64, nullable=True, default_value=18)
schema.add_field(field_name="broken", datatype=DataType.BOOL, nullable=True)
# Add a FLOAT field `price` that supports null values without default value
schema.add_field(field_name="price", datatype=DataType.FLOAT, nullable=True)
schema.add_field(field_name="pk", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="embedding", datatype=DataType.FLOAT_VECTOR, dim=3)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());

CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);

schema.addField(AddFieldReq.builder()
        .fieldName("age")
        .dataType(DataType.Int64)
        .isNullable(true)
        .defaultValue(18)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("broken")
        .dataType(DataType.Bool)
        .isNullable(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("price")
        .dataType(DataType.Float)
        .isNullable(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("pk")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("embedding")
        .dataType(DataType.FloatVector)
        .dimension(3)
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"

    milvusclient "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema().
    WithField(entity.NewField().
        WithName("pk").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true)).
    WithField(entity.NewField().
        WithName("embedding").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(3)).
    WithField(entity.NewField().
        WithName("price").
        WithDataType(entity.FieldTypeFloat).
        WithNullable(true)).
    WithField(entity.NewField().
        WithName("age").
        WithDataType(entity.FieldTypeInt64).
        WithNullable(true).
        WithDefaultValueLong(18)).
    WithField(entity.NewField().
        WithName("broken").
        WithDataType(entity.FieldTypeBool).
        WithNullable(true))
```

```rust
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let mut schema = CollectionSchema::new().enable_dynamic_field(true);
schema = schema
    .add_field(
        FieldSchema::new()
            .name("pk")
            .data_type(DataType::Int64)
            .primary_key(true),
    )
    .add_field(
        FieldSchema::new()
            .name("embedding")
            .data_type(DataType::FloatVector)
            .dimension(3),
    )
    .add_field(
        FieldSchema::new()
            .name("price")
            .data_type(DataType::Float)
            .nullable(true),
    )
    .add_field(
        FieldSchema::new()
            .name("age")
            .data_type(DataType::Int64)
            .nullable(true)
            .default_value(DefaultValue::Int64(18)),
    )
    .add_field(
        FieldSchema::new()
            .name("broken")
            .data_type(DataType::Bool)
            .nullable(true),
    );
```

```cpp
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField({"pk", milvus::DataType::INT64, "", true, false});
schema->AddField(milvus::FieldSchema("embedding", milvus::DataType::FLOAT_VECTOR).WithDimension(3));
schema->AddField(milvus::FieldSchema("price", milvus::DataType::FLOAT).WithNullable(true));
schema->AddField(milvus::FieldSchema("age", milvus::DataType::INT64).WithNullable(true).WithDefaultValue(18));
schema->AddField(milvus::FieldSchema("broken", milvus::DataType::BOOL).WithNullable(true));
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";
const schema = [
  {
    name: "age",
    data_type: DataType.Int64,
    nullable: true,
    default_value: 18,
  },
  {
    name: "broken",
    data_type: DataType.Bool,
    nullable: true,
  },
  {
    name: "price",
    data_type: DataType.Float,
    nullable: true,
  },
  {
    name: "pk",
    data_type: DataType.Int64,
    is_primary_key: true,
  },
  {
    name: "embedding",
    data_type: DataType.FloatVector,
    dim: 3,
  },
];
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

// Define server address
string SERVER_ADDR = "http://localhost:19530";

// Create a MilvusClient instance
var client = new MilvusClientV2(new ConnectConfig { Uri = SERVER_ADDR });

// Define the collection schema
var schema = new CollectionSchema { EnableDynamicFields = true };

// Add an INT64 field `age` that supports null values with default value 18
schema.Fields.Add(new FieldSchema("age", DataType.Int64) { Nullable = true, DefaultValue = 18 });
schema.Fields.Add(new FieldSchema("broken", DataType.Bool) { Nullable = true });
// Add a FLOAT field `price` that supports null values without default value
schema.Fields.Add(new FieldSchema("price", DataType.Float) { Nullable = true });
schema.Fields.Add(new FieldSchema("pk", DataType.Int64, isPrimaryKey: true));
schema.Fields.Add(FieldSchema.CreateFloatVector("embedding", 3));
```

```bash
export ageField='{
    "fieldName": "age",
    "dataType": "Int64",
    "nullable": true,
    "defaultValue": 18
}'

export boolField='{
    "fieldName": "broken",
    "dataType": "Bool",
    "nullable": true
}'

export floatField='{
    "fieldName": "price",
    "dataType": "Float",
    "nullable": true
}'

export pkField='{
    "fieldName": "pk",
    "dataType": "Int64",
    "isPrimary": true
}'

export vectorField='{
    "fieldName": "embedding",
    "dataType": "FloatVector",
    "elementTypeParams": {
        "dim": 3
    }
}'

export schema="{
    \"autoID\": false,
    \"fields\": [
        $ageField,
        $boolField,
        $floatField,
        $pkField,
        $vectorField
    ]
}"
```

## Set index params

Indexing helps improve search and query performance. In Milvus clusters, indexing is mandatory for vector fields but optional for scalar fields.

The following example creates indexes on the vector field `embedding` and the scalar field `age`, both using the `AUTOINDEX` index type. With this type, Milvus automatically selects the most suitable index based on the data type. For details, refer to [Index Explained](index-explained.md).

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
# Set index params

index_params = client.prepare_index_params()

# Index `age` with AUTOINDEX
index_params.add_index(
    field_name="age",
    index_type="AUTOINDEX",
    index_name="age_index"
)

# Index `embedding` with AUTOINDEX and specify similarity metric type
index_params.add_index(
    field_name="embedding",
    index_type="AUTOINDEX",  # Use automatic indexing to simplify complex index settings
    metric_type="COSINE"  # Specify similarity metric type, options include L2, COSINE, or IP
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

List<IndexParam> indexes = new ArrayList<>();
indexes.add(IndexParam.builder()
        .fieldName("age")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build());
        
indexes.add(IndexParam.builder()
        .fieldName("embedding")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/entity"

    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

indexOption1 := milvusclient.NewCreateIndexOption("my_collection", "embedding",
    index.NewAutoIndex(entity.COSINE))
indexOption2 := milvusclient.NewCreateIndexOption("my_collection", "age",
    index.NewAutoIndex(entity.L2))
```

```rust
use milvus::v2::prelude::*;

let index_params = vec![
    IndexParam::new()
        .field_name("age")
        .index_name("age_index")
        .index_type(IndexType::AutoIndex),
    IndexParam::new()
        .field_name("embedding")
        .index_type(IndexType::AutoIndex)
        .metric_type(MetricType::Cosine),
];
```

```cpp
std::vector<milvus::IndexDesc> indexes = {
    milvus::IndexDesc("age", "age_index", milvus::IndexType::AUTOINDEX),
    milvus::IndexDesc("embedding", "", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)
};
```

```javascript
import { IndexType } from "@zilliz/milvus2-sdk-node";
const indexParams = [
  {
    field_name: "age",
    index_name: "inverted_index",
    index_type: IndexType.AUTOINDEX,
  },
  {
    field_name: "embedding",
    metric_type: "COSINE",
    index_type: IndexType.AUTOINDEX,
  },
];
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

// Set index params
var indexParams = new[]
{
    // Index `age` with AUTOINDEX
    new IndexParam("age", "age_index", IndexType.AutoIndex, null),
    // Index `embedding` with AUTOINDEX and specify similarity metric type
    new IndexParam("embedding", null, IndexType.AutoIndex, MetricType.Cosine)
};
```

```bash
export indexParams='[
        {
            "fieldName": "age",
            "indexName": "inverted_index",
            "indexType": "AUTOINDEX"
        },
        {
            "fieldName": "embedding",
            "metricType": "COSINE",
            "indexType": "AUTOINDEX"
        }
    ]'
```

## Create collection

Once the schema and indexes are defined, create a collection that includes number fields.

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
# Create Collection
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption1, indexOption2))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
if err = loadTask.Await(ctx); err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
use milvus::v2::prelude::*;

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("my_collection")
            .schema(schema)
            .index_params(index_params)
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                        .WithCollectionName("my_collection")
                                        .WithIndexes(std::move(indexes))
                                        .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.createCollection({
    collection_name: "my_collection",
    schema: schema,
    index_params: indexParams
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

// Create Collection
await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema,
    Indexes = indexParams
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"my_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

## Insert data

After creating the collection, insert entities that match the schema.

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
# Sample data
data = [
    {"age": 25, "price": 99.99, "pk": 1, "embedding": [0.1, 0.2, 0.3]},
    {"age": 30, "pk": 2, "embedding": [0.4, 0.5, 0.6]}, # `price` field is missing, which should be null
    {"age": None, "price": None, "pk": 3, "embedding": [0.2, 0.3, 0.1]},  # `age` should default to 18, `price` is null
    {"age": 45, "price": None, "pk": 4, "embedding": [0.9, 0.1, 0.4]},  # `price` is null
    {"age": None, "price": 59.99, "pk": 5, "embedding": [0.8, 0.5, 0.3]},  # `age` should default to 18
    {"age": 60, "price": None, "pk": 6, "embedding": [0.1, 0.6, 0.9]}  # `price` is null
]

client.insert(
    collection_name="my_collection",
    data=data
)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;

import io.milvus.v2.service.vector.request.InsertReq;
import io.milvus.v2.service.vector.response.InsertResp;

List<JsonObject> rows = new ArrayList<>();
Gson gson = new Gson();
rows.add(gson.fromJson("{\"age\": 25, \"price\": 99.99, \"pk\": 1, \"embedding\": [0.1, 0.2, 0.3]}", JsonObject.class));
rows.add(gson.fromJson("{\"age\": 30, \"pk\": 2, \"embedding\": [0.4, 0.5, 0.6]}", JsonObject.class));
rows.add(gson.fromJson("{\"age\": null, \"price\": null, \"pk\": 3, \"embedding\": [0.2, 0.3, 0.1]}", JsonObject.class));
rows.add(gson.fromJson("{\"age\": 45, \"price\": null, \"pk\": 4, \"embedding\": [0.9, 0.1, 0.4]}", JsonObject.class));
rows.add(gson.fromJson("{\"age\": null, \"price\": 59.99, \"pk\": 5, \"embedding\": [0.8, 0.5, 0.3]}", JsonObject.class));
rows.add(gson.fromJson("{\"age\": 60, \"price\": null, \"pk\": 6, \"embedding\": [0.1, 0.6, 0.9]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/column"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

priceValues := []float32{99.99, 59.99}
priceValid := []bool{true, false, false, false, true, false}
priceCol, _ := column.NewNullableColumnFloat("price", priceValues, priceValid)

ageValues := []int64{25, 30, 45, 60}
ageValid := []bool{true, true, false, true, false, true}
ageCol, _ := column.NewNullableColumnInt64("age", ageValues, ageValid)

brokenValues := []bool{}
brokenValid := []bool{false, false, false, false, false, false}
brokenCol, _ := column.NewNullableColumnBool("broken", brokenValues, brokenValid)

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("pk", []int64{1, 2, 3, 4, 5, 6}).
    WithFloatVectorColumn("embedding", 3, [][]float32{
        {0.1, 0.2, 0.3},
        {0.4, 0.5, 0.6},
        {0.2, 0.3, 0.1},
        {0.9, 0.1, 0.4},
        {0.8, 0.5, 0.3},
        {0.1, 0.6, 0.9},
    }).
    WithColumns(priceCol, ageCol, brokenCol),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

let price_col = FieldData::float("price", vec![99.99, 59.99])
    .with_validity(vec![true, false, false, false, true, false])?;
let age_col = FieldData::int64("age", vec![25, 30, 45, 60])
    .with_validity(vec![true, true, false, true, false, true])?;
let broken_col = FieldData::boolean("broken", vec![false, true, false, true, false, false])
    .with_validity(vec![true, true, true, true, true, true])?;

client
    .insert(
        InsertRequest::builder()
            .collection_name("my_collection")
            .columns(vec![
                FieldData::int64("pk", vec![1, 2, 3, 4, 5, 6]),
                FieldData::float_vector("embedding", vec![
                    vec![0.1, 0.2, 0.3],
                    vec![0.4, 0.5, 0.6],
                    vec![0.2, 0.3, 0.1],
                    vec![0.9, 0.1, 0.4],
                    vec![0.8, 0.5, 0.3],
                    vec![0.1, 0.6, 0.9],
                ]),
                price_col,
                age_col,
                broken_col,
            ])
            .build()?,
    )
    .await?;
```

```cpp
milvus::EntityRows data = {
    {{"age", int64_t(25)}, {"price", float(99.99)}, {"pk", int64_t(1)}, {"embedding", std::vector<float>{0.1, 0.2, 0.3}}},
    {{"age", int64_t(30)}, {"price", float(149.50)}, {"pk", int64_t(2)}, {"embedding", std::vector<float>{0.4, 0.5, 0.6}}},
    {{"age", int64_t(35)}, {"price", float(199.99)}, {"pk", int64_t(3)}, {"embedding", std::vector<float>{0.2, 0.3, 0.1}}},
    {{"age", int64_t(45)}, {"pk", int64_t(4)}, {"embedding", std::vector<float>{0.9, 0.1, 0.4}}},
    {{"price", float(59.99)}, {"pk", int64_t(5)}, {"embedding", std::vector<float>{0.8, 0.5, 0.3}}},
    {{"age", int64_t(60)}, {"pk", int64_t(6)}, {"embedding", std::vector<float>{0.1, 0.6, 0.9}}}
};

milvus::InsertResponse response;
auto status = client->Insert(milvus::InsertRequest()
                                .WithCollectionName("my_collection")
                                .WithRowsData(std::move(data)),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const data = [
  { age: 25, price: 99.99, pk: 1, embedding: [0.1, 0.2, 0.3] },
  { age: 30, pk: 2, embedding: [0.4, 0.5, 0.6] },
  { age: null, price: null, pk: 3, embedding: [0.2, 0.3, 0.1] },
  { age: 45, price: null, pk: 4, embedding: [0.9, 0.1, 0.4] },
  { age: null, price: 59.99, pk: 5, embedding: [0.8, 0.5, 0.3] },
  { age: 60, price: null, pk: 6, embedding: [0.1, 0.6, 0.9] },
];

await client.insert({
  collection_name: "my_collection",
  data: data,
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

// Sample data
var data = new List<IDictionary<string, object?>>
{
    new Dictionary<string, object?> { ["age"] = 25L, ["price"] = 99.99f, ["pk"] = 1L, ["embedding"] = new[] { 0.1f, 0.2f, 0.3f } },
    new Dictionary<string, object?> { ["age"] = 30L, ["pk"] = 2L, ["embedding"] = new[] { 0.4f, 0.5f, 0.6f } }, // `price` field is missing, which should be null
    new Dictionary<string, object?> { ["age"] = null, ["price"] = null, ["pk"] = 3L, ["embedding"] = new[] { 0.2f, 0.3f, 0.1f } },  // `age` should default to 18, `price` is null
    new Dictionary<string, object?> { ["age"] = 45L, ["price"] = null, ["pk"] = 4L, ["embedding"] = new[] { 0.9f, 0.1f, 0.4f } },  // `price` is null
    new Dictionary<string, object?> { ["age"] = null, ["price"] = 59.99f, ["pk"] = 5L, ["embedding"] = new[] { 0.8f, 0.5f, 0.3f } },  // `age` should default to 18
    new Dictionary<string, object?> { ["age"] = 60L, ["price"] = null, ["pk"] = 6L, ["embedding"] = new[] { 0.1f, 0.6f, 0.9f } }  // `price` is null
};

await client.InsertAsync(new InsertReq
{
    CollectionName = "my_collection",
    RowsData = data
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "data": [
        {"age": 25, "broken": false, "price": 99.99, "pk": 1, "embedding": [0.1, 0.2, 0.3]},
        {"age": 30, "broken": true, "price": 149.50, "pk": 2, "embedding": [0.4, 0.5, 0.6]},
        {"age": 35, "broken": false, "price": 199.99, "pk": 3, "embedding": [0.2, 0.3, 0.1]},
        {"age": 45, "broken": true, "price": null, "pk": 4, "embedding": [0.9, 0.1, 0.4]},
        {"age": null, "broken": false, "price": 59.99, "pk": 5, "embedding": [0.8, 0.5, 0.3]},
        {"age": 60, "broken": false, "price": null, "pk": 6, "embedding": [0.1, 0.6, 0.9]}
    ],
    "collectionName": "my_collection"
}'
```

## Query with filter expressions

After inserting entities, use the `query` method to retrieve entities that match the specified filter expressions.

To retrieve entities where the `age` is greater than 30:

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
filter = 'age > 30'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["age", "price", "pk"]
)

print(res)

# Example output:
# data: [
#     "{'age': 45, 'price': None, 'pk': 4}",
#     "{'age': 60, 'price': None, 'pk': 6}"
# ]
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;

String filter = "age > 30";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("age", "price", "pk"))
        .build());
System.out.println(resp.getQueryResults());

// Output
//
// [
//    QueryResp.QueryResult(entity={price=null, pk=4, age=45}), 
//    QueryResp.QueryResult(entity={price=null, pk=6, age=60})
// ]
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

filter := "age > 30"
queryResult, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("pk", "age", "price"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("pk", queryResult.GetColumn("pk"))
fmt.Println("age", queryResult.GetColumn("age"))
fmt.Println("price", queryResult.GetColumn("price"))
```

```rust
use milvus::v2::prelude::*;

let results = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter("age > 30")
            .output_fields(vec!["age", "price", "pk"])
            .build()?,
    )
    .await?;
for row in results.results().rows()? {
    println!("{:?}", row);
}
```

```cpp
auto request = milvus::QueryRequest()
                       .WithCollectionName("my_collection")
                       .WithFilter("age > 30")
                       .AddOutputField("age")
                       .AddOutputField("price")
                       .AddOutputField("pk");

milvus::QueryResponse response;
auto status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto query_results = response.Results();
milvus::EntityRows output_rows;
query_results.OutputRows(output_rows);
for (const auto& row : output_rows) {
    std::cout << "\t" << row << std::endl;
}
```

```javascript
const filter = 'age > 30';

const res = await client.query({
    collection_name: "my_collection",
    filter: filter,
    output_fields: ["age", "price", "pk"]
});

console.log(res);

// Example output:
// data: [
//     "{'age': 45, 'price': None, 'pk': 4}",
//     "{'age': 60, 'price': None, 'pk': 6}"
// ]
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

string filter = "age > 30";

var res = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = filter,
    Parameters = new QueryParameters { OutputFields = { "age", "price", "pk" } }
});

Console.WriteLine(res);
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "filter": "age > 30",
    "outputFields": ["age","price", "pk"]
}'

## {"code":0,"cost":0,"data":[{"age":30,"pk":2,"price":149.5},{"age":35,"pk":3,"price":199.99}]}
```

To retrieve entities where the `price` is null:

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
filter = 'price is null'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["age", "price", "pk"]
)

print(res)

# Example output:
# data: [
#     "{'age': 30, 'price': None, 'pk': 2}",
#     "{'age': 18, 'price': None, 'pk': 3}",
#     "{'age': 45, 'price': None, 'pk': 4}",
#     "{'age': 60, 'price': None, 'pk': 6}"
# ]
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

String filter = "price is null";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("age", "price", "pk"))
        .build());
System.out.println(resp.getQueryResults());

// Output
// [
//    QueryResp.QueryResult(entity={price=null, pk=2, age=30}), 
//    QueryResp.QueryResult(entity={price=null, pk=3, age=18}), 
//    QueryResp.QueryResult(entity={price=null, pk=4, age=45}), 
//    QueryResp.QueryResult(entity={price=null, pk=6, age=60})
// ]
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

filter := "price is null"
queryResult, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("pk", "age", "price"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("pk", queryResult.GetColumn("pk"))
fmt.Println("age", queryResult.GetColumn("age"))
fmt.Println("price", queryResult.GetColumn("price"))
```

```rust
use milvus::v2::prelude::*;

let results = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter("price is null")
            .output_fields(vec!["age", "price", "pk"])
            .build()?,
    )
    .await?;
for row in results.results().rows()? {
    println!("{:?}", row);
}
```

```cpp
auto request = milvus::QueryRequest()
                       .WithCollectionName("my_collection")
                       .WithFilter("price is null")
                       .AddOutputField("age")
                       .AddOutputField("price")
                       .AddOutputField("pk");

milvus::QueryResponse response;
auto status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto query_results = response.Results();
milvus::EntityRows output_rows;
query_results.OutputRows(output_rows);
for (const auto& row : output_rows) {
    std::cout << "\t" << row << std::endl;
}
```

```javascript
const filter = 'price is null';

const res = await client.query({
    collection_name: "my_collection",
    filter: filter,
    output_fields: ["age", "price", "pk"]
});

console.log(res);
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

string filter = "price is null";

var res = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = filter,
    Parameters = new QueryParameters { OutputFields = { "age", "price", "pk" } }
});

Console.WriteLine(res);
```

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
  "collectionName": "my_collection",
  "filter": "price is null",
  "outputFields": ["age", "price", "pk"]
}'
```

To retrieve entities where `age` has the value `18`, use the following expression below. As the default value of `age` is `18`, the expected result should include entities with `age` explicitly set to `18` or with `age` set to null.

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
filter = 'age == 18'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["age", "price", "pk"]
)

print(res)

# Example output:
# data: [
#     "{'age': 18, 'price': None, 'pk': 3}",
#     "{'age': 18, 'price': 59.99, 'pk': 5}"
# ]
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

String filter = "age == 18";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("age", "price", "pk"))
        .build());
System.out.println(resp.getQueryResults());

// Output
// [
//    QueryResp.QueryResult(entity={price=null, pk=3, age=18}), 
//    QueryResp.QueryResult(entity={price=59.99, pk=5, age=18})
// ]
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

filter = "age == 18"
queryResult, err = client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("pk", "age", "price"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("pk", queryResult.GetColumn("pk"))
fmt.Println("age", queryResult.GetColumn("age"))
fmt.Println("price", queryResult.GetColumn("price"))
```

```rust
use milvus::v2::prelude::*;

let results = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter("age == 18")
            .output_fields(vec!["age", "price", "pk"])
            .build()?,
    )
    .await?;
for row in results.results().rows()? {
    println!("{:?}", row);
}
```

```cpp
auto request = milvus::QueryRequest()
                       .WithCollectionName("my_collection")
                       .WithFilter("age == 18")
                       .AddOutputField("age")
                       .AddOutputField("price")
                       .AddOutputField("pk");

milvus::QueryResponse response;
auto status = client->Query(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto query_results = response.Results();
milvus::EntityRows output_rows;
query_results.OutputRows(output_rows);
for (const auto& row : output_rows) {
    std::cout << "\t" << row << std::endl;
}
```

```javascript
// node
const filter = 'age == 18';

const res = await client.query({
    collection_name: "my_collection",
    filter: filter,
    output_fields: ["age", "price", "pk"]
});

console.log(res);

// Example output:
// data: [
//     "{'age': 18, 'price': None, 'pk': 3}",
//     "{'age': 18, 'price': 59.99, 'pk': 5}"
// ]
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

string filter = "age == 18";

var res = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = filter,
    Parameters = new QueryParameters { OutputFields = { "age", "price", "pk" } }
});

Console.WriteLine(res);
```

```bash
# restful
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
  "collectionName": "my_collection",
  "filter": "age == 18",
  "outputFields": ["age", "price", "pk"]
}'
```

## Vector search with filter expressions

In addition to basic number field filtering, you can combine vector similarity searches with number field filters. For example, the following code shows how to add a number field filter to a vector search:

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
filter = "25 <= age <= 35"

res = client.search(
    collection_name="my_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["age","price"],
    filter=filter
)

print(res)

# Example output:
# data: [
#     "[{'id': 2, 'distance': -0.2016308456659317, 'entity': {'age': 30, 'price': None}}, {'id': 1, 'distance': -0.23643313348293304, 'entity': {'age': 25, 'price': 99.98999786376953}}]"
# ]
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;

String filter = "25 <= age <= 35";

SearchResp resp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Arrays.asList("age", "price"))
        .filter(filter)
        .build());

System.out.println(resp.getSearchResults());

// Output
//
// [
//   [
//     SearchResp.SearchResult(entity={price=null, age=30}, score=-0.20163085, id=2),
//     SearchResp.SearchResult(entity={price=99.99, age=25}, score=-0.23643313, id=1)
//   ]
// ]
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

queryVector := []float32{0.3, -0.6, 0.1}
filter = "25 <= age <= 35"

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("embedding").
    WithFilter(filter).
    WithAnnParam(annParam).
    WithOutputFields("age", "price"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("age: ", resultSet.GetColumn("age"))
    fmt.Println("price: ", resultSet.GetColumn("price"))
}
```

```rust
use milvus::v2::prelude::*;

let results = client
    .search(
        SearchRequest::builder()
            .collection_name("my_collection")
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![vec![0.3, -0.6, 0.1]]))
            .limit(5)
            .filter("25 <= age <= 35")
            .output_fields(vec!["age", "price"])
            .build()?,
    )
    .await?;
println!("{:?}", results.results());
```

```cpp
std::vector<float> query_vector = {0.3, -0.6, 0.1};
auto request = milvus::SearchRequest()
                   .WithCollectionName("my_collection")
                   .WithAnnsField("embedding")
                   .WithLimit(5)
                   .WithFilter("25 <= age <= 35")
                   .AddOutputField("age")
                   .AddOutputField("price")
                   .AddFloatVector(query_vector);

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
auto search_results = response.Results();
for (auto& result : search_results.Results()) {
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```

```javascript
const filter = '25 <= age <= 35';

const res = await client.search({
    collection_name: "my_collection",
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ["age", "price"],
    filter: filter
});

console.log(res);

// Example output:
// data: [
//     "[{'id': 2, 'distance': -0.2016308456659317, 'entity': {'age': 30, 'price': None}}, {'id': 1, 'distance': -0.23643313348293304, 'entity': {'age': 25, 'price': 99.98999786376953}}]"
// ]
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

string filter = "25 <= age <= 35";

var searchResp = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = new[] { new ReadOnlyMemory<float>(new[] { 0.3f, -0.6f, 0.1f }) },
    Limit = 5,
    Parameters = new SearchParameters
    {
        OutputFields = { "age", "price" },
        Nprobe = 10,
        Expression = filter
    }
});

Console.WriteLine(searchResp);
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection",
    "data": [
        [0.3, -0.6, 0.1]
    ],
    "annsField": "embedding",
    "limit": 5,
    "outputFields": ["age", "price"]
}'

## {"code":0,"cost":0,"data":[{"age":35,"distance":-0.19054288,"id":3,"price":199.99},{"age":30,"distance":-0.20163085,"id":2,"price":149.5},{"age":25,"distance":-0.2364331,"id":1,"price":99.99}]}
```

In this example, we first define a query vector and add a filter condition `25 <= age <= 35` during the search. This ensures that the search results are not only similar to the query vector but also meet the specified age range. For more information, refer to [Filtering Explained](boolean.md).