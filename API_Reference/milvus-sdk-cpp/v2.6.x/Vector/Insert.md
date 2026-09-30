# Insert()

This operation inserts rows into a collection, accepting either column-based data or row-based data. The two styles are mutually exclusive: ColumnsData and RowsData cannot both be set on the same request.

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

    Sets the target database name; the default database is used when it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the target collection that receives the inserted rows.

- `WithPartitionName(const std::string& partition_name)`

    Sets the target partition name; the default partition is used when it is empty. Optional.

- `WithColumnsData(std::vector<FieldDataPtr>&& columns_data)`

    Sets the column-based field data to insert, one FieldData entry per field; ColumnsData and RowsData cannot both be set.

- `AddColumnData(const FieldDataPtr& column_data)`

    Adds a single column-based field data entry to the insert; ColumnsData and RowsData cannot both be set.

- `WithRowsData(EntityRows&& rows_data)`

    Sets the row-based data as a list of nlohmann::json objects, one per entity row, with each key naming a schema field; ColumnsData and RowsData cannot both be set.

- `AddRowData(EntityRow&& row_data)`

    Adds a single entity row as an nlohmann::json object keyed by field name; ColumnsData and RowsData cannot both be set.

<table>
   <tr>
     <th><p>Schema DataType</p></th>
     <th><p>Column payload type</p></th>
     <th><p>C++ representation</p></th>
     <th><p>Notes</p></th>
   </tr>
   <tr>
     <td><p><code>BOOL</code></p></td>
     <td><p><code>BoolFieldData</code></p></td>
     <td><p><code>bool</code></p></td>
     <td><p>Boolean scalar values.</p></td>
   </tr>
   <tr>
     <td><p><code>INT8</code>, <code>INT16</code>, <code>INT32</code>, <code>INT64</code></p></td>
     <td><p>Matching <code>Int&ast;FieldData</code></p></td>
     <td><p>Matching fixed-width integer</p></td>
     <td><p>Choose the container matching the schema type.</p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT</code>, <code>DOUBLE</code></p></td>
     <td><p><code>FloatFieldData</code>, <code>DoubleFieldData</code></p></td>
     <td><p><code>float</code>, <code>double</code></p></td>
     <td><p>Floating-point scalar values.</p></td>
   </tr>
   <tr>
     <td><p><code>VARCHAR</code>, <code>JSON</code>, <code>GEOMETRY</code>, <code>TIMESTAMPTZ</code></p></td>
     <td><p><code>VarCharFieldData</code> or <code>JSONFieldData</code></p></td>
     <td><p><code>std::string</code> or <code>nlohmann::json</code></p></td>
     <td><p>Geometry and timestamptz are transported through string payload aliases.</p></td>
   </tr>
   <tr>
     <td><p><code>FLOAT_VECTOR</code>, <code>FLOAT16_VECTOR</code>, <code>BFLOAT16_VECTOR</code>, <code>INT8_VECTOR</code></p></td>
     <td><p>Matching dense-vector <code>FieldData</code> class</p></td>
     <td><p><code>std::vector&lt;float&gt;</code>, <code>std::vector&lt;uint16_t&gt;</code>, or <code>std::vector&lt;int8_t&gt;</code></p></td>
     <td><p>Choose the container matching the vector encoding.</p></td>
   </tr>
   <tr>
     <td><p><code>SPARSE_FLOAT_VECTOR</code>, <code>BINARY_VECTOR</code></p></td>
     <td><p><code>SparseFloatVecFieldData</code>, <code>BinaryVecFieldData</code></p></td>
     <td><p><code>std::map&lt;uint32_t, float&gt;</code> or dedicated binary storage</p></td>
     <td><p>Binary vectors use a dedicated class.</p></td>
   </tr>
   <tr>
     <td><p><code>ARRAY</code>, <code>STRUCT</code></p></td>
     <td><p>Specialized <code>Array&ast;FieldData</code> or <code>StructFieldData</code></p></td>
     <td><p>Element-specific container or array-style <code>nlohmann::json</code> storage</p></td>
     <td><p>Arrays declare an element type; structs use the array template with <code>DataType::STRUCT</code>.</p></td>
   </tr>
   <tr>
     <td><p><code>UNKNOWN</code></p></td>
     <td><p>None</p></td>
     <td><p>None</p></td>
     <td><p>Has no insertion payload.</p></td>
   </tr>
</table>

**RETURNS:**

*Status*

Returns a Status indicating whether the insert succeeded; on success, the InsertResponse out-parameter carries the number of inserted rows and the IDs of the inserted entities, including any auto-generated primary keys.

- **response** (*InsertResponse*) -

    - **Results** (*const DmlResults&*) -

        Get result of dml operation.

        - **IdArray** (*const IDArray&*) -

            The id array for entities which are inserted or deleted.

            - **IsIntegerID** (*bool*) -

                Indicate this is an integer id array.

            - **IntIDArray** (*const std::vector<int64_t>&*) -

                Return integer id array.

            - **StrIDArray** (*const std::vector<std::string>&*) -

                Return string id array.

            - **GetRowCount** (*uint64_t*) -

                Get row count.

        - **Timestamp** (*uint64_t*) -

            The operation timestamp marked by server side.

        - **InsertCount** (*uint64_t*) -

            The number of inserted rows.

        - **DeleteCount** (*uint64_t*) -

            The number of deleted rows.

        - **UpsertCount** (*uint64_t*) -

            The number of upserted rows.

        - **Cost** (*int64_t*) -

            The cost of the operation in vcus, -1 if the server did not report it.

**ERROR HANDLING:**

- **std::exception**

    When request construction, network transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Insert row-based data after connecting a MilvusClientV2, then read the inserted-row count from the response.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::InsertRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name)
    .WithRowsData({
        {{"id", 1}, {"vector", {0.1f, 0.2f, 0.3f}}},
        {{"id", 2}, {"vector", {0.4f, 0.5f, 0.6f}}}
    });
milvus::InsertResponse response;
status = client->Insert(request, response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
std::cout << response.Results().InsertCount() << " rows inserted." << std::endl;
```
