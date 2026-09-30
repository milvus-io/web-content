# Insert()

Insert data into a collection. You can input column-based data or row-based data.

```cpp
Status Insert(const InsertRequest& request, InsertResponse& response)
```

## Request Syntax

```cpp
auto request = InsertRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name)
    .WithColumnsData(columns_data)
    .AddColumnData(column_data)
    .WithRowsData(rows_data)
    .AddRowData(row_data);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set name of the collection.

- `WithPartitionName(const std::string& partition_name)`

    Set the partition name. If partition name is empty, will use the default partition.

- `WithColumnsData(std::vector<FieldDataPtr>&& columns_data)`

    Set fields data with fluent interface. Not allow to set ColumnsData and RowsData both.

- `AddColumnData(const FieldDataPtr& column_data)`

    Set a field data with fluent interface. Not allow to set ColumnsData and RowsData both.

- `WithRowsData(EntityRows&& rows_data)`

    Set entity rows with fluent interface. Not allow to set ColumnsData and RowsData both.

- `AddRowData(EntityRow&& row_data)`

    Add en entity rows with fluent interface. Not allow to set ColumnsData and RowsData both.

### Column payload types

The collection schema uses [DataType](../Collections/DataType.md) to declare each field's logical type. For `Insert()` and `Upsert()`, supply the corresponding column container through the common `FieldDataPtr` base pointer.

<table>
   <tr>
     <th><p>Schema DataType</p></th>
     <th><p>Column payload type</p></th>
     <th><p>C++ representation</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p>BOOL</p></td>
     <td><p>BoolFieldData</p></td>
     <td><p>bool</p></td>
     <td><p>Boolean scalar values.</p></td>
   </tr>
   <tr>
     <td><p>INT8, INT16, INT32, INT64</p></td>
     <td><p>Matching Int&ast;FieldData</p></td>
     <td><p>Matching fixed-width integer</p></td>
     <td><p>Choose the container matching the schema type.</p></td>
   </tr>
   <tr>
     <td><p>FLOAT, DOUBLE</p></td>
     <td><p>FloatFieldData, DoubleFieldData</p></td>
     <td><p>float, double</p></td>
     <td><p>Floating-point scalar values.</p></td>
   </tr>
   <tr>
     <td><p>VARCHAR, JSON, GEOMETRY, TIMESTAMPTZ</p></td>
     <td><p>VarCharFieldData or JSONFieldData</p></td>
     <td><p>std::string or nlohmann::json</p></td>
     <td><p>Geometry and timestamptz are transported through string payload aliases.</p></td>
   </tr>
   <tr>
     <td><p>FLOAT_VECTOR, FLOAT16_VECTOR, BFLOAT16_VECTOR, INT8_VECTOR</p></td>
     <td><p>Matching dense-vector FieldData class</p></td>
     <td><p>std::vector<float>, std::vector<uint16_t>, or std::vector<int8_t></p></td>
     <td><p>Choose the container matching the vector encoding.</p></td>
   </tr>
   <tr>
     <td><p>SPARSE_FLOAT_VECTOR, BINARY_VECTOR</p></td>
     <td><p>SparseFloatVecFieldData, BinaryVecFieldData</p></td>
     <td><p>std::map<uint32_t, float> or dedicated binary storage</p></td>
     <td><p>Binary vectors use a dedicated class.</p></td>
   </tr>
   <tr>
     <td><p>ARRAY, STRUCT</p></td>
     <td><p>Specialized Array&ast;FieldData or StructFieldData</p></td>
     <td><p>Element-specific container or array-style nlohmann::json storage</p></td>
     <td><p>Arrays declare an element type; structs use the array template with DataType::STRUCT.</p></td>
   </tr>
   <tr>
     <td><p>UNKNOWN</p></td>
     <td><p>None</p></td>
     <td><p>None</p></td>
     <td><p>Has no insertion payload.</p></td>
   </tr>
</table>

For a concrete container `XxxFieldData`, the pointer alias `XxxFieldDataPtr` is `std::shared_ptr<XxxFieldData>`. DML requests accept these values through `FieldDataPtr`.

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

### DmlResults

This class carries the outcome of a data-mutation operation (insert, upsert, or delete). It is accessed via `Results()` on `InsertResponse`, `UpsertResponse`, or `DeleteResponse`.

```cpp
const DmlResults& results = response.Results();
```

**METHODS:**

- `const IDArray& IdArray() const`

    The IDs of the entities that were inserted, upserted, or deleted. For auto-ID collections the server fills this in after insert. See IDArray for how to read integer or string IDs.

- `uint64_t Timestamp() const`

    Server-side operation timestamp. Can be passed as the `guarantee_timestamp` in subsequent search or query calls to ensure read-your-writes consistency.

- `uint64_t InsertCount() const`

    Number of rows that were inserted. Populated for `InsertResponse` and `UpsertResponse`.

- `uint64_t DeleteCount() const`

    Number of rows that were deleted. Populated for `DeleteResponse` and `UpsertResponse`.

- `uint64_t UpsertCount() const`

    Number of rows that were upserted (inserted as new or replaced existing). Populated for `UpsertResponse`.

- `int64_t Cost() const`

    Returns the cost of the operation in milliseconds.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Demonstrates Insert() with the C++ SDK.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
util::CheckStatus(client->Connect(connect_param));

auto request = milvus::InsertRequest();
milvus::InsertResponse response;
util::CheckStatus(client->Insert(request, response));
```
