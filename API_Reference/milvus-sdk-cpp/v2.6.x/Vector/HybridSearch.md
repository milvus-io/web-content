# HybridSearch()

This operation runs multiple sub-search requests against a collection in a single call and fuses their hits with the reranking function carried by the request (such as an [RRFRerank](../Collections/Function.md) or [WeightedRerank](../Collections/Function.md)). Each sub-search targets one vector field with its own query vector, filter, and limit.

```cpp
Status HybridSearch(const HybridSearchRequest& request, HybridSearchResponse& response)
```

## Request Syntax

```cpp
auto request = HybridSearchRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .AddPartitionName(partition_name)
    .WithOutputFields(output_field_names)
    .AddOutputField(output_field)
    .WithConsistencyLevel(consistency_level)
    .WithSubRequests(requests)
    .AddSubRequest(request)
    .WithRerank(rerank)
    .WithLimit(limit)
    .WithOffset(offset)
    .WithRoundDecimal(round_decimal)
    .WithIgnoreGrowing(ignore_growing)
    .AddExtraParam(key, value)
    .WithGroupByField(field_name)
    .WithGroupSize(group_size)
    .WithStrictGroupSize(strict_group_size);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name to search; the default database is used when it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to search.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names to search; if the set is empty, the entire collection is searched. The setter takes an rvalue, so pass a moved-in or temporary std::set<std::string>.

- `SetPartitionNames(std::set<std::string>&& partition_names)`

    Set the partition names. If partition names are empty, the entire collection is queried.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name to the set of partitions to search.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the names of the fields to return in the results. The setter takes an rvalue, so pass a moved-in or temporary std::set<std::string>.

- `SetOutputFields(std::set<std::string>&& output_field_names)`

    Set the output field names.

- `AddOutputField(const std::string& output_field)`

    Adds an output field name to the set of fields returned in the results.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level of the search; see the Milvus consistency level documentation for details.

- `SetConsistencyLevel(::milvus::ConsistencyLevel consistency_level)`

    Set the consistency level.

- `WithSubRequests(std::vector<SubSearchRequestPtr>&& requests)`

    Sets the whole list of sub-search requests to run. The setter takes an rvalue, so pass a moved-in or temporary std::vector<SubSearchRequestPtr>.

- `SetSubRequests(std::vector<SubSearchRequestPtr>&& requests)`

    Set sub search requests.

- `AddSubRequest(const SubSearchRequestPtr& request)`

    Adds one sub-search request (a single-vector-field search) to the hybrid search.

- `WithRerank(const FunctionPtr& rerank)`

    Sets the reranking function that fuses the sub-search results, such as an [RRFRerank](../Collections/Function.md) or [WeightedRerank](../Collections/Function.md) function.

- `SetRerank(const FunctionPtr& rerank)`

    Set rerank, such as RRF/Weighted function. Read the doc for more info: https://milvus.io/docs/reranking.md

- `WithLimit(int64_t limit)`

    Sets the search limit (topk), the maximum number of fused results to return.

- `SetLimit(int64_t limit)`

    Set search limit(topk)

- `WithOffset(int64_t offset)`

    Sets the offset of the first result to return. Note: this value is stored in the extra parameters.

- `SetOffset(int64_t offset)`

    Set offset value. Note: this value is stored in the ExtraParams.

- `WithRoundDecimal(int64_t round_decimal)`

    Sets the number of decimal places to which returned similarity scores are rounded.

- `SetRoundDecimal(int64_t round_decimal)`

    Set round decimal value.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets the ignore-growing flag, which controls whether data in growing segments is excluded from the search.

- `SetIgnoreGrowing(bool ignore_growing)`

    Set ignore growing flag.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Adds an extra engine parameter, such as "nlist" or "ef", by key and value.

- `WithGroupByField(const std::string& field_name)`

    Sets the field whose values are used to group the search results.

- `SetGroupByField(const std::string& field_name)`

    Set group by field value.

- `WithGroupSize(int64_t group_size)`

    Sets the group size value, the maximum number of results allowed per group.

- `SetGroupSize(int64_t group_size)`

    Set group size value.

- `WithStrictGroupSize(bool strict_group_size)`

    Sets the strict group size flag, which controls whether the group size is strictly enforced.

- `SetStrictGroupSize(bool strict_group_size)`

    Set strict group size flag.

Vector request payloads use [FieldData](FieldData.md) instances.

<table>
   <tr>
     <th><p>Schema [DataType](../Collections/DataType.md)</p></th>
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
     <td><p>[Function](../Collections/Function.md) or struct-field input</p></td>
     <td><p><code>AddEmbeddedText()</code> / <code>WithEmbeddedTexts()</code>; <code>AddEmbeddingList()</code> / <code>WithEmbeddingLists()</code></p></td>
     <td><p><code>std::string</code> or <code>EmbeddingList</code></p></td>
      <td><p>Use embedded text for supported functions and embedding lists for struct-field ANN search.</p></td>
   </tr>
</table>

### SubSearchRequest

```cpp
SubSearchRequest()
    .WithAnnsField(field_name)
    .WithLimit(limit)
    .WithFilter(filter)
    .WithMetricType(metric_type)
    .WithTimezone(tz)
    .AddFloatVector(vector)       // or any Add*/With* vector method
    .WithFloatVectors(vectors);   // batch assignment
```

**REQUEST METHODS:**

- `WithAnnsField(const std::string& ann_field)`

    Sets the target field of the ANN search.

- `WithLimit(int64_t limit)`

    Sets the search limit (topk) of this sub search.

- `SetLimit(int64_t limit)`

    Set search limit(topk)

- `WithFilter(std::string filter)`

    Sets the filter expression of this sub search.

- `WithMetricType(milvus::MetricType metric_type)`

    Specifies the metric type of this sub search.

- `WithTimezone(const std::string& timezone)`

    Sets the timezone; it takes effect for Timestamptz fields.

**Inherited vector methods** (all return `SubSearchRequest&` for chaining):

- `AddFloatVector(const FloatVecFieldData::ElementT& vector)`

    Appends one dense float vector.

- `AddBinaryVector(const std::string& vector)`

    Appends one binary vector; the string overload converts the string to binary bytes.

- `AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

    Appends one sparse vector from index-value data.

- `AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

    Appends one float16 vector.

- `AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

    Appends one bfloat16 vector.

- `AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

    Appends one dense int8 vector.

- `AddEmbeddedText(const std::string& text)`

    Appends embedded text for a supported text-embedding function such as BM25.

- `AddEmbeddingList(EmbeddingList&& emb_list)` — for struct-field ANN

    Adds an embedding list for struct-field ANN search.

- `WithFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)` — batch

    Sets the dense float vectors in batch.

- `WithSparseVectors(...)`, `WithFloat16Vectors(...)`, etc. — batch variants

    Batch variants of the corresponding add methods.

### EmbeddingList

This class holds one or more query vectors of the same type, used as the target vectors for a `SearchRequest`, `SubSearchRequest`, or struct-field ANN search via `AddEmbeddingList()`. Build an `EmbeddingList` by calling the Add*/Set* methods, then pass it to `SearchRequestBase::AddEmbeddingList()`.

```cpp
EmbeddingList list;
```

**METHODS:**

**Read methods:**

- `FieldDataPtr TargetVectors() const`

    Returns the underlying field data containing all vectors.

- `size_t Count() const`

    Returns the number of vectors added.

- `int64_t Dim() const`

    Returns the vector dimension. For embedded-text mode the value is `0`.

**Single-vector add methods:**

- `Status AddFloatVector(const FloatVecFieldData::ElementT& vector)`

    Appends one dense float vector.

- `Status AddBinaryVector(const std::string& vector)`

    Appends one binary vector. The string overload converts the string to binary bytes.

- `Status AddBinaryVector(const BinaryVecFieldData::ElementT& vector)`

    Appends one binary vector. The string overload converts the string to binary bytes.

- `Status AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

    Appends one sparse vector from index-value data or a supported JSON representation.

- `Status AddSparseVector(const nlohmann::json& vector)`

    Appends one sparse vector from index-value data or a supported JSON representation.

- `Status AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

    Appends one float16 vector. The float-vector overload converts values to float16.

- `Status AddFloat16Vector(const std::vector<float>& vector)` — auto-converts float to float16

    Appends one float16 vector. The float-vector overload converts values to float16.

- `Status AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

    Appends one bfloat16 vector. The float-vector overload converts values to bfloat16.

- `Status AddBFloat16Vector(const std::vector<float>& vector)` — auto-converts float to bfloat16

    Appends one bfloat16 vector. The float-vector overload converts values to bfloat16.

- `Status AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

    Appends one dense int8 vector.

- `Status AddEmbeddedText(const std::string& text)` — for BM25 text-embedding

    Appends text for a supported text-embedding function such as BM25.

**Batch set methods (reset the list):**

- `Status SetFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)`

    Replaces the current list with dense float vectors.

- `Status SetBinaryVectors(const std::vector<std::string>& vectors)`

    Replaces the current list with binary vectors.

- `Status SetBinaryVectors(std::vector<BinaryVecFieldData::ElementT>&& vectors)`

    Replaces the current list with binary vectors.

- `Status SetSparseVectors(std::vector<SparseFloatVecFieldData::ElementT>&& vectors)`

    Replaces the current list with sparse vectors.

- `Status SetSparseVectors(const std::vector<nlohmann::json>& vectors)`

    Replaces the current list with sparse vectors.

- `Status SetFloat16Vectors(std::vector<Float16VecFieldData::ElementT>&& vectors)`

    Replaces the current list with float16 vectors; float input is converted when applicable.

- `Status SetFloat16Vectors(const std::vector<std::vector<float>>& vectors)` — auto-converts

    Replaces the current list with float16 vectors; float input is converted when applicable.

- `Status SetBFloat16Vectors(std::vector<BFloat16VecFieldData::ElementT>&& vectors)`

    Replaces the current list with bfloat16 vectors; float input is converted when applicable.

- `Status SetBFloat16Vectors(const std::vector<std::vector<float>>& vectors)` — auto-converts

    Replaces the current list with bfloat16 vectors; float input is converted when applicable.

- `Status SetInt8Vectors(std::vector<Int8VecFieldData::ElementT>&& vectors)`

    Replaces the current list with dense int8 vectors.

- `Status SetEmbeddedTexts(std::vector<std::string>&& texts)` — for BM25 text-embedding

    Replaces the current list with text input for a supported embedding function.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) reporting success or failure, while the response output parameter carries the fused, reranked search results of the hybrid search.

- **response** (*HybridSearchResponse*) -

    - **Results** (*const SearchResults&*) -

        Get result of search operation. The following members belong to `SearchResults`.

        - **Results** (*const std::vector<SingleResult>&*) -

            Get search results. Each entry is a `SingleResult` with the following members.

            - **Scores** (*const std::vector<float>&*) -

                Distances/scores array of one target vector.

            - **Ids** (*IDArray*) -

                Topk id array of one target vector. Note: the returned IDArray is a temporary object copied from [FieldData](FieldData.md). It is recommended to use OutputField() method like this: FieldDataPtr ids = result.OutputField(result.PrimaryKeyName());.

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

                - **Type** (*DataType*) -

                    Get field data type.
                    See [DataType](../Collections/DataType.md).

                - **ElementType** (*DataType*) -

                    Get the element type for an array field.
                    See [DataType](../Collections/DataType.md).

                - **Count** (*size_t*) -

                    Total number of field elements.

            - **OutputField** (*FieldDataPtr*) -

                Get an output field by name.

                - **Name** (*const std::string&*) -

                    Get field name.

                - **Type** (*DataType*) -

                    Get field data type.
                    See [DataType](../Collections/DataType.md).

                - **ElementType** (*DataType*) -

                    Get the element type for an array field.
                    See [DataType](../Collections/DataType.md).

                - **Count** (*size_t*) -

                    Total number of field elements.

            - **OutputFieldNames** (*const std::set<std::string>&*) -

                Output field names specified by search().

            - **OutputRows** (*Status*) -

                Get all output rows.
                See [Status](../Client/Status.md).

            - **OutputRow** (*Status*) -

                Get row data. Returns INVALID_ARGUMENT status if the i is out of bound.
                See [Status](../Client/Status.md).

            - **OutputHighlightResult** (*Status*) -

                Get highlight results of one row. Returns INVALID_ARGUMENT status if the i is out of bound.
                See [Status](../Client/Status.md).

                - **field_name** (*std::string*) -

                    Name of the highlighted field.

                - **fragments** (*std::vector<std::string>*) -

                    Highlighted fragments of the field value.

                - **scores** (*std::vector<float>*) -

                    Highlight scores for each fragment.

            - **GetRowCount** (*uint64_t*) -

                Get row count of the result.

        - **Recalls** (*const std::vector<float>&*) -

            Get recalls of search results. Note: only works when search with enable_recall_calculation is true on zilliz cloud instance.

    - **SessionTs** (*uint64_t*) -

        Session timestamp of the search, used to guarantee consistency in a session.

    - **Cost** (*int64_t*) -

        Execution cost of the search in cost units, -1 when not reported.

    - **ScannedRemoteBytes** (*int64_t*) -

        Number of bytes scanned from remote storage.

    - **ScannedTotalBytes** (*int64_t*) -

        Total number of bytes scanned.

    - **CacheHitRatio** (*float*) -

        Cache hit ratio as a value between 0.0 and 1.0.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Run two sub-searches on different vector fields, fuse their results with a [WeightedRerank](../Collections/Function.md) ranker, and return the top 10 entities after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Each sub-search runs on one vector field with its own query vector and filter.
auto sub_req_dense = milvus::SubSearchRequest()
                         .WithLimit(5)
                         .WithAnnsField("dense")
                         .WithFilter("flag == 1")
                         .AddFloatVector(std::vector<float>(128, 0.1f));
auto sub_req_sparse = milvus::SubSearchRequest()
                          .WithLimit(5)
                          .WithAnnsField("sparse")
                          .WithFilter("flag in [1, 3]")
                          .AddSparseVector(nlohmann::json{{"1", 0.1f}, {"5", 0.2f}});

auto request = milvus::HybridSearchRequest()
                   .WithCollectionName("my_collection")
                   .AddSubRequest(std::make_shared<milvus::SubSearchRequest>(std::move(sub_req_dense)))
                   .AddSubRequest(std::make_shared<milvus::SubSearchRequest>(std::move(sub_req_sparse)))
                   .WithRerank(std::make_shared<milvus::WeightedRerank>(std::vector<float>{0.5f, 0.5f}))
                   .WithLimit(10)
                   .AddOutputField("flag");

milvus::SearchResponse response;
status = client->HybridSearch(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
