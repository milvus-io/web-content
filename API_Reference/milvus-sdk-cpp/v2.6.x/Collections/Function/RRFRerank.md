# RRFRerank

Reciprocal Rank Fusion reranker for `HybridSearch`. Combines multiple ranked lists by summing reciprocal ranks. Set via [FunctionScore](../../Vector/FunctionScore.md)`::AddFunction()` or `HybridSearchRequest::WithRerank()`.

```cpp
RRFRerank();
explicit RRFRerank(int k);
```

**PARAMETERS:**

- **k** (*int*)

    Smoothing constant that controls how steeply rank differences are penalized. Default: `60`.

**METHODS:**

- `Status SetK(int k)`

    Updates the smoothing constant after construction.

## Example

```cpp
#include <milvus/MilvusClientV2.h>
using namespace milvus;

auto client = MilvusClientV2::Create();
client->Connect(ConnectParam("http://localhost:19530").WithToken("root:Milvus"));

// HybridSearch with RRF reranking
auto reranker = std::make_shared<RRFRerank>(60);

auto sub1 = SubSearchRequest()
    .WithAnnsField("dense_vec")
    .WithLimit(10)
    .AddFloatVector({/* query vector */});

auto sub2 = SubSearchRequest()
    .WithAnnsField("sparse_vec")
    .WithLimit(10)
    .AddSparseVector(std::map<uint32_t, float>{{0, 0.3f}, {5, 0.7f}});

SearchResponse response;
auto status = client->HybridSearch(
    HybridSearchRequest()
        .WithCollectionName("my_collection")
        .WithLimit(5)
        .AddSubRequest(std::make_shared<SubSearchRequest>(std::move(sub1)))
        .AddSubRequest(std::make_shared<SubSearchRequest>(std::move(sub2)))
        .WithRerank(reranker),
    response);
```
