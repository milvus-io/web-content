# QueryIterator()

Get QueryIterator object based on scalar field(s) by filtering expression. Don't disconnect the MilvusClientV2 when the iterator is in using. assign the primary key field name to request.

```cpp
Status QueryIterator(QueryIteratorRequest& request, QueryIteratorPtr& response)
```

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
    .WithOrderByFields(order_by_fields)
    .AddOrderByField(order_by_field)
    .WithReduceStopForBest(reduce_stop_for_best)
    .WithGroupByFields(group_by_fields)
    .WithCursor(cursor);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Set the partition names. If partition names are empty, will query in the entire collection.

- `SetPartitionNames(std::set<std::string>&& partition_names)`

    Set the partition names. If partition names are empty, the entire collection is queried.

- `AddPartitionName(const std::string& partition_name)`

    Add a partition name.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Set the output field names.

- `SetOutputFields(std::set<std::string>&& output_field_names)`

    Set the output field names.

- `AddOutputField(const std::string& output_field)`

    Add an output field.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Set the consistency level. [Consistency Level](https://milvus.io/docs/consistency.md#Consistency-Level).

- `SetConsistencyLevel(::milvus::ConsistencyLevel consistency_level)`

    Set the consistency level.

- `WithFilter(std::string filter)`

    Set filter expression.

- `SetFilter(std::string filter)`

    Set filter expression.

- `AddFilterTemplate(std::string key, const nlohmann::json& filter_template)`

    Adds one value for a placeholder in the filter expression. It is used only when the request has a non-empty filter and avoids repeatedly parsing large literal values.

- `WithFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Replaces all placeholder values used by the filter expression. Keys correspond to placeholders such as {age} or {city}; values may be boolean, numeric, string, or array data.

- `SetFilterTemplates(std::unordered_map<std::string, nlohmann::json>&& filter_templates)`

    Set filter templates. Read the doc for more info: https://milvus.io/docs/filtering-templating.md#Filter-Templating

- `WithLimit(int64_t limit)`

    Set limit value, only available when expression is empty. Note: this value is stored in the ExtraParams.

- `SetLimit(int64_t limit)`

    Set limit value, only available when expression is empty. Note: this value is stored in the ExtraParams.

- `WithOffset(int64_t offset)`

    Set offset value, only available when expression is empty. Note: this value is stored in the ExtraParams.

- `SetOffset(int64_t offset)`

    Set offset value, only available when expression is empty. Note: this value is stored in the ExtraParams.

- `WithIgnoreGrowing(bool ignore_growing)`

    Set ignore growing segments. Note: this value is stored in the ExtraParams.

- `SetIgnoreGrowing(bool ignore_growing)`

    Set ignore growing segments. Note: this value is stored in the ExtraParams.

- `AddExtraParam(const std::string& key, const std::string& value)`

    Add extra param.

- `WithTimezone(const std::string& timezone)`

    Set timezone, takes effect for Timestamptz field. Note: this value is stored in the ExtraParams.

- `SetTimezone(const std::string& timezone)`

    Set timezone, takes effect for Timestamptz field. Note: this value is stored in the ExtraParams.

- `WithOrderByFields(std::vector<OrderByField>&& order_by_fields)`

    Set fields used to order query results.

- `SetOrderByFields(std::vector<OrderByField>&& order_by_fields)`

    Set fields used to order query results.

- `AddOrderByField(OrderByField order_by_field)`

    Add a field used to order query results.

- `WithReduceStopForBest(bool reduce_stop_for_best)`

    Set the flag of internal retrieve strategy.

- `SetReduceStopForBest(bool reduce_stop_for_best)`

    Set the flag of internal retrieve strategy.

- `SetSkipRLS(bool skip_rls)`

    Sets whether to bypass row-level-security enforcement for this request.

- `WithSkipRLS(bool skip_rls)`

    Sets whether to bypass row-level-security enforcement for this request.

- `SetRLSPrincipal(const std::string& principal)`

    Sets the application-level row-level-security principal for this request.

- `WithRLSPrincipal(const std::string& principal)`

    Sets the application-level row-level-security principal for this request.

- `SetGroupByFields(std::vector<std::string>&& group_by_fields)`

    Sets the fields used to group query results.

- `WithGroupByFields(std::vector<std::string>&& group_by_fields)`

    Sets the fields used to group query results.

- `SetExternalFilterFunc(const std::function<Status(SingleResult&)>& func)`

    Sets a client-side page filter applied to each returned page of hits. Only `SearchIterator` supports this callback; it is a no-op for query iterators.

- `SetPkSchema(const FieldSchema& schema)`

    Sets the primary-key schema used to escape iterator paging values correctly.

- `SetCollectionID(int64_t id)`

    Sets an explicit collection ID for iterator paging when server-side cache behavior requires it.

- `SetBatchSize(int64_t batch_size)`

    Sets the number of records requested in each iterator page.

- `Cursor() (*const QueryIteratorCursor*)`

    Gets a previously captured cursor used to resume pagination from its position. Returns `nullptr` when none was set.

- `SetCursor(const QueryIteratorCursor& cursor)`

    Sets a previously captured cursor to resume pagination from its position.

- `WithCursor(const QueryIteratorCursor& cursor)`

    Sets a previously captured cursor to resume pagination from its position. A request `Offset` is ignored on resume: the cursor already positions past the consumed rows. Resuming an element-filter iterator requires re-supplying the same `element_filter(...)` expression, otherwise the cursor's element offset is silently dropped.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a status indicating whether the operation succeeded.

### [FieldData](FieldData.md)

Field payloads use [FieldData](FieldData.md), its concrete aliases, and `FieldDataPtr`. See that page for template methods, array and binary specializations, and supported payload forms.

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

- `const std::vector<std::vector<int64_t>>& ElementIndices() const`

    The per-row element indices. Each inner list holds the element offsets within an entity that matched an `element_filter` query; ordinary queries leave this empty. The query iterator instead expands each entity into one row per matched element with an appended `offset` column, so its delivered pages carry no element indices.

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
    virtual Status Cursor(QueryIteratorCursor& cursor) const;
};
```

- `virtual Status Next(T& results) = 0`

- `virtual Status Cursor(QueryIteratorCursor& cursor) const`

    Captures the current position as a resumable cursor. Only QueryIterator supports this; SearchIterator returns `StatusCode::NOT_SUPPORTED`.

### QueryIterator

Iterates over `QueryResults` batches from a `QueryIterator()` call. Each call to `Next()` fills a `QueryResults` with the next batch of rows.

```cpp
using QueryIterator    = Iterator<QueryResults>;
using QueryIteratorPtr = std::shared_ptr<QueryIterator>;
```

Obtained via `MilvusClientV2::QueryIterator(QueryIteratorRequest&, QueryIteratorPtr&)`.

### QueryIteratorCursor

A serializable snapshot of a `QueryIterator` position, used to resume pagination. Captures the session timestamp of the original iterator, the last primary key returned, and (for element-filter iterators) the last matched element offset. Pass it back through the request's `WithCursor()` to resume from exactly this position. Resuming an element-filter iterator requires re-supplying the same `element_filter(...)` expression; otherwise the cursor's element offset is silently dropped.

```cpp
QueryIteratorCursor();
```

- `uint64_t SessionTs() const` / `Status SetSessionTs(uint64_t session_ts)` / `WithSessionTs(uint64_t session_ts)`

    Gets or sets the MVCC session timestamp pinned from the original iterator.

- `bool HasIntPk() const`

    Whether an Int64 primary-key position is present.

- `int64_t IntPk() const` / `Status SetIntPk(int64_t pk)` / `WithIntPk(int64_t pk)`

    Gets or sets the Int64 primary-key position.

- `bool HasStrPk() const`

    Whether a VarChar primary-key position is present.

- `const std::string& StrPk() const` / `Status SetStrPk(const std::string& pk)` / `WithStrPk(const std::string& pk)`

    Gets or sets the VarChar primary-key position.

- `bool HasLastElementOffset() const`

    Whether the element position within the last primary key is present.

- `int64_t LastElementOffset() const` / `Status SetLastElementOffset(int64_t offset)` / `WithLastElementOffset(int64_t offset)`

    Gets or sets the element position within the last primary key. Only meaningful for element-filter iterators; ordinary iterators leave it unset.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Demonstrates QueryIterator() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::QueryIteratorRequest();
milvus::QueryIteratorPtr response;
util::CheckStatus(client->QueryIterator(request, response));
```
