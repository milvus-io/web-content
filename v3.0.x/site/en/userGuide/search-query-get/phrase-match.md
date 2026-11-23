---
id: phrase-match.md
title: "Phrase Match"
summary: "Phrase match lets you search for documents containing your query terms as an exact phrase. By default, the words must appear in the same order and directly adjacent to one another. For example, a query for \"robotics machine learning\" matches text like \"…typical robotics machine learning models…\", where the words \"robotics\", \"machine\", and \"learning\" appear in sequence with no other words between them."
beta: Milvus 2.5.17+
---

# Phrase Match

Phrase match lets you search for documents containing your query terms as an exact phrase. By default, the words must appear in the same order and directly adjacent to one another. For example, a query for **"robotics machine learning"** matches text like *"…typical robotics machine learning models…"*, where the words **"robotics"**, **"machine"**, and **"learning"** appear in sequence with no other words between them.

However, in real-world scenarios, strict phrase matching can be too rigid. You might want to match text like *"…machine learning models widely adopted in robotics…"*. Here, the same keywords are present but not side-by-side or in the original order. To handle this, phrase match supports a `slop` parameter, which introduces flexibility. The `slop` value defines how many positional shifts are allowed between the terms in the phrase. For example, with a `slop` of 1, a query for **"machine learning"** can match text like *"...machine deep learning..."*, where one word (**"deep"**) separates the original terms.

## Overview

Powered by the [Tantivy](https://github.com/quickwit-oss/tantivy) search engine library, phrase match works by analyzing the positional information of words within documents. The diagram below illustrates the process:

![Phrase Match Workflow](https://milvus-docs.s3.us-west-2.amazonaws.com/assets/phrase-match-workflow.png)

1. **Document Tokenization**: When you insert documents into Milvus, the text is split into tokens (individual words or terms) using an analyzer, with positional information recorded for each token. For example, **doc_1** is tokenized into **["machine" (pos=0), "learning" (pos=1), "boosts" (pos=2), "efficiency" (pos=3)]**. For more information on analyzers, refer to [Analyzer Overview](analyzer-overview.md).

1. **Inverted Index Creation**: Milvus builds an inverted index, mapping each token to the document(s) in which it appears and the token's positions in those documents.

1. **Phrase Matching**: When a phrase query is executed, Milvus looks up each token in the inverted index and checks their positions to determine if they appear in the correct order and proximity. The `slop` parameter controls the maximum number of positions allowed between matching tokens:

    - **slop = 0** means the tokens must appear **in the exact order and immediately adjacent** (i.e., no extra words in between).

        - In the example, only **doc_1** (**"machine"** at **pos=0**, **"learning"** at **pos=1**) matches exactly.

    - **slop = 2** allows up to two positions of flexibility or rearrangements between matching tokens.

        - This allows reversed order (**"learning machine"**) or a small gap between the tokens.

        - Consequently, **doc_1**, **doc_2** (**"learning"** at **pos=0**, **"machine"** at **pos=1**), and **doc_3** (**"learning"** at **pos=1**, **"machine"** at **pos=2**) all match.

## Enable phrase match

Phrase match works with the `VARCHAR` field type, the string data type in Milvus. To enable phrase matching, configure your collection schema by setting both `enable_analyzer` and `enable_match` parameters to `True`, similar to [text match](keyword-match.md).

### Set `enable_analyzer` and `enable_match`

To enable phrase match for a specific `VARCHAR` field, set both `enable_analyzer` and `enable_match` parameters to `True` when defining the field schema. This configuration instructs Milvus to tokenize the text and create an inverted index with positional information required for efficient phrase matching.

Here's an example schema definition to enable phrase match:

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

# Create a schema for a new collection
schema = MilvusClient.create_schema(enable_dynamic_field=False)
schema.add_field(
    field_name="id",
    datatype=DataType.INT64,
    is_primary=True,
    auto_id=True
)
# Add a VARCHAR field configured for phrase matching
schema.add_field(
    field_name='text',                 # Name of the field
    datatype=DataType.VARCHAR,         # Field data type set as VARCHAR (string)
    max_length=1000,                   # Maximum length of the string in bytes
    enable_analyzer=True,              # Enables text analysis (tokenization)
    enable_match=True                  # Enables inverted indexing for phrase matching
)
schema.add_field(
    field_name="embeddings",
    datatype=DataType.FLOAT_VECTOR,
    dim=5
)
```

```java
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;

// Create a schema for a new collection
CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(false)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(true)
        .build());
// Add a VARCHAR field configured for phrase matching
schema.addField(AddFieldReq.builder()
        .fieldName("text")              // Name of the field
        .dataType(DataType.VarChar)     // Field data type set as VARCHAR (string)
        .maxLength(1000)                // Maximum length of the string in bytes
        .enableAnalyzer(true)           // Enables text analysis (tokenization)
        .enableMatch(true)              // Enables inverted indexing for phrase matching
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("embeddings")
        .dataType(DataType.FloatVector)
        .dimension(5)
        .build());
```

```go
import "github.com/milvus-io/milvus/client/v3/entity"

// Create a schema for a new collection
schema := entity.NewSchema().WithDynamicFieldEnabled(false)
schema.WithField(entity.NewField().
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true).
    WithIsAutoID(true),
).WithField(entity.NewField().
    WithName("text").                      // Name of the field
    WithDataType(entity.FieldTypeVarChar). // Field data type set as VARCHAR (string)
    WithMaxLength(1000).                   // Maximum length of the string in bytes
    WithEnableAnalyzer(true).              // Enables text analysis (tokenization)
    WithEnableMatch(true),                 // Enables inverted indexing for phrase matching
).WithField(entity.NewField().
    WithName("embeddings").
    WithDataType(entity.FieldTypeFloatVector).
    WithDim(5),
)
```

```rust
use milvus::v2::prelude::*;

// Create a schema for a new collection
let schema = CollectionSchema::new()
    .enable_dynamic_field(false)
    .add_field(
        FieldSchema::new()
            .name("id")
            .data_type(DataType::Int64)
            .primary_key(true)
            .auto_id(true),
    )
    // Add a VARCHAR field configured for phrase matching
    .add_field(
        FieldSchema::new()
            .name("text")                   // Name of the field
            .data_type(DataType::VarChar)   // Field data type set as VARCHAR (string)
            .max_length(1000)               // Maximum length of the string in bytes
            .enable_analyzer(true)          // Enables text analysis (tokenization)
            .enable_match(true),            // Enables inverted indexing for phrase matching
    )
    .add_field(
        FieldSchema::new()
            .name("embeddings")
            .data_type(DataType::FloatVector)
            .dimension(5),
    );
```

```cpp
#include "milvus/MilvusClientV2.h"

// Create a schema for a new collection
milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->SetEnableDynamicField(false);
schema->AddField({"id", milvus::DataType::INT64, "", true, true});
// Add a VARCHAR field configured for phrase matching
schema->AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR)  // Name of the field
                    .WithMaxLength(1000)    // Maximum length of the string in bytes
                    .EnableAnalyzer(true)   // Enables text analysis (tokenization)
                    .EnableMatch(true));    // Enables inverted indexing for phrase matching
schema->AddField(milvus::FieldSchema("embeddings", milvus::DataType::FLOAT_VECTOR)
                    .WithDimension(5));
```

```javascript
import { DataType } from "@zilliz/milvus2-sdk-node";

// Create a schema for a new collection
const schema = [
  {
    name: "id",
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: true,
  },
  // Add a VARCHAR field configured for phrase matching
  {
    name: "text", // Name of the field
    data_type: DataType.VarChar, // Field data type set as VARCHAR (string)
    max_length: 1000, // Maximum length of the string in bytes
    enable_analyzer: true, // Enables text analysis (tokenization)
    enable_match: true, // Enables inverted indexing for phrase matching
  },
  {
    name: "embeddings",
    data_type: DataType.FloatVector,
    dim: 5,
  },
];
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// Create a schema for a new collection
CollectionSchema schema = new()
{
    EnableDynamicFields = false,
    Fields =
    {
        new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true),
        // Add a VARCHAR field configured for phrase matching
        FieldSchema.CreateVarchar("text", 1000, enableAnalyzer: true, enableMatch: true),
        new FieldSchema("embeddings", DataType.FloatVector) { Dimension = 5 }
    }
};
```

```bash
export schema='{
        "autoId": true,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "id",
                "dataType": "Int64",
                "isPrimary": true
            },
            {
                "fieldName": "text",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 1000,
                    "enable_analyzer": true,
                    "enable_match": true
                }
            },
            {
                "fieldName": "embeddings",
                "dataType": "FloatVector",
                "elementTypeParams": {
                    "dim": "5"
                }
            }
        ]
    }'
```

### Optional: Configure an analyzer

Phrase matching accuracy depends significantly on the analyzer used to tokenize your text data. Different analyzers suit different languages and text formats, affecting tokenization and positional accuracy. Selecting an appropriate analyzer for your specific use case will optimize your phrase matching results.

By default, Milvus uses the standard analyzer, which tokenizes text based on whitespace and punctuation, removes tokens longer than 40 characters, and converts text to lowercase. No additional parameters are required for default usage. Refer to [Standard Analyzer](standard-analyzer.md) for details.

If your application requires a specific analyzer, configure it using the `analyzer_params` parameter. For example, here's how to configure the `english` analyzer for phrase matching in English text:

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
# Define analyzer parameters for English-language tokenization
analyzer_params = {
    "type": "english"
}

# Add the VARCHAR field with the English analyzer enabled
schema.add_field(
    field_name='text',                 # Name of the field
    datatype=DataType.VARCHAR,         # Field data type set as VARCHAR
    max_length=1000,                   # Maximum length of the string in bytes
    enable_analyzer=True,              # Enables text analysis
    analyzer_params=analyzer_params,   # Specifies the analyzer configuration
    enable_match=True                  # Enables inverted indexing for phrase matching
)
```

```java
// Define analyzer parameters for English-language tokenization
Map<String, Object> analyzerParams = new HashMap<>();
analyzerParams.put("type", "english");

// Add the VARCHAR field with the English analyzer enabled
schema.addField(AddFieldReq.builder()
        .fieldName("text")              // Name of the field
        .dataType(DataType.VarChar)     // Field data type set as VARCHAR
        .maxLength(1000)                // Maximum length of the string in bytes
        .enableAnalyzer(true)           // Enables text analysis
        .analyzerParams(analyzerParams) // Specifies the analyzer configuration
        .enableMatch(true)              // Enables inverted indexing for phrase matching
        .build());
```

```go
// Define analyzer parameters for English-language tokenization
analyzerParams := map[string]any{"type": "english"}

// Add the VARCHAR field with the English analyzer enabled
schema.WithField(entity.NewField().
    WithName("text").                      // Name of the field
    WithDataType(entity.FieldTypeVarChar). // Field data type set as VARCHAR
    WithMaxLength(1000).                   // Maximum length of the string in bytes
    WithEnableAnalyzer(true).              // Enables text analysis
    WithAnalyzerParams(analyzerParams).    // Specifies the analyzer configuration
    WithEnableMatch(true),                 // Enables inverted indexing for phrase matching
)
```

```rust
// Define analyzer parameters for English-language tokenization
let analyzer_params = serde_json::json!({"type": "english"});

// Add the VARCHAR field with the English analyzer enabled
let schema = CollectionSchema::new().add_field(
    FieldSchema::new()
        .name("text")                   // Name of the field
        .data_type(DataType::VarChar)   // Field data type set as VARCHAR
        .max_length(1000)               // Maximum length of the string in bytes
        .enable_analyzer(true)          // Enables text analysis
        .analyzer_params(analyzer_params) // Specifies the analyzer configuration
        .enable_match(true),            // Enables inverted indexing for phrase matching
);
```

```cpp
// Define analyzer parameters for English-language tokenization
nlohmann::json analyzer_params = {{"type", "english"}};

// Add the VARCHAR field with the English analyzer enabled
schema->AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR)  // Name of the field
                    .WithMaxLength(1000)                 // Maximum length of the string in bytes
                    .EnableAnalyzer(true)                // Enables text analysis
                    .WithAnalyzerParams(analyzer_params) // Specifies the analyzer configuration
                    .EnableMatch(true));                 // Enables inverted indexing for phrase matching
```

```javascript
// Define analyzer parameters for English-language tokenization
const analyzer_params = { type: "english" };

// Add the VARCHAR field with the English analyzer enabled
const schema = [
  {
    name: "text", // Name of the field
    data_type: DataType.VarChar, // Field data type set as VARCHAR
    max_length: 1000, // Maximum length of the string in bytes
    enable_analyzer: true, // Enables text analysis
    analyzer_params: analyzer_params, // Specifies the analyzer configuration
    enable_match: true, // Enables inverted indexing for phrase matching
  },
];
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Types;

// Define analyzer parameters for English-language tokenization
var analyzerParams = new Dictionary<string, object> { ["type"] = "english" };

// Add the VARCHAR field with the English analyzer enabled
var schema = new CollectionSchema
{
    Fields =
    {
        FieldSchema.CreateVarchar("text", 1000,
            enableAnalyzer: true,           // Enables text analysis
            analyzerParams: analyzerParams,  // Specifies the analyzer configuration
            enableMatch: true)               // Enables inverted indexing for phrase matching
    }
};
```

```bash
export schema='{
        "autoId": true,
        "enabledDynamicField": false,
        "fields": [
            {
                "fieldName": "text",
                "dataType": "VarChar",
                "elementTypeParams": {
                    "max_length": 1000,
                    "enable_analyzer": true,
                    "analyzer_params": {"type": "english"},
                    "enable_match": true
                }
            }
        ]
    }'
```

Milvus supports several analyzers tailored for different languages and use cases. For detailed information, refer to [Analyzer Overview](analyzer-overview.md).

### Create the collection

Once the necessary fields are defined, use the following code to create the collection:

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
# Create the collection
COLLECTION_NAME = "tech_articles"  # Name your collection

if client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema
)
```

```java
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.collection.request.HasCollectionReq;

String COLLECTION_NAME = "tech_articles";  // Name your collection

if (client.hasCollection(
        HasCollectionReq.builder()
            .collectionName(COLLECTION_NAME)
            .build()
    )) {
    client.dropCollection(
        DropCollectionReq.builder()
            .collectionName(COLLECTION_NAME)
            .build()
    );
}

client.createCollection(
    CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(schema)
        .build()
);
```

```go
collectionName := "tech_articles"  // Name your collection

has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
if err != nil {
    log.Fatal(err)
}
if has {
    _ = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
}

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema))
if err != nil {
    log.Fatal(err)
}
```

```rust
let collection_name = "tech_articles";  // Name your collection

if client
    .has_collection(
        HasCollectionRequest::builder()
            .collection_name(collection_name)
            .build()?,
    )
    .await?
    .exists()
{
    client
        .drop_collection(
            DropCollectionRequest::builder()
                .collection_name(collection_name)
                .build()?,
        )
        .await?;
}

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name(collection_name)
            .schema(schema)
            .build()?,
    )
    .await?;
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>

const std::string collection_name = "tech_articles";  // Name your collection

milvus::HasCollectionResponse response;
auto status = client->HasCollection(milvus::HasCollectionRequest().WithCollectionName(collection_name), response);
if (response.Has()) {
    status = client->DropCollection(milvus::DropCollectionRequest().WithCollectionName(collection_name));
}

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                    .WithCollectionName(collection_name)
                                    .WithCollectionSchema(schema));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Create or recreate the collection if it already exists
const COLLECTION_NAME = "tech_articles"; // Name your collection

const hasCollection = await client.hasCollection({ collection_name: COLLECTION_NAME });

if (hasCollection.value) {
    await client.dropCollection({ collection_name: COLLECTION_NAME });
}

await client.createCollection(schema);
```

```csharp
using Milvus.Client.V2.Requests.Collection;

// Create the collection
const string COLLECTION_NAME = "tech_articles"; // Name your collection

if (await client.HasCollectionAsync(new HasCollectionReq { CollectionName = COLLECTION_NAME }) is { Has: true })
{
    await client.DropCollectionAsync(new DropCollectionReq { CollectionName = COLLECTION_NAME });
}

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = COLLECTION_NAME,
    Schema = schema
});
```

```bash
# Check whether the collection exists
curl -X POST "http://localhost:19530/v2/vectordb/collections/has" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "tech_articles"
  }'

# Drop the existing collection
curl -X POST "http://localhost:19530/v2/vectordb/collections/drop" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "tech_articles"
  }'

# Create the new collection
curl -X POST "http://localhost:19530/v2/vectordb/collections/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d "{
    \"collectionName\": \"tech_articles\",
    \"schema\": $schema
  }"
```

After the collection is created, make sure the following necessary steps are performed before [using phrase match](#use-phrase-match):

- Entities are inserted into the collection;

- You have created an index on each vector field;

- The collection is loaded into memory.

<details>

<summary>Show example code</summary>

The following self-contained example creates a separate `phrase_match_demo` collection, inserts five documents, builds a vector index, and loads the collection. The query and search examples later on this page use the `tech_articles` dataset described in [Example dataset](#example-dataset).

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
# Insert sample data with text containing "machine learning" phrases
COLLECTION_NAME = "phrase_match_demo"

sample_data = [
    {
        "text": "Machine learning is a subset of artificial intelligence that focuses on algorithms.",
        "embeddings": [0.1, 0.2, 0.3, 0.4, 0.5]
    },
    {
        "text": "Deep learning machine algorithms require large datasets for training.",
        "embeddings": [0.2, 0.3, 0.4, 0.5, 0.6]
    },
    {
        "text": "The machine learning model showed excellent performance on the test set.",
        "embeddings": [0.3, 0.4, 0.5, 0.6, 0.7]
    },
    {
        "text": "Natural language processing and machine learning go hand in hand.",
        "embeddings": [0.4, 0.5, 0.6, 0.7, 0.8]
    },
    {
        "text": "This article discusses various learning machine techniques and applications.",
        "embeddings": [0.5, 0.6, 0.7, 0.8, 0.9]
    }
]

client.insert(collection_name=COLLECTION_NAME, data=sample_data)

# Index the vector field and load the collection
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="embeddings",
    index_type="AUTOINDEX",
    index_name="embeddings_index",
    metric_type="COSINE"
)

client.create_index(collection_name=COLLECTION_NAME, index_params=index_params)
client.load_collection(collection_name=COLLECTION_NAME)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.index.request.CreateIndexReq;
import io.milvus.v2.service.vector.request.InsertReq;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

String COLLECTION_NAME = "phrase_match_demo";

// Build the sample rows
Gson gson = new Gson();
List<JsonObject> data = new ArrayList<>();

JsonObject row1 = new JsonObject();
row1.addProperty("text", "Machine learning is a subset of artificial intelligence that focuses on algorithms.");
row1.add("embeddings", gson.toJsonTree(Arrays.asList(0.1f, 0.2f, 0.3f, 0.4f, 0.5f)));
data.add(row1);

JsonObject row2 = new JsonObject();
row2.addProperty("text", "Deep learning machine algorithms require large datasets for training.");
row2.add("embeddings", gson.toJsonTree(Arrays.asList(0.2f, 0.3f, 0.4f, 0.5f, 0.6f)));
data.add(row2);

JsonObject row3 = new JsonObject();
row3.addProperty("text", "The machine learning model showed excellent performance on the test set.");
row3.add("embeddings", gson.toJsonTree(Arrays.asList(0.3f, 0.4f, 0.5f, 0.6f, 0.7f)));
data.add(row3);

JsonObject row4 = new JsonObject();
row4.addProperty("text", "Natural language processing and machine learning go hand in hand.");
row4.add("embeddings", gson.toJsonTree(Arrays.asList(0.4f, 0.5f, 0.6f, 0.7f, 0.8f)));
data.add(row4);

JsonObject row5 = new JsonObject();
row5.addProperty("text", "This article discusses various learning machine techniques and applications.");
row5.add("embeddings", gson.toJsonTree(Arrays.asList(0.5f, 0.6f, 0.7f, 0.8f, 0.9f)));
data.add(row5);

client.insert(InsertReq.builder().collectionName(COLLECTION_NAME).data(data).build());

// Index the vector field and load the collection
IndexParam indexParam = IndexParam.builder()
        .fieldName("embeddings")
        .indexName("embeddings_index")
        .indexType(IndexParam.IndexType.AUTOINDEX)
        .metricType(IndexParam.MetricType.COSINE)
        .build();

client.createIndex(CreateIndexReq.builder()
        .collectionName(COLLECTION_NAME)
        .indexParams(Collections.singletonList(indexParam))
        .build());

client.loadCollection(LoadCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .build());
```

```go
collectionName := "phrase_match_demo"

texts := []string{
    "Machine learning is a subset of artificial intelligence that focuses on algorithms.",
    "Deep learning machine algorithms require large datasets for training.",
    "The machine learning model showed excellent performance on the test set.",
    "Natural language processing and machine learning go hand in hand.",
    "This article discusses various learning machine techniques and applications.",
}
embeddings := [][]float32{
    {0.1, 0.2, 0.3, 0.4, 0.5},
    {0.2, 0.3, 0.4, 0.5, 0.6},
    {0.3, 0.4, 0.5, 0.6, 0.7},
    {0.4, 0.5, 0.6, 0.7, 0.8},
    {0.5, 0.6, 0.7, 0.8, 0.9},
}

_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithVarcharColumn("text", texts).
    WithFloatVectorColumn("embeddings", 5, embeddings))
if err != nil {
    log.Fatal(err)
}

// Index the vector field and load the collection
indexOption := milvusclient.NewCreateIndexOption(collectionName, "embeddings", index.NewAutoIndex(entity.COSINE)).
    WithIndexName("embeddings_index")
_, err = client.CreateIndex(ctx, indexOption)
if err != nil {
    log.Fatal(err)
}

_, err = client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
if err != nil {
    log.Fatal(err)
}
```

```rust
let collection_name = "phrase_match_demo";

// Insert sample data with text containing "machine learning" phrases
let data = vec![
    json!({"text": "Machine learning is a subset of artificial intelligence that focuses on algorithms.", "embeddings": [0.1, 0.2, 0.3, 0.4, 0.5]}),
    json!({"text": "Deep learning machine algorithms require large datasets for training.", "embeddings": [0.2, 0.3, 0.4, 0.5, 0.6]}),
    json!({"text": "The machine learning model showed excellent performance on the test set.", "embeddings": [0.3, 0.4, 0.5, 0.6, 0.7]}),
    json!({"text": "Natural language processing and machine learning go hand in hand.", "embeddings": [0.4, 0.5, 0.6, 0.7, 0.8]}),
    json!({"text": "This article discusses various learning machine techniques and applications.", "embeddings": [0.5, 0.6, 0.7, 0.8, 0.9]}),
];

client
    .insert(
        InsertRequest::builder()
            .collection_name(collection_name)
            .rows(data)
            .build()?,
    )
    .await?;

// Index the vector field and load the collection
client
    .create_index(
        CreateIndexRequest::builder()
            .collection_name(collection_name)
            .index_param(
                IndexParam::new()
                    .field_name("embeddings")
                    .index_name("embeddings_index")
                    .index_type(IndexType::AutoIndex)
                    .metric_type(MetricType::Cosine),
            )
            .build()?,
    )
    .await?;

client
    .load_collection(
        LoadCollectionRequest::builder()
            .collection_name(collection_name)
            .build()?,
    )
    .await?;
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
#include <utility>
#include <vector>

const std::string collection_name = "phrase_match_demo";

milvus::EntityRows data = {
    {{"text", "Machine learning is a subset of artificial intelligence that focuses on algorithms."}, {"embeddings", std::vector<float>{0.1, 0.2, 0.3, 0.4, 0.5}}},
    {{"text", "Deep learning machine algorithms require large datasets for training."}, {"embeddings", std::vector<float>{0.2, 0.3, 0.4, 0.5, 0.6}}},
    {{"text", "The machine learning model showed excellent performance on the test set."}, {"embeddings", std::vector<float>{0.3, 0.4, 0.5, 0.6, 0.7}}},
    {{"text", "Natural language processing and machine learning go hand in hand."}, {"embeddings", std::vector<float>{0.4, 0.5, 0.6, 0.7, 0.8}}},
    {{"text", "This article discusses various learning machine techniques and applications."}, {"embeddings", std::vector<float>{0.5, 0.6, 0.7, 0.8, 0.9}}}
};

milvus::InsertResponse response;
auto status = client->Insert(milvus::InsertRequest()
                                .WithCollectionName(collection_name)
                                .WithRowsData(std::move(data)),
                            response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Index the vector field and load the collection
milvus::IndexDesc embeddings_index("embeddings", "embeddings_index", milvus::IndexType::AUTOINDEX, milvus::MetricType::COSINE);
status = client->CreateIndex(milvus::CreateIndexRequest()
                                .WithCollectionName(collection_name)
                                .AddIndex(std::move(embeddings_index)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->LoadCollection(milvus::LoadCollectionRequest().WithCollectionName(collection_name));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Insert sample data with text containing "machine learning" phrases
const COLLECTION_NAME = "phrase_match_demo";

const sampleData = [
  {
    text: "Machine learning is a subset of artificial intelligence that focuses on algorithms.",
    embeddings: [0.1, 0.2, 0.3, 0.4, 0.5],
  },
  {
    text: "Deep learning machine algorithms require large datasets for training.",
    embeddings: [0.2, 0.3, 0.4, 0.5, 0.6],
  },
  {
    text: "The machine learning model showed excellent performance on the test set.",
    embeddings: [0.3, 0.4, 0.5, 0.6, 0.7],
  },
  {
    text: "Natural language processing and machine learning go hand in hand.",
    embeddings: [0.4, 0.5, 0.6, 0.7, 0.8],
  },
  {
    text: "This article discusses various learning machine techniques and applications.",
    embeddings: [0.5, 0.6, 0.7, 0.8, 0.9],
  },
];

await client.insert({
  collection_name: COLLECTION_NAME,
  data: sampleData,
});

// Create an index on the vector field and load the collection
await client.createIndex({
  collection_name: COLLECTION_NAME,
  field_name: "embeddings",
  index_type: "AUTOINDEX",
  index_name: "embeddings_index",
  metric_type: "COSINE",
});

await client.loadCollection({
  collection_name: COLLECTION_NAME,
});
```

```csharp
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

const string COLLECTION_NAME = "phrase_match_demo";

// Insert sample data with text containing "machine learning" phrases
await client.InsertAsync(new InsertReq
{
    CollectionName = COLLECTION_NAME,
    RowsData =
    [
        new Dictionary<string, object?> { ["text"] = "Machine learning is a subset of artificial intelligence that focuses on algorithms.", ["embeddings"] = new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f } },
        new Dictionary<string, object?> { ["text"] = "Deep learning machine algorithms require large datasets for training.", ["embeddings"] = new[] { 0.2f, 0.3f, 0.4f, 0.5f, 0.6f } },
        new Dictionary<string, object?> { ["text"] = "The machine learning model showed excellent performance on the test set.", ["embeddings"] = new[] { 0.3f, 0.4f, 0.5f, 0.6f, 0.7f } },
        new Dictionary<string, object?> { ["text"] = "Natural language processing and machine learning go hand in hand.", ["embeddings"] = new[] { 0.4f, 0.5f, 0.6f, 0.7f, 0.8f } },
        new Dictionary<string, object?> { ["text"] = "This article discusses various learning machine techniques and applications.", ["embeddings"] = new[] { 0.5f, 0.6f, 0.7f, 0.8f, 0.9f } }
    ]
});

// Index the vector field and load the collection
await client.CreateIndexAsync(new CreateIndexReq
{
    CollectionName = COLLECTION_NAME,
    Indexes = new[] { new IndexParam("embeddings", "embeddings_index", IndexType.AutoIndex, MetricType.Cosine) }
});

await client.LoadCollectionAsync(new LoadCollectionReq { CollectionName = COLLECTION_NAME });
```

```bash
# Insert the data into the collection
curl -X POST "http://localhost:19530/v2/vectordb/entities/insert" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "phrase_match_demo",
    "data": [
      {
        "text": "Machine learning is a subset of artificial intelligence that focuses on algorithms.",
        "embeddings": [0.1, 0.2, 0.3, 0.4, 0.5]
      },
      {
        "text": "Deep learning machine algorithms require large datasets for training.",
        "embeddings": [0.2, 0.3, 0.4, 0.5, 0.6]
      },
      {
        "text": "The machine learning model showed excellent performance on the test set.",
        "embeddings": [0.3, 0.4, 0.5, 0.6, 0.7]
      },
      {
        "text": "Natural language processing and machine learning go hand in hand.",
        "embeddings": [0.4, 0.5, 0.6, 0.7, 0.8]
      },
      {
        "text": "This article discusses various learning machine techniques and applications.",
        "embeddings": [0.5, 0.6, 0.7, 0.8, 0.9]
      }
    ]
  }'

# Create an index on the vector field and load the collection
curl -X POST "http://localhost:19530/v2/vectordb/indexes/create" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "phrase_match_demo",
    "indexParams": [
      {
        "fieldName": "embeddings",
        "indexName": "embeddings_index",
        "metricType": "COSINE",
        "indexType": "AUTOINDEX"
      }
    ]
  }'

curl -X POST "http://localhost:19530/v2/vectordb/collections/load" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer root:Milvus" \
  -H "Request-Timeout: 10" \
  -d '{
    "collectionName": "phrase_match_demo"
  }'
```

</details>

## Use phrase match

Once you've enabled match for a `VARCHAR` field in your collection schema, you can perform phrase matches using the `PHRASE_MATCH` expression.

<div class="alert note">

The `PHRASE_MATCH` expression is case-insensitive. You can use either `PHRASE_MATCH` or `phrase_match`.

</div>

### PHRASE_MATCH expression syntax

Use the `PHRASE_MATCH` expression to specify the field, phrase, and optional flexibility (`slop`) when searching. The syntax is:

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
PHRASE_MATCH(field_name, phrase, slop)
```

```java
String filter = "PHRASE_MATCH(text, 'machine learning')";
```

```go
PHRASE_MATCH(field_name, phrase, slop)
```

```rust
let filter = "PHRASE_MATCH(text, 'machine learning')";
```

```cpp
const auto filter = R"(PHRASE_MATCH(text, 'machine learning'))";
```

```javascript
PHRASE_MATCH(field_name, phrase, slop)
```

```csharp
string filter = "PHRASE_MATCH(text, 'machine learning')";
```

```bash
# restful
export filter="PHRASE_MATCH(field_name, phrase, slop)"
```

- `field_name`**:** The name of the `VARCHAR` field on which you perform phrase matches.

- `phrase`**:** The exact phrase to search for.

- `slop` (optional)**:** An integer specifying the maximum number of positions allowed in matching tokens.

    - `0` (default): Matches exact phrases only. Example: A filter for **"machine learning"** will match **"machine learning"** exactly, but not **"machine boosts learning"** or **"learning machine"**.

    - `1`: Allows minor variation, such as one extra term or minor shift in position. Example: A filter for **"machine learning"** will match **"machine boosts learning"** (one token between **"machine"** and **"learning"**) but not **"learning machine"** (terms reversed).

    - `2`: Allows more flexibility, including reversed term order or up to two tokens in between. Example: A filter for **"machine learning"** will match **"learning machine"** (terms reversed) or **"machine quickly boosts learning"** (two tokens between **"machine"** and **"learning"**).

### Example dataset

Suppose you have a collection named **tech_articles** containing the following five entities:

<table>
   <tr>
     <th><p><code>doc_id</code></p></th>
     <th><p><code>text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Learning a machine-based approach is vital for modern AI progress"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
   <tr>
     <td><p>4</p></td>
     <td><p>"Machine swiftly improves model performance for ongoing learning"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Learning advanced machine algorithms expands AI capabilities"</p></td>
   </tr>
</table>

The query and search examples below use this dataset. The runnable example in [Create the collection](#create-the-collection) inserts its own rows into a separate `phrase_match_demo` collection, so its printed output differs from the expected results below.

### Query with phrase match

When using the `query()` method, **PHRASE_MATCH** acts as a scalar filter. Only documents that contain the specified phrase (subject to the allowed slop) are returned.

#### Example: slop = 0 (exact match)

This example returns documents containing the exact phrase **"machine learning"** without any extra tokens in between.

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
# Match documents containing exactly "machine learning"
filter = "PHRASE_MATCH(text, 'machine learning')"

result = client.query(
    collection_name="tech_articles",
    filter=filter,
    output_fields=["id", "text"]
)
```

```java
// Match documents containing exactly "machine learning"
String filter = "PHRASE_MATCH(text, 'machine learning')";

QueryResp queryResp = client.query(QueryReq.builder()
        .collectionName("tech_articles")
        .filter(filter)
        .outputFields(Arrays.asList("id", "text"))
        .build());
```

```go
// Match documents containing exactly "machine learning"
filter := "PHRASE_MATCH(text, 'machine learning')"

resultSet, err := client.Query(ctx, milvusclient.NewQueryOption("tech_articles").
    WithFilter(filter).
    WithOutputFields("id", "text"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
// Match documents containing exactly "machine learning"
let filter = "PHRASE_MATCH(text, 'machine learning')";

let result = client
    .query(
        QueryRequest::builder()
            .collection_name("tech_articles")
            .filter(filter)
            .output_fields(["id", "text"])
            .build()?,
    )
    .await?;
```

```cpp
// Match documents containing exactly "machine learning"
milvus::QueryResponse response;
auto status = client->Query(milvus::QueryRequest()
                                .WithCollectionName("tech_articles")
                                .WithFilter("PHRASE_MATCH(text, 'machine learning')")
                                .AddOutputField("id")
                                .AddOutputField("text"),
                            response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Match documents containing exactly "machine learning"
const filter = "PHRASE_MATCH(text, 'machine learning')";

const result = await client.query({
    collection_name: "tech_articles",
    filter: filter,
    output_fields: ["id", "text"],
});
```

```csharp
// Match documents containing exactly "machine learning"
string filter = "PHRASE_MATCH(text, 'machine learning')";

QueryResp result = await client.QueryAsync(new QueryReq
{
    CollectionName = "tech_articles",
    Expression = filter,
    Parameters = new QueryParameters { OutputFields = { "id", "text" } }
});
```

```bash
export filter="\"PHRASE_MATCH(text, 'machine learning')\""

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/query" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "tech_articles",
    "filter": '"$filter"',
    "outputFields": ["id", "text"]
}'
```

**Expected match results:**

<table>
   <tr>
     <th><p><code>doc_id</code></p></th>
     <th><p><code>text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
</table>

Only document 1 contains the exact phrase **"machine learning"** in the specified order with no additional tokens.

### Search with phrase match

In search operations, **PHRASE_MATCH** is used to filter documents before applying vector similarity ranking. This two-step approach first narrows the candidate set by textual matching and then re-ranks those candidates based on vector embeddings.

#### Example: slop = 1

Here, we allow a slop of 1. The filter is applied to documents that contain the phrase **"learning machine"** with slight flexibility.

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
# Example: Filter documents containing "learning machine" with slop=1
filter_slop1 = "PHRASE_MATCH(text, 'learning machine', 1)"

result_slop1 = client.search(
    collection_name="tech_articles",
    anns_field="embeddings",
    data=[query_vector],
    filter=filter_slop1,
    search_params={"params": {"nprobe": 10}},
    limit=10,
    output_fields=["id", "text"]
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

// Example: Filter documents containing "learning machine" with slop=1
String filter = "PHRASE_MATCH(text, 'learning machine', 1)";

Map<String, Object> searchParams = new HashMap<>();
searchParams.put("nprobe", 10);

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .annsField("embeddings")
        .data(Collections.singletonList(queryVector))
        .filter(filter)
        .searchParams(searchParams)
        .topK(10)
        .outputFields(Arrays.asList("id", "text"))
        .build());
```

```go
// Example: Filter documents containing "learning machine" with slop=1
filter := "PHRASE_MATCH(text, 'learning machine', 1)"

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "tech_articles", // collectionName
    10,              // limit
    []entity.Vector{entity.FloatVector(queryVector)},
).WithANNSField("embeddings").
    WithFilter(filter).
    WithSearchParam("nprobe", "10").
    WithOutputFields("id", "text"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
// Example: Filter documents containing "learning machine" with slop=1
let filter = "PHRASE_MATCH(text, 'learning machine', 1)";
let query_vector = vec![0.1f32, 0.2, 0.3, 0.4, 0.5];

let result = client
    .search(
        SearchRequest::builder()
            .collection_name("tech_articles")
            .vector_field("embeddings")
            .vectors(SearchVectors::Float(vec![query_vector]))
            .filter(filter)
            .limit(10)
            .output_fields(["id", "text"])
            .build()?,
    )
    .await?;
```

```cpp
// Example: Filter documents containing "learning machine" with slop=1
milvus::SearchResponse response;
auto status = client->Search(milvus::SearchRequest()
                                 .WithCollectionName("tech_articles")
                                 .WithAnnsField("embeddings")
                                 .AddFloatVector(query_vector)
                                 .WithFilter("PHRASE_MATCH(text, 'learning machine', 1)")
                                 .AddExtraParam("nprobe", "10")
                                 .WithLimit(10)
                                 .AddOutputField("id")
                                 .AddOutputField("text"),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Example: Filter documents containing "learning machine" with slop=1
const filter = "PHRASE_MATCH(text, 'learning machine', 1)";

const result = await client.search({
    collection_name: "tech_articles",
    anns_field: "embeddings",
    data: [query_vector],
    filter: filter,
    params: { nprobe: 10 },
    limit: 10,
    output_fields: ["id", "text"],
});
```

```csharp
// Example: Filter documents containing "learning machine" with slop=1
string filter = "PHRASE_MATCH(text, 'learning machine', 1)";

SearchResp result = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "embeddings",
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }],
    Limit = 10,
    Parameters = new SearchParameters
    {
        Expression = filter,
        OutputFields = { "id", "text" }
    }
});
```

```bash
export filter="\"PHRASE_MATCH(text, 'learning machine', 1)\""

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "tech_articles",
    "annsField": "embeddings",
    "data": [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    "filter": '"$filter"',
    "searchParams": {
        "params": {
            "nprobe": 10
        }
    },
    "limit": 10,
    "outputFields": ["id", "text"]
}'
```

**Match results:**

<table>
   <tr>
     <th><p><code>doc_id</code></p></th>
     <th><p><code>text</code></p></th>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Learning a machine-based approach is vital for modern AI progress"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Learning advanced machine algorithms expands AI capabilities"</p></td>
   </tr>
</table>

#### Example: slop = 2

This example allows a slop of 2, meaning that up to two extra tokens (or reversed terms) are allowed between the words **"machine"** and **"learning"**.

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
# Example: Filter documents containing "machine learning" with slop=2
filter_slop2 = "PHRASE_MATCH(text, 'machine learning', 2)"

result_slop2 = client.search(
    collection_name="tech_articles",
    anns_field="embeddings",             # Vector field name
    data=[query_vector],                 # Query vector
    filter=filter_slop2,                 # Filter expression
    search_params={"params": {"nprobe": 10}},
    limit=10,                            # Maximum results to return
    output_fields=["id", "text"]
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

// Example: Filter documents containing "machine learning" with slop=2
String filter = "PHRASE_MATCH(text, 'machine learning', 2)";

Map<String, Object> searchParams = new HashMap<>();
searchParams.put("nprobe", 10);

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .annsField("embeddings")            // Vector field name
        .data(Collections.singletonList(queryVector)) // Query vector
        .filter(filter)                     // Filter expression
        .searchParams(searchParams)
        .topK(10)                           // Maximum results to return
        .outputFields(Arrays.asList("id", "text"))
        .build());
```

```go
// Example: Filter documents containing "machine learning" with slop=2
filter := "PHRASE_MATCH(text, 'machine learning', 2)"

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "tech_articles", // collectionName
    10,              // limit, maximum results to return
    []entity.Vector{entity.FloatVector(queryVector)}, // query vector
).WithANNSField("embeddings"). // vector field name
    WithFilter(filter).        // filter expression
    WithSearchParam("nprobe", "10").
    WithOutputFields("id", "text"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
// Example: Filter documents containing "machine learning" with slop=2
let filter = "PHRASE_MATCH(text, 'machine learning', 2)";
let query_vector = vec![0.1f32, 0.2, 0.3, 0.4, 0.5];

let result = client
    .search(
        SearchRequest::builder()
            .collection_name("tech_articles")
            .vector_field("embeddings")     // Vector field name
            .vectors(SearchVectors::Float(vec![query_vector])) // Query vector
            .filter(filter)                 // Filter expression
            .limit(10)                      // Maximum results to return
            .output_fields(["id", "text"])
            .build()?,
    )
    .await?;
```

```cpp
// Example: Filter documents containing "machine learning" with slop=2
milvus::SearchResponse response;
auto status = client->Search(milvus::SearchRequest()
                                 .WithCollectionName("tech_articles")
                                 .WithAnnsField("embeddings") // Vector field name
                                 .AddFloatVector(query_vector) // Query vector
                                 .WithFilter("PHRASE_MATCH(text, 'machine learning', 2)") // Filter expression
                                 .AddExtraParam("nprobe", "10")
                                 .WithLimit(10) // Maximum results to return
                                 .AddOutputField("id")
                                 .AddOutputField("text"),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Example: Filter documents containing "machine learning" with slop=2
const filter = "PHRASE_MATCH(text, 'machine learning', 2)";

const result = await client.search({
    collection_name: "tech_articles",
    anns_field: "embeddings", // Vector field name
    data: [query_vector], // Query vector
    filter: filter, // Filter expression
    params: { nprobe: 10 },
    limit: 10, // Maximum results to return
    output_fields: ["id", "text"],
});
```

```csharp
// Example: Filter documents containing "machine learning" with slop=2
string filter = "PHRASE_MATCH(text, 'machine learning', 2)";

SearchResp result = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "embeddings",          // Vector field name
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }], // Query vector
    Limit = 10,                              // Maximum results to return
    Parameters = new SearchParameters
    {
        Expression = filter,                 // Filter expression
        OutputFields = { "id", "text" }
    }
});
```

```bash
export filter="\"PHRASE_MATCH(text, 'machine learning', 2)\""

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "tech_articles",
    "annsField": "embeddings",
    "data": [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    "filter": '"$filter"',
    "searchParams": {
        "params": {
            "nprobe": 10
        }
    },
    "limit": 10,
    "outputFields": ["id", "text"]
}'
```

**Match results:**

<table>
   <tr>
     <th><p><code>doc_id</code></p></th>
     <th><p><code>text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
</table>

#### Example: slop = 3

In this example, a slop of 3 provides even more flexibility. The filter searches for **"machine learning"** with up to three token positions allowed between the words.

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
# Example: Filter documents containing "machine learning" with slop=3
filter_slop3 = "PHRASE_MATCH(text, 'machine learning', 3)"

result_slop3 = client.search(
    collection_name="tech_articles",
    anns_field="embeddings",             # Vector field name
    data=[query_vector],                 # Query vector
    filter=filter_slop3,                 # Filter expression
    search_params={"params": {"nprobe": 10}},
    limit=10,                            # Maximum results to return
    output_fields=["id", "text"]
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

// Example: Filter documents containing "machine learning" with slop=3
String filter = "PHRASE_MATCH(text, 'machine learning', 3)";

Map<String, Object> searchParams = new HashMap<>();
searchParams.put("nprobe", 10);

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName("tech_articles")
        .annsField("embeddings")            // Vector field name
        .data(Collections.singletonList(queryVector)) // Query vector
        .filter(filter)                     // Filter expression
        .searchParams(searchParams)
        .topK(10)                           // Maximum results to return
        .outputFields(Arrays.asList("id", "text"))
        .build());
```

```go
// Example: Filter documents containing "machine learning" with slop=3
filter := "PHRASE_MATCH(text, 'machine learning', 3)"

resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    "tech_articles", // collectionName
    10,              // limit, maximum results to return
    []entity.Vector{entity.FloatVector(queryVector)}, // query vector
).WithANNSField("embeddings"). // vector field name
    WithFilter(filter).        // filter expression
    WithSearchParam("nprobe", "10").
    WithOutputFields("id", "text"))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```rust
// Example: Filter documents containing "machine learning" with slop=3
let filter = "PHRASE_MATCH(text, 'machine learning', 3)";
let query_vector = vec![0.1f32, 0.2, 0.3, 0.4, 0.5];

let result = client
    .search(
        SearchRequest::builder()
            .collection_name("tech_articles")
            .vector_field("embeddings")     // Vector field name
            .vectors(SearchVectors::Float(vec![query_vector])) // Query vector
            .filter(filter)                 // Filter expression
            .limit(10)                      // Maximum results to return
            .output_fields(["id", "text"])
            .build()?,
    )
    .await?;
```

```cpp
// Example: Filter documents containing "machine learning" with slop=3
milvus::SearchResponse response;
auto status = client->Search(milvus::SearchRequest()
                                 .WithCollectionName("tech_articles")
                                 .WithAnnsField("embeddings") // Vector field name
                                 .AddFloatVector(query_vector) // Query vector
                                 .WithFilter("PHRASE_MATCH(text, 'machine learning', 3)") // Filter expression
                                 .AddExtraParam("nprobe", "10")
                                 .WithLimit(10) // Maximum results to return
                                 .AddOutputField("id")
                                 .AddOutputField("text"),
                             response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
// Example: Filter documents containing "machine learning" with slop=3
const filter = "PHRASE_MATCH(text, 'machine learning', 3)";

const result = await client.search({
    collection_name: "tech_articles",
    anns_field: "embeddings", // Vector field name
    data: [query_vector], // Query vector
    filter: filter, // Filter expression
    params: { nprobe: 10 },
    limit: 10, // Maximum results to return
    output_fields: ["id", "text"],
});
```

```csharp
// Example: Filter documents containing "machine learning" with slop=3
string filter = "PHRASE_MATCH(text, 'machine learning', 3)";

SearchResp result = await client.SearchAsync(new SearchReq
{
    CollectionName = "tech_articles",
    VectorFieldName = "embeddings",          // Vector field name
    Vectors = [new[] { 0.1f, 0.2f, 0.3f, 0.4f, 0.5f }], // Query vector
    Limit = 10,                              // Maximum results to return
    Parameters = new SearchParameters
    {
        Expression = filter,                 // Filter expression
        OutputFields = { "id", "text" }
    }
});
```

```bash
export filter="\"PHRASE_MATCH(text, 'machine learning', 3)\""

export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
--header "Request-Timeout: 10" \
-d '{
    "collectionName": "tech_articles",
    "annsField": "embeddings",
    "data": [[0.19886812562848388, 0.06023560599112088, 0.6976963061752597, 0.2614474506242501, 0.838729485096104]],
    "filter": '"$filter"',
    "searchParams": {
        "params": {
            "nprobe": 10
        }
    },
    "limit": 10,
    "outputFields": ["id", "text"]
}'
```

**Match results:**

<table>
   <tr>
     <th><p><code>doc_id</code></p></th>
     <th><p><code>text</code></p></th>
   </tr>
   <tr>
     <td><p>1</p></td>
     <td><p>"Machine learning boosts efficiency in large-scale data analysis"</p></td>
   </tr>
   <tr>
     <td><p>2</p></td>
     <td><p>"Learning a machine-based approach is vital for modern AI progress"</p></td>
   </tr>
   <tr>
     <td><p>3</p></td>
     <td><p>"Deep learning machine architectures optimize computational loads"</p></td>
   </tr>
   <tr>
     <td><p>5</p></td>
     <td><p>"Learning advanced machine algorithms expands AI capabilities"</p></td>
   </tr>
</table>

## Considerations

- Enabling phrase matching for a field triggers the creation of an inverted index, which consumes storage resources. Consider storage impact when deciding to enable this feature, as it varies based on text size, unique tokens, and the analyzer used.

- Once you've defined an analyzer in your schema, its settings become permanent for that collection. If you decide that a different analyzer would better suit your needs, you may consider dropping the existing collection and creating a new one with the desired analyzer configuration.

- Phrase match performance depends on how text is tokenized. Before applying an analyzer to your entire collection, use the `run_analyzer` method to review the tokenization output. For more information, refer to [Example use](analyzer-overview.md#Example-use).

- Escape rules in `filter` expressions:

    - Characters enclosed in double quotes or single quotes within expressions are interpreted as string constants. If the string constant includes escape characters, the escape characters must be represented with escape sequence. For example, use `\\` to represent `\`, `\\t` to represent a tab `\t`, and `\\n` to represent a newline.

    - If a string constant is enclosed by single quotes, a single quote within the constant should be represented as `\\'` while a double quote can be represented as either `"` or `\\"`. Example: `'It\\'s milvus'`.

    - If a string constant is enclosed by double quotes, a double quote within the constant should be represented as `\\"` while a single quote can be represented as either `'` or `\\'`. Example: `"He said \\"Hi\\""`.
