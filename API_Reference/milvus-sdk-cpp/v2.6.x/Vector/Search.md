# Search()

This operation performs an approximate nearest neighbor (ANN) search on a collection with the query vectors, primary keys, or texts carried in the SearchRequest, and returns the matched results through the SearchResponse parameter. The request is validated before it is sent, and the call fails if no query targets are provided.

```cpp
Status Search(const SearchRequest& request, SearchResponse& response)
```

## Request Syntax

```cpp
auto request = SearchRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .AddPartitionName(partition_name)
    .WithOutputFields(output_field_names)
    .AddOutputField(output_field)
    .WithConsistencyLevel(consistency_level)
    .AddFilterTemplate(key, filter_template)
    .AddBinaryVector(vector)
    .AddBinaryVector(vector)
    .AddFloatVector(vector)
    .AddSparseVector(vector)
    .AddSparseVector(vector)
    .AddFloat16Vector(vector)
    .AddFloat16Vector(vector)
    .AddBFloat16Vector(vector)
    .AddBFloat16Vector(vector)
    .AddEmbeddedText(text)
    .AddInt8Vector(vector)
    .AddEmbeddingList(emb_list)
    .AddExtraParam(key, value)
    .AddBinaryVector(field_name, vector)
    .AddBinaryVector(field_name, vector)
    .AddFloatVector(field_name, vector)
    .AddSparseVector(field_name, vector)
    .AddSparseVector(field_name, vector)
    .AddFloat16Vector(field_name, vector)
    .AddFloat16Vector(field_name, vector)
    .AddBFloat16Vector(field_name, vector)
    .AddBFloat16Vector(field_name, vector)
    .AddEmbeddedText(field_name, text)
    .AddInt8Vector(field_name, vector)
    .WithBinaryVectors(vectors)
    .WithBinaryVectors(vectors)
    .WithFloatVectors(vectors)
    .WithSparseVectors(vectors)
    .WithSparseVectors(vectors)
    .WithFloat16Vectors(vectors)
    .WithFloat16Vectors(vectors)
    .WithBFloat16Vectors(vectors)
    .WithBFloat16Vectors(vectors)
    .WithEmbeddedTexts(texts)
    .WithInt8Vectors(vectors)
    .WithEmbeddingLists(emb_lists)
    .WithIDs(id_array)
    .WithIDs(id_array)
    .WithMetricType(metric_type)
    .WithExtraParams(params)
    .WithLimit(limit)
    .WithFilter(filter)
    .WithAnnsField(ann_field)
    .WithFilterTemplates(filter_templates)
    .WithOffset(offset)
    .WithRoundDecimal(round_decimal)
    .WithIgnoreGrowing(ignore_growing)
    .WithGroupByField(field_name)
    .WithGroupSize(group_size)
    .WithStrictGroupSize(strict_group_size)
    .WithRadius(radius)
    .WithRangeFilter(filter)
    .WithRerank(ranker)
    .WithTimezone(timezone)
    .WithHighlighter(highlighter);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database is used if the name is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to search.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the names of partitions to search. If the set is empty, the entire collection is searched. Optional.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name to the search scope. Optional.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the names of the fields to return in the search results. Optional.

- `AddOutputField(const std::string& output_field)`

    Adds a field name to return in the search results. Optional.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level of the search, such as ConsistencyLevel::STRONG or ConsistencyLevel::BOUNDED. Optional.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds a filter template that provides values for placeholders in the filter expression, improving parsing performance for complicated expressions. A template value can be boolean, numeric, string, or array, and templates take effect only when the filter expression is not empty. Optional.

- `AddBinaryVector(const std::string& vector)`

    Adds a binary vector to search as a query target. The std::string overload automatically converts the string to a uint8 array.

- `AddBinaryVector(const BinaryVecFieldData::ElementT& vector)`

    Adds a binary vector to search as a query target. The std::string overload automatically converts the string to a uint8 array.

- `AddFloatVector(const FloatVecFieldData::ElementT& vector)`

    Adds a float vector to search as a query target.

- `AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

    Adds a sparse vector to search as a query target. Supported forms are a JSON dict such as {"1": 0.1, "5": 0.2, "8": 0.15} or a JSON dict with "indices" and "values" arrays.

- `AddSparseVector(const nlohmann::json& vector)`

    Adds a sparse vector to search as a query target. Supported forms are a JSON dict such as {"1": 0.1, "5": 0.2, "8": 0.15} or a JSON dict with "indices" and "values" arrays.

- `AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

    Adds a float16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to float16 binary.

- `AddFloat16Vector(const std::vector<float>& vector)`

    Adds a float16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to float16 binary.

- `AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

    Adds a bfloat16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddBFloat16Vector(const std::vector<float>& vector)`

    Adds a bfloat16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddEmbeddedText(const std::string& text)`

    Adds query text to search on a collection with a BM25 function.

- `AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

    Adds an int8 vector to search as a query target.

- `AddEmbeddingList(EmbeddingList&& emb_list)`

    Adds an embedding list to search on a struct field.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Adds an index-specific search parameter, such as "nlist" or "ef". Optional.

- `AddBinaryVector(std::string field_name, const std::string& vector)`

    Adds a binary vector to search as a query target. The std::string overload automatically converts the string to a uint8 array.

- `AddBinaryVector(std::string field_name, const BinaryVecFieldData::ElementT& vector)`

    Adds a binary vector to search as a query target. The std::string overload automatically converts the string to a uint8 array.

- `AddFloatVector(std::string field_name, const FloatVecFieldData::ElementT& vector)`

    Adds a float vector to search as a query target.

- `AddSparseVector(std::string field_name, const SparseFloatVecFieldData::ElementT& vector)`

    Adds a sparse vector to search as a query target. Supported forms are a JSON dict such as {"1": 0.1, "5": 0.2, "8": 0.15} or a JSON dict with "indices" and "values" arrays.

- `AddSparseVector(std::string field_name, const nlohmann::json& vector)`

    Adds a sparse vector to search as a query target. Supported forms are a JSON dict such as {"1": 0.1, "5": 0.2, "8": 0.15} or a JSON dict with "indices" and "values" arrays.

- `AddFloat16Vector(std::string field_name, const Float16VecFieldData::ElementT& vector)`

    Adds a float16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to float16 binary.

- `AddFloat16Vector(std::string field_name, const std::vector<float>& vector)`

    Adds a float16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to float16 binary.

- `AddBFloat16Vector(std::string field_name, const BFloat16VecFieldData::ElementT& vector)`

    Adds a bfloat16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddBFloat16Vector(std::string field_name, const std::vector<float>& vector)`

    Adds a bfloat16 vector to search as a query target. The std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddEmbeddedText(std::string field_name, const std::string& text)`

    Adds query text to search on a collection with a BM25 function.

- `AddInt8Vector(std::string field_name, const Int8VecFieldData::ElementT& vector)`

    Adds an int8 vector to search as a query target.

- `WithBinaryVectors(const std::vector<std::string>& vectors)`

    Assigns binary vectors to search as query targets, replacing any vectors previously assigned. The std::string overload automatically converts the string array to a uint8 array.

- `WithBinaryVectors(std::vector<BinaryVecFieldData::ElementT>&& vectors)`

    Assigns binary vectors to search as query targets, replacing any vectors previously assigned. The std::string overload automatically converts the string array to a uint8 array.

- `WithFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)`

    Assigns float vectors to search as query targets, replacing any vectors previously assigned.

- `WithSparseVectors(std::vector<SparseFloatVecFieldData::ElementT>&& vectors)`

    Assigns sparse vectors to search as query targets, replacing any vectors previously assigned. Supported forms are a JSON dict such as {"1": 0.1, "5": 0.2, "8": 0.15} or a JSON dict with "indices" and "values" arrays.

- `WithSparseVectors(const std::vector<nlohmann::json>& vectors)`

    Assigns sparse vectors to search as query targets, replacing any vectors previously assigned. Supported forms are a JSON dict such as {"1": 0.1, "5": 0.2, "8": 0.15} or a JSON dict with "indices" and "values" arrays.

- `WithFloat16Vectors(std::vector<Float16VecFieldData::ElementT>&& vectors)`

    Assigns float16 vectors to search as query targets, replacing any vectors previously assigned. The std::vector<std::vector<float>> overload automatically converts the float arrays to float16 binary.

- `WithFloat16Vectors(const std::vector<std::vector<float>>& vectors)`

    Assigns float16 vectors to search as query targets, replacing any vectors previously assigned. The std::vector<std::vector<float>> overload automatically converts the float arrays to float16 binary.

- `WithBFloat16Vectors(std::vector<BFloat16VecFieldData::ElementT>&& vectors)`

    Assigns bfloat16 vectors to search as query targets, replacing any vectors previously assigned. The std::vector<std::vector<float>> overload automatically converts the float arrays to bfloat16 binary.

- `WithBFloat16Vectors(const std::vector<std::vector<float>>& vectors)`

    Assigns bfloat16 vectors to search as query targets, replacing any vectors previously assigned. The std::vector<std::vector<float>> overload automatically converts the float arrays to bfloat16 binary.

- `WithEmbeddedTexts(std::vector<std::string>&& texts)`

    Assigns query texts to search on a collection with a BM25 function, replacing any vectors previously assigned.

- `WithInt8Vectors(std::vector<Int8VecFieldData::ElementT>&& vectors)`

    Assigns int8 vectors to search as query targets, replacing any vectors previously assigned.

- `WithEmbeddingLists(std::vector<EmbeddingList>&& emb_lists)`

    Assigns embedding lists to search on a struct field, replacing any vectors previously assigned.

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets the integer or string primary keys whose stored vectors are used as search targets. IDs and target vectors cannot be specified at the same time.

- `WithIDs(std::vector<std::string>&& id_array)`

    Sets the integer or string primary keys whose stored vectors are used as search targets. IDs and target vectors cannot be specified at the same time.

- `WithMetricType(::milvus::MetricType metric_type)`

    Sets the metric type of the search, such as MetricType::L2, MetricType::IP, or MetricType::COSINE. Optional.

- `WithExtraParams(const std::unordered_map<std::string, std::string>& params)`

    Sets index-specific search parameters, such as "nlist" or "ef". Optional.

- `WithLimit(int64_t limit)`

    Sets the search limit (topk), the maximum number of results returned per query target. The value is stored in the extra parameters. Optional.

- `WithFilter(std::string filter)`

    Sets the filter expression used to constrain the search scope. Optional.

- `WithAnnsField(const std::string& ann_field)`

    Sets the target vector field of the ann search. Needed when the collection has multiple vector fields; the server infers the field when the collection has only one. Optional.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets the filter templates as a key-value map. Templates take effect only when the filter expression is not empty. Optional.

- `WithOffset(int64_t offset)`

    Sets the number of results to skip. The value is stored in the extra parameters. Optional.

- `WithRoundDecimal(int64_t round_decimal)`

    Sets the number of decimal places the returned distances are rounded to. Optional.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets whether to ignore growing segments during the search. Optional.

- `WithGroupByField(const std::string& field_name)`

    Sets the scalar field whose values group the search results. Optional.

- `WithGroupSize(int64_t group_size)`

    Sets the group size value used with WithGroupByField. Optional.

- `WithStrictGroupSize(bool strict_group_size)`

    Sets the strict group size flag used with WithGroupByField. Optional.

- `WithRadius(double radius)`

    Sets the range radius, the outer distance boundary of a range search. The value is stored in the extra parameters. Optional.

- `WithRangeFilter(double filter)`

    Sets the range filter, the inner distance boundary that together with the radius defines the distance range a match must fall within. The value is stored in the extra parameters. Optional.

- `WithRerank(const FunctionScorePtr& ranker)`

    Sets the reranker of the search. Multiple rerank functions such as Boost, Decay, and Model are supported. Optional.

- `WithTimezone(const std::string& timezone)`

    Sets the timezone, which takes effect for Timestamptz fields. Optional.

- `WithHighlighter(const HighlighterPtr& highlighter)`

    Sets the highlighter used to highlight matched text in the results. Optional.

<table>
   <tr>
     <th><p>Schema DataType</p></th>
     <th><p>Request methods</p></th>
     <th><p>C++ representation</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p><code>FLOAT_VECTOR</code></p></td>
     <td><p><code>AddFloatVector()</code>, <code>WithFloatVectors()</code></p></td>
     <td><p><code>std::vector&lt;float&gt;</code></p></td>
     <td><p>Dense float vectors.</p></td>
   </tr>
   <tr>
     <td><p><code>BINARY_VECTOR</code></p></td>
     <td><p><code>AddBinaryVector()</code>, <code>WithBinaryVectors()</code></p></td>
     <td><p>Binary bytes or string convenience input</p></td>
     <td><p>Uses the dedicated binary-vector representation.</p></td>
   </tr>
   <tr>
     <td><p><code>SPARSE_FLOAT_VECTOR</code></p></td>
     <td><p><code>AddSparseVector()</code>, <code>WithSparseVectors()</code></p></td>
     <td><p><code>std::map&lt;uint32_t, float&gt;</code> or supported JSON form</p></td>
     <td><p>Sparse index-value pairs.</p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT16_VECTOR</code></p></td>
     <td><p><code>AddFloat16Vector()</code>, <code>WithFloat16Vectors()</code></p></td>
     <td><p><code>std::vector&lt;uint16_t&gt;</code> or convertible float vectors</p></td>
     <td><p>Float overloads perform conversion.</p></td>
   </tr>
   <tr>
     <td><p><code>BFLOAT16_VECTOR</code></p></td>
     <td><p><code>AddBFloat16Vector()</code>, <code>WithBFloat16Vectors()</code></p></td>
     <td><p><code>std::vector&lt;uint16_t&gt;</code> or convertible float vectors</p></td>
     <td><p>Float overloads perform conversion.</p></td>
   </tr>
   <tr>
     <td><p><code>INT8_VECTOR</code></p></td>
     <td><p><code>AddInt8Vector()</code>, <code>WithInt8Vectors()</code></p></td>
     <td><p><code>std::vector&lt;int8_t&gt;</code></p></td>
     <td><p>Dense signed-byte vectors.</p></td>
   </tr>
   <tr>
     <td><p>Function or struct-field input</p></td>
     <td><p><code>AddEmbeddedText()</code> / <code>WithEmbeddedTexts()</code>; <code>AddEmbeddingList()</code> / <code>WithEmbeddingLists()</code></p></td>
     <td><p><code>std::string</code> or <code>EmbeddingList</code></p></td>
     <td><p>Use embedded text for supported functions and embedding lists for struct-field ANN search.</p></td>
   </tr>
</table>

**RETURNS:**

*Status*

Returns a Status indicating whether the search succeeded; on success the response carries per-query results, each holding the matched primary keys with their scores and any requested output fields.

- **response** (*SearchResponse*) -

    - **Results** (*const SearchResults&*) -

        Get result of search operation.

        - **Results** (*const std::vector<SingleResult>&*) -

            Get search results.

            - **Scores** (*const std::vector<float>&*) -

                Distances/scores array of one target vector.

            - **Ids** (*IDArray*) -

                Topk id array of one target vector. Note: the returned IDArray is a temporary object copied from FieldData. It is recommended to use OutputField() method like this: FieldDataPtr ids = result.OutputField(result.PrimaryKeyName());.

                - **IsIntegerID** (*bool*) -

                    Indicate this is an integer id array.

                - **IntIDArray** (*const std::vector<int64_t>&*) -

                    Return integer id array.

                - **StrIDArray** (*const std::vector<std::string>&*) -

                    Return string id array.

                - **GetRowCount** (*uint64_t*) -

                    Get row count.

            - **PrimaryKeyName** (*const std::string&*) -

                The primary key name. Sometimes the caller of Search() doesn't know the pk name, the server returns this name, so that you don't need to describe the collection again.

            - **ScoreName** (*const std::string&*) -

                Score field name in search result. Note: the default score name is "score", but if your collection schema already has a "score" field, and the "score" field is an output field, the score name will be changed to "_score". If "_score" is also duplicated, then the score name will be changed to "__score", etc.

            - **OutputFields** (*const std::vector<FieldDataPtr>&*) -

                Output fields data.

                - **Name** (*const std::string&*) -

                    Get field name.

                - **Type** ([DataType](../Collections/DataType.md)) -

                    Get field data type.

                - **ElementType** ([DataType](../Collections/DataType.md)) -

                    Get the element type for an array field.

                - **Count** (*size_t*) -

                    Total number of field elements.

            - **OutputField** (*FieldDataPtr*) -

                Get an output field by name.

                - **Name** (*const std::string&*) -

                    Get field name.

                - **Type** ([DataType](../Collections/DataType.md)) -

                    Get field data type.

                - **ElementType** ([DataType](../Collections/DataType.md)) -

                    Get the element type for an array field.

                - **Count** (*size_t*) -

                    Total number of field elements.

            - **OutputFieldNames** (*const std::set<std::string>&*) -

                Output field names specified by search().

            - **OutputRows** (*Status*) -

                Get all output rows.

            - **OutputRow** (*Status*) -

                Get row data. Returns INVALID_ARGUMENT status if the i is out of bound.

            - **OutputHighlightResult** (*Status*) -

                Get highlight results of one row. Returns INVALID_ARGUMENT status if the i is out of bound.

                - **field_name** (*std::string*) -

                - **fragments** (*std::vector<std::string>*) -

                - **scores** (*std::vector<float>*) -

            - **GetRowCount** (*uint64_t*) -

                Get row count of the result.

        - **Recalls** (*const std::vector<float>&*) -

            Get recalls of search results. Note: only works when search with enable_recall_calculation is true on zilliz cloud instance.

    - **SessionTs** (*uint64_t*) -

    - **Cost** (*int64_t*) -

    - **ScannedRemoteBytes** (*int64_t*) -

    - **ScannedTotalBytes** (*int64_t*) -

    - **CacheHitRatio** (*float*) -

**ERROR HANDLING:**

- **std::exception**

    When building the request, communicating with the server, or processing the response fails. Inspect the exception message or the returned Status for failure details.

## Example

Search a collection with float query vectors and read back the matched scores.

```cpp
#include <iostream>
#include <vector>
#include "milvus/MilvusClientV2.h"

auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::vector<milvus::FloatVecFieldData::ElementT> query_vectors = {{0.1f, 0.2f, 0.3f, 0.4f}};

auto request = milvus::SearchRequest()
                   .WithCollectionName("book")
                   .WithAnnsField("book_intro")
                   .WithFloatVectors(std::move(query_vectors))
                   .WithLimit(3);

milvus::SearchResponse response;
status = client->Search(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

for (const auto& result : response.Results().Results()) {
    for (const float score : result.Scores()) {
        std::cout << "score: " << score << std::endl;
    }
}
```
