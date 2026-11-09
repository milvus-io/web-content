---
id: alter-external-collection-schema.md
title: "Alter External Collection Schema"
summary: "Learn how to expose an additional field from an external data source in an existing external collection."
beta: Milvus 3.0.x
---

# Alter External Collection Schema

External data sources often evolve after you create an external collection. For example, a lakehouse table that already stores embeddings might later include a new scalar field, such as a score, category, or timestamp, that you want to return in query results or use in filters.

Instead of recreating the external collection or copying the source data into Milvus, add a Milvus field that maps to the existing field in the external data source. After adding the field, refresh the external collection so the new field can be used in queries and searches.

## Limits

- External collections currently support adding fields after creation. Other schema changes, such as dropping fields, renaming fields, changing field data types, changing vector dimensions, or remapping `external_field`, are not supported.
- You can only add a field that already exists in the external data source. This operation maps an existing external field to a Milvus field. It does not create a new field in the external data source or backfill source data.
- Adding `SPARSE_FLOAT_VECTOR` fields to an existing external collection is not supported.
- Adding StructArray fields to an existing external collection is not supported. If your external collection needs a StructArray field, define it in the collection schema when you create the collection.

## Add a field

Before adding a field to an external collection, verify that the field already exists in the external data source. Then call `add_collection_field()` to expose that field in Milvus by setting `external_field` to the field name in the external data source. Set `data_type` to the Milvus data type that matches the field in the external data source. For example, if the mapped field stores double-precision values, use `DataType.DOUBLE`.

Unlike managed collections, values for the added field are read from the external data source after you refresh the external collection.

### Add a scalar field

Use `add_collection_field()` to add a scalar field when you want to return the field in query results or use it in filters. The following example adds a `score` field that maps to the `score` field in the external data source.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">CSharp</a>
    <a href="#bash">cURL</a>
</div>
```python
from pymilvus import DataType, MilvusClient

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

client.add_collection_field(
    collection_name="product_embeddings",
    field_name="score",
    data_type=DataType.DOUBLE,
    nullable=True,
    # highlight-next-line
    external_field="score",
)
```

```java
// Note: milvus-sdk-java does not support adding a field to an
// external collection as of v3.0.10 (addCollectionField() routes through
// AlterCollectionSchema, which rejects external collections).
```

```go
// Note: The Go SDK does not support adding a field to an external
// collection as of client/v3.0.0 (AddCollectionField() routes through
// AlterCollectionSchema, which rejects external collections).
```

```rust
use milvus::v2 as sdk;
use milvus::v2::error::Result;
use milvus::v2::prelude::*;

let client = ClientV2::new(
    &ConnectConfig::new()
        .uri("http://localhost:19530")
        .token("root:Milvus"),
).await?;

client.add_collection_field(
    sdk::request::collection::AddCollectionFieldRequest::builder()
        .collection_name("product_embeddings")
        .field(
            sdk::FieldSchema::new()
                .name("score")
                .data_type(sdk::DataType::Double)
                .nullable(true)
                .external_field("score"),
        )
        .build()?,
).await?;
```

```cpp
// Note: milvus-sdk-cpp does not support adding a field to an external
// collection as of v3.0.3 (AddCollectionField() routes through
// AlterCollectionSchema, which rejects external collections).
```

```javascript
const { MilvusClient, DataType } = require("@zilliz/milvus2-sdk-node");

const address = "http://localhost:19530";
const token = "root:Milvus";
const client = new MilvusClient({address, token});

await client.addCollectionField({
   collection_name: 'product_embeddings',
   field: {
     name: 'score',
     data_type: DataType.Double,
     nullable: true,
     external_field: 'score',
   },
 });
```

```csharp
// Note: milvus-sdk-csharp does not support adding a field to an external
// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the
// external_field mapping).
```

```bash
# Note: The RESTful API does not support adding a field to an external
# collection (POST /v2/vectordb/collections/fields/add routes through
# AlterCollectionSchema, which rejects external collections).
```

In this example, `score` is the Milvus field name and `external_field="score"` maps it to the `score` field in the external data source. Set `nullable=True` because the field is added after the collection has already been created.

### Add a vector field

You can also add a vector field if the external data source already contains the vector values. Set the vector `data_type` and `dim` to match the vector field in the external data source.

The following example adds a dense vector field named `image_embedding_v2`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">CSharp</a>
    <a href="#bash">cURL</a>
</div>
```python
client.add_collection_field(
    collection_name="product_embeddings",
    field_name="image_embedding_v2",
    data_type=DataType.FLOAT_VECTOR,
    dim=768,
    nullable=True,
    # highlight-next-line
    external_field="image_embedding_v2",
)
```

```java
// Note: milvus-sdk-java does not support adding a field to an
// external collection as of v3.0.10 (addCollectionField() routes through
// AlterCollectionSchema, which rejects external collections).
```

```go
// Note: The Go SDK does not support adding a field to an external
// collection as of client/v3.0.0 (AddCollectionField() routes through
// AlterCollectionSchema, which rejects external collections).
```

```rust
client.add_collection_field(
    sdk::request::collection::AddCollectionFieldRequest::builder()
        .collection_name("product_embeddings")
        .field(
            sdk::FieldSchema::new()
                .name("image_embedding_v2")
                .data_type(sdk::DataType::FloatVector)
                .dimension(768)
                .nullable(true)
                .external_field("image_embedding_v2"),
        )
        .build()?,
).await?;
```

```cpp
// Note: milvus-sdk-cpp does not support adding a field to an external
// collection as of v3.0.3 (AddCollectionField() routes through
// AlterCollectionSchema, which rejects external collections).
```

```javascript
await client.addCollectionField({
   collection_name: 'product_embeddings',
   field: {
     name: 'image_embedding_v2',
     data_type: DataType.FloatVector,
     dim: 768,
     nullable: true,
     external_field: 'image_embedding_v2',
   },
 });
```

```csharp
// Note: milvus-sdk-csharp does not support adding a field to an external
// collection as of v3.0.0 (AddCollectionFieldAsync cannot set the
// external_field mapping).
```

```bash
# Note: The RESTful API does not support adding a field to an external
# collection (POST /v2/vectordb/collections/fields/add routes through
# AlterCollectionSchema, which rejects external collections).
```

If you plan to run vector search on the added vector field, create an index for the field before refreshing the external collection.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">CSharp</a>
    <a href="#bash">cURL</a>
</div>
```python
index_params = client.prepare_index_params()

index_params.add_index(
    field_name="image_embedding_v2",
    index_type="AUTOINDEX",
    metric_type="COSINE",
)

client.create_index(
    collection_name="product_embeddings",
    index_params=index_params,
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.index.request.CreateIndexReq;
import java.util.Collections;
import io.milvus.v2.service.utility.request.RefreshExternalCollectionReq;
import io.milvus.v2.service.utility.response.RefreshExternalCollectionResp;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

IndexParam indexParam = IndexParam.builder()
        .fieldName("image_embedding_v2")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();
client.createIndex(CreateIndexReq.builder()
        .collectionName("product_embeddings")
        .indexParams(Collections.singletonList(indexParam))
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()
client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

_, err = client.CreateIndex(ctx, milvusclient.NewCreateIndexOption(
    "product_embeddings", "image_embedding_v2",
    index.NewAutoIndex(index.MetricType(entity.COSINE))))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
client.create_index(
    sdk::request::index::CreateIndexRequest::builder()
        .collection_name("product_embeddings")
        .index_param(
            sdk::IndexParam::new()
                .field_name("image_embedding_v2")
                .index_type(sdk::IndexType::AutoIndex)
                .metric_type(sdk::MetricType::Cosine),
        )
        .build()?,
).await?;
```

```cpp
#include 
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    std::cout CreateIndex(milvus::CreateIndexRequest()
                                 .WithCollectionName("product_embeddings")
                                 .AddIndex(std::move(index_desc)));
if (!status.IsOk()) {
    std::cout RefreshExternalCollection(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
await client.refreshExternalCollection({
   collection_name: 'product_embeddings',
 });
```

```csharp
RefreshExternalCollectionResp resp = await client.RefreshExternalCollectionAsync(
    new RefreshExternalCollectionReq
    {
        CollectionName = "product_embeddings"
    });
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/jobs/external_collection/refresh" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "product_embeddings"
}' 
```