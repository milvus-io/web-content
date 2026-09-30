# Upsert()

This operation upserts entities into a collection: rows whose primary keys already exist are replaced, while rows with new primary keys are inserted. Data can be supplied either column-based (FieldData columns) or row-based (nlohmann::json entity rows).

```cpp
Status Upsert(const UpsertRequest& request, UpsertResponse& response)
```

## Request Syntax

```cpp
auto request = UpsertRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionName(partition_name)
    .WithColumnsData(columns_data)
    .AddColumnData(column_data)
    .WithRowsData(rows_data)
    .AddRowData(row_data)
    .WithPartialUpdate(partial_update)
    .WithFieldOps(field_ops)
    .AddFieldOp(field_op);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the database name to target; if empty, the default database is used. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to upsert into.

- `WithPartitionName(const std::string& partition_name)`

    Sets the name of the target partition; if empty, the entities go into the default partition. Optional.

- `WithColumnsData(std::vector<FieldDataPtr>&& columns_data)`

    Sets the column-based field data to upsert as a vector of FieldDataPtr; cannot be combined with row-based data.

- `AddColumnData(const FieldDataPtr& column_data)`

    Adds a single field's data (FieldDataPtr) to the column-based payload; cannot be combined with row-based data.

- `WithRowsData(EntityRows&& rows_data)`

    Sets the row-based entities to upsert; each EntityRow is an nlohmann::json object keyed by field name and must carry the primary key. Cannot be combined with column-based data.

- `AddRowData(EntityRow&& row_data)`

    Adds a single entity row (an nlohmann::json object keyed by field name) to the row-based payload; cannot be combined with column-based data.

- `WithPartialUpdate(bool partial_update)`

    Sets whether to perform a partial update: if true, only the specified fields are updated while others remain unchanged; default is false. Optional.

- `WithFieldOps(std::vector<FieldPartialUpdateOp>&& field_ops)`

    Sets per-field partial update operations (REPLACE, ARRAY_APPEND, ARRAY_REMOVE); ARRAY_APPEND and ARRAY_REMOVE automatically enable partial update semantics. Optional.

- `AddFieldOp(FieldPartialUpdateOp field_op)`

    Adds a single per-field partial update operation for partial upserts. Optional.

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

Returns a Status indicating whether the operation succeeded; on success the response carries the upsert count and the IDs of the upserted entities in its DmlResults.

- **response** (*UpsertResponse*) -

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

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details, such as a schema mismatch or an unknown collection.

## Example

Use Upsert() after connecting a MilvusClientV2; each row is an nlohmann::json object keyed by field name and must carry the primary key.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::EntityRows rows;
milvus::EntityRow row;
row["id"] = 1001;
row["text"] = "updated text for id 1001";
row["embedding"] = std::vector<float>{0.1f, 0.2f, 0.3f, 0.4f};
rows.emplace_back(std::move(row));

milvus::UpsertResponse response;
status = client->Upsert(
    milvus::UpsertRequest().WithCollectionName("my_collection").WithRowsData(std::move(rows)), response);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
