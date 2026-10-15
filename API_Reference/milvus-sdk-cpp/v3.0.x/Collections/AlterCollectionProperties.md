# AlterCollectionProperties()

This operation alters the properties of an existing collection.

```cpp
Status AlterCollectionProperties(const AlterCollectionPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = AlterCollectionPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithProperties(properties)
    .AddProperty(key, property);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database. If left empty, the default database is used.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection to alter.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to apply to the collection as key/value pairs. The request takes ownership of the map via an rvalue reference, so pass it with std::move.

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set altered properties of this collection.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single property key/value pair to apply to the collection.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection properties were altered successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call AlterCollectionProperties() on a connected MilvusClientV2 to alter the properties of the collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::AlterCollectionPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .AddProperty("mmap.enabled", "true");
status = client->AlterCollectionProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
