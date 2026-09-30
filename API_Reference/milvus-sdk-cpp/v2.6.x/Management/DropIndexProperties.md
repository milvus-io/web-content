# DropIndexProperties()

This operation removes the specified property keys from an index of a collection. The keys are sent to the server as delete keys of an AlterIndex request, and the returned Status reports whether the drop succeeded.

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

    Sets the target database name; the default database is used when it is left empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that owns the index.

- `WithIndexName(const std::string& index_name)`

    Sets the name of the target index. Currently, this API only supports index_name.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the set of property keys to drop from the index, moving the given keys into the request.

- `AddPropertyKey(const std::string& key)`

    Adds a single property key to the set of keys to drop.

**RETURNS:**

*Status*

Returns a Status indicating whether the property keys were dropped from the index successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the returned Status code and message, or the exception message, for failure details.

## Example

Drop a property key from an index after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DropIndexPropertiesRequest()
    .WithDatabaseName("default")
    .WithCollectionName("my_collection")
    .WithIndexName("my_index")
    .AddPropertyKey("mmap.enabled");
status = client->DropIndexProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
