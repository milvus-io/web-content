# AddCollectionField()

This operation adds a new field to the schema of an existing collection.

```cpp
Status AddCollectionField(const AddCollectionFieldRequest& request)
```

## Request Syntax

```cpp
auto request = AddCollectionFieldRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithField(field_schema);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to add the field to.

- `WithField(FieldSchema&& field_schema)`

    Sets the schema of the field to add. The request takes ownership of the field schema via an rvalue reference, so pass it with std::move.

**RETURNS:**

*Status*

Returns a Status indicating whether the field was added successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call AddCollectionField() on a connected MilvusClientV2 to add a new field to an existing collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::FieldSchema field_schema{"age", milvus::DataType::INT64};
field_schema.WithNullable(true);  // Nullable so rows can omit the value.

auto request = milvus::AddCollectionFieldRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithField(std::move(field_schema));
status = client->AddCollectionField(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
