# AddCollectionField()

This operation adds a new field to an existing collection's schema. The added field must be marked nullable.

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

    Sets the name of the target collection.

- `WithField(FieldSchema&& field_schema)`

    Sets the schema of the field to add; pass it with std::move() because the parameter is an rvalue reference.

**RETURNS:**

*Status*

Returns a Status indicating whether the field was successfully added to the collection's schema.

**ERROR HANDLING:**

- **std::exception**

    Request construction, transport, or response processing fails. Inspect the exception message or returned Status for failure details.

## Example

Add a nullable field to an existing collection after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

milvus::FieldSchema new_field = milvus::FieldSchema()
    .WithName("age")
    .WithDataType(milvus::DataType::INT64)
    .WithNullable(true);

auto request = milvus::AddCollectionFieldRequest()
    .WithDatabaseName("default")
    .WithCollectionName("my_collection")
    .WithField(std::move(new_field));
status = client->AddCollectionField(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
