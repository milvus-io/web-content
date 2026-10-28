# AlterIndexProperties()

This operation alters the properties of an index.

```cpp
Status AlterIndexProperties(const AlterIndexPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = AlterIndexPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name)
    .WithProperties(properties)
    .AddProperty(key, property);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the name of the target database. The default database is used if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that contains the index.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index. Currently, this API only supports the index name.

- `SetIndexName(const std::string& index_name)`

    Set name of the index. Currently, this API only supports index_name.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to alter on the index, moving the given unordered_map of key-value pairs into the request.

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set altered properties of this index.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single property to the index, specified as a key-value pair.

**RETURNS:**

*[Status](../Client/Status.md)*

Returns a [Status](../Client/Status.md) indicating whether the index properties were altered successfully.

**ERROR HANDLING:**

- **[Status](../Client/Status.md)**

    Failures are reported through the returned [Status](../Client/Status.md). The SDK converts internal exceptions into a non-OK [Status](../Client/Status.md); public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details.

## Example

Call AlterIndexProperties() on a connected MilvusClientV2 to alter index properties such as enabling mmap.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::unordered_map<std::string, std::string> properties{{"mmap.enabled", "true"}};
auto request = milvus::AlterIndexPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name)
    .WithProperties(std::move(properties));
status = client->AlterIndexProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
