# DropCollectionFieldProperties()

Drop a field's properties.

```cpp
Status DropCollectionFieldProperties(const DropCollectionFieldPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionFieldPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithFieldName(field_name)
    .WithPropertyKeys(keys);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithFieldName(const std::string& field_name)`

    Sets the name of the field.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the properties to drop from this field.

- `AddPropertyKey(const std::string& key)`

    Sets a property to drop from this field.

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

status = client->DropCollectionFieldProperties(
    milvus::DropCollectionFieldPropertiesRequest()
        .WithCollectionName("my_collection")
        .WithFieldName("my_field")
        .AddPropertyKey("max_length"));
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
