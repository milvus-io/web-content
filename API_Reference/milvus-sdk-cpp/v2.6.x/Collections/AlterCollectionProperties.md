# AlterCollectionProperties()

This operation alters collection properties.

```cpp
Status AlterCollectionProperties(const AlterCollectionPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = AlterCollectionPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithProperties(properties);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `SetDatabaseName(const std::string& db_name)`

    Set target db name, use default database if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `SetCollectionName(const std::string& collection_name)`

    Set the collection name.

- `WithProperties(std::unordered_map<std::string, std::string>&& properties)`

    Sets the altered properties of this collection. For available properties, refer to [Supported properties](https://milvus.io/docs/modify-collection.md#Supported-properties).

- `SetProperties(std::unordered_map<std::string, std::string>&& properties)`

    Set altered properties of this collection.

- `AddProperty(const std::string& key, const std::string& property)`

    Sets one of the properties of this collection. For available properties, refer to [Supported properties](https://milvus.io/docs/modify-collection.md#Supported-properties).

**RETURNS:**

*Status*

Check `status.IsOk()` to confirm success.

**ERROR HANDLING:**

- **Status**

    Failures are reported through the returned Status. The SDK converts internal exceptions into a non-OK Status; public API calls do not throw. Inspect `status.IsOk()` and `status.Message()` for failure details. See [Status](../Client/Status.md).

## Example

```cpp
#include "milvus/MilvusClientV2.h"
auto client = milvus::MilvusClientV2::Create();

milvus::ConnectParam connect_param{"http://localhost:19530", "root:Milvus"};
auto status = client->Connect(connect_param);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}

status = client->AlterCollectionProperties(
    milvus::AlterCollectionPropertiesRequest()
        .WithDatabaseName(db_name)
        .WithCollectionName(collection_name)
        .AddProperty(milvus::COLLECTION_TTL_SECONDS, "20")
);
if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
