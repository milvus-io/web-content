# DropCollectionFieldProperties()

This operation removes the specified properties from a field of an existing collection.

```cpp
Status DropCollectionFieldProperties(const DropCollectionFieldPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionFieldPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .WithPropertyKeys(keys)
    .AddPropertyKey(key);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name; the default database is used if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that contains the target field.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field whose properties will be dropped.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the property keys to drop from the field. The request takes ownership of the set via an rvalue reference, so pass it with std::move.

- `AddPropertyKey(const std::string& key)`

    Adds a single property key to drop from the field.

**RETURNS:**

*Status*

Returns a Status indicating whether the field properties were dropped successfully.

**ERROR HANDLING:**

- **std::exception**

    Thrown when request construction, transport, or response processing fails. Inspect the exception message or the returned Status for failure details.

## Example

Call DropCollectionFieldProperties() on a connected MilvusClientV2 to drop the properties of a field.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

auto request = milvus::DropCollectionFieldPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .AddPropertyKey("mmap.enabled");
status = client->DropCollectionFieldProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
