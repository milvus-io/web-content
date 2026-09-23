---
id: text.md
title: "Text Field"
summary: "TEXT is a scalar field type for storing document text, passages, and other long text content in Milvus."
beta: Milvus 3.0.x
---

# Text Field

In AI search applications, vector search helps you find semantically similar entities, but the application often also needs the original source text behind each match. An LLM or agent can use that text as context to read, cite, summarize, or include the result in a prompt.

Milvus provides the `TEXT` scalar field type for storing long source text directly with entities. Typical values include passages, long documents, article bodies, tickets, and logs. Unlike `VARCHAR`, which requires a fixed `max_length`, `TEXT` does not require you to set a maximum byte length in the collection schema.

To define a `TEXT` field, set `datatype` to `DataType.TEXT`.

<div class="alert note">

This feature requires Storage V3. For enablement instructions and compatibility considerations, see [Storage V3](storage-v3.md).

</div>


[`common.storage.useLoonFFI`](configure_common.md#commonstorageuseLoonFFI) defaults to `false`, which means Storage V3 is disabled by default. Before creating a collection that contains a `TEXT` field, set this parameter to `true`; otherwise, Milvus rejects the collection schema.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
schema.add_field(
    field_name="content",
    # highlight-next-line
    datatype=DataType.TEXT,
)
```

```java
schema.addField(AddFieldReq.builder()
        .fieldName("content")
        // highlight-next-line
        .dataType(DataType.Text)
        .build());
```

```go
schema.WithField(entity.NewField().
    WithName("content").
    // highlight-next-line
    WithDataType(entity.FieldTypeText),
)
```

```javascript
const schema = [
  {
    name: "content",
    // highlight-next-line
    data_type: DataType.Text,
  },
];
```

```bash
export schema='{
    "autoId": false,
    "enableDynamicField": false,
    "fields": [
        {
            "fieldName": "content",
            "dataType": "Text"
        }
    ]
}'
```

```cpp
// highlight-next-line
schema->AddField(milvus::FieldSchema("content", milvus::DataType::TEXT));
```

After the field is defined, each entity can include a string value in that field. You insert `TEXT` values like other scalar fields and return them from query or search results by listing the field in `output_fields`.

<div class="alert note">

`TEXT` fields support null values. To enable this feature, set `nullable` to `True`. For details, refer to [Nullable Field](nullable-and-default.md).

</div>

## Limits

- A `TEXT` field cannot be a primary field, partition key, or clustering key.
- `TEXT` cannot be used as the element type of an `ARRAY` field, including a scalar subfield in a `StructArray`.
- In Milvus 3.0.0, `TEXT` fields do not support default values.
- In Milvus 3.0.0, `TEXT` fields are not supported in external collections.
- Users cannot create a scalar index on a `TEXT` field. When `enable_match=True`, Milvus builds a system-managed text index for text matching. This internal index is not a user-created scalar index.
- General scalar filter operators cannot be applied directly to a `TEXT` field. These include comparison operators such as `==` and `!=`, range operators such as `>`, `>=`, `<`, and `<=`, as well as `IN`, `LIKE`, regex operators (`=~` and `!~`), and `IS NULL` or `IS NOT NULL`. To filter by analyzed terms, define the field with `enable_analyzer=True` and `enable_match=True`, and use [`TEXT_MATCH` or `TEXT_MATCH_FUZZY`](keyword-match.md). For relevance-ranked full-text retrieval, use BM25.
- In Milvus 3.0.0, a BM25 or MinHash Function that uses a `TEXT` field as input must be defined when the collection is created. It cannot be added later through `add_function_field` or `AlterCollectionSchema`, even if the existing collection is empty, because Milvus cannot backfill the Function output from stored `TEXT` values. To add such a Function to an existing collection, use a `VARCHAR` input field, or recreate the collection with the Function included in its schema. For details about adding a Function and its generated vector field, refer to [Alter Collection Schema](add-fields-to-an-existing-collection.md#add-a-function-and-its-generated-vector-field--milvus-30x).
- Text Embedding Functions also must be defined when the collection is created. Milvus 3.0.0 does not support adding them at runtime.

## Choose TEXT or VARCHAR

`TEXT` and `VARCHAR` both store string values, but they support different application needs. Use `VARCHAR` for short, bounded metadata that identifies, categorizes, or filters entities. Use `TEXT` for longer source content that gives an LLM or agent enough context to read, cite, summarize, or build a prompt.

| Aspect                | `VARCHAR`                                                                                                                  | `TEXT`                                                                                                                                                 |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Best for              | Short metadata used to identify, categorize, or filter entities, such as `title`, `tag`, `category`, or `external_id`.     | Longer source content used by LLM or agent workflows, such as `content`, `passage`, `article_body`, or `log_message`.                                  |
| Length setting        | Requires `max_length`, which defines the maximum number of bytes the field can store. The maximum value is `65,535` bytes. If a value may exceed this limit, use `TEXT`. | Does not require `max_length`, so the schema does not need a fixed byte limit for the text value. |
| Storage behavior      | Stores each value within the field's configured `max_length`.                                                              | Uses automatic storage selection for larger text values. For details, see [How Milvus stores large TEXT values](#how-milvus-stores-large-text-values). |
| Primary field support | Can be used as a primary field.                                                                                            | Cannot be used as a primary field.                                                                                                                     |
| Filtering             | Use for short string metadata that needs to appear in filter expressions, such as `category == "news"` or `tag in ["ai", "database"]`. | Does not support general scalar filter operators. Use match-enabled text operators for analyzed-term filtering, or BM25 for relevance-ranked full-text retrieval. |

For details about `VARCHAR` fields, refer to [VarChar Field](string.md).

## How Milvus stores large TEXT values

<details>

<summary>Expand to see how it works</summary>

When you insert an entity, the string you provide for a `TEXT` field is the `TEXT` value. Milvus compares the size of that value with [dataNode.text.inlineThreshold](configure_datanode.md#dataNodetextinlineThreshold), which is `65,536` bytes by default, and then chooses one of two internal storage paths.

![Large text storage](../../../../assets/text-large-storage-flow.png)

- **Inline storage**: If a `TEXT` value is smaller than `dataNode.text.inlineThreshold`, Milvus stores the original text value directly in the `TEXT` field data.
- **LOB storage**: If a `TEXT` value is greater than or equal to `dataNode.text.inlineThreshold`, Milvus treats the value as a large object and stores the original text separately in object storage, such as MinIO. The `TEXT` field data stores an internal reference to the separately stored text. When the `TEXT` field is requested in query or search results, Milvus uses the reference to retrieve and return the original text.

This storage selection is internal. You insert, query, and search the `TEXT` field in the same way regardless of which storage path Milvus uses. To tune the threshold or related storage, compaction, and garbage-collection behavior, refer to [dataNode-related Configurations](configure_datanode.md) and [dataCoord-related Configurations](configure_datacoord.md).

If your deployment uses object storage, large `TEXT` values may appear as Milvus-managed objects under paths such as `lobs/...`. These objects are implementation details and should not be moved, copied, or deleted manually. After you delete entities, drop partitions, or compact data, object storage usage may decrease only after Milvus garbage collection removes unreferenced large-object data after its safety window.

</details>

A common use of `TEXT` is Full Text Search with BM25. In this pattern, the `TEXT` field stores the original source content, and BM25 analyzes the text and generates sparse vectors for ranking keyword-based matches. Search results can then return the matched `TEXT` value as context for LLM or agent workflows. The following example shows how to use a `TEXT` field as the input field for BM25. To learn about Full Text Search concepts and query options, refer to [Full Text Search](full-text-search.md).

## Step 1: Create a collection with a TEXT field

The following example creates a collection with a `TEXT` field for source content and a sparse vector field for BM25-generated sparse vectors. The BM25 function converts the tokenized text from `content` into sparse vectors stored in `sparse`.

For BM25 full text search, the input `TEXT` field must set `enable_analyzer=True`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
from pymilvus import DataType, Function, FunctionType, MilvusClient

client = MilvusClient(uri="http://localhost:19530")
COLLECTION_NAME = "text_bm25_collection"

if client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

schema = client.create_schema(auto_id=False, enable_dynamic_field=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True)
# highlight-start
schema.add_field(
    field_name="content",
    datatype=DataType.TEXT,
    enable_analyzer=True,
)
# highlight-end
schema.add_field(field_name="sparse", datatype=DataType.SPARSE_FLOAT_VECTOR)

# highlight-start
bm25_function = Function(
    name="content_bm25",
    input_field_names=["content"],
    output_field_names=["sparse"],
    function_type=FunctionType.BM25,
)
schema.add_function(bm25_function)
# highlight-end
```

```java
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.collection.request.HasCollectionReq;

import java.util.Collections;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());
String COLLECTION_NAME = "text_bm25_collection";

if (client.hasCollection(HasCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .build())) {
    client.dropCollection(DropCollectionReq.builder()
            .collectionName(COLLECTION_NAME)
            .build());
}

CreateCollectionReq.CollectionSchema schema = CreateCollectionReq.CollectionSchema.builder()
        .enableDynamicField(false)
        .build();
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(false)
        .build());
// highlight-start
schema.addField(AddFieldReq.builder()
        .fieldName("content")
        .dataType(DataType.Text)
        .enableAnalyzer(true)
        .build());
// highlight-end
schema.addField(AddFieldReq.builder()
        .fieldName("sparse")
        .dataType(DataType.SparseFloatVector)
        .build());

// highlight-start
schema.addFunction(Function.builder()
        .name("content_bm25")
        .inputFieldNames(Collections.singletonList("content"))
        .outputFieldNames(Collections.singletonList("sparse"))
        .functionType(FunctionType.BM25)
        .build());
// highlight-end
```

```go
import (
    "context"
    "fmt"

    "github.com/milvus-io/milvus/client/v3/entity"
    "github.com/milvus-io/milvus/client/v3/index"
    "github.com/milvus-io/milvus/client/v3/milvusclient"
)

ctx, cancel := context.WithCancel(context.Background())
defer cancel()

client, err := milvusclient.New(ctx, &milvusclient.ClientConfig{
    Address: "localhost:19530",
})
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
defer client.Close(ctx)

collectionName := "text_bm25_collection"

has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
if has {
    err = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
    if err != nil {
        fmt.Println(err.Error())
        // handle error
    }
}

schema := entity.NewSchema().
    WithAutoID(false).
    WithDynamicFieldEnabled(false)
schema.WithField(entity.NewField().
    WithName("id").
    WithDataType(entity.FieldTypeInt64).
    WithIsPrimaryKey(true),
).WithField(entity.NewField().
    WithName("content").
    WithDataType(entity.FieldTypeText).
    WithEnableAnalyzer(true),
).WithField(entity.NewField().
    WithName("sparse").
    WithDataType(entity.FieldTypeSparseVector),
)

// highlight-start
bm25Function := entity.NewFunction().
    WithName("content_bm25").
    WithInputFields("content").
    WithOutputFields("sparse").
    WithType(entity.FunctionTypeBM25)
schema.WithFunction(bm25Function)
// highlight-end
```

```javascript
import { MilvusClient, DataType, FunctionType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });
const COLLECTION_NAME = "text_bm25_collection";

const has = await client.hasCollection({ collection_name: COLLECTION_NAME });
if (has.value) {
  await client.dropCollection({ collection_name: COLLECTION_NAME });
}

const schema = [
  {
    name: "id",
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: false,
  },
  // highlight-start
  {
    name: "content",
    data_type: DataType.Text,
    enable_analyzer: true,
  },
  // highlight-end
  {
    name: "sparse",
    data_type: DataType.SparseFloatVector,
  },
];

// highlight-start
const functions = [
  {
    name: "content_bm25",
    type: FunctionType.BM25,
    input_field_names: ["content"],
    output_field_names: ["sparse"],
    params: {},
  },
];
// highlight-end
```

```bash
export CLUSTER_ENDPOINT="http://localhost:19530"
export TOKEN="root:Milvus"

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/drop" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "text_bm25_collection"
}'

export schema='{
    "autoId": false,
    "enableDynamicField": false,
    "fields": [
        {
            "fieldName": "id",
            "dataType": "Int64",
            "isPrimary": true
        },
        {
            "fieldName": "content",
            "dataType": "Text",
            "elementTypeParams": {
                "enable_analyzer": true
            }
        },
        {
            "fieldName": "sparse",
            "dataType": "SparseFloatVector"
        }
    ],
    "functions": [
        {
            "name": "content_bm25",
            "type": "BM25",
            "inputFieldNames": ["content"],
            "outputFieldNames": ["sparse"],
            "params": {}
        }
    ]
}'
```

```cpp
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

const std::string collection_name = "text_bm25_collection";

milvus::HasCollectionResponse has_response;
status = client->HasCollection(
    milvus::HasCollectionRequest().WithCollectionName(collection_name),
    has_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
if (has_response.Has()) {
    status = client->DropCollection(
        milvus::DropCollectionRequest().WithCollectionName(collection_name));
    if (!status.IsOk()) {
        std::cout << status.Message() << std::endl;
    }
}

milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField({"id", milvus::DataType::INT64, "", true});
// highlight-start
schema->AddField(milvus::FieldSchema("content", milvus::DataType::TEXT).EnableAnalyzer(true));
// highlight-end
schema->AddField(milvus::FieldSchema("sparse", milvus::DataType::SPARSE_FLOAT_VECTOR));

// highlight-start
milvus::FunctionPtr function =
    std::make_shared<milvus::Function>("content_bm25", milvus::FunctionType::BM25);
function->AddInputFieldName("content");
function->AddOutputFieldName("sparse");
schema->AddFunction(function);
// highlight-end
```

## Step 2: Create a sparse vector index

Create an index on the sparse vector field generated by the BM25 function. The metric type must be set to `BM25`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
index_params = client.prepare_index_params()
# highlight-start
index_params.add_index(
    field_name="sparse",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="BM25",
    params={
        "inverted_index_algo": "DAAT_MAXSCORE",
        "bm25_k1": 1.2,
        "bm25_b": 0.75,
    },
)
# highlight-end

client.create_collection(
    collection_name=COLLECTION_NAME,
    schema=schema,
    index_params=index_params,
)
```

```java
import io.milvus.v2.common.IndexParam;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

List<IndexParam> indexParams = new ArrayList<>();
Map<String, Object> extraParams = new HashMap<>();
// highlight-start
extraParams.put("inverted_index_algo", "DAAT_MAXSCORE");
extraParams.put("bm25_k1", 1.2);
extraParams.put("bm25_b", 0.75);
indexParams.add(IndexParam.builder()
        .fieldName("sparse")
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(extraParams)
        .build());
// highlight-end

client.createCollection(CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());
```

```go
// highlight-start
indexOption := milvusclient.NewCreateIndexOption(collectionName, "sparse",
    index.NewSparseInvertedIndex(entity.MetricType(entity.BM25), 0))
indexOption.WithExtraParam("inverted_index_algo", "DAAT_MAXSCORE")
indexOption.WithExtraParam("bm25_k1", 1.2)
indexOption.WithExtraParam("bm25_b", 0.75)
// highlight-end

err = client.CreateCollection(ctx,
    milvusclient.NewCreateCollectionOption(collectionName, schema).
        WithIndexOptions(indexOption))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
// highlight-start
const index_params = [
  {
    field_name: "sparse",
    index_type: "SPARSE_INVERTED_INDEX",
    metric_type: "BM25",
    params: {
      inverted_index_algo: "DAAT_MAXSCORE",
      bm25_k1: 1.2,
      bm25_b: 0.75,
    },
  },
];
// highlight-end

await client.createCollection({
  collection_name: COLLECTION_NAME,
  schema: schema,
  functions: functions,
  index_params: index_params,
});
```

```bash
# highlight-start
export indexParams='[
    {
        "fieldName": "sparse",
        "metricType": "BM25",
        "indexType": "SPARSE_INVERTED_INDEX",
        "params": {
            "inverted_index_algo": "DAAT_MAXSCORE",
            "bm25_k1": 1.2,
            "bm25_b": 0.75
        }
    }
]'
# highlight-end

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/create" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d "{
    \"collectionName\": \"text_bm25_collection\",
    \"schema\": $schema,
    \"indexParams\": $indexParams
}"
```

```cpp
// highlight-start
milvus::IndexDesc index_params("sparse", "", milvus::IndexType::SPARSE_INVERTED_INDEX,
                               milvus::MetricType::BM25);
index_params.AddExtraParam("inverted_index_algo", "DAAT_MAXSCORE");
index_params.AddExtraParam("bm25_k1", "1.2");
index_params.AddExtraParam("bm25_b", "0.75");
// highlight-end

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                      .WithCollectionName(collection_name)
                                      .WithCollectionSchema(schema)
                                      .AddIndex(std::move(index_params)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## Step 3: Insert TEXT data

Insert text directly into the `TEXT` field. Do not provide values for the `sparse` field. Milvus generates the sparse vectors internally by applying the BM25 function to `content`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
data = [
    {
        "id": 1,
        "content": "Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.",
    },
    {
        "id": 2,
        "content": "Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.",
    },
    {
        "id": 3,
        "content": "Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.",
    },
]

client.insert(collection_name=COLLECTION_NAME, data=data)
client.load_collection(collection_name=COLLECTION_NAME)
```

```java
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import io.milvus.v2.service.collection.request.LoadCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;

import java.util.Arrays;
import java.util.List;

Gson gson = new Gson();
List<JsonObject> data = Arrays.asList(
        gson.fromJson("{\"id\": 1, \"content\": \"Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.\"}", JsonObject.class),
        gson.fromJson("{\"id\": 2, \"content\": \"Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.\"}", JsonObject.class),
        gson.fromJson("{\"id\": 3, \"content\": \"Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.\"}", JsonObject.class)
);

client.insert(InsertReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(data)
        .build());
client.loadCollection(LoadCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .build());
```

```go
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithInt64Column("id", []int64{1, 2, 3}).
    WithTextColumn("content", []string{
        "Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.",
        "Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.",
        "Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.",
    }),
)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}

loadTask, err := client.LoadCollection(ctx, milvusclient.NewLoadCollectionOption(collectionName))
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
err = loadTask.Await(ctx)
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
const data = [
  {
    id: 1,
    content:
      "Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications.",
  },
  {
    id: 2,
    content:
      "Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text.",
  },
  {
    id: 3,
    content:
      "Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting.",
  },
];

await client.insert({
  collection_name: COLLECTION_NAME,
  data: data,
});

await client.loadCollection({
  collection_name: COLLECTION_NAME,
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/insert" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "text_bm25_collection",
    "data": [
        {"id": 1, "content": "Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications."},
        {"id": 2, "content": "Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text."},
        {"id": 3, "content": "Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting."}
    ]
}'

curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/collections/load" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "text_bm25_collection"
}'
```

```cpp
milvus::EntityRows data = {
    {{"id", 1},
     {"content", "Milvus stores vector embeddings and scalar fields in collections. It supports vector search, full text search, and metadata filtering for retrieval applications."}},
    {{"id", 2},
     {"content", "Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text."}},
    {{"id", 3},
     {"content", "Operational logs and support tickets often contain long natural-language text. TEXT fields can store these values without a fixed max_length setting."}},
};

milvus::InsertResponse insert_response;
status = client->Insert(milvus::InsertRequest()
                            .WithCollectionName(collection_name)
                            .WithRowsData(std::move(data)),
                        insert_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->LoadCollection(
    milvus::LoadCollectionRequest().WithCollectionName(collection_name));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## Step 4: Perform BM25 full text search

Use raw query text as the search data and search against the sparse vector field. Milvus converts the query text into a sparse vector, ranks matches with BM25, and returns the requested `TEXT` field in `output_fields`.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
results = client.search(
    collection_name=COLLECTION_NAME,
    # highlight-start
    data=["how does Milvus store source text for retrieval"],
    anns_field="sparse",
    limit=2,
    output_fields=["content"],
    # highlight-end
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.response.SearchResp;

SearchResp searchResp = client.search(SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        // highlight-start
        .data(Collections.singletonList(new EmbeddedText("how does Milvus store source text for retrieval")))
        .annsField("sparse")
        .topK(2)
        .outputFields(Collections.singletonList("content"))
        // highlight-end
        .build());
```

```go
resultSets, err := client.Search(ctx, milvusclient.NewSearchOption(
    collectionName, // collectionName
    2,              // limit
    // highlight-start
    []entity.Vector{entity.Text("how does Milvus store source text for retrieval")},
).WithANNSField("sparse").
    WithOutputFields("content"))
// highlight-end
if err != nil {
    fmt.Println(err.Error())
    // handle error
}
```

```javascript
const results = await client.search({
  collection_name: COLLECTION_NAME,
  // highlight-start
  data: ["how does Milvus store source text for retrieval"],
  anns_field: "sparse",
  limit: 2,
  output_fields: ["content"],
  // highlight-end
});
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "text_bm25_collection",
    "data": [
        "how does Milvus store source text for retrieval"
    ],
    "annsField": "sparse",
    "limit": 2,
    "outputFields": [
        "content"
    ]
}'
```

```cpp
milvus::SearchResponse search_response;
status = client->Search(milvus::SearchRequest()
                            .WithCollectionName(collection_name)
                            // highlight-start
                            .AddEmbeddedText("how does Milvus store source text for retrieval")
                            .WithAnnsField("sparse")
                            .WithLimit(2)
                            .AddOutputField("content"),
                            // highlight-end
                        search_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

## Step 5: Read the returned TEXT values

Each search hit includes the BM25 score and the original `TEXT` value.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#go">Go</a>
    <a href="#javascript">NodeJS</a>
    <a href="#bash">cURL</a>
    <a href="#cpp">C++</a>
</div>

```python
for hit in results[0]:
    print(f"id: {hit['id']}, score: {hit['distance']}")
    print(hit["entity"]["content"])
```

```java
List<List<SearchResp.SearchResult>> searchResults = searchResp.getSearchResults();
for (SearchResp.SearchResult hit : searchResults.get(0)) {
    System.out.printf("id: %s, score: %f%n", hit.getId(), hit.getScore());
    System.out.println(hit.getEntity().get("content"));
}
```

```go
for _, resultSet := range resultSets {
    contentColumn := resultSet.GetColumn("content")
    for i := 0; i < resultSet.ResultCount; i++ {
        id, _ := resultSet.IDs.Get(i)
        content, _ := contentColumn.Get(i)
        fmt.Printf("id: %v, score: %f\n", id, resultSet.Scores[i])
        fmt.Println(content)
    }
}
```

```javascript
for (const hit of results.results) {
  console.log(`id: ${hit.id}, score: ${hit.score}`);
  console.log(hit.content);
}
```

```bash
curl --request POST \
--url "${CLUSTER_ENDPOINT}/v2/vectordb/entities/search" \
--header "Authorization: Bearer ${TOKEN}" \
--header "Content-Type: application/json" \
-d '{
    "collectionName": "text_bm25_collection",
    "data": [
        "how does Milvus store source text for retrieval"
    ],
    "annsField": "sparse",
    "limit": 2,
    "outputFields": [
        "content"
    ]
}'

# Each hit in the search response contains the primary key, the BM25 score, and the requested TEXT value:
# {
#     "code": 0,
#     "data": [
#         {
#             "id": 2,
#             "distance": 2.533,
#             "content": "Long documents are often split into passages before embedding. Store each passage in a TEXT field so search results can return the source text."
#         },
#         ...
#     ]
# }
```

```cpp
const auto& nq_results = search_response.Results().Results();
for (const auto& single : nq_results) {
    const auto& scores = single.Scores();
    milvus::EntityRows rows;
    single.OutputRows(rows);
    for (size_t i = 0; i < rows.size(); ++i) {
        std::cout << "id: " << rows[i]["id"] << ", score: " << scores[i] << std::endl;
        std::cout << rows[i]["content"].get<std::string>() << std::endl;
    }
}
```

For more information about BM25 functions, sparse vector indexes, and query syntax for full text search, refer to [Full Text Search](full-text-search.md).
