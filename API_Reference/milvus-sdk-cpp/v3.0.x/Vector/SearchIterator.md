# SearchIterator()

Creates an iterator that returns vector-search results in batches. Keep MilvusClientV2 connected while the iterator is in use. Result order is not guaranteed. The request is mutable because the SDK assigns the primary-key field name internally.

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
    .AddBinaryVector(vector)
    .AddFloatVector(vector)
    .AddSparseVector(vector)
    .AddFloat16Vector(vector)
    .AddBFloat16Vector(vector)
    .AddEmbeddedText(text)
    .AddInt8Vector(vector)
    .AddEmbeddingList(emb_list)
    .WithBinaryVectors(vectors)
    .WithFloatVectors(vectors)
    .WithSparseVectors(vectors)
    .WithFloat16Vectors(vectors)
    .WithBFloat16Vectors(vectors)
    .WithEmbeddedTexts(texts)
    .WithInt8Vectors(vectors)
    .WithEmbeddingLists(emb_lists)
    .WithMetricType(metric_type)
    .AddExtraParam(key, value)
    .WithExtraParams(params)
    .WithLimit(limit)
    .WithFilter(filter)
    .WithAnnsField(ann_field)
    .AddFilterTemplate(key, filter_template)
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
    .WithHighlighter(highlighter)
    .WithSearchAggregation(aggregation)
    .WithOrderByFields(order_by_fields)
    .AddOrderByField(order_by_field);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Set the partition names. If partition nemes are empty, will query in the entire collection.

- `AddPartitionName(const std::string& partition_name)`

    Add a partition name.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Set the output field names.

- `AddOutputField(const std::string& output_field)`

    Add an output field.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Set the consistency level. Read the doc for more info: https://milvus.io/docs/consistency.md#Consistency-Level.

- `AddBinaryVector(const std::string& vector)`

    Add a binary vector to search request. This method automatically converts the string array to uint8 array.

- `AddFloatVector(const FloatVecFieldData::ElementT& vector)`

    Add a float vector to search request.

- `AddSparseVector(const SparseFloatVecFieldData::ElementT& vector)`

    Add a sparse vector to search request.

- `AddFloat16Vector(const Float16VecFieldData::ElementT& vector)`

    Add a float16 vector to search request.

- `AddBFloat16Vector(const BFloat16VecFieldData::ElementT& vector)`

    Add a bfloat16 vector to search request.

- `AddEmbeddedText(const std::string& text)`

    Add a text to search request. Only works for BM25 function.

- `AddInt8Vector(const Int8VecFieldData::ElementT& vector)`

    Add an int8 vector to search request.

- `AddEmbeddingList(EmbeddingList&& emb_list)`

    Add an embedding list to search request on struct field.

- `WithBinaryVectors(const std::vector<std::string>& vectors)`

    Assign binary vectors to search request. This method automatically converts the string array to uint8 array. Note: this method will reset the vector list of the request.

- `WithFloatVectors(std::vector<FloatVecFieldData::ElementT>&& vectors)`

    Assign float vectors to search request. Note: this method will reset the vector list of the request.

- `WithSparseVectors(std::vector<SparseFloatVecFieldData::ElementT>&& vectors)`

    Assign sparse vectors to search request. Note: this method will reset the vector list of the request.

- `WithFloat16Vectors(std::vector<Float16VecFieldData::ElementT>&& vectors)`

    Assign float16 vectors to search request. Note: this method will reset the vector list of the request.

- `WithBFloat16Vectors(std::vector<BFloat16VecFieldData::ElementT>&& vectors)`

    Assign bfloat16 vectors to search request. Note: this method will reset the vector list of the request.

- `WithEmbeddedTexts(std::vector<std::string>&& texts)`

    Assign texts to search request. Only works for BM25 function. Note: this method will reset the vector list of the request.

- `WithInt8Vectors(std::vector<Int8VecFieldData::ElementT>&& vectors)`

    Assign int8 vectors to search request. Note: this method will reset the vector list of the request.

- `WithEmbeddingLists(std::vector<EmbeddingList>&& emb_lists)`

    Assign embedding lists to search request on struct field. Note: this method will reset the vector list of the request.

- `WithMetricType(::milvus::MetricType metric_type)`

    Specifies the metric type.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Add extra parameters such as "nlist", "ef".

- `WithExtraParams(const std::unordered_map<std::string, std::string>& params)`

    Add extra parameters such as "nlist", "ef".

- `WithLimit(int64_t limit)`

    Set search limit(topk). Note: this value is stored in the ExtraParams.

- `WithFilter(std::string filter)`

    Set filter expression.

- `WithAnnsField(const std::string& ann_field)`

    Set target field of ann search.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds one value for a placeholder in the filter expression. It is used only when the request has a non-empty filter and avoids repeatedly parsing large literal values.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Replaces all placeholder values used by the filter expression. Keys correspond to placeholders such as {age} or {city}; values may be boolean, numeric, string, or array data.

- `WithOffset(int64_t offset)`

    Set offset value. Note: this value is stored in the ExtraParams.

- `WithRoundDecimal(int64_t round_decimal)`

    Set round decimal value.

- `WithIgnoreGrowing(bool ignore_growing)`

    Set ignore growing flag.

- `WithGroupByField(const std::string& field_name)`

    Set group by field value.

- `WithGroupSize(int64_t group_size)`

    Set group size value.

- `WithStrictGroupSize(bool strict_group_size)`

    Set strict group size flag.

- `WithRadius(double radius)`

    Set range radius. Note: this value is stored in the ExtraParams.

- `WithRangeFilter(double filter)`

    Set range filter. Note: this value is stored in the ExtraParams.

- `WithRerank(const FunctionScorePtr& ranker)`

    Set reranker. Allows multiple rerank functions such as Boost/Decay/Model, etc. Read the doc for more info: https://milvus.io/docs/boost-ranker.md.

- `WithTimezone(const std::string& timezone)`

    Set timezone, takes effect for Timestamptz field. Read the doc for more info: https://milvus.io/docs/single-vector-search.md#Temporarily-set-a-timezone-for-a-search.

- `WithHighlighter(const HighlighterPtr& highlighter)`

    Set highlighter.

- `WithSearchAggregation(const SearchAggregationPtr& aggregation)`

    Set search aggregation settings.

- `WithOrderByFields(std::vector<OrderByField>&& order_by_fields)`

    Set fields used to order search results.

- `AddOrderByField(OrderByField order_by_field)`

    Add a field used to order search results.

### Query vector types

The request accepts one query-vector representation matching the target field's [DataType](../Collections/DataType.md). Use the corresponding add or batch builder method; these are query inputs, not collection column payloads.

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

Returns a status indicating whether the operation succeeded.

### FieldData

This is the template class that represents column-based data for a single field. Concrete aliases cover every supported data type. Instances of the concrete types are used when inserting data via `InsertRequest::WithRowsData()` or reading query/search results via `QueryResults::OutputField()` and `SingleResult::OutputField()`.

```cpp
// Base abstract interface (not instantiated directly)
class Field {
    const std::string& Name() const;
    DataType Type() const;
    DataType ElementType() const;   // for ARRAY fields only
    virtual size_t Count() const = 0;
    virtual void Reserve(size_t count) = 0;
};

using FieldDataPtr = std::shared_ptr<Field>;

// Template class
template <typename T, DataType Dt>
class FieldData : public Field {
    explicit FieldData(std::string name);
    FieldData(std::string name, const std::vector<T>& data);
    FieldData(std::string name, const std::vector<T>& data, const std::vector<bool>& valid_data);

    StatusCode Add(const T& element);
    StatusCode AddNull();
    StatusCode Append(const std::vector<T>& elements);
    size_t Count() const;
    void Reserve(size_t count);
    virtual const std::vector<T>& Data() const;
    virtual T Value(size_t i) const;
    virtual bool IsNull(size_t i) const;
    virtual const std::vector<bool>& ValidData() const;
};
```

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

### FunctionScore

This class holds a list of rerank function objects and optional extra parameters. Pass a `FunctionScorePtr` (a `std::shared_ptr<FunctionScore>`) to `SearchArguments::WithFunctionScore()` or `HybridSearchRequest::WithFunctionScore()`. For `HybridSearch` use RRF or Weighted functions; for `Search` use Boost, Decay, or Model functions. For the function subclass details see Function.

```cpp
using FunctionScorePtr = std::shared_ptr<FunctionScore>;

auto score = FunctionScore()
    .WithFunctions(functions)
    .AddFunction(function_ptr)
    .WithParams(params)
    .AddParam(key, value);
```

**METHODS:**

- `FunctionScore& WithFunctions(std::vector<FunctionPtr>&& functions)`

    Replaces the rerank-function list.

- `FunctionScore& AddFunction(const FunctionPtr& function)`

    Appends one rerank function.

- `FunctionScore& WithParams(std::unordered_map<std::string, nlohmann::json>&& params)`

    Replaces the extra parameter map used by the rerank functions.

- `FunctionScore& AddParam(const std::string& key, nlohmann::json&& param)`

    Adds or replaces one rerank parameter.

- `const std::vector<FunctionPtr>& Functions() const`

    Returns the configured rerank functions.

- `const std::unordered_map<std::string, nlohmann::json>& Params() const`

    Returns the configured rerank parameters.

### Iterator

SearchIterator is an alias of Iterator<SingleResult>. Use it to retrieve search hits in batches when the complete result set is larger than a single request limit.

### Output field types

Requested entity fields are returned through `FieldDataPtr`. The concrete `XxxFieldData` type follows the field's schema [DataType](../Collections/DataType.md); use `OutputField(name)` for the base pointer or `OutputField<T>(name)` for a checked shared-pointer cast.

The pointer convention is XxxFieldDataPtr = std::shared_ptr<XxxFieldData>. This result representation is used by search interfaces and does not make the pointer aliases separate API pages.

### Iterator

Abstract base class. Do not instantiate it directly; use the SearchIterator alias below.

```cpp
template <typename T>
class Iterator {
 public:
    virtual Status Next(T& results) = 0;
};
```

- `virtual Status Next(T& results) = 0`

### SearchIterator

Iterates over `SingleResult` batches from a `SearchIterator()` call. Each call to `Next()` fills a `SingleResult` with the next batch of hits.

```cpp
using SearchIterator    = Iterator<SingleResult>;
using SearchIteratorPtr = std::shared_ptr<SearchIterator>;
```

Obtained via `MilvusClientV2::SearchIterator(IteratorArguments, SearchIteratorPtr&)`.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates SearchIterator() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::SearchIteratorRequest();
milvus::SearchIteratorPtr response;
util::CheckStatus(client->SearchIterator(request, response));
```
