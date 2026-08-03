# Get()

This operation issues a query with primary keys and returns a list of records.

```cpp
Status Get(const GetRequest& request, GetResponse& response)
```

## Request Syntax

```cpp
auto request = GetRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .WithOutputFields(output_field_names)
    .WithConsistencyLevel(consistency_level)
    .WithIDs(id_array);
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

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets an ID array.

**RETURNS:**

*Status* with *GetResponse*

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

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Field-data type aliases

<table>
   <tr>
     <th><p>Category</p></th>
     <th><p>Concrete types</p></th>
     <th><p>Representation and notes</p></th>
   </tr>
   <tr>
     <td><p>Scalar</p></td>
     <td><p><code>BoolFieldData</code>, <code>Int8FieldData</code>, <code>Int16FieldData</code>, <code>Int32FieldData</code>, <code>Int64FieldData</code>, <code>FloatFieldData</code>, <code>DoubleFieldData</code>, <code>VarCharFieldData</code>, <code>JSONFieldData</code>, <code>GeometryFieldData</code>, <code>TimestamptzFieldData</code></p></td>
     <td><p>Aliases of <code>FieldData&lt;T, DataType::...&gt;</code>. Geometry uses WKT strings; timestamptz uses ISO-8601 strings.</p></td>
   </tr>
   <tr>
     <td><p>Vector</p></td>
     <td><p><code>FloatVecFieldData</code>, <code>Float16VecFieldData</code>, <code>BFloat16VecFieldData</code>, <code>Int8VecFieldData</code>, <code>SparseFloatVecFieldData</code>, <code>BinaryVecFieldData</code></p></td>
     <td><p>Dense and sparse vector containers. <code>BinaryVecFieldData</code> is a derived class with string conversion helpers.</p></td>
   </tr>
   <tr>
     <td><p>Array and struct</p></td>
     <td><p><code>ArrayBoolFieldData</code>, <code>ArrayInt8FieldData</code>, <code>ArrayInt16FieldData</code>, <code>ArrayInt32FieldData</code>, <code>ArrayInt64FieldData</code>, <code>ArrayFloatFieldData</code>, <code>ArrayDoubleFieldData</code>, <code>ArrayVarCharFieldData</code>, <code>StructFieldData</code></p></td>
     <td><p>Aliases of <code>ArrayFieldData&lt;T, Et&gt;</code>; each entity row is a vector. Struct values use JSON storage.</p></td>
   </tr>
   <tr>
     <td><p>Shared pointers</p></td>
     <td><p><code>XxxFieldDataPtr</code></p></td>
     <td><p>Each concrete field-data type has a corresponding <code>std::shared_ptr&lt;XxxFieldData&gt;</code> alias.</p></td>
   </tr>
</table>

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::vector<int64_t> ids = {5, 1, 10, 8};
auto request = milvus::GetRequest()
                   .WithCollectionName(collection_name)
                   .WithIDs(std::move(ids))
                   .AddOutputField(field_vector);

milvus::GetResponse response;
status = client->Get(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto query_results = response.Results();
milvus::EntityRows output_rows;
status = query_results.OutputRows(output_rows);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << "Get results:" << std::endl;
for (const auto& row : output_rows) {
    std::cout << "\t" << row << std::endl;
}
```
