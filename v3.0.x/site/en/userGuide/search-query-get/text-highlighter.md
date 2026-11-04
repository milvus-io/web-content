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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
import java.util.*;

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))              // Tag inserted before each highlighted term
        .postTags(Arrays.asList("}"))             // Tag inserted after each highlighted term
        .highlightSearchText(true)                // Enable search term highlighting for BM25 full text search
        .build();
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])            // Tag inserted before each highlighted term
    .post_tags(["}"])           // Tag inserted after each highlighted term
    .highlight_search_text(true); // Enable search term highlighting for BM25 full text search
```

```cpp
auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});             // Tag inserted before each highlighted term
highlighter->WithPostTags({"}"});            // Tag inserted after each highlighted term
highlighter->WithHighlightSearchText(true);  // Enable search term highlighting for BM25 full text search
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],             // Tag inserted before each highlighted term
    post_tags: ["}"],            // Tag inserted after each highlighted term
    highlight_search_text: true, // Enable search term highlighting for BM25 full text search
};
```

```csharp
using Milvus.Client.V2.Types;

var highlighter = new SearchParameters
{
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",            // Tag inserted before each highlighted term
        ["post_tags"] = "[\"}\"]",           // Tag inserted after each highlighted term
        ["highlight_search_text"] = "true"   // Enable search term highlighting for BM25 full text search
    }
};
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
```

In this example:

- `pre_tags` and `post_tags` control how highlighted text appears in the output. In this case, matched terms are wrapped by `{}` (for example, `{term}`). You can also provide multiple tags as a list (for example, `["<b>", "<i>"]`). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.

- `highlight_search_text=True` tells Milvus to use the search terms in BM25 full text search as the source of highlighted terms.

Once the Highlighter object is created, apply its configuration to your BM25 full text search request:

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
results = client.search(
    ...,
    data=["BM25"],      # Search term used in BM25 full text search
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .highlightSearchText(true)
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName("highlighter_demo")
        .data(Collections.singletonList(new EmbeddedText("BM25")))  // Search term used in BM25 full text search
        .annsField("sparse_vector")
        .topK(10)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)   // Pass highlighter config here
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .highlight_search_text(true);

let res = client
    .search(
        SearchRequest::builder()
            .collection_name("highlighter_demo")
            .vector_field("sparse_vector")
            .vectors(SearchVectors::EmbeddedText(vec!["BM25".to_string()])) // Search term
            .limit(10)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)   // Pass highlighter config here
            .build()?,
    )
    .await?;
```

```cpp
auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->WithHighlightSearchText(true);

auto request = milvus::SearchRequest()
    .WithCollectionName("highlighter_demo")
    .WithAnnsField("sparse_vector")
    .WithLimit(10)
    .AddOutputField("text")
    .AddEmbeddedText("BM25")        // Search term used in BM25 full text search
    .WithHighlighter(highlighter);  // Pass highlighter config here

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_search_text: true,
};

const res = await client.search({
    collection_name: "highlighter_demo",
    data: ["BM25"],             // Search term used in BM25 full text search
    anns_field: "sparse_vector",
    limit: 10,
    output_fields: ["text"],
    highlighter,                // Pass highlighter config here
});
```

```csharp
using Milvus.Client.V2.Types;

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_search_text"] = "true"
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = "highlighter_demo",
    VectorFieldName = "sparse_vector",
    Texts = new[] { "BM25" },   // Search term used in BM25 full text search
    MetricType = MetricType.Bm25,
    Limit = 10,
    Parameters = highlighter    // Pass highlighter config here
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
```

**Highlighting output**

When highlighting is enabled, Milvus returns highlighted text in a dedicated `highlight` field of each search result. The `highlight` object maps each highlighted field name to an object that contains a `fragments` list and a matching `scores` list. By default, highlighted output is returned as a fragment starting from the first matched term.

In this example, the search term is `"BM25"`, so it is highlighted in the returned result. `fragments` holds the highlighted text and `scores` holds the corresponding numeric score of each fragment; the score values shown on this page are illustrative.

```json
{
    ...,
    "highlight": {
        "text": {
            "fragments": [
                "{BM25} for keyword relevance. Filters can narrow results."
            ],
            "scores": [0.72]
        }
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
import java.util.*;

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))              // Tag inserted before each highlighted term
        .postTags(Arrays.asList("}"))             // Tag inserted after each highlighted term
        // Text filtering type, target text field, terms to highlight
        .addHighlightQuery(new LexicalHighlighter.HighlightQuery("TextMatch", "text", "text filtering"))
        .build();
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])            // Tag inserted before each highlighted term
    .post_tags(["}"])           // Tag inserted after each highlighted term
    // Text filtering type, target text field, terms to highlight
    .add_highlight_query(
        HighlightQuery::new()
            .query_type("TextMatch")
            .field("text")
            .text("text filtering"),
    );
```

```cpp
auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});    // Tag inserted before each highlighted term
highlighter->WithPostTags({"}"});   // Tag inserted after each highlighted term
// Text filtering type, target text field, terms to highlight
highlighter->AddHighlightQuery("TextMatch", "text", "text filtering");
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],              // Tag inserted before each highlighted term
    post_tags: ["}"],             // Tag inserted after each highlighted term
    highlight_query: [
        { type: "TextMatch", field: "text", text: "text filtering" },
    ],
};
```

```csharp
using Milvus.Client.V2.Types;

var highlighter = new SearchParameters
{
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",                       // Tag inserted before each highlighted term
        ["post_tags"] = "[\"}\"]",                      // Tag inserted after each highlighted term
        ["highlight_query"] = "[{\"type\":\"TextMatch\",\"field\":\"text\",\"text\":\"text filtering\"}]"
    }
};
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
```

In this configuration:

- `pre_tags` and `post_tags` control how highlighted text appears in the output. In this case, matched terms are wrapped by `{}` (for example, `{term}`). You can also provide multiple tags as a list (for example, `["<b>", "<i>"]`). When multiple terms are highlighted, tags are applied in order and rotated by match sequence.

- `highlight_query` defines which filtering terms should be highlighted.

Once the Highlighter object is created, apply the same filtering expression and the highlighter configuration to your search request:

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
results = client.search(
    ...,
    filter='TEXT_MATCH(text, "text filtering")',
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .addHighlightQuery(new LexicalHighlighter.HighlightQuery("TextMatch", "text", "text filtering"))
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName("highlighter_demo")
        .data(Collections.singletonList(new EmbeddedText("BM25")))
        .annsField("sparse_vector")
        .filter("TEXT_MATCH(text, \"text filtering\")")
        .topK(10)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)   // Pass highlighter config here
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .add_highlight_query(
        HighlightQuery::new()
            .query_type("TextMatch")
            .field("text")
            .text("text filtering"),
    );

let res = client
    .search(
        SearchRequest::builder()
            .collection_name("highlighter_demo")
            .vector_field("sparse_vector")
            .vectors(SearchVectors::EmbeddedText(vec!["BM25".to_string()]))
            .filter(r#"TEXT_MATCH(text, "text filtering")"#)
            .limit(10)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)   // Pass highlighter config here
            .build()?,
    )
    .await?;
```

```cpp
auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->AddHighlightQuery("TextMatch", "text", "text filtering");

auto request = milvus::SearchRequest()
    .WithCollectionName("highlighter_demo")
    .WithAnnsField("sparse_vector")
    .WithFilter(R"(TEXT_MATCH(text, "text filtering"))")
    .WithLimit(10)
    .AddOutputField("text")
    .AddEmbeddedText("BM25")
    .WithHighlighter(highlighter);  // Pass highlighter config here

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_query: [
        { type: "TextMatch", field: "text", text: "text filtering" },
    ],
};

const res = await client.search({
    collection_name: "highlighter_demo",
    data: ["BM25"],
    anns_field: "sparse_vector",
    filter: 'TEXT_MATCH(text, "text filtering")',
    limit: 10,
    output_fields: ["text"],
    highlighter,    // Pass highlighter config here
});
```

```csharp
using Milvus.Client.V2.Types;

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    Expression = "TEXT_MATCH(text, \"text filtering\")",
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_query"] = "[{\"type\":\"TextMatch\",\"field\":\"text\",\"text\":\"text filtering\"}]"
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = "highlighter_demo",
    VectorFieldName = "sparse_vector",
    Texts = new[] { "BM25" },
    MetricType = MetricType.Bm25,
    Limit = 10,
    Parameters = highlighter    // Pass highlighter config here
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
```

**Highlighting output**

When query term highlighting is enabled for filtering, Milvus returns highlighted text in a dedicated `highlight` field. By default, highlighted output is returned as a fragment starting from the first matched term.

In this example, the first matched term is `"text"`, so the returned highlighted text starts from that position:

```json
{
    ...,
    "highlight": {
        "text": {
            "fragments": [
                "{text} {filtering} works in Milvus."
            ],
            "scores": [0.72]
        }
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
import java.util.*;

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .highlightSearchText(true)
        .fragmentOffset(5)      // Number of characters to reserve before the first matched term
        .fragmentSize(60)       // Max. length of each fragment to return
        .numOfFragments(1)      // Max. number of fragments to return
        .build();
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .highlight_search_text(true)
    .fragment_offset(5)     // Number of characters to reserve before the first matched term
    .fragment_size(60)      // Max. length of each fragment to return
    .num_of_fragments(1);   // Max. number of fragments to return
```

```cpp
auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->WithHighlightSearchText(true);
highlighter->WithFragmentOffset(5);     // Number of characters to reserve before the first matched term
highlighter->WithFragmentSize(60);      // Max. length of each fragment to return
highlighter->WithNumOfFragments(1);     // Max. number of fragments to return
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_search_text: true,
    fragment_offset: 5,     // Number of characters to reserve before the first matched term
    fragment_size: 60,      // Max. length of each fragment to return
    num_of_fragments: 1,    // Max. number of fragments to return
};
```

```csharp
using Milvus.Client.V2.Types;

var highlighter = new SearchParameters
{
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_search_text"] = "true",
        ["fragment_offset"] = "5",      // Number of characters to reserve before the first matched term
        ["fragment_size"] = "60",       // Max. length of each fragment to return
        ["num_of_fragments"] = "1"      // Max. number of fragments to return
    }
};
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
```

In this configuration:

- `fragment_offset` reserves leading context before the first highlighted term.

- `fragment_size` limits how much text is included in each fragment.

- `num_of_fragments` controls how many fragments are returned.

Once the Highlighter object is created, apply the highlighter configuration to your search request:

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
results = client.search(
    ...,
    data=["BM25"],
    # highlight-next-line
    highlighter=highlighter # Pass highlighter config here
)
```

```java
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .highlightSearchText(true)
        .fragmentOffset(5)
        .fragmentSize(60)
        .numOfFragments(1)
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName("highlighter_demo")
        .data(Collections.singletonList(new EmbeddedText("BM25")))
        .annsField("sparse_vector")
        .topK(10)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)   // Pass highlighter config here
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .highlight_search_text(true)
    .fragment_offset(5)
    .fragment_size(60)
    .num_of_fragments(1);

let res = client
    .search(
        SearchRequest::builder()
            .collection_name("highlighter_demo")
            .vector_field("sparse_vector")
            .vectors(SearchVectors::EmbeddedText(vec!["BM25".to_string()]))
            .limit(10)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)   // Pass highlighter config here
            .build()?,
    )
    .await?;
```

```cpp
auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->WithHighlightSearchText(true);
highlighter->WithFragmentOffset(5);
highlighter->WithFragmentSize(60);
highlighter->WithNumOfFragments(1);

auto request = milvus::SearchRequest()
    .WithCollectionName("highlighter_demo")
    .WithAnnsField("sparse_vector")
    .WithLimit(10)
    .AddOutputField("text")
    .AddEmbeddedText("BM25")
    .WithHighlighter(highlighter);  // Pass highlighter config here

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_search_text: true,
    fragment_offset: 5,
    fragment_size: 60,
    num_of_fragments: 1,
};

const res = await client.search({
    collection_name: "highlighter_demo",
    data: ["BM25"],
    anns_field: "sparse_vector",
    limit: 10,
    output_fields: ["text"],
    highlighter,    // Pass highlighter config here
});
```

```csharp
using Milvus.Client.V2.Types;

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_search_text"] = "true",
        ["fragment_offset"] = "5",
        ["fragment_size"] = "60",
        ["num_of_fragments"] = "1"
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = "highlighter_demo",
    VectorFieldName = "sparse_vector",
    Texts = new[] { "BM25" },
    MetricType = MetricType.Bm25,
    Limit = 10,
    Parameters = highlighter    // Pass highlighter config here
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
```

**Highlighting output**

With fragment-based highlighting enabled, Milvus returns highlighted text as fragments in the `fragments` list of the field's `highlight` object:

```json
{
    ...,
    "highlight": {
        "text": {
            "fragments": [
                "Use {BM25} for keyword relevance. Filters can narrow results."
            ],
            "scores": [0.72]
        }
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
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
import io.milvus.v2.client.ConnectConfig;
import io.milvus.v2.client.MilvusClientV2;
import io.milvus.v2.common.DataType;
import io.milvus.v2.common.IndexParam;
import io.milvus.common.clientenum.FunctionType;
import io.milvus.v2.service.collection.request.AddFieldReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq;
import io.milvus.v2.service.collection.request.CreateCollectionReq.Function;
import io.milvus.v2.service.collection.request.DropCollectionReq;
import io.milvus.v2.service.collection.request.HasCollectionReq;
import io.milvus.v2.service.vector.request.InsertReq;
import com.google.gson.JsonObject;
import java.util.*;

MilvusClientV2 client = new MilvusClientV2(ConnectConfig.builder()
        .uri("http://localhost:19530")
        .token("root:Milvus")
        .build());
String COLLECTION_NAME = "highlighter_demo";

// Clean up existing collection
if (client.hasCollection(HasCollectionReq.builder().collectionName(COLLECTION_NAME).build())) {
    client.dropCollection(DropCollectionReq.builder().collectionName(COLLECTION_NAME).build());
}

// Define schema
CreateCollectionReq.CollectionSchema schema = client.createSchema();
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
schema.addFunction(Function.builder()
        .functionType(FunctionType.BM25)
        .name("text_bm25")
        .inputFieldNames(Collections.singletonList("text"))
        .outputFieldNames(Collections.singletonList("sparse_vector"))
        .build());

// Create the collection with the BM25 index
IndexParam indexParam = IndexParam.builder()
        .fieldName("sparse_vector")
        .indexType(IndexParam.IndexType.SPARSE_INVERTED_INDEX)
        .metricType(IndexParam.MetricType.BM25)
        .build();

client.createCollection(CreateCollectionReq.builder()
        .collectionName(COLLECTION_NAME)
        .collectionSchema(schema)
        .indexParams(Collections.singletonList(indexParam))
        .build());

// Insert sample documents
List<String> docs = Arrays.asList(
        "my first test doc",
        "my second test doc",
        "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
        "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search."
);
List<JsonObject> rows = new ArrayList<>();
for (String doc : docs) {
    JsonObject row = new JsonObject();
    row.addProperty("text", doc);
    rows.add(row);
}
client.insert(InsertReq.builder().collectionName(COLLECTION_NAME).data(rows).build());
```

```go
collectionName := "highlighter_demo"

// Clean up existing collection
has, err := client.HasCollection(ctx, milvusclient.NewHasCollectionOption(collectionName))
if err != nil {
    log.Fatal(err)
}
if has {
    _ = client.DropCollection(ctx, milvusclient.NewDropCollectionOption(collectionName))
}

// Define schema
schema := entity.NewSchema().WithDynamicFieldEnabled(false).
    WithField(entity.NewField().WithName("id").WithDataType(entity.FieldTypeInt64).WithIsPrimaryKey(true).WithIsAutoID(true)).
    WithField(entity.NewField().WithName("text").WithDataType(entity.FieldTypeVarChar).WithMaxLength(2000).WithEnableAnalyzer(true).WithEnableMatch(true)).
    WithField(entity.NewField().WithName("sparse_vector").WithDataType(entity.FieldTypeSparseVector))

// Add BM25 function
schema.WithFunction(entity.NewFunction().
    WithName("text_bm25").
    WithInputFields("text").
    WithOutputFields("sparse_vector").
    WithType(entity.FunctionTypeBM25))

// Create the BM25 index
indexOption := milvusclient.NewCreateIndexOption(collectionName, "sparse_vector", index.NewSparseInvertedIndex(entity.BM25, 0.05))
indexOption.WithExtraParam("inverted_index_algo", "DAAT_MAXSCORE")
indexOption.WithExtraParam("bm25_k1", 1.2)
indexOption.WithExtraParam("bm25_b", 0.75)

err = client.CreateCollection(ctx, milvusclient.NewCreateCollectionOption(collectionName, schema).
    WithIndexOptions(indexOption))
if err != nil {
    log.Fatal(err)
}

// Insert sample documents
docs := []string{
    "my first test doc",
    "my second test doc",
    "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
    "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.",
}
_, err = client.Insert(ctx, milvusclient.NewColumnBasedInsertOption(collectionName).
    WithVarcharColumn("text", docs))
if err != nil {
    log.Fatal(err)
}
```

```rust
use milvus::v2::prelude::*;
use serde_json::json;
use std::collections::HashMap;

let collection_name = "highlighter_demo";

// Clean up existing collection
if client
    .has_collection(HasCollectionRequest::builder().collection_name(collection_name).build()?)
    .await?
    .exists()
{
    client
        .drop_collection(DropCollectionRequest::builder().collection_name(collection_name).build()?)
        .await?;
}

// Define schema
let schema = CollectionSchema::new()
    .add_field(FieldSchema::new().name("id").data_type(DataType::Int64).primary_key(true).auto_id(true))
    .add_field(
        FieldSchema::new()
            .name("text")
            .data_type(DataType::VarChar)
            .max_length(2000)
            .enable_analyzer(true)  // Required for BM25
            .enable_match(true),    // Required for TEXT_MATCH
    )
    .add_field(FieldSchema::new().name("sparse_vector").data_type(DataType::SparseFloatVector))
    .add_function(
        Function::new()
            .name("text_bm25")
            .function_type(FunctionType::Bm25)
            .input_fields(["text"])
            .output_fields(["sparse_vector"]),
    );

// Create the collection with the BM25 index
let index_param = IndexParam::new()
    .field_name("sparse_vector")
    .index_type(IndexType::SparseInvertedIndex)
    .metric_type(MetricType::Bm25)
    .extra_params(HashMap::from([
        ("inverted_index_algo".into(), "DAAT_MAXSCORE".into()),
        ("bm25_k1".into(), "1.2".into()),
        ("bm25_b".into(), "0.75".into()),
    ]));

client
    .create_collection(
        CreateCollectionRequest::builder()
            .collection_name(collection_name)
            .schema(schema)
            .index_param(index_param)
            .build()?,
    )
    .await?;

// Insert sample documents
let docs = vec![
    json!({"text": "my first test doc"}),
    json!({"text": "my second test doc"}),
    json!({"text": "my first test doc. Milvus is an open-source vector database built for GenAI applications."}),
    json!({"text": "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search."}),
];

client
    .insert(
        InsertRequest::builder()
            .collection_name(collection_name)
            .rows(docs)
            .build()?,
    )
    .await?;
```

```cpp
#include "milvus/MilvusClientV2.h"
#include <iostream>
#include <string>
#include <vector>

const std::string collection_name = "highlighter_demo";

// Clean up existing collection
milvus::HasCollectionResponse has_response;
auto status = client->HasCollection(milvus::HasCollectionRequest().WithCollectionName(collection_name), has_response);
if (has_response.Has()) {
    status = client->DropCollection(milvus::DropCollectionRequest().WithCollectionName(collection_name));
}

// Define schema
milvus::CollectionSchemaPtr schema = std::make_shared<milvus::CollectionSchema>();
schema->AddField({"id", milvus::DataType::INT64, "", true, true});
schema->AddField(milvus::FieldSchema("text", milvus::DataType::VARCHAR)
                    .WithMaxLength(2000)
                    .EnableAnalyzer(true)   // Required for BM25
                    .EnableMatch(true));    // Required for TEXT_MATCH
schema->AddField(milvus::FieldSchema("sparse_vector", milvus::DataType::SPARSE_FLOAT_VECTOR));

// Add BM25 function
milvus::FunctionPtr function = std::make_shared<milvus::Function>("text_bm25", milvus::FunctionType::BM25);
function->AddInputFieldName("text");
function->AddOutputFieldName("sparse_vector");
schema->AddFunction(function);

// Create the collection with the BM25 index
milvus::IndexDesc index_param("sparse_vector", "", milvus::IndexType::SPARSE_INVERTED_INDEX, milvus::MetricType::BM25);
index_param.AddExtraParam("inverted_index_algo", "DAAT_MAXSCORE");
index_param.AddExtraParam("bm25_k1", "1.2");
index_param.AddExtraParam("bm25_b", "0.75");

status = client->CreateCollection(milvus::CreateCollectionRequest()
                                     .WithCollectionName(collection_name)
                                     .WithCollectionSchema(schema)
                                     .AddIndex(std::move(index_param)));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Insert sample documents
std::vector<std::string> docs = {
    "my first test doc",
    "my second test doc",
    "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
    "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.",
};

milvus::EntityRows rows;
for (const auto& doc : docs) {
    rows.push_back({{"text", doc}});
}

milvus::InsertResponse insert_response;
status = client->Insert(milvus::InsertRequest()
                            .WithCollectionName(collection_name)
                            .WithRowsData(std::move(rows)),
                        insert_response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```

```javascript
import { MilvusClient, DataType } from "@zilliz/milvus2-sdk-node";

const client = new MilvusClient({ address: "http://localhost:19530", token: "root:Milvus" });
const COLLECTION_NAME = "highlighter_demo";

// Clean up existing collection
if (await client.hasCollection({ collection_name: COLLECTION_NAME })) {
    await client.dropCollection({ collection_name: COLLECTION_NAME });
}

// Create the collection with the BM25 function and index
await client.createCollection({
    collection_name: COLLECTION_NAME,
    schema: [
        { name: "id", data_type: DataType.Int64, is_primary_key: true, auto_id: true },
        { name: "text", data_type: DataType.VarChar, max_length: 2000, enable_analyzer: true, enable_match: true },
        { name: "sparse_vector", data_type: DataType.SparseFloatVector },
    ],
    functions: [
        {
            name: "text_bm25",
            type: "BM25",
            input_field_names: ["text"],
            output_field_names: ["sparse_vector"],
        },
    ],
    index_params: [
        {
            field_name: "sparse_vector",
            index_type: "SPARSE_INVERTED_INDEX",
            metric_type: "BM25",
            params: { inverted_index_algo: "DAAT_MAXSCORE", bm25_k1: 1.2, bm25_b: 0.75 },
        },
    ],
});

// Insert sample documents
const docs = [
    "my first test doc",
    "my second test doc",
    "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
    "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search.",
];
await client.insert({ collection_name: COLLECTION_NAME, data: docs.map(text => ({ text })) });

// Helper for search params
const SEARCH_PARAMS = { params: { drop_ratio_search: 0.0 } };
```

```csharp
using Milvus.Client.V2;
using Milvus.Client.V2.Requests.Collection;
using Milvus.Client.V2.Requests.Dml;
using Milvus.Client.V2.Requests.Index;
using Milvus.Client.V2.Types;

var client = new MilvusClientV2(new ConnectConfig
{
    Uri = "http://localhost:19530",
    ApiKey = "root:Milvus"
});
const string collectionName = "highlighter_demo";

// Clean up existing collection
if ((await client.HasCollectionAsync(new HasCollectionReq { CollectionName = collectionName })).Has)
{
    await client.DropCollectionAsync(new DropCollectionReq { CollectionName = collectionName });
}

// Define schema, BM25 function, and index
var schema = new CollectionSchema { Name = collectionName };
schema.Fields.Add(new FieldSchema("id", DataType.Int64, isPrimaryKey: true, autoId: true));
schema.Fields.Add(FieldSchema.CreateVarchar("text", maxLength: 2000, enableAnalyzer: true, enableMatch: true));
schema.Fields.Add(new FieldSchema("sparse_vector", DataType.SparseFloatVector));
schema.Functions.Add(FunctionSchema.CreateBm25("text_bm25", "text", "sparse_vector"));

await client.CreateCollectionAsync(new CreateCollectionReq
{
    CollectionName = collectionName,
    Schema = schema,
    Indexes = new[] { new IndexParam("sparse_vector", null, IndexType.SparseInvertedIndex, MetricType.Bm25)
    {
        ExtraParams = { ["inverted_index_algo"] = "DAAT_MAXSCORE", ["bm25_k1"] = "1.2", ["bm25_b"] = "0.75" }
    } }
});

// Insert sample documents
string[] docs =
[
    "my first test doc",
    "my second test doc",
    "my first test doc. Milvus is an open-source vector database built for GenAI applications.",
    "my second test doc. Milvus is an open-source vector database that suits AI applications of every size from running a demo chatbot to building web-scale search."
];
await client.InsertAsync(new InsertReq
{
    CollectionName = collectionName,
    RowsData = docs.Select(text => (IDictionary<string, object?>)new Dictionary<string, object?> { ["text"] = text }).ToList()
});
```

</details>

### Example 1: Highlight search terms in BM25 full text search

This example shows how to highlight search terms in BM25 full text search.

- BM25 full text search uses `"test"` as the search term

- The highlighter wraps all occurrences of "test" with `{` and `}` tags

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
    print(f"  {hit.get('highlight', {}).get('text', {}).get('fragments', [])}")
print()
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

String COLLECTION_NAME = "highlighter_demo";

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .highlightSearchText(true)  // Highlight BM25 query terms
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("test")))
        .annsField("sparse_vector")
        .topK(10)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let collection_name = "highlighter_demo";

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .highlight_search_text(true); // Highlight BM25 query terms

let res = client
    .search(
        SearchRequest::builder()
            .collection_name(collection_name)
            .vector_field("sparse_vector")
            .vectors(SearchVectors::EmbeddedText(vec!["test".to_string()]))
            .limit(10)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)
            .build()?,
    )
    .await?;
```

```cpp
const std::string collection_name = "highlighter_demo";

auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->WithHighlightSearchText(true);  // Highlight BM25 query terms

auto request = milvus::SearchRequest()
    .WithCollectionName(collection_name)
    .WithAnnsField("sparse_vector")
    .WithLimit(10)
    .AddOutputField("text")
    .AddEmbeddedText("test")
    .WithHighlighter(highlighter);

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const COLLECTION_NAME = "highlighter_demo";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_search_text: true,
};

const res = await client.search({
    collection_name: COLLECTION_NAME,
    data: ["test"],
    anns_field: "sparse_vector",
    limit: 10,
    output_fields: ["text"],
    highlighter,
});
```

```csharp
using Milvus.Client.V2.Types;

const string collectionName = "highlighter_demo";

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_search_text"] = "true"   // Highlight BM25 query terms
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = "sparse_vector",
    Texts = new[] { "test" },
    MetricType = MetricType.Bm25,
    Limit = 10,
    Parameters = highlighter
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
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

- The `highlight_query` parameter adds `"my doc"` to the highlight list

- The highlighter wraps all matched terms (`"my"`, `"test"`, `"doc"`) with `{` and `}`

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
    print(f"  {hit.get('highlight', {}).get('text', {}).get('fragments', [])}")
print()
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

String COLLECTION_NAME = "highlighter_demo";

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .highlightSearchText(true)   // Also highlight BM25 term
        // Additional TEXT_MATCH terms to highlight
        .addHighlightQuery(new LexicalHighlighter.HighlightQuery("TextMatch", "text", "my doc"))
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("test")))
        .annsField("sparse_vector")
        .topK(10)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let collection_name = "highlighter_demo";

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .highlight_search_text(true)  // Also highlight BM25 term
    // Additional TEXT_MATCH terms to highlight
    .add_highlight_query(
        HighlightQuery::new()
            .query_type("TextMatch")
            .field("text")
            .text("my doc"),
    );

let res = client
    .search(
        SearchRequest::builder()
            .collection_name(collection_name)
            .vector_field("sparse_vector")
            .vectors(SearchVectors::EmbeddedText(vec!["test".to_string()]))
            .limit(10)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)
            .build()?,
    )
    .await?;
```

```cpp
const std::string collection_name = "highlighter_demo";

auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->WithHighlightSearchText(true);  // Also highlight BM25 term
// Additional TEXT_MATCH terms to highlight
highlighter->AddHighlightQuery("TextMatch", "text", "my doc");

auto request = milvus::SearchRequest()
    .WithCollectionName(collection_name)
    .WithAnnsField("sparse_vector")
    .WithLimit(10)
    .AddOutputField("text")
    .AddEmbeddedText("test")
    .WithHighlighter(highlighter);

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const COLLECTION_NAME = "highlighter_demo";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_search_text: true,  // Also highlight BM25 term
    // Additional TEXT_MATCH terms to highlight
    highlight_query: [
        { type: "TextMatch", field: "text", text: "my doc" },
    ],
};

const res = await client.search({
    collection_name: COLLECTION_NAME,
    data: ["test"],
    anns_field: "sparse_vector",
    limit: 10,
    output_fields: ["text"],
    highlighter,
});
```

```csharp
using Milvus.Client.V2.Types;

const string collectionName = "highlighter_demo";

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_search_text"] = "true",   // Also highlight BM25 term
        ["highlight_query"] = "[{\"type\":\"TextMatch\",\"field\":\"text\",\"text\":\"my doc\"}]"
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = "sparse_vector",
    Texts = new[] { "test" },
    MetricType = MetricType.Bm25,
    Limit = 10,
    Parameters = highlighter
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
    data=["Milvus"],  # Query term to highlight
    anns_field="sparse_vector",
    limit=10,
    search_params=SEARCH_PARAMS,
    output_fields=["text"],
    # highlight-next-line
    highlighter=highlighter,
)

for i, hit in enumerate(results[0]):
    frags = hit.get('highlight', {}).get('text', {}).get('fragments', [])
    print(f"  Doc {i+1}: {frags}")
print()
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

String COLLECTION_NAME = "highlighter_demo";

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .highlightSearchText(true)
        .fragmentOffset(20)  // Keep 20 chars before match
        .fragmentSize(60)    // Max ~60 chars per fragment
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("Milvus")))
        .annsField("sparse_vector")
        .topK(10)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let collection_name = "highlighter_demo";

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .highlight_search_text(true)
    .fragment_offset(20)  // Keep 20 chars before match
    .fragment_size(60);   // Max ~60 chars per fragment

let res = client
    .search(
        SearchRequest::builder()
            .collection_name(collection_name)
            .vector_field("sparse_vector")
            .vectors(SearchVectors::EmbeddedText(vec!["Milvus".to_string()]))  // Query term
            .limit(10)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)
            .build()?,
    )
    .await?;
```

```cpp
const std::string collection_name = "highlighter_demo";

auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->WithHighlightSearchText(true);
highlighter->WithFragmentOffset(20);  // Keep 20 chars before match
highlighter->WithFragmentSize(60);    // Max ~60 chars per fragment

auto request = milvus::SearchRequest()
    .WithCollectionName(collection_name)
    .WithAnnsField("sparse_vector")
    .WithLimit(10)
    .AddOutputField("text")
    .AddEmbeddedText("Milvus")  // Query term to highlight
    .WithHighlighter(highlighter);

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const COLLECTION_NAME = "highlighter_demo";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_search_text: true,
    fragment_offset: 20,  // Keep 20 chars before match
    fragment_size: 60,    // Max ~60 chars per fragment
};

const res = await client.search({
    collection_name: COLLECTION_NAME,
    data: ["Milvus"],  // Query term to highlight
    anns_field: "sparse_vector",
    limit: 10,
    output_fields: ["text"],
    highlighter,
});
```

```csharp
using Milvus.Client.V2.Types;

const string collectionName = "highlighter_demo";

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_search_text"] = "true",
        ["fragment_offset"] = "20",   // Keep 20 chars before match
        ["fragment_size"] = "60"      // Max ~60 chars per fragment
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = "sparse_vector",
    Texts = new[] { "Milvus" },   // Query term to highlight
    MetricType = MetricType.Bm25,
    Limit = 10,
    Parameters = highlighter
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
        print(f"    {hit.get('highlight', {}).get('text', {}).get('fragments', [])}")
print()
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

String COLLECTION_NAME = "highlighter_demo";

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("{"))
        .postTags(Arrays.asList("}"))
        .highlightSearchText(true)
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Arrays.asList(new EmbeddedText("test"), new EmbeddedText("Milvus")))  // Two queries
        .annsField("sparse_vector")
        .topK(2)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let collection_name = "highlighter_demo";

let highlighter = LexicalHighlighter::new()
    .pre_tags(["{"])
    .post_tags(["}"])
    .highlight_search_text(true);

let res = client
    .search(
        SearchRequest::builder()
            .collection_name(collection_name)
            .vector_field("sparse_vector")
            // Two queries
            .vectors(SearchVectors::EmbeddedText(vec!["test".to_string(), "Milvus".to_string()]))
            .limit(2)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)
            .build()?,
    )
    .await?;
```

```cpp
const std::string collection_name = "highlighter_demo";

auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"{"});
highlighter->WithPostTags({"}"});
highlighter->WithHighlightSearchText(true);

auto request = milvus::SearchRequest()
    .WithCollectionName(collection_name)
    .WithAnnsField("sparse_vector")
    .WithLimit(2)
    .AddOutputField("text")
    .AddEmbeddedText("test")     // First query
    .AddEmbeddedText("Milvus")   // Second query
    .WithHighlighter(highlighter);

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const COLLECTION_NAME = "highlighter_demo";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["{"],
    post_tags: ["}"],
    highlight_search_text: true,
};

const res = await client.search({
    collection_name: COLLECTION_NAME,
    data: ["test", "Milvus"],  // Two queries
    anns_field: "sparse_vector",
    limit: 2,
    output_fields: ["text"],
    highlighter,
});
```

```csharp
using Milvus.Client.V2.Types;

const string collectionName = "highlighter_demo";

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"{\"]",
        ["post_tags"] = "[\"}\"]",
        ["highlight_search_text"] = "true"
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = "sparse_vector",
    Texts = new[] { "test", "Milvus" },   // Two queries
    MetricType = MetricType.Bm25,
    Limit = 2,
    Parameters = highlighter
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
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
    <a href="#go">Go</a>
    <a href="#rust">Rust</a>
    <a href="#cpp">C++</a>
    <a href="#javascript">NodeJS</a>
    <a href="#csharp">C#</a>
    <a href="#bash">cURL</a>
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
    print(f"  {hit.get('highlight', {}).get('text', {}).get('fragments', [])}")
print()
```

```java
import io.milvus.v2.common.IndexParam;
import io.milvus.v2.service.vector.request.SearchReq;
import io.milvus.v2.service.vector.request.data.EmbeddedText;
import io.milvus.v2.service.vector.request.highlighter.LexicalHighlighter;
import io.milvus.v2.service.vector.response.SearchResp;
import java.util.*;

String COLLECTION_NAME = "highlighter_demo";

LexicalHighlighter highlighter = LexicalHighlighter.builder()
        .preTags(Arrays.asList("<mark>"))
        .postTags(Arrays.asList("</mark>"))
        .highlightSearchText(true)
        .build();

SearchReq searchReq = SearchReq.builder()
        .collectionName(COLLECTION_NAME)
        .data(Collections.singletonList(new EmbeddedText("test")))
        .annsField("sparse_vector")
        .topK(2)
        .outputFields(Collections.singletonList("text"))
        .metricType(IndexParam.MetricType.BM25)
        .highlighter(highlighter)
        .build();

SearchResp searchResp = client.search(searchReq);
```

```go
// Note: the highlighter is not yet supported in milvus-sdk-go.
```

```rust
use milvus::v2::prelude::*;

let collection_name = "highlighter_demo";

let highlighter = LexicalHighlighter::new()
    .pre_tags(["<mark>"])
    .post_tags(["</mark>"])
    .highlight_search_text(true);

let res = client
    .search(
        SearchRequest::builder()
            .collection_name(collection_name)
            .vector_field("sparse_vector")
            .vectors(SearchVectors::EmbeddedText(vec!["test".to_string()]))
            .limit(2)
            .metric_type(MetricType::Bm25)
            .output_fields(["text"])
            .highlighter(highlighter)
            .build()?,
    )
    .await?;
```

```cpp
const std::string collection_name = "highlighter_demo";

auto highlighter = std::make_shared<milvus::LexicalHighlighter>();
highlighter->WithPreTags({"<mark>"});
highlighter->WithPostTags({"</mark>"});
highlighter->WithHighlightSearchText(true);

auto request = milvus::SearchRequest()
    .WithCollectionName(collection_name)
    .WithAnnsField("sparse_vector")
    .WithLimit(2)
    .AddOutputField("text")
    .AddEmbeddedText("test")
    .WithHighlighter(highlighter);

milvus::SearchResponse response;
auto status = client->Search(request, response);
```

```javascript
import { HighlightType } from "@zilliz/milvus2-sdk-node";

const COLLECTION_NAME = "highlighter_demo";

const highlighter = {
    type: HighlightType.Lexical,
    pre_tags: ["<mark>"],
    post_tags: ["</mark>"],
    highlight_search_text: true,
};

const res = await client.search({
    collection_name: COLLECTION_NAME,
    data: ["test"],
    anns_field: "sparse_vector",
    limit: 2,
    output_fields: ["text"],
    highlighter,
});
```

```csharp
using Milvus.Client.V2.Types;

const string collectionName = "highlighter_demo";

var highlighter = new SearchParameters
{
    OutputFields = { "text" },
    HighlightType = HighlightType.Lexical,
    Highlighter =
    {
        ["pre_tags"] = "[\"<mark>\"]",
        ["post_tags"] = "[\"</mark>\"]",
        ["highlight_search_text"] = "true"
    }
};

var results = await client.SearchAsync(new SearchReq
{
    CollectionName = collectionName,
    VectorFieldName = "sparse_vector",
    Texts = new[] { "test" },
    MetricType = MetricType.Bm25,
    Limit = 2,
    Parameters = highlighter
});
```

```bash
# Note: the highlighter is not yet supported in the RESTful API.
```

<details>

<summary>Expected output</summary>

```plaintext
['<mark>test</mark> doc']
['<mark>test</mark> doc']
```

</details>
