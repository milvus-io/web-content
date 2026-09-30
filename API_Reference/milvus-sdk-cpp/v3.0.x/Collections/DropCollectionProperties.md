# DropCollectionProperties()

This operation removes the specified properties from an existing collection.

```cpp
Status DropCollectionProperties(const DropCollectionPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPropertyKeys(keys)
    .AddPropertyKey(key);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection whose properties will be dropped.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the property keys to drop from the collection. The request takes ownership of the set via an rvalue reference, so pass it with std::move.

- `AddPropertyKey(const std::string& key)`

    Adds a single property key to drop from the collection.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection properties were dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call DropCollectionProperties() on a connected MilvusClientV2 to drop the specified properties from a collection.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

std::set<std::string> property_keys{"mmap.enabled"};

auto request = milvus::DropCollectionPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPropertyKeys(std::move(property_keys));
status = client->DropCollectionProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
