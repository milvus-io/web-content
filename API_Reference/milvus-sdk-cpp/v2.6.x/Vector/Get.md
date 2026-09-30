# Get()

This operation fetches entities from a collection by their primary key values and returns the requested output fields for each matched entity. Internally it runs as a primary-key filter query, so partition scope and consistency level follow the request settings.

```cpp
Status Get(const GetRequest& request, GetResponse& response)
```

## Request Syntax

```cpp
auto request = GetRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPartitionNames(partition_names)
    .AddPartitionName(partition_name)
    .WithOutputFields(output_field_names)
    .AddOutputField(output_field)
    .WithConsistencyLevel(consistency_level)
    .WithIDs(id_array)
    .WithIDs(id_array);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name to query against; the default database is used when it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to fetch entities from.

- `WithPartitionNames(std::set<std::string>&& partition_names)`

    Sets the partition names to scope the fetch; when empty, the entire collection is queried. Optional.

- `AddPartitionName(const std::string& partition_name)`

    Adds a partition name to the partition scope of the fetch. Optional.

- `WithOutputFields(std::set<std::string>&& output_field_names)`

    Sets the names of the fields to return in the response. Optional.

- `AddOutputField(const std::string& output_field)`

    Adds a field name to the set of fields to return in the response. Optional.

- `WithConsistencyLevel(ConsistencyLevel consistency_level)`

    Sets the consistency level for this read; it defaults to NONE when not specified. Optional.

- `WithIDs(std::vector<int64_t>&& id_array)`

    Sets the primary keys of the entities to fetch, accepting either int64 or string key values; note that this method resets any previously set id array.

- `WithIDs(std::vector<std::string>&& id_array)`

    Sets the primary keys of the entities to fetch, accepting either int64 or string key values; note that this method resets any previously set id array.

**RETURNS:**

*Status*

Returns a Status indicating whether the operation succeeded, and on success populates the response with the fetched records.

- **response** (*GetResponse*) -

    - **Results** (*const QueryResults&*) -

        Get result of query operation.

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

    - **SessionTs** (*uint64_t*) -

**ERROR HANDLING:**

- **std::exception**

    When request construction, transport to the server, or response processing fails. Inspect the exception message or the returned Status for failure details.

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

Fetch entities by primary key after connecting a MilvusClientV2; the request selects the collection, the ids to fetch, and the output field to return.

```cpp
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

milvus::EntityRows output_rows;
status = response.Results().OutputRows(output_rows);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
for (const auto& row : output_rows) {
    std::cout << row << std::endl;
}
```
