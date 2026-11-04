---
id: create-collection.md
title: "Create Collection"
summary: "You can create a collection by defining its schema, index parameters, metric type, and whether to load it upon creation. This page introduces how to create a collection from scratch."
---

# Create Collection


You can create a collection by defining its schema, index parameters, metric type, and whether to load it upon creation. This page introduces how to create a collection from scratch.


## Overview

A collection is a two-dimensional table with fixed columns and variant rows. Each column represents a field, and each row represents an entity. A schema is required to implement such structural data management. Every entity to insert has to meet the constraints defined in the schema.

You can determine every aspect of a collection, including its schema, index parameters, metric type, and whether to load it upon creation to ensure that the collection fully meets your requirements.

To create a collection, you need to

- [Create schema](create-collection.md#Create-Schema)

- [Set index parameters](create-collection.md#Optional-Set-Index-Parameters) (Optional)

- [Create collection](create-collection.md#Create-a-Collection)

## Create Schema

A schema defines the data structure of a collection. When creating a collection, you need to design the schema based on your requirements. For details, refer to [Schema Explained](schema.md).

The following code snippets create a schema with the enabled dynamic field and three mandatory fields named `my_id`, `my_vector`, and `my_varchar`.

<div class="alert note">

You can set default values for any scalar field and make it nullable. For details, refer to  [Nullable & Default](nullable-and-default.md).

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
# 3. Create a collection in customized setup mode
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus"
)

# 3.1. Create schema
schema = MilvusClient.create_schema(
    auto_id=False,
    enable_dynamic_field=True,
)

# 3.2. Add fields to schema
schema.add_field(field_name="my_id", datatype=DataType.INT64, is_primary=True)
schema.add_field(field_name="my_vector", datatype=DataType.FLOAT_VECTOR, dim=5)
schema.add_field(field_name="my_varchar", datatype=DataType.VARCHAR, max_length=512)
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

String CLUSTER_ENDPOINT = "http://localhost:19530";
String TOKEN = "root:Milvus";

// 1. Connect to Milvus
ConnectConfig connectConfig = ConnectConfig.builder()
        .uri(CLUSTER_ENDPOINT)
        .token(TOKEN)
        .build();

MilvusClientV2 client = new MilvusClientV2(connectConfig);

// 3. Create a collection in customized setup mode

// 3.1 Create schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(true);

// 3.2 Add fields to schema
schema.addField(AddFieldReq.builder()
        .fieldName("my_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(false)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("my_vector")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());

schema.addField(AddFieldReq.builder()
        .fieldName("my_varchar")
        .dataType(DataType.VarChar)
        .maxLength(512)
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
token := "root:Milvus"

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: milvusAddr,
    APIKey:  token,
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

schema := entity.NewSchema().WithDynamicFieldEnabled(true).
    WithField(entity.NewField().WithName("my_id").WithIsAutoID(false).WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true)).
    WithField(entity.NewField().WithName("my_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(5)).
    WithField(entity.NewField().WithName("my_varchar").WithDataType(entity.FieldTypeVarChar).WithMaxLength(512))
```

```rust
use milvus::v2::prelude::*;

// 3. Create a collection in customized setup mode
let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
)
.await?;

// 3.1 + 3.2 Create schema and add fields
let schema = CollectionSchema::new()
    .enable_dynamic_field(true)
    .add_field(
        FieldSchema::new()
            .name("my_id")
            .data_type(DataType::Int64)
            .primary_key(true)
            .auto_id(false),
    )
    .add_field(
        FieldSchema::new()
            .name("my_vector")
            .data_type(DataType::FloatVector)
            .dimension(5),
    )
    .add_field(
        FieldSchema::new()
            .name("my_varchar")
            .data_type(DataType::VarChar)
            .max_length(512),
    );
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
schema->SetEnableDynamicField(true);
schema->AddField(milvus::FieldSchema("my_id", milvus::DataType::INT64, "", true, false));
schema->AddField(milvus::FieldSchema("my_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(5));
schema->AddField(milvus::FieldSchema("my_varchar", milvus::DataType::VARCHAR).WithMaxLength(512));
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

// 3. Create a collection in customized setup mode
// 3.1 + 3.2 Create schema and define fields
const fields = [
    {
        name: "my_id",
        data_type: DataType.Int64,
        is_primary_key: true,
        auto_id: false
    },
    {
        name: "my_vector",
        data_type: DataType.FloatVector,
        dim: 5
    },
    {
        name: "my_varchar",
        data_type: DataType.VarChar,
        max_length: 512
    }
]
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

const string CLUSTER_ENDPOINT = "http://localhost:19530";

using var client = new MilvusClientV2(new ConnectConfig
{
    Uri = CLUSTER_ENDPOINT,
    ApiKey = "root:Milvus"
});
await client.ConnectAsync();

var schema = new CollectionSchema
{
    EnableDynamicFields = true,
    Fields =
    {
        new FieldSchema("my_id", DataType.Int64, isPrimaryKey: true),
        FieldSchema.CreateFloatVector("my_vector", dimension: 5),
        FieldSchema.CreateVarchar("my_varchar", maxLength: 512)
    }
};
```

```bash
export schema='{
        "autoId": false,
        "enableDynamicField": true,
        "fields": [
            {
                "fieldName": "my_id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "my_vector",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            },
            {
                "fieldName": "my_varchar",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 512
                }
            }
        ]
    }'
```


## (Optional) Set Index Parameters

Creating an index on a specific field accelerates the search against this field. An index records the order of entities within a collection. As shown in the following code snippets, you can use `metric_type` and `index_type` to select appropriate ways for Milvus to index a field and measure similarities between vector embeddings.

On Milvus, you can use `AUTOINDEX` as the index type for all vector fields, and one of `COSINE`, `L2`, and `IP` as the metric type based on your needs.

As demonstrated in the above code snippet, you need to set both the index type and metric type for vector fields and only the index type for the scalar fields. Indexes are mandatory for vector fields, and you are advised to create indexes on scalar fields frequently used in filtering conditions.

For details, refer to [Index Vector Fields](index-vector-fields.md) and [Index Scalar Fields](index-scalar-fields.md).

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
# 3.3. Prepare index parameters
index_params = client.prepare_index_params()

# 3.4. Add indexes
index_params.add_index(
    field_name="my_id",
    index_type="AUTOINDEX"
)

index_params.add_index(
    field_name="my_vector", 
    index_type="AUTOINDEX",
    metric_type="COSINE"
)
```

```java
import io.milvus.v2.common.IndexParam;
import java.util.*;

// 3.3 Prepare index parameters
IndexParam indexParamForIdField = IndexParam.builder()
        .fieldName("my_id")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .build();

IndexParam indexParamForVectorField = IndexParam.builder()
        .fieldName("my_vector")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();

List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(indexParamForIdField);
indexParams.add(indexParamForVectorField);
```

```go
import (
    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

collectionName := "customized_setup_1"
indexOptions := []milvusclient.CreateIndexOption{
    milvusclient.NewCreateIndexOption(collectionName, "my_vector", index.NewAutoIndex(entity.COSINE)),
    milvusclient.NewCreateIndexOption(collectionName, "my_id", index.NewAutoIndex(entity.COSINE)),
}
```

```rust
use milvus::v2::prelude::*;

// 3.3 + 3.4 Prepare and add index parameters
let index_params = vec![
    IndexParam::new()
        .field_name("my_id")
        .index_type(IndexType::AutoIndex),
    IndexParam::new()
        .field_name("my_vector")
        .index_type(IndexType::AutoIndex)
        .metric_type(MetricType::Cosine),
];
```

```cpp
std::vector<milvus::IndexDesc> indexes = {
    milvus::IndexDesc("my_id", "my_id", milvus::IndexType::AUTOINDEX),
    milvus::IndexDesc("my_vector", "my_vector", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE)};
```

```javascript
// 3.3 + 3.4 Prepare and add index parameters
const index_params = [{
    field_name: "my_id",
    index_type: "AUTOINDEX"
},{
    field_name: "my_vector",
    index_type: "AUTOINDEX",
    metric_type: "COSINE"
}]
```

```csharp
using Milvus.Client.V2.Types;

var indexParams = new[]
{
    new IndexParam("my_id", "my_id", IndexType.AutoIndex),
    new IndexParam("my_vector", "my_vector", IndexType.AutoIndex, MetricType.Cosine)
};
```

```bash
export indexParams='[
        {
            "fieldName": "my_vector",
            "metricType": "COSINE",
            "indexName": "my_vector",
            "indexType": "AUTOINDEX"
        },
        {
            "fieldName": "my_id",
            "indexName": "my_id",
            "indexType": "AUTOINDEX"
        }
    ]'
```

## Create a Collection

If you have created a collection with index parameters, Milvus automatically loads the collection upon its creation. In this case, all fields mentioned in the index parameters are indexed.

The following code snippets demonstrate how to create the collection with index parameters and check its load status.

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
# 3.5. Create a collection with the index loaded simultaneously
client.create_collection(
    collection_name="customized_setup_1",
    schema=schema,
    index_params=index_params
)

res = client.get_load_state(
    collection_name="customized_setup_1"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: Loaded>"
# }
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;

// 3.5 Create a collection with schema and index parameters
CreateCollectionReq customizedSetupReq1 = CreateCollectionReq.builder()
        .collectionName("customized_setup_1")
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build();

client.createCollection(customizedSetupReq1);

// Check the load state of the collection
GetLoadStateReq customSetupLoadStateReq1 = GetLoadStateReq.builder()
        .collectionName("customized_setup_1")
        .build();

Boolean loaded = client.getLoadState(customSetupLoadStateReq1);
System.out.println(loaded);

// Output:
// true
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("customized_setup_1", schema).
    WithIndexOptions(indexOptions...))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("collection created")

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption("customized_setup_1"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println(state.State)
```

```rust
use milvus::v2::prelude::*;

// 3.5 Create a collection with the index loaded simultaneously
client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("customized_setup_1")
            .schema(schema.clone())
            .index_params(index_params.clone())
            .build()?,
    )
    .await?;

let res = client
    .get_load_state(
        GetLoadStateRequest::builder()
            .collection_name("customized_setup_1")
            .build()?,
    )
    .await?;

println!("{:?}", res.state());
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                           .WithCollectionName("customized_setup_1")
                                           .WithCollectionSchema(schema)
                                           .WithIndexes(std::move(indexes)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetLoadStateResponse response;
status = client->GetLoadState(milvus::GetLoadStateRequest()
                                  .WithCollectionName("customized_setup_1"),
                              response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << std::to_string(response.State()) << std::endl;
```

```javascript
// 3.5 Create a collection with fields and index parameters
let res = await client.createCollection({
    collection_name: "customized_setup_1",
    fields: fields,
    enable_dynamic_field: true,
    index_params: index_params,
})

console.log(res.error_code)

// Output
//
// Success
//

res = await client.getLoadState({
    collection_name: "customized_setup_1"
})

console.log(res.state)

// Output
//
// LoadStateLoaded
//
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "customized_setup_1",
    Schema = schema,
    Indexes = indexParams
});

var res = await client.GetLoadStateAsync(new GetLoadStateReq
{
    CollectionName = "customized_setup_1"
});
Console.WriteLine(res.State);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"customized_setup_1\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "customized_setup_1"
}'

# {
#     "code": 0,
#     "data": {
#         "loadProgress": 100,
#         "loadState": "LoadStateLoaded",
#         "message": ""
#     }
# }
```


You can also create a collection without any index parameters and add them afterward. In this case, Milvus does not load the collection upon its creation.


The following code snippet demonstrates how to create a collection without an index, and the load status of the collection remains unloaded upon creation.

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
# 3.6. Create a collection and index it separately
client.create_collection(
    collection_name="customized_setup_2",
    schema=schema,
)

res = client.get_load_state(
    collection_name="customized_setup_2"
)

print(res)

# Output
#
# {
#     "state": "<LoadState: NotLoad>"
# }
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.GetLoadStateReq;

// 3.6 Create a collection and index it separately
CreateCollectionReq customizedSetupReq2 = CreateCollectionReq.builder()
    .collectionName("customized_setup_2")
    .collectionSchema(schema)
    .build();

client.createCollection(customizedSetupReq2);

GetLoadStateReq customSetupLoadStateReq2 = GetLoadStateReq.builder()
        .collectionName("customized_setup_2")
        .build();

Boolean loaded = client.getLoadState(customSetupLoadStateReq2);
System.out.println(loaded);

// Output:
// false
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("customized_setup_2", schema))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("collection created")

state, err := client.GetLoadState(ctx, milvusclient.NewGetLoadStateOption("customized_setup_2"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println(state.State)
```

```rust
use milvus::v2::prelude::*;

// 3.6 Create a collection and index it separately
client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("customized_setup_2")
            .schema(schema.clone())
            .build()?,
    )
    .await?;

let res = client
    .get_load_state(
        GetLoadStateRequest::builder()
            .collection_name("customized_setup_2")
            .build()?,
    )
    .await?;

println!("{:?}", res.state());
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                           .WithCollectionName("customized_setup_2")
                                           .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::GetLoadStateResponse response;
status = client->GetLoadState(milvus::GetLoadStateRequest()
                                  .WithCollectionName("customized_setup_2"),
                              response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << std::to_string(response.State()) << std::endl;
```

```javascript
// 3.6 Create a collection and index it separately
let res = await client.createCollection({
    collection_name: "customized_setup_2",
    fields: fields,
    enable_dynamic_field: true,
})

console.log(res.error_code)

// Output
//
// Success
//

res = await client.getLoadState({
    collection_name: "customized_setup_2"
})

console.log(res.state)

// Output
//
// LoadStateNotLoad
//
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "customized_setup_2",
    Schema = schema
});

var res = await client.GetLoadStateAsync(new GetLoadStateReq
{
    CollectionName = "customized_setup_2"
});
Console.WriteLine(res.State);
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"customized_setup_2\",
    \"schema\": $schema
}"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/get_load_state" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "customized_setup_2"
}'

# {
#     "code": 0,
#     "data": {
#         "loadProgress": 0,
#         "loadState": "LoadStateNotLoad",
#         "message": ""
#     }
# }
```

## Set Collection Properties

You can set properties for the collection to create to make it fit into your service. The applicable properties are as follows.

### Set Shard Number

Shards are horizontal slices of a collection, and each shard corresponds to a data input channel. By default, every collection has one shard. You can specify the number of shards when creating a collection to better suit your data volume and workload.

As a general guideline, consider the following when setting the number of shards:
- **Data size:** A common practice is to have one shard for every 200 million entities. You can also estimate based on the total data size, for example, adding one shard for every 100 GB of data you plan to insert.
- **Stream node utilization:** If your Milvus instance has multiple stream nodes, using multiple shards is recommended. This ensures that the data insertion workload is distributed across all available stream nodes, preventing some from being idle while others are overloaded.

The following code snippet demonstrates how to set the shard number when you create a collection.

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
# With shard number
client.create_collection(
    collection_name="customized_setup_3",
    schema=schema,
    # highlight-next-line
    num_shards=1
)
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// With shard number
CreateCollectionReq customizedSetupReq3 = CreateCollectionReq.builder()
    .collectionName("customized_setup_3")
    .collectionSchema(schema)
    // highlight-next-line
    .numShards(1)
    .build();
client.createCollection(customizedSetupReq3);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("customized_setup_3", schema).WithShardNum(1))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("collection created")
```

```rust
use milvus::v2::prelude::*;

// With shard number
client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("customized_setup_3")
            .schema(schema.clone())
            .num_shards(1)
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                          .WithCollectionName("customized_setup_3")
                                          .WithCollectionSchema(schema)
                                          .WithNumShards(1));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const createCollectionReq = {
    collection_name: "customized_setup_3",
    fields: fields,
    enable_dynamic_field: true,
    // highlight-next-line
    shards_num: 1
}

await client.createCollection(createCollectionReq);
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "customized_setup_3",
    Schema = schema,
    ShardsNum = 1
});
```

```bash
export params='{
    "shardsNum": 1
}'

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"customized_setup_3\",
    \"schema\": $schema,
    \"params\": $params
}"
```

### Enable mmap

Milvus enables mmap on all collections by default, allowing Milvus to map raw field data into memory instead of fully loading them. This reduces memory footprints and increases collection capacity. The following example turns mmap off for a single collection; for details on mmap, refer to [Use mmap](mmap.md).

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
# With mmap
client.create_collection(
    collection_name="customized_setup_4",
    schema=schema,
    # highlight-next-line
    enable_mmap=False
)
```

```java
import io.milvus.param.Constant;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// With MMap
CreateCollectionReq customizedSetupReq4 = CreateCollectionReq.builder()
        .collectionName("customized_setup_4")
        .collectionSchema(schema)
        // highlight-next-line
        .property(Constant.MMAP_ENABLED, "false")
        .build();
client.createCollection(customizedSetupReq4);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/common"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("customized_setup_4", schema).
    WithProperty(common.MmapEnabledKey, false))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("collection created")
```

```rust
use milvus::v2::prelude::*;

// With mmap
client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("customized_setup_4")
            .schema(schema.clone())
            .properties(std::collections::HashMap::from([(
                "mmap.enabled".to_string(),
                "false".to_string(),
            )]))
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                          .WithCollectionName("customized_setup_4")
                                          .WithCollectionSchema(schema)
                                          .AddProperty(milvus::MMAP_ENABLED, "false"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.createCollection({
    collection_name: "customized_setup_4",
    fields: fields,
    enable_dynamic_field: true,
    // highlight-next-line
    properties: {
        'mmap.enabled': false,
    },
})
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "customized_setup_4",
    Schema = schema,
    Properties =
    {
        ["mmap.enabled"] = "false"
    }
});
```

```bash
export params='{
    "mmap.enabled": false
}'

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"customized_setup_4\",
    \"schema\": $schema,
    \"params\": $params
}"
```

### Set Collection TTL

If the data in a collection needs to be dropped for a specific period, consider setting its Time-To-Live (TTL) in seconds. Once the TTL times out, Milvus deletes entities in the collection. The deletion is asynchronous, indicating that searches and queries are still possible before the deletion is complete.

The following code snippet sets the TTL to one day (86400 seconds). You are advised to set the TTL to a couple of days at minimum.

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
# With TTL
client.create_collection(
    collection_name="customized_setup_5",
    schema=schema,
    # highlight-start
    properties={
        "collection.ttl.seconds": 86400
    }
    # highlight-end
)
```

```java
import io.milvus.param.Constant;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// With TTL
CreateCollectionReq customizedSetupReq5 = CreateCollectionReq.builder()
        .collectionName("customized_setup_5")
        .collectionSchema(schema)
        // highlight-next-line
        .property(Constant.TTL_SECONDS, "86400")
        .build();
client.createCollection(customizedSetupReq5);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/common"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("customized_setup_5", schema).
    WithProperty(common.CollectionTTLConfigKey, 86400))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("collection created")
```

```rust
use milvus::v2::prelude::*;

// With TTL
client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("customized_setup_5")
            .schema(schema.clone())
            .properties(std::collections::HashMap::from([(
                "collection.ttl.seconds".to_string(),
                "86400".to_string(),
            )]))
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                          .WithCollectionName("customized_setup_5")
                                          .WithCollectionSchema(schema)
                                          .AddProperty(milvus::COLLECTION_TTL_SECONDS, "86400"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const createCollectionReq = {
    collection_name: "customized_setup_5",
    fields: fields,
    enable_dynamic_field: true,
    // highlight-start
    properties: {
        "collection.ttl.seconds": 86400
    }
    // highlight-end
}

await client.createCollection(createCollectionReq);
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "customized_setup_5",
    Schema = schema,
    Properties =
    {
        ["collection.ttl.seconds"] = "86400"
    }
});
```

```bash
export params='{
    "ttlSeconds": 86400
}'

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"customized_setup_5\",
    \"schema\": $schema,
    \"params\": $params
}"
```

### Set Consistency Level

When creating a collection, you can set the consistency level for searches and queries in the collection. You can also change the consistency level of the collection during a specific search or query.

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
# With consistency level
client.create_collection(
    collection_name="customized_setup_6",
    schema=schema,
    # highlight-next-line
    consistency_level="Bounded",
)
```

```java
import io.milvus.v2.common.ConsistencyLevel;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// With consistency level
CreateCollectionReq customizedSetupReq6 = CreateCollectionReq.builder()
        .collectionName("customized_setup_6")
        .collectionSchema(schema)
        // highlight-next-line
        .consistencyLevel(ConsistencyLevel.BOUNDED)
        .build();
client.createCollection(customizedSetupReq6);
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("customized_setup_6", schema).
    WithConsistencyLevel(entity.ClBounded))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
fmt.Println("collection created")
```

```rust
use milvus::v2::prelude::*;

// With consistency level
client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("customized_setup_6")
            .schema(schema.clone())
            .consistency_level(ConsistencyLevel::Bounded)
            .build()?,
    )
    .await?;
```

```cpp
auto status = client->CreateCollection(milvus::CreateCollectionRequest()
                                          .WithCollectionName("customized_setup_6")
                                          .WithCollectionSchema(schema)
                                          .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
const createCollectionReq = {
    collection_name: "customized_setup_6",
    fields: fields,
    enable_dynamic_field: true,
    // highlight-next-line
    consistency_level: "Bounded",
}

await client.createCollection(createCollectionReq);
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "customized_setup_6",
    Schema = schema,
    ConsistencyLevel = ConsistencyLevel.BoundedStaleness
});
```

```bash
export params='{
    "consistencyLevel": "Bounded"
}'

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d "{
    \"collectionName\": \"customized_setup_6\",
    \"schema\": $schema,
    \"params\": $params
}"
```

For more on consistency levels, see [Consistency Level](tune_consistency.md).

### Enable Dynamic Field

The dynamic field in a collection is a reserved JavaScript Object Notation (JSON) field named **\$meta**. Once you have enabled this field, Milvus saves all non-schema-defined fields carried in each entity and their values as key-value pairs in the reserved field.

For details on how to use the dynamic field, refer to [Dynamic Field](enable-dynamic-field.md).
