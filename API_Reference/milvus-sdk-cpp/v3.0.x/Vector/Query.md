# Query()

Query with a set of criteria, and results in a list of records that match the query exactly.

```cpp
Status Query(const QueryRequest& request, QueryResponse& response)
```

## Request Syntax

```cpp
auto request = QueryRequest()
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

- `WithFilter(std::string filter)`

    Set filter expression.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds one value for a placeholder in the filter expression. It is used only when the request has a non-empty filter and avoids repeatedly parsing large literal values.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Replaces all placeholder values used by the filter expression. Keys correspond to placeholders such as {age} or {city}; values may be boolean, numeric, string, or array data.

- `WithLimit(int64_t limit)`

    Set limit value, only avaiable when expression is empty. \n Note: this value is stored in the ExtraParams.

- `WithOffset(int64_t offset)`

    Set offset value, only avaiable when expression is empty. \n Note: this value is stored in the ExtraParams.

- `WithIgnoreGrowing(bool ignore_growing)`

    Set ignore growing segments. Note: this value is stored in the ExtraParams.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Add extra param.

- `WithTimezone(const std::string& timezone)`

    Set timezone, takes effect for Timestamptz field. Note: this value is stored in the ExtraParams.

- `WithOrderByFields(std::vector<OrderByField>&& order_by_fields)`

    Set fields used to order query results.

- `AddOrderByField(OrderByField order_by_field)`

    Add a field used to order query results.

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

#### Output field types

Requested entity fields are returned through `FieldDataPtr`. The concrete `XxxFieldData` type follows the field's schema [DataType](../Collections/DataType.md); use `OutputField(name)` for the base pointer or `OutputField<T>(name)` for a checked shared-pointer cast.

The pointer convention is `XxxFieldDataPtr = std::shared_ptr<XxxFieldData>`. This result representation is shared by search and query interfaces and does not make the pointer aliases separate API pages.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates Query() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::QueryRequest();
milvus::QueryResponse response;
util::CheckStatus(client->Query(request, response));
```
