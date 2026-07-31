# HybridSearch()

This operation conducts a hybrid search within a collection based on the given parameters and returns the search results.

## Request Syntax

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

