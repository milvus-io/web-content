# QueryIterator()

This operation creates a query iterator that pages through query results matching a scalar filtering expression, delivering them batch by batch. Keep the MilvusClientV2 connection open while the iterator is in use, because each batch is fetched through it.

```cpp
Status QueryIterator(QueryIteratorRequest& request, QueryIteratorPtr& response)
```

<div class="alert note">

Do not disconnect the MilvusClientV2 when the iterator is in use. The order of the returned entities cannot be guaranteed. Read [this document](https://milvus.io/docs/with-iterators.md) for more.

</div>

## Request Syntax

```cpp
auto request = QueryIteratorRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .AddPartitionName(partition_name)
    .WithOutputFields(output_field_names)
    .AddOutputField(output_field)
    .WithConsistencyLevel(consistency_level)
    .WithFilter(filter)
    .AddFilterTemplate(key, filter_template)
    .WithFilterTemplates(filter_templates)
    .WithLimit(limit)
    .WithOffset(offset)
    .WithIgnoreGrowing(ignore_growing)
    .AddExtraParam(key, value)
    .WithTimezone(timezone)
    .WithReduceStopForBest(reduce_stop_for_best);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to query.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names to query; if empty, the entire collection is queried.

- `AddPartitionName(const std::string& partition_name)`

    Sets one more partition name to include in the query scope.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the names of the fields to include in each batch of results.

- `AddOutputField(const std::string& output_field)`

    Sets one more output field name to include in each batch of results.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level used for the query reads.

- `WithFilter(std::string filter)`

    Sets the scalar filtering expression that determines which entities the iterator pages through.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Sets one template value used by the filter expression; it only takes effect when the filter is not empty. Valid template values can be boolean, numeric, string, or array, and templating improves parsing performance for expressions containing complicated lists.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets the template values used by the filter expression as a map; they only take effect when the filter is not empty.

- `WithLimit(int64_t limit)`

    Sets the limit value, which is only available when the filter expression is empty. Note: this value is stored in the ExtraParams.

- `WithOffset(int64_t offset)`

    Sets the offset value, which is only available when the filter expression is empty. Note: this value is stored in the ExtraParams.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets whether to ignore data in growing segments during the query. Note: this value is stored in the ExtraParams.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Sets one extra key-value parameter passed through to the server.

- `WithTimezone(const std::string& timezone)`

    Sets the timezone, which takes effect for Timestamptz fields. Note: this value is stored in the ExtraParams.

- `WithReduceStopForBest(bool reduce_stop_for_best)`

    Sets the flag controlling the internal retrieve strategy.

**RETURNS:**

*Status*

Returns a Status, and on success assigns the output parameter with a QueryIteratorPtr whose Next() call fetches successive batches of QueryResults until all matching results are exhausted.

- **response** (*QueryIteratorPtr*) -

    - **Next** (*Status*) -

        Get next batch of results. Note: this method is not designed to be called in multi-thread, it is not thread-safe.

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

        - **OutputFields** (*const std::vector<FieldDataPtr>&*) -

            Get all output fields data.

            - **Name** (*const std::string&*) -

                Get field name.

            - **Type** ([DataType](../Collections/DataType.md)) -

                Get field data type.

            - **ElementType** ([DataType](../Collections/DataType.md)) -

                Get the element type for an array field.

            - **Count** (*size_t*) -

                Total number of field elements.

        - **OutputFieldNames** (*const std::set<std::string>&*) -

            Get output field names specified by query().

        - **OutputRows** (*Status*) -

            Get all output rows.

        - **OutputRow** (*Status*) -

            Get row data. Throw exception if the i is out of bound.

        - **GetRowCount** (*uint64_t*) -

            Get row count of the result. Return the value of count(*) when you query with count(*).

**ERROR HANDLING:**

- **std::exception**

    Request preparation, transport, or iterator initialization fails, including when the request carries ID-based criteria. Inspect the returned Status code and message for failure details; ID-based input is rejected outright because the query iterator does not support IDs, and failures inside the iterator constructor are reported as an 'Unable to create query iterator' error.

## Example

Create a query iterator after connecting a MilvusClientV2, then page through the matching results batch by batch with Next().

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

milvus::QueryIteratorRequest request;
request.WithCollectionName("book");
request.WithFilter("word_count > 100");
request.WithOutputFields({"book_id", "word_count"});
request.WithConsistencyLevel(milvus::ConsistencyLevel::BOUNDED);

milvus::QueryIteratorPtr iterator;
status = client->QueryIterator(request, iterator);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
    return 1;
}

while (true) {
    milvus::QueryResults batch;
    status = iterator->Next(batch);
    if (!status.IsOk() || batch.GetRowCount() == 0) {
        break;
    }
    // process the rows in this batch
}
```
