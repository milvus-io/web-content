---
id: text-highlighter.md
title: "Text Highlighter"
summary: "The Highlighter in Milvus annotates matched terms in text fields by wrapping them with customizable tags. Highlighting helps explain why a document matches, improves result readability, and supports rich rendering in search and RAG applications."
beta: Milvus 2.6.8+
---

# Text Highlighter

The Highlighter in Milvus annotates matched terms in text fields by wrapping them with customizable tags. Highlighting helps explain why a document matches, improves result readability, and supports rich rendering in search and RAG applications.

Highlighting is executed as a post-processing step on the final search result set. It does not affect candidate retrieval, filtering logic, ranking, or scoring.

The Highlighter provides three independent dimensions of control:

- **Which terms are highlighted**

    You can choose where highlighted terms come from. For example, highlight search terms used in **BM25 full text search**, or query terms specified in **text-based filtering expressions** (such as `TEXT_MATCH` conditions).

- **How highlighted terms are rendered**

    You can control how matched terms appear in the highlighting output by configuring the tags inserted before and after each match. For example, use simple markers like `{}` or HTML tags such as `<em></em>` for rich rendering.

- **How highlighted text is returned**

    You can control how highlighted results are returned as fragments, including where fragments start, how long they are, and how many fragments are returned.

The following sections walk through these scenarios.

## Search term highlighting in BM25 full text search

When you perform a BM25 full text search, you can highlight the **search terms** in the returned result to help explain why a document matches the query. To learn more about BM25 full text search, refer to [Full Text Search](full-text-search.md).

In this scenario, highlighted terms come directly from the search terms used in BM25 full text search. The Highlighter uses these terms to annotate matched text in the final result.

Assume the following content is stored in a text field:

```plaintext
Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
```

**Highlighter configuration**

To highlight search terms in BM25 full text search, create a `LexicalHighlighter` and enable search term highlighting for BM25 full text search:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
from pymilvus import LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],              # Tag inserted before each highlighted term
    post_tags=["}"],             # Tag inserted after each highlighted term
    highlight_search_text=True   # Enable search term highlighting for BM25 full text search
)
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import java.util.List;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("{"))          // Tag inserted before each highlighted term
        .postTags(List.of("}"))         // Tag inserted after each highlighted term
        .highlightSearchText(true)      // Enable search term highlighting for BM25 full text search
        .build();
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["{"],             // Tag inserted before each highlighted term
  post_tags: ["}"],            // Tag inserted after each highlighted term
  highlight_search_text: true, // Enable search term highlighting for BM25 full text search
};
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"{"})             // Tag inserted before each highlighted term
    .WithPostTags({"}"})            // Tag inserted after each highlighted term
    .WithHighlightSearchText(true); // Enable search term highlighting for BM25 full text search
```

In this example:

- `pre_tags` and `post_tags` control how highlighted text appears in the output. In this case, matched terms are wrapped by `{}` (for example, `{term}`). You can also provide multiple tags as a list (for example, `["<b>", "<i>"]`). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.

- `highlight_search_text=True` tells Milvus to use the search terms in BM25 full text search as the source of highlighted terms.

Once the Highlighter object is created, apply its configuration to your BM25 full text search request:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
results = client.search(
    ...,
    data=["BM25"],      # Search term used in BM25 full text search
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

```java
SearchResp results = client.search(SearchReq.builder()
        // ...
        .data(Collections.singletonList(new EmbeddedText("BM25"))) // Search term used in BM25 full text search
        // highlight-next-line
        .highlighter(highlighter) // Pass highlighter config here
        .build());
```

```javascript
const results = await client.search({
  // ...
  data: ["BM25"], // Search term used in BM25 full text search
  // highlight-next-line
  highlighter: highlighter, // Pass highlighter config here
});
```

```cpp
auto request = milvus::SearchRequest();
// ...
request.AddEmbeddedText("BM25"); // Search term used in BM25 full text search
// highlight-next-line
request.SetHighlighter(highlighter); // Pass highlighter config here
milvus::SearchResponse results;
auto status = client->Search(request, results);
```

**Highlighting output**

When highlighting is enabled, Milvus returns highlighted text in a dedicated `highlight` field. By default, highlighted output is returned as a fragment starting from the first matched term.

In this example, the search term is `"BM25"`, so it is highlighted in the returned result:

```json
{
    ...,
    "highlight": {
        "text": [
            "{BM25} for keyword relevance. Filters can narrow results."
        ]
    }
}
```

To control the position, length, and number of returned fragments, see [Return highlighted text as fragments](text-highlighter.md#Fragment-based-highlighting-output).

## Query term highlighting in filtering

In addition to highlighting search terms, you can highlight terms used in text-based filtering expressions.

<div class="alert note">

Currently, only the `TEXT_MATCH` filtering condition is supported for query term highlighting. To learn more, refer to [Text Match](keyword-match.md).

</div>

In this scenario, highlighted terms come from text-based filtering expressions. Filtering determines which documents match, while the Highlighter annotates the matched text spans.

Assume the following content is stored in a text field:

```plaintext
This document explains how text filtering works in Milvus.
```

**Highlighter configuration**

To highlight query terms used in filtering, create a `LexicalHighlighter` and define a `highlight_query` that corresponds to the filtering condition:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
from pymilvus import LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],              # Tag inserted before each highlighted term
    post_tags=["}"],             # Tag inserted after each highlighted term
    highlight_query=[{
        "type": "TextMatch",     # Text filtering type
        "field": "text",         # Target text field
        "text": "text filtering" # Terms to highlight
    }]
)
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import java.util.List;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("{"))          // Tag inserted before each highlighted term
        .postTags(List.of("}"))         // Tag inserted after each highlighted term
        .addHighlightQuery(new LexicalHighlighter.HighlightQuery(
                "TextMatch",  // Text filtering type
                "text",       // Target text field
                "text filtering")) // Terms to highlight
        .build();
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["{"],             // Tag inserted before each highlighted term
  post_tags: ["}"],            // Tag inserted after each highlighted term
  highlight_query: [{
    type: "TextMatch",         // Text filtering type
    field: "text",             // Target text field
    text: "text filtering"     // Terms to highlight
  }],
};
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"{"})                 // Tag inserted before each highlighted term
    .WithPostTags({"}"})                // Tag inserted after each highlighted term
    .AddHighlightQuery(
        "TextMatch",       // Text filtering type
        "text",            // Target text field
        "text filtering"); // Terms to highlight
```

In this configuration:

- `pre_tags` and `post_tags` control how highlighted text appears in the output. In this case, matched terms are wrapped by `{}` (for example, `{term}`). You can also provide multiple tags as a list (for example, `["<b>", "<i>"]`). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.

- `highlight_query` defines which filtering terms should be highlighted.

Once the Highlighter object is created, apply the same filtering expression and the highlighter configuration to your search request:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
results = client.search(
    ...,
    filter='TEXT_MATCH(text, "text filtering")',
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

```java
SearchResp results = client.search(SearchReq.builder()
        // ...
        .filter("TEXT_MATCH(text, \"text filtering\")")
        // highlight-next-line
        .highlighter(highlighter) // Pass highlighter config here
        .build());
```

```javascript
const results = await client.search({
  // ...
  filter: 'TEXT_MATCH(text, "text filtering")',
  // highlight-next-line
  highlighter: highlighter, // Pass highlighter config here
});
```

```cpp
auto request = milvus::SearchRequest();
// ...
request.SetFilter("TEXT_MATCH(text, \"text filtering\")");
// highlight-next-line
request.SetHighlighter(highlighter); // Pass highlighter config here
milvus::SearchResponse results;
auto status = client->Search(request, results);
```

**Highlighting output**

When query term highlighting is enabled for filtering, Milvus returns highlighted text in a dedicated `highlight` field. By default, highlighted output is returned as a fragment starting from the first matched term.

In this example, the first matched term is `"text"`, so the returned highlighted text starts from that position:

```json
{
    ...,
    "highlight": {
        "text": [
            "{text} {filtering} works in Milvus."
        ]
    }
}
```

To control the position, length, and number of returned fragments, see [Return highlighted text as fragments](text-highlighter.md#Fragment-based-highlighting-output).

## Fragment-based highlighting output

By default, Milvus returns highlighted text as fragments starting from the first matched term. Fragment-related settings allow you to further control how fragments are returned, without changing which terms are highlighted.

Assume the following content is stored in a text field:

```plaintext
Milvus supports full text search. Use BM25 for keyword relevance. Filters can narrow results.
```

**Highlighter configuration**

To control the shape of highlighted fragments, configure fragment-related options in the `LexicalHighlighter`:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
from pymilvus import LexicalHighlighter

highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
    fragment_offset=5,     # Number of characters to reserve before the first matched term
    fragment_size=60,      # Max. length of each fragment to return
    num_of_fragments=1     # Max. number of fragments to return
)
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import java.util.List;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("{"))
        .postTags(List.of("}"))
        .highlightSearchText(true)
        .fragmentOffset(5)     // Number of characters to reserve before the first matched term
        .fragmentSize(60)      // Max. length of each fragment to return
        .numOfFragments(1)     // Max. number of fragments to return
        .build();
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["{"],
  post_tags: ["}"],
  highlight_search_text: true,
  fragment_offset: 5,    // Number of characters to reserve before the first matched term
  fragment_size: 60,     // Max. length of each fragment to return
  num_of_fragments: 1,   // Max. number of fragments to return
};
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"{"})
    .WithPostTags({"}"})
    .WithHighlightSearchText(true)
    .WithFragmentOffset(5)     // Number of characters to reserve before the first matched term
    .WithFragmentSize(60)      // Max. length of each fragment to return
    .WithNumOfFragments(1);    // Max. number of fragments to return
```

In this configuration:

- `fragment_offset` reserves leading context before the first highlighted term.

- `fragment_size` limits how much text is included in each fragment.

- `num_of_fragments` controls how many fragments are returned.

Once the Highlighter object is created, apply the highlighter configuration to your search request:

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
results = client.search(
    ...,
    data=["BM25"],
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

```java
SearchResp results = client.search(SearchReq.builder()
        // ...
        .data(Collections.singletonList(new EmbeddedText("BM25"))) // Search term used in BM25 full text search
        // highlight-next-line
        .highlighter(highlighter) // Pass highlighter config here
        .build());
```

```javascript
const results = await client.search({
  // ...
  data: ["BM25"], // Search term used in BM25 full text search
  // highlight-next-line
  highlighter: highlighter, // Pass highlighter config here
});
```

```cpp
auto request = milvus::SearchRequest();
// ...
request.AddEmbeddedText("BM25"); // Search term used in BM25 full text search
// highlight-next-line
request.SetHighlighter(highlighter); // Pass highlighter config here
milvus::SearchResponse results;
auto status = client->Search(request, results);
```

**Highlighting output**

With fragment-based highlighting enabled, Milvus returns highlighted text as fragments in the `highlight` field:

```json
{
    ...,
    "highlight": {
        "text": [
            "Use {BM25} for keyword relevance. Filters can narrow results."
        ]
    }
}
```

In this output:

- The fragment does not start exactly at `{BM25}` because `fragment_offset` is set.

- Only one fragment is returned because `num_of_fragments` is 1.

- The length of the fragment is capped by `fragment_size`.

## Examples

### Preparation

Before using the highlighter, ensure your collection is properly configured.

The example below creates a collection that supports BM25 full text search and `TEXT_MATCH` queries, then inserts sample documents.

<details>

<summary><strong>Prepare your collection</strong></summary>

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
from pymilvus import (
    MilvusClient,
    DataType,
    Function,
    FunctionType,
    LexicalHighlighter,
)

client = MilvusClient(uri="http://localhost:19530")
COLLECTION_NAME = "highlighter_demo"

# Clean up existing collection
if client.has_collection(COLLECTION_NAME):
    client.drop_collection(COLLECTION_NAME)

# Define schema
schema = client.create_schema(enable_dynamic_field=False)
schema.add_field(field_name="id", datatype=DataType.INT64, is_primary=True, auto_id=True)
schema.add_field(
    field_name="text",
    datatype=DataType.VARCHAR,
    max_length=2000,
    enable_analyzer=True,  # Required for BM25
    enable_match=True,     # Required for TEXT_MATCH
)
schema.add_field(field_name="sparse_vector", datatype=DataType.SPARSE_FLOAT_VECTOR)

# Add BM25 function
schema.add_function(Function(
    name="text_bm25",
    function_type=FunctionType.BM25,
    input_field_names=["text"],
    output_field_names=["sparse_vector"],
))

# Create index
index_params = client.prepare_index_params()
index_params.add_index(
    field_name="sparse_vector",
    index_type="SPARSE_INVERTED_INDEX",
    metric_type="BM25",
    params={"inverted_index_algo": "DAAT_MAXSCORE", "bm25_k1": 1.2, "bm25_b": 0.75},
)

client.create_collection(collection_name=COLLECTION_NAME, schema=schema, index_params=index_params)

# Insert sample documents
docs = [
    "my first test doc",
    "my second test doc",
    "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
    "my second test doc. Milvus is an open-source vector database that suits AI applications "
    "of every size from running a demo chatbot to building web-scale search.",
]
client.insert(collection_name=COLLECTION_NAME, data=[{"text": t} for t in docs])
print(f"✓ Collection created with {len(docs)} documents\n")

# Helper for search params
SEARCH_PARAMS = {"metric_type": "BM25", "params": {"drop_ratio_search": 0.0}}

# Expected output:
# ✓ Collection created with 4 documents
```

```java
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import java.util.*;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .build());
String COLLECTION_NAME = "highlighter_demo";

// Clean up existing collection
if (client.hasCollection(HasCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .build())) {
    client.dropCollection(DropCollectionReq.builder()
            .collectionName(COLLECTION_NAME)
            .build());
}

// Define schema
CreateCollectionReq.CollectionSchema schema = client.createSchema(false);
schema.addField(AddFieldReq.builder()
        .fieldName("id")
        .dataType(DataType.Int64)
        .isPrimaryKey(true)
        .autoID(true)
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("text")
        .dataType(DataType.VarChar)
        .maxLength(2000)
        .enableAnalyzer(true)  // Required for BM25
        .enableMatch(true)     // Required for TEXT_MATCH
        .build());
schema.addField(AddFieldReq.builder()
        .fieldName("sparse_vector")
        .dataType(DataType.SparseFloatVector)
        .build());

// Add BM25 function
schema.addFunction(CreateCollectionReq.Function.builder()
        .name("text_bm25")
        .functionType(io.milvus.v2.common.FunctionType.BM25)
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("sparse_vector"))
        .build());

// Create index
List<IndexParam> indexParams = new ArrayList<>();
indexParams.add(IndexParam.builder()
        .fieldName("sparse_vector")
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .extraParams(Map.of("inverted_index_algo", "DAAT_MAXSCORE", "bm25_k1", 1.2, "bm25_b", 0.75))
        .build());

client.createCollection(CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(schema)
        .indexParams(indexParams)
        .build());

// Insert sample documents
List<String> docs = Arrays.asList(
        "my first test doc",
        "my second test doc",
        "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
        "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.");
List<Map<String, Object>> rows = new ArrayList<>();
for (String t : docs) {
    rows.add(Collections.singletonMap("text", t));
}
client.insert(InsertReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(rows)
        .build());
System.out.printf("Collection created with %d documents%n", docs.size());

// Helper for search params
Map<String, Object> SEARCH_PARAMS = Map.of("metric_type", "BM25", "params", Map.of("drop_ratio_search", 0.0));
```

```javascript
import { MilvusClient, DataType, FunctionType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530" });
const COLLECTION_NAME = "highlighter_demo";

// Clean up existing collection
if (await client.hasCollection({ collection_name: COLLECTION_NAME })) {
  await client.dropCollection({ collection_name: COLLECTION_NAME });
}

// Define schema
const schema = [
  {
    name: "id",
    data_type: DataType.Int64,
    is_primary_key: true,
    autoID: true,
  },
  {
    name: "text",
    data_type: DataType.VarChar,
    max_length: 2000,
    enable_analyzer: true, // Required for BM25
    enable_match: true,    // Required for TEXT_MATCH
  },
  {
    name: "sparse_vector",
    data_type: DataType.SparseFloatVector,
  },
];

// Add BM25 function
const functions = [
  {
    name: "text_bm25",
    type: FunctionType.BM25,
    input_field_names: ["text"],
    output_field_names: ["sparse_vector"],
  },
];

// Create index
const index_params = [
  {
    field_name: "sparse_vector",
    index_type: "SPARSE_INVERTED_INDEX",
    metric_type: "BM25",
    params: { inverted_index_algo: "DAAT_MAXSCORE", bm25_k1: 1.2, bm25_b: 0.75 },
  },
];

await client.createCollection({
  collection_name: COLLECTION_NAME,
  fields: schema,
  functions: functions,
  index_params: index_params,
});

// Insert sample documents
const docs = [
  "my first test doc",
  "my second test doc",
  "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
  "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.",
];
await client.insert({
  collection_name: COLLECTION_NAME,
  data: docs.map((t) => ({ text: t })),
});
console.log(`Collection created with ${docs.length} documents`);

// Helper for search params
const SEARCH_PARAMS = { metric_type: "BM25", params: { drop_ratio_search: 0.0 } };
```

```cpp
#include "milvus/MilvusClientV2.h"
#include "milvus/types/CollectionSchema.h"
#include "milvus/types/IndexDesc.h"
#include <iostream>

auto client = milvus::MilvusClientV2::Create();
client->Connect(milvus::ConnectParam("http://localhost:19530", ""));
const std::string COLLECTION_NAME = "highlighter_demo";

// Clean up existing collection
bool has = false;
auto status = client->HasCollection(milvus::HasCollectionRequest().WithCollectionName(COLLECTION_NAME), has);
if (has) {
    client->DropCollection(milvus::DropCollectionRequest().WithCollectionName(COLLECTION_NAME));
}

// Define schema
milvus::CollectionSchema schema(COLLECTION_NAME);
schema.SetEnableDynamicField(false);
schema.AddField(milvus::FieldSchema("id", milvus::DataType::INT64, "", true, true));
schema.AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR)
                    .WithMaxLength(2000)
                    .EnableAnalyzer(true)  // Required for BM25
                    .EnableMatch(true));   // Required for TEXT_MATCH
schema.AddField(milvus::FieldSchema("sparse_vector", milvus::DataType::SPARSE_FLOAT_VECTOR));

// Add BM25 function
milvus::Function bm25_func("text_bm25", milvus::FunctionType::BM25);
bm25_func.AddInputFieldName("text");
bm25_func.AddOutputFieldName("sparse_vector");
schema.AddFunction(bm25_func);

// Create index
milvus::IndexDesc index("sparse_vector", "", milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25);
index.AddExtraParam("inverted_index_algo", "DAAT_MAXSCORE");
index.AddExtraParam("bm25_k1", "1.2");
index.AddExtraParam("bm25_b", "0.75");

status = client->CreateCollection(
    milvus::CreateCollectionRequest().WithCollectionSchema(schema).AddIndex(index),
    milvus::CreateCollectionResponse());

// Insert sample documents
std::vector<std::string> docs = {
    "my first test doc",
    "my second test doc",
    "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
    "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.",
};
milvus::EntityRows rows;
for (const auto& t : docs) {
    nlohmann::json row;
    row["text"] = t;
    rows.push_back(row);
}
milvus::InsertResponse insert_resp;
status = client->Insert(milvus::InsertRequest().WithCollectionName(COLLECTION_NAME).WithRows(rows), insert_resp);
std::cout << "Collection created with " << docs.size() << " documents" << std::endl;

// Helper for search params
// SEARCH_PARAMS: metric_type=BM25, params={"drop_ratio_search": 0.0}
```

</details>

### Example 1: Highlight search terms in BM25 full text search

This example shows how to highlight search terms in BM25 full text search.

- BM25 full text search uses `"test"` as the search term

- The highlighter wraps all occurrences of "test" with `{` and `}` tags

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,  # Highlight BM25 query terms
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test"],
    anns_field="sparse_vector",
    limit=10,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for hit in results[0]:
    print(f"  {hit.get('highlight', {}).get('text', [])}")
print()
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("{"))
        .postTags(List.of("}"))
        .highlightSearchText(true)  // Highlight BM25 query terms
        .build();

SearchResp results = client.search(SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("test")))
        .annsField("sparse_vector")
        .limit(10)
        .searchParams(SEARCH_PARAMS)
        .outputFields(Collections.singletonList("text"))
        // highlight-next-line
        .highlighter(highlighter)
        .build());

for (SearchResp.SearchResult hit : results.getSearchResults().get(0)) {
    System.out.println("  " + hit.getHighlight().get("text"));
}
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["{"],
  post_tags: ["}"],
  highlight_search_text: true, // Highlight BM25 query terms
};

const results = await client.search({
  collection_name: COLLECTION_NAME,
  data: ["test"],
  anns_field: "sparse_vector",
  limit: 10,
  search_params: SEARCH_PARAMS,
  output_fields: ["text"],
  // highlight-next-line
  highlighter: highlighter,
});

for (const hit of results.results[0]) {
  console.log("  ", hit.highlight?.text ?? []);
}
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"{"})
    .WithPostTags({"}"})
    .WithHighlightSearchText(true); // Highlight BM25 query terms

auto request = milvus::SearchRequest()
                   .WithCollectionName(COLLECTION_NAME)
                   .WithAnnsField("sparse_vector")
                   .WithLimit(10)
                   .AddExtraParam("drop_ratio_search", "0.0")
                   .AddOutputField("text")
                   // highlight-next-line
                   .WithHighlighter(highlighter);
request.AddEmbeddedText("test");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& hit : response.Results().front()) {
    for (const auto& frag : hit.Highlight().at("text")) {
        std::cout << "  " << frag << std::endl;
    }
}
```

<details>

<summary>Expected output</summary>

```plaintext
['{test} doc']
['{test} doc']
['{test} doc. Milvus is an open-source vector database built for GenAI applications.']
['{test} doc. Milvus is an open-source vector database that suits AI applications of every size from run']
```

</details>

### Example 2: Highlight query terms in filtering

This example shows how to highlight terms matched by a `TEXT_MATCH` filter.

- BM25 full text search uses `"test"` as the query term

- The `queries` parameter adds `"my doc"` to the highlight list

- The highlighter wraps all matched terms (`"my"`, `"test"`, `"doc"`) with `{` and `}`

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,   # Also highlight BM25 term
    highlight_query=[                     # Additional TEXT_MATCH terms to highlight
        {"type": "TextMatch", "field": "text", "text": "my doc"},
    ],
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test"],
    anns_field="sparse_vector",
    limit=10,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for hit in results[0]:
    print(f"  {hit.get('highlight', {}).get('text', [])}")
print()
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("{"))
        .postTags(List.of("}"))
        .highlightSearchText(true)   // Also highlight BM25 term
        .addHighlightQuery(new LexicalHighlighter.HighlightQuery(
                "TextMatch", "text", "my doc"))  // Additional TEXT_MATCH terms to highlight
        .build();

SearchResp results = client.search(SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("test")))
        .annsField("sparse_vector")
        .limit(10)
        .searchParams(SEARCH_PARAMS)
        .outputFields(Collections.singletonList("text"))
        // highlight-next-line
        .highlighter(highlighter)
        .build());

for (SearchResp.SearchResult hit : results.getSearchResults().get(0)) {
    System.out.println("  " + hit.getHighlight().get("text"));
}
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["{"],
  post_tags: ["}"],
  highlight_search_text: true, // Also highlight BM25 term
  highlight_query: [           // Additional TEXT_MATCH terms to highlight
    { type: "TextMatch", field: "text", text: "my doc" },
  ],
};

const results = await client.search({
  collection_name: COLLECTION_NAME,
  data: ["test"],
  anns_field: "sparse_vector",
  limit: 10,
  search_params: SEARCH_PARAMS,
  output_fields: ["text"],
  // highlight-next-line
  highlighter: highlighter,
});

for (const hit of results.results[0]) {
  console.log("  ", hit.highlight?.text ?? []);
}
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"{"})
    .WithPostTags({"}"})
    .WithHighlightSearchText(true)        // Also highlight BM25 term
    .AddHighlightQuery(
        "TextMatch", "text", "my doc");   // Additional TEXT_MATCH terms to highlight

auto request = milvus::SearchRequest()
                   .WithCollectionName(COLLECTION_NAME)
                   .WithAnnsField("sparse_vector")
                   .WithLimit(10)
                   .AddExtraParam("drop_ratio_search", "0.0")
                   .AddOutputField("text")
                   // highlight-next-line
                   .WithHighlighter(highlighter);
request.AddEmbeddedText("test");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& hit : response.Results().front()) {
    for (const auto& frag : hit.Highlight().at("text")) {
        std::cout << "  " << frag << std::endl;
    }
}
```

<details>

<summary>Expected output</summary>

```plaintext
['{my} first {test} {doc}']
['{my} second {test} {doc}']
['{my} first {test} {doc}. Milvus is an open-source vector database built for GenAI applications.']
['{my} second {test} {doc}. Milvus is an open-source vector database that suits AI applications of every siz']
```

</details>

### Example 3: Return highlights as fragments

In this example, the query searches for `"Milvus"` and returns highlight fragments in the following settings:

- `fragment_offset` keeps up to 20 characters before the first highlighted span as leading context (default is 0).

- `fragment_size` limits each fragment to approximately 60 characters (default is 100).

- `num_of_fragments` limits the number of returned fragments per text value (default is 5).

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
    fragment_offset=20,  # Keep 20 chars before match
    fragment_size=60,    # Max ~60 chars per fragment
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["Milvus"],
    anns_field="sparse_vector",
    limit=10,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for i, hit in enumerate(results[0]):
    frags = hit.get('highlight', {}).get('text', [])
    print(f"  Doc {i+1}: {frags}")
print()
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("{"))
        .postTags(List.of("}"))
        .highlightSearchText(true)
        .fragmentOffset(20)  // Keep 20 chars before match
        .fragmentSize(60)    // Max ~60 chars per fragment
        .build();

SearchResp results = client.search(SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("Milvus")))
        .annsField("sparse_vector")
        .limit(10)
        .searchParams(SEARCH_PARAMS)
        .outputFields(Collections.singletonList("text"))
        // highlight-next-line
        .highlighter(highlighter)
        .build());

int i = 0;
for (SearchResp.SearchResult hit : results.getSearchResults().get(0)) {
    System.out.printf("  Doc %d: %s%n", ++i, hit.getHighlight().get("text"));
}
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["{"],
  post_tags: ["}"],
  highlight_search_text: true,
  fragment_offset: 20, // Keep 20 chars before match
  fragment_size: 60,   // Max ~60 chars per fragment
};

const results = await client.search({
  collection_name: COLLECTION_NAME,
  data: ["Milvus"],
  anns_field: "sparse_vector",
  limit: 10,
  search_params: SEARCH_PARAMS,
  output_fields: ["text"],
  // highlight-next-line
  highlighter: highlighter,
});

results.results[0].forEach((hit, i) => {
  console.log(`  Doc ${i + 1}:`, hit.highlight?.text ?? []);
});
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"{"})
    .WithPostTags({"}"})
    .WithHighlightSearchText(true)
    .WithFragmentOffset(20)  // Keep 20 chars before match
    .WithFragmentSize(60);   // Max ~60 chars per fragment

auto request = milvus::SearchRequest()
                   .WithCollectionName(COLLECTION_NAME)
                   .WithAnnsField("sparse_vector")
                   .WithLimit(10)
                   .AddExtraParam("drop_ratio_search", "0.0")
                   .AddOutputField("text")
                   // highlight-next-line
                   .WithHighlighter(highlighter);
request.AddEmbeddedText("Milvus");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
int i = 0;
for (const auto& hit : response.Results().front()) {
    ++i;
    for (const auto& frag : hit.Highlight().at("text")) {
        std::cout << "  Doc " << i << ": " << frag << std::endl;
    }
}
```

<details>

<summary>Expected output</summary>

```plaintext
Doc 1: ['my first test doc. {Milvus} is an open-source vector database ']
Doc 2: ['my second test doc. {Milvus} is an open-source vector database']
```

</details>

### Example 4: Multi-query highlighting

When searching with multiple queries in BM25 full text search, each query's results are highlighted independently. The first query's results contain highlights for its search term, and the second query's results contain highlights for its search term, and so on. Each query uses the same `highlighter` configuration but applies it independently.

In the example below:

- First query highlights `"test"` in its result set

- Second query highlights `"Milvus"` in its result set

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["{"],
    post_tags=["}"],
    highlight_search_text=True,
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test", "Milvus"],  # Two queries
    anns_field="sparse_vector",
    limit=2,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for nq_idx, hits in enumerate(results):
    query_term = ["test", "Milvus"][nq_idx]
    print(f"  Query '{query_term}':")
    for hit in hits:
        print(f"    {hit.get('highlight', {}).get('text', [])}")
print()
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import java.util.*;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("{"))
        .postTags(List.of("}"))
        .highlightSearchText(true)
        .build();

List<EmbeddedText> queries = Arrays.asList(new EmbeddedText("test"), new EmbeddedText("Milvus")); // Two queries
SearchResp results = client.search(SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data((List) queries)
        .annsField("sparse_vector")
        .limit(2)
        .searchParams(SEARCH_PARAMS)
        .outputFields(Collections.singletonList("text"))
        // highlight-next-line
        .highlighter(highlighter)
        .build());

String[] terms = {"test", "Milvus"};
int nqIdx = 0;
for (List<SearchResp.SearchResult> hits : results.getSearchResults()) {
    System.out.println("  Query '" + terms[nqIdx] + "':");
    for (SearchResp.SearchResult hit : hits) {
        System.out.println("    " + hit.getHighlight().get("text"));
    }
    nqIdx++;
}
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["{"],
  post_tags: ["}"],
  highlight_search_text: true,
};

const results = await client.search({
  collection_name: COLLECTION_NAME,
  data: ["test", "Milvus"], // Two queries
  anns_field: "sparse_vector",
  limit: 2,
  search_params: SEARCH_PARAMS,
  output_fields: ["text"],
  // highlight-next-line
  highlighter: highlighter,
});

const terms = ["test", "Milvus"];
results.results.forEach((hits, nqIdx) => {
  console.log(`  Query '${terms[nqIdx]}':`);
  for (const hit of hits) {
    console.log("    ", hit.highlight?.text ?? []);
  }
});
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"{"})
    .WithPostTags({"}"})
    .WithHighlightSearchText(true);

auto request = milvus::SearchRequest()
                   .WithCollectionName(COLLECTION_NAME)
                   .WithAnnsField("sparse_vector")
                   .WithLimit(2)
                   .AddExtraParam("drop_ratio_search", "0.0")
                   .AddOutputField("text")
                   // highlight-next-line
                   .WithHighlighter(highlighter);
request.AddEmbeddedText("test");   // Two queries
request.AddEmbeddedText("Milvus");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::vector<std::string> terms = {"test", "Milvus"};
int nq_idx = 0;
for (const auto& hits : response.Results()) {
    std::cout << "  Query '" << terms[nq_idx] << "':" << std::endl;
    for (const auto& hit : hits) {
        for (const auto& frag : hit.Highlight().at("text")) {
            std::cout << "    " << frag << std::endl;
        }
    }
    ++nq_idx;
}
```

<details>

<summary>Expected output</summary>

```plaintext
Query 'test':
  ['{test} doc']
  ['{test} doc']
Query 'Milvus':
  ['{Milvus} is an open-source vector database built for GenAI applications.']
  ['{Milvus} is an open-source vector database that suits AI applications of every size from running a dem']
```

</details>

### Example 5: Custom HTML tags

You can use any tags for highlighting, such as HTML-safe tags for web UIs. This is useful when rendering search results in a browser.

<div class="multipleCode">
    <a href="#python">Python</a>
    <a href="#java">Java</a>
    <a href="#javascript">NodeJS</a>
    <a href="#cpp">C++</a>
</div>

```python
# highlight-start
highlighter = LexicalHighlighter(
    pre_tags=["<mark>"],
    post_tags=["</mark>"],
    highlight_search_text=True,
)
# highlight-end

results = client.search(
    collection_name=COLLECTION_NAME,
    data=["test"],
    anns_field="sparse_vector",
    limit=2,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for hit in results[0]:
    print(f"  {hit.get('highlight', {}).get('text', [])}")
print()
```

```java
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

LexicalHighlighter highlighter = new LexicalHighlighter.LexicalHighlighterBuilder()
        .preTags(List.of("<mark>"))
        .postTags(List.of("</mark>"))
        .highlightSearchText(true)
        .build();

SearchResp results = client.search(SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("test")))
        .annsField("sparse_vector")
        .limit(2)
        .searchParams(SEARCH_PARAMS)
        .outputFields(Collections.singletonList("text"))
        // highlight-next-line
        .highlighter(highlighter)
        .build());

for (SearchResp.SearchResult hit : results.getSearchResults().get(0)) {
    System.out.println("  " + hit.getHighlight().get("text"));
}
```

```javascript
const highlighter = {
  type: "Lexical",
  pre_tags: ["<mark>"],
  post_tags: ["</mark>"],
  highlight_search_text: true,
};

const results = await client.search({
  collection_name: COLLECTION_NAME,
  data: ["test"],
  anns_field: "sparse_vector",
  limit: 2,
  search_params: SEARCH_PARAMS,
  output_fields: ["text"],
  // highlight-next-line
  highlighter: highlighter,
});

for (const hit of results.results[0]) {
  console.log("  ", hit.highlight?.text ?? []);
}
```

```cpp
#include "milvus/types/Highlighter.h"

milvus::LexicalHighlighter highlighter;
highlighter
    .WithPreTags({"<mark>"})
    .WithPostTags({"</mark>"})
    .WithHighlightSearchText(true);

auto request = milvus::SearchRequest()
                   .WithCollectionName(COLLECTION_NAME)
                   .WithAnnsField("sparse_vector")
                   .WithLimit(2)
                   .AddExtraParam("drop_ratio_search", "0.0")
                   .AddOutputField("text")
                   // highlight-next-line
                   .WithHighlighter(highlighter);
request.AddEmbeddedText("test");

milvus::SearchResponse response;
auto status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& hit : response.Results().front()) {
    for (const auto& frag : hit.Highlight().at("text")) {
        std::cout << "  " << frag << std::endl;
    }
}
```

<details>

<summary>Expected output</summary>

```plaintext
['<mark>test</mark> doc']
['<mark>test</mark> doc']
```

</details>

