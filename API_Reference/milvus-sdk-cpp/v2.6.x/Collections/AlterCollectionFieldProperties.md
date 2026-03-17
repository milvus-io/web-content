# AlterCollectionFieldProperties()

This operation alters a field's properties.

```cpp
Status AlterCollectionFieldProperties(const AlterCollectionFieldPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = AlterCollectionFieldPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .WithProperties(properties);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Set the name of the collection.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the target field.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the properties to alter for the specified field. For details, refer to [this page](https://milvus.io/docs/alter-collection-field.md).

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**EXCEPTIONS:**

- **StatusCode**

    Check `status.Code()` and `status.Message()` for error details.

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->AlterCollectionFieldProperties(
    milvus::AlterCollectionFieldPropertiesRequest()
        .WithCollectionName("my_collection")
        .WithFieldName("my_field")
        .AddProperty("max_length", "512"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
