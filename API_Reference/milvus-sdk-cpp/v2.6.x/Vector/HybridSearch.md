# HybridSearch()

This operation runs multiple sub-search requests against a collection in a single call and fuses their hits with the reranking function carried by the request (such as RRFRerank or WeightedRerank). Each sub-search targets one vector field with its own query vector, filter, and limit.

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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to search.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names to search; if the set is empty, the entire collection is searched. The setter takes an rvalue, so pass a moved-in or temporary std::set<std::string>.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name to the set of partitions to search.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the names of the fields to return in the results. The setter takes an rvalue, so pass a moved-in or temporary std::set<std::string>.

- `AddOutputField(const std::string& output_field)`

    Adds an output field name to the set of fields returned in the results.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level of the search; see the Milvus consistency level documentation for details.

- `WithSubRequests(std::vector<SubSearchRequestPtr>&& requests)`

    Sets the whole list of sub-search requests to run. The setter takes an rvalue, so pass a moved-in or temporary std::vector<SubSearchRequestPtr>.

- `AddSubRequest(const SubSearchRequestPtr& request)`

    Adds one sub-search request (a single-vector-field search) to the hybrid search.

- `WithRerank(const FunctionPtr& rerank)`

    Sets the reranking function that fuses the sub-search results, such as an RRFRerank or WeightedRerank function.

- `WithLimit(int64_t limit)`

    Sets the search limit (topk), the maximum number of fused results to return.

- `WithOffset(int64_t offset)`

    Sets the offset of the first result to return. Note: this value is stored in the extra parameters.

- `WithRoundDecimal(int64_t round_decimal)`

    Sets the number of decimal places to which returned similarity scores are rounded.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets the ignore-growing flag, which controls whether data in growing segments is excluded from the search.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Adds an extra engine parameter, such as "nlist" or "ef", by key and value.

- `WithGroupByField(const std::string& field_name)`

    Sets the field whose values are used to group the search results.

- `WithGroupSize(int64_t group_size)`

    Sets the group size value, the maximum number of results allowed per group.

- `WithStrictGroupSize(bool strict_group_size)`

    Sets the strict group size flag, which controls whether the group size is strictly enforced.

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

Returns a Status reporting success or failure, while the response output parameter carries the fused, reranked search results of the hybrid search.

- **response** (*HybridSearchResponse*) -

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

    When request construction, transport to the server, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Run two sub-searches on different vector fields, fuse their results with a WeightedRerank ranker, and return the top 10 entities after connecting a MilvusClientV2.

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
