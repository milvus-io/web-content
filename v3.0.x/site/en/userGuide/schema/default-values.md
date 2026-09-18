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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
    <a href="#bash">cURL</a>
</div>

```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(uri='http://localhost:19530')

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
```

```java
// java
```

```javascript
// js
```

```go
// go
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
#include <vector>

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

// Define collection schema
milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->SetEnableDynamicField(true);

schema->AddField({"id", milvus::DataType::INT64, "", true, false});
schema->AddField(milvus::FieldSchema("vector", milvus::DataType::FLOAT_VECTOR).WithDimension(5));
// highlight-start
schema->AddField(milvus::FieldSchema("age", milvus::DataType::INT64).WithDefaultValue(18));
schema->AddField(milvus::FieldSchema("status", milvus::DataType::VARCHAR).WithDefaultValue("active").WithMaxLength(10));
// highlight-end

// Set index params
std::vector<milvus::IndexDesc> index_params;
index_params.emplace_back("vector", "vector", milvus::IndexType::AUTOINDEX, milvus::MetricType::L2);

// Create collection
milvus::CreateCollectionRequest create_request;
create_request.WithCollectionName("my_collection")
    .WithCollectionSchema(schema)
    .WithIndexes(std::move(index_params));
status = client->CreateCollection(create_request);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
use milvus::v2 as sdk;
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new().uri("http://localhost:19530"),
)
.await?;

// Define collection schema
let schema = CollectionSchema::new()
    .enable_dynamic_field(true)
    .add_field(
        FieldSchema::new()
            .name("id")
            .data_type(DataType::Int64)
            .primary_key(true),
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
            .default_value(DefaultValue::String("active".to_string()))
            .max_length(10),
    );
// highlight-end

// Set index params
let index_params = vec![IndexParam::new()
    .field_name("vector")
    .index_type(IndexType::AutoIndex)
    .metric_type(MetricType::L2)];

// Create collection
client
    .create_collection(
        sdk::request::collection::CreateCollectionRequest::builder()
            .collection_name("my_collection")
            .schema(schema)
            .index_params(index_params)
            .build()?,
    )
    .await?;
```



```bash
# restful
```

## Insert entities

When inserting data, if you omit a field that has a default value or explicitly set it to NULL, Milvus automatically uses the configured default value.

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
```

```java
// java
```

```javascript
// js
```

```go
// go
```

```cpp
milvus::EntityRows rows = {
    // All fields provided explicitly
    {{"id", 1}, {"vector", std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f, 0.5f}}, {"age", 30}, {"status", "premium"}},
    // age and status omitted → both use default values (18 and "active")
    {{"id", 2}, {"vector", std::vector<float>{0.2f, 0.3f, 0.4f, 0.5f, 0.6f}}},
    // status set to null → uses default value "active"
    {{"id", 3}, {"vector", std::vector<float>{0.3f, 0.4f, 0.5f, 0.6f, 0.7f}}, {"age", 25}, {"status", nullptr}},
    // age set to null → uses default value 18
    {{"id", 4}, {"vector", std::vector<float>{0.4f, 0.5f, 0.6f, 0.7f, 0.8f}}, {"age", nullptr}, {"status", "inactive"}},
};
milvus::InsertResponse insert_response;
status = client->Insert(milvus::InsertRequest()
                            .WithCollectionName("my_collection")
                            .WithRowsData(std::move(rows)),
                        insert_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
```

```rust
let rows = vec![
    // All fields provided explicitly
    serde_json::json!({"id": 1, "vector": [0.1, 0.2, 0.3, 0.4, 0.5], "age": 30, "status": "premium"}),
    // age and status omitted → both use default values (18 and "active")
    serde_json::json!({"id": 2, "vector": [0.2, 0.3, 0.4, 0.5, 0.6]}),
    // status set to None → uses default value "active"
    serde_json::json!({"id": 3, "vector": [0.3, 0.4, 0.5, 0.6, 0.7], "age": 25, "status": null}),
    // age set to None → uses default value 18
    serde_json::json!({"id": 4, "vector": [0.4, 0.5, 0.6, 0.7, 0.8], "age": null, "status": "inactive"}),
];

client
    .insert(
        sdk::request::dml::InsertRequest::builder()
            .collection_name("my_collection")
            .rows(rows)
            .build()?,
    )
    .await?;
```



```bash
# restful
```

## Search and query with default values

Entities containing default values behave the same as any other entities during vector searches and scalar filtering. You can filter by default values in both `search` and `query` operations.

The following example searches for entities where `age` equals the default value `18`:

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
// java
```

```javascript
// js
```

```go
// go
```

```cpp
std::vector<float> query_vector = {0.1f, 0.2f, 0.4f, 0.3f, 0.5f};

milvus::SearchRequest search_request;
search_request.WithCollectionName("my_collection")
    .WithAnnsField("vector")
    .WithFilter("age == 18")
    .WithLimit(10)
    .WithOutputFields({"id", "age", "status"})
    .AddFloatVector(query_vector);
milvus::SearchResponse search_response;
status = client->Search(search_request, search_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
for (const auto& result : search_response.Results().Results()) {
    const auto ids = result.Ids().IntIDArray();
    const auto ages = result.OutputField<milvus::Int64FieldData>("age");
    const auto statuses = result.OutputField<milvus::VarCharFieldData>("status");
    for (size_t i = 0; i < result.GetRowCount(); ++i) {
        std::cout << "  id: " << ids[i] << ", age: " << ages->Data()[i]
                  << ", status: " << statuses->Data()[i] << std::endl;
    }
}
```

```rust
let search = client
    .search(
        SearchRequest::builder()
            .collection_name("my_collection")
            .vector_field("vector")
            .vectors(SearchVectors::Float(vec![vec![0.1f32, 0.2, 0.4, 0.3, 0.5]]))
            .filter("age == 18")
            .output_fields(["id", "age", "status"])
            .limit(10)
            .build()?,
    )
    .await?;
println!("Search results (age == 18):");
for result in search.results() {
    for row in result.rows()? {
        let id = row.get_i64("id")?;
        let age = row.get_i64("age")?;
        let status = row.get_str("status")?;
        println!("  id: {id}, age: {age}, status: {status}");
    }
}
```



```bash
# restful
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
    <a href="#javascript">NodeJS</a>
    <a href="#go">Go</a>
    <a href="#cpp">C++</a>
    <a href="#rust">Rust</a>
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
// java
```

```javascript
// js
```

```go
// go
```

```cpp
// Query entities where age equals the default value (18)
milvus::QueryRequest query_request;
query_request.WithCollectionName("my_collection")
    .WithFilter("age == 18")
    .WithOutputFields({"id", "age", "status"});
milvus::QueryResponse query_response;
status = client->Query(query_request, query_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
for (size_t i = 0; i < query_response.Results().GetRowCount(); ++i) {
    milvus::EntityRow row;
    query_response.Results().OutputRow(i, row);
    std::cout << row << std::endl;
}
```

```rust
// Query entities where age equals the default value (18)
let default_age_results = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter("age == 18")
            .output_fields(["id", "age", "status"])
            .build()?,
    )
    .await?;
println!("\nQuery results (age == 18):");
for row in default_age_results.results().rows()? {
    let id = row.get_i64("id")?;
    let age = row.get_i64("age")?;
    let status = row.get_str("status")?;
    println!("  id: {id}, age: {age}, status: {status}");
}

// Query entities where status equals the default value ("active")
let default_status_results = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter("status == \"active\"")
            .output_fields(["id", "age", "status"])
            .build()?,
    )
    .await?;
println!("\nQuery results (status == 'active'):");
for row in default_status_results.results().rows()? {
    let id = row.get_i64("id")?;
    let age = row.get_i64("age")?;
    let status = row.get_str("status")?;
    println!("  id: {id}, age: {age}, status: {status}");
}
```



```bash
# restful
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
