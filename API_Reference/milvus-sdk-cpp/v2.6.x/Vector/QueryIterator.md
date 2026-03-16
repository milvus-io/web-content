# QueryIterator()

This operation returns a QueryIterator object based on scalar field(s) by filtering expression.

<div class="alert note">

Do not disconnect the MilvusClientV2 when the iterator is in use. The order of the returned entities cannot be guaranteed. Read [this document](https://milvus.io/docs/with-iterators.md) for more.

</div>

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

- `WithFilter(std::string filter)`

    Sets a filter expression.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds a filter template. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Sets filter templates. This takes effect only if `WithFilter()` is set.  Read this page for more about [filter templating](https://milvus.io/docs/filtering-templating.md).

- `WithLimit(int64_t limit)`

    Sets the number of entities to return. This is available only when the filter expression is empty.

- `WithOffset(int64_t offset)`

    Sets the offset value. This is available only when the filter expression is empty.

- `WithIgnoreGrowing(bool ignore_growing)`

    Sets whether to ignore growing segments.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Add an extra param.

- `WithTimezone(const std::string& timezone)`

    Sets the timezone. This applies only to the Timestamptz field. For details, refer to [this page](https://milvus.io/docs/single-vector-search.md#Temporarily-set-a-timezone-for-a-search).

- `WithReduceStopForBest(bool reduce_stop_for_best)`

    Sets the flag of internal retrieve strategy.

**RETURNS:**

*Status* with *QueryIteratorPtr*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

      Check `status.Code()` and `status.Message()` for error details.

## Example

