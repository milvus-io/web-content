---
id: create-structarray-field.md
title: "Create a StructArray Field"
summary: "Create a StructArray field when one entity needs to contain an ordered list of structured elements. A StructArray field is an Array field whose element type is Struct. Each Struct element follows the same schema and can contain scalar subfields, vector subfields, and, starting in Milvus 3.0.6, scalar array subfields."
---
# Create a StructArray Field

Create a StructArray field when one entity needs to contain an ordered list of structured elements. A StructArray field is an Array field whose element type is Struct. Each Struct element follows the same schema and can contain scalar subfields, vector subfields, and, starting in Milvus 3.0.6, scalar array subfields.


This page shows how to define a Struct schema, add it as a StructArray field, choose subfields for later search and filtering, and understand the schema rules that apply before you insert or index data.

## Before you begin


Milvus 3.0.0 and later support nullable StructArray fields and adding StructArray fields to existing collections in Standalone and Distributed deployments. Earlier versions do not support these capabilities.


The creation, nullable creation, element-null creation, and field-addition examples are alternative workflows. Do not run them sequentially against the same collection. Reuse the client initialization for your selected language in the later examples.

This page uses a collection named `tech_articles`. Each entity represents one technical article, and the `chunks` field stores chunk-level data as Struct elements.

| Field | Type | Purpose |
| --- | --- | --- |
| `doc_id` | `INT64` | Primary key for the article. |
| `title` | `VARCHAR` | Article title. |
| `category` | `VARCHAR` | Article-level category. |
| `title_vector` | `FLOAT_VECTOR` | Article-level vector field, used later in hybrid search examples. |
| `chunks` | `ARRAY` | StructArray field that stores chunk-level text, metadata, and embeddings. |

The `chunks` StructArray field contains the following subfields.

| Subfield | Type | Purpose |
| --- | --- | --- |
| `text` | `VARCHAR` | Chunk text. |
| `section` | `VARCHAR` | Section name, such as `index`, `search`, or `filter`. |
| `page` | `INT64` | Page number or logical position of the chunk. |
| `quality_score` | `FLOAT` | Chunk-level score used in scalar filtering and range examples. |
| `has_code` | `BOOL` | Whether the chunk contains code. |
| `emb_list_vector` | `FLOAT_VECTOR` | Vector subfield for EmbeddingList search with `MAX_SIM*` metrics. |
| `emb` | `FLOAT_VECTOR` | Vector subfield for element-level search with regular vector metrics. |

<div class="alert note">

A vector field or vector subfield accepts only one index. If you need both EmbeddingList search and element-level search, define two separate vector subfields. In this example, `chunks[emb_list_vector]` is for EmbeddingList search, and `chunks[emb]` is for element-level search.

</div>

## Supported subfield data types


A StructArray field stores one array value for each Struct subfield. When you define a Struct schema, choose subfield types from the supported scalar, scalar array (Milvus 3.0.6 and later), and vector families.



| Struct subfield physical type | Support | Notes |
| --- | --- | --- |
| `Array` | Supported | Define the subfield as `DataType.BOOL`. |
| `Array` | Supported | Define the subfield as `DataType.INT8`, `DataType.INT16`, `DataType.INT32`, or `DataType.INT64`. |
| `Array` | Supported | Define the subfield as `DataType.FLOAT` or `DataType.DOUBLE`. |
| `Array` | Supported | Define the subfield as `DataType.VARCHAR` and set `max_length`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.FLOAT_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.FLOAT16_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.BFLOAT16_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.INT8_VECTOR` and set `dim`. |
| `ArrayOfVector` | Supported | Define the subfield as `DataType.BINARY_VECTOR` and set `dim`. |
| `ArrayOfVector` | Not supported | Sparse vector subfields are not supported in StructArray fields. |
| `Array` | Not supported | Use `VARCHAR`, not `String`. |
| `Array` | Not supported | JSON subfields are not supported in StructArray fields. |
| `Array` | Not supported | Geometry subfields and GIS functions are not supported in StructArray fields. |
| `Array` | Not supported | Text subfields are not supported in StructArray fields. |
| `Array` | Not supported | Timestamptz subfields and time-specific expressions are not supported in StructArray fields. |
| `Array` of `Array` | Supported in Milvus 3.0.6 and later | Define the subfield as `DataType.ARRAY` with a scalar `element_type` and a `max_capacity` for the inner array. Each Struct element then holds one inner array. |
| `Array` of `Array` of `Array`, `Array` of vectors, `Struct`, or `ArrayOfStruct` | Not supported | Array nesting inside a Struct is limited to one level, the inner array cannot hold vectors, and a Struct cannot contain nested Struct or Array-of-Struct subfields. |


For version-specific support, nullable behavior, and other limits, see [StructArray Limits](structarray-limits.md).

## Create a collection with a StructArray field

To create a StructArray field, first define the Struct schema used by each element. Then add an Array field and set its element type to Struct.

1. Create the collection schema.

2. Add collection-level fields, such as the primary key and article-level fields.

3. Create a Struct schema for elements stored inside the StructArray field.

4. Add scalar and vector subfields to the Struct schema.

5. Add an Array field with `element_type=DataType.STRUCT`.

6. Set `struct_schema` to the Struct schema.

7. Set `max_capacity` to limit how many Struct elements each entity can store in the field.

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

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

schema = client.create_schema(
    auto_id=False,
    enable_dynamic_field=False,
)

# Collection-level fields.
schema.add_field(
    field_name="doc_id",
    datatype=DataType.INT64,
    is_primary=True,
)
schema.add_field(
    field_name="title",
    datatype=DataType.VARCHAR,
    max_length=512,
)
schema.add_field(
    field_name="category",
    datatype=DataType.VARCHAR,
    max_length=128,
)
schema.add_field(
    field_name="title_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Struct schema used by each element in the StructArray field.
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=65535,
)
chunk_schema.add_field(
    field_name="section",
    datatype=DataType.VARCHAR,
    max_length=128,
)
chunk_schema.add_field(
    field_name="page",
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name="quality_score",
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name="has_code",
    datatype=DataType.BOOL,
)

# Vector subfield for EmbeddingList search.
chunk_schema.add_field(
    field_name="emb_list_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Vector subfield for element-level search.
chunk_schema.add_field(
    field_name="emb",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Add the StructArray field.
schema.add_field(
    field_name="chunks",
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=1000,
)

client.create_collection(
    collection_name="tech_articles",
    schema=schema,
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(false);

// Collection-level fields.
schema.addField(AddFieldReq.builder()
        .fieldName("doc_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("title")
        .dataType(DataType.VarChar)
        .maxLength(512)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("category")
        .dataType(DataType.VarChar)
        .maxLength(128)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("title_vector")
        .dataType(DataType.FloatVector)
        .dimension(4)
        .build());

// Add the StructArray field.
schema.addField(AddFieldReq.builder()
        .fieldName("chunks")
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(1000)
        .addStructField(AddFieldReq.builder()
                .fieldName("text")
                .dataType(DataType.VarChar)
                .maxLength(65535)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("section")
                .dataType(DataType.VarChar)
                .maxLength(128)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("page")
                .dataType(DataType.Int64)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("quality_score")
                .dataType(DataType.Float)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("has_code")
                .dataType(DataType.Bool)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("emb_list_vector")
                .dataType(DataType.FloatVector)
                .dimension(4)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("emb")
                .dataType(DataType.FloatVector)
                .dimension(4)
                .build())
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName("tech_articles")
        .collectionSchema(schema)
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err)
    return
}

schema := entity.NewSchema().WithDynamicFieldEnabled(false)

// Collection-level fields.
schema.WithField(entity.NewField().
        WithName("doc_id").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true))
schema.WithField(entity.NewField().
        WithName("title").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(512))
schema.WithField(entity.NewField().
        WithName("category").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(128))
schema.WithField(entity.NewField().
        WithName("title_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))

// Struct schema used by each element in the StructArray field.
chunkSchema := entity.NewStructSchema()
chunkSchema.WithField(entity.NewField().
        WithName("text").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(65535))
chunkSchema.WithField(entity.NewField().
        WithName("section").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(128))
chunkSchema.WithField(entity.NewField().
        WithName("page").
        WithDataType(entity.FieldTypeInt64))
chunkSchema.WithField(entity.NewField().
        WithName("quality_score").
        WithDataType(entity.FieldTypeFloat))
chunkSchema.WithField(entity.NewField().
        WithName("has_code").
        WithDataType(entity.FieldTypeBool))
chunkSchema.WithField(entity.NewField().
        WithName("emb_list_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))
chunkSchema.WithField(entity.NewField().
        WithName("emb").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))

// Add the StructArray field.
schema.WithField(entity.NewField().
        WithName("chunks").
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(1000).
        WithStructSchema(chunkSchema))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("tech_articles", schema))
if err != nil {
    fmt.Println(err)
    return
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

// Collection-level fields.
let schema = CollectionSchema::new()
    .enable_dynamic_field(false)
    .add_field(
        FieldSchema::new()
            .name("doc_id")
            .data_type(DataType::Int64)
            .primary_key(true),
    )
    .add_field(
        FieldSchema::new()
            .name("title")
            .data_type(DataType::VarChar)
            .max_length(512),
    )
    .add_field(
        FieldSchema::new()
            .name("category")
            .data_type(DataType::VarChar)
            .max_length(128),
    )
    .add_field(
        FieldSchema::new()
            .name("title_vector")
            .data_type(DataType::FloatVector)
            .dimension(4),
    )
    // Struct schema used by each element in the StructArray field.
    .add_struct_field(
        StructFieldSchema::new()
            .name("chunks")
            .max_capacity(1000)
            .add_field(
                FieldSchema::new()
                    .name("text")
                    .data_type(DataType::VarChar)
                    .max_length(65535),
            )
            .add_field(
                FieldSchema::new()
                    .name("section")
                    .data_type(DataType::VarChar)
                    .max_length(128),
            )
            .add_field(
                FieldSchema::new()
                    .name("page")
                    .data_type(DataType::Int64),
            )
            .add_field(
                FieldSchema::new()
                    .name("quality_score")
                    .data_type(DataType::Float),
            )
            .add_field(
                FieldSchema::new()
                    .name("has_code")
                    .data_type(DataType::Bool),
            )
            .add_field(
                FieldSchema::new()
                    .name("emb_list_vector")
                    .data_type(DataType::FloatVector)
                    .dimension(4),
            )
            .add_field(
                FieldSchema::new()
                    .name("emb")
                    .data_type(DataType::FloatVector)
                    .dimension(4),
            ),
    );

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("tech_articles")
            .schema(schema)
            .build()?,
    )
    .await?;
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

milvus::CollectionSchemaPtr collection_schema = std::make_shared<milvus::CollectionSchema>();
collection_schema->SetEnableDynamicField(false);

// Collection-level fields.
collection_schema->AddField(milvus::FieldSchema("doc_id", milvus::DataType::INT64, "", true, false));
collection_schema->AddField(milvus::FieldSchema("title", milvus::DataType::VARCHAR).WithMaxLength(512));
collection_schema->AddField(milvus::FieldSchema("category", milvus::DataType::VARCHAR).WithMaxLength(128));
collection_schema->AddField(milvus::FieldSchema("title_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(4));

// Struct schema used by each element in the StructArray field.
milvus::StructFieldSchema struct_schema =
    milvus::StructFieldSchema()
        .WithName("chunks")
        .WithMaxCapacity(1000)
        .AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR).WithMaxLength(65535))
        .AddField(milvus::FieldSchema("section", milvus::DataType::VARCHAR).WithMaxLength(128))
        .AddField(milvus::FieldSchema("page", milvus::DataType::INT64))
        .AddField(milvus::FieldSchema("quality_score", milvus::DataType::FLOAT))
        .AddField(milvus::FieldSchema("has_code", milvus::DataType::BOOL))
        .AddField(milvus::FieldSchema("emb_list_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(4))
        .AddField(milvus::FieldSchema("emb", milvus::DataType::FLOAT_VECTOR).WithDimension(4));
collection_schema->AddStructField(std::move(struct_schema));

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                     .WithCollectionName("tech_articles")
                                     .WithCollectionSchema(collection_schema));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
  token: "root:Milvus",
});

await client.createCollection({
  collection_name: "tech_articles",
  enable_dynamic_field: false,
  fields: [
    // Collection-level fields.
    { name: "doc_id", data_type: DataType.Int64, is_primary_key: true },
    { name: "title", data_type: DataType.VarChar, max_length: 512 },
    { name: "category", data_type: DataType.VarChar, max_length: 128 },
    { name: "title_vector", data_type: DataType.FloatVector, dim: 4 },
    // StructArray field.
    {
      name: "chunks",
      data_type: DataType.Array,
      element_type: DataType.Struct,
      max_capacity: 1000,
      fields: [
        { name: "text", data_type: DataType.VarChar, max_length: 65535 },
        { name: "section", data_type: DataType.VarChar, max_length: 128 },
        { name: "page", data_type: DataType.Int64 },
        { name: "quality_score", data_type: DataType.Float },
        { name: "has_code", data_type: DataType.Bool },
        { name: "emb_list_vector", data_type: DataType.FloatVector, dim: 4 },
        { name: "emb", data_type: DataType.FloatVector, dim: 4 },
      ],
    },
  ],
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});

CollectionSchema schema = new()
{
    EnableDynamicFields = false,
    Fields =
    {
        // Collection-level fields.
        new FieldSchema("doc_id", DataType.Int64, isPrimaryKey: true),
        FieldSchema.CreateVarchar("title", 512),
        FieldSchema.CreateVarchar("category", 128),
        new FieldSchema("title_vector", DataType.FloatVector) { Dimension = 4 }
    }
};

// StructArray field.
var chunks = new StructFieldSchema("chunks")
{
    MaxCapacity = 1000
};
chunks.Fields.Add(FieldSchema.CreateVarchar("text", 65535));
chunks.Fields.Add(FieldSchema.CreateVarchar("section", 128));
chunks.Fields.Add(new FieldSchema("page", DataType.Int64));
chunks.Fields.Add(new FieldSchema("quality_score", DataType.Float));
chunks.Fields.Add(new FieldSchema("has_code", DataType.Bool));
chunks.Fields.Add(new FieldSchema("emb_list_vector", DataType.FloatVector) { Dimension = 4 });
chunks.Fields.Add(new FieldSchema("emb", DataType.FloatVector) { Dimension = 4 });
schema.StructFields.Add(chunks);

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "tech_articles",
    Schema = schema
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/create" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "schema": {
      "autoID": false,
      "enableDynamicField": false,
      "fields": [
        {"fieldName": "doc_id", "dataType": "Int64", "isPrimary": true},
        {"fieldName": "title", "dataType": "VarChar", "elementTypeParams": {"max_length": "512"}},
        {"fieldName": "category", "dataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
        {"fieldName": "title_vector", "dataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
      ],
      "structFields": [
        {
          "fieldName": "chunks",
          "typeParams": {"max_capacity": "1000"},
          "fields": [
            {"fieldName": "text", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "65535"}},
            {"fieldName": "section", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
            {"fieldName": "page", "dataType": "Array", "elementDataType": "Int64"},
            {"fieldName": "quality_score", "dataType": "Array", "elementDataType": "Float"},
            {"fieldName": "has_code", "dataType": "Array", "elementDataType": "Bool"},
            {"fieldName": "emb_list_vector", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}},
            {"fieldName": "emb", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
          ]
        }
      ]
    }
  }'
```

## Add a scalar array subfield | Milvus 3.0.6

Starting in Milvus 3.0.6, a Struct subfield can be a scalar `ARRAY`. Each Struct element then holds one inner array, such as a list of tags for each chunk. Define the subfield with `DataType.ARRAY`, a scalar `element_type`, and a `max_capacity` for the inner array.


```python
chunk_schema.add_field(
    field_name="tags",
    datatype=DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=16,
    max_length=64,
)
```

Array subfields follow these rules:

- The inner array holds scalar values only. It cannot hold vectors, Struct elements, or another array.

- The `max_capacity` of the subfield limits the inner array. The `max_capacity` of the StructArray field still limits the number of Struct elements.

- Scalar indexes are not supported on array subfields.

- In filters, use `array_contains`, `array_contains_any`, `array_contains_all`, and `array_length` on `$[tags]` inside `element_filter` or `MATCH_*`, or on a positional path such as `chunks[0][tags]`. For details, see [StructArray Operators](struct-array-operators.md).


## Allow null values in Struct elements | Milvus 3.0.6

Starting in Milvus 3.0.6, a scalar, vector, or array subfield can allow a null value for that subfield in individual Struct elements (an **element-nullable subfield**). Set `nullable=True` on a scalar or vector subfield. On an array subfield, set `nullable=True` to allow a null inner array and `element_nullable=True` to allow null values inside the inner array. For example, a chunk can have no detected language while its other subfields hold values.


The following example creates `tech_articles` with the complete schema that the element-level-null examples in [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md) assume: the subfields from the first example, plus an element-nullable `lang` subfield and an element-nullable `tags` array subfield.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
```python
from pymilvus import MilvusClient, DataType

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

schema = client.create_schema(
    auto_id=False,
    enable_dynamic_field=False,
)

# Collection-level fields.
schema.add_field(
    field_name="doc_id",
    datatype=DataType.INT64,
    is_primary=True,
)
schema.add_field(
    field_name="title",
    datatype=DataType.VARCHAR,
    max_length=512,
)
schema.add_field(
    field_name="category",
    datatype=DataType.VARCHAR,
    max_length=128,
)
schema.add_field(
    field_name="title_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Struct schema used by each element in the StructArray field.
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=65535,
)
chunk_schema.add_field(
    field_name="section",
    datatype=DataType.VARCHAR,
    max_length=128,
)
chunk_schema.add_field(
    field_name="page",
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name="quality_score",
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name="has_code",
    datatype=DataType.BOOL,
)

# Vector subfield for EmbeddingList search.
chunk_schema.add_field(
    field_name="emb_list_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Vector subfield for element-level search.
chunk_schema.add_field(
    field_name="emb",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# An element-nullable scalar subfield.
chunk_schema.add_field(
    field_name="lang",
    datatype=DataType.VARCHAR,
    max_length=16,
    nullable=True,
)

# An element-nullable array subfield: nullable=True allows a null inner
# array and element_nullable=True allows null values inside the inner array.
chunk_schema.add_field(
    field_name="tags",
    datatype=DataType.ARRAY,
    element_type=DataType.VARCHAR,
    max_capacity=16,
    max_length=64,
    nullable=True,
    element_nullable=True,
)

# Add the StructArray field. nullable=True applies to the whole field.
schema.add_field(
    field_name="chunks",
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    max_capacity=1000,
    nullable=True,
)

client.create_collection(
    collection_name="tech_articles",
    schema=schema,
)
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err)
    return
}

schema := entity.NewSchema().WithDynamicFieldEnabled(false)

// Collection-level fields.
schema.WithField(entity.NewField().
        WithName("doc_id").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true))
schema.WithField(entity.NewField().
        WithName("title").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(512))
schema.WithField(entity.NewField().
        WithName("category").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(128))
schema.WithField(entity.NewField().
        WithName("title_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))

// Struct schema used by each element in the StructArray field.
chunkSchema := entity.NewStructSchema()
chunkSchema.WithField(entity.NewField().
        WithName("text").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(65535))
chunkSchema.WithField(entity.NewField().
        WithName("section").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(128))
chunkSchema.WithField(entity.NewField().
        WithName("page").
        WithDataType(entity.FieldTypeInt64))
chunkSchema.WithField(entity.NewField().
        WithName("quality_score").
        WithDataType(entity.FieldTypeFloat))
chunkSchema.WithField(entity.NewField().
        WithName("has_code").
        WithDataType(entity.FieldTypeBool))
chunkSchema.WithField(entity.NewField().
        WithName("emb_list_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))
chunkSchema.WithField(entity.NewField().
        WithName("emb").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))

// An element-nullable scalar subfield.
chunkSchema.WithField(entity.NewField().
        WithName("lang").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(16).
        WithNullable(true))

// An element-nullable array subfield: WithNullable(true) allows a null
// inner array and WithElementNullable(true) allows null values inside it.
chunkSchema.WithField(entity.NewField().
        WithName("tags").
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeVarChar).
        WithMaxCapacity(16).
        WithMaxLength(64).
        WithNullable(true).
        WithElementNullable(true))

// Add the StructArray field. WithNullable(true) applies to the whole field.
schema.WithField(entity.NewField().
        WithName("chunks").
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(1000).
        WithNullable(true).
        WithStructSchema(chunkSchema))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("tech_articles", schema))
if err != nil {
    fmt.Println(err)
    return
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/create" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "schema": {
      "autoID": false,
      "enableDynamicField": false,
      "fields": [
        {"fieldName": "doc_id", "dataType": "Int64", "isPrimary": true},
        {"fieldName": "title", "dataType": "VarChar", "elementTypeParams": {"max_length": "512"}},
        {"fieldName": "category", "dataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
        {"fieldName": "title_vector", "dataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
      ],
      "structFields": [
        {
          "fieldName": "chunks",
          "nullable": true,
          "typeParams": {"max_capacity": "1000"},
          "fields": [
            {"fieldName": "text", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "65535"}},
            {"fieldName": "section", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
            {"fieldName": "page", "dataType": "Array", "elementDataType": "Int64"},
            {"fieldName": "quality_score", "dataType": "Array", "elementDataType": "Float"},
            {"fieldName": "has_code", "dataType": "Array", "elementDataType": "Bool"},
            {"fieldName": "lang", "dataType": "Array", "elementDataType": "VarChar", "elementNullable": true, "elementTypeParams": {"max_length": "16"}},
            {"fieldName": "tags", "dataType": "Array", "elementDataType": "Array", "elementNullable": true, "typeSchema": {"arrayElement": {"typeParams": {"max_capacity": "16"}, "arrayElement": {"leafType": "VarChar", "nullable": true, "typeParams": {"max_length": "64"}}}}},
            {"fieldName": "emb_list_vector", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}},
            {"fieldName": "emb", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
          ]
        }
      ]
    }
  }'
```

Element-level null follows these rules:

- Row-level `nullable` applies to the whole StructArray field and is set on the parent field only. Element-level null is set on the subfield itself: `nullable=True` on a scalar or vector subfield, `element_nullable=True` on an array subfield.

- A Struct element itself cannot be null. Set the subfield values of the element to null instead.

- When you insert data, you can omit an element-nullable subfield from a Struct element or set it to `None`. Both store a null value. A subfield that is not element-nullable must be present in every Struct element.

- On an array subfield, `nullable=True` allows a null inner array for a Struct element and `element_nullable=True` allows null values inside the inner array. An empty inner array is not null.

- An element-nullable vector subfield (`nullable=True`) supports element-level search only. `MAX_SIM*` metrics and EmbeddingList search are rejected on it, and null vectors do not participate in search.

- Scalar indexes are not supported on element-nullable subfields.

- In filters, a null subfield value makes the element predicate unknown rather than false. Use `$[lang] is null` or `$[lang] is not null` inside `element_filter` or `MATCH_*` to test it. For details, see [StructArray Operators](struct-array-operators.md).

## Understand StructArray field paths

After you create a StructArray field, refer to its subfields with the `structArray[subfield]` path syntax. Use this syntax when you create indexes, search vector subfields, output subfields, or build scalar filters.

| Path | Meaning | Common usage |
| --- | --- | --- |
| `chunks[text]` | The `text` subfield inside each Struct element. | Output field or scalar filtering. |
| `chunks[section]` | The section label for each chunk. | Scalar filtering. |
| `chunks[quality_score]` | The chunk-level quality score. | Scalar filtering or scalar index. |
| `chunks[emb_list_vector]` | The vector subfield used as an embedding list. | EmbeddingList search with `MAX_SIM*`. |
| `chunks[emb]` | The vector subfield used by each Struct element independently. | Element-level vector search. |

## Make a StructArray field nullable

A nullable StructArray field allows an entity to store NULL for the entire field, subject to the availability stated above. The following is a complete alternative to the previous collection-creation example. Run it only when `tech_articles` does not exist; it sets `nullable` on the StructArray parent before creating the collection.

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

client = MilvusClient(
    uri="http://localhost:19530",
    token="root:Milvus",
)

schema = client.create_schema(
    auto_id=False,
    enable_dynamic_field=False,
)

# Collection-level fields.
schema.add_field(
    field_name="doc_id",
    datatype=DataType.INT64,
    is_primary=True,
)
schema.add_field(
    field_name="title",
    datatype=DataType.VARCHAR,
    max_length=512,
)
schema.add_field(
    field_name="category",
    datatype=DataType.VARCHAR,
    max_length=128,
)
schema.add_field(
    field_name="title_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Struct schema used by each element in the StructArray field.
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=65535,
)
chunk_schema.add_field(
    field_name="section",
    datatype=DataType.VARCHAR,
    max_length=128,
)
chunk_schema.add_field(
    field_name="page",
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name="quality_score",
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name="has_code",
    datatype=DataType.BOOL,
)

# Vector subfield for EmbeddingList search.
chunk_schema.add_field(
    field_name="emb_list_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Vector subfield for element-level search.
chunk_schema.add_field(
    field_name="emb",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

# Add the StructArray field.
schema.add_field(
    field_name="chunks",
    datatype=DataType.ARRAY,
    element_type=DataType.STRUCT,
    struct_schema=chunk_schema,
    nullable=True,
    max_capacity=1000,
)

client.create_collection(
    collection_name="tech_articles",
    schema=schema,
)
```

```java
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

ConnectConfig connectConfig = ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build();
MilvusClientV2 client = new MilvusClientV2(connectConfig);

CreateCollectionReq.CollectionSchema schema = client.createSchema();
schema.setEnableDynamicField(false);

// Collection-level fields.
schema.addField(AddFieldReq.builder()
        .fieldName("doc_id")
        .dataType(DataType.Int64)
        .isPrimaryKey(Boolean.TRUE)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("title")
        .dataType(DataType.VarChar)
        .maxLength(512)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("category")
        .dataType(DataType.VarChar)
        .maxLength(128)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("title_vector")
        .dataType(DataType.FloatVector)
        .dimension(4)
        .build());

// Add the StructArray field.
schema.addField(AddFieldReq.builder()
        .fieldName("chunks")
        .dataType(DataType.Array)
        .elementType(DataType.Struct)
        .maxCapacity(1000)
        .isNullable(Boolean.TRUE)
        .addStructField(AddFieldReq.builder()
                .fieldName("text")
                .dataType(DataType.VarChar)
                .maxLength(65535)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("section")
                .dataType(DataType.VarChar)
                .maxLength(128)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("page")
                .dataType(DataType.Int64)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("quality_score")
                .dataType(DataType.Float)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("has_code")
                .dataType(DataType.Bool)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("emb_list_vector")
                .dataType(DataType.FloatVector)
                .dimension(4)
                .build())
        .addStructField(AddFieldReq.builder()
                .fieldName("emb")
                .dataType(DataType.FloatVector)
                .dimension(4)
                .build())
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName("tech_articles")
        .collectionSchema(schema)
        .build());
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx := context.Background()

cli, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "http://localhost:19530",
    APIKey:  "root:Milvus",
})
if err != nil {
    fmt.Println(err)
    return
}

schema := entity.NewSchema().WithDynamicFieldEnabled(false)

// Collection-level fields.
schema.WithField(entity.NewField().
        WithName("doc_id").
        WithDataType(entity.FieldTypeInt64).
        WithIsPrimaryKey(true))
schema.WithField(entity.NewField().
        WithName("title").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(512))
schema.WithField(entity.NewField().
        WithName("category").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(128))
schema.WithField(entity.NewField().
        WithName("title_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))

// Struct schema used by each element in the StructArray field.
chunkSchema := entity.NewStructSchema()
chunkSchema.WithField(entity.NewField().
        WithName("text").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(65535))
chunkSchema.WithField(entity.NewField().
        WithName("section").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(128))
chunkSchema.WithField(entity.NewField().
        WithName("page").
        WithDataType(entity.FieldTypeInt64))
chunkSchema.WithField(entity.NewField().
        WithName("quality_score").
        WithDataType(entity.FieldTypeFloat))
chunkSchema.WithField(entity.NewField().
        WithName("has_code").
        WithDataType(entity.FieldTypeBool))
chunkSchema.WithField(entity.NewField().
        WithName("emb_list_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))
chunkSchema.WithField(entity.NewField().
        WithName("emb").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))

// Add the StructArray field.
schema.WithField(entity.NewField().
        WithName("chunks").
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(1000).
        WithNullable(true).
        WithStructSchema(chunkSchema))

err = cli.CreateCollection(ctx, milvusclient.NewCreateCollectionOption("tech_articles", schema))
if err != nil {
    fmt.Println(err)
    return
}
```

```rust
use milvus::v2::prelude::*;

let config = ConnectConfig::new().uri("http://localhost:19530").token("root:Milvus");
let client = ClientV2::new(&config).await?;

// Collection-level fields.
let schema = CollectionSchema::new()
    .enable_dynamic_field(false)
    .add_field(
        FieldSchema::new()
            .name("doc_id")
            .data_type(DataType::Int64)
            .primary_key(true),
    )
    .add_field(
        FieldSchema::new()
            .name("title")
            .data_type(DataType::VarChar)
            .max_length(512),
    )
    .add_field(
        FieldSchema::new()
            .name("category")
            .data_type(DataType::VarChar)
            .max_length(128),
    )
    .add_field(
        FieldSchema::new()
            .name("title_vector")
            .data_type(DataType::FloatVector)
            .dimension(4),
    )
    // Struct schema used by each element in the StructArray field.
    .add_struct_field(
        StructFieldSchema::new()
            .name("chunks")
            .max_capacity(1000)
            .nullable(true)
            .add_field(
                FieldSchema::new()
                    .name("text")
                    .data_type(DataType::VarChar)
                    .max_length(65535),
            )
            .add_field(
                FieldSchema::new()
                    .name("section")
                    .data_type(DataType::VarChar)
                    .max_length(128),
            )
            .add_field(
                FieldSchema::new()
                    .name("page")
                    .data_type(DataType::Int64),
            )
            .add_field(
                FieldSchema::new()
                    .name("quality_score")
                    .data_type(DataType::Float),
            )
            .add_field(
                FieldSchema::new()
                    .name("has_code")
                    .data_type(DataType::Bool),
            )
            .add_field(
                FieldSchema::new()
                    .name("emb_list_vector")
                    .data_type(DataType::FloatVector)
                    .dimension(4),
            )
            .add_field(
                FieldSchema::new()
                    .name("emb")
                    .data_type(DataType::FloatVector)
                    .dimension(4),
            ),
    );

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name("tech_articles")
            .schema(schema)
            .build()?,
    )
    .await?;
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
auto status = client->Connect(milvus::ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

milvus::CollectionSchemaPtr collection_schema = std::make_shared<milvus::CollectionSchema>();
collection_schema->SetEnableDynamicField(false);

// Collection-level fields.
collection_schema->AddField(milvus::FieldSchema("doc_id", milvus::DataType::INT64, "", true, false));
collection_schema->AddField(milvus::FieldSchema("title", milvus::DataType::VARCHAR).WithMaxLength(512));
collection_schema->AddField(milvus::FieldSchema("category", milvus::DataType::VARCHAR).WithMaxLength(128));
collection_schema->AddField(milvus::FieldSchema("title_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(4));

// Struct schema used by each element in the StructArray field.
milvus::StructFieldSchema struct_schema =
    milvus::StructFieldSchema()
        .WithName("chunks")
        .WithMaxCapacity(1000)
        .WithNullable(true)
        .AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR).WithMaxLength(65535))
        .AddField(milvus::FieldSchema("section", milvus::DataType::VARCHAR).WithMaxLength(128))
        .AddField(milvus::FieldSchema("page", milvus::DataType::INT64))
        .AddField(milvus::FieldSchema("quality_score", milvus::DataType::FLOAT))
        .AddField(milvus::FieldSchema("has_code", milvus::DataType::BOOL))
        .AddField(milvus::FieldSchema("emb_list_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(4))
        .AddField(milvus::FieldSchema("emb", milvus::DataType::FLOAT_VECTOR).WithDimension(4));
collection_schema->AddStructField(std::move(struct_schema));

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                     .WithCollectionName("tech_articles")
                                     .WithCollectionSchema(collection_schema));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({
  address: "http://localhost:19530",
  token: "root:Milvus",
});

await client.createCollection({
  collection_name: "tech_articles",
  enable_dynamic_field: false,
  fields: [
    // Collection-level fields.
    { name: "doc_id", data_type: DataType.Int64, is_primary_key: true },
    { name: "title", data_type: DataType.VarChar, max_length: 512 },
    { name: "category", data_type: DataType.VarChar, max_length: 128 },
    { name: "title_vector", data_type: DataType.FloatVector, dim: 4 },
    // StructArray field.
    {
      name: "chunks",
      data_type: DataType.Array,
      element_type: DataType.Struct,
      max_capacity: 1000,
      nullable: true,
      fields: [
        { name: "text", data_type: DataType.VarChar, max_length: 65535 },
        { name: "section", data_type: DataType.VarChar, max_length: 128 },
        { name: "page", data_type: DataType.Int64 },
        { name: "quality_score", data_type: DataType.Float },
        { name: "has_code", data_type: DataType.Bool },
        { name: "emb_list_vector", data_type: DataType.FloatVector, dim: 4 },
        { name: "emb", data_type: DataType.FloatVector, dim: 4 },
      ],
    },
  ],
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

MilvusClientV2 client = new(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});

CollectionSchema schema = new()
{
    EnableDynamicFields = false,
    Fields =
    {
        // Collection-level fields.
        new FieldSchema("doc_id", DataType.Int64, isPrimaryKey: true),
        FieldSchema.CreateVarchar("title", 512),
        FieldSchema.CreateVarchar("category", 128),
        new FieldSchema("title_vector", DataType.FloatVector) { Dimension = 4 }
    }
};

// StructArray field.
var chunks = new StructFieldSchema("chunks")
{
    MaxCapacity = 1000,
    Nullable = true
};
chunks.Fields.Add(FieldSchema.CreateVarchar("text", 65535));
chunks.Fields.Add(FieldSchema.CreateVarchar("section", 128));
chunks.Fields.Add(new FieldSchema("page", DataType.Int64));
chunks.Fields.Add(new FieldSchema("quality_score", DataType.Float));
chunks.Fields.Add(new FieldSchema("has_code", DataType.Bool));
chunks.Fields.Add(new FieldSchema("emb_list_vector", DataType.FloatVector) { Dimension = 4 });
chunks.Fields.Add(new FieldSchema("emb", DataType.FloatVector) { Dimension = 4 });
schema.StructFields.Add(chunks);

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = "tech_articles",
    Schema = schema
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/create" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "schema": {
      "autoID": false,
      "enableDynamicField": false,
      "fields": [
        {"fieldName": "doc_id", "dataType": "Int64", "isPrimary": true},
        {"fieldName": "title", "dataType": "VarChar", "elementTypeParams": {"max_length": "512"}},
        {"fieldName": "category", "dataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
        {"fieldName": "title_vector", "dataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
      ],
      "structFields": [
        {
          "fieldName": "chunks",
          "nullable": true,
          "typeParams": {"max_capacity": "1000"},
          "fields": [
            {"fieldName": "text", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "65535"}},
            {"fieldName": "section", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
            {"fieldName": "page", "dataType": "Array", "elementDataType": "Int64"},
            {"fieldName": "quality_score", "dataType": "Array", "elementDataType": "Float"},
            {"fieldName": "has_code", "dataType": "Array", "elementDataType": "Bool"},
            {"fieldName": "emb_list_vector", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}},
            {"fieldName": "emb", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
          ]
        }
      ]
    }
  }'
```


<div class="alert note">

NULL applies to the whole StructArray field. Do not configure individual Struct subfields as row-level nullable independently. When supplying a valid StructArray value, do not mix null subfield arrays with valid subfield arrays. A Struct element itself cannot be null. Starting in Milvus 3.0.6, element-nullable subfields can hold null values in individual Struct elements; see [Allow null values in Struct elements](#allow-null-values-in-struct-elements--milvus-306). For details, see [StructArray Limits](structarray-limits.md).

</div>


## Add a StructArray field to an existing collection

Subject to the availability stated above, you can add a StructArray field to an existing collection. The added StructArray field must be nullable, because entities that already exist in the collection do not have values for the new field.

For this alternative workflow, start with `tech_articles` containing the four collection-level fields from the first example but no `chunks` field. Reuse the initialized client for your selected language. Define the complete Struct schema, then add the field with its parent marked nullable. This schema operation is independent of the collection’s dynamic field setting (`enable_dynamic_field`); it does not enable arbitrary subfields inside a Struct.

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
chunk_schema = client.create_struct_field_schema()
chunk_schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=65535,
)
chunk_schema.add_field(
    field_name="section",
    datatype=DataType.VARCHAR,
    max_length=128,
)
chunk_schema.add_field(
    field_name="page",
    datatype=DataType.INT64,
)
chunk_schema.add_field(
    field_name="quality_score",
    datatype=DataType.FLOAT,
)
chunk_schema.add_field(
    field_name="has_code",
    datatype=DataType.BOOL,
)
chunk_schema.add_field(
    field_name="emb_list_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)
chunk_schema.add_field(
    field_name="emb",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

client.add_collection_struct_field(
    collection_name="tech_articles",
    field_name="chunks",
    struct_schema=chunk_schema,
    max_capacity=1000,
    nullable=True,
)
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
import io.milvus.v2.service.collection.request.AddFieldReq;

client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName("tech_articles")
        .fieldName("chunks")
        .maxCapacity(1000)
        .nullable(Boolean.TRUE)
        .addStructField(AddFieldReq.builder().fieldName("text").dataType(DataType.VarChar).maxLength(65535).build())
        .addStructField(AddFieldReq.builder().fieldName("section").dataType(DataType.VarChar).maxLength(128).build())
        .addStructField(AddFieldReq.builder().fieldName("page").dataType(DataType.Int64).build())
        .addStructField(AddFieldReq.builder().fieldName("quality_score").dataType(DataType.Float).build())
        .addStructField(AddFieldReq.builder().fieldName("has_code").dataType(DataType.Bool).build())
        .addStructField(AddFieldReq.builder().fieldName("emb_list_vector").dataType(DataType.FloatVector).dimension(4).build())
        .addStructField(AddFieldReq.builder().fieldName("emb").dataType(DataType.FloatVector).dimension(4).build())
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

chunkSchema := entity.NewStructSchema()
chunkSchema.WithField(entity.NewField().
        WithName("text").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(65535))
chunkSchema.WithField(entity.NewField().
        WithName("section").
        WithDataType(entity.FieldTypeVarChar).
        WithMaxLength(128))
chunkSchema.WithField(entity.NewField().
        WithName("page").
        WithDataType(entity.FieldTypeInt64))
chunkSchema.WithField(entity.NewField().
        WithName("quality_score").
        WithDataType(entity.FieldTypeFloat))
chunkSchema.WithField(entity.NewField().
        WithName("has_code").
        WithDataType(entity.FieldTypeBool))
chunkSchema.WithField(entity.NewField().
        WithName("emb_list_vector").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))
chunkSchema.WithField(entity.NewField().
        WithName("emb").
        WithDataType(entity.FieldTypeFloatVector).
        WithDim(4))

structField := entity.NewField().
        WithName("chunks").
        WithDataType(entity.FieldTypeArray).
        WithElementType(entity.FieldTypeStruct).
        WithMaxCapacity(1000).
        WithNullable(true).
        WithStructSchema(chunkSchema)

err = cli.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption("tech_articles", structField))
if err != nil {
    fmt.Println(err)
    return
}
```

```rust
use milvus::v2::prelude::*;

let chunk_schema = StructFieldSchema::new()
    .name("chunks")
    .max_capacity(1000)
    .nullable(true)
    .add_field(FieldSchema::new().name("text").data_type(DataType::VarChar).max_length(65535))
    .add_field(FieldSchema::new().name("section").data_type(DataType::VarChar).max_length(128))
    .add_field(FieldSchema::new().name("page").data_type(DataType::Int64))
    .add_field(FieldSchema::new().name("quality_score").data_type(DataType::Float))
    .add_field(FieldSchema::new().name("has_code").data_type(DataType::Bool))
    .add_field(FieldSchema::new().name("emb_list_vector").data_type(DataType::FloatVector).dimension(4))
    .add_field(FieldSchema::new().name("emb").data_type(DataType::FloatVector).dimension(4));

client
    .add_collection_struct_field(
        AddCollectionStructFieldRequest::builder()
            .collection_name("tech_articles")
            .struct_field(chunk_schema)
            .build()?,
    )
    .await?;
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::StructFieldSchema struct_schema =
    milvus::StructFieldSchema()
        .WithName("chunks")
        .WithMaxCapacity(1000)
        .WithNullable(true)
        .AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR).WithMaxLength(65535))
        .AddField(milvus::FieldSchema("section", milvus::DataType::VARCHAR).WithMaxLength(128))
        .AddField(milvus::FieldSchema("page", milvus::DataType::INT64))
        .AddField(milvus::FieldSchema("quality_score", milvus::DataType::FLOAT))
        .AddField(milvus::FieldSchema("has_code", milvus::DataType::BOOL))
        .AddField(milvus::FieldSchema("emb_list_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(4))
        .AddField(milvus::FieldSchema("emb", milvus::DataType::FLOAT_VECTOR).WithDimension(4));

status = client->AddCollectionStructField(milvus::AddCollectionStructFieldRequest()
                                                   .WithCollectionName("tech_articles")
                                                   .WithStructField(std::move(struct_schema)));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
await client.addCollectionField({
  collection_name: "tech_articles",
  field: {
    name: "chunks",
    data_type: DataType.Array,
    element_type: DataType.Struct,
    nullable: true,
    max_capacity: 1000,
    fields: [
      { name: "text", data_type: DataType.VarChar, max_length: 65535 },
      { name: "section", data_type: DataType.VarChar, max_length: 128 },
      { name: "page", data_type: DataType.Int64 },
      { name: "quality_score", data_type: DataType.Float },
      { name: "has_code", data_type: DataType.Bool },
      { name: "emb_list_vector", data_type: DataType.FloatVector, dim: 4 },
      { name: "emb", data_type: DataType.FloatVector, dim: 4 },
    ],
  },
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

var addedChunkSchema = new StructFieldSchema("chunks")
{
    MaxCapacity = 1000,
    Nullable = true
};
addedChunkSchema.Fields.Add(FieldSchema.CreateVarchar("text", 65535));
addedChunkSchema.Fields.Add(FieldSchema.CreateVarchar("section", 128));
addedChunkSchema.Fields.Add(new FieldSchema("page", DataType.Int64));
addedChunkSchema.Fields.Add(new FieldSchema("quality_score", DataType.Float));
addedChunkSchema.Fields.Add(new FieldSchema("has_code", DataType.Bool));
addedChunkSchema.Fields.Add(new FieldSchema("emb_list_vector", DataType.FloatVector) { Dimension = 4 });

addedChunkSchema.Fields.Add(new FieldSchema("emb", DataType.FloatVector) { Dimension = 4 });

await client.AddCollectionStructFieldAsync(new AddCollectionStructFieldReq
{
    CollectionName = "tech_articles",
    StructField = addedChunkSchema
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/struct_fields/add" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "schema": {
      "fieldName": "chunks",
      "dataType": "Array",
      "elementDataType": "Struct",
      "nullable": true,
      "typeParams": {"max_capacity": "1000"},
      "fields": [
        {"fieldName": "text", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "65535"}},
        {"fieldName": "section", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
        {"fieldName": "page", "dataType": "Array", "elementDataType": "Int64"},
        {"fieldName": "quality_score", "dataType": "Array", "elementDataType": "Float"},
        {"fieldName": "has_code", "dataType": "Array", "elementDataType": "Bool"},
        {"fieldName": "emb_list_vector", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}},
        {"fieldName": "emb", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
      ]
    }
  }'
```

After the StructArray field is added, existing entities return NULL for the new field until you populate it.


### Add a subfield to an existing StructArray field | Milvus 3.0.6

Starting in Milvus 3.0.6, you can add a subfield to a StructArray field that already holds data. Call `add_collection_field()` with the subfield path as the field name and set `nullable=True` on the new subfield (required for every added subfield, and what allows element-level null). On an array subfield, additionally set `element_nullable=True` to allow null values inside the inner array. The new subfield inherits the row-level `nullable` setting and the `max_capacity` of the StructArray field.


<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
```python
client.add_collection_field(
    collection_name="tech_articles",
    field_name="chunks[lang]",
    data_type=DataType.VARCHAR,
    max_length=16,
    nullable=True,
)
```

```go
err = cli.AddCollectionField(ctx, milvusclient.NewAddCollectionFieldOption("tech_articles",
        entity.NewField().
                WithName("chunks[lang]").
                WithDataType(entity.FieldTypeVarChar).
                WithMaxLength(16).
                WithNullable(true)))
if err != nil {
    fmt.Println(err)
    return
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/fields/add" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "schema": {
      "fieldName": "chunks[lang]",
      "dataType": "VarChar",
      "elementNullable": true,
      "elementTypeParams": {"max_length": "16"}
    }
  }'
```

Adding a subfield follows these rules:

- The added subfield must be created with `nullable=True`, and an added array subfield additionally takes `element_nullable=True` to allow null values inside the inner array. It cannot have a default value. Existing entities return null for the new subfield in each of their Struct elements, and entities whose StructArray field is null stay null.

- The subfield can be a scalar, a vector, or a scalar array. Milvus appends it after the existing subfields.

- You cannot bind an index while adding the subfield. Create the index with a separate `create_index()` call. An added vector subfield supports element-level metrics only, and the collection must have an index on it before you load the collection with the new subfield included.

- Clients that omit the new subfield when inserting keep working, because Milvus stores null for omitted element-nullable subfields.



In versions before Milvus 3.0.6, subfields cannot be appended to an existing StructArray field. The following separate example replaces `chunks` with a schema that contains the original seven subfields and a new `source` string subfield.


Dropping a field removes its data; adding it again does not restore the old values. Preserve the data you need, follow the prerequisites in [Alter Collection Schema](add-fields-to-an-existing-collection.md), then repopulate and reindex the replacement field. This example retains the collection-level `title_vector` field so that dropping `chunks` does not remove every vector field from the collection.

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
updated_chunk_schema = client.create_struct_field_schema()
updated_chunk_schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=65535,
)
updated_chunk_schema.add_field(
    field_name="section",
    datatype=DataType.VARCHAR,
    max_length=128,
)
updated_chunk_schema.add_field(
    field_name="page",
    datatype=DataType.INT64,
)
updated_chunk_schema.add_field(
    field_name="quality_score",
    datatype=DataType.FLOAT,
)
updated_chunk_schema.add_field(
    field_name="has_code",
    datatype=DataType.BOOL,
)
updated_chunk_schema.add_field(
    field_name="emb_list_vector",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)
updated_chunk_schema.add_field(
    field_name="emb",
    datatype=DataType.FLOAT_VECTOR,
    dim=4,
)

updated_chunk_schema.add_field(
    field_name="source",
    datatype=DataType.VARCHAR,
    max_length=256,
)

client.drop_collection_field(
    collection_name="tech_articles",
    field_name="chunks",
)

client.add_collection_struct_field(
    collection_name="tech_articles",
    field_name="chunks",
    struct_schema=updated_chunk_schema,
    max_capacity=1000,
    nullable=True,
)
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddCollectionStructFieldReq;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.DropCollectionFieldReq;

client.dropCollectionField(DropCollectionFieldReq.builder()
        .collectionName("tech_articles")
        .fieldName("chunks")
        .build());

client.addCollectionStructField(AddCollectionStructFieldReq.builder()
        .collectionName("tech_articles")
        .fieldName("chunks")
        .maxCapacity(1000)
        .nullable(Boolean.TRUE)
        .addStructField(AddFieldReq.builder().fieldName("source").dataType(DataType.VarChar).maxLength(256).build())
        .addStructField(AddFieldReq.builder().fieldName("text").dataType(DataType.VarChar).maxLength(65535).build())
        .addStructField(AddFieldReq.builder().fieldName("section").dataType(DataType.VarChar).maxLength(128).build())
        .addStructField(AddFieldReq.builder().fieldName("page").dataType(DataType.Int64).build())
        .addStructField(AddFieldReq.builder().fieldName("quality_score").dataType(DataType.Float).build())
        .addStructField(AddFieldReq.builder().fieldName("has_code").dataType(DataType.Bool).build())
        .addStructField(AddFieldReq.builder().fieldName("emb_list_vector").dataType(DataType.FloatVector).dimension(4).build())
        .addStructField(AddFieldReq.builder().fieldName("emb").dataType(DataType.FloatVector).dimension(4).build())
        .build());
```

```go
import (
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

updatedStructField := entity.NewField().
    WithName("chunks").
    WithDataType(entity.FieldTypeArray).
    WithElementType(entity.FieldTypeStruct).
    WithMaxCapacity(1000).
    WithNullable(true).
    WithStructSchema(entity.NewStructSchema().
        WithField(entity.NewField().WithName("source").WithDataType(entity.FieldTypeVarChar).WithMaxLength(256)).
        WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(65535)).
        WithField(entity.NewField().WithName("section").WithDataType(entity.FieldTypeVarChar).WithMaxLength(128)).
        WithField(entity.NewField().WithName("page").WithDataType(entity.FieldTypeInt64)).
        WithField(entity.NewField().WithName("quality_score").WithDataType(entity.FieldTypeFloat)).
        WithField(entity.NewField().WithName("has_code").WithDataType(entity.FieldTypeBool)).
        WithField(entity.NewField().WithName("emb_list_vector").WithDataType(entity.FieldTypeFloatVector).WithDim(4)).
        WithField(entity.NewField().WithName("emb").WithDataType(entity.FieldTypeFloatVector).WithDim(4)))

err = cli.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption("tech_articles", "chunks"))
if err != nil {
    fmt.Println(err)
    return
}

err = cli.AddCollectionStructField(ctx, milvusclient.NewAddCollectionStructFieldOption("tech_articles", updatedStructField))
if err != nil {
    fmt.Println(err)
    return
}
```

```rust
use milvus::v2::prelude::*;

let updated_chunk_schema = StructFieldSchema::new()
    .name("chunks")
    .max_capacity(1000)
    .nullable(true)
    .add_field(FieldSchema::new().name("source").data_type(DataType::VarChar).max_length(256))
    .add_field(FieldSchema::new().name("text").data_type(DataType::VarChar).max_length(65_535))
    .add_field(FieldSchema::new().name("section").data_type(DataType::VarChar).max_length(128))
    .add_field(FieldSchema::new().name("page").data_type(DataType::Int64))
    .add_field(FieldSchema::new().name("quality_score").data_type(DataType::Float))
    .add_field(FieldSchema::new().name("has_code").data_type(DataType::Bool))
    .add_field(FieldSchema::new().name("emb_list_vector").data_type(DataType::FloatVector).dimension(4))
    .add_field(FieldSchema::new().name("emb").data_type(DataType::FloatVector).dimension(4));

client
    .drop_collection_field(
        DropCollectionFieldRequest::builder()
            .collection_name("tech_articles")
            .field_name("chunks")
            .build()?,
    )
    .await?;

client
    .add_collection_struct_field(
        AddCollectionStructFieldRequest::builder()
            .collection_name("tech_articles")
            .struct_field(updated_chunk_schema)
            .build()?,
    )
    .await?;
```

```cpp
#include <stdexcept>
#include <utility>
#include <iostream>
#include <utility>
#include "milvus/MilvusClientV2.h"

milvus::StructFieldSchema updated_struct_schema("chunks");
updated_struct_schema.WithMaxCapacity(1000).WithNullable(true);
updated_struct_schema.AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR).WithMaxLength(65535));
updated_struct_schema.AddField(milvus::FieldSchema("section", milvus::DataType::VARCHAR).WithMaxLength(128));
updated_struct_schema.AddField(milvus::FieldSchema("page", milvus::DataType::INT64));
updated_struct_schema.AddField(milvus::FieldSchema("quality_score", milvus::DataType::FLOAT));
updated_struct_schema.AddField(milvus::FieldSchema("has_code", milvus::DataType::BOOL));
updated_struct_schema.AddField(milvus::FieldSchema("emb_list_vector", milvus::DataType::FLOAT_VECTOR).WithDimension(4));
updated_struct_schema.AddField(milvus::FieldSchema("emb", milvus::DataType::FLOAT_VECTOR).WithDimension(4));

updated_struct_schema.AddField(milvus::FieldSchema("source", milvus::DataType::VARCHAR).WithMaxLength(256));

status = client->DropCollectionField(milvus::DropCollectionFieldRequest()
                                         .WithCollectionName("tech_articles")
                                         .WithFieldName("chunks"));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}

status = client->AddCollectionStructField(milvus::AddCollectionStructFieldRequest()
                                              .WithCollectionName("tech_articles")
                                              .WithStructField(std::move(updated_struct_schema)));
if (!status.IsOk()) {
    throw std::runtime_error(status.Message());
}
```

```javascript
await client.dropCollectionField({
  collection_name: "tech_articles",
  field_name: "chunks",
});

await client.addCollectionField({
  collection_name: "tech_articles",
  field: {
    name: "chunks",
    data_type: DataType.Array,
    element_type: DataType.Struct,
    nullable: true,
    max_capacity: 1000,
    fields: [
      { name: "source", data_type: DataType.VarChar, max_length: 256 },
      { name: "text", data_type: DataType.VarChar, max_length: 65535 },
      { name: "section", data_type: DataType.VarChar, max_length: 128 },
      { name: "page", data_type: DataType.Int64 },
      { name: "quality_score", data_type: DataType.Float },
      { name: "has_code", data_type: DataType.Bool },
      { name: "emb_list_vector", data_type: DataType.FloatVector, dim: 4 },
      { name: "emb", data_type: DataType.FloatVector, dim: 4 },
    ],
  },
});
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Types;

var updatedChunkSchema = new StructFieldSchema("chunks")
{
    MaxCapacity = 1000,
    Nullable = true
};
updatedChunkSchema.Fields.Add(FieldSchema.CreateVarchar("text", 65535));
updatedChunkSchema.Fields.Add(FieldSchema.CreateVarchar("section", 128));
updatedChunkSchema.Fields.Add(new FieldSchema("page", DataType.Int64));
updatedChunkSchema.Fields.Add(new FieldSchema("quality_score", DataType.Float));
updatedChunkSchema.Fields.Add(new FieldSchema("has_code", DataType.Bool));
updatedChunkSchema.Fields.Add(new FieldSchema("emb_list_vector", DataType.FloatVector) { Dimension = 4 });
updatedChunkSchema.Fields.Add(new FieldSchema("emb", DataType.FloatVector) { Dimension = 4 });

updatedChunkSchema.Fields.Add(FieldSchema.CreateVarchar("source", 256));

await client.DropCollectionFieldAsync(new DropCollectionFieldReq
{
    CollectionName = "tech_articles",
    FieldName = "chunks"
});

await client.AddCollectionStructFieldAsync(new AddCollectionStructFieldReq
{
    CollectionName = "tech_articles",
    StructField = updatedChunkSchema
});
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/fields/drop" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "fieldName": "chunks"
  }'

curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/struct_fields/add" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "schema": {
      "fieldName": "chunks",
      "dataType": "Array",
      "elementDataType": "Struct",
      "nullable": true,
      "typeParams": {"max_capacity": "1000"},
      "fields": [
        {"fieldName": "source", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "256"}},
        {"fieldName": "text", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "65535"}},
        {"fieldName": "section", "dataType": "Array", "elementDataType": "VarChar", "elementTypeParams": {"max_length": "128"}},
        {"fieldName": "page", "dataType": "Array", "elementDataType": "Int64"},
        {"fieldName": "quality_score", "dataType": "Array", "elementDataType": "Float"},
        {"fieldName": "has_code", "dataType": "Array", "elementDataType": "Bool"},
        {"fieldName": "emb_list_vector", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}},
        {"fieldName": "emb", "dataType": "ArrayOfVector", "elementDataType": "FloatVector", "elementTypeParams": {"dim": "4"}}
      ]
    }
  }'
```

### Drop a subfield from a StructArray field | Milvus 3.0.6

Starting in Milvus 3.0.6, you can drop a subfield from an existing StructArray field by its path. Milvus removes the subfield, its data, and its index.


<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#go">Go</a>
    <a href="#bash">cURL</a>
</div>
```python
client.drop_collection_field(
    collection_name="tech_articles",
    field_name="chunks[lang]",
)
```

```go
err = cli.DropCollectionField(ctx, milvusclient.NewDropCollectionFieldOption("tech_articles", "chunks[lang]"))
if err != nil {
    fmt.Println(err)
    return
}
```

```bash
curl --request POST \
  --url "http://localhost:19530/v2/vectordb/collections/fields/drop" \
  --header "Authorization: Bearer root:Milvus" \
  --header "Content-Type: application/json" \
  --data-raw '{
    "collectionName": "tech_articles",
    "fieldName": "chunks[lang]"
  }'
```

You cannot drop the last subfield of a StructArray field, the last vector field of the collection, or a subfield used by a Function. To remove the whole StructArray field, drop the field by its name, such as `chunks`. After a subfield is dropped, insert requests that still carry the subfield are rejected.

Dropping a subfield while queries are still running against it can fail transiently: query plans that were built on the older schema keep executing for a short time and fail with an internal error. Finish queries against a subfield before dropping it, or retry the drop after the running queries finish.

## Schema rules


| Rule | Explanation |
| --- | --- |
| Struct is used as an Array element type. | Create a StructArray field as an Array field with `element_type=STRUCT`. Do not create Struct as a top-level collection field. |
| All elements share one schema. | Every Struct element in the same StructArray field follows the Struct schema defined for that field. |
| `max_capacity` is required. | It limits how many Struct elements each entity can store in the StructArray field. |
| Only supported subfield types are allowed. | Use scalar, scalar array (Milvus 3.0.6 and later), and vector subfield types supported by StructArray. Do not define JSON, Geometry, Text, Timestamptz, SparseFloatVector, or nested Struct subfields. |
| Vector subfields need indexes before search. | Create indexes on paths such as `chunks[emb_list_vector]` or `chunks[emb]` before running vector search. |
| One vector subfield has one index. | If you need both EmbeddingList search and element-level search, create two separate vector subfields. |
| Subfields can change only in Milvus 3.0.6 and later. | Add an element-nullable subfield or drop a subfield by its path. In earlier versions, drop the StructArray field and add it again with the updated schema. |
| All subfields share one `max_capacity`. | The StructArray field's `max_capacity` applies to every subfield. An added subfield inherits it. |
| Functions are not supported inside Struct. | Do not define functions for fields or subfields inside a StructArray field. |
| Scalar subfields should match filter needs. | Add fields such as `section`, `quality_score`, or `has_code` only when you need to filter, group, or output them later. |


## Common mistakes

- Creating `DataType.STRUCT` as a top-level collection field instead of using it as the element type of an Array field.

- Forgetting to set `max_capacity` on the StructArray field.

- Defining unsupported subfield types, such as JSON, Geometry, Text, Timestamptz, SparseFloatVector, nested Struct, Array-of-Struct, or an array subfield that holds vectors or another array.

- Using `String` as a subfield type. Use `VARCHAR` and set `max_length`.

- Using one vector subfield for both EmbeddingList search and element-level search.

- Adding only vector subfields and forgetting scalar subfields needed for filtering, such as `section`, `quality_score`, or `has_code`.

- Treating vector subfields as `$[...]` scalar predicate inputs. Use vector subfields for vector search, and scalar subfields for scalar predicates.


- Assuming new subfields can be added to an existing StructArray field before Milvus 3.0.6, or adding a subfield that does not allow element-level null.


- Setting row-level null on a subfield. Row-level null is set on the StructArray parent only. For null values inside Struct elements, set `nullable=True` on a scalar or vector subfield, and `element_nullable=True` on an array subfield.

- Using `chunks.emb` or `chunks.emb_list_vector` instead of the required path syntax `chunks[emb]` or `chunks[emb_list_vector]`.

- Treating nullable StructArray behavior as available in every target version.

## Next steps

1. To insert nested data into the StructArray field, read [Insert Data into StructArray Fields](insert-data-into-structarray-fields.md).

2. To create vector and scalar indexes, read [Index StructArray Fields](index-structarray-fields.md).

3. To search StructArray vector subfields, read [Basic Vector Search with StructArray](basic-vector-search-with-structarray.md).

4. To review supported data types, nullable behavior, and version-specific limitations, read [StructArray Limits](structarray-limits.md).
