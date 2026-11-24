# Highlighter

The base class of a result highlighter for search. A highlighter serializes its configuration into a parameter map that is sent with the search request. Pass a `HighlighterPtr` (a `std::shared_ptr<Highlighter>`) to `SearchRequest::WithHighlighter()` or `SearchIteratorRequest::WithHighlighter()`.

```cpp
using HighlighterPtr = std::shared_ptr<Highlighter>;
```

**METHODS:**

- `virtual const std::string& HighlightType() const = 0`

    Gets the highlighter type, e.g. "Lexical" or "Semantic".

- `virtual const std::unordered_map<std::string, std::string>& Params() const`

    Gets the serialized configuration parameters of the highlighter.

## Related types

- [LexicalHighlighter](LexicalHighlighter.md)

- [SemanticHighlighter](SemanticHighlighter.md)

## Example

Attaches a highlighter to a `SearchRequest`.

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// Attach a highlighter to a search request
HighlighterPtr highlighter = std::make_shared<LexicalHighlighter>();
SearchRequest request;
request.WithCollectionName("my_collection").WithHighlighter(highlighter);
SearchResponse response;
auto status = client->Search(request, response);
```
