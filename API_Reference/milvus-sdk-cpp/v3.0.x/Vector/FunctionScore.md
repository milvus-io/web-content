# FunctionScore

This class holds a list of rerank function objects and optional extra parameters. Pass a `FunctionScorePtr` (a `std::shared_ptr<FunctionScore>`) to `SearchRequest::WithRerank()`. For `Search` use Boost, Decay, or Model functions. For the function subclass details see [Function](../Collections/Function/Function.md).

```cpp
using FunctionScorePtr = std::shared_ptr<FunctionScore>;

auto score = FunctionScore()
    .WithFunctions(functions)
    .AddFunction(function_ptr)
    .WithParams(params)
    .AddParam(key, value);
```

**METHODS:**

- `FunctionScore& WithFunctions(std::vector<FunctionPtr>&& functions)`

    Replaces the rerank-function list.

- `void SetFunctions(std::vector<FunctionPtr>&& functions)`

    Replaces the rerank-function list.

- `FunctionScore& AddFunction(const FunctionPtr& function)`

    Appends one rerank function.

- `FunctionScore& WithParams(std::unordered_map<std::string, nlohmann::json>&& params)`

    Replaces the extra parameter map used by the rerank functions.

- `void SetParams(std::unordered_map<std::string, nlohmann::json>&& params)`

    Replaces the extra parameter map used by the rerank functions.

- `FunctionScore& AddParam(const std::string& key, nlohmann::json&& param)`

    Adds or replaces one rerank parameter.

- `const std::vector<FunctionPtr>& Functions() const`

    Returns the configured rerank functions.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

    Returns the configured rerank parameters.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
#include <iostream>
using namespace milvus;

// Build a FunctionScore that boosts matching rows by 1.5x
auto boost = BoostRerank("my_boost");
boost.SetWeight(1.5f);
auto score = FunctionScore().AddFunction(std::make_shared<BoostRerank>(boost));

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

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
