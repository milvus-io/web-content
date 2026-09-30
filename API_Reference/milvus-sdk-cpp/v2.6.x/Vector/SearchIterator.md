# SearchIterator()

This operation creates a search iterator that pages through the ANN search results of a collection batch by batch, according to the target vector, filter expression, and search settings carried by the request. Keep the MilvusClientV2 connected while the iterator is in use; the order of the returned entities cannot be guaranteed.

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

    Sets the target database name; the default database is used when it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose search results are iterated.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names to search; if empty, the entire collection is searched.

- `AddPartitionName(const std::string& partition_name)`

    Sets one partition name to include in the search scope.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the names of the output fields to return with each batch.

- `AddOutputField(const std::string& output_field)`

    Sets an additional output field name to return with each batch.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level used for the underlying searches.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Sets a filter template entry bound to a placeholder in the filter expression; it takes effect only when the filter is not empty, and valid template values are boolean, numeric, string, or array.

- `AddBinaryVector(const std::string& vector)`

    Sets the binary target vector of the search, either with or without an explicit field name; the string overload automatically converts the string array to a uint8 array.

- `AddBinaryVector(const BinaryVecFieldData::ElementT& vector)`

    Sets the binary target vector of the search, either with or without an explicit field name; the string overload automatically converts the string array to a uint8 array.

- `AddFloatVector(const FloatVecFieldData::ElementT& vector)`

    Sets the float target vector of the search, either with or without an explicit field name.

- `AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

    Sets the sparse target vector of the search, either with or without an explicit field name; the JSON overload accepts an index-to-value dict such as {"1": 0.1} or a dict like {"indices": [1, 5], "values": [0.1, 0.2]}.

- `AddSparseVector(const nlohmann::json& vector)`

    Sets the sparse target vector of the search, either with or without an explicit field name; the JSON overload accepts an index-to-value dict such as {"1": 0.1} or a dict like {"indices": [1, 5], "values": [0.1, 0.2]}.

- `AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

    Sets the float16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to float16 binary.

- `AddFloat16Vector(const std::vector<float>& vector)`

    Sets the float16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to float16 binary.

- `AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

    Sets the bfloat16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddBFloat16Vector(const std::vector<float>& vector)`

    Sets the bfloat16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddEmbeddedText(const std::string& text)`

    Sets the text target of the search, either with or without an explicit field name; it only works for a BM25 function.

- `AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

    Sets the int8 target vector of the search, either with or without an explicit field name.

- `AddEmbeddingList(EmbeddingList&& emb_list)`

    Sets an embedding list for the search on a struct field.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Sets one extra search parameter such as "nlist" or "ef" by key and value.

- `AddBinaryVector(std::string field_name, const std::string& vector)`

    Sets the binary target vector of the search, either with or without an explicit field name; the string overload automatically converts the string array to a uint8 array.

- `AddBinaryVector(std::string field_name, const BinaryVecFieldData::ElementT& vector)`

    Sets the binary target vector of the search, either with or without an explicit field name; the string overload automatically converts the string array to a uint8 array.

- `AddFloatVector(std::string field_name, const FloatVecFieldData::ElementT& vector)`

    Sets the float target vector of the search, either with or without an explicit field name.

- `AddSparseVector(std::string field_name, const SparseFloatVecFieldData::ElementT& vector)`

    Sets the sparse target vector of the search, either with or without an explicit field name; the JSON overload accepts an index-to-value dict such as {"1": 0.1} or a dict like {"indices": [1, 5], "values": [0.1, 0.2]}.

- `AddSparseVector(std::string field_name, const nlohmann::json& vector)`

    Sets the sparse target vector of the search, either with or without an explicit field name; the JSON overload accepts an index-to-value dict such as {"1": 0.1} or a dict like {"indices": [1, 5], "values": [0.1, 0.2]}.

- `AddFloat16Vector(std::string field_name, const Float16VecFieldData::ElementT& vector)`

    Sets the float16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to float16 binary.

- `AddFloat16Vector(std::string field_name, const std::vector<float>& vector)`

    Sets the float16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to float16 binary.

- `AddBFloat16Vector(std::string field_name, const BFloat16VecFieldData::ElementT& vector)`

    Sets the bfloat16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddBFloat16Vector(std::string field_name, const std::vector<float>& vector)`

    Sets the bfloat16 target vector of the search, either with or without an explicit field name; the std::vector<float> overload automatically converts the float array to bfloat16 binary.

- `AddEmbeddedText(std::string field_name, const std::string& text)`

    Sets the text target of the search, either with or without an explicit field name; it only works for a BM25 function.

- `AddInt8Vector(std::string field_name, const Int8VecFieldData::ElementT& vector)`

    Sets the int8 target vector of the search, either with or without an explicit field name.

- `WithBinaryVectors(const std::vector<std::string>& vectors)`

    Sets the binary target vectors of the search, resetting the vector list; the string overload automatically converts each string array to a uint8 array.

- `WithBinaryVectors(std::vector<BinaryVecFieldData::ElementT>&& vectors)`

    Sets the binary target vectors of the search, resetting the vector list; the string overload automatically converts each string array to a uint8 array.

- `WithFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)`

    Sets the float target vectors of the search, resetting the vector list.

- `WithSparseVectors(std::vector<SparseFloatVecFieldData::ElementT>&& vectors)`

    Sets the sparse target vectors of the search, resetting the vector list; the JSON overload accepts an index-to-value dict such as {"1": 0.1} or a dict like {"indices": [1, 5], "values": [0.1, 0.2]}.

- `WithSparseVectors(const std::vector<nlohmann::json>& vectors)`

    Sets the sparse target vectors of the search, resetting the vector list; the JSON overload accepts an index-to-value dict such as {"1": 0.1} or a dict like {"indices": [1, 5], "values": [0.1, 0.2]}.

- `WithFloat16Vectors(std::vector<Float16VecFieldData::ElementT>&& vectors)`

    Sets the float16 target vectors of the search, resetting the vector list; the std::vector<std::vector<float>> overload automatically converts each float array to float16 binary.

- `WithFloat16Vectors(const std::vector<std::vector<float>>& vectors)`

    Sets the float16 target vectors of the search, resetting the vector list; the std::vector<std::vector<float>> overload automatically converts each float array to float16 binary.

- `WithBFloat16Vectors(std::vector<BFloat16VecFieldData::ElementT>&& vectors)`

    Sets the bfloat16 target vectors of the search, resetting the vector list; the std::vector<std::vector<float>> overload automatically converts each float array to bfloat16 binary.

- `WithBFloat16Vectors(const std::vector<std::vector<float>>& vectors)`

    Sets the bfloat16 target vectors of the search, resetting the vector list; the std::vector<std::vector<float>> overload automatically converts each float array to bfloat16 binary.

- `WithEmbeddedTexts(std::vector<std::string>&& texts)`

    Sets the text targets of the search, resetting the vector list; it only works for a BM25 function.

- `WithInt8Vectors(std::vector<Int8VecFieldData::ElementT>&& vectors)`

    Sets the int8 target vectors of the search, resetting the vector list.

- `WithEmbeddingLists(std::vector<EmbeddingList>&& emb_lists)`

    Sets the embedding lists for the search on a struct field, resetting the vector list.

- `WithMetricType(::milvus::MetricType metric_type)`

    Sets the metric type of the vector field; when left as DEFAULT, the SDK derives it from the vector field's index.

- `WithExtraParams(const std::unordered_map<std::string, std::string>& params)`

    Sets the extra search parameters such as "nlist" or "ef" as a key-value map.

- `WithLimit(int64_t limit)`

    Sets the search limit (topk) that bounds how many entities the iterator returns in total; the value is stored in the extra parameters.

- `WithFilter(std::string filter)`

    Sets the scalar filtering expression that selects the entities the iterator pages through.

- `WithAnnsField(const std::string& ann_field)`

    Sets the target vector field of the ANN search; it must be specified when the collection has more than one vector field.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets the filter templates bound to placeholders in the filter expression; they take effect only when the filter is not empty.

- `WithOffset(int64_t offset)`

    Sets the offset value; the value is stored in the extra parameters.

- `WithRoundDecimal(int64_t round_decimal)`

    Sets the number of decimal places to which the returned scores are rounded.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets the flag that ignores data in growing segments.

- `WithGroupByField(const std::string& field_name)`

    Sets the field that search results are grouped by.

- `WithGroupSize(int64_t group_size)`

    Sets the group size used for grouped search.

- `WithStrictGroupSize(bool strict_group_size)`

    Sets the flag that enforces the group size strictly.

- `WithRadius(double radius)`

    Sets the radius of the range search; the value is stored in the extra parameters.

- `WithRangeFilter(double filter)`

    Sets the range filter that narrows the score window of the range search; the value is stored in the extra parameters.

- `WithRerank(const FunctionScorePtr& ranker)`

    Sets the reranker; multiple rerank functions such as Boost, Decay, and Model are supported.

- `WithTimezone(const std::string& timezone)`

    Sets the timezone, which takes effect for Timestamptz fields.

- `WithHighlighter(const HighlighterPtr& highlighter)`

    Sets the highlighter applied to the search results.

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

Returns a Status and hands back a SearchIteratorPtr (the iterator) whose Next() fetches successive batches of matching entities until exhausted.

- **response** (*SearchIteratorPtr*) -

    - **Next** (*Status*) -

        Get next batch of results. Note: this method is not designed to be called in multi-thread, it is not thread-safe.

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

**ERROR HANDLING:**

- **std::exception**

    when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details; the call also reports an error status when IDs are set as search targets, the collection has no vector field, the ANN field is unspecified while several vector fields exist, or no index is found on the ANN field, and it reports an error status with the underlying reason when iterator initialization fails.

## Example

Use SearchIterator() after connecting a MilvusClientV2, then page through the matching entities batch by batch with Next().

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::SearchIteratorRequest request;
request.WithCollectionName("book");
request.WithAnnsField("book_intro");
request.WithMetricType(milvus::MetricType::L2);
request.WithFilter("word_count > 10");
request.AddOutputField("book_id");
std::vector<float> query_vector{0.1f, 0.2f};
request.AddFloatVector("book_intro", query_vector);

milvus::SearchIteratorPtr iterator;
status = client->SearchIterator(request, iterator);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::SingleResult batch;
while (iterator->Next(batch).IsOk()) {
    if (batch.GetRowCount() == 0) {
        break;
    }
    milvus::EntityRows rows;
    batch.OutputRows(rows);
    // process one batch of matching entities in rows
}
```
