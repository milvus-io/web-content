# DropCollectionFieldProperties()

This operation removes the specified property keys from a field of an existing collection, restoring those properties to their defaults. Each key is sent as a delete key on an AlterCollectionField request, and the client invalidates its cached schema for the collection afterwards.

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

    Sets the target database name; the default database is used if it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that owns the field.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field whose properties will be dropped.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the whole set of property keys to remove from the field, replacing any keys added previously.

- `AddPropertyKey(const std::string& key)`

    Adds one property key to be removed from the field.

**RETURNS:**

*Status*

Returns a Status indicating whether the specified property keys were removed from the collection field.

**ERROR HANDLING:**

- **std::exception**

    Thrown when the request cannot be constructed, the RPC transport fails, or the server rejects the drop. Inspect Status::IsOk() and Status::Message() (or the exception message) for the failure reason.

## Example

Drop the mmap.enabled property from a vector field after connecting a MilvusClientV2.

```cpp
auto client = milvus::MilvusClientV2::Create();
milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

// Remove the "mmap.enabled" property from the vector field, restoring its default
auto request = milvus::DropCollectionFieldPropertiesRequest()
    .WithDatabaseName("default")
    .WithCollectionName("my_collection")
    .WithFieldName("my_vector")
    .AddPropertyKey(milvus::MMAP_ENABLED);
status = client->DropCollectionFieldProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
