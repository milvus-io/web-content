# BoostRerank

Score-boost reranker for a single `Search`. Applies conditional score multipliers based on a filter expression.

```cpp
explicit BoostRerank(std::string name);
```

**METHODS:**

- `void SetFilter(const std::string& filter)`

    Boolean filter expression; entities matching the filter receive the boosted score.

- `void SetWeight(float weight)`

    Multiplicative factor applied to the baseline score for matching entities.

- `void SetRandomScoreField(const std::string& field)`

    Field used as a source of random scores (for score randomization).

- `void SetRandomScoreSeed(int64_t seed)`

    Seed for the random score generator.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
#include <iostream>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// Build a FunctionScore that boosts matching rows by 1.5x
auto boost = BoostRerank("my_boost");
boost.SetWeight(1.5f);
auto score = FunctionScore().AddFunction(std::make_shared<BoostRerank>(boost));

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
