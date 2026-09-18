---
id: number.md
title: "Number Field"
summary: "A number field is a scalar field that stores numeric values. These values can be whole numbers (integers) or decimal numbers (floating-point numbers). They are typically used to represent quantities, measurements, or any data that needs to be mathematically processed."
---

# Number Field

A number field is a scalar field that stores numeric values. These values can be whole numbers (**integers**) or decimal numbers (**floating-point numbers**). They are typically used to represent quantities, measurements, or any data that needs to be mathematically processed.

The table below describes the data types of number fields available in Milvus.

<table>
   <tr>
     <th><p>Field Type</p></th>
     <th><p>Description</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code></p></td>
     <td><p>Boolean type for storing <code>true</code> or <code>false</code>, suitable for describing binary states.</p></td>
   </tr>
   <tr>
     <td><p><code>INT8</code></p></td>
     <td><p>8-bit integer, suitable for storing small-range integer data.</p></td>
   </tr>
   <tr>
     <td><p><code>INT16</code></p></td>
     <td><p>16-bit integer, for medium-range integer data.</p></td>
   </tr>
   <tr>
     <td><p><code>INT32</code></p></td>
     <td><p>32-bit integer, ideal for general integer data storage like product quantities or user IDs.</p></td>
   </tr>
   <tr>
     <td><p><code>INT64</code></p></td>
     <td><p>64-bit integer, suitable for storing large-range data like timestamps or identifiers.</p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT</code></p></td>
     <td><p>32-bit floating-point number, for data requiring general precision, such as ratings or temperature.</p></td>
   </tr>
   <tr>
     <td><p><code>DOUBLE</code></p></td>
     <td><p>64-bit double-precision floating-point number, for high-precision data like financial information or scientific calculations.</p></td>
   </tr>
</table>

To declare a number field, simply set the `datatype` to one of the available numeric data types. For example, `DataType.INT64` for an integer field or `DataType.FLOAT` for a floating-point field.

<div class="alert note">

Milvus supports null values and default values for number fields. To enable these features, set `nullable` to `True` and `default_value` to a numeric value. For details, refer to [Nullable & Default](nullable-and-default.md).

</div>

## Add number field

To store numeric data, define a number field in your collection schema. Below is an example of a collection schema with two number fields:

- `age`: stores integer data, allows null values, and has a default value of `18`.

- `price`: stores float data, allows null values, but does not have a default value.

<div class="alert note">

If you set `enable_dynamic_fields=True` when defining the schema, Milvus allows you to insert scalar fields that were not defined in advance. However, this may increase the complexity of queries and management, potentially impacting performance. For more information, refer to [Dynamic Field](enable-dynamic-field.md).

</div>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
    enable_dynamic_fields=True,
)

# Add an INT64 field `age` that supports null values with default value 18
schema.add_field(field_name="age", datatype=DataType.INT64, nullable=True, default_value=18)
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

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";
const schema = [
  {
    name: "age",
    data_type: DataType.Int64,
  },
  {
    name: "price",
    data_type: DataType.Float,
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

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v2/column"
    "github.com/milvus-io/milvus/client/v2/entity"
    "github.com/milvus-io/milvus/client/v2/index"
    "github.com/milvus-io/milvus/client/v2/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "localhost:19530"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema()
schema.WithField(entity.NewField().
    WithName("pk").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(3),
).WithField(entity.NewField().
    WithName("price").
    WithDataType(entity.FieldTypeFloat).
    WithNullable(true),
).WithField(entity.NewField().
    WithName("age").
    WithDataType(entity.FieldTypeInt64).
    WithNullable(true).
    WithDefaultValueLong(18),
)
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
#include <memory>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

// Define the collection schema
milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->SetEnableDynamicField(true);

// Add an INT64 field `age` that supports null values with default value 18
schema->AddField(milvus::FieldSchema("age", milvus::DataType::INT64)
                     .WithNullable(true)
                     .WithDefaultValue(18));
// Add a FLOAT field `price` that supports null values without default value
schema->AddField(milvus::FieldSchema("price", milvus::DataType::FLOAT)
                     .WithNullable(true));
schema->AddField(milvus::FieldSchema("pk", milvus::DataType::INT64)
                     .WithPrimaryKey(true));
schema->AddField(milvus::FieldSchema("embedding", milvus::DataType::FLOAT_VECTOR)
                     .WithDimension(3));
```

```rust
use milvus::v2 as sdk;
use milvus::v2::prelude::*;
use std::collections::HashMap;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

// Define the collection schema
let schema = CollectionSchema::new()
    .enable_dynamic_field(true)
    // Add an INT64 field `age` that supports null values with default value 18
    .add_field(
        FieldSchema::new()
            .name("age")
            .data_type(DataType::Int64)
            .nullable(true)
            .default_value(DefaultValue::Int64(18)),
    )
    // Add a FLOAT field `price` that supports null values without default value
    .add_field(
        FieldSchema::new()
            .name("price")
            .data_type(DataType::Float)
            .nullable(true),
    )
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
    );
```

```bash
export int64Field='{
    "fieldName": "age",
    "dataType": "Int64"
}'

export floatField='{
    "fieldName": "price",
    "dataType": "Float"
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
        $int64Field,
        $floatField,
        $pkField,
        $vectorField
    ]
}"
```

## Set index params

Indexing helps improve search and query performance. In Milvus, indexing is mandatory for vector fields but optional for scalar fields.

The following example creates indexes on the vector field `embedding` and the scalar field `age`, both using the `AUTOINDEX` index type. With this type, Milvus automatically selects the most suitable index based on the data type. You can also customize the index type and params for each field. For details, refer to [Index Explained](index-explained.md).

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```go
indexOption1 := milvusclient.NewCreateIndexOption("my_collection", "embedding",
    index.NewAutoIndex(index.MetricType(entity.IP)))
indexOption2 := milvusclient.NewCreateIndexOption("my_collection", "age",
    index.NewInvertedIndex())
```

```cpp
std::vector<milvus::IndexDesc> indexes;
// Index `age` with AUTOINDEX
indexes.emplace_back(milvus::IndexDesc("age", "age_index", milvus::IndexType::AUTOINDEX));
// Index `embedding` with AUTOINDEX and specify similarity metric type
indexes.emplace_back(milvus::IndexDesc(
    "embedding", "", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE));

milvus::CreateIndexRequest create_index_request;
create_index_request.WithCollectionName("my_collection")
    .WithIndexes(std::move(indexes));
status = client->CreateIndex(create_index_request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
client
    .create_index(
        CreateIndexRequest::builder()
            .collection_name("my_collection")
            .index_params(vec![
                // Index `age` with AUTOINDEX
                IndexParam::new()
                    .field_name("age")
                    .index_name("age_index")
                    .index_type(IndexType::AutoIndex),
                // Index `embedding` with AUTOINDEX and specify similarity metric type
                IndexParam::new()
                    .field_name("embedding")
                    .index_type(IndexType::AutoIndex)
                    .metric_type(MetricType::Cosine),
            ])
            .build()?,
    )
    .await?;
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);
```

```javascript
client.create_collection({
    collection_name: "my_collection",
    schema: schema,
    index_params: indexParams
})
```

```go
err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption("my_collection", schema).
        WithIndexOptions(indexOption1, indexOption2))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```cpp
milvus::CreateCollectionRequest create_request;
create_request.WithCollectionName("my_collection")
    .WithCollectionSchema(schema);
status = client->CreateCollection(create_request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("my_collection")
            .schema(schema)
            .build()?,
    )
    .await?;
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```javascript
const data = [
  { age: 25, price: 99.99, pk: 1, embedding: [0.1, 0.2, 0.3] },
  { age: 30, price: 149.5, pk: 2, embedding: [0.4, 0.5, 0.6] },
  { age: 35, price: 199.99, pk: 3, embedding: [0.7, 0.8, 0.9] },
];

client.insert({
  collection_name: "my_collection",
  data: data,
});

```

```go
column1, _ := column.NewNullableColumnFloat("price",
    []float32{99.99, 59.99},
    []bool{true, false, false, false, true, false})
column2, _ := column.NewNullableColumnInt64("age",
    []int64{25, 30, 45, 60},
    []bool{true, true, false, true, false, true})

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
    WithColumns(column1, column2),
)
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```cpp
milvus::EntityRows rows;
{
    milvus::EntityRow row;
    row["age"] = 25;
    row["price"] = 99.99f;
    row["pk"] = 1;
    row["embedding"] = std::vector<float>{0.1f, 0.2f, 0.3f};
    rows.emplace_back(std::move(row));
}
{
    milvus::EntityRow row;
    row["age"] = 30;
    row["pk"] = 2;
    row["embedding"] = std::vector<float>{0.4f, 0.5f, 0.6f};
    rows.emplace_back(std::move(row));
}
{
    milvus::EntityRow row;
    row["age"] = nullptr;
    row["price"] = nullptr;
    row["pk"] = 3;
    row["embedding"] = std::vector<float>{0.2f, 0.3f, 0.1f};
    rows.emplace_back(std::move(row));
}
{
    milvus::EntityRow row;
    row["age"] = 45;
    row["price"] = nullptr;
    row["pk"] = 4;
    row["embedding"] = std::vector<float>{0.9f, 0.1f, 0.4f};
    rows.emplace_back(std::move(row));
}
{
    milvus::EntityRow row;
    row["age"] = nullptr;
    row["price"] = 59.99f;
    row["pk"] = 5;
    row["embedding"] = std::vector<float>{0.8f, 0.5f, 0.3f};
    rows.emplace_back(std::move(row));
}
{
    milvus::EntityRow row;
    row["age"] = 60;
    row["price"] = nullptr;
    row["pk"] = 6;
    row["embedding"] = std::vector<float>{0.1f, 0.6f, 0.9f};
    rows.emplace_back(std::move(row));
}

milvus::InsertResponse insert_response;
milvus::InsertRequest insert_request;
insert_request.WithCollectionName("my_collection").WithRowsData(std::move(rows));
status = client->Insert(insert_request, insert_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
// Sample data
let rows = vec![
    serde_json::json!({"age": 25, "price": 99.99, "pk": 1, "embedding": [0.1, 0.2, 0.3]}),
    serde_json::json!({"age": 30, "pk": 2, "embedding": [0.4, 0.5, 0.6]}),
    serde_json::json!({"age": null, "price": null, "pk": 3, "embedding": [0.2, 0.3, 0.1]}),
    serde_json::json!({"age": 45, "price": null, "pk": 4, "embedding": [0.9, 0.1, 0.4]}),
    serde_json::json!({"age": null, "price": 59.99, "pk": 5, "embedding": [0.8, 0.5, 0.3]}),
    serde_json::json!({"age": 60, "price": null, "pk": 6, "embedding": [0.1, 0.6, 0.9]}),
];

client
    .insert(
        InsertRequest::builder()
            .collection_name("my_collection")
            .rows(rows)
            .build()?,
    )
    .await?;
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "data": [
        {"age": 25, "price": 99.99, "pk": 1, "embedding": [0.1, 0.2, 0.3]},
        {"age": 30, "price": 149.50, "pk": 2, "embedding": [0.4, 0.5, 0.6]},
        {"age": 35, "price": 199.99, "pk": 3, "embedding": [0.7, 0.8, 0.9]}       
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```javascript
client.query({
    collection_name: 'my_collection',
    filter: 'age > 30',
    output_fields: ['age', 'price', 'pk']
});
```

```go
filter := "age > 30"
queryResult, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("pk", "age", "price"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("pk", queryResult.GetColumn("pk").FieldData().GetScalars())
fmt.Println("age", queryResult.GetColumn("age").FieldData().GetScalars())
fmt.Println("price", queryResult.GetColumn("price").FieldData().GetScalars())
```

```cpp
milvus::QueryRequest query_request;
query_request.WithCollectionName("my_collection")
    .WithFilter("age > 30")
    .WithOutputFields({"age", "price", "pk"});
milvus::QueryResponse query_response;
status = client->Query(query_request, query_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
milvus::EntityRows output_rows;
status = query_response.Results().OutputRows(output_rows);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
for (const auto& row : output_rows) {
    std::cout << row << std::endl;
}
```

```rust
let filter = "age > 30";

let query = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter(filter)
            .output_fields(["age", "price", "pk"])
            .build()?,
    )
    .await?;
for row in query.results().rows()? {
    println!("{:?}", row.to_entity_row()?);
}
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```javascript
// node
const filter = 'price is null';

const res = await client.query({
    collection_name:"my_collection",
    filter:filter,
    output_fields=["age", "price", "pk"]
});

console.log(res);

// Example output:
// data: [
//     "{'age': 18, 'price': None, 'pk': 3}",
//     "{'age': 18, 'price': 59.99, 'pk': 5}"
// ]
```

```go
filter = "price is null"
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

```cpp
milvus::QueryRequest query_request;
query_request.WithCollectionName("my_collection")
    .WithFilter("price is null")
    .WithOutputFields({"age", "price", "pk"});
milvus::QueryResponse query_response;
status = client->Query(query_request, query_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
milvus::EntityRows output_rows;
status = query_response.Results().OutputRows(output_rows);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
for (const auto& row : output_rows) {
    std::cout << row << std::endl;
}
```

```rust
let filter = "price is null";

let query = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter(filter)
            .output_fields(["age", "price", "pk"])
            .build()?,
    )
    .await?;
for row in query.results().rows()? {
    println!("{:?}", row.to_entity_row()?);
}
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```javascript
// node
const filter = 'age == 18';

const res = await client.query({
    collection_name:"my_collection",
    filter:filter,
    output_fields=["age", "price", "pk"]
});

console.log(res);

// Example output:
// data: [
//     "{'age': 18, 'price': None, 'pk': 3}",
//     "{'age': 18, 'price': 59.99, 'pk': 5}"
// ]
```

```go
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

```cpp
milvus::QueryRequest query_request;
query_request.WithCollectionName("my_collection")
    .WithFilter("age == 18")
    .WithOutputFields({"age", "price", "pk"});
milvus::QueryResponse query_response;
status = client->Query(query_request, query_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
milvus::EntityRows output_rows;
status = query_response.Results().OutputRows(output_rows);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
for (const auto& row : output_rows) {
    std::cout << row << std::endl;
}
```

```rust
let filter = "age == 18";

let query = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter(filter)
            .output_fields(["age", "price", "pk"])
            .build()?,
    )
    .await?;
for row in query.results().rows()? {
    println!("{:?}", row.to_entity_row()?);
}
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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

```javascript
await client.search({
    collection_name: 'my_collection',
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ['age', 'price'],
    filter: '25 <= age <= 35'
});
```

```go
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

```cpp
std::vector<float> query_vector = {0.3f, -0.6f, 0.1f};

milvus::SearchRequest search_request;
search_request.WithCollectionName("my_collection")
    .WithAnnsField("embedding")
    .WithLimit(5)
    .WithFilter("25 <= age <= 35")
    .WithOutputFields({"age", "price"})
    .AddExtraParam("nprobe", "10")
    .AddFloatVector(query_vector);
milvus::SearchResponse search_response;
status = client->Search(search_request, search_response);
if (!status.IsOk()) {
    std::cerr << "Search failed: " << status.Message() << std::endl;
    return;
}
for (const auto& result : search_response.Results().Results()) {
    const auto ids = result.Ids().IntIDArray();
    for (size_t i = 0; i < result.Scores().size(); ++i) {
        std::cout << "id=" << ids[i] << ", score=" << result.Scores()[i] << std::endl;
    }
}
```

```rust
use std::collections::HashMap;

let query_vector = vec![0.3f32, -0.6, 0.1];

let search = client
    .search(
        SearchRequest::builder()
            .collection_name("my_collection")
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![query_vector]))
            .filter("25 <= age <= 35")
            .output_fields(["age", "price"])
            .limit(5)
            .extra_params(HashMap::from([("nprobe".to_string(), "10".to_string())]))
            .build()?,
    )
    .await?;
for result in search.results() {
    for row in result.rows()? {
        println!("{:?}", row.to_entity_row()?);
    }
}
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

In this example, we first define a query vector and add a filter condition `25 <= age <= 35` during the search. This ensures that the search results are not only similar to the query vector but also meet the specified age range. For more information, refer to [Filtering](filtering).