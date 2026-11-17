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
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
if err != nil {
    panic(err)
}
defer cli.Close(ctx)

collectionName := "timestamptz_test123"
has, err := cli.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
if err != nil {
    fmt.Println(err.Error())
    return
}
if has {
    err = cli.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
    if err != nil {
        fmt.Println(err.Error())
        return
    }
}

schema := entity.NewSchema().
    WithName(collectionName).
    WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
    WithField(entity.NewField().WithName("tsz").WithDataType(entity.FieldTypeTimestamptz).WithNullable(true)).
    WithField(entity.NewField().WithName("vec").WithDataType(entity.FieldTypeFloatVector).WithDim(4))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithConsistencyLevel(entity.ClSession))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Printf("Collection '%s' with a TimestampTz field created successfully.\n", collectionName)
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "timestamptz_test123",
    "schema": {
        "autoID": false,
        "enableDynamicField": false,
        "fields": [
            {"fieldName": "id", "dataType": "Int64", "isPrimary": true},
            {"fieldName": "tsz", "dataType": "Timestamptz", "nullable": true},
            {"fieldName": "vec", "dataType": "FloatVector", "elementTypeParams": {"dim": 4}}
        ]
    },
    "consistencyLevel": "Session"
}'
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
import "github.com/milvus-io/milvus/client/v3/column"

// Timestamps are written as ISO 8601 strings with a time-zone offset
tszValues := []string{
    "2025-01-01T00:00:00+08:00",
    "2025-01-02T00:00:00+08:00",
    "2025-01-03T00:00:00+08:00",
    "2025-01-04T00:00:00+08:00",
    "2025-01-05T00:00:00+08:00",
}

_, err = cli.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithColumns(
        column.NewColumnInt64("id", []int64{1, 2, 3, 4, 5}),
        column.NewColumnTimestamptzIsoString("tsz", tszValues),
        column.NewColumnFloatVector("vec", 4, [][]float32{
            {0.0, 0.1, 0.2, 0.3},
            {0.1, 0.2, 0.3, 0.4},
            {0.2, 0.3, 0.4, 0.5},
            {0.3, 0.4, 0.5, 0.6},
            {0.4, 0.5, 0.6, 0.7},
        }),
    ))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Println("Data inserted successfully.")
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "timestamptz_test123",
    "data": [
        {"id": 1, "tsz": "2025-01-01T00:00:00+08:00", "vec": [0.0, 0.1, 0.2, 0.3]},
        {"id": 2, "tsz": "2025-01-02T00:00:00+08:00", "vec": [0.1, 0.2, 0.3, 0.4]},
        {"id": 3, "tsz": "2025-01-03T00:00:00+08:00", "vec": [0.2, 0.3, 0.4, 0.5]},
        {"id": 4, "tsz": "2025-01-04T00:00:00+08:00", "vec": [0.3, 0.4, 0.5, 0.6]},
        {"id": 5, "tsz": "2025-01-05T00:00:00+08:00", "vec": [0.4, 0.5, 0.6, 0.7]}
    ]
}'
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
import "github.com/milvus-io/milvus/client/v3/index"

idxOpt := milvusclient.NewCreateIndexOption(collectionName, "vec", index.NewAutoIndex(entity.COSINE))
indexTask, err := cli.CreateIndex(ctx, idxOpt)
if err != nil {
    panic(err)
}
if err = indexTask.Await(ctx); err != nil {
    panic(err)
}
fmt.Println("Index created successfully.")

loadTask, err := cli.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
if err != nil {
    panic(err)
}
if err = loadTask.Await(ctx); err != nil {
    panic(err)
}
fmt.Printf("Collection '%s' loaded successfully.\n", collectionName)
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/indexes/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "timestamptz_test123",
    "indexParams": [{"fieldName": "vec", "indexName": "vec_index", "metricType": "COSINE", "indexType": "AUTOINDEX"}]
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "timestamptz_test123"
}'
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
expr := "tsz != ISO '2025-01-03T00:00:00+08:00'"

resultSet, err := cli.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithOutputFields("id", "tsz").
    WithLimit(10))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Println("Query result: ", resultSet.GetColumn("tsz"))
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "timestamptz_test123",
    "filter": "tsz != ISO '\''2025-01-03T00:00:00+08:00'\''",
    "outputFields": ["id", "tsz"],
    "limit": 10
}'
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
expr := "tsz + INTERVAL 'P0D' != ISO '2025-01-03T00:00:00+08:00'"

resultSet, err := cli.Query(ctx, milvusclient.NewQueryOption(collectionName).
    WithFilter(expr).
    WithOutputFields("id", "tsz").
    WithLimit(10))
if err != nil {
    fmt.Println(err.Error())
    return
}
fmt.Println("Query result: ", resultSet.GetColumn("tsz"))
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "timestamptz_test123",
    "filter": "tsz + INTERVAL '\''P0D'\'' != ISO '\''2025-01-03T00:00:00+08:00'\''",
    "outputFields": ["id", "tsz"],
    "limit": 10
}'
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
filter := "tsz > ISO '2025-01-05T00:00:00+08:00'"
queryVector := []float32{0.1, 0.2, 0.3, 0.4}
annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("metric_type", "COSINE")

resultSets, err := cli.Search(ctx, milvusclient.NewSearchOption(
    collectionName,
    5,
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("vec").
    WithFilter(filter).
    WithAnnParam(annParam).
    WithOutputFields("id", "tsz"))
if err != nil {
    fmt.Println(err.Error())
    return
}

for _, rs := range resultSets {
    fmt.Println("IDs: ", rs.IDs)
    fmt.Println("Scores: ", rs.Scores)
}
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "timestamptz_test123",
    "data": [[0.1, 0.2, 0.3, 0.4]],
    "limit": 5,
    "filter": "tsz > ISO '\''2025-01-05T00:00:00+08:00'\''",
    "outputFields": ["id", "tsz"],
    "searchParams": {"metricType": "COSINE"}
}'
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
