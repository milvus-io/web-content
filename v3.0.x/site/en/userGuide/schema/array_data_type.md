---
id: array_data_type.md
title: "Array Field"
summary: "An ARRAY field stores an ordered set of elements of the same data type. Here's an example of how ARRAY fields store data:"
---

# Array Field

An ARRAY field stores an ordered list of elements of the same data type.

Here's an example of how ARRAY fields store data:

```json
{
  "tags": ["pop", "rock", "classic"],
  "ratings": [5, 4, 3]
}
```

## Limits

- **Default Values**: ARRAY fields do not support default values. However, you can set the `nullable` attribute to `True` to allow null values. For details, refer to [Nullable & Default](nullable-and-default.md).

- <strong>Data Type:</strong> All elements in an ARRAY field must share the same data type, which is defined by the `element_type` parameter. When `element_type` is set to `VARCHAR`, you must also specify `max_length`, which defines the maximum number of bytes allowed for each array element. The `element_type` accepts any scalar data type supported by Milvus, with the exception of `JSON`. For `element_type=STRUCT`, use a StructArray field and provide a `struct_schema`; for details, refer to [StructArray](create-structarray-field.md).

- **Array Capacity**: The number of elements in an ARRAY field must be less than or equal to the maximum capacity defined when the Array was created, as specified by `max_capacity`. The value should be an integer within the range from **1** to **4096**.

- **String Handling**: String values in Array fields are stored as-is, without semantic escaping or conversion. For example, `'a"b'`, `"a'b"`, `'a\'b'`, and `"a\"b"` are stored as entered, while `'a'b'` and `"a"b"` are considered invalid values.

## Add ARRAY field

To use ARRAY fields in Milvus clusters, define the relevant field type when creating the collection schema. This process includes:

1. Setting `datatype` to the supported Array data type, `ARRAY`.

1. Using the `element_type` parameter to specify the data type of elements in the array. All elements in the same array must be of the same data type.

1. Using the `max_capacity` parameter to define the maximum capacity of the array, i.e., the maximum number of elements it can contain.

Here’s how to define a collection schema that includes ARRAY fields:

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

# Add `tags` and `ratings` ARRAY fields with nullable=True
schema.add_field(field_name="tags", datatype=DataType.ARRAY, element_type=DataType.VARCHAR, max_capacity=10, max_length=65535, nullable=True)
schema.add_field(field_name="ratings", datatype=DataType.ARRAY, element_type=DataType.INT64, max_capacity=5, nullable=True)
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
        .fieldName("tags")
        .dataType(DataType.Array)
        .elementType(DataType.VarChar)
        .maxCapacity(10)
        .maxLength(65535)
        .isNullable(true)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("ratings")
        .dataType(DataType.Array)
        .elementType(DataType.Int64)
        .maxCapacity(5)
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
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

milvusAddr := "http://localhost:19530"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema().WithDynamicFieldEnabled(true)
schema.WithField(entity.NewField().
    WithName("tags").
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeVarChar).
    WithMaxCapacity(10).
    WithMaxLength(65535).
    WithNullable(true),
).WithField(entity.NewField().
    WithName("ratings").
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeInt64).
    WithMaxCapacity(5).
    WithNullable(true),
).WithField(entity.NewField().
    WithName("pk").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("embedding").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(3),
)
```

```rust
use milvus::v2::error::Result;
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

let schema = CollectionSchema::new()
    .enable_dynamic_field(true)
    .add_field(
        FieldSchema::new()
            .name("tags")
            .data_type(DataType::Array)
            .element_type(DataType::VarChar)
            .max_capacity(10)
            .max_length(65535)
            .nullable(true),
    )
    .add_field(
        FieldSchema::new()
            .name("ratings")
            .data_type(DataType::Array)
            .element_type(DataType::Int64)
            .max_capacity(5)
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

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
#include <memory>

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField(milvus::FieldSchema("tags", milvus::DataType::ARRAY)
                                    .WithMaxCapacity(10)
                                    .WithElementType(milvus::DataType::VARCHAR)
                                    .WithMaxLength(65535)
                                    .WithNullable(true));
schema->AddField(milvus::FieldSchema("ratings", milvus::DataType::ARRAY)
                                    .WithMaxCapacity(5)
                                    .WithElementType(milvus::DataType::INT64)
                                    .WithNullable(true));
schema->AddField(milvus::FieldSchema("pk", milvus::DataType::INT64).WithPrimaryKey(true));
schema->AddField(milvus::FieldSchema("embedding", milvus::DataType::FLOAT_VECTOR).WithDimension(3));
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });

const schema = [
    {
        name: "tags",
        data_type: DataType.Array,
        element_type: DataType.VarChar,
        max_capacity: 10,
        max_length: 65535,
        nullable: true
    },
    {
        name: "ratings",
        data_type: DataType.Array,
        element_type: DataType.Int64,
        max_capacity: 5,
        nullable: true
    },
    {
        name: "pk",
        data_type: DataType.Int64,
        is_primary_key: true
    },
    {
        name: "embedding",
        data_type: DataType.FloatVector,
        dim: 3
    }
];
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});

// Define the collection schema
CollectionSchema schema = new()
{
    EnableDynamicFields = true,
    Fields =
    {
        // Add `tags` and `ratings` ARRAY fields with nullable=True
        new FieldSchema("tags", DataType.Array) { ElementDataType = DataType.VarChar, MaxCapacity = 10, MaxLength = 65535, Nullable = true },
        new FieldSchema("ratings", DataType.Array) { ElementDataType = DataType.Int64, MaxCapacity = 5, Nullable = true },
        new FieldSchema("pk", DataType.Int64, isPrimaryKey: true),
        new FieldSchema("embedding", DataType.FloatVector) { Dimension = 3 }
    }
};
```

```bash
export arrayField1='{
    "fieldName": "tags",
    "dataType": "Array",
    "elementDataType": "VarChar",
    "elementTypeParams": {
        "max_capacity": 10,
        "max_length": 65535
    },
    "nullable": true
}'

export arrayField2='{
    "fieldName": "ratings",
    "dataType": "Array",
    "elementDataType": "Int64",
    "elementTypeParams": {
        "max_capacity": 5
    },
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
    \"enableDynamicField\": true,
    \"fields\": [
        $arrayField1,
        $arrayField2,
        $pkField,
        $vectorField
    ]
}"
```

## Set index params

Indexing helps improve search and query performance. In Milvus clusters, indexing is mandatory for vector fields but optional for scalar fields.

The following example creates indexes on the vector field `embedding` and the ARRAY field `tags`, both using the `AUTOINDEX` index type. With this type, Milvus automatically selects the most suitable index based on the data type. You can also customize the index type and params for each field. For details, refer to [Index Explained](index-explained.md).

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

# Index `tags` with AUTOINDEX
index_params.add_index(
    field_name="tags",
    index_type="AUTOINDEX",
    index_name="tags_index"
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
        .fieldName("tags")
        .indexName("tags_index")
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

indexOpt1 := milvusclient.NewCreateIndexOption("my_collection", "tags", index.NewAutoIndex(entity.COSINE)).WithIndexName("tags_index")
indexOpt2 := milvusclient.NewCreateIndexOption("my_collection", "embedding", index.NewAutoIndex(entity.COSINE))
```

```rust
use milvus::v2::prelude::*;

let tags_index = IndexParam::new()
    .field_name("tags")
    .index_name("tags_index")
    .index_type(IndexType::AutoIndex);

let embedding_index = IndexParam::new()
    .field_name("embedding")
    .index_type(IndexType::AutoIndex)
    .metric_type(MetricType::Cosine);
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <vector>

std::vector<milvus::IndexDesc> indexes = {
    milvus::IndexDesc("tags", "tags_index", milvus::IndexType::AUTOINDEX),
    milvus::IndexDesc("embedding", "", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)
};
```

```javascript
import { IndexType, MetricType } from "@zilliz/milvus2-sdk-node";

const indexParams = [{
    index_name: 'tags_index',
    field_name: 'tags',
    index_type: IndexType.AUTOINDEX
}, {
    field_name: 'embedding',
    index_type: IndexType.AUTOINDEX,
    metric_type: MetricType.COSINE
}];
```

```csharp
using Milvus.Client.V2.Types;

// Set index params
IndexParam[] indexes =
[
    // Index `tags` with AUTOINDEX
    new IndexParam("tags", "tags_index", IndexType.AutoIndex),
    // Index `embedding` with AUTOINDEX and specify similarity metric type
    new IndexParam("embedding", null, IndexType.AutoIndex, MetricType.Cosine)
];
```

```bash
export indexParams='[
        {
            "fieldName": "tags",
            "indexName": "tags_index",
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

Once the schema and index are defined, create a collection that includes ARRAY fields.

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
client.create_collection(
    collection_name="my_collection",
    schema=schema,
    index_params=index_params
)

# Load the collection into memory before performing searches and queries
client.load_collection(collection_name="my_collection")
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.LoadCollectionReq;

CreateCollectionReq requestCreate = CreateCollectionReq.builder()
        .collectionName("my_collection")
        .collectionSchema(schema)
        .indexParams(indexes)
        .build();
client.createCollection(requestCreate);

client.loadCollection(LoadCollectionReq.builder()
        .collectionName("my_collection")
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("my_collection", schema).
    WithIndexOptions(indexOpt1, indexOpt2))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}

_, err = client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption("my_collection"))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```rust
use milvus::v2::prelude::*;

client.create_collection(
    CreateCollectionRequest::builder()
        .collection_name("my_collection")
        .schema(schema)
        .build()?,
).await?;

// Rust creates indexes with separate create_index calls after creating the collection
client.create_index(
    CreateIndexRequest::builder()
        .collection_name("my_collection")
        .index_param(tags_index)
        .index_param(embedding_index)
        .build()?,
).await?;

client.load_collection(
    LoadCollectionRequest::builder()
        .collection_name("my_collection")
        .build()?,
).await?;
```

```cpp
status = client->CreateCollection(milvus::CreateCollectionRequest()
                                    .WithCollectionName("my_collection")
                                    .WithIndexes(std::move(indexes))
                                    .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->LoadCollection(milvus::LoadCollectionRequest()
                                .WithCollectionName("my_collection"));
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

await client.loadCollection({
    collection_name: "my_collection"
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "my_collection",
    Schema = schema,
    Indexes = indexes
});

// Load the collection into memory before performing searches and queries
await client.LoadCollectionAsync(new LoadCollectionReq
{
    CollectionName = "my_collection"
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

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "my_collection"
}'
```

## Insert data

After creating the collection, you can insert data that includes ARRAY fields.

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
  {
      "tags": ["pop", "rock", "classic"],
      "ratings": [5, 4, 3],
      "pk": 1,
      "embedding": [0.12, 0.34, 0.56]
  },
  {
      "tags": None,  # Entire ARRAY is null
      "ratings": [4, 5],
      "pk": 2,
      "embedding": [0.78, 0.91, 0.23]
  },
  {  # The tags field is completely missing
      "ratings": [9, 5],
      "pk": 3,
      "embedding": [0.18, 0.11, 0.23]
  }
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
rows.add(gson.fromJson("{\"tags\": [\"pop\", \"rock\", \"classic\"], \"ratings\": [5, 4, 3], \"pk\": 1, \"embedding\": [0.12, 0.34, 0.56]}", JsonObject.class));
rows.add(gson.fromJson("{\"tags\": null, \"ratings\": [4, 5], \"pk\": 2, \"embedding\": [0.78, 0.91, 0.23]}", JsonObject.class));
rows.add(gson.fromJson("{\"ratings\": [9, 5], \"pk\": 3, \"embedding\": [0.18, 0.11, 0.23]}", JsonObject.class));

InsertResp insertR = client.insert(InsertReq.builder()
        .collectionName("my_collection")
        .data(rows)
        .build());
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/column"
)

column1 := column.NewColumnVarCharArray("tags", [][]string{{"pop", "rock", "classic"}})
column1.SetNullable(true)
column1.AppendNull()
column1.AppendNull()
column2 := column.NewColumnInt64Array("ratings", [][]int64{{5, 4, 3}, {4, 5}, {9, 5}})

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption("my_collection").
    WithInt64Column("pk", []int64{1, 2, 3}).
    WithFloatVectorColumn("embedding", 3, [][]float32{
        {0.12, 0.34, 0.56},
        {0.78, 0.91, 0.23},
        {0.18, 0.11, 0.23},
    }).WithColumns(column1, column2))
if err != nil {
    fmt.Println(err.Error())
    // handle err
}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;

let rows = vec![
    json!({
        "tags": ["pop", "rock", "classic"],
        "ratings": [5, 4, 3],
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    }),
    json!({
        "tags": None::<String>,
        "ratings": [4, 5],
        "pk": 2,
        "embedding": [0.78, 0.91, 0.23]
    }),
    json!({
        "ratings": [9, 5],
        "pk": 3,
        "embedding": [0.18, 0.11, 0.23]
    }),
];

client.insert(
    InsertRequest::builder()
        .collection_name("my_collection")
        .rows(rows)
        .build()?,
).await?;
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <string>
#include <vector>

milvus::EntityRows data = {{{"pk", 1}, {"tags", std::vector<std::string>{"pop", "rock", "classic"}}, {"ratings", std::vector<int64_t>{5, 4, 3}}, {"embedding", std::vector<float>{0.12, 0.34, 0.56}}},
                           {{"pk", 2}, {"tags", nullptr}, {"ratings", std::vector<int64_t>{4, 5}}, {"embedding", std::vector<float>{0.78, 0.91, 0.23}}},
                           {{"pk", 3}, {"ratings", std::vector<int64_t>{9, 5}}, {"embedding", std::vector<float>{0.18, 0.11, 0.23}}}};

milvus::InsertResponse insert_response;
status = client->Insert(milvus::InsertRequest()
                            .WithCollectionName("my_collection")
                            .WithRowsData(std::move(data)),
                        insert_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const data = [
    {
        "tags": ["pop", "rock", "classic"],
        "ratings": [5, 4, 3],
        "pk": 1,
        "embedding": [0.12, 0.34, 0.56]
    },
    {
        "tags": null,
        "ratings": [4, 5],
        "pk": 2,
        "embedding": [0.78, 0.91, 0.23]
    },
    {
        "ratings": [9, 5],
        "pk": 3,
        "embedding": [0.18, 0.11, 0.23]
    }
];

await client.insert({
  collection_name: "my_collection",
  data: data,
});
```

```csharp
using Milvus.Client.V2.Requests.Dml;

// Sample data
await client.InsertAsync(new InsertReq
{
    CollectionName = "my_collection",
    RowsData =
    [
        new Dictionary<string, object?> { ["tags"] = new[] { "pop", "rock", "classic" }, ["ratings"] = new long[] { 5, 4, 3 }, ["pk"] = 1L, ["embedding"] = new[] { 0.12f, 0.34f, 0.56f } },
        new Dictionary<string, object?> { ["tags"] = null, ["ratings"] = new long[] { 4, 5 }, ["pk"] = 2L, ["embedding"] = new[] { 0.78f, 0.91f, 0.23f } }, // Entire ARRAY is null
        new Dictionary<string, object?> { ["ratings"] = new long[] { 9, 5 }, ["pk"] = 3L, ["embedding"] = new[] { 0.18f, 0.11f, 0.23f } } // The tags field is completely missing
    ]
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
        {
            "tags": ["pop", "rock", "classic"],
            "ratings": [5, 4, 3],
            "pk": 1,
            "embedding": [0.12, 0.34, 0.56]
        },
        {
            "tags": null,
            "ratings": [4, 5],
            "pk": 2,
            "embedding": [0.78, 0.91, 0.23]
        },
        {
            "ratings": [9, 5],
            "pk": 3,
            "embedding": [0.18, 0.11, 0.23]
        }
    ],
    "collectionName": "my_collection"
}'
```

<div class="alert note">

Beyond inserting full arrays, `ARRAY` fields also support the `ARRAY_APPEND` and `ARRAY_REMOVE` partial-update operators on the `upsert` API in Milvus v2.6.17 and later. These let you append elements to or remove matching elements from an existing array without first retrieving its current value, which avoids the client-side read-modify-write pattern. For details, see [Upsert ARRAY fields in merge mode](upsert-entities.md#Upsert-ARRAY-fields-in-merge-mode).

</div>

## Query with filter expressions

After inserting entities, use the `query` method to retrieve entities that match the specified filter expressions.

To retrieve entities where the `tags` is not null:

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
# Query entities where `tags` is not null
filter = 'tags IS NOT NULL'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["tags", "ratings", "pk"]
)

print(res)
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

String filter = "tags IS NOT NULL";
QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("tags", "ratings", "pk"))
        .build());

System.out.println(resp.getQueryResults());
```

```go
filter := "tags IS NOT NULL"
rs, err := client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("tags", "ratings", "pk"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("pk", rs.GetColumn("pk").FieldData().GetScalars())
fmt.Println("tags", rs.GetColumn("tags").FieldData().GetScalars())
fmt.Println("ratings", rs.GetColumn("ratings").FieldData().GetScalars())
```

```rust
use milvus::v2::prelude::*;

let query_results = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter("tags IS NOT NULL")
            .output_fields(["tags", "ratings", "pk"])
            .build()?,
    )
    .await?;
for row in query_results.results().get_output_rows()? {
    println!("{:?}", row);
}
```

```cpp
milvus::QueryResponse query_response;
status = client->Query(milvus::QueryRequest()
                        .WithCollectionName("my_collection")
                        .WithFilter("tags IS NOT NULL")
                        .AddOutputField("tags")
                        .AddOutputField("ratings")
                        .AddOutputField("pk"),
                        query_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::EntityRows output_rows;
status = query_response.Results().OutputRows(output_rows);
for (const auto& row : output_rows) {
    std::cout << "        " << row << std::endl;
}
```

```javascript
const res = await client.query({
    collection_name: 'my_collection',
    filter: 'tags IS NOT NULL',
    output_fields: ['tags', 'ratings', 'pk']
});

console.log(res);
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

// Query entities where `tags` is not null
string filter = "tags IS NOT NULL";

QueryResp res = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = filter,
    Parameters = new QueryParameters { OutputFields = { "tags", "ratings", "pk" } }
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
    "filter": "tags IS NOT NULL",
    "outputFields": ["tags", "ratings", "pk"]
}'
```

To retrieve entities where the value of the first element of `ratings` is greater than 4:

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
filter = 'ratings[0] > 4'

res = client.query(
    collection_name="my_collection",
    filter=filter,
    output_fields=["tags", "ratings", "embedding"]
)

print(res)
```

```java
import io.milvus.v2.service.vector.request.QueryReq;
import io.milvus.v2.service.vector.response.QueryResp;
import java.util.Arrays;

String filter = "ratings[0] > 4";

QueryResp resp = client.query(QueryReq.builder()
        .collectionName("my_collection")
        .filter(filter)
        .outputFields(Arrays.asList("tags", "ratings", "embedding"))
        .build());

System.out.println(resp.getQueryResults());
```

```go
filter = "ratings[0] > 4"
rs, err = client.Query(ctx, milvusclient.NewQueryOption("my_collection").
    WithFilter(filter).
    WithOutputFields("tags", "ratings", "embedding"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

fmt.Println("tags", rs.GetColumn("tags").FieldData().GetScalars())
fmt.Println("ratings", rs.GetColumn("ratings").FieldData().GetScalars())
fmt.Println("embedding", rs.GetColumn("embedding").FieldData().GetVectors())
```

```rust
use milvus::v2::prelude::*;

let query_results = client
    .query(
        QueryRequest::builder()
            .collection_name("my_collection")
            .filter("ratings[0] > 4")
            .output_fields(["tags", "ratings", "embedding"])
            .build()?,
    )
    .await?;
for row in query_results.results().get_output_rows()? {
    println!("{:?}", row);
}
```

```cpp
status = client->Query(milvus::QueryRequest()
                        .WithCollectionName("my_collection")
                        .WithFilter("ratings[0] > 4")
                        .AddOutputField("tags")
                        .AddOutputField("ratings")
                        .AddOutputField("embedding"),
                        query_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = query_response.Results().OutputRows(output_rows);
for (const auto& row : output_rows) {
    std::cout << "        " << row << std::endl;
}
```

```javascript
const filter = 'ratings[0] > 4';

const res = await client.query({
    collection_name: "my_collection",
    filter: filter,
    output_fields: ["tags", "ratings", "embedding"]
});

console.log(res);
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

string filter = "ratings[0] > 4";

QueryResp res = await client.QueryAsync(new QueryReq
{
    CollectionName = "my_collection",
    Expression = filter,
    Parameters = new QueryParameters { OutputFields = { "tags", "ratings", "embedding" } }
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
  "filter": "ratings[0] > 4",
  "outputFields": ["tags", "ratings", "embedding"]
}'
```

## Vector search with filter expressions

In addition to basic scalar field filtering, you can combine vector similarity searches with scalar field filters. For example, the following code shows how to add a scalar field filter to a vector search:

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
filter = 'tags[0] == "pop"'

res = client.search(
    collection_name="my_collection",
    data=[[0.3, -0.6, 0.1]],
    limit=5,
    search_params={"params": {"nprobe": 10}},
    output_fields=["tags", "ratings", "embedding"],
    filter=filter
)

print(res)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.FloatVec;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

String filter = "tags[0] == \"pop\"";
SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("my_collection")
        .annsField("embedding")
        .data(Collections.singletonList(new FloatVec(new float[]{0.3f, -0.6f, 0.1f})))
        .topK(5)
        .outputFields(Arrays.asList("tags", "ratings", "embedding"))
        .filter(filter)
        .build());

System.out.println(searchResp.getSearchResults());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

queryVector := []float32{0.3, -0.6, 0.1}
filter = "tags[0] == \"pop\""

annParam := index.NewCustomAnnParam()
annParam.WithExtraParam("nprobe", 10)
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "my_collection", // collectionName
    5,               // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("embedding").
    WithFilter(filter).
    WithOutputFields("tags", "ratings", "embedding").
    WithAnnParam(annParam))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

for _, resultSet := range resultSets {
    fmt.Println("IDs: ", resultSet.IDs.FieldData().GetScalars())
    fmt.Println("Scores: ", resultSet.Scores)
    fmt.Println("tags", resultSet.GetColumn("tags").FieldData().GetScalars())
    fmt.Println("ratings", resultSet.GetColumn("ratings").FieldData().GetScalars())
    fmt.Println("embedding", resultSet.GetColumn("embedding").FieldData().GetVectors())
}
```

```rust
use milvus::v2::prelude::*;

let search_results = client
    .search(
        SearchRequest::builder()
            .collection_name("my_collection")
            .vector_field("embedding")
            .vectors(SearchVectors::Float(vec![vec![0.3f32, -0.6, 0.1]]))
            .filter("tags[0] == \"pop\"")
            .output_fields(["tags", "ratings", "embedding"])
            .limit(5)
            .build()?,
    )
    .await?;
for result in search_results.results().iter() {
    for row in result.get_output_rows()? {
        println!("{:?}", row);
    }
}
```

```cpp
std::vector<float> query_vector = {0.3, -0.6, 0.1};
milvus::SearchResponse search_response;
status = client->Search(milvus::SearchRequest()
                            .WithCollectionName("my_collection")
                            .WithAnnsField("embedding")
                            .WithLimit(5)
                            .WithFilter(R"(tags[0] == "pop")")
                            .AddOutputField("tags")
                            .AddOutputField("ratings")
                            .AddOutputField("embedding")
                            .AddFloatVector(query_vector),
                        search_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto search_results = search_response.Results();
for (const auto& result : search_results.Results()) {
    milvus::EntityRows result_rows;
    status = result.OutputRows(result_rows);
    for (const auto& row : result_rows) {
        std::cout << "        " << row << std::endl;
    }
}
```

```javascript
await client.search({
    collection_name: 'my_collection',
    data: [0.3, -0.6, 0.1],
    limit: 5,
    output_fields: ['tags', 'ratings', 'embedding'],
    filter: 'tags[0] == "pop"'
});
```

```csharp
using Milvus.Client.V2.Requests.Dql;
using Milvus.Client.V2.Responses.Dql;
using Milvus.Client.V2.Types;

string filter = "tags[0] == \"pop\"";

SearchResp searchResp = await client.SearchAsync(new SearchReq
{
    CollectionName = "my_collection",
    VectorFieldName = "embedding",
    Vectors = [new[] { 0.3f, -0.6f, 0.1f }],
    Limit = 5,
    Parameters = new SearchParameters
    {
        Expression = filter,
        OutputFields = { "tags", "ratings", "embedding" }
    }
});
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
    "filter": "tags[0] == \"pop\"",
    "outputFields": ["tags", "ratings", "embedding"]
}'
```

Additionally, Milvus supports advanced Array filtering operators like `ARRAY_CONTAINS`, `ARRAY_CONTAINS_ALL`, `ARRAY_CONTAINS_ANY`, and `ARRAY_LENGTH` to further enhance query capabilities. For more details, refer to [ARRAY Operators](array-operators.md).