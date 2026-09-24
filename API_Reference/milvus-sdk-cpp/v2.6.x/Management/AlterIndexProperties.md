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

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that owns the index.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index to alter. Currently, this API only supports index_name.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to alter on this index, moved in as an std::unordered_map<std::string, std::string> of key-value pairs.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds a single property key-value pair to the set of altered properties for this index.

**RETURNS:**

*Status*

Returns a Status indicating whether the index properties were altered successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

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
