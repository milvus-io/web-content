# DropIndexProperties()

This operation removes specified properties from an index.

```cpp
Status DropIndexProperties(const DropIndexPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = DropIndexPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name)
    .WithPropertyKeys(keys)
    .AddPropertyKey(key);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. If left empty, the default database is used.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that owns the index.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the index whose properties are to be dropped. Currently, this API only supports index_name.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the property keys to remove from the index. Accepts a std::set<std::string> by rvalue reference, so the contents are moved into the request.

- `AddPropertyKey(const std::string& key)`

    Adds a single property key to the set of keys to be removed from the index.

**RETURNS:**

*Status*

Returns a Status indicating whether the index properties were dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call DropIndexProperties() on a connected MilvusClientV2 to remove the mmap.enabled property from an index.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DropIndexPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithIndexName(index_name)
    .AddPropertyKey("mmap.enabled");
status = client->DropIndexProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
