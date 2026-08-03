# DropCollectionProperties()

This operation drops a collection's properties.

```cpp
Status DropCollectionProperties(const DropCollectionPropertiesRequest& request)
```

## Request Syntax

```cpp
auto request = DropCollectionPropertiesRequest()
    .WithDatabaseName(db_name)
    .WithCollectionName(collection_name)
    .WithPropertyKeys(keys);
```

**REQUEST METHODS:**

- `WithDatabaseName(const std::string& db_name)`

    Sets the target database name. The default database applies if it is empty.

- `WithCollectionName(const std::string& collection_name)`

    Sets the name of the collection.

- `WithPropertyKeys(std::set<std::string>&& keys)`

    Sets the properties to drop from this collection.

- `AddPropertyKey(const std::string& key)`

    Sets a property to drop from this collection.

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

status = client->DropCollectionProperties(
    milvus::DropCollectionPropertiesRequest()
        .WithDatabaseName(db_name)
        .WithCollectionName(collection_name)
        .AddPropertyKey(milvus::COLLECTION_TTL_SECONDS)
);

if (!status.IsOk()) {
    std::cout << status.Message() << std::endl;
}
```
