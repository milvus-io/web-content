# QueryIterator()

This operation returns a QueryIterator object based on scalar field(s) by filtering expression. 

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
    .WithOutputFields(output_field_names)
    .WithConsistencyLevel(consistency_level)
    .WithFilter(filter)
    .WithFilterTemplates(value)
    .WithLimit(limit)
    .WithOffset(offset)
    .WithIgnoreGrowing(ignore_growing)
    .WithTimezone(timezone)
    .WithReduceStopForBest(reduce_stop_for_best);
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

- `WithFilter(std::string filter)`

    Sets a filter expression.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds one value for a placeholder in the filter expression. It is used only when the request has a non-empty filter and avoids repeatedly parsing large literal values.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Replaces all placeholder values used by the filter expression. Keys correspond to placeholders such as {age} or {city}; values may be boolean, numeric, string, or array data.

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

### QueryResults

This class holds the column-based result data returned by a `Query()` call. Access it via `Results()` on a `QueryResponse` object.

```cpp
const QueryResults& results = response.Results();
```

**METHODS:**

- `FieldDataPtr OutputField(const std::string& name) const`

    Returns the named output field as a `FieldDataPtr`. Cast to the concrete type with `std::dynamic_pointer_cast<Int64FieldData>(results.OutputField("id"))`.

- `const std::vector<FieldDataPtr>& OutputFields() const`

    Returns all output fields in the order they were returned by the server.

- `const std::set<std::string>& OutputFieldNames() const`

    Returns the set of output field names that were requested in the query.

- `Status OutputRows(EntityRows& rows) const`

    Converts all result rows to a vector of JSON-like row maps and stores them in `rows`.

- `Status OutputRow(int i, EntityRow& row) const`

    Converts the row at index `i` to a JSON-like row map.

- `uint64_t GetRowCount() const`

    Number of rows returned. When the query uses `count(*)`, this returns the aggregate count.

### Iterator

QueryIterator is an alias of Iterator<QueryResults>. Use it to retrieve query rows in batches when the complete result set is larger than a single request limit.

### Output field types

Requested entity fields are returned through `FieldDataPtr`. The concrete `XxxFieldData` type follows the field's schema [DataType](../Collections/DataType.md); use `OutputField(name)` for the base pointer or `OutputField<T>(name)` for a checked shared-pointer cast.

The pointer convention is XxxFieldDataPtr = std::shared_ptr<XxxFieldData>. This result representation is used by query interfaces and does not make the pointer aliases separate API pages.

### Iterator

Abstract base class. Do not instantiate it directly; use the QueryIterator alias below.

```cpp
template <typename T>
class Iterator {
 public:
    virtual Status Next(T& results) = 0;
};
```

- `virtual Status Next(T& results) = 0`

### QueryIterator

Iterates over `QueryResults` batches from a `QueryIterator()` call. Each call to `Next()` fills a `QueryResults` with the next batch of rows.

```cpp
using QueryIterator    = Iterator<QueryResults>;
using QueryIteratorPtr = std::shared_ptr<QueryIterator>;
```

Obtained via `MilvusClientV2::QueryIterator(IteratorArguments, QueryIteratorPtr&)`.

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

milvus::QueryIteratorRequest request;
request.SetCollectionName(collection_name);
request.SetBatchSize(batch);
request.SetOffset(offset);
request.SetLimit(limit);
request.SetFilter(filter);
request.AddOutputField(field_name);
request.AddOutputField(field_age);
request.AddOutputField("a");  // dynamic field

milvus::QueryIteratorPtr iterator;
status = client->QueryIterator(request, iterator);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::set<int64_t> ids;
int pages = 0;
uint64_t total_count = 0;
while (true) {
    milvus::QueryResults batch_results;
    status = iterator->Next(batch_results);
    if (!status.IsOk()) {
        std::cout << status.Message() << std::endl;
    }
    auto batch_count = batch_results.GetRowCount();
    if (batch_count == 0) {
        std::cout << "query iteration finished" << std::endl;
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
