# AlterIndexProperties()

This operation alters the properties of an existing index, such as its index-specific mmap.enabled setting. The target index is identified by collection name and index name, with an optional database name for non-default databases.

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

    Sets the target database name; the default database is used if it is empty. Optional.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that owns the index.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index to alter. Currently, this API only supports index_name.

- `SetIndexName(const std::string& index_name)`

    Set name of the index. Currently, this API only supports index_name.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to alter on this index, moved in as an std::unordered_map<std::string, std::string> of key-value pairs.

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set altered properties of this index.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single property key-value pair to the set of altered properties for this index.

**RETURNS:**

*Status*

Returns a Status indicating whether the index properties were altered successfully.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

Alter an index's mmap.enabled property after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::AlterIndexPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name)
    .AddProperty("mmap.enabled", "true");
status = client->AlterIndexProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
