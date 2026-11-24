# SemanticHighlighter

Semantic highlighter that highlights passages semantically related to the queries. It derives from `Highlighter`.

```cpp
SemanticHighlighter();
```

**METHODS:**

- `const std::string& HighlightType() const`

    Gets the highlighter type, always "Semantic".

- `WithQueries(const std::vector<std::string>& queries)` / `AddQuery(std::string query)`

    Sets or adds the highlight queries.

- `WithInputFields(const std::vector<std::string>& input_fields)` / `AddInputField(std::string input_field)`

    Sets or adds the input fields to highlight.

- `WithPreTags(const std::vector<std::string>& tags)` / `AddPreTag(std::string tag)`

    Sets or adds the pre-tags wrapping highlighted fragments.

- `WithPostTags(const std::vector<std::string>& tags)` / `AddPostTag(std::string tag)`

    Sets or adds the post-tags wrapping highlighted fragments.

- `WithThreshold(float value)`

    Sets the semantic similarity threshold for highlighting.

- `WithHighlightOnly(bool value)`

    Sets whether only highlighted content is returned.

- `WithModelDeploymentID(std::string value)`

    Sets the model deployment ID used for semantic highlighting.

- `WithMaxClientBatchSize(int64_t value)`

    Sets the maximum number of queries sent per batch.

## Example

Builds a semantic highlighter and passes it to `Search()`.

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = milvus::MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

auto highlighter = std::make_shared<SemanticHighlighter>();
highlighter->WithQueries({"What is Milvus?"})
    .WithInputFields({"text"})
    .WithThreshold(0.7f)
    .WithHighlightOnly(true);

SearchRequest request;
request.WithCollectionName("my_collection").WithHighlighter(highlighter);
SearchResponse response;
auto status = client->Search(request, response);
```
