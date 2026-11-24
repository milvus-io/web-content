# WeightedRerank

Weighted reranker for `HybridSearch`. Assigns a scalar weight to each sub-search result and combines scores by weighted sum.

```cpp
explicit WeightedRerank(const std::vector<float>& weights);
```

**PARAMETERS:**

- **weights** (*std::vector<float>*)

    Weight for each sub-search, in the order the sub-requests are added to the `HybridSearchRequest`. Values should sum to 1.0 but are not required to.

**METHODS:**

- `Status SetWeights(const std::vector<float>& weights)`

    Replaces the weight vector.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// HybridSearch with WeightedRerank: weight each sub-search result
auto reranker = std::make_shared<WeightedRerank>(std::vector<float>{0.7f, 0.3f});

SearchResponse response;
auto status = client->HybridSearch(
    HybridSearchRequest()
        .WithCollectionName("my_collection")
        .WithLimit(5)
        .WithRerank(reranker),
    response);
```
