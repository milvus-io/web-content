# ModelRerank

Model-based reranker for a single `Search`. Sends search results to an external reranking model for rescoring.

```cpp
explicit ModelRerank(std::string name);
```

**METHODS:**

- `void SetProvider(const std::string& name)`

    Reranking service provider name.

- `void SetQueries(const std::vector<std::string>& queries)`

    List of query strings passed to the model. The count must match the number of queries in the search operation.

- `void SetEndpoint(const std::string& url)`

    URL of the reranking model service.

- `void SetMaxClientBatchSize(int64_t val)`

    Maximum number of documents processed per batch.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
#include <iostream>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// Build a FunctionScore that rescored rows with an external model
auto model = ModelRerank("my_model");
model.SetProvider("cohere");
model.SetEndpoint("https://api.example.com/rerank");
model.SetQueries({"What is Milvus?"});
auto score = FunctionScore().AddFunction(std::make_shared<ModelRerank>(model));

SearchResponse response;
auto status = client->Search(
    SearchRequest()
        .WithCollectionName("my_collection")
        .WithAnnsField("vector")
        .AddFloatVector({0.1f, 0.2f, 0.3f})
        .WithRerank(std::make_shared<FunctionScore>(score))
        .WithLimit(1),
    response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
