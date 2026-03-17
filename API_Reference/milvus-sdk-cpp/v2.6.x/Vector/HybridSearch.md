# HybridSearch()

This operation conducts a hybrid search within a collection based on the given parameters and returns the search results.

```cpp
Status HybridSearch(const HybridSearchRequest& request, HybridSearchResponse& response)
```

## Request Syntax

```cpp
auto request = HybridSearchRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .WithOutputFields(output_field_names)
    .WithConsistencyLevel(consistency_level)
    .WithSubRequests(requests)
    .WithRerank(rerank)
    .WithLimit(limit)
    .WithOffset(offset)
    .WithRoundDecimal(round_decimal)
    .WithIgnoreGrowing(ignore_growing)
    .WithGroupByField(field_name)
    .WithGroupSize(group_size)
    .WithStrictGroupSize(strict_group_size);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the names of the partitions. If it is empty, the default partition applies.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the output field names.

- `AddOutputField(const std::string& output_field)`

    Adds an output field.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level. 

- `WithSubRequests(std::vector<SubSearchRequestPtr>&& requests)`

    Sets a set of sub search requests.

- `AddSubRequest(const SubSearchRequestPtr& request)`

    Adds a sub search request.

- `WithRerank(const FunctionScorePtr& ranker)`

    Sets a reranker. For details, refer to [Weighted Ranker](https://milvus.io/docs/weighted-ranker.md), [RRF Ranker](https://milvus.io/docs/rrf-ranker.md), [Boost Ranker](https://milvus.io/docs/boost-ranker.md), [Decay Ranker](https://milvus.io/docs/decay-ranker-overview.md), and [Model Ranker](https://milvus.io/docs/model-ranker-overview.md).

- `WithLimit(int64_t limit)`

    Sets search limit (topk).

- `WithOffset(int64_t offset)`

    Sets an offset value.

- `WithRoundDecimal(int64_t round_decimal)`

    Sets the round decimal value.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets whether to ignore growing segments.

- `WithGroupByField(const std::string& field_name)`

    Sets the group by field value.

- `WithGroupSize(int64_t group_size)`

    Sets the group size value.

- `WithStrictGroupSize(bool strict_group_size)`

    Sets the strict group size flag.

**RETURNS:**

*Status* with *HybridSearchResponse*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// generate query vectors
std::mt19937 rng(std::random_device{}());
std::uniform_real_distribution<float> dist(0.0f, 1.0f);
std::vector<float> dense_vec(dimension);
std::generate(dense_vec.begin(), dense_vec.end(), [&]() { return dist(rng); });

std::uniform_int_distribution<uint32_t> idx_dist(0, 49);
std::map<uint32_t, float> sparse_vec;
for (int d = 0; d < 5; ++d) {
    sparse_vec[idx_dist(rng)] = dist(rng);
}

// do hybrid search
auto sub_req1 = milvus::SubSearchRequest()
                    .WithLimit(5)
                    .WithAnnsField(field_dense)
                    .WithFilter(field_flag + " == 5")
                    .AddFloatVector(dense_vec);

auto sub_req2 = milvus::SubSearchRequest()
                    .WithLimit(15)
                    .WithAnnsField(field_sparse)
                    .WithFilter(field_flag + " in [1, 3]")
                    .AddSparseVector(sparse_vec);

auto reranker = std::make_shared<milvus::WeightedRerank>(std::vector<float>{0.5, 0.5});

auto request =
    milvus::HybridSearchRequest()
        .WithCollectionName(collection_name)
        .WithLimit(10)
        .AddSubRequest(std::make_shared<milvus::SubSearchRequest>(std::move(sub_req1)))
        .AddSubRequest(std::make_shared<milvus::SubSearchRequest>(std::move(sub_req2)))
        .WithRerank(reranker)
        .AddOutputField(field_flag)
        .AddOutputField(field_text)
        // set to BOUNDED level to accept data inconsistency within a time window (default is 5 seconds)
        .WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);

milvus::SearchResponse response;
status = client->HybridSearch(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (auto& result : response.Results().Results()) {
    std::cout << "Result of one target vector:" << std::endl;
    milvus::EntityRows output_rows;
    status = result.OutputRows(output_rows);
    if (!status.IsOk()) {
        std::cout << status.Message() << std::endl;
    }
    for (const auto& row : output_rows) {
        std::cout << "\t" << row << std::endl;
    }
}
```
