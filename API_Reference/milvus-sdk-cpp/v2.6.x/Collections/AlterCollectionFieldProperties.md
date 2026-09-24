# AlterCollectionFieldProperties()

This operation alters the properties of an existing collection field by sending the specified key-value pairs to the server, which validates the property keys. On success it also invalidates the local schema cache for the collection so subsequent reads observe the updated field properties.

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

    Sets the name of the database that contains the target collection; the default database is used when it is empty. Optional.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection that owns the field whose properties are to be altered.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field whose properties are to be altered.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the full set of properties to alter on this field as string key-value pairs, replacing any properties added by earlier calls.

- `AddProperty(const std::string& key, const std::string& property)`

    Adds one property key-value pair to alter on this field, such as "mmap.enabled" set to "true"; adding a key that is already present does not overwrite it.

**RETURNS:**

*Status*

Returns a Status indicating whether the collection field properties were altered successfully.

**ERROR HANDLING:**

- **std::exception**

    When request construction, transport, or response processing fails. the SDK reports the failure through the returned Status (for example NOT_CONNECTED when no connection is established); inspect the status message for failure details.

## Example

Alter a field's properties after connecting a MilvusClientV2, enabling mmap for the field.

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
    .AddProperty(milvus::MMAP_ENABLED, "true");
status = client->AlterCollectionFieldProperties(request);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
