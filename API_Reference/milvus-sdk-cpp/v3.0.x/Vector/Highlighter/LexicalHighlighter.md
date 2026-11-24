# LexicalHighlighter

Lexical (BM25-style) highlighter that highlights matching query terms in the retrieved text fields. It derives from `Highlighter`.

```cpp
LexicalHighlighter();
```

**METHODS:**

- `const std::string& HighlightType() const`

    Gets the highlighter type, always "Lexical".

- `WithHighlightQueries(const std::vector<HighlightQuery>& queries)`

    Sets the highlight queries.

- `AddHighlightQuery(HighlightQuery query)` / `AddHighlightQuery(std::string type, std::string field, std::string text)`

    Adds a highlight query.

- `WithHighlightSearchText(bool value)`

    Sets whether the search input text is highlighted as well.

- `WithPreTags(const std::vector<std::string>& tags)` / `AddPreTag(std::string tag)`

    Sets or adds the pre-tags wrapping highlighted fragments.

- `WithPostTags(const std::vector<std::string>& tags)` / `AddPostTag(std::string tag)`

    Sets or adds the post-tags wrapping highlighted fragments.

- `WithFragmentOffset(int64_t value)`

    Sets the fragment offset.

- `WithFragmentSize(int64_t value)`

    Sets the fragment size in characters.

- `WithNumOfFragments(int64_t value)`

    Sets the number of fragments returned per field.

### HighlightQuery

A lexical highlight query: match `text` of the given `type` in a `field`.

- **type** (*std::string*) — Query type, e.g. "term" or "phrase".

- **field** (*std::string*) — Field to highlight.

- **text** (*std::string*) — Text to match.

## Example

Builds a lexical highlighter and passes it to `Search()`.

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = milvus::MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

auto highlighter = std::make_shared<LexicalHighlighter>();
highlighter->WithHighlightSearchText(true)
    .WithPreTags({"**"})
    .WithPostTags({"**"})
    .WithFragmentSize(80);

SearchRequest request;
request.WithCollectionName("my_collection").WithHighlighter(highlighter);
SearchResponse response;
auto status = client->Search(request, response);
```
