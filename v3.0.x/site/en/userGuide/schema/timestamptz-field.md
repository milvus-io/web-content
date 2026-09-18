---
id: timestamptz-field.md
title: "TIMESTAMPTZ Field"
summary: "Applications that track time across regions, such as e-commerce systems, collaboration tools, or distributed logging, need precise handling of timestamps with time zones. The TIMESTAMPTZ data type in Milvus provides this capability by storing timestamps with their associated time zone."
beta: Milvus 2.6.6+
---

# TIMESTAMPTZ Field

Applications that track time across regions, such as e-commerce systems, collaboration tools, or distributed logging, need precise handling of timestamps with time zones. The `TIMESTAMPTZ` data type in Milvus provides this capability by storing timestamps with their associated time zone.

## What is a TIMESTAMPTZ field?

A `TIMESTAMPTZ` field is a schema-defined data type (`DataType.TIMESTAMPTZ`) in Milvus that processes time zone-aware input and stores all time points internally as UTC absolute time:

- **Accepted input format**: [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) strings with a time-zone offset (for example, `"2025-05-01T23:59:59+08:00"` denotes 11:59:59 PM on May 1, 2025 (UTC+08:00)).

- **Internal storage**: All `TIMESTAMPTZ` values are normalized and stored in [Coordinated Universal Time](https://en.wikipedia.org/wiki/Coordinated_Universal_Time) (UTC).

- **Comparison and filtering**: All filtering and ordering operations are performed in UTC, ensuring consistent and predictable results across different time zones.

<div class="alert note">

- You can set `nullable=True` for `TIMESTAMPTZ` fields to allow missing values.

- You can specify a default timestamp value using the `default_value` attribute in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format.

See [Nullable & Default](nullable-and-default.md) for details.

</div>

## Basic operations

The basic workflow of using a `TIMESTAMPTZ` field mirrors other scalar fields in Milvus: define the field → insert data → query/filter.

### Step 1: Define a TIMESTAMPTZ field

To use a `TIMESTAMPTZ` field, explicitly define it in your collection schema when creating the collection. The following example demonstrates how to create a collection with a `tsz` field of type `DataType.TIMESTAMPTZ`.

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
import time
from pymilvus import MilvusClient, DataType
import datetime
import pytz

server_address = "http://localhost:19530"
collection_name = "timestamptz_test123"

client = MilvusClient(uri=server_address)

if client.has_collection(collection_name):
    client.drop_collection(collection_name)

schema = client.create_schema()
# Add a primary key field
schema.add_field("id", DataType.INT64, is_primary=True)
# Add a TIMESTAMPTZ field that allows null values
# highlight-next-line
schema.add_field("tsz", DataType.TIMESTAMPTZ, nullable=True)
# Add a vector field
schema.add_field("vec", DataType.FLOAT_VECTOR, dim=4)

client.create_collection(collection_name, schema=schema, consistency_level="Session")
print(f"Collection '{collection_name}' with a TimestampTz field created successfully.")
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

const std::string collection_name = "timestamptz_test123";

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}

milvus::HasCollectionResponse has_response;
if (client->HasCollection(milvus::HasCollectionRequest().WithCollectionName(collection_name), has_response).IsOk() &&
    has_response.Has()) {
    status = client->DropCollection(milvus::DropCollectionRequest().WithCollectionName(collection_name));
    if (!status.IsOk()) {
        std::cerr << status.Message() << std::endl;
        return;
    }
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
// Add a primary key field
schema->AddField(milvus::FieldSchema("id", milvus::DataType::INT64).WithPrimaryKey(true));
// Add a TIMESTAMPTZ field that allows null values
// highlight-next-line
schema->AddField(milvus::FieldSchema("tsz", milvus::DataType::TIMESTAMPTZ).WithNullable(true));
// Add a vector field
schema->AddField(milvus::FieldSchema("vec", milvus::DataType::FLOAT_VECTOR).WithDimension(4));

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                      .WithCollectionName(collection_name)
                                      .WithCollectionSchema(schema)
                                      .WithConsistencyLevel(milvus::ConsistencyLevel::SESSION));
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
std::cout << "Collection '" << collection_name << "' with a TimestampTz field created successfully." << std::endl;
```

```rust
use milvus::v2 as sdk;
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

let has = client
    .has_collection(
        sdk::request::collection::HasCollectionRequest::builder()
            .collection_name("timestamptz_test123")
            .build()?,
    )
    .await?;
if has.exists() {
    client
        .drop_collection(
            sdk::request::collection::DropCollectionRequest::builder()
                .collection_name("timestamptz_test123")
                .build()?,
        )
        .await?;
}

let schema = sdk::CollectionSchema::new()
    .add_field(
        sdk::FieldSchema::new()
            .name("id")
            .data_type(sdk::DataType::Int64)
            .primary_key(true),
    )
    // highlight-next-line
    .add_field(
        sdk::FieldSchema::new()
            .name("tsz")
            .data_type(sdk::DataType::Timestamptz)
            .nullable(true),
    )
    .add_field(
        sdk::FieldSchema::new()
            .name("vec")
            .data_type(sdk::DataType::FloatVector)
            .dimension(4),
    );

client
    .create_collection(
        sdk::request::collection::CreateCollectionRequest::builder()
            .collection_name("timestamptz_test123")
            .schema(schema)
            .consistency_level(sdk::ConsistencyLevel::Session)
            .build()?,
    )
    .await?;
println!("Collection 'timestamptz_test123' with a TimestampTz field created successfully.");
```

```bash
# restful
```

### Step 2: Insert data

Insert entities containing ISO 8601 strings with time zone offsets.

The example below inserts 8,193 rows of sample data into the collection. Each row includes:

- a unique ID

- a timezone-aware timestamp (Shanghai time)

- a simple 4-dimensional vector

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
data_size = 8193

# Get the Asia/Shanghai time zone using the pytz library
# You can use any valid IANA time zone identifier such as:
#   "Asia/Tokyo", "America/New_York", "Europe/London", "UTC", etc.
# To view all available values:
#   import pytz; print(pytz.all_timezones)
# Reference:
#   IANA database – https://www.iana.org/time-zones
#   Wikipedia – https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
shanghai_tz = pytz.timezone("Asia/Shanghai")

data = [
    {
        "id": i + 1,
        "tsz": shanghai_tz.localize(
            datetime.datetime(2025, 1, 1, 0, 0, 0) + datetime.timedelta(days=i)
        ).isoformat(),
        "vec": [float(i) / 10 for i in range(4)],
    }
    for i in range(data_size)
]

client.insert(collection_name, data)
print("Data inserted successfully.")
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
const int64_t data_size = 8193;

// Get the Asia/Shanghai time zone using a fixed UTC+08:00 offset
// You can use any valid IANA time zone identifier such as:
//   "Asia/Tokyo", "America/New_York", "Europe/London", "UTC", etc.
milvus::EntityRows data;
for (int64_t i = 0; i < data_size; ++i) {
    // 2025-01-01 00:00:00 +08:00 is 2024-12-31 16:00:00 UTC
    std::time_t ts = 1735660800 + i * 86400;
    char buf[64];
    std::tm utc_tm;
    gmtime_r(&ts, &utc_tm);
    std::strftime(buf, sizeof(buf), "%Y-%m-%dT%H:%M:%SZ", &utc_tm);

    milvus::EntityRow row;
    row["id"] = i + 1;
    row["tsz"] = std::string(buf);
    row["vec"] = std::vector<float>{0.0f, 0.1f, 0.2f, 0.3f};
    data.emplace_back(std::move(row));
}

milvus::InsertResponse insert_response;
status = client->Insert(milvus::InsertRequest().WithCollectionName(collection_name).WithRowsData(std::move(data)),
                        insert_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
std::cout << "Data inserted successfully." << std::endl;
```

```rust
const DATA_SIZE: i64 = 8193;

// Get the Asia/Shanghai time zone using a fixed UTC+08:00 offset
// You can use any valid IANA time zone identifier such as:
//   "Asia/Tokyo", "America/New_York", "Europe/London", "UTC", etc.
let data: Vec<_> = (0..DATA_SIZE)
    .map(|i| {
        // 2025-01-01 00:00:00 +08:00 is 2024-12-31 16:00:00 UTC
        let timestamp = chrono::DateTime::from_timestamp(1_735_660_800 + i * 86400, 0)
            .expect("valid timestamp");
        serde_json::json!({
            "id": i + 1,
            "tsz": timestamp.to_rfc3339(),
            "vec": [0.0, 0.1, 0.2, 0.3],
        })
    })
    .collect();

client
    .insert(
        sdk::request::dml::InsertRequest::builder()
            .collection_name("timestamptz_test123")
            .rows(data)
            .build()?,
    )
    .await?;
println!("Data inserted successfully.");
```

```bash
# restful
```

### Step 3: Filtering operations

`TIMESTAMPTZ` supports scalar comparisons, interval arithmetic, and extraction of time components.

Before you can perform filtering operations on `TIMESTAMPTZ` fields, make sure:

- You have created an index on each vector field.

- The collection is loaded into memory.

<details>

<summary>Show example code</summary>

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
# Create index on vector field
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="vec",
    index_type="AUTOINDEX",
    index_name="vec_index",
    metric_type="COSINE"
)
client.create_index(collection_name, index_params)
print("Index created successfully.")

# Load the collection
client.load_collection(collection_name)
print(f"Collection '{collection_name}' loaded successfully.")
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Create index on vector field
milvus::IndexDesc index_desc("vec", "vec_index", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE);
status = client->CreateIndex(
    milvus::CreateIndexRequest().WithCollectionName(collection_name).AddIndex(std::move(index_desc)));
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
std::cout << "Index created successfully." << std::endl;

// Load the collection
status = client->LoadCollection(milvus::LoadCollectionRequest().WithCollectionName(collection_name));
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
std::cout << "Collection '" << collection_name << "' loaded successfully." << std::endl;
```

```rust
// Create index on vector field
client
    .create_index(
        sdk::request::index::CreateIndexRequest::builder()
            .collection_name("timestamptz_test123")
            .index_param(
                sdk::IndexParam::new()
                    .field_name("vec")
                    .index_name("vec_index")
                    .index_type(sdk::IndexType::AutoIndex)
                    .metric_type(sdk::MetricType::Cosine),
            )
            .build()?,
    )
    .await?;
println!("Index created successfully.");

// Load the collection
client
    .load_collection(
        sdk::request::collection::LoadCollectionRequest::builder()
            .collection_name("timestamptz_test123")
            .build()?,
    )
    .await?;
println!("Collection 'timestamptz_test123' loaded successfully.");
```

```bash
# restful
```

</details>

#### Query with timestamp filtering

Use arithmetic operators like `==`, `!=`, `<`, `>`, `<=`, `>=`. For a full list of arithmetic operators available in Milvus, refer to [Arithmetic operators](basic-operators.md#Arithmetic-operators).

The example below filters entities with timestamps (`tsz`) that are not equal to **2025-01-03T00:00:00+08:00**:

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
# Query for entities where tsz is not equal to '2025-01-03T00:00:00+08:00'
# highlight-next-line
expr = "tsz != ISO '2025-01-03T00:00:00+08:00'"

results = client.query(
    collection_name=collection_name,
    filter=expr,
    output_fields=["id", "tsz"],
    limit=10
)

print("Query result: ", results)

# Expected output:
# Query result:  data: ["{'id': 1, 'tsz': '2024-12-31T16:00:00Z'}", "{'id': 2, 'tsz': '2025-01-01T16:00:00Z'}", "{'id': 4, 'tsz': '2025-01-03T16:00:00Z'}", "{'id': 5, 'tsz': '2025-01-04T16:00:00Z'}", "{'id': 6, 'tsz': '2025-01-05T16:00:00Z'}", "{'id': 7, 'tsz': '2025-01-06T16:00:00Z'}", "{'id': 8, 'tsz': '2025-01-07T16:00:00Z'}", "{'id': 9, 'tsz': '2025-01-08T16:00:00Z'}", "{'id': 10, 'tsz': '2025-01-09T16:00:00Z'}", "{'id': 11, 'tsz': '2025-01-10T16:00:00Z'}"]
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Query for entities where tsz is not equal to '2025-01-03T00:00:00+08:00'
// highlight-next-line
std::string expr = "tsz != ISO '2025-01-03T00:00:00+08:00'";

milvus::QueryRequest query_request;
query_request.WithCollectionName(collection_name)
    .WithFilter(expr)
    .WithOutputFields({"id", "tsz"})
    .WithLimit(10);
milvus::QueryResponse query_response;
status = client->Query(query_request, query_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
milvus::EntityRows rows;
status = query_response.Results().OutputRows(rows);
for (const auto& row : rows) {
    std::cout << row << std::endl;
}
```

```rust
// Query for entities where tsz is not equal to '2025-01-03T00:00:00+08:00'
// highlight-next-line
let expr = "tsz != ISO '2025-01-03T00:00:00+08:00'";

let query = client
    .query(
        sdk::request::dql::QueryRequest::builder()
            .collection_name("timestamptz_test123")
            .filter(expr)
            .output_fields(["id", "tsz"])
            .limit(10)
            .build()?,
    )
    .await?;
for row in query.results().rows()? {
    println!("{:?}", row.to_entity_row()?);
}
```

```bash
# restful
```

In the example above,

- `tsz` is the `TIMESTAMPTZ` field name defined in the schema.

- `ISO '2025-01-03T00:00:00+08:00'` is a timestamp literal in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) format, including its time-zone offset.

- `!=` compares the field value against that literal. Other supported operators include `==`, `<`, `<=`, `>`, and `>=`.

#### Interval operations

You can perform arithmetic on `TIMESTAMPTZ` fields using **INTERVAL** values in the [ISO 8601 duration format](https://en.wikipedia.org/wiki/ISO_8601#Durations). This allows you to add or subtract durations, such as days, hours, or minutes, from a timestamp when filtering data.

For example, the following query filters entities where the timestamp (`tsz`) plus zero days is **not equal** to **2025-01-03T00:00:00+08:00**:

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
# highlight-next-line
expr = "tsz + INTERVAL 'P0D' != ISO '2025-01-03T00:00:00+08:00'"

results = client.query(
    collection_name, 
    filter=expr, 
    output_fields=["id", "tsz"], 
    limit=10
)

print("Query result: ", results)

# Expected output:
# Query result:  data: ["{'id': 1, 'tsz': '2024-12-31T16:00:00Z'}", "{'id': 2, 'tsz': '2025-01-01T16:00:00Z'}", "{'id': 4, 'tsz': '2025-01-03T16:00:00Z'}", "{'id': 5, 'tsz': '2025-01-04T16:00:00Z'}", "{'id': 6, 'tsz': '2025-01-05T16:00:00Z'}", "{'id': 7, 'tsz': '2025-01-06T16:00:00Z'}", "{'id': 8, 'tsz': '2025-01-07T16:00:00Z'}", "{'id': 9, 'tsz': '2025-01-08T16:00:00Z'}", "{'id': 10, 'tsz': '2025-01-09T16:00:00Z'}", "{'id': 11, 'tsz': '2025-01-10T16:00:00Z'}"]
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// highlight-next-line
std::string expr = "tsz + INTERVAL 'P0D' != ISO '2025-01-03T00:00:00+08:00'";

milvus::QueryRequest query_request;
query_request.WithCollectionName(collection_name)
    .WithFilter(expr)
    .WithOutputFields({"id", "tsz"})
    .WithLimit(10);
milvus::QueryResponse query_response;
status = client->Query(query_request, query_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
milvus::EntityRows rows;
status = query_response.Results().OutputRows(rows);
for (const auto& row : rows) {
    std::cout << row << std::endl;
}
```

```rust
// highlight-next-line
let expr = "tsz + INTERVAL 'P0D' != ISO '2025-01-03T00:00:00+08:00'";

let query = client
    .query(
        sdk::request::dql::QueryRequest::builder()
            .collection_name("timestamptz_test123")
            .filter(expr)
            .output_fields(["id", "tsz"])
            .limit(10)
            .build()?,
    )
    .await?;
for row in query.results().rows()? {
    println!("{:?}", row.to_entity_row()?);
}
```

```bash
# restful
```

<div class="alert note">

`INTERVAL` values follow the [ISO 8601 duration syntax](https://www.w3.org/TR/xmlschema-2/#duration). For example:

- `P1D` → 1 day

- `PT3H` → 3 hours

- `P2DT6H` → 2 days and 6 hours

You can use `INTERVAL` arithmetic directly in filter expressions, such as:

- `tsz + INTERVAL 'P3D'` → Adds 3 days

- `tsz - INTERVAL 'PT2H'` → Subtracts 2 hours

</div>

#### Search with timestamp filtering

You can combine `TIMESTAMPTZ` filtering with vector similarity search to narrow results by both time and similarity.

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
# Define a time-based filter expression
filter = "tsz > ISO '2025-01-05T00:00:00+08:00'"

res = client.search(
    collection_name=collection_name,             # Collection name
    data=[[0.1, 0.2, 0.3, 0.4]],                  # Query vector (must match collection's vector dim)
    limit=5,                                      # Max. number of results to return
    # highlight-next-line
    filter=filter,                                # Filter expression using TIMESTAMPTZ
    output_fields=["id", "tsz"],  # Fields to include in the search results
)

print("Search result: ", res)

# Expected output:
# Search result:  data: [[{'id': 10, 'distance': 0.9759000539779663, 'entity': {'tsz': '2025-01-09T16:00:00Z', 'id': 10}}, {'id': 9, 'distance': 0.9759000539779663, 'entity': {'tsz': '2025-01-08T16:00:00Z', 'id': 9}}, {'id': 8, 'distance': 0.9759000539779663, 'entity': {'tsz': '2025-01-07T16:00:00Z', 'id': 8}}, {'id': 7, 'distance': 0.9759000539779663, 'entity': {'tsz': '2025-01-06T16:00:00Z', 'id': 7}}, {'id': 6, 'distance': 0.9759000539779663, 'entity': {'tsz': '2025-01-05T16:00:00Z', 'id': 6}}]]
```

```java
// java
```

```javascript
// nodejs
```

```go
// go
```

```cpp
// Define a time-based filter expression
std::string time_filter = "tsz > ISO '2025-01-05T00:00:00+08:00'";

milvus::SearchRequest search_request;
search_request.WithCollectionName(collection_name)
    .WithAnnsField("vec")
    .WithLimit(5)
    // highlight-next-line
    .WithFilter(time_filter)
    .WithOutputFields({"id", "tsz"})
    .AddFloatVector(std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f});
milvus::SearchResponse search_response;
status = client->Search(search_request, search_response);
if (!status.IsOk()) {
    std::cerr << status.Message() << std::endl;
    return;
}
for (const auto& result : search_response.Results().Results()) {
    const auto ids = result.Ids().IntIDArray();
    const auto tsz = result.OutputField<milvus::VarCharFieldData>("tsz");
    for (size_t i = 0; i < result.Scores().size(); ++i) {
        std::cout << "id=" << ids[i] << ", tsz=" << tsz->Data()[i] << std::endl;
    }
}
```

```rust
// Define a time-based filter expression
let time_filter = "tsz > ISO '2025-01-05T00:00:00+08:00'";

let search = client
    .search(
        sdk::request::dql::SearchRequest::builder()
            .collection_name("timestamptz_test123")
            .vector_field("vec")
            .vectors(SearchVectors::Float(vec![vec![0.1f32, 0.2, 0.3, 0.4]]))
            .limit(5)
            // highlight-next-line
            .filter(time_filter)
            .output_fields(["id", "tsz"])
            .build()?,
    )
    .await?;
for result in search.results() {
    for row in result.rows()? {
        let id = match row.get("id")? {
            ResultValue::Int64(value) => value,
            value => {
                println!("  unexpected id value: {value:?}");
                continue;
            }
        };
        let tsz = match row.get("tsz")? {
            ResultValue::String(value) => value,
            value => {
                println!("  unexpected tsz value: {value:?}");
                continue;
            }
        };
        println!("id={id}, tsz={tsz}");
    }
}
```

```bash
# restful
```

<div class="alert note">

If your collection has two or more vector fields, you can perform hybrid search operations with timestamp filtering. For details, refer to [Multi-Vector Hybrid Search](multi-vector-search.md).

</div>

## Advanced usage

For advanced usage, you can manage time zones at different levels (e.g. database, collection, or query) or accelerate queries on `TIMESTAMPTZ` fields using indexes.

### Manage time zones at different levels

You can control the time zone for `TIMESTAMPTZ` fields at the **database**, **collection**, or **query/search** level.

<table>
   <tr>
     <th><p>Level</p></th>
     <th><p>Parameter</p></th>
     <th><p>Scope</p></th>
     <th><p>Priority</p></th>
   </tr>
   <tr>
     <td><p>Database</p></td>
     <td><p><code>timezone</code></p></td>
     <td><p>Default for all collections in the database</p></td>
     <td><p>Lowest</p></td>
   </tr>
   <tr>
     <td><p>Collection</p></td>
     <td><p><code>timezone</code></p></td>
     <td><p>Overrides the database default time zone setting for that collection</p></td>
     <td><p>Medium</p></td>
   </tr>
   <tr>
     <td><p>Query/search/hybrid search</p></td>
     <td><p><code>timezone</code></p></td>
     <td><p>Temporary overrides for one specific operation</p></td>
     <td><p>Highest</p></td>
   </tr>
</table>

For step-by-step instructions and code samples, refer to the dedicated pages:

- [Modify Collection](modify-collection.md#Example-6-Set-collection-time-zone)

- [Database](manage_databases.md#Manage-database-properties)

- [Query](get-and-scalar-query.md#Temporarily-set-a-timezone-for-a-query)

- [Basic Vector Search](single-vector-search.md#Temporarily-set-a-timezone-for-a-search)

- [Multi-Vector Hybrid Search](multi-vector-search.md)

### Accelerate queries

By default, queries on `TIMESTAMPTZ` fields without an index will perform a full scan of all rows, which can be slow on large datasets. To accelerate timestamp queries, create an `STL_SORT` index on your `TIMESTAMPTZ` field.

For details, refer to [STL_SORT](stl-sort.md).
