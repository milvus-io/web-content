# SearchIterator()

This operation returns a SearchIterator object based on scalar field(s) by filtering expression. 

```cpp
Status SearchIterator(SearchIteratorRequest& request, SearchIteratorPtr& response)
```

<div class="alert note">

Do not disconnect the MilvusClientV2 when the iterator is in use. The order of the returned entities cannot be guaranteed. Read [this document](https://milvus.io/docs/with-iterators.md) for more.

</div>

## Request Syntax

```cpp
auto request = SearchIteratorRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .WithOutputFields(output_field_names)
    .WithConsistencyLevel(consistency_level)
    .WithBinaryVectors(vectors)
    .WithFloatVectors(vectors)
    .WithSparseVectors(vectors)
    .WithFloat16Vectors(vectors)
    .WithBFloat16Vectors(vectors)
    .WithEmbeddedTexts(texts)
    .WithInt8Vectors(vectors)
    .WithEmbeddingLists(emb_lists)
    .WithMetricType(metric_type)
    .WithExtraParams(std)
    .WithLimit(limit)
    .WithFilter(filter)
    .WithAnnsField(ann_field)
    .WithFilterTemplates(value)
    .WithOffset(offset)
    .WithRoundDecimal(round_decimal)
    .WithIgnoreGrowing(ignore_growing)
    .WithGroupByField(field_name)
    .WithGroupSize(group_size)
    .WithStrictGroupSize(strict_group_size)
    .WithRadius(radius)
    .WithRangeFilter(filter)
    .WithRerank(ranker)
    .WithTimezone(timezone);
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

- `AddBinaryVector(const std::string& vector)`

    Adds a binary vector to the search request. This method automatically converts the string array to a uint8 array.

- `AddFloatVector(const FloatVecFieldData::ElementT& vector)`

    Adds a float vector to the search request.

- `AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

    Adds a sparse vector to the search request.

- `AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

    Adds a float16 vector to the search request.

- `AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

    Adds a bfloat16 vector to the search request.

- `AddEmbeddedText(const std::string& text)`

    Adds a text to the search request. Only works for a BM25 function.

- `AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

    Adds an int8 vector to the search request.

- `AddEmbeddingList(EmbeddingList&& emb_list)`

    Adds an embedding list to the search request on struct field.

- `WithBinaryVectors(const std::vector<std::string>& vectors)`

    Assigns binary vectors to the search request. This method automatically converts the string array to uint8 array. Note: this method resets the vector list for the request.

- `WithFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)`

    Assigns float vectors to the search request.

    <div class="alert note">
    
    This method resets the request's vector list.

    </div>

- `WithSparseVectors(std::vector<SparseFloatVecFieldData::ElementT>&& vectors)`

    Assigns sparse vectors to the search request.

    <div class="alert note">
    
    This method resets the request's vector list.

    </div>

- `WithFloat16Vectors(std::vector<Float16VecFieldData::ElementT>&& vectors)`

    Assigns float16 vectors to the search request.

    <div class="alert note">
    
    This method resets the request's vector list.

    </div>

- `WithBFloat16Vectors(std::vector<BFloat16VecFieldData::ElementT>&& vectors)`

    Assigns bfloat16 vectors to the search request.

    <div class="alert note">
    
    This method resets the request's vector list.

    </div>

- `WithEmbeddedTexts(std::vector<std::string>&& texts)`

    Assigns texts to the search request. Only works for a BM25 function. 

    <div class="alert note">
    
    This method resets the request's vector list.

    </div>

- `WithInt8Vectors(std::vector<Int8VecFieldData::ElementT>&& vectors)`

    Assigns int8 vectors to the search request.

    <div class="alert note">
    
    This method resets the request's vector list.

    </div>

- `WithEmbeddingLists(std::vector<EmbeddingList>&& emb_lists)`

    Assigns embedding lists to the search request on a struct field. 

    <div class="alert note">
    
    This method resets the request's vector list.

    </div>

- `WithMetricType(::milvus::MetricType metric_type)`

    Sets the metric type.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Adds an additional parameter such as "nlist", "ef".

- `WithExtraParams(const std::unordered_map<std::string, std::string>& params)`

    Add a set of additional parameters, such as "nlist" and "ef".

- `WithLimit(int64_t limit)`

    Set search limit (topk). 

- `WithFilter(std::string filter)`

    Sets a filter expression.

- `WithAnnsField(const std::string& ann_field)`

    Sets the target field of an ann search.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds a filter template. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets filter templates. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

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

- `WithRadius(double radius)`

    Sets the range radius.

- `WithRangeFilter(double filter)`

    Sets the range filter.

- `WithRerank(const FunctionScorePtr& ranker)`

    Sets a reranker. For details, refer to [Weighted Ranker](https://milvus.io/docs/weighted-ranker.md), [RRF Ranker](https://milvus.io/docs/rrf-ranker.md), [Boost Ranker](https://milvus.io/docs/boost-ranker.md), [Decay Ranker](https://milvus.io/docs/decay-ranker-overview.md), and [Model Ranker](https://milvus.io/docs/model-ranker-overview.md).

- `WithTimezone(const std::string& timezone)`

    Sets the timezone. This applies only to the Timestamptz field. For details, refer to [this page](https://milvus.io/docs/single-vector-search.md#Temporarily-set-a-timezone-for-a-search).

**RETURNS:**

*Status* with *SearchIteratorPtr*

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

milvus::SearchIteratorRequest request;
request.SetCollectionName(collection_name);
request.SetBatchSize(batch);
request.SetLimit(limit);
request.SetAnnsField(field_face);
request.SetFilter(filter);
request.AddOutputField(field_name);
request.AddOutputField(field_age);
request.AddOutputField("b");  // dynamic field
// SearchIterator only accepts one vector
std::vector<float> vector(dimension);
for (auto d = 0; d < dimension; ++d) {
    vector[d] = 1.0f;
}
request.AddFloatVector(vector);

milvus::SearchIteratorPtr iterator;
status = client->SearchIterator(request, iterator);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::set<int64_t> ids;
int pages = 0;
uint64_t total_count = 0;
while (true) {
    milvus::SingleResult batch_results;
    status = iterator->Next(batch_results);
    if (!status.IsOk()) {
        std::cout << status.Message() << std::endl;
    }
    auto batch_count = batch_results.GetRowCount();
    if (batch_count == 0) {
        std::cout << "search iteration finished" << std::endl;
        break;
    }
    pages++;
    total_count += batch_count;

    milvus::EntityRows rows;
    status = batch_results.OutputRows(rows);
    if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
    std::cout << "No." << std::to_string(pages) << " page " << std::to_string(rows.size()) << " rows fetched"
              << std::endl;
    std::cout << "\tthe first row: " << (*rows.begin()).dump() << std::endl;
    std::cout << "\tthe last row: " << (*rows.rbegin()).dump() << std::endl;
    for (const auto& row : rows) {
        // std::cout << row.dump() << std::endl;
        ids.insert(row[field_id].get<int64_t>());
    }
}
```
