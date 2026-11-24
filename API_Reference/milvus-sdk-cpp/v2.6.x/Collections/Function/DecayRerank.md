# DecayRerank

Decay reranker for a single `Search`. Reduces scores for entities whose field values are far from an origin point using a decay curve.

```cpp
explicit DecayRerank(std::string name);
```

**METHODS:**

- `void SetFunction(const std::string& name)`

    Decay curve type: `"gauss"`, `"exp"`, or `"linear"`.

- `template<typename T> void SetOrigin(T val)`

    Reference point from which decay is calculated. Applicable to INT8/INT16/INT32/INT64/FLOAT/DOUBLE fields.

- `template<typename T> void SetOffset(T val)`

    Half-width of the no-decay zone around the origin where items retain full scores.

- `template<typename T> void SetScale(T val)`

    Distance from the origin at which the score equals the decay value.

- `void SetDecay(float val)`

    Score value at the scale distance (e.g., `0.5` means half the original score).

## Example

```cpp
#include <milvus/MilvusClientV2.h>
#include <iostream>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// Build a FunctionScore that decays rows far from the origin
auto decay = DecayRerank("my_decay");
decay.SetFunction("gauss");
decay.SetOrigin(50.0);
decay.SetScale(5.0);
auto score = FunctionScore().AddFunction(std::make_shared<DecayRerank>(decay));

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
