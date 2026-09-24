# AlterCollectionFieldProperties()

This operation alters the properties of a specified field in an existing collection.

```cpp
Status AlterCollectionFieldProperties(const AlterCollectionFieldPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = AlterCollectionFieldPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .WithProperties(properties)
    .AddProperty(key, property);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that contains the field to alter.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field to alter.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to apply to the field as key/value pairs. The request takes ownership of the map via an rvalue reference, so pass it with std::move.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single property key/value pair to apply to the field.

**RETURNS:**

*Status*

Returns a Status indicating whether the field properties were altered successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call AlterCollectionFieldProperties() on a connected MilvusClientV2 to alter the properties of a field.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::AlterCollectionFieldPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .AddProperty("mmap.enabled", "true");
status = client->AlterCollectionFieldProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
