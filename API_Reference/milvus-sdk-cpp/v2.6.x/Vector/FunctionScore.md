# FunctionScore

This class holds a list of rerank function objects and optional extra parameters. Pass a `FunctionScorePtr` (a `std::shared_ptr<FunctionScore>`) to `SearchArguments::WithFunctionScore()` or `HybridSearchRequest::WithFunctionScore()`. For `HybridSearch` use RRF or Weighted functions; for `Search` use Boost, Decay, or Model functions. For the function subclass details see Function.

```cpp
FunctionScore score;
FunctionScorePtr ptr = std::make_shared<FunctionScore>();

using FunctionScorePtr = std::shared_ptr<FunctionScore>;
```

## Request Syntax

```cpp
FunctionScore()
    .WithFunctions(functions)
    .AddFunction(function_ptr)
    .WithParams(params)
    .AddParam(key, value);
```

**REQUEST METHODS:**

- `FunctionScore& WithFunctions(std::vector<FunctionPtr>&& functions)`

    Replaces the function list with the provided vector. For Search, functions may be Boost/Decay/Model; for HybridSearch, use RRF/Weighted.

- `FunctionScore& AddFunction(const FunctionPtr& function)`

    Appends a single function to the list.

- `FunctionScore& WithParams(std::unordered_map<std::string, nlohmann::json>&& params)`

    Sets extra parameters for the rerank configuration (e.g., `{"max_score": 1.0}`).

- `FunctionScore& AddParam(const std::string& key, nlohmann::json&& param)`

    Adds a single extra parameter.

- `const std::vector<FunctionPtr>& Functions() const`

    Returns the list of functions.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

    Returns the extra parameters map.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto boost_fn = std::make_shared<BoostRerank>("price_boost");
boost_fn->SetFilter("price > 100");
boost_fn->SetWeight(1.5f);

auto score = std::make_shared<FunctionScore>();
score->AddFunction(boost_fn);

SearchResponse response;
auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));
client->Search(
    SearchRequest()
        .WithCollectionName("my_collection")
        .WithAnnsField("vec")
        .WithLimit(10)
        .WithFunctionScore(score)
        .AddFloatVector(std::vector<float>(128, 0.1f)),
    response);
```
